// =====================================================================
//  ВИБІР МОВИ ДЛЯ ВИВЧЕННЯ (не плутати з мовою інтерфейсу!)
//  STATE.uiLang / STATE.vocabLang — якою мовою показується сам сайт.
//  STATE.targetLang — ЯКУ мову користувач вивчає (норвезьку, іспанську...).
//  За замовчуванням лишається "no" (норвезька) — щоб нічого не зламати
//  для тих, хто вже вчить норвезьку через вбудований словник/граматику.
// =====================================================================
const LANGUAGES = [
    { code: 'no', flag: '🇳🇴', native: 'Norsk', name: { uk: 'Норвезька', en: 'Norwegian', ru: 'Норвежский' }, builtin: true },
    { code: 'en', flag: '🇬🇧', native: 'English', name: { uk: 'Англійська', en: 'English', ru: 'Английский' }, builtin: false },
    { code: 'de', flag: '🇩🇪', native: 'Deutsch', name: { uk: 'Німецька', en: 'German', ru: 'Немецкий' }, builtin: false },
    { code: 'es', flag: '🇪🇸', native: 'Español', name: { uk: 'Іспанська', en: 'Spanish', ru: 'Испанский' }, builtin: false },
    { code: 'fr', flag: '🇫🇷', native: 'Français', name: { uk: 'Французька', en: 'French', ru: 'Французский' }, builtin: false },
    { code: 'it', flag: '🇮🇹', native: 'Italiano', name: { uk: 'Італійська', en: 'Italian', ru: 'Итальянский' }, builtin: false },
    { code: 'pt', flag: '🇵🇹', native: 'Português', name: { uk: 'Португальська', en: 'Portuguese', ru: 'Португальский' }, builtin: false },
    { code: 'pl', flag: '🇵🇱', native: 'Polski', name: { uk: 'Польська', en: 'Polish', ru: 'Польский' }, builtin: false },
    { code: 'sv', flag: '🇸🇪', native: 'Svenska', name: { uk: 'Шведська', en: 'Swedish', ru: 'Шведский' }, builtin: false },
    { code: 'nl', flag: '🇳🇱', native: 'Nederlands', name: { uk: 'Нідерландська', en: 'Dutch', ru: 'Нидерландский' }, builtin: false },
    { code: 'ja', flag: '🇯🇵', native: '日本語', name: { uk: 'Японська', en: 'Japanese', ru: 'Японский' }, builtin: false },
    { code: 'tr', flag: '🇹🇷', native: 'Türkçe', name: { uk: 'Турецька', en: 'Turkish', ru: 'Турецкий' }, builtin: false },
    { code: 'da', flag: '🇩🇰', native: 'Dansk', name: { uk: 'Данська', en: 'Danish', ru: 'Датский' }, builtin: false },
    { code: 'fi', flag: '🇫🇮', native: 'Suomi', name: { uk: 'Фінська', en: 'Finnish', ru: 'Финский' }, builtin: false },
    { code: 'is', flag: '🇮🇸', native: 'Íslenska', name: { uk: 'Ісландська', en: 'Icelandic', ru: 'Исландский' }, builtin: false },
    { code: 'el', flag: '🇬🇷', native: 'Ελληνικά', name: { uk: 'Грецька', en: 'Greek', ru: 'Греческий' }, builtin: false },
    { code: 'cs', flag: '🇨🇿', native: 'Čeština', name: { uk: 'Чеська', en: 'Czech', ru: 'Чешский' }, builtin: false },
    { code: 'sk', flag: '🇸🇰', native: 'Slovenčina', name: { uk: 'Словацька', en: 'Slovak', ru: 'Словацкий' }, builtin: false },
    { code: 'ro', flag: '🇷🇴', native: 'Română', name: { uk: 'Румунська', en: 'Romanian', ru: 'Румынский' }, builtin: false },
    { code: 'hu', flag: '🇭🇺', native: 'Magyar', name: { uk: 'Угорська', en: 'Hungarian', ru: 'Венгерский' }, builtin: false },
    { code: 'bg', flag: '🇧🇬', native: 'Български', name: { uk: 'Болгарська', en: 'Bulgarian', ru: 'Болгарский' }, builtin: false },
    { code: 'hr', flag: '🇭🇷', native: 'Hrvatski', name: { uk: 'Хорватська', en: 'Croatian', ru: 'Хорватский' }, builtin: false },
    { code: 'uk', flag: '🇺🇦', native: 'Українська', name: { uk: 'Українська', en: 'Ukrainian', ru: 'Украинский' }, builtin: false },
    { code: 'ru', flag: '🇷🇺', native: 'Русский', name: { uk: 'Російська', en: 'Russian', ru: 'Русский' }, builtin: false },
    { code: 'zh', flag: '🇨🇳', native: '中文', name: { uk: 'Китайська', en: 'Chinese', ru: 'Китайский' }, builtin: false },
    { code: 'ko', flag: '🇰🇷', native: '한국어', name: { uk: 'Корейська', en: 'Korean', ru: 'Корейский' }, builtin: false },
    { code: 'ar', flag: '🇸🇦', native: 'العربية', name: { uk: 'Арабська', en: 'Arabic', ru: 'Арабский' }, builtin: false },
    { code: 'he', flag: '🇮🇱', native: 'עברית', name: { uk: 'Іврит', en: 'Hebrew', ru: 'Иврит' }, builtin: false },
    { code: 'hi', flag: '🇮🇳', native: 'हिन्दी', name: { uk: 'Гінді', en: 'Hindi', ru: 'Хинди' }, builtin: false },
    { code: 'vi', flag: '🇻🇳', native: 'Tiếng Việt', name: { uk: 'В\'єтнамська', en: 'Vietnamese', ru: 'Вьетнамский' }, builtin: false },
    { code: 'th', flag: '🇹🇭', native: 'ไทย', name: { uk: 'Тайська', en: 'Thai', ru: 'Тайский' }, builtin: false },
    { code: 'id', flag: '🇮🇩', native: 'Bahasa Indonesia', name: { uk: 'Індонезійська', en: 'Indonesian', ru: 'Индонезийский' }, builtin: false },
];

