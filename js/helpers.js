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
    const current = STATE.level || "A1";
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

        function wordKey(w) { return (w.level || '') + "|" + w.no; }

        function vocabForLevel(level) {
            const base = VOCAB[level] || [];
            const custom = (STATE && Array.isArray(STATE.customWords)) ?
                STATE.customWords.filter(w => w.level === level) : [];
            return custom.length ? base.concat(custom) : base;
        }

        // Додає нові слова (згенеровані AI або введені вручну) до словника
        // користувача. Слова одразу стають доступними у словнику, картках,
        // тестах і SRS — бо всі вони йдуть через vocabForLevel().
        function addCustomWords(level, words) {
            if (!Array.isArray(STATE.customWords)) STATE.customWords = [];
            const existing = new Set(
                vocabForLevel(level).map(w => normalize(w.no))
            );
            let added = 0;
            words.forEach(w => {
                if (!w || !w.no || !w.uk) return;
                const key = normalize(w.no);
                if (existing.has(key)) return;
                existing.add(key);
                STATE.customWords.push({
                    level,
                    t: w.t || 'Додано AI',
                    no: String(w.no).trim(),
                    uk: String(w.uk).trim(),
                    ex_no: w.ex_no || w.no,
                    ex_uk: w.ex_uk || w.uk,
                });
                added++;
            });
            if (added) updateState();
            return added;
        }

        // Об'єднує вбудовані завдання Norskprøve з тими, що згенерував AI
        // і які збережені у STATE.customNorskTasks[level][mode].
        function norskTasksFor(level, mode) {
            const base = (NORSKPROVE_TASKS[level] && NORSKPROVE_TASKS[level][mode]) || [];
            const custom = (STATE.customNorskTasks && STATE.customNorskTasks[level] && STATE.customNorskTasks[level][mode]) || [];
            return base.concat(custom);
        }

        // Додає нове AI-згенероване завдання Norskprøve і зберігає його
        // в STATE, щоб воно залишалось на сайті між сесіями.
        function addCustomNorskTask(level, mode, task) {
            if (!STATE.customNorskTasks) STATE.customNorskTasks = {};
            if (!STATE.customNorskTasks[level]) STATE.customNorskTasks[level] = {};
            if (!Array.isArray(STATE.customNorskTasks[level][mode])) STATE.customNorskTasks[level][mode] = [];
            STATE.customNorskTasks[level][mode].push(task);
            updateState();
        }

        function allVocabUpTo(level) {
            const idx = LEVELS.indexOf(level);
            let out = [];
            for (let i = 0; i <= idx; i++) out = out.concat(VOCAB[LEVELS[i]]);
            return out;
        }

        function getSrs(key) {
            if (!STATE.srs) STATE.srs = {};
            return STATE.srs[key] || { ease: 2.5, interval: 0, due: todayStr(), reps: 0 };
        }

        function gradeWord(key, grade) {
            const s = getSrs(key);
            const wasNew = s.reps === 0 && !STATE.stats.wordsSeen[key];
            if (grade === 'again') { s.reps = 0;
                s.interval = 1;
                s.ease = Math.max(1.3, s.ease - 0.2); } else if (grade === 'hard') { s.interval = Math.max(1, Math.round(s
                    .interval * 1.2));
                s.ease = Math.max(1.3, s.ease - 0.05); } else { s.reps++;
                s.interval = s.reps === 1 ? 1 : (s.reps === 2 ? 3 : Math.round(s.interval * s.ease));
                s.ease += 0.05; }
            const due = new Date();
            due.setDate(due.getDate() + s.interval);
            s.due = todayStr(due);
            STATE.srs[key] = s;
            if (!STATE.stats.wordsSeen) STATE.stats.wordsSeen = {};
            STATE.stats.wordsSeen[key] = (STATE.stats.wordsSeen[key] || 0) + 1;
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

window.checkDailyTask = function(selected, correct, taskId, container) {
    const options = container.querySelectorAll('.mc-opt');
    const feedback = container.querySelector('#dailyFeedback');
    const result = container.querySelector('#dailyResult');
    options.forEach(btn => btn.disabled = true);
    if (selected === correct) {
        options.forEach((btn, idx) => { if (idx === correct) btn.classList.add('correct'); });
        feedback.innerHTML = `<div class="feedback-banner ok">✅ Правильно! 🎉</div>`;
        addXP(20, 'daily_task');
        const today = new Date().toISOString().slice(0, 10);
        if (!STATE.dailyTasksCompleted) STATE.dailyTasksCompleted = {};
        if (!STATE.dailyTasksCompleted[today]) {
            STATE.dailyTasksCompleted[today] = true;
            updateState();
            checkAchievements({ dailyTaskCompleted: true });
        }
        result.textContent = `+20 XP за завдання дня! 🔥`;
    } else {
        options.forEach((btn, idx) => {
            if (idx === correct) btn.classList.add('correct');
            if (idx === selected) btn.classList.add('wrong');
        });
        feedback.innerHTML = `<div class="feedback-banner bad">❌ Неправильно. Правильна відповідь: ${options[correct].textContent}</div>`;
        result.textContent = `Спробуй завтра знову! 💪`;
    }
};
