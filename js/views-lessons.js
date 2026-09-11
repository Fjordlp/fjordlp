// =====================================================================
//  СТОРІНКА: Список уроків
// =====================================================================
function viewLessons() {
    const lang = STATE.targetLang || 'no';
    const lessons = lessonsForLang(lang);

    const wrap = el(`
        <div class="view">
            <h1>${t('h_lessons')}</h1>
            <p style="color:var(--ink-soft);margin-bottom:16px;">${t('lessons_intro')}</p>
            <div id="lessonsList"></div>
        </div>
    `);
    const list = wrap.querySelector('#lessonsList');

    if (lessons.length === 0) {
        list.appendChild(el(`
            <div class="card" style="text-align:center;color:var(--ink-soft);">
                <p>${t('lessons_empty')}</p>
            </div>
        `));
        return wrap;
    }

    lessons.forEach(lesson => {
        const done = isLessonUnlocked(lesson.id, lang) && isLessonDone(lesson.id);
        const unlocked = isLessonUnlocked(lesson.id, lang);
        const title = lessonLocalized(lesson, 'title');
        const icon = done ? '✅' : (unlocked ? '📘' : '🔒');
        const card = el(`
            <div class="card lesson-card" style="margin-bottom:10px;display:flex;align-items:center;gap:14px;${unlocked ? 'cursor:pointer;' : 'opacity:.55;'}">
                <div style="font-size:1.6rem;flex:none;">${icon}</div>
                <div style="flex:1;">
                    <strong>${tf('lesson_n_label', {n: lesson.id})}: ${escHtml(title || '')}</strong>
                    ${lesson.level ? `<div style="margin-top:4px;"><span class="tag level-${lesson.level}">${lesson.level}</span></div>` : ''}
                </div>
            </div>
        `);
        if (unlocked) card.onclick = () => navigate('lesson-read', { lessonId: lesson.id });
        list.appendChild(card);
    });

    return wrap;
}

// =====================================================================
//  СТОРІНКА: Читання одного уроку + завдання
// =====================================================================
function viewLessonRead() {
    const lang = STATE.targetLang || 'no';
    const lessons = lessonsForLang(lang);
    const lessonId = SUBSTATE && SUBSTATE.lessonId;
    const lesson = lessons.find(l => l.id === lessonId);

    if (!lesson) {
        return el(`
            <div class="view"><div class="empty-state">
                <h3>${t('lessons_not_found')}</h3>
                <button class="btn" onclick="navigate('lessons')">${t('back_btn')}</button>
            </div></div>
        `);
    }
    if (!isLessonUnlocked(lesson.id, lang)) {
        return el(`
            <div class="view"><div class="empty-state">
                <h3>🔒 ${t('lessons_locked_title')}</h3>
                <p>${t('lessons_locked_desc')}</p>
                <button class="btn" onclick="navigate('lessons')">${t('back_btn')}</button>
            </div></div>
        `);
    }

    const title = lessonLocalized(lesson, 'title');
    const content = lessonLocalized(lesson, 'content');
    const alreadyDone = isLessonDone(lesson.id);
    const tasks = Array.isArray(lesson.tasks) ? lesson.tasks : [];

    const wrap = el(`
        <div class="view">
            <button class="btn btn-ghost btn-sm" onclick="navigate('lessons')" style="margin-bottom:12px;">← ${t('back_btn')}</button>
            <h1>${tf('lesson_n_label', {n: lesson.id})}: ${escHtml(title || '')}</h1>
            <div class="card" style="margin-bottom:16px;line-height:1.6;">${renderLessonBlocksHtml(parseLessonContent(content || ''))}</div>
            <div id="lessonTasks"></div>
            <div id="lessonDoneSlot" style="margin-top:16px;"></div>
        </div>
    `);

    const tasksEl = wrap.querySelector('#lessonTasks');
    const answered = new Array(tasks.length).fill(false);

    tasks.forEach((task, ti) => {
        const q = lessonTaskLocalized(task, 'q');
        const item = el(`
            <div class="card" style="margin-bottom:10px;">
                <p style="font-weight:600;margin-bottom:10px;">${ti + 1}. ${escHtml(q || '')}</p>
                <div class="mc-options"></div>
            </div>
        `);
        const opts = item.querySelector('.mc-options');
        (task.opts || []).forEach((opt, oi) => {
            const b = el(`<button class="mc-opt">${escHtml(opt)}</button>`);
            b.onclick = () => {
                opts.querySelectorAll('.mc-opt').forEach((o, i2) => {
                    o.disabled = true;
                    if (i2 === task.a) o.classList.add('correct');
                    else if (i2 === oi) o.classList.add('wrong');
                });
                answered[ti] = true;
                maybeShowDone();
            };
            opts.appendChild(b);
        });
        tasksEl.appendChild(item);
    });

    function maybeShowDone() {
        const doneSlot = wrap.querySelector('#lessonDoneSlot');
        if (alreadyDone) {
            doneSlot.innerHTML = `<p style="color:var(--ink-soft);">✅ ${t('lesson_already_done')}</p>`;
            return;
        }
        if (tasks.length === 0 || answered.every(Boolean)) {
            doneSlot.innerHTML = '';
            const btn = el(`<button class="btn btn-primary">${t('lesson_complete_btn')}</button>`);
            btn.onclick = () => {
                markLessonDone(lesson.id);
                toast(t('lesson_complete_toast'));
                navigate('lessons');
            };
            doneSlot.appendChild(btn);
        }
    }
    maybeShowDone(); // урок без завдань — кнопку "пройдено" показуємо одразу

    return wrap;
}

