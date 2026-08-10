// =====================================================================
//  ХРОНІКИ ТРОЛЛЯ: екран читання
// =====================================================================

function viewStory() {
    const story = ensureStoryState();
    const wrap = el(`
        <div class="view" style="max-width:680px;margin:0 auto;">
            <h1>🧌 ${t('story_title')}</h1>
            <p style="color:var(--ink-soft);margin-bottom:16px;">${t('story_intro')}</p>
            <div id="storyTrollSlot" style="display:flex;justify-content:center;margin-bottom:16px;"></div>
            <div id="storyBody"></div>
        </div>
    `);
    wrap.querySelector('#storyTrollSlot').appendChild(renderTrollBubble('excited', 'greeting', 64));

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
                <p style="color:var(--ink-soft);font-size:.75rem;margin:0 0 8px;">${tf('books_chapter_n', {n: last.chapterIndex})}</p>
                <div id="storyText" style="line-height:1.9;font-size:1.02rem;margin-bottom:8px;"></div>
                ${last.newWords && last.newWords.length ? `
                    <div style="margin:14px 0;padding:10px 12px;background:var(--cream);border-radius:10px;font-size:.85rem;">
                        ✨ ${t('story_new_words_label')}: ${last.newWords.map(w => `<strong>${escHtml(w.no)}</strong> — ${escHtml(w.uk)}`).join(' · ')}
                    </div>
                ` : ''}
                <div id="storyChoices" style="display:flex;flex-direction:column;gap:8px;margin-top:16px;"></div>
            </div>
        `);
        body.appendChild(chapterCard);

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
        body.innerHTML = `<div class="card" style="text-align:center;color:var(--ink-soft);">🧌 ${t('story_generating')}</div>`;
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
                contBtn.onclick = () => runChapter(t('story_continue_generic'));
                choicesEl.appendChild(contBtn);
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
            body.querySelector('#storyRetryBtn').onclick = renderLastChapter;
        }
    }

    renderLastChapter();
    return wrap;
}
