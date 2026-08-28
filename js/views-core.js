// =====================================================================
//  VIEWS – повний набір сторінок
// =====================================================================

// Розмітка картки "Слово дня" — винесена в окрему функцію, бо
// використовується двічі: одразу при рендері (автоматичний вибір dw) і
// повторно, якщо адмін опублікував конкретне слово на сьогодні (тоді
// #dailyWordCardBody перемальовується цією ж функцією з іншим словом,
// без переходу на нову сторінку).
function dailyWordCardBody(w, level) {
    if (!w) return `<p>${t('no_words_for_level')}</p>`;
    return `
        <div class="dailyword">
            <button class="soundbtn" id="dwSound">🔊</button>
            <span id="dwMicSlot"></span>
            <div>
                <div class="word-no">${escHtml(w.no)}</div>
                <div class="word-uk">${escHtml(wordTranslation(w, level))}</div>
            </div>
        </div>
        <p style="color:var(--ink-soft);font-style:italic;margin-top:10px;font-size:.9rem;">${escHtml(w.ex_no||'')}<br><span style="font-style:normal;font-size:.8rem;">${escHtml(wordExampleTranslation(w, level))}</span></p>
    `;
}

function viewHome() {
    ensureStateDefaults(STATE);
    const level = LD().level || "A1";
    const meta = LEVEL_META[level];
    // Раніше слова для головної (прогрес + "Слово дня") підвантажувались
    // лише як побічний ефект відвідування Карток/Словника/Тестів — якщо
    // людина щойно обрала нову мову і одразу лишилась на головній, для неї
    // просто не було з чого взяти слово дня (порожній стан, хоча мова вже
    // обрана). Той самий "тихий" self-serve виклик, що й в інших розділах.
    ensureVocabAvailable(STATE.targetLang || 'no', level);
    const vocab = vocabForLevel(level) || [];
    const total = vocab.length;

    // ----- ЛОГІКА ПРОГРЕСУ -----
    const seenKeys = Object.keys(LD().stats.wordsSeen || {});
    const seenCount = vocab.filter(w => {
        const key = wordKey(Object.assign({ level }, w));
        return seenKeys.includes(key);
    }).length;
    const mastered = vocab.filter(w => {
        const s = getSrs(wordKey(Object.assign({ level }, w)));
        return s && s.reps >= 2;
    }).length;
    const pct = total ? Math.round((seenCount / total) * 100) : 0;
    // ----- КІНЕЦЬ ЛОГІКИ -----

    const dw = pickDailyWord();
    const { lvl: trollLvl, pct: trollPct } = xpProgress(LD().xp || 0);
    const metaLoc = levelMetaLocalized(level);
    const dg = getDailyGoal();
    const freezes = LD().streakFreezes || 0;
    const ringR = 26, ringC = 2 * Math.PI * ringR;
    const dgLang = STATE.uiLang || 'uk';
    const dgTexts = {
        uk: { title: '🎯 Щоденна ціль', done: 'Виконано! Сьогоднішня серія в безпеці. Приходьте завтра 🔥', progress: (c,t)=>`${c}/${t} — ще трохи, і серія за сьогодні в безпеці`, cont: 'Продовжити →', freezeTitle: 'Заморозки серії — рятують стрік, якщо пропустите день' },
        en: { title: '🎯 Daily goal', done: "Done! Today's streak is safe. Come back tomorrow 🔥", progress: (c,t)=>`${c}/${t} — a bit more and today's streak is safe`, cont: 'Continue →', freezeTitle: "Streak freezes — save your streak if you miss a day" },
        ru: { title: '🎯 Дневная цель', done: 'Готово! Сегодняшняя серия в безопасности. Приходите завтра 🔥', progress: (c,t)=>`${c}/${t} — ещё немного, и серия за сегодня в безопасности`, cont: 'Продолжить →', freezeTitle: 'Заморозки серии — спасают стрик, если пропустите день' },
    }[dgLang] || { title: '🎯 Щоденна ціль', done: 'Виконано! Сьогоднішня серія в безпеці. Приходьте завтра 🔥', progress: (c,t)=>`${c}/${t} — ще трохи, і серія за сьогодні в безпеці`, cont: 'Продовжити →', freezeTitle: 'Заморозки серії — рятують стрік, якщо пропустите день' };

    // ----- ВИБІР МОВИ (швидкий перемикач на головній) -----
    // Раніше тут був окремий, непов'язаний перемикач на полі
    // STATE.learningLang з onclick="..." прямо в HTML — CSP сайту
    // (без unsafe-inline) його тихо блокувала, тож кнопки не працювали,
    // і, навіть якби працювали, вони керували полем, яке ніде більше не
    // використовувалось. Тепер це той самий STATE.targetLang, що й у
    // Налаштуваннях, з робочими обробниками подій.
    // ----- ВИБІР МОВИ (посилання на окремий екран вибору мови) -----
    // Раніше тут одразу на головній був ряд чіпів із 6 мовами + кнопка
    // "більше" — цілий міні-перемикач просто серед іншого контенту
    // дашборду. Тепер вибір мови — окремий, самодостатній екран
    // (viewChooseLanguage), а тут лишається лише один компактний
    // рядок-посилання з поточною мовою: головне меню відображає саме ту
    // мову, яку вже вибрано, а не пропонує постійно перемикати її просто
    // серед іншого вмісту.
    const currentLang = getLanguage(STATE.targetLang || 'no');
    const langOptions = `
        <div style="display:flex;justify-content:center;margin:12px 0;">
            <button class="chip" id="homeChangeLangBtn">${currentLang.flag} ${currentLang.native} · ${t('change_lang_link')}</button>
        </div>
    `;

    const wrap = el(`
        <div class="view">
            <!-- daily goal -->
            <div class="card daily-goal-card" style="margin-bottom:18px;">
                <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
                    <svg width="64" height="64" viewBox="0 0 64 64" style="flex:none;">
                        <circle cx="32" cy="32" r="${ringR}" fill="none" stroke="var(--line-soft)" stroke-width="7"/>
                        <circle cx="32" cy="32" r="${ringR}" fill="none" stroke="${dg.done?'var(--teal)':'var(--amber)'}" stroke-width="7"
                            stroke-dasharray="${ringC}" stroke-dashoffset="${ringC * (1 - dg.pct/100)}"
                            stroke-linecap="round" transform="rotate(-90 32 32)"/>
                        <text x="32" y="37" text-anchor="middle" font-size="16" font-family="'JetBrains Mono',monospace" fill="var(--ink)">${dg.done?'✅':dg.pct+'%'}</text>
                    </svg>
                    <div style="flex:1;min-width:200px;">
                        <h3 style="margin:0 0 4px;">${dgTexts.title}</h3>
                        <p style="color:var(--ink-soft);font-size:.85rem;margin:0;">
                            ${dg.done ? dgTexts.done : dgTexts.progress(dg.count, dg.target)}
                        </p>
                    </div>
                    ${!dg.done ? `<button class="btn btn-primary btn-sm" data-r="flashcards">${dgTexts.cont}</button>` : ''}
                    ${freezes > 0 ? `<span class="tag" style="background:rgba(139,199,224,.18);color:#4A90A4;" title="${dgTexts.freezeTitle}">🧊 ×${freezes}</span>` : ''}
                </div>
            </div>

            <!-- тролль + рекомендація -->
            <div class="card" style="margin-bottom:18px;">
                <div id="trollGreetSlot"></div>
                ${(() => {
                    const rec = getLevelRecommendation();
                    if (!rec) return '';
                    return `
                        <div class="card" style="border:2px solid var(--amber);background:rgba(232,163,61,0.08);margin-top:12px;">
                            <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                                <span style="font-size:1.8rem;">🚀</span>
                                <div style="flex:1;">
                                    <strong>${tf('rec_mastered_title', {level: rec.current, pct: rec.pct})}</strong>
                                    <p style="font-size:.9rem;color:var(--ink-soft);margin:4px 0 0 0;">
                                        ${tf('rec_mastered_desc', {mastered: rec.mastered, total: rec.total, rec: `<strong>${rec.recommended}</strong>`})}
                                    </p>
                                </div>
                                <div style="display:flex;gap:8px;">
                                    <button class="btn btn-primary btn-sm" id="upgradeLevelBtn">${t('upgrade_level_btn')}</button>
                                    <button class="btn btn-ghost btn-sm" id="dismissRecBtn">${t('hide_btn')}</button>
                                </div>
                            </div>
                        </div>
                    `;
                })()}
            </div>

            <!-- hero -->
            <div class="hero">
                <div class="sunarc-wrap">${sunArcSvg(pct)}</div>
                <div class="eyebrow">${t('greeting_hi')}, ${escHtml(STATE.name || t('student_word'))} · ${t('level_word')} <span class="tag level-${level}" style="vertical-align:middle;">${level}</span></div>
                <h1>${metaLoc.name}: ${pct}% ${t('words_viewed')}</h1>
                <p>${metaLoc.desc}</p>
                <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center;">
                    <div class="progress-track" style="flex:1;max-width:400px;background:rgba(255,255,255,.15);">
                        <div class="progress-fill" style="width:${pct}%"></div>
                    </div>
                    <span style="font-family:'JetBrains Mono',monospace;font-size:.85rem;color:var(--amber);">
                        ${tf('viewed_mastered_label', {seen: seenCount, total, mastered})}
                    </span>
                </div>
                <div class="homepick">
                    <button class="btn" data-r="flashcards">${t('home_learn_words_btn')}</button>
                    <button class="btn" data-r="vocabulary">${t('home_vocab_btn')}</button>
                    <button class="btn" data-r="grammar">${t('home_grammar_btn')}</button>
                    <button class="btn" data-r="tests">${t('home_tests_btn')}</button>
                    <button class="btn" data-r="test-listen">${t('home_listen_btn')}</button>
                    <button class="btn" data-r="troll">${tf('home_troll_btn', {lvl: trollLvl})}</button>
                    ${(STATE.targetLang || 'no') === 'no' ? `<button class="btn" data-r="norskprove">🎓 ${examSectionNavLabel()}</button>` : ''}
                </div>
            </div>

            <!-- ВИБІР МОВИ -->
            ${langOptions}

            <!-- слово дня + активність -->
            <div class="grid cols-2">
                <div class="card">
                    <h3>${t('daily_word_title')}</h3>
                    <div id="dailyWordCardBody">${dailyWordCardBody(dw, level)}</div>
                </div>
                <div class="card">
                    <h3>${t('activity_title')}</h3>
                    <p style="color:var(--ink-soft);font-size:.85rem;">${t('streak_days_label')} <b class="mono">${LD().streak||0} 🔥</b> · XP: <b class="mono">${LD().xp||0}</b></p>
                    ${renderWeekStrip()}
                    <div class="xp-bar-track" style="margin-top:10px;"><div class="xp-bar-fill" style="width:${trollPct}%"></div></div>
                    <button class="btn btn-ghost btn-sm" style="margin-top:12px;" data-r="profile">${t('detailed_stats_btn')}</button>
                </div>
            </div>

            <!-- рівень -->
            <div class="card" style="margin-top:16px;">
                <h3>${tf('level_colon', {level})}</h3>
                <p style="color:var(--ink-soft);font-size:.85rem;">${t('change_level_question')}</p>
                <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
                    <button class="btn btn-ghost btn-sm" data-r="levels">${t('pick_level_manually_btn')}</button>
                    <button class="btn btn-ghost btn-sm" id="retest">${t('retest_btn')}</button>
                </div>
            </div>

            <!-- Завдання дня -->
            <div id="dailyTaskContainer" style="margin-top:16px;"></div>
        </div>
    `);

    // "🧌 Хроніки Тролля" — тизер на головній, той самий принцип, що й
    // "🩹 Складні слова" нижче: нагадує повернутись саме туди, де людина
    // зупинилась, замість того, щоб пригода існувала лише як пункт
    // навбару, про який легко забути.
    const storyState = ensureStoryState();
    const storyTeaser = el(
        storyState.history.length === 0 ? `
            <div class="card" style="margin-top:16px;border:2px solid var(--teal);">
                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:1.6rem;"></span>
                    <div style="flex:1;min-width:180px;">
                        <strong>${t('home_story_new_title')}</strong>
                        <p style="color:var(--ink-soft);font-size:.85rem;margin:2px 0 0;">${t('home_story_new_desc')}</p>
                    </div>
                    <button class="btn btn-primary btn-sm" id="homeStoryBtn">${t('story_start_btn')}</button>
                </div>
            </div>
        ` : `
            <div class="card" style="margin-top:16px;border:2px solid var(--teal);">
                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:1.6rem;"></span>
                    <div style="flex:1;min-width:180px;">
                        <strong>${t('home_story_continue_title')}</strong>
                        <p style="color:var(--ink-soft);font-size:.85rem;margin:2px 0 0;">${tf('home_story_continue_desc', {n: storyState.history.length})}</p>
                    </div>
                    <button class="btn btn-primary btn-sm" id="homeStoryBtn">${t('story_continue_btn')}</button>
                </div>
            </div>
        `
    );
    storyTeaser.querySelector('#homeStoryBtn').onclick = () => navigate('story');
    wrap.appendChild(storyTeaser);

    // "🩹 Складні слова" — теж показуємо на головній, якщо такі є, щоб
    // людина не забувала повертатись і закріплювати саме те, що не йде.
    const leechWords = collectLeechWords(STATE.targetLang || 'no');
    if (leechWords.length > 0) {
        const leechTeaser = el(`
            <div class="card" style="margin-top:16px;border:2px solid var(--rose);">
                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:1.6rem;">🩹</span>
                    <div style="flex:1;min-width:180px;">
                        <strong>${t('leech_deck_label')}</strong>
                        <p style="color:var(--ink-soft);font-size:.85rem;margin:2px 0 0;">${tf('leech_deck_count', {n: leechWords.length})}</p>
                    </div>
                    <button class="btn btn-danger btn-sm" id="homeLeechBtn">${t('start_btn')}</button>
                </div>
            </div>
        `);
        leechTeaser.querySelector('#homeLeechBtn').onclick = () => {
            navigate('flashsession', { level, topic: '__ALL__', mode: 'flip', deckWords: leechWords, allMode: true, lang: STATE.targetLang || 'no', leechMode: true });
        };
        wrap.appendChild(leechTeaser);
    }

    // ---- Обробники ----
    wrap.querySelector('#trollGreetSlot').appendChild(renderTrollBubble('idle', 'greeting', 64));
    wrap.querySelectorAll('[data-r]').forEach(b => b.onclick = () => navigate(b.dataset.r));
    const changeLangBtn = wrap.querySelector('#homeChangeLangBtn');
    if (changeLangBtn) changeLangBtn.onclick = () => navigate('choose-language', { switchMode: true });
    // Прив'язка кнопки озвучення винесена в окрему функцію, бо картку
    // "Слово дня" може бути перемальовано вдруге (див. loadDailyWordOverride
    // нижче), і тоді #dwSound — вже новий DOM-елемент, який треба
    // прив'язати заново.
    function wireDailyWordSound(word) {
        const snd = wrap.querySelector('#dwSound');
        if (snd && word) snd.onclick = () => speak(word.no, STATE.targetLang);
        const micSlot = wrap.querySelector('#dwMicSlot');
        if (micSlot && word) {
            micSlot.innerHTML = '';
            const mic = renderMicButton(word.no, STATE.targetLang);
            if (mic) micSlot.appendChild(mic);
        }
    }
    wireDailyWordSound(dw);
    const rt = wrap.querySelector('#retest');
    if (rt) rt.onclick = () => navigate('leveltest');
    const upgradeBtn = wrap.querySelector('#upgradeLevelBtn');
    if (upgradeBtn) {
        upgradeBtn.onclick = () => {
            const rec = getLevelRecommendation();
            if (rec) {
                LD().level = rec.recommended;
                LD().levelTestDone = true;
                updateState();
                toast(tf('level_up_toast', {level: rec.recommended}));
                navigate('home');
            }
        };
    }
    const dismissBtn = wrap.querySelector('#dismissRecBtn');
    if (dismissBtn) {
        dismissBtn.onclick = () => {
            STATE._dismissedRec = true;
            updateState();
            navigate('home');
        };
    }

    // ---- Завантаження завдання дня ----
    async function loadDailyTask() {
        const container = wrap.querySelector('#dailyTaskContainer');
        if (!container) return;
        try {
            const today = new Date().toISOString().slice(0, 10);
            const lang = STATE.targetLang || 'no';
            // Раніше завдання зберігалось під id === today (одне на весь
            // сайт) — людина, що вчить англійську, бачила те саме (як
            // правило, норвезьке) завдання, що й та, яка вчить норвезьку.
            // Тепер шукаємо саме за мовою користувача; якщо для неї на
            // сьогодні ще нічого не опубліковано — картка просто не
            // з'являється (замість показу чужомовного завдання).
            let doc = await firebaseDb.collection('daily_tasks').doc(`${lang}_${today}`).get();
            if (!doc.exists) {
                // Фолбек на старі записи без мови (створені до цього фіксу) —
                // лише для норвезької, щоб не "зникали" вже опубліковані раніше.
                if (lang === 'no') doc = await firebaseDb.collection('daily_tasks').doc(today).get();
                if (!doc.exists) { container.innerHTML = ''; return; }
            }
            const task = { id: doc.id, ...doc.data() };
            const html = `
                <div class="card" style="border:2px solid var(--amber);">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                        <h3 style="margin:0;">${t('daily_task_title')}</h3>
                        <span class="tag level-${task.level || 'A1'}">${task.level || 'A1'}</span>
                    </div>
                    <p style="font-size:1.05rem;margin-bottom:12px;">${escHtml(task.question)}</p>
                    <div class="mc-options" style="max-width:100%;">
                        ${task.options.map((opt, idx) => `
                            <button class="mc-opt" data-idx="${idx}" data-taskid="${task.id}">${escHtml(opt)}</button>
                        `).join('')}
                    </div>
                    <div id="dailyFeedback" style="margin-top:10px;"></div>
                    <div id="dailyResult" style="margin-top:8px;font-size:.9rem;color:var(--ink-soft);"></div>
                </div>
            `;
            container.innerHTML = html;
            const opts = container.querySelectorAll('.mc-opt');
            const correct = task.correct;
            opts.forEach(btn => {
                btn.addEventListener('click', function() {
                    const selected = parseInt(this.dataset.idx);
                    checkDailyTask(selected, correct, task.id, container);
                });
            });
        } catch(e) {
            console.error('Помилка завантаження завдання дня:', e);
            container.innerHTML = '';
        }
    }
    loadDailyTask();

    // ---- Перевірка, чи адмін опублікував конкретне "Слово дня" ----
    // dw (обраний автоматично) уже показаний у розмітці вище — це дає
    // миттєвий, невблокований рендер. Якщо для сьогодні й поточної мови
    // є адмінська публікація в daily_words, підміняємо вміст картки на
    // неї (як і loadDailyTask, "тихо", без переходу на нову сторінку).
    async function loadDailyWordOverride() {
        const body = wrap.querySelector('#dailyWordCardBody');
        if (!body || !firebaseReady || !firebaseDb) return;
        try {
            const today = new Date().toISOString().slice(0, 10);
            const lang = STATE.targetLang || 'no';
            const doc = await firebaseDb.collection('daily_words').doc(`${lang}_${today}`).get();
            if (!doc.exists) return; // нічого не опубліковано — лишаємо автоматичний вибір
            const override = doc.data();
            body.innerHTML = dailyWordCardBody(override, level);
            wireDailyWordSound(override);
        } catch (e) {
            console.error('Помилка завантаження слова дня:', e);
            // мовчки лишаємо автоматичний вибір, який уже показаний
        }
    }
    loadDailyWordOverride();

    return wrap;
}

