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

function navigate(route, sub) {
    ROUTE = route;
    SUBSTATE = sub || {};
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =====================================================================
//  RENDER
// =====================================================================
function render() {
    const main = document.getElementById('mainContent');
    main.innerHTML = '';
    main.appendChild(renderView());
    updateNav();
    document.getElementById('userNameDisplay').textContent = STATE.name || currentUser;
    
    // Деякі адмін-сторінки потребують ініціалізації після рендерингу
    // (їхні view-функції повертають рядок HTML, а не DOM-елемент із вже
    // прив'язаними обробниками, тож завантаження списків і кнопки
    // прив'язуються тут, коли розмітка вже реально в DOM).
    if (ROUTE === 'admin-vocab-gen' && typeof initAdminSharedVocab === 'function') {
        initAdminSharedVocab();
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
    tests: ['tests', 'test-mc', 'test-cloze', 'test-order', 'test-listen', 'test-translate'],
    profile: ['profile', 'levels', 'leveltest'],
    tournaments: ['tournaments', 'tournament-play'],
    admin: ['admin', 'admin-words', 'admin-tournaments', 'admin-daily', 'admin-users', 'admin-vocab-gen'],
};

function updateNav() {
    const nav = document.getElementById('mainnav');
    const items = [
        ["home", t('nav_home')],
        ["flashcards", t('nav_flashcards')],
        ["vocabulary", t('nav_vocabulary')],
        ["tests", t('nav_tests')],
        ["grammar", t('nav_grammar')],
        ["troll", t('nav_troll')],
        ["profile", t('nav_profile')],
        ["onboarding", t('nav_onboarding')],
        ["norskprove", examSectionNavLabel()],
        ["tournaments", t('nav_tournaments')],
    ];

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
        case 'grammar':
            return viewGrammar();
        case 'profile':
            return viewProfile();
        case 'levels':
            return viewLevels();
        case 'leveltest':
            return viewLevelTest();
        case 'onboarding':
            return viewOnboarding();
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
        default:
            return el('<div class="view"><p>Сторінку не знайдено.</p></div>');
    }
}