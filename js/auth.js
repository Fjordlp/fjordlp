
// =====================================================================
//  AUTH LOGIC
//  Примітка: після кожного успішного входу (гість / пароль / відновлена
//  сесія) викликаємо initAssistantWidget() — це один раз створює і
//  "озброює" бічну панель AI-помічника (див. js/assistant.js), яка
//  потім живе поверх усіх вкладок незалежно від навігації.
// =====================================================================
let isLogin = true;

// ---- Допоміжна функція для визначення, чи показувати вибір мови ----
function shouldShowLanguageChoice() {
    // Якщо _targetLangChosen вже true – не показуємо
    if (STATE && STATE._targetLangChosen) return false;
    // Якщо є дані – не показуємо
    if (STATE && hasExistingData(STATE)) return false;
    // Для нових користувачів – показуємо
    return true;
}

function initAuth() {
    const authPage = document.getElementById('authPage');
    const app = document.getElementById('app');
    const loginInput = document.getElementById('authLogin');
    const passwordInput = document.getElementById('authPassword');
    const errorEl = document.getElementById('authError');
    const submitBtn = document.getElementById('authSubmit');
    const toggleLink = document.getElementById('authToggle');
    const titleEl = document.getElementById('authTitle');

    // Захист: якщо якогось ключового елемента форми входу немає в DOM
    // (розбіжність id між HTML і цим скриптом), далі йдуть звернення до
    // .onclick/.value/.textContent на цих змінних, які кинули б помилку
    // і зупинили б initAuth() на півдорозі — сторінка входу лишилась би
    // напівпорожньою чи взагалі нерпацездатною без жодного пояснення в
    // інтерфейсі. Тому виходимо одразу з чітким повідомленням у консоль.
    const required = { authPage, app, loginInput, passwordInput, errorEl, submitBtn, toggleLink, titleEl };
    const missing = Object.keys(required).filter(k => !required[k]);
    if (missing.length) {
        console.error('[auth] Не знайдено елемент(и) форми входу в HTML:', missing, '— initAuth() перервано.');
        return;
    }

    function getInitialRoute() {
        if (STATE) {
            const hasData = (function checkData() {
                if (STATE.langData && typeof STATE.langData === 'object') {
                    for (const lang in STATE.langData) {
                        const data = STATE.langData[lang];
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
                if (STATE.xp > 0) return true;
                if (STATE.stats && STATE.stats.wordsSeen && Object.keys(STATE.stats.wordsSeen).length > 0) return true;
                if (STATE.stats && STATE.stats.testsCompleted > 0) return true;
                if (STATE.customWords && STATE.customWords.length > 0) return true;
                if (STATE.targetLang && STATE.targetLang !== 'no') return true;
                if (STATE.name && STATE.name !== 'Гість') return true;
                return false;
            })();

            if (hasData) {
                STATE._onboardingDone = true;
                STATE._targetLangChosen = true;
                updateState();
                return 'home';
            }
        }

        if (shouldShowLanguageChoice()) return 'choose-language';
        if (shouldShowOnboarding()) return 'onboarding';
        return 'home';
    }

    function switchMode() {
        isLogin = !isLogin;
        titleEl.textContent = isLogin ? t('login_title') : t('register_title');
        submitBtn.textContent = isLogin ? t('submit_login') : t('submit_register');
        toggleLink.textContent = isLogin ? t('toggle_to_register') : t('toggle_to_login');
        errorEl.textContent = '';
        loginInput.value = '';
        passwordInput.value = '';
    }

    toggleLink.onclick = switchMode;

    // ---- Hero-кнопки лендингу ----
    const heroTryBtn = document.getElementById('heroTryBtn');
    if (heroTryBtn) {
        heroTryBtn.onclick = () => document.getElementById('guestBtn').click();
    }
    const heroLoginBtn = document.getElementById('heroLoginBtn');
    if (heroLoginBtn) {
        heroLoginBtn.onclick = () => {
            document.getElementById('authBox').scrollIntoView({ behavior: 'smooth', block: 'center' });
            loginInput.focus();
        };
    }
    const heroTrollEl = document.getElementById('heroTroll');
    if (heroTrollEl && typeof trollSVG === 'function') {
        heroTrollEl.innerHTML = trollSVG('happy', 88, {});
    }

    // ---- Гостьовий вхід ----
    const guestBtnEl = document.getElementById('guestBtn');
    if (guestBtnEl) guestBtnEl.onclick = () => {
        let guestState = getGuestState();
        if (!guestState) {
            guestState = ensureStateDefaults({
                name: 'Гість',
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
            saveGuestState(guestState);
        }
        currentUser = 'guest';
        STATE = ensureStateDefaults(guestState);
        isGuest = true;
        saveSession('guest', true);
        authPage.style.display = 'none';
        app.classList.add('active');
        initAssistantWidget();
        checkAndApplyStreakFreeze();
        navigate(getInitialRoute());
        toast(t('welcome_guest_toast'));
    };

    // ---- Скидання пароля ----
    const forgotPasswordLinkEl = document.getElementById('forgotPasswordLink');
    if (forgotPasswordLinkEl) forgotPasswordLinkEl.onclick = async () => {
        const email = prompt(t('reset_email_prompt'));
        if (!email) return;

        try {
            await waitForFirebase(5000);
            if (!firebaseAuth) {
                toast(t('firebase_not_ready_toast'));
                return;
            }
            await firebaseAuth.sendPasswordResetEmail(email);
            toast(t('reset_email_sent'));
        } catch (e) {
            let msg = t('reset_error_prefix');
            if (e.code === 'auth/user-not-found') {
                msg += t('reset_user_not_found');
            } else if (e.code === 'auth/invalid-email') {
                msg += t('reset_invalid_email');
            } else {
                msg += e.message;
            }
            toast(msg);
        }
    };

    // ---- Основний обробник входу/реєстрації ----
    submitBtn.onclick = async () => {
        const login = loginInput.value.trim();
        const password = passwordInput.value.trim();
        if (!login || !password) {
            errorEl.textContent = t('fill_both_fields');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = t('please_wait');
        errorEl.textContent = '';

        try {
            await waitForFirebase(5000);
        } catch (e) {
            errorEl.textContent = t('firebase_not_ready_retry');
            submitBtn.disabled = false;
            submitBtn.textContent = isLogin ? t('submit_login') : t('submit_register');
            return;
        }

        if (!firebaseAuth) {
            errorEl.textContent = t('auth_generic_error');
            submitBtn.disabled = false;
            submitBtn.textContent = isLogin ? t('submit_login') : t('submit_register');
            return;
        }

        if (isLogin) {
            const result = await signInWithFirebase(login, password);
            if (!result.success) {
                errorEl.textContent = result.error || t('invalid_login_password');
                submitBtn.disabled = false;
                submitBtn.textContent = t('submit_login');
                return;
            }
            // Успішний вхід – редірект відбудеться в onAuthStateChanged
            currentUser = login;
            isGuest = false;
            // ❌ ВИДАЛЕНО: saveSession(currentUser, false); – більше не потрібно
            authPage.style.display = 'none';
            app.classList.add('active');
            initAssistantWidget();
            checkAndApplyStreakFreeze();
            navigate(getInitialRoute());
            toast(tf('welcome_user_toast', { name: STATE.name || login }));
        } else {
            const result = await signUpWithFirebase(login, password);
            if (!result.success) {
                errorEl.textContent = result.error || t('register_error_generic');
                submitBtn.disabled = false;
                submitBtn.textContent = t('submit_register');
                return;
            }
            toast(t('register_success_toast'));
            switchMode();
            submitBtn.disabled = false;
            submitBtn.textContent = t('submit_login');
        }
    };

    loginInput.onkeydown = (e) => { if (e.key === 'Enter') submitBtn.click(); };
    passwordInput.onkeydown = (e) => { if (e.key === 'Enter') submitBtn.click(); };

    // ---- Відновлення сесії (ТІЛЬКИ ДЛЯ ГОСТІВ) ----
    const session = loadSession();
    if (session && session.guest) {
        const guestState = getGuestState();
        if (guestState) {
            STATE = ensureStateDefaults(guestState);
            currentUser = 'guest';
            isGuest = true;
            authPage.style.display = 'none';
            app.classList.add('active');
            initAssistantWidget();
            checkAndApplyStreakFreeze();
            navigate(getInitialRoute());
        }
    }
}

// ---- Вихід ----
// Прив'язуємо клік через делегування на document, а не напряму до
// #logoutBtn: якщо на момент виконання цього файлу елемента з таким id
// ще немає в DOM (наприклад, кнопка виходу — частина розмітки #app, яка
// може підвантажуватись/малюватись окремо), пряме звернення до
// .onclick на null ламало б ВЕСЬ auth.js — а разом з ним і виклик
// initAuth() нижче, через що сторінка входу не ініціалізувалась би
// взагалі (порожній екран без форми входу).
document.addEventListener('click', async (e) => {
    const btn = e.target.closest && e.target.closest('#logoutBtn');
    if (!btn) return;
    if (firebaseReady && firebaseUser) {
        await signOutFromFirebase();
    } else {
        clearSession();
        document.getElementById('app').classList.remove('active');
        document.getElementById('authPage').style.display = 'flex';
        toast(t('logged_out_toast'));
    }
});

// ---- Ініціалізація ----
initAuth();
applyStaticTranslations();

// Експортуємо navigate для використання в onclick
window.navigate = navigate;
window.toast = toast;
=======
// =====================================================================
//  AUTH LOGIC
//  Примітка: після кожного успішного входу (гість / пароль / відновлена
//  сесія) викликаємо initAssistantWidget() — це один раз створює і
//  "озброює" бічну панель AI-помічника (див. js/assistant.js), яка
//  потім живе поверх усіх вкладок незалежно від навігації.
// =====================================================================
let isLogin = true;

// ---- Допоміжна функція для визначення, чи показувати вибір мови ----
function shouldShowLanguageChoice() {
    // Якщо _targetLangChosen вже true – не показуємо
    if (STATE && STATE._targetLangChosen) return false;
    // Якщо є дані – не показуємо
    if (STATE && hasExistingData(STATE)) return false;
    // Для нових користувачів – показуємо
    return true;
}

function initAuth() {
    const authPage = document.getElementById('authPage');
    const app = document.getElementById('app');
    const loginInput = document.getElementById('authLogin');
    const passwordInput = document.getElementById('authPassword');
    const errorEl = document.getElementById('authError');
    const submitBtn = document.getElementById('authSubmit');
    const toggleLink = document.getElementById('authToggle');
    const titleEl = document.getElementById('authTitle');

    function getInitialRoute() {
        if (STATE) {
            const hasData = (function checkData() {
                if (STATE.langData && typeof STATE.langData === 'object') {
                    for (const lang in STATE.langData) {
                        const data = STATE.langData[lang];
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
                if (STATE.xp > 0) return true;
                if (STATE.stats && STATE.stats.wordsSeen && Object.keys(STATE.stats.wordsSeen).length > 0) return true;
                if (STATE.stats && STATE.stats.testsCompleted > 0) return true;
                if (STATE.customWords && STATE.customWords.length > 0) return true;
                if (STATE.name && STATE.name !== 'Гість') return true;
                return false;
            })();

            if (hasData) {
                STATE._onboardingDone = true;
                STATE._targetLangChosen = true;
                updateState();
                // Тепер /flashcards, /vocabulary тощо — справжні URL
                // (js/router.js). Якщо користувач перезавантажив сторінку
                // або відкрив застосунок у новій вкладці саме на такому
                // посиланні, відкриваємо саме ЇЇ, а не завжди "Головну" —
                // інакше "справжній" URL був би справжнім лише на вигляд.
                const urlRoute = (typeof routeFromLocation === 'function') ? routeFromLocation() : null;
                return urlRoute || 'home';
            }
        }

        // Онбординг і вибір мови навчання завжди в пріоритеті над URL —
        // їх не можна "перестрибнути" прямим посиланням на іншу сторінку.
        if (shouldShowLanguageChoice()) return 'choose-language';
        if (shouldShowOnboarding()) return 'onboarding';
        return 'home';
    }
    // Раніше onAuthStateChanged (js/firebase-auth.js) на відновлену сесію
    // завжди робив navigate('home') напряму, в обхід цієї ж таки
    // getInitialRoute() — тож зареєстрований користувач, який ще не
    // пройшов вибір мови/онбординг, при перезавантаженні сторінки
    // потрапляв одразу на Головну, минаючи обов'язкові перші екрани.
    // Експортуємо функцію, щоб обидва місця входу використовували ту
    // саму логіку визначення першого маршруту.
    window.getInitialRoute = getInitialRoute;

    function switchMode() {
        isLogin = !isLogin;
        titleEl.textContent = isLogin ? 'Вхід' : 'Реєстрація';
        submitBtn.textContent = isLogin ? 'Увійти' : 'Зареєструватися';
        toggleLink.textContent = isLogin ? 'Ще немає акаунта? Зареєструватися' : 'Вже є акаунт? Увійти';
        errorEl.textContent = '';
        loginInput.value = '';
        passwordInput.value = '';
    }

    toggleLink.onclick = switchMode;

    // ---- Hero-кнопки лендингу ----
    const heroTryBtn = document.getElementById('heroTryBtn');
    if (heroTryBtn) {
        heroTryBtn.onclick = () => document.getElementById('guestBtn').click();
    }
    const heroLoginBtn = document.getElementById('heroLoginBtn');
    if (heroLoginBtn) {
        heroLoginBtn.onclick = () => {
            document.getElementById('authBox').scrollIntoView({ behavior: 'smooth', block: 'center' });
            loginInput.focus();
        };
    }
    const heroTrollEl = document.getElementById('heroTroll');
    if (heroTrollEl && typeof trollSVG === 'function') {
        heroTrollEl.innerHTML = trollSVG('happy', 88, {});
    }

    // ---- Гостьовий вхід ----
    document.getElementById('guestBtn').onclick = () => {
        let guestState = getGuestState();
        if (!guestState) {
            guestState = ensureStateDefaults({
                name: 'Гість',
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
            saveGuestState(guestState);
        }
        currentUser = 'guest';
        STATE = ensureStateDefaults(guestState);
        isGuest = true;
        saveSession('guest', true);
        authPage.style.display = 'none';
        app.classList.add('active');
        initAssistantWidget();
        checkAndApplyStreakFreeze();
        navigate(getInitialRoute());
        toast('🎮 Ласкаво просимо! Ви в режимі гостя. Дані зберігаються локально.');
    };

    // ---- Скидання пароля ----
    document.getElementById('forgotPasswordLink').onclick = async () => {
        const email = prompt('Введіть вашу електронну пошту, щоб отримати посилання для скидання пароля:');
        if (!email) return;

        try {
            await waitForFirebase(5000);
            if (!firebaseAuth) {
                toast('⏳ Firebase ще не готовий, спробуйте пізніше.');
                return;
            }
            await firebaseAuth.sendPasswordResetEmail(email);
            toast('✅ Посилання для скидання пароля надіслано на вашу пошту!');
        } catch (e) {
            let msg = '❌ Помилка: ';
            if (e.code === 'auth/user-not-found') {
                msg += 'Користувача з такою поштою не знайдено.';
            } else if (e.code === 'auth/invalid-email') {
                msg += 'Невірний формат електронної пошти.';
            } else {
                msg += e.message;
            }
            toast(msg);
        }
    };

    // ---- Основний обробник входу/реєстрації ----
    submitBtn.onclick = async () => {
        const login = loginInput.value.trim();
        const password = passwordInput.value.trim();
        if (!login || !password) {
            errorEl.textContent = 'Заповніть обидва поля';
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Зачекайте...';
        errorEl.textContent = '';

        try {
            await waitForFirebase(5000);
        } catch (e) {
            errorEl.textContent = '⏳ Firebase ще не готовий, зачекайте кілька секунд і спробуйте знову.';
            submitBtn.disabled = false;
            submitBtn.textContent = isLogin ? 'Увійти' : 'Зареєструватися';
            return;
        }

        if (!firebaseAuth) {
            errorEl.textContent = '⏳ Помилка авторизації, перезавантажте сторінку.';
            submitBtn.disabled = false;
            submitBtn.textContent = isLogin ? 'Увійти' : 'Зареєструватися';
            return;
        }

        if (isLogin) {
            const result = await signInWithFirebase(login, password);
            if (!result.success) {
                errorEl.textContent = result.error || 'Невірний логін або пароль';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Увійти';
                return;
            }
            // Успішний вхід – редірект відбудеться в onAuthStateChanged
            currentUser = login;
            isGuest = false;
            // ❌ ВИДАЛЕНО: saveSession(currentUser, false); – більше не потрібно
            authPage.style.display = 'none';
            app.classList.add('active');
            initAssistantWidget();
            checkAndApplyStreakFreeze();
            navigate(getInitialRoute());
            toast(`Ласкаво просимо, ${STATE.name || login}!`);
        } else {
            const result = await signUpWithFirebase(login, password);
            if (!result.success) {
                errorEl.textContent = result.error || 'Помилка реєстрації';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Зареєструватися';
                return;
            }
            toast('Реєстрація успішна! Тепер увійдіть.');
            switchMode();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Увійти';
        }
    };

    loginInput.onkeydown = (e) => { if (e.key === 'Enter') submitBtn.click(); };
    passwordInput.onkeydown = (e) => { if (e.key === 'Enter') submitBtn.click(); };

    // ---- Відновлення сесії (ТІЛЬКИ ДЛЯ ГОСТІВ) ----
    const session = loadSession();
    if (session && session.guest) {
        const guestState = getGuestState();
        if (guestState) {
            STATE = ensureStateDefaults(guestState);
            currentUser = 'guest';
            isGuest = true;
            authPage.style.display = 'none';
            app.classList.add('active');
            initAssistantWidget();
            checkAndApplyStreakFreeze();
            navigate(getInitialRoute());
        }
    }
}

// ---- Вихід ----
document.getElementById('logoutBtn').onclick = async () => {
    if (firebaseReady && firebaseUser) {
        await signOutFromFirebase();
    } else {
        clearSession();
        document.getElementById('app').classList.remove('active');
        document.getElementById('authPage').style.display = 'flex';
        resetRouterForLogout();
        toast('Ви вийшли з акаунта');
    }
};

// ---- Ініціалізація ----
initAuth();
applyStaticTranslations();

// Експортуємо navigate для використання в onclick
window.navigate = navigate;
window.toast = toast;

// ---- Вихід (гостьовий, без перезавантаження сторінки) ----
// На відміну від виходу через Firebase (signOutFromFirebase() робить
// повний location.reload(), який сам скидає й URL, і історію), тут
// сторінка НЕ перезавантажується — тож треба вручну повернути адресний
// рядок і стан навігації до "чистого" вигляду, інакше після виходу
// URL міг би й далі показувати, наприклад, /vocabulary поверх екрана
// входу, а наступний вхід почав би історію не з чистого аркуша.
function resetRouterForLogout() {
    ROUTE = 'home';
    SUBSTATE = {};
    _historyInitialized = false;
    try { history.replaceState(null, '', '/'); } catch (e) { /* ignore */ }
}
window.resetRouterForLogout = resetRouterForLogout;
>>>>>>> f32e6e280b4b9a4bd3c3cc459f3713ec6b980d8a
