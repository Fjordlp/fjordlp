// =====================================================================
//  ROUTER + RENDER
//  Примітка: AI-помічник більше НЕ є окремим маршрутом — він живе у
//  плаваючій бічній панелі (js/assistant.js) і доступний з будь-якої
//  вкладки через кнопку-"пухир" (FAB) у правому нижньому куті.
// =====================================================================

// =====================================================================
//  ROUTER
// =====================================================================
let ROUTE = "home";
let SUBSTATE = {};

// ---------------------------------------------------------------------
//  СПРАВЖНІ URL (History API)
// ---------------------------------------------------------------------
// Маршрути, які отримують власний, "справжній" шлях в адресному рядку
// (саме ці — і жодні інші — перелічені в sitemap.xml). Дочірні/сесійні
// екрани (сесія флеш-карток, конкретне питання тесту, читання книги чи
// уроку, адмін-підпанелі) НЕ отримують власного шляху: їхній стан
// (SUBSTATE) зазвичай містить одноразові, невідновлювані на льоту дані
// (наприклад, вже перемішану колоду карток чи згенеровані AI-задачі), а
// не щось, що є сенс зберігати в закладці чи ділитись посиланням. Вони
// все одно потрапляють в історію браузера (щоб "Назад" з них працював),
// просто видимий шлях лишається на "батьківському" маршруті.
const ROUTE_PATHS = {
    'home': '/',
    'alphabet': '/alphabet',
    'flashcards': '/flashcards',
    'vocabulary': '/vocabulary',
    'tests': '/tests',
    'grammar': '/grammar',
    'troll': '/troll',
    'books': '/books',
    'lessons': '/lessons',
    'story': '/story',
    'profile': '/profile',
    'onboarding': '/onboarding',
    // Екрани рівня: власний шлях потрібен, щоб працювало /<мова>/leveltest.
    // Їхній стан (SUBSTATE) будується "ліниво" самим view, тож пряме
    // відкриття/перезавантаження цих URL безпечне.
    'levels': '/levels',
    'leveltest': '/leveltest',
    'test-history': '/test-history',
    'choose-language': '/choose-language',
    'norskprove': '/norskprove',
    'tournaments': '/tournaments',
    'admin': '/admin',
};
const PATH_TO_ROUTE = Object.keys(ROUTE_PATHS).reduce((acc, r) => {
    acc[ROUTE_PATHS[r]] = r;
    return acc;
}, {});

// ---------------------------------------------------------------------
//  ЛОКАЛІЗОВАНІ URL:  /<код-мови>  і  /<код-мови>/<маршрут>
// ---------------------------------------------------------------------
// Перший сегмент шляху — це ЗАВЖДИ мова навчання (STATE.targetLang):
//   /no            → головна норвезької        /fr/vocabulary → словник французької
// Джерело правди про підтримувані коди — реєстр LANGUAGES (js/languages.js);
// окремого списку тут немає. Усередині застосунку шлях завжди будується
// через buildLangPath(), тож жоден navigate() не може "загубити" префікс.
//
// Правила розбору (parseAppPath) і запасні варіанти (fallbackLang):
//   1. /<підтримувана-мова>[/<маршрут>] → мова береться з URL і стає
//      STATE.targetLang (явний вибір користувача: посилання, закладка, F5).
//   2. /<маршрут> без префікса (старі посилання на кшталт /vocabulary) і
//      / → мова береться з fallbackLang(): збережена мова, інакше DEFAULT_LANG;
//      URL замінюється (replaceState) на /<мова>/<маршрут>.
//   3. /<непідтримуваний-код>[/<маршрут>] (напр. /xx) → так само, як у п.2.
//   4. /<мова>/<невідомий-маршрут> → /<мова> (головна).
const DEFAULT_LANG = (typeof LANGUAGES !== 'undefined' && LANGUAGES[0] && LANGUAGES[0].code) || 'no';
const SITE_ORIGIN = 'https://fjordlp.com';