// =====================================================================
//  КОНСТРУКТОР РЕЧЕНЬ
// =====================================================================
function viewSentenceBuilder() {
    const lang = STATE.targetLang || 'no';
    const level = LD().level || 'A1';

    if (!SUBSTATE.sbReady) {
        ensureSentenceBuilderAvailable(lang, level);
        const already = STATE.generatedSentenceSets && STATE.generatedSentenceSets[lang] && STATE.generatedSentenceSets[lang][level];
        if (already && already.length) {
            SUBSTATE.sbReady = true;
            // Від найпростіших до найскладніших — так, як їх мав скласти адмін,
            // але про всяк випадок сортуємо явно за кількістю блоків.
            SUBSTATE.qs = [...already].sort((a, b) => (a.blocks || []).length - (b.blocks || []).length);
            SUBSTATE.i = 0;
            SUBSTATE.correct = 0;
            SUBSTATE.placed = [];
            SUBSTATE.shuffled = null;
        } else if (isSentenceBuilderLoading(lang, level)) {
            return el(`
                <div class="view onb-wrap" style="max-width:500px;margin:30px auto;text-align:center;">
                    <h1>${t('sb_title')}</h1>
                    <p style="color:var(--ink-soft);">${t('sb_loading')}</p>
                </div>
            `);
        } else {
            const wrap = el(`
                <div class="view onb-wrap" style="max-width:500px;margin:30px auto;text-align:center;">
                    <h1>${t('sb_title')}</h1>
                    <p style="color:var(--ink-soft);">${tf('sb_empty', {lang: targetLangDisplayName(lang), level})}</p>
                    <button class="btn btn-ghost" id="sbBack" style="margin-top:12px;">${t('to_tests_btn')}</button>
                </div>
            `);
            wrap.querySelector('#sbBack').onclick = () => navigate('tests');
            return wrap;
        }
    }

    const qs = SUBSTATE.qs;
    if (SUBSTATE.i >= qs.length) {
        LD().stats.testsCompleted = (LD().stats.testsCompleted || 0) + 1;
        LD().leaderboardScore = (LD().leaderboardScore || 0) + SUBSTATE.correct * 10;
        markActivityToday();
        if (typeof checkAchievements === 'function') checkAchievements();
        updateState();
        const pct = Math.round((SUBSTATE.correct / qs.length) * 100);
        const doneView = el(`
            <div class="view session-end card">
                <h2>${t('sb_title')}${t('quiz_finished_suffix')}</h2>
                <div class="bignum">${pct}%</div>
                <p style="color:var(--ink-soft)">${tf('correct_of_total', {correct: SUBSTATE.correct, total: qs.length})}</p>
                <button class="btn btn-ghost" id="hub">${t('to_tests_btn')}</button>
            </div>
        `);
        doneView.querySelector('#hub').onclick = () => navigate('tests');
        return doneView;
    }

    const q = qs[SUBSTATE.i];
    if (!SUBSTATE.shuffled) {
        // Перемішуємо, аж поки порядок реально відрізняється від
        // правильного (щоб на 2-блокових реченнях не траплялось "вгадав
        // одразу" через збіг перемішування з оригіналом).
        let attempt = shuffle(q.blocks.map((b, idx) => ({ b, idx })));
        if (q.blocks.length > 1) {
            let tries = 0;
            while (attempt.every((x, i) => x.idx === i) && tries < 8) {
                attempt = shuffle(q.blocks.map((b, idx) => ({ b, idx })));
                tries++;
            }
        }
        SUBSTATE.shuffled = attempt;
        SUBSTATE.placed = [];
        SUBSTATE.checked = false;
    }

    const wrap = el(`<div class="view" style="max-width:560px;margin:0 auto;text-align:center;"></div>`);
    wrap.appendChild(el(`<div class="qcounter">${t('sb_title')} · ${SUBSTATE.i+1} / ${qs.length}</div>`));
    wrap.appendChild(el(`<div class="progress-track" style="margin-bottom:18px;"><div class="progress-fill" style="width:${(SUBSTATE.i/qs.length)*100}%"></div></div>`));
    wrap.appendChild(el(`<p style="color:var(--ink-soft);font-size:.85rem;margin-bottom:6px;">${escHtml(q.uk)}</p>`));

    const answerStrip = el(`<div class="sb-answer-strip" style="min-height:52px;border:2px dashed var(--line);border-radius:12px;padding:10px;margin-bottom:16px;display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;"></div>`);
    const blocksPool = el(`<div class="sb-blocks-pool" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:16px;"></div>`);
    const feedback = el(`<div class="sb-feedback" style="min-height:24px;font-size:.9rem;margin-bottom:10px;"></div>`);
    const actions = el(`<div style="display:flex;gap:10px;justify-content:center;"></div>`);
    wrap.appendChild(answerStrip);
    wrap.appendChild(blocksPool);
    wrap.appendChild(feedback);
    wrap.appendChild(actions);

    function renderBoard() {
        answerStrip.innerHTML = '';
        SUBSTATE.placed.forEach(item => {
            const chip = el(`<button class="chip sb-chip-placed" style="background:var(--accent-soft);">${escHtml(item.b)}</button>`);
            if (!SUBSTATE.checked) {
                chip.onclick = () => {
                    SUBSTATE.placed = SUBSTATE.placed.filter(p => p !== item);
                    renderBoard();
                };
            }
            answerStrip.appendChild(chip);
        });
        if (SUBSTATE.placed.length === 0) {
            answerStrip.appendChild(el(`<span style="color:var(--ink-soft);font-size:.85rem;">${t('sb_tap_hint')}</span>`));
        }

        blocksPool.innerHTML = '';
        SUBSTATE.shuffled.forEach(item => {
            const used = SUBSTATE.placed.includes(item);
            const chip = el(`<button class="chip sb-chip" ${used ? 'style="visibility:hidden;"' : ''}>${escHtml(item.b)}</button>`);
            if (!used && !SUBSTATE.checked) {
                chip.onclick = () => {
                    SUBSTATE.placed.push(item);
                    renderBoard();
                };
            }
            blocksPool.appendChild(chip);
        });

        actions.innerHTML = '';
        if (!SUBSTATE.checked) {
            const checkBtn = el(`<button class="btn btn-primary" ${SUBSTATE.placed.length !== q.blocks.length ? 'disabled' : ''}>${t('sb_check_btn')}</button>`);
            checkBtn.onclick = () => {
                SUBSTATE.checked = true;
                const isCorrect = SUBSTATE.placed.every((item, idx) => item.idx === idx);
                if (isCorrect) SUBSTATE.correct++;
                feedback.innerHTML = isCorrect
                    ? `<span style="color:var(--mint-ink,#1a7a4c);">${t('sb_correct_label')}</span>`
                    : `<span style="color:var(--rose);">❌ ${t('sb_correct_was')}: <strong>${escHtml(q.no)}</strong></span>`;
                renderBoard();
            };
            actions.appendChild(checkBtn);
        } else {
            const nextBtn = el(`<button class="btn btn-primary">${t('next_btn')}</button>`);
            nextBtn.onclick = () => {
                SUBSTATE.i++;
                SUBSTATE.shuffled = null;
                navigate('sentence-builder', SUBSTATE);
            };
            actions.appendChild(nextBtn);
        }
    }
    renderBoard();

    return wrap;
}
