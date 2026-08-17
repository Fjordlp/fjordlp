// =====================================================================
//  ІЗОЛЯЦІЯ ДАНИХ ПО МОВАХ
// =====================================================================
// Раніше xp/level/streak/achievements/stats/leaderboardScore/
// customWords/customNorskTasks зберігались ПРЯМО в STATE — тобто
// одне спільне число XP і один спільний рівень на ВСІ мови одразу.
// Перемкнувся з норвезької на іспанську — і рівень B1, набутий
// роками норвезької, раптом "застосовується" до іспанської, яку
// щойно почав. Тепер кожна мова має власний ізольований набір цих
// полів у STATE.langData[код_мови]. uiLang/vocabLang/targetLang,
// trollGear (косметика тролля — спільна нагорода на весь акаунт) та
// словникові кеші (generatedVocab/generatedTasks/wordTranslations —
// вони й раніше були ключовані по мові всередині) лишаються
// спільними, як і були.
function defaultLangData() {
    return {
        xp: 0,
        level: 'A1',
        levelTestDone: false,
        streak: 0,
        streakFreezes: 0,
        achievements: [],
        lessonsDone: [],
        stats: { wordsSeen: {}, testsCompleted: 0, sessionCount: 0, activityDates: [], bestStreak: 0 },
        leaderboardScore: 0,
        customWords: [],
        customNorskTasks: {},
        // srs: дані інтервального повторення (SRS) по кожному слову —
        // ключ = "рівень|слово" БЕЗ коду мови (wordKey() у helpers.js
        // його не додає), тож без ізоляції по мові однакові ключі з
        // різних мов могли б перезаписувати одне одного. Тепер кожна
        // мова має власний, окремий об'єкт srs.
        srs: {},
        // booksProgress: прогрес читання книг для ЦІЄЇ мови навчання —
        // { [bookId]: { chaptersRead: [idx,...], taskScores: { [chapterIdx]: {correct,total} } } }.
        // Ізольовано по мові з тієї ж причини, що й усе інше тут:
        // прочитана норвезька книга не повинна позначатись як
        // "прочитана" для іспанської.
        booksProgress: {},
    };
}

// LD() ("Language Data") — головна точка доступу до даних поточної
// (або вказаної) мови навчання. Завжди повертає ЖИВЕ посилання на
// об'єкт всередині STATE.langData, тож і читання (LD().xp), і запис
// (LD().xp = 5, LD().stats.testsCompleted++) працюють природно.
function LD(lang) {
    if (!STATE) return defaultLangData();
    lang = lang || STATE.targetLang || 'no';
    if (!STATE.langData || typeof STATE.langData !== 'object') STATE.langData = {};
    if (!STATE.langData[lang]) STATE.langData[lang] = defaultLangData();
    // Захист для користувачів, чиї дані для цієї мови вже існували ДО
    // появи booksProgress (чи будь-якого іншого нового поля в
    // майбутньому) — без цього LD().booksProgress[bookId] впав би з
    // "Cannot read properties of undefined".
    if (!STATE.langData[lang].booksProgress || typeof STATE.langData[lang].booksProgress !== 'object') {
        STATE.langData[lang].booksProgress = {};
    }
    return STATE.langData[lang];
}

// Одноразова міграція: якщо в STATE ще лежать старі плоскі поля
// (з часів "одна мова — один набір даних") і для поточної мови ще
// немає запису в langData — переносимо їх туди один раз, щоб ніхто
// не втратив накопичений прогрес при оновленні сайту.
function migrateLegacyLangFields(state) {
    const lang = state.targetLang || 'no';
    if (!state.langData || typeof state.langData !== 'object') state.langData = {};
    const legacyKeys = ['xp', 'level', 'levelTestDone', 'streak', 'streakFreezes', 'achievements', 'lessonsDone', 'stats', 'leaderboardScore', 'customWords', 'customNorskTasks', 'srs'];
    const hasLegacy = legacyKeys.some(k => state[k] !== undefined);
    if (hasLegacy && !state.langData[lang]) {
        const migrated = defaultLangData();
        legacyKeys.forEach(k => { if (state[k] !== undefined) migrated[k] = state[k]; });
        state.langData[lang] = migrated;
    }
    // Старі поля більше не читаються кодом (усе йде через LD()), але
    // лишаємо їх у сторонньому JSON ще якийсь час — не видаляємо,
    // щоб не зламати відкат на попередню версію сайту.
}

