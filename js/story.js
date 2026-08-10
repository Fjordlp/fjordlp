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
// яких людина ще не бачила взагалі (немає в LD().stats.wordsSeen).
function getUnseenWordsForLevel(lang, level, limit) {
    const seenKeys = Object.keys(LD().stats.wordsSeen || {});
    const candidates = vocabForLevel(level, lang).filter(w => {
        const key = wordKey(Object.assign({ level }, w), lang);
        return !seenKeys.includes(key);
    });
    return shuffle(candidates).slice(0, limit || 3);
}

async function generateStoryChapter(choiceMade) {
    const lang = STATE.targetLang || 'no';
    const level = LD().level || 'A1';
    const story = ensureStoryState();
    const langName = getLanguage(lang).name.uk;

    const knownWords = getKnownWordsForStory(lang, level);
    // Замало відомих слів (людина щойно почала) — AI все одно попросимо
    // писати гранично просто, орієнтуючись на A1-словник мови, навіть
    // якщо список known ще короткий.
    const newWordCandidates = getUnseenWordsForLevel(lang, level, 3);
    const newWordsHint = newWordCandidates.map(w => w.no).join(', ');
    const knownSample = knownWords.slice(0, 120).join(', '); // обрізаємо, щоб не роздувати запит

    const sys = "Ти — майстер інтерактивних історій для вивчення мов, який пише розділи " +
        "\"вибери свій шлях\" СПЕЦІАЛЬНО під словниковий запас конкретного читача. " +
        "Головний герой-супутник — дружній лісовий тролль. Пиши прості, короткі речення. " +
        "Відповідай ЛИШЕ чистим JSON-об'єктом без жодного тексту навколо, без markdown-огорожі.";

    const continuity = story.summary
        ? `Продовження історії. Стислий переказ подій дотепер: "${story.summary}". Гравець щойно обрав: "${choiceMade}".`
        : `Це ПЕРШИЙ розділ нової пригоди. Тролль щойно зустрічає гравця і кличе в невелику пригоду.`;

    const userMsg =
        `Мова тексту розділу: ${langName}, рівень CEFR ${level}.\n` +
        `${continuity}\n\n` +
        `Слова, які гравець УЖЕ знає (використовуй переважно їх, це майже весь текст): ${knownSample || '(словник ще дуже малий, пиши гранично простими базовими словами рівня A1)'}\n` +
        `Нові слова, які треба природно ввести в цьому розділі (2-3 штуки, кожне має зустрітись у тексті хоч раз): ${newWordsHint || '(не критично, якщо нема — просто напиши простий текст)'}\n\n` +
        `Напиши один короткий розділ (60-110 слів мовою ${langName}) і завершіть розвилкою: сценою, де гравець має прийняти рішення. Дай 2-3 короткі варіанти дії мовою ${langName} (по 2-6 слів кожен).\n\n` +
        `Формат відповіді:\n` +
        `{"text": "текст розділу мовою вивчення", ` +
        `"newWords": [{"no":"нове слово мовою вивчення","uk":"переклад українською"}], ` +
        `"choices": ["варіант дії 1","варіант дії 2","варіант дії 3"], ` +
        `"summary": "новий стислий переказ УКРАЇНСЬКОЮ всієї історії дотепер, включно з цим розділом, для пам'яті — 2-3 речення"}`;

    const reply = await callAiRaw('story_chapter', sys, userMsg, []);
    const parsed = parseAiJson(reply);
    if (!parsed || !parsed.text) throw new Error('AI не повернув текст розділу');

    // Нові слова, вжиті в розділі, одразу йдуть в особисту колоду —
    // природний побічний ефект читання, без окремої дії користувача.
    const newWords = Array.isArray(parsed.newWords) ? parsed.newWords.filter(w => w && w.no && w.uk) : [];
    if (newWords.length) addCustomWords(level, newWords);

    story.chapterIndex++;
    story.summary = parsed.summary || story.summary;
    story.history.push({
        chapterIndex: story.chapterIndex,
        text: parsed.text,
        choiceMade: choiceMade || null,
        newWords,
    });
    const today = todayStr();
    if (story.lastPlayedDate !== today) { story.lastPlayedDate = today; story.chaptersToday = 0; }
    story.chaptersToday++;
    updateState();
    markActivityToday();

    return { text: parsed.text, choices: Array.isArray(parsed.choices) ? parsed.choices : [], newWords };
}
