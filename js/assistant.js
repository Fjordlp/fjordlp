// =====================================================================
//  AI-ПОМІЧНИК: система-промпт + запит до проксі (Cloudflare Worker →
//  Google Gemini), плюс плаваюча бічна панель чату (нижче), яка
//  "супроводжує" користувача на всіх вкладках застосунку.
// =====================================================================
// =====================================================================
//  AI ПОМІЧНИК – ЗАПИТ ДО ПРОКСІ (Cloudflare Worker → Google Gemini)
// =====================================================================
// Клієнт ніколи не звертається до Google напряму і ніколи не бачить
// жодного API-ключа: весь секрет живе тільки на боці Worker'а.
// Мова відповіді AI тепер підлаштовується під обрану мову інтерфейсу
// (STATE.uiLang), а не завжди українська — щоб при виборі English/Russian
// геть усе на сайті, включно з тролем-помічником, було цією мовою.
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
const AI_SYSTEM_PROMPT = "Ти — дружній тролль-помічник у застосунку Fjord " +
    "для вивчення норвезької мови. Відповідай українською (норвезькі " +
    "приклади можна давати норвезькою з перекладом). Допомагай пояснювати " +
    "граматику, слова, перекладати короткі фрази, складати приклади речень " +
    "і підказувати, як користуватись розділами застосунку (картки, словник, " +
    "тести, граматика). Пиши коротко, дружньо, по суті, можеш зрідка додати " +
    "легкий тролячий гумор, але без надмірностей. Форматування: це чат, " +
    "не документ, тому НЕ використовуй заголовки (#), нумеровані списки чи " +
    "таблиці. Дозволено лише **жирний текст** для ключових слів і списки " +
    "рядками, що починаються з «- ».";

// ЗМІНА БЕЗПЕКИ: клієнт більше не надсилає готовий текст system-промпту.
// Раніше payload.system повністю визначався в браузері — а отже, будь-хто,
// хто відкриє DevTools (або просто викличе AI_PROXY_URL напряму, minuvши
// сайт), міг підставити ЯКИЙ ЗАВГОДНО system-промпт і перетворити ваш
// Worker (і ваш API-ключ Gemini на ньому) на безкоштовний персональний
// AI-проксі для будь-кого. Тепер клієнт передає лише короткий "mode"
// (напр. 'chat' / 'writing_check' / 'gen_task' / 'gen_vocab'), а сам
// текст системного промпту для кожного mode має жити ТІЛЬКИ на боці
// Worker'а (див. worker-hardened-example.js) — це і є справжній захист,
// його треба задеплоїти окремо, з боку сервера.
// ВИПРАВЛЕННЯ: попередня версія надсилала ТІЛЬКИ "mode", припускаючи, що
// на Worker'і вже задеплоєна посилена версія з фіксованими промптами
// (worker-hardened-example.js). Але цей файл — лише приклад/шаблон, який
// ви ще не задеплоїли на реальний Cloudflare Worker. Тому ваш СПРАВЖНІЙ
// Worker і далі очікує старий контракт {system, message, history} — а
// отримував undefined замість system, тому AI переставав відповідати
// нормально. Тепер надсилаємо ОБИДВА поля: "system" (повний текст
// промпту — працює з вашим поточним Worker'ом просто зараз) і "mode"
// (коротка назва — запрацює автоматично, якщо/коли ви таки задеплоїте
// посилений Worker, який ігнорує "system" і сам вибирає промпт за mode).
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
        lang: lang || 'uk', // Додаємо мову
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
        // Типово: CORS-блок, неправильний URL, Worker недоступний, немає інтернету
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
// Примітка: текст нижче (AI_WRITING_CHECK_PROMPT) більше НЕ надсилається
// клієнтом як system-промпт — він лишається тут лише як довідковий текст,
// який потрібно скопіювати у відповідний "mode" на боці Worker'а (див.
// worker-hardened-example.js, SYSTEM_PROMPTS.writing_check).
function buildWritingCheckPrompt() {
    return "Ти — досвідчений сенсор (екзаменатор), який перевіряє письмові роботи " +
        "кандидатів на іспиті Norskprøve (HK-dir, рівні A1–B2). Тобі надсилають " +
        "рівень, тему завдання і текст, який написав студент норвезькою. " +
        "Твоя відповідь — " + aiResponseLangName() + ", чат-формат (без заголовків #, без " +
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
const AI_WRITING_CHECK_PROMPT =
    "Ти — досвідчений сенсор (екзаменатор), який перевіряє письмові роботи " +
    "кандидатів на іспиті Norskprøve (HK-dir, рівні A1–B2). Тобі надсилають " +
    "рівень, тему завдання і текст, який написав студент норвезькою. " +
    "Твоя відповідь — українською мовою, чат-формат (без заголовків #, без " +
    "нумерованих списків чи таблиць, можна **жирний текст** і списки рядками " +
    "з «- »). Структуруй відповідь так: спочатку коротко (1 речення), чи " +
    "текст відповідає рівню і темі; далі **Помилки та виправлення** — " +
    "перелічи ключові граматичні/лексичні помилки, для кожної покажи " +
    "оригінал → виправлення норвезькою; далі **Що покращити** — 2-4 " +
    "конкретні поради (структура, зв'язність, різноманітність лексики, " +
    "довжина речень) з урахуванням вимог рівня Norskprøve; наприкінці — " +
    "коротке підбадьорення. Будь чесним і конкретним, але доброзичливим, " +
    "як справжній тролль-репетитор.";

async function checkWritingWithAI(level, topic, taskPrompt, studentText) {
    const lang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    const userMsg = `Рівень: ${level}\nТема завдання: ${topic || ''}\nФормулювання завдання: ${taskPrompt || ''}\n\nТекст студента норвезькою:\n"""${studentText}"""`;
    return callAiRaw('writing_check', buildWritingCheckPrompt(), userMsg, [], lang);
}

// =====================================================================
//  AI-ГЕНЕРАЦІЯ НОВОГО КОНТЕНТУ (завдання Norskprøve, нові слова)
// =====================================================================
// Обидві функції просять AI повернути ЛИШЕ JSON (без markdown-огорожі,
// без пояснень) і потім акуратно парсять відповідь, знімаючи можливі
// ```json огорожі, якщо модель все ж їх додала.
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
    const reply = await callAiRaw('gen_task', sys, userMsg, []);
    return parseAiJson(reply);
}

