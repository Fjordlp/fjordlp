// =====================================================================
//  КНИГИ: читання реальних текстів суспільного надбання + переклад
//  слів по кліку + завдання на розуміння прочитаного
// =====================================================================
// ВАЖЛИВО про джерело текстів: на відміну від словника й граматики (які
// AI генерує "з нуля"), сюди НЕ можна автоматично вставляти текст
// довільної книги — авторське право. Тому єдиний спосіб додати книгу —
// адмін вручну вставляє текст у панелі " Книги" (admin-books), і
// відповідає за те, що це справді суспільне надбання (Project Gutenberg,
// nb.no/bokhylla для творів з простроченим авторським правом, тощо) або
// текст, на який у нього є права. AI тут використовується лише для двох
// допоміжних речей із самим текстом, вставленим адміном: (1) переклад
// окремого слова по кліку під час читання, (2) завдання на розуміння
// прочитаного за мотивами конкретного розділу.

// =====================================================================
//  СПІЛЬНІ КНИГИ У FIRESTORE
// =====================================================================
// =====================================================================
//  ТЕМИ/ЖАНРИ КНИГ
// =====================================================================
// Фіксований список — так усі книги категоризовані однаково, і бібліотеку
// можна фільтрувати по темі. code зберігається в Firestore, label — те,
// що бачить адмін і читач (українською, оскільки UI-переклад тем на 3
// мови для одного select-списку — явне перевантаження на цьому етапі;
// сама книга й опис лишаються мовою вивчення/адміна).
const BOOK_GENRES = [
    { code: 'fairytale', label: '🧚 Казка', emoji: '🧚' },
    { code: 'adventure', label: '🗺️ Пригоди', emoji: '🗺️' },
    { code: 'novel', label: '📗 Повість/роман', emoji: '📗' },
    { code: 'shortstory', label: '📄 Оповідання', emoji: '📄' },
    { code: 'mystery', label: '🔍 Детектив', emoji: '🔍' },
    { code: 'fantasy', label: '🐉 Фентезі', emoji: '🐉' },
    { code: 'scifi', label: '🚀 Фантастика', emoji: '🚀' },
    { code: 'poetry', label: '🎭 Поезія', emoji: '🎭' },
    { code: 'biography', label: '👤 Біографія', emoji: '👤' },
    { code: 'history', label: '🏛️ Історія', emoji: '🏛️' },
    { code: 'children', label: '🧸 Дитяча', emoji: '🧸' },
    { code: 'other', label: '📚 Інше', emoji: '📚' },
];

function getBookGenre(code) {
    return BOOK_GENRES.find(g => g.code === code) || BOOK_GENRES[BOOK_GENRES.length - 1];
}

let _booksCache = {}; // { [lang]: [book, ...] } — кеш на сесію, щоб не смикати Firestore на кожен рендер

async function loadSharedBooks(lang, forceRefresh) {
    if (!forceRefresh && _booksCache[lang]) return _booksCache[lang];
    if (!firebaseReady || !firebaseDb) return [];
    try {
        const snap = await firebaseDb.collection('sharedBooks').where('lang', '==', lang).get();
        const books = [];
        snap.forEach(doc => books.push(Object.assign({ id: doc.id }, doc.data())));
        books.sort((a, b) => (LEVELS.indexOf(a.level) - LEVELS.indexOf(b.level)) || (a.title || '').localeCompare(b.title || ''));
        _booksCache[lang] = books;
        return books;
    } catch (e) {
        console.error('[Книги] Помилка завантаження списку:', e);
        return [];
    }
}

async function loadBookById(bookId, lang) {
    // Спершу дивимось у вже завантажений кеш мови (дешево, без запиту).
    if (lang && _booksCache[lang]) {
        const cached = _booksCache[lang].find(b => b.id === bookId);
        if (cached) return cached;
    }
    if (!firebaseReady || !firebaseDb) return null;
    try {
        const doc = await firebaseDb.collection('sharedBooks').doc(bookId).get();
        if (!doc.exists) return null;
        return Object.assign({ id: doc.id }, doc.data());
    } catch (e) {
        console.error('[Книги] Помилка завантаження книги:', e);
        return null;
    }
}