// =====================================================================
//  ДОПОМІЖНІ ФУНКЦІЇ
// =====================================================================

function pickDailyWord() {
    const pool = allVocabUpTo(LD().level || "A1", STATE.targetLang);
    if (pool.length === 0) return null;
    const dayIndex = Math.floor(Date.now() / 86400000);
    return pool[dayIndex % pool.length];
}

function sunArcSvg(pct) {
    const angle = Math.PI * (1 - pct / 100);
    const x = 140 + 110 * Math.cos(angle);
    const y = 140 - 110 * Math.sin(angle);
    return `<svg viewBox="0 0 280 160" width="280" height="160">
            <path d="M30 140 A110 110 0 0 1 250 140" stroke="rgba(255,255,255,.18)" stroke-width="3" fill="none"/>
            <path d="M30 140 A110 110 0 0 1 250 140" stroke="#E8A33D" stroke-width="3" fill="none" stroke-dasharray="345" stroke-dashoffset="${345*(1-pct/100)}"/>
            <circle cx="${x}" cy="${y}" r="10" fill="#2FA89B"/>
          </svg>`;
}

function renderWeekStrip() {
    const dates = LD().stats?.activityDates || [];
    const set = new Set(dates);
    let html = '<div class="calendar-strip">';
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const ds = todayStr(d);
        const label = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'][d.getDay()];
        html += `<div class="day ${set.has(ds)?'active':''} ${i===0?'today':''}">${label}</div>`;
    }
    html += '</div>';
    return html;
}

function getLangName(code) {
    const map = { 
        no: '🇳🇴 Norsk', 
        it: '🇮🇹 Italiano', 
        en: '🇬🇧 English', 
        fr: '🇫🇷 Français', 
        de: '🇩🇪 Deutsch', 
        es: '🇪🇸 Español' 
    };
    return map[code] || code;
}

window.checkDailyTask = function(selected, correct, taskId, container) {
    const options = container.querySelectorAll('.mc-opt');
    const feedback = container.querySelector('#dailyFeedback');
    const result = container.querySelector('#dailyResult');
    options.forEach(btn => btn.disabled = true);
    if (selected === correct) {
        options.forEach((btn, idx) => { if (idx === correct) btn.classList.add('correct'); });
        feedback.innerHTML = `<div class="feedback-banner ok">${t('daily_correct_banner')}</div>`;
        addXP(20, 'daily_task');
        const today = new Date().toISOString().slice(0, 10);
        if (!STATE.dailyTasksCompleted) STATE.dailyTasksCompleted = {};
        if (!STATE.dailyTasksCompleted[today]) {
            STATE.dailyTasksCompleted[today] = true;
            updateState();
            checkAchievements({ dailyTaskCompleted: true });
        }
        result.textContent = t('daily_xp_toast');
    } else {
        options.forEach((btn, idx) => {
            if (idx === correct) btn.classList.add('correct');
            if (idx === selected) btn.classList.add('wrong');
        });
        feedback.innerHTML = `<div class="feedback-banner bad">${tf('daily_wrong_banner', {answer: options[correct].textContent})}</div>`;
        result.textContent = t('daily_try_tomorrow');
    }
};

// =====================================================================
//  LEVELS & LEVEL TEST
// =====================================================================

function viewLevels() {
    const wrap = el(
        `<div class="view"><h1>${t('h_pick_level')}</h1><p style="color:var(--ink-soft);margin-bottom:16px;">${t('level_change_note')}</p><div class="grid cols-3" id="lvlgrid"></div></div>`
    );
    const grid = wrap.querySelector('#lvlgrid');
    LEVELS.forEach(lv => {
        const meta = levelMetaLocalized(lv);
        const card = el(`
            <div class="card level-card ${LD().level===lv?'current':''}">
                <span class="tag level-${lv}">${lv}</span>
                <h3 style="margin-top:8px;">${meta.name}</h3>
                <div class="lname">${meta.desc}</div>
                <div class="level-topics">${LEVEL_META[lv].topics.map(top=>`<span>${top}</span>`).join('')}</div>
            </div>
        `);
        card.onclick = () => {
            LD().level = lv;
            LD().levelTestDone = true;
            markActivityToday();
            updateState();
            toast(tf('level_set_toast', {level: lv}));
            navigate('home');
        };
        grid.appendChild(card);
    });
    return wrap;
}

