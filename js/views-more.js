        // ---- PROFILE ----
        function viewProfile() {
            const wrap = el(`
            <div class="view">
              <h1>${t('h_profile')}</h1>
              <div class="grid cols-4" style="margin-bottom:16px;">
                <div class="card stat-box"><div class="num">${Object.keys(STATE.stats?.wordsSeen||{}).length}</div><div class="label">${t('stat_words_studied')}</div></div>
                <div class="card stat-box"><div class="num">${STATE.stats?.testsCompleted||0}</div><div class="label">${t('stat_tests')}</div></div>
                <div class="card stat-box"><div class="num">${STATE.streak||0}</div><div class="label">${t('stat_streak_days')}</div></div>
                <div class="card stat-box"><div class="num">${STATE.stats?.bestStreak||0}</div><div class="label">${t('stat_best_streak')}</div></div>
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
            const cal = wrap.querySelector('#calgrid');
            const dates = STATE.stats?.activityDates || [];
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
                [STATE.name || currentUser, STATE.leaderboardScore || 0]
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
  if (!SUBSTATE.norskLevel) SUBSTATE.norskLevel = STATE.level || "A1";
  if (!SUBSTATE.norskMode) SUBSTATE.norskMode = "reading";
  if (!SUBSTATE.norskTaskIndex) SUBSTATE.norskTaskIndex = 0;
  if (!SUBSTATE.norskAnswers) SUBSTATE.norskAnswers = {};

  const level = SUBSTATE.norskLevel;
  const mode = SUBSTATE.norskMode;
  const taskList = norskTasksFor(level, mode);
  const taskIndex = SUBSTATE.norskTaskIndex;
  const task = taskList[taskIndex] || null;

  const MODE_INFO_ALL = {
    uk: {
      reading: { label: "📖 Читання", official: "leseprøve", note: "Автоматично перевіряється комп'ютером — оцінка не залежить від сенсора." },
      listening: { label: "🎧 Аудіювання", official: "lytteprøve", note: "Автоматично перевіряється комп'ютером — оцінка не залежить від сенсора." },
      writing: { label: "✍️ Письмо", official: "skriveprøve", note: "Роботу перевіряють щонайменше два сенсори — досвідчені викладачі норвезької." },
      speaking: { label: "🗣️ Усна частина", official: "muntlig prøve", note: "Проходить очно: сенсор і екзаменатор, який ставить запитання." },
    },
    en: {
      reading: { label: "📖 Reading", official: "leseprøve", note: "Automatically graded by computer — the score doesn't depend on an examiner." },
      listening: { label: "🎧 Listening", official: "lytteprøve", note: "Automatically graded by computer — the score doesn't depend on an examiner." },
      writing: { label: "✍️ Writing", official: "skriveprøve", note: "Your work is graded by at least two examiners — experienced Norwegian teachers." },
      speaking: { label: "🗣️ Speaking", official: "muntlig prøve", note: "Taken in person: an examiner and a second assessor ask you questions." },
    },
    ru: {
      reading: { label: "📖 Чтение", official: "leseprøve", note: "Автоматически проверяется компьютером — оценка не зависит от экзаменатора." },
      listening: { label: "🎧 Аудирование", official: "lytteprøve", note: "Автоматически проверяется компьютером — оценка не зависит от экзаменатора." },
      writing: { label: "✍️ Письмо", official: "skriveprøve", note: "Работу проверяют минимум два экзаменатора — опытные преподаватели норвежского." },
      speaking: { label: "🗣️ Устная часть", official: "muntlig prøve", note: "Проходит очно: экзаменатор и ассессор задают вопросы." },
    },
  };
  const MODE_INFO = MODE_INFO_ALL[STATE.uiLang] || MODE_INFO_ALL.uk;

  const NORSK_INFO_TEXT = {
    uk: {
      intro: "Тренувальні завдання для підготовки до норвезького мовного іспиту (Norskprøve, HK-dir). Практикуйте читання, аудіювання, письмо та усне мовлення.",
      how_title: "ℹ️ Як влаштований справжній іспит",
      p1: "За офіційними даними HK-dir (Directoratet for høyere utdanning og kompetanse — організатора Norskprøve), іспит складається з чотирьох окремих частин: leseprøve (читання), lytteprøve (аудіювання), skriveprøve (письмо) та muntlig prøve (усна частина). Читання, аудіювання і письмо здаються за комп'ютером зазвичай в один день; усну частину приймають очно. Можна реєструватися на всі чотири частини або лише на окремі — і перескладати саме ту частину, де хочете покращити результат.",
      p2: "На письмову та усну частини реєструються на конкретний рівень — A1–A2, A2–B1 або B1–B2 (найважчий), а результат читання й аудіювання визначається автоматично під час самого тесту. Окремої програми чи підручника для іспиту немає: перевіряють практичне володіння мовою в буденних ситуаціях, тому найкраще готуватися, тренуючи усі чотири навички паралельно.",
    },
    en: {
      intro: "Practice tasks to prepare for the Norwegian language exam (Norskprøve, HK-dir). Practice reading, listening, writing, and speaking.",
      how_title: "ℹ️ How the real exam works",
      p1: "According to official HK-dir data (Directoratet for høyere utdanning og kompetanse — the organizer of Norskprøve), the exam consists of four separate parts: leseprøve (reading), lytteprøve (listening), skriveprøve (writing), and muntlig prøve (oral part). Reading, listening, and writing are taken on a computer, usually on the same day; the oral part is taken in person. You can register for all four parts or only specific ones — and retake just the part where you want to improve your result.",
      p2: "For the writing and oral parts, you register for a specific level — A1–A2, A2–B1, or B1–B2 (the hardest) — while the reading and listening result is determined automatically during the test itself. There is no separate curriculum or textbook for the exam: it tests practical language use in everyday situations, so it's best to prepare by practicing all four skills in parallel.",
    },
    ru: {
      intro: "Тренировочные задания для подготовки к норвежскому языковому экзамену (Norskprøve, HK-dir). Практикуйте чтение, аудирование, письмо и устную речь.",
      how_title: "ℹ️ Как устроен настоящий экзамен",
      p1: "По официальным данным HK-dir (Directoratet for høyere utdanning og kompetanse — организатора Norskprøve), экзамен состоит из четырёх отдельных частей: leseprøve (чтение), lytteprøve (аудирование), skriveprøve (письмо) и muntlig prøve (устная часть). Чтение, аудирование и письмо сдаются на компьютере, обычно в один день; устную часть принимают очно. Можно регистрироваться на все четыре части или только на отдельные — и пересдавать именно ту часть, где хотите улучшить результат.",
      p2: "На письменную и устную части регистрируются на конкретный уровень — A1–A2, A2–B1 или B1–B2 (самый сложный), а результат чтения и аудирования определяется автоматически во время самого теста. Отдельной программы или учебника для экзамена нет: проверяют практическое владение языком в повседневных ситуациях, поэтому лучше готовиться, тренируя все четыре навыка параллельно.",
    },
  }[STATE.uiLang] || {};

  const MODE_LABELS = {
    uk: { reading: "📖 Читання", listening: "🎧 Аудіювання", writing: "✍️ Письмо", speaking: "🗣️ Усна частина" },
    en: { reading: "📖 Reading", listening: "🎧 Listening", writing: "✍️ Writing", speaking: "🗣️ Speaking" },
    ru: { reading: "📖 Чтение", listening: "🎧 Аудирование", writing: "✍️ Письмо", speaking: "🗣️ Устная часть" },
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
        <p style="font-size:.8rem;color:var(--ink-soft);margin:0;">
          <strong>${MODE_INFO[mode].label}</strong> (${MODE_INFO[mode].official}): ${MODE_INFO[mode].note}
        </p>
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

  // AI-генерація нового завдання: додає його в STATE.customNorskTasks,
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
      const soundBtn = el(`<button class="soundbtn" style="margin-bottom:12px;">🔊 Lytt</button>`);
      soundBtn.onclick = () => speak(task.text);
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
        if (!STATE.norskWriting) STATE.norskWriting = {};
        if (!STATE.norskWriting[level]) STATE.norskWriting[level] = {};
        STATE.norskWriting[level][mode] = (STATE.norskWriting[level][mode] || 0) + 1;
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
        if (!STATE.norskWriting) STATE.norskWriting = {};
        if (!STATE.norskWriting[level]) STATE.norskWriting[level] = {};
        STATE.norskWriting[level][mode] = (STATE.norskWriting[level][mode] || 0) + 1;
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
        if (!STATE.norskSpeaking) STATE.norskSpeaking = {};
        STATE.norskSpeaking[level] = (STATE.norskSpeaking[level] || 0) + 1;
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
//  VIEW: ОНБОРДИНГ (ВХІДНИЙ ТЕСТ + ВИБІР МЕТИ + ПЛАН)
// =====================================================================
function viewOnboarding() {
    if (!SUBSTATE.onbStep) SUBSTATE.onbStep = 1;
    if (!SUBSTATE.onbGoal) SUBSTATE.onbGoal = null;
    if (!SUBSTATE.onbLevel) SUBSTATE.onbLevel = null;

    const step = SUBSTATE.onbStep;
    const goal = SUBSTATE.onbGoal;
    const level = SUBSTATE.onbLevel || STATE.level || 'A1';

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
                        <div id="onbTargetLangRow" style="display:flex;gap:8px;flex-wrap:wrap;"></div>
                    </div>
                </div>
            </div>
            <div id="onbContent" style="margin-top:20px;"></div>
            <div style="text-align:center;margin-top:16px;color:var(--ink-soft);font-size:.8rem;">
                <span id="onbStepIndicator">${tf('onb_step_of', {step})}</span>
            </div>
        </div>
    `);

    // ---- Мова інтерфейсу + мова вивчення (видно одразу, на всіх кроках) ----
    const onbUiLangRow = wrap.querySelector('#onbUiLangRow');
    [['uk', 'UK'], ['en', 'EN'], ['ru', 'RU']].forEach(([code, label]) => {
        const b = el(`<button class="chip ${STATE.uiLang === code ? 'active' : ''}">${label}</button>`);
        b.onclick = () => setUiLang(code); // сама перемальовує екран через render()
        onbUiLangRow.appendChild(b);
    });
    const onbTargetLangRow = wrap.querySelector('#onbTargetLangRow');
    ['no', 'en', 'de', 'es', 'fr', 'it'].forEach(code => {
        const l = getLanguage(code);
        const b = el(`<button class="chip ${STATE.targetLang === code ? 'active' : ''}">${l.flag} ${l.native}</button>`);
        b.onclick = () => {
            if (STATE.targetLang === code) return;
            STATE.targetLang = code;
            updateState();
            navigate('onboarding', SUBSTATE); // лишаємось на тому ж кроці, лише оновлюємо мову
        };
        onbTargetLangRow.appendChild(b);
    });
    const onbMoreLangsBtn = el(`<button class="chip">🌐…</button>`);
    onbMoreLangsBtn.title = t('onb_more_langs_title');
    onbTargetLangRow.appendChild(onbMoreLangsBtn);

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
                    ${t('onb_test_desc')}
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
                STATE.level = btn.dataset.lvl;
                STATE.levelTestDone = true;
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
        const finalLevel = SUBSTATE.onbLevel || STATE.level || 'A1';
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