const USERS_KEY = 'fjord_users';
const GUEST_KEY = 'fjord_guest';

function getUsers() { try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; } catch { return {}; } }
function saveUsers(u) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }

function getGuestState() {
    try { const raw = localStorage.getItem(GUEST_KEY); if (raw) { const d = JSON.parse(raw); return ensureStateDefaults(d); } } catch { }
    return null;
}

function saveGuestState(state) {
    localStorage.setItem(GUEST_KEY, JSON.stringify(state));
}

// ---- Нова глобальна функція для перевірки наявності даних ----
function hasExistingData(state) {
    if (!state) state = STATE;
    if (!state) return false;
    // Перевіряємо langData – це головне сховище прогресу по мовах
    if (state.langData && typeof state.langData === 'object') {
        for (const lang in state.langData) {
            const data = state.langData[lang];
            if (data) {
                if (data.xp > 0) return true;
                if (data.stats && data.stats.wordsSeen && Object.keys(data.stats.wordsSeen).length > 0) return true;
                if (data.stats && data.stats.testsCompleted > 0) return true;
                if (data.customWords && data.customWords.length > 0) return true;
                if (data.srs && Object.keys(data.srs).length > 0) return true;
                if (data.stats && data.stats.activityDates && data.stats.activityDates.length > 0) return true;
            }
        }
    }
    // Перевіряємо плоскі поля (старі дані)
    if (state.xp > 0) return true;
    if (state.stats && state.stats.wordsSeen && Object.keys(state.stats.wordsSeen).length > 0) return true;
    if (state.stats && state.stats.testsCompleted > 0) return true;
    if (state.customWords && state.customWords.length > 0) return true;
    if (state._onboardingDone) return true;
    if (state._targetLangChosen) return true;
    if (state.targetLang && state.targetLang !== 'no') return true;
    return false;
}

