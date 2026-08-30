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
        "для вивчення іноземних мов (яку саме мову зараз вивчає користувач " +
        "— дивись позначку на початку його повідомлення; якщо позначки " +
        "нема — це норвезька). Відповідай " + aiResponseLangName() + " (приклади " +
        "мовою вивчення можна давати з перекладом). Допомагай пояснювати " +
        "граматику, слова, перекладати короткі фрази, складати приклади речень " +
        "і підказувати, як користуватись розділами застосунку (картки, словник, " +
        "тести, граматика). Пиши коротко, дружньо, по суті, можеш зрідка додати " +
        "легкий тролячий гумор, але без надмірностей. Форматування: це чат, " +
        "не документ, тому НЕ використовуй заголовки (#), нумеровані списки чи " +
        "таблиці. Дозволено лише **жирний текст** для ключових слів і списки " +
        "рядками, що починаються з «- ».";
}

// =====================================================================
//  ДОПОМІЖНІ ФУНКЦІЇ ДЛЯ РЕНДЕРИНГУ
// =====================================================================
function escapeHtmlGlobal(s) {
    return String(s == null ? '' : s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function renderLiteMarkdownGlobal(text) {
    const escaped = escapeHtmlGlobal(text);
    const lines = escaped.split('\n');
    let html = '';
    let inList = false;
    lines.forEach(line => {
        const bulletMatch = line.match(/^\s*[*-]\s+(.*)$/);
        if (bulletMatch) {
            if (!inList) { html += '<ul style="margin:4px 0;padding-left:20px;">'; inList = true; }
            html += `<li>${bulletMatch[1]}</li>`;
        } else {
            if (inList) { html += '</ul>'; inList = false; }
            html += (html ? '\n' : '') + line;
        }
    });
    if (inList) html += '</ul>';
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>');
    html = html.replace(/_([^_\n]+)_/g, '<em>$1</em>');
    return html;
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
        lang: lang || 'uk',
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
    // Worker ігнорує system, який шле клієнт (у нього свій, спільний для
    // всіх), і читає мову вивчення з тексту самого повідомлення — тож
    // додаємо приховану підказку з мовою на початок (у чаті користувач
    // її не бачить, бо renderMessage() малює оригінальний userText,
    // а не те, що йде в AI).
    const langHint = (typeof getLanguage === 'function' && typeof STATE !== 'undefined' && STATE && STATE.targetLang && STATE.targetLang !== 'no')
        ? `[Користувач зараз вивчає мову: ${getLanguage(STATE.targetLang).name.uk}] `
        : '';
    return callAiRaw('chat', buildAiSystemPrompt(), langHint + userText, history, lang);
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
    const targetLang = (typeof STATE !== 'undefined' && STATE && STATE.targetLang) || 'no';
    const targetLangName = typeof getLanguage === 'function' ? getLanguage(targetLang).name.uk : 'норвезької';
    const userMsg =
        `Мова, яку перевіряємо: ${targetLangName}\nРівень: ${level}\nТема завдання: ${topic || ''}\nФормулювання завдання: ${taskPrompt || ''}\n\n` +
        `Текст студента цією мовою:\n"""${studentText}"""`;
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
    if (from === -1) return JSON.parse(cleaned); // немає ні { ні [ — нехай впаде з нормальною помилкою
    const openCh = cleaned[from];
    const closeCh = openCh === '{' ? '}' : ']';
    // Раніше тут просто бралось "від першої дужки до кінця рядка" —
    // працювало, лише поки AI повертав ЧИСТО JSON і нічого більше. Якщо
    // модель дописувала бодай один зайвий символ/рядок ПІСЛЯ JSON
    // (пояснення, порожній рядок з крапкою тощо — трапляється, особливо
    // коли за лаштунками сервер не впізнав режим запиту і відповів у
    // звичайному "розмовному" стилі замість строгого JSON) — JSON.parse
    // падав з "Unexpected non-whitespace character after JSON data".
    // Тепер шукаємо ВІДПОВІДНУ закриваючу дужку (рахуючи вкладеність і
    // ігноруючи дужки всередині рядкових значень), і парсимо лише цей
    // збалансований шматок — усе, що йде далі, просто відкидається.
    let depth = 0;
    let inString = false;
    let escaped = false;
    let end = -1;
    for (let i = from; i < cleaned.length; i++) {
        const ch = cleaned[i];
        if (inString) {
            if (escaped) escaped = false;
            else if (ch === '\\') escaped = true;
            else if (ch === '"') inString = false;
            continue;
        }
        if (ch === '"') { inString = true; continue; }
        if (ch === openCh) depth++;
        else if (ch === closeCh) {
            depth--;
            if (depth === 0) { end = i; break; }
        }
    }
    const sliced = end !== -1 ? cleaned.slice(from, end + 1) : cleaned.slice(from);
    return JSON.parse(sliced);
}

async function generateNorskTaskAI(level, mode) {
    const lang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    const targetLang = (typeof STATE !== 'undefined' && STATE && STATE.targetLang) || 'no';
    const targetLangName = typeof getLanguage === 'function' ? getLanguage(targetLang).name.uk : 'норвезької';
    const isNorwegian = targetLang === 'no';
    let schema, desc;
    if (mode === 'reading' || mode === 'listening') {
        desc = mode === 'reading' ?
            `короткий текст для читання (3-6 речень ${targetLangName} мовою), відповідний рівню` :
            `короткий діалог або монолог, який імітує аудіо-репліку (3-6 речень ${targetLangName} мовою), відповідний рівню`;
        schema = '{"title": "коротка назва ' + targetLangName + ' мовою", "text": "' + desc + '", "questions": [{"q": "питання ' + targetLangName + ' мовою", "opts": ["варіант1","варіант2","варіант3"], "a": 0}, ...(2-3 питання)]}';
    } else if (mode === 'writing') {
        schema = '{"topic": "коротка тема українською", "prompt": "формулювання завдання ' + targetLangName + ' мовою' +
            (isNorwegian ? ', як на іспиті Norskprøve (напр. Skriv 3-7 setninger om ...)' : '') + '"}';
    } else {
        schema = '{"topic": "коротка тема українською", "prompt": "формулювання усного завдання ' + targetLangName + ' мовою"}';
    }
    const userMsg = `Мова вивчення: ${targetLangName}. Рівень: ${level}. Режим: ${mode}. Створи одне нове завдання за схемою: ${schema}`;
    const sys = "Ти генеруєш ОДНЕ нове тренувальне завдання для підготовки до іспиту з " + targetLangName + " мови " +
        (isNorwegian ? "(Norskprøve, HK-dir, рівні A1-B2), у форматі, що реально використовується на цьому іспиті. " : "(рівні CEFR A1-B2). ") +
        "Відповідай ЛИШЕ чистим JSON-об'єктом без жодного тексту навколо, без markdown-огорожі.";
    const reply = await callAiRaw('gen_task', sys, userMsg, [], lang);
    return parseAiJson(reply);
}

async function generateVocabWordsAI(level, existingWords) {
    const uiLang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    const targetLang = (typeof STATE !== 'undefined' && STATE && STATE.targetLang) || 'no';
    const targetLangName = typeof getLanguage === 'function' ? getLanguage(targetLang).name.uk : 'норвезької';
    const words = Array.isArray(existingWords) ? existingWords : [];
    const topics = [...new Set(words.map(w => w.t).filter(Boolean))];
    // Раніше сюди йшли лише НАЗВИ ТЕМ ("Їжа", "Транспорт") — AI не бачив
    // самих слів, тому раз у раз пропонував ті самі базові варіанти.
    // Тепер явно передаємо список уже доданих слів (мовою вивчення), щоб
    // AI дійсно міг їх уникнути. Обрізаємо до 150, щоб не роздувати
    // запит для великих словників — цього достатньо, щоб покрити типовий
    // стартовий набір рівня.
    const avoidList = words.slice(-150).map(w => w.no).filter(Boolean).join(', ');
    // Та сама причина, що й у generateStarterVocab (languages.js): слова
    // без полів en/ru/en_ex/ru_ex мовчки показують український переклад
    // навіть тим, хто вибрав англійський чи російський інтерфейс —
    // wordTranslation()/wordExampleTranslation() просто не мають звідки
    // взяти інший переклад. Ця кнопка ("✨ Додати ще слів") генерувала
    // слова саме без цих полів.
    const userMsg =
        `Рівень: ${level}. Наявні теми у словнику: ${topics.join(', ') || 'немає даних'}. ` +
        (avoidList ? `Ці слова вже є у словнику користувача, НЕ повторюй їх і не пропонуй їхні прямі синоніми: ${avoidList}. ` : '') +
        `Згенеруй 8 нових корисних слів мовою "${targetLangName}" для цього рівня, яких ще нема у списку вище (уникай базових слів з рівня A1, якщо рівень вищий). ` +
        `Формат масиву: [{"t": "тема українською (наприклад Їжа, Транспорт)", "no": "слово мовою вивчення", ` +
        `"uk": "переклад українською", "en": "переклад англійською", "ru": "переклад російською", ` +
        `"ex_no": "приклад речення мовою вивчення (мінімум 4 слова, містить це слово)", ` +
        `"ex_uk": "переклад прикладу українською", "en_ex": "переклад прикладу англійською", "ru_ex": "переклад прикладу російською"}, ...] ` +
        // Той самий фікс, що й у generateStarterVocab (languages.js): якщо
        // серед "наявних тем у словнику" вище є підходяща — використовуй її
        // ТОЧНО в такому написанні (з великої літери), а не вигадуй нову чи
        // не пиши з малої — інакше на сторінці карток з'являється ще одна
        // непотрібна кнопка теми без перекладу.
        (topics.length ? `Тему намагайся обирати серед уже наявних тем у словнику (список вище), точно повторюючи написання з великої літери. ` : '') +
        `Поле "t" завжди пиши з великої літери, короткою назвою з 1-2 слів.`;
    const sys = `Ти генеруєш нові слова для словника вивчення мови "${targetLangName}" ` +
        "(рівень CEFR A1-B2). Уважно дотримуйся списку слів, яких треба " +
        "уникати — це критично важливо, повторення дратують користувача. " +
        "Відповідай ЛИШЕ чистим JSON-масивом без жодного тексту навколо, " +
        "без markdown-огорожі.";
    const reply = await callAiRaw('gen_vocab', sys, userMsg, [], uiLang);
    return parseAiJson(reply);
}

// =====================================================================
//  АВТОМАТИЧНИЙ ВХІД
// =====================================================================
let autoLoginAttempts = 0;
const maxAutoLoginAttempts = 10;

function checkAutoLogin() {
    if (firebaseReady && firebaseAuth && firebaseAuth.currentUser) {
        const user = firebaseAuth.currentUser;
        firebaseUser = user;
        currentUser = user.email;
        isGuest = false;
        loadFromFirestore(user.uid).then(() => {
            if (!STATE) {
                STATE = ensureStateDefaults({
                    name: user.email.split('@')[0],
                    level: 'A1',
                    levelTestDone: false,
                    srs: {},
                    stats: { wordsSeen: {}, testsCompleted: 0, sessionCount: 0, activityDates: [], bestStreak: 0 },
                    settings: { goal: "", reminderTime: "18:00", pace: "steady" },
                    leaderboardScore: 0,
                    customWords: [],
                    streak: 0,
                    xp: 0,
                    achievements: [],
                    trollGear: { equipped: { hat: null, glasses: null, bg: null }, unlocked: [] },
                    lessonsDone: [],
                });
            }
            saveSession(currentUser, false);
            document.getElementById('authPage').style.display = 'none';
            document.getElementById('app').classList.add('active');
            initAssistantWidget();
            navigate('home');
        });
        return true;
    }
    return false;
}

function tryAutoLogin() {
    if (checkAutoLogin()) return;
    if (++autoLoginAttempts < maxAutoLoginAttempts) {
        setTimeout(tryAutoLogin, 500);
    }
}

setTimeout(tryAutoLogin, 500);

// =====================================================================
//  ВІДЖЕТ AI-ПОМІЧНИКА (плаваюча панель)
// =====================================================================
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

    function showTyping() {
        const row = el(`<div class="chat-row bot" id="chatTypingRow"></div>`);
        row.appendChild(el(`<div class="chat-avatar">${avatarHtml()}</div>`));
        row.appendChild(el(`<div class="chat-bubble"><span class="chat-typing"><span></span><span></span><span></span></span></div>`));
        log.appendChild(row);
        scrollToBottom();
    }
    function hideTyping() {
        const row = log.querySelector('#chatTypingRow');
        if (row) row.remove();
    }

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
            let msg;
            if (e && e.code === 'NOT_CONFIGURED') {
                msg = 'Тролль ще спить 💤 — власник сайту ще не підключив AI-проксі (AI_PROXY_URL порожній у коді сторінки).';
            } else if (e && e.code === 'NETWORK_ERROR') {
                msg = 'Не вдалося достукатись до проксі-сервера (CORS, невірний URL або Worker не працює). ' +
                      'Деталі — у консолі браузера (F12 → Console).';
            } else if (e && e.code === 'PROXY_ERROR') {
                if (e.status === 500) {
                    msg = 'Проксі відповів помилкою 500 — схоже, на Worker\'і не задано секрет GEMINI_API_KEY.';
                } else if (e.status === 401 || e.status === 403) {
                    msg = 'Проксі відповів помилкою ' + e.status + ' — Google API-ключ, схоже, недійсний або обмежений.';
                } else if (e.status === 429) {
                    msg = 'Досягнуто безкоштовного ліміту запитів Gemini (429). Спробуй трохи пізніше.';
                } else if (e.status === 502) {
                    msg = 'Google Gemini зараз недоступний або сталася несподівана помилка на сервері. Деталі — у консолі браузера (F12).';
                } else {
                    msg = 'Проксі відповів помилкою ' + e.status + '. Деталі — у консолі браузера (F12 → Console).';
                }
            } else {
                msg = 'Ой, тролль спіткнувся об камінь і не зміг відповісти. Деталі — у консолі браузера (F12 → Console).';
            }
            const errMsg = { role: 'model', text: msg, error: true, ts: Date.now() };
            renderMessage(errMsg);
            scrollToBottom();
        } finally {
            sendBtn.disabled = false;
        }
    }

    sendBtn.onclick = () => send();
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    });
    input.addEventListener('input', () => {
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    });

    document.querySelectorAll('#chatSuggest .chat-suggest-chip').forEach(chip => {
        chip.onclick = () => {
            input.value = chip.dataset.q;
            input.focus();
        };
    });

    if (clearBtn) {
        clearBtn.onclick = () => {
            STATE.assistantChat = [];
            updateState();
            renderAll();
        };
    }

    function openAssistantPanel() {
        renderAll();
        updateFabAvatar();
        panel.classList.add('open');
        overlay.classList.add('open');
        document.body.classList.add('assistant-open');
        setTimeout(() => input.focus(), 260);
    }
    function closeAssistantPanel() {
        panel.classList.remove('open');
        overlay.classList.remove('open');
        document.body.classList.remove('assistant-open');
    }

    fab.onclick = openAssistantPanel;
    if (closeBtn) closeBtn.onclick = closeAssistantPanel;
    if (overlay) overlay.onclick = closeAssistantPanel;
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('open')) closeAssistantPanel();
    });

    window.openAssistantPanel = openAssistantPanel;
    window.closeAssistantPanel = closeAssistantPanel;
}