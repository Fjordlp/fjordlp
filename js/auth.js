// =====================================================================
//  AUTH LOGIC
//  Примітка: після кожного успішного входу (гість / пароль / відновлена
//  сесія) викликаємо initAssistantWidget() — це один раз створює і
//  "озброює" бічну панель AI-помічника (див. js/assistant.js), яка
//  потім живе поверх усіх вкладок незалежно від навігації.
// =====================================================================
let isLogin = true;

function initAuth() {
    const authPage = document.getElementById('authPage');
    const app = document.getElementById('app');
    const loginInput = document.getElementById('authLogin');
    const passwordInput = document.getElementById('authPassword');
    const errorEl = document.getElementById('authError');
    const submitBtn = document.getElementById('authSubmit');
    const toggleLink = document.getElementById('authToggle');
    const titleEl = document.getElementById('authTitle');

    // ---- Визначення початкового маршруту після входу ----
    // Раніше цей блок (shouldShowLanguageChoice/shouldShowOnboarding)
    // дослівно повторювався в 3 місцях (гість/логін/відновлена сесія).
    // Винесено в одну функцію — і заразом додано захист від показу
    // онбордингу ІСНУЮЧИМ користувачам: якщо в акаунті вже є реальний
    // прогрес (XP, вивчені слова, пройдені тести, власні слова, SRS-дані
    // по будь-якій мові) — це точно не новачок, навіть якщо прапорець
    // _onboardingDone з якоїсь причини не виставлений (наприклад, дані
    // імпортовані/відновлені вручну).
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
                // Перевіряємо й старі "плоскі" поля (дані до переходу на langData)
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

        // Блокуємо кнопку, щоб уникнути подвійних кліків
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
            saveSession(currentUser, false);
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
            switchMode(); // Перемикаємо на вхід
            submitBtn.disabled = false;
            submitBtn.textContent = 'Увійти';
        }
    };

    loginInput.onkeydown = (e) => { if (e.key === 'Enter') submitBtn.click(); };
    passwordInput.onkeydown = (e) => { if (e.key === 'Enter') submitBtn.click(); };

    // ---- Відновлення сесії ----
    if (loadSession()) {
        authPage.style.display = 'none';
        app.classList.add('active');
        initAssistantWidget();
        checkAndApplyStreakFreeze();
        navigate(getInitialRoute());
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
        toast('Ви вийшли з акаунта');
    }
};

// ---- Ініціалізація ----
initAuth();
applyStaticTranslations();

// Експортуємо navigate для використання в onclick
window.navigate = navigate;
window.toast = toast;