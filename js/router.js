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
        }

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
                ["norskprove", t('nav_norskprove')],
            ];

// Якщо користувач адмін – додаємо адмін-панель
if (STATE && STATE.admin) {
    items.push(["admin", "⚙️ Адмін"]);
}

            nav.innerHTML = '';
            items.forEach(([r, label]) => {
                const b = el(`<button>${label}</button>`);
                if (ROUTE === r || (ROUTE.startsWith(r))) b.classList.add('active');
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
                    return viewFlashDeckPicker();
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
case 'admin':
    return viewAdmin();
case 'admin-words':
    return viewAdminWords();
case 'admin-tournaments':
    return viewAdminTournaments();
case 'admin-daily':
    return viewAdminDaily();
case 'admin-users':
    return viewAdminUsers();

                default:
                    return el('<div class="view"><p>Сторінку не знайдено.</p></div>');
            }
        }