// Мова, яку URL отримав НЕ від користувача, а від redirect (/ → /no): після
// такого redirect адресний рядок уже виглядає як "явний" /no, але це лише
// припущення — вибір мови для нового користувача ще не зроблено. Тому
// applyUrlLanguageToState() не вважає цю мову обраною, доки користувач сам її
// не вибере (setTargetLanguage / fjordSetUrlLanguage скидають прапорець).
let _implicitUrlLang = null;

// Маршрути, які мають сенс для БУДЬ-ЯКОЇ мови: після перемикання мови
// лишаємось на цій же вкладці. Решта (онбординг, адмінка, Norskprøve —
// лише норвезька, сесії тестів/карток з одноразовим станом) → головна.
const SWITCH_KEEP_ROUTES = ['home', 'alphabet', 'flashcards', 'vocabulary', 'tests', 'grammar',
    'books', 'lessons', 'story', 'troll', 'profile', 'tournaments', 'levels', 'test-history'];

function isSupportedLang(code) {
    return typeof code === 'string' && LANGUAGES.some(l => l.code === code);
}

// Збережена мова ДО того, як є STATE (на старті сторінки): окремий ключ
// localStorage (пишеться при кожній зміні мови), далі — гостьовий стан.
function getSavedLang() {
    try {
        const c = localStorage.getItem('fjord_target_lang');
        if (isSupportedLang(c)) return c;
    } catch (e) { /* ignore */ }
    try {
        const g = JSON.parse(localStorage.getItem('fjord_guest') || 'null');
        if (g && isSupportedLang(g.targetLang)) return g.targetLang;
    } catch (e) { /* ignore */ }
    return null;
}

// Мова для випадків, коли URL її явно не задає (див. правила 2-3 вище).
function fallbackLang() {
    if (typeof STATE !== 'undefined' && STATE && STATE._targetLangChosen && isSupportedLang(STATE.targetLang)) {
        return STATE.targetLang;
    }
    return getSavedLang() || DEFAULT_LANG;
}

// Розбирає pathname → { lang, explicit, route, restPath }.
//  lang     — код мови з URL (лише якщо explicit)
//  route    — ім'я маршруту застосунку або null, якщо шлях невідомий
function parseAppPath(pathname) {
    const segs = (pathname || '/').split('/').filter(Boolean);
    const first = segs[0] ? segs[0].toLowerCase() : '';
    if (isSupportedLang(first)) {
        const restPath = '/' + segs.slice(1).join('/');
        return { lang: first, explicit: true, route: PATH_TO_ROUTE[restPath] || null, restPath };
    }
    const whole = '/' + segs.join('/');
    if (PATH_TO_ROUTE[whole]) { // старе посилання без префікса: /vocabulary, або /
        return { lang: null, explicit: false, route: PATH_TO_ROUTE[whole], restPath: whole };
    }
    const tail = '/' + segs.slice(1).join('/');
    if (/^[a-z]{2,3}$/.test(first) && PATH_TO_ROUTE[tail]) { // /xx/vocabulary
        return { lang: null, explicit: false, route: PATH_TO_ROUTE[tail], restPath: tail };
    }
    return { lang: null, explicit: false, route: null, restPath: '/' };
}

// /<мова> для головної, /<мова>/<шлях маршруту> для решти. Для дочірніх
// екранів без власного шляху береться шлях "батька" (див. pathForRoute).
function buildLangPath(lang, route) {
    const base = pathForRoute(route) || parseAppPath(location.pathname).restPath;
    return '/' + lang + (base && base !== '/' ? base : '');
}

// Узгоджує <html lang>, canonical та og:url з поточним URL і мовою навчання.
function syncDocumentToLocation(lang) {
    const code = lang || ((typeof STATE !== 'undefined' && STATE && isSupportedLang(STATE.targetLang)) ? STATE.targetLang : null);
    if (code) document.documentElement.lang = code;
    const canonical = SITE_ORIGIN + location.pathname;
    const link = document.querySelector('link[rel="canonical"]');
    if (link) link.setAttribute('href', canonical);
    const og = document.querySelector('meta[property="og:url"]');
    if (og) og.setAttribute('content', canonical);
}

