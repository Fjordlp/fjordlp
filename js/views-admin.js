// =====================================================================
//  АДМІН-ПАНЕЛЬ (найпростіша версія)
// =====================================================================

function viewAdmin() {
    // Перевіряємо, чи користувач адмін
    if (!STATE || !STATE.admin) {
        return `<div class="view"><div class="empty-state"><h3>⛔ Доступ заборонено</h3><p>Ви не маєте прав адміністратора.</p></div></div>`;
    }
    
    return `
        <div class="view">
            <h1>⚙️ Адмін-панель</h1>
            <p style="color:var(--ink-soft);margin-bottom:16px;">Швидке керування контентом сайту</p>
            
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                <div class="card admin-card" onclick="navigate('admin-words')" style="cursor:pointer;transition:all .2s;">
                    <div style="font-size:2rem;margin-bottom:8px;">📚</div>
                    <h3>Слова</h3>
                    <p style="color:var(--ink-soft);font-size:.85rem;">Додати нове слово або редагувати існуючі</p>
                </div>
                
                <div class="card admin-card" onclick="navigate('admin-tournaments')" style="cursor:pointer;transition:all .2s;">
                    <div style="font-size:2rem;margin-bottom:8px;">🏆</div>
                    <h3>Турніри</h3>
                    <p style="color:var(--ink-soft);font-size:.85rem;">Створити та керувати турнірами</p>
                </div>
                
                <div class="card admin-card" onclick="navigate('admin-daily')" style="cursor:pointer;transition:all .2s;">
                    <div style="font-size:2rem;margin-bottom:8px;">📅</div>
                    <h3>Завдання дня</h3>
                    <p style="color:var(--ink-soft);font-size:.85rem;">Створити або оновити завдання на сьогодні</p>
                </div>
                
                <div class="card admin-card" onclick="navigate('admin-users')" style="cursor:pointer;transition:all .2s;">
                    <div style="font-size:2rem;margin-bottom:8px;">👥</div>
                    <h3>Користувачі</h3>
                    <p style="color:var(--ink-soft);font-size:.85rem;">Список усіх користувачів платформи</p>
                </div>

                <div class="card admin-card" onclick="navigate('admin-vocab-gen')" style="cursor:pointer;transition:all .2s;">
                    <div style="font-size:2rem;margin-bottom:8px;">🌐</div>
                    <h3>Спільні словники</h3>
                    <p style="color:var(--ink-soft);font-size:.85rem;">Згенерувати й опублікувати словник для будь-якої мови — одразу для всіх користувачів</p>
                </div>

                <div class="card admin-card" onclick="navigate('admin-grammar-gen')" style="cursor:pointer;transition:all .2s;">
                    <div style="font-size:2rem;margin-bottom:8px;">📖</div>
                    <h3>Спільна граматика</h3>
                    <p style="color:var(--ink-soft);font-size:.85rem;">Згенерувати й опублікувати граматичні правила для будь-якої мови й рівня</p>
                </div>

                <div class="card admin-card" onclick="navigate('admin-books')" style="cursor:pointer;transition:all .2s;">
                    <div style="font-size:2rem;margin-bottom:8px;">📚</div>
                    <h3>Книги</h3>
                    <p style="color:var(--ink-soft);font-size:.85rem;">Додати книгу суспільного надбання для читання (текст вставляється вручну)</p>
                </div>

                <div class="card admin-card" onclick="navigate('admin-daily-word')" style="cursor:pointer;transition:all .2s;">
                    <div style="font-size:2rem;margin-bottom:8px;">📝</div>
                    <h3>Слово дня</h3>
                    <p style="color:var(--ink-soft);font-size:.85rem;">Обрати конкретне слово, яке з'явиться на головній сьогодні — окремо для кожної мови</p>
                </div>
            </div>
        </div>
    `;
}

// =====================================================================
//  СТОРІНКА: Управління словами
// =====================================================================
function viewAdminWords() {
    if (!STATE || !STATE.admin) return errorAccessDenied();
    
    return `
        <div class="view">
            <h1>📚 Управління словами</h1>
            <div class="card" style="margin-bottom:16px;">
                <h3>➕ Додати нове слово</h3>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;">
                    <div class="field">
                        <label>Норвезьке слово</label>
                        <input id="wordNo" placeholder="Наприклад: bil">
                    </div>
                    <div class="field">
                        <label>Переклад (укр)</label>
                        <input id="wordUk" placeholder="Наприклад: машина">
                    </div>
                    <div class="field">
                        <label>Переклад (англ)</label>
                        <input id="wordEn" placeholder="Наприклад: car">
                    </div>
                    <div class="field">
                        <label>Переклад (рос)</label>
                        <input id="wordRu" placeholder="Наприклад: машина">
                    </div>
                    <div class="field" style="grid-column:1/-1;">
                        <label>Рівень</label>
                        <select id="wordLevel">
                            ${['A1','A2','B1','B2','C1','C2'].map(l => `<option value="${l}">${l}</option>`).join('')}
                        </select>
                    </div>
                    <div class="field" style="grid-column:1/-1;">
                        <label>Тема</label>
                        <input id="wordTopic" placeholder="Наприклад: Транспорт">
                    </div>
                    <div class="field" style="grid-column:1/-1;">
                        <label>Приклад речення (норвезькою)</label>
                        <input id="wordExNo" placeholder="Наприклад: Jeg har en bil.">
                    </div>
                    <div class="field" style="grid-column:1/-1;">
                        <label>Приклад речення (переклад укр)</label>
                        <input id="wordExUk" placeholder="Наприклад: У мене є машина.">
                    </div>
                </div>
                <button class="btn btn-primary" onclick="adminAddWord()">💾 Додати слово</button>
            </div>
            
            <div class="card">
                <h3>🔍 Пошук слів</h3>
                <input id="wordSearch" placeholder="Пошук за норвезьким або українським словом..." style="width:100%;padding:8px 12px;border-radius:10px;border:1px solid var(--line);font-size:.9rem;">
                <div id="wordList" style="margin-top:12px;max-height:400px;overflow-y:auto;"></div>
            </div>
            
            <button class="btn btn-ghost btn-sm" onclick="navigate('admin')" style="margin-top:12px;">← Назад до панелі</button>
        </div>
    `;
}

// =====================================================================
//  СТОРІНКА: Турніри
// =====================================================================
function viewAdminTournaments() {
    if (!STATE || !STATE.admin) return errorAccessDenied();
    
    return `
        <div class="view">
            <h1>🏆 Турніри</h1>
            <div class="card" style="margin-bottom:16px;">
                <h3>➕ Створити новий турнір</h3>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;">
                    <div class="field" style="grid-column:1/-1;">
                        <label>Назва турніру</label>
                        <input id="tournamentName" placeholder="Наприклад: Кубок Fjord">
                    </div>
                    <div class="field" style="grid-column:1/-1;">
                        <label>Опис</label>
                        <input id="tournamentDesc" placeholder="Короткий опис турніру">
                    </div>
                    <div class="field">
                        <label>Мова</label>
                        <select id="tournamentLang">
                            ${LANGUAGES.map(l => `<option value="${l.code}">${l.flag} ${l.name.uk}</option>`).join('')}
                        </select>
                    </div>
                    <div class="field">
                        <label>Рівень</label>
                        <select id="tournamentLevel">
                            ${['A1','A2','B1','B2','C1','C2'].map(l => `<option value="${l}">${l}</option>`).join('')}
                        </select>
                    </div>
                    <div class="field">
                        <label>Дата початку</label>
                        <input id="tournamentStart" type="datetime-local">
                    </div>
                    <div class="field">
                        <label>Дата закінчення</label>
                        <input id="tournamentEnd" type="datetime-local">
                    </div>
                    <div class="field">
                        <label>Кількість питань</label>
                        <input id="tournamentQuestions" type="number" value="20">
                    </div>
                </div>
                <button class="btn btn-primary" onclick="adminCreateTournament()">🏆 Створити турнір</button>
            </div>
            
            <div class="card">
                <h3>📋 Активні турніри</h3>
                <div id="tournamentList" style="margin-top:12px;">Завантаження...</div>
            </div>
            
            <button class="btn btn-ghost btn-sm" onclick="navigate('admin')" style="margin-top:12px;">← Назад до панелі</button>
        </div>
    `;
}

