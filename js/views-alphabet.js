// =====================================================================
//  РОЗДІЛ "ОСНОВИ" — абетка, вимова, цифри. Рівень нижче A1.
// =====================================================================
// Свідомо НЕ додано як 7-й рівень до LEVELS (["A1"..."C2"]) — цей масив
// глибоко вшитий у 28+ місць коду (тест на рівень, SRS, адмін-панель,
// турніри, генерація граматики/словника), і вставляти туди новий рівень
// означало б переглядати й тестувати кожне з цих місць з високим
// ризиком щось зламати. Натомість це окремий, самодостатній екран —
// що й методично правильніше: абетка не є "флеш-картками", їй потрібне
// інше подання (літера + вимова + звук), а не переклад слова.
//
// Джерела даних (у порядку пріоритету):
//  1. window.LANG_DATA[lang].ALPHABET — вбудований файл (js/data-<lang>.js)
//  2. sharedAlphabet/{lang} у Firestore — опубліковане адміном через AI
//  3. Якщо нема жодного — чесний порожній стан з поясненням, а не
//     вигадана абетка чи мовчазний показ чужої мови.
//
// Цифри НЕ дублюються окремим масивом — вони й так є в VOCAB.A1 з темою
// "Числа" (уже перекладені, з прикладами), тому просто фільтруються
// звідти.

function viewAlphabet() {
    const lang = STATE.targetLang || 'no';
    const langName = targetLangName(lang);

    ensureAlphabetAvailable(lang);
    const alphabet = getAlphabetForLang(lang);
    const numbers = vocabForLevel('A1', lang).filter(w => w.t === 'Числа');

    const wrap = el(`
        <div class="view">
            <h1> ${t('h_alphabet')}</h1>
            <p style="color:var(--ink-soft);margin-bottom:16px;">${tf('alphabet_intro', {lang: langName})}</p>
            <div id="alphaContent"></div>
        </div>
    `);
    const content = wrap.querySelector('#alphaContent');

    function renderLetterGrid(letters) {
        const grid = el(`<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;margin-bottom:24px;"></div>`);
        letters.forEach(item => {
            const card = el(`
                <div class="card" style="padding:12px 14px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <span style="font-size:1.6rem;font-weight:700;font-family:'Fraunces',serif;">${escHtml(item.letter)}</span>
                        <button class="btn btn-ghost btn-sm alpha-listen" data-letter="${escHtml(item.letter.split(' ')[0])}" title="${t('reading_tap_hint') || ''}">🔊</button>
                    </div>
                    <p style="color:var(--ink-soft);font-size:.8rem;margin:6px 0 2px;">${t('alphabet_called')}: <b>${escHtml(item.name)}</b></p>
                    <p style="color:var(--ink-soft);font-size:.8rem;margin:2px 0;">${escHtml(item.sound)}</p>
                    <p style="font-size:.85rem;margin-top:8px;"><i>${escHtml(item.example)}</i> — ${escHtml(item.example_uk)}</p>
                </div>
            `);
            card.querySelector('.alpha-listen').onclick = () => speak(item.example, lang);
            grid.appendChild(card);
        });
        return grid;
    }

    if (alphabet && alphabet.length) {
        content.appendChild(renderLetterGrid(alphabet));
    } else {
        content.appendChild(el(`
            <div class="empty-state" style="margin-bottom:24px;">
                <h3>${t('alphabet_none_title')}</h3>
                <p>${tf('alphabet_none_desc', {lang: langName})}</p>
            </div>
        `));
    }

    if (numbers.length) {
        content.appendChild(el(`<h2 style="margin-top:8px;"> ${t('h_numbers')}</h2>`));
        const numGrid = el(`<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;"></div>`);
        numbers.forEach(w => {
            const card = el(`
                <div class="card" style="padding:10px 12px;display:flex;justify-content:space-between;align-items:center;">
                    <div>
                        <div style="font-weight:700;">${escHtml(w.no)}</div>
                        <div style="color:var(--ink-soft);font-size:.8rem;">${escHtml(wordTranslation(w, 'A1'))}</div>
                    </div>
                    <button class="btn btn-ghost btn-sm num-listen">🔊</button>
                </div>
            `);
            card.querySelector('.num-listen').onclick = () => speak(w.no, lang);
            numGrid.appendChild(card);
        });
        content.appendChild(numGrid);
    }

    return wrap;
}
