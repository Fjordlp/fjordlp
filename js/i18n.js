// =====================================================================
//  ІНТЕРФЕЙС НА 3 МОВАХ (uk / en / ru)
// =====================================================================
// t(key) повертає рядок інтерфейсу поточною мовою (STATE.uiLang), з
// відкатом на українську, якщо перекладу немає. Це НЕ повне покриття
// кожного рядка застосунку (їх сотні), а основний "каркас" інтерфейсу:
// меню, кнопки авторизації, заголовки вкладок, часті кнопки/підписи.
// Решта текстів (глибші описи, підказки) поки лишаються українською.
const UI_STRINGS = {
    uk: {
        nav_home: 'Головна', nav_flashcards: 'Картки', nav_vocabulary: 'Словник',
        nav_tests: 'Тести', nav_grammar: 'Граматика', nav_troll: 'Тролль',
        nav_profile: 'Кабінет', nav_onboarding: 'Мета', nav_norskprove: 'Norskprøve',
        logout: 'Вийти', login_title: 'Вхід', register_title: 'Реєстрація',
        login_label: 'Логін', password_label: 'Пароль', login_placeholder: 'Ваш логін',
        password_placeholder: 'Пароль', forgot_password: 'Забули пароль?',
        submit_login: 'Увійти', submit_register: 'Зареєструватися',
        toggle_to_register: 'Ще немає акаунта? Зареєструватися',
        toggle_to_login: 'Вже є акаунт? Увійти',
        guest_btn: 'Продовжити як гість', or_divider: 'або',
        footer_note: 'Fjord · ваш прогрес зберігається локально під вашим логіном',
        save_btn: 'Зберегти', cancel_btn: 'Скасувати', clear_chat: 'Очистити чат',
        assistant_title: 'Тролль-помічник', assistant_placeholder: 'Напиши повідомлення тролю…',
        assistant_sub: 'Онлайн-тролль, одягнений так само, як у вкладці «Тролль». Запитай про граматику, слова, переклад чи просто попроси підказку — і продовжуй те, чим займався.',
        h_home: 'Головна', h_vocabulary: 'Словник', h_tests: 'Тести', h_grammar: 'Граматика',
        h_troll: 'Твій тролль', h_profile: 'Кабінет', h_norskprove: 'Norskprøve Academy',
        h_flashcards: 'Картки', h_pick_level: 'Оберіть рівень', h_your_level: 'Ваш рівень:',
        interface_lang: 'Мова інтерфейсу', vocab_lang: 'Мова перекладу слів',
        search_placeholder: 'Пошук...', no_words_found: 'Немає слів за цим критерієм',
        start_btn: 'Почати', check_btn: 'Перевірити', next_btn: 'Далі', back_btn: 'Назад',
        all_topics: 'Усі теми', level_change_note: 'Ви завжди можете змінити рівень пізніше.',
        all_level_words: 'Усі слова вашого рівня', status_label: 'Статус',
        col_word: 'Слово', col_translation: 'Переклад', col_topic: 'Тема', col_status: 'Статус',
        how_translate: 'Як перекладається', write_word_norwegian: 'напишіть слово норвезькою',
        greeting_hi: 'Привіт', student_word: 'Учень', level_word: 'Рівень', words_viewed: 'слів переглянуто',
    },
    en: {
        nav_home: 'Home', nav_flashcards: 'Flashcards', nav_vocabulary: 'Vocabulary',
        nav_tests: 'Tests', nav_grammar: 'Grammar', nav_troll: 'Troll',
        nav_profile: 'Profile', nav_onboarding: 'Goal', nav_norskprove: 'Norskprøve',
        logout: 'Log out', login_title: 'Log in', register_title: 'Sign up',
        login_label: 'Username', password_label: 'Password', login_placeholder: 'Your username',
        password_placeholder: 'Password', forgot_password: 'Forgot password?',
        submit_login: 'Log in', submit_register: 'Sign up',
        toggle_to_register: "Don't have an account? Sign up",
        toggle_to_login: 'Already have an account? Log in',
        guest_btn: 'Continue as guest', or_divider: 'or',
        footer_note: 'Fjord · your progress is stored locally under your login',
        save_btn: 'Save', cancel_btn: 'Cancel', clear_chat: 'Clear chat',
        assistant_title: 'Troll assistant', assistant_placeholder: 'Write a message to the troll…',
        assistant_sub: "An online troll, dressed the same way as in the \"Troll\" tab. Ask about grammar, words, translation, or just ask for a hint — and get back to what you were doing.",
        h_home: 'Home', h_vocabulary: 'Vocabulary', h_tests: 'Tests', h_grammar: 'Grammar',
        h_troll: 'Your troll', h_profile: 'Profile', h_norskprove: 'Norskprøve Academy',
        h_flashcards: 'Flashcards', h_pick_level: 'Choose your level', h_your_level: 'Your level:',
        interface_lang: 'Interface language', vocab_lang: 'Word translation language',
        search_placeholder: 'Search...', no_words_found: 'No words match this filter',
        start_btn: 'Start', check_btn: 'Check', next_btn: 'Next', back_btn: 'Back',
        all_topics: 'All topics', level_change_note: 'You can always change your level later.',
        all_level_words: 'All words for your level', status_label: 'Status',
        col_word: 'Word', col_translation: 'Translation', col_topic: 'Topic', col_status: 'Status',
        how_translate: 'How do you translate', write_word_norwegian: 'write the word in Norwegian',
        greeting_hi: 'Hi', student_word: 'Learner', level_word: 'Level', words_viewed: 'words viewed',
    },
    ru: {
        nav_home: 'Главная', nav_flashcards: 'Карточки', nav_vocabulary: 'Словарь',
        nav_tests: 'Тесты', nav_grammar: 'Грамматика', nav_troll: 'Тролль',
        nav_profile: 'Кабинет', nav_onboarding: 'Цель', nav_norskprove: 'Norskprøve',
        logout: 'Выйти', login_title: 'Вход', register_title: 'Регистрация',
        login_label: 'Логин', password_label: 'Пароль', login_placeholder: 'Ваш логин',
        password_placeholder: 'Пароль', forgot_password: 'Забыли пароль?',
        submit_login: 'Войти', submit_register: 'Зарегистрироваться',
        toggle_to_register: 'Ещё нет аккаунта? Зарегистрироваться',
        toggle_to_login: 'Уже есть аккаунт? Войти',
        guest_btn: 'Продолжить как гость', or_divider: 'или',
        footer_note: 'Fjord · ваш прогресс сохраняется локально под вашим логином',
        save_btn: 'Сохранить', cancel_btn: 'Отмена', clear_chat: 'Очистить чат',
        assistant_title: 'Тролль-помощник', assistant_placeholder: 'Напиши сообщение тролю…',
        assistant_sub: 'Онлайн-тролль, одетый так же, как во вкладке «Тролль». Спроси о грамматике, словах, переводе или просто попроси подсказку — и продолжай то, чем занимался.',
        h_home: 'Главная', h_vocabulary: 'Словарь', h_tests: 'Тесты', h_grammar: 'Грамматика',
        h_troll: 'Твой тролль', h_profile: 'Кабинет', h_norskprove: 'Norskprøve Academy',
        h_flashcards: 'Карточки', h_pick_level: 'Выберите уровень', h_your_level: 'Ваш уровень:',
        interface_lang: 'Язык интерфейса', vocab_lang: 'Язык перевода слов',
        search_placeholder: 'Поиск...', no_words_found: 'Нет слов по этому критерию',
        start_btn: 'Начать', check_btn: 'Проверить', next_btn: 'Далее', back_btn: 'Назад',
        all_topics: 'Все темы', level_change_note: 'Вы всегда можете изменить уровень позже.',
        all_level_words: 'Все слова вашего уровня', status_label: 'Статус',
        col_word: 'Слово', col_translation: 'Перевод', col_topic: 'Тема', col_status: 'Статус',
        how_translate: 'Как переводится', write_word_norwegian: 'напишите слово на норвежском',
        greeting_hi: 'Привет', student_word: 'Ученик', level_word: 'Уровень', words_viewed: 'слов просмотрено',
    },
};

