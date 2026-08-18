// =====================================================================
//  ВИБІР МОВИ ДЛЯ ВИВЧЕННЯ (не плутати з мовою інтерфейсу!)
//  STATE.uiLang / STATE.vocabLang — якою мовою показується сам сайт.
//  STATE.targetLang — ЯКУ мову користувач вивчає (норвезьку, іспанську...).
//  За замовчуванням лишається "no" (норвезька) — щоб нічого не зламати
//  для тих, хто вже вчить норвезьку через вбудований словник/граматику.
// =====================================================================
const LANGUAGES = [
    { code: 'no', flag: '🇳🇴', native: 'Norsk', name: { uk: 'Норвезька', en: 'Norwegian', ru: 'Норвежский' }, builtin: true },
    { code: 'en', flag: '🇬🇧', native: 'English', name: { uk: 'Англійська', en: 'English', ru: 'Английский' }, builtin: true },
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

// =====================================================================
//  ГОЛОСИ ДЛЯ ОЗВУЧЕННЯ (TTS) — ПО КОЖНІЙ МОВІ ОКРЕМО
// =====================================================================
// Раніше speak() у troll.js був жорстко прив'язаний ЛИШЕ до норвезького
// голосу (nb-NO-FridaNeural / пошук voices, що починаються з "nb"/"no") —
// незалежно від того, яку мову користувач насправді вивчає. Це означало,
// що будь-хто, хто вчить іспанську, німецьку, японську тощо, чув слова й
// речення озвученими З НОРВЕЗЬКИМ ГОЛОСОМ (для SpeechSynthesis-фолбека
// браузер це або взагалі не вимовляв нормально, або вимовляв із
// неправильною вимовою мови тексту). Тепер кожна мова має власний голос
// Edge TTS (природні Neural-голоси Microsoft) і власний BCP-47 код мови
// для пошуку системного голосу браузера як запасного варіанту.
const TTS_VOICES = {
    no: { edge: 'nb-NO-FridaNeural', bcp47: 'nb' },
    en: { edge: 'en-US-AriaNeural', bcp47: 'en' },
    de: { edge: 'de-DE-KatjaNeural', bcp47: 'de' },
    es: { edge: 'es-ES-ElviraNeural', bcp47: 'es' },
    fr: { edge: 'fr-FR-DeniseNeural', bcp47: 'fr' },
    it: { edge: 'it-IT-ElsaNeural', bcp47: 'it' },
    pt: { edge: 'pt-PT-RaquelNeural', bcp47: 'pt' },
    pl: { edge: 'pl-PL-ZofiaNeural', bcp47: 'pl' },
    sv: { edge: 'sv-SE-SofieNeural', bcp47: 'sv' },
    nl: { edge: 'nl-NL-ColetteNeural', bcp47: 'nl' },
    ja: { edge: 'ja-JP-NanamiNeural', bcp47: 'ja' },
    tr: { edge: 'tr-TR-EmelNeural', bcp47: 'tr' },
    da: { edge: 'da-DK-ChristelNeural', bcp47: 'da' },
    fi: { edge: 'fi-FI-NooraNeural', bcp47: 'fi' },
    is: { edge: 'is-IS-GudrunNeural', bcp47: 'is' },
    el: { edge: 'el-GR-AthinaNeural', bcp47: 'el' },
    cs: { edge: 'cs-CZ-VlastaNeural', bcp47: 'cs' },
    sk: { edge: 'sk-SK-ViktoriaNeural', bcp47: 'sk' },
    ro: { edge: 'ro-RO-AlinaNeural', bcp47: 'ro' },
    hu: { edge: 'hu-HU-NoemiNeural', bcp47: 'hu' },
    bg: { edge: 'bg-BG-KalinaNeural', bcp47: 'bg' },
    hr: { edge: 'hr-HR-GabrijelaNeural', bcp47: 'hr' },
    uk: { edge: 'uk-UA-PolinaNeural', bcp47: 'uk' },
    ru: { edge: 'ru-RU-SvetlanaNeural', bcp47: 'ru' },
    zh: { edge: 'zh-CN-XiaoxiaoNeural', bcp47: 'zh' },
    ko: { edge: 'ko-KR-SunHiNeural', bcp47: 'ko' },
    ar: { edge: 'ar-SA-ZariyahNeural', bcp47: 'ar' },
    he: { edge: 'he-IL-HilaNeural', bcp47: 'he' },
    hi: { edge: 'hi-IN-SwaraNeural', bcp47: 'hi' },
    vi: { edge: 'vi-VN-HoaiMyNeural', bcp47: 'vi' },
    th: { edge: 'th-TH-PremwadeeNeural', bcp47: 'th' },
    id: { edge: 'id-ID-GadisNeural', bcp47: 'id' },
};

function getTtsVoice(lang) {
    return TTS_VOICES[lang] || TTS_VOICES.no;
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
    // Раніше просили переклад ЛИШЕ українською (поля no/uk/ex_no/ex_uk) —
    // хоча картки, словник і тести вміють показувати переклад також
    // англійською й російською через wordTranslation()/wordExampleTranslation()
    // (поля en/ru/en_ex/ru_ex — саме так влаштовані вбудовані норвезькі
    // слова в data.js). Для згенерованих слів цих полів просто не було,
    // тож для будь-кого з інтерфейсом не українською переклад мовчки
    // "падав" назад на українську. Тепер просимо всі три переклади одразу.
    const userMsg =
        `Мова вивчення: ${langName}. Рівень: ${level}. ` +
        `Згенеруй 60 корисних слів цією мовою для цього рівня. Фокус на темах: ${topicHint}. ` +
        (avoidList ? `НЕ повторюй ці вже наявні слова: ${avoidList}. ` : '') +
        `Формат масиву: [{"t": "тема українською", "no": "слово мовою вивчення", ` +
        `"uk": "переклад українською", "en": "переклад англійською", "ru": "переклад російською", ` +
        `"ex_no": "приклад речення мовою вивчення (мінімум 4 слова, містить це слово)", ` +
        `"ex_uk": "переклад прикладу українською", "en_ex": "переклад прикладу англійською", "ru_ex": "переклад прикладу російською"}, ...]`;
    const reply = await callAiRaw('gen_vocab', sys, userMsg, []);
    return parseAiJson(reply);
}

// Генерує ВЕЛИКИЙ стартовий словник за кілька послідовних запитів (замість
// одного) — так надійніше (менший ризик обірваної JSON-відповіді від AI на
// один величезний запит) і дає змогу реально "максимально" наповнити рівень
// словами, а не обмежуватись одним десятком.
// onProgress(doneBatches, totalBatches, wordsSoFar) викликається після
// кожного пакету, щоб інтерфейс міг показати прогрес.
// Невелика пауза між пакетами — Worker обмежує ~12 запитів/хв на IP
// (RATE_LIMIT_PER_MIN), а генерація одразу кількох мов/рівнів підряд
// (по 5-8 запитів кожна) реально в цей ліміт впиралась: перші пакети
// проходили, а наступні мовчки відсіювались через isTransientBatchError.
function sleep(ms) { return new Promise(res => setTimeout(res, ms)); }

async function generateBulkVocab(langCode, level, batches, onProgress) {
    batches = batches || 5;
    const collected = [];
    const seen = new Set();
    let lastError = null;
    let failedBatches = 0;
    for (let i = 0; i < batches; i++) {
        if (i > 0) await sleep(600); // пауза між запитами, щоб не впертись у RATE_LIMIT_PER_MIN
        let batch;
        try {
            batch = await generateStarterVocab(langCode, level, i, collected);
        } catch (e) {
            console.error('[Словник] Помилка пакету генерації', i, e);
            lastError = e;
            failedBatches++;
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
    // Раніше помилки кожного пакету лише логувались у консоль і губились —
    // якщо провалювались УСІ пакети (наприклад, AI-проксі впав або
    // заблокував запит), функція мовчки повертала порожній масив, і
    // адмінка показувала "Готово: 0 слів" без жодного натяку на причину.
    // Тепер, якщо жодного слова не зібрано і хоч один пакет впав —
    // прокидаємо реальну помилку далі, щоб інтерфейс міг показати її текст.
    if (collected.length === 0 && failedBatches > 0 && lastError) {
        throw lastError;
    }
    return collected;
}

function ensureGeneratedVocabStore(lang) {
    if (!STATE.generatedVocab) STATE.generatedVocab = {};
    // Раніше ця функція завжди ініціалізувала кеш лише для
    // STATE.targetLang, ігноруючи параметр lang. Це працювало для
    // звичайних користувачів (targetLang уже дорівнює потрібній мові на
    // момент виклику), але падало з TypeError, щойно щось запитувало
    // слова для мови, ВІДМІННОЇ від поточної targetLang користувача.
    lang = lang || STATE.targetLang || 'no';
    if (!STATE.generatedVocab[lang]) STATE.generatedVocab[lang] = {};
}

// =====================================================================
//  AI-ГЕНЕРАЦІЯ ГРАМАТИКИ ДЛЯ НЕ ВБУДОВАНОЇ МОВИ
// =====================================================================
// Вбудований масив GRAMMAR (data.js) — це 27 правил, повністю захардко-
// джених під норвезьку (приклади "en bil", "et hus" тощо). Раніше вкладка
// "Граматика" й питання граматики в тесті test-mc показували ЦІ норвезькі
// правила АБСОЛЮТНО ВСІМ користувачам незалежно від STATE.targetLang —
// людина, що вчить іспанську, бачила питання про артиклі en/ei/et.
// Нижче — та сама схема генерації, що й для словника (generateStarterVocab
// вище): AI генерує компактні граматичні картки МОВОЮ ВИВЧЕННЯ, з перекладом
// пояснень одразу на 3 мови інтерфейсу (uk/en/ru), у тій самій "плоскій"
// формі полів (title/title_en/title_ru...), що й вбудовані норвезькі
// правила — це дозволяє рендерити обидва джерела однаковим кодом.
const GRAMMAR_TOPIC_HINTS = {
    A1: ['рід і означеність іменників, теперішній час дієслова "бути", особові займенники', 'базові питальні слова, заперечення, множина іменників', 'найпростіші дієслова руху й дії, прийменники місця'],
    A2: ['минулий час, майбутній час', 'модальні дієслова (могти/мусити/хотіти), прийменники часу', 'ступені порівняння прикметників, присвійні займенники'],
    B1: ['умовний спосіб, підрядні речення причини й часу', 'пасивний стан, непряма мова', 'зворотні дієслова, сполучникові звороти'],
    B2: ['складні часові конструкції, узгодження часів', 'герундій та інфінітив, модальні відтінки значення', 'складнопідрядні речення, сполучники контрасту'],
    C1: ['складна підрядність, стилістичні інверсії', 'ідіоматичні граматичні конструкції, номіналізація', 'відтінки модальності у формальному мовленні'],
    C2: ['рідкісні синтаксичні конструкції, літературний реєстр', 'розмовні еліпси та скорочення', 'тонкі відмінності між синонімічними конструкціями'],
};

async function generateGrammarBatch(langCode, level, batchIndex, existingTitles) {
    const langName = getLanguage(langCode).name.uk;
    const sys = "Ти — досвідчений викладач іноземних мов, який готує стислі граматичні " +
        "картки для рівня CEFR. Відповідай ЛИШЕ чистим JSON-масивом без жодного тексту " +
        "навколо, без markdown-огорожі.";
    const hints = GRAMMAR_TOPIC_HINTS[level] || GRAMMAR_TOPIC_HINTS.A1;
    const topicHint = hints[(batchIndex || 0) % hints.length];
    const avoidList = (existingTitles || []).slice(-30).join(', ');
    const userMsg =
        `Мова вивчення: ${langName}. Рівень CEFR: ${level}. ` +
        `Згенеруй 4 граматичні правила цієї мови для цього рівня на тему: ${topicHint}. ` +
        (avoidList ? `НЕ повторюй ці вже описані правила: ${avoidList}. ` : '') +
        `Кожне правило — компактна картка: коротке пояснення, таблиця-приклад (2-3 рядки, ` +
        `2 колонки) і одне питання з 3 варіантами відповіді. Приклади в таблиці й варіанти ` +
        `відповіді пиши МОВОЮ ВИВЧЕННЯ (${langName}), пояснення й назву правила — трьома мовами. ` +
        `Формат масиву: [{"title":"назва правила українською","title_en":"назва англійською",` +
        `"title_ru":"назва російською","exp":"пояснення українською (1-2 речення)",` +
        `"exp_en":"пояснення англійською","exp_ru":"пояснення російською",` +
        `"table":{"head":["Колонка1 укр","Колонка2 укр"],"rows":[["приклад мовою вивчення","приклад2"],["...","..."]]},` +
        `"head_en":["Колонка1 англ","Колонка2 англ"],"head_ru":["Колонка1 рос","Колонка2 рос"],` +
        `"ex":{"q":"питання українською (може містити приклад мовою вивчення)","opts":["варіант1 мовою вивчення","варіант2","варіант3"],"a":0},` +
        `"q_en":"те саме питання англійською","q_ru":"те саме питання російською"}, ...]`;
    const reply = await callAiRaw('gen_grammar', sys, userMsg, []);
    return parseAiJson(reply);
}

// Мультипакетна генерація (як generateBulkVocab) — кілька менших запитів
// надійніші за один величезний, і дають прогрес користувачу/адміну. Так само
// витримує паузу між пакетами й прокидає помилку, якщо провалились усі —
// той самий фікс rate-limit, що й для словника.
async function generateBulkGrammar(langCode, level, batches, onProgress) {
    batches = batches || 3;
    const collected = [];
    const seen = new Set();
    let lastError = null;
    let failedBatches = 0;
    for (let i = 0; i < batches; i++) {
        if (i > 0) await sleep(600); // пауза між запитами, щоб не впертись у RATE_LIMIT_PER_MIN
        let batch;
        try {
            batch = await generateGrammarBatch(langCode, level, i, collected.map(g => g.title));
        } catch (e) {
            console.error('[Граматика] Помилка пакету генерації', i, e);
            lastError = e;
            failedBatches++;
            continue;
        }
        (Array.isArray(batch) ? batch : []).forEach(g => {
            if (!g || !g.title || !g.ex || !g.table) return;
            const key = g.title.trim().toLowerCase();
            if (seen.has(key)) return;
            seen.add(key);
            g.id = `${langCode}_${level}_${collected.length}`;
            g.level = level;
            collected.push(g);
        });
        if (typeof onProgress === 'function') onProgress(i + 1, batches, collected.length);
    }
    if (collected.length === 0 && failedBatches > 0 && lastError) {
        throw lastError;
    }
    return collected;
}

// =====================================================================
//  СПІЛЬНА АБЕТКА (адмін генерує й публікує через AI, один раз на мову —
//  на відміну від граматики/словника, тут нема поділу по рівнях)
// =====================================================================
async function loadSharedAlphabet(lang) {
    if (!firebaseReady || !firebaseDb) return null;
    try {
        const doc = await firebaseDb.collection('sharedAlphabet').doc(lang).get();
        if (doc.exists && Array.isArray(doc.data().letters)) return doc.data().letters;
        return null;
    } catch (e) {
        console.error('[Спільна абетка] Помилка завантаження:', e);
        return null;
    }
}

async function saveSharedAlphabet(lang, letters) {
    if (!firebaseReady || !firebaseDb) throw new Error('Firestore недоступний');
    await firebaseDb.collection('sharedAlphabet').doc(lang).set({
        letters, lang, updatedAt: new Date().toISOString(), count: letters.length,
    });
}

// Кеш підвантаженої (вбудованої з файлу або спільної з Firestore) абетки
// на поточну сесію — щоб не смикати Firestore при кожному відкритті екрана.
let _alphabetCache = {};
let _alphabetLoading = {};

async function ensureAlphabetAvailable(lang) {
    if (!lang) return;
    if (window.LANG_DATA && window.LANG_DATA[lang] && window.LANG_DATA[lang].ALPHABET) return; // вбудований файл цієї мови вже покриває абетку
    if (_alphabetCache[lang]) return;
    if (_alphabetLoading[lang]) return;
    _alphabetLoading[lang] = true;
    try {
        const shared = await loadSharedAlphabet(lang);
        if (shared && shared.length) {
            _alphabetCache[lang] = shared;
            if (typeof render === 'function' && STATE.targetLang === lang &&
                typeof ROUTE !== 'undefined' && ROUTE === 'alphabet') render();
        }
        // Так само, як і з граматикою: особистої AI-генерації "про запас"
        // для кожного користувача навмисно немає — лише вбудований файл
        // або те, що адмін опублікував через "Спільна абетка".
    } catch (e) {
        console.error('[Абетка] Помилка підготовки:', e);
    } finally {
        _alphabetLoading[lang] = false;
    }
}

function getAlphabetForLang(lang) {
    const langFile = window.LANG_DATA && window.LANG_DATA[lang];
    if (langFile && langFile.ALPHABET) return langFile.ALPHABET;
    return _alphabetCache[lang] || null;
}

async function generateAlphabetWithAI(lang) {
    const targetLangName = typeof getLanguage === 'function' ? getLanguage(lang).name.uk : lang;
    const userMsg =
        `Мова: "${targetLangName}". Склади повну абетку цієї мови для початківця, який ` +
        `розмовляє українською. Формат масиву: [{"letter": "як виглядає літера (велика й мала, наприклад \\"A a\\")", ` +
        `"name": "як літера називається (українською транслітерацією)", ` +
        `"sound": "коротке, практичне пояснення вимови українською — не наукова фонетика, а orientir для новачка", ` +
        `"example": "приклад слова з цією літерою мовою вивчення", "example_uk": "переклад прикладу українською"}, ...]. ` +
        `Включи ВСІ літери абетки цієї мови в правильному порядку (якщо в мові є діакритичні літери — включи і їх наприкінці).`;
    const sys = `Ти — досвідчений викладач мови "${targetLangName}" для україномовних початківців з нуля. ` +
        "Відповідай ЛИШЕ чистим JSON-масивом без жодного тексту навколо, без markdown-огорожі.";
    const reply = await callAiRaw('gen_alphabet', sys, userMsg, [], 'uk');
    return parseAiJson(reply);
}

// =====================================================================
//  СПІЛЬНА (ГЛОБАЛЬНА) ГРАМАТИКА У FIRESTORE — той самий принцип, що й
//  sharedVocab: адмін один раз генерує й публікує граматику для мови+рівня
//  у Firestore, і після цього всі користувачі бачать її одразу, без
//  власних AI-запитів.
// =====================================================================
function sharedGrammarDocId(lang, level) { return `${lang}_${level}`; }

async function loadSharedGrammar(lang, level) {
    if (!firebaseReady || !firebaseDb) return null;
    try {
        const doc = await firebaseDb.collection('sharedGrammar').doc(sharedGrammarDocId(lang, level)).get();
        if (doc.exists && Array.isArray(doc.data().rules)) return doc.data().rules;
        return null;
    } catch (e) {
        console.error('[Спільна граматика] Помилка завантаження:', e);
        return null;
    }
}

async function saveSharedGrammar(lang, level, rules) {
    if (!firebaseReady || !firebaseDb) throw new Error('Firestore недоступний');
    await firebaseDb.collection('sharedGrammar').doc(sharedGrammarDocId(lang, level)).set({
        rules, lang, level, updatedAt: new Date().toISOString(), count: rules.length,
    });
}

// =====================================================================
//  АВТОМАТИЧНА ПІДГОТОВКА ГРАМАТИКИ ДЛЯ ОБРАНОЇ МОВИ (self-serve)
// =====================================================================
// Дзеркало ensureVocabAvailable() вище, тільки для граматики. Для
// норвезької нічого не робимо — вбудований GRAMMAR і так покриває всі
// рівні. Для решти мов: спершу пробуємо взяти вже опубліковане адміном
// (швидко, безкоштовно для користувача), і лише якщо нічого нема —
// генеруємо особисто через AI, кешуючи в STATE.generatedGrammar[lang][level].
// Кеш словника й граматики лишаються спільними (не per-мова-ізольованими
// через LD()) — так само, як STATE.generatedVocab: це технічний кеш уже
// завантажених даних, а не особистий прогрес користувача, тож ізолювати
// його по LD() немає сенсу.
let _grammarAutoGenLoading = {};
async function ensureGrammarAvailable(lang, level) {
    if (!lang) return;
    if (window.LANG_DATA && window.LANG_DATA[lang] && window.LANG_DATA[lang].GRAMMAR) return; // вбудований файл цієї мови вже покриває граматику
    if (!STATE.generatedGrammar) STATE.generatedGrammar = {};
    if (!STATE.generatedGrammar[lang]) STATE.generatedGrammar[lang] = {};
    const already = STATE.generatedGrammar[lang][level];
    if (already && already.length) return;
    const key = lang + '|' + level;
    if (_grammarAutoGenLoading[key]) return;
    _grammarAutoGenLoading[key] = true;
    try {
        const shared = await loadSharedGrammar(lang, level);
        if (shared && shared.length) {
            STATE.generatedGrammar[lang][level] = shared;
            // Раніше тут перемальовувалось лише якщо рівень щойно
            // завантаженої граматики збігався з LD().level (поточним рівнем
            // користувача). Але вкладка "Граматика" тепер показує ВСІ рівні
            // одразу, тож перемальовуємо, поки людина реально на цій
            // вкладці — незалежно від того, який саме рівень підвантажився.
            if (typeof render === 'function' && STATE.targetLang === lang &&
                typeof ROUTE !== 'undefined' && ROUTE === 'grammar') render();
            return;
        }
        // Особисту AI-генерацію "про запас" для окремого користувача
        // вимкнено навмисно: раніше, щойно людина заходила в розділ
        // "Граматика" для мови без вбудованого файлу, сайт одразу тихо
        // генерував правила через AI на кожного користувача окремо
        // (витрата AI-квоти + непередбачувана якість). Тепер джерела для
        // не вбудованих мов лише два: власний файл LANG_DATA[lang].GRAMMAR
        // (js/data-<lang>.js) або те, що адмін вручну опублікував через
        // "Спільна граматика" в адмінці (loadSharedGrammar вище) —
        // особистого фолбека більше нема, якщо нічого з цього не знайдено,
        // розділ граматики просто лишається порожнім для цієї мови/рівня.
        return;
    } catch (e) {
        console.error('[Граматика] Не вдалося підготувати правила для', lang, level, e);
    } finally {
        _grammarAutoGenLoading[key] = false;
    }
}

function isGrammarLoading(lang, level) {
    return !!_grammarAutoGenLoading[lang + '|' + level];
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
    // Раніше норвезька тут повністю пропускалась ("є вбудований словник,
    // спільний не потрібен") — але тепер адмін може публікувати ДОДАТКОВІ
    // норвезькі слова через "Спільні словники", тож пропускати завантаження
    // для 'no' більше не можна: інакше опубліковані слова ніколи не
    // потраплять користувачам. vocabForLevel() у helpers.js додає їх до
    // вбудованого VOCAB, а не замінює його.
    ensureGeneratedVocabStore(lang);
    if (STATE.generatedVocab[lang][level] && STATE.generatedVocab[lang][level].length) return; // вже є (з кешу чи попереднього фетчу)
    const key = lang + '|' + level;
    if (_sharedVocabLoading[key]) return; // вже вантажиться
    _sharedVocabLoading[key] = true;
    const words = await loadSharedVocab(lang, level);
    _sharedVocabLoading[key] = false;
    if (words && words.length) {
        STATE.generatedVocab[lang][level] = words;
        if (typeof render === 'function' && STATE.targetLang === lang && LD().level === level) render();
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
    if (!lang) return;
    ensureGeneratedVocabStore(lang);
    // Для норвезької лише перевіряємо, чи адмін щось додатково опублікував —
    // AI-самогенерацію нижче пропускаємо, вона тут не потрібна.
    if (lang === 'no') {
        await ensureSharedVocabLoaded(lang, level);
        return;
    }
    const already = STATE.generatedVocab[lang] && STATE.generatedVocab[lang][level];
    if (already && already.length) return;
    const key = lang + '|' + level;
    if (_vocabAutoGenLoading[key]) return; // вже в процесі — не дублюємо запити
    _vocabAutoGenLoading[key] = true;
    try {
        // Норвезька теж підвантажує опубліковане адміном (сторінка
        // "Спільні словники" тепер дозволяє публікувати й норвезькі
        // набори) — vocabForLevel() у helpers.js додає їх до вбудованого
        // VOCAB. А от особисту AI-генерацію "про запас" для норвезької
        // НЕ запускаємо — вбудованого словника й так достатньо, і не
        // варто змушувати кожного користувача чекати на зайвий AI-запит.
        await ensureSharedVocabLoaded(lang, level);
        const afterShared = STATE.generatedVocab[lang] && STATE.generatedVocab[lang][level];
        if (afterShared && afterShared.length) return;
        if (lang === 'no') return;
        if (typeof generateBulkVocab !== 'function' || typeof callAiRaw !== 'function') return; // AI недоступна (наприклад, AI_PROXY_URL не налаштований)
        // Невеликий пакет (2 запити ≈ до 120 слів) — досить, щоб одразу
        // можна було почати вчитись, не чекаючи на адміна.
        const words = await generateBulkVocab(lang, level, 2, null);
        if (words && words.length) {
            STATE.generatedVocab[lang][level] = words;
            updateState();
            if (typeof render === 'function' && STATE.targetLang === lang && (LD().level || 'A1') === level) render();
        }
    } catch (e) {
        console.error('[Словник] Не вдалося підготувати слова для', lang, level, e);
    } finally {
        _vocabAutoGenLoading[key] = false;
    }
}

// =====================================================================
//  ВХІДНИЙ ТЕСТ НА РІВЕНЬ ДЛЯ НЕ-НОРВЕЗЬКИХ МОВ
// =====================================================================
// LEVEL_TEST у data.js — вручну складений тест (слова + граматика) лише
// для норвезької. Для решти мов такого тесту не існувало взагалі — і
// вхідний тест при виборі, наприклад, іспанської чи німецької, все одно
// показував норвезькі питання. Ця функція будує еквівалентний тест "на
// льоту" зі слів, доступних для мови+рівня (спільний словник, опублікований
// адміном, або особисто згенерований через AI — те саме джерело, що й
// картки/словник/тести для цієї мови), тож формат питань той самий:
// переклад слова з варіантами відповіді.
const LEVEL_TEST_QUESTIONS_PER_TIER = 5;

async function buildLevelTestForLang(lang) {
    const questions = [];
    for (const tier of TEST_TIERS) {
        try {
            await ensureVocabAvailable(lang, tier);
        } catch (e) {
            console.error('[Тест на рівень] Не вдалося підготувати слова для', lang, tier, e);
        }
        const words = vocabForLevel(tier, lang);
        if (words.length < 3) continue; // недостатньо слів для рівня — пропускаємо його в тесті
        const pool = shuffle(words.slice()).slice(0, LEVEL_TEST_QUESTIONS_PER_TIER);
        pool.forEach(w => {
            const distractors = shuffle(words.filter(x => x.no !== w.no)).slice(0, 2).map(x => x.uk);
            if (distractors.length < 2) return;
            const opts = shuffle([w.uk, ...distractors]);
            questions.push({
                lvl: tier,
                q: tf('leveltest_translate_q', { word: w.no }),
                opts,
                a: opts.indexOf(w.uk)
            });
        });
    }
    return questions;
}

// Заголовок/пункт меню для розділу підготовки до іспиту: "Norskprøve
// Academy" має сенс тільки для норвезької (це справжня офіційна назва
// іспиту); для решти мов показуємо узагальнену назву "Тренажер завдань".
function examSectionLabel() {
    const targetLang = (typeof STATE !== 'undefined' && STATE && STATE.targetLang) || 'no';
    const uiLang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    if (targetLang === 'no') {
        return { uk: 'Norskprøve Academy', en: 'Norskprøve Academy', ru: 'Norskprøve Academy' }[uiLang];
    }
    return { uk: 'Тренажер завдань', en: 'Exam Prep', ru: 'Тренажёр заданий' }[uiLang] || 'Тренажер завдань';
}

function examSectionNavLabel() {
    const targetLang = (typeof STATE !== 'undefined' && STATE && STATE.targetLang) || 'no';
    const uiLang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    if (targetLang === 'no') return 'Norskprøve';
    return { uk: 'Завдання', en: 'Exam Prep', ru: 'Задания' }[uiLang] || 'Завдання';
}
