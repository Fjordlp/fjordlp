// =====================================================================
// ВИБІР МОВИ ДЛЯ ВИВЧЕННЯ
// =====================================================================

const LANGUAGES = [
    { code: 'no', flag: '🇳🇴', native: 'Norsk', name: { uk: 'Норвезька', en: 'Norwegian', ru: 'Норвежский' }, builtin: true },
    { code: 'en', flag: '🇬🇧', native: 'English', name: { uk: 'Англійська', en: 'English', ru: 'Английский' }, builtin: true },
    { code: 'de', flag: '🇩🇪', native: 'Deutsch', name: { uk: 'Німецька', en: 'German', ru: 'Немецкий' }, builtin: true },
    { code: 'es', flag: '🇪🇸', native: 'Español', name: { uk: 'Іспанська', en: 'Spanish', ru: 'Испанский' }, builtin: true },
    { code: 'fr', flag: '🇫🇷', native: 'Français', name: { uk: 'Французька', en: 'French', ru: 'Французский' }, builtin: true },
    { code: 'it', flag: '🇮🇹', native: 'Italiano', name: { uk: 'Італійська', en: 'Italian', ru: 'Итальянский' }, builtin: true },
    { code: 'pt', flag: '🇵🇹', native: 'Português', name: { uk: 'Португальська', en: 'Portuguese', ru: 'Португальский' }, builtin: true },
    { code: 'pl', flag: '🇵🇱', native: 'Polski', name: { uk: 'Польська', en: 'Polish', ru: 'Польский' }, builtin: true },
    { code: 'sv', flag: '🇸🇪', native: 'Svenska', name: { uk: 'Шведська', en: 'Swedish', ru: 'Шведский' }, builtin: true },
    { code: 'nl', flag: '🇳🇱', native: 'Nederlands', name: { uk: 'Нідерландська', en: 'Dutch', ru: 'Нидерландский' }, builtin: true },
    { code: 'ja', flag: '🇯🇵', native: '日本語', name: { uk: 'Японська', en: 'Japanese', ru: 'Японский' }, builtin: true },
    { code: 'tr', flag: '🇹🇷', native: 'Türkçe', name: { uk: 'Турецька', en: 'Turkish', ru: 'Турецкий' }, builtin: true },
    { code: 'da', flag: '🇩🇰', native: 'Dansk', name: { uk: 'Данська', en: 'Danish', ru: 'Датский' }, builtin: true },
    { code: 'fi', flag: '🇫🇮', native: 'Suomi', name: { uk: 'Фінська', en: 'Finnish', ru: 'Финский' }, builtin: true },
    { code: 'is', flag: '🇮🇸', native: 'Íslenska', name: { uk: 'Ісландська', en: 'Icelandic', ru: 'Исландский' }, builtin: true },
    { code: 'el', flag: '🇬🇷', native: 'Ελληνικά', name: { uk: 'Грецька', en: 'Greek', ru: 'Греческий' }, builtin: true },
    { code: 'cs', flag: '🇨🇿', native: 'Čeština', name: { uk: 'Чеська', en: 'Czech', ru: 'Чешский' }, builtin: true },
    { code: 'sk', flag: '🇸🇰', native: 'Slovenčina', name: { uk: 'Словацька', en: 'Slovak', ru: 'Словацкий' }, builtin: true },
    { code: 'ro', flag: '🇷🇴', native: 'Română', name: { uk: 'Румунська', en: 'Romanian', ru: 'Румынский' }, builtin: true },
    { code: 'hu', flag: '🇭🇺', native: 'Magyar', name: { uk: 'Угорська', en: 'Hungarian', ru: 'Венгерский' }, builtin: true },
    { code: 'bg', flag: '🇧🇬', native: 'Български', name: { uk: 'Болгарська', en: 'Bulgarian', ru: 'Болгарский' }, builtin: true },
    { code: 'hr', flag: '🇭🇷', native: 'Hrvatski', name: { uk: 'Хорватська', en: 'Croatian', ru: 'Хорватский' }, builtin: true },
    { code: 'uk', flag: '🇺🇦', native: 'Українська', name: { uk: 'Українська', en: 'Ukrainian', ru: 'Украинский' }, builtin: true },
    { code: 'ru', flag: '🇷🇺', native: 'Русский', name: { uk: 'Російська', en: 'Russian', ru: 'Русский' }, builtin: true },
    { code: 'zh', flag: '🇨🇳', native: '中文', name: { uk: 'Китайська', en: 'Chinese', ru: 'Китайский' }, builtin: true },
    { code: 'ko', flag: '🇰🇷', native: '한국어', name: { uk: 'Корейська', en: 'Korean', ru: 'Корейский' }, builtin: true },
    { code: 'ar', flag: '🇸🇦', native: 'العربية', name: { uk: 'Арабська', en: 'Arabic', ru: 'Арабский' }, builtin: true },
    { code: 'he', flag: '🇮🇱', native: 'עברית', name: { uk: 'Іврит', en: 'Hebrew', ru: 'Иврит' }, builtin: true },
    { code: 'hi', flag: '🇮🇳', native: 'हिन्दी', name: { uk: 'Гінді', en: 'Hindi', ru: 'Хинди' }, builtin: true },
    { code: 'vi', flag: '🇻🇳', native: 'Tiếng Việt', name: { uk: "В'єтнамська", en: 'Vietnamese', ru: 'Вьетнамский' }, builtin: true },
    { code: 'th', flag: '🇹🇭', native: 'ไทย', name: { uk: 'Тайська', en: 'Thai', ru: 'Тайский' }, builtin: true },
    { code: 'id', flag: '🇮🇩', native: 'Bahasa Indonesia', name: { uk: 'Індонезійська', en: 'Indonesian', ru: 'Индонезийский' }, builtin: true },
];

