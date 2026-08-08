// =====================================================================
//  FIREBASE: ІНІЦІАЛІЗАЦІЯ, АВТО-ВХІД, CRUD ДЛЯ FIRESTORE
// =====================================================================
let firebaseReady = false;
let firebaseAuth = null;
let firebaseDb = null;
let firebaseUser = null;
let firebaseInitPromise = null;

// Функція, яка повертає проміс, що резолвиться, коли Firebase готовий
function waitForFirebase(timeout = 5000) {
  if (firebaseReady) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      if (firebaseReady) {
        resolve();
        return;
      }
      if (Date.now() - start > timeout) {
        reject(new Error('Firebase initialization timeout'));
        return;
      }
      setTimeout(check, 100);
    };
    check();
  });
}

function initFirebase() {
  // Якщо вже ініціалізовано або йде ініціалізація – повертаємо існуючий проміс
  if (firebaseInitPromise) return firebaseInitPromise;

  firebaseInitPromise = new Promise((resolve, reject) => {
    const tryInit = () => {
      try {
        if (typeof firebase === 'undefined') {
          console.warn('⏳ Firebase SDK ще не завантажився, повторна спроба через 200ms...');
          setTimeout(tryInit, 200);
          return;
        }

        const app = firebase.initializeApp(firebaseConfig);
        firebaseAuth = firebase.auth(app);
        firebaseDb = firebase.firestore(app);
        firebaseReady = true;
        console.log('🔥 Firebase підключено!');

        // Налаштовуємо спостерігача авторизації
        firebaseAuth.onAuthStateChanged(async (user) => {
          if (user) {
            firebaseUser = user;
            console.log('🔥 Користувач увійшов:', user.email);
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

        resolve();
      } catch (e) {
        console.error('❌ Помилка ініціалізації Firebase:', e);
        // Повторна спроба через 1 секунду, якщо помилка
        setTimeout(tryInit, 1000);
      }
    };
    tryInit();
  });

  return firebaseInitPromise;
}

// Запускаємо ініціалізацію відразу, але не блокуємо виконання
initFirebase();

// Функції для роботи з Firestore – тепер вони чекають на готовність
async function loadFromFirestore(uid) {
  await waitForFirebase();
  if (!firebaseDb) return null;
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

// Дебаунс: кожен виклик updateState() у коді (39 місць по всьому застосунку —
// XP, стрік, збережені слова, зміна мови і т.д.) раніше одразу слав ОКРЕМИЙ
// .set() у Firestore без жодної затримки чи об'єднання. Якщо десь підряд
// (навіть через баг чи гонку умов) виникало багато таких викликів за
// короткий час, черга записів клієнтського SDK переповнювалась і Firestore
// падав з "resource-exhausted: Write stream exhausted maximum allowed
// queued writes" — застосунок при цьому продовжував відкладати нові спроби,
// не отримуючи підтвердження. Тепер записи об'єднуються: кілька викликів
// підряд протягом DEBOUNCE_MS шлють лише ОДИН реальний запит з останнім
// (найповнішим) знімком стану — це безпечно, бо updateState() і так завжди
// передає ПОВНИЙ STATE, а не часткове оновлення.
const FIRESTORE_SAVE_DEBOUNCE_MS = 800;
let _firestoreSaveTimer = null;
let _firestoreSavePending = null;

async function saveToFirestore(uid, data) {
  _firestoreSavePending = { uid, data };
  if (_firestoreSaveTimer) return; // вже заплановано — це збереження підхопить найсвіжіші дані само
  _firestoreSaveTimer = setTimeout(async () => {
    const { uid: pendingUid, data: pendingData } = _firestoreSavePending;
    _firestoreSaveTimer = null;
    _firestoreSavePending = null;
    await waitForFirebase();
    if (!firebaseDb) return;
    try {
      const docRef = firebaseDb.collection('users').doc(pendingUid);
      await docRef.set(pendingData, { merge: true });
      console.log('💾 Дані збережено у Firestore');
    } catch (e) {
      console.error('❌ Помилка збереження у Firestore:', e);
    }
  }, FIRESTORE_SAVE_DEBOUNCE_MS);
}

async function signUpWithFirebase(email, password) {
  try {
    await waitForFirebase(5000);
  } catch (e) {
    toast('⏳ Firebase ще не готовий, зачекайте кілька секунд і спробуйте знову.');
    return { success: false, error: 'Firebase not ready' };
  }
  if (!firebaseAuth) {
    toast('⏳ Помилка авторизації, спробуйте перезавантажити сторінку.');
    return { success: false, error: 'Auth not available' };
  }
  try {
    const userCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    await saveToFirestore(user.uid, {
      name: email.split('@')[0],
      level: 'A1',
      levelTestDone: false,
      admin: false,
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
  try {
    await waitForFirebase(5000);
  } catch (e) {
    toast('⏳ Firebase ще не готовий, зачекайте кілька секунд і спробуйте знову.');
    return { success: false, error: 'Firebase not ready' };
  }
  if (!firebaseAuth) {
    toast('⏳ Помилка авторизації, спробуйте перезавантажити сторінку.');
    return { success: false, error: 'Auth not available' };
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
  await waitForFirebase();
  if (!firebaseAuth) return;
  try {
    await firebaseAuth.signOut();
    firebaseUser = null;
    clearSession();
    location.reload();
  } catch (e) {
    console.error('❌ Помилка виходу:', e);
  }
}