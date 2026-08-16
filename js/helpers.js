// =====================================================================
//  ОНБОРДИНГ: ВХІДНИЙ ТЕСТ, ЦІЛІ, ПЛАН
// =====================================================================

// Виправлено: тепер автоматично позначає онбординг як завершений,
// якщо користувач вже має дані (активність, XP, вивчені слова тощо).
function shouldShowOnboarding() {
    // Якщо вже позначено, що онбординг пройдено – пропускаємо
    if (STATE._onboardingDone) return false;

    // Перевіряємо наявність даних користувача
    const hasData = (function checkData() {
        // Перевіряємо langData (прогрес по мовах)
        if (STATE.langData && typeof STATE.langData === 'object') {
            for (const lang in STATE.langData) {
                const data = STATE.langData[lang];
                if (data) {
                    if (data.xp > 0) return true;
                    if (data.stats && data.stats.wordsSeen && Object.keys(data.stats.wordsSeen).length > 0) return true;
                    if (data.stats && data.stats.testsCompleted > 0) return true;
                    if (data.customWords && data.customWords.length > 0) return true;
                    if (data.srs && Object.keys(data.srs).length > 0) return true;
                    if (data.stats && data.stats.activityDates && data.stats.activityDates.length > 0) return true;
                }
            }
        }
        // Перевіряємо плоскі поля (старі дані)
        if (STATE.xp > 0) return true;
        if (STATE.stats && STATE.stats.wordsSeen && Object.keys(STATE.stats.wordsSeen).length > 0) return true;
        if (STATE.stats && STATE.stats.testsCompleted > 0) return true;
        if (STATE.customWords && STATE.customWords.length > 0) return true;
        // Якщо вже вибрано мову або є ім'я (не гість)
        if (STATE.targetLang && STATE.targetLang !== 'no') return true;
        if (STATE.name && STATE.name !== 'Гість') return true;
        return false;
    })();

    if (hasData) {
        // Автоматично позначаємо онбординг як завершений для існуючих користувачів
        STATE._onboardingDone = true;
        STATE._targetLangChosen = true;
        updateState();
        return false;
    }

    // Якщо даних немає – це новий користувач, показуємо онбординг
    return true;
}

// Аналогічно для вибору мови – якщо мова вже вибрана або є дані, пропускаємо
function shouldShowLanguageChoice() {
    // Якщо вже позначено, що мову вибрано – пропускаємо
    if (STATE._targetLangChosen) return false;

    // Якщо є хоч якісь дані – вважаємо, що мова вже вибрана
    const hasData = (function checkData() {
        if (STATE.langData && typeof STATE.langData === 'object') {
            for (const lang in STATE.langData) {
                const data = STATE.langData[lang];
                if (data) {
                    if (data.xp > 0) return true;
                    if (data.stats && data.stats.wordsSeen && Object.keys(data.stats.wordsSeen).length > 0) return true;
                    if (data.stats && data.stats.testsCompleted > 0) return true;
                    if (data.customWords && data.customWords.length > 0) return true;
                    if (data.srs && Object.keys(data.srs).length > 0) return true;
                }
            }
        }
        if (STATE.xp > 0) return true;
        if (STATE.stats && STATE.stats.wordsSeen && Object.keys(STATE.stats.wordsSeen).length > 0) return true;
        if (STATE.stats && STATE.stats.testsCompleted > 0) return true;
        if (STATE.customWords && STATE.customWords.length > 0) return true;
        return false;
    })();

    if (hasData) {
        STATE._targetLangChosen = true;
        STATE._onboardingDone = true;
        updateState();
        return false;
    }

    // Якщо мова вже була вибрана раніше (через settings) – пропускаємо
    if (STATE.targetLang && STATE.targetLang !== 'no') {
        STATE._targetLangChosen = true;
        updateState();
        return false;
    }

    return true;
}

