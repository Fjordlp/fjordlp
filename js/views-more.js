 // ---- PROFILE ----
 function viewProfile() {
 const wrap = el(`
 <div class="view">
 <h1>${t('h_profile')}</h1>
 <div class="grid cols-4" style="margin-bottom:16px;">
 <div class="card stat-box"><div class="num">${Object.keys(LD().stats?.wordsSeen||{}).length}</div><div class="label">${t('stat_words_studied')}</div></div>
 <div class="card stat-box"><div class="num">${LD().stats?.testsCompleted||0}</div><div class="label">${t('stat_tests')}</div></div>
 <div class="card stat-box"><div class="num">${LD().streak||0}</div><div class="label">${t('stat_streak_days')}</div></div>
 <div class="card stat-box"><div class="num">${LD().stats?.bestStreak||0}</div><div class="label">${t('stat_best_streak')}</div></div>
 </div>
 <div class="grid cols-2">
 <div class="card">
 <h3>${t('calendar_15days')}</h3>
 <div class="calendar-grid" id="calgrid"></div>
 </div>
 <div class="card">
 <h3>${t('settings_title')}</h3>
 <div class="field"><label>${t('field_name')}</label><input id="setName" value="${escHtml(STATE.name||'')}"></div>
 <div class="field"><label>${t('field_learn_lang')}</label>
 <select id="setTargetLang">
 ${LANGUAGES.map(l => `<option value="${l.code}" ${STATE.targetLang===l.code?'selected':''}>${l.flag} ${l.name[STATE.uiLang]||l.name.uk}</option>`).join('')}
 </select>
 </div>
 <div class="field"><label>${t('field_goal')}</label><input id="setGoal" value="${escHtml(STATE.settings?.goal||'')}" placeholder="${t('field_goal_placeholder')}"></div>
 <div class="field"><label>${t('field_reminder_time')}</label><input type="time" id="setTime" value="${STATE.settings?.reminderTime||'18:00'}"></div>
 <div class="field"><label>${t('field_pace')}</label>
 <select id="setPace">
 <option value="calm" ${STATE.settings?.pace==='calm'?'selected':''}>${t('pace_calm')}</option>
 <option value="steady" ${STATE.settings?.pace==='steady'?'selected':''}>${t('pace_steady')}</option>
 <option value="intense" ${STATE.settings?.pace==='intense'?'selected':''}>${t('pace_intense')}</option>
 </select>
 </div>
 <button class="btn btn-primary btn-block" id="saveSettings">${t('save_btn2')}</button>
 </div>
 </div>
 <div class="card" style="margin-top:16px;">
 <h3>${t('leaderboard_title')}</h3>
 <div id="lb"></div>
 </div>
 <div class="card" style="margin-top:16px;">
 <h3>${t('data_title')}</h3>
 <p style="font-size:.8rem;color:var(--ink-soft);">${t('data_note')}</p>
 </div>
 </div>
 `);
 wrap.appendChild(el(`<footer style="text-align:center;padding:20px 0 8px;color:var(--ink-soft);font-size:.75rem;">© 2026 Fjord. Розробник: Максименко Назар. Усі права захищено.</footer>`));
 const cal = wrap.querySelector('#calgrid');
 const dates = LD().stats?.activityDates || [];
 const set = new Set(dates);
 for (let i = 44; i >= 0; i--) {
 const d = new Date();
 d.setDate(d.getDate() - i);
 const on = set.has(todayStr(d));
 cal.appendChild(el(`<div class="cell ${on?'on':''}" title="${todayStr(d)}"></div>`));
 }
 const lb = wrap.querySelector('#lb');
 const bots = [
 ["Ingrid", 1240],
 ["Kari", 980],
 ["Ola", 860],
 ["Lars", 640]
 ];
 const rows = bots.concat([
 [STATE.name || currentUser, LD().leaderboardScore || 0]
 ]).sort((a, b) => b[1] - a[1]);
 rows.forEach((r, i) => {
 const isYou = r[0] === (STATE.name || currentUser);
 lb.appendChild(el(
 `<div class="leaderboard-row ${isYou?'you':''}"><span class="rank">${i+1}</span><span class="name">${escHtml(r[0])}${isYou?t('you_label'):''}</span><span class="pts">${r[1]}</span></div>`
 ));
 });
 wrap.querySelector('#saveSettings').onclick = () => {
 STATE.name = wrap.querySelector('#setName').value.trim() || STATE.name || currentUser;
 if (!STATE.settings) STATE.settings = {};
 STATE.settings.goal = wrap.querySelector('#setGoal').value.trim();
 STATE.settings.reminderTime = wrap.querySelector('#setTime').value;
 STATE.settings.pace = wrap.querySelector('#setPace').value;
 const newTargetLang = wrap.querySelector('#setTargetLang').value;
 const targetLangChanged = newTargetLang !== STATE.targetLang;
 STATE.targetLang = newTargetLang;
 updateState();
 toast(t('settings_saved'));
 document.getElementById('userNameDisplay').textContent = STATE.name;
 if (targetLangChanged) navigate('home'); // словник/картки/тести залежать від мови — оновлюємо вкладку
 };
 return wrap;
 }

 // ---- NORSKPRØVE ----