// Раніше вхідний тест на рівень для БУДЬ-ЯКОЇ мови навчання показував
// один і той самий вбудований LEVEL_TEST — а це набір питань про
// НОРВЕЗЬКІ слова. Людина, що вчить іспанську чи японську, отримувала
// тест про норвезьку. Для норвезької (STATE.targetLang === 'no')
// лишаємо цей вручну складений тест (найкраща якість, включно з
// граматикою). Для решти мов питання тепер генеруються "на льоту" з
// реального словника обраної мови (той самий пул слів, що й у
// картках/тестах: currentLevelWords()/vocabForLevel()) — той самий
// принцип перекладних питань, що й у viewTestMC().
async function buildDynamicLevelTest(lang) {
    // Крок 1: спершу ДЕШЕВО перевіряємо спільний словник (просте читання з
    // Firestore, без AI) для всіх рівнів одразу — паралельно, це швидко і
    // ліміту запитів до Worker'а не займає.
    await Promise.all(LEVELS.map(level =>
        ensureSharedVocabLoaded(lang, level).catch(e =>
            console.error('[Тест на рівень] Спільний словник недоступний для', lang, level, e))
    ));
    // Крок 2: лише рівні, для яких спільного словника не знайшлось,
    // довантажуємо через AI-генерацію (ensureVocabAvailable) — ПОСЛІДОВНО,
    // а не паралельно. Кожен такий рівень сам по собі шле 2 запити до
    // Worker'а; якщо запускати всі 6 рівнів одночасно (як було раніше), це
    // до 12 запитів за одну мить — і Worker миттєво впирався у ліміт
    // запитів/хв (RATE_LIMIT_PER_MIN), через що генерація слів мовчки
    // провалювалась, і мова лишалась без жодного слова для тесту.
    for (const level of LEVELS) {
        const already = STATE.generatedVocab[lang] && STATE.generatedVocab[lang][level];
        if (already && already.length) continue;
        await ensureVocabAvailable(lang, level).catch(e =>
            console.error('[Тест на рівень] Не вдалося підготувати словник для', lang, level, e));
    }
    const groups = [];
    for (const level of LEVELS) {
        const words = vocabForLevel(level, lang);
        if (!words || words.length < 4) continue; // замало слів для рівня — пропускаємо, а не показуємо порожні/непарні питання
        const pool = shuffle(words).slice(0, 5);
        pool.forEach(w => {
            const correct = wordTranslation(w, level, STATE.vocabLang);
            const distractors = shuffle(words.filter(x => x.no !== w.no)).slice(0, 2).map(x => wordTranslation(x, level, STATE.vocabLang));
            if (distractors.length < 2 || !correct) return;
            const opts = shuffle([correct, ...distractors]);
            groups.push({ lvl: level, q: `${t('how_translate')} «${w.no}»?`, opts, a: opts.indexOf(correct) });
        });
    }
    return groups;
}

function viewLevelTest() {
    const lang = STATE.targetLang || 'no';
    const langFile = window.LANG_DATA && window.LANG_DATA[lang];
    const hasBuiltinTest = !!(langFile && langFile.LEVEL_TEST && langFile.LEVEL_TEST.length);

    if (!hasBuiltinTest) {
        // Питання ще не готові — запускаємо (один раз) асинхронну
        // побудову й показуємо заглушку, доки вона не завершиться.
        if (!SUBSTATE.testQuestions && !SUBSTATE.testLoading) {
            SUBSTATE.testLoading = true;
            buildDynamicLevelTest(lang).then(qs => {
                SUBSTATE.testQuestions = qs;
                SUBSTATE.testLoading = false;
                if (ROUTE === 'leveltest') render();
            }).catch(e => {
                console.error('[Тест на рівень] Помилка побудови тесту:', e);
                SUBSTATE.testQuestions = [];
                SUBSTATE.testLoading = false;
                if (ROUTE === 'leveltest') render();
            });
        }
        if (SUBSTATE.testLoading || !SUBSTATE.testQuestions) {
            return el(`
                <div class="view onb-wrap" style="max-width:500px;margin:30px auto;text-align:center;">
                    <h1>${t('onb_test_title')}</h1>
                    <p style="color:var(--ink-soft);">${t('level_test_preparing')}</p>
                </div>
            `);
        }
        if (SUBSTATE.testQuestions.length === 0) {
            const wrap = el(`
                <div class="view onb-wrap" style="max-width:500px;margin:30px auto;text-align:center;">
                    <h1>${t('onb_test_title')}</h1>
                    <p style="color:var(--ink-soft);">${t('level_test_no_words')}</p>
                    <button class="btn btn-primary" id="goLevels" style="margin-top:12px;">${t('pick_level_manually_btn')}</button>
                </div>
            `);
            wrap.querySelector('#goLevels').onclick = () => navigate('levels');
            return wrap;
        }
    }

    const questions = hasBuiltinTest ? langFile.LEVEL_TEST : SUBSTATE.testQuestions;

    if (!SUBSTATE.i) { SUBSTATE.i = 0; SUBSTATE.answers = []; }
    const i = SUBSTATE.i;
    if (i >= questions.length) {
        const level = computeTestLevel(SUBSTATE.answers, questions);
        LD().level = level;
        LD().levelTestDone = true;
        markActivityToday();
        checkAchievements();
        updateState();
        const resultView = el(`
            <div class="view onb-wrap" style="max-width:500px;margin:30px auto;text-align:center;">
                <h1>${t('h_your_level')}</h1>
                <div class="tag level-${level}" style="font-size:1rem;padding:6px 18px;margin:12px 0;">${level}</div>
                <p style="color:var(--ink-soft)">${LEVEL_META[level].desc}</p>
                <div style="display:flex;justify-content:center;margin:16px 0;"></div>
                <button class="btn btn-primary" id="goHome">${t('start_learning_btn')}</button>
            </div>
        `);
        const trollSlot = resultView.querySelector('div[style*="justify-content:center"]');
        trollSlot.appendChild(renderTrollBubble('excited', 'levelUp', 64));
        resultView.querySelector('#goHome').onclick = () => navigate('home');
        return resultView;
    }
    // Для норвезької в LEVEL_TEST є ручні переклади питання/варіантів
    // (q_en/opts_en, q_ru/opts_ru) — раніше вони взагалі не
    // застосовувались, і тест завжди показувався українською незалежно
    // від мови інтерфейсу. Для згенерованих (не норвезьких) питань
    // текст уже будується мовою інтерфейсу на етапі генерації, тож
    // localizedField тут просто поверне q.q/q.opts як є.
    const q = hasBuiltinTest ? {
        ...questions[i],
        q: localizedField(questions[i], 'q'),
        opts: (STATE.uiLang !== 'uk' && questions[i]['opts_' + STATE.uiLang]) || questions[i].opts,
    } : questions[i];
    const wrap = el(`
        <div class="view" style="max-width:500px;margin:20px auto;text-align:center;">
            <div class="qcounter">${t('question_word')} ${i+1} ${t('of_word')} ${questions.length}</div>
            <div class="progress-track" style="margin-bottom:18px;"><div class="progress-fill" style="width:${(i/questions.length)*100}%"></div></div>
            <div class="question-text" style="font-size:1.15rem;font-family:'Fraunces',serif;margin-bottom:18px;">${escHtml(q.q)}</div>
            <div class="mc-options" style="margin:0 auto;"></div>
        </div>
    `);
    const opts = wrap.querySelector('.mc-options');
    q.opts.forEach((opt, idx) => {
        const b = el(`<button class="mc-opt">${escHtml(opt)}</button>`);
        b.onclick = () => {
            SUBSTATE.answers.push(idx === q.a);
            SUBSTATE.i++;
            navigate('leveltest', SUBSTATE);
        };
        opts.appendChild(b);
    });
    return wrap;
}

// =====================================================================
//  FLASHCARDS
// =====================================================================

function viewFlashDeckPicker(lang) {
    lang = lang || STATE.targetLang || 'no';
    const level = SUBSTATE.level || LD().level || "A1";
    ensureVocabAvailable(lang, level); // не блокує рендер; підвантажить і сама перемалює, якщо знайде/згенерує слова
    const words = vocabForLevel(level, lang);
    const topics = [...new Set(words.map(w => w.t))];
    // Внутрішній ключ "усі теми" — навмисно НЕ україномовний рядок (як
    //  було раніше), щоб не залежати від мови інтерфейсу для порівнянь.
    const ALL_TOPICS_SENTINEL = "__ALL__";
    const topic = SUBSTATE.topic || ALL_TOPICS_SENTINEL;
    const mode = SUBSTATE.mode || "flip";
    const allMode = SUBSTATE.allMode || false;

    const wrap = el(`
        <div class="view">
            <h1>${t('h_flashcards')}</h1>
            <p style="color:var(--ink-soft);font-size:.9rem;">${tf('flash_pick_desc', {lang: lang.toUpperCase()})}</p>
            <div id="leechDeckSlot"></div>
            <div class="deckpicker" id="lvlpick"></div>
            <div class="deckpicker" id="topicpick"></div>
            <div class="deckpicker" id="modepick"></div>
            <div class="deckpicker" id="allmodepick">
                <button class="chip ${!allMode?'active':''}" data-all="false">${t('srs_mode_btn')}</button>
                <button class="chip ${allMode?'active':''}" data-all="true">${t('all_cards_mode_btn')}</button>
            </div>
            <div class="card" id="deckInfo" style="margin-top:8px;"></div>
        </div>
    `);

    // "🩹 Складні слова" — окрема тренувальна колода зі слів, які
    // користувач провалював 4+ рази поспіль (isLeech). Показуємо лише
    // коли такі слова реально є, і незалежно від обраного рівня/теми,
    // бо складне слово могло лишитись ще з A1, поки людина вже на B1.
    const leechWords = collectLeechWords(lang);
    if (leechWords.length > 0) {
        const leechCard = el(`
            <div class="card" style="margin-bottom:16px;border:2px solid var(--rose);">
                <p style="font-weight:700;margin-bottom:4px;">${t('leech_deck_label')}</p>
                <p style="color:var(--ink-soft);font-size:.85rem;margin-bottom:10px;">${t('leech_deck_desc')}</p>
                <button class="btn btn-danger" id="startLeechBtn">${tf('leech_deck_count', {n: leechWords.length})}</button>
            </div>
        `);
        leechCard.querySelector('#startLeechBtn').onclick = () => {
            navigate('flashsession', { level, topic, mode: 'flip', deckWords: leechWords, allMode: true, lang, leechMode: true });
        };
        wrap.querySelector('#leechDeckSlot').appendChild(leechCard);
    }

    const lvlpick = wrap.querySelector('#lvlpick');
    LEVELS.forEach(lv => {
        const c = el(`<button class="chip ${lv===level?'active':''}">${lv}</button>`);
        c.onclick = () => navigate('flashcards', { level: lv, topic, mode, allMode, lang });
        lvlpick.appendChild(c);
    });

    const topicpick = wrap.querySelector('#topicpick');
    [ALL_TOPICS_SENTINEL, ...topics].forEach(tp => {
        const label = tp === ALL_TOPICS_SENTINEL ? t('all_topics') : translateTopic(tp);
        const c = el(`<button class="chip ${tp===topic?'active':''}">${escHtml(label)}</button>`);
        c.onclick = () => navigate('flashcards', { level, topic: tp, mode, allMode, lang });
        topicpick.appendChild(c);
    });

    const modepick = wrap.querySelector('#modepick');
    [
        ["flip", t('mode_flip')],
        ["mc", t('mode_mc')],
        ["type", t('mode_type')]
    ].forEach(([m, label]) => {
        const c = el(`<button class="chip ${m===mode?'active':''}">${label}</button>`);
        c.onclick = () => navigate('flashcards', { level, topic, mode: m, allMode, lang });
        modepick.appendChild(c);
    });

    wrap.querySelectorAll('#allmodepick .chip').forEach(btn => {
        btn.onclick = () => {
            const newAllMode = btn.dataset.all === 'true';
            navigate('flashcards', { level, topic, mode, allMode: newAllMode, lang });
        };
    });

    const deckWords = topic === ALL_TOPICS_SENTINEL ? words : words.filter(w => w.t === topic);
    const dueCount = deckWords.filter(w => {
        const s = getSrs(wordKey(Object.assign({ level }, w)));
        return s.due <= todayStr();
    }).length;

    const info = wrap.querySelector('#deckInfo');
    if (deckWords.length === 0) {
        info.innerHTML = `<div class="empty-state"><h3>${tf('no_words_level_lang', {lang: lang.toUpperCase()})}</h3><p>${t('try_other_level')}</p></div>`;
    } else {
        const modeLabel = allMode ? t('all_cards_label') : tf('due_review_label', {count: dueCount});
        const maxCards = allMode ? deckWords.length : 20;
        info.innerHTML = `
            <p style="font-size:.9rem;">${tf('deck_count_label', {count: `<b>${deckWords.length}</b>`})} · <b>${modeLabel}</b></p>
            <button class="btn btn-primary" id="startSession">${tf('start_session_btn', {n: maxCards})}</button>
        `;
        info.querySelector('#startSession').onclick = () => {
            navigate('flashsession', { level, topic, mode, deckWords, allMode, lang });
        };
    }
    return wrap;
}