function getLanguage(code) {
    return LANGUAGES.find(l => l.code === code) || LANGUAGES[0];
}

function targetLangName(code) {
    const lang = getLanguage(code || (typeof STATE !== 'undefined' && STATE && STATE.targetLang) || 'no');
    const uiLang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    return lang.name[uiLang] || lang.name.uk;
}

function isBuiltinLang() {
    const code = (typeof STATE !== 'undefined' && STATE && STATE.targetLang) || 'no';
    return getLanguage(code).builtin;
}

// -------- AI-генерація стартового словника для НЕ вбудованої мови --------
// Викликається, коли людина вперше відкриває Словник/Картки для мови, під
// яку немає вбудованої бази (усе, крім норвезької). Одним запитом просить
// AI згенерувати повноцінний набір слів для рівня — і кешує в
// STATE.generatedVocab[lang][level], щоб надалі працювало як звичайний
// словник (SRS, картки, тести) без повторних запитів.
// Теми, якими AI варто варіювати генерацію слів по рівнях — щоб кілька
// послідовних запитів (batchIndex 0,1,2...) не поверталися одними й тими ж
// найочевиднішими словами, а поступово розширювали словник новими темами.
const VOCAB_TOPIC_HINTS = {
    A1: ['привітання, числа, родина, кольори, базова їжа', 'дім, одяг, тіло, дні тижня, місяці', 'прості дієслова руху й дії, погода, транспорт'],
    A2: ['покупки, робота, хобі, емоції', 'подорожі, ресторан, місто, напрямки', 'технології, спорт, освіта, побутові дієслова'],
    B1: ['здоров'+"'"+'я, стосунки, медіа, довкілля', 'подорожі й туризм, кар'+"'"+'єра, фінанси', 'наука, суспільство, абстрактні поняття'],
    B2: ['політика, економіка, бізнес', 'наука, дослідження, медицина', 'культура, мистецтво, право, суспільні проблеми'],
    C1: ['академічна лексика, дискурс', 'філософія, психологія, соціологія', 'риторика, нюанси значень, формальний стиль'],
    C2: ['ідіоми та сталі вирази', 'стилістика, літературна мова', 'рідкісна й вишукана лексика, розмовні частки'],
};

