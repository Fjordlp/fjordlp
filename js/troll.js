        // =====================================================================
        //  TROLL MASCOT: character, phrases, XP/levels, unlockables, achievements
        // =====================================================================
        function trollSVG(mood, size, equipped) {
            size = size || 96;
            mood = mood || 'idle';
            equipped = equipped || { hat: null, glasses: null, bg: null };

            let eyes, mouth, extra = '';
            if (mood === 'happy') {
                eyes = `<path d="M40 58 Q46 50 52 58" stroke="#1F2A22" stroke-width="4" fill="none" stroke-linecap="round"/>
                        <path d="M68 58 Q74 50 80 58" stroke="#1F2A22" stroke-width="4" fill="none" stroke-linecap="round"/>`;
                mouth = `<path d="M42 74 Q60 92 78 74" stroke="#1F2A22" stroke-width="4" fill="none" stroke-linecap="round"/>`;
            } else if (mood === 'sad') {
                eyes = `<circle cx="46" cy="58" r="5" fill="#1F2A22"/><circle cx="74" cy="58" r="5" fill="#1F2A22"/>`;
                mouth = `<path d="M44 82 Q60 70 76 82" stroke="#1F2A22" stroke-width="4" fill="none" stroke-linecap="round"/>`;
            } else if (mood === 'excited') {
                eyes = `<circle cx="46" cy="57" r="6" fill="#1F2A22"/><circle cx="74" cy="57" r="6" fill="#1F2A22"/>
                        <circle cx="44" cy="55" r="1.6" fill="white"/><circle cx="72" cy="55" r="1.6" fill="white"/>`;
                mouth = `<ellipse cx="60" cy="80" rx="12" ry="9" fill="#7A3B2E"/>`;
                extra = `<path d="M20 30 L14 16 M100 30 L106 16 M60 12 L60 0" stroke="#E8A33D" stroke-width="3" stroke-linecap="round"/>`;
            } else { // idle
                eyes = `<circle cx="46" cy="58" r="5" fill="#1F2A22"/><circle cx="74" cy="58" r="5" fill="#1F2A22"/>`;
                mouth = `<path d="M46 76 Q60 84 74 76" stroke="#1F2A22" stroke-width="4" fill="none" stroke-linecap="round"/>`;
            }

            // ---- Фон (завжди заповнює весь квадрат 120x120, обрізається по колу нижче) ----
            const bg = bgLayerSVG(equipped.bg);

            // ---- Головний убір: береться з BUST_HATS (js/bust-accessories.js) —
            // це справжня графіка з набору аксесуарів, змасштабована під формат
            // цієї голови, а не намальована вручну заглушка.
            // ВАЖЛИВО: equipped.hat зберігає ПОВНИЙ id на кшталт "hat_wizard-hat"
            // (саме так його записує TROLL_UNLOCKABLES/екіпірування), а ключі в
            // BUST_HATS — це "голий" слаг файлу без префіксу ("wizard-hat"). Тож
            // префікс типу треба зрізати перед пошуком — інакше пошук завжди
            // повертає undefined і нічого не одягається. ----
            const hatSlug = equipped.hat ? equipped.hat.replace(/^hat_/, '') : '';
            const hat = hatSlug && BUST_HATS[hatSlug] ? BUST_HATS[hatSlug] : '';

            // ---- Окуляри: те саме зауваження про префікс, що й для капелюхів. ----
            const glassesSlug = equipped.glasses ? equipped.glasses.replace(/^glasses_/, '') : '';
            const glasses = glassesSlug && BUST_GLASSES[glassesSlug] ? BUST_GLASSES[glassesSlug] : '';

            // hats are skipped in "excited" mood so the celebration rays aren't obscured
            const showHat = hat && mood !== 'excited';

            return `<svg viewBox="0 0 120 120" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
              <defs><clipPath id="trollFrame${size}"><circle cx="60" cy="60" r="60"/></clipPath></defs>
              <g clip-path="url(#trollFrame${size})">
                ${bg}
                ${extra}
                <ellipse cx="60" cy="100" rx="30" ry="10" fill="rgba(15,42,61,0.10)"/>
                <path d="M60 20 C30 20 18 46 22 70 C25 92 40 106 60 106 C80 106 95 92 98 70 C102 46 90 20 60 20 Z" fill="#7BA383"/>
                <path d="M60 20 C52 8 46 6 42 10 C46 14 50 18 52 24 Z" fill="#7BA383"/>
                <path d="M60 20 C68 8 74 6 78 10 C74 14 70 18 68 24 Z" fill="#7BA383"/>
                <ellipse cx="60" cy="70" rx="34" ry="30" fill="#8FB596"/>
                <ellipse cx="60" cy="66" rx="14" ry="11" fill="#6F9678"/>
                <circle cx="38" cy="72" r="5" fill="#D9765B" opacity=".28"/>
                <circle cx="82" cy="72" r="5" fill="#D9765B" opacity=".28"/>
                <ellipse cx="60" cy="68" rx="4" ry="3" fill="#6F9678" stroke="#5C8267" stroke-width=".6"/>
                ${eyes}
                ${mouth}
                ${glasses}
                ${showHat ? hat : ''}
              </g>
              <circle cx="60" cy="60" r="59" fill="none" stroke="rgba(15,42,61,0.10)" stroke-width="2"/>
            </svg>`;
        }

        const TROLL_PHRASES = {
            uk: {
                greeting: ["Hei! Готовий вивчати {lang} сьогодні?", "Привіт! Радий тебе бачити знову 🧌", "Hei hei! Продовжимо?"],
                correct: ["Riktig! Так тримати!", "Супер, правильно!", "Bra jobbet! (Гарна робота!)", "Точно! Ти молодець."],
                wrong: ["Не страшно, навіть тролі плутають слова спочатку!", "Майже! Спробуй ще раз наступного разу.", "Помилка — це теж крок уперед.", "Feil svar, але не здавайся!"],
                sessionComplete: ["Готово! Ти чудово попрацював.", "Сесію завершено — я пишаюсь тобою!", "Flott! (Чудово!) До наступного разу."],
                testComplete: ["Тест завершено! +100 XP у скарбничку.", "Ще один тест позаду. Så bra!"],
                streak: ["Ти на хвилі! Серія триває.", "Дні поспіль — це справжня дисципліна!"],
                levelUp: ["Новий рівень тролля! Дещо розблоковано 🎉", "Ти виріс! І я теж, здається."],
            },
            en: {
                greeting: ["Hei! Ready to study {lang} today?", "Hi! Good to see you again 🧌", "Hei hei! Shall we continue?"],
                correct: ["Riktig! Keep it up!", "Great, that's correct!", "Bra jobbet! (Good job!)", "Exactly! Well done."],
                wrong: ["No worries, even trolls mix up words at first!", "Almost! Try again next time.", "A mistake is a step forward too.", "Feil svar, but don't give up!"],
                sessionComplete: ["Done! You worked great.", "Session complete — I'm proud of you!", "Flott! (Great!) See you next time."],
                testComplete: ["Test complete! +100 XP in the piggy bank.", "Another test behind you. Så bra!"],
                streak: ["You're on a roll! The streak continues.", "Days in a row — that's real discipline!"],
                levelUp: ["New troll level! Something's been unlocked 🎉", "You've grown! And so have I, it seems."],
            },
            ru: {
                greeting: ["Hei! Готов изучать {lang} сегодня?", "Привет! Рад видеть тебя снова 🧌", "Hei hei! Продолжим?"],
                correct: ["Riktig! Так держать!", "Супер, правильно!", "Bra jobbet! (Отличная работа!)", "Точно! Молодец."],
                wrong: ["Не страшно, даже тролли путают слова поначалу!", "Почти! Попробуй ещё раз в следующий раз.", "Ошибка — это тоже шаг вперёд.", "Feil svar, но не сдавайся!"],
                sessionComplete: ["Готово! Ты отлично поработал.", "Сессия завершена — я горжусь тобой!", "Flott! (Отлично!) До следующего раза."],
                testComplete: ["Тест завершён! +100 XP в копилку.", "Ещё один тест позади. Så bra!"],
                streak: ["Ты на волне! Серия продолжается.", "Дни подряд — это настоящая дисциплина!"],
                levelUp: ["Новый уровень тролля! Кое-что разблокировано 🎉", "Ты вырос! И я, кажется, тоже."],
            },
        };

        // Раніше грінтінг завжди буквально писав "вивчати норвезьку" /
        // "study Norwegian" / "изучать норвежский" — НАЗВОЮ КОНКРЕТНОЇ МОВИ
        // текстом, а не просто стилістичними норвезькими вигуками (ті —
        // навмисна фішка персонажа-тролля, лишили як є). Це буквально
        // неправдива інформація для будь-кого, хто вчить іспанську,
        // японську тощо: тролль вітав його словами "готовий вивчати
        // норвезьку?", хоча людина відкрила застосунок для геть іншої мови.
        function trollSay(context) {
            const lang = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
            const dict = TROLL_PHRASES[lang] || TROLL_PHRASES.uk;
            const arr = dict[context] || dict.greeting;
            let phrase = arr[Math.floor(Math.random() * arr.length)];
            if (phrase.indexOf('{lang}') !== -1) {
                const targetLang = (typeof STATE !== 'undefined' && STATE && STATE.targetLang) || 'no';
                const langName = (typeof targetLangName === 'function' ? targetLangName(targetLang) : 'норвезьку');
                phrase = phrase.replace('{lang}', langName);
            }
            return phrase;
        }

        function renderTrollBubble(mood, context, size, equipped) {
    // Якщо equipped не передано – беремо зі STATE
    if (!equipped) {
        equipped = STATE.trollGear.equipped || { hat: null, glasses: null, bg: null };
    }
    const wrap = el(`<div style="display:flex;align-items:center;gap:14px;"></div>`);
    const img = el(`<div>${trollSVG(mood, size || 72, equipped)}</div>`);
    const bubble = el(`<div class="troll-bubble">${trollSay(context)}</div>`);
    wrap.appendChild(img);
    wrap.appendChild(bubble);
    return wrap;
}

        // ---- XP & troll levels ----
        const TROLL_LEVEL_THRESHOLDS = [0, 100, 250, 500, 900, 1400, 2000, 2800, 3800, 5000, 6500];

        function trollLevelFromXp(xp) {
            let lvl = 1;
            for (let i = 0; i < TROLL_LEVEL_THRESHOLDS.length; i++) { if (xp >= TROLL_LEVEL_THRESHOLDS[i]) lvl = i +
                1; }
            return lvl;
        }

        function xpProgress(xp) {
            const lvl = trollLevelFromXp(xp);
            const curFloor = TROLL_LEVEL_THRESHOLDS[lvl - 1] || 0;
            const nextCeil = TROLL_LEVEL_THRESHOLDS[lvl] !== undefined ? TROLL_LEVEL_THRESHOLDS[lvl] : curFloor + 2000;
            const pct = Math.min(100, Math.round(((xp - curFloor) / (nextCeil - curFloor)) * 100));
            return { lvl, curFloor, nextCeil, pct };
        }

        const TROLL_UNLOCKABLES = [
    // ---- Капелюхи та окуляри (справжня графіка з набору аксесуарів) ----
    { id: 'hat_astronaut-helmet', type: 'hat', name: 'Шолом астронавта', unlockLevel: 1, emoji: '🚀' },
    { id: 'glasses_cyber-visor', type: 'glasses', name: 'Кібер-візор', unlockLevel: 1, emoji: '🤖' },
    { id: 'hat_bandana', type: 'hat', name: 'Бандана', unlockLevel: 2, emoji: '🧣' },
    { id: 'glasses_eyepatch', type: 'glasses', name: 'Пов’язка на око', unlockLevel: 2, emoji: '🏴‍☠️' },
    { id: 'hat_baseball-cap', type: 'hat', name: 'Бейсболка', unlockLevel: 3, emoji: '🧢' },
    { id: 'glasses_heart', type: 'glasses', name: 'Окуляри-сердечка', unlockLevel: 3, emoji: '😍' },
    { id: 'hat_beanie-red', type: 'hat', name: 'Червона шапка', unlockLevel: 4, emoji: '🧶' },
    { id: 'glasses_monocle', type: 'glasses', name: 'Монокль', unlockLevel: 4, emoji: '🧐' },
    { id: 'hat_beret-artist', type: 'hat', name: 'Берет художника', unlockLevel: 4, emoji: '🎨' },
    { id: 'glasses_pixel', type: 'glasses', name: 'Піксельні окуляри', unlockLevel: 5, emoji: '👾' },
    { id: 'hat_cat-ears-hood', type: 'hat', name: 'Капюшон з котячими вухами', unlockLevel: 5, emoji: '🐱' },
    { id: 'glasses_reading', type: 'glasses', name: 'Окуляри для читання', unlockLevel: 6, emoji: '📖' },
    { id: 'hat_chef-hat', type: 'hat', name: 'Кухарський ковпак', unlockLevel: 6, emoji: '👨‍🍳' },
    { id: 'glasses_round', type: 'glasses', name: 'Круглі окуляри', unlockLevel: 7, emoji: '👓' },
    { id: 'hat_cowboy-hat', type: 'hat', name: 'Ковбойський капелюх', unlockLevel: 7, emoji: '🤠' },
    { id: 'glasses_safety-goggles', type: 'glasses', name: 'Захисні окуляри', unlockLevel: 8, emoji: '🥽' },
    { id: 'hat_crown-gold', type: 'hat', name: 'Золота корона', unlockLevel: 8, emoji: '👑' },
    { id: 'glasses_star', type: 'glasses', name: 'Окуляри-зірочки', unlockLevel: 8, emoji: '⭐' },
    { id: 'hat_detective-hat', type: 'hat', name: 'Капелюх детектива', unlockLevel: 9, emoji: '🕵️' },
    { id: 'glasses_sunglasses', type: 'glasses', name: 'Сонцезахисні окуляри', unlockLevel: 9, emoji: '🕶️' },
    { id: 'hat_explorer-hat', type: 'hat', name: 'Капелюх мандрівника', unlockLevel: 10, emoji: '🗺️' },
    { id: 'hat_firefighter-helmet', type: 'hat', name: 'Шолом пожежника', unlockLevel: 10, emoji: '🚒' },
    { id: 'hat_flat-cap', type: 'hat', name: 'Кепка', unlockLevel: 11, emoji: '🧢' },
    { id: 'hat_flower-crown', type: 'hat', name: 'Віночок', unlockLevel: 11, emoji: '🌸' },
    { id: 'hat_graduation-cap', type: 'hat', name: 'Академічна шапочка', unlockLevel: 11, emoji: '🎓' },
    { id: 'hat_headphones', type: 'hat', name: 'Навушники', unlockLevel: 12, emoji: '🎧' },
    { id: 'hat_hood-cloak', type: 'hat', name: 'Капюшон плаща', unlockLevel: 12, emoji: '🥷' },
    { id: 'hat_horn-band-simple', type: 'hat', name: 'Обруч з ріжками', unlockLevel: 13, emoji: '😈' },
    { id: 'hat_jester-hat', type: 'hat', name: 'Ковпак блазня', unlockLevel: 13, emoji: '🃏' },
    { id: 'hat_party-hat', type: 'hat', name: 'Святковий ковпачок', unlockLevel: 14, emoji: '🎉' },
    { id: 'hat_pirate-hat', type: 'hat', name: 'Піратський капелюх', unlockLevel: 14, emoji: '🏴' },
    { id: 'hat_samurai-kabuto', type: 'hat', name: 'Шолом самурая', unlockLevel: 15, emoji: '⚔️' },
    { id: 'hat_santa-hat', type: 'hat', name: 'Шапка Санти', unlockLevel: 15, emoji: '🎅' },
    { id: 'hat_straw-hat', type: 'hat', name: 'Солом’яний капелюх', unlockLevel: 15, emoji: '👒' },
    { id: 'hat_sun-hat', type: 'hat', name: 'Панамка', unlockLevel: 16, emoji: '☀️' },
    { id: 'hat_top-hat', type: 'hat', name: 'Циліндр', unlockLevel: 16, emoji: '🎩' },
    { id: 'hat_ushanka-fur', type: 'hat', name: 'Хутряна вушанка', unlockLevel: 17, emoji: '🧊' },
    { id: 'hat_viking-helmet', type: 'hat', name: 'Шолом вікінга', unlockLevel: 17, emoji: '⚔️' },
    { id: 'hat_wizard-hat', type: 'hat', name: 'Капелюх чарівника', unlockLevel: 18, emoji: '🧙' },
    { id: 'hat_wool-hat', type: 'hat', name: 'Вовняна шапка', unlockLevel: 18, emoji: '🧶' },

    // ---- Фони ----
    { id: 'bg_forest', type: 'bg', name: 'Ліс', unlockLevel: 2, emoji: '🌲' },
    { id: 'bg_mountains', type: 'bg', name: 'Норвезькі гори', unlockLevel: 4, emoji: '🏔️' },
    { id: 'bg_fjord', type: 'bg', name: 'Фйорд', unlockLevel: 6, emoji: '🌊' },
    { id: 'bg_aurora', type: 'bg', name: 'Північне сяйво', unlockLevel: 9, emoji: '🌌' },
    { id: 'bg_castle', type: 'bg', name: 'Замок', unlockLevel: 12, emoji: '🏰' },
    { id: 'bg_volcano', type: 'bg', name: 'Вулкан', unlockLevel: 14, emoji: '🌋' },
    { id: 'bg_space', type: 'bg', name: 'Космос', unlockLevel: 15, emoji: '🚀' },
        ];

        // ---- Фон: винесено в окрему функцію, щоб той самий SVG-патерн можна
        // було використати і для самого троля, і для прев'ю у виборі спорядження ----
        function bgLayerSVG(bgId) {
            if (bgId === 'bg_forest') {
                return `<rect x="0" y="0" width="120" height="120" fill="#DCEEDB"/>
                      <circle cx="60" cy="60" r="62" fill="#E4EFE2"/>
                      <path d="M6 118 L20 84 L34 118 Z" fill="#5C8A5F"/>
                      <path d="M26 122 L42 78 L58 122 Z" fill="#4C7A4F"/>
                      <path d="M64 122 L80 78 L96 122 Z" fill="#4C7A4F"/>
                      <path d="M88 118 L102 88 L116 118 Z" fill="#5C8A5F"/>`;
            } else if (bgId === 'bg_mountains') {
                return `<rect x="0" y="0" width="120" height="120" fill="#E7EEF3"/>
                      <path d="M-5 100 L25 46 L48 78 L68 38 L100 100 Z" fill="#9FB4C4"/>
                      <path d="M55 100 L85 60 L125 100 Z" fill="#8199AC"/>
                      <path d="M64 40 L71 40 L69 30 Z" fill="white"/>`;
            } else if (bgId === 'bg_fjord') {
                return `<rect x="0" y="0" width="120" height="120" fill="#DCEEF0"/>
                      <path d="M-5 82 Q15 72 35 82 T75 82 T125 82 V125 H-5 Z" fill="#6FB3C2"/>
                      <path d="M-5 98 Q15 90 35 98 T75 98 T125 98 V125 H-5 Z" fill="#4E97A8"/>`;
            } else if (bgId === 'bg_aurora') {
                return `<rect x="0" y="0" width="120" height="120" fill="#122036"/>
                      <path d="M-5 34 Q25 12 55 34 T115 34" stroke="#2FA89B" stroke-width="9" fill="none" opacity=".65"/>
                      <path d="M-5 48 Q25 26 55 48 T115 48" stroke="#8B7FD1" stroke-width="8" fill="none" opacity=".55"/>
                      <path d="M-5 60 Q25 42 55 60 T115 60" stroke="#E8A33D" stroke-width="6" fill="none" opacity=".35"/>
                      <circle cx="18" cy="16" r="1.4" fill="white"/><circle cx="96" cy="20" r="1.2" fill="white"/><circle cx="70" cy="10" r="1" fill="white"/>`;
            } else if (bgId === 'bg_castle') {
                return `<rect x="0" y="0" width="120" height="120" fill="#AEE0F0"/>
                      <rect x="28" y="46" width="64" height="60" fill="#9C8D79"/>
                      <rect x="36" y="30" width="14" height="20" fill="#9C8D79"/>
                      <rect x="70" y="30" width="14" height="20" fill="#9C8D79"/>
                      <path d="M36 30 L43 20 L50 30 Z" fill="#7A6C58"/>
                      <path d="M70 30 L77 20 L84 30 Z" fill="#7A6C58"/>
                      <rect x="52" y="76" width="16" height="30" fill="#6B5D4B"/>`;
            } else if (bgId === 'bg_volcano') {
                return `<rect x="0" y="0" width="120" height="120" fill="#2A1414"/>
                      <path d="M18 118 L60 26 L102 118 Z" fill="#4A2A1A"/>
                      <circle cx="60" cy="32" r="9" fill="#FF6A2E" opacity=".9"/>
                      <ellipse cx="60" cy="24" rx="13" ry="7" fill="#FF9248" opacity=".55"/>`;
            } else if (bgId === 'bg_space') {
                return `<rect x="0" y="0" width="120" height="120" fill="#0A0A1E"/>
                      <circle cx="22" cy="22" r="2.4" fill="white" opacity=".85"/>
                      <circle cx="84" cy="12" r="1.6" fill="white" opacity=".6"/>
                      <circle cx="42" cy="86" r="2.8" fill="white" opacity=".7"/>
                      <circle cx="102" cy="60" r="1.6" fill="white" opacity=".5"/>
                      <circle cx="12" cy="96" r="1.2" fill="white" opacity=".6"/>
                      <circle cx="106" cy="102" r="2.2" fill="white" opacity=".4"/>
                      <circle cx="88" cy="80" r="9" fill="#8B7FD1" opacity=".5"/>`;
            }
            return `<rect x="0" y="0" width="120" height="120" fill="var(--frost,#FBFCFA)"/>`;
        }

        // Реальне прев'ю речі для бейджа вибору спорядження — показує, як
        // предмет ВИГЛЯДАЄ (капелюх/окуляри/фон), а не емодзі-замінник.
        function gearIconSVG(item, size) {
            size = size || 34;
            let content = '';
            if (item.type === 'hat') content = BUST_HATS[item.id.replace('hat_', '')] || '';
            else if (item.type === 'glasses') content = BUST_GLASSES[item.id.replace('glasses_', '')] || '';
            else if (item.type === 'bg') content = bgLayerSVG(item.id);
            return `<svg viewBox="0 0 120 120" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="120" height="120" rx="16" fill="var(--frost,#FBFCFA)"/>${content}</svg>`;
        }

        // Перевіряє, чи є розрив рівно в 1 пропущений день, і якщо є вільна
        // заморозка — тихо "затуляє" цей день, зберігаючи серію. Викликається
        // раз при вході в застосунок (не на кожен рендер).
        function checkAndApplyStreakFreeze() {
            if (!LD().stats) LD().stats = { activityDates: [], bestStreak: 0 };
            if (typeof LD().streakFreezes !== 'number') LD().streakFreezes = 0;
            if (LD().streakFreezes <= 0) return false;

            const dates = new Set(LD().stats.activityDates || []);
            const today = todayStr();
            const y = new Date(); y.setDate(y.getDate() - 1);
            const twoAgo = new Date(); twoAgo.setDate(twoAgo.getDate() - 2);
            const yesterday = todayStr(y);
            const dayBefore = todayStr(twoAgo);

            // Розрив рівно в 1 день: позавчора активність була, вчора — ні,
            // сьогодні ще нічого не позначено. Це і є момент, коли серія
            // щойно готова обнулитись — рятуємо її заморозкою.
            if (dates.has(dayBefore) && !dates.has(yesterday) && !dates.has(today)) {
                LD().stats.activityDates.push(yesterday);
                LD().stats.activityDates.sort();
                LD().streakFreezes--;
                recomputeStreak();
                updateState();
                const lang2 = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
                const usedMsg = { uk: 'Заморозку використано — серія', en: 'Freeze used — your streak of', ru: 'Заморозка использована — серия' }[lang2];
                const savedMsg = { uk: 'врятована!', en: 'is saved!', ru: 'спасена!' }[lang2];
                toast(`🧊 ${usedMsg} ${LD().streak} 🔥 ${savedMsg}`);
                return true;
            }
            return false;
        }

        function checkTrollUnlocks() {
            const { lvl } = xpProgress(LD().xp || 0);
            const justUnlocked = [];
            TROLL_UNLOCKABLES.forEach(item => {
                if (lvl >= item.unlockLevel && !STATE.trollGear.unlocked.includes(item.id)) {
                    STATE.trollGear.unlocked.push(item.id);
                    justUnlocked.push(item);
                }
            });
            if (justUnlocked.length === 1) {
                const lang0 = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
                const unlockMsg = { uk: 'Тролль розблокував', en: 'Troll unlocked', ru: 'Тролль разблокировал' }[lang0];
                toast(`${unlockMsg}: ${justUnlocked[0].emoji} ${gearItemName(justUnlocked[0])}!`);
            } else if (justUnlocked.length > 1) {
                const lang0 = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
                const unlockMsg = { uk: 'Розблоковано нове спорядження', en: 'New gear unlocked', ru: 'Разблокировано новое снаряжение' }[lang0];
                toast(`${unlockMsg}: ${justUnlocked.length}${lang0==='uk'?' шт.':''}!`);
            }
            if (justUnlocked.length) updateState();
            return justUnlocked.length > 0;
        }

        function addXP(amount, reason) {
            const before = trollLevelFromXp(LD().xp || 0);
            LD().xp = (LD().xp || 0) + amount;
            const after = trollLevelFromXp(LD().xp);
            checkTrollUnlocks();
            checkAchievements();
            if (after > before) {
                const lang1 = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
                const msg = { uk: 'Рівень тролля підвищено', en: 'Troll level increased', ru: 'Уровень тролля повышен' }[lang1];
                toast(`🧌 ${msg}: ${after}!`);
                // Заморозка стріку — нагорода за кожні 5 рівнів тролля, макс. 3 про запас.
                // Рятує серію автоматично, якщо пропущено рівно один день.
                if (after % 5 === 0) {
                    if (typeof LD().streakFreezes !== 'number') LD().streakFreezes = 0;
                    if (LD().streakFreezes < 3) {
                        LD().streakFreezes++;
                        const freezeMsg = { uk: 'Отримано заморозку серії! Тепер їх у вас', en: "Streak freeze earned! You now have", ru: 'Получена заморозка серии! Теперь у вас' }[lang1];
                        toast(`🧊 ${freezeMsg}: ${LD().streakFreezes}`);
                    }
                }
            }
            updateState();
            return amount;
        }

        const ACHIEVEMENTS = [
            { id: 'first_word', name: 'Перший крок', desc: 'Опрацюйте перше слово', check: s => Object.keys(s.stats
                    .wordsSeen || {}).length >= 1 },
            { id: 'words_10', name: '10 слів', desc: 'Опрацюйте 10 слів', check: s => Object.keys(s.stats.wordsSeen ||
                    {}).length >= 10 },
            { id: 'words_50', name: '50 слів', desc: 'Опрацюйте 50 слів', check: s => Object.keys(s.stats.wordsSeen ||
                    {}).length >= 50 },
            { id: 'words_150', name: '150 слів', desc: 'Опрацюйте 150 слів', check: s => Object.keys(s.stats
                    .wordsSeen || {}).length >= 150 },
            { id: 'streak_3', name: '3 дні поспіль', desc: 'Занімайтесь 3 дні поспіль', check: s => (s.streak || 0) >=
                    3 },
            { id: 'streak_7', name: 'Тижнева серія', desc: '7 днів поспіль', check: s => (s.streak || 0) >= 7 },
            { id: 'streak_30', name: 'Місяць дисципліни', desc: '30 днів поспіль', check: s => (s.streak || 0) >= 30 },
            { id: 'first_test', name: 'Перший тест', desc: 'Пройдіть перший тест', check: s => (s.stats.testsCompleted ||
                    0) >= 1 },
            { id: 'tests_10', name: 'Десять тестів', desc: 'Пройдіть 10 тестів', check: s => (s.stats.testsCompleted ||
                    0) >= 10 },
            { id: 'level_a2', name: 'Рівень A2', desc: 'Досягніть рівня A2', check: s => ['A2', 'B1', 'B2', 'C1',
                    'C2'
                ].includes(s.level) },
            { id: 'level_b1', name: 'Рівень B1', desc: 'Досягніть рівня B1', check: s => ['B1', 'B2', 'C1', 'C2']
                    .includes(s.level) },
            { id: 'level_c1', name: 'Рівень C1', desc: 'Досягніть рівня C1', check: s => ['C1', 'C2'].includes(s
                    .level) },
            { id: 'perfect_test', name: 'Ідеальний результат', desc: '100% в одному тесті', check: (s, ctx) => !!(ctx &&
                    ctx.perfectTest) },
            { id: 'lessons_5', name: 'П\'ять уроків', desc: 'Завершіть 5 уроків', check: s => (s.lessonsDone || [])
                    .length >= 5 },
        ];

        function checkAchievements(ctx) {
            let unlockedSomething = false;
            ACHIEVEMENTS.forEach(a => {
                if (!LD().achievements.includes(a.id) && a.check(LD(), ctx)) {
                    LD().achievements.push(a.id);
                    const lang2 = (typeof STATE !== 'undefined' && STATE && STATE.uiLang) || 'uk';
                    const msg2 = { uk: 'Досягнення', en: 'Achievement', ru: 'Достижение' }[lang2];
                    toast(`🏆 ${msg2}: ${achievementName(a)}!`);
                    unlockedSomething = true;
                }
            });
            if (unlockedSomething) updateState();
            return unlockedSomething;
        }

        function recomputeStreak() {
            if (!LD().stats) LD().stats = { activityDates: [], bestStreak: 0 };
            const dates = LD().stats.activityDates || [];
            if (dates.length === 0) { LD().streak = 0; return; }
            let streak = 0;
            let cursor = new Date();
            const set = new Set(dates);
            while (true) {
                const ds = todayStr(cursor);
                if (set.has(ds)) { streak++; cursor.setDate(cursor.getDate() - 1); } else break;
            }
            LD().streak = streak;
            if (streak > (LD().stats.bestStreak || 0)) LD().stats.bestStreak = streak;
        }

        function markActivityToday() {
            if (!LD().stats) LD().stats = { activityDates: [], bestStreak: 0 };
            const t = todayStr();
            if (!LD().stats.activityDates.includes(t)) {
                LD().stats.activityDates.push(t);
                LD().stats.activityDates.sort();
            }
            recomputeStreak();
            updateState();
        }

        // =====================================================================