function viewNorskprove() {
 // Стан для навігації всередині розділу
 if (!SUBSTATE.norskLevel) SUBSTATE.norskLevel = LD().level || "A1";
 if (!SUBSTATE.norskMode) SUBSTATE.norskMode = "reading";
 if (!SUBSTATE.norskTaskIndex) SUBSTATE.norskTaskIndex = 0;
 if (!SUBSTATE.norskAnswers) SUBSTATE.norskAnswers = {};

 const level = SUBSTATE.norskLevel;
 const mode = SUBSTATE.norskMode;
 const taskList = norskTasksFor(level, mode);
 const taskIndex = SUBSTATE.norskTaskIndex;
 const task = taskList[taskIndex] || null;

 const isNorwegianExam = (STATE.targetLang || 'no') === 'no';
 const learnLangName = targetLangName(STATE.targetLang || 'no');

 // MODE_INFO: "official" (leseprøve/lytteprøve/skriveprøve/muntlig prøve) —
 // це офіційні норвезькі назви частин ІМЕННО іспиту Norskprøve, тож мають
 // сенс лише для норвезької. Раніше вони показувались УСІМ мовам поспіль —
 // той, хто вчить іспанську, бачив приписку "(leseprøve)" під вправою на
 // читання іспанською, що не мало жодного стосунку до жодного реального
 // іспанського іспиту.
 const MODE_INFO_ALL = {
 uk: {
 reading: { label: " Читання", official: "leseprøve", note: "Автоматично перевіряється комп'ютером — оцінка не залежить від сенсора." },
 listening: { label: " Аудіювання", official: "lytteprøve", note: "Автоматично перевіряється комп'ютером — оцінка не залежить від сенсора." },
 writing: { label: " Письмо", official: "skriveprøve", note: "Роботу перевіряють щонайменше два сенсори — досвідчені викладачі норвезької." },
 speaking: { label: " Усна частина", official: "muntlig prøve", note: "Проходить очно: сенсор і екзаменатор, який ставить запитання." },
 },
 en: {
 reading: { label: " Reading", official: "leseprøve", note: "Automatically graded by computer — the score doesn't depend on an examiner." },
 listening: { label: " Listening", official: "lytteprøve", note: "Automatically graded by computer — the score doesn't depend on an examiner." },
 writing: { label: " Writing", official: "skriveprøve", note: "Your work is graded by at least two examiners — experienced Norwegian teachers." },
 speaking: { label: " Speaking", official: "muntlig prøve", note: "Taken in person: an examiner and a second assessor ask you questions." },
 },
 ru: {
 reading: { label: " Чтение", official: "leseprøve", note: "Автоматически проверяется компьютером — оценка не зависит от экзаменатора." },
 listening: { label: " Аудирование", official: "lytteprøve", note: "Автоматически проверяется компьютером — оценка не зависит от экзаменатора." },
 writing: { label: " Письмо", official: "skriveprøve", note: "Работу проверяют минимум два экзаменатора — опытные преподаватели норвежского." },
 speaking: { label: " Устная часть", official: "muntlig prøve", note: "Проходит очно: экзаменатор и ассессор задают вопросы." },
 },
 };
 const MODE_INFO = MODE_INFO_ALL[STATE.uiLang] || MODE_INFO_ALL.uk;

 // Для норвезької лишаємо детальний опис справжнього іспиту Norskprøve
 // (HK-dir). Для решти мов — узагальнений опис розділу тренажера
 // завдань, без вигаданих подробиць про неіснуючий "іспит" — на відміну
 // від норвезької, для більшості з 30 мов застосунку немає єдиного
 // уніфікованого державного мовного іспиту, тож видавати конкретну назву
 // й організацію було б просто неправдою.
 const NORSK_INFO_TEXT_NO = {
 uk: {
 intro: "Тренувальні завдання для підготовки до норвезького мовного іспиту (Norskprøve, HK-dir). Практикуйте читання, аудіювання, письмо та усне мовлення.",
 how_title: "ℹ Як влаштований справжній іспит",
 p1: "За офіційними даними HK-dir (Directoratet for høyere utdanning og kompetanse — організатора Norskprøve), іспит складається з чотирьох окремих частин: leseprøve (читання), lytteprøve (аудіювання), skriveprøve (письмо) та muntlig prøve (усна частина). Читання, аудіювання і письмо здаються за комп'ютером зазвичай в один день; усну частину приймають очно. Можна реєструватися на всі чотири частини або лише на окремі — і перескладати саме ту частину, де хочете покращити результат.",
 p2: "На письмову та усну частини реєструються на конкретний рівень — A1–A2, A2–B1 або B1–B2 (найважчий), а результат читання й аудіювання визначається автоматично під час самого тесту. Окремої програми чи підручника для іспиту немає: перевіряють практичне володіння мовою в буденних ситуаціях, тому найкраще готуватися, тренуючи усі чотири навички паралельно.",
 },
 en: {
 intro: "Practice tasks to prepare for the Norwegian language exam (Norskprøve, HK-dir). Practice reading, listening, writing, and speaking.",
 how_title: "ℹ How the real exam works",
 p1: "According to official HK-dir data (Directoratet for høyere utdanning og kompetanse — the organizer of Norskprøve), the exam consists of four separate parts: leseprøve (reading), lytteprøve (listening), skriveprøve (writing), and muntlig prøve (oral part). Reading, listening, and writing are taken on a computer, usually on the same day; the oral part is taken in person. You can register for all four parts or only specific ones — and retake just the part where you want to improve your result.",
 p2: "For the writing and oral parts, you register for a specific level — A1–A2, A2–B1, or B1–B2 (the hardest) — while the reading and listening result is determined automatically during the test itself. There is no separate curriculum or textbook for the exam: it tests practical language use in everyday situations, so it's best to prepare by practicing all four skills in parallel.",
 },
 ru: {
 intro: "Тренировочные задания для подготовки к норвежскому языковому экзамену (Norskprøve, HK-dir). Практикуйте чтение, аудирование, письмо и устную речь.",
 how_title: "ℹ Как устроен настоящий экзамен",
 p1: "По официальным данным HK-dir (Directoratet for høyere utdanning og kompetanse — организатора Norskprøve), экзамен состоит из четырёх отдельных частей: leseprøve (чтение), lytteprøve (аудирование), skriveprøve (письмо) и muntlig prøve (устная часть). Чтение, аудирование и письмо сдаются на компьютере, обычно в один день; устную часть принимают очно. Можно регистрироваться на все четыре части или только на отдельные — и пересдавать именно ту часть, где хотите улучшить результат.",
 p2: "На письменную и устную части регистрируются на конкретный уровень — A1–A2, A2–B1 или B1–B2 (самый сложный), а результат чтения и аудирования определяется автоматически во время самого теста. Отдельной программы или учебника для экзамена нет: проверяют практическое владение языком в повседневных ситуациях, поэтому лучше готовиться, тренируя все четыре навыка параллельно.",
 },
 };
 const NORSK_INFO_TEXT_GENERIC = {
 uk: {
 intro: `Тренувальні завдання для практики ${learnLangName.toLowerCase()}ої мови: читання, аудіювання, письмо та усне мовлення.`,
 how_title: "ℹ Як користуватись цим розділом",
 p1: `Це не підготовка до конкретного офіційного іспиту (на відміну від норвезької, де є Norskprøve) — просто тренажер чотирьох мовних навичок ${learnLangName.toLowerCase()}ою мовою на твоєму рівні. Завдання генерує AI: натисни "Згенерувати нове завдання", щоб отримати текст, діалог або тему письма під обраний рівень і режим.`,
 p2: "Читання й аудіювання перевіряються автоматично одразу після відповіді. Письмо перевіряє AI-репетитор і дає розгорнутий фідбек з виправленнями. Усна частина — це формулювання теми для самостійної практики (наприклад, запиши голосове повідомлення собі й прослухай ще раз).",
 },
 en: {
 intro: `Practice tasks for ${learnLangName}: reading, listening, writing, and speaking.`,
 how_title: "ℹ How this section works",
 p1: `This isn't prep for a specific official exam (unlike Norwegian, which has Norskprøve) — it's simply a practice trainer for the four language skills in ${learnLangName}, at your level. Tasks are AI-generated: tap "Generate a new task" to get a text, dialogue, or writing prompt for the chosen level and mode.`,
 p2: "Reading and listening are checked automatically right after you answer. Writing is reviewed by the AI tutor with detailed feedback and corrections. The speaking part gives you a topic prompt to practice on your own (e.g. record yourself and listen back).",
 },
 ru: {
 intro: `Тренировочные задания для практики ${learnLangName.toLowerCase()} языка: чтение, аудирование, письмо и устная речь.`,
 how_title: "ℹ Как пользоваться этим разделом",
 p1: `Это не подготовка к конкретному официальному экзамену (в отличие от норвежского, где есть Norskprøve) — просто тренажёр четырёх языковых навыков на ${learnLangName.toLowerCase()} языке твоего уровня. Задания генерирует AI: нажми «Сгенерировать новое задание», чтобы получить текст, диалог или тему для письма под выбранный уровень и режим.`,
 p2: "Чтение и аудирование проверяются автоматически сразу после ответа. Письмо проверяет AI-репетитор и даёт развёрнутый фидбек с исправлениями. Устная часть — это тема для самостоятельной практики (например, запиши голосовое сообщение себе и прослушай ещё раз).",
 },
 };
 const NORSK_INFO_TEXT = (isNorwegianExam ? NORSK_INFO_TEXT_NO : NORSK_INFO_TEXT_GENERIC)[STATE.uiLang] ||
 (isNorwegianExam ? NORSK_INFO_TEXT_NO.uk : NORSK_INFO_TEXT_GENERIC.uk);

 const MODE_LABELS = {
 uk: { reading: " Читання", listening: " Аудіювання", writing: " Письмо", speaking: " Усна частина" },
 en: { reading: " Reading", listening: " Listening", writing: " Writing", speaking: " Speaking" },
 ru: { reading: " Чтение", listening: " Аудирование", writing: " Письмо", speaking: " Устная часть" },
 }[STATE.uiLang] || {};

 const wrap = el(`
 <div class="view">
 <h1>${examSectionLabel()}</h1>
 <p style="color:var(--ink-soft);font-size:.95rem;margin-bottom:12px;">${NORSK_INFO_TEXT.intro}</p>

 <div class="card" style="margin-bottom:16px;background:var(--cream);">
 <h3 style="margin-top:0;">${NORSK_INFO_TEXT.how_title}</h3>
 <p style="font-size:.85rem;color:var(--ink-soft);margin-bottom:8px;">
 ${NORSK_INFO_TEXT.p1}
 </p>
 <p style="font-size:.85rem;color:var(--ink-soft);margin-bottom:8px;">
 ${NORSK_INFO_TEXT.p2}
 </p>
 ${isNorwegianExam ? `<p style="font-size:.8rem;color:var(--ink-soft);margin:0;">
 <strong>${MODE_INFO[mode].label}</strong> (${MODE_INFO[mode].official}): ${MODE_INFO[mode].note}
 </p>` : ''}
 </div>

 <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
 ${LEVELS.map(lv => `<button class="chip ${level===lv?'active':''}" data-level="${lv}">${lv}</button>`).join('')}
 </div>
 <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
 ${[
 ["reading", MODE_LABELS.reading],
 ["listening", MODE_LABELS.listening],
 ["writing", MODE_LABELS.writing],
 ["speaking", MODE_LABELS.speaking]
 ].map(([m, label]) => `<button class="chip ${mode===m?'active':''}" data-mode="${m}">${label}</button>`).join('')}
 </div>
 <div style="margin-bottom:16px;">
 <button class="btn btn-ghost btn-sm" id="norskGenBtn">${t('norsk_gen_task_btn')}</button>
 </div>

 <div id="norskTaskContainer"></div>
 </div>
 `);

 // Обробка вибору рівня та режиму
 wrap.querySelectorAll('[data-level]').forEach(btn => {
 btn.onclick = () => {
 SUBSTATE.norskLevel = btn.dataset.level;
 SUBSTATE.norskTaskIndex = 0;
 SUBSTATE.norskAnswers = {};
 navigate('norskprove', SUBSTATE);
 };
 });
 wrap.querySelectorAll('[data-mode]').forEach(btn => {
 btn.onclick = () => {
 SUBSTATE.norskMode = btn.dataset.mode;
 SUBSTATE.norskTaskIndex = 0;
 SUBSTATE.norskAnswers = {};
 navigate('norskprove', SUBSTATE);
 };
 });

 // AI-генерація нового завдання: додає його в LD().customNorskTasks,
 // тож воно одразу зʼявляється в списку і залишається на сайті надалі.
 const genBtn = wrap.querySelector('#norskGenBtn');
 genBtn.onclick = async () => {
 genBtn.disabled = true;
 const originalLabel = genBtn.textContent;
 genBtn.textContent = t('norsk_gen_task_loading');
 try {
 const newTask = await generateNorskTaskAI(level, mode);
 addCustomNorskTask(level, mode, newTask);
 toast(t('norsk_task_added_toast'));
 SUBSTATE.norskTaskIndex = norskTasksFor(level, mode).length - 1;
 SUBSTATE.norskAnswers = {};
 navigate('norskprove', SUBSTATE);
 } catch (e) {
      console.error('[Norskprøve] Помилка генерації завдання:', e);
 toast(t('norsk_gen_error_toast'));
 genBtn.disabled = false;
 genBtn.textContent = originalLabel;
 }
 };

 // Рендеримо завдання
 const container = wrap.querySelector('#norskTaskContainer');
 if (!task || taskList.length === 0) {
 container.innerHTML = `<div class="empty-state"><h3>${t('norsk_no_tasks_title')}</h3><p>${t('norsk_no_tasks_desc')}</p></div>`;
 } else {
 container.appendChild(renderNorskproveTask(task, mode, taskIndex, taskList.length));
 }

 return wrap;
}
function renderNorskproveTask(task, mode, index, total) {
 const wrap = el(`<div class="card" style="margin-top:8px;"></div>`);

 // Заголовок і прогрес
 const header = el(`
 <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
 <span style="font-weight:700;font-size:1.1rem;">${escHtml(task.title || t('task_default_title'))}</span>
 <span class="mono" style="font-size:.8rem;color:var(--ink-soft);">${index+1}/${total}</span>
 </div>
 `);
 wrap.appendChild(header);

 if (mode === 'reading' || mode === 'listening') {
 // Читання / Аудіювання – текст + питання
 const textEl = el(`<div style="margin-bottom:16px;padding:12px;background:var(--cream);border-radius:10px;">${escHtml(task.text)}</div>`);
 wrap.appendChild(textEl);

 if (mode === 'listening') {
 const soundBtn = el(`<button class="soundbtn" style="margin-bottom:12px;"> ${t('btn_listen')}</button>`);
 soundBtn.onclick = () => speak(task.text, STATE.targetLang);
 wrap.appendChild(soundBtn);
 }

 const answers = SUBSTATE.norskAnswers || {};
 const qContainer = el(`<div class="mc-options" style="max-width:100%;"></div>`);

 task.questions.forEach((q, qi) => {
 const qDiv = el(`<div style="margin-bottom:16px;"></div>`);
 const qText = el(`<p style="font-weight:600;margin-bottom:8px;">${qi+1}. ${escHtml(q.q)}</p>`);
 qDiv.appendChild(qText);
 const optsDiv = el(`<div class="mc-options" style="max-width:100%;"></div>`);

 q.opts.forEach((opt, oi) => {
 const btn = el(`<button class="mc-opt" ${answers[qi] !== undefined ? 'disabled' : ''}>${escHtml(opt)}</button>`);
 if (answers[qi] !== undefined) {
 if (oi === q.a) btn.classList.add('correct');
 else if (oi === answers[qi]) btn.classList.add('wrong');
 }
 btn.onclick = () => {
 if (answers[qi] !== undefined) return;
 const correct = oi === q.a;
 answers[qi] = oi;
 SUBSTATE.norskAnswers = answers;
 navigate('norskprove', SUBSTATE);
 if (correct) addXP(5, 'norskprove_correct');
 };
 optsDiv.appendChild(btn);
 });
 qDiv.appendChild(optsDiv);
 qContainer.appendChild(qDiv);
 });
 wrap.appendChild(qContainer);

 // Навігація
 const nav = el(`<div class="test-controls">
 <button class="btn btn-ghost btn-sm" id="norskPrev" ${index===0?'disabled':''}>${t('prev_btn')}</button>
 <button class="btn btn-primary btn-sm" id="norskNext" ${index>=total-1?'disabled':''}>${t('next_btn2')}</button>
 </div>`);
 nav.querySelector('#norskPrev').onclick = () => {
 SUBSTATE.norskTaskIndex = Math.max(0, index - 1);
 SUBSTATE.norskAnswers = {};
 navigate('norskprove', SUBSTATE);
 };
 nav.querySelector('#norskNext').onclick = () => {
 SUBSTATE.norskTaskIndex = Math.min(total - 1, index + 1);
 SUBSTATE.norskAnswers = {};
 navigate('norskprove', SUBSTATE);
 };
 wrap.appendChild(nav);

 // Підсумок, якщо всі питання відповідені
 const allAnswered = task.questions.every((_, qi) => answers[qi] !== undefined);
 if (allAnswered) {
 const correctCount = task.questions.filter((q, qi) => answers[qi] === q.a).length;
 const pct = Math.round((correctCount / task.questions.length) * 100);
 const fb = el(`<div class="feedback-banner ${pct>=70?'ok':'bad'}" style="margin-top:12px;">${tf('pct_correct', {pct, count: correctCount, total: task.questions.length})}</div>`);
 wrap.appendChild(fb);
 }

 } else if (mode === 'writing') {
 // Письмо
 const prompt = el(`<p style="color:var(--ink-soft);font-size:.95rem;margin-bottom:12px;">${escHtml(task.prompt)}</p>`);
 wrap.appendChild(prompt);

 const textarea = el(`<textarea class="type-input" style="min-height:120px;resize:vertical;font-family:inherit;" placeholder="${t('write_answer_placeholder')}" maxlength="3000"></textarea>`);
 wrap.appendChild(textarea);

 const btnRow = el(`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;"></div>`);
 const saveBtn = el(`<button class="btn btn-primary">${t('save_answer_btn')}</button>`);
 const checkBtn = el(`<button class="btn btn-amber">${t('check_ai_btn')}</button>`);
 btnRow.appendChild(saveBtn);
 btnRow.appendChild(checkBtn);
 wrap.appendChild(btnRow);

 const feedbackSlot = el(`<div class="ai-feedback-box" style="margin-top:14px;display:none;"></div>`);
 wrap.appendChild(feedbackSlot);

 saveBtn.onclick = () => {
 const answer = textarea.value.trim();
 if (answer) {
 if (!LD().norskWriting) LD().norskWriting = {};
 if (!LD().norskWriting[level]) LD().norskWriting[level] = {};
 LD().norskWriting[level][mode] = (LD().norskWriting[level][mode] || 0) + 1;
 updateState();
 toast(t('answer_saved_toast'));
 addXP(10, 'norskprove_writing');
 } else {
 toast(t('write_before_save_toast'));
 }
 };

 checkBtn.onclick = async () => {
 const answer = textarea.value.trim();
 if (!answer) {
 toast(t('write_before_check_toast'));
 return;
 }
 checkBtn.disabled = true;
 const originalLabel = checkBtn.textContent;
 checkBtn.textContent = t('check_ai_loading');
 feedbackSlot.style.display = 'block';
 feedbackSlot.innerHTML = `<div class="card" style="background:var(--cream);"><p style="color:var(--ink-soft);margin:0;">${t('check_ai_wait')}</p></div>`;
 try {
 const feedback = await checkWritingWithAI(level, task.topic, task.prompt, answer);
 feedbackSlot.innerHTML = '';
 const box = el(`<div class="card" style="border:2px solid var(--teal);"></div>`);
 const title = el(`<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;font-weight:700;">${t('troll_sensor_advice')}</div>`);
 const body = el(`<div style="font-size:.9rem;line-height:1.5;"></div>`);
 body.innerHTML = renderLiteMarkdownGlobal(feedback);
 box.appendChild(title);
 box.appendChild(body);
 feedbackSlot.appendChild(box);
 if (!LD().norskWriting) LD().norskWriting = {};
 if (!LD().norskWriting[level]) LD().norskWriting[level] = {};
 LD().norskWriting[level][mode] = (LD().norskWriting[level][mode] || 0) + 1;
 addXP(15, 'norskprove_ai_check');
 updateState();
 } catch (e) {
        console.error('[Norskprøve] Помилка AI-перевірки:', e);
 feedbackSlot.innerHTML = `<div class="card" style="border:2px solid var(--amber);"><p style="margin:0;">${t('ai_check_error')}</p></div>`;
 } finally {
 checkBtn.disabled = false;
 checkBtn.textContent = originalLabel;
 }
 };

 // Навігація
 const nav = el(`<div class="test-controls">
 <button class="btn btn-ghost btn-sm" id="norskPrev" ${index===0?'disabled':''}>${t('prev_btn')}</button>
 <button class="btn btn-primary btn-sm" id="norskNext" ${index>=total-1?'disabled':''}>${t('next_btn2')}</button>
 </div>`);
 nav.querySelector('#norskPrev').onclick = () => {
 SUBSTATE.norskTaskIndex = Math.max(0, index - 1);
 SUBSTATE.norskAnswers = {};
 navigate('norskprove', SUBSTATE);
 };
 nav.querySelector('#norskNext').onclick = () => {
 SUBSTATE.norskTaskIndex = Math.min(total - 1, index + 1);
 SUBSTATE.norskAnswers = {};
 navigate('norskprove', SUBSTATE);
 };
 wrap.appendChild(nav);

 } else if (mode === 'speaking') {
 // Усна частина
 const prompt = el(`<p style="color:var(--ink-soft);font-size:.95rem;margin-bottom:12px;">${escHtml(task.prompt)}</p>`);
 wrap.appendChild(prompt);

 const recordBtn = el(`<button class="btn btn-amber" style="margin-bottom:12px;">${t('start_recording_btn')}</button>`);
 recordBtn.onclick = () => {
 toast(t('recording_started_toast'));
 setTimeout(() => {
 toast(t('recording_done_toast'));
 if (!LD().norskSpeaking) LD().norskSpeaking = {};
 LD().norskSpeaking[level] = (LD().norskSpeaking[level] || 0) + 1;
 updateState();
 addXP(10, 'norskprove_speaking');
 }, 2000);
 };
 wrap.appendChild(recordBtn);

 // Навігація
 const nav = el(`<div class="test-controls">
 <button class="btn btn-ghost btn-sm" id="norskPrev" ${index===0?'disabled':''}>${t('prev_btn')}</button>
 <button class="btn btn-primary btn-sm" id="norskNext" ${index>=total-1?'disabled':''}>${t('next_btn2')}</button>
 </div>`);
 nav.querySelector('#norskPrev').onclick = () => {
 SUBSTATE.norskTaskIndex = Math.max(0, index - 1);
 SUBSTATE.norskAnswers = {};
 navigate('norskprove', SUBSTATE);
 };
 nav.querySelector('#norskNext').onclick = () => {
 SUBSTATE.norskTaskIndex = Math.min(total - 1, index + 1);
 SUBSTATE.norskAnswers = {};
 navigate('norskprove', SUBSTATE);
 };
 wrap.appendChild(nav);
 }

 return wrap;
}
// =====================================================================
// VIEW: ВИБІР МОВИ ВИВЧЕННЯ (окремий обов'язковий перший екран)
// =====================================================================
// Раніше мову вивчення можна було або взагалі не вибрати (тихо лишалась
// норвезька), або вибрати з обмеженого списку 6 мов, змішаного з кроком
// "мета навчання" в онбордингу. Тепер це окремий, самодостатній екран
// без нічого зайвого — лише вибір мови з усіх 30 — і саме з нього
// починається шлях нового користувача, ще ДО постановки мети й тесту на
// рівень. Той самий екран повторно використовується, коли людина хоче
// ПОМІНЯТИ мову навчання пізніше (з головної) — тоді SUBSTATE.switchMode
// = true, і після вибору повертаємо на головну, а не в онбординг.
function viewChooseLanguage() {
 const switchMode = !!SUBSTATE.switchMode;

 const wrap = el(`
 <div class="view" style="max-width:780px;margin:0 auto;">
 <div style="display:flex;justify-content:flex-end;gap:8px;margin-bottom:8px;">
 <div id="clUiLangRow" style="display:flex;gap:6px;"></div>
 </div>
 <div id="clTrollSlot" style="display:flex;justify-content:center;margin-bottom:16px;"></div>
 <h1 style="text-align:center;">${switchMode ? t('cl_switch_title') : t('cl_welcome_title')}</h1>
 <p style="text-align:center;color:var(--ink-soft);font-size:.95rem;margin-bottom:20px;">
 ${switchMode ? t('cl_switch_desc') : t('cl_welcome_desc')}
 </p>
 <div id="clGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;"></div>
 ${switchMode ? `<div style="text-align:center;margin-top:20px;"><button class="btn btn-ghost btn-sm" id="clCancelBtn">${t('cl_cancel_btn')}</button></div>` : ''}
 </div>
 `);

 const uiLangRow = wrap.querySelector('#clUiLangRow');
 [['uk', 'UK'], ['en', 'EN'], ['ru', 'RU']].forEach(([code, label]) => {
 const b = el(`<button class="chip ${STATE.uiLang === code ? 'active' : ''}" style="padding:4px 10px;font-size:.75rem;">${label}</button>`);
 b.onclick = () => setUiLang(code);
 uiLangRow.appendChild(b);
 });

 wrap.querySelector('#clTrollSlot').appendChild(renderTrollBubble('excited', 'greeting', 72));

 const grid = wrap.querySelector('#clGrid');
 LANGUAGES.forEach(l => {
 const isCurrent = switchMode && STATE.targetLang === l.code;
 const card = el(`
 <button class="cl-lang-card ${isCurrent ? 'active' : ''}" data-code="${l.code}">
 <span class="cl-lang-flag">${l.flag}</span>
 <span class="cl-lang-native">${l.native}</span>
 <span class="cl-lang-name">${l.name[STATE.uiLang] || l.name.uk}</span>
 </button>
 `);
 card.onclick = () => {
 STATE.targetLang = l.code;
 STATE._targetLangChosen = true;
 updateState();
 if (switchMode) {
 navigate('home');
 toast(tf('cl_switched_toast', { lang: l.name[STATE.uiLang] || l.name.uk }));
 } else {
 navigate('onboarding');
 }
 };
 grid.appendChild(card);
 });

 const cancelBtn = wrap.querySelector('#clCancelBtn');
 if (cancelBtn) cancelBtn.onclick = () => navigate('home');

 return wrap;
}