// Єдине місце, де змінюється мова навчання: STATE + localStorage + сховище.
function setTargetLanguage(code) {
    _implicitUrlLang = null; // явний вибір користувача
    if (!isSupportedLang(code) || typeof STATE === 'undefined' || !STATE) return false;
    const changed = STATE.targetLang !== code || !STATE._targetLangChosen;
    STATE.targetLang = code;
    STATE._targetLangChosen = true;
    try { localStorage.setItem('fjord_target_lang', code); } catch (e) { /* ignore */ }
    if (changed) updateState();
    return changed;
}

// Перемикання мови з UI (вибір мови, налаштування, перемикач у шапці):
// міняє мову і через navigate() додає запис в історію з /<нова-мова>/...
// Без перезавантаження сторінки.
function switchTargetLanguage(code, opts) {
    if (!isSupportedLang(code)) return false;
    setTargetLanguage(code);
    navigate(routeAfterLanguageSwitch(opts && opts.route));
    return true;
}
function routeAfterLanguageSwitch(route) {
    return route && SWITCH_KEEP_ROUTES.includes(route) ? route : 'home';
}

// Викликається з getInitialRoute() (js/auth.js) одразу після появи STATE:
// явна мова з URL перемагає збережену; без явної — лишається збережена.
function applyUrlLanguageToState() {
    if (typeof STATE === 'undefined' || !STATE) return;
    const loc = parseAppPath(location.pathname);
    if (loc.explicit && loc.lang !== _implicitUrlLang) setTargetLanguage(loc.lang);
    else if (!isSupportedLang(STATE.targetLang)) STATE.targetLang = DEFAULT_LANG;
}

// Індикатор поточної мови навчання в шапці (кнопка відкриває вибір мови).
function updateTargetLangBadge() {
    const btn = document.getElementById('targetLangBtn');
    if (!btn || typeof STATE === 'undefined' || !STATE) return;
    const l = getLanguage(STATE.targetLang);
    const name = l.name[STATE.uiLang] || l.name.uk;
    btn.textContent = `${l.flag} ${l.code.toUpperCase()}`;
    btn.title = name;
    btn.setAttribute('aria-label', `${t('field_learn_lang')}: ${name}`);
    btn.onclick = () => {
        if (ROUTE !== 'choose-language') navigate('choose-language', { switchMode: true, returnRoute: ROUTE });
    };
}

// Вибір мови на стартовому екрані (inline-скрипт у index.html, ще до входу):
// лише оновлює адресний рядок через pushState — без перезавантаження.
window.fjordSetUrlLanguage = function (code) {
    if (!isSupportedLang(code)) return;
    _implicitUrlLang = null;
    history.pushState(null, '', '/' + code + location.search + location.hash);
    syncDocumentToLocation(code);
};

// Виконується один раз при завантаженні сторінки (до входу в акаунт):
// приводить адресний рядок до канонічного вигляду за правилами вище.
(function canonicalizeLocationOnLoad() {
    const loc = parseAppPath(location.pathname);
    let lang, target;
    if (loc.explicit) {
        lang = loc.lang;
        // Явна мова з URL стає збереженою: F5/нова вкладка/пряме посилання
        // залишаються на цій мові, а екран вибору мови пропускається.
        try {
            localStorage.setItem('fjord_target_lang', lang);
            localStorage.setItem('fjord_entry_done', '1');
        } catch (e) { /* ignore */ }
        const picker = document.getElementById('entryPicker');
        const authPage = document.getElementById('authPage');
        if (picker && authPage && picker.style.display !== 'none') {
            picker.style.display = 'none';
            authPage.style.display = 'flex';
        }
        target = loc.route ? buildLangPath(lang, loc.route) : '/' + lang; // /fr/foo → /fr
    } else {
        lang = fallbackLang();
        _implicitUrlLang = lang; // мову підставили ми, а не користувач
        target = buildLangPath(lang, loc.route || 'home');
    }
    if (location.pathname !== target) {
        // Query і hash зберігаємо як є (напр. ?ui=en, ?source=pwa).
        history.replaceState(null, '', target + location.search + location.hash);
    }
    syncDocumentToLocation(lang);
})();

