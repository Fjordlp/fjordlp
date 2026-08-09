// =====================================================================
//  ОНБОРДИНГ: ВХІДНИЙ ТЕСТ, ЦІЛІ, ПЛАН
// =====================================================================
function shouldShowOnboarding() {
    return !STATE._onboardingDone;
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
                    // Раніше ці 4 поля тут просто ігнорувались навіть якщо AI
                    // їх повернув — слово зберігалось лише з українським
                    // перекладом, і хтось з англійським/російським
                    // інтерфейсом бачив український переклад замість свого.
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
        // Раніше norskTasksFor() завжди додавав NORSKPROVE_TASKS[level][mode]
        // до результату — а це повністю НОРВЕЗЬКОМОВНИЙ банк завдань
        // (тексти для читання, репліки для аудіювання, теми письма — все
        // норвезькою). Через це той, хто вчить іспанську чи німецьку,
        // відкривши "Тренажер завдань", бачив ті самі норвезькі тексти
        // "Hei! Jeg heter Anna…" — цілком незрозумілі й нерелевантні його
        // мові. Вбудований банк тепер лишається лише для норвезької; для
        // решти мов джерело завдань — виключно AI-згенеровані
        // LD().customNorskTasks (кнопка "Згенерувати завдання" на сторінці),
        // які generateNorskTaskAI() і так генерує цільовою мовою.
        function norskTasksFor(level, mode) {
            const lang = (typeof STATE !== 'undefined' && STATE && STATE.targetLang) || 'no';
            const langFile = window.LANG_DATA && window.LANG_DATA[lang];
            const tasks = langFile && langFile.NORSKPROVE_TASKS;
            const base = (tasks && tasks[level] && tasks[level][mode]) || [];
            const custom = (LD().customNorskTasks && LD().customNorskTasks[level] && LD().customNorskTasks[level][mode]) || [];
            return base.concat(custom);
        }

        // Додає нове AI-згенероване завдання Norskprøve і зберігає його
        // в STATE, щоб воно залишалось на сайті між сесіями.
        function addCustomNorskTask(level, mode, task) {
            if (!LD().customNorskTasks) LD().customNorskTasks = {};
            if (!LD().customNorskTasks[level]) LD().customNorskTasks[level] = {};
            if (!Array.isArray(LD().customNorskTasks[level][mode])) LD().customNorskTasks[level][mode] = [];
            LD().customNorskTasks[level][mode].push(task);
            updateState();
        }

        function allVocabUpTo(level, lang) {
            // Раніше тут було ЛИШЕ вбудоване VOCAB (норвезьке) незалежно від
            // мови — той самий баг, що й був у currentLevelWords() (див.
            // коментар там): хто вчить англійську/іспанську/т.д., бачив
            // норвезькі картки у віджеті "Слово дня". Тепер, як і в
            // vocabForLevel(), для не-норвезької мови беремо
            // STATE.generatedVocab[lang], а не вбудований норвезький VOCAB.
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

        // Поріг, після якого слово вважається "складним" (leech, як у Anki):
        // якщо користувач поспіль кілька разів натискає "Ще раз" на одному й
        // тому ж слові — просте очікування наступного дня SRS не допомагає,
        // слово треба відпрацювати окремо, зосереджено.
        const LEECH_THRESHOLD = 4;

        function isLeech(key) {
            return (getSrs(key).lapses || 0) >= LEECH_THRESHOLD;
        }

        // Знаходить усі "складні" слова користувача на вказаній мові
        // (незалежно від того, на якому рівні/темі вони вивчались) —
        // використовується для окремої тренувальної колоди "🩹 Складні слова".
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
                // Слово нарешті "засвоєне" стабільно (3+ вдалих повторення поспіль
                // після провалів) — знімаємо з нього мітку "складного".
                if (s.reps >= 3) s.lapses = 0; }
            const due = new Date();
            due.setDate(due.getDate() + s.interval);
            s.due = todayStr(due);
            LD().srs[key] = s;
            if (!LD().stats.wordsSeen) LD().stats.wordsSeen = {};
            LD().stats.wordsSeen[key] = (LD().stats.wordsSeen[key] || 0) + 1;
            bumpDailyGoal(1);
            updateState();
            if (wasNew && grade !== 'again') { addXP(10, 'new_word'); } // +10 XP за нове вивчене слово
        }

        // ---- Щоденна ціль (окремо від стріку — вимірює саме СЬОГОДНІШНЮ активність) ----
        const DAILY_GOAL_TARGET = 10; // скільки дій (карток/питань) треба сьогодні для завершення цілі

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

        // Викликається з будь-якої "навчальної дії" (картка, питання тесту тощо).
        function bumpDailyGoal(n) {
            const goal = getDailyGoal(); // гарантує, що STATE.dailyGoal ініціалізовано й актуальне на сьогодні
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
    
    // Спершу пробуємо з sharedVocab
    let snap = await firebaseDb.collection('sharedVocab')
        .where('lang', '==', lang)
        .get();
    
    // Якщо нічого немає, беремо з words (для норвезької)
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
    // Якщо для цієї мови є власний файл-словник (js/data-<lang>.js,
    // зареєстрований у LANG_DATA — так само, як норвезька в data.js) —
    // використовуємо його. Якщо файлу нема, як і раніше, працює
    // AI-генерація (STATE.generatedVocab). Опубліковані адміном "Спільні
    // словники" завжди додаються ЗВЕРХУ вбудованого файлу, а не замінюють
    // його — незалежно від того, норвезька це чи будь-яка інша мова.
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

// Дзеркало vocabForLevel(), тільки для граматичних правил. Для норвезької
// повертає зріз вбудованого GRAMMAR по рівню (як і раніше робив test-mc
// напряму); для решти мов — те, що встигла підготувати
// ensureGrammarAvailable() (адмінська публікація або особиста AI-генерація).
// Якщо на цей момент ще нічого нема — повертає порожній масив, а не
// норвезькі правила за замовчуванням (саме цей "тихий" фолбек і був
// причиною, чому люди, які вчать іспанську/німецьку/т.д., бачили питання
// про артиклі en/ei/et: GRAMMAR використовували напряму, без фільтра мови).
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

// Обирає правильномовний варіант поля граматичного правила залежно від
// STATE.uiLang (title/exp/q мають варіанти title_en/title_ru тощо — і у
// вбудованих норвезьких правилах, і у згенерованих AI). Раніше viewGrammar
// завжди показував лише українську версію (g.title), навіть коли інтерфейс
// був англійською чи російською — ці поля збирались, але не
// застосовувались.
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