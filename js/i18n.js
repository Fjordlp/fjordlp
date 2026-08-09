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
        nav_tests: 'Тести', nav_grammar: 'Граматика', nav_books: '📚 Книги', nav_troll: 'Тролль',
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
        stat_words_studied: 'слів опрацьовано', stat_tests: 'тестів', stat_streak_days: 'днів поспіль', stat_best_streak: 'найкраща серія',
        calendar_15days: 'Календар (15 днів)', settings_title: 'Налаштування', field_name: "Ім'я", field_goal: 'Мета',
        field_goal_placeholder: 'напр. скласти іспит B1', field_reminder_time: 'Час нагадування', field_pace: 'Темп',
        pace_calm: 'Спокійний', pace_steady: 'Стабільний', pace_intense: 'Інтенсивний', save_btn2: 'Зберегти',
        leaderboard_title: 'Таблиця лідерів', data_title: 'Дані', data_note: 'Прогрес зберігається локально під вашим логіном.',
        settings_saved: 'Налаштування збережено',
        onb_welcome: 'Ласкаво просимо до Fjord!', onb_subtitle: 'Давайте визначимо ваш рівень та мету, щоб я міг скласти для вас план навчання.',
        onb_step_of: 'Крок {n} з 3', onb_step1_label: 'Крок 1 з 3: Оберіть мету', onb_step2_label: 'Крок 2 з 3: Визначте рівень', onb_step3_label: 'Крок 3 з 3: План готовий!',
        onb_goal_title: 'Яка ваша головна мета?', onb_goal_sub: 'Оберіть один варіант, який найкраще описує ваші цілі.', onb_continue: 'Продовжити →',
        onb_test_title: 'Вхідний тест на рівень', onb_test_sub: 'Це швидкий тест, щоб визначити ваш поточний рівень норвезької. Якщо ви вже знаєте свій рівень, можете обрати його вручну.',
        onb_start_test: 'Почати тест', onb_manual_level: 'Обрати рівень вручну', onb_choose_level: 'Оберіть рівень:',
        onb_plan_title: 'Ваш план навчання', onb_goal_chosen: 'Мета обрана', onb_start_learning: '🚀 Почати навчання!',
        onb_change_goal: '🔄 Змінити мету', onb_change_level: '📊 Змінити рівень', onb_change_later: 'Ви завжди зможете змінити мету та рівень у налаштуваннях.',
        onb_welcome_toast: '🎉 Ласкаво просимо! Починаємо навчання!',
        question_word: 'Питання', of_word: 'з', field_learn_lang: 'Яку мову вивчаєте',
        rec_mastered_title: 'Рівень {level} засвоєно на {pct}%!', rec_mastered_desc: 'Ви вивчили {mastered} із {total} слів. Рекомендуємо перейти на {rec}.',
        upgrade_level_btn: 'Підвищити рівень', hide_btn: 'Приховати', level_up_toast: 'Рівень підвищено до {level}!',
        daily_word_title: 'Слово дня', no_words_for_level: 'Немає слів для цього рівня.', activity_title: 'Активність',
        streak_days_label: 'Серія днів:', detailed_stats_btn: 'Детальна статистика →', level_colon: 'Рівень: {level}',
        change_level_question: 'Хочете змінити рівень або пройти тест повторно?', pick_level_manually_btn: 'Обрати рівень вручну',
        retest_btn: 'Пройти тест рівня знову', daily_task_title: '📅 Завдання дня',
        daily_correct_banner: '✅ Правильно! 🎉', daily_xp_toast: '+20 XP за завдання дня! 🔥',
        daily_wrong_banner: '❌ Неправильно. Правильна відповідь: {answer}', daily_try_tomorrow: 'Спробуй завтра знову! 💪',
        level_set_toast: 'Рівень встановлено: {level}', start_learning_btn: 'Почати навчання',
        flash_pick_desc: 'Оберіть рівень, тему та режим тренування. (Мова: {lang})',
        srs_mode_btn: '📅 За розкладом (SRS)', all_cards_mode_btn: '📚 Всі картки',
        mode_flip: "Запам'ятовування", mode_mc: 'Вибір відповіді', mode_type: 'Написання слова',
        no_words_level_lang: 'Немає слів для цього рівня ({lang})', try_other_level: 'Спробуйте інший рівень або додайте слова через адмін-панель.',
        deck_count_label: '{count} слів у колоді', due_review_label: '{count} готові до повторення (SRS)',
        all_cards_label: 'всі картки', start_session_btn: 'Почати сесію (до {n} карток)',
        leech_deck_label: '🩹 Складні слова', leech_deck_count: '{n} слів, які ти плутаєш знову і знову',
        leech_deck_desc: 'Ці слова ти вже кілька разів переплутав поспіль. Пропрацюємо їх окремо, поки вони не закріпляться.',
        grammar_generating_notice: 'Готуємо граматику {lang} для рівня {level}… За кілька секунд правила з\'являться тут самі.',
        grammar_ai_generated_notice: 'Граматика {lang} ({level}) згенерована AI спеціально для вашого рівня.',
        grammar_generating_notice_all: 'Готуємо граматику {lang} для всіх рівнів… Розділи з'+"'"+'являться тут, щойно будуть готові.',
        grammar_ai_generated_notice_all: 'Показані правила граматики {lang} для всіх рівнів — від A1 до C2.',
        grammar_all_levels: 'Усі рівні', grammar_empty: 'Правил граматики поки що немає.',
        loading: 'Завантаження…',
        h_books: 'Книги', books_intro: 'Читай реальні тексти суспільного надбання мовою, яку вивчаєш. Торкнись будь-якого слова, щоб побачити переклад, і перевір себе завданнями після кожного розділу.',
        books_empty: 'Поки що немає книг для цієї мови. Спробуй іншу мову або зазирни пізніше.',
        books_not_found: 'Книгу або розділ не знайдено.', books_chapter_n: 'Розділ {n}',
        books_tap_word_hint: '👆 Торкнись будь-якого слова в тексті, щоб побачити переклад',
        books_back_to_library: 'До бібліотеки', books_prev_chapter: 'Попередній розділ', books_next_chapter: 'Наступний розділ',
        books_read_done: 'Прочитано', books_mark_read: 'Позначити прочитаним', books_xp_toast: '+8 XP за прочитаний розділ!',
        books_translate_error: 'Не вдалося перекласти. Спробуй ще раз.', books_base_form: 'Словникова форма',
        books_no_tasks: 'Для цього розділу поки немає завдань.',
        books_tasks_title: 'Завдання на розуміння прочитаного', books_prev_score: 'Попередній результат: {correct}/{total}',
        books_check_answers: 'Перевірити відповіді', books_score_toast: 'Результат: {correct}/{total}',
        books_progress: 'Прочитано {done} з {total} розділів', books_chapters_count: '{total} розділів', books_genre_all: 'Усі теми',
        empty_no_cards: 'Немає карток', empty_all_scheduled: 'Усі слова заплановані на пізніше.', to_deck_picker_btn: 'До вибору',
        session_complete_title: 'Сесію завершено!', correct_of_xp: '{correct} із {total} правильно · +{xp} XP', correct_of_total: '{correct} із {total} правильно',
        again_session_btn: 'Ще одна сесія', to_home_btn: 'На головну',
        flip_hint: 'натисніть, щоб перевернути', grade_again: 'Не знаю', grade_hard: 'Складно', grade_good: 'Знаю',
        type_placeholder: 'напишіть тут...', check_correct: 'Правильно! 🎉', check_wrong_prefix: 'Правильна відповідь: {answer}',
        lang_label: 'Мова: {lang}', gen_words_btn: '🎲 AI: додати нові слова', gen_words_loading: '🎲 Генерую…',
        gen_words_added_toast: '✅ Додано нових слів: {n}', gen_words_none_toast: '🤔 AI не запропонував нових унікальних слів. Спробуй ще раз.',
        gen_words_error_toast: '⚠️ Не вдалося згенерувати слова. Спробуй ще раз.',
        tests_choose_type: 'Оберіть тип вправи для рівня {level}.',
        test_mc_title: 'Вибір форми', test_mc_desc: 'Оберіть правильний переклад або форму.',
        test_cloze_title: 'Заповни пропуск', test_cloze_desc: 'Вставте пропущене слово.',
        test_order_title: 'Склади речення', test_order_desc: 'Розташуйте слова у правильному порядку.',
        test_listen_title: 'Аудіювання', test_listen_desc: 'Прослухайте слово і оберіть переклад.',
        test_translate_title: 'Переклад', test_translate_desc: 'Напишіть переклад слова.',
        start_test_btn: 'Почати', quiz_preparing_title: 'Готуємо слова…',
        quiz_preparing_desc: 'Для цієї мови й рівня ще немає слів — вони генеруються. Спробуйте оновити за кілька секунд або оберіть інший рівень.',
        to_tests_btn: 'До тестів', quiz_finished_suffix: ': завершено', prev_btn: '◀ Назад', next_btn2: 'Вперед ▶',
        write_in_lang_prompt: 'Напишіть переклад слова «{word}» ({lang})', your_answer_placeholder: 'ваша відповідь',
        click_words_below: 'Натискайте слова знизу', correct_variant_prefix: 'Правильний варіант: {answer}',
        troll_level_badge: 'Рівень тролля {lvl}', xp_to_next: '{xp} XP (до наступного рівня: {remaining} XP)',
        gear_title: 'Спорядження', gear_desc: 'Розблоковується з підвищенням рівня тролля. Натисніть, щоб одягнути/зняти.',
        achievements_title: 'Досягнення ({unlocked}/{total})',
        nav_tournaments: '🏆 Турніри', h_tournaments: 'Турніри', tourn_no_tournaments: 'Наразі немає турнірів. Зазирни пізніше!', tourn_status_upcoming: '⏳ Скоро', tourn_status_active: '🔄 Активний', tourn_status_ended: '✅ Завершено', tourn_questions_count: '{n} завдань', tourn_join_btn: 'Приєднатись', tourn_view_results_btn: 'Результати', tourn_your_score: 'Твій результат: {score}/{total}', tourn_starts_at: 'Початок: {date}', tourn_ends_at: 'До: {date}',
        tourn_not_started: 'Турнір ще не почався.', tourn_already_ended: 'Турнір уже завершився.', tourn_already_played: 'Ти вже брав(-ла) участь у цьому турнірі.', tourn_back_to_list: '← До турнірів',
        tourn_finish_title: '🏆 Турнір завершено!', tourn_finish_desc: 'Твій результат: {correct} із {total} · +50 XP за участь', tourn_leaderboard_title: '📋 Таблиця результатів', tourn_no_participants: 'Ти перший(-а) учасник(-ця)! Результати з\'являться тут, коли приєднаються інші.', tourn_you_marker: ' (ти)', tourn_submit_error: '⚠️ Не вдалося зберегти результат. Спробуй ще раз.', tourn_guest_not_saved: '👤 Твій результат не збережеться в таблиці — грай під акаунтом, щоб результати рахувались.',
        home_learn_words_btn: '📇 Вчити слова', home_vocab_btn: '📚 Словник', home_grammar_btn: '📖 Граматика', home_tests_btn: '📝 Тести', home_listen_btn: '🎧 Аудіювання', home_troll_btn: '🧌 Тролль ({lvl} рів.)', more_langs_btn: '🌐 Ще мови…', change_lang_link: 'Змінити мову', viewed_mastered_label: '{seen}/{total} переглянуто · {mastered} засвоєно', you_label: ' (ви)',
        cl_welcome_title: '🌍 Яку мову хочете вивчати?', cl_welcome_desc: 'Оберіть мову — і зможемо скласти для вас план навчання саме під неї.',
        cl_switch_title: '🌍 Змінити мову навчання', cl_switch_desc: 'Прогрес по кожній мові зберігається окремо — можна вільно перемикатись.',
        cl_cancel_btn: '← Скасувати', cl_switched_toast: '✅ Тепер ви вивчаєте {lang}',
        norsk_gen_task_btn: '🎲 Згенерувати нове завдання (AI)', norsk_gen_task_loading: '🎲 Генерую…', norsk_task_added_toast: '✅ Нове завдання додано!', norsk_gen_error_toast: '⚠️ Не вдалося згенерувати завдання. Спробуйте ще раз.', norsk_no_tasks_title: 'Немає завдань для цього рівня', norsk_no_tasks_desc: 'Натисніть «Згенерувати нове завдання» вище — AI створить його спеціально для обраної мови й рівня.',
        btn_listen: 'Слухати',
        task_default_title: 'Завдання', pct_correct: '{pct}% правильно ({count}/{total})', write_answer_placeholder: 'Напишіть свою відповідь тут...', save_answer_btn: '💾 Зберегти відповідь', check_ai_btn: '🧠 Перевір з AI', check_ai_loading: '🧠 Тролль перевіряє…', check_ai_wait: 'Зачекайте, тролль читає ваш текст і готує пораду…', troll_sensor_advice: '🧌 Порада тролля-сенсора', answer_saved_toast: '✅ Відповідь збережена! +10 XP', write_before_save_toast: '⚠️ Будь ласка, напишіть щось перед збереженням.', write_before_check_toast: '⚠️ Напиши щось перед перевіркою.', ai_check_error: '⚠️ Не вдалося отримати перевірку від AI. Перевір з\'єднання і спробуй ще раз.', start_recording_btn: '🎤 Почати запис (симуляція)', recording_started_toast: '🎙️ Запис розпочато... (симуляція)', recording_done_toast: '✅ Запис готовий! Можете тренуватись далі.',
        onb_welcome_title: '👋 Ласкаво просимо до Fjord!', onb_welcome_desc: 'Давайте визначимо ваш рівень та мету, щоб я міг скласти для вас план навчання.', onb_more_langs_title: 'Повний список мов доступний у Налаштуваннях (Кабінет) у будь-який момент', onb_step_of: 'Крок {step} з 3',
        onb_goal_title: '🎯 Яка ваша головна мета?', onb_goal_desc: 'Оберіть один варіант, який найкраще описує ваші цілі.', onb_continue_btn: 'Продовжити →', onb_step1_indicator: 'Крок 1 з 3: Оберіть мету',
        onb_test_title: '📝 Вхідний тест на рівень', onb_test_desc: 'Це швидкий тест, щоб визначити ваш поточний рівень мови «{lang}». Якщо ви вже знаєте свій рівень, можете обрати його вручну.', onb_start_test_btn: 'Почати тест', onb_pick_manual_btn: 'Обрати рівень вручну', onb_pick_level_title: 'Оберіть рівень:', onb_step2_indicator: 'Крок 2 з 3: Визначте рівень', level_test_preparing: 'Готуємо запитання під вашу мову навчання…', level_test_no_words: 'Для цієї мови поки що замало слів, щоб скласти тест. Оберіть рівень вручну — далі словник підвантажиться сам.',
        leveltest_preparing: '⏳ Готуємо тест для обраної мови…', leveltest_translate_q: 'Як перекладається «{word}»?',
        onb_plan_title: '🎓 Ваш план навчання', onb_level_tag: 'Рівень: {level}', onb_goal_chosen: 'Мета обрана', onb_start_learning_btn: '🚀 Почати навчання!', onb_change_goal_btn: '🔄 Змінити мету', onb_change_level_btn: '📊 Змінити рівень', onb_can_change_later: 'Ви завжди зможете змінити мету та рівень у налаштуваннях.', onb_step3_indicator: 'Крок 3 з 3: План готовий!', onb_welcome_toast: '🎉 Ласкаво просимо! Починаємо навчання!',
    },
    en: {
        nav_home: 'Home', nav_flashcards: 'Flashcards', nav_vocabulary: 'Vocabulary',
        nav_tests: 'Tests', nav_grammar: 'Grammar', nav_books: '📚 Books', nav_troll: 'Troll',
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
        stat_words_studied: 'words studied', stat_tests: 'tests', stat_streak_days: 'day streak', stat_best_streak: 'best streak',
        calendar_15days: 'Calendar (15 days)', settings_title: 'Settings', field_name: 'Name', field_goal: 'Goal',
        field_goal_placeholder: 'e.g. pass the B1 exam', field_reminder_time: 'Reminder time', field_pace: 'Pace',
        pace_calm: 'Calm', pace_steady: 'Steady', pace_intense: 'Intense', save_btn2: 'Save',
        leaderboard_title: 'Leaderboard', data_title: 'Data', data_note: 'Your progress is stored locally under your login.',
        settings_saved: 'Settings saved',
        onb_welcome: 'Welcome to Fjord!', onb_subtitle: "Let's figure out your level and goal so I can build a study plan for you.",
        onb_step_of: 'Step {n} of 3', onb_step1_label: 'Step 1 of 3: Choose your goal', onb_step2_label: 'Step 2 of 3: Determine your level', onb_step3_label: 'Step 3 of 3: Plan ready!',
        onb_goal_title: "What's your main goal?", onb_goal_sub: 'Pick the one option that best describes your goals.', onb_continue: 'Continue →',
        onb_test_title: 'Level placement test', onb_test_sub: "This is a quick test to determine your current Norwegian level. If you already know your level, you can pick it manually.",
        onb_start_test: 'Start test', onb_manual_level: 'Pick level manually', onb_choose_level: 'Choose your level:',
        onb_plan_title: 'Your study plan', onb_goal_chosen: 'Goal chosen', onb_start_learning: '🚀 Start learning!',
        onb_change_goal: '🔄 Change goal', onb_change_level: '📊 Change level', onb_change_later: 'You can always change your goal and level in settings.',
        onb_welcome_toast: '🎉 Welcome! Let\'s start learning!',
        question_word: 'Question', of_word: 'of', field_learn_lang: 'Language you\'re learning',
        rec_mastered_title: 'Level {level} mastered at {pct}%!', rec_mastered_desc: 'You have learned {mastered} of {total} words. We recommend moving to {rec}.',
        upgrade_level_btn: 'Upgrade level', hide_btn: 'Hide', level_up_toast: 'Level upgraded to {level}!',
        daily_word_title: 'Word of the day', no_words_for_level: 'No words for this level.', activity_title: 'Activity',
        streak_days_label: 'Day streak:', detailed_stats_btn: 'Detailed stats →', level_colon: 'Level: {level}',
        change_level_question: 'Want to change your level or retake the test?', pick_level_manually_btn: 'Pick level manually',
        retest_btn: 'Retake level test', daily_task_title: '📅 Daily challenge',
        daily_correct_banner: '✅ Correct! 🎉', daily_xp_toast: '+20 XP for the daily challenge! 🔥',
        daily_wrong_banner: '❌ Wrong. Correct answer: {answer}', daily_try_tomorrow: 'Try again tomorrow! 💪',
        level_set_toast: 'Level set to: {level}', start_learning_btn: 'Start learning',
        flash_pick_desc: 'Choose a level, topic, and practice mode. (Language: {lang})',
        srs_mode_btn: '📅 Scheduled (SRS)', all_cards_mode_btn: '📚 All cards',
        mode_flip: 'Memorization', mode_mc: 'Multiple choice', mode_type: 'Type the word',
        no_words_level_lang: 'No words for this level ({lang})', try_other_level: 'Try another level or add words via the admin panel.',
        deck_count_label: '{count} words in this deck', due_review_label: '{count} due for review (SRS)',
        all_cards_label: 'all cards', start_session_btn: 'Start session (up to {n} cards)',
        leech_deck_label: '🩹 Tricky words', leech_deck_count: '{n} words you keep getting wrong',
        leech_deck_desc: "You've missed these words several times in a row. Let's drill them separately until they stick.",
        grammar_generating_notice: 'Preparing {lang} grammar for level {level}… Rules will appear here in a few seconds.',
        grammar_ai_generated_notice: '{lang} grammar ({level}) generated by AI for your level.',
        grammar_generating_notice_all: 'Preparing {lang} grammar for all levels… Sections will appear here as they become ready.',
        grammar_ai_generated_notice_all: 'Showing {lang} grammar rules for all levels — from A1 to C2.',
        grammar_all_levels: 'All levels', grammar_empty: 'No grammar rules yet.',
        loading: 'Loading…',
        h_books: 'Books', books_intro: 'Read real public-domain texts in the language you\'re learning. Tap any word to see its translation, and test yourself with tasks after each chapter.',
        books_empty: 'No books for this language yet. Try another language or check back later.',
        books_not_found: 'Book or chapter not found.', books_chapter_n: 'Chapter {n}',
        books_tap_word_hint: '👆 Tap any word in the text to see its translation',
        books_back_to_library: 'Back to library', books_prev_chapter: 'Previous chapter', books_next_chapter: 'Next chapter',
        books_read_done: 'Read', books_mark_read: 'Mark as read', books_xp_toast: '+8 XP for finishing a chapter!',
        books_translate_error: 'Could not translate. Try again.', books_base_form: 'Dictionary form',
        books_no_tasks: 'No tasks for this chapter yet.',
        books_tasks_title: 'Reading comprehension tasks', books_prev_score: 'Previous score: {correct}/{total}',
        books_check_answers: 'Check answers', books_score_toast: 'Score: {correct}/{total}',
        books_progress: '{done} of {total} chapters read', books_chapters_count: '{total} chapters', books_genre_all: 'All genres',
        empty_no_cards: 'No cards', empty_all_scheduled: 'All words are scheduled for later.', to_deck_picker_btn: 'Back to selection',
        session_complete_title: 'Session complete!', correct_of_xp: '{correct} of {total} correct · +{xp} XP', correct_of_total: '{correct} of {total} correct',
        again_session_btn: 'Another session', to_home_btn: 'Go home',
        flip_hint: 'tap to flip', grade_again: "Don't know", grade_hard: 'Hard', grade_good: 'Know it',
        type_placeholder: 'type here...', check_correct: 'Correct! 🎉', check_wrong_prefix: 'Correct answer: {answer}',
        lang_label: 'Language: {lang}', gen_words_btn: '🎲 AI: add new words', gen_words_loading: '🎲 Generating…',
        gen_words_added_toast: '✅ New words added: {n}', gen_words_none_toast: "🤔 AI didn't suggest any new unique words. Try again.",
        gen_words_error_toast: '⚠️ Failed to generate words. Please try again.',
        tests_choose_type: 'Choose an exercise type for level {level}.',
        test_mc_title: 'Multiple choice', test_mc_desc: 'Pick the correct translation or form.',
        test_cloze_title: 'Fill in the blank', test_cloze_desc: 'Insert the missing word.',
        test_order_title: 'Build the sentence', test_order_desc: 'Arrange the words in the correct order.',
        test_listen_title: 'Listening', test_listen_desc: 'Listen to the word and choose the translation.',
        test_translate_title: 'Translation', test_translate_desc: 'Write the translation of the word.',
        start_test_btn: 'Start', quiz_preparing_title: 'Preparing words…',
        quiz_preparing_desc: 'There are no words for this language and level yet — they are being generated. Try refreshing in a few seconds or pick another level.',
        to_tests_btn: 'Back to tests', quiz_finished_suffix: ': completed', prev_btn: '◀ Back', next_btn2: 'Next ▶',
        write_in_lang_prompt: 'Write the translation of the word "{word}" ({lang})', your_answer_placeholder: 'your answer',
        click_words_below: 'Tap the words below', correct_variant_prefix: 'Correct answer: {answer}',
        troll_level_badge: 'Troll level {lvl}', xp_to_next: '{xp} XP ({remaining} XP to next level)',
        gear_title: 'Gear', gear_desc: 'Unlocks as your troll levels up. Click to equip/unequip.',
        achievements_title: 'Achievements ({unlocked}/{total})',
        nav_tournaments: '🏆 Tournaments', h_tournaments: 'Tournaments', tourn_no_tournaments: 'No tournaments right now. Check back later!', tourn_status_upcoming: '⏳ Upcoming', tourn_status_active: '🔄 Active', tourn_status_ended: '✅ Ended', tourn_questions_count: '{n} questions', tourn_join_btn: 'Join', tourn_view_results_btn: 'Results', tourn_your_score: 'Your score: {score}/{total}', tourn_starts_at: 'Starts: {date}', tourn_ends_at: 'Ends: {date}',
        tourn_not_started: "This tournament hasn't started yet.", tourn_already_ended: 'This tournament has already ended.', tourn_already_played: "You've already taken part in this tournament.", tourn_back_to_list: '← Back to tournaments',
        tourn_finish_title: '🏆 Tournament complete!', tourn_finish_desc: 'Your score: {correct} of {total} · +50 XP for participating', tourn_leaderboard_title: '📋 Leaderboard', tourn_no_participants: "You're the first participant! Results will show up here as others join.", tourn_you_marker: ' (you)', tourn_submit_error: '⚠️ Failed to save your result. Please try again.', tourn_guest_not_saved: "👤 Your result won't be saved to the leaderboard — sign in with an account for your results to count.",
        home_learn_words_btn: '📇 Learn words', home_vocab_btn: '📚 Vocabulary', home_grammar_btn: '📖 Grammar', home_tests_btn: '📝 Tests', home_listen_btn: '🎧 Listening', home_troll_btn: '🧌 Troll (lvl {lvl})', more_langs_btn: '🌐 More languages…', change_lang_link: 'Change language', viewed_mastered_label: '{seen}/{total} viewed · {mastered} mastered', you_label: ' (you)',
        cl_welcome_title: '🌍 Which language do you want to learn?', cl_welcome_desc: "Pick a language and we'll build a study plan just for it.",
        cl_switch_title: '🌍 Change study language', cl_switch_desc: 'Progress for each language is saved separately — switch freely anytime.',
        cl_cancel_btn: '← Cancel', cl_switched_toast: '✅ You are now learning {lang}',
        norsk_gen_task_btn: '🎲 Generate a new task (AI)', norsk_gen_task_loading: '🎲 Generating…', norsk_task_added_toast: '✅ New task added!', norsk_gen_error_toast: '⚠️ Failed to generate the task. Please try again.', norsk_no_tasks_title: 'No tasks for this level', norsk_no_tasks_desc: 'Tap "Generate a new task" above — AI will create one for this language and level.',
        btn_listen: 'Listen',
        task_default_title: 'Task', pct_correct: '{pct}% correct ({count}/{total})', write_answer_placeholder: 'Write your answer here...', save_answer_btn: '💾 Save answer', check_ai_btn: '🧠 Check with AI', check_ai_loading: '🧠 Troll is checking…', check_ai_wait: 'Please wait, the troll is reading your text and preparing advice…', troll_sensor_advice: '🧌 Troll examiner\'s feedback', answer_saved_toast: '✅ Answer saved! +10 XP', write_before_save_toast: '⚠️ Please write something before saving.', write_before_check_toast: '⚠️ Write something before checking.', ai_check_error: '⚠️ Failed to get AI feedback. Check your connection and try again.', start_recording_btn: '🎤 Start recording (simulated)', recording_started_toast: '🎙️ Recording started... (simulated)', recording_done_toast: '✅ Recording done! You can keep practicing.',
        onb_welcome_title: '👋 Welcome to Fjord!', onb_welcome_desc: "Let's figure out your level and goal so I can build a study plan for you.", onb_more_langs_title: 'The full language list is always available in Settings (Profile)', onb_step_of: 'Step {step} of 3',
        onb_goal_title: '🎯 What is your main goal?', onb_goal_desc: 'Pick the option that best describes your goals.', onb_continue_btn: 'Continue →', onb_step1_indicator: 'Step 1 of 3: Pick a goal',
        onb_test_title: '📝 Placement test', onb_test_desc: "This is a quick test to determine your current level in {lang}. If you already know your level, you can pick it manually.", onb_start_test_btn: 'Start test', onb_pick_manual_btn: 'Pick level manually', onb_pick_level_title: 'Choose your level:', onb_step2_indicator: 'Step 2 of 3: Determine your level', level_test_preparing: 'Preparing questions for your learning language…', level_test_no_words: "There aren't enough words for this language yet to build a test. Pick your level manually — the vocabulary will load on its own after that.",
        leveltest_preparing: '⏳ Preparing the test for your chosen language…', leveltest_translate_q: 'How do you translate "{word}"?',
        onb_plan_title: '🎓 Your study plan', onb_level_tag: 'Level: {level}', onb_goal_chosen: 'Goal selected', onb_start_learning_btn: '🚀 Start learning!', onb_change_goal_btn: '🔄 Change goal', onb_change_level_btn: '📊 Change level', onb_can_change_later: 'You can always change your goal and level in Settings.', onb_step3_indicator: 'Step 3 of 3: Plan ready!', onb_welcome_toast: '🎉 Welcome! Let\'s start learning!',
    },
    ru: {
        nav_home: 'Главная', nav_flashcards: 'Карточки', nav_vocabulary: 'Словарь',
        nav_tests: 'Тесты', nav_grammar: 'Грамматика', nav_books: '📚 Книги', nav_troll: 'Тролль',
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
        stat_words_studied: 'слов изучено', stat_tests: 'тестов', stat_streak_days: 'дней подряд', stat_best_streak: 'лучшая серия',
        calendar_15days: 'Календарь (15 дней)', settings_title: 'Настройки', field_name: 'Имя', field_goal: 'Цель',
        field_goal_placeholder: 'напр. сдать экзамен B1', field_reminder_time: 'Время напоминания', field_pace: 'Темп',
        pace_calm: 'Спокойный', pace_steady: 'Стабильный', pace_intense: 'Интенсивный', save_btn2: 'Сохранить',
        leaderboard_title: 'Таблица лидеров', data_title: 'Данные', data_note: 'Прогресс сохраняется локально под вашим логином.',
        settings_saved: 'Настройки сохранены',
        onb_welcome: 'Добро пожаловать в Fjord!', onb_subtitle: 'Давайте определим ваш уровень и цель, чтобы я мог составить для вас план обучения.',
        onb_step_of: 'Шаг {n} из 3', onb_step1_label: 'Шаг 1 из 3: Выберите цель', onb_step2_label: 'Шаг 2 из 3: Определите уровень', onb_step3_label: 'Шаг 3 из 3: План готов!',
        onb_goal_title: 'Какова ваша главная цель?', onb_goal_sub: 'Выберите один вариант, который лучше всего описывает ваши цели.', onb_continue: 'Продолжить →',
        onb_test_title: 'Входной тест на уровень', onb_test_sub: 'Это быстрый тест, чтобы определить ваш текущий уровень норвежского. Если вы уже знаете свой уровень, можете выбрать его вручную.',
        onb_start_test: 'Начать тест', onb_manual_level: 'Выбрать уровень вручную', onb_choose_level: 'Выберите уровень:',
        onb_plan_title: 'Ваш план обучения', onb_goal_chosen: 'Цель выбрана', onb_start_learning: '🚀 Начать обучение!',
        onb_change_goal: '🔄 Изменить цель', onb_change_level: '📊 Изменить уровень', onb_change_later: 'Вы всегда сможете изменить цель и уровень в настройках.',
        onb_welcome_toast: '🎉 Добро пожаловать! Начинаем обучение!',
        question_word: 'Вопрос', of_word: 'из', field_learn_lang: 'Какой язык изучаете',
        rec_mastered_title: 'Уровень {level} освоен на {pct}%!', rec_mastered_desc: 'Вы изучили {mastered} из {total} слов. Рекомендуем перейти на {rec}.',
        upgrade_level_btn: 'Повысить уровень', hide_btn: 'Скрыть', level_up_toast: 'Уровень повышен до {level}!',
        daily_word_title: 'Слово дня', no_words_for_level: 'Нет слов для этого уровня.', activity_title: 'Активность',
        streak_days_label: 'Серия дней:', detailed_stats_btn: 'Подробная статистика →', level_colon: 'Уровень: {level}',
        change_level_question: 'Хотите изменить уровень или пройти тест заново?', pick_level_manually_btn: 'Выбрать уровень вручную',
        retest_btn: 'Пройти тест уровня снова', daily_task_title: '📅 Задание дня',
        daily_correct_banner: '✅ Правильно! 🎉', daily_xp_toast: '+20 XP за задание дня! 🔥',
        daily_wrong_banner: '❌ Неправильно. Правильный ответ: {answer}', daily_try_tomorrow: 'Попробуй завтра снова! 💪',
        level_set_toast: 'Уровень установлен: {level}', start_learning_btn: 'Начать обучение',
        flash_pick_desc: 'Выберите уровень, тему и режим тренировки. (Язык: {lang})',
        srs_mode_btn: '📅 По расписанию (SRS)', all_cards_mode_btn: '📚 Все карточки',
        mode_flip: 'Запоминание', mode_mc: 'Выбор ответа', mode_type: 'Написание слова',
        no_words_level_lang: 'Нет слов для этого уровня ({lang})', try_other_level: 'Попробуйте другой уровень или добавьте слова через админ-панель.',
        deck_count_label: '{count} слов в колоде', due_review_label: '{count} готовы к повторению (SRS)',
        all_cards_label: 'все карточки', start_session_btn: 'Начать сессию (до {n} карточек)',
        leech_deck_label: '🩹 Сложные слова', leech_deck_count: '{n} слов, которые ты путаешь снова и снова',
        leech_deck_desc: 'Эти слова ты уже несколько раз перепутал подряд. Отработаем их отдельно, пока не закрепятся.',
        grammar_generating_notice: 'Готовим грамматику {lang} для уровня {level}… Через несколько секунд правила появятся сами.',
        grammar_ai_generated_notice: 'Грамматика {lang} ({level}) сгенерирована AI специально для вашего уровня.',
        grammar_generating_notice_all: 'Готовим грамматику {lang} для всех уровней… Разделы появятся здесь по готовности.',
        grammar_ai_generated_notice_all: 'Показаны правила грамматики {lang} для всех уровней — от A1 до C2.',
        grammar_all_levels: 'Все уровни', grammar_empty: 'Правил грамматики пока нет.',
        loading: 'Загрузка…',
        h_books: 'Книги', books_intro: 'Читай реальные тексты общественного достояния на языке, который учишь. Коснись любого слова, чтобы увидеть перевод, и проверь себя заданиями после каждой главы.',
        books_empty: 'Пока нет книг для этого языка. Попробуй другой язык или загляни позже.',
        books_not_found: 'Книга или глава не найдены.', books_chapter_n: 'Глава {n}',
        books_tap_word_hint: '👆 Коснись любого слова в тексте, чтобы увидеть перевод',
        books_back_to_library: 'К библиотеке', books_prev_chapter: 'Предыдущая глава', books_next_chapter: 'Следующая глава',
        books_read_done: 'Прочитано', books_mark_read: 'Отметить прочитанным', books_xp_toast: '+8 XP за прочитанную главу!',
        books_translate_error: 'Не удалось перевести. Попробуй ещё раз.', books_base_form: 'Словарная форма',
        books_no_tasks: 'Для этой главы пока нет заданий.',
        books_tasks_title: 'Задания на понимание прочитанного', books_prev_score: 'Предыдущий результат: {correct}/{total}',
        books_check_answers: 'Проверить ответы', books_score_toast: 'Результат: {correct}/{total}',
        books_progress: 'Прочитано {done} из {total} глав', books_chapters_count: '{total} глав', books_genre_all: 'Все темы',
        empty_no_cards: 'Нет карточек', empty_all_scheduled: 'Все слова запланированы на позже.', to_deck_picker_btn: 'К выбору',
        session_complete_title: 'Сессия завершена!', correct_of_xp: '{correct} из {total} правильно · +{xp} XP', correct_of_total: '{correct} из {total} правильно',
        again_session_btn: 'Ещё одна сессия', to_home_btn: 'На главную',
        flip_hint: 'нажмите, чтобы перевернуть', grade_again: 'Не знаю', grade_hard: 'Сложно', grade_good: 'Знаю',
        type_placeholder: 'напишите здесь...', check_correct: 'Правильно! 🎉', check_wrong_prefix: 'Правильный ответ: {answer}',
        lang_label: 'Язык: {lang}', gen_words_btn: '🎲 AI: добавить новые слова', gen_words_loading: '🎲 Генерирую…',
        gen_words_added_toast: '✅ Добавлено новых слов: {n}', gen_words_none_toast: '🤔 AI не предложил новых уникальных слов. Попробуй ещё раз.',
        gen_words_error_toast: '⚠️ Не удалось сгенерировать слова. Попробуй ещё раз.',
        tests_choose_type: 'Выберите тип упражнения для уровня {level}.',
        test_mc_title: 'Выбор формы', test_mc_desc: 'Выберите правильный перевод или форму.',
        test_cloze_title: 'Заполни пропуск', test_cloze_desc: 'Вставьте пропущенное слово.',
        test_order_title: 'Составь предложение', test_order_desc: 'Расположите слова в правильном порядке.',
        test_listen_title: 'Аудирование', test_listen_desc: 'Прослушайте слово и выберите перевод.',
        test_translate_title: 'Перевод', test_translate_desc: 'Напишите перевод слова.',
        start_test_btn: 'Начать', quiz_preparing_title: 'Готовим слова…',
        quiz_preparing_desc: 'Для этого языка и уровня ещё нет слов — они генерируются. Попробуйте обновить через несколько секунд или выберите другой уровень.',
        to_tests_btn: 'К тестам', quiz_finished_suffix: ': завершено', prev_btn: '◀ Назад', next_btn2: 'Вперёд ▶',
        write_in_lang_prompt: 'Напишите перевод слова «{word}» ({lang})', your_answer_placeholder: 'ваш ответ',
        click_words_below: 'Нажимайте слова снизу', correct_variant_prefix: 'Правильный вариант: {answer}',
        troll_level_badge: 'Уровень тролля {lvl}', xp_to_next: '{xp} XP (до следующего уровня: {remaining} XP)',
        gear_title: 'Снаряжение', gear_desc: 'Разблокируется с повышением уровня тролля. Нажмите, чтобы надеть/снять.',
        achievements_title: 'Достижения ({unlocked}/{total})',
        nav_tournaments: '🏆 Турниры', h_tournaments: 'Турниры', tourn_no_tournaments: 'Сейчас нет турниров. Загляни позже!', tourn_status_upcoming: '⏳ Скоро', tourn_status_active: '🔄 Активный', tourn_status_ended: '✅ Завершён', tourn_questions_count: '{n} заданий', tourn_join_btn: 'Присоединиться', tourn_view_results_btn: 'Результаты', tourn_your_score: 'Твой результат: {score}/{total}', tourn_starts_at: 'Начало: {date}', tourn_ends_at: 'До: {date}',
        tourn_not_started: 'Турнир ещё не начался.', tourn_already_ended: 'Турнир уже завершился.', tourn_already_played: 'Ты уже участвовал(-а) в этом турнире.', tourn_back_to_list: '← К турнирам',
        tourn_finish_title: '🏆 Турнир завершён!', tourn_finish_desc: 'Твой результат: {correct} из {total} · +50 XP за участие', tourn_leaderboard_title: '📋 Таблица результатов', tourn_no_participants: 'Ты первый(-ая) участник(-ца)! Результаты появятся здесь, когда присоединятся другие.', tourn_you_marker: ' (ты)', tourn_submit_error: '⚠️ Не удалось сохранить результат. Попробуй ещё раз.', tourn_guest_not_saved: '👤 Твой результат не сохранится в таблице — играй под аккаунтом, чтобы результаты засчитывались.',
        home_learn_words_btn: '📇 Учить слова', home_vocab_btn: '📚 Словарь', home_grammar_btn: '📖 Грамматика', home_tests_btn: '📝 Тесты', home_listen_btn: '🎧 Аудирование', home_troll_btn: '🧌 Тролль ({lvl} ур.)', more_langs_btn: '🌐 Ещё языки…', change_lang_link: 'Сменить язык', viewed_mastered_label: '{seen}/{total} просмотрено · {mastered} освоено', you_label: ' (вы)',
        cl_welcome_title: '🌍 Какой язык хотите изучать?', cl_welcome_desc: 'Выберите язык — и мы составим для вас план обучения именно под него.',
        cl_switch_title: '🌍 Сменить изучаемый язык', cl_switch_desc: 'Прогресс по каждому языку сохраняется отдельно — можно свободно переключаться.',
        cl_cancel_btn: '← Отмена', cl_switched_toast: '✅ Теперь вы изучаете {lang}',
        norsk_gen_task_btn: '🎲 Сгенерировать новое задание (AI)', norsk_gen_task_loading: '🎲 Генерирую…', norsk_task_added_toast: '✅ Новое задание добавлено!', norsk_gen_error_toast: '⚠️ Не удалось сгенерировать задание. Попробуйте ещё раз.', norsk_no_tasks_title: 'Нет заданий для этого уровня', norsk_no_tasks_desc: 'Нажмите «Сгенерировать новое задание» выше — AI создаст его специально для выбранного языка и уровня.',
        btn_listen: 'Слушать',
        task_default_title: 'Задание', pct_correct: '{pct}% правильно ({count}/{total})', write_answer_placeholder: 'Напишите свой ответ здесь...', save_answer_btn: '💾 Сохранить ответ', check_ai_btn: '🧠 Проверить с AI', check_ai_loading: '🧠 Тролль проверяет…', check_ai_wait: 'Подождите, тролль читает ваш текст и готовит совет…', troll_sensor_advice: '🧌 Совет тролля-экзаменатора', answer_saved_toast: '✅ Ответ сохранён! +10 XP', write_before_save_toast: '⚠️ Пожалуйста, напишите что-нибудь перед сохранением.', write_before_check_toast: '⚠️ Напиши что-нибудь перед проверкой.', ai_check_error: '⚠️ Не удалось получить проверку от AI. Проверь соединение и попробуй ещё раз.', start_recording_btn: '🎤 Начать запись (симуляция)', recording_started_toast: '🎙️ Запись начата... (симуляция)', recording_done_toast: '✅ Запись готова! Можешь тренироваться дальше.',
        onb_welcome_title: '👋 Добро пожаловать в Fjord!', onb_welcome_desc: 'Давайте определим ваш уровень и цель, чтобы я мог составить для вас план обучения.', onb_more_langs_title: 'Полный список языков всегда доступен в Настройках (Кабинет)', onb_step_of: 'Шаг {step} из 3',
        onb_goal_title: '🎯 Какова ваша главная цель?', onb_goal_desc: 'Выберите один вариант, который лучше всего описывает ваши цели.', onb_continue_btn: 'Продолжить →', onb_step1_indicator: 'Шаг 1 из 3: Выберите цель',
        onb_test_title: '📝 Вступительный тест на уровень', onb_test_desc: 'Это быстрый тест, чтобы определить ваш текущий уровень языка «{lang}». Если вы уже знаете свой уровень, можете выбрать его вручную.', onb_start_test_btn: 'Начать тест', onb_pick_manual_btn: 'Выбрать уровень вручную', onb_pick_level_title: 'Выберите уровень:', onb_step2_indicator: 'Шаг 2 из 3: Определите уровень', level_test_preparing: 'Готовим вопросы под ваш язык обучения…', level_test_no_words: 'Для этого языка пока маловато слов, чтобы составить тест. Выберите уровень вручную — словарь подгрузится сам.',
        leveltest_preparing: '⏳ Готовим тест для выбранного языка…', leveltest_translate_q: 'Как переводится «{word}»?',
        onb_plan_title: '🎓 Ваш план обучения', onb_level_tag: 'Уровень: {level}', onb_goal_chosen: 'Цель выбрана', onb_start_learning_btn: '🚀 Начать обучение!', onb_change_goal_btn: '🔄 Изменить цель', onb_change_level_btn: '📊 Изменить уровень', onb_can_change_later: 'Вы всегда сможете изменить цель и уровень в настройках.', onb_step3_indicator: 'Шаг 3 из 3: План готов!', onb_welcome_toast: '🎉 Добро пожаловать! Начинаем обучение!',
    },
};

