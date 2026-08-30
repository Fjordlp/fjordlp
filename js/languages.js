// =====================================================================
//  ВИБІР МОВИ ДЛЯ ВИВЧЕННЯ (не плутати з мовою інтерфейсу!)
//  STATE.uiLang / STATE.vocabLang — якою мовою показується сам сайт.
//  STATE.targetLang — ЯКУ мову користувач вивчає.
// =====================================================================

window.LANGUAGES = [
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

window.getLanguage = function(code) {
    return (window.LANGUAGES || []).find(l => l.code === code) || window.LANGUAGES[0];
};

// =====================================================================
//  ГОЛОСИ ДЛЯ ОЗВУЧЕННЯ (TTS) — ПО КОЖНІЙ МОВІ ОКРЕМО
// =====================================================================
window.TTS_VOICES = {
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

window.getTtsVoice = function(lang) {
    return window.TTS_VOICES[lang] || window.TTS_VOICES.no;
};

window.targetLangName = function(code) {
    const lang = window.getLanguage(code || (typeof STATE !== 'undefined' && STATE && STATE.targetLang) || 'no');
    const uiLang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    return lang.name[uiLang] || lang.name.uk;
};

window.isBuiltinLang = function() {
    const code = (typeof STATE !== 'undefined' && STATE && STATE.targetLang) || 'no';
    return window.getLanguage(code).builtin;
};

window.examSectionLabel = function() {
    const targetLang = (typeof STATE !== 'undefined' && STATE && STATE.targetLang) || 'no';
    const uiLang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    if (targetLang === 'no') {
        return { uk: 'Norskprøve Academy', en: 'Norskprøve Academy', ru: 'Norskprøve Academy' }[uiLang];
    }
    return { uk: 'Тренажер завдань', en: 'Exam Prep', ru: 'Тренажёр заданий' }[uiLang] || 'Тренажер завдань';
};

window.examSectionNavLabel = function() {
    const targetLang = (typeof STATE !== 'undefined' && STATE && STATE.targetLang) || 'no';
    const uiLang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    if (targetLang === 'no') return 'Norskprøve';
    return { uk: 'Завдання', en: 'Exam Prep', ru: 'Задания' }[uiLang] || 'Завдання';
};