function buildQueue(deckWords, level, allMode) {
    const withState = deckWords.map(w => {
        const key = wordKey(Object.assign({ level }, w));
        return { w, key, s: getSrs(key) };
    });

    if (allMode) {
        const due = withState.filter(x => x.s.due <= todayStr() && x.s.reps > 0);
        const fresh = withState.filter(x => x.s.reps === 0);
        const mastered = withState.filter(x => x.s.reps > 0 && x.s.due > todayStr());
        return shuffle(due).concat(shuffle(fresh)).concat(shuffle(mastered));
    }

    const due = withState.filter(x => x.s.due <= todayStr() && x.s.reps > 0);
    const fresh = withState.filter(x => x.s.reps === 0);
    return shuffle(due).concat(shuffle(fresh)).slice(0, 20);
}

// Одразу після провалу ("Ще раз") SRS відкладає слово на завтра — це
// правильно для довгострокової пам'яті, але психологічно погано: людина
// провалила слово і більше його в цій сесії не бачить, тобто не встигає
// одразу закріпити правильну відповідь. Тому, як в Anki/Duolingo, провалене
// слово повертається в ЦЮ Ж чергу трохи пізніше (через кілька карток) —
// для негайного повторного закріплення. Робимо це не більше одного разу
// на слово за сесію, щоб не зациклити чергу.
function requeueIfMissed(item) {
    if (item._requeued) return;
    item._requeued = true;
    const queue = SUBSTATE.queue;
    const aheadMin = 3, aheadMax = 6;
    const insertAt = Math.min(queue.length, SUBSTATE.pos + 1 + aheadMin + Math.floor(Math.random() * (aheadMax - aheadMin + 1)));
    queue.splice(insertAt, 0, item);
}

function viewFlashSession() {
    if (!SUBSTATE.queue) {
        if (SUBSTATE.leechMode) {
            // Слова "🩹 Складні слова" можуть належати різним рівням —
            // тому для кожного слова беремо саме його власний рівень
            // (записаний у collectLeechWords), а не SUBSTATE.level.
            SUBSTATE.queue = shuffle(SUBSTATE.deckWords.map(w => {
                const lvl = w._leechLevel || SUBSTATE.level;
                const key = wordKey(Object.assign({ level: lvl }, w));
                return { w, key, s: getSrs(key) };
            }));
        } else {
            SUBSTATE.queue = buildQueue(SUBSTATE.deckWords, SUBSTATE.level, SUBSTATE.allMode || false);
        }
        SUBSTATE.pos = 0;
        SUBSTATE.correct = 0;
        SUBSTATE.flipped = false;
    }
    const { queue, pos, level, mode, allMode } = SUBSTATE;

    if (queue.length === 0) {
        const emptyView = el(
            `<div class="view"><div class="empty-state"><h3>${t('empty_no_cards')}</h3><p>${t('empty_all_scheduled')}</p><button class="btn btn-primary" id="flashEmptyBackBtn">${t('to_deck_picker_btn')}</button></div></div>`
        );
        emptyView.querySelector('#flashEmptyBackBtn').onclick = () => navigate('flashcards');
        return emptyView;
    }
    if (pos >= queue.length) {
        markActivityToday();
        LD().stats.sessionCount = (LD().stats.sessionCount || 0) + 1;
        const pctCorrect = Math.round((SUBSTATE.correct / queue.length) * 100);
        if (!SUBSTATE._xpGranted) {
            SUBSTATE._xpGranted = true;
            const xpAmount = allMode ? Math.max(2, Math.round(SUBSTATE.correct * 1.5)) : Math.max(5, SUBSTATE.correct * 2);
            addXP(xpAmount, 'session_complete');
        }
        updateState();
        const trollMood = pctCorrect >= 70 ? 'happy' : (pctCorrect >= 40 ? 'idle' : 'sad');
        const wrap = el(`
            <div class="view session-end card">
                <h2>${t('session_complete_title')}</h2>
                <div class="bignum">${pctCorrect}%</div>
                <p style="color:var(--ink-soft)">${tf('correct_of_xp', {correct: SUBSTATE.correct, total: queue.length, xp: allMode ? Math.max(2, Math.round(SUBSTATE.correct * 1.5)) : Math.max(5, SUBSTATE.correct * 2)})}</p>
                <div style="display:flex;justify-content:center;margin:14px 0;"></div>
                <div style="display:flex;gap:8px;justify-content:center;margin-top:14px;flex-wrap:wrap;">
                    <button class="btn btn-primary" id="again">${t('again_session_btn')}</button>
                    <button class="btn btn-ghost" id="toHome">${t('to_home_btn')}</button>
                </div>
            </div>
        `);
        const trollSlot = wrap.querySelector('div[style*="justify-content:center"]');
        trollSlot.appendChild(renderTrollBubble(trollMood, 'sessionComplete', 64));
        wrap.querySelector('#again').onclick = () => navigate('flashsession', {
            level,
            topic: SUBSTATE.topic,
            mode,
            deckWords: SUBSTATE.deckWords,
            allMode: SUBSTATE.allMode,
            lang: SUBSTATE.lang,
            leechMode: SUBSTATE.leechMode
        });
        wrap.querySelector('#toHome').onclick = () => navigate('home');
        return wrap;
    }

    const item = queue[pos];
    const wrap = el(`<div class="view flash-stage"></div>`);
    const progWrap = el(`
        <div class="flash-progress">
            <div class="meta"><span>${pos+1} / ${queue.length}</span><span>${escHtml(translateTopic(item.w.t))}</span></div>
            <div class="progress-track"><div class="progress-fill" style="width:${(pos/queue.length)*100}%"></div></div>
        </div>
    `);
    wrap.appendChild(progWrap);

    if (mode === 'flip') {
        wrap.appendChild(renderFlipCard(item));
    } else if (mode === 'mc') {
        wrap.appendChild(renderMCCard(item, SUBSTATE.deckWords, level));
    } else {
        wrap.appendChild(renderTypeCard(item));
    }
    return wrap;
}

function renderFlipCard(item) {
    const holder = el(`<div class="flash-card-holder"></div>`);
    const cardWrap = el(`
        <div class="flip-card">
            <div class="flip-inner">
                <div class="flip-face flip-front">
                    <div class="no-word">${escHtml(item.w.no)}</div>
                    <button class="soundbtn" id="fSound">🔊</button>
                    <span id="fMicSlot"></span>
                    <div class="flip-hint">${t('flip_hint')}</div>
                </div>
                <div class="flip-face flip-back">
                    <div class="uk-word">${escHtml(wordTranslation(item.w, item.key.split('|')[0]))}</div>
                    <div class="example">${escHtml(item.w.ex_no)}<br>${escHtml(wordExampleTranslation(item.w, item.key.split('|')[0]))}</div>
                </div>
            </div>
        </div>
    `);
    const inner = cardWrap.querySelector('.flip-inner');
    inner.onclick = (e) => { if (e.target.id === 'fSound' || e.target.closest('.mic-btn')) return;
        inner.classList.toggle('flipped');
        SUBSTATE.flipped = inner.classList.contains('flipped');
        renderGrades(); };
    cardWrap.querySelector('#fSound').onclick = (e) => { e.stopPropagation();
        speak(item.w.no, STATE.targetLang); };
    const fMicSlot = cardWrap.querySelector('#fMicSlot');
    if (fMicSlot) {
        const fMic = renderMicButton(item.w.no, STATE.targetLang);
        if (fMic) fMicSlot.appendChild(fMic);
    }
    holder.appendChild(cardWrap);

    const gradeHolder = el(`<div></div>`);
    holder.appendChild(gradeHolder);

    function renderGrades() {
        gradeHolder.innerHTML = "";
        if (!SUBSTATE.flipped) return;
        const row = el(`
            <div class="grade-row">
                <button class="btn btn-danger" data-g="again">${t('grade_again')}</button>
                <button class="btn btn-amber" data-g="hard">${t('grade_hard')}</button>
                <button class="btn btn-primary" data-g="good">${t('grade_good')}</button>
            </div>
        `);
        row.querySelectorAll('[data-g]').forEach(b => b.onclick = () => {
            gradeWord(item.key, b.dataset.g);
            if (b.dataset.g !== 'again') SUBSTATE.correct++;
            else requeueIfMissed(item);
            SUBSTATE.pos++;
            SUBSTATE.flipped = false;
            navigate('flashsession', SUBSTATE);
        });
        gradeHolder.appendChild(row);
    }
    renderGrades();
    return holder;
}

function renderMCCard(item, deckWords, level) {
    const holder = el(`<div style="width:100%;display:flex;flex-direction:column;align-items:center;"></div>`);
    const head = el(`
        <div class="flip-card" style="height:160px;">
            <div class="flip-face flip-front" style="position:static;box-shadow:var(--shadow);">
                <div class="no-word">${escHtml(item.w.no)}</div>
                <button class="soundbtn" id="mcSound">🔊</button>
            </div>
        </div>
    `);
    holder.appendChild(head);
    head.querySelector('#mcSound').onclick = () => speak(item.w.no, STATE.targetLang);

    // Раніше варіанти відповіді завжди показувались українською (w.uk)
    // незалежно від мови інтерфейсу — тепер, як і решта картки,
    // враховують STATE.vocabLang через wordTranslation() (другий
    // аргумент — рівень, той самий патерн, що й у renderFlipCard вище).
    const lvl = item.key.split('|')[0];
    const correctTranslation = wordTranslation(item.w, lvl);
    const distractors = shuffle(deckWords.filter(w => w.no !== item.w.no)).slice(0, 3).map(w => wordTranslation(w, lvl));
    const options = shuffle([correctTranslation, ...distractors]);
    const opts = el(`<div class="mc-options"></div>`);
    options.forEach(opt => {
        const b = el(`<button class="mc-opt">${escHtml(opt)}</button>`);
        b.onclick = () => {
            const correct = opt === correctTranslation;
            opts.querySelectorAll('.mc-opt').forEach(o => {
                o.disabled = true;
                if (o.textContent === correctTranslation) o.classList.add('correct');
                else if (o === b) o.classList.add('wrong');
            });
            gradeWord(item.key, correct ? 'good' : 'again');
            if (correct) SUBSTATE.correct++;
            else requeueIfMissed(item);
            setTimeout(() => { SUBSTATE.pos++;
                navigate('flashsession', SUBSTATE); }, 750);
        };
        opts.appendChild(b);
    });
    holder.appendChild(opts);
    return holder;
}

function renderTypeCard(item) {
    const holder = el(`<div style="width:100%;display:flex;flex-direction:column;align-items:center;"></div>`);
    holder.appendChild(el(`
        <div class="flip-card" style="height:170px;">
            <div class="flip-face flip-front" style="position:static;box-shadow:var(--shadow);">
                <div class="uk-word">${escHtml(wordTranslation(item.w, item.key.split('|')[0]))}</div>
                <div class="flip-hint" style="font-size:.6rem;">${t('write_word_norwegian')}</div>
            </div>
        </div>
    `));
    const input = el(`<input class="type-input" placeholder="${t('type_placeholder')}" autocomplete="off">`);
    holder.appendChild(input);
    const fb = el(`<div></div>`);
    holder.appendChild(fb);
    const btn = el(`<button class="btn btn-primary">${t('check_btn')}</button>`);
    holder.appendChild(btn);

    function check() {
        const val = input.value.trim();
        const target = item.w.no;
        const correct = isFuzzyMatch(val, target);
        fb.innerHTML =
            `<div class="feedback-banner ${correct?'ok':'bad'}">${correct? t('check_correct') : tf('check_wrong_prefix', {answer: target})}</div>`;
        input.disabled = true;
        btn.disabled = true;
        gradeWord(item.key, correct ? 'good' : 'again');
        if (correct) SUBSTATE.correct++;
        else requeueIfMissed(item);
        setTimeout(() => { SUBSTATE.pos++;
            navigate('flashsession', SUBSTATE); }, 1200);
    }
    btn.onclick = check;
    input.onkeydown = (e) => { if (e.key === 'Enter') check(); };
    return holder;
}

