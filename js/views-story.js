// =====================================================================
//  ХРОНІКИ ТРОЛЛЯ: екран читання
// =====================================================================

function viewStory() {
    const story = ensureStoryState();
    const wrap = el(`
        <div class="view" style="max-width:680px;margin:0 auto;">
            <h1>🧌 ${t('story_title')}</h1>
            <p style="color:var(--ink-soft);margin-bottom:6px;">${t('story_intro')}</p>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:6px;">
                <p style="color:var(--ink-soft);font-size:.78rem;margin:0;">${tf('story_chapters_today', {n: story.chaptersToday || 0})}</p>
                ${story.history.length > 0 ? `<button class="btn btn-ghost btn-sm" id="storyRestartBtn" style="font-size:.75rem;padding:4px 10px;">🔄 ${t('story_restart_btn')}</button>` : ''}
            </div>
            <div id="storyTrollSlot" style="display:flex;justify-content:center;margin-bottom:16px;"></div>
            <div id="storyBody"></div>
        </div>
    `);
    wrap.querySelector('#storyTrollSlot').appendChild(renderTrollBubble('excited', 'greeting', 64));
    const restartBtn = wrap.querySelector('#storyRestartBtn');
    if (restartBtn) restartBtn.onclick = () => {
        if (confirm(t('story_restart_confirm'))) {
            resetStory();
            navigate('story');
        }
    };

    const body = wrap.querySelector('#storyBody');

    function renderLastChapter() {
        body.innerHTML = '';
        const last = story.history[story.history.length - 1];

        if (!last) {
            // Ще жодного розділу — пропозиція почати.
            const startCard = el(`
                <div class="card" style="text-align:center;">
                    <p style="margin-bottom:14px;">${t('story_empty_desc')}</p>
                    <button class="btn btn-primary" id="storyStartBtn">✨ ${t('story_start_btn')}</button>
                </div>
            `);
            startCard.querySelector('#storyStartBtn').onclick = () => runChapter(null);
            body.appendChild(startCard);
            return;
        }

        // Історія попередніх розділів (згорнута), потім поточний розділ.
        if (story.history.length > 1) {
            const histToggle = el(`<button class="btn btn-ghost btn-sm" id="storyHistToggle" style="margin-bottom:12px;">📜 ${tf('story_chapters_so_far', {n: story.history.length})}</button>`);
            const histBody = el(`<div id="storyHistBody" style="display:none;margin-bottom:16px;"></div>`);
            histToggle.onclick = () => {
                const open = histBody.style.display !== 'none';
                histBody.style.display = open ? 'none' : 'block';
            };
            histBody.innerHTML = story.history.slice(0, -1).map(ch => `
                <div class="card" style="margin-bottom:10px;font-size:.88rem;">
                    <p style="color:var(--ink-soft);font-size:.75rem;margin:0 0 6px;">${tf('books_chapter_n', {n: ch.chapterIndex})}</p>
                    <p style="margin:0;">${escHtml(ch.text)}</p>
                    ${ch.choiceMade ? `<p style="margin:8px 0 0;color:var(--teal);font-weight:600;">→ ${escHtml(ch.choiceMade)}</p>` : ''}
                </div>
            `).join('');
            body.appendChild(histToggle);
            body.appendChild(histBody);
        }

        const chapterCard = el(`
            <div class="card">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <p style="color:var(--ink-soft);font-size:.75rem;margin:0;">${tf('books_chapter_n', {n: last.chapterIndex})}</p>
                    <button class="soundbtn" id="storyListenBtn" title="${t('btn_listen')}">🔊</button>
                </div>
                <div id="storyText" style="line-height:1.9;font-size:1.02rem;margin-bottom:8px;"></div>
                ${last.newWords && last.newWords.length ? `
                    <div style="margin:14px 0;padding:10px 12px;background:var(--cream);border-radius:10px;font-size:.85rem;">
                        ✨ ${t('story_new_words_label')}:
                        <div id="storyNewWordsList" style="display:flex;flex-wrap:wrap;gap:10px;margin-top:6px;"></div>
                    </div>
                ` : ''}
                <div id="storyChoices" style="display:flex;flex-direction:column;gap:8px;margin-top:16px;"></div>
            </div>
        `);
        body.appendChild(chapterCard);
        chapterCard.querySelector('#storyListenBtn').onclick = () => speak(last.text, STATE.targetLang || 'no');

        const newWordsList = chapterCard.querySelector('#storyNewWordsList');
        if (newWordsList && last.newWords) {
            last.newWords.forEach(w => {
                const pron = wordPron(w);
                const item = el(`<span style="display:inline-flex;align-items:center;gap:4px;"><strong>${escHtml(w.no)}</strong>${pron ? ` <span style="color:var(--ink-soft);font-size:.8rem;">[${escHtml(pron)}]</span>` : ''} — ${escHtml(w.uk)}</span>`);
                const mic = renderMicButton(w.no, STATE.targetLang);
                if (mic) { mic.style.padding = '2px 6px'; mic.style.fontSize = '.8rem'; item.appendChild(mic); }
                newWordsList.appendChild(item);
            });
        }

        // Той самий клікабельний-для-перекладу рендер тексту, що й у книгах —
        // читач може торкнутись будь-якого слова, щоб побачити переклад.
        const textEl = chapterCard.querySelector('#storyText');
        const lang = STATE.targetLang || 'no';
        splitIntoParagraphs(last.text).forEach(p => {
            const pEl = document.createElement('p');
            pEl.style.marginBottom = '10px';
            const tokens = p.split(/([^\wа-яіїєґА-ЯІЇЄҐàáâäãåæçèéêëìíîïñòóôöõøùúûüýÿœÀ-Ÿ]+)/);
            tokens.forEach(tok => {
                if (!tok) return;
                if (/[\wа-яіїєґА-ЯІЇЄҐàáâäãåæçèéêëìíîïñòóôöõøùúûüýÿœÀ-Ÿ]/.test(tok)) {
                    const span = document.createElement('span');
                    span.className = 'book-word';
                    span.textContent = tok;
                    span.onclick = () => showWordTranslation(span, tok, p, lang);
                    pEl.appendChild(span);
                } else {
                    pEl.appendChild(document.createTextNode(tok));
                }
            });
            textEl.appendChild(pEl);
        });

        const choicesEl = chapterCard.querySelector('#storyChoices');
        // Самі варіанти вибору для НАЙОСТАННІШОГО розділу підставляє
        // runChapter() одразу після виклику renderLastChapter() — вони не
        // зберігаються в history (для вже пройдених розділів вибір давно
        // зроблено, показувати кнопки вибору знову немає сенсу).
        return choicesEl;
    }

    async function runChapter(choiceText) {
        body.innerHTML = `
            <div class="card" style="text-align:center;color:var(--ink-soft);padding:28px 16px;">
                <div style="font-size:2rem;margin-bottom:8px;">🧌</div>
                ${t('story_generating')}
            </div>
        `;
        try {
            const result = await generateStoryChapter(choiceText);
            const choicesEl = renderLastChapter();
            if (choicesEl && result.choices.length) {
                result.choices.forEach(choice => {
                    const b = el(`<button class="btn btn-ghost" style="text-align:left;">${escHtml(choice)} →</button>`);
                    b.onclick = () => runChapter(choice);
                    choicesEl.appendChild(b);
                });
            } else if (choicesEl) {
                const contBtn = el(`<button class="btn btn-primary" id="storyContinueBtn">${t('story_continue_btn')} →</button>`);
                contBtn.onclick = () => runChapter(STORY_CONTINUE_SIGNAL);
                choicesEl.appendChild(contBtn);
            }
            if (result.xpGained) toast(tf('story_xp_toast', { xp: result.xpGained }));
            // Лічильник розділів за день і кнопка рестарту стоять у "шапці"
            // екрана, яка будується один раз при відкритті вкладки — без
            // цього оновлення вони лишались би застарілими (наприклад,
            // кнопка рестарту не з'явилась би одразу після першого
            // розділу, доки людина не перейде на вкладку заново).
            const counterEl = wrap.querySelector('p[style*="font-size:.78rem"]');
            if (counterEl) counterEl.textContent = tf('story_chapters_today', { n: story.chaptersToday || 0 });
            if (!wrap.querySelector('#storyRestartBtn') && story.history.length > 0) {
                const headerRow = counterEl ? counterEl.parentElement : null;
                if (headerRow) {
                    const btn = el(`<button class="btn btn-ghost btn-sm" id="storyRestartBtn" style="font-size:.75rem;padding:4px 10px;">🔄 ${t('story_restart_btn')}</button>`);
                    btn.onclick = () => {
                        if (confirm(t('story_restart_confirm'))) { resetStory(); navigate('story'); }
                    };
                    headerRow.appendChild(btn);
                }
            }
        } catch (e) {
            console.error('[Хроніки Тролля] Помилка генерації розділу:', e);
            let reason = e && e.message || 'невідома помилка';
            if (e && e.code === 'PROXY_ERROR') {
                reason = e.status === 429 ? t('story_error_rate_limit') : `код ${e.status}`;
            } else if (e && e.code === 'NETWORK_ERROR') {
                reason = t('story_error_network');
            } else if (e && e.code === 'NOT_CONFIGURED') {
                reason = t('story_error_not_configured');
            }
            body.innerHTML = `
                <div class="card" style="text-align:center;">
                    <p style="color:var(--rose);margin-bottom:10px;">⚠️ ${reason}</p>
                    <button class="btn btn-ghost" id="storyRetryBtn">${t('story_retry_btn')}</button>
                </div>
            `;
            // ВАЖЛИВО: раніше тут стояло renderLastChapter — воно лише
            // перемальовує ОСТАННІЙ УЖЕ УСПІШНИЙ розділ, але саме не додає
            // жодних кнопок вибору (це робить лише runChapter() після
            // вдалої генерації). Людина лишалась дивитись на текст без
            // жодної кнопки, щоб рухатись далі. Тепер повторюємо той самий
            // запит (choiceText із замикання цього виклику), що впав —
            // напряму, без окремої зовнішньої змінної (яку паралельний
            // виклик runChapter() міг би теоретично перезаписати до того,
            // як цей запит встигне впасти).
            body.querySelector('#storyRetryBtn').onclick = () => runChapter(choiceText);
        }
    }

    renderLastChapter();
    return wrap;
}