async function generateStarterVocab(langCode, level, batchIndex, existingWords) {
    const langName = getLanguage(langCode).name.uk;
    const sys = "Ти генеруєш словниковий набір для вивчення іноземної мови " +
        "(рівень CEFR). Відповідай ЛИШЕ чистим JSON-масивом без жодного " +
        "тексту навколо, без markdown-огорожі.";
    const hints = VOCAB_TOPIC_HINTS[level] || VOCAB_TOPIC_HINTS.A1;
    const topicHint = hints[(batchIndex || 0) % hints.length];
    const avoidList = (existingWords || []).slice(-80).map(w => w.no).join(', ');
    const userMsg =
        `Мова вивчення: ${langName}. Рівень: ${level}. ` +
        `Згенеруй 60 корисних слів цією мовою для цього рівня. Фокус на темах: ${topicHint}. ` +
        (avoidList ? `НЕ повторюй ці вже наявні слова: ${avoidList}. ` : '') +
        `Формат масиву: [{"t": "тема українською", "no": "слово мовою вивчення", "uk": "переклад українською", "ex_no": "приклад речення мовою вивчення (мінімум 4 слова, містить це слово)", "ex_uk": "переклад прикладу"}, ...]`;
    const reply = await callAiRaw('gen_vocab', sys, userMsg, []);
    return parseAiJson(reply);
}

// Генерує ВЕЛИКИЙ стартовий словник за кілька послідовних запитів (замість
// одного) — так надійніше (менший ризик обірваної JSON-відповіді від AI на
// один величезний запит) і дає змогу реально "максимально" наповнити рівень
// словами, а не обмежуватись одним десятком.
// onProgress(doneBatches, totalBatches, wordsSoFar) викликається після
// кожного пакету, щоб інтерфейс міг показати прогрес.
async function generateBulkVocab(langCode, level, batches, onProgress) {
    batches = batches || 5;
    const collected = [];
    const seen = new Set();
    for (let i = 0; i < batches; i++) {
        let batch;
        try {
            batch = await generateStarterVocab(langCode, level, i, collected);
        } catch (e) {
            console.error('[Словник] Помилка пакету генерації', i, e);
            continue; // одна невдала спроба не повинна зупиняти весь процес
        }
        (Array.isArray(batch) ? batch : []).forEach(w => {
            if (!w || !w.no || !w.uk) return;
            const key = w.no.trim().toLowerCase();
            if (seen.has(key)) return; // відсіюємо дублі як усередині пакету, так і між пакетами
            seen.add(key);
            collected.push(w);
        });
        if (typeof onProgress === 'function') onProgress(i + 1, batches, collected.length);
    }
    return collected;
}

function ensureGeneratedVocabStore() {
    if (!STATE.generatedVocab) STATE.generatedVocab = {};
    const lang = STATE.targetLang || 'no';
    if (!STATE.generatedVocab[lang]) STATE.generatedVocab[lang] = {};
}

// =====================================================================
//  СПІЛЬНИЙ (ГЛОБАЛЬНИЙ) СЛОВНИК У FIRESTORE
// =====================================================================
// На відміну від STATE.generatedVocab (кеш лише для ОДНОГО користувача),
// ці функції читають/пишуть у спільну колекцію Firestore, яку бачать УСІ
// користувачі сайту. Ідея: адміністратор один раз генерує словник для
// мови+рівня в адмін-панелі й публікує його — і після цього ВСІ нові й
// існуючі користувачі одразу бачать готовий словник, без жодної генерації
// зі свого боку.
function sharedVocabDocId(lang, level) { return `${lang}_${level}`; }

async function loadSharedVocab(lang, level) {
    if (!firebaseReady || !firebaseDb) return null;
    try {
        const doc = await firebaseDb.collection('sharedVocab').doc(sharedVocabDocId(lang, level)).get();
        if (doc.exists && Array.isArray(doc.data().words)) return doc.data().words;
        return null;
    } catch (e) {
        console.error('[Спільний словник] Помилка завантаження:', e);
        return null;
    }
}