// =====================================================================
//  VOCABULARY
// =====================================================================

function viewVocabulary() {
    const lang = STATE.targetLang || 'no';
    const level = LD().level || "A1";
    ensureVocabAvailable(lang, level);
    const words = vocabForLevel(level, lang);
    const statusLabels = {
        uk: { new: 'нове', due: 'на повторення', mastered: 'засвоєне' },
        en: { new: 'new', due: 'due for review', mastered: 'mastered' },
        ru: { new: 'новое', due: 'на повторение', mastered: 'освоено' },
    }[STATE.uiLang] || { new: 'нове', due: 'на повторення', mastered: 'засвоєне' };
    const wrap = el(`
        <div class="view">
            <h1>${t('h_vocabulary')}</h1>
            <p style="color:var(--ink-soft);margin-bottom:12px;font-size:.85rem;">${t('all_level_words')} (${level}) · ${tf('lang_label', {lang: lang.toUpperCase()})}. ${t('status_label')}: <span class="status new">${statusLabels.new}</span> <span class="status due">${statusLabels.due}</span> <span class="status mastered">${statusLabels.mastered}</span></p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">
                <input class="type-input" id="vocabSearch" placeholder="${t('search_placeholder')}" style="flex:1;max-width:280px;padding:8px 14px;font-size:.85rem;">
                <select id="vocabTopic" class="chip" style="border-radius:999px;padding:6px 14px;font-size:.8rem;">
                    <option value="all">${t('all_topics')}</option>
                    ${[...new Set(words.map(w=>w.t))].map(tp=>`<option value="${escHtml(tp)}">${escHtml(translateTopic(tp))}</option>`).join('')}
                </select>
                <button class="btn btn-ghost btn-sm" id="vocabGenBtn" style="white-space:nowrap;">${t('gen_words_btn')}</button>
            </div>
            <div class="card" style="padding:0;overflow-x:auto;">
                <table class="vocab-table">
                    <thead><tr><th>${t('col_word')}</th><th>${t('col_translation')}</th><th>${t('col_topic')}</th><th>${t('col_status')}</th></tr></thead>
                    <tbody id="vocabBody"></tbody>
                </table>
            </div>
        </div>
    `);
    const tbody = wrap.querySelector('#vocabBody');
    const search = wrap.querySelector('#vocabSearch');
    const topicFilter = wrap.querySelector('#vocabTopic');

    function renderList() {
        const q = search.value.toLowerCase().trim();
        const topic = topicFilter.value;
        let filtered = words.filter(w => {
            const matchWord = w.no.toLowerCase().includes(q) || w.uk.toLowerCase().includes(q);
            const matchTopic = topic === 'all' || w.t === topic;
            return matchWord && matchTopic;
        });
        tbody.innerHTML = filtered.map(w => {
            const status = getWordStatus(w, level);
            const translated = wordTranslation(w, level, STATE.vocabLang);
            return `<tr>
                <td><strong>${escHtml(w.no)}</strong></td>
                <td>${escHtml(translated)}</td>
                <td><span style="font-size:.7rem;background:var(--line-soft);padding:2px 8px;border-radius:999px;">${escHtml(translateTopic(w.t))}</span></td>
                <td><span class="status ${status}">${statusLabels[status]}</span></td>
            </tr>`;
        }).join('');
        if (!filtered.length) {
            tbody.innerHTML =
                `<tr><td colspan="4" style="text-align:center;padding:30px;color:var(--ink-soft);font-size:.85rem;">${t('no_words_found')}</td></tr>`;
        }
        return filtered;
    }
    renderList();
    search.oninput = renderList;
    topicFilter.onchange = renderList;

    const genBtn = wrap.querySelector('#vocabGenBtn');
    genBtn.onclick = async () => {
        genBtn.disabled = true;
        const originalLabel = genBtn.textContent;
        genBtn.textContent = t('gen_words_loading');
        try {
            // Беремо актуальний список слів саме зараз (а не той, що був
            // на момент відкриття екрана) — важливо, якщо це вже не перше
            // натискання кнопки поспіль: щойно додані слова теж мають
            // потрапити у список "уникати".
            const freshWords = vocabForLevel(level, lang);
            const newWords = await generateVocabWordsAI(level, freshWords);
            const added = addCustomWords(level, Array.isArray(newWords) ? newWords : []);
            if (added > 0) {
                toast(tf('gen_words_added_toast', {n: added}));
                navigate('vocabulary');
            } else {
                toast(t('gen_words_none_toast'));
                genBtn.disabled = false;
                genBtn.textContent = originalLabel;
            }
        } catch (e) {
            console.error('[Словник] Помилка генерації слів:', e);
            toast(t('gen_words_error_toast'));
            genBtn.disabled = false;
            genBtn.textContent = originalLabel;
        }
    };

    return wrap;
}

// =====================================================================
//  TESTS
// =====================================================================

function viewTestsHub() {
    const wrap = el(`
        <div class="view">
            <h1>${t('h_tests')}</h1>
            <p style="color:var(--ink-soft);margin-bottom:16px;">${tf('tests_choose_type', {level: LD().level||'A1'})}</p>
            <div class="grid cols-3" id="thub"></div>
        </div>
    `);
    const items = [
        ["test-mc", t('test_mc_title'), t('test_mc_desc')],
        ["test-cloze", t('test_cloze_title'), t('test_cloze_desc')],
        ["test-order", t('test_order_title'), t('test_order_desc')],
        ["test-listen", t('test_listen_title'), t('test_listen_desc')],
        ["test-translate", t('test_translate_title'), t('test_translate_desc')],
        ["sentence-builder", t('sb_title'), t('sb_tap_hint')],
    ];
    const grid = wrap.querySelector('#thub');
    items.forEach(([r, icon, title, desc]) => {
        const c = el(
            `<div class="card test-type-card"><div class="icon">${icon}</div><h3>${title}</h3><p>${desc}</p><button class="btn btn-primary btn-sm">${t('start_test_btn')}</button></div>`
        );
        c.querySelector('button').onclick = () => navigate(r);
        grid.appendChild(c);
    });
    return wrap;
}

function currentLevelWords() {
    const lang = STATE.targetLang || 'no';
    const level = LD().level || "A1";
    ensureVocabAvailable(lang, level);
    const words = vocabForLevel(level, lang);
    // Раніше тут був фолбек на VOCAB.A1 (норвезькі слова) для БУДЬ-ЯКОЇ
    // мови, якщо для неї ще нема слів — тобто той, хто вчить іспанську,
    // міг раптом побачити норвезькі картки. Фолбек лишаємо лише для
    // самої норвезької (вбудований словник має бути не порожнім завжди);
    // для решти мов повертаємо порожній список — виклики цієї функції вже
    // мають порожній стан на цей випадок (і ensureVocabAvailable вище
    // саме зараз намагається підвантажити/згенерувати слова).
    if (words.length) return words;
    return lang === 'no' ? VOCAB.A1 : [];
}

function runQuiz(sub, route, title) {
    if (!sub.qs || sub.qs.length === 0) {
        // Порожньо буває, коли для щойно обраної мови ще нема слів на
        // цьому рівні — ensureVocabAvailable() (викликається зі
        // currentLevelWords()) саме зараз намагається їх підвантажити чи
        // згенерувати; коли це станеться, render() перемалює екран.
        const v = el(
            `<div class="view"><div class="empty-state"><h3>${t('quiz_preparing_title')}</h3>` +
            `<p>${t('quiz_preparing_desc')}</p>` +
            `<button class="btn btn-ghost" id="quizEmptyBack">${t('to_tests_btn')}</button></div></div>`
        );
        v.querySelector('#quizEmptyBack').onclick = () => navigate('tests');
        return v;
    }
    if (!sub.userAnswers) {
        sub.userAnswers = new Array(sub.qs.length).fill(null);
    }
    if (sub.i >= sub.qs.length && sub.userAnswers.every(a => a !== null)) {
        LD().stats.testsCompleted = (LD().stats.testsCompleted || 0) + 1;
        LD().leaderboardScore = (LD().leaderboardScore || 0) + sub.correct * 10;
        markActivityToday();
        const pct = Math.round((sub.correct / sub.qs.length) * 100);
        if (!sub._xpGranted) {
            sub._xpGranted = true;
            addXP(100, 'test_complete');
            checkAchievements({ perfectTest: pct === 100 });
        }
        recordTestHistoryIfNeeded(sub, route, pct);
        updateState();
        const trollMood = pct >= 70 ? 'happy' : (pct >= 40 ? 'idle' : 'sad');
        const wrap = el(`
            <div class="view session-end card">
                <h2>${title}${t('quiz_finished_suffix')}</h2>
                <div class="bignum">${pct}%</div>
                <p style="color:var(--ink-soft)">${tf('correct_of_xp', {correct: sub.correct, total: sub.qs.length, xp: 100})}</p>
                <div style="display:flex;justify-content:center;margin:16px 0;"></div>
                <button class="btn btn-ghost" id="hub">${t('to_tests_btn')}</button>
            </div>
        `);
        const trollSlot = wrap.querySelector('div[style*="justify-content:center"]');
        trollSlot.appendChild(renderTrollBubble(trollMood, 'testComplete', 64));
        wrap.querySelector('#hub').onclick = () => navigate('tests');
        return wrap;
    }
    if (sub.i >= sub.qs.length) sub.i = sub.qs.length - 1;
    if (sub.i < 0) sub.i = 0;

    const currentQ = sub.qs[sub.i];
    const currentAnswer = sub.userAnswers[sub.i];

    function renderDots() {
        let html = '<div class="test-nav">';
        sub.qs.forEach((_, idx) => {
            const ans = sub.userAnswers[idx];
            let cls = 'dot';
            if (idx === sub.i) cls += ' active';
            if (ans !== null) cls += ans.correct ? ' correct' : ' wrong';
            html += `<div class="${cls}" data-idx="${idx}">${idx+1}</div>`;
        });
        html += '</div>';
        return html;
    }

    function renderControls() {
        let html = '<div class="test-controls">';
        html += `<button class="btn btn-ghost btn-sm" id="prevBtn" ${sub.i===0?'disabled':''}>${t('prev_btn')}</button>`;
        html +=
            `<button class="btn btn-primary btn-sm" id="nextBtn" ${sub.i>=sub.qs.length-1?'disabled':''}>${t('next_btn2')}</button>`;
        html += '</div>';
        return html;
    }

    const wrap = el(`<div class="view" style="max-width:600px;margin:0 auto;"></div>`);
    const dotsWrap = el(renderDots());
    wrap.appendChild(dotsWrap);

    const questionContainer = el(`<div style="text-align:center;margin:10px 0;"></div>`);
    wrap.appendChild(questionContainer);

    function renderQuestion() {
        questionContainer.innerHTML = '';
        const q = currentQ;
        const ans = currentAnswer;

        const header = el(`<div class="qcounter">${title} · ${sub.i+1} / ${sub.qs.length}</div>`);
        questionContainer.appendChild(header);

        const progress = el(
            `<div class="progress-track" style="margin-bottom:12px;"><div class="progress-fill" style="width:${((sub.i+1)/sub.qs.length)*100}%"></div></div>`
        );
        questionContainer.appendChild(progress);

        if (q.audio) {
            // Аудіо-питання (test-listen): замість тексту показуємо кнопку
            // прослуховування й автоматично програємо слово одразу при
            // відкритті питання — так це справді перевіряє аудіювання, а
            // не читання (раніше тут не було НІЧОГО — ні тексту, ні звуку).
            const audioBox = el(`
                <div style="margin-bottom:16px;">
                    <button class="soundbtn" id="quizListenBtn" style="font-size:1.3rem;padding:14px 22px;">🔊 ${t('btn_listen')}</button>
                </div>
            `);
            questionContainer.appendChild(audioBox);
            const playAudio = () => speak(q.audio, STATE.targetLang);
            audioBox.querySelector('#quizListenBtn').onclick = playAudio;
            setTimeout(playAudio, 300); // невелика затримка, щоб голоси встигли підвантажитись
        } else {
            const qText = el(`<div class="question-text" style="font-size:1.1rem;margin-bottom:16px;">${escHtml(q.q)}</div>`);
            questionContainer.appendChild(qText);
        }

        if (q.opts) {
            const optsContainer = el(`<div class="mc-options" style="margin:0 auto;"></div>`);
            q.opts.forEach((opt, idx) => {
                const b = el(`<button class="mc-opt" ${ans !== null ? 'disabled' : ''}>${escHtml(opt)}</button>`);
                if (ans !== null) {
                    if (idx === q.a) b.classList.add('correct');
                    else if (idx === ans.selected) b.classList.add('wrong');
                }
                b.onclick = () => {
                    if (ans !== null) return;
                    const correct = idx === q.a;
                    sub.userAnswers[sub.i] = { selected: idx, correct: correct };
                    if (correct) sub.correct = (sub.correct || 0) + 1;
                    const allOpts = optsContainer.querySelectorAll('.mc-opt');
                    allOpts.forEach(o => o.disabled = true);
                    allOpts.forEach((o, oi) => {
                        if (oi === q.a) o.classList.add('correct');
                        else if (oi === idx) o.classList.add('wrong');
                    });
                    updateDots();
                    setTimeout(() => {
                        let nextIdx = sub.i + 1;
                        while (nextIdx < sub.qs.length && sub.userAnswers[nextIdx] !== null)
                            nextIdx++;
                        if (nextIdx < sub.qs.length) sub.i = nextIdx;
                        else sub.i = sub.qs.length;
                        navigate(route, sub);
                    }, 2000);
                };
                optsContainer.appendChild(b);
            });
            questionContainer.appendChild(optsContainer);
        }

        const controls = el(renderControls());
        questionContainer.appendChild(controls);

        controls.querySelector('#prevBtn').onclick = () => {
            if (sub.i > 0) { sub.i--;
                navigate(route, sub); }
        };
        controls.querySelector('#nextBtn').onclick = () => {
            let nextIdx = sub.i + 1;
            while (nextIdx < sub.qs.length && sub.userAnswers[nextIdx] !== null) nextIdx++;
            if (nextIdx < sub.qs.length) sub.i = nextIdx;
            else sub.i = sub.qs.length;
            navigate(route, sub);
        };
    }

    function updateDots() {
        const dots = dotsWrap.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            const ans = sub.userAnswers[idx];
            dot.className = 'dot';
            if (idx === sub.i) dot.classList.add('active');
            if (ans !== null) dot.classList.add(ans.correct ? 'correct' : 'wrong');
        });
    }

    renderQuestion();
    dotsWrap.querySelectorAll('.dot').forEach(dot => {
        dot.onclick = () => {
            const idx = parseInt(dot.dataset.idx);
            if (idx !== sub.i) { sub.i = idx;
                navigate(route, sub); }
        };
    });
    return wrap;
}