function getLanguage(code) {
    return LANGUAGES.find(l => l.code === code) || LANGUAGES[0];
}


// =====================================================================
// ГОЛОСИ ДЛЯ ОЗВУЧЕННЯ (TTS)
// =====================================================================

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


// =====================================================================
// НАЗВА МОВИ
// =====================================================================

function targetLangName(code) {
    const lang = getLanguage(
        code ||
        (typeof STATE !== 'undefined' && STATE && STATE.targetLang) ||
        'no'
    );

    const uiLang =
        (typeof STATE !== 'undefined' && STATE && STATE.uiLang) ||
        'uk';

    return lang.name[uiLang] || lang.name.uk;
}


// =====================================================================
// ВСІ ДАНІ БЕРУТЬСЯ ТІЛЬКИ З ЛОКАЛЬНИХ ФАЙЛІВ
// =====================================================================
//
// НІ:
// - AI-генерації словника
// - AI-генерації граматики
// - AI-генерації абетки
// - AI-генерації речень
// - Firebase sharedVocab
// - Firebase sharedGrammar
// - Firebase sharedAlphabet
// - Firebase sharedSentenceBuilder
//
// ТАК:
// - LANG_DATA[lang].VOCAB
// - LANG_DATA[lang].GRAMMAR
// - LANG_DATA[lang].ALPHABET
// - LANG_DATA[lang].SENTENCE_BUILDER (якщо є)
//


// =====================================================================
// АБЕТКА — ТІЛЬКИ З ЛОКАЛЬНОГО ФАЙЛУ
// =====================================================================

async function ensureAlphabetAvailable(lang) {
    if (!lang) return;

    const langFile =
        window.LANG_DATA &&
        window.LANG_DATA[lang];

    if (!langFile || !langFile.ALPHABET) {
        console.warn('[Абетка] Локальний файл не містить абетки:', lang);
        return;
    }

    if (
        typeof render === 'function' &&
        typeof STATE !== 'undefined' &&
        STATE.targetLang === lang &&
        typeof ROUTE !== 'undefined' &&
        ROUTE === 'alphabet'
    ) {
        render();
    }
}

function getAlphabetForLang(lang) {
    const langFile =
        window.LANG_DATA &&
        window.LANG_DATA[lang];

    if (langFile && langFile.ALPHABET) {
        return langFile.ALPHABET;
    }

    return null;
}


// =====================================================================
// ГРАМАТИКА — ТІЛЬКИ З ЛОКАЛЬНОГО ФАЙЛУ
// =====================================================================

async function ensureGrammarAvailable(lang, level) {
    if (!lang) return;

    const langFile =
        window.LANG_DATA &&
        window.LANG_DATA[lang];

    if (!langFile || !langFile.GRAMMAR) {
        console.warn(
            '[Граматика] Локальний файл не містить граматики:',
            lang
        );
        return;
    }

    if (
        typeof render === 'function' &&
        typeof STATE !== 'undefined' &&
        STATE.targetLang === lang &&
        typeof ROUTE !== 'undefined' &&
        ROUTE === 'grammar'
    ) {
        render();
    }
}