//  SPEECH (TTS) – покращена версія з Edge TTS
// =====================================================================
// pickVoiceFor(bcp47) шукає системний голос браузера на льоту (а не один
// раз кешує норвезький, як робив старий pickVoice()) — так фолбек теж
// коректно підбирає голос для будь-якої з 30 мов.
function pickVoiceFor(bcp47) {
    if (!('speechSynthesis' in window)) return null;
    const voices = speechSynthesis.getVoices();
    const lower = bcp47.toLowerCase();
    return voices.find(v => v.lang && v.lang.toLowerCase().startsWith(lower)) || null;
}
if ('speechSynthesis' in window) {
    // Прогріваємо список голосів заздалегідь (у деяких браузерах він
    // з'являється асинхронно лише після цієї події) — самого вибору голосу
    // тут більше не робимо, це тепер відповідальність pickVoiceFor().
    speechSynthesis.onvoiceschanged = () => {};
}

// text — що озвучити; lang — код мови ЦЬОГО тексту (не обов'язково
// STATE.targetLang, хоча зазвичай так і є — явний параметр безпечніший,
// ніж мовчазне читання глобального стану всередині функції озвучення).
async function speak(text, lang) {
    lang = lang || (typeof STATE !== 'undefined' && STATE && STATE.targetLang) || 'no';
    const voiceCfg = getTtsVoice(lang);

    // Варіант 1: Worker (melotts)
    if (typeof AI_PROXY_URL !== 'undefined' && AI_PROXY_URL) {
        try {
            const ttsUrl = AI_PROXY_URL.replace(/\/?$/, '') + '/tts-api';
            const res = await fetch(ttsUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, lang: lang }), // <-- ЗМІНА: передаємо lang
            });
            if (res.ok) {
                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                const audio = new Audio(url);
                audio.play();
                return;
            } else {
                // Якщо Worker повернув помилку – йдемо до фолбеку
                throw new Error(`Worker responded with status ${res.status}`);
            }
        } catch (e) {
            console.warn('/tts-api недоступний, використовуємо вбудований голос браузера:', e);
        }
    }

    // Варіант 2 (фолбек): вбудований SpeechSynthesis
    if (!('speechSynthesis' in window)) {
        toast("Озвучення не підтримується");
        return;
    }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = voiceCfg.bcp47;
    const sysVoice = pickVoiceFor(voiceCfg.bcp47);
    if (sysVoice) u.voice = sysVoice;
    u.rate = 0.9;
    u.pitch = 1.0;
    speechSynthesis.speak(u);
}
// =====================================================================
//  ПРАКТИКА ВИМОВИ (Web Speech API — розпізнавання мовлення)
// =====================================================================
// До цього в застосунку була лише ОДНОСТОРОННЯ мовленнєва взаємодія —
// TTS (кнопка 🔊 "Слухати"). Тут людина каже слово вголос, браузер
// розпізнає сказане, і ми порівнюємо з очікуваним словом. Працює через
// стандартний Web Speech API (SpeechRecognition) — підтримується в
// Chrome/Edge (desktop і Android) та Safari (desktop і iOS 14.5+), АЛЕ
// НЕ підтримується у Firefox узагалі — тому перевіряємо підтримку і
// просто ховаємо кнопку мікрофона там, де її нема, замість показувати
// непрацюючу.
function isSpeechRecognitionSupported() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