// =====================================================================
//  TEST TYPES
// =====================================================================

function viewTestMC() {
    if (!SUBSTATE.qs || SUBSTATE.qs.length === 0) {
        const level = LD().level || "A1";
        const lang = STATE.targetLang || 'no';
        if (lang !== 'no') ensureGrammarAvailable(lang, level); // тихо; якщо не встигне — цього разу просто без граматичних питань
        const words = shuffle(currentLevelWords()).slice(0, 6);
        const gramQs = grammarForLevel(level, lang).map(g => ({ q: grammarLocalizedQ(g), opts: g.ex
                .opts, a: g.ex.a }));
        const wordQs = words.map(w => {
            const correctTranslation = wordTranslation(w, level, STATE.vocabLang);
            const distractors = shuffle(currentLevelWords().filter(x => x.no !== w.no)).slice(0, 3).map(x => wordTranslation(x, level, STATE.vocabLang));
            const opts = shuffle([correctTranslation, ...distractors]);
            return { q: `${t('how_translate')} «${w.no}»?`, opts, a: opts.indexOf(correctTranslation) };
        });
        SUBSTATE.qs = shuffle(wordQs.concat(gramQs)).slice(0, 8);
        SUBSTATE.i = 0;
        SUBSTATE.correct = 0;
        SUBSTATE.userAnswers = null;
    }
    return runQuiz(SUBSTATE, 'test-mc', t('test_mc_title'));
}

function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function clozeBlank(word, exampleNo) {
    if (!word || !exampleNo) return null;
    const bare = word.replace(/^å\s+/i, '').trim();
    const firstWord = bare.split(' ')[0];
    let re = new RegExp(escapeRegex(bare), 'i');
    if (re.test(exampleNo)) return exampleNo.replace(re, '____');
    re = new RegExp('\\b' + escapeRegex(firstWord), 'i');
    if (re.test(exampleNo)) return exampleNo.replace(re, '____');
    const stemLen = Math.max(3, Math.ceil(firstWord.length * 0.6));
    const stem = firstWord.slice(0, stemLen);
    re = new RegExp('\\b' + escapeRegex(stem) + '\\w*', 'i');
    if (re.test(exampleNo)) return exampleNo.replace(re, '____');
    return null;
}

function viewTestCloze() {
    if (!SUBSTATE.qs || SUBSTATE.qs.length === 0) {
        const eligible = currentLevelWords().filter(w => clozeBlank(w.no, w.ex_no) !== null);
        const words = shuffle(eligible).slice(0, 6);
        SUBSTATE.qs = words.map(w => {
            const sentence = clozeBlank(w.no, w.ex_no);
            const distractors = shuffle(currentLevelWords().filter(x => x.no !== w.no)).slice(0, 3).map(x => x
                .no);
            const opts = shuffle([w.no, ...distractors]);
            return { sentence, translation: w.ex_uk, opts, a: opts.indexOf(w.no) };
        });
        SUBSTATE.i = 0;
        SUBSTATE.correct = 0;
        SUBSTATE.userAnswers = null;
    }
    const sub = SUBSTATE;
    if (sub.i >= sub.qs.length && sub.userAnswers && sub.userAnswers.every(a => a !== null)) {
        LD().stats.testsCompleted = (LD().stats.testsCompleted || 0) + 1;
        LD().leaderboardScore = (LD().leaderboardScore || 0) + sub.correct * 10;
        markActivityToday();
        const pct = Math.round((sub.correct / sub.qs.length) * 100);
        recordTestHistoryIfNeeded(sub, 'test-cloze', pct);
        updateState();
        const wrap = el(`
            <div class="view session-end card">
                <h2>${t('test_cloze_title')}${t('quiz_finished_suffix')}</h2>
                <div class="bignum">${pct}%</div>
                <p style="color:var(--ink-soft)">${tf('correct_of_total', {correct: sub.correct, total: sub.qs.length})}</p>
                <button class="btn btn-ghost" id="hub">${t('to_tests_btn')}</button>
            </div>
        `);
        wrap.querySelector('#hub').onclick = () => navigate('tests');
        return wrap;
    }
    if (!sub.userAnswers) sub.userAnswers = new Array(sub.qs.length).fill(null);
    if (sub.i >= sub.qs.length) sub.i = sub.qs.length - 1;
    if (sub.i < 0) sub.i = 0;

    const currentQ = sub.qs[sub.i];
    const currentAnswer = sub.userAnswers[sub.i];

    const wrap = el(`<div class="view" style="max-width:600px;margin:0 auto;"></div>`);
    let dotsHtml = '<div class="test-nav">';
    sub.qs.forEach((_, idx) => {
        const ans = sub.userAnswers[idx];
        let cls = 'dot';
        if (idx === sub.i) cls += ' active';
        if (ans !== null) cls += ans.correct ? ' correct' : ' wrong';
        dotsHtml += `<div class="${cls}" data-idx="${idx}">${idx+1}</div>`;
    });
    dotsHtml += '</div>';
    const dotsWrap = el(dotsHtml);
    wrap.appendChild(dotsWrap);

    const container = el(`<div style="text-align:center;margin:10px 0;"></div>`);
    wrap.appendChild(container);

    function renderCloze() {
        container.innerHTML = '';
        const q = currentQ;
        const ans = currentAnswer;

        const header = el(`<div class="qcounter">${t('test_cloze_title')} · ${sub.i+1} / ${sub.qs.length}</div>`);
        container.appendChild(header);
        const progress = el(
            `<div class="progress-track" style="margin-bottom:12px;"><div class="progress-fill" style="width:${((sub.i+1)/sub.qs.length)*100}%"></div></div>`
        );
        container.appendChild(progress);

        const sentence = el(`<div class="cloze-sentence">${escHtml(q.sentence)}</div>`);
        container.appendChild(sentence);
        const trans = el(
            `<p style="color:var(--ink-soft);font-size:.85rem;margin-bottom:12px;">${escHtml(q.translation)}</p>`);
        container.appendChild(trans);

        const optsContainer = el(`<div class="mc-options" style="margin:0 auto;"></div>`);
        q.opts.forEach((opt, idx) => {
            const b = el(`<button class="mc-opt" ${ans !== null ? 'disabled' : ''}>${escHtml(opt)}</button>`);
            if (ans !== null) {
                if (idx === q.a) b.classList.add('correct');
                else if (idx === ans.selected) b.classList.add('wrong');
            }
            b.onclick = () => {
                if (ans !== null) return;
                const correct = idx === q.a;
                sub.userAnswers[sub.i] = { selected: idx, correct: correct };
                if (correct) sub.correct = (sub.correct || 0) + 1;
                const allOpts = optsContainer.querySelectorAll('.mc-opt');
                allOpts.forEach(o => o.disabled = true);
                allOpts.forEach((o, oi) => {
                    if (oi === q.a) o.classList.add('correct');
                    else if (oi === idx) o.classList.add('wrong');
                });
                updateDotsCloze();
                setTimeout(() => {
                    let nextIdx = sub.i + 1;
                    while (nextIdx < sub.qs.length && sub.userAnswers[nextIdx] !== null)
                        nextIdx++;
                    if (nextIdx < sub.qs.length) sub.i = nextIdx;
                    else sub.i = sub.qs.length;
                    navigate('test-cloze', sub);
                }, 2000);
            };
            optsContainer.appendChild(b);
        });
        container.appendChild(optsContainer);

        const controls = el(`<div class="test-controls">
            <button class="btn btn-ghost btn-sm" id="prevBtn" ${sub.i===0?'disabled':''}>${t('prev_btn')}</button>
            <button class="btn btn-primary btn-sm" id="nextBtn" ${sub.i>=sub.qs.length-1?'disabled':''}>${t('next_btn2')}</button>
        </div>`);
        container.appendChild(controls);
        controls.querySelector('#prevBtn').onclick = () => {
            if (sub.i > 0) { sub.i--;
                navigate('test-cloze', sub); }
        };
        controls.querySelector('#nextBtn').onclick = () => {
            let nextIdx = sub.i + 1;
            while (nextIdx < sub.qs.length && sub.userAnswers[nextIdx] !== null) nextIdx++;
            if (nextIdx < sub.qs.length) sub.i = nextIdx;
            else sub.i = sub.qs.length;
            navigate('test-cloze', sub);
        };
    }

    function updateDotsCloze() {
        const dots = dotsWrap.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            const ans = sub.userAnswers[idx];
            dot.className = 'dot';
            if (idx === sub.i) dot.classList.add('active');
            if (ans !== null) dot.classList.add(ans.correct ? 'correct' : 'wrong');
        });
    }
    renderCloze();
    dotsWrap.querySelectorAll('.dot').forEach(dot => {
        dot.onclick = () => {
            const idx = parseInt(dot.dataset.idx);
            if (idx !== sub.i) { sub.i = idx;
                navigate('test-cloze', sub); }
        };
    });
    return wrap;
}