// =====================================================================
// VIEW: ОНБОРДИНГ (ВХІДНИЙ ТЕСТ + ВИБІР МЕТИ + ПЛАН)
// =====================================================================
function viewOnboarding() {
 if (!SUBSTATE.onbStep) SUBSTATE.onbStep = 1;
 if (!SUBSTATE.onbGoal) SUBSTATE.onbGoal = null;
 if (!SUBSTATE.onbLevel) SUBSTATE.onbLevel = null;

 const step = SUBSTATE.onbStep;
 const goal = SUBSTATE.onbGoal;
 const level = SUBSTATE.onbLevel || LD().level || 'A1';

 const currentLang = getLanguage(STATE.targetLang || 'no');
 const wrap = el(`
 <div class="view" style="max-width:700px;margin:0 auto;">
 <div id="onbTrollSlot" style="display:flex;justify-content:center;margin-bottom:20px;"></div>
 <h1 style="text-align:center;">${t('onb_welcome_title')}</h1>
 <p style="text-align:center;color:var(--ink-soft);font-size:.95rem;">
 ${t('onb_welcome_desc')}
 </p>
 <div class="card" style="margin-top:16px;">
 <div style="display:grid;gap:10px;">
 <div>
 <div style="font-size:.78rem;color:var(--ink-soft);margin-bottom:6px;">${t('interface_lang')}</div>
 <div id="onbUiLangRow" style="display:flex;gap:8px;flex-wrap:wrap;"></div>
 </div>
 <div>
 <div style="font-size:.78rem;color:var(--ink-soft);margin-bottom:6px;">${t('field_learn_lang')}</div>
 <button class="chip active" id="onbChangeLangBtn">${currentLang.flag} ${currentLang.native} · ${t('change_lang_link')}</button>
 </div>
 </div>
 </div>
 <div id="onbContent" style="margin-top:20px;"></div>
 <div style="text-align:center;margin-top:16px;color:var(--ink-soft);font-size:.8rem;">
 <span id="onbStepIndicator">${tf('onb_step_of', {step})}</span>
 </div>
 </div>
 `);

 // ---- Мова інтерфейсу (мова вивчення тепер обирається на окремому
 // екрані viewChooseLanguage — і саме він відкривається "звідусіль",
 // якщо тут захочуть її змінити, замість дубльованого міні-списку) ----
 const onbUiLangRow = wrap.querySelector('#onbUiLangRow');
 [['uk', 'UK'], ['en', 'EN'], ['ru', 'RU']].forEach(([code, label]) => {
 const b = el(`<button class="chip ${STATE.uiLang === code ? 'active' : ''}">${label}</button>`);
 b.onclick = () => setUiLang(code); // сама перемальовує екран через render()
 onbUiLangRow.appendChild(b);
 });
 wrap.querySelector('#onbChangeLangBtn').onclick = () => navigate('choose-language', { switchMode: true });

 wrap.querySelector('#onbTrollSlot').appendChild(renderTrollBubble('excited', 'greeting', 72));

 const container = wrap.querySelector('#onbContent');

 // ---- КРОК 1: ВИБІР МЕТИ ----
 if (step === 1) {
 container.innerHTML = `
 <div class="card">
 <h3>${t('onb_goal_title')}</h3>
 <p style="color:var(--ink-soft);font-size:.85rem;">${t('onb_goal_desc')}</p>
 <div style="display:grid;gap:10px;margin-top:14px;">
 ${GOALS.map(g => `
 <div class="goal-option" data-goal="${g.id}" style="padding:14px 18px;border:2px solid var(--line);border-radius:12px;cursor:pointer;transition:all .2s;">
 <strong>${localizedField(g, 'label')}</strong>
 <p style="color:var(--ink-soft);font-size:.8rem;margin:4px 0 0 0;">${localizedField(g, 'desc')}</p>
 </div>
 `).join('')}
 </div>
 </div>
 `;

 container.querySelectorAll('.goal-option').forEach(el => {
 el.onclick = () => {
 container.querySelectorAll('.goal-option').forEach(o => o.style.borderColor = 'var(--line)');
 el.style.borderColor = 'var(--teal)';
 el.style.background = 'rgba(47,168,155,0.05)';
 SUBSTATE.onbGoal = el.dataset.goal;
 const nextBtn = document.createElement('button');
 nextBtn.className = 'btn btn-primary btn-block';
 nextBtn.textContent = t('onb_continue_btn');
 nextBtn.style.marginTop = '16px';
 nextBtn.onclick = () => {
 if (SUBSTATE.onbGoal) {
 SUBSTATE.onbStep = 2;
 navigate('onboarding', SUBSTATE);
 }
 };
 const oldBtn = container.querySelector('.btn-block');
 if (oldBtn) oldBtn.remove();
 container.appendChild(nextBtn);
 };
 });
 wrap.querySelector('#onbStepIndicator').textContent = t('onb_step1_indicator');
 }

 // ---- КРОК 2: ВХІДНИЙ ТЕСТ ----
 else if (step === 2) {
 if (SUBSTATE.onbLevel) {
 SUBSTATE.onbStep = 3;
 navigate('onboarding', SUBSTATE);
 return wrap;
 }

 container.innerHTML = `
 <div class="card">
 <h3>${t('onb_test_title')}</h3>
 <p style="color:var(--ink-soft);font-size:.85rem;">
 ${tf('onb_test_desc', {lang: targetLangDisplayName(STATE.targetLang || 'no')})}
 </p>
 <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;">
 <button class="btn btn-primary" id="onbStartTest">${t('onb_start_test_btn')}</button>
 <button class="btn btn-ghost" id="onbSkipTest">${t('onb_pick_manual_btn')}</button>
 </div>
 <div id="onbTestContainer" style="margin-top:16px;"></div>
 <div id="onbManualLevel" style="margin-top:16px;display:none;">
 <p style="font-weight:600;margin-bottom:8px;">${t('onb_pick_level_title')}</p>
 <div style="display:flex;flex-wrap:wrap;gap:8px;">
 ${LEVELS.map(lv => `
 <button class="chip level-${lv}" data-lvl="${lv}">${lv}</button>
 `).join('')}
 </div>
 </div>
 </div>
 `;

 const manualDiv = container.querySelector('#onbManualLevel');
 container.querySelector('#onbSkipTest').onclick = () => {
 container.querySelector('#onbStartTest').style.display = 'none';
 container.querySelector('#onbSkipTest').style.display = 'none';
 manualDiv.style.display = 'block';
 };
 manualDiv.querySelectorAll('.chip').forEach(btn => {
 btn.onclick = () => {
 SUBSTATE.onbLevel = btn.dataset.lvl;
 LD().level = btn.dataset.lvl;
 LD().levelTestDone = true;
 updateState();
 SUBSTATE.onbStep = 3;
 navigate('onboarding', SUBSTATE);
 };
 });

 container.querySelector('#onbStartTest').onclick = () => {
 SUBSTATE.i = 0;
 SUBSTATE.answers = [];
 navigate('leveltest', SUBSTATE);
 };
 wrap.querySelector('#onbStepIndicator').textContent = t('onb_step2_indicator');
 }

 // ---- КРОК 3: ПЛАН НАВЧАННЯ ----
 else if (step === 3) {
 const finalLevel = SUBSTATE.onbLevel || LD().level || 'A1';
 const finalGoal = SUBSTATE.onbGoal || 'travel';
 const planText = getStudyPlan(finalLevel, finalGoal);

 container.innerHTML = `
 <div class="card">
 <h3>${t('onb_plan_title')}</h3>
 <div style="display:flex;gap:12px;flex-wrap:wrap;margin:12px 0;">
 <span class="tag level-${finalLevel}">${tf('onb_level_tag', {level: finalLevel})}</span>
 <span class="tag" style="background:var(--amber);color:var(--navy);">
 ${localizedField(GOALS.find(g => g.id === finalGoal), 'label') || t('onb_goal_chosen')}
 </span>
 </div>
 <div style="padding:14px;background:var(--cream);border-radius:10px;margin:10px 0;">
 <p style="font-size:.95rem;margin:0;">${planText}</p>
 </div>
 <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;">
 <button class="btn btn-primary" id="onbStartLearning">${t('onb_start_learning_btn')}</button>
 <button class="btn btn-ghost" id="onbChangeGoal">${t('onb_change_goal_btn')}</button>
 <button class="btn btn-ghost" id="onbChangeLevel">${t('onb_change_level_btn')}</button>
 </div>
 <p style="color:var(--ink-soft);font-size:.8rem;margin-top:12px;">
 ${t('onb_can_change_later')}
 </p>
 </div>
 `;

 container.querySelector('#onbStartLearning').onclick = () => {
 STATE._onboardingDone = true;
 updateState();
 navigate('home');
 toast(t('onb_welcome_toast'));
 };

 container.querySelector('#onbChangeGoal').onclick = () => {
 SUBSTATE.onbStep = 1;
 navigate('onboarding', SUBSTATE);
 };

 container.querySelector('#onbChangeLevel').onclick = () => {
 SUBSTATE.onbStep = 2;
 SUBSTATE.onbLevel = null;
 navigate('onboarding', SUBSTATE);
 };

 wrap.querySelector('#onbStepIndicator').textContent = t('onb_step3_indicator');
 }

 return wrap;
}

