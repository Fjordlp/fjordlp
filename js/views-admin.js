// =====================================================================
//  АДМІН-ПАНЕЛЬ (без onclick, тільки addEventListener)
// =====================================================================

function viewAdmin() {
    if (!STATE || !STATE.admin) {
        return el(`<div class="view"><div class="empty-state"><h3>⛔ Доступ заборонено</h3><p>Ви не маєте прав адміністратора.</p></div></div>`);
    }
    
    const container = el(`
        <div class="view">
            <h1>⚙️ Адмін-панель</h1>
            <p style="color:var(--ink-soft);margin-bottom:16px;">Швидке керування контентом сайту</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                <div class="card admin-card" data-route="admin-words" style="cursor:pointer;transition:all .2s;">
                    <div style="font-size:2rem;margin-bottom:8px;">📚</div>
                    <h3>Слова</h3>
                    <p style="color:var(--ink-soft);font-size:.85rem;">Додати нове слово або редагувати існуючі</p>
                </div>
                <div class="card admin-card" data-route="admin-tournaments" style="cursor:pointer;transition:all .2s;">
                    <div style="font-size:2rem;margin-bottom:8px;">🏆</div>
                    <h3>Турніри</h3>
                    <p style="color:var(--ink-soft);font-size:.85rem;">Створити та керувати турнірами</p>
                </div>
                <div class="card admin-card" data-route="admin-daily" style="cursor:pointer;transition:all .2s;">
                    <div style="font-size:2rem;margin-bottom:8px;">📅</div>
                    <h3>Завдання дня</h3>
                    <p style="color:var(--ink-soft);font-size:.85rem;">Створити або оновити завдання на сьогодні</p>
                </div>
                <div class="card admin-card" data-route="admin-users" style="cursor:pointer;transition:all .2s;">
                    <div style="font-size:2rem;margin-bottom:8px;">👥</div>
                    <h3>Користувачі</h3>
                    <p style="color:var(--ink-soft);font-size:.85rem;">Список усіх користувачів платформи</p>
                </div>
            </div>
        </div>
    `);
    
    container.querySelectorAll('.admin-card').forEach(card => {
        card.addEventListener('click', function() {
            const route = this.dataset.route;
            if (route) navigate(route);
        });
    });
    
    return container;
}

// =====================================================================
//  СТОРІНКА: Управління словами
// =====================================================================

