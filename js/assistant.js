// =====================================================================
//  AI-ПОМІЧНИК: система-промпт + запит до проксі (Cloudflare Worker)
//  Оновлення: передача мови (lang) у запит
// =====================================================================

function aiResponseLangName() {
    const lang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    return { uk: 'українською', en: 'англійською (English)', ru: 'російською (по-русски)' }[lang] || 'українською';
}

function buildAiSystemPrompt() {
    return "Ти — дружній тролль-помічник у застосунку Fjord " +
        "для вивчення норвезької мови. Відповідай " + aiResponseLangName() + " (норвезькі " +
        "приклади можна давати норвезькою з перекладом). Допомагай пояснювати " +
        "граматику, слова, перекладати короткі фрази, складати приклади речень " +
        "і підказувати, як користуватись розділами застосунку (картки, словник, " +
        "тести, граматика). Пиши коротко, дружньо, по суті, можеш зрідка додати " +
        "легкий тролячий гумор, але без надмірностей. Форматування: це чат, " +
        "не документ, тому НЕ використовуй заголовки (#), нумеровані списки чи " +
        "таблиці. Дозволено лише **жирний текст** для ключових слів і списки " +
        "рядками, що починаються з «- ».";
}

async function callAiRaw(mode, systemPromptText, userText, history, lang) {
    if (!AI_PROXY_URL) {
        const err = new Error('NOT_CONFIGURED');
        err.code = 'NOT_CONFIGURED';
        throw err;
    }
    const payload = {
        system: systemPromptText,
        mode: mode,
        message: userText,
        lang: lang || 'uk', // <-- ДОДАНО
        history: (history || []).slice(0, -1).slice(-12).map(m => ({ role: m.role, text: m.text })),
    };
    let res;
    try {
        res = await fetch(AI_PROXY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
    } catch (networkErr) {
        const err = new Error('NETWORK_ERROR');
        err.code = 'NETWORK_ERROR';
        err.cause = networkErr;
        console.error('[AI Assistant] Мережева помилка при зверненні до проксі:', networkErr);
        throw err;
    }
    if (!res.ok) {
        let detail = '';
        try { detail = await res.text(); } catch (e) { /* ignore */ }
        console.error('[AI Assistant] Проксі повернув помилку', res.status, detail);
        const err = new Error('PROXY_ERROR');
        err.code = 'PROXY_ERROR';
        err.status = res.status;
        err.detail = detail;
        throw err;
    }
    const data = await res.json();
    if (!data || typeof data.reply !== 'string') {
        console.error('[AI Assistant] Неочікувана відповідь проксі:', data);
        const err = new Error('BAD_RESPONSE');
        err.code = 'BAD_RESPONSE';
        throw err;
    }
    return data.reply;
}

async function callAiAssistant(userText, history) {
    const lang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    return callAiRaw('chat', buildAiSystemPrompt(), userText, history, lang);
}

// =====================================================================
//  AI-ПЕРЕВІРКА ПИСЬМА (Norskprøve — skriveprøve)
// =====================================================================
function buildWritingCheckPrompt() {
    const langName = aiResponseLangName();
    return "Ти — досвідчений сенсор (екзаменатор), який перевіряє письмові роботи " +
        "кандидатів на іспиті Norskprøve (HK-dir, рівні A1–B2). Тобі надсилають " +
        "рівень, тему завдання і текст, який написав студент норвезькою. " +
        "Твоя відповідь — " + langName + ", чат-формат (без заголовків #, без " +
        "нумерованих списків чи таблиць, можна **жирний текст** і списки рядками " +
        "з «- »). Структуруй відповідь так: спочатку коротко (1 речення), чи " +
        "текст відповідає рівню і темі; далі **Помилки та виправлення** — " +
        "перелічи ключові граматичні/лексичні помилки, для кожної покажи " +
        "оригінал → виправлення норвезькою; далі **Що покращити** — 2-4 " +
        "конкретні поради (структура, зв'язність, різноманітність лексики, " +
        "довжина речень) з урахуванням вимог рівня Norskprøve; наприкінці — " +
        "коротке підбадьорення. Будь чесним і конкретним, але доброзичливим, " +
        "як справжній тролль-репетитор.";
}

async function checkWritingWithAI(level, topic, taskPrompt, studentText) {
    const lang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    const userMsg =
        `Рівень: ${level}\nТема завдання: ${topic || ''}\nФормулювання завдання: ${taskPrompt || ''}\n\n` +
        `Текст студента норвезькою:\n"""${studentText}"""`;
    return callAiRaw('writing_check', buildWritingCheckPrompt(), userMsg, [], lang);
}

// =====================================================================
//  AI-ГЕНЕРАЦІЯ НОВОГО КОНТЕНТУ
// =====================================================================
function parseAiJson(raw) {
    const cleaned = raw.replace(/```json/gi, '').replace(/```/g, '').trim();
    const start = cleaned.indexOf('{');
    const startArr = cleaned.indexOf('[');
    let from = start;
    if (startArr !== -1 && (start === -1 || startArr < start)) from = startArr;
    const sliced = from > 0 ? cleaned.slice(from) : cleaned;
    return JSON.parse(sliced);
}

async function generateNorskTaskAI(level, mode) {
    const lang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    let schema, desc;
    if (mode === 'reading' || mode === 'listening') {
        desc = mode === 'reading' ?
            'короткий текст для читання (3-6 речень норвезькою), відповідний рівню' :
            'короткий діалог або монолог, який імітує аудіо-репліку (3-6 речень норвезькою), відповідний рівню';
        schema = '{"title": "коротка назва норвезькою", "text": "' + desc + '", "questions": [{"q": "питання норвезькою", "opts": ["варіант1","варіант2","варіант3"], "a": 0}, ...(2-3 питання)]}';
    } else if (mode === 'writing') {
        schema = '{"topic": "коротка тема українською", "prompt": "формулювання завдання норвезькою, як на іспиті Norskprøve (напр. Skriv 3-7 setninger om ...)"}';
    } else {
        schema = '{"topic": "коротка тема українською", "prompt": "формулювання усного завдання норвезькою"}';
    }
    const userMsg = `Рівень: ${level}. Режим: ${mode}. Створи одне нове завдання за схемою: ${schema}`;
    const sys = "Ти генеруєш ОДНЕ нове тренувальне завдання для підготовки до " +
        "Norskprøve (HK-dir, рівні A1-B2) норвезькою мовою, у форматі, що " +
        "реально використовується на цьому іспиті. Відповідай ЛИШЕ чистим " +
        "JSON-об'єктом без жодного тексту навколо, без markdown-огорожі.";
    const reply = await callAiRaw('gen_task', sys, userMsg, [], lang);
    return parseAiJson(reply);
}

async function generateVocabWordsAI(level, existingTopics) {
    const lang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    const userMsg =
        `Рівень: ${level}. Наявні теми у словнику: ${(existingTopics || []).join(', ') || 'немає даних'}. ` +
        `Згенеруй 5 нових корисних слів норвезької мови для цього рівня (уникай базових слів з рівня A1, якщо рівень вищий). ` +
        `Формат масиву: [{"t": "тема українською (наприклад Їжа, Транспорт)", "no": "слово норвезькою", "uk": "переклад українською", "ex_no": "приклад речення норвезькою (мінімум 4 слова, містить це слово)", "ex_uk": "переклад прикладу"}, ...]`;
    const sys = "Ти генеруєш нові слова для словника вивчення норвезької мови " +
        "(рівень CEFR A1-B2). Відповідай ЛИШЕ чистим JSON-масивом без " +
        "жодного тексту навколо, без markdown-огорожі.";
    const reply = await callAiRaw('gen_vocab', sys, userMsg, [], lang);
    return parseAiJson(reply);
}

// =====================================================================
//  ІНІЦІАЛІЗАЦІЯ АСИСТЕНТА (без змін)
// =====================================================================
let autoLoginAttempts = 0;
const maxAutoLoginAttempts = 10;

function checkAutoLogin() { /* ... без змін ... */ }
function tryAutoLogin() { /* ... без змін ... */ }
setTimeout(tryAutoLogin, 500);

let _assistantWidgetReady = false;
let _assistantRenderAll = null;

function initAssistantWidget() {
    if (_assistantWidgetReady) {
        if (_assistantRenderAll) _assistantRenderAll();
        return;
    }

    const fab = document.getElementById('assistantFab');
    const panel = document.getElementById('assistantPanel');
    const overlay = document.getElementById('assistantOverlay');
    const closeBtn = document.getElementById('assistantCloseBtn');
    const log = document.getElementById('chatLog');
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSendBtn');
    const clearBtn = document.getElementById('chatClearBtn');
    if (!fab || !panel || !log || !input || !sendBtn) return;

    _assistantWidgetReady = true;
    ensureStateDefaults(STATE);

    function equippedNow() {
        ensureStateDefaults(STATE);
        return (STATE.trollGear && STATE.trollGear.equipped) || { hat: null, glasses: null, bg: null };
    }
    function avatarHtml() {
        return trollSVG('idle', 36, equippedNow());
    }

    const fabAvatar = document.getElementById('assistantFabAvatar');
    function updateFabAvatar() {
        if (fabAvatar) fabAvatar.innerHTML = trollSVG('happy', 46, equippedNow());
    }
    updateFabAvatar();

    function scrollToBottom() {
        log.scrollTop = log.scrollHeight;
    }

    const renderLiteMarkdown = renderLiteMarkdownGlobal;

    function renderMessage(msg) {
        const isUser = msg.role === 'user';
        const row = el(`<div class="chat-row ${isUser ? 'user' : 'bot'} ${msg.error ? 'error' : ''}"></div>`);
        if (!isUser) {
            row.appendChild(el(`<div class="chat-avatar">${avatarHtml()}</div>`));
        }
        row.appendChild(el(`<div class="chat-bubble"></div>`));
        const bubble = row.querySelector('.chat-bubble');
        if (isUser) {
            bubble.textContent = msg.text;
        } else {
            bubble.innerHTML = renderLiteMarkdown(msg.text);
        }
        log.appendChild(row);
    }

    function renderAll() {
        ensureStateDefaults(STATE);
        log.innerHTML = '';
        if (!STATE.assistantChat.length) {
            renderMessage({ role: 'model', text: trollSay('greeting') + ' Я твій тролль-помічник — питай про норвезьку!' });
        } else {
            STATE.assistantChat.forEach(renderMessage);
        }
        scrollToBottom();
    }
    _assistantRenderAll = renderAll;
    renderAll();

    function showTyping() { /* без змін */ }
    function hideTyping() { /* без змін */ }

    async function send(text) {
        text = (text || input.value).trim();
        if (!text) return;
        input.value = '';
        input.style.height = 'auto';
        const userMsg = { role: 'user', text, ts: Date.now() };
        STATE.assistantChat.push(userMsg);
        renderMessage(userMsg);
        scrollToBottom();
        updateState();

        sendBtn.disabled = true;
        showTyping();
        try {
            const reply = await callAiAssistant(text, STATE.assistantChat);
            hideTyping();
            const botMsg = { role: 'model', text: reply, ts: Date.now() };
            STATE.assistantChat.push(botMsg);
            renderMessage(botMsg);
            updateState();
        } catch (e) {
            hideTyping();
            console.error('[AI Assistant] Помилка чату:', e);
            // ... обробка помилок
            const errMsg = { role: 'model', text: msg, error: true, ts: Date.now() };
            renderMessage(errMsg);
            scrollToBottom();
        } finally {
            sendBtn.disabled = false;
        }
    }

    sendBtn.onclick = () => send();
    input.addEventListener('keydown', (e) => { /* без змін */ });
    input.addEventListener('input', () => { /* без змін */ });

    document.querySelectorAll('#chatSuggest .chat-suggest-chip').forEach(chip => { /* без змін */ });
    if (clearBtn) { /* без змін */ }

    function openAssistantPanel() { /* без змін */ }
    function closeAssistantPanel() { /* без змін */ }

    fab.onclick = openAssistantPanel;
    if (closeBtn) closeBtn.onclick = closeAssistantPanel;
    if (overlay) overlay.onclick = closeAssistantPanel;
    document.addEventListener('keydown', (e) => { /* без змін */ });

    window.openAssistantPanel = openAssistantPanel;
    window.closeAssistantPanel = closeAssistantPanel;
}