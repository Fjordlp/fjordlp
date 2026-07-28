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

            // Гостьовий вхід
            document.getElementById('guestBtn').onclick = () => {
                let guestState = getGuestState();
                if (!guestState) {
                    guestState = ensureStateDefaults({
                        name: 'Гість',
                        level: 'A1',
                        levelTestDone: false,
                        srs: {},
                        stats: { wordsSeen: {}, testsCompleted: 0, sessionCount: 0, activityDates: [],
                            bestStreak: 0 },
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
                if (shouldShowOnboarding()) {
    navigate('onboarding');
} else {
    navigate('home');
}
                toast('🎮 Ласкаво просимо! Ви в режимі гостя. Дані зберігаються локально.');
            };
// ===== СКИДАННЯ ПАРОЛЯ =====
document.getElementById('forgotPasswordLink').onclick = async () => {
    // Запитуємо email
    const email = prompt('Введіть вашу електронну пошту, щоб отримати посилання для скидання пароля:');
    if (!email) return;

    try {
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

           submitBtn.onclick = async () => {
  const login = loginInput.value.trim();
  const password = passwordInput.value.trim();
  if (!login || !password) {
    errorEl.textContent = 'Заповніть обидва поля';
    return;
  }
  if (isLogin) {
    const result = await signInWithFirebase(login, password);
    if (!result.success) {
      errorEl.textContent = result.error || 'Невірний логін або пароль';
      return;
    }
    currentUser = login;
    isGuest = false;
    saveSession(currentUser, false);
    authPage.style.display = 'none';
    app.classList.add('active');
    initAssistantWidget();
    if (shouldShowOnboarding()) {
    navigate('onboarding');
} else {
    navigate('home');
}
    toast(`Ласкаво просимо, ${STATE.name || login}!`);
  } else {
    const result = await signUpWithFirebase(login, password);
    if (!result.success) {
      errorEl.textContent = result.error || 'Помилка реєстрації';
      return;
    }
    toast('Реєстрація успішна! Тепер увійдіть.');
    switchMode();
  }
};
            loginInput.onkeydown = (e) => { if (e.key === 'Enter') submitBtn.click(); };
            passwordInput.onkeydown = (e) => { if (e.key === 'Enter') submitBtn.click(); };

            if (loadSession()) {
                authPage.style.display = 'none';
                app.classList.add('active');
                initAssistantWidget();
                navigate('home');
            }
        }

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

        initAuth();
        applyStaticTranslations();

        // Експортуємо navigate для використання в onclick
        window.navigate = navigate;
        window.toast = toast;