// Дуже легкий і безпечний рендер маркдауну від AI (спільний для бічної
// панелі чату і для інших місць, де показуємо відповідь AI, наприклад
// перевірку письмової роботи у Norskprøve Academy).
function escapeHtmlGlobal(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

async function generateVocabWordsAI(level, existingTopics) {
    const userMsg =
        `Рівень: ${level}. Наявні теми у словнику: ${(existingTopics || []).join(', ') || 'немає даних'}. ` +
        `Згенеруй 5 нових корисних слів норвезької мови для цього рівня (уникай базових слів з рівня A1, якщо рівень вищий). ` +
        `Формат масиву: [{"t": "тема українською (наприклад Їжа, Транспорт)", "no": "слово норвезькою", "uk": "переклад українською", "ex_no": "приклад речення норвезькою (мінімум 4 слова, містить це слово)", "ex_uk": "переклад прикладу"}, ...]`;
    const sys = "Ти генеруєш нові слова для словника вивчення норвезької мови " +
        "(рівень CEFR A1-B2). Відповідай ЛИШЕ чистим JSON-масивом без " +
        "жодного тексту навколо, без markdown-огорожі.";
    const reply = await callAiRaw('gen_vocab', sys, userMsg, []);
    return parseAiJson(reply);
}

// Перевіряємо, чи вже є авторизований користувач (з повторними спробами)
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

// Спроба автоматичного входу з повтореннями
function tryAutoLogin() {
  if (checkAutoLogin()) return;
  if (++autoLoginAttempts < maxAutoLoginAttempts) {
    setTimeout(tryAutoLogin, 500);
  }
}

// Запускаємо перевірку одразу (DOMContentLoaded уже відбувся на момент виконання
// цього скрипта, оскільки він розташований у кінці <body>)
setTimeout(tryAutoLogin, 500);


// =====================================================================
//  AI ПОМІЧНИК – ПЛАВАЮЧА БІЧНА ПАНЕЛЬ (доступна з будь-якої вкладки)
// =====================================================================
// Раніше "Помічник" був окремим пунктом меню/маршрутом (viewAssistant()),
// тобто клік по ньому повністю перемальовував <main>. Тепер це не так:
// панель одного разу будується у DOM (розмітка — у index.html, кнопка-
// "пухир" (FAB) та сама панель), а ця функція лише "озброює" її
// обробниками подій. Після цього панель відкривається/закривається
// поверх ПОТОЧНОЇ вкладки, не чіпаючи навігацію (ROUTE/SUBSTATE) — тобто
// помічник справді "супроводжує" користувача на будь-якому екрані.
let _assistantWidgetReady = false;
let _assistantRenderAll = null;

function initAssistantWidget() {
    if (_assistantWidgetReady) {
        // Віджет уже зібраний (наприклад, повторний виклик після ще одного
        // логіну в тій самій сесії) — просто освіжаємо історію чату.
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
    if (!fab || !panel || !log || !input || !sendBtn) return; // розмітки ще нема

    _assistantWidgetReady = true;
    ensureStateDefaults(STATE);

    function equippedNow() {
        ensureStateDefaults(STATE);
        return (STATE.trollGear && STATE.trollGear.equipped) || { hat: null, glasses: null, bg: null };
    }
    function avatarHtml() {
        return trollSVG('idle', 36, equippedNow());
    }

    // Кнопка-"пухир" (FAB) теж має бути тролем, а не роботом — і одягненим
    // так само, як у вкладці "Тролль" (капелюх/окуляри/фон, якщо обрані).
    const fabAvatar = document.getElementById('assistantFabAvatar');
    function updateFabAvatar() {
        if (fabAvatar) fabAvatar.innerHTML = trollSVG('happy', 46, equippedNow());
    }
    updateFabAvatar();

    function scrollToBottom() {
        log.scrollTop = log.scrollHeight;
    }

    // Легкий і безпечний рендер маркдауну від AI — спільна функція
    // (renderLiteMarkdownGlobal), визначена вище у цьому файлі.
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
            // Помилки не зберігаємо в історію, щоб не засмічувати контекст наступних запитів
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

    // ---- Відкриття/закриття панелі (не є навігацією! ROUTE не змінюється) ----
    function openAssistantPanel() {
        renderAll(); // освіжаємо (аватар тролля міг змінитись у вкладці "Тролль")
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

    // Доступно ззовні (наприклад, кнопка "Запитати тролля" деінде в застосунку)
    window.openAssistantPanel = openAssistantPanel;
    window.closeAssistantPanel = closeAssistantPanel;
}