// =====================================================================
//  СТОРІНКА: Завдання дня
// =====================================================================
function viewAdminDaily() {
    if (!STATE || !STATE.admin) return errorAccessDenied();

    return `
        <div class="view">
            <h1>📅 Завдання дня</h1>
            <div class="card" style="margin-bottom:16px;color:var(--ink-soft);font-size:.85rem;">
                ⚠️ Завдання публікується окремо для кожної мови навчання — люди, які вчать
                іншу мову, побачать своє (або взагалі нічого, якщо для їхньої мови на
                сьогодні ще нічого не опубліковано).
            </div>
            <div class="card">
                <h3>✏️ Створити завдання на сьогодні</h3>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;">
                    <div class="field" style="grid-column:1/-1;">
                        <label>Мова навчання</label>
                        <select id="dailyLang">
                            ${LANGUAGES.map(l => `<option value="${l.code}">${l.flag} ${l.name.uk}</option>`).join('')}
                        </select>
                    </div>
                    <div class="field" style="grid-column:1/-1;">
                        <label>Питання</label>
                        <input id="dailyQuestion" placeholder="Наприклад: Як перекладається 'bil'?">
                    </div>
                    <div class="field" style="grid-column:1/-1;">
                        <label>Варіанти відповідей (через кому)</label>
                        <input id="dailyOptions" placeholder="Наприклад: Машина, Човен, Літак, Велосипед">
                    </div>
                    <div class="field">
                        <label>Правильна відповідь (номер, починаючи з 0)</label>
                        <input id="dailyCorrect" type="number" value="0">
                    </div>
                    <div class="field">
                        <label>Тип завдання</label>
                        <select id="dailyType">
                            <option value="translation">Переклад</option>
                            <option value="grammar">Граматика</option>
                            <option value="idiom">Ідіома</option>
                            <option value="listening">Аудіювання</option>
                        </select>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="adminCreateDaily()">📅 Опублікувати завдання дня</button>
            </div>

            <div class="card" style="margin-top:16px;">
                <h3>📋 Останні завдання</h3>
                <div id="dailyList" style="margin-top:12px;">Завантаження...</div>
            </div>

            <button class="btn btn-ghost btn-sm" onclick="navigate('admin')" style="margin-top:12px;">← Назад до панелі</button>
        </div>
    `;
}

// =====================================================================
//  СТОРІНКА: Користувачі
// =====================================================================
function viewAdminUsers() {
    if (!STATE || !STATE.admin) return errorAccessDenied();
    
    return `
        <div class="view">
            <h1>👥 Користувачі</h1>
            <div class="card">
                <h3>📋 Всі користувачі</h3>
                <input id="userSearch" placeholder="Пошук за ім'ям або email..." style="width:100%;padding:8px 12px;margin-top:10px;border-radius:10px;border:1px solid var(--line);font-size:.9rem;">
                <div id="userList" style="margin-top:12px;max-height:500px;overflow-y:auto;">Завантаження...</div>
            </div>
            <button class="btn btn-ghost btn-sm" onclick="navigate('admin')" style="margin-top:12px;">← Назад до панелі</button>
        </div>
    `;
}

// Завантажити список користувачів з Firestore. Раніше ця функція взагалі
// не існувала — сторінка просто назавжди показувала "Завантаження...".
async function loadUserList(query) {
    const container = document.getElementById('userList');
    if (!container) return;
    query = (query || '').trim().toLowerCase();
    if (!firebaseReady || !firebaseDb) {
        container.innerHTML = '<p style="color:var(--rose);">Firestore недоступний.</p>';
        return;
    }
    try {
        const snap = await firebaseDb.collection('users').limit(300).get();
        if (snap.empty) {
            container.innerHTML = '<p style="color:var(--ink-soft);">Користувачів ще немає.</p>';
            return;
        }
        const rows = [];
        snap.forEach(doc => {
            const d = doc.data();
            const name = d.name || doc.id;
            const email = d.email || '';
            if (query && !name.toLowerCase().includes(query) && !email.toLowerCase().includes(query) && !doc.id.toLowerCase().includes(query)) {
                return; // не збігається з пошуком — пропускаємо
            }
            // xp/level тепер зберігаються ізольовано по мові в
            // langData[targetLang] — читаємо саме той запис, що відповідає
            // мові, яку ця людина зараз вивчає. Старі, ще не мігровані
            // документи (без langData) підстраховані фолбеком на плоскі
            // d.xp/d.level.
            const uLang = d.targetLang || 'no';
            const uLD = (d.langData && d.langData[uLang]) || {};
            rows.push({ id: doc.id, name, email, level: uLD.level || d.level || '—', xp: uLD.xp || d.xp || 0, admin: !!d.admin, targetLang: uLang });
        });
        if (!rows.length) {
            container.innerHTML = '<p style="color:var(--ink-soft);">Нічого не знайдено.</p>';
            return;
        }
        let html = `<p style="color:var(--ink-soft);font-size:.8rem;margin-bottom:8px;">Знайдено: ${rows.length}</p>`;
        html += '<table class="vocab-table"><thead><tr><th>Ім\'я</th><th>Рівень</th><th>Мова</th><th>XP</th><th>Адмін</th><th>Дія</th></tr></thead><tbody>';
        rows.forEach(u => {
            const lang = (typeof getLanguage === 'function') ? getLanguage(u.targetLang) : null;
            html += `<tr>
                <td><strong>${u.name}</strong>${u.email ? `<br><span style="font-size:.72rem;color:var(--ink-soft);">${u.email}</span>` : ''}</td>
                <td><span class="tag level-${u.level}">${u.level}</span></td>
                <td>${lang ? lang.flag + ' ' + lang.name.uk : u.targetLang}</td>
                <td>${u.xp}</td>
                <td>${u.admin ? '✅' : '—'}</td>
                <td><button class="btn btn-ghost btn-sm" onclick="adminToggleUserAdmin('${u.id}', ${!u.admin})">${u.admin ? 'Прибрати адміна' : 'Зробити адміном'}</button></td>
            </tr>`;
        });
        html += '</tbody></table>';
        container.innerHTML = html;
    } catch (e) {
        console.error('[Адмін] Помилка завантаження користувачів:', e);
        container.innerHTML = '<p style="color:var(--rose);">Помилка завантаження. Перевірте правила доступу Firestore.</p>';
    }
}

// Прив'язка пошуку користувачів — так само, як initAdminWords, викликається
// одразу після реального рендеру сторінки (не через DOMContentLoaded).
function initAdminUsers() {
    const searchInput = document.getElementById('userSearch');
    if (!searchInput) return; // не та сторінка
    loadUserList();
    let debounceTimer;
    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        const q = this.value;
        debounceTimer = setTimeout(() => loadUserList(q), 250);
    });
}

// Надати/забрати права адміністратора іншому користувачу.
window.adminToggleUserAdmin = async function(uid, makeAdmin) {
    if (!firebaseReady || !firebaseDb) return;
    try {
        await firebaseDb.collection('users').doc(uid).set({ admin: makeAdmin }, { merge: true });
        toast(makeAdmin ? '✅ Права адміністратора надано' : '✅ Права адміністратора прибрано');
        loadUserList(document.getElementById('userSearch') ? document.getElementById('userSearch').value : '');
    } catch (e) {
        console.error('[Адмін] Помилка зміни прав:', e);
        toast('⚠️ Не вдалося змінити права. Перевірте правила доступу Firestore.');
    }
};

// =====================================================================
//  АДМІН-ФУНКЦІЇ (для onclick)
// =====================================================================