function getStudyPlan(level, goalId) {
    const lang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    const noGoalMsg = { uk: 'Оберіть мету, щоб отримати план навчання.', en: 'Choose a goal to get a study plan.', ru: 'Выберите цель, чтобы получить план обучения.' }[lang];
    const noPlanMsg = { uk: 'План буде складено після визначення рівня.', en: 'The plan will be created once your level is determined.', ru: 'План будет составлен после определения уровня.' }[lang];
    const goal = STUDY_PLANS[goalId];
    if (!goal) return noGoalMsg;
    const levelIdx = LEVELS.indexOf(level);
    for (let i = levelIdx; i < LEVELS.length; i++) {
        const lv = LEVELS[i];
        if (goal[lv]) {
            const entry = goal[lv];
            if (typeof entry === 'string') return entry; // старі дані без перекладу (про всяк випадок)
            return entry[lang] || entry.uk;
        }
    }
    return noPlanMsg;
}

function getLevelDisplay(level) {
    const meta = LEVEL_META[level];
    return meta ? `${level}: ${meta.name}` : level;
}

// Рекомендація підвищення рівня (з головної)
function getLevelRecommendation() {
    if (STATE._dismissedRec) return null;
    const current = LD().level || "A1";
    const idx = LEVELS.indexOf(current);
    if (idx === LEVELS.length - 1) return null;

    const vocab = vocabForLevel(current);
    const total = vocab.length;
    if (total === 0) return null;

    const mastered = vocab.filter(w => {
        const s = getSrs(wordKey(Object.assign({ level: current }, w)));
        return s && s.reps >= 2;
    }).length;

    const pct = Math.round((mastered / total) * 100);
    if (pct >= 70) {
        return {
            current,
            recommended: LEVELS[idx + 1],
            pct,
            total,
            mastered
        };
    }
    return null;
}

// =====================================================================
//  HELPERS
// =====================================================================
function todayStr(d) { d = d || new Date(); return d.toISOString().slice(0, 10); }

function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function el(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
}

function toast(msg) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2400);
}