// Для маршруту без власного шляху (напр. 'flashsession', 'test-mc',
// 'admin-words') шукаємо шлях "батька" з NAV_ROUTE_GROUPS (група
// підсвітки меню, куди він належить) — якщо не знайдено, лишаємось на
// поточному шляху як є.
function pathForRoute(route) {
    if (ROUTE_PATHS[route]) return ROUTE_PATHS[route];
    for (const parent in NAV_ROUTE_GROUPS) {
        if (NAV_ROUTE_GROUPS[parent].includes(route) && ROUTE_PATHS[parent]) {
            return ROUTE_PATHS[parent];
        }
    }
    return null;
}

// Визначає ROUTE із поточного location.pathname — використовується і
// при прямому/перезавантаженому заході на "справжній" URL (напр.
// /vocabulary в новій вкладці), і в обробнику popstate, коли для запису
// історії з якоїсь причини нема збереженого state (напр. користувач
// вручну ввів URL рядком і одразу тиснув "Назад").
function routeFromLocation() {
    return parseAppPath(location.pathname).route;
}

// Перший виклик navigate() після завантаження застосунку (вхід/гість/
// відновлення сесії) не повинен додавати новий запис в історію поверх
// того, який браузер і так створив при відкритті сторінки — лише
// прив'язує до НЬОГО правильні route/sub. Скидається на false при виході
// з акаунта, щоб наступний вхід знову коректно "проініціалізував" запис.
let _historyInitialized = false;

function navigate(route, sub, opts) {
    opts = opts || {};
    const routeChanged = route !== ROUTE;
    ROUTE = route;
    SUBSTATE = sub || {};
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Викликано з обробника popstate (Назад/Вперед) — адресний рядок уже
    // правильний, історію чіпати не треба, інакше зациклимось.
    if (!opts.fromPopState) {
        // Шлях завжди з префіксом поточної мови навчання: /<мова>/<маршрут>.
        const lang = isSupportedLang(STATE && STATE.targetLang) ? STATE.targetLang : fallbackLang();
        const path = buildLangPath(lang, route);
        const historyState = { route: route, sub: SUBSTATE, lang: lang };

        if (!_historyInitialized) {
            // Перший виклик: query/hash з посилання (?ui=en тощо) лишаються.
            history.replaceState(historyState, '', path + location.search + location.hash);
            _historyInitialized = true;
        } else if (routeChanged || path !== location.pathname) {
            // Справжня зміна сторінки АБО мови — новий запис в історії.
            history.pushState(historyState, '', path);
        } else {
            // Той самий ROUTE і та сама мова, лише оновлені дані (наступна
            // картка/питання) — НЕ нова "сторінка", тож без нового запису.
            history.replaceState(historyState, '', path);
        }
    }
    syncDocumentToLocation();
}

// ---- Кнопки "Назад"/"Вперед" браузера ----
window.addEventListener('popstate', (e) => {
    const app = document.getElementById('app');
    // До входу (застосунок ще не активний) реальної маршрутизації нема —
    // ігноруємо, щоб не викликати render() у порожнечу.
    if (!app || !app.classList.contains('active')) return;

    // Адресний рядок — джерело правди про мову: Назад/Вперед між /no/... і
    // /fr/... змінює й STATE.targetLang (і зберігає її).
    const loc = parseAppPath(location.pathname);
    if (loc.explicit) {
        setTargetLanguage(loc.lang);
    } else {
        // Запис історії без префікса (не наш) — виправляємо на місці.
        const lang = isSupportedLang(STATE.targetLang) ? STATE.targetLang : fallbackLang();
        history.replaceState(null, '', buildLangPath(lang, loc.route || 'home') + location.search + location.hash);
    }

    const state = e.state;
    if (state && state.route && (!loc.explicit || !state.lang || state.lang === loc.lang)) {
        navigate(state.route, state.sub, { fromPopState: true });
    } else {
        // Немає прив'язаного state (напр. запис створено до першого
        // navigate(), або вручну введено URL) — маршрут беремо зі шляху.
        navigate(loc.route || 'home', {}, { fromPopState: true });
    }
});