function viewAdminWords() {
    if (!STATE || !STATE.admin) {
        return el(`<div class="view"><div class="empty-state"><h3>⛔ Доступ заборонено</h3></div></div>`);
    }
    
    const container = el(`
        <div class="view">
            <h1>📚 Управління словами</h1>
            
            <div class="card" style="margin-bottom:16px;">
                <h3>➕ Додати нове слово</h3>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;">
                    <div class="field"><label>Норвезьке *</label><input id="wordNo" placeholder="bil"></div>
                    <div class="field"><label>Переклад (укр) *</label><input id="wordUk" placeholder="машина"></div>
                    <div class="field"><label>Переклад (англ)</label><input id="wordEn" placeholder="car"></div>
                    <div class="field"><label>Переклад (рос)</label><input id="wordRu" placeholder="машина"></div>
                    <div class="field" style="grid-column:1/-1;">
                        <label>Рівень</label>
                        <select id="wordLevel">
                            ${['A1','A2','B1','B2','C1','C2'].map(l => `<option value="${l}">${l}</option>`).join('')}
                        </select>
                    </div>
                    <div class="field" style="grid-column:1/-1;"><label>Тема</label><input id="wordTopic" placeholder="Транспорт"></div>
                    <div class="field" style="grid-column:1/-1;"><label>Приклад (норв)</label><input id="wordExNo" placeholder="Jeg har en bil."></div>
                    <div class="field" style="grid-column:1/-1;"><label>Приклад (укр)</label><input id="wordExUk" placeholder="У мене є машина."></div>
                </div>
                <button class="btn btn-primary" id="addWordBtn">💾 Додати слово</button>
            </div>
            
            <div class="card">
                <h3>🔍 Пошук слів</h3>
                <input id="wordSearch" placeholder="Пошук за норвезьким або українським словом..." style="width:100%;padding:8px 12px;border-radius:10px;border:1px solid var(--line);font-size:.9rem;">
                <div id="wordList" style="margin-top:12px;max-height:400px;overflow-y:auto;"></div>
            </div>
            
            <button class="btn btn-ghost btn-sm" id="backFromWords" style="margin-top:12px;">← Назад до панелі</button>
        </div>
    `);
    
    // Кнопка назад
    container.querySelector('#backFromWords').addEventListener('click', () => navigate('admin'));
    
    // Кнопка додати слово
    container.querySelector('#addWordBtn').addEventListener('click', adminAddWord);
    
    // Пошук
    const searchInput = container.querySelector('#wordSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const q = this.value.trim().toLowerCase();
            const list = container.querySelector('#wordList');
            if (!list || q.length < 2) { loadWordList(list); return; }
            
            firebaseDb.collection('words')
                .where('no', '>=', q)
                .where('no', '<=', q + '\uf8ff')
                .limit(20)
                .get()
                .then(snap => {
                    if (snap.empty) {
                        list.innerHTML = '<p style="color:var(--ink-soft);">Нічого не знайдено</p>';
                        return;
                    }
                    let html = '<table class="vocab-table"><thead><tr><th>Слово</th><th>Переклад</th><th>Рівень</th><th>Дія</th></tr></thead><tbody>';
                    snap.forEach(doc => {
                        const d = doc.data();
                        html += `<tr>
                            <td><strong>${d.no}</strong></td>
                            <td>${d.uk}</td>
                            <td><span class="tag level-${d.level}">${d.level}</span></td>
                            <td><button class="btn btn-danger btn-sm" data-id="${doc.id}">🗑️</button></td>
                        </tr>`;
                    });
                    html += '</tbody></table>';
                    list.innerHTML = html;
                    list.querySelectorAll('[data-id]').forEach(btn => {
                        btn.addEventListener('click', function() {
                            adminDeleteWord(this.dataset.id);
                        });
                    });
                })
                .catch(() => list.innerHTML = '<p style="color:var(--rose);">Помилка пошуку</p>');
        });
    }
    
    // Завантаження списку
    setTimeout(() => {
        const list = container.querySelector('#wordList');
        if (list) loadWordList(list);
    }, 100);
    
    return container;
}

// =====================================================================
//  СТОРІНКА: Турніри
// =====================================================================