function t(key) {
    let lang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || null;
    if (!lang) {
        try { lang = localStorage.getItem('fjord_ui_lang') || 'uk'; } catch (e) { lang = 'uk'; }
    }
    return (UI_STRINGS[lang] && UI_STRINGS[lang][key]) || UI_STRINGS.uk[key] || key;
}

// Як t(), але підставляє значення у плейсхолдери виду {ім'я}. Наприклад:
// tf('correct_of_xp', {correct: 4, total: 6, xp: 12}) при рядку
// '{correct} із {total} правильно · +{xp} XP' поверне готовий рядок.
function tf(key, vars) {
    let s = t(key);
    if (vars) {
        Object.keys(vars).forEach(k => { s = s.split('{' + k + '}').join(vars[k]); });
    }
    return s;
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

// =====================================================================
//  ПЕРЕКЛАД ТЕМ СЛІВ ("t" у VOCAB) — раніше завжди показувались
//  українською незалежно від мови інтерфейсу. Вбудований словник має
//  закритий список із 63 тем — покриваємо їх мапою тут. Теми, згенеровані
//  через AI для власних слів користувача, теж часто збігаються з цим
//  списком (AI генерує теми українською за задумом), а якщо не збігаються
//  — просто показуються як є (без помилки).
const TOPIC_TRANSLATIONS = {
    'Ідіоми': { en: 'Idioms', ru: 'Идиомы' },
    'Їжа': { en: 'Food', ru: 'Еда' },
    'Абстрактне': { en: 'Abstract', ru: 'Абстрактное' },
    'Абстрактні': { en: 'Abstract', ru: 'Абстрактные' },
    'Академічна': { en: 'Academic', ru: 'Академическая' },
    'Банк': { en: 'Bank', ru: 'Банк' },
    'Бізнес': { en: 'Business', ru: 'Бизнес' },
    'Дискурс': { en: 'Discourse', ru: 'Дискурс' },
    'Дні тижня': { en: 'Days of the week', ru: 'Дни недели' },
    'Довкілля': { en: 'Environment', ru: 'Окружающая среда' },
    'Дозвілля': { en: 'Leisure', ru: 'Досуг' },
    'Дім': { en: 'Home', ru: 'Дом' },
    'Дієслова': { en: 'Verbs', ru: 'Глаголы' },
    'Економіка': { en: 'Economy', ru: 'Экономика' },
    'Емоції': { en: 'Emotions', ru: 'Эмоции' },
    "Здоров'я": { en: 'Health', ru: 'Здоровье' },
    'Кольори': { en: 'Colors', ru: 'Цвета' },
    'Культура': { en: 'Culture', ru: 'Культура' },
    'Кухня': { en: 'Cuisine', ru: 'Кухня' },
    'Лінгвістика': { en: 'Linguistics', ru: 'Лингвистика' },
    'Літературознавство': { en: 'Literary studies', ru: 'Литературоведение' },
    'Меблі': { en: 'Furniture', ru: 'Мебель' },
    'Медицина': { en: 'Medicine', ru: 'Медицина' },
    'Медіа': { en: 'Media', ru: 'Медиа' },
    'Місто': { en: 'City', ru: 'Город' },
    'Місяці': { en: 'Months', ru: 'Месяцы' },
    'Напрямки': { en: 'Directions', ru: 'Направления' },
    'Наука': { en: 'Science', ru: 'Наука' },
    'Нюанси': { en: 'Nuances', ru: 'Нюансы' },
    'Одяг': { en: 'Clothes', ru: 'Одежда' },
    'Освіта': { en: 'Education', ru: 'Образование' },
    'Побут': { en: 'Everyday life', ru: 'Быт' },
    'Погода': { en: 'Weather', ru: 'Погода' },
    'Подорожі': { en: 'Travel', ru: 'Путешествия' },
    'Покупки': { en: 'Shopping', ru: 'Покупки' },
    'Політика': { en: 'Politics', ru: 'Политика' },
    'Пошта': { en: 'Post', ru: 'Почта' },
    'Право': { en: 'Law', ru: 'Право' },
    'Привітання': { en: 'Greetings', ru: 'Приветствия' },
    'Прийменники': { en: 'Prepositions', ru: 'Предлоги' },
    'Прикметники': { en: 'Adjectives', ru: 'Прилагательные' },
    'Природа': { en: 'Nature', ru: 'Природа' },
    'Професії': { en: 'Professions', ru: 'Профессии' },
    'Психологія': { en: 'Psychology', ru: 'Психология' },
    'Ресторан': { en: 'Restaurant', ru: 'Ресторан' },
    'Риторика': { en: 'Rhetoric', ru: 'Риторика' },
    'Робота': { en: 'Work', ru: 'Работа' },
    'Родина': { en: 'Family', ru: 'Семья' },
    'Рідкісна лексика': { en: 'Rare vocabulary', ru: 'Редкая лексика' },
    'Свята': { en: 'Holidays', ru: 'Праздники' },
    'Соціологія': { en: 'Sociology', ru: 'Социология' },
    'Спорт': { en: 'Sport', ru: 'Спорт' },
    'Стилістика': { en: 'Stylistics', ru: 'Стилистика' },
    'Стосунки': { en: 'Relationships', ru: 'Отношения' },
    'Тварини': { en: 'Animals', ru: 'Животные' },
    'Технologiї': { en: 'Technology', ru: 'Технологии' }, // так у вихідних даних (є друкарська помилка — латинська "logi"), лишаємо ключ як є, щоб збігався
    'Технології': { en: 'Technology', ru: 'Технологии' },
    'Транспорт': { en: 'Transport', ru: 'Транспорт' },
    'Тіло': { en: 'Body', ru: 'Тело' },
    'Філософія': { en: 'Philosophy', ru: 'Философия' },
    'Хобі': { en: 'Hobbies', ru: 'Хобби' },
    'Числа': { en: 'Numbers', ru: 'Числа' },
    'Школа': { en: 'School', ru: 'Школа' },
};
function translateTopic(topic, lang) {
    lang = lang || (typeof STATE !== 'undefined' && STATE && STATE.vocabLang) || 'uk';
    if (lang === 'uk' || !topic) return topic;
    const entry = TOPIC_TRANSLATIONS[topic];
    return (entry && entry[lang]) || topic; // немає перекладу — показуємо як є, а не порожньо
}

// Назва мови перекладу слів (uk/en/ru) поточною мовою інтерфейсу — потрібна
// для підказок на кшталт "Напишіть переклад слова (Англійська)".
const INTERFACE_LANG_NAMES = {
    uk: { uk: 'Українська', en: 'English', ru: 'Русский' },
    en: { uk: 'Ukrainian', en: 'English', ru: 'Russian' },
    ru: { uk: 'Украинский', en: 'Английский', ru: 'Русский' },
};
function interfaceLangName(code) {
    const uiLang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    return (INTERFACE_LANG_NAMES[uiLang] && INTERFACE_LANG_NAMES[uiLang][code]) || code;
}
// Назва мови вивчення (з LANGUAGES у languages.js) поточною мовою інтерфейсу.
function targetLangDisplayName(code) {
    const uiLang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    if (typeof getLanguage !== 'function') return code;
    const l = getLanguage(code);
    return (l && l.name && (l.name[uiLang] || l.name.uk)) || code;
}

// Деякі дані (наприклад GOALS у data.js) зберігають переклад як окремі поля
// на кшталт label_en/label_ru поруч з базовим (українським) label/desc.
// localizedField(goal, 'label') поверне label_en/label_ru, якщо мова
// інтерфейсу не українська і таке поле є, інакше — базове українське.
function localizedField(obj, base) {
    if (!obj) return '';
    const uiLang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    if (uiLang !== 'uk' && obj[base + '_' + uiLang]) return obj[base + '_' + uiLang];
    return obj[base] || '';
}