// Екранування HTML-спецсимволів перед вставкою будь-якого динамічного
// тексту (слова від AI, назви завдань Norskprøve, ім'я користувача
// тощо) у innerHTML-шаблони — запобігає XSS, якщо туди потрапить
// розмітка на кшталт <img onerror=...>.
function escHtml(s) {
    return String(s == null ? '' : s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function normalize(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
        .replace(/['’‘´`]/g, "").replace(/[-–—]/g, " ").replace(/\s+/g, " ");
}

function levenshtein(a, b) {
    const m = a.length,
        n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    const dp = new Array(n + 1);
    for (let j = 0; j <= n; j++) dp[j] = j;
    for (let i = 1; i <= m; i++) {
        let prev = dp[0];
        dp[0] = i;
        for (let j = 1; j <= n; j++) {
            const tmp = dp[j];
            dp[j] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, dp[j], dp[j - 1]);
            prev = tmp;
        }
    }
    return dp[n];
}

function isFuzzyMatch(input, target) {
    const a = normalize(input),
        b = normalize(target);
    if (!a) return false;
    if (a === b) return true;
    const threshold = b.length <= 3 ? 0 : (b.length <= 7 ? 1 : 2);
    return levenshtein(a, b) <= threshold;
}

// ВАЖЛИВО: ключ обов'язково включає мову. Раніше ключ був лише
// "рівень|слово" — а w.no це просто текст слова цільовою мовою (те саме
// поле "no" історично перевикористовується для будь-якої мови, див.
// generateBulkVocab). Слова, які однаково пишуться в різних мовах
// (інтернаціоналізми на кшталт "taxi", "hotel", "internet", "chocolate"),
// на одному й тому ж рівні ділили один SRS-запис і один рахунок
// "переглянуто" — прогрес з іспанської міг позначити слово вивченим і в
// норвезькій, і навпаки. Тепер кожна мова має власний ізольований набір
// ключів (LD().srs / LD().stats.wordsSeen), навіть якщо однакове слово
// трапляється в кількох мовах.
function wordKey(w, lang) {
    lang = lang || (typeof STATE !== 'undefined' && STATE && STATE.targetLang) || 'no';
    return lang + "|" + (w.level || '') + "|" + w.no;
}

// Додає нові слова (згенеровані AI або введені вручну) до словника
// користувача. Слова одразу стають доступними у словнику, картках,
// тестах і SRS — бо всі вони йдуть через vocabForLevel().
function addCustomWords(level, words) {
    if (!Array.isArray(LD().customWords)) LD().customWords = [];
    const lang = STATE.targetLang || 'no';
    const existing = new Set(
        vocabForLevel(level, lang).map(w => normalize(w.no))
    );
    let added = 0;
    words.forEach(w => {
        if (!w || !w.no || !w.uk) return;
        const key = normalize(w.no);
        if (existing.has(key)) return;
        existing.add(key);
        LD().customWords.push({
            level,
            lang,
            t: w.t || 'Додано AI',
            no: String(w.no).trim(),
            uk: String(w.uk).trim(),
            en: w.en ? String(w.en).trim() : undefined,
            ru: w.ru ? String(w.ru).trim() : undefined,
            ex_no: w.ex_no || w.no,
            ex_uk: w.ex_uk || w.uk,
            en_ex: w.en_ex ? String(w.en_ex).trim() : undefined,
            ru_ex: w.ru_ex ? String(w.ru_ex).trim() : undefined,
        });
        added++;
    });
    if (added) updateState();
    return added;
}

// Об'єднує вбудовані завдання Norskprøve з тими, що згенерував AI
// і які збережені у LD().customNorskTasks[level][mode].
function norskTasksFor(level, mode) {
    const lang = (typeof STATE !== 'undefined' && STATE && STATE.targetLang) || 'no';
    const langFile = window.LANG_DATA && window.LANG_DATA[lang];
    const tasks = langFile && langFile.NORSKPROVE_TASKS;
    const base = (tasks && tasks[level] && tasks[level][mode]) || [];
    const custom = (LD().customNorskTasks && LD().customNorskTasks[level] && LD().customNorskTasks[level][mode]) || [];
    return base.concat(custom);
}

function addCustomNorskTask(level, mode, task) {
    if (!LD().customNorskTasks) LD().customNorskTasks = {};
    if (!LD().customNorskTasks[level]) LD().customNorskTasks[level] = {};
    if (!Array.isArray(LD().customNorskTasks[level][mode])) LD().customNorskTasks[level][mode] = [];
    LD().customNorskTasks[level][mode].push(task);
    updateState();
}

function allVocabUpTo(level, lang) {
    lang = lang || (typeof STATE !== 'undefined' && STATE && STATE.targetLang) || 'no';
    const idx = LEVELS.indexOf(level);
    let out = [];
    for (let i = 0; i <= idx; i++) out = out.concat(vocabForLevel(LEVELS[i], lang));
    return out;
}

function getSrs(key) {
    if (!LD().srs) LD().srs = {};
    return LD().srs[key] || { ease: 2.5, interval: 0, due: todayStr(), reps: 0, lapses: 0 };
}

const LEECH_THRESHOLD = 4;

function isLeech(key) {
    return (getSrs(key).lapses || 0) >= LEECH_THRESHOLD;
}

function collectLeechWords(lang) {
    lang = lang || (STATE && STATE.targetLang) || 'no';
    const out = [];
    LEVELS.forEach(level => {
        vocabForLevel(level, lang).forEach(w => {
            const key = wordKey(Object.assign({ level }, w), lang);
            if (isLeech(key)) out.push(Object.assign({}, w, { _leechLevel: level }));
        });
    });
    return out;
}

function gradeWord(key, grade) {
    const s = getSrs(key);
    const wasNew = s.reps === 0 && !LD().stats.wordsSeen[key];
    if (grade === 'again') { s.reps = 0;
        s.interval = 1;
        s.ease = Math.max(1.3, s.ease - 0.2);
        s.lapses = (s.lapses || 0) + 1; } else if (grade === 'hard') { s.interval = Math.max(1, Math.round(s
            .interval * 1.2));
        s.ease = Math.max(1.3, s.ease - 0.05); } else { s.reps++;
        s.interval = s.reps === 1 ? 1 : (s.reps === 2 ? 3 : Math.round(s.interval * s.ease));
        s.ease += 0.05;
        if (s.reps >= 3) s.lapses = 0; }
    const due = new Date();
    due.setDate(due.getDate() + s.interval);
    s.due = todayStr(due);
    LD().srs[key] = s;
    if (!LD().stats.wordsSeen) LD().stats.wordsSeen = {};
    LD().stats.wordsSeen[key] = (LD().stats.wordsSeen[key] || 0) + 1;
    bumpDailyGoal(1);
    updateState();
    if (wasNew && grade !== 'again') { addXP(10, 'new_word'); }
}

// ---- Щоденна ціль ----
const DAILY_GOAL_TARGET = 10;

function getDailyGoal() {
    if (!STATE) return { count: 0, target: DAILY_GOAL_TARGET, done: false, pct: 0 };
    const today = todayStr();
    if (!STATE.dailyGoal || STATE.dailyGoal.date !== today) {
        STATE.dailyGoal = { date: today, count: 0, rewardGiven: false };
    }
    const count = STATE.dailyGoal.count || 0;
    const pct = Math.min(100, Math.round((count / DAILY_GOAL_TARGET) * 100));
    return { count, target: DAILY_GOAL_TARGET, done: count >= DAILY_GOAL_TARGET, pct };
}

function bumpDailyGoal(n) {
    const goal = getDailyGoal();
    STATE.dailyGoal.count += (n || 1);
    if (STATE.dailyGoal.count >= DAILY_GOAL_TARGET && !STATE.dailyGoal.rewardGiven) {
        STATE.dailyGoal.rewardGiven = true;
        toast('🎉 Щоденну ціль виконано! +25 XP');
        addXP(25, 'daily_goal');
    }
}

function getWordStatus(word, level) {
    const key = wordKey(Object.assign({ level }, word));
    const s = getSrs(key);
    if (s.reps === 0) return 'new';
    if (s.due > todayStr()) return 'mastered';
    return 'due';
}

async function loadWordsForLang(lang) {
    lang = lang || STATE.targetLang || 'no';
    const cached = sessionStorage.getItem(`words_${lang}`);
    if (cached) return JSON.parse(cached);
    
    let snap = await firebaseDb.collection('sharedVocab')
        .where('lang', '==', lang)
        .get();
    
    if (snap.empty && lang === 'no') {
        snap = await firebaseDb.collection('words').get();
    }
    
    const words = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    sessionStorage.setItem(`words_${lang}`, JSON.stringify(words));
    return words;
}

function vocabForLevel(level, lang) {
    lang = lang || (STATE && STATE.targetLang) || 'no';
    let base;
    const langFile = window.LANG_DATA && window.LANG_DATA[lang];
    if (langFile && langFile.VOCAB) {
        const builtin = langFile.VOCAB[level] || [];
        const extra = (STATE && STATE.generatedVocab && STATE.generatedVocab[lang] && STATE.generatedVocab[lang][level]) || [];
        base = extra.length ? builtin.concat(extra) : builtin;
    } else {
        if (!STATE.generatedVocab) STATE.generatedVocab = {};
        if (!STATE.generatedVocab[lang]) STATE.generatedVocab[lang] = {};
        base = STATE.generatedVocab[lang][level] || [];
    }
    const custom = (STATE && Array.isArray(LD().customWords)) ?
        LD().customWords.filter(w => w.level === level && (w.lang || 'no') === lang) : [];
    return custom.length ? base.concat(custom) : base;
}

function grammarForLevel(level, lang) {
    lang = lang || (STATE && STATE.targetLang) || 'no';
    const langFile = window.LANG_DATA && window.LANG_DATA[lang];
    if (langFile && langFile.GRAMMAR) {
        return langFile.GRAMMAR.filter(g => g.level === level);
    }
    if (!STATE.generatedGrammar) STATE.generatedGrammar = {};
    if (!STATE.generatedGrammar[lang]) STATE.generatedGrammar[lang] = {};
    return STATE.generatedGrammar[lang][level] || [];
}

function grammarLocalized(g, field) {
    const uiLang = (STATE && STATE.uiLang) || 'uk';
    if (uiLang === 'en' && g[field + '_en']) return g[field + '_en'];
    if (uiLang === 'ru' && g[field + '_ru']) return g[field + '_ru'];
    return g[field];
}

function grammarLocalizedHead(g) {
    const uiLang = (STATE && STATE.uiLang) || 'uk';
    if (uiLang === 'en' && g.head_en) return g.head_en;
    if (uiLang === 'ru' && g.head_ru) return g.head_ru;
    return g.table.head;
}

function grammarLocalizedQ(g) {
    const uiLang = (STATE && STATE.uiLang) || 'uk';
    if (uiLang === 'en' && g.q_en) return g.q_en;
    if (uiLang === 'ru' && g.q_ru) return g.q_ru;
    return g.ex.q;
}

// =====================================================================
//  ІСТОРІЯ ТЕСТІВ
// =====================================================================

// Структура одного запису в історії:
// {
//   id: 'timestamp',
//   type: 'mc' | 'cloze' | 'order' | 'listen' | 'translate',
//   level: 'A1' | 'A2' | ...,
//   date: '2026-08-16T10:00:00',
//   total: 10,
//   correct: 8,
//   score: 80,
//   details: [
//     { question: '...', userAnswer: '...', correctAnswer: '...', isCorrect: true/false }
//   ]
// }

function getTestHistory() {
    if (!LD().testHistory) {
        LD().testHistory = [];
    }
    return LD().testHistory;
}

function addTestResult(testResult) {
    const history = getTestHistory();
    testResult.id = Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6);
    testResult.date = new Date().toISOString();
    history.unshift(testResult); // нові записи зверху
    // Обмежуємо історію до 200 записів, щоб не роздувати сховище
    if (history.length > 200) {
        history.length = 200;
    }
    updateState();
    return testResult.id;
}

function getTestHistoryByLevel(level) {
    const history = getTestHistory();
    return history.filter(t => t.level === level);
}

function getTestHistoryByType(type) {
    const history = getTestHistory();
    return history.filter(t => t.type === type);
}

function getTestStatistics() {
    const history = getTestHistory();
    if (history.length === 0) return null;

    const stats = {
        total: history.length,
        avgScore: 0,
        byLevel: {},
        byType: {},
        bestScore: 0,
        worstScore: 100,
        recent: history.slice(0, 10),
    };

    let totalScore = 0;
    history.forEach(t => {
        totalScore += t.score;
        if (t.score > stats.bestScore) stats.bestScore = t.score;
        if (t.score < stats.worstScore) stats.worstScore = t.score;

        if (!stats.byLevel[t.level]) stats.byLevel[t.level] = { count: 0, totalScore: 0 };
        stats.byLevel[t.level].count++;
        stats.byLevel[t.level].totalScore += t.score;

        if (!stats.byType[t.type]) stats.byType[t.type] = { count: 0, totalScore: 0 };
        stats.byType[t.type].count++;
        stats.byType[t.type].totalScore += t.score;
    });

    stats.avgScore = Math.round(totalScore / history.length);

    // Обчислюємо середні по рівнях
    Object.keys(stats.byLevel).forEach(level => {
        stats.byLevel[level].avgScore = Math.round(stats.byLevel[level].totalScore / stats.byLevel[level].count);
    });
    Object.keys(stats.byType).forEach(type => {
        stats.byType[type].avgScore = Math.round(stats.byType[type].totalScore / stats.byType[type].count);
    });

    return stats;
}

// Отримує всі неправильні відповіді з історії тестів
function getWrongAnswers(limit = 50) {
    const history = getTestHistory();
    const wrong = [];
    for (const test of history) {
        if (test.details) {
            for (const detail of test.details) {
                if (!detail.isCorrect && detail.question) {
                    wrong.push({
                        question: detail.question,
                        userAnswer: detail.userAnswer,
                        correctAnswer: detail.correctAnswer,
                        testType: test.type,
                        level: test.level,
                        date: test.date,
                    });
                }
            }
        }
        if (wrong.length >= limit) break;
    }
    return wrong;
}

// Очистити історію тестів (для адмінів або за потреби)
function clearTestHistory() {
    LD().testHistory = [];
    updateState();
}