function viewTestOrder() {
    if (!SUBSTATE.qs || SUBSTATE.qs.length === 0) {
        const words = shuffle(currentLevelWords().filter(w => w.ex_no.split(' ').length >= 3 && w.ex_no.split(' ')
            .length <= 7)).slice(0, 5);
        SUBSTATE.qs = words.map(w => {
            const clean = w.ex_no.replace(/[.,!?]/g, '');
            const tokens = clean.split(' ');
            return { original: tokens, translation: w.ex_uk };
        });
        SUBSTATE.i = 0;
        SUBSTATE.correct = 0;
        SUBSTATE.userAnswers = new Array(SUBSTATE.qs.length).fill(null);
    }
    const sub = SUBSTATE;
    if (sub.i >= sub.qs.length && sub.userAnswers.every(a => a !== null)) {
        LD().stats.testsCompleted = (LD().stats.testsCompleted || 0) + 1;
        LD().leaderboardScore = (LD().leaderboardScore || 0) + sub.correct * 10;
        markActivityToday();
        const pct = Math.round((sub.correct / sub.qs.length) * 100);
        recordTestHistoryIfNeeded(sub, 'test-order', pct);
        updateState();
        const wrap = el(`
            <div class="view session-end card">
                <h2>${t('test_order_title')}${t('quiz_finished_suffix')}</h2>
                <div class="bignum">${pct}%</div>
                <p style="color:var(--ink-soft)">${tf('correct_of_total', {correct: sub.correct, total: sub.qs.length})}</p>
                <button class="btn btn-ghost" id="hub">${t('to_tests_btn')}</button>
            </div>
        `);
        wrap.querySelector('#hub').onclick = () => navigate('tests');
        return wrap;
    }
    if (sub.i >= sub.qs.length) sub.i = sub.qs.length - 1;
    if (sub.i < 0) sub.i = 0;

    const q = sub.qs[sub.i];
    const ans = sub.userAnswers[sub.i];

    const wrap = el(`<div class="view" style="max-width:600px;margin:0 auto;"></div>`);
    let dotsHtml = '<div class="test-nav">';
    sub.qs.forEach((_, idx) => {
        const a = sub.userAnswers[idx];
        let cls = 'dot';
        if (idx === sub.i) cls += ' active';
        if (a !== null) cls += a.correct ? ' correct' : ' wrong';
        dotsHtml += `<div class="${cls}" data-idx="${idx}">${idx+1}</div>`;
    });
    dotsHtml += '</div>';
    const dotsWrap = el(dotsHtml);
    wrap.appendChild(dotsWrap);

    const container = el(`<div style="text-align:center;margin:10px 0;"></div>`);
    wrap.appendChild(container);

    let chosen = ans ? ans.chosen : [];

    function renderOrder() {
        container.innerHTML = '';
        const header = el(`<div class="qcounter">${t('test_order_title')} · ${sub.i+1} / ${sub.qs.length}</div>`);
        container.appendChild(header);
        const progress = el(
            `<div class="progress-track" style="margin-bottom:12px;"><div class="progress-fill" style="width:${((sub.i+1)/sub.qs.length)*100}%"></div></div>`
        );
        container.appendChild(progress);
        const trans = el(
            `<p style="color:var(--ink-soft);margin-bottom:12px;">${escHtml(q.translation)}</p>`);
        container.appendChild(trans);

        const target = el(`<div class="order-tokens" id="target"></div>`);
        container.appendChild(target);
        const pool = el(`<div class="order-pool" id="pool"></div>`);
        container.appendChild(pool);

        const checkBtn = el(`<button class="btn btn-primary" id="checkOrder" ${ans!==null?'disabled':''}>${t('check_btn')}</button>`);
        container.appendChild(checkBtn);
        const fb = el(`<div id="orderFb"></div>`);
        container.appendChild(fb);

        const shuffled = ans ? ans.shuffled : shuffle(q.original);

        function renderPool() {
            pool.innerHTML = '';
            shuffled.forEach((word, idx) => {
                if (chosen.includes(idx)) return;
                const tok = el(`<button class="token">${escHtml(word)}</button>`);
                tok.onclick = () => { if (ans !== null) return;
                    chosen.push(idx);
                    renderAll(); };
                pool.appendChild(tok);
            });
        }

        function renderTarget() {
            target.innerHTML = '';
            if (chosen.length === 0) { target.innerHTML =
                    '<span style="color:var(--ink-soft);font-size:.8rem;">' + t('click_words_below') + '</span>'; }
            chosen.forEach((idx, pos) => {
                const tok = el(`<button class="token">${shuffled[idx]}</button>`);
                tok.onclick = () => { if (ans !== null) return;
                    chosen.splice(pos, 1);
                    renderAll(); };
                target.appendChild(tok);
            });
            checkBtn.disabled = chosen.length !== shuffled.length || ans !== null;
        }

        function renderAll() { renderPool();
            renderTarget(); }
        renderAll();

        checkBtn.onclick = () => {
            const answer = chosen.map(idx => shuffled[idx]).join(' ').toLowerCase();
            const correct = answer === q.original.join(' ').toLowerCase();
            sub.userAnswers[sub.i] = { chosen: chosen.slice(), shuffled: shuffled, correct: correct };
            if (correct) sub.correct = (sub.correct || 0) + 1;
            fb.innerHTML =
                `<div class="feedback-banner ${correct?'ok':'bad'}" style="margin-top:12px;">${correct? t('check_correct') : tf('correct_variant_prefix', {answer: q.original.join(' ')})}</div>`;
            checkBtn.disabled = true;
            updateDotsOrder();
            setTimeout(() => {
                let nextIdx = sub.i + 1;
                while (nextIdx < sub.qs.length && sub.userAnswers[nextIdx] !== null) nextIdx++;
                if (nextIdx < sub.qs.length) sub.i = nextIdx;
                else sub.i = sub.qs.length;
                navigate('test-order', sub);
            }, 2000);
        };
    }

    function updateDotsOrder() {
        const dots = dotsWrap.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            const a = sub.userAnswers[idx];
            dot.className = 'dot';
            if (idx === sub.i) dot.classList.add('active');
            if (a !== null) dot.classList.add(a.correct ? 'correct' : 'wrong');
        });
    }

    renderOrder();
    dotsWrap.querySelectorAll('.dot').forEach(dot => {
        dot.onclick = () => {
            const idx = parseInt(dot.dataset.idx);
            if (idx !== sub.i) { sub.i = idx;
                navigate('test-order', sub); }
        };
    });

    const controls = el(`<div class="test-controls">
        <button class="btn btn-ghost btn-sm" id="prevBtn" ${sub.i===0?'disabled':''}>${t('prev_btn')}</button>
        <button class="btn btn-primary btn-sm" id="nextBtn" ${sub.i>=sub.qs.length-1?'disabled':''}>${t('next_btn2')}</button>
    </div>`);
    container.appendChild(controls);
    controls.querySelector('#prevBtn').onclick = () => {
        if (sub.i > 0) { sub.i--;
            navigate('test-order', sub); }
    };
    controls.querySelector('#nextBtn').onclick = () => {
        let nextIdx = sub.i + 1;
        while (nextIdx < sub.qs.length && sub.userAnswers[nextIdx] !== null) nextIdx++;
        if (nextIdx < sub.qs.length) sub.i = nextIdx;
        else sub.i = sub.qs.length;
        navigate('test-order', sub);
    };
    return wrap;
}

function viewTestListen() {
    if (!SUBSTATE.qs || SUBSTATE.qs.length === 0) {
        const words = shuffle(currentLevelWords()).slice(0, 6);
        // Раніше варіанти відповіді завжди були українською (w.uk) —
        // тепер локалізуються через wordTranslation(), як і решта тестів.
        // КРИТИЧНО: об'єкт питання раніше не мав поля "q" (текст питання),
        // яке runQuiz() показує через escHtml(q.q) — а escHtml(undefined)
        // повертає порожній рядок. Тобто "тест на аудіювання" показував
        // ПОРОЖНЄ питання без жодного звуку чи тексту: просто 4 варіанти
        // відповіді без жодного контексту, що вгадувати. Тепер question
        // явно позначений як аудіо-питання (audio: слово, яке треба
        // прослухати) — runQuiz() рендерить для нього кнопку "🔊 Слухати"
        // замість тексту питання.
        SUBSTATE.qs = words.map(w => {
            const correctTranslation = wordTranslation(w, LD().level);
            const distractors = shuffle(currentLevelWords().filter(x => x.no !== w.no)).slice(0, 3).map(x => wordTranslation(x, LD().level));
            const opts = shuffle([correctTranslation, ...distractors]);
            return { no: w.no, audio: w.no, opts, a: opts.indexOf(correctTranslation) };
        });
        SUBSTATE.i = 0;
        SUBSTATE.correct = 0;
        SUBSTATE.userAnswers = null;
    }
    return runQuiz(SUBSTATE, 'test-listen', t('test_listen_title'));
}