// Грубе нормалізування для порівняння: нижній регістр, без діакритики,
// без пунктуації. Не ідеально для всіх мов (наприклад, ієрогліфічні
// системи письма це не "почистить"), але покриває більшість підтримуваних
// мов достатньо добре для практики вимови (а не суворого диктанту).
function normalizeForPronunciation(s) {
    return (s || '')
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\p{L}\p{N}\s]/gu, '')
        .trim();
}

function levenshteinDistance(a, b) {
    const m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    const dp = [];
    for (let i = 0; i <= m; i++) dp.push(new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = a[i - 1] === b[j - 1] ?
                dp[i - 1][j - 1] :
                1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
    }
    return dp[m][n];
}

// callback(result, transcript) де result: 'correct' | 'close' | 'wrong' |
// 'no-speech' | 'error' | 'unsupported'
function checkPronunciation(word, lang, callback) {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) { callback('unsupported'); return; }

    const voiceCfg = getTtsVoice(lang);
    const rec = new Recognition();
    rec.lang = voiceCfg.bcp47;
    rec.maxAlternatives = 3;
    rec.interimResults = false;

    let done = false;
    const finish = (result, transcript) => {
        if (done) return;
        done = true;
        try { rec.stop(); } catch (e) {}
        callback(result, transcript);
    };

    rec.onresult = (e) => {
        const alts = Array.from(e.results[0]).map(r => normalizeForPronunciation(r.transcript));
        const target = normalizeForPronunciation(word);
        if (alts.includes(target)) { finish('correct', alts[0]); return; }
        const dist = Math.min(...alts.map(a => levenshteinDistance(a, target)));
        // Поріг "близько" — приблизно третина довжини слова (толерантно до
        // невеликих відхилень вимови/розпізнавання, але не до зовсім іншого слова).
        const threshold = Math.max(1, Math.round(target.length * 0.34));
        finish(dist <= threshold ? 'close' : 'wrong', alts[0]);
    };
    rec.onerror = (e) => {
        finish(e.error === 'no-speech' ? 'no-speech' : 'error');
    };
    rec.onend = () => { if (!done) finish('no-speech'); };

    try { rec.start(); } catch (e) { callback('error'); }
}

// Готова кнопка-мікрофон із вбудованим станом "слухаю" і фідбеком через
// toast(). Повертає null, якщо розпізнавання не підтримується браузером —
// виклик має просто не додавати кнопку в цьому випадку.
function renderMicButton(word, lang, onDone) {
    if (!isSpeechRecognitionSupported()) return null;
    const btn = el(`<button class="soundbtn mic-btn" title="${t('pronounce_btn')}">🎤</button>`);
    btn.onclick = (e) => {
        e.stopPropagation();
        if (btn.classList.contains('listening')) return;
        btn.classList.add('listening');
        btn.textContent = '🎙️';
        checkPronunciation(word, lang, (result, transcript) => {
            btn.classList.remove('listening');
            btn.textContent = '🎤';
            const msgs = {
                correct: t('pronounce_correct'),
                close: t('pronounce_close'),
                wrong: t('pronounce_wrong'),
                'no-speech': t('pronounce_no_speech'),
                error: t('pronounce_error'),
                unsupported: t('pronounce_unsupported'),
            };
            toast(msgs[result] || msgs.error);
            if (onDone) onDone(result, transcript);
        });
    };
    return btn;
}
