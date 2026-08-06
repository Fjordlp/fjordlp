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
                    <div class="field">
                        <label>Рівень</label>
                        <select id="tournamentLevel">
                            ${['A1','A2','B1','B2','C1','C2'].map(l => `<option value="${l}">${l}</option>`).join('')}
                        </select>
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
            <div class="card">
                <h3>✏️ Створити завдання на сьогодні</h3>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;">
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
            rows.push({ id: doc.id, name, email, level: d.level || '—', xp: d.xp || 0, admin: !!d.admin, targetLang: d.targetLang || 'no' });
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
    
    if (!name) {
        toast('❌ Введіть назву турніру');
        return;
    }
    
    try {
        const words = vocabForLevel(level);
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
    
    try {
        await firebaseDb.collection('daily_tasks').doc(today).set({
            question,
            options,
            correct,
            type,
            level: STATE.level || 'A1',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        toast(`✅ Завдання на ${today} створено!`);
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
            html += `
                <div class="card" style="margin-bottom:8px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <strong>${data.question?.slice(0, 60)}...</strong>
                            <span style="font-size:.8rem;color:var(--ink-soft);margin-left:12px;">${doc.id}</span>
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
            statusEl.textContent = '⚠️ Помилка генерації. Спробуйте ще раз.';
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