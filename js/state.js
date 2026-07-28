        const USERS_KEY = 'fjord_users';
        const GUEST_KEY = 'fjord_guest';

        function getUsers() { try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; } catch { return {}; } }
        function saveUsers(u) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }

        function getGuestState() {
            try { const raw = localStorage.getItem(GUEST_KEY); if (raw) { const d = JSON.parse(raw); return ensureStateDefaults(
                    d); } } catch { }
            return null;
        }

        function saveGuestState(state) {
            localStorage.setItem(GUEST_KEY, JSON.stringify(state));
        }

        // Примітка щодо безпеки: раніше тут була функція createUser(login,
        // password), яка зберігала пароль ВІДКРИТИМ ТЕКСТОМ у localStorage.
        // Вона ніде не викликалась (реальна автентифікація йде тільки через
        // Firebase — signInWithFirebase/signUpWithFirebase), тож це був
        // мертвий, але небезпечний код. Видалено. getUserData/saveUserData
        // нижче — це лише локальний кеш ВЛАСНОГО стану користувача (без
        // пароля), паралельний до Firestore, для офлайн-стійкості.

        function ensureStateDefaults(state) {
            if (!state) return state;
            if (typeof state.xp !== 'number') state.xp = 0;
            if (!Array.isArray(state.achievements)) state.achievements = [];
            if (!state.trollGear) state.trollGear = { equipped: { hat: null, glasses: null, bg: null }, unlocked: [] };
            if (!state.trollGear.equipped) state.trollGear.equipped = { hat: null, glasses: null, bg: null };
            if (!Array.isArray(state.trollGear.unlocked)) state.trollGear.unlocked = [];
            if (!Array.isArray(state.lessonsDone)) state.lessonsDone = [];
            if (!state.stats) state.stats = { wordsSeen: {}, testsCompleted: 0, sessionCount: 0, activityDates: [],
                bestStreak: 0 };
            if (typeof state.streak !== 'number') state.streak = 0;
            if (typeof state.leaderboardScore !== 'number') state.leaderboardScore = 0;
            if (!Array.isArray(state.assistantChat)) state.assistantChat = [];
            if (!Array.isArray(state.customWords)) state.customWords = [];
            if (!state.customNorskTasks || typeof state.customNorskTasks !== 'object') state.customNorskTasks = {};
            if (!state.uiLang) {
                let stored = 'uk';
                try { stored = localStorage.getItem('fjord_ui_lang') || 'uk'; } catch (e) { /* ignore */ }
                state.uiLang = stored;
            }
            if (!state.vocabLang) state.vocabLang = state.uiLang;
            if (!state.wordTranslations || typeof state.wordTranslations !== 'object') state.wordTranslations = {};
            return state;
        }

        function getUserData(login) { const u = getUsers(); return u[login] ? ensureStateDefaults(u[login]) : null; }

        function saveUserData(login, data) {
            const u = getUsers();
            if (!u[login]) return false;
            u[login] = data;
            saveUsers(u);
            return true;
        }

        let currentUser = null;
        let STATE = null;
        let isGuest = false;

        function loadSession() {
            const saved = localStorage.getItem('fjord_session');
            if (saved) {
                try {
                    const { login, guest } = JSON.parse(saved);
                    if (guest) {
                        const gs = getGuestState();
                        if (gs) {
                            currentUser = 'guest';
                            STATE = gs;
                            isGuest = true;
                            return true;
                        }
                        return false;
                    }
                    const data = getUserData(login);
                    if (data) {
                        currentUser = login;
                        STATE = data;
                        isGuest = false;
                        return true;
                    }
                } catch (e) { console.error('Session load error:', e); }
            }
            return false;
        }

        function saveSession(login, guest) {
            localStorage.setItem('fjord_session', JSON.stringify({ login, guest: !!guest }));
        }

        function clearSession() {
            localStorage.removeItem('fjord_session');
            currentUser = null;
            STATE = null;
            isGuest = false;
        }

        function updateState() {
  if (!STATE) return;
  if (isGuest) {
    saveGuestState(STATE);
  } else if (currentUser && currentUser !== 'guest') {
    saveUserData(currentUser, STATE);
    if (firebaseReady && firebaseUser) {
      saveToFirestore(firebaseUser.uid, STATE);
    }
  }
}