function ensureStateDefaults(state) {
    if (!state) return state;
    if (typeof state.xp !== 'number') state.xp = 0;
    if (!Array.isArray(state.achievements)) state.achievements = [];
    if (!state.trollGear) state.trollGear = { equipped: { hat: null, glasses: null, bg: null }, unlocked: [] };
    if (!state.trollGear.equipped) state.trollGear.equipped = { hat: null, glasses: null, bg: null };
    if (!Array.isArray(state.trollGear.unlocked)) state.trollGear.unlocked = [];
    if (!Array.isArray(state.lessonsDone)) state.lessonsDone = [];
    if (!state.stats) state.stats = { wordsSeen: {}, testsCompleted: 0, sessionCount: 0, activityDates: [], bestStreak: 0 };
    if (typeof state.streak !== 'number') state.streak = 0;
    if (typeof state.leaderboardScore !== 'number') state.leaderboardScore = 0;
    if (!Array.isArray(state.assistantChat)) state.assistantChat = [];
    if (!Array.isArray(state.customWords)) state.customWords = [];
    if (!state.customNorskTasks || typeof state.customNorskTasks !== 'object') state.customNorskTasks = {};
    if (!state.uiLang) {
        let stored = 'uk';
        try { stored = localStorage.getItem('fjord_ui_lang') || 'uk'; } catch (e) { /* ignore */ }
        state.uiLang = stored;
    }
    if (!state.vocabLang) state.vocabLang = state.uiLang;
    if (!state.targetLang) state.targetLang = 'no';
    
    // 🔥 ВАЖЛИВО: Визначаємо, чи користувач вже існує (має дані)
    // Використовуємо глобальну функцію hasExistingData
    if (hasExistingData(state)) {
        state._onboardingDone = true;
        state._targetLangChosen = true;
    }

    // Якщо вибрано мову, але _onboardingDone ще не встановлено – встановлюємо
    if (state._targetLangChosen && !state._onboardingDone) {
        state._onboardingDone = true;
    }

    // Новий обов'язковий екран вибору мови вивчення (усі 30 мов, до
    // онбордингу) не повинен раптово "вискакувати" перед людьми, які
    // вже давно користуються застосунком і вже мають налаштовану
    // мову — інакше це виглядало б як баг, а не нова фіча. Тому
    // "прощаємо" (позначаємо як уже вибрану) усіх, хто вже пройшов
    // онбординг раніше АБО чий STATE взагалі вже існував до появи
    // цього поля (typeof undefined тут і є ознакою "стан був
    // збережений раніше, просто без цього конкретного прапорця").
    if (typeof state._targetLangChosen === 'undefined') {
        state._targetLangChosen = !!state._onboardingDone || Object.keys(state.langData || {}).length > 0;
    }
    if (!state.generatedVocab || typeof state.generatedVocab !== 'object') state.generatedVocab = {};
    if (!state.generatedGrammar || typeof state.generatedGrammar !== 'object') state.generatedGrammar = {};
    if (!state.generatedTasks || typeof state.generatedTasks !== 'object') state.generatedTasks = {};
    if (!state.wordTranslations || typeof state.wordTranslations !== 'object') state.wordTranslations = {};
    if (typeof state.admin !== 'boolean') state.admin = false;
    if (!state.langData || typeof state.langData !== 'object') state.langData = {};
    migrateLegacyLangFields(state);
    
    return state;
}

function getUserData(login) { const u = getUsers(); return u[login] ? ensureStateDefaults(u[login]) : null; }

function saveUserData(login, data) {
    const u = getUsers();
    if (!u[login]) return false;
    u[login] = data;
    saveUsers(u);
    return true;
}

let currentUser = null;
let STATE = null;
let isGuest = false;

function loadSession() {
    const saved = localStorage.getItem('fjord_session');
    if (saved) {
        try {
            const { login, guest } = JSON.parse(saved);
            if (guest) {
                const gs = getGuestState();
                if (gs) {
                    currentUser = 'guest';
                    STATE = gs;
                    isGuest = true;
                    return { guest: true };
                }
                return false;
            }
            const data = getUserData(login);
            if (data) {
                currentUser = login;
                STATE = data;
                isGuest = false;
                return { guest: false };
            }
        } catch (e) { console.error('Session load error:', e); }
    }
    return false;
}

function saveSession(login, guest) {
    localStorage.setItem('fjord_session', JSON.stringify({ login, guest: !!guest }));
}

function clearSession() {
    localStorage.removeItem('fjord_session');
    currentUser = null;
    STATE = null;
    isGuest = false;
}

function updateState() {
    if (!STATE) return;
    if (isGuest) {
        saveGuestState(STATE);
    } else if (currentUser && currentUser !== 'guest') {
        saveUserData(currentUser, STATE);
        if (firebaseReady && firebaseUser) {
            saveToFirestore(firebaseUser.uid, STATE);
        }
    }
}

// ---- Нова функція для встановлення мови вивчення ----
function setTargetLanguage(lang) {
    if (!STATE) return;
    STATE.targetLang = lang;
    STATE._targetLangChosen = true;
    // Якщо ще немає langData для цієї мови – створюємо
    if (!STATE.langData) STATE.langData = {};
    if (!STATE.langData[lang]) STATE.langData[lang] = defaultLangData();
    updateState();
}
// Експортуємо для використання в інших файлах
window.setTargetLanguage = setTargetLanguage;
window.hasExistingData = hasExistingData;