// =====================================================================
//  RENDER
// =====================================================================
function render() {
    const main = document.getElementById('mainContent');
    main.innerHTML = '';
    main.appendChild(renderView());
    updateNav();
    updateTargetLangBadge();
    document.getElementById('userNameDisplay').textContent = STATE.name && !isDefaultGuestName(STATE.name) ? STATE.name : (currentUser === 'guest' ? t('default_guest_name') : currentUser);
    
    // Деякі адмін-сторінки потребують ініціалізації після рендерингу
    // (їхні view-функції повертають рядок HTML, а не DOM-елемент із вже
    // прив'язаними обробниками, тож завантаження списків і кнопки
    // прив'язуються тут, коли розмітка вже реально в DOM).
    if (ROUTE === 'admin-vocab-gen' && typeof initAdminSharedVocab === 'function') {
        initAdminSharedVocab();
    }
    if (ROUTE === 'admin-grammar-gen' && typeof initAdminSharedGrammar === 'function') {
        initAdminSharedGrammar();
    }
    if (ROUTE === 'admin-alphabet-gen' && typeof initAdminSharedAlphabet === 'function') {
        initAdminSharedAlphabet();
    }
    if (ROUTE === 'admin-sentence-gen' && typeof initAdminSharedSentenceBuilder === 'function') {
        initAdminSharedSentenceBuilder();
    }
    if (ROUTE === 'admin-books' && typeof initAdminBooks === 'function') {
        initAdminBooks();
    }
    if (ROUTE === 'admin-daily-word' && typeof initAdminDailyWord === 'function') {
        initAdminDailyWord();
    }
    if (ROUTE === 'admin-words' && typeof initAdminWords === 'function') {
        initAdminWords();
    }
    if (ROUTE === 'admin-tournaments' && typeof loadTournamentList === 'function') {
        loadTournamentList();
    }
    if (ROUTE === 'admin-daily' && typeof loadDailyList === 'function') {
        loadDailyList();
    }
    if (ROUTE === 'admin-users' && typeof initAdminUsers === 'function') {
        initAdminUsers();
    }
}

// Явне групування маршрутів для підсвітки активного пункту меню.
// Раніше активний пункт визначався через ROUTE.startsWith(r), що
// працювало лише випадково: наприклад, 'test-mc'.startsWith('tests')
// === false, тож меню "гасло" щоразу, коли користувач проходив тест
// чи сесію карток. Тепер кожен пункт меню явно перелічує всі
// сторінки/під-сторінки, які до нього належать.
const NAV_ROUTE_GROUPS = {
    flashcards: ['flashcards', 'flashsession'],
    tests: ['tests', 'test-mc', 'test-cloze', 'test-order', 'test-listen', 'test-translate', 'sentence-builder'],
    profile: ['profile', 'levels', 'leveltest', 'test-history'],
    tournaments: ['tournaments', 'tournament-play'],
    books: ['books', 'book-read'],
    lessons: ['lessons', 'lesson-read'],
    story: ['story'],
    admin: ['admin', 'admin-words', 'admin-tournaments', 'admin-daily', 'admin-users', 'admin-vocab-gen', 'admin-grammar-gen', 'admin-alphabet-gen', 'admin-sentence-gen', 'admin-books', 'admin-daily-word'],
};