function isGrammarLoading() {
    return false;
}


// =====================================================================
// КОНСТРУКТОР РЕЧЕНЬ — ТІЛЬКИ З ЛОКАЛЬНОГО ФАЙЛУ
// =====================================================================

async function ensureSentenceBuilderAvailable(lang, level) {
    if (!lang) return;

    const langFile =
        window.LANG_DATA &&
        window.LANG_DATA[lang];

    if (!langFile || !langFile.SENTENCE_BUILDER) {
        return;
    }

    if (
        typeof render === 'function' &&
        typeof STATE !== 'undefined' &&
        STATE.targetLang === lang &&
        typeof ROUTE !== 'undefined' &&
        ROUTE === 'sentence-builder'
    ) {
        render();
    }
}

function isSentenceBuilderLoading() {
    return false;
}


// =====================================================================
// СЛОВНИК — ТІЛЬКИ З ЛОКАЛЬНОГО ФАЙЛУ
// =====================================================================

async function ensureSharedVocabLoaded() {
    // Firebase більше НЕ використовується.
    // Функція залишена для сумісності зі старим кодом.
    return;
}

async function ensureVocabAvailable(lang, level) {
    if (!lang) return;

    const langFile =
        window.LANG_DATA &&
        window.LANG_DATA[lang];

    if (!langFile) {
        console.warn(
            '[Словник] Локальний файл мови не знайдений:',
            lang
        );
        return;
    }

    // НІЯКОЇ AI-генерації.
    // НІЯКОГО Firebase.
    //
    // Слова повинні бути присутні безпосередньо
    // у локальному LANG_DATA / data-*.js.

    if (
        typeof render === 'function' &&
        typeof STATE !== 'undefined' &&
        STATE.targetLang === lang &&
        typeof LD === 'function' &&
        (LD().level || 'A1') === level
    ) {
        render();
    }
}


// =====================================================================
// ТЕСТ НА РІВЕНЬ
// БЕРЕ СЛОВА ТІЛЬКИ З ЛОКАЛЬНИХ ДАНИХ
// =====================================================================

const LEVEL_TEST_QUESTIONS_PER_TIER = 5;

async function buildLevelTestForLang(lang) {
    const questions = [];

    for (const tier of TEST_TIERS) {
        const words = vocabForLevel(tier, lang);

        if (!Array.isArray(words) || words.length < 3) {
            continue;
        }

        const pool = shuffle(words.slice())
            .slice(0, LEVEL_TEST_QUESTIONS_PER_TIER);

        pool.forEach(w => {
            const distractors = shuffle(
                words.filter(x => x.no !== w.no)
            )
                .slice(0, 2)
                .map(x => x.uk);

            if (distractors.length < 2) {
                return;
            }

            const opts = shuffle([
                w.uk,
                ...distractors
            ]);

            questions.push({
                lvl: tier,
                q: tf('leveltest_translate_q', {
                    word: w.no
                }),
                opts,
                a: opts.indexOf(w.uk)
            });
        });
    }

    return questions;
}


// =====================================================================
// НАЗВА РОЗДІЛУ ІСПИТУ
// =====================================================================

function examSectionLabel() {
    const targetLang =
        (typeof STATE !== 'undefined' &&
         STATE &&
         STATE.targetLang) ||
        'no';

    const uiLang =
        (typeof STATE !== 'undefined' &&
         STATE &&
         STATE.uiLang) ||
        'uk';

    if (targetLang === 'no') {
        return {
            uk: 'Norskprøve Academy',
            en: 'Norskprøve Academy',
            ru: 'Norskprøve Academy'
        }[uiLang];
    }

    return {
        uk: 'Тренажер завдань',
        en: 'Exam Prep',
        ru: 'Тренажёр заданий'
    }[uiLang] || 'Тренажер завдань';
}


function examSectionNavLabel() {
    const targetLang =
        (typeof STATE !== 'undefined' &&
         STATE &&
         STATE.targetLang) ||
        'no';

    const uiLang =
        (typeof STATE !== 'undefined' &&
         STATE &&
         STATE.uiLang) ||
        'uk';

    if (targetLang === 'no') {
        return 'Norskprøve';
    }

    return {
        uk: 'Завдання',
        en: 'Exam Prep',
        ru: 'Задания'
    }[uiLang] || 'Завдання';
}
