// =====================================================================
//  FIREBASE: ІНІЦІАЛІЗАЦІЯ, АВТО-ВХІД, CRUD ДЛЯ FIRESTORE
// =====================================================================
let firebaseReady = false;
let firebaseAuth = null;
let firebaseDb = null;
let firebaseUser = null;

function initFirebase() {
  try {
    // Перевіряємо, чи firebase глобально доступний
    if (typeof firebase === 'undefined') {
      console.warn('⏳ Firebase SDK ще не завантажився, повторна спроба через 500ms...');
      setTimeout(initFirebase, 500);
      return;
    }

    const app = firebase.initializeApp(firebaseConfig);
    firebaseAuth = firebase.auth(app);
    firebaseDb = firebase.firestore(app);
    firebaseReady = true;

    console.log('🔥 Firebase підключено!');

    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        firebaseUser = user;
        console.log('🔥 Користувач увійшов:', user.email);
        // Якщо сторінка входу ще видима – автоматично входимо
        const authPage = document.getElementById('authPage');
        if (authPage && authPage.style.display !== 'none') {
          currentUser = user.email;
          isGuest = false;
          await loadFromFirestore(user.uid);
          if (!STATE) {
            STATE = ensureStateDefaults({
              name: user.email.split('@')[0],
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
          }
          saveSession(currentUser, false);
          authPage.style.display = 'none';
          document.getElementById('app').classList.add('active');
          initAssistantWidget();
          navigate('home');
        } else if (STATE && !isGuest && currentUser !== 'guest' && currentUser === user.email) {
          await loadFromFirestore(user.uid);
        }
      } else {
        firebaseUser = null;
        console.log('🔥 Користувач вийшов');
      }
    });
  } catch (e) {
    console.error('❌ Помилка ініціалізації Firebase:', e);
    // Повторна спроба через 2 секунди
    setTimeout(initFirebase, 2000);
  }
}

// Запускаємо ініціалізацію негайно, але вона сама повториться, якщо не готово
initFirebase();

async function loadFromFirestore(uid) {
  if (!firebaseReady || !firebaseDb) {
    console.warn('Firestore не готовий, пропускаємо завантаження');
    return null;
  }
  try {
    const docRef = firebaseDb.collection('users').doc(uid);
    const docSnap = await docRef.get();
    if (docSnap.exists) {
      if (!STATE) STATE = {};
      Object.assign(STATE, docSnap.data());
      if (typeof ensureStateDefaults === 'function') {
        STATE = ensureStateDefaults(STATE);
      }
      updateState();
      return docSnap.data();
    }
    return null;
  } catch (e) {
    console.error('❌ Помилка завантаження з Firestore:', e);
    return null;
  }
}

async function saveToFirestore(uid, data) {
  if (!firebaseReady || !firebaseDb) {
    console.warn('Firestore не готовий, дані не збережено');
    return;
  }
  try {
    const docRef = firebaseDb.collection('users').doc(uid);
    await docRef.set(data, { merge: true });
    console.log('💾 Дані збережено у Firestore');
  } catch (e) {
    console.error('❌ Помилка збереження у Firestore:', e);
  }
}

async function signUpWithFirebase(email, password) {
  if (!firebaseReady) {
    toast('⏳ Firebase ще не готовий, зачекайте кілька секунд і спробуйте знову.');
    return { success: false, error: 'Firebase not ready' };
  }
  try {
    const userCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    await saveToFirestore(user.uid, {
      name: email.split('@')[0],
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
    return { success: true, user };
  } catch (e) {
    console.error('❌ Помилка реєстрації:', e);
    return { success: false, error: e.message };
  }
}

async function signInWithFirebase(email, password) {
  if (!firebaseReady) {
    toast('⏳ Firebase ще не готовий, зачекайте кілька секунд і спробуйте знову.');
    return { success: false, error: 'Firebase not ready' };
  }
  try {
    const userCredential = await firebaseAuth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    await loadFromFirestore(user.uid);
    return { success: true, user };
  } catch (e) {
    console.error('❌ Помилка входу:', e);
    return { success: false, error: e.message };
  }
}

async function signOutFromFirebase() {
  if (!firebaseReady) return;
  try {
    await firebaseAuth.signOut();
    firebaseUser = null;
    clearSession();
    location.reload();
  } catch (e) {
    console.error('❌ Помилка виходу:', e);
  }
}