function viewAdminTournaments() {
    if (!STATE || !STATE.admin) {
        return el(`<div class="view"><div class="empty-state"><h3>⛔ Доступ заборонено</h3></div></div>`);
    }
    
    const container = el(`
        <div class="view">
            <h1>🏆 Турніри</h1>
            <div class="card" style="margin-bottom:16px;">
                <h3>➕ Створити новий турнір</h3>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;">
                    <div class="field" style="grid-column:1/-1;"><label>Назва</label><input id="tournamentName" placeholder="Кубок Fjord"></div>
                    <div class="field" style="grid-column:1/-1;"><label>Опис</label><input id="tournamentDesc" placeholder="Опис турніру"></div>
                    <div class="field"><label>Початок</label><input id="tournamentStart" type="datetime-local"></div>
                    <div class="field"><label>Кінець</label><input id="tournamentEnd" type="datetime-local"></div>
                    <div class="field"><label>Кількість питань</label><input id="tournamentQuestions" type="number" value="20"></div>
                    <div class="field"><label>Рівень</label>
                        <select id="tournamentLevel">
                            ${['A1','A2','B1','B2','C1','C2'].map(l => `<option value="${l}">${l}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <button class="btn btn-primary" id="createTournamentBtn">🏆 Створити турнір</button>
            </div>
            <div class="card">
                <h3>📋 Активні турніри</h3>
                <div id="tournamentList" style="margin-top:12px;">Завантаження...</div>
            </div>
            <button class="btn btn-ghost btn-sm" id="backFromTournaments" style="margin-top:12px;">← Назад до панелі</button>
        </div>
    `);
    
    container.querySelector('#backFromTournaments').addEventListener('click', () => navigate('admin'));
    container.querySelector('#createTournamentBtn').addEventListener('click', adminCreateTournament);
    
    setTimeout(() => {
        const list = container.querySelector('#tournamentList');
        if (list) loadTournamentList(list);
    }, 100);
    
    return container;
}

// =====================================================================
//  СТОРІНКА: Завдання дня
// =====================================================================

function viewAdminDaily() {
    if (!STATE || !STATE.admin) {
        return el(`<div class="view"><div class="empty-state"><h3>⛔ Доступ заборонено</h3></div></div>`);
    }
    
    const container = el(`
        <div class="view">
            <h1>📅 Завдання дня</h1>
            <div class="card">
                <h3>✏️ Створити завдання на сьогодні</h3>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;">
                    <div class="field" style="grid-column:1/-1;"><label>Питання</label><input id="dailyQuestion" placeholder="Як перекладається 'bil'?"></div>
                    <div class="field" style="grid-column:1/-1;"><label>Варіанти (через кому)</label><input id="dailyOptions" placeholder="Машина, Човен, Літак, Велосипед"></div>
                    <div class="field"><label>Правильна (номер з 0)</label><input id="dailyCorrect" type="number" value="0"></div>
<div class="field">
    <label>Рівень</label>
    <select id="dailyLevel">
        ${['A1','A2','B1','B2','C1','C2'].map(l => `<option value="${l}">${l}</option>`).join('')}
    </select>
</div>
                    <div class="field"><label>Тип</label>
                        <select id="dailyType">
                            <option value="translation">Переклад</option>
                            <option value="grammar">Граматика</option>
                            <option value="idiom">Ідіома</option>
                            <option value="listening">Аудіювання</option>
                        </select>
                    </div>
                </div>
                <button class="btn btn-primary" id="createDailyBtn">📅 Опублікувати</button>
            </div>
            <div class="card" style="margin-top:16px;">
                <h3>📋 Останні завдання</h3>
                <div id="dailyList" style="margin-top:12px;">Завантаження...</div>
            </div>
            <button class="btn btn-ghost btn-sm" id="backFromDaily" style="margin-top:12px;">← Назад до панелі</button>
        </div>
    `);
    
    container.querySelector('#backFromDaily').addEventListener('click', () => navigate('admin'));
    container.querySelector('#createDailyBtn').addEventListener('click', adminCreateDaily);
    
    setTimeout(() => {
        const list = container.querySelector('#dailyList');
        if (list) loadDailyList(list);
    }, 100);
    
    return container;
}

// =====================================================================
//  СТОРІНКА: Користувачі
// =====================================================================

function viewAdminUsers() {
    if (!STATE || !STATE.admin) {
        return el(`<div class="view"><div class="empty-state"><h3>⛔ Доступ заборонено</h3></div></div>`);
    }
    
    const container = el(`
        <div class="view">
            <h1>👥 Користувачі</h1>
            <div class="card">
                <h3>📋 Всі користувачі</h3>
                <div id="userList" style="margin-top:12px;max-height:500px;overflow-y:auto;">Завантаження...</div>
            </div>
            <button class="btn btn-ghost btn-sm" id="backFromUsers" style="margin-top:12px;">← Назад до панелі</button>
        </div>
    `);
    
    container.querySelector('#backFromUsers').addEventListener('click', () => navigate('admin'));
    
    setTimeout(() => {
        const list = container.querySelector('#userList');
        if (list) loadUserList(list);
    }, 100);
    
    return container;
}

// =====================================================================
//  АДМІН-ФУНКЦІЇ
// =====================================================================

window.adminAddWord = async function() {
    try {
        const no = document.getElementById('wordNo').value.trim();
        const uk = document.getElementById('wordUk').value.trim();
        if (!no || !uk) {
            toast('❌ Будь ласка, заповніть обов\'язкові поля (норвезьке та український переклад)');
            return;
        }
        const en = document.getElementById('wordEn').value.trim();
        const ru = document.getElementById('wordRu').value.trim();
        const level = document.getElementById('wordLevel').value;
        const t = document.getElementById('wordTopic').value.trim() || 'Загальне';
        const ex_no = document.getElementById('wordExNo').value.trim();
        const ex_uk = document.getElementById('wordExUk').value.trim();
        
        await firebaseDb.collection('words').add({
            no, uk, en, ru, level, t, ex_no, ex_uk,
            fromAdmin: true,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        toast(`✅ Слово "${no}" додано!`);
        ['wordNo','wordUk','wordEn','wordRu','wordTopic','wordExNo','wordExUk'].forEach(id => {
            document.getElementById(id).value = '';
        });
        const list = document.getElementById('wordList');
        if (list) loadWordList(list);
    } catch (e) {
        console.error('Помилка додавання слова:', e);
        toast('❌ Помилка додавання слова');
    }
};

window.adminDeleteWord = async function(id) {
    if (!confirm('Ви впевнені?')) return;
    try {
        await firebaseDb.collection('words').doc(id).delete();
        toast('🗑️ Слово видалено');
        const list = document.getElementById('wordList');
        if (list) loadWordList(list);
    } catch (e) {
        console.error('Помилка видалення:', e);
        toast('❌ Помилка видалення');
    }
};

window.adminCreateTournament = async function() {
    toast('🏆 Функція створення турніру в розробці');
};

// =====================================================================
//  АДМІН-ФУНКЦІЯ: СТВОРИТИ ЗАВДАННЯ ДНЯ
// =====================================================================
window.adminCreateDaily = async function() {
    const question = document.getElementById('dailyQuestion').value.trim();
    const optionsRaw = document.getElementById('dailyOptions').value.trim();
    const correct = parseInt(document.getElementById('dailyCorrect').value) || 0;
    const type = document.getElementById('dailyType').value;
    const level = document.getElementById('dailyLevel')?.value || STATE.level || 'A1';

    if (!question || !optionsRaw) {
        toast('❌ Заповніть питання та варіанти відповідей');
        return;
    }

    const options = optionsRaw.split(',').map(s => s.trim());
    if (options.length < 2) {
        toast('❌ Варіантів має бути не менше 2');
        return;
    }

    if (correct < 0 || correct >= options.length) {
        toast(`❌ Правильна відповідь має бути від 0 до ${options.length - 1}`);
        return;
    }

    const today = new Date().toISOString().slice(0, 10);

    try {
        await firebaseDb.collection('daily_tasks').doc(today).set({
            question,
            options,
            correct,
            type,
            level,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        toast(`✅ Завдання на ${today} створено!`);
        document.getElementById('dailyQuestion').value = '';
        document.getElementById('dailyOptions').value = '';
        document.getElementById('dailyCorrect').value = '0';
        // Оновлюємо список
        const list = document.getElementById('dailyList');
        if (list) loadDailyList(list);
        // Оновлюємо головну (якщо вона відкрита)
        if (ROUTE === 'home') navigate('home');
    } catch (e) {
        console.error('Помилка створення завдання дня:', e);
        toast('❌ Помилка створення завдання: ' + e.message);
    }
};

window.adminDeleteTournament = async function(id) {
    if (!confirm('Видалити турнір?')) return;
    toast('🗑️ Видалення в розробці');
};

window.adminDeleteDaily = async function(id) {
    if (!confirm('Видалити завдання?')) return;
    toast('🗑️ Видалення в розробці');
};

// =====================================================================
//  ЗАВАНТАЖЕННЯ СПИСКІВ
// =====================================================================

async function loadWordList(container) {
    if (!container) container = document.getElementById('wordList');
    if (!container) return;
    try {
        const snap = await firebaseDb.collection('words').limit(100).get();
        if (snap.empty) {
            container.innerHTML = '<p style="color:var(--ink-soft);">Немає слів у словнику.</p>';
            return;
        }
        let html = '<table class="vocab-table"><thead><tr><th>Слово</th><th>Переклад</th><th>Рівень</th><th>Дія</th></tr></thead><tbody>';
        snap.forEach(doc => {
            const d = doc.data();
            html += `<tr>
                <td><strong>${d.no}</strong></td>
                <td>${d.uk}</td>
                <td><span class="tag level-${d.level}">${d.level}</span></td>
                <td><button class="btn btn-danger btn-sm" data-id="${doc.id}">🗑️</button></td>
            </tr>`;
        });
        html += '</tbody></table>';
        container.innerHTML = html;
        container.querySelectorAll('[data-id]').forEach(btn => {
            btn.addEventListener('click', function() {
                adminDeleteWord(this.dataset.id);
            });
        });
    } catch (e) {
        console.error('Помилка завантаження слів:', e);
        container.innerHTML = '<p style="color:var(--rose);">Помилка завантаження.</p>';
    }
}

async function loadTournamentList(container) {
    if (!container) container = document.getElementById('tournamentList');
    if (!container) return;
    try {
        const snap = await firebaseDb.collection('tournaments').orderBy('createdAt', 'desc').limit(10).get();
        if (snap.empty) {
            container.innerHTML = '<p style="color:var(--ink-soft);">Немає турнірів.</p>';
            return;
        }
        let html = '';
        snap.forEach(doc => {
            const d = doc.data();
            const statusMap = { waiting: '⏳ Очікує', active: '🔄 Активний', finished: '✅ Завершено' };
            html += `
                <div class="card" style="margin-bottom:8px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <strong>${d.name}</strong> ${statusMap[d.status] || d.status}
                            <span style="font-size:.8rem;color:var(--ink-soft);margin-left:12px;">${d.level || 'A1'}</span>
                        </div>
                        <button class="btn btn-danger btn-sm" data-id="${doc.id}">🗑️</button>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
        container.querySelectorAll('[data-id]').forEach(btn => {
            btn.addEventListener('click', function() {
                adminDeleteTournament(this.dataset.id);
            });
        });
    } catch (e) {
        console.error('Помилка завантаження турнірів:', e);
        container.innerHTML = '<p style="color:var(--rose);">Помилка завантаження.</p>';
    }
}