async function saveSharedVocab(lang, level, words) {
    if (!firebaseReady || !firebaseDb) throw new Error('Firestore недоступний');
    await firebaseDb.collection('sharedVocab').doc(sharedVocabDocId(lang, level)).set({
        words, lang, level, updatedAt: new Date().toISOString(), count: words.length,
    });
}

// Підвантажує спільний словник для мови+рівня в локальний кеш STATE (якщо
// його там ще нема) і, якщо щось знайшлося, перемальовує поточний екран.
// Викликати на початку viewVocabulary/viewFlashDeckPicker/viewTestsHub —
// "тихо", без блокування рендеру (перший рендер може ще показати порожньо,
// другий — уже з даними).
let _sharedVocabLoading = {};
async function ensureSharedVocabLoaded(lang, level) {
    if (lang === 'no') return; // норвезька — вбудований словник, спільний не потрібен
    ensureGeneratedVocabStore();
    if (STATE.generatedVocab[lang][level] && STATE.generatedVocab[lang][level].length) return; // вже є (з кешу чи попереднього фетчу)
    const key = lang + '|' + level;
    if (_sharedVocabLoading[key]) return; // вже вантажиться
    _sharedVocabLoading[key] = true;
    const words = await loadSharedVocab(lang, level);
    _sharedVocabLoading[key] = false;
    if (words && words.length) {
        STATE.generatedVocab[lang][level] = words;
        if (typeof render === 'function' && STATE.targetLang === lang && STATE.level === level) render();
    }
}

// =====================================================================
//  АВТОМАТИЧНА ПІДГОТОВКА СЛІВ ДЛЯ ОБРАНОЇ МОВИ (self-serve)
// =====================================================================
// Раніше ensureSharedVocabLoaded() була написана, але ніде не викликалась
// — тобто навіть коли адмін публікував спільний словник, звичайний
// користувач ніколи не отримував його автоматично. А для мов, які адмін
// ще не встиг наповнити, слів не було взагалі — людина просто бачила
// порожній словник/картки/тести без жодного способу це виправити самому.
//
// ensureVocabAvailable(lang, level) закриває обидва випадки:
//  1) спершу пробує підвантажити вже опублікований адміном спільний
//     словник (швидко, без витрати власної AI-квоти користувача);
//  2) якщо його ще нема — генерує невеликий стартовий словник особисто
//     для цього користувача через Gemini (ту саму AI, що й тролль-чат),
//     і кешує в STATE.generatedVocab, щоб не генерувати повторно.
// Викликати "тихо" (без await) на початку екранів словника/карток/тестів
// — перший рендер може показати порожній стан, другий (після render())
// вже покаже слова.
let _vocabAutoGenLoading = {};
async function ensureVocabAvailable(lang, level) {
    if (!lang || lang === 'no') return; // вбудований словник — нічого підвантажувати не треба
    ensureGeneratedVocabStore();
    const already = STATE.generatedVocab[lang] && STATE.generatedVocab[lang][level];
    if (already && already.length) return;
    const key = lang + '|' + level;
    if (_vocabAutoGenLoading[key]) return; // вже в процесі — не дублюємо запити
    _vocabAutoGenLoading[key] = true;
    try {
        await ensureSharedVocabLoaded(lang, level);
        const afterShared = STATE.generatedVocab[lang] && STATE.generatedVocab[lang][level];
        if (afterShared && afterShared.length) return;
        if (typeof generateBulkVocab !== 'function' || typeof callAiRaw !== 'function') return; // AI недоступна (наприклад, AI_PROXY_URL не налаштований)
        // Невеликий пакет (2 запити ≈ до 120 слів) — досить, щоб одразу
        // можна було почати вчитись, не чекаючи на адміна.
        const words = await generateBulkVocab(lang, level, 2, null);
        if (words && words.length) {
            STATE.generatedVocab[lang][level] = words;
            updateState();
            if (typeof render === 'function' && STATE.targetLang === lang && (STATE.level || 'A1') === level) render();
        }
    } catch (e) {
        console.error('[Словник] Не вдалося підготувати слова для', lang, level, e);
    } finally {
        _vocabAutoGenLoading[key] = false;
    }
}

