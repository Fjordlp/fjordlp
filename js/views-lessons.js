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