async function saveSharedBook(bookId, data) {
    if (!firebaseReady || !firebaseDb) throw new Error('Firestore недоступний');
    const payload = Object.assign({}, data, { updatedAt: new Date().toISOString() });
    if (bookId) {
        await firebaseDb.collection('sharedBooks').doc(bookId).set(payload, { merge: false });
    } else {
        payload.createdAt = payload.updatedAt;
        const ref = await firebaseDb.collection('sharedBooks').add(payload);
        bookId = ref.id;
    }
    delete _booksCache[data.lang]; // інвалідуємо кеш цієї мови, щоб список підхопив зміни
    return bookId;
}

async function deleteSharedBook(bookId, lang) {
    if (!firebaseReady || !firebaseDb) throw new Error('Firestore недоступний');
    await firebaseDb.collection('sharedBooks').doc(bookId).delete();
    delete _booksCache[lang];
}

// Простий парсер: адмін вставляє текст розділу як звичайний абзацний
// текст (порожній рядок = новий абзац). Нічого складнішого тут не треба —
// html не допускаємо (escHtml() застосовується при рендері), так безпечніше.
function splitIntoParagraphs(rawText) {
    return String(rawText || '')
        .replace(/\r\n/g, '\n')
        .split(/\n\s*\n/)
        .map(p => p.trim())
        .filter(Boolean);
}

// =====================================================================
//  ІЛЮСТРАЦІЇ ВСЕРЕДИНІ ТЕКСТУ
// =====================================================================
// Адмін вставляє ілюстрацію прямо в текст розділу як окремий "абзац" виду
// [img: URL] або [img: URL | підпис]. Це не потребує окремих полів форми
// для кожної картинки — просто пишеш посилання в тому місці тексту, де
// має бути ілюстрація, так само як і решту тексту. Рендер розпізнає такий
// "абзац" і показує <img> замість тексту (див. views-books.js).
const IMG_MARKER_RE = /^\[img:\s*(\S+?)\s*(?:\|\s*(.+))?\]$/i;

function parseImageMarker(paragraph) {
    const m = IMG_MARKER_RE.exec(paragraph.trim());
    if (!m) return null;
    return { url: m[1], caption: m[2] || '' };
}

// Прибирає [img: ...] розмітку перед тим, як текст іде в AI (переклад
// слова бере лише речення-контекст, тож маркери туди й так не потраплять;
// а от генерація завдань на розуміння прочитаного бере ВЕСЬ текст розділу
// — маркери там лише зайвий шум, який нічого не додає до розуміння сюжету).
function stripImageMarkers(text) {
    return splitIntoParagraphs(text).filter(p => !parseImageMarker(p)).join('\n\n');
}

// =====================================================================
//  ПЕРЕКЛАД СЛОВА ПО КЛІКУ (з урахуванням контексту речення)
// =====================================================================
// На відміну від wordTranslation() у i18n.js (яка дивиться в наперед
// згенерований словник рівня), слова в тексті книги можуть бути БУДЬ-ЯКІ —
// відмінені форми, рідкісна лексика тощо. Тому переклад тут завжди йде
// "наживо" через AI, з кешем по (мова+слово), щоб однакове слово, яке
// трапляється в тексті по 10 разів, не смикало AI щоразу заново.
let _bookWordCache = {}; // { [lang]: { [word_lowercase]: {translation, baseForm} } }

async function translateWordInContext(word, sentence, lang) {
    lang = lang || (STATE && STATE.targetLang) || 'no';
    const key = word.trim().toLowerCase();
    if (!_bookWordCache[lang]) _bookWordCache[lang] = {};
    if (_bookWordCache[lang][key]) return _bookWordCache[lang][key];

    const uiLang = (STATE && STATE.uiLang) || 'uk';
    const uiLangName = { uk: 'українську', en: 'англійську', ru: 'російську' }[uiLang] || 'українську';
    const langName = getLanguage(lang).name.uk;
    const sys = "Ти — точний і стислий словниковий перекладач для читача, який вивчає мову. " +
        "Відповідай ЛИШЕ чистим JSON-об'єктом без жодного тексту навколо, без markdown-огорожі.";
    const userMsg =
        `Мова тексту: ${langName}. Слово з тексту: "${word}". ` +
        `Речення-контекст, у якому це слово трапилось: "${sentence}". ` +
        `Переклади це слово (саме в цьому значенні, з урахуванням контексту) на ${uiLangName} мову. ` +
        `Якщо слово стоїть у відміненій/дієвідмінюваній формі — вкажи також словникову (базову) форму мовою тексту. ` +
        `Формат відповіді: {"translation":"переклад ${uiLangName === 'українську' ? 'українською' : uiLangName === 'англійську' ? 'англійською' : 'російською'}","baseForm":"словникова форма мовою тексту, або те саме слово, якщо воно вже в базовій формі"}`;
    let result;
    try {
        const reply = await callAiRaw('translate_word', sys, userMsg, []);
        const parsed = parseAiJson(reply);
        result = { translation: parsed.translation || '?', baseForm: parsed.baseForm || word };
    } catch (e) {
        console.error('[Книги] Помилка перекладу слова:', word, e);
        result = { translation: null, error: e };
    }
    if (result.translation) _bookWordCache[lang][key] = result; // помилки не кешуємо — раптова мережева проблема не має "застрягати" назавжди
    return result;
}

