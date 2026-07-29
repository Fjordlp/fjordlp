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
                <div id="userList" style="margin-top:12px;max-height:500px;overflow-y:auto;">Завантаження...</div>
            </div>
            <button class="btn btn-ghost btn-sm" onclick="navigate('admin')" style="margin-top:12px;">← Назад до панелі</button>
        </div>
    `;
}

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

// Завантажити список слів
async function loadWordList() {
    const container = document.getElementById('wordList');
    if (!container) return;
    try {
        const snap = await firebaseDb.collection('words').limit(100).get();
        if (snap.empty) {
            container.innerHTML = '<p style="color:var(--ink-soft);">Немає слів у словнику.</p>';
            return;
        }
        let html = '<table class="vocab-table"><thead><tr><th>Слово</th><th>Переклад</th><th>Рівень</th><th>Дія</th></tr></thead><tbody>';
        snap.forEach(doc => {
            const data = doc.data();
            html += `<tr>
                <td><strong>${data.no}</strong></td>
                <td>${data.uk}</td>
                <td><span class="tag level-${data.level}">${data.level}</span></td>
                <td><button class="btn btn-danger btn-sm" onclick="adminDeleteWord('${doc.id}')">🗑️</button></td>
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
        snap.forEach(doc => {
            const data = doc.data();
            const statusMap = { waiting: '⏳ Очікує', active: '🔄 Активний', finished: '✅ Завершено' };
            html += `
                <div class="card" style="margin-bottom:8px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <strong>${data.name}</strong> ${statusMap[data.status] || data.status}
                            <span style="font-size:.8rem;color:var(--ink-soft);margin-left:12px;">${data.level || 'A1'}</span>
                        </div>
                        <button class="btn btn-danger btn-sm" onclick="adminDeleteTournament('${doc.id}')">🗑️</button>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    } catch (e) {
        console.error('Помилка завантаження турнірів:', e);
        container.innerHTML = '<p style="color:var(--rose);">Помилка завантаження.</p>';
    }
}

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

// Завантажити користувачів
async function loadUserList() {
    const container = document.getElementById('userList');
    if (!container) return;
    try {
        const snap = await firebaseDb.collection('users').limit(50).get();
        if (snap.empty) {
            container.innerHTML = '<p style="color:var(--ink-soft);">Немає користувачів.</p>';
            return;
        }
        let html = '<table class="vocab-table"><thead><tr><th>Ім\'я</th><th>Email</th><th>Рівень</th><th>XP</th></tr></thead><tbody>';
        snap.forEach(doc => {
            const data = doc.data();
            html += `<tr>
                <td><strong>${data.name || 'Без імені'}</strong></td>
                <td>${data.email || '—'}</td>
                <td>${data.level || 'A1'}</td>
                <td>${data.xp || 0}</td>
            </tr>`;
        });
        html += '</tbody></table>';
        container.innerHTML = html;
    } catch (e) {
        console.error('Помилка завантаження користувачів:', e);
        container.innerHTML = '<p style="color:var(--rose);">Помилка завантаження.</p>';
    }
}

// =====================================================================
//  ПОШУК СЛІВ
// =====================================================================
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('wordSearch');
    if (searchInput) {
        searchInput.addEventListener('input', async function() {
            const q = this.value.trim().toLowerCase();
            const container = document.getElementById('wordList');
            if (!container || q.length < 2) {
                loadWordList();
                return;
            }
            try {
                const snap = await firebaseDb.collection('words')
                    .where('no', '>=', q)
                    .where('no', '<=', q + '\uf8ff')
                    .limit(20)
                    .get();
                if (snap.empty) {
                    container.innerHTML = '<p style="color:var(--ink-soft);">Нічого не знайдено.</p>';
                    return;
                }
                let html = '<table class="vocab-table"><thead><tr><th>Слово</th><th>Переклад</th><th>Рівень</th><th>Дія</th></tr></thead><tbody>';
                snap.forEach(doc => {
                    const data = doc.data();
                    html += `<tr>
                        <td><strong>${data.no}</strong></td>
                        <td>${data.uk}</td>
                        <td><span class="tag level-${data.level}">${data.level}</span></td>
                        <td><button class="btn btn-danger btn-sm" onclick="adminDeleteWord('${doc.id}')">🗑️</button></td>
                    </tr>`;
                });
                html += '</tbody></table>';
                container.innerHTML = html;
            } catch (e) {
                console.error('Помилка пошуку:', e);
            }
        });
    }
});