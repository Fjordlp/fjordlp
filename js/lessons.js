// =====================================================================
//  УРОКИ — прогрес і допоміжні функції
// =====================================================================
// Сам КОНТЕНТ уроків (масив LESSONS) лежить у кожному js/data-<мова>.js
// (js/data.js — для норвезької) поруч із VOCAB/GRAMMAR і реєструється
// так само через window.LANG_DATA[код_мови].LESSONS. Щоб додати урок:
// відкрий потрібний файл, знайди `const LESSONS = [...]` і встав новий
// об'єкт за зразком — детальний шаблон і повний робочий приклад (Урок 1)
// лежать прямо там, у файлі. Тут — лише логіка проходження: список
// уроків для поточної мови, послідовне розблокування (урок 2
// недоступний, поки не пройдено урок 1 — рахуємо за полем id, а не за
// порядком вставки в масив), позначення уроку пройденим і нарахування
// XP. STATE.langData[мова].lessonsDone вже існував у коді (навіть
// досягнення "5 уроків" в troll.js на нього посилалось) — самих уроків
// і способу їх пройти просто ще не було.

function lessonsForLang(lang) {
    lang = lang || (typeof STATE !== 'undefined' && STATE && STATE.targetLang) || 'no';
    const langFile = window.LANG_DATA && window.LANG_DATA[lang];
    const list = (langFile && Array.isArray(langFile.LESSONS)) ? langFile.LESSONS : [];
    // Сортуємо за id — це і є послідовність "урок 1, урок 2..."
    // незалежно від того, у якому порядку об'єкти лежать у масиві.
    return [...list].sort((a, b) => (a.id || 0) - (b.id || 0));
}

function isLessonDone(lessonId) {
    return (LD().lessonsDone || []).includes(lessonId);
}

// Урок розблокований, якщо це перший урок цієї мови (за id) або
// попередній за порядком урок уже пройдено.
function isLessonUnlocked(lessonId, lang) {
    const list = lessonsForLang(lang);
    const idx = list.findIndex(l => l.id === lessonId);
    if (idx <= 0) return true;
    return isLessonDone(list[idx - 1].id);
}

function markLessonDone(lessonId) {
    if (!Array.isArray(LD().lessonsDone)) LD().lessonsDone = [];
    if (LD().lessonsDone.includes(lessonId)) return;
    LD().lessonsDone.push(lessonId);
    // Трохи більше XP, ніж за розділ книги (+8) чи розділ пригоди (+12) —
    // урок включає і пояснення, і завдання на перевірку розуміння.
    LD().xp = (LD().xp || 0) + 15;
    updateState();
    markActivityToday();
    if (typeof checkAchievements === 'function') checkAchievements();
}

// Той самий принцип локалізації полів, що й для граматики
// (grammarLocalized у helpers.js) — title/content/питання мають
// title_en/title_ru/content_en/... варіанти; якщо перекладу немає,
// тихо показуємо базове (українське) значення.
function lessonLocalized(lesson, field) {
    const uiLang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    if (uiLang === 'en' && lesson[field + '_en']) return lesson[field + '_en'];
    if (uiLang === 'ru' && lesson[field + '_ru']) return lesson[field + '_ru'];
    return lesson[field];
}

function lessonTaskLocalized(task, field) {
    const uiLang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
    if (uiLang === 'en' && task[field + '_en']) return task[field + '_en'];
    if (uiLang === 'ru' && task[field + '_ru']) return task[field + '_ru'];
    return task[field];
}

// =====================================================================
//  ЛЕГКА РОЗМІТКА КОНТЕНТУ УРОКУ
// =====================================================================
// Контент уроку — звичайний текст із невеликою, легкою для запам'ятовування
// розміткою (той самий принцип, що й маркери ілюстрацій [img: ...] у
// книгах):
//   - звичайний абзац — просто рядок(и) тексту
//   - рядок виду "| слово мовою | переклад |" — рядок таблиці слів;
//     послідовні такі рядки збираються в одну таблицю
//   - рядок, що починається з "> " — порада (виділяється кольором)
//   - ~слово~ всередині звичайного тексту — виділяє слово мовою
//     вивчення (як code/no-word стиль)
// Абзаци без жодної розмітки теж чудово проходять через це (просто один
// блок типу 'p'), тож рендерер безпечно використовувати для БУДЬ-ЯКОГО
// контенту уроку, навіть найпростішого.
function parseLessonContent(raw) {
    const lines = String(raw || '').replace(/\r\n/g, '\n').split('\n');
    const blocks = [];
    let i = 0;
    let paragraphBuf = [];

    function flushParagraph() {
        if (paragraphBuf.length) {
            blocks.push({ type: 'p', text: paragraphBuf.join(' ').trim() });
            paragraphBuf = [];
        }
    }

    while (i < lines.length) {
        const line = lines[i];
        const trimmed = line.trim();

        if (!trimmed) { flushParagraph(); i++; continue; }

        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
            flushParagraph();
            const rows = [];
            while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
                const cells = lines[i].trim().slice(1, -1).split('|').map(c => c.trim());
                rows.push(cells);
                i++;
            }
            blocks.push({ type: 'table', cols: rows[0] ? rows[0].length : 2, rows });
            continue;
        }

        if (trimmed.startsWith('> ')) {
            flushParagraph();
            blocks.push({ type: 'tip', text: trimmed.slice(2).trim() });
            i++;
            continue;
        }

        paragraphBuf.push(trimmed);
        i++;
    }
    flushParagraph();
    return blocks;
}

// Виділення ~слово~ всередині абзацу — робимо ЦЕ окремо від escHtml, щоб
// не відкрити шлях для XSS через контент уроку: спершу екранується ВЕСЬ
// текст, і лише ПОТІМ у вже безпечному тексті замінюються ~...~ на
// <span> — сам admin/файловий контент ніколи не потрапляє в DOM як
// "сирий" HTML.
function renderLessonInlineText(text) {
    return escHtml(text).replace(/~([^~]+)~/g, '<span class="no-word">$1</span>');
}

// Малює масив блоків (з parseLessonContent) як готовий HTML-рядок для
// вставки в контейнер уроку.
function renderLessonBlocksHtml(blocks) {
    return blocks.map(b => {
        if (b.type === 'tip') {
            return `<p class="lesson-tip" style="background:var(--cream);border-left:3px solid var(--amber);padding:8px 12px;border-radius:6px;margin:10px 0;">💡 ${renderLessonInlineText(b.text)}</p>`;
        }
        if (b.type === 'table') {
            const rowsHtml = b.rows.map(r =>
                `<tr>${r.map(c => `<td style="padding:6px 10px;border-bottom:1px solid var(--line-soft);">${renderLessonInlineText(c)}</td>`).join('')}</tr>`
            ).join('');
            return `<table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:.92rem;">${rowsHtml}</table>`;
        }
        return `<p style="margin:8px 0;">${renderLessonInlineText(b.text)}</p>`;
    }).join('');
}