// Додати слово
window.adminAddWord = async function() {
    const no = document.getElementById('wordNo').value.trim();
    const uk = document.getElementById('wordUk').value.trim();
    const en = document.getElementById('wordEn').value.trim();
    const ru = document.getElementById('wordRu').value.trim();
    const level = document.getElementById('wordLevel').value;
    const t = document.getElementById('wordTopic').value.trim() || 'Загальне';
    const ex_no = document.getElementById('wordExNo').value.trim();
    const ex_uk = document.getElementById('wordExUk').value.trim();
    
    if (!no || !uk) {
        toast('❌ Будь ласка, заповніть обов\'язкові поля (норвезьке та український переклад)');
        return;
    }
    
    try {
        const docRef = await firebaseDb.collection('words').add({
            no, uk, en, ru, level, t, ex_no, ex_uk,
            fromAdmin: true,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        toast(`✅ Слово "${no}" додано!`);
        document.querySelectorAll('#wordNo, #wordUk, #wordEn, #wordRu, #wordTopic, #wordExNo, #wordExUk').forEach(el => el.value = '');
        loadWordList();
    } catch (e) {
        console.error('Помилка додавання слова:', e);
        toast('❌ Помилка додавання слова');
    }
};

// Створити турнір
window.adminCreateTournament = async function() {
    const name = document.getElementById('tournamentName').value.trim();
    const desc = document.getElementById('tournamentDesc').value.trim();
    const start = document.getElementById('tournamentStart').value;
    const end = document.getElementById('tournamentEnd').value;
    const numQuestions = parseInt(document.getElementById('tournamentQuestions').value) || 20;
    const level = document.getElementById('tournamentLevel').value;
    // Раніше мова турніру не обиралась явно — vocabForLevel(level) без
    // другого аргументу мовчки брав STATE.targetLang АДМІНА на момент
    // створення (яку мову він сам зараз вчить), а не свідомо обрану мову
    // турніру. Хтось, хто вчить іспанську, міг побачити в списку турнір,
    // складений з норвезьких слів — просто тому, що адмін у той момент
    // сам вчив норвезьку.
    const lang = document.getElementById('tournamentLang').value;

    if (!name) {
        toast('❌ Введіть назву турніру');
        return;
    }

    try {
        const words = vocabForLevel(level, lang);
        if (!words.length) {
            toast(`❌ Немає слів для ${getLanguage(lang).name.uk} (${level}). Спершу опублікуйте словник для цієї мови й рівня.`);
            return;
        }
        const shuffled = shuffle(words).slice(0, numQuestions);
        const questions = shuffled.map(w => {
            const distractors = shuffle(words.filter(x => x.no !== w.no)).slice(0, 3).map(x => x.uk);
            const options = shuffle([w.uk, ...distractors]);
            return {
                type: 'translation',
                question: `Як перекладається "${w.no}"?`,
                options: options,
                correct: options.indexOf(w.uk)
            };
        });

        const docRef = await firebaseDb.collection('tournaments').add({
            name,
            description: desc,
            lang,
            level,
            questions,
            status: 'waiting',
            startTime: start ? new Date(start).toISOString() : null,
            endTime: end ? new Date(end).toISOString() : null,
            participants: {},
            results: {},
            createdBy: firebaseAuth.currentUser.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        toast(`🏆 Турнір "${name}" створено!`);
        document.getElementById('tournamentName').value = '';
        document.getElementById('tournamentDesc').value = '';
        loadTournamentList();
    } catch (e) {
        console.error('Помилка створення турніру:', e);
        toast('❌ Помилка створення турніру');
    }
};

// Створити завдання дня
window.adminCreateDaily = async function() {
    const lang = document.getElementById('dailyLang').value;
    const question = document.getElementById('dailyQuestion').value.trim();
    const optionsRaw = document.getElementById('dailyOptions').value.trim();
    const correct = parseInt(document.getElementById('dailyCorrect').value) || 0;
    const type = document.getElementById('dailyType').value;
    
    if (!question || !optionsRaw) {
        toast('❌ Заповніть питання та варіанти відповідей');
        return;
    }
    
    const options = optionsRaw.split(',').map(s => s.trim());
    if (options.length < 2) {
        toast('❌ Варіантів має бути не менше 2');
        return;
    }
    
    const today = new Date().toISOString().slice(0, 10);
    // Раніше документ мав id === today, спільний для АБСОЛЮТНО ВСІХ мов —
    // людина, що вчить англійську, бачила те саме (найчастіше норвезьке)
    // завдання, що й той, хто вчить норвезьку. Тепер id включає мову, і
    // кожна мова має власне завдання дня.
    const docId = `${lang}_${today}`;
    
    try {
        await firebaseDb.collection('daily_tasks').doc(docId).set({
            question,
            options,
            correct,
            type,
            lang,
            level: LD(lang).level || 'A1',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        toast(`✅ Завдання на ${today} (${getLanguage(lang).name.uk}) створено!`);
        document.getElementById('dailyQuestion').value = '';
        document.getElementById('dailyOptions').value = '';
        loadDailyList();
    } catch (e) {
        console.error('Помилка створення завдання дня:', e);
        toast('❌ Помилка створення завдання');
    }
};

// =====================================================================
//  ДОПОМІЖНІ ФУНКЦІЇ
// =====================================================================

function errorAccessDenied() {
    return `<div class="view"><div class="empty-state"><h3>⛔ Доступ заборонено</h3><p>Ви не маєте прав адміністратора.</p></div></div>`;
}

// Завантажити список слів — тепер шукає і серед 731 вбудованого норвезького
// слова (VOCAB з data.js), і серед слів, які адмін додав вручну через
// Firestore. Раніше перевірялась ТІЛЬКИ колекція Firestore 'words', тому
// жодне з вбудованих слів узагалі не можна було знайти чи побачити тут.
async function loadWordList(query) {
    const container = document.getElementById('wordList');
    if (!container) return;
    query = (query || '').trim().toLowerCase();
    try {
        // 1) Вбудовані слова з data.js (усі рівні одразу)
        const builtin = [];
        if (typeof VOCAB === 'object' && VOCAB) {
            Object.keys(VOCAB).forEach(level => {
                (VOCAB[level] || []).forEach(w => {
                    if (!query || w.no.toLowerCase().includes(query) || w.uk.toLowerCase().includes(query)) {
                        builtin.push({ ...w, level, _builtin: true });
                    }
                });
            });
        }
        // 2) Слова, додані адміном через Firestore
        let adminWords = [];
        if (firebaseReady && firebaseDb) {
            const snap = await firebaseDb.collection('words').limit(200).get();
            snap.forEach(doc => {
                const data = doc.data();
                if (!query || (data.no||'').toLowerCase().includes(query) || (data.uk||'').toLowerCase().includes(query)) {
                    adminWords.push({ ...data, _docId: doc.id });
                }
            });
        }

        const all = [...adminWords, ...builtin].slice(0, 300); // адмінські — першими (їх можна редагувати/видаляти)
        if (!all.length) {
            container.innerHTML = '<p style="color:var(--ink-soft);">' + (query ? 'Нічого не знайдено.' : 'Немає слів у словнику.') + '</p>';
            return;
        }
        let html = `<p style="color:var(--ink-soft);font-size:.8rem;margin-bottom:8px;">Знайдено: ${all.length} (${builtin.length} вбудованих, ${adminWords.length} доданих вручну)</p>`;
        html += '<table class="vocab-table"><thead><tr><th>Слово</th><th>Переклад</th><th>Рівень</th><th>Джерело</th><th>Дія</th></tr></thead><tbody>';
        all.forEach(data => {
            html += `<tr>
                <td><strong>${data.no}</strong></td>
                <td>${data.uk}</td>
                <td><span class="tag level-${data.level}">${data.level}</span></td>
                <td style="font-size:.75rem;color:var(--ink-soft);">${data._builtin ? 'Вбудоване' : 'Додано вручну'}</td>
                <td>${data._builtin ? '<span style="color:var(--ink-soft);font-size:.75rem;">—</span>' : `<button class="btn btn-danger btn-sm" onclick="adminDeleteWord('${data._docId}')">🗑️</button>`}</td>
            </tr>`;
        });
        html += '</tbody></table>';
        container.innerHTML = html;
    } catch (e) {
        console.error('Помилка завантаження слів:', e);
        container.innerHTML = '<p style="color:var(--rose);">Помилка завантаження.</p>';
    }
}

// Видалити слово
window.adminDeleteWord = async function(docId) {
    if (!confirm('Ви впевнені?')) return;
    try {
        await firebaseDb.collection('words').doc(docId).delete();
        toast('🗑️ Слово видалено');
        loadWordList();
    } catch (e) {
        console.error('Помилка видалення:', e);
        toast('❌ Помилка видалення');
    }
};

// Завантажити турніри
// Кількість учасників рахуємо з підколекції tournaments/{id}/participants —
// саме туди пишуться реальні результати гравців. Поле participants у
// самому документі турніру ніколи не заповнюється, тож рахувати з нього
// людей не можна.
async function loadTournamentList() {
    const container = document.getElementById('tournamentList');
    if (!container) return;
    try {
        const snap = await firebaseDb.collection('tournaments').orderBy('createdAt', 'desc').limit(10).get();
        if (snap.empty) {
            container.innerHTML = '<p style="color:var(--ink-soft);">Немає турнірів.</p>';
            return;
        }
        let html = '';
        for (const doc of snap.docs) {
            const data = doc.data();
            const statusMap = { waiting: '⏳ Очікує', active: '🔄 Активний', finished: '✅ Завершено' };

            let participantsCount = 0;
            let participantsHtml = '<p style="color:var(--ink-soft);font-size:.85rem;">Ще ніхто не приєднався.</p>';
            try {
                const pSnap = await firebaseDb.collection('tournaments').doc(doc.id).collection('participants').get();
                participantsCount = pSnap.size;
                if (!pSnap.empty) {
                    const rows = pSnap.docs
                        .map(p => ({ id: p.id, ...p.data() }))
                        .sort((a, b) => (b.correct || 0) - (a.correct || 0));
                    participantsHtml = '<table class="vocab-table"><thead><tr><th>Ім\'я</th><th>Результат</th></tr></thead><tbody>' +
                        rows.map(p => `<tr><td>${escHtml(p.name || p.id)}</td><td>${(p.correct ?? '—')}/${(p.total ?? '—')}</td></tr>`).join('') +
                        '</tbody></table>';
                }
            } catch (e) {
                console.error('Помилка завантаження учасників турніру:', e);
                participantsHtml = '<p style="color:var(--rose);">Не вдалося завантажити список учасників.</p>';
            }

            html += `
                <div class="card" style="margin-bottom:8px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                        <div>
                            <strong>${escHtml(data.name || '')}</strong> ${statusMap[data.status] || data.status}
                            <span style="font-size:.8rem;color:var(--ink-soft);margin-left:12px;">${data.level || 'A1'}</span>
                            <span class="tag" style="margin-left:8px;" title="Кількість учасників">👥 ${participantsCount}</span>
                        </div>
                        <div style="display:flex;gap:8px;">
                            <button class="btn btn-ghost btn-sm" onclick="toggleTournamentParticipants('${doc.id}')">👥 Учасники</button>
                            <button class="btn btn-danger btn-sm" onclick="adminDeleteTournament('${doc.id}')">🗑️</button>
                        </div>
                    </div>
                    <div id="tournParticipants-${doc.id}" style="display:none;margin-top:10px;max-height:300px;overflow-y:auto;">${participantsHtml}</div>
                </div>
            `;
        }
        container.innerHTML = html;
    } catch (e) {
        console.error('Помилка завантаження турнірів:', e);
        container.innerHTML = '<p style="color:var(--rose);">Помилка завантаження.</p>';

    }
}

// Показати/сховати список учасників конкретного турніру
window.toggleTournamentParticipants = function(docId) {
    const box = document.getElementById(`tournParticipants-${docId}`);
    if (box) box.style.display = box.style.display === 'none' ? 'block' : 'none';
};

// Видалити турнір
window.adminDeleteTournament = async function(docId) {
    if (!confirm('Ви впевнені?')) return;
    try {
        await firebaseDb.collection('tournaments').doc(docId).delete();
        toast('🗑️ Турнір видалено');
        loadTournamentList();
    } catch (e) {
        console.error('Помилка видалення турніру:', e);
        toast('❌ Помилка видалення');
    }
};

// Завантажити завдання дня
async function loadDailyList() {
    const container = document.getElementById('dailyList');
    if (!container) return;
    try {
        const snap = await firebaseDb.collection('daily_tasks').orderBy('createdAt', 'desc').limit(10).get();
        if (snap.empty) {
            container.innerHTML = '<p style="color:var(--ink-soft);">Немає завдань.</p>';
            return;
        }
        let html = '';
        snap.forEach(doc => {
            const data = doc.data();
            const langInfo = data.lang ? getLanguage(data.lang) : null;
            const langLabel = langInfo ? `${langInfo.flag} ${langInfo.name.uk}` : '⚠️ без мови (старий запис)';
            html += `
                <div class="card" style="margin-bottom:8px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <strong>${data.question?.slice(0, 60)}...</strong>
                            <span style="font-size:.8rem;color:var(--ink-soft);margin-left:12px;">${langLabel} · ${doc.id}</span>
                        </div>
                        <button class="btn btn-danger btn-sm" onclick="adminDeleteDaily('${doc.id}')">🗑️</button>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    } catch (e) {
        console.error('Помилка завантаження завдань:', e);
        container.innerHTML = '<p style="color:var(--rose);">Помилка завантаження.</p>';
    }
}

// Видалити завдання дня
window.adminDeleteDaily = async function(docId) {
    if (!confirm('Ви впевнені?')) return;
    try {
        await firebaseDb.collection('daily_tasks').doc(docId).delete();
        toast('🗑️ Завдання видалено');
        loadDailyList();
    } catch (e) {
        console.error('Помилка видалення завдання:', e);
        toast('❌ Помилка видалення');
    }
};

// =====================================================================
//  ПОШУК СЛІВ
// =====================================================================
// Раніше це було прив'язано через document.addEventListener('DOMContentLoaded', ...),
// яка спрацьовує ОДИН РАЗ при першому завантаженні сторінки — а оскільки
// сторінка "Слова" рендериться пізніше через navigate() (SPA-навігація, без
// повного перезавантаження), DOMContentLoaded вже давно відбувся і ніколи
// не спрацює повторно. Тому пошук у полі #wordSearch просто ніколи не
// прив'язувався. initAdminWords() тепер викликається одразу після того, як
// розмітка сторінки реально в DOM (див. router.js).
function initAdminWords() {
    const searchInput = document.getElementById('wordSearch');
    if (!searchInput) return; // не та сторінка
    loadWordList(); // початкове завантаження (усі слова)
    let debounceTimer;
    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        const q = this.value;
        debounceTimer = setTimeout(() => loadWordList(q), 250);
    });
}

// =====================================================================
//  СТОРІНКА: Спільні словники (для мов, окрім норвезької)
// =====================================================================
// На відміну від "Слова" вище (яка керує лише вбудованим норвезьким
// словником по одному слову), ця сторінка генерує ВЕЛИКИЙ словник одразу
// для будь-якої іншої мови+рівня через AI, і публікує його в спільну
// колекцію Firestore (sharedVocab) — після цього словник одразу бачать
// УСІ користувачі сайту, без жодної дії з їхнього боку.
function viewAdminSharedVocab() {
    if (!STATE || !STATE.admin) return errorAccessDenied();

    const preset = (typeof SUBSTATE !== 'undefined' && SUBSTATE) || {};
    const allLangs = LANGUAGES; // тепер включно з норвезькою — можна доповнювати вбудований словник

    return `
        <div class="view">
            <h1>🌐 Спільні словники</h1>
            <p style="color:var(--ink-soft);margin-bottom:16px;">
                Згенеруйте словник для мови й рівня, перегляньте результат і опублікуйте —
                після цього його одразу побачать усі користувачі сайту, які вчать цю мову.
                Для норвезької це ДОДАЄ слова поверх уже наявного вбудованого словника
                (не замінює його) — зручно, щоб розширити конкретну тему чи рівень.
            </p>

            <div class="card" style="margin-bottom:16px;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                    <div class="field">
                        <label>Мова</label>
                        <select id="avLang">
                            ${allLangs.map(l => `<option value="${l.code}" ${preset.presetLang===l.code?'selected':''}>${l.flag} ${l.name.uk}</option>`).join('')}
                        </select>
                    </div>
                    <div class="field">
                        <label>Рівень</label>
                        <select id="avLevel">
                            ${['A1','A2','B1','B2','C1','C2'].map(l => `<option value="${l}" ${preset.presetLevel===l?'selected':''}>${l}</option>`).join('')}
                        </select>
                    </div>
                    <div class="field">
                        <label>Кількість пакетів (~60 слів кожен)</label>
                        <select id="avBatches">
                            <option value="3">3 (~180 слів)</option>
                            <option value="5" selected>5 (~300 слів)</option>
                            <option value="8">8 (~480 слів)</option>
                        </select>
                    </div>
                    <div class="field" style="display:flex;align-items:flex-end;">
                        <button class="btn btn-primary btn-block" id="avGenerateBtn">✨ Згенерувати</button>
                    </div>
                </div>
                <p id="avStatus" style="color:var(--ink-soft);font-size:.85rem;margin-top:10px;"></p>
            </div>

            <div class="card" id="avExistingCard" style="margin-bottom:16px;">
                <h3>📦 Уже опубліковані словники</h3>
                <div id="avExistingList" style="color:var(--ink-soft);font-size:.85rem;">Завантаження…</div>
            </div>

            <div class="card" id="avPreviewCard" style="display:none;">
                <h3>👀 Прев'ю згенерованого набору (<span id="avPreviewCount">0</span> слів)</h3>
                <div id="avPreviewList" style="max-height:340px;overflow-y:auto;margin:12px 0;"></div>
                <button class="btn btn-primary" id="avPublishBtn">📤 Опублікувати для всіх користувачів</button>
                <button class="btn btn-ghost" id="avDiscardBtn">🗑️ Відхилити</button>
            </div>

            <button class="btn btn-ghost btn-sm" onclick="navigate('admin')" style="margin-top:12px;">← Назад до панелі</button>
        </div>
    `;
}

// Ініціалізація сторінки — прив'язка обробників і завантаження списку вже
// опублікованих словників. Викликається після рендеру (див. паттерн нижче,
// такий самий, як initAdminWords тощо).
function initAdminSharedVocab() {
    const genBtn = document.getElementById('avGenerateBtn');
    const statusEl = document.getElementById('avStatus');
    const previewCard = document.getElementById('avPreviewCard');
    const previewList = document.getElementById('avPreviewList');
    const previewCount = document.getElementById('avPreviewCount');
    const existingList = document.getElementById('avExistingList');
    if (!genBtn) return; // не та сторінка

    let pendingWords = null;
    let pendingLang = null;
    let pendingLevel = null;

    async function refreshExisting() {
        if (!firebaseReady || !firebaseDb) {
            existingList.textContent = 'Firestore недоступний.';
            return;
        }
        try {
            const snap = await firebaseDb.collection('sharedVocab').get();
            if (snap.empty) {
                existingList.textContent = 'Ще нічого не опубліковано.';
                return;
            }
            const rows = [];
            snap.forEach(doc => {
                const d = doc.data();
                const lang = getLanguage(d.lang);
                rows.push(`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--line-soft);">
                    <span>${lang.flag} ${lang.name.uk} — <span class="tag level-${d.level}">${d.level}</span></span>
                    <span>${d.count || (d.words||[]).length} слів</span>
                </div>`);
            });
            existingList.innerHTML = rows.join('');
        } catch (e) {
            console.error('[Адмін] Помилка завантаження списку словників:', e);
            existingList.textContent = 'Помилка завантаження.';
        }
    }
    refreshExisting();

    genBtn.onclick = async () => {
        const lang = document.getElementById('avLang').value;
        const level = document.getElementById('avLevel').value;
        const batches = parseInt(document.getElementById('avBatches').value, 10);
        genBtn.disabled = true;
        const original = genBtn.textContent;
        try {
            const words = await generateBulkVocab(lang, level, batches, (done, total, count) => {
                statusEl.textContent = `Генерую… пакет ${done}/${total}, слів зібрано: ${count}`;
            });
            pendingWords = words;
            pendingLang = lang;
            pendingLevel = level;
            previewCount.textContent = words.length;
            previewList.innerHTML = words.map(w => `
                <div style="padding:6px 0;border-bottom:1px solid var(--line-soft);font-size:.85rem;">
                    <strong>${w.no}</strong> — ${w.uk}${w.en ? ` · en: ${w.en}` : ''}${w.ru ? ` · ru: ${w.ru}` : ''} <span style="color:var(--ink-soft);">(${w.t || ''})</span>
                </div>
            `).join('');
            previewCard.style.display = 'block';
            statusEl.textContent = `Готово: ${words.length} слів. Перевірте прев'ю нижче й опублікуйте.`;
        } catch (e) {
            console.error('[Адмін] Помилка генерації словника:', e);
            // Раніше показувався лише загальний текст без причини — не було
            // видно, чи це ліміт запитів (429), заблокований origin (403),
            // мережева помилка, чи AI повернув не-JSON. Тепер показуємо код і
            // деталь помилки, щоб можна було одразу зрозуміти причину.
            let reason = e && e.message || 'невідома помилка';
            if (e && e.code === 'PROXY_ERROR') {
                reason = `код ${e.status}` + (e.detail ? `: ${String(e.detail).slice(0, 200)}` : '');
                if (e.status === 429) reason += ' (забагато запитів підряд — зачекайте хвилину й спробуйте знову)';
                if (e.status === 403) reason += ' (Worker не дозволяє цей сайт як джерело запиту — перевірте ALLOWED_ORIGINS)';
            } else if (e && e.code === 'NETWORK_ERROR') {
                reason = 'не вдалось з'+"'"+'єднатися з AI-проксі (мережа/CORS/URL Worker'+"'"+'а)';
            } else if (e && e.code === 'NOT_CONFIGURED') {
                reason = 'адреса AI-проксі (AI_PROXY_URL) не налаштована на сайті';
            }
            statusEl.textContent = `⚠️ Помилка генерації: ${reason}`;
        } finally {
            genBtn.disabled = false;
            genBtn.textContent = original;
        }
    };

    const publishBtn = document.getElementById('avPublishBtn');
    if (publishBtn) publishBtn.onclick = async () => {
        if (!pendingWords || !pendingWords.length) return;
        publishBtn.disabled = true;
        try {
            await saveSharedVocab(pendingLang, pendingLevel, pendingWords);
            toast(`✅ Опубліковано ${pendingWords.length} слів для ${getLanguage(pendingLang).name.uk} (${pendingLevel})`);
            previewCard.style.display = 'none';
            pendingWords = null;
            refreshExisting();
        } catch (e) {
            console.error('[Адмін] Помилка публікації:', e);
            toast('⚠️ Не вдалося опублікувати. Перевірте доступ до Firestore.');
        } finally {
            publishBtn.disabled = false;
        }
    };

    const discardBtn = document.getElementById('avDiscardBtn');
    if (discardBtn) discardBtn.onclick = () => {
        pendingWords = null;
        previewCard.style.display = 'none';
    };
}

// =====================================================================
//  СТОРІНКА: Спільна граматика (адмін генерує й публікує для всіх)
// =====================================================================
function viewAdminSharedGrammar() {
    if (!STATE || !STATE.admin) return errorAccessDenied();

    const nonNorwegian = LANGUAGES.filter(l => l.code !== 'no');

    return `
        <div class="view">
            <h1>📖 Спільна граматика</h1>
            <p style="color:var(--ink-soft);margin-bottom:16px;">
                Згенеруйте граматичні правила для мови й рівня, перегляньте результат і
                опублікуйте — після цього їх одразу побачать усі користувачі, які вчать цю
                мову, і у вкладці "Граматика", і серед питань тесту "Multiple Choice".
                Норвезька тут не потрібна — в неї вже є вбудований набір із 27 правил.
            </p>

            <div class="card" style="margin-bottom:16px;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                    <div class="field">
                        <label>Мова</label>
                        <select id="agLang">
                            ${nonNorwegian.map(l => `<option value="${l.code}">${l.flag} ${l.name.uk}</option>`).join('')}
                        </select>
                    </div>
                    <div class="field">
                        <label>Рівень</label>
                        <select id="agLevel">
                            ${['A1','A2','B1','B2','C1','C2'].map(l => `<option value="${l}">${l}</option>`).join('')}
                        </select>
                    </div>
                    <div class="field">
                        <label>Кількість пакетів (~4 правила кожен)</label>
                        <select id="agBatches">
                            <option value="2" selected>2 (~8 правил)</option>
                            <option value="4">4 (~16 правил)</option>
                            <option value="6">6 (~24 правила)</option>
                        </select>
                    </div>
                    <div class="field" style="display:flex;align-items:flex-end;">
                        <button class="btn btn-primary btn-block" id="agGenerateBtn">✨ Згенерувати</button>
                    </div>
                </div>
                <p id="agStatus" style="color:var(--ink-soft);font-size:.85rem;margin-top:10px;"></p>
            </div>

            <div class="card" id="agExistingCard" style="margin-bottom:16px;">
                <h3>📦 Уже опубліковано</h3>
                <div id="agExistingList" style="color:var(--ink-soft);font-size:.85rem;">Завантаження…</div>
            </div>

            <div class="card" id="agPreviewCard" style="display:none;">
                <h3>👀 Прев'ю (<span id="agPreviewCount">0</span> правил)</h3>
                <div id="agPreviewList" style="max-height:340px;overflow-y:auto;margin:12px 0;"></div>
                <button class="btn btn-primary" id="agPublishBtn">📤 Опублікувати для всіх користувачів</button>
                <button class="btn btn-ghost" id="agDiscardBtn">🗑️ Відхилити</button>
            </div>

            <button class="btn btn-ghost btn-sm" onclick="navigate('admin')" style="margin-top:12px;">← Назад до панелі</button>
        </div>
    `;
}

function initAdminSharedGrammar() {
    const genBtn = document.getElementById('agGenerateBtn');
    const statusEl = document.getElementById('agStatus');
    const previewCard = document.getElementById('agPreviewCard');
    const previewList = document.getElementById('agPreviewList');
    const previewCount = document.getElementById('agPreviewCount');
    const existingList = document.getElementById('agExistingList');
    if (!genBtn) return; // не та сторінка

    let pendingRules = null;
    let pendingLang = null;
    let pendingLevel = null;

    async function refreshExisting() {
        if (!firebaseReady || !firebaseDb) {
            existingList.textContent = 'Firestore недоступний.';
            return;
        }
        try {
            const snap = await firebaseDb.collection('sharedGrammar').get();
            if (snap.empty) {
                existingList.textContent = 'Ще нічого не опубліковано.';
                return;
            }
            const rows = [];
            snap.forEach(doc => {
                const d = doc.data();
                const lang = getLanguage(d.lang);
                rows.push(`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--line-soft);">
                    <span>${lang.flag} ${lang.name.uk} — <span class="tag level-${d.level}">${d.level}</span></span>
                    <span>${d.count || (d.rules||[]).length} правил</span>
                </div>`);
            });
            existingList.innerHTML = rows.join('');
        } catch (e) {
            console.error('[Адмін] Помилка завантаження списку граматики:', e);
            existingList.textContent = 'Помилка завантаження.';
        }
    }
    refreshExisting();

    genBtn.onclick = async () => {
        const lang = document.getElementById('agLang').value;
        const level = document.getElementById('agLevel').value;
        const batches = parseInt(document.getElementById('agBatches').value, 10);
        genBtn.disabled = true;
        const original = genBtn.textContent;
        try {
            const rules = await generateBulkGrammar(lang, level, batches, (done, total, count) => {
                statusEl.textContent = `Генерую… пакет ${done}/${total}, правил зібрано: ${count}`;
            });
            pendingRules = rules;
            pendingLang = lang;
            pendingLevel = level;
            previewCount.textContent = rules.length;
            previewList.innerHTML = rules.map(g => `
                <div style="padding:8px 0;border-bottom:1px solid var(--line-soft);font-size:.85rem;">
                    <strong>${g.title}</strong>
                    <div style="color:var(--ink-soft);">${g.exp}</div>
                </div>
            `).join('');
            previewCard.style.display = 'block';
            statusEl.textContent = `Готово: ${rules.length} правил. Перевірте прев'ю нижче й опублікуйте.`;
        } catch (e) {
            console.error('[Адмін] Помилка генерації граматики:', e);
            // Той самий діагностичний фікс, що й для генерації словника —
            // конкретна причина (rate-limit, CORS, не налаштовано) замість
            // загального "спробуйте ще раз".
            let reason = e && e.message || 'невідома помилка';
            if (e && e.code === 'PROXY_ERROR') {
                reason = `код ${e.status}` + (e.detail ? `: ${String(e.detail).slice(0, 200)}` : '');
                if (e.status === 429) reason += ' (забагато запитів підряд — зачекайте хвилину й спробуйте знову)';
                if (e.status === 403) reason += ' (Worker не дозволяє цей сайт як джерело запиту — перевірте ALLOWED_ORIGINS)';
            } else if (e && e.code === 'NETWORK_ERROR') {
                reason = 'не вдалось з'+"'"+'єднатися з AI-проксі (мережа/CORS/URL Worker'+"'"+'а)';
            } else if (e && e.code === 'NOT_CONFIGURED') {
                reason = 'адреса AI-проксі (AI_PROXY_URL) не налаштована на сайті';
            }
            statusEl.textContent = `⚠️ Помилка генерації: ${reason}`;
        } finally {
            genBtn.disabled = false;
            genBtn.textContent = original;
        }
    };

    const publishBtn = document.getElementById('agPublishBtn');
    if (publishBtn) publishBtn.onclick = async () => {
        if (!pendingRules || !pendingRules.length) return;
        publishBtn.disabled = true;
        try {
            await saveSharedGrammar(pendingLang, pendingLevel, pendingRules);
            toast(`✅ Опубліковано ${pendingRules.length} правил для ${getLanguage(pendingLang).name.uk} (${pendingLevel})`);
            previewCard.style.display = 'none';
            pendingRules = null;
            refreshExisting();
        } catch (e) {
            console.error('[Адмін] Помилка публікації:', e);
            toast('⚠️ Не вдалося опублікувати. Перевірте доступ до Firestore.');
        } finally {
            publishBtn.disabled = false;
        }
    };

    const discardBtn = document.getElementById('agDiscardBtn');
    if (discardBtn) discardBtn.onclick = () => {
        pendingRules = null;
        previewCard.style.display = 'none';
    };
}

// =====================================================================
//  СТОРІНКА: Книги (адмін вручну вставляє текст суспільного надбання)
// =====================================================================
// НАГАДУВАННЯ ПРО АВТОРСЬКЕ ПРАВО: на відміну від словника й граматики,
// текст книги AI НЕ генерує — його вставляє сюди сам адмін. Публікуй лише
// тексти, які точно є суспільним надбанням (автор помер >70 років тому —
// залежно від юрисдикції; Project Gutenberg, nb.no/bokhylla з позначкою
// вільного доступу тощо) або на які в тебе є права. AI тут лише допомагає
// з двома речами ПІСЛЯ того, як текст уже вставлено: переклад слів по
// кліку під час читання і завдання на розуміння прочитаного.
let _abEditingBookId = null;

function viewAdminBooks() {
    if (!STATE || !STATE.admin) return errorAccessDenied();
    const nonNorwegian = LANGUAGES; // книги можна додавати й норвезькою (це не GRAMMAR-конфлікт, окрема колекція)

    return `
        <div class="view">
            <h1>📚 Книги</h1>
            <p style="color:var(--ink-soft);margin-bottom:16px;">
                Встав текст книги суспільного надбання по розділах. Для кожного розділу можна
                одразу згенерувати завдання на розуміння прочитаного (AI спирається САМЕ на цей
                текст, а не вигадує від себе).
            </p>

            <div class="card" style="margin-bottom:16px;">
                <h3 id="abFormTitle" style="margin-top:0;">➕ Нова книга</h3>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                    <div class="field">
                        <label>Мова</label>
                        <select id="abLang">
                            ${nonNorwegian.map(l => `<option value="${l.code}">${l.flag} ${l.name.uk}</option>`).join('')}
                        </select>
                    </div>
                    <div class="field">
                        <label>Рівень</label>
                        <select id="abLevel">
                            ${['A1','A2','B1','B2','C1','C2'].map(l => `<option value="${l}">${l}</option>`).join('')}
                        </select>
                    </div>
                    <div class="field">
                        <label>Назва книги</label>
                        <input type="text" id="abTitle" placeholder="напр. Peter Pan">
                    </div>
                    <div class="field">
                        <label>Автор</label>
                        <input type="text" id="abAuthor" placeholder="напр. J. M. Barrie">
                    </div>
                </div>
                <div class="field" style="margin-top:10px;">
                    <label>Джерело / підтвердження суспільного надбання</label>
                    <input type="text" id="abSource" placeholder="напр. Project Gutenberg, gutenberg.org/ebooks/16">
                </div>

                <h4 style="margin:18px 0 8px;">Розділи</h4>
                <div id="abChapters"></div>
                <button class="btn btn-ghost btn-sm" id="abAddChapterBtn">+ Додати розділ</button>

                <div style="display:flex;gap:10px;margin-top:18px;">
                    <button class="btn btn-primary" id="abPublishBtn">📤 Опублікувати книгу</button>
                    <button class="btn btn-ghost" id="abResetBtn" style="display:none;">Скасувати редагування</button>
                </div>
                <p id="abStatus" style="color:var(--ink-soft);font-size:.85rem;margin-top:10px;"></p>
            </div>

            <div class="card" id="abExistingCard">
                <h3>📦 Опубліковані книги</h3>
                <div id="abExistingList" style="color:var(--ink-soft);font-size:.85rem;">Завантаження…</div>
            </div>

            <button class="btn btn-ghost btn-sm" onclick="navigate('admin')" style="margin-top:12px;">← Назад до панелі</button>
        </div>
    `;
}

function _abChapterEditorHtml(idx, chapter) {
    chapter = chapter || {};
    const tasksCount = (chapter.tasks || []).length;
    return `
        <div class="book-chapter-editor" data-chapter-idx="${idx}">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <strong>Розділ ${idx + 1}</strong>
                <button class="btn btn-ghost btn-sm ab-remove-chapter" data-idx="${idx}" type="button">🗑️ Прибрати</button>
            </div>
            <div class="field" style="margin-bottom:8px;">
                <label>Назва розділу</label>
                <input type="text" class="ab-chapter-title" data-idx="${idx}" value="${escHtml(chapter.title || '')}" placeholder="напр. Розділ 1: Пітер порушує домашній спокій">
            </div>
            <div class="field">
                <label>Текст розділу (порожній рядок = новий абзац)</label>
                <textarea class="ab-chapter-text" data-idx="${idx}">${escHtml(chapter.text || '')}</textarea>
            </div>
            <div style="display:flex;gap:10px;align-items:center;margin-top:8px;">
                <button class="btn btn-ghost btn-sm ab-gen-tasks" data-idx="${idx}" type="button">🎯 Згенерувати завдання</button>
                <span class="ab-tasks-status" data-idx="${idx}" style="font-size:.8rem;color:var(--ink-soft);">${tasksCount ? `✅ ${tasksCount} завдань` : 'Завдань ще нема'}</span>
            </div>
        </div>
    `;
}

function initAdminBooks() {
    const chaptersEl = document.getElementById('abChapters');
    const addBtn = document.getElementById('abAddChapterBtn');
    const publishBtn = document.getElementById('abPublishBtn');
    const resetBtn = document.getElementById('abResetBtn');
    const statusEl = document.getElementById('abStatus');
    const existingList = document.getElementById('abExistingList');
    if (!chaptersEl) return; // не та сторінка

    // КРИТИЧНО: раніше _abEditingBookId скидався лише кнопкою "Скасувати
    // редагування", а не при звичайному відкритті сторінки. Тобто після
    // публікації книги A її ID лишався в _abEditingBookId; якщо потім
    // просто заходили на "Книги" знову й заповнювали форму для ЗОВСІМ
    // нової книги B, публікація B передавала в saveSharedBook() СТАРИЙ ID
    // книги A — і Firestore-документ книги A тихо ПЕРЕЗАПИСУВАВСЯ вмістом
    // книги B (set() з merge:false). Тепер кожне відкриття сторінки
    // гарантовано починається в режимі "нова книга".
    _abEditingBookId = null;

    // Локальна модель розділів поточної форми (тримаємо тут, а не тільки в
    // DOM, щоб зберегти tasks[] між рендерами — вони не мають свого поля вводу).
    let chapters = [];

    function renderChapters() {
        chaptersEl.innerHTML = chapters.map((c, i) => _abChapterEditorHtml(i, c)).join('');
        chaptersEl.querySelectorAll('.ab-remove-chapter').forEach(btn => {
            btn.onclick = () => { chapters.splice(parseInt(btn.dataset.idx, 10), 1); renderChapters(); };
        });
        chaptersEl.querySelectorAll('.ab-chapter-title').forEach(inp => {
            inp.oninput = () => { chapters[parseInt(inp.dataset.idx, 10)].title = inp.value; };
        });
        chaptersEl.querySelectorAll('.ab-chapter-text').forEach(ta => {
            ta.oninput = () => { chapters[parseInt(ta.dataset.idx, 10)].text = ta.value; };
        });
        chaptersEl.querySelectorAll('.ab-gen-tasks').forEach(btn => {
            btn.onclick = async () => {
                const idx = parseInt(btn.dataset.idx, 10);
                const ch = chapters[idx];
                if (!ch.text || ch.text.trim().length < 200) {
                    toast('⚠️ Спершу встав текст розділу (щонайменше кілька абзаців) — на його основі AI складе завдання.');
                    return;
                }
                const statusSpan = chaptersEl.querySelector(`.ab-tasks-status[data-idx="${idx}"]`);
                const lang = document.getElementById('abLang').value;
                const level = document.getElementById('abLevel').value;
                btn.disabled = true;
                statusSpan.textContent = 'Генерую…';
                try {
                    const tasks = await generateChapterTasksAI(lang, level, ch.title || `Розділ ${idx + 1}`, ch.text);
                    ch.tasks = tasks;
                    statusSpan.textContent = tasks.length ? `✅ ${tasks.length} завдань` : '⚠️ AI не повернув завдань, спробуй ще раз';
                } catch (e) {
                    console.error('[Адмін] Помилка генерації завдань для розділу:', e);
                    let reason = e && e.message || 'невідома помилка';
                    if (e && e.code === 'PROXY_ERROR') {
                        reason = `код ${e.status}` + (e.status === 429 ? ' (забагато запитів підряд — зачекай хвилину)' : '');
                    } else if (e && e.code === 'NETWORK_ERROR') {
                        reason = 'мережа/CORS/URL Worker\'а';
                    } else if (e && e.code === 'NOT_CONFIGURED') {
                        reason = 'AI_PROXY_URL не налаштований';
                    }
                    statusSpan.textContent = `⚠️ Помилка: ${reason}`;
                } finally {
                    btn.disabled = false;
                }
            };
        });
    }

    function resetForm() {
        _abEditingBookId = null;
        chapters = [];
        document.getElementById('abFormTitle').textContent = '➕ Нова книга';
        document.getElementById('abLang').value = document.getElementById('abLang').options[0].value;
        document.getElementById('abLevel').value = 'A1';
        document.getElementById('abTitle').value = '';
        document.getElementById('abAuthor').value = '';
        document.getElementById('abSource').value = '';
        resetBtn.style.display = 'none';
        statusEl.textContent = '';
        renderChapters();
    }

    addBtn.onclick = () => { chapters.push({ title: '', text: '', tasks: [] }); renderChapters(); };
    resetBtn.onclick = resetForm;
    renderChapters(); // порожня форма при першому відкритті

    async function refreshExisting() {
        if (!firebaseReady || !firebaseDb) { existingList.textContent = 'Firestore недоступний.'; return; }
        try {
            const snap = await firebaseDb.collection('sharedBooks').get();
            if (snap.empty) { existingList.textContent = 'Ще нічого не опубліковано.'; return; }
            existingList.innerHTML = '';
            snap.forEach(doc => {
                const d = doc.data();
                const lang = getLanguage(d.lang);
                const row = el(`
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--line-soft);">
                        <span>${lang.flag} ${escHtml(d.title)} — <span class="tag level-${d.level}">${d.level}</span> · ${(d.chapters||[]).length} розд.</span>
                        <span>
                            <button class="btn btn-ghost btn-sm ab-edit-book" data-id="${doc.id}">✏️</button>
                            <button class="btn btn-ghost btn-sm ab-delete-book" data-id="${doc.id}">🗑️</button>
                        </span>
                    </div>
                `);
                row.querySelector('.ab-edit-book').onclick = () => loadBookIntoForm(doc.id, d);
                row.querySelector('.ab-delete-book').onclick = async () => {
                    if (!confirm(`Видалити книгу "${d.title}"? Це незворотно.`)) return;
                    try {
                        await deleteSharedBook(doc.id, d.lang);
                        toast('🗑️ Книгу видалено');
                        refreshExisting();
                        if (_abEditingBookId === doc.id) resetForm();
                    } catch (e) {
                        console.error('[Адмін] Помилка видалення книги:', e);
                        toast('⚠️ Не вдалося видалити.');
                    }
                };
                existingList.appendChild(row);
            });
        } catch (e) {
            console.error('[Адмін] Помилка завантаження списку книг:', e);
            existingList.textContent = 'Помилка завантаження.';
        }
    }

    function loadBookIntoForm(id, data) {
        _abEditingBookId = id;
        document.getElementById('abFormTitle').textContent = `✏️ Редагування: ${data.title}`;
        document.getElementById('abLang').value = data.lang;
        document.getElementById('abLevel').value = data.level;
        document.getElementById('abTitle').value = data.title || '';
        document.getElementById('abAuthor').value = data.author || '';
        document.getElementById('abSource').value = data.sourceNote || '';
        chapters = (data.chapters || []).map(c => Object.assign({}, c));
        resetBtn.style.display = 'inline-block';
        renderChapters();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    refreshExisting();

    publishBtn.onclick = async () => {
        const lang = document.getElementById('abLang').value;
        const level = document.getElementById('abLevel').value;
        const title = document.getElementById('abTitle').value.trim();
        const author = document.getElementById('abAuthor').value.trim();
        const sourceNote = document.getElementById('abSource').value.trim();
        if (!title) { toast('⚠️ Введи назву книги.'); return; }
        if (!chapters.length || !chapters.some(c => c.text && c.text.trim().length > 0)) {
            toast('⚠️ Додай хоча б один розділ із текстом.');
            return;
        }
        if (!sourceNote) {
            toast('⚠️ Вкажи джерело/підтвердження, що це суспільне надбання — це важливо з юридичної точки зору.');
            return;
        }
        publishBtn.disabled = true;
        statusEl.textContent = 'Публікую…';
        try {
            const cleanChapters = chapters
                .filter(c => c.text && c.text.trim())
                .map(c => ({ title: c.title || '', text: c.text, tasks: c.tasks || [] }));
            const id = await saveSharedBook(_abEditingBookId, { lang, level, title, author, sourceNote, chapters: cleanChapters });
            _abEditingBookId = id;
            toast(`✅ Опубліковано "${title}"`);
            statusEl.textContent = `Опубліковано (${cleanChapters.length} розділів).`;
            resetBtn.style.display = 'inline-block';
            refreshExisting();
        } catch (e) {
            console.error('[Адмін] Помилка публікації книги:', e);
            statusEl.textContent = '⚠️ Не вдалося опублікувати. Перевірте доступ до Firestore.';
        } finally {
            publishBtn.disabled = false;
        }
    };
}

// =====================================================================
//  СТОРІНКА: Слово дня (адмін обирає конкретне слово для головної)
// =====================================================================
// "Завдання дня" (daily_tasks) — це квіз-питання з варіантами відповіді.
// "Слово дня" — інша, простіша річ: картка на головній (dw у viewHome),
// раніше вибиралась ЛИШЕ автоматично — детермінований прохід по словнику
// поточного рівня (pickDailyWord() у views-core.js), без жодної можливості
// для адміна вплинути на вибір. Тепер адмін може опублікувати конкретне
// слово на сьогодні для обраної мови (daily_words/{lang}_{today}) — і воно
// перекриє автоматичний вибір саме для тих, хто вчить цю мову. Якщо на
// сьогодні для мови нічого не опубліковано — просто працює як раніше,
// автоматичний вибір.
function viewAdminDailyWord() {
    if (!STATE || !STATE.admin) return errorAccessDenied();

    return `
        <div class="view">
            <h1>📝 Слово дня</h1>
            <div class="card" style="margin-bottom:16px;color:var(--ink-soft);font-size:.85rem;">
                Публікується окремо для кожної мови навчання й діє лише на сьогодні
                (${new Date().toISOString().slice(0,10)}). Якщо нічого не опубліковано —
                на головній показується слово, обране автоматично.
            </div>
            <div class="card">
                <h3>✏️ Опублікувати слово на сьогодні</h3>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;">
                    <div class="field">
                        <label>Мова навчання</label>
                        <select id="dwLang">
                            ${LANGUAGES.map(l => `<option value="${l.code}">${l.flag} ${l.name.uk}</option>`).join('')}
                        </select>
                    </div>
                    <div class="field">
                        <label>Рівень</label>
                        <select id="dwLevel">
                            ${['A1','A2','B1','B2','C1','C2'].map(l => `<option value="${l}">${l}</option>`).join('')}
                        </select>
                    </div>
                    <div class="field">
                        <label>Слово (мовою вивчення)</label>
                        <input id="dwNo" placeholder="Наприклад: bil">
                    </div>
                    <div class="field">
                        <label>Переклад українською</label>
                        <input id="dwUk" placeholder="Наприклад: машина">
                    </div>
                    <div class="field">
                        <label>Переклад англійською</label>
                        <input id="dwEn" placeholder="car">
                    </div>
                    <div class="field">
                        <label>Переклад російською</label>
                        <input id="dwRu" placeholder="машина">
                    </div>
                    <div class="field" style="grid-column:1/-1;">
                        <label>Приклад речення мовою вивчення</label>
                        <input id="dwExNo" placeholder="Jeg har en bil.">
                    </div>
                    <div class="field" style="grid-column:1/-1;">
                        <label>Переклад прикладу українською</label>
                        <input id="dwExUk" placeholder="У мене є машина.">
                    </div>
                </div>
                <button class="btn btn-primary" id="dwPublishBtn">📝 Опублікувати на сьогодні</button>
                <p id="dwStatus" style="color:var(--ink-soft);font-size:.85rem;margin-top:8px;"></p>
            </div>

            <div class="card" style="margin-top:16px;">
                <h3>📋 Опубліковано на сьогодні</h3>
                <div id="dwTodayList" style="margin-top:12px;">Завантаження…</div>
            </div>

            <button class="btn btn-ghost btn-sm" onclick="navigate('admin')" style="margin-top:12px;">← Назад до панелі</button>
        </div>
    `;
}

function initAdminDailyWord() {
    const publishBtn = document.getElementById('dwPublishBtn');
    if (!publishBtn) return; // не та сторінка

    const statusEl = document.getElementById('dwStatus');
    const listEl = document.getElementById('dwTodayList');
    const today = new Date().toISOString().slice(0, 10);

    async function refreshList() {
        if (!firebaseReady || !firebaseDb) {
            listEl.textContent = 'Firestore недоступний.';
            return;
        }
        try {
            const snap = await firebaseDb.collection('daily_words')
                .where('date', '==', today).get();
            if (snap.empty) {
                listEl.innerHTML = '<p style="color:var(--ink-soft);">На сьогодні ще нічого не опубліковано — діє автоматичний вибір.</p>';
                return;
            }
            const rows = [];
            snap.forEach(doc => {
                const d = doc.data();
                const lang = getLanguage(d.lang);
                rows.push(`
                    <div class="card" style="margin-bottom:8px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;">
                            <div>
                                <strong>${escHtml(d.no)}</strong> — ${escHtml(d.uk)}
                                <span style="font-size:.8rem;color:var(--ink-soft);margin-left:12px;">${lang.flag} ${lang.name.uk} · ${d.level}</span>
                            </div>
                            <button class="btn btn-danger btn-sm" onclick="adminDeleteDailyWord('${doc.id}')">🗑️</button>
                        </div>
                    </div>
                `);
            });
            listEl.innerHTML = rows.join('');
        } catch (e) {
            console.error('[Адмін] Помилка завантаження слів дня:', e);
            listEl.textContent = 'Помилка завантаження.';
        }
    }
    refreshList();

    publishBtn.onclick = async () => {
        const lang = document.getElementById('dwLang').value;
        const level = document.getElementById('dwLevel').value;
        const no = document.getElementById('dwNo').value.trim();
        const uk = document.getElementById('dwUk').value.trim();
        const en = document.getElementById('dwEn').value.trim();
        const ru = document.getElementById('dwRu').value.trim();
        const ex_no = document.getElementById('dwExNo').value.trim();
        const ex_uk = document.getElementById('dwExUk').value.trim();

        if (!no || !uk) {
            toast('❌ Заповніть щонайменше слово й переклад українською');
            return;
        }

        publishBtn.disabled = true;
        try {
            const docId = `${lang}_${today}`;
            await firebaseDb.collection('daily_words').doc(docId).set({
                no, uk, en, ru, ex_no, ex_uk, level, lang, date: today,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
            toast(`✅ Слово дня для ${getLanguage(lang).name.uk} опубліковано!`);
            statusEl.textContent = `Опубліковано: "${no}" (${lang}, ${today}).`;
            refreshList();
        } catch (e) {
            console.error('[Адмін] Помилка публікації слова дня:', e);
            statusEl.textContent = '⚠️ Не вдалося опублікувати. Перевірте доступ до Firestore.';
        } finally {
            publishBtn.disabled = false;
        }
    };
}

window.adminDeleteDailyWord = async function(docId) {
    if (!confirm('Видалити це слово дня?')) return;
    try {
        await firebaseDb.collection('daily_words').doc(docId).delete();
        toast('🗑️ Видалено');
        navigate('admin-daily-word');
    } catch (e) {
        console.error('[Адмін] Помилка видалення слова дня:', e);
        toast('❌ Помилка видалення');
    }
};