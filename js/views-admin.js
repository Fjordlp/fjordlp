// =====================================================================
//  АДМІН-ПАНЕЛЬ (тільки ручне керування)
// =====================================================================

function viewAdmin() {
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

// ---- Користувачі ----
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
                return;
            }
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
            const lang = getLanguage(u.targetLang);
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

function initAdminUsers() {
    const searchInput = document.getElementById('userSearch');
    if (!searchInput) return;
    loadUserList();
    let debounceTimer;
    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        const q = this.value;
        debounceTimer = setTimeout(() => loadUserList(q), 250);
    });
}

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
//  АДМІН-ФУНКЦІЇ
// =====================================================================

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

window.adminCreateTournament = async function() {
    const name = document.getElementById('tournamentName').value.trim();
    const desc = document.getElementById('tournamentDesc').value.trim();
    const start = document.getElementById('tournamentStart').value;
    const end = document.getElementById('tournamentEnd').value;
    const numQuestions = parseInt(document.getElementById('tournamentQuestions').value) || 20;
    const level = document.getElementById('tournamentLevel').value;
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

async function loadWordList(query) {
    const container = document.getElementById('wordList');
    if (!container) return;
    query = (query || '').trim().toLowerCase();
    try {
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

        const all = [...adminWords, ...builtin].slice(0, 300);
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

window.toggleTournamentParticipants = function(docId) {
    const box = document.getElementById(`tournParticipants-${docId}`);
    if (box) box.style.display = box.style.display === 'none' ? 'block' : 'none';
};

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

function initAdminWords() {
    const searchInput = document.getElementById('wordSearch');
    if (!searchInput) return;
    loadWordList();
    let debounceTimer;
    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        const q = this.value;
        debounceTimer = setTimeout(() => loadWordList(q), 250);
    });
}

// =====================================================================
//  СТОРІНКА: Слово дня (адмін обирає конкретне слово для головної)
// =====================================================================
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
    if (!publishBtn) return;

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