function viewTestTranslate() {
    if (!SUBSTATE.qs || SUBSTATE.qs.length === 0) {
        const words = shuffle(currentLevelWords()).slice(0, 6);
        SUBSTATE.qs = words.map(w => {
            return { word: w, dirToNo: Math.random() < 0.5 };
        });
        SUBSTATE.i = 0;
        SUBSTATE.correct = 0;
        SUBSTATE.userAnswers = new Array(SUBSTATE.qs.length).fill(null);
    }
    const sub = SUBSTATE;
    if (sub.i >= sub.qs.length && sub.userAnswers.every(a => a !== null)) {
        LD().stats.testsCompleted = (LD().stats.testsCompleted || 0) + 1;
        LD().leaderboardScore = (LD().leaderboardScore || 0) + sub.correct * 10;
        markActivityToday();
        const pct = Math.round((sub.correct / sub.qs.length) * 100);
        recordTestHistoryIfNeeded(sub, 'test-translate', pct);
        updateState();
        const wrap = el(`
            <div class="view session-end card">
                <h2>${t('test_translate_title')}${t('quiz_finished_suffix')}</h2>
                <div class="bignum">${pct}%</div>
                <p style="color:var(--ink-soft)">${tf('correct_of_total', {correct: sub.correct, total: sub.qs.length})}</p>
                <button class="btn btn-ghost" id="hub">${t('to_tests_btn')}</button>
            </div>
        `);
        wrap.querySelector('#hub').onclick = () => navigate('tests');
        return wrap;
    }
    if (sub.i >= sub.qs.length) sub.i = sub.qs.length - 1;
    if (sub.i < 0) sub.i = 0;

    const q = sub.qs[sub.i];
    const ans = sub.userAnswers[sub.i];
    const w = q.word;
    const dirToNo = q.dirToNo;

    const wrap = el(`<div class="view" style="max-width:600px;margin:0 auto;"></div>`);
    let dotsHtml = '<div class="test-nav">';
    sub.qs.forEach((_, idx) => {
        const a = sub.userAnswers[idx];
        let cls = 'dot';
        if (idx === sub.i) cls += ' active';
        if (a !== null) cls += a.correct ? ' correct' : ' wrong';
        dotsHtml += `<div class="${cls}" data-idx="${idx}">${idx+1}</div>`;
    });
    dotsHtml += '</div>';
    const dotsWrap = el(dotsHtml);
    wrap.appendChild(dotsWrap);

    const container = el(`<div style="text-align:center;margin:10px 0;"></div>`);
    wrap.appendChild(container);

    function renderTranslate() {
        container.innerHTML = '';
        const header = el(`<div class="qcounter">${t('test_translate_title')} · ${sub.i+1} / ${sub.qs.length}</div>`);
        container.appendChild(header);
        const progress = el(
            `<div class="progress-track" style="margin-bottom:12px;"><div class="progress-fill" style="width:${((sub.i+1)/sub.qs.length)*100}%"></div></div>`
        );
        container.appendChild(progress);

        // Раніше тут було жорстко закодовано "норвезькою"/"українською" —
        // тобто напрямок перекладу завжди називався норвезьким, навіть
        // якщо STATE.targetLang був іспанською чи будь-якою іншою мовою.
        // Раніше підказка й очікувана відповідь завжди були українською
        // (w.uk) — тепер локалізуються через wordTranslation(), як і
        // решта тестів.
        const translated = wordTranslation(w, LD().level);
        const promptLangName = dirToNo ? targetLangDisplayName(STATE.targetLang || 'no') : interfaceLangName(STATE.vocabLang || 'uk');
        const promptWord = dirToNo ? translated : w.no;
        const prompt = tf('write_in_lang_prompt', { word: escHtml(promptWord), lang: promptLangName });
        const qText = el(`<div class="question-text" style="font-size:1.1rem;margin-bottom:16px;">${prompt}</div>`);
        container.appendChild(qText);

        const input = el(`<input class="type-input" id="tIn" placeholder="${t('your_answer_placeholder')}" ${ans!==null?'disabled':''}>`);
        container.appendChild(input);
        if (ans !== null) input.value = ans.input;
        const fb = el(`<div id="tFb"></div>`);
        container.appendChild(fb);
        const btn = el(`<button class="btn btn-primary" id="tCheck" ${ans!==null?'disabled':''}>${t('check_btn')}</button>`);
        container.appendChild(btn);

        if (ans !== null) {
            fb.innerHTML =
                `<div class="feedback-banner ${ans.correct?'ok':'bad'}">${ans.correct? t('check_correct') : tf('check_wrong_prefix', {answer: ans.correctAnswer})}</div>`;
        }

        btn.onclick = () => {
            const val = input.value.trim();
            const target = dirToNo ? w.no : translated;
            const correct = isFuzzyMatch(val, target);
            sub.userAnswers[sub.i] = { input: val, correct: correct, correctAnswer: target };
            if (correct) sub.correct = (sub.correct || 0) + 1;
            fb.innerHTML =
                `<div class="feedback-banner ${correct?'ok':'bad'}">${correct? t('check_correct') : tf('check_wrong_prefix', {answer: target})}</div>`;
            btn.disabled = true;
            input.disabled = true;
            updateDotsTranslate();
            setTimeout(() => {
                let nextIdx = sub.i + 1;
                while (nextIdx < sub.qs.length && sub.userAnswers[nextIdx] !== null) nextIdx++;
                if (nextIdx < sub.qs.length) sub.i = nextIdx;
                else sub.i = sub.qs.length;
                navigate('test-translate', sub);
            }, 2000);
        };
        input.onkeydown = (e) => { if (e.key === 'Enter') btn.click(); };

        const controls = el(`<div class="test-controls">
            <button class="btn btn-ghost btn-sm" id="prevBtn" ${sub.i===0?'disabled':''}>${t('prev_btn')}</button>
            <button class="btn btn-primary btn-sm" id="nextBtn" ${sub.i>=sub.qs.length-1?'disabled':''}>${t('next_btn2')}</button>
        </div>`);
        container.appendChild(controls);
        controls.querySelector('#prevBtn').onclick = () => {
            if (sub.i > 0) { sub.i--;
                navigate('test-translate', sub); }
        };
        controls.querySelector('#nextBtn').onclick = () => {
            let nextIdx = sub.i + 1;
            while (nextIdx < sub.qs.length && sub.userAnswers[nextIdx] !== null) nextIdx++;
            if (nextIdx < sub.qs.length) sub.i = nextIdx;
            else sub.i = sub.qs.length;
            navigate('test-translate', sub);
        };
    }

    function updateDotsTranslate() {
        const dots = dotsWrap.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            const a = sub.userAnswers[idx];
            dot.className = 'dot';
            if (idx === sub.i) dot.classList.add('active');
            if (a !== null) dot.classList.add(a.correct ? 'correct' : 'wrong');
        });
    }
    renderTranslate();
    dotsWrap.querySelectorAll('.dot').forEach(dot => {
        dot.onclick = () => {
            const idx = parseInt(dot.dataset.idx);
            if (idx !== sub.i) { sub.i = idx;
                navigate('test-translate', sub); }
        };
    });
    return wrap;
}

// =====================================================================
//  GRAMMAR
// =====================================================================

function viewGrammar() {
    const lang = STATE.targetLang || 'no';
    const userLevel = LD().level || 'A1';

    // Раніше показувались правила ЛИШЕ поточного рівня користувача —
    // хтось на A1 взагалі не бачив, що в граматиці є, наприклад, на B1.
    // Тепер вкладка одразу показує правила ВСІХ рівнів (A1–C2), а фільтр
    // рівнів зверху — це лише зручність навігації по довгому списку, не
    // обмеження: за замовчуванням обрано "Усі".
    const hasBuiltinGrammar = !!(window.LANG_DATA && window.LANG_DATA[lang] && window.LANG_DATA[lang].GRAMMAR);
    if (!hasBuiltinGrammar) LEVELS.forEach(lvl => ensureGrammarAvailable(lang, lvl));

    const rulesByLevel = {};
    LEVELS.forEach(lvl => { rulesByLevel[lvl] = grammarForLevel(lvl, lang); });
    const allRules = LEVELS.flatMap(lvl => rulesByLevel[lvl]);
    const totalMissing = LEVELS.filter(lvl => rulesByLevel[lvl].length === 0).length;

    const wrap = el(`
        <div class="view">
            <h1>${t('h_grammar')}</h1>
            <input class="type-input" id="gsearch" placeholder="${t('search_placeholder')}" style="max-width:100%;margin-bottom:12px;padding:10px 14px;font-size:.9rem;">
            <div id="gramLevelFilter" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;"></div>
            <div id="gramNotice"></div>
            <div id="gramlist"></div>
        </div>
    `);
    const list = wrap.querySelector('#gramlist');
    let activeLevel = 'all';

    // ---- Фільтр рівнів ----
    const filterBar = wrap.querySelector('#gramLevelFilter');
    const levelChips = [{ code: 'all', label: t('grammar_all_levels') }].concat(
        LEVELS.map(lvl => ({ code: lvl, label: `${lvl}${rulesByLevel[lvl].length ? ` (${rulesByLevel[lvl].length})` : ''}` }))
    );
    levelChips.forEach(({ code, label }) => {
        const chip = el(`<button class="chip ${code === 'all' ? 'active' : ''}">${label}</button>`);
        chip.onclick = () => {
            activeLevel = code;
            filterBar.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            renderList(wrap.querySelector('#gsearch').value);
        };
        filterBar.appendChild(chip);
    });

    if (lang !== 'no') {
        const langName = targetLangName(lang);
        const notice = el(totalMissing > 0 ? `
            <div class="card" style="margin-bottom:16px;color:var(--ink-soft);font-size:.9rem;">
                🤖 ${tf('grammar_generating_notice_all', {lang: langName})}
            </div>
        ` : `
            <div class="card" style="margin-bottom:16px;color:var(--ink-soft);font-size:.85rem;">
                🤖 ${tf('grammar_ai_generated_notice_all', {lang: langName})}
            </div>
        `);
        wrap.querySelector('#gramNotice').appendChild(notice);
    }

    function renderList(filter) {
        list.innerHTML = "";
        const source = activeLevel === 'all' ? allRules : rulesByLevel[activeLevel];
        source.filter(g => !filter || grammarLocalized(g, 'title').toLowerCase().includes(filter.toLowerCase())).forEach(g => {
            const title = grammarLocalized(g, 'title');
            const exp = grammarLocalized(g, 'exp');
            const head = grammarLocalizedHead(g);
            const q = { q: grammarLocalizedQ(g), opts: g.ex.opts, a: g.ex.a };
            const item = el(`
                <div class="gram-item">
                    <div class="gram-head"><h3>${escHtml(title)}</h3><span class="tag level-${g.level}">${g.level}</span></div>
                    <div class="gram-body">
                        <p>${escHtml(exp)}</p>
                        <table><thead><tr>${head.map(h=>`<th>${escHtml(h)}</th>`).join('')}</tr></thead>
                        <tbody>${g.table.rows.map(r=>`<tr>${r.map(c=>`<td>${escHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>
                        <div class="miniex"></div>
                    </div>
                </div>
            `);
            const headEl = item.querySelector('.gram-head');
            const body = item.querySelector('.gram-body');
            headEl.onclick = () => body.classList.toggle('open');
            const mini = item.querySelector('.miniex');
            const qEl = el(
                `<div><p style="font-weight:600;margin-top:10px;">${escHtml(q.q)}</p><div class="mc-options"></div></div>`
            );
            const opts = qEl.querySelector('.mc-options');
            q.opts.forEach((opt, idx) => {
                const b = el(`<button class="mc-opt">${escHtml(opt)}</button>`);
                b.onclick = () => {
                    opts.querySelectorAll('.mc-opt').forEach((o, oi) => { o.disabled = true; if (oi === q
                            .a) o.classList.add('correct');
                        else if (oi === idx) o.classList.add('wrong'); });
                    markActivityToday();
                };
                opts.appendChild(b);
            });
            mini.appendChild(qEl);
            list.appendChild(item);
        });
        if (!source.length) {
            list.innerHTML = `<div class="card"><p style="color:var(--ink-soft);">${t('grammar_empty')}</p></div>`;
        }
    }
    renderList('');
    wrap.querySelector('#gsearch').oninput = (e) => renderList(e.target.value);
    return wrap;
}

// =====================================================================
//  TROLL
// =====================================================================

function viewTroll() {
    ensureStateDefaults(STATE);
    checkTrollUnlocks();
    const xp = LD().xp || 0;
    const { lvl, curFloor, nextCeil, pct } = xpProgress(xp);
    const wrap = el(`
        <div class="view">
            <h1>${t('h_troll')}</h1>
            <div class="card" style="margin-bottom:20px;">
                <div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap;">
                    <div id="trollDisplay"></div>
                    <div style="flex:1;min-width:220px;">
                        <span class="troll-level-badge">${tf('troll_level_badge', {lvl})}</span>
                        <div style="margin-top:10px;">
                            <div class="xp-bar-track"><div class="xp-bar-fill" style="width:${pct}%"></div></div>
                            <p style="font-size:.78rem;color:var(--ink-soft);margin-top:6px;font-family:'JetBrains Mono',monospace;">${tf('xp_to_next', {xp, remaining: nextCeil - xp})}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card" style="margin-bottom:20px;">
                <h3>${t('gear_title')}</h3>
                <p style="color:var(--ink-soft);font-size:.85rem;margin-bottom:12px;">${t('gear_desc')}</p>
                <div class="gear-row" id="gearRow"></div>
            </div>
            <div class="card">
                <h3>${tf('achievements_title', {unlocked: LD().achievements.length, total: ACHIEVEMENTS.length})}</h3>
                <div class="ach-grid" id="achGrid" style="margin-top:12px;"></div>
            </div>
        </div>
    `);

    function currentMood() {
        if (pct >= 80) return 'excited';
        if (LD().achievements.length >= 3) return 'happy';
        return 'idle';
    }

    function redrawTroll() {
        const disp = wrap.querySelector('#trollDisplay');
        const equipped = STATE.trollGear.equipped || { hat: null, glasses: null, bg: null };
        disp.innerHTML = trollSVG(currentMood(), 96, equipped);
    }
    redrawTroll();

    const gearRow = wrap.querySelector('#gearRow');

    function redrawGear() {
        gearRow.innerHTML = '';
        TROLL_UNLOCKABLES.forEach(item => {
            const unlocked = STATE.trollGear.unlocked.includes(item.id);
            const equipped = STATE.trollGear.equipped[item.type] === item.id;
            const badge = el(`<div class="gear-badge ${unlocked?'':'locked'} ${equipped?'equipped':''}" title="${gearItemName(item)}${unlocked?'':' ('+t('level_word')+' '+item.unlockLevel+')'}">${gearIconSVG(item, 34)}</div>`);
            if (unlocked) {
                badge.onclick = () => {
                    STATE.trollGear.equipped[item.type] = equipped ? null : item.id;
                    updateState();
                    redrawGear();
                    redrawTroll();
                };
            }
            gearRow.appendChild(badge);
        });
    }
    redrawGear();

    const achGrid = wrap.querySelector('#achGrid');
    ACHIEVEMENTS.forEach(a => {
        const unlocked = LD().achievements.includes(a.id);
        achGrid.appendChild(el(`
            <div class="ach-item ${unlocked?'unlocked':'locked'}">
                <div class="ach-icon">${unlocked?'🏆':'🔒'}</div>
                <div style="font-weight:700;">${achievementName(a)}</div>
                <div style="color:var(--ink-soft);font-size:.72rem;margin-top:2px;">${achievementDesc(a)}</div>
            </div>
        `));
    });
    return wrap;
}
