        // =====================================================================
        //  VIEWS – повний набір сторінок
        // =====================================================================

        function viewHome() {
    ensureStateDefaults(STATE);
    const level = STATE.level || "A1";
    const meta = LEVEL_META[level];
    const vocab = vocabForLevel(level);
    const total = vocab.length;

    // ----- НОВА ЛОГІКА ПРОГРЕСУ -----
    // 1. Слова, які користувач вже бачив (є в stats.wordsSeen)
    const seenKeys = Object.keys(STATE.stats.wordsSeen || {});
    const seenCount = vocab.filter(w => {
        const key = wordKey(Object.assign({ level }, w));
        return seenKeys.includes(key);
    }).length;

    // 2. Слова, які користувач засвоїв (reps >= 2)
    const mastered = vocab.filter(w => {
        const s = getSrs(wordKey(Object.assign({ level }, w)));
        return s && s.reps >= 2;
    }).length;

    // 3. Відсоток – на основі переглянутих слів
    const pct = total ? Math.round((seenCount / total) * 100) : 0;
    // ----- КІНЕЦЬ НОВОЇ ЛОГІКИ -----

    const dw = pickDailyWord();
    const { lvl: trollLvl, pct: trollPct } = xpProgress(STATE.xp || 0);
    const metaLoc = levelMetaLocalized(level);
    const dg = getDailyGoal();
    const freezes = STATE.streakFreezes || 0;
    const ringR = 26, ringC = 2 * Math.PI * ringR;
    const dgLang = STATE.uiLang || 'uk';
    const dgTexts = {
        uk: { title: '🎯 Щоденна ціль', done: 'Виконано! Сьогоднішня серія в безпеці. Приходьте завтра 🔥', progress: (c,t)=>`${c}/${t} — ще трохи, і серія за сьогодні в безпеці`, cont: 'Продовжити →', freezeTitle: 'Заморозки серії — рятують стрік, якщо пропустите день' },
        en: { title: '🎯 Daily goal', done: "Done! Today's streak is safe. Come back tomorrow 🔥", progress: (c,t)=>`${c}/${t} — a bit more and today's streak is safe`, cont: 'Continue →', freezeTitle: "Streak freezes — save your streak if you miss a day" },
        ru: { title: '🎯 Дневная цель', done: 'Готово! Сегодняшняя серия в безопасности. Приходите завтра 🔥', progress: (c,t)=>`${c}/${t} — ещё немного, и серия за сегодня в безопасности`, cont: 'Продолжить →', freezeTitle: 'Заморозки серии — спасают стрик, если пропустите день' },
    }[dgLang] || { title: '🎯 Щоденна ціль', done: 'Виконано! Сьогоднішня серія в безпеці. Приходьте завтра 🔥', progress: (c,t)=>`${c}/${t} — ще трохи, і серія за сьогодні в безпеці`, cont: 'Продовжити →', freezeTitle: 'Заморозки серії — рятують стрік, якщо пропустите день' };

    const wrap = el(`
        <div class="view">
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
                    <strong>Рівень ${rec.current} засвоєно на ${rec.pct}%!</strong>
                    <p style="font-size:.9rem;color:var(--ink-soft);margin:4px 0 0 0;">
                        Ви вивчили ${rec.mastered} із ${rec.total} слів. Рекомендуємо перейти на <strong>${rec.recommended}</strong>.
                    </p>
                </div>
                <div style="display:flex;gap:8px;">
                    <button class="btn btn-primary btn-sm" id="upgradeLevelBtn">Підвищити рівень</button>
                    <button class="btn btn-ghost btn-sm" id="dismissRecBtn">Приховати</button>
                </div>
            </div>
        </div>
    `;
})()}
            </div>
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
                        ${seenCount}/${total} переглянуто · ${mastered} засвоєно
                    </span>
                </div>
                <div class="homepick">
                    <button class="btn" data-r="flashcards">📇 Вчити слова</button>
                    <button class="btn" data-r="vocabulary">📚 Словник</button>
                    <button class="btn" data-r="grammar">📖 Граматика</button>
                    <button class="btn" data-r="tests">📝 Тести</button>
                    <button class="btn" data-r="test-listen">🎧 Аудіювання</button>
                    <button class="btn" data-r="troll">🧌 Тролль (${trollLvl} рів.)</button>
                    <button class="btn" data-r="norskprove">🎓 Norskprøve</button>
                </div>
            </div>

            <div class="grid cols-2">
                <div class="card">
                    <h3>Слово дня</h3>
                    ${dw? `
                    <div class="dailyword">
                        <button class="soundbtn" id="dwSound">🔊</button>
                        <div>
                            <div class="word-no">${escHtml(dw.no)}</div>
                            <div class="word-uk">${escHtml(wordTranslation(dw, level))}</div>
                        </div>
                    </div>
                    <p style="color:var(--ink-soft);font-style:italic;margin-top:10px;font-size:.9rem;">${escHtml(dw.ex_no)}<br><span style="font-style:normal;font-size:.8rem;">${escHtml(wordExampleTranslation(dw, level))}</span></p>
                    ` : `<p>Немає слів для цього рівня.</p>`}
                </div>
                <div class="card">
                    <h3>Активність</h3>
                    <p style="color:var(--ink-soft);font-size:.85rem;">Серія днів: <b class="mono">${STATE.streak||0} 🔥</b> · XP: <b class="mono">${STATE.xp||0}</b></p>
                    ${renderWeekStrip()}
                    <div class="xp-bar-track" style="margin-top:10px;"><div class="xp-bar-fill" style="width:${trollPct}%"></div></div>
                    <button class="btn btn-ghost btn-sm" style="margin-top:12px;" data-r="profile">Детальна статистика →</button>
                </div>
            </div>

            <div class="card" style="margin-top:16px;">
                <h3>Рівень: ${level}</h3>
                <p style="color:var(--ink-soft);font-size:.85rem;">Хочете змінити рівень або пройти тест повторно?</p>
                <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
                    <button class="btn btn-ghost btn-sm" data-r="levels">Обрати рівень вручну</button>
                    <button class="btn btn-ghost btn-sm" id="retest">Пройти тест рівня знову</button>
                </div>
            </div>
        </div>
    `);

    wrap.querySelector('#trollGreetSlot').appendChild(renderTrollBubble('idle', 'greeting', 64));
    wrap.querySelectorAll('[data-r]').forEach(b => b.onclick = () => navigate(b.dataset.r));
    const snd = wrap.querySelector('#dwSound');
    if (snd && dw) snd.onclick = () => speak(dw.no);
    const rt = wrap.querySelector('#retest');
    if (rt) rt.onclick = () => navigate('leveltest');
    const upgradeBtn = wrap.querySelector('#upgradeLevelBtn');
    if (upgradeBtn) {
        upgradeBtn.onclick = () => {
            const rec = getLevelRecommendation();
            if (rec) {
                STATE.level = rec.recommended;
                STATE.levelTestDone = true;
                updateState();
                toast(`Рівень підвищено до ${rec.recommended}!`);
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

    return wrap;
}

        function pickDailyWord() {
            const pool = allVocabUpTo(STATE.level || "A1");
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
            const dates = STATE.stats?.activityDates || [];
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

        // ---- LEVELS & LEVEL TEST ----
        function viewLevels() {
            const wrap = el(
                `<div class="view"><h1>${t('h_pick_level')}</h1><p style="color:var(--ink-soft);margin-bottom:16px;">${t('level_change_note')}</p><div class="grid cols-3" id="lvlgrid"></div></div>`
                );
            const grid = wrap.querySelector('#lvlgrid');
            LEVELS.forEach(lv => {
                const meta = levelMetaLocalized(lv);
                const card = el(`
              <div class="card level-card ${STATE.level===lv?'current':''}">
                <span class="tag level-${lv}">${lv}</span>
                <h3 style="margin-top:8px;">${meta.name}</h3>
                <div class="lname">${meta.desc}</div>
                <div class="level-topics">${LEVEL_META[lv].topics.map(top=>`<span>${top}</span>`).join('')}</div>
              </div>
            `);
                card.onclick = () => {
                    STATE.level = lv;
                    STATE.levelTestDone = true;
                    markActivityToday();
                    updateState();
                    toast(`Рівень встановлено: ${lv}`);
                    navigate('home');
                };
                grid.appendChild(card);
            });
            return wrap;
        }

        function viewLevelTest() {
            if (!SUBSTATE.i) { SUBSTATE.i = 0;
                SUBSTATE.answers = []; }
            const i = SUBSTATE.i;
            if (i >= LEVEL_TEST.length) {
                const level = computeTestLevel(SUBSTATE.answers);
                STATE.level = level;
                STATE.levelTestDone = true;
                markActivityToday();
                checkAchievements();
                updateState();
                const resultView = el(`
              <div class="view onb-wrap" style="max-width:500px;margin:30px auto;text-align:center;">
                <h1>${t('h_your_level')}</h1>
                <div class="tag level-${level}" style="font-size:1rem;padding:6px 18px;margin:12px 0;">${level}</div>
                <p style="color:var(--ink-soft)">${LEVEL_META[level].desc}</p>
                <div style="display:flex;justify-content:center;margin:16px 0;"></div>
                <button class="btn btn-primary" id="goHome">Почати навчання</button>
              </div>
            `);
                const trollSlot = resultView.querySelector('div[style*="justify-content:center"]');
                trollSlot.appendChild(renderTrollBubble('excited', 'levelUp', 64));
                resultView.querySelector('#goHome').onclick = () => navigate('home');
                return resultView;
            }
            const q = LEVEL_TEST[i];
            const wrap = el(`
            <div class="view" style="max-width:500px;margin:20px auto;text-align:center;">
              <div class="qcounter">Питання ${i+1} з ${LEVEL_TEST.length}</div>
              <div class="progress-track" style="margin-bottom:18px;"><div class="progress-fill" style="width:${(i/LEVEL_TEST.length)*100}%"></div></div>
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

        // ---- FLASHCARDS ----
       function viewFlashDeckPicker() {
  const level = SUBSTATE.level || STATE.level || "A1";
  const words = vocabForLevel(level);
  const topics = [...new Set(words.map(w => w.t))];
  const topic = SUBSTATE.topic || "Усі теми";
  const mode = SUBSTATE.mode || "flip";
  const allMode = SUBSTATE.allMode || false;

  const wrap = el(`
    <div class="view">
      <h1>${t('h_flashcards')}</h1>
      <p style="color:var(--ink-soft);font-size:.9rem;">Оберіть рівень, тему та режим тренування.</p>
      <div class="deckpicker" id="lvlpick"></div>
      <div class="deckpicker" id="topicpick"></div>
      <div class="deckpicker" id="modepick"></div>
      <div class="deckpicker" id="allmodepick">
        <button class="chip ${!allMode?'active':''}" data-all="false">📅 За розкладом (SRS)</button>
        <button class="chip ${allMode?'active':''}" data-all="true">📚 Всі картки</button>
      </div>
      <div class="card" id="deckInfo" style="margin-top:8px;"></div>
    </div>
  `);

  const lvlpick = wrap.querySelector('#lvlpick');
  LEVELS.forEach(lv => {
    const c = el(`<button class="chip ${lv===level?'active':''}">${lv}</button>`);
    c.onclick = () => navigate('flashcards', { level: lv, topic, mode, allMode });
    lvlpick.appendChild(c);
  });

  const topicpick = wrap.querySelector('#topicpick');
  ["Усі теми", ...topics].forEach(t => {
    const c = el(`<button class="chip ${t===topic?'active':''}">${t}</button>`);
    c.onclick = () => navigate('flashcards', { level, topic: t, mode, allMode });
    topicpick.appendChild(c);
  });

  const modepick = wrap.querySelector('#modepick');
  [
    ["flip", "Запам'ятовування"],
    ["mc", "Вибір відповіді"],
    ["type", "Написання слова"]
  ].forEach(([m, label]) => {
    const c = el(`<button class="chip ${m===mode?'active':''}">${label}</button>`);
    c.onclick = () => navigate('flashcards', { level, topic, mode: m, allMode });
    modepick.appendChild(c);
  });

  wrap.querySelectorAll('#allmodepick .chip').forEach(btn => {
    btn.onclick = () => {
      const newAllMode = btn.dataset.all === 'true';
      navigate('flashcards', { level, topic, mode, allMode: newAllMode });
    };
  });

  const deckWords = topic === "Усі теми" ? words : words.filter(w => w.t === topic);
  const dueCount = deckWords.filter(w => {
    const s = getSrs(wordKey(Object.assign({ level }, w)));
    return s.due <= todayStr();
  }).length;

  const info = wrap.querySelector('#deckInfo');
  if (deckWords.length === 0) {
    info.innerHTML = `<div class="empty-state"><h3>Цей рівень ще в розробці</h3><p>Спробуйте A1–B1.</p></div>`;
  } else {
    const modeLabel = allMode ? 'всі картки' : `${dueCount} готові до повторення (SRS)`;
    const maxCards = allMode ? deckWords.length : 20;
    info.innerHTML = `
      <p style="font-size:.9rem;"><b>${deckWords.length}</b> слів у колоді · <b>${modeLabel}</b></p>
      <button class="btn btn-primary" id="startSession">Почати сесію (до ${maxCards} карток)</button>
    `;
    info.querySelector('#startSession').onclick = () => {
      navigate('flashsession', { level, topic, mode, deckWords, allMode });
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
    // Режим "Всі картки" – спочатку due, потім fresh, потім mastered
    const due = withState.filter(x => x.s.due <= todayStr() && x.s.reps > 0);
    const fresh = withState.filter(x => x.s.reps === 0);
    const mastered = withState.filter(x => x.s.reps > 0 && x.s.due > todayStr());
    return shuffle(due).concat(shuffle(fresh)).concat(shuffle(mastered));
  }

  // SRS-режим – тільки due + fresh
  const due = withState.filter(x => x.s.due <= todayStr() && x.s.reps > 0);
  const fresh = withState.filter(x => x.s.reps === 0);
  return shuffle(due).concat(shuffle(fresh)).slice(0, 20);
}

        function viewFlashSession() {
  if (!SUBSTATE.queue) {
    SUBSTATE.queue = buildQueue(SUBSTATE.deckWords, SUBSTATE.level, SUBSTATE.allMode || false);
    SUBSTATE.pos = 0;
    SUBSTATE.correct = 0;
    SUBSTATE.flipped = false;
  }
  const { queue, pos, level, mode, allMode } = SUBSTATE;

  if (queue.length === 0) {
    return el(
      `<div class="view"><div class="empty-state"><h3>Немає карток</h3><p>Усі слова заплановані на пізніше.</p><button class="btn btn-primary" onclick="navigate('flashcards')">До вибору</button></div></div>`
    );
  }
  if (pos >= queue.length) {
    markActivityToday();
    STATE.stats.sessionCount = (STATE.stats.sessionCount || 0) + 1;
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
        <h2>Сесію завершено!</h2>
        <div class="bignum">${pctCorrect}%</div>
        <p style="color:var(--ink-soft)">${SUBSTATE.correct} із ${queue.length} правильно · +${allMode ? Math.max(2, Math.round(SUBSTATE.correct * 1.5)) : Math.max(5, SUBSTATE.correct * 2)} XP</p>
        <div style="display:flex;justify-content:center;margin:14px 0;"></div>
        <div style="display:flex;gap:8px;justify-content:center;margin-top:14px;flex-wrap:wrap;">
          <button class="btn btn-primary" id="again">Ще одна сесія</button>
          <button class="btn btn-ghost" id="toHome">На головну</button>
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
      allMode: SUBSTATE.allMode
    });
    wrap.querySelector('#toHome').onclick = () => navigate('home');
    return wrap;
  }

  const item = queue[pos];
  const wrap = el(`<div class="view flash-stage"></div>`);
  const progWrap = el(`
    <div class="flash-progress">
      <div class="meta"><span>${pos+1} / ${queue.length}</span><span>${escHtml(item.w.t)}</span></div>
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
                  <div class="flip-hint">натисніть, щоб перевернути</div>
                </div>
                <div class="flip-face flip-back">
                  <div class="uk-word">${escHtml(wordTranslation(item.w, item.key.split('|')[0]))}</div>
                  <div class="example">${escHtml(item.w.ex_no)}<br>${escHtml(wordExampleTranslation(item.w, item.key.split('|')[0]))}</div>
                </div>
              </div>
            </div>
          `);
            const inner = cardWrap.querySelector('.flip-inner');
            inner.onclick = (e) => { if (e.target.id === 'fSound') return;
                inner.classList.toggle('flipped');
                SUBSTATE.flipped = inner.classList.contains('flipped');
                renderGrades(); };
            cardWrap.querySelector('#fSound').onclick = (e) => { e.stopPropagation();
                speak(item.w.no); };
            holder.appendChild(cardWrap);

            const gradeHolder = el(`<div></div>`);
            holder.appendChild(gradeHolder);

            function renderGrades() {
                gradeHolder.innerHTML = "";
                if (!SUBSTATE.flipped) return;
                const row = el(`
              <div class="grade-row">
                <button class="btn btn-danger" data-g="again">Не знаю</button>
                <button class="btn btn-amber" data-g="hard">Складно</button>
                <button class="btn btn-primary" data-g="good">Знаю</button>
              </div>
            `);
                row.querySelectorAll('[data-g]').forEach(b => b.onclick = () => {
                    gradeWord(item.key, b.dataset.g);
                    if (b.dataset.g !== 'again') SUBSTATE.correct++;
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
            head.querySelector('#mcSound').onclick = () => speak(item.w.no);

            const distractors = shuffle(deckWords.filter(w => w.no !== item.w.no)).slice(0, 3).map(w => w.uk);
            const options = shuffle([item.w.uk, ...distractors]);
            const opts = el(`<div class="mc-options"></div>`);
            options.forEach(opt => {
                const b = el(`<button class="mc-opt">${escHtml(opt)}</button>`);
                b.onclick = () => {
                    const correct = opt === item.w.uk;
                    opts.querySelectorAll('.mc-opt').forEach(o => {
                        o.disabled = true;
                        if (o.textContent === item.w.uk) o.classList.add('correct');
                        else if (o === b) o.classList.add('wrong');
                    });
                    gradeWord(item.key, correct ? 'good' : 'again');
                    if (correct) SUBSTATE.correct++;
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
            const input = el(`<input class="type-input" placeholder="напишіть тут..." autocomplete="off">`);
            holder.appendChild(input);
            const fb = el(`<div></div>`);
            holder.appendChild(fb);
            const btn = el(`<button class="btn btn-primary">Перевірити</button>`);
            holder.appendChild(btn);

            function check() {
                const val = input.value.trim();
                const target = item.w.no;
                const correct = isFuzzyMatch(val, target);
                fb.innerHTML =
                    `<div class="feedback-banner ${correct?'ok':'bad'}">${correct? 'Правильно! 🎉' : 'Правильна відповідь: '+target}</div>`;
                input.disabled = true;
                btn.disabled = true;
                gradeWord(item.key, correct ? 'good' : 'again');
                if (correct) SUBSTATE.correct++;
                setTimeout(() => { SUBSTATE.pos++;
                    navigate('flashsession', SUBSTATE); }, 1200);
            }
            btn.onclick = check;
            input.onkeydown = (e) => { if (e.key === 'Enter') check(); };
            return holder;
        }

        // ---- VOCABULARY ----
        function viewVocabulary() {
            const level = STATE.level || "A1";
            const words = vocabForLevel(level);
            const statusLabels = {
                uk: { new: 'нове', due: 'на повторення', mastered: 'засвоєне' },
                en: { new: 'new', due: 'due for review', mastered: 'mastered' },
                ru: { new: 'новое', due: 'на повторение', mastered: 'освоено' },
            }[STATE.uiLang] || { new: 'нове', due: 'на повторення', mastered: 'засвоєне' };
            const wrap = el(`
            <div class="view">
              <h1>${t('h_vocabulary')}</h1>
              <p style="color:var(--ink-soft);margin-bottom:12px;font-size:.85rem;">${t('all_level_words')} (${level}). ${t('status_label')}: <span class="status new">${statusLabels.new}</span> <span class="status due">${statusLabels.due}</span> <span class="status mastered">${statusLabels.mastered}</span></p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">
                <input class="type-input" id="vocabSearch" placeholder="${t('search_placeholder')}" style="flex:1;max-width:280px;padding:8px 14px;font-size:.85rem;">
                <select id="vocabTopic" class="chip" style="border-radius:999px;padding:6px 14px;font-size:.8rem;">
                  <option value="all">${t('all_topics')}</option>
                  ${[...new Set(words.map(w=>w.t))].map(t=>`<option value="${t}">${t}</option>`).join('')}
                </select>
                <button class="btn btn-ghost btn-sm" id="vocabGenBtn" style="white-space:nowrap;">🎲 AI: додати нові слова</button>
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
                <td><span style="font-size:.7rem;background:var(--line-soft);padding:2px 8px;border-radius:999px;">${escHtml(w.t)}</span></td>
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

            // AI-генерація нових слів: додаються в STATE.customWords і одразу
            // стають частиною словника, карток, тестів і SRS для цього рівня.
            const genBtn = wrap.querySelector('#vocabGenBtn');
            genBtn.onclick = async () => {
                genBtn.disabled = true;
                const originalLabel = genBtn.textContent;
                genBtn.textContent = '🎲 Генерую…';
                try {
                    const existingTopics = [...new Set(words.map(w => w.t))];
                    const newWords = await generateVocabWordsAI(level, existingTopics);
                    const added = addCustomWords(level, Array.isArray(newWords) ? newWords : []);
                    if (added > 0) {
                        toast(`✅ Додано нових слів: ${added}`);
                        navigate('vocabulary');
                    } else {
                        toast('🤔 AI не запропонував нових унікальних слів. Спробуй ще раз.');
                        genBtn.disabled = false;
                        genBtn.textContent = originalLabel;
                    }
                } catch (e) {
                    console.error('[Словник] Помилка генерації слів:', e);
                    toast('⚠️ Не вдалося згенерувати слова. Спробуй ще раз.');
                    genBtn.disabled = false;
                    genBtn.textContent = originalLabel;
                }
            };

            return wrap;
        }

        // ---- TESTS (з навігацією) ----
        function viewTestsHub() {
            const wrap = el(`
            <div class="view">
              <h1>${t('h_tests')}</h1>
              <p style="color:var(--ink-soft);margin-bottom:16px;">Оберіть тип вправи для рівня ${STATE.level||'A1'}.</p>
              <div class="grid cols-3" id="thub"></div>
            </div>
          `);
            const items = [
                ["test-mc", "🔤", "Вибір форми", "Оберіть правильний переклад або форму."],
                ["test-cloze", "✏️", "Заповни пропуск", "Вставте пропущене слово."],
                ["test-order", "🧩", "Склади речення", "Розташуйте слова у правильному порядку."],
                ["test-listen", "🎧", "Аудіювання", "Прослухайте слово і оберіть переклад."],
                ["test-translate", "🌐", "Переклад", "Напишіть переклад слова."],
            ];
            const grid = wrap.querySelector('#thub');
            items.forEach(([r, icon, title, desc]) => {
                const c = el(
                    `<div class="card test-type-card"><div class="icon">${icon}</div><h3>${title}</h3><p>${desc}</p><button class="btn btn-primary btn-sm">Почати</button></div>`
                    );
                c.querySelector('button').onclick = () => navigate(r);
                grid.appendChild(c);
            });
            return wrap;
        }

        function currentLevelWords() {
            const words = vocabForLevel(STATE.level || "A1");
            return words.length ? words : VOCAB.A1;
        }

        // Універсальна функція для тестів
        function runQuiz(sub, route, title) {
            if (!sub.userAnswers) {
                sub.userAnswers = new Array(sub.qs.length).fill(null);
            }
            if (sub.i >= sub.qs.length && sub.userAnswers.every(a => a !== null)) {
                STATE.stats.testsCompleted = (STATE.stats.testsCompleted || 0) + 1;
                STATE.leaderboardScore = (STATE.leaderboardScore || 0) + sub.correct * 10;
                markActivityToday();
                const pct = Math.round((sub.correct / sub.qs.length) * 100);
                if (!sub._xpGranted) {
                    sub._xpGranted = true;
                    addXP(100, 'test_complete'); // +100 XP за тест
                    checkAchievements({ perfectTest: pct === 100 });
                }
                updateState();
                const trollMood = pct >= 70 ? 'happy' : (pct >= 40 ? 'idle' : 'sad');
                const wrap = el(`
              <div class="view session-end card">
                <h2>${title}: завершено</h2>
                <div class="bignum">${pct}%</div>
                <p style="color:var(--ink-soft)">${sub.correct} із ${sub.qs.length} правильно · +100 XP</p>
                <div style="display:flex;justify-content:center;margin:16px 0;"></div>
                <button class="btn btn-ghost" id="hub">До тестів</button>
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
                html += `<button class="btn btn-ghost btn-sm" id="prevBtn" ${sub.i===0?'disabled':''}>◀ Назад</button>`;
                html +=
                    `<button class="btn btn-primary btn-sm" id="nextBtn" ${sub.i>=sub.qs.length-1?'disabled':''}>Вперед ▶</button>`;
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

                const qText = el(`<div class="question-text" style="font-size:1.1rem;margin-bottom:16px;">${escHtml(q.q)}</div>`);
                questionContainer.appendChild(qText);

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

        function viewTestMC() {
            if (!SUBSTATE.qs) {
                const level = STATE.level || "A1";
                const words = shuffle(currentLevelWords()).slice(0, 6);
                const gramQs = GRAMMAR.filter(g => g.level === (STATE.level || "A1")).map(g => ({ q: g.ex.q, opts: g.ex
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
            return runQuiz(SUBSTATE, 'test-mc', "Вибір форми");
        }

        function escapeRegex(s) {
            return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        // Норвезькі слова часто з'являються у прикладному реченні в іншій
        // формі, ніж у словнику: множина/означена форма (suppe → suppa,
        // kone → kona), дієслово без "å " та у відмінюванні (å skrive →
        // skriver) тощо. Пряме порівняння рядків тоді не знаходить збігу, і
        // вправа "заповни пропуск" показує ціле речення без жодного пропуску
        // (по суті зламану вправу). Ця функція намагається знайти потрібне
        // слово у реченні кількома способами (точний збіг → перше слово
        // фрази → корінь слова), і повертає null, якщо це справді не
        // вдається — тоді виклик відсіює таке слово з вправи заздалегідь,
        // замість показувати незламану вправу.
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
            if (!SUBSTATE.qs) {
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
                STATE.stats.testsCompleted = (STATE.stats.testsCompleted || 0) + 1;
                STATE.leaderboardScore = (STATE.leaderboardScore || 0) + sub.correct * 10;
                markActivityToday();
                updateState();
                const pct = Math.round((sub.correct / sub.qs.length) * 100);
                const wrap = el(`
              <div class="view session-end card">
                <h2>Заповни пропуск: завершено</h2>
                <div class="bignum">${pct}%</div>
                <p style="color:var(--ink-soft)">${sub.correct} із ${sub.qs.length} правильно</p>
                <button class="btn btn-ghost" id="hub">До тестів</button>
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

                const header = el(`<div class="qcounter">Заповни пропуск · ${sub.i+1} / ${sub.qs.length}</div>`);
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
              <button class="btn btn-ghost btn-sm" id="prevBtn" ${sub.i===0?'disabled':''}>◀ Назад</button>
              <button class="btn btn-primary btn-sm" id="nextBtn" ${sub.i>=sub.qs.length-1?'disabled':''}>Вперед ▶</button>
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
            if (!SUBSTATE.qs) {
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
                STATE.stats.testsCompleted = (STATE.stats.testsCompleted || 0) + 1;
                STATE.leaderboardScore = (STATE.leaderboardScore || 0) + sub.correct * 10;
                markActivityToday();
                updateState();
                const pct = Math.round((sub.correct / sub.qs.length) * 100);
                const wrap = el(`
              <div class="view session-end card">
                <h2>Склади речення: завершено</h2>
                <div class="bignum">${pct}%</div>
                <p style="color:var(--ink-soft)">${sub.correct} із ${sub.qs.length} правильно</p>
                <button class="btn btn-ghost" id="hub">До тестів</button>
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
                const header = el(`<div class="qcounter">Склади речення · ${sub.i+1} / ${sub.qs.length}</div>`);
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

                const checkBtn = el(`<button class="btn btn-primary" id="checkOrder" ${ans!==null?'disabled':''}>Перевірити</button>`);
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
                            '<span style="color:var(--ink-soft);font-size:.8rem;">Натискайте слова знизу</span>'; }
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
                        `<div class="feedback-banner ${correct?'ok':'bad'}" style="margin-top:12px;">${correct?'Правильно! 🎉':'Правильний варіант: '+q.original.join(' ')}</div>`;
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
            <button class="btn btn-ghost btn-sm" id="prevBtn" ${sub.i===0?'disabled':''}>◀ Назад</button>
            <button class="btn btn-primary btn-sm" id="nextBtn" ${sub.i>=sub.qs.length-1?'disabled':''}>Вперед ▶</button>
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
            if (!SUBSTATE.qs) {
                const words = shuffle(currentLevelWords()).slice(0, 6);
                SUBSTATE.qs = words.map(w => {
                    const distractors = shuffle(currentLevelWords().filter(x => x.no !== w.no)).slice(0, 3).map(x => x
                        .uk);
                    const opts = shuffle([w.uk, ...distractors]);
                    return { no: w.no, opts, a: opts.indexOf(w.uk) };
                });
                SUBSTATE.i = 0;
                SUBSTATE.correct = 0;
                SUBSTATE.userAnswers = null;
            }
            return runQuiz(SUBSTATE, 'test-listen', "Аудіювання");
        }

        function viewTestTranslate() {
            if (!SUBSTATE.qs) {
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
                STATE.stats.testsCompleted = (STATE.stats.testsCompleted || 0) + 1;
                STATE.leaderboardScore = (STATE.leaderboardScore || 0) + sub.correct * 10;
                markActivityToday();
                updateState();
                const pct = Math.round((sub.correct / sub.qs.length) * 100);
                const wrap = el(`
              <div class="view session-end card">
                <h2>Переклад: завершено</h2>
                <div class="bignum">${pct}%</div>
                <p style="color:var(--ink-soft)">${sub.correct} із ${sub.qs.length} правильно</p>
                <button class="btn btn-ghost" id="hub">До тестів</button>
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
                const header = el(`<div class="qcounter">Переклад · ${sub.i+1} / ${sub.qs.length}</div>`);
                container.appendChild(header);
                const progress = el(
                    `<div class="progress-track" style="margin-bottom:12px;"><div class="progress-fill" style="width:${((sub.i+1)/sub.qs.length)*100}%"></div></div>`
                    );
                container.appendChild(progress);

                const prompt = dirToNo ? `Напишіть норвезькою: «${escHtml(w.uk)}»` :
                    `Напишіть українською: «${escHtml(w.no)}»`;
                const qText = el(`<div class="question-text" style="font-size:1.1rem;margin-bottom:16px;">${escHtml(prompt)}</div>`);
                container.appendChild(qText);

                const input = el(`<input class="type-input" id="tIn" placeholder="ваша відповідь" ${ans!==null?'disabled':''}>`);
                container.appendChild(input);
                if (ans !== null) input.value = ans.input;
                const fb = el(`<div id="tFb"></div>`);
                container.appendChild(fb);
                const btn = el(`<button class="btn btn-primary" id="tCheck" ${ans!==null?'disabled':''}>Перевірити</button>`);
                container.appendChild(btn);

                if (ans !== null) {
                    fb.innerHTML =
                        `<div class="feedback-banner ${ans.correct?'ok':'bad'}">${ans.correct?'Правильно! 🎉':'Правильна відповідь: '+ans.correctAnswer}</div>`;
                }

                btn.onclick = () => {
                    const val = input.value.trim();
                    const target = dirToNo ? w.no : w.uk;
                    const correct = isFuzzyMatch(val, target);
                    sub.userAnswers[sub.i] = { input: val, correct: correct, correctAnswer: target };
                    if (correct) sub.correct = (sub.correct || 0) + 1;
                    fb.innerHTML =
                        `<div class="feedback-banner ${correct?'ok':'bad'}">${correct?'Правильно! 🎉':'Правильна відповідь: '+target}</div>`;
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
              <button class="btn btn-ghost btn-sm" id="prevBtn" ${sub.i===0?'disabled':''}>◀ Назад</button>
              <button class="btn btn-primary btn-sm" id="nextBtn" ${sub.i>=sub.qs.length-1?'disabled':''}>Вперед ▶</button>
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

        // ---- GRAMMAR ----
        function viewGrammar() {
            const wrap = el(
                `<div class="view"><h1>${t('h_grammar')}</h1><input class="type-input" id="gsearch" placeholder="${t('search_placeholder')}" style="max-width:100%;margin-bottom:16px;padding:10px 14px;font-size:.9rem;"><div id="gramlist"></div></div>`
                );
            const list = wrap.querySelector('#gramlist');

            function renderList(filter) {
                list.innerHTML = "";
                GRAMMAR.filter(g => !filter || g.title.toLowerCase().includes(filter.toLowerCase())).forEach(g => {
                    const item = el(`
                <div class="gram-item">
                  <div class="gram-head"><h3>${g.title}</h3><span class="tag level-${g.level}">${g.level}</span></div>
                  <div class="gram-body">
                    <p>${g.exp}</p>
                    <table><thead><tr>${g.table.head.map(h=>`<th>${h}</th>`).join('')}</tr></thead>
                    <tbody>${g.table.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>
                    <div class="miniex"></div>
                  </div>
                </div>
              `);
                    const head = item.querySelector('.gram-head');
                    const body = item.querySelector('.gram-body');
                    head.onclick = () => body.classList.toggle('open');
                    const mini = item.querySelector('.miniex');
                    const q = g.ex;
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
            }
            renderList('');
            wrap.querySelector('#gsearch').oninput = (e) => renderList(e.target.value);
            return wrap;
        }

        // ---- TROLL ----
        function viewTroll() {
            ensureStateDefaults(STATE);
            checkTrollUnlocks();
            const xp = STATE.xp || 0;
            const { lvl, curFloor, nextCeil, pct } = xpProgress(xp);
            const wrap = el(`
            <div class="view">
              <h1>${t('h_troll')}</h1>
              <div class="card" style="margin-bottom:20px;">
                <div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap;">
                  <div id="trollDisplay"></div>
                  <div style="flex:1;min-width:220px;">
                    <span class="troll-level-badge">Рівень тролля ${lvl}</span>
                    <div style="margin-top:10px;">
                      <div class="xp-bar-track"><div class="xp-bar-fill" style="width:${pct}%"></div></div>
                      <p style="font-size:.78rem;color:var(--ink-soft);margin-top:6px;font-family:'JetBrains Mono',monospace;">${xp} XP (до наступного рівня: ${nextCeil - xp} XP)</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card" style="margin-bottom:20px;">
                <h3>Спорядження</h3>
                <p style="color:var(--ink-soft);font-size:.85rem;margin-bottom:12px;">Розблоковується з підвищенням рівня тролля. Натисніть, щоб одягнути/зняти.</p>
                <div class="gear-row" id="gearRow"></div>
              </div>
              <div class="card">
                <h3>Досягнення (${STATE.achievements.length}/${ACHIEVEMENTS.length})</h3>
                <div class="ach-grid" id="achGrid" style="margin-top:12px;"></div>
              </div>
            </div>
          `);

            function currentMood() {
                if (pct >= 80) return 'excited';
                if (STATE.achievements.length >= 3) return 'happy';
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
                const unlocked = STATE.achievements.includes(a.id);
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

