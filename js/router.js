// =====================================================================
// ROUTER + RENDER
// Примітка: AI-помічник більше НЕ є окремим маршрутом — він живе у
// плаваючій бічній панелі (js/assistant.js) і доступний з будь-якої
// вкладки через кнопку-"пухир" (FAB) у правому нижньому куті.
// =====================================================================

// =====================================================================
// ROUTER
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
// RENDER
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
 if (ROUTE === 'admin-grammar-gen' && typeof initAdminSharedGrammar === 'function') {
 initAdminSharedGrammar();
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
 tests: ['tests', 'test-mc', 'test-cloze', 'test-order', 'test-listen', 'test-translate'],
 profile: ['profile', 'levels', 'leveltest'],
 tournaments: ['tournaments', 'tournament-play'],
 books: ['books', 'book-read'],
 story: ['story'],
 admin: ['admin', 'admin-words', 'admin-tournaments', 'admin-daily', 'admin-users', 'admin-vocab-gen', 'admin-grammar-gen', 'admin-books', 'admin-daily-word'],
};

function updateNav() {
 const nav = document.getElementById('mainnav');
 const items = [
 ["home", t('nav_home')],
 ["flashcards", t('nav_flashcards')],
 ["vocabulary", t('nav_vocabulary')],
 ["tests", t('nav_tests')],
 ["grammar", t('nav_grammar')],
 ["books", t('nav_books')],
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
 items.push(["admin", " Адмін"]);
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
 case 'books':
 return viewBooksLibrary();
 case 'book-read':
 return viewBookReader();
 case 'story':
 return viewStory();
 case 'profile':
 return viewProfile();
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
 case 'admin-books':
 return el(viewAdminBooks());
 case 'admin-daily-word':
 return el(viewAdminDailyWord());
 default:
 return el('<div class="view"><p>Сторінку не знайдено.</p></div>');
 }
}