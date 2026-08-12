// =====================================================================
//  ХРОНІКИ ТРОЛЛЯ: персоналізована пригода на основі i+1
// =====================================================================
// Ідея (comprehensible input / гіпотеза i+1 Крашена): текст засвоюється
// найкраще, коли він майже повністю зрозумілий і містить лише трохи
// нового. Тут AI пише кожен розділ, спираючись САМЕ на ті слова, які ЦЯ
// конкретна людина вже знає (за даними її ж SRS — LD().srs), і додає
// лише 2-3 нових слова за розділ. Троль-маскот — супутник у пригоді;
// кожен розділ закінчується вибором мовою вивчення (активний retrieval,
// а не пасивне читання), і нові слова, вжиті в тексті, самі йдуть у
// особисту колоду карток (addCustomWords) — без окремої дії користувача.

const STORY_FREE_CHAPTERS_PER_DAY = 1; // майбутній лічильник для преміум-моделі; поки не блокує, лише показує

// Скільки повних розділів (з текстом) тримаємо в LD().story.history. Це
// синхронізується в Firestore ЦІЛИМ документом при кожному новому розділі
// (updateState() зберігає весь STATE) — без обмеження історія росла б
// назавжди й рано чи пізно вперлась би в ліміт розміру документа
// Firestore (1 МБ). Для зв'язності сюжету це й не потрібно: story.summary
// вже несе стислий переказ усього, що було, і саме він (а не повний текст
// старих розділів) іде в кожен наступний запит до AI. Старі розділи, що
// випадають зі зберігання, лишаються видимі користувачу лише доти, доки
// не почнеться новий (як "історія читання", а не архів назавжди).
const STORY_HISTORY_LIMIT = 8;

// Сигнальне значення для "продовжити без явного вибору" (коли AI не дав
// розвилки в попередньому розділі). Раніше сюди підставляли перекладений
// UI-рядок ("Continue"/"Продовжити") так, ніби гравець буквально ввів це
// як репліку — і AI бачив дивне "Гравець щойно обрав: Continue" замість
// того, щоб просто продовжити оповідь. Тепер це чіткий внутрішній сигнал,
// який generateStoryChapter() розпізнає окремо (див. STORY_CONTINUE_SIGNAL
// нижче в continuity).
const STORY_CONTINUE_SIGNAL = '__continue__';

function ensureStoryState() {
    if (!LD().story || typeof LD().story !== 'object') {
        LD().story = {
            chapterIndex: 0,
            summary: '', // короткий стислий переказ подій дотепер (для контексту наступного запиту AI)
            history: [], // [{ chapterIndex, text, choiceMade, newWords: [...] }]
            lastPlayedDate: null,
            chaptersToday: 0,
        };
    }
    return LD().story;
}

// Слова, які людина вже "тримає" (reps >= 1 — бачила хоч раз; reps >= 2
// вважається "засвоєним" у решті застосунку, той самий критерій). Беремо
// з УСІХ рівнів до поточного включно — читач природно пригадує і старіші
// слова, це і є суть повторення в контексті.
function getKnownWordsForStory(lang, level) {
    const idx = LEVELS.indexOf(level);
    const upToLevels = LEVELS.slice(0, idx + 1);
    const known = [];
    const seen = new Set();
    upToLevels.forEach(lvl => {
        vocabForLevel(lvl, lang).forEach(w => {
            const key = wordKey(Object.assign({ level: lvl }, w), lang);
            const s = getSrs(key);
            if (s && s.reps >= 1 && !seen.has(w.no.toLowerCase())) {
                seen.add(w.no.toLowerCase());
                known.push(w.no);
            }
        });
    });
    return known;
}

// Кандидати на "нові слова розділу" (i+1) — беремо з поточного рівня,
// яких людина ще не бачила взагалі (немає в LD().stats.wordsSeen), І
// яких ще не було в попередніх розділах ЦІЄЇ ж пригоди. Друга умова
// важлива: сама лише перевірка wordsSeen не рятує від повторів, бо
// "бачити" слово в застосунку рахується лише після реального перегляду
// картки/тесту — а слово, щойно введене розділом 1, вже додане в
// customWords, але формально ще НЕ "seen" аж до першого review. Без
// цієї другої умови AI міг спокійно "відкрити" те саме слово вдруге в
// розділі 2, ніби воно нове.
function getUnseenWordsForLevel(lang, level, alreadyIntroduced, limit) {
    const seenKeys = Object.keys(LD().stats.wordsSeen || {});
    const introducedLower = new Set(alreadyIntroduced.map(w => w.toLowerCase()));
    function candidatesAt(lvl) {
        return vocabForLevel(lvl, lang).filter(w => {
            const key = wordKey(Object.assign({ level: lvl }, w), lang);
            return !seenKeys.includes(key) && !introducedLower.has(w.no.toLowerCase());
        });
    }
    let pool = candidatesAt(level);
    // Якщо на поточному рівні вже "вичерпали" всі невідомі слова (людина
    // старанно вчилась) — пробуємо наступний рівень угору, а не мовчки
    // повертаємо порожньо щоразу.
    if (pool.length < (limit || 3)) {
        const idx = LEVELS.indexOf(level);
        if (idx >= 0 && idx + 1 < LEVELS.length) {
            pool = pool.concat(candidatesAt(LEVELS[idx + 1]));
        }
    }
    return shuffle(pool).slice(0, limit || 3);
}

