// =====================================================================
//  js/data-fr.js — французька, окремий файл (як і норвезька в data.js)
// =====================================================================
// Структура повністю відповідає js/data.js (VOCAB/GRAMMAR/
// NORSKPROVE_TASKS/LEVEL_TEST) — реєструється в window.LANG_DATA.fr,
// той самий механізм, що й для англійської (js/data-en.js). Рівень A1 —
// вручну складений словник (~78-80 слів), рівні A2-C2 поки не заповнені
// (для них далі працює AI-генерація, як і для мов без власного файлу).
//
// Поле "no" у VOCAB — історична назва (від "норвезька"), технічно означає
// "слово МОВОЮ ВИВЧЕННЯ" для будь-якої мови.
(function () {

    const VOCAB = {
        A1: [
            { t: "Привітання", no: "bonjour", uk: "привіт", en: "hello", ru: "привет", ex_no: "Bonjour, comment ça va?", ex_uk: "Привіт, як справи?", en_ex: "Hello, how are you?", ru_ex: "Привет, как дела?" },
            { t: "Привітання", no: "bonne nuit", uk: "на добраніч", en: "good night", ru: "спокойной ночи", ex_no: "Bonne nuit, dors bien!", ex_uk: "На добраніч, солодких снів!", en_ex: "Good night, sleep well!", ru_ex: "Спокойной ночи, сладких снов!" },
            { t: "Привітання", no: "bonsoir", uk: "добрий вечір", en: "good evening", ru: "добрый вечер", ex_no: "Bonsoir, bienvenue chez nous.", ex_uk: "Добрий вечір, ласкаво просимо до нас.", en_ex: "Good evening, welcome to our home.", ru_ex: "Добрый вечер, добро пожаловать к нам." },
            { t: "Привітання", no: "au revoir", uk: "до побачення", en: "goodbye", ru: "до свидания", ex_no: "Au revoir, à demain.", ex_uk: "До побачення, до завтра.", en_ex: "Goodbye, see you tomorrow.", ru_ex: "До свидания, до завтра." },
            { t: "Привітання", no: "merci", uk: "дякую", en: "thank you", ru: "спасибо", ex_no: "Merci pour ton aide.", ex_uk: "Дякую за твою допомогу.", en_ex: "Thank you for your help.", ru_ex: "Спасибо за твою помощь." },
            { t: "Привітання", no: "s'il vous plaît", uk: "будь ласка", en: "please", ru: "пожалуйста", ex_no: "Peux-tu m'aider, s'il te plaît?", ex_uk: "Можеш допомогти мені, будь ласка?", en_ex: "Can you help me, please?", ru_ex: "Можешь помочь мне, пожалуйста?" },
            { t: "Привітання", no: "pardon", uk: "вибачте", en: "sorry", ru: "извините", ex_no: "Pardon, où est la gare?", ex_uk: "Вибачте, де вокзал?", en_ex: "Sorry, where is the station?", ru_ex: "Извините, где вокзал?" },
            { t: "Привітання", no: "oui", uk: "так", en: "yes", ru: "да", ex_no: "Oui, c'est exact.", ex_uk: "Так, це правда.", en_ex: "Yes, that's right.", ru_ex: "Да, это правда." },
            { t: "Привітання", no: "non", uk: "ні", en: "no", ru: "нет", ex_no: "Non, je ne sais pas.", ex_uk: "Ні, я не знаю.", en_ex: "No, I don't know.", ru_ex: "Нет, я не знаю." },
            { t: "Привітання", no: "bienvenue", uk: "ласкаво просимо", en: "welcome", ru: "добро пожаловать", ex_no: "Bienvenue chez nous!", ex_uk: "Ласкаво просимо до нашого дому!", en_ex: "Welcome to our home!", ru_ex: "Добро пожаловать в наш дом!" },
            { t: "Привітання", no: "comment ça va", uk: "як справи", en: "how are you", ru: "как дела", ex_no: "Salut Anna, comment ça va?", ex_uk: "Привіт, Анно, як справи?", en_ex: "Hi Anna, how are you?", ru_ex: "Привет, Анна, как дела?" },
            { t: "Числа", no: "zéro", uk: "нуль", en: "zero", ru: "ноль", ex_no: "On commence à zéro.", ex_uk: "Ми починаємо з нуля.", en_ex: "We start from zero.", ru_ex: "Мы начинаем с нуля." },
            { t: "Числа", no: "un", uk: "один", en: "one", ru: "один", ex_no: "J'ai un chat.", ex_uk: "У мене є один кіт.", en_ex: "I have one cat.", ru_ex: "У меня есть один кот." },
            { t: "Числа", no: "deux", uk: "два", en: "two", ru: "два", ex_no: "Il est deux heures.", ex_uk: "Зараз друга година.", en_ex: "It's two o'clock.", ru_ex: "Сейчас два часа." },
            { t: "Числа", no: "trois", uk: "три", en: "three", ru: "три", ex_no: "J'ai trois frères.", ex_uk: "У мене три брати.", en_ex: "I have three brothers.", ru_ex: "У меня три брата." },
            { t: "Числа", no: "quatre", uk: "чотири", en: "four", ru: "четыре", ex_no: "La table a quatre pieds.", ex_uk: "У стола чотири ноги.", en_ex: "The table has four legs.", ru_ex: "У стола четыре ноги." },
            { t: "Числа", no: "cinq", uk: "п'ять", en: "five", ru: "пять", ex_no: "Je finis le travail à cinq heures.", ex_uk: "Я закінчую роботу о п'ятій.", en_ex: "I finish work at five.", ru_ex: "Я заканчиваю работу в пять." },
            { t: "Числа", no: "six", uk: "шість", en: "six", ru: "шесть", ex_no: "Nous nous réveillons à six heures.", ex_uk: "Ми прокидаємось о шостій.", en_ex: "We wake up at six.", ru_ex: "Мы просыпаемся в шесть." },
            { t: "Числа", no: "sept", uk: "сім", en: "seven", ru: "семь", ex_no: "Une semaine a sept jours.", ex_uk: "У тижні сім днів.", en_ex: "There are seven days in a week.", ru_ex: "В неделе семь дней." },
            { t: "Числа", no: "huit", uk: "вісім", en: "eight", ru: "восемь", ex_no: "Le magasin ouvre à huit heures.", ex_uk: "Магазин відкривається о восьмій.", en_ex: "The shop opens at eight.", ru_ex: "Магазин открывается в восемь." },
            { t: "Числа", no: "neuf", uk: "дев'ять", en: "nine", ru: "девять", ex_no: "L'école commence à neuf heures.", ex_uk: "Школа починається о дев'ятій.", en_ex: "School starts at nine.", ru_ex: "Школа начинается в девять." },
            { t: "Числа", no: "dix", uk: "десять", en: "ten", ru: "десять", ex_no: "Je compte jusqu'à dix.", ex_uk: "Я рахую до десяти.", en_ex: "I count to ten.", ru_ex: "Я считаю до десяти." },
            { t: "Числа", no: "vingt", uk: "двадцять", en: "twenty", ru: "двадцать", ex_no: "Elle a vingt ans.", ex_uk: "Їй двадцять років.", en_ex: "She is twenty years old.", ru_ex: "Ей двадцать лет." },
            { t: "Числа", no: "cent", uk: "сто", en: "hundred", ru: "сто", ex_no: "Il y a cent personnes ici.", ex_uk: "Тут сто людей.", en_ex: "There are a hundred people here.", ru_ex: "Здесь сто человек." },
            { t: "Родина", no: "la famille", uk: "родина", en: "family", ru: "семья", ex_no: "J'aime ma famille.", ex_uk: "Я люблю свою родину.", en_ex: "I love my family.", ru_ex: "Я люблю свою семью." },
            { t: "Родина", no: "la mère", uk: "мама", en: "mother", ru: "мама", ex_no: "Ma mère prépare le dîner.", ex_uk: "Моя мама готує вечерю.", en_ex: "My mother cooks dinner.", ru_ex: "Моя мама готовит ужин." },
            { t: "Родина", no: "le père", uk: "тато", en: "father", ru: "папа", ex_no: "Mon père travaille en ville.", ex_uk: "Мій тато працює в місті.", en_ex: "My father works in the city.", ru_ex: "Мой папа работает в городе." },
            { t: "Родина", no: "la sœur", uk: "сестра", en: "sister", ru: "сестра", ex_no: "Ma sœur est plus jeune que moi.", ex_uk: "Моя сестра молодша за мене.", en_ex: "My sister is younger than me.", ru_ex: "Моя сестра младше меня." },
            { t: "Родина", no: "le frère", uk: "брат", en: "brother", ru: "брат", ex_no: "Mon frère habite à Paris.", ex_uk: "Мій брат живе в Парижі.", en_ex: "My brother lives in Paris.", ru_ex: "Мой брат живёт в Париже." },
            { t: "Родина", no: "l'enfant", uk: "дитина", en: "child", ru: "ребёнок", ex_no: "L'enfant joue dehors.", ex_uk: "Дитина грається надворі.", en_ex: "The child is playing outside.", ru_ex: "Ребёнок играет на улице." },
            { t: "Родина", no: "la grand-mère", uk: "бабуся", en: "grandmother", ru: "бабушка", ex_no: "Ma grand-mère fait du pain chaque semaine.", ex_uk: "Моя бабуся пече хліб щотижня.", en_ex: "My grandmother bakes bread every week.", ru_ex: "Моя бабушка печёт хлеб каждую неделю." },
            { t: "Родина", no: "le grand-père", uk: "дідусь", en: "grandfather", ru: "дедушка", ex_no: "Mon grand-père raconte de belles histoires.", ex_uk: "Мій дідусь розповідає чудові історії.", en_ex: "My grandfather tells great stories.", ru_ex: "Мой дедушка рассказывает отличные истории." },
            { t: "Родина", no: "l'ami", uk: "друг", en: "friend", ru: "друг", ex_no: "Il est mon meilleur ami.", ex_uk: "Він мій найкращий друг.", en_ex: "He is my best friend.", ru_ex: "Он мой лучший друг." },
            { t: "Кольори", no: "rouge", uk: "червоний", en: "red", ru: "красный", ex_no: "La pomme est rouge.", ex_uk: "Яблуко червоне.", en_ex: "The apple is red.", ru_ex: "Яблоко красное." },
            { t: "Кольори", no: "bleu", uk: "синій", en: "blue", ru: "синий", ex_no: "Le ciel est bleu aujourd'hui.", ex_uk: "Сьогодні небо синє.", en_ex: "The sky is blue today.", ru_ex: "Сегодня небо синее." },
            { t: "Кольори", no: "vert", uk: "зелений", en: "green", ru: "зелёный", ex_no: "L'herbe est verte.", ex_uk: "Трава зелена.", en_ex: "The grass is green.", ru_ex: "Трава зелёная." },
            { t: "Кольори", no: "jaune", uk: "жовтий", en: "yellow", ru: "жёлтый", ex_no: "Le soleil est jaune.", ex_uk: "Сонце жовте.", en_ex: "The sun is yellow.", ru_ex: "Солнце жёлтое." },
            { t: "Кольори", no: "noir", uk: "чорний", en: "black", ru: "чёрный", ex_no: "Elle a un chat noir.", ex_uk: "У неї чорний кіт.", en_ex: "She has a black cat.", ru_ex: "У неё чёрный кот." },
            { t: "Кольори", no: "blanc", uk: "білий", en: "white", ru: "белый", ex_no: "La neige est blanche.", ex_uk: "Сніг білий.", en_ex: "The snow is white.", ru_ex: "Снег белый." },
            { t: "Кольори", no: "orange", uk: "помаранчевий", en: "orange", ru: "оранжевый", ex_no: "J'aime le jus d'orange.", ex_uk: "Мені подобається помаранчевий сік.", en_ex: "I like orange juice.", ru_ex: "Мне нравится апельсиновый сок." },
            { t: "Дні тижня", no: "lundi", uk: "понеділок", en: "Monday", ru: "понедельник", ex_no: "Je commence le travail lundi.", ex_uk: "Я починаю роботу в понеділок.", en_ex: "I start work on Monday.", ru_ex: "Я начинаю работу в понедельник." },
            { t: "Дні тижня", no: "mardi", uk: "вівторок", en: "Tuesday", ru: "вторник", ex_no: "Nous avons une réunion mardi.", ex_uk: "У нас зустріч у вівторок.", en_ex: "We have a meeting on Tuesday.", ru_ex: "У нас встреча во вторник." },
            { t: "Дні тижня", no: "mercredi", uk: "середа", en: "Wednesday", ru: "среда", ex_no: "Je vais à la salle de sport le mercredi.", ex_uk: "Я ходжу в спортзал у середу.", en_ex: "I go to the gym on Wednesday.", ru_ex: "Я хожу в спортзал в среду." },
            { t: "Дні тижня", no: "jeudi", uk: "четвер", en: "Thursday", ru: "четверг", ex_no: "L'examen est jeudi.", ex_uk: "Іспит у четвер.", en_ex: "The exam is on Thursday.", ru_ex: "Экзамен в четверг." },
            { t: "Дні тижня", no: "vendredi", uk: "п'ятниця", en: "Friday", ru: "пятница", ex_no: "Nous fêtons ça vendredi.", ex_uk: "Ми святкуємо в п'ятницю.", en_ex: "We celebrate on Friday.", ru_ex: "Мы празднуем в пятницу." },
            { t: "Дні тижня", no: "samedi", uk: "субота", en: "Saturday", ru: "суббота", ex_no: "Je nettoie la maison le samedi.", ex_uk: "Я прибираю в суботу.", en_ex: "I clean the house on Saturday.", ru_ex: "Я убираюсь в субботу." },
            { t: "Дні тижня", no: "dimanche", uk: "неділя", en: "Sunday", ru: "воскресенье", ex_no: "Nous nous reposons le dimanche.", ex_uk: "Ми відпочиваємо в неділю.", en_ex: "We rest on Sunday.", ru_ex: "Мы отдыхаем в воскресенье." },
            { t: "Дієслова", no: "être", uk: "бути", en: "to be", ru: "быть", ex_no: "Je suis étudiant.", ex_uk: "Я студент.", en_ex: "I am a student.", ru_ex: "Я студент." },
            { t: "Дієслова", no: "avoir", uk: "мати", en: "to have", ru: "иметь", ex_no: "J'ai une voiture.", ex_uk: "У мене є машина.", en_ex: "I have a car.", ru_ex: "У меня есть машина." },
            { t: "Дієслова", no: "aller", uk: "йти", en: "to go", ru: "идти", ex_no: "Je vais au travail tous les jours.", ex_uk: "Я йду на роботу щодня.", en_ex: "I go to work every day.", ru_ex: "Я иду на работу каждый день." },
            { t: "Дієслова", no: "manger", uk: "їсти", en: "to eat", ru: "есть", ex_no: "Nous prenons le petit-déjeuner à sept heures.", ex_uk: "Ми снідаємо о сьомій.", en_ex: "We eat breakfast at seven.", ru_ex: "Мы завтракаем в семь." },
            { t: "Дієслова", no: "boire", uk: "пити", en: "to drink", ru: "пить", ex_no: "Je bois de l'eau chaque matin.", ex_uk: "Я п'ю воду щоранку.", en_ex: "I drink water every morning.", ru_ex: "Я пью воду каждое утро." },
            { t: "Дієслова", no: "voir", uk: "бачити", en: "to see", ru: "видеть", ex_no: "Je peux voir les montagnes.", ex_uk: "Я бачу гори.", en_ex: "I can see the mountains.", ru_ex: "Я вижу горы." },
            { t: "Дієслова", no: "parler", uk: "говорити", en: "to speak", ru: "говорить", ex_no: "Elle parle trois langues.", ex_uk: "Вона говорить трьома мовами.", en_ex: "She speaks three languages.", ru_ex: "Она говорит на трёх языках." },
            { t: "Дієслова", no: "vouloir", uk: "хотіти", en: "to want", ru: "хотеть", ex_no: "Je voudrais un café, s'il vous plaît.", ex_uk: "Я хочу каву, будь ласка.", en_ex: "I want a coffee, please.", ru_ex: "Я хочу кофе, пожалуйста." },
            { t: "Дієслова", no: "vivre", uk: "жити", en: "to live", ru: "жить", ex_no: "Nous vivons dans une petite ville.", ex_uk: "Ми живемо в маленькому місті.", en_ex: "We live in a small town.", ru_ex: "Мы живём в маленьком городе." },
            { t: "Дієслова", no: "travailler", uk: "працювати", en: "to work", ru: "работать", ex_no: "Il travaille dans un hôpital.", ex_uk: "Він працює в лікарні.", en_ex: "He works in a hospital.", ru_ex: "Он работает в больнице." },
            { t: "Дієслова", no: "dormir", uk: "спати", en: "to sleep", ru: "спать", ex_no: "Le bébé dort beaucoup.", ex_uk: "Дитина багато спить.", en_ex: "The baby sleeps a lot.", ru_ex: "Малыш много спит." },
            { t: "Їжа", no: "le pain", uk: "хліб", en: "bread", ru: "хлеб", ex_no: "J'achète du pain frais tous les jours.", ex_uk: "Я купую свіжий хліб щодня.", en_ex: "I buy fresh bread every day.", ru_ex: "Я покупаю свежий хлеб каждый день." },
            { t: "Їжа", no: "l'eau", uk: "вода", en: "water", ru: "вода", ex_no: "Puis-je avoir de l'eau?", ex_uk: "Можна мені трохи води?", en_ex: "Can I have some water?", ru_ex: "Можно мне немного воды?" },
            { t: "Їжа", no: "le lait", uk: "молоко", en: "milk", ru: "молоко", ex_no: "Je bois du lait au petit-déjeuner.", ex_uk: "Я п'ю молоко зі сніданком.", en_ex: "I drink milk with breakfast.", ru_ex: "Я пью молоко с завтраком." },
            { t: "Їжа", no: "l'œuf", uk: "яйце", en: "egg", ru: "яйцо", ex_no: "Je mange un œuf chaque matin.", ex_uk: "Я їм яйце щоранку.", en_ex: "I eat an egg every morning.", ru_ex: "Я ем яйцо каждое утро." },
            { t: "Їжа", no: "la pomme", uk: "яблуко", en: "apple", ru: "яблоко", ex_no: "Elle mange une pomme au déjeuner.", ex_uk: "Вона їсть яблуко на обід.", en_ex: "She eats an apple for lunch.", ru_ex: "Она ест яблоко на обед." },
            { t: "Їжа", no: "la viande", uk: "м'ясо", en: "meat", ru: "мясо", ex_no: "Nous ne mangeons pas de viande le vendredi.", ex_uk: "Ми не їмо м'ясо по п'ятницях.", en_ex: "We don't eat meat on Fridays.", ru_ex: "Мы не едим мясо по пятницам." },
            { t: "Їжа", no: "le fromage", uk: "сир", en: "cheese", ru: "сыр", ex_no: "J'adore le fromage français.", ex_uk: "Я люблю французький сир.", en_ex: "I love French cheese.", ru_ex: "Я люблю французский сыр." },
            { t: "Їжа", no: "le café", uk: "кава", en: "coffee", ru: "кофе", ex_no: "Je bois du café chaque matin.", ex_uk: "Я п'ю каву щоранку.", en_ex: "I drink coffee every morning.", ru_ex: "Я пью кофе каждое утро." },
            { t: "Прикметники", no: "grand", uk: "великий", en: "big", ru: "большой", ex_no: "C'est une grande maison.", ex_uk: "Це великий будинок.", en_ex: "This is a big house.", ru_ex: "Это большой дом." },
            { t: "Прикметники", no: "petit", uk: "маленький", en: "small", ru: "маленький", ex_no: "Le chat est très petit.", ex_uk: "Кіт дуже маленький.", en_ex: "The cat is very small.", ru_ex: "Кот очень маленький." },
            { t: "Прикметники", no: "bon", uk: "добрий", en: "good", ru: "хороший", ex_no: "C'est une bonne idée.", ex_uk: "Це добра ідея.", en_ex: "This is a good idea.", ru_ex: "Это хорошая идея." },
            { t: "Прикметники", no: "mauvais", uk: "поганий", en: "bad", ru: "плохой", ex_no: "Le temps est mauvais aujourd'hui.", ex_uk: "Сьогодні погана погода.", en_ex: "The weather is bad today.", ru_ex: "Сегодня плохая погода." },
            { t: "Прикметники", no: "nouveau", uk: "новий", en: "new", ru: "новый", ex_no: "J'ai acheté un nouveau téléphone.", ex_uk: "Я купив новий телефон.", en_ex: "I bought a new phone.", ru_ex: "Я купил новый телефон." },
            { t: "Прикметники", no: "vieux", uk: "старий", en: "old", ru: "старый", ex_no: "Ce livre est très vieux.", ex_uk: "Ця книга дуже стара.", en_ex: "This book is very old.", ru_ex: "Эта книга очень старая." },
            { t: "Тіло", no: "la tête", uk: "голова", en: "head", ru: "голова", ex_no: "J'ai mal à la tête.", ex_uk: "У мене болить голова.", en_ex: "My head hurts.", ru_ex: "У меня болит голова." },
            { t: "Тіло", no: "la main", uk: "рука", en: "hand", ru: "рука", ex_no: "Donne-moi ta main.", ex_uk: "Дай мені руку.", en_ex: "Give me your hand.", ru_ex: "Дай мне руку." },
            { t: "Тіло", no: "l'œil", uk: "око", en: "eye", ru: "глаз", ex_no: "Elle a les yeux bleus.", ex_uk: "У неї блакитні очі.", en_ex: "She has blue eyes.", ru_ex: "У неё голубые глаза." },
            { t: "Дім", no: "la maison", uk: "будинок", en: "house", ru: "дом", ex_no: "Nous vivons dans une petite maison.", ex_uk: "Ми живемо в маленькому будинку.", en_ex: "We live in a small house.", ru_ex: "Мы живём в маленьком доме." },
            { t: "Дім", no: "la chambre", uk: "кімната", en: "room", ru: "комната", ex_no: "Ma chambre est à l'étage.", ex_uk: "Моя кімната нагорі.", en_ex: "My room is upstairs.", ru_ex: "Моя комната наверху." },
            { t: "Дім", no: "la porte", uk: "двері", en: "door", ru: "дверь", ex_no: "Ferme la porte, s'il te plaît.", ex_uk: "Будь ласка, зачини двері.", en_ex: "Please close the door.", ru_ex: "Пожалуйста, закрой дверь." },
        ],
        A2: [],
        B1: [],
        B2: [],
        C1: [],
        C2: [],
    };

    const GRAMMAR = [];

    const NORSKPROVE_TASKS = {
        A1: { reading: [], listening: [], writing: [], speaking: [] },
        A2: { reading: [], listening: [], writing: [], speaking: [] },
        B1: { reading: [], listening: [], writing: [], speaking: [] },
        B2: { reading: [], listening: [], writing: [], speaking: [] },
        C1: { reading: [], listening: [], writing: [], speaking: [] },
        C2: { reading: [], listening: [], writing: [], speaking: [] },
    };

    const LEVEL_TEST = [];

    window.LANG_DATA = window.LANG_DATA || {};
    window.LANG_DATA.fr = { VOCAB, GRAMMAR, NORSKPROVE_TASKS, LEVEL_TEST };
})();
