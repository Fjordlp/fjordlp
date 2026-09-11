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
    'choose-language': '/choose-language',
    'norskprove': '/norskprove',
    'tournaments': '/tournaments',
    'admin': '/admin',
};
const PATH_TO_ROUTE = Object.keys(ROUTE_PATHS).reduce((acc, r) => {
    acc[ROUTE_PATHS[r]] = r;
    return acc;
}, {});

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
    return PATH_TO_ROUTE[location.pathname] || null;
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
    if (opts.fromPopState) return;

    const path = pathForRoute(route) || location.pathname;
    const historyState = { route: route, sub: SUBSTATE };

    if (!_historyInitialized) {
        history.replaceState(historyState, '', path);
        _historyInitialized = true;
    } else if (routeChanged) {
        // Справжня зміна сторінки — новий запис в історії.
        history.pushState(historyState, '', path);
    } else {
        // Той самий ROUTE, лише оновлені дані (наприклад, наступна картка
        // в тій самій сесії флеш-карток чи наступне питання тесту) — це
        // НЕ нова "сторінка", тож не додаємо новий запис в історію.
        // Інакше кнопку "Назад" довелось би тиснути стільки ж разів,
        // скільки карток/питань було в сесії, щоб просто вийти з неї.
        history.replaceState(historyState, '', path);
    }
}

// ---- Кнопки "Назад"/"Вперед" браузера ----
window.addEventListener('popstate', (e) => {
    const app = document.getElementById('app');
    // До входу (застосунок ще не активний) реальної маршрутизації нема —
    // ігноруємо, щоб не викликати render() у порожнечу.
    if (!app || !app.classList.contains('active')) return;

    const state = e.state;
    if (state && state.route) {
        navigate(state.route, state.sub, { fromPopState: true });
    } else {
        // Немає прив'язаного state (напр. запис історії існував ще до
        // першого navigate(), або користувач ввів URL вручну) —
        // визначаємо маршрут із самого шляху.
        navigate(routeFromLocation() || 'home', {}, { fromPopState: true });
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