async function generateStoryChapter(choiceMade) {
    const lang = STATE.targetLang || 'no';
    const level = LD().level || 'A1';
    const story = ensureStoryState();
    const langName = getLanguage(lang).name.uk;

    const knownWords = getKnownWordsForStory(lang, level);
    const alreadyIntroduced = story.history.flatMap(ch => (ch.newWords || []).map(w => w.no));
    // Замало відомих слів (людина щойно почала) — AI все одно попросимо
    // писати гранично просто, орієнтуючись на A1-словник мови, навіть
    // якщо список known ще короткий.
    const newWordCandidates = getUnseenWordsForLevel(lang, level, alreadyIntroduced, 3);
    const newWordsHint = newWordCandidates.map(w => w.no).join(', ');
    // Перемішуємо перед обрізанням до 120 — інакше при великому словнику
    // AI щоразу бачив би той самий перший шматок списку (фіксований
    // порядок vocabForLevel), і решта відомих слів ніколи не спливала б
    // у контексті історії.
    const knownSample = shuffle(knownWords).slice(0, 120).join(', ');

    const sys = "Ти — майстер інтерактивних історій для вивчення мов, який пише розділи " +
        "\"вибери свій шлях\" СПЕЦІАЛЬНО під словниковий запас конкретного читача. " +
        "Головний герой-супутник — дружній лісовий тролль. Пиши прості, короткі речення. " +
        "Відповідай ЛИШЕ чистим JSON-об'єктом без жодного тексту навколо, без markdown-огорожі.";

    const continuity = !story.summary
        ? `Це ПЕРШИЙ розділ нової пригоди. Тролль щойно зустрічає гравця і кличе в невелику пригоду.`
        : choiceMade === STORY_CONTINUE_SIGNAL
            ? `Продовження історії. Стислий переказ подій дотепер: "${story.summary}". Попередній розділ не мав явної розвилки — просто продовжуй сюжет далі.`
            : `Продовження історії. Стислий переказ подій дотепер: "${story.summary}". Гравець щойно обрав: "${choiceMade}".`;

    const userMsg =
        `Мова тексту розділу: ${langName}, рівень CEFR ${level}.\n` +
        `${continuity}\n\n` +
        `Слова, які гравець УЖЕ знає (використовуй переважно їх, це майже весь текст): ${knownSample || '(словник ще дуже малий, пиши гранично простими базовими словами рівня A1)'}\n` +
        `Нові слова, які треба природно ввести в цьому розділі (2-3 штуки, кожне має зустрітись у тексті хоч раз): ${newWordsHint || '(не критично, якщо нема — просто напиши простий текст)'}\n\n` +
        `Напиши один короткий розділ (60-110 слів мовою ${langName}) і завершіть розвилкою: сценою, де гравець має прийняти рішення. Дай 2-3 короткі варіанти дії мовою ${langName} (по 2-6 слів кожен).\n\n` +
        `Формат відповіді:\n` +
        `{"text": "текст розділу мовою вивчення", ` +
        `"newWords": [{"no":"нове слово мовою вивчення","uk":"переклад українською","ex_no":"ТОЧНЕ речення з тексту розділу вище, де вжито це слово","ex_uk":"переклад цього речення українською"}], ` +
        `"choices": ["варіант дії 1","варіант дії 2","варіант дії 3"], ` +
        `"summary": "новий стислий переказ УКРАЇНСЬКОЮ всієї історії дотепер, включно з цим розділом, для пам'яті — 2-3 речення"}`;

    const reply = await callAiRaw('story_chapter', sys, userMsg, []);
    const parsed = parseAiJson(reply);
    if (!parsed || !parsed.text) throw new Error('AI не повернув текст розділу');

    // Нові слова, вжиті в розділі, одразу йдуть в особисту колоду —
    // природний побічний ефект читання, без окремої дії користувача.
    // Приклад речення (ex_no/ex_uk) тепер береться з реального контексту
    // розділу, а не лишається порожнім (раніше addCustomWords підставляв
    // саме слово замість прикладу, якщо його не було).
    const newWords = Array.isArray(parsed.newWords) ? parsed.newWords.filter(w => w && w.no && w.uk) : [];
    if (newWords.length) addCustomWords(level, newWords);

    story.chapterIndex++;
    story.summary = parsed.summary || story.summary;
    story.history.push({
        chapterIndex: story.chapterIndex,
        text: parsed.text,
        choiceMade: (choiceMade && choiceMade !== STORY_CONTINUE_SIGNAL) ? choiceMade : null,
        newWords,
    });
    // Обрізаємо до ліміту (лишаємо найновіші) — chapterIndex далі рахується
    // без розривів, тож нумерація розділів у заголовках лишається коректною
    // навіть коли старі записи вже випали зі сховища.
    if (story.history.length > STORY_HISTORY_LIMIT) {
        story.history = story.history.slice(story.history.length - STORY_HISTORY_LIMIT);
    }
    const today = todayStr();
    if (story.lastPlayedDate !== today) { story.lastPlayedDate = today; story.chaptersToday = 0; }
    story.chaptersToday++;
    updateState();
    markActivityToday();

    return { text: parsed.text, choices: Array.isArray(parsed.choices) ? parsed.choices : [], newWords };
}