async function loadDailyList(container) {
    if (!container) container = document.getElementById('dailyList');
    if (!container) return;
    try {
        const snap = await firebaseDb.collection('daily_tasks').orderBy('createdAt', 'desc').limit(10).get();
        if (snap.empty) {
            container.innerHTML = '<p style="color:var(--ink-soft);">Немає завдань.</p>';
            return;
        }
        let html = '';
        snap.forEach(doc => {
            const d = doc.data();
            html += `
                <div class="card" style="margin-bottom:8px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <strong>${d.question?.slice(0, 60)}...</strong>
                            <span style="font-size:.8rem;color:var(--ink-soft);margin-left:12px;">${doc.id}</span>
                        </div>
                        <button class="btn btn-danger btn-sm" data-id="${doc.id}">🗑️</button>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
        container.querySelectorAll('[data-id]').forEach(btn => {
            btn.addEventListener('click', function() {
                adminDeleteDaily(this.dataset.id);
            });
        });
    } catch (e) {
        console.error('Помилка завантаження завдань:', e);
        container.innerHTML = '<p style="color:var(--rose);">Помилка завантаження.</p>';
    }
}

async function loadUserList(container) {
    if (!container) container = document.getElementById('userList');
    if (!container) return;
    try {
        const snap = await firebaseDb.collection('users').limit(50).get();
        if (snap.empty) {
            container.innerHTML = '<p style="color:var(--ink-soft);">Немає користувачів.</p>';
            return;
        }
        let html = '<table class="vocab-table"><thead><tr><th>Ім\'я</th><th>Email</th><th>Рівень</th><th>XP</th></tr></thead><tbody>';
        snap.forEach(doc => {
            const d = doc.data();
            html += `<tr>
                <td><strong>${d.name || 'Без імені'}</strong></td>
                <td>${d.email || '—'}</td>
                <td>${d.level || 'A1'}</td>
                <td>${d.xp || 0}</td>
            </tr>`;
        });
        html += '</tbody></table>';
        container.innerHTML = html;
    } catch (e) {
        console.error('Помилка завантаження користувачів:', e);
        container.innerHTML = '<p style="color:var(--rose);">Помилка завантаження.</p>';
    }
}