// =====================================================================
//  FIREBASE: ІНІЦІАЛІЗАЦІЯ, АВТО-ВХІД, CRUD ДЛЯ FIRESTORE
// =====================================================================
let firebaseReady = false;
let firebaseAuth = null;
let firebaseDb = null;
let firebaseUser = null;
let firebaseInitPromise = null;

function waitForFirebase(timeout = 5000) {
  if (firebaseReady) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      if (firebaseReady) { resolve(); return; }
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
        setTimeout(tryInit, 1000);
      }
    };
    tryInit();
  });

  return firebaseInitPromise;
}

initFirebase();

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

// ------------------------------------------------------------
//  🔥 ВИПРАВЛЕННЯ: підготовка даних для Firestore (обрізка великих полів)
// ------------------------------------------------------------
function prepareDataForFirestore(data) {
  // Глибока копія, щоб не змінювати оригінальний STATE
  const clean = JSON.parse(JSON.stringify(data));

  // 1. Обрізаємо історію чату до 20 останніх повідомлень
  if (Array.isArray(clean.assistantChat) && clean.assistantChat.length > 20) {
    clean.assistantChat = clean.assistantChat.slice(-20);
  }

  // 2. Обмежуємо кількість слів у stats.wordsSeen до 200 останніх (щоб не роздувати документ)
  if (clean.stats && clean.stats.wordsSeen && typeof clean.stats.wordsSeen === 'object') {
    const keys = Object.keys(clean.stats.wordsSeen);
    if (keys.length > 200) {
      // Сортуємо за ключем (якщо ключі містять дату/час, то це будуть найновіші)
      const sorted = keys.sort(); // або за бажанням можна сортувати за часом додавання
      const recentKeys = sorted.slice(-200);
      const limited = {};
      recentKeys.forEach(k => { limited[k] = clean.stats.wordsSeen[k]; });
      clean.stats.wordsSeen = limited;
    }
  }

  // 3. (Опціонально) Обрізаємо інші масиви, що можуть рости, наприклад customWords
  if (Array.isArray(clean.customWords) && clean.customWords.length > 500) {
    clean.customWords = clean.customWords.slice(-500);
  }

  // 4. Видаляємо зайві тимчасові поля, які не потрібні в хмарі (наприклад, _onboardingDone тощо)
  //    (залишаємо їх локально, але не зберігаємо)
  delete clean._onboardingDone;
  // Якщо є ще якісь службові поля, можна додати сюди

  return clean;
}

// ------------------------------------------------------------
//  Дебаунс із використанням підготовлених даних
// ------------------------------------------------------------
const FIRESTORE_SAVE_DEBOUNCE_MS = 300;
let _firestoreSaveTimer = null;
let _firestoreSavePending = null;

async function saveToFirestore(uid, data) {
  // Готуємо дані – обрізаємо великі поля
  const preparedData = prepareDataForFirestore(data);

  _firestoreSavePending = { uid, data: preparedData };
  if (_firestoreSaveTimer) return;

  _firestoreSaveTimer = setTimeout(async () => {
    const { uid: pendingUid, data: pendingData } = _firestoreSavePending;
    _firestoreSaveTimer = null;
    _firestoreSavePending = null;
    await waitForFirebase();
    if (!firebaseDb) return;
    try {
      const docRef = firebaseDb.collection('users').doc(pendingUid);
      await docRef.set(pendingData, { merge: true });
      console.log('💾 Дані збережено у Firestore (розмір зменшено)');
    } catch (e) {
      console.error('❌ Помилка збереження у Firestore:', e);
      // Якщо помилка знову через розмір, можна спробувати обрізати ще сильніше
      if (e.code === 'resource-exhausted' || e.message.includes('exceeds maximum allowed size')) {
        console.warn('⚠️ Документ все ще завеликий, спроба екстремального обрізання...');
        const emergencyData = prepareDataForFirestore(pendingData, true); // true = агресивне обрізання
        try {
          await docRef.set(emergencyData, { merge: true });
          console.log('💾 Дані збережено після екстремального обрізання');
        } catch (e2) {
          console.error('❌ Навіть після обрізання не вдалося зберегти:', e2);
        }
      }
    }
  }, FIRESTORE_SAVE_DEBOUNCE_MS);
}

function prepareDataForFirestore(data, aggressive = false) {
  const clean = JSON.parse(JSON.stringify(data));

  // Обрізаємо історію чату
  if (Array.isArray(clean.assistantChat) && clean.assistantChat.length > 20) {
    clean.assistantChat = clean.assistantChat.slice(-20);
  }

  // Обрізаємо статистику слів
  if (clean.stats?.wordsSeen && typeof clean.stats.wordsSeen === 'object') {
    const keys = Object.keys(clean.stats.wordsSeen);
    if (keys.length > 200) {
      const limited = {};
      keys.slice(-200).forEach(k => { limited[k] = clean.stats.wordsSeen[k]; });
      clean.stats.wordsSeen = limited;
    }
  }

  // 🔥 НОВЕ: видаляємо великі кеші, які не потрібні в Firestore
  delete clean.generatedVocab;
  delete clean.generatedTasks;
  delete clean.wordTranslations;
  delete clean.generatedGrammar;

  // Якщо агресивний режим – ще сильніше обрізаємо
  if (aggressive) {
    if (Array.isArray(clean.assistantChat)) {
      clean.assistantChat = clean.assistantChat.slice(-5);
    }
    if (clean.stats?.wordsSeen) {
      const keys = Object.keys(clean.stats.wordsSeen);
      if (keys.length > 50) {
        const limited = {};
        keys.slice(-50).forEach(k => { limited[k] = clean.stats.wordsSeen[k]; });
        clean.stats.wordsSeen = limited;
      }
    }
    if (Array.isArray(clean.customWords)) {
      clean.customWords = clean.customWords.slice(-100);
    }
  }

  delete clean._onboardingDone;
  return clean;
}
// ---- Функції входу/реєстрації (без змін) ----
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

window.waitForFirebase = waitForFirebase;
window.loadFromFirestore = loadFromFirestore;
window.saveToFirestore = saveToFirestore;
window.signUpWithFirebase = signUpWithFirebase;
window.signInWithFirebase = signInWithFirebase;
window.signOutFromFirebase = signOutFromFirebase;