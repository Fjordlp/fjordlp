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

function prepareDataForFirestore(data, aggressive = false) {
  const clean = JSON.parse(JSON.stringify(data));

  // Мінімальні ліміти – майже нічого не зберігаємо
  const chatLimit = aggressive ? 3 : 10;
  const wordLimit = aggressive ? 30 : 100;
  const customLimit = aggressive ? 20 : 100;
  const storyLimit = aggressive ? 2 : 5;

  // 1. Чат – тільки останні повідомлення
  if (Array.isArray(clean.assistantChat) && clean.assistantChat.length > chatLimit) {
    clean.assistantChat = clean.assistantChat.slice(-chatLimit);
  }

  // 2. Статистика слів
  if (clean.stats?.wordsSeen && typeof clean.stats.wordsSeen === 'object') {
    const keys = Object.keys(clean.stats.wordsSeen);
    if (keys.length > wordLimit) {
      const limited = {};
      keys.slice(-wordLimit).forEach(k => { limited[k] = clean.stats.wordsSeen[k]; });
      clean.stats.wordsSeen = limited;
    }
  }

  // 3. Власні слова
  if (Array.isArray(clean.customWords) && clean.customWords.length > customLimit) {
    clean.customWords = clean.customWords.slice(-customLimit);
  }

  // 4. Історія пригод
  if (clean.story?.history && Array.isArray(clean.story.history)) {
    if (clean.story.history.length > storyLimit) {
      clean.story.history = clean.story.history.slice(-storyLimit);
    }
  }

  // 5. Прогрес книг – обрізаємо до 5 останніх
  if (clean.booksProgress && typeof clean.booksProgress === 'object') {
    const keys = Object.keys(clean.booksProgress);
    if (keys.length > 5) {
      const limited = {};
      keys.slice(-5).forEach(k => { limited[k] = clean.booksProgress[k]; });
      clean.booksProgress = limited;
    }
  }

  // 6. ВИДАЛЯЄМО ВСІ ВЕЛИКІ КЕШІ (вони відновляться при потребі)
  delete clean.generatedVocab;
  delete clean.generatedTasks;
  delete clean.wordTranslations;
  delete clean.generatedGrammar;
  delete clean._onboardingDone;
  delete clean._dismissedRec;
  delete clean._targetLangChosen;
  delete clean.dailyGoal; // не критично
  delete clean.dailyTasksCompleted; // не критично

  // 7. Агресивно обрізаємо langData (основне джерело великого розміру)
  if (clean.langData && typeof clean.langData === 'object') {
    for (const lang in clean.langData) {
      const langData = clean.langData[lang];
      
      // SRS – залишаємо тільки 100 останніх
      if (langData.srs && typeof langData.srs === 'object') {
        const srsKeys = Object.keys(langData.srs);
        if (srsKeys.length > 100) {
          const limited = {};
          srsKeys.slice(-100).forEach(k => { limited[k] = langData.srs[k]; });
          langData.srs = limited;
        }
      }
      
      // Статистика слів у langData
      if (langData.stats?.wordsSeen && typeof langData.stats.wordsSeen === 'object') {
        const keys = Object.keys(langData.stats.wordsSeen);
        if (keys.length > wordLimit) {
          const limited = {};
          keys.slice(-wordLimit).forEach(k => { limited[k] = langData.stats.wordsSeen[k]; });
          langData.stats.wordsSeen = limited;
        }
      }
      
      // Власні слова в langData
      if (Array.isArray(langData.customWords) && langData.customWords.length > customLimit) {
        langData.customWords = langData.customWords.slice(-customLimit);
      }
      
      // Завдання Norskprøve – тільки 2 останні на рівень/режим
      if (langData.customNorskTasks && typeof langData.customNorskTasks === 'object') {
        for (const level in langData.customNorskTasks) {
          for (const mode in langData.customNorskTasks[level]) {
            if (Array.isArray(langData.customNorskTasks[level][mode]) && langData.customNorskTasks[level][mode].length > 2) {
              langData.customNorskTasks[level][mode] = langData.customNorskTasks[level][mode].slice(-2);
            }
          }
        }
      }
      
      // Видаляємо великі кеші завдань (якщо є)
      delete langData.testHistory; // історія тестів – зберігається окремо в localStorage
    }
  }

  // 8. Якщо все ще завеликий – видаляємо langData повністю (останній крок)
  if (aggressive) {
    // Перевіряємо розмір приблизно (JSON.stringify)
    if (JSON.stringify(clean).length > 900000) {
      console.warn('⚠️ Документ все ще завеликий, видаляємо langData');
      delete clean.langData;
      delete clean.stats;
      delete clean.story;
      delete clean.booksProgress;
    }
  }

  return clean;
}

// ------------------------------------------------------------
//  ЗБЕРЕЖЕННЯ З ДЕБАУНСОМ
// ------------------------------------------------------------
const FIRESTORE_SAVE_DEBOUNCE_MS = 300;
let _firestoreSaveTimer = null;
let _firestoreSavePending = null;

async function saveToFirestore(uid, data) {
  // Використовуємо агресивне обрізання завжди
  const preparedData = prepareDataForFirestore(data, true);

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
      // Якщо все ще завеликий – робимо ще більш агресивне обрізання
      if (e.code === 'resource-exhausted' || e.message.includes('exceeds maximum allowed size')) {
        console.warn('⚠️ Документ все ще завеликий, спроба екстремального обрізання...');
        const emergencyData = prepareDataForFirestore(pendingData, true);
        // Додатково видаляємо ще більше полів
        delete emergencyData.langData;
        delete emergencyData.stats;
        delete emergencyData.story;
        delete emergencyData.booksProgress;
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