// =====================================================================
// ТУРНІРИ (гравецька частина)
// =====================================================================
// Раніше в адмін-панелі можна було СТВОРИТИ турнір, але жодного способу
// його зіграти чи побачити не існувало — ні пункту меню, ні екрана.
// Результати гравця пишемо в окремий документ
// tournaments/{id}/participants/{uid} (не в сам турнір) — так Firestore-
// правила можуть просто перевірити "це твій документ", без ризику для
// чужих результатів. Рахунок усе одно рахує клієнт (чесно попереджено і
// в firestore.rules, і в описі нижче) — прийнятно для навчального
// застосунку без реальних призів.

function tournamentLiveStatus(tr) {
 const now = Date.now();
 const start = tr.startTime ? new Date(tr.startTime).getTime() : null;
 const end = tr.endTime ? new Date(tr.endTime).getTime() : null;
 if (start && now < start) return 'upcoming';
 if (end && now > end) return 'ended';
 return 'active';
}

function viewTournaments() {
 const wrap = el(`
 <div class="view">
 <h1>${t('h_tournaments')}</h1>
 <div id="tournListContainer" class="grid" style="gap:12px;">
 <p style="color:var(--ink-soft);">…</p>
 </div>
 </div>
 `);

 async function load() {
 const container = wrap.querySelector('#tournListContainer');
 if (!container) return;
 try {
 const targetLang = STATE.targetLang || 'no';
 // Раніше показувались УСІ турніри поспіль, незалежно від мови,
 // яку вивчає користувач, — бо турніри самі по собі до нещодавна
 // взагалі не мали поля lang. Турніри, створені до цього фіксу,
 // не мають lang — трактуємо відсутнє поле як норвезьку (це й
 // була єдина мова, якою можна було їх створити раніше).
 const snap = await firebaseDb.collection('tournaments').orderBy('createdAt', 'desc').limit(50).get();
 const relevant = snap.docs.filter(doc => (doc.data().lang || 'no') === targetLang);
 if (relevant.length === 0) {
 container.innerHTML = `<p style="color:var(--ink-soft);">${t('tourn_no_tournaments')}</p>`;
 return;
 }
 container.innerHTML = '';
 const uid = firebaseAuth && firebaseAuth.currentUser ? firebaseAuth.currentUser.uid : null;
 for (const doc of relevant.slice(0, 20)) {
 const tr = { id: doc.id, ...doc.data() };
 const trLang = getLanguage(tr.lang || 'no');
 const status = tournamentLiveStatus(tr);
 const statusLabel = { upcoming: t('tourn_status_upcoming'), active: t('tourn_status_active'), ended: t('tourn_status_ended') }[status];
 let myResult = null;
 if (uid) {
 try {
 const pDoc = await firebaseDb.collection('tournaments').doc(tr.id).collection('participants').doc(uid).get();
 if (pDoc.exists) myResult = pDoc.data();
 } catch (e) { /* ігноруємо — просто не покажемо свій результат */ }
 }
 const card = el(`
 <div class="card">
 <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;">
 <div>
 <strong>${trLang.flag} ${escHtml(tr.name || '')}</strong>
 <span class="tag" style="margin-left:8px;">${statusLabel}</span>
 <span class="tag level-${tr.level||'A1'}" style="margin-left:4px;">${tr.level||'A1'}</span>
 ${tr.description ? `<p style="color:var(--ink-soft);font-size:.85rem;margin:6px 0 0 0;">${escHtml(tr.description)}</p>` : ''}
 <p style="color:var(--ink-soft);font-size:.78rem;margin:6px 0 0 0;">
 ${tf('tourn_questions_count', {n: (tr.questions||[]).length})}
 ${tr.startTime ? ' · ' + tf('tourn_starts_at', {date: new Date(tr.startTime).toLocaleString()}) : ''}
 ${tr.endTime ? ' · ' + tf('tourn_ends_at', {date: new Date(tr.endTime).toLocaleString()}) : ''}
 </p>
 ${myResult ? `<p style="color:var(--teal);font-size:.85rem;margin-top:6px;font-weight:600;">${tf('tourn_your_score', {score: myResult.correct, total: myResult.total})}</p>` : ''}
 </div>
 <button class="btn ${myResult ? 'btn-ghost' : 'btn-primary'} btn-sm" data-tid="${tr.id}" ${status==='upcoming'?'disabled':''}>
 ${myResult ? t('tourn_view_results_btn') : (status==='ended' ? t('tourn_view_results_btn') : t('tourn_join_btn'))}
 </button>
 </div>
 </div>
 `);
 const btn = card.querySelector('button[data-tid]');
 if (btn) btn.onclick = () => navigate('tournament-play', { tournamentId: tr.id });
 container.appendChild(card);
 }
 } catch (e) {
            console.error('[Турніри] Помилка завантаження списку:', e);
 container.innerHTML = `<p style="color:var(--rose);">${t('tourn_submit_error')}</p>`;
 }
 }
 load();

 return wrap;
}

