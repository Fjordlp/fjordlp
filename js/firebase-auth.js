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

// =====================================================================
//  ПІДГОТОВКА ДАНИХ ДЛЯ FIRESTORE (обрізка великих полів)
// =====================================================================
// ВИПРАВЛЕНО: попередня версія обрізала лише КОРЕНЕВІ clean.stats.wordsSeen
// та clean.customWords — застарілі поля з тих часів, коли прогрес ще не
// був ізольований по мовах. Відтоді весь реальний прогрес (SRS-картки,
// побачені слова, власні слова) переїхав у STATE.langData[мова].*, і ця
// функція його просто НІКОЛИ не торкалась — документ міг необмежено
// рости для кожної мови, якою людина коли-небудь користувалась (особливо
// швидко — через "Хроніки Тролля", яка щорозділу сама додає нові слова в
// колоду). Саме це й спричинило перевищення ліміту 1 МБ у Firestore.
//
// Також виправлено:
//  - було ДВІ функції з однаковою назвою prepareDataForFirestore в
//    одному файлі — друге оголошення тихо перекривало перше (мертвий
//    код). Тепер лише одна, повна версія.
//  - keys.sort() для "останніх" слів сортував їх АЛФАВІТНО, а не за
//    часом — це вибирало довільні слова, не найновіші. Замінено на
//    порядок вставки об'єкта (JS гарантує порядок ключів-рядків), що
//    хоча б приблизно відповідає хронології.
//  - _onboardingDone видалявся перед збереженням у хмару — через це
//    людина, яка заходить з іншого пристрою (чи просто після очищення
//    локальних даних браузера), бачила б онбординг ЗНОВУ, бо в хмарі
//    цього прапорця просто не було. Прапорець більше не видаляється —
//    це не тимчасове службове поле, а постійний стан користувача (як і
//    _targetLangChosen поруч).
function trimWordMap(obj, limit) {
  if (!obj || typeof obj !== 'object') return obj;
  const keys = Object.keys(obj);
  if (keys.length <= limit) return obj;
  const kept = keys.slice(-limit); // порядок вставки ≈ хронологія додавання
  const limited = {};
  kept.forEach(k => { limited[k] = obj[k]; });
  return limited;
}

function trimArray(arr, limit) {
  return Array.isArray(arr) && arr.length > limit ? arr.slice(-limit) : arr;
}

function prepareDataForFirestore(data, aggressive = false) {
  // Глибока копія, щоб не змінювати оригінальний STATE.
  const clean = JSON.parse(JSON.stringify(data));

  const wordsSeenLimit = aggressive ? 50 : 200;
  const customWordsLimit = aggressive ? 100 : 500;
  const srsLimit = aggressive ? 150 : 600;
  const chatLimit = aggressive ? 5 : 20;

  // ---- Головне виправлення: обрізаємо ВСЕРЕДИНІ кожної мови в langData ----
  if (clean.langData && typeof clean.langData === 'object') {
    Object.keys(clean.langData).forEach(lang => {
      const ld = clean.langData[lang];
      if (!ld || typeof ld !== 'object') return;

      if (ld.stats && ld.stats.wordsSeen) {
        ld.stats.wordsSeen = trimWordMap(ld.stats.wordsSeen, wordsSeenLimit);
      }
      if (ld.srs) {
        ld.srs = trimWordMap(ld.srs, srsLimit);
      }
      if (Array.isArray(ld.customWords)) {
        ld.customWords = trimArray(ld.customWords, customWordsLimit);
      }
      // testHistory тут — лише легкі метадані (тип/рівень/дата/бал), самі
      // деталі питань зберігаються локально в localStorage, тож 50
      // записів — це вже й так невеликий обсяг; обрізаємо про всяк
      // випадок, якщо колись зміниться формат запису.
      if (Array.isArray(ld.testHistory)) {
        ld.testHistory = trimArray(ld.testHistory, aggressive ? 20 : 50);
      }
      // Історія "Хроніки Тролля" — повний текст розділів обрізається до
      // 30 і на клієнті (js/story.js), але дублюємо обмеження й тут як
      // страховку на випадок старих збережених станів, де цього ще не
      // було.
      if (ld.story && Array.isArray(ld.story.history)) {
        ld.story.history = trimArray(ld.story.history, aggressive ? 10 : 30);
      }
    });
  }

  // ---- Ті самі поля на кореневому рівні (застарілий формат, лишаємо
  // обрізку про всяк випадок — раптом десь ще лишились дані звідти
  // до міграції на langData) ----
  if (clean.stats && clean.stats.wordsSeen) {
    clean.stats.wordsSeen = trimWordMap(clean.stats.wordsSeen, wordsSeenLimit);
  }
  if (clean.srs) {
    clean.srs = trimWordMap(clean.srs, srsLimit);
  }
  if (Array.isArray(clean.customWords)) {
    clean.customWords = trimArray(clean.customWords, customWordsLimit);
  }

  // ---- Історія чату асистента ----
  if (Array.isArray(clean.assistantChat)) {
    clean.assistantChat = trimArray(clean.assistantChat, chatLimit);
  }

  // ---- Великі кеші, яким узагалі нема чого робити в Firestore: це не
  // прогрес користувача, а тимчасовий кеш уже згенерованого AI-контенту
  // (словник/граматика/завдання/переклади), який і так підвантажується
  // заново з sharedVocab/sharedGrammar чи власною AI-генерацією при
  // потребі ----
  delete clean.generatedVocab;
  delete clean.generatedTasks;
  delete clean.generatedGrammar;
  delete clean.wordTranslations;

  return clean;
}

// ------------------------------------------------------------
//  Дебаунс збереження
// ------------------------------------------------------------
const FIRESTORE_SAVE_DEBOUNCE_MS = 300;
let _firestoreSaveTimer = null;
let _firestoreSavePending = null;

async function saveToFirestore(uid, data) {
  // Зберігаємо ОРИГІНАЛЬНІ (ще не обрізані) дані в черзі — так, якщо
  // знадобиться агресивніше обрізання після невдалої спроби, воно
  // застосовується до повних даних, а не до вже раз обрізаних (щоб не
  // накопичувати похибку від подвійного обрізання).
  _firestoreSavePending = { uid, data };
  if (_firestoreSaveTimer) return;

  _firestoreSaveTimer = setTimeout(async () => {
    const { uid: pendingUid, data: pendingData } = _firestoreSavePending;
    _firestoreSaveTimer = null;
    _firestoreSavePending = null;
    await waitForFirebase();
    if (!firebaseDb) return;

    const preparedData = prepareDataForFirestore(pendingData, false);
    try {
      const docRef = firebaseDb.collection('users').doc(pendingUid);
      await docRef.set(preparedData, { merge: true });
      console.log('💾 Дані збережено у Firestore');
    } catch (e) {
      console.error('❌ Помилка збереження у Firestore:', e);
      const tooLarge = e.code === 'resource-exhausted' ||
        (e.message && e.message.includes('exceeds maximum allowed size'));
      if (tooLarge) {
        console.warn('⚠️ Документ все ще завеликий, спроба агресивнішого обрізання...');
        const emergencyData = prepareDataForFirestore(pendingData, true);
        try {
          const docRef = firebaseDb.collection('users').doc(pendingUid);
          await docRef.set(emergencyData, { merge: true });
          console.log('💾 Дані збережено після агресивного обрізання');
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