function t(key) {
    let lang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || null;
    if (!lang) {
        try { lang = localStorage.getItem('fjord_ui_lang') || 'uk'; } catch (e) { lang = 'uk'; }
    }
    return (UI_STRINGS[lang] && UI_STRINGS[lang][key]) || UI_STRINGS.uk[key] || key;
}

// Повертає переклад конкретного слова словника мовою STATE.vocabLang.
// Для uk завжди є w.uk (вбудований). Для en/ru спершу шукаємо кеш
// STATE.wordTranslations (заповнюється кнопкою "Перекласти" через AI),
// і лише якщо нічого нема — відкат на українську, щоб інтерфейс не ламався.
function wordTranslation(word, level, lang) {
    lang = lang || (typeof STATE !== 'undefined' && STATE && STATE.vocabLang) || 'uk';
    if (lang === 'uk') return word.uk;
    if (lang === 'en') return word.en || word.uk;
    if (lang === 'ru') return word.ru || word.uk;
    return word.uk;
}

function wordExampleTranslation(word, level, lang) {
    lang = lang || (typeof STATE !== 'undefined' && STATE && STATE.vocabLang) || 'uk';
    if (lang === 'uk') return word.ex_uk;
    if (lang === 'en') return word.en_ex || word.ex_uk;
    if (lang === 'ru') return word.ru_ex || word.ex_uk;
    return word.ex_uk;
}

// Застосовує переклад до статичних елементів сторінки входу/шапки, які
// живуть поза #mainContent і тому не перемальовуються через navigate().
function applyStaticTranslations() {
    const map = {
        authTitle: 'login_title', authSubmit: 'submit_login', guestBtn: 'guest_btn',
        forgotPasswordLink: 'forgot_password', logoutBtn: 'logout',
    };
    Object.keys(map).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            // guestBtn містить вкладений <span> з логотипом — не чіпаємо його,
            // замінюємо лише текстовий вузол після нього.
            if (id === 'guestBtn') {
                const textNode = Array.from(el.childNodes).find(n => n.nodeType === 3);
                if (textNode) textNode.textContent = ' ' + t(map[id]);
            } else {
                el.textContent = t(map[id]);
            }
        }
    });
    const loginInput = document.getElementById('authLogin');
    if (loginInput) loginInput.placeholder = t('login_placeholder');
    const passInput = document.getElementById('authPassword');
    if (passInput) passInput.placeholder = t('password_placeholder');
    const orDivider = document.querySelector('.auth-divider');
    if (orDivider) orDivider.textContent = t('or_divider');
    const footNote = document.querySelector('.appfoot');
    if (footNote) footNote.textContent = t('footer_note');
    const chatInput = document.getElementById('chatInput');
    if (chatInput) chatInput.placeholder = t('assistant_placeholder');
    const assistantTitle = document.querySelector('.assistant-panel-title');
    if (assistantTitle) assistantTitle.textContent = t('assistant_title');
    const assistantSub = document.querySelector('.assistant-panel-sub');
    if (assistantSub) assistantSub.textContent = t('assistant_sub');
    const chatClearBtn = document.getElementById('chatClearBtn');
    if (chatClearBtn) chatClearBtn.textContent = t('clear_chat');
    initLangSwitchers();
}

function setUiLang(lang) {
    if (!UI_STRINGS[lang]) return;
    try { localStorage.setItem('fjord_ui_lang', lang); } catch (e) { /* ignore */ }
    if (typeof STATE !== 'undefined' && STATE) {
        STATE.uiLang = lang;
        // Мова інтерфейсу й мова перекладу слів — це ОДНЕ налаштування:
        // обрав English — і саме навчання норвезької (слова, картки, тести)
        // теж повністю англійською, ніде не буде змішуватись українська.
        STATE.vocabLang = lang;
        updateState();
    }
    applyStaticTranslations();
    if (typeof render === 'function' && typeof STATE !== 'undefined' && STATE) render();
}

function setVocabLang(lang) {
    if (!['uk', 'en', 'ru'].includes(lang)) return;
    STATE.vocabLang = lang;
    updateState();
    if (typeof render === 'function') render();
}

function levelMetaLocalized(level) {
    const meta = LEVEL_META[level];
    if (!meta) return { name: level, desc: '' };
    const lang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    if (lang === 'en') return { name: meta.name_en || meta.name, desc: meta.desc_en || meta.desc };
    if (lang === 'ru') return { name: meta.name_ru || meta.name, desc: meta.desc_ru || meta.desc };
    return { name: meta.name, desc: meta.desc };
}

function initLangSwitchers() {
    const current = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) ||
        (function () { try { return localStorage.getItem('fjord_ui_lang') || 'uk'; } catch (e) { return 'uk'; } })();
    document.querySelectorAll('.lang-chip').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === current);
        btn.onclick = () => {
            setUiLang(btn.dataset.lang);
            document.querySelectorAll('.lang-chip').forEach(b => b.classList.toggle('active', b.dataset.lang === btn.dataset.lang));
        };
    });
}