function viewTournamentPlay() {
 const tournamentId = SUBSTATE.tournamentId;
 const wrap = el(`
 <div class="view" style="max-width:600px;margin:0 auto;">
 <div id="tournPlayContainer"><p style="color:var(--ink-soft);">…</p></div>
 </div>
 `);
 if (!tournamentId) {
 wrap.querySelector('#tournPlayContainer').innerHTML =
 `<div class="empty-state"><h3>${t('tourn_no_tournaments')}</h3><button class="btn btn-ghost" id="tpBack">${t('tourn_back_to_list')}</button></div>`;
 wrap.querySelector('#tpBack').onclick = () => navigate('tournaments');
 return wrap;
 }

 function renderLeaderboard(container, tournamentDoc, highlightUid) {
 firebaseDb.collection('tournaments').doc(tournamentDoc.id).collection('participants')
 .orderBy('score', 'desc').limit(50).get().then(snap => {
 if (snap.empty) {
 container.innerHTML = `<p style="color:var(--ink-soft);font-size:.85rem;">${t('tourn_no_participants')}</p>`;
 return;
 }
 let html = `<h3 style="margin-top:20px;">${t('tourn_leaderboard_title')}</h3><div class="leaderboard">`;
 let rank = 0;
 snap.forEach(doc => {
 rank++;
 const d = doc.data();
 const medal = rank === 1 ? '' : rank === 2 ? '' : rank === 3 ? '' : rank + '.';
 const isYou = doc.id === highlightUid;
 html += `<div class="leaderboard-row ${isYou?'you':''}"><span class="rank">${medal}</span><span class="name">${escHtml(d.name||'—')}${isYou?t('tourn_you_marker'):''}</span><span class="pts">${d.correct}/${d.total}</span></div>`;
 });
 html += '</div>';
 container.innerHTML = html;
            }).catch(e => console.error('[Турніри] Помилка завантаження таблиці результатів:', e));
 }

 async function init() {
 const container = wrap.querySelector('#tournPlayContainer');
 const uid = firebaseAuth && firebaseAuth.currentUser ? firebaseAuth.currentUser.uid : null;
 let trDoc;
 try {
 trDoc = await firebaseDb.collection('tournaments').doc(tournamentId).get();
 } catch (e) {
            console.error('[Турніри] Помилка завантаження турніру:', e);
 container.innerHTML = `<p style="color:var(--rose);">${t('tourn_submit_error')}</p>`;
 return;
 }
 if (!trDoc.exists) {
 container.innerHTML = `<div class="empty-state"><h3>${t('tourn_no_tournaments')}</h3></div>`;
 return;
 }
 const tr = { id: trDoc.id, ...trDoc.data() };
 const status = tournamentLiveStatus(tr);

 // Чи вже грав(-ла) цей користувач?
 let existing = null;
 if (uid) {
 try {
 const pDoc = await firebaseDb.collection('tournaments').doc(tr.id).collection('participants').doc(uid).get();
 if (pDoc.exists) existing = pDoc.data();
 } catch (e) { /* ігноруємо */ }
 }

 if (existing || status === 'ended') {
 // Показуємо результат (свій, якщо є) + таблицю результатів
 container.innerHTML = `
 <div class="card session-end">
 <h2>${escHtml(tr.name||'')}</h2>
 ${existing ? `<div class="bignum">${Math.round((existing.correct/existing.total)*100)}%</div>
 <p style="color:var(--ink-soft);">${tf('correct_of_total', {correct: existing.correct, total: existing.total})}</p>` :
 `<p style="color:var(--ink-soft);">${status==='ended' ? t('tourn_already_ended') : ''}</p>`}
 <button class="btn btn-ghost" id="tpBack" style="margin-top:12px;">${t('tourn_back_to_list')}</button>
 <div id="tpLeaderboard"></div>
 </div>
 `;
 container.querySelector('#tpBack').onclick = () => navigate('tournaments');
 renderLeaderboard(container.querySelector('#tpLeaderboard'), tr, uid);
 return;
 }

 if (status === 'upcoming') {
 container.innerHTML = `<div class="empty-state"><h3>${escHtml(tr.name||'')}</h3><p>${t('tourn_not_started')}</p><button class="btn btn-ghost" id="tpBack">${t('tourn_back_to_list')}</button></div>`;
 container.querySelector('#tpBack').onclick = () => navigate('tournaments');
 return;
 }

 // Гра: проходимо questions по черзі (той самий фіксований набір
 // для всіх учасників — чесно, ніхто не отримує легших питань).
 const questions = tr.questions || [];
 if (!questions.length) {
 container.innerHTML = `<div class="empty-state"><h3>${t('tourn_no_tournaments')}</h3></div>`;
 return;
 }
 SUBSTATE.tpIndex = SUBSTATE.tpIndex || 0;
 SUBSTATE.tpCorrect = SUBSTATE.tpCorrect || 0;
 SUBSTATE.tpAnswered = SUBSTATE.tpAnswered || false;

 function renderQuestion() {
 const q = questions[SUBSTATE.tpIndex];
 container.innerHTML = `
 <div class="qcounter">${escHtml(tr.name||'')} · ${SUBSTATE.tpIndex+1} / ${questions.length}</div>
 <div class="progress-track" style="margin-bottom:12px;"><div class="progress-fill" style="width:${((SUBSTATE.tpIndex+1)/questions.length)*100}%"></div></div>
 ${!uid ? `<p style="color:var(--ink-soft);font-size:.78rem;margin-bottom:10px;">${t('tourn_guest_not_saved')}</p>` : ''}
 <div class="question-text" style="font-size:1.1rem;margin-bottom:16px;">${escHtml(q.question)}</div>
 <div class="mc-options" id="tpOpts"></div>
 `;
 const opts = container.querySelector('#tpOpts');
 (q.options||[]).forEach((opt, idx) => {
 const b = el(`<button class="mc-opt" data-idx="${idx}">${escHtml(opt)}</button>`);
 b.onclick = () => {
 if (SUBSTATE.tpAnswered) return;
 SUBSTATE.tpAnswered = true;
 const correct = idx === q.correct;
 if (correct) SUBSTATE.tpCorrect++;
 opts.querySelectorAll('.mc-opt').forEach((btn2, idx2) => {
 if (idx2 === q.correct) btn2.classList.add('correct');
 else if (idx2 === idx) btn2.classList.add('wrong');
 });
 setTimeout(() => {
 SUBSTATE.tpAnswered = false;
 if (SUBSTATE.tpIndex < questions.length - 1) {
 SUBSTATE.tpIndex++;
 renderQuestion();
 } else {
 finish();
 }
 }, 700);
 };
 opts.appendChild(b);
 });
 }

 async function finish() {
 const total = questions.length;
 const correct = SUBSTATE.tpCorrect;
 container.innerHTML = `
 <div class="card session-end">
 <h2>${t('tourn_finish_title')}</h2>
 <div class="bignum">${Math.round((correct/total)*100)}%</div>
 <p style="color:var(--ink-soft);">${tf('tourn_finish_desc', {correct, total})}</p>
 <button class="btn btn-ghost" id="tpBack" style="margin-top:12px;">${t('tourn_back_to_list')}</button>
 <div id="tpLeaderboard"></div>
 </div>
 `;
 container.querySelector('#tpBack').onclick = () => navigate('tournaments');
 if (uid) {
 try {
 await firebaseDb.collection('tournaments').doc(tr.id).collection('participants').doc(uid).set({
 name: STATE.name || 'Гравець',
 score: correct, // для сортування таблиці (Firestore не вміє сортувати за "correct/total" напряму)
 correct,
 total,
 completedAt: firebase.firestore.FieldValue.serverTimestamp(),
 });
 addXP(50, 'tournament_participation');
 updateState();
 } catch (e) {
 // Найчастіша причина: правила Firestore (firestore.rules) не
 // опубліковані в Firebase Console або документ users/{uid}
 // ще не встиг створитись. Показуємо помилку явно, а не
 // ковтаємо її мовчки — інакше людина бачить "% результату"
 // на екрані, а сам результат ніде насправді не зберігся.
                    console.error('[Турніри] Не вдалося зберегти результат:', e);
 toast(t('tourn_submit_error'));
 }
 } else {
 // Гість (без входу в акаунт) не має власного uid, а правила
 // Firestore навмисно дозволяють писати результат лише в
 // документ із id === свій uid (щоб ніхто не міг підробити
 // чужий результат) — тож для гостя результат технічно
 // нікуди зберігати. Раніше про це просто мовчали: гість
 // проходив увесь турнір, бачив свій відсоток, а результат
 // безслідно зникав. Тепер попереджаємо одразу.
 toast(t('tourn_guest_not_saved'));
 }
 renderLeaderboard(container.querySelector('#tpLeaderboard'), tr, uid);
 SUBSTATE.tpIndex = 0; SUBSTATE.tpCorrect = 0; SUBSTATE.tpAnswered = false;
 }

 renderQuestion();
 }
 init();

 return wrap;
}