// =====================================================================
//  ЗАВДАННЯ НА РОЗУМІННЯ ПРОЧИТАНОГО (генеруються з РЕАЛЬНОГО тексту
//  розділу, а не абстрактно — так питання дійсно про те, що читач щойно
//  прочитав, а не про випадкову тему того ж рівня)
// =====================================================================
async function generateChapterTasksAI(lang, level, chapterTitle, chapterText) {
    const langName = getLanguage(lang).name.uk;
    const sys = "Ти — вчитель іноземної мови, який готує завдання на розуміння прочитаного " +
        "(reading comprehension) за КОНКРЕТНИМ текстом, який тобі надають — не вигадуй сюжет " +
        "від себе, спирайся лише на наданий уривок. Відповідай ЛИШЕ чистим JSON-масивом без " +
        "жодного тексту навколо, без markdown-огорожі.";
    // Обрізаємо дуже довгі розділи, щоб не впертись у ліміт токенів проксі —
    // 6000 символів це орієнтовно 3-4 сторінки, для завдань на розуміння
    // основного змісту цього більш ніж достатньо. Маркери ілюстрацій
    // [img: ...] прибираємо — це не текст сюжету, лише зайвий шум для AI.
    const cleanText = stripImageMarkers(chapterText);
    const trimmedText = cleanText.length > 6000 ? cleanText.slice(0, 6000) + '…' : cleanText;
    const userMsg =
        `Мова тексту: ${langName}. Рівень читача: CEFR ${level}. Назва розділу: "${chapterTitle}".\n\n` +
        `Текст розділу:\n"""${trimmedText}"""\n\n` +
        `Склади 5 завдань на розуміння прочитаного: 3 питання на розуміння сюжету/фактів із тексту ` +
        `(питання й варіанти відповіді мовою ${langName}, рівень складності відповідний CEFR ${level}) ` +
        `і 2 питання на конкретні слова/фрази З ЦЬОГО Ж тексту (наприклад "що означає слово X із розділу"). ` +
        `Формат: [{"q":"питання мовою тексту","opts":["варіант1","варіант2","варіант3"],"a":0}, ...(5 штук)]`;
    const reply = await callAiRaw('gen_book_tasks', sys, userMsg, []);
    const parsed = parseAiJson(reply);
    return (Array.isArray(parsed) ? parsed : []).filter(q => q && q.q && Array.isArray(q.opts));
}

// =====================================================================
//  ПРОГРЕС ЧИТАННЯ (ізольований по мові через LD(), як і все інше)
// =====================================================================
function getBookProgress(bookId) {
    const bp = LD().booksProgress;
    if (!bp[bookId]) bp[bookId] = { chaptersRead: [], taskScores: {} };
    return bp[bookId];
}

function isChapterRead(bookId, chapterIdx) {
    return getBookProgress(bookId).chaptersRead.includes(chapterIdx);
}

function markChapterRead(bookId, chapterIdx) {
    const p = getBookProgress(bookId);
    if (!p.chaptersRead.includes(chapterIdx)) {
        p.chaptersRead.push(chapterIdx);
        LD().xp = (LD().xp || 0) + 8; // невеликий бонус XP за прочитаний розділ, як за виконану сесію карток
        updateState();
        markActivityToday();
    }
}

function recordChapterTaskScore(bookId, chapterIdx, correct, total) {
    const p = getBookProgress(bookId);
    p.taskScores[chapterIdx] = { correct, total };
    if (correct === total && total > 0) {
        LD().xp = (LD().xp || 0) + 5; // невеликий додатковий бонус за повністю правильно виконані завдання
    }
    updateState();
    markActivityToday();
}