function updateNav() {
    const nav = document.getElementById('mainnav');
    const items = [
        ["home", t('nav_home')],
        ["alphabet", t('nav_alphabet')],
        ["flashcards", t('nav_flashcards')],
        ["vocabulary", t('nav_vocabulary')],
        ["tests", t('nav_tests')],
        ["grammar", t('nav_grammar')],
        ["books", t('nav_books')],
        ["lessons", t('nav_lessons')],
        ["story", t('nav_story')],
        ["troll", t('nav_troll')],
        ["profile", t('nav_profile')],
        ["onboarding", t('nav_onboarding')],
        ["tournaments", t('nav_tournaments')],
    ];
    // Вкладку "Norskprøve" в шапці показуємо лише для тих, хто вчить
    // норвезьку — це підготовка до конкретного норвезького іспиту, для
    // решти мов вона нерелевантна (раніше замінювалась на узагальнений
    // пункт "Завдання", але й це не мало сенсу — прибираємо повністю).
    const targetLang = (typeof STATE !== 'undefined' && STATE && STATE.targetLang) || 'no';
    if (targetLang === 'no') {
        // Вставляємо перед "Турнірами" за назвою пункту, а не за фіксованим
        // індексом — індекс "поплив" після того, як з'явився пункт "Книги",
        // і Norskprøve вискакував не на своєму місці в меню.
        const tournamentsIdx = items.findIndex(([r]) => r === 'tournaments');
        items.splice(tournamentsIdx === -1 ? items.length : tournamentsIdx, 0, ["norskprove", examSectionNavLabel()]);
    }

    // Якщо користувач адмін – додаємо адмін-панель
    if (STATE && STATE.admin) {
        items.push(["admin", "⚙️ Адмін"]);
    }

    nav.innerHTML = '';
    items.forEach(([r, label]) => {
        const b = el(`<button>${label}</button>`);
        const group = NAV_ROUTE_GROUPS[r] || [r];
        if (group.includes(ROUTE)) b.classList.add('active');
        b.onclick = () => { navigate(r);
            nav.classList.remove('open'); };
        nav.appendChild(b);
    });
    
    const hamburger = document.getElementById('hamburger');
    hamburger.onclick = () => nav.classList.toggle('open');
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.topbar')) {
        const nav = document.getElementById('mainnav');
        if (nav) nav.classList.remove('open');
    }
});

function renderView() {
    switch (ROUTE) {
        case 'home':
            return viewHome();
        case 'alphabet':
            return viewAlphabet();
        case 'flashcards':
            // Передаємо мову з SUBSTATE або з STATE
            const lang = SUBSTATE.lang || STATE.targetLang || 'no';
            return viewFlashDeckPicker(lang);
        case 'flashsession':
            return viewFlashSession();
        case 'vocabulary':
            return viewVocabulary();
        case 'troll':
            return viewTroll();
        case 'tests':
            return viewTestsHub();
        case 'test-mc':
            return viewTestMC();
        case 'test-cloze':
            return viewTestCloze();
        case 'test-order':
            return viewTestOrder();
        case 'test-listen':
            return viewTestListen();
        case 'test-translate':
            return viewTestTranslate();
        case 'sentence-builder':
            return viewSentenceBuilder();
        case 'grammar':
            return viewGrammar();
        case 'books':
            return viewBooksLibrary();
        case 'book-read':
            return viewBookReader();
        case 'lessons':
            return viewLessons();
        case 'lesson-read':
            return viewLessonRead();
        case 'story':
            return viewStory();
        case 'profile':
            return viewProfile();
        case 'test-history':
            return viewTestHistory();
        case 'levels':
            return viewLevels();
        case 'leveltest':
            return viewLevelTest();
        case 'onboarding':
            return viewOnboarding();
        case 'choose-language':
            return viewChooseLanguage();
        case 'norskprove':
            return viewNorskprove();
        case 'tournaments':
            return viewTournaments();
        case 'tournament-play':
            return viewTournamentPlay();
        case 'admin':
            return el(viewAdmin());
        case 'admin-words':
            return el(viewAdminWords());
        case 'admin-tournaments':
            return el(viewAdminTournaments());
        case 'admin-daily':
            return el(viewAdminDaily());
        case 'admin-users':
            return el(viewAdminUsers());
        case 'admin-vocab-gen':
            return el(viewAdminSharedVocab());
        case 'admin-grammar-gen':
            return el(viewAdminSharedGrammar());
        case 'admin-alphabet-gen':
            return el(viewAdminSharedAlphabet());
        case 'admin-sentence-gen':
            return el(viewAdminSharedSentenceBuilder());
        case 'admin-books':
            return el(viewAdminBooks());
        case 'admin-daily-word':
            return el(viewAdminDailyWord());
        default:
            return el(`<div class="view"><p>${t('page_not_found')}</p></div>`);
    }
}