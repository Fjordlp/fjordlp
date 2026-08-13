// =====================================================================
// КНИГИ: бібліотека + читання + завдання на розуміння
// =====================================================================

function viewBooksLibrary() {
 const lang = STATE.targetLang || 'no';
 const wrap = el(`
 <div class="view">
 <h1> ${t('h_books')}</h1>
 <p style="color:var(--ink-soft);margin-bottom:16px;">${t('books_intro')}</p>
 <div id="booksGenreFilter" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;"></div>
 <div id="booksList"><p style="color:var(--ink-soft);">${t('loading')}</p></div>
 </div>
 `);
 const list = wrap.querySelector('#booksList');
 const filterBar = wrap.querySelector('#booksGenreFilter');
 let activeGenre = 'all';

 function renderCards(books) {
 const filtered = activeGenre === 'all' ? books : books.filter(b => (b.genre || 'other') === activeGenre);
 if (!filtered.length) {
 list.innerHTML = `<div class="card"><p style="color:var(--ink-soft);">${t('books_empty')}</p></div>`;
 return;
 }
 list.innerHTML = '';
 filtered.forEach(book => {
 const progress = getBookProgress(book.id);
 const total = (book.chapters || []).length;
 const done = progress.chaptersRead.length;
 const genre = getBookGenre(book.genre);
 const card = el(`
 <div class="card" style="margin-bottom:14px;cursor:pointer;display:flex;gap:14px;">
 ${book.coverUrl ? `<img src="${escHtml(book.coverUrl)}" alt="" class="book-cover-thumb" onerror="this.style.display='none';">` : `<div class="book-cover-thumb book-cover-placeholder">${genre.emoji}</div>`}
 <div style="flex:1;min-width:0;">
 <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;">
 <div>
 <h3 style="margin:0 0 4px;">${escHtml(book.title)}</h3>
 <p style="margin:0;color:var(--ink-soft);font-size:.85rem;">${escHtml(book.author || '')}</p>
 </div>
 <span class="tag level-${book.level}">${book.level}</span>
 </div>
 <p style="margin:6px 0 0;font-size:.78rem;color:var(--ink-soft);">${genre.label}</p>
 ${book.description ? `<p style="margin:6px 0 0;font-size:.85rem;color:var(--ink-soft);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${escHtml(book.description)}</p>` : ''}
 <p style="margin:8px 0 0;font-size:.82rem;color:var(--ink-soft);">
 ${done > 0 ? tf('books_progress', {done, total}) : tf('books_chapters_count', {total})}
 </p>
 </div>
 </div>
 `);
 card.onclick = () => navigate('book-read', { bookId: book.id, chapterIdx: 0 });
 list.appendChild(card);
 });
 }

 loadSharedBooks(lang).then(books => {
 if (!books.length) {
 list.innerHTML = `<div class="card"><p style="color:var(--ink-soft);">${t('books_empty')}</p></div>`;
 return;
 }
 // Показуємо фільтр лише по темах, які реально є серед книг цієї
 // мови (не весь список BOOK_GENRES одразу — якщо є лише казки й
 // пригоди, немає сенсу показувати порожні фільтри на 10 інших тем).
 const presentGenres = Array.from(new Set(books.map(b => b.genre || 'other')));
 const chips = [{ code: 'all', label: t('books_genre_all') }].concat(
 presentGenres.map(code => ({ code, label: getBookGenre(code).label }))
 );
 filterBar.innerHTML = '';
 chips.forEach(({ code, label }) => {
 const chip = el(`<button class="chip ${code === activeGenre ? 'active' : ''}">${label}</button>`);
 chip.onclick = () => {
 activeGenre = code;
 filterBar.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
 chip.classList.add('active');
 renderCards(books);
 };
 filterBar.appendChild(chip);
 });
 renderCards(books);
 });

 return wrap;
}

function viewBookReader() {
 const bookId = SUBSTATE.bookId;
 const chapterIdx = SUBSTATE.chapterIdx || 0;
 const lang = STATE.targetLang || 'no';

 const wrap = el(`<div class="view"><p style="color:var(--ink-soft);">${t('loading')}</p></div>`);

 loadBookById(bookId, lang).then(book => {
 if (!book) {
 wrap.innerHTML = `<div class="view"><p>${t('books_not_found')}</p></div>`;
 return;
 }
 const chapters = book.chapters || [];
 const chapter = chapters[chapterIdx];
 if (!chapter) {
 wrap.innerHTML = `<div class="view"><p>${t('books_not_found')}</p></div>`;
 return;
 }
 const paragraphs = Array.isArray(chapter.paragraphs) ? chapter.paragraphs : splitIntoParagraphs(chapter.text);

 wrap.innerHTML = `
 <div class="view">
 <button class="btn btn-ghost btn-sm" id="bkBackBtn">← ${t('books_back_to_library')}</button>
 <h1 style="margin-top:10px;">${escHtml(book.title)}</h1>
 <p style="margin:0 0 12px;color:var(--ink-soft);font-size:.9rem;">${escHtml(book.author || '')}</p>

 ${book.coverUrl || book.description ? `
 <div class="card" style="margin-bottom:16px;display:flex;gap:16px;align-items:flex-start;">
 ${book.coverUrl ? `<img src="${escHtml(book.coverUrl)}" alt="" class="book-cover-large" onerror="this.style.display='none';">` : ''}
 ${book.description ? `<p style="margin:0;color:var(--ink-soft);font-size:.9rem;line-height:1.6;">${escHtml(book.description)}</p>` : ''}
 </div>` : ''}

 <div class="card" id="bkChapterListCard" style="margin-bottom:16px;">
 <button class="btn btn-ghost btn-sm" id="bkChapterListToggle" style="width:100%;display:flex;justify-content:space-between;align-items:center;">
 <span> ${tf('books_chapter_n', {n: chapterIdx + 1})}: ${escHtml(chapter.title || '')}</span>
 <span id="bkChapterListArrow">▾</span>
 </button>
 <div id="bkChapterList" style="display:none;margin-top:10px;"></div>
 </div>

 <p style="font-size:.78rem;color:var(--ink-soft);margin-bottom:16px;">${t('books_tap_word_hint')}</p>
 <div class="card" id="bkText" style="line-height:1.9;font-size:1.02rem;"></div>
 <div id="bkWordPopup"></div>
 <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px;">
 ${chapterIdx > 0 ? `<button class="btn btn-ghost" id="bkPrevBtn">← ${t('books_prev_chapter')}</button>` : ''}
 <button class="btn btn-primary" id="bkMarkReadBtn">${isChapterRead(bookId, chapterIdx) ? '✅ ' + t('books_read_done') : ' ' + t('books_mark_read')}</button>
 ${chapterIdx < chapters.length - 1 ? `<button class="btn btn-ghost" id="bkNextBtn">${t('books_next_chapter')} →</button>` : ''}
 </div>
 <div id="bkTasksSection" style="margin-top:24px;"></div>
 </div>
 `;

 // Список розділів (таблиця змісту) — згорнутий за замовчуванням, щоб
 // не займати весь екран для книг з багатьма розділами; розкривається
 // по кліку на заголовок поточного розділу. Кожен рядок клікабельний
 // і одразу переносить на обраний розділ, з позначкою ✅ для вже
 // прочитаних. Раніше єдиним способом перейти до розділу було
 // послідовно тиснути "Наступний розділ" — не можна було відкрити,
 // наприклад, одразу 5-й розділ.
 const listBody = wrap.querySelector('#bkChapterList');
 listBody.innerHTML = chapters.map((c, i) => `
 <div class="book-chapter-list-item ${i === chapterIdx ? 'active' : ''}" data-idx="${i}">
 <span>${isChapterRead(bookId, i) ? '✅' : '○'} ${tf('books_chapter_n', {n: i + 1})}${c.title ? ': ' + escHtml(c.title) : ''}</span>
 </div>
 `).join('');
 listBody.querySelectorAll('.book-chapter-list-item').forEach(item => {
 item.onclick = () => {
 const idx = parseInt(item.dataset.idx, 10);
 if (idx !== chapterIdx) navigate('book-read', { bookId, chapterIdx: idx });
 };
 });
 const toggleBtn = wrap.querySelector('#bkChapterListToggle');
 const arrow = wrap.querySelector('#bkChapterListArrow');
 toggleBtn.onclick = () => {
 const isOpen = listBody.style.display !== 'none';
 listBody.style.display = isOpen ? 'none' : 'block';
 arrow.textContent = isOpen ? '▾' : '▴';
 };

 const textEl = wrap.querySelector('#bkText');
 paragraphs.forEach(p => {
 // Ілюстрація: адмін вставив [img: URL] або [img: URL | підпис] як
 // окремий абзац тексту. Такий "абзац" рендеримо як картинку, а не
 // як клікабельний для перекладу текст.
 const imgMarker = parseImageMarker(p);
 if (imgMarker) {
 const figure = document.createElement('figure');
 figure.className = 'book-illustration';
 const img = document.createElement('img');
 img.src = imgMarker.url;
 img.alt = imgMarker.caption || '';
 img.onerror = () => { figure.style.display = 'none'; };
 figure.appendChild(img);
 if (imgMarker.caption) {
 const cap = document.createElement('figcaption');
 cap.textContent = imgMarker.caption;
 figure.appendChild(cap);
 }
 textEl.appendChild(figure);
 return;
 }
 const pEl = document.createElement('p');
 pEl.style.marginBottom = '14px';
 // Розбиваємо на слова так, щоб пунктуація лишалась окремим текстовим
 // вузлом (не клікабельна), а саме слово — клікабельним span'ом.
 // \wёіїєґ покриває кирилицю/латиницю з діакритикою для більшості
 // мов, які тут є (норвезька, іспанська, німецька, французька…).
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

 wrap.querySelector('#bkBackBtn').onclick = () => navigate('books');
 const prevBtn = wrap.querySelector('#bkPrevBtn');
 if (prevBtn) prevBtn.onclick = () => navigate('book-read', { bookId, chapterIdx: chapterIdx - 1 });
 const nextBtn = wrap.querySelector('#bkNextBtn');
 if (nextBtn) nextBtn.onclick = () => navigate('book-read', { bookId, chapterIdx: chapterIdx + 1 });
 const markBtn = wrap.querySelector('#bkMarkReadBtn');
 markBtn.onclick = () => {
 markChapterRead(bookId, chapterIdx);
 markBtn.textContent = '✅ ' + t('books_read_done');
 toast('✅ ' + t('books_xp_toast'));
 };

 renderChapterTasks(wrap.querySelector('#bkTasksSection'), book, chapterIdx, chapter);
 });

 return wrap;
}

let _activeWordPopup = null;
async function showWordTranslation(spanEl, word, sentence, lang) {
 if (_activeWordPopup) { _activeWordPopup.remove(); _activeWordPopup = null; }
 const rect = spanEl.getBoundingClientRect();
 const popup = document.createElement('div');
 popup.className = 'book-word-popup';
 popup.style.top = (window.scrollY + rect.bottom + 6) + 'px';
 popup.style.left = Math.max(8, rect.left) + 'px';
 popup.textContent = '…';
 document.body.appendChild(popup);
 _activeWordPopup = popup;

 const closeOnOutsideClick = (e) => {
 if (!popup.contains(e.target) && e.target !== spanEl) {
 popup.remove();
 if (_activeWordPopup === popup) _activeWordPopup = null;
 document.removeEventListener('click', closeOnOutsideClick, true);
 }
 };
 setTimeout(() => document.addEventListener('click', closeOnOutsideClick, true), 0);

 const result = await translateWordInContext(word, sentence, lang);
 if (_activeWordPopup !== popup) return; // користувач вже закрив/клікнув інше слово, поки чекали відповідь
 if (!result.translation) {
 popup.innerHTML = `<span style="color:var(--rose);">${t('books_translate_error')}</span>`;
 return;
 }
 popup.innerHTML = `<strong>${escHtml(result.translation)}</strong>` +
 (result.baseForm && result.baseForm.toLowerCase() !== word.toLowerCase() ?
 `<div style="font-size:.75rem;color:var(--ink-soft);margin-top:2px;">${t('books_base_form')}: ${escHtml(result.baseForm)}</div>` : '');
}

function renderChapterTasks(container, book, chapterIdx, chapter) {
 const bookId = book.id;
 const tasks = chapter.tasks || [];
 if (!tasks.length) {
 container.innerHTML = `<div class="card"><p style="color:var(--ink-soft);font-size:.85rem;">${t('books_no_tasks')}</p></div>`;
 return;
 }
 const prevScore = getBookProgress(bookId).taskScores[chapterIdx];
 const wrap = el(`
 <div class="card">
 <h3 style="margin-top:0;"> ${t('books_tasks_title')}</h3>
 ${prevScore ? `<p style="color:var(--ink-soft);font-size:.85rem;">${tf('books_prev_score', {correct: prevScore.correct, total: prevScore.total})}</p>` : ''}
 <div id="bkTasksList"></div>
 <button class="btn btn-primary" id="bkCheckTasksBtn" style="margin-top:12px;">${t('books_check_answers')}</button>
 </div>
 `);
 const list = wrap.querySelector('#bkTasksList');
 const answered = new Array(tasks.length).fill(-1);

 tasks.forEach((task, qi) => {
 const qEl = el(`
 <div style="margin-bottom:16px;">
 <p style="font-weight:600;margin-bottom:8px;">${qi + 1}. ${escHtml(task.q)}</p>
 <div class="mc-options" data-qi="${qi}"></div>
 </div>
 `);
 const opts = qEl.querySelector('.mc-options');
 (task.opts || []).forEach((opt, oi) => {
 const b = el(`<button class="mc-opt">${escHtml(opt)}</button>`);
 b.onclick = () => {
 opts.querySelectorAll('.mc-opt').forEach(o => o.classList.remove('book-selected'));
 b.classList.add('book-selected');
 answered[qi] = oi;
 };
 opts.appendChild(b);
 });
 list.appendChild(qEl);
 });

 wrap.querySelector('#bkCheckTasksBtn').onclick = () => {
 let correct = 0;
 tasks.forEach((task, qi) => {
 const opts = list.querySelector(`.mc-options[data-qi="${qi}"]`);
 const buttons = opts.querySelectorAll('.mc-opt');
 buttons.forEach((b, oi) => {
 b.disabled = true;
 if (oi === task.a) b.classList.add('correct');
 else if (oi === answered[qi]) b.classList.add('wrong');
 });
 if (answered[qi] === task.a) correct++;
 });
 recordChapterTaskScore(bookId, chapterIdx, correct, tasks.length);
 toast(tf('books_score_toast', { correct, total: tasks.length }));
 wrap.querySelector('#bkCheckTasksBtn').disabled = true;
 };

 container.innerHTML = '';
 container.appendChild(wrap);
}
