```javascript
// =====================================================================
//  js/data-fr.js — ФРАНЦУЗЬКА МОВА (ПОВНИЙ НАБІР)
//  Повністю сумісний з js/data.js для норвезької.
//  Містить VOCAB, GRAMMAR, NORSKPROVE_TASKS, LEVEL_TEST.
// =====================================================================
(function () {

    // =====================================================================
    //  VOCAB – СЛОВНИК ЗА РІВНЯМИ (A1-C2)
    // =====================================================================
    const VOCAB = {
        // -------------------- A1 --------------------
        A1: [
            // Greetings
            { t: "Greetings", no: "bonjour", uk: "привіт", en: "hello", ru: "привет", ex_no: "Bonjour, comment ça va?", ex_uk: "Привіт, як справи?", en_ex: "Hello, how are you?", ru_ex: "Привет, как дела?" },
            { t: "Greetings", no: "bonsoir", uk: "добрий вечір", en: "good evening", ru: "добрый вечер", ex_no: "Bonsoir, bienvenue chez nous.", ex_uk: "Добрий вечір, ласкаво просимо до нас.", en_ex: "Good evening, welcome to our home.", ru_ex: "Добрый вечер, добро пожаловать к нам." },
            { t: "Greetings", no: "bonne nuit", uk: "на добраніч", en: "good night", ru: "спокойной ночи", ex_no: "Bonne nuit, dors bien!", ex_uk: "На добраніч, солодких снів!", en_ex: "Good night, sleep well!", ru_ex: "Спокойной ночи, сладких снов!" },
            { t: "Greetings", no: "au revoir", uk: "до побачення", en: "goodbye", ru: "до свидания", ex_no: "Au revoir, à demain.", ex_uk: "До побачення, до завтра.", en_ex: "Goodbye, see you tomorrow.", ru_ex: "До свидания, до завтра." },
            { t: "Greetings", no: "merci", uk: "дякую", en: "thank you", ru: "спасибо", ex_no: "Merci pour ton aide.", ex_uk: "Дякую за твою допомогу.", en_ex: "Thank you for your help.", ru_ex: "Спасибо за твою помощь." },
            { t: "Greetings", no: "s'il vous plaît", uk: "будь ласка", en: "please", ru: "пожалуйста", ex_no: "Peux-tu m'aider, s'il te plaît?", ex_uk: "Можеш допомогти мені, будь ласка?", en_ex: "Can you help me, please?", ru_ex: "Можешь помочь мне, пожалуйста?" },
            { t: "Greetings", no: "pardon", uk: "вибачте", en: "sorry", ru: "извините", ex_no: "Pardon, où est la gare?", ex_uk: "Вибачте, де вокзал?", en_ex: "Sorry, where is the station?", ru_ex: "Извините, где вокзал?" },
            { t: "Greetings", no: "oui", uk: "так", en: "yes", ru: "да", ex_no: "Oui, c'est exact.", ex_uk: "Так, це правда.", en_ex: "Yes, that's right.", ru_ex: "Да, это правда." },
            { t: "Greetings", no: "non", uk: "ні", en: "no", ru: "нет", ex_no: "Non, je ne sais pas.", ex_uk: "Ні, я не знаю.", en_ex: "No, I don't know.", ru_ex: "Нет, я не знаю." },
            { t: "Greetings", no: "bienvenue", uk: "ласкаво просимо", en: "welcome", ru: "добро пожаловать", ex_no: "Bienvenue chez nous!", ex_uk: "Ласкаво просимо до нашого дому!", en_ex: "Welcome to our home!", ru_ex: "Добро пожаловать в наш дом!" },
            { t: "Greetings", no: "comment ça va", uk: "як справи", en: "how are you", ru: "как дела", ex_no: "Salut Anna, comment ça va?", ex_uk: "Привіт, Анно, як справи?", en_ex: "Hi Anna, how are you?", ru_ex: "Привет, Анна, как дела?" },
            // Numbers
            { t: "Numbers", no: "zéro", uk: "нуль", en: "zero", ru: "ноль", ex_no: "On commence à zéro.", ex_uk: "Ми починаємо з нуля.", en_ex: "We start from zero.", ru_ex: "Мы начинаем с нуля." },
            { t: "Numbers", no: "un", uk: "один", en: "one", ru: "один", ex_no: "J'ai un chat.", ex_uk: "У мене є один кіт.", en_ex: "I have one cat.", ru_ex: "У меня есть один кот." },
            { t: "Numbers", no: "deux", uk: "два", en: "two", ru: "два", ex_no: "Il est deux heures.", ex_uk: "Зараз друга година.", en_ex: "It's two o'clock.", ru_ex: "Сейчас два часа." },
            { t: "Numbers", no: "trois", uk: "три", en: "three", ru: "три", ex_no: "J'ai trois frères.", ex_uk: "У мене три брати.", en_ex: "I have three brothers.", ru_ex: "У меня три брата." },
            { t: "Numbers", no: "quatre", uk: "чотири", en: "four", ru: "четыре", ex_no: "La table a quatre pieds.", ex_uk: "У стола чотири ноги.", en_ex: "The table has four legs.", ru_ex: "У стола четыре ноги." },
            { t: "Numbers", no: "cinq", uk: "п'ять", en: "five", ru: "пять", ex_no: "Je finis le travail à cinq heures.", ex_uk: "Я закінчую роботу о п'ятій.", en_ex: "I finish work at five.", ru_ex: "Я заканчиваю работу в пять." },
            { t: "Numbers", no: "six", uk: "шість", en: "six", ru: "шесть", ex_no: "Nous nous réveillons à six heures.", ex_uk: "Ми прокидаємось о шостій.", en_ex: "We wake up at six.", ru_ex: "Мы просыпаемся в шесть." },
            { t: "Numbers", no: "sept", uk: "сім", en: "seven", ru: "семь", ex_no: "Une semaine a sept jours.", ex_uk: "У тижні сім днів.", en_ex: "There are seven days in a week.", ru_ex: "В неделе семь дней." },
            { t: "Numbers", no: "huit", uk: "вісім", en: "eight", ru: "восемь", ex_no: "Le magasin ouvre à huit heures.", ex_uk: "Магазин відкривається о восьмій.", en_ex: "The shop opens at eight.", ru_ex: "Магазин открывается в восемь." },
            { t: "Numbers", no: "neuf", uk: "дев'ять", en: "nine", ru: "девять", ex_no: "L'école commence à neuf heures.", ex_uk: "Школа починається о дев'ятій.", en_ex: "School starts at nine.", ru_ex: "Школа начинается в девять." },
            { t: "Numbers", no: "dix", uk: "десять", en: "ten", ru: "десять", ex_no: "Je compte jusqu'à dix.", ex_uk: "Я рахую до десяти.", en_ex: "I count to ten.", ru_ex: "Я считаю до десяти." },
            { t: "Numbers", no: "vingt", uk: "двадцять", en: "twenty", ru: "двадцать", ex_no: "Elle a vingt ans.", ex_uk: "Їй двадцять років.", en_ex: "She is twenty years old.", ru_ex: "Ей двадцать лет." },
            { t: "Numbers", no: "cent", uk: "сто", en: "hundred", ru: "сто", ex_no: "Il y a cent personnes ici.", ex_uk: "Тут сто людей.", en_ex: "There are a hundred people here.", ru_ex: "Здесь сто человек." },
            // Family
            { t: "Family", no: "la famille", uk: "родина", en: "family", ru: "семья", ex_no: "J'aime ma famille.", ex_uk: "Я люблю свою родину.", en_ex: "I love my family.", ru_ex: "Я люблю свою семью." },
            { t: "Family", no: "la mère", uk: "мама", en: "mother", ru: "мама", ex_no: "Ma mère prépare le dîner.", ex_uk: "Моя мама готує вечерю.", en_ex: "My mother cooks dinner.", ru_ex: "Моя мама готовит ужин." },
            { t: "Family", no: "le père", uk: "тато", en: "father", ru: "папа", ex_no: "Mon père travaille en ville.", ex_uk: "Мій тато працює в місті.", en_ex: "My father works in the city.", ru_ex: "Мой папа работает в городе." },
            { t: "Family", no: "la sœur", uk: "сестра", en: "sister", ru: "сестра", ex_no: "Ma sœur est plus jeune que moi.", ex_uk: "Моя сестра молодша за мене.", en_ex: "My sister is younger than me.", ru_ex: "Моя сестра младше меня." },
            { t: "Family", no: "le frère", uk: "брат", en: "brother", ru: "брат", ex_no: "Mon frère habite à Paris.", ex_uk: "Мій брат живе в Парижі.", en_ex: "My brother lives in Paris.", ru_ex: "Мой брат живёт в Париже." },
            { t: "Family", no: "l'enfant", uk: "дитина", en: "child", ru: "ребёнок", ex_no: "L'enfant joue dehors.", ex_uk: "Дитина грається надворі.", en_ex: "The child is playing outside.", ru_ex: "Ребёнок играет на улице." },
            { t: "Family", no: "la grand-mère", uk: "бабуся", en: "grandmother", ru: "бабушка", ex_no: "Ma grand-mère fait du pain chaque semaine.", ex_uk: "Моя бабуся пече хліб щотижня.", en_ex: "My grandmother bakes bread every week.", ru_ex: "Моя бабушка печёт хлеб каждую неделю." },
            { t: "Family", no: "le grand-père", uk: "дідусь", en: "grandfather", ru: "дедушка", ex_no: "Mon grand-père raconte de belles histoires.", ex_uk: "Мій дідусь розповідає чудові історії.", en_ex: "My grandfather tells great stories.", ru_ex: "Мой дедушка рассказывает отличные истории." },
            { t: "Family", no: "l'ami", uk: "друг", en: "friend", ru: "друг", ex_no: "Il est mon meilleur ami.", ex_uk: "Він мій найкращий друг.", en_ex: "He is my best friend.", ru_ex: "Он мой лучший друг." },
            // Colors
            { t: "Colors", no: "rouge", uk: "червоний", en: "red", ru: "красный", ex_no: "La pomme est rouge.", ex_uk: "Яблуко червоне.", en_ex: "The apple is red.", ru_ex: "Яблоко красное." },
            { t: "Colors", no: "bleu", uk: "синій", en: "blue", ru: "синий", ex_no: "Le ciel est bleu aujourd'hui.", ex_uk: "Сьогодні небо синє.", en_ex: "The sky is blue today.", ru_ex: "Сегодня небо синее." },
            { t: "Colors", no: "vert", uk: "зелений", en: "green", ru: "зелёный", ex_no: "L'herbe est verte.", ex_uk: "Трава зелена.", en_ex: "The grass is green.", ru_ex: "Трава зелёная." },
            { t: "Colors", no: "jaune", uk: "жовтий", en: "yellow", ru: "жёлтый", ex_no: "Le soleil est jaune.", ex_uk: "Сонце жовте.", en_ex: "The sun is yellow.", ru_ex: "Солнце жёлтое." },
            { t: "Colors", no: "noir", uk: "чорний", en: "black", ru: "чёрный", ex_no: "Elle a un chat noir.", ex_uk: "У неї чорний кіт.", en_ex: "She has a black cat.", ru_ex: "У неё чёрный кот." },
            { t: "Colors", no: "blanc", uk: "білий", en: "white", ru: "белый", ex_no: "La neige est blanche.", ex_uk: "Сніг білий.", en_ex: "The snow is white.", ru_ex: "Снег белый." },
            { t: "Colors", no: "orange", uk: "помаранчевий", en: "orange", ru: "оранжевый", ex_no: "J'aime le jus d'orange.", ex_uk: "Мені подобається помаранчевий сік.", en_ex: "I like orange juice.", ru_ex: "Мне нравится апельсиновый сок." },
            // Days
            { t: "Days", no: "lundi", uk: "понеділок", en: "Monday", ru: "понедельник", ex_no: "Je commence le travail lundi.", ex_uk: "Я починаю роботу в понеділок.", en_ex: "I start work on Monday.", ru_ex: "Я начинаю работу в понедельник." },
            { t: "Days", no: "mardi", uk: "вівторок", en: "Tuesday", ru: "вторник", ex_no: "Nous avons une réunion mardi.", ex_uk: "У нас зустріч у вівторок.", en_ex: "We have a meeting on Tuesday.", ru_ex: "У нас встреча во вторник." },
            { t: "Days", no: "mercredi", uk: "середа", en: "Wednesday", ru: "среда", ex_no: "Je vais à la salle de sport le mercredi.", ex_uk: "Я ходжу в спортзал у середу.", en_ex: "I go to the gym on Wednesday.", ru_ex: "Я хожу в спортзал в среду." },
            { t: "Days", no: "jeudi", uk: "четвер", en: "Thursday", ru: "четверг", ex_no: "L'examen est jeudi.", ex_uk: "Іспит у четвер.", en_ex: "The exam is on Thursday.", ru_ex: "Экзамен в четверг." },
            { t: "Days", no: "vendredi", uk: "п'ятниця", en: "Friday", ru: "пятница", ex_no: "Nous fêtons ça vendredi.", ex_uk: "Ми святкуємо в п'ятницю.", en_ex: "We celebrate on Friday.", ru_ex: "Мы празднуем в пятницу." },
            { t: "Days", no: "samedi", uk: "субота", en: "Saturday", ru: "суббота", ex_no: "Je nettoie la maison le samedi.", ex_uk: "Я прибираю в суботу.", en_ex: "I clean the house on Saturday.", ru_ex: "Я убираюсь в субботу." },
            { t: "Days", no: "dimanche", uk: "неділя", en: "Sunday", ru: "воскресенье", ex_no: "Nous nous reposons le dimanche.", ex_uk: "Ми відпочиваємо в неділю.", en_ex: "We rest on Sunday.", ru_ex: "Мы отдыхаем в воскресенье." },
            // Verbs
            { t: "Verbs", no: "être", uk: "бути", en: "to be", ru: "быть", ex_no: "Je suis étudiant.", ex_uk: "Я студент.", en_ex: "I am a student.", ru_ex: "Я студент." },
            { t: "Verbs", no: "avoir", uk: "мати", en: "to have", ru: "иметь", ex_no: "J'ai une voiture.", ex_uk: "У мене є машина.", en_ex: "I have a car.", ru_ex: "У меня есть машина." },
            { t: "Verbs", no: "aller", uk: "йти", en: "to go", ru: "идти", ex_no: "Je vais au travail tous les jours.", ex_uk: "Я йду на роботу щодня.", en_ex: "I go to work every day.", ru_ex: "Я иду на работу каждый день." },
            { t: "Verbs", no: "manger", uk: "їсти", en: "to eat", ru: "есть", ex_no: "Nous prenons le petit-déjeuner à sept heures.", ex_uk: "Ми снідаємо о сьомій.", en_ex: "We eat breakfast at seven.", ru_ex: "Мы завтракаем в семь." },
            { t: "Verbs", no: "boire", uk: "пити", en: "to drink", ru: "пить", ex_no: "Je bois de l'eau chaque matin.", ex_uk: "Я п'ю воду щоранку.", en_ex: "I drink water every morning.", ru_ex: "Я пью воду каждое утро." },
            { t: "Verbs", no: "voir", uk: "бачити", en: "to see", ru: "видеть", ex_no: "Je peux voir les montagnes.", ex_uk: "Я бачу гори.", en_ex: "I can see the mountains.", ru_ex: "Я вижу горы." },
            { t: "Verbs", no: "parler", uk: "говорити", en: "to speak", ru: "говорить", ex_no: "Elle parle trois langues.", ex_uk: "Вона говорить трьома мовами.", en_ex: "She speaks three languages.", ru_ex: "Она говорит на трёх языках." },
            { t: "Verbs", no: "vouloir", uk: "хотіти", en: "to want", ru: "хотеть", ex_no: "Je voudrais un café, s'il vous plaît.", ex_uk: "Я хочу каву, будь ласка.", en_ex: "I want a coffee, please.", ru_ex: "Я хочу кофе, пожалуйста." },
            { t: "Verbs", no: "vivre", uk: "жити", en: "to live", ru: "жить", ex_no: "Nous vivons dans une petite ville.", ex_uk: "Ми живемо в маленькому місті.", en_ex: "We live in a small town.", ru_ex: "Мы живём в маленьком городе." },
            { t: "Verbs", no: "travailler", uk: "працювати", en: "to work", ru: "работать", ex_no: "Il travaille dans un hôpital.", ex_uk: "Він працює в лікарні.", en_ex: "He works in a hospital.", ru_ex: "Он работает в больнице." },
            { t: "Verbs", no: "dormir", uk: "спати", en: "to sleep", ru: "спать", ex_no: "Le bébé dort beaucoup.", ex_uk: "Дитина багато спить.", en_ex: "The baby sleeps a lot.", ru_ex: "Малыш много спит." },
            // Food
            { t: "Food", no: "le pain", uk: "хліб", en: "bread", ru: "хлеб", ex_no: "J'achète du pain frais tous les jours.", ex_uk: "Я купую свіжий хліб щодня.", en_ex: "I buy fresh bread every day.", ru_ex: "Я покупаю свежий хлеб каждый день." },
            { t: "Food", no: "l'eau", uk: "вода", en: "water", ru: "вода", ex_no: "Puis-je avoir de l'eau?", ex_uk: "Можна мені трохи води?", en_ex: "Can I have some water?", ru_ex: "Можно мне немного воды?" },
            { t: "Food", no: "le lait", uk: "молоко", en: "milk", ru: "молоко", ex_no: "Je bois du lait au petit-déjeuner.", ex_uk: "Я п'ю молоко зі сніданком.", en_ex: "I drink milk with breakfast.", ru_ex: "Я пью молоко с завтраком." },
            { t: "Food", no: "l'œuf", uk: "яйце", en: "egg", ru: "яйцо", ex_no: "Je mange un œuf chaque matin.", ex_uk: "Я їм яйце щоранку.", en_ex: "I eat an egg every morning.", ru_ex: "Я ем яйцо каждое утро." },
            { t: "Food", no: "la pomme", uk: "яблуко", en: "apple", ru: "яблоко", ex_no: "Elle mange une pomme au déjeuner.", ex_uk: "Вона їсть яблуко на обід.", en_ex: "She eats an apple for lunch.", ru_ex: "Она ест яблоко на обед." },
            { t: "Food", no: "la viande", uk: "м'ясо", en: "meat", ru: "мясо", ex_no: "Nous ne mangeons pas de viande le vendredi.", ex_uk: "Ми не їмо м'ясо по п'ятницях.", en_ex: "We don't eat meat on Fridays.", ru_ex: "Мы не едим мясо по пятницам." },
            { t: "Food", no: "le fromage", uk: "сир", en: "cheese", ru: "сыр", ex_no: "J'adore le fromage français.", ex_uk: "Я люблю французький сир.", en_ex: "I love French cheese.", ru_ex: "Я люблю французский сыр." },
            { t: "Food", no: "le café", uk: "кава", en: "coffee", ru: "кофе", ex_no: "Je bois du café chaque matin.", ex_uk: "Я п'ю каву щоранку.", en_ex: "I drink coffee every morning.", ru_ex: "Я пью кофе каждое утро." },
            // Adjectives
            { t: "Adjectives", no: "grand", uk: "великий", en: "big", ru: "большой", ex_no: "C'est une grande maison.", ex_uk: "Це великий будинок.", en_ex: "This is a big house.", ru_ex: "Это большой дом." },
            { t: "Adjectives", no: "petit", uk: "маленький", en: "small", ru: "маленький", ex_no: "Le chat est très petit.", ex_uk: "Кіт дуже маленький.", en_ex: "The cat is very small.", ru_ex: "Кот очень маленький." },
            { t: "Adjectives", no: "bon", uk: "добрий", en: "good", ru: "хороший", ex_no: "C'est une bonne idée.", ex_uk: "Це добра ідея.", en_ex: "This is a good idea.", ru_ex: "Это хорошая идея." },
            { t: "Adjectives", no: "mauvais", uk: "поганий", en: "bad", ru: "плохой", ex_no: "Le temps est mauvais aujourd'hui.", ex_uk: "Сьогодні погана погода.", en_ex: "The weather is bad today.", ru_ex: "Сегодня плохая погода." },
            { t: "Adjectives", no: "nouveau", uk: "новий", en: "new", ru: "новый", ex_no: "J'ai acheté un nouveau téléphone.", ex_uk: "Я купив новий телефон.", en_ex: "I bought a new phone.", ru_ex: "Я купил новый телефон." },
            { t: "Adjectives", no: "vieux", uk: "старий", en: "old", ru: "старый", ex_no: "Ce livre est très vieux.", ex_uk: "Ця книга дуже стара.", en_ex: "This book is very old.", ru_ex: "Эта книга очень старая." },
            // Body
            { t: "Body", no: "la tête", uk: "голова", en: "head", ru: "голова", ex_no: "J'ai mal à la tête.", ex_uk: "У мене болить голова.", en_ex: "My head hurts.", ru_ex: "У меня болит голова." },
            { t: "Body", no: "la main", uk: "рука", en: "hand", ru: "рука", ex_no: "Donne-moi ta main.", ex_uk: "Дай мені руку.", en_ex: "Give me your hand.", ru_ex: "Дай мне руку." },
            { t: "Body", no: "l'œil", uk: "око", en: "eye", ru: "глаз", ex_no: "Elle a les yeux bleus.", ex_uk: "У неї блакитні очі.", en_ex: "She has blue eyes.", ru_ex: "У неё голубые глаза." },
            { t: "Body", no: "l'oreille", uk: "вухо", en: "ear", ru: "ухо", ex_no: "J'ai une infection à l'oreille.", ex_uk: "У мене інфекція вуха.", en_ex: "I have an ear infection.", ru_ex: "У меня инфекция уха." },
            { t: "Body", no: "le nez", uk: "ніс", en: "nose", ru: "нос", ex_no: "Son nez est rouge.", ex_uk: "Її ніс червоний.", en_ex: "Her nose is red.", ru_ex: "У неё красный нос." },
            // Home
            { t: "Home", no: "la maison", uk: "будинок", en: "house", ru: "дом", ex_no: "Nous vivons dans une petite maison.", ex_uk: "Ми живемо в маленькому будинку.", en_ex: "We live in a small house.", ru_ex: "Мы живём в маленьком доме." },
            { t: "Home", no: "la chambre", uk: "кімната", en: "room", ru: "комната", ex_no: "Ma chambre est à l'étage.", ex_uk: "Моя кімната нагорі.", en_ex: "My room is upstairs.", ru_ex: "Моя комната наверху." },
            { t: "Home", no: "la porte", uk: "двері", en: "door", ru: "дверь", ex_no: "Ferme la porte, s'il te plaît.", ex_uk: "Будь ласка, зачини двері.", en_ex: "Please close the door.", ru_ex: "Пожалуйста, закрой дверь." },
            { t: "Home", no: "la table", uk: "стіл", en: "table", ru: "стол", ex_no: "Le livre est sur la table.", ex_uk: "Книга на столі.", en_ex: "The book is on the table.", ru_ex: "Книга на столе." },
            { t: "Home", no: "la chaise", uk: "стілець", en: "chair", ru: "стул", ex_no: "Assieds-toi sur la chaise.", ex_uk: "Сідай на стілець.", en_ex: "Sit on the chair.", ru_ex: "Садись на стул." },
            // Transport
            { t: "Transport", no: "la voiture", uk: "машина", en: "car", ru: "машина", ex_no: "Nous allons au travail en voiture.", ex_uk: "Ми їздимо на роботу машиною.", en_ex: "We drive to work by car.", ru_ex: "Мы ездим на работу на машине." },
            { t: "Transport", no: "le bus", uk: "автобус", en: "bus", ru: "автобус", ex_no: "Je prends le bus pour aller à l'école.", ex_uk: "Я їду автобусом до школи.", en_ex: "I take the bus to school.", ru_ex: "Я еду автобусом в школу." },
            { t: "Transport", no: "le train", uk: "поїзд", en: "train", ru: "поезд", ex_no: "Le train part à huit heures.", ex_uk: "Поїзд відправляється о восьмій.", en_ex: "The train leaves at eight.", ru_ex: "Поезд отправляется в восемь." },
            { t: "Transport", no: "le vélo", uk: "велосипед", en: "bicycle", ru: "велосипед", ex_no: "Je vais au travail à vélo.", ex_uk: "Я їду на велосипеді на роботу.", en_ex: "I ride my bicycle to work.", ru_ex: "Я еду на велосипеде на работу." },
        ],
        // -------------------- A2 --------------------
        A2: [
            // Shopping
            { t: "Shopping", no: "le magasin", uk: "магазин", en: "shop", ru: "магазин", ex_no: "Le magasin ouvre à neuf heures.", ex_uk: "Магазин відкривається о дев'ятій.", en_ex: "The shop opens at nine.", ru_ex: "Магазин открывается в девять." },
            { t: "Shopping", no: "acheter", uk: "купувати", en: "buy", ru: "покупать", ex_no: "J'achète du pain frais tous les jours.", ex_uk: "Я купую свіжий хліб щодня.", en_ex: "I buy fresh bread every day.", ru_ex: "Я покупаю свежий хлеб каждый день." },
            { t: "Shopping", no: "le prix", uk: "ціна", en: "price", ru: "цена", ex_no: "Quel est le prix de ceci?", ex_uk: "Яка ціна на це?", en_ex: "What is the price of this?", ru_ex: "Какая цена на это?" },
            { t: "Shopping", no: "l'argent", uk: "гроші", en: "money", ru: "деньги", ex_no: "Je n'ai pas assez d'argent.", ex_uk: "У мене недостатньо грошей.", en_ex: "I don't have enough money.", ru_ex: "У меня недостаточно денег." },
            // Directions
            { t: "Directions", no: "à gauche", uk: "ліворуч", en: "left", ru: "налево", ex_no: "Tourne à gauche au coin.", ex_uk: "Поверни ліворуч на розі.", en_ex: "Turn left at the corner.", ru_ex: "Поверни налево на углу." },
            { t: "Directions", no: "à droite", uk: "праворуч", en: "right", ru: "направо", ex_no: "La gare est à votre droite.", ex_uk: "Вокзал праворуч від вас.", en_ex: "The station is on your right.", ru_ex: "Вокзал справа от вас." },
            { t: "Directions", no: "tout droit", uk: "прямо", en: "straight", ru: "прямо", ex_no: "Allez tout droit.", ex_uk: "Ідіть прямо.", en_ex: "Go straight ahead.", ru_ex: "Идите прямо." },
            { t: "Directions", no: "la carte", uk: "карта", en: "map", ru: "карта", ex_no: "Peux-tu me montrer sur la carte?", ex_uk: "Можеш показати мені на карті?", en_ex: "Can you show me on the map?", ru_ex: "Можешь показать мне на карте?" },
            // Work
            { t: "Work", no: "le travail", uk: "робота", en: "job", ru: "работа", ex_no: "Elle a trouvé un nouveau travail.", ex_uk: "Вона знайшла нову роботу.", en_ex: "She found a new job.", ru_ex: "Она нашла новую работу." },
            { t: "Work", no: "le bureau", uk: "офіс", en: "office", ru: "офис", ex_no: "Je travaille dans un bureau.", ex_uk: "Я працюю в офісі.", en_ex: "I work in an office.", ru_ex: "Я работаю в офисе." },
            { t: "Work", no: "la réunion", uk: "зустріч", en: "meeting", ru: "встреча", ex_no: "Nous avons une réunion à dix heures.", ex_uk: "У нас зустріч о десятій.", en_ex: "We have a meeting at ten.", ru_ex: "У нас встреча в десять." },
            { t: "Work", no: "le salaire", uk: "зарплата", en: "salary", ru: "зарплата", ex_no: "Mon salaire est bon.", ex_uk: "Моя зарплата хороша.", en_ex: "My salary is good.", ru_ex: "Моя зарплата хорошая." },
            // Hobbies
            { t: "Hobbies", no: "le hobby", uk: "хобі", en: "hobby", ru: "хобби", ex_no: "Quel est ton hobby?", ex_uk: "Яке твоє хобі?", en_ex: "What is your hobby?", ru_ex: "Какое у тебя хобби?" },
            { t: "Hobbies", no: "lire", uk: "читати", en: "read", ru: "читать", ex_no: "J'aime lire des livres.", ex_uk: "Я люблю читати книги.", en_ex: "I like to read books.", ru_ex: "Я люблю читать книги." },
            { t: "Hobbies", no: "voyager", uk: "подорожувати", en: "travel", ru: "путешествовать", ex_no: "Nous aimons voyager.", ex_uk: "Ми любимо подорожувати.", en_ex: "We love to travel.", ru_ex: "Мы любим путешествовать." },
            { t: "Hobbies", no: "la musique", uk: "музика", en: "music", ru: "музыка", ex_no: "J'écoute de la musique tous les jours.", ex_uk: "Я слухаю музику щодня.", en_ex: "I listen to music every day.", ru_ex: "Я слушаю музыку каждый день." },
            // Weather
            { t: "Weather", no: "la pluie", uk: "дощ", en: "rain", ru: "дождь", ex_no: "Il va pleuvoir demain.", ex_uk: "Завтра буде дощ.", en_ex: "It's going to rain tomorrow.", ru_ex: "Завтра будет дождь." },
            { t: "Weather", no: "la neige", uk: "сніг", en: "snow", ru: "снег", ex_no: "Il neige en hiver.", ex_uk: "Взимку йде сніг.", en_ex: "It snows in winter.", ru_ex: "Зимой идёт снег." },
            { t: "Weather", no: "ensoleillé", uk: "сонячно", en: "sunny", ru: "солнечно", ex_no: "Il fait ensoleillé aujourd'hui.", ex_uk: "Сьогодні сонячно.", en_ex: "It's sunny today.", ru_ex: "Сегодня солнечно." },
            { t: "Weather", no: "froid", uk: "холодно", en: "cold", ru: "холодно", ex_no: "Il fait froid dehors.", ex_uk: "На вулиці холодно.", en_ex: "It's cold outside.", ru_ex: "На улице холодно." },
            { t: "Weather", no: "chaud", uk: "спекотно", en: "hot", ru: "жарко", ex_no: "Il fait très chaud en été.", ex_uk: "Влітку дуже спекотно.", en_ex: "It's very hot in summer.", ru_ex: "Летом очень жарко." },
            // Education
            { t: "Education", no: "l'école", uk: "школа", en: "school", ru: "школа", ex_no: "Les enfants vont à l'école.", ex_uk: "Діти ходять до школи.", en_ex: "The children go to school.", ru_ex: "Дети ходят в школу." },
            { t: "Education", no: "le professeur", uk: "вчитель", en: "teacher", ru: "учитель", ex_no: "Le professeur explique la grammaire.", ex_uk: "Вчитель пояснює граматику.", en_ex: "The teacher explains grammar.", ru_ex: "Учитель объясняет грамматику." },
            { t: "Education", no: "l'étudiant", uk: "студент", en: "student", ru: "студент", ex_no: "Elle est étudiante à l'université.", ex_uk: "Вона студентка університету.", en_ex: "She is a student at university.", ru_ex: "Она студентка университета." },
            { t: "Education", no: "l'examen", uk: "іспит", en: "exam", ru: "экзамен", ex_no: "J'ai réussi l'examen.", ex_uk: "Я склав іспит.", en_ex: "I passed the exam.", ru_ex: "Я сдал экзамен." },
            // Restaurant
            { t: "Restaurant", no: "le menu", uk: "меню", en: "menu", ru: "меню", ex_no: "Puis-je avoir le menu?", ex_uk: "Можна меню?", en_ex: "Can I have the menu?", ru_ex: "Можно меню?" },
            { t: "Restaurant", no: "l'addition", uk: "рахунок", en: "bill", ru: "счёт", ex_no: "Pouvons-nous avoir l'addition?", ex_uk: "Можна нам рахунок?", en_ex: "Can we have the bill?", ru_ex: "Можно нам счёт?" },
            { t: "Restaurant", no: "le serveur", uk: "офіціант", en: "waiter", ru: "официант", ex_no: "Le serveur est sympathique.", ex_uk: "Офіціант привітний.", en_ex: "The waiter is friendly.", ru_ex: "Официант приветливый." },
            { t: "Restaurant", no: "commander", uk: "замовляти", en: "order", ru: "заказывать", ex_no: "Nous commandons une pizza le vendredi.", ex_uk: "Ми замовляємо піцу в п'ятницю.", en_ex: "We order pizza on Friday.", ru_ex: "Мы заказываем пиццу в пятницу." },
            // Emotions
            { t: "Emotions", no: "heureux", uk: "щасливий", en: "happy", ru: "счастливый", ex_no: "Elle se sent heureuse aujourd'hui.", ex_uk: "Вона сьогодні щаслива.", en_ex: "She feels happy today.", ru_ex: "Она сегодня счастлива." },
            { t: "Emotions", no: "triste", uk: "сумний", en: "sad", ru: "грустный", ex_no: "Le film triste m'a fait pleurer.", ex_uk: "Сумний фільм змусив мене плакати.", en_ex: "The sad movie made me cry.", ru_ex: "Грустный фильм заставил меня плакать." },
            { t: "Emotions", no: "fâché", uk: "злий", en: "angry", ru: "злой", ex_no: "Il se fâche quand il est en retard.", ex_uk: "Він злиться, коли запізнюється.", en_ex: "He gets angry when he is late.", ru_ex: "Он злится, когда опаздывает." },
            { t: "Emotions", no: "fatigué", uk: "втомлений", en: "tired", ru: "уставший", ex_no: "Je me sens fatigué après le travail.", ex_uk: "Я почуваюся втомленим після роботи.", en_ex: "I feel tired after work.", ru_ex: "Я чувствую себя уставшим после работы." },
            // Past tense
            { t: "Past tense", no: "j'ai marché", uk: "я пішов", en: "I walked", ru: "я пошёл", ex_no: "J'ai marché jusqu'à la gare.", ex_uk: "Я пішов на вокзал пішки.", en_ex: "I walked to the station.", ru_ex: "Я пошёл на вокзал пешком." },
            { t: "Past tense", no: "j'ai visité", uk: "я відвідав", en: "I visited", ru: "я посетил", ex_no: "Nous avons visité Paris l'année dernière.", ex_uk: "Ми відвідали Париж минулого року.", en_ex: "We visited Paris last year.", ru_ex: "Мы посетили Париж в прошлом году." },
            { t: "Past tense", no: "je suis resté", uk: "я зупинився", en: "I stayed", ru: "я остановился", ex_no: "Nous sommes restés dans un bon hôtel.", ex_uk: "Ми зупинилися в хорошому готелі.", en_ex: "We stayed at a nice hotel.", ru_ex: "Мы остановились в хорошем отеле." },
            { t: "Past tense", no: "j'ai regardé", uk: "я дивився", en: "I watched", ru: "я смотрел", ex_no: "J'ai regardé la télévision hier soir.", ex_uk: "Я дивився телевізор учора ввечері.", en_ex: "I watched TV last night.", ru_ex: "Я смотрел телевизор вчера вечером." },
            // Health
            { t: "Health", no: "le médecin", uk: "лікар", en: "doctor", ru: "врач", ex_no: "Je dois voir un médecin.", ex_uk: "Мені потрібно піти до лікаря.", en_ex: "I need to see a doctor.", ru_ex: "Мне нужно пойти к врачу." },
            { t: "Health", no: "le médicament", uk: "ліки", en: "medicine", ru: "лекарство", ex_no: "Prends ce médicament trois fois par jour.", ex_uk: "Приймай ці ліки тричі на день.", en_ex: "Take this medicine three times a day.", ru_ex: "Принимай это лекарство три раза в день." },
            { t: "Health", no: "la fièvre", uk: "температура", en: "fever", ru: "температура", ex_no: "Il a de la fièvre.", ex_uk: "У нього температура.", en_ex: "He has a fever.", ru_ex: "У него температура." },
        ],
        // -------------------- B1 --------------------
        B1: [
            // Travel
            { t: "Travel", no: "l'aéroport", uk: "аеропорт", en: "airport", ru: "аэропорт", ex_no: "Nous nous retrouvons à l'aéroport.", ex_uk: "Зустрінемось в аеропорту.", en_ex: "We meet at the airport.", ru_ex: "Встретимся в аэропорту." },
            { t: "Travel", no: "le billet", uk: "квиток", en: "ticket", ru: "билет", ex_no: "J'ai réservé un billet en ligne.", ex_uk: "Я забронював квиток онлайн.", en_ex: "I booked a ticket online.", ru_ex: "Я забронировал билет онлайн." },
            { t: "Travel", no: "l'hôtel", uk: "готель", en: "hotel", ru: "отель", ex_no: "L'hôtel est près du centre.", ex_uk: "Готель біля центру.", en_ex: "The hotel is near the center.", ru_ex: "Отель рядом с центром." },
            { t: "Travel", no: "le passeport", uk: "паспорт", en: "passport", ru: "паспорт", ex_no: "N'oublie pas ton passeport.", ex_uk: "Не забудь паспорт.", en_ex: "Don't forget your passport.", ru_ex: "Не забудь паспорт." },
            { t: "Travel", no: "les bagages", uk: "багаж", en: "luggage", ru: "багаж", ex_no: "Mes bagages sont lourds.", ex_uk: "Мій багаж важкий.", en_ex: "My luggage is heavy.", ru_ex: "Мой багаж тяжёлый." },
            { t: "Travel", no: "le retard", uk: "затримка", en: "delay", ru: "задержка", ex_no: "Il y a eu un retard à cause du mauvais temps.", ex_uk: "Через негоду сталася затримка.", en_ex: "There was a delay due to bad weather.", ru_ex: "Из-за непогоды произошла задержка." },
            { t: "Travel", no: "la destination", uk: "пункт призначення", en: "destination", ru: "назначение", ex_no: "Notre destination est Paris.", ex_uk: "Наш пункт призначення — Париж.", en_ex: "Our destination is Paris.", ru_ex: "Наш пункт назначения — Париж." },
            { t: "Travel", no: "le touriste", uk: "турист", en: "tourist", ru: "турист", ex_no: "Les touristes visitent le musée.", ex_uk: "Туристи відвідують музей.", en_ex: "Tourists visit the museum.", ru_ex: "Туристы посещают музей." },
            // Health
            { t: "Health", no: "l'hôpital", uk: "лікарня", en: "hospital", ru: "больница", ex_no: "Il a été transporté à l'hôpital.", ex_uk: "Його відвезли до лікарні.", en_ex: "He was taken to the hospital.", ru_ex: "Его отвезли в больницу." },
            { t: "Health", no: "l'ordonnance", uk: "рецепт", en: "prescription", ru: "рецепт", ex_no: "J'ai besoin d'une ordonnance pour ce médicament.", ex_uk: "Мені потрібен рецепт на ці ліки.", en_ex: "I need a prescription for this medicine.", ru_ex: "Мне нужен рецепт на это лекарство." },
            { t: "Health", no: "l'assurance", uk: "страхування", en: "insurance", ru: "страховка", ex_no: "Il est sage d'avoir une assurance voyage.", ex_uk: "Розумно мати туристичну страховку.", en_ex: "It's wise to have travel insurance.", ru_ex: "Разумно иметь туристическую страховку." },
            { t: "Health", no: "le vaccin", uk: "вакцина", en: "vaccine", ru: "вакцина", ex_no: "Les enfants reçoivent ce vaccin gratuitement.", ex_uk: "Діти отримують цю вакцину безкоштовно.", en_ex: "Children get this vaccine for free.", ru_ex: "Дети получают эту вакцину бесплатно." },
            // Relationships
            { t: "Relationships", no: "l'ami", uk: "друг", en: "friend", ru: "друг", ex_no: "Il est mon meilleur ami.", ex_uk: "Він мій найкращий друг.", en_ex: "He is my best friend.", ru_ex: "Он мой лучший друг." },
            { t: "Relationships", no: "le partenaire", uk: "партнер", en: "partner", ru: "партнёр", ex_no: "J'ai présenté mon partenaire à ma famille.", ex_uk: "Я познайомив свого партнера з родиною.", en_ex: "I introduced my partner to my family.", ru_ex: "Я познакомил своего партнёра с семьёй." },
            { t: "Relationships", no: "le mariage", uk: "шлюб", en: "marriage", ru: "брак", ex_no: "Ils ont célébré dix ans de mariage.", ex_uk: "Вони відсвяткували десять років шлюбу.", en_ex: "They celebrated ten years of marriage.", ru_ex: "Они отпраздновали десять лет брака." },
            { t: "Relationships", no: "la confiance", uk: "довіра", en: "trust", ru: "доверие", ex_no: "La confiance est importante dans une relation.", ex_uk: "Довіра важлива у стосунках.", en_ex: "Trust is important in a relationship.", ru_ex: "Доверие важно в отношениях." },
            // Media
            { t: "Media", no: "les nouvelles", uk: "новини", en: "news", ru: "новости", ex_no: "Je regarde les nouvelles tous les soirs.", ex_uk: "Я дивлюся новини щовечора.", en_ex: "I watch the news every evening.", ru_ex: "Я смотрю новости каждый вечер." },
            { t: "Media", no: "le journal", uk: "газета", en: "newspaper", ru: "газета", ex_no: "Il lit le journal le matin.", ex_uk: "Він читає газету вранці.", en_ex: "He reads the newspaper in the morning.", ru_ex: "Он читает газету утром." },
            { t: "Media", no: "les réseaux sociaux", uk: "соціальні мережі", en: "social media", ru: "социальные сети", ex_no: "Les jeunes passent du temps sur les réseaux sociaux.", ex_uk: "Молодь проводить час у соціальних мережах.", en_ex: "Young people spend time on social media.", ru_ex: "Молодёжь проводит время в социальных сетях." },
            { t: "Media", no: "le podcast", uk: "подкаст", en: "podcast", ru: "подкаст", ex_no: "J'écoute des podcasts en faisant du sport.", ex_uk: "Я слухаю подкасти під час тренування.", en_ex: "I listen to podcasts while exercising.", ru_ex: "Я слушаю подкасты во время тренировки." },
            // Environment
            { t: "Environment", no: "l'environnement", uk: "довкілля", en: "environment", ru: "окружающая среда", ex_no: "Nous devons protéger l'environnement.", ex_uk: "Ми повинні захищати довкілля.", en_ex: "We must protect the environment.", ru_ex: "Мы должны защищать окружающую среду." },
            { t: "Environment", no: "le climat", uk: "клімат", en: "climate", ru: "климат", ex_no: "Le changement climatique est un problème mondial.", ex_uk: "Зміна клімату — глобальна проблема.", en_ex: "Climate change is a global problem.", ru_ex: "Изменение климата — глобальная проблема." },
            { t: "Environment", no: "la pollution", uk: "забруднення", en: "pollution", ru: "загрязнение", ex_no: "La pollution nuit à la faune.", ex_uk: "Забруднення шкодить дикій природі.", en_ex: "Pollution harms wildlife.", ru_ex: "Загрязнение вредит дикой природе." },
            { t: "Environment", no: "le recyclage", uk: "переробка", en: "recycling", ru: "переработка", ex_no: "Le recyclage est important.", ex_uk: "Переробка важлива.", en_ex: "Recycling is important.", ru_ex: "Переработка важна." },
            { t: "Environment", no: "les déchets", uk: "відходи", en: "waste", ru: "отходы", ex_no: "Nous trions les déchets par catégories.", ex_uk: "Ми сортуємо сміття за категоріями.", en_ex: "We sort waste into categories.", ru_ex: "Мы сортируем отходы по категориям." },
            // Verbs
            { t: "Verbs", no: "comprendre", uk: "розуміти", en: "understand", ru: "понимать", ex_no: "Je ne comprends pas ce que tu veux dire.", ex_uk: "Я не розумію, що ти маєш на увазі.", en_ex: "I don't understand what you mean.", ru_ex: "Я не понимаю, что ты имеешь в виду." },
            { t: "Verbs", no: "expliquer", uk: "пояснювати", en: "explain", ru: "объяснять", ex_no: "Peux-tu expliquer la règle encore une fois?", ex_uk: "Можеш пояснити правило ще раз?", en_ex: "Can you explain the rule again?", ru_ex: "Можешь объяснить правило ещё раз?" },
            { t: "Verbs", no: "croire", uk: "вірити", en: "believe", ru: "верить", ex_no: "Je crois qu'elle a raison.", ex_uk: "Я вірю, що вона має рацію.", en_ex: "I believe she is right.", ru_ex: "Я верю, что она права." },
            { t: "Verbs", no: "essayer", uk: "пробувати", en: "try", ru: "пытаться", ex_no: "J'essaie d'apprendre le français.", ex_uk: "Я намагаюся вивчити французьку.", en_ex: "I'm trying to learn French.", ru_ex: "Я пытаюсь выучить французский." },
            { t: "Verbs", no: "décider", uk: "вирішувати", en: "decide", ru: "решать", ex_no: "J'ai décidé de déménager à Paris.", ex_uk: "Я вирішив переїхати до Парижа.", en_ex: "I decided to move to Paris.", ru_ex: "Я решил переехать в Париж." },
            { t: "Verbs", no: "éviter", uk: "уникати", en: "avoid", ru: "избегать", ex_no: "Nous devons éviter les risques.", ex_uk: "Нам слід уникати ризиків.", en_ex: "We should avoid risks.", ru_ex: "Нам следует избегать рисков." },
            // Career
            { t: "Career", no: "la carrière", uk: "кар'єра", en: "career", ru: "карьера", ex_no: "Elle a une carrière réussie.", ex_uk: "Вона має успішну кар'єру.", en_ex: "She has a successful career.", ru_ex: "У неё успешная карьера." },
            { t: "Career", no: "l'entretien", uk: "співбесіда", en: "interview", ru: "собеседование", ex_no: "L'entretien s'est bien passé.", ex_uk: "Співбесіда пройшла добре.", en_ex: "The interview went well.", ru_ex: "Собеседование прошло хорошо." },
            { t: "Career", no: "le collègue", uk: "колега", en: "colleague", ru: "коллега", ex_no: "Mes collègues sont sympathiques.", ex_uk: "Мої колеги привітні.", en_ex: "My colleagues are friendly.", ru_ex: "Мои коллеги приветливы." },
            { t: "Career", no: "la candidature", uk: "заявка", en: "application", ru: "заявка", ex_no: "J'ai envoyé ma candidature hier.", ex_uk: "Я подав заявку вчора.", en_ex: "I submitted my application yesterday.", ru_ex: "Я подал заявку вчера." },
        ],
        // -------------------- B2 --------------------
        B2: [
            // Politics
            { t: "Politics", no: "le gouvernement", uk: "уряд", en: "government", ru: "правительство", ex_no: "Le gouvernement a présenté un nouveau budget.", ex_uk: "Уряд представив новий бюджет.", en_ex: "The government presented a new budget.", ru_ex: "Правительство представило новый бюджет." },
            { t: "Politics", no: "les élections", uk: "вибори", en: "election", ru: "выборы", ex_no: "Les élections ont lieu le mois prochain.", ex_uk: "Вибори відбудуться наступного місяця.", en_ex: "The election is next month.", ru_ex: "Выборы состоятся в следующем месяце." },
            { t: "Politics", no: "la démocratie", uk: "демократія", en: "democracy", ru: "демократия", ex_no: "La liberté d'expression est un pilier de la démocratie.", ex_uk: "Свобода слова — основа демократії.", en_ex: "Freedom of speech is a cornerstone of democracy.", ru_ex: "Свобода слова — основа демократии." },
            { t: "Politics", no: "l'opposition", uk: "опозиція", en: "opposition", ru: "оппозиция", ex_no: "L'opposition a critiqué la proposition.", ex_uk: "Опозиція розкритикувала пропозицію.", en_ex: "The opposition criticized the proposal.", ru_ex: "Оппозиция раскритиковала предложение." },
            // Economy
            { t: "Economy", no: "l'économie", uk: "економіка", en: "economy", ru: "экономика", ex_no: "L'économie croît lentement.", ex_uk: "Економіка зростає повільно.", en_ex: "The economy is growing slowly.", ru_ex: "Экономика растёт медленно." },
            { t: "Economy", no: "le marché", uk: "ринок", en: "market", ru: "рынок", ex_no: "Le marché a réagi à la nouvelle.", ex_uk: "Ринок відреагував на новину.", en_ex: "The market reacted to the news.", ru_ex: "Рынок отреагировал на новость." },
            { t: "Economy", no: "l'inflation", uk: "інфляція", en: "inflation", ru: "инфляция", ex_no: "L'inflation a fortement augmenté.", ex_uk: "Інфляція різко зросла.", en_ex: "Inflation has risen sharply.", ru_ex: "Инфляция резко выросла." },
            { t: "Economy", no: "l'investissement", uk: "інвестиція", en: "investment", ru: "инвестиция", ex_no: "L'investissement à long terme est important.", ex_uk: "Довгострокові інвестиції важливі.", en_ex: "Long-term investment is important.", ru_ex: "Долгосрочные инвестиции важны." },
            // Science
            { t: "Science", no: "la recherche", uk: "дослідження", en: "research", ru: "исследование", ex_no: "De nouvelles recherches montrent des résultats surprenants.", ex_uk: "Нове дослідження показує несподівані результати.", en_ex: "New research shows surprising results.", ru_ex: "Новое исследование показывает неожиданные результаты." },
            { t: "Science", no: "la théorie", uk: "теорія", en: "theory", ru: "теория", ex_no: "La théorie a été confirmée par des expériences.", ex_uk: "Теорію підтвердили експерименти.", en_ex: "The theory was confirmed by experiments.", ru_ex: "Теорию подтвердили эксперименты." },
            { t: "Science", no: "l'expérience", uk: "експеримент", en: "experiment", ru: "эксперимент", ex_no: "Ils ont mené une expérience contrôlée.", ex_uk: "Вони провели контрольований експеримент.", en_ex: "They conducted a controlled experiment.", ru_ex: "Они провели контролируемый эксперимент." },
            { t: "Science", no: "les données", uk: "дані", en: "data", ru: "данные", ex_no: "Les données ont été collectées sur plusieurs mois.", ex_uk: "Дані збирали протягом кількох місяців.", en_ex: "Data was collected over several months.", ru_ex: "Данные собирали в течение нескольких месяцев." },
            // Culture
            { t: "Culture", no: "l'art", uk: "мистецтво", en: "art", ru: "искусство", ex_no: "L'exposition montre l'art moderne.", ex_uk: "Виставка демонструє сучасне мистецтво.", en_ex: "The exhibition shows modern art.", ru_ex: "Выставка демонстрирует современное искусство." },
            { t: "Culture", no: "la littérature", uk: "література", en: "literature", ru: "литература", ex_no: "Elle étudie la littérature française.", ex_uk: "Вона вивчає французьку літературу.", en_ex: "She studies French literature.", ru_ex: "Она изучает французскую литературу." },
            { t: "Culture", no: "l'auteur", uk: "автор", en: "author", ru: "автор", ex_no: "L'auteur a reçu une reconnaissance.", ex_uk: "Автор отримав визнання.", en_ex: "The author received recognition.", ru_ex: "Автор получил признание." },
            // Verbs
            { t: "Verbs", no: "influencer", uk: "впливати", en: "influence", ru: "влиять", ex_no: "Les médias influencent l'opinion publique.", ex_uk: "ЗМІ впливають на громадську думку.", en_ex: "The media influences public opinion.", ru_ex: "СМИ влияют на общественное мнение." },
            { t: "Verbs", no: "évaluer", uk: "оцінювати", en: "assess", ru: "оценивать", ex_no: "Nous devons évaluer la situation.", ex_uk: "Нам потрібно оцінити ситуацію.", en_ex: "We need to assess the situation.", ru_ex: "Нам нужно оценить ситуацию." },
            { t: "Verbs", no: "développer", uk: "розвивати", en: "develop", ru: "развивать", ex_no: "L'entreprise développe de nouveaux produits.", ex_uk: "Компанія розробляє нові продукти.", en_ex: "The company is developing new products.", ru_ex: "Компания разрабатывает новые продукты." },
            { t: "Verbs", no: "présenter", uk: "представляти", en: "present", ru: "представлять", ex_no: "Elle a présenté les résultats au conseil.", ex_uk: "Вона представила результати правлінню.", en_ex: "She presented the results to the board.", ru_ex: "Она представила результаты правлению." },
            { t: "Verbs", no: "analyser", uk: "аналізувати", en: "analyze", ru: "анализировать", ex_no: "Nous devons analyser les données.", ex_uk: "Нам потрібно проаналізувати дані.", en_ex: "We need to analyze the data.", ru_ex: "Нам нужно проанализировать данные." },
            // Business
            { t: "Business", no: "l'entreprise", uk: "підприємство", en: "business", ru: "бизнес", ex_no: "L'entreprise va bien cette année.", ex_uk: "Цього року бізнес іде добре.", en_ex: "Business is going well this year.", ru_ex: "В этом году бизнес идёт хорошо." },
            { t: "Business", no: "la stratégie", uk: "стратегія", en: "strategy", ru: "стратегия", ex_no: "Nous avons besoin d'une nouvelle stratégie.", ex_uk: "Нам потрібна нова стратегія.", en_ex: "We need a new strategy.", ru_ex: "Нам нужна новая стратегия." },
            { t: "Business", no: "la concurrence", uk: "конкуренція", en: "competition", ru: "конкуренция", ex_no: "La concurrence est rude.", ex_uk: "Конкуренція є жорсткою.", en_ex: "Competition is intense.", ru_ex: "Конкуренция жёсткая." },
            // Medicine
            { t: "Medicine", no: "le symptôme", uk: "симптом", en: "symptom", ru: "симптом", ex_no: "La fièvre est un symptôme courant.", ex_uk: "Температура — поширений симптом.", en_ex: "Fever is a common symptom.", ru_ex: "Температура — распространённый симптом." },
            { t: "Medicine", no: "chronique", uk: "хронічний", en: "chronic", ru: "хронический", ex_no: "Il a une maladie chronique.", ex_uk: "Він має хронічну хворобу.", en_ex: "He has a chronic illness.", ru_ex: "У него хроническое заболевание." },
            { t: "Medicine", no: "l'épidémie", uk: "епідемія", en: "epidemic", ru: "эпидемия", ex_no: "L'épidémie s'est propagée rapidement.", ex_uk: "Епідемія швидко поширилася.", en_ex: "The epidemic spread quickly.", ru_ex: "Эпидемия быстро распространилась." },
            { t: "Medicine", no: "la prévention", uk: "профілактика", en: "prevention", ru: "профилактика", ex_no: "La prévention vaut mieux que la guérison.", ex_uk: "Профілактика краща за лікування.", en_ex: "Prevention is better than cure.", ru_ex: "Профилактика лучше лечения." },
        ],
        // -------------------- C1 --------------------
        C1: [
            // Discourse
            { t: "Discourse", no: "cependant", uk: "однак", en: "however", ru: "однако", ex_no: "Les résultats étaient prometteurs; cependant, il reste encore du travail à faire.", ex_uk: "Результати були обнадійливі; однак роботи ще багато.", en_ex: "The results were promising; however, there is still work to do.", ru_ex: "Результаты были обнадёживающими; однако работы ещё много." },
            { t: "Discourse", no: "de plus", uk: "крім того", en: "moreover", ru: "кроме того", ex_no: "Le projet est cher et, de plus, il prend beaucoup de temps.", ex_uk: "Проєкт дорогий, і до того ж забирає багато часу.", en_ex: "The project is expensive, and moreover time-consuming.", ru_ex: "Проект дорогой, и к тому же отнимает много времени." },
            { t: "Discourse", no: "par conséquent", uk: "отже", en: "consequently", ru: "следовательно", ex_no: "La demande a chuté et, par conséquent, les prix ont baissé.", ex_uk: "Попит впав, і ціни, відповідно, знизилися.", en_ex: "Demand fell, and prices consequently dropped.", ru_ex: "Спрос упал, и цены, соответственно, снизились." },
            { t: "Discourse", no: "malgré", uk: "незважаючи на", en: "despite", ru: "несмотря на", ex_no: "Malgré les difficultés, ils ont terminé le projet.", ex_uk: "Незважаючи на труднощі, вони завершили проєкт.", en_ex: "Despite the challenges, they completed the project.", ru_ex: "Несмотря на трудности, они завершили проект." },
            { t: "Discourse", no: "en d'autres termes", uk: "іншими словами", en: "in other words", ru: "другими словами", ex_no: "En d'autres termes, la situation est plus compliquée.", ex_uk: "Іншими словами, ситуація складніша.", en_ex: "In other words, the situation is more complicated.", ru_ex: "Другими словами, ситуация сложнее." },
            // Nuance
            { t: "Nuance", no: "insinuer", uk: "натякати", en: "imply", ru: "намекать", ex_no: "Le rapport insinue que plusieurs facteurs sont en jeu.", ex_uk: "Звіт натякає, що діють кілька факторів.", en_ex: "The report implies that several factors are at play.", ru_ex: "Отчёт намекает, что действуют несколько факторов." },
            { t: "Nuance", no: "souligner", uk: "підкреслювати", en: "emphasize", ru: "подчёркивать", ex_no: "L'orateur a souligné l'importance de la coopération.", ex_uk: "Доповідач підкреслив важливість співпраці.", en_ex: "The speaker emphasized the importance of cooperation.", ru_ex: "Докладчик подчеркнул важность сотрудничества." },
            { t: "Nuance", no: "étayer", uk: "обґрунтовувати", en: "substantiate", ru: "обосновывать", ex_no: "Tu dois étayer ton affirmation par des preuves.", ex_uk: "Тобі потрібно обґрунтувати своє твердження доказами.", en_ex: "You need to substantiate your claim with evidence.", ru_ex: "Тебе нужно обосновать своё утверждение доказательствами." },
            { t: "Nuance", no: "nuancé", uk: "нюансований", en: "nuanced", ru: "нюансированный", ex_no: "Le débat nécessite une approche plus nuancée.", ex_uk: "Дебати потребують більш нюансованого підходу.", en_ex: "The debate requires a more nuanced approach.", ru_ex: "Дебаты требуют более нюансированного подхода." },
            { t: "Nuance", no: "exhaustif", uk: "всеохопний", en: "comprehensive", ru: "всеобъемлющий", ex_no: "Il s'agit d'une étude exhaustive.", ex_uk: "Це всеохопне дослідження.", en_ex: "This is a comprehensive study.", ru_ex: "Это всеобъемлющее исследование." },
            // Academic
            { t: "Academic", no: "l'hypothèse", uk: "гіпотеза", en: "hypothesis", ru: "гипотеза", ex_no: "Les chercheurs ont testé l'hypothèse.", ex_uk: "Науковці перевірили гіпотезу.", en_ex: "The researchers tested the hypothesis.", ru_ex: "Учёные проверили гипотезу." },
            { t: "Academic", no: "la méthodologie", uk: "методологія", en: "methodology", ru: "методология", ex_no: "La méthodologie est clairement décrite.", ex_uk: "Методологія чітко описана.", en_ex: "The methodology is clearly described.", ru_ex: "Методология четко описана." },
            { t: "Academic", no: "la perspective", uk: "перспектива", en: "perspective", ru: "перспектива", ex_no: "D'un point de vue historique, l'événement était significatif.", ex_uk: "З історичної перспективи подія була значущою.", en_ex: "From a historical perspective, the event was significant.", ru_ex: "С исторической точки зрения событие было значимым." },
            { t: "Academic", no: "la critique des sources", uk: "критика джерел", en: "source criticism", ru: "критика источников", ex_no: "Une bonne critique des sources est cruciale.", ex_uk: "Гарна критика джерел є вирішальною.", en_ex: "Good source criticism is crucial.", ru_ex: "Хорошая критика источников имеет решающее значение." },
            // Philosophy
            { t: "Philosophy", no: "l'existence", uk: "існування", en: "existence", ru: "существование", ex_no: "La question de l'existence est éternelle.", ex_uk: "Питання про існування вічне.", en_ex: "The question of existence is eternal.", ru_ex: "Вопрос о существовании вечен." },
            { t: "Philosophy", no: "la conscience", uk: "свідомість", en: "consciousness", ru: "сознание", ex_no: "La conscience est un phénomène complexe.", ex_uk: "Свідомість — складне явище.", en_ex: "Consciousness is a complex phenomenon.", ru_ex: "Сознание — сложное явление." },
            { t: "Philosophy", no: "l'éthique", uk: "етика", en: "ethics", ru: "этика", ex_no: "L'éthique traite de ce qui est bien et mal.", ex_uk: "Етика стосується того, що правильно, а що ні.", en_ex: "Ethics deals with what is right and wrong.", ru_ex: "Этика касается того, что правильно, а что нет." },
            // Linguistics
            { t: "Linguistics", no: "la syntaxe", uk: "синтаксис", en: "syntax", ru: "синтаксис", ex_no: "La syntaxe est l'étude de la structure des phrases.", ex_uk: "Синтаксис — це вивчення структури речень.", en_ex: "Syntax is the study of sentence structure.", ru_ex: "Синтаксис — это изучение структуры предложений." },
            { t: "Linguistics", no: "la sémantique", uk: "семантика", en: "semantics", ru: "семантика", ex_no: "La sémantique traite du sens.", ex_uk: "Семантика займається значенням.", en_ex: "Semantics deals with meaning.", ru_ex: "Семантика занимается значением." },
            // Sociology
            { t: "Sociology", no: "l'inégalité sociale", uk: "соціальна нерівність", en: "social inequality", ru: "социальное неравенство", ex_no: "L'inégalité sociale est un problème majeur.", ex_uk: "Соціальна нерівність — велика проблема.", en_ex: "Social inequality is a major problem.", ru_ex: "Социальное неравенство — большая проблема." },
            { t: "Sociology", no: "l'intégration", uk: "інтеграція", en: "integration", ru: "интеграция", ex_no: "L'intégration des immigrants est importante.", ex_uk: "Інтеграція іммігрантів важлива.", en_ex: "Integration of immigrants is important.", ru_ex: "Интеграция иммигрантов важна." },
            { t: "Sociology", no: "la diversité", uk: "різноманіття", en: "diversity", ru: "разнообразие", ex_no: "La diversité enrichit la société.", ex_uk: "Різноманіття збагачує суспільство.", en_ex: "Diversity enriches society.", ru_ex: "Разнообразие обогащает общество." },
            // Psychology
            { t: "Psychology", no: "la cognition", uk: "когніція", en: "cognition", ru: "когниция", ex_no: "La cognition comprend la pensée et la mémoire.", ex_uk: "Когніція охоплює мислення та пам'ять.", en_ex: "Cognition includes thinking and memory.", ru_ex: "Когниция охватывает мышление и память." },
            { t: "Psychology", no: "l'émotion", uk: "емоція", en: "emotion", ru: "эмоция", ex_no: "Les émotions influencent nos décisions.", ex_uk: "Емоції впливають на наш вибір.", en_ex: "Emotions influence our choices.", ru_ex: "Эмоции влияют на наш выбор." },
            { t: "Psychology", no: "le comportement", uk: "поведінка", en: "behavior", ru: "поведение", ex_no: "Son comportement était inattendu.", ex_uk: "Його поведінка була несподіваною.", en_ex: "His behavior was unexpected.", ru_ex: "Его поведение было неожиданным." },
            { t: "Psychology", no: "la motivation", uk: "мотивація", en: "motivation", ru: "мотивация", ex_no: "La motivation vient de l'intérieur.", ex_uk: "Мотивація походить зсередини.", en_ex: "Motivation comes from within.", ru_ex: "Мотивация исходит изнутри." },
        ],
        // -------------------- C2 --------------------
        C2: [
            // Idioms
            { t: "Idioms", no: "faire d'une pierre deux coups", uk: "убити двох зайців", en: "to kill two birds with one stone", ru: "убить двух зайцев", ex_no: "En travaillant à domicile, je fais d'une pierre deux coups.", ex_uk: "Працюючи з дому, я вбиваю двох зайців.", en_ex: "By working from home I kill two birds with one stone.", ru_ex: "Работая из дома, я убиваю двух зайцев." },
            { t: "Idioms", no: "avaler la pilule", uk: "проковтнути гірку пігулку", en: "to bite the bullet", ru: "проглотить горькую пилюлю", ex_no: "J'ai dû avaler la pilule et admettre que j'avais tort.", ex_uk: "Мені довелося проковтнути гірку пігулку і визнати, що я помилявся.", en_ex: "I had to bite the bullet and admit I was wrong.", ru_ex: "Мне пришлось проглотить горькую пилюлю и признать, что я ошибался." },
            { t: "Idioms", no: "jeter des perles aux pourceaux", uk: "метати бісер перед свинями", en: "to cast pearls before swine", ru: "метать бисер перед свиньями", ex_no: "Lui expliquer cela, c'est jeter des perles aux pourceaux.", ex_uk: "Пояснювати йому це — все одно що метати бісер перед свинями.", en_ex: "Explaining it to him is like casting pearls before swine.", ru_ex: "Объяснять ему это — всё равно что метать бисер перед свиньями." },
            { t: "Idioms", no: "avoir une grande influence", uk: "мати великий вплив", en: "to hold great sway", ru: "иметь большое влияние", ex_no: "Il a une grande influence dans le secteur.", ex_uk: "Він має величезний вплив у галузі.", en_ex: "He holds great sway in the industry.", ru_ex: "Он имеет большое влияние в отрасли." },
            { t: "Idioms", no: "peindre un tableau sombre", uk: "згущувати фарби", en: "to paint a bleak picture", ru: "сгущать краски", ex_no: "Ne peins pas un tableau sombre; tout s'arrangera.", ex_uk: "Не згущуй фарби; все владнається.", en_ex: "Don't paint a bleak picture; it'll work out.", ru_ex: "Не сгущай краски; всё уладится." },
            { t: "Idioms", no: "jeter l'éponge", uk: "здатися", en: "to throw in the towel", ru: "сдаться", ex_no: "Après plusieurs défaites, il a jeté l'éponge.", ex_uk: "Після кількох поразок він здався.", en_ex: "After several defeats, he threw in the towel.", ru_ex: "После нескольких поражений он сдался." },
            // Stylistics
            { t: "Stylistics", no: "la fiction", uk: "художня література", en: "fiction", ru: "художественная литература", ex_no: "Elle préfère la fiction à la non-fiction.", ex_uk: "Вона надає перевагу художній літературі перед науковою.", en_ex: "She prefers fiction to non-fiction.", ru_ex: "Она предпочитает художественную литературу научной." },
            { t: "Stylistics", no: "la satire", uk: "сатира", en: "satire", ru: "сатира", ex_no: "L'émission utilise la satire pour commenter la politique.", ex_uk: "Шоу використовує сатиру для коментування політики.", en_ex: "The show uses satire to comment on politics.", ru_ex: "Шоу использует сатиру для комментирования политики." },
            { t: "Stylistics", no: "l'ironie", uk: "іронія", en: "irony", ru: "ирония", ex_no: "Son commentaire était ironique.", ex_uk: "Його коментар був іронією.", en_ex: "His comment was ironic.", ru_ex: "Его комментарий был иронией." },
            // Rare vocabulary
            { t: "Rare vocabulary", no: "éphémère", uk: "минущий", en: "transient", ru: "преходящий", ex_no: "La gloire peut être éphémère.", ex_uk: "Слава може бути минущою.", en_ex: "Fame can be transient.", ru_ex: "Слава может быть преходящей." },
            { t: "Rare vocabulary", no: "imprévisible", uk: "непередбачуваний", en: "unpredictable", ru: "непредсказуемый", ex_no: "Le temps est imprévisible.", ex_uk: "Погода непередбачувана.", en_ex: "The weather is unpredictable.", ru_ex: "Погода непредсказуема." },
            { t: "Rare vocabulary", no: "inévitable", uk: "неминучий", en: "inevitable", ru: "неизбежный", ex_no: "Le conflit semblait inévitable.", ex_uk: "Конфлікт здавався неминучим.", en_ex: "The conflict seemed inevitable.", ru_ex: "Конфликт казался неизбежным." },
            // Rhetoric
            { t: "Rhetoric", no: "la rhétorique", uk: "риторика", en: "rhetoric", ru: "риторика", ex_no: "La rhétorique est l'art de la persuasion.", ex_uk: "Риторика — це мистецтво переконання.", en_ex: "Rhetoric is the art of persuasion.", ru_ex: "Риторика — это искусство убеждения." },
            { t: "Rhetoric", no: "l'argumentation", uk: "аргументація", en: "argumentation", ru: "аргументация", ex_no: "Son argumentation était solide.", ex_uk: "Його аргументація була вагомою.", en_ex: "His argumentation was solid.", ru_ex: "Его аргументация была убедительной." },
            { t: "Rhetoric", no: "l'appel", uk: "звернення", en: "appeal", ru: "апелляция", ex_no: "L'appel aux émotions était fort.", ex_uk: "Звернення до емоцій було сильним.", en_ex: "The appeal to emotions was strong.", ru_ex: "Обращение к эмоциям было сильным." },
            // Literary
            { t: "Literary", no: "le motif", uk: "мотив", en: "motif", ru: "мотив", ex_no: "L'amour est un motif central dans le livre.", ex_uk: "Кохання — центральний мотив у книзі.", en_ex: "Love is a central motif in the book.", ru_ex: "Любовь — центральный мотив в книге." },
            { t: "Literary", no: "le thème", uk: "тема", en: "theme", ru: "тема", ex_no: "Le thème du roman est la solitude.", ex_uk: "Тема роману — самотність.", en_ex: "The theme of the novel is loneliness.", ru_ex: "Тема романа — одиночество." },
            { t: "Literary", no: "le symbolisme", uk: "символіка", en: "symbolism", ru: "символика", ex_no: "Le poème est riche en symbolisme.", ex_uk: "Вірш багатий на символіку.", en_ex: "The poem is rich in symbolism.", ru_ex: "Стихотворение богато на символику." },
            // Abstract
            { t: "Abstract", no: "le contraste", uk: "контраст", en: "contrast", ru: "контраст", ex_no: "Le contraste entre riches et pauvres est grand.", ex_uk: "Контраст між багатими та бідними великий.", en_ex: "The contrast between rich and poor is stark.", ru_ex: "Контраст между богатыми и бедными велик." },
            { t: "Abstract", no: "exclure", uk: "виключати", en: "exclude", ru: "исключать", ex_no: "Nous ne devons exclure personne.", ex_uk: "Ми не повинні нікого виключати.", en_ex: "We must not exclude anyone.", ru_ex: "Мы не должны никого исключать." },
            { t: "Abstract", no: "inclure", uk: "включати", en: "include", ru: "включать", ex_no: "Tout le monde devrait être inclus.", ex_uk: "Усі повинні бути включені.", en_ex: "Everyone should be included.", ru_ex: "Все должны быть включены." },
            { t: "Abstract", no: "le contexte", uk: "контекст", en: "context", ru: "контекст", ex_no: "Sans contexte, c'est difficile à comprendre.", ex_uk: "Без контексту важко зрозуміти.", en_ex: "Without context, it's hard to understand.", ru_ex: "Без контекста трудно понять." },
            { t: "Abstract", no: "refléter", uk: "відображати", en: "reflect", ru: "отражать", ex_no: "La conversation reflète les changements sociaux.", ex_uk: "Розмова відображає соціальні зміни.", en_ex: "The conversation reflects social changes.", ru_ex: "Разговор отражает социальные изменения." },
            { t: "Abstract", no: "élaborer", uk: "деталізувати", en: "elaborate", ru: "детализировать", ex_no: "Peux-tu élaborer ce point?", ex_uk: "Можеш детальніше розкрити цей пункт?", en_ex: "Can you elaborate on that point?", ru_ex: "Можешь детальнее раскрыть этот пункт?" },
        ],
    };

    // =====================================================================
    //  GRAMMAR – ФРАНЦУЗЬКА ГРАМАТИКА (A1-C2)
    // =====================================================================
    const GRAMMAR = [
        // A1
        {
            id: "fr_gr1", level: "A1",
            title: "Être et avoir (présent)",
            exp: "Les verbes être et avoir sont fondamentaux. Être décrit, avoir exprime la possession.",
            table: { head: ["Pronom", "Être", "Avoir"], rows: [["je", "suis", "ai"], ["tu", "es", "as"], ["il/elle/on", "est", "a"], ["nous", "sommes", "avons"], ["vous", "êtes", "avez"], ["ils/elles", "sont", "ont"]] },
            ex: { q: "Je ___ étudiant.", opts: ["suis", "ai", "est"], a: 0 },
            title_en: "Être and avoir (present tense)",
            title_ru: "Глаголы être и avoir (настоящее время)",
            exp_en: "Être and avoir are fundamental. Être describes, avoir expresses possession.",
            exp_ru: "Глаголы être и avoir являются основными. Être описывает, avoir выражает обладание.",
            head_en: ["Pronoun", "Être", "Avoir"],
            head_ru: ["Местоимение", "Être", "Avoir"],
            q_en: "Je ___ étudiant.",
            q_ru: "Je ___ étudiant.",
        },
        // A2
        {
            id: "fr_gr2", level: "A2",
            title: "Passé composé (avoir/être + participe passé)",
            exp: "Le passé composé se forme avec avoir ou être + participe passé. Être utilisé avec les verbes de mouvement et les verbes pronominaux.",
            table: { head: ["Verbe", "Passé composé"], rows: [["parler", "j'ai parlé"], ["aller", "je suis allé"], ["se lever", "je me suis levé"]] },
            ex: { q: "J'___ (manger) une pomme.", opts: ["ai mangé", "suis mangé", "ai mangé"], a: 0 },
            title_en: "Passé composé (avoir/être + past participle)",
            title_ru: "Passé composé (avoir/être + причастие прошедшего времени)",
            exp_en: "Passé composé is formed with avoir or être + past participle. Être is used with verbs of movement and pronominal verbs.",
            exp_ru: "Passé composé образуется с avoir или être + причастие прошедшего времени. Être используется с глаголами движения и местоименными глаголами.",
            head_en: ["Verb", "Passé composé"],
            head_ru: ["Глагол", "Passé composé"],
            q_en: "J'___ (manger) une pomme.",
            q_ru: "J'___ (manger) une pomme.",
        },
        // B1
        {
            id: "fr_gr3", level: "B1",
            title: "Imparfait",
            exp: "L'imparfait décrit des actions habituelles ou en cours dans le passé. Il se forme avec la base du présent + -ais, -ais, -ait, -ions, -iez, -aient.",
            table: { head: ["Pronom", "Parler"], rows: [["je", "parlais"], ["tu", "parlais"], ["il/elle", "parlait"], ["nous", "parlions"], ["vous", "parliez"], ["ils/elles", "parlaient"]] },
            ex: { q: "Quand j'étais jeune, je ___ (jouer) au football.", opts: ["jouais", "jouais", "jouais"], a: 0 },
            title_en: "Imparfait",
            title_ru: "Imparfait (прошедшее незавершённое время)",
            exp_en: "Imparfait describes habitual or ongoing past actions.",
            exp_ru: "Imparfait описывает привычные или продолжающиеся действия в прошлом.",
            head_en: ["Pronoun", "Parler"],
            head_ru: ["Местоимение", "Parler"],
            q_en: "Quand j'étais jeune, je ___ (jouer) au football.",
            q_ru: "Quand j'étais jeune, je ___ (jouer) au football.",
        },
        // B2
        {
            id: "fr_gr4", level: "B2",
            title: "Subjonctif présent",
            exp: "Le subjonctif est utilisé après des expressions de doute, de désir, d'émotion, ou d'obligation. Il se forme avec la base du présent + -e, -es, -e, -ions, -iez, -ent.",
            table: { head: ["Pronom", "Parler"], rows: [["que je", "parle"], ["que tu", "parles"], ["qu'il/elle", "parle"], ["que nous", "parlions"], ["que vous", "parliez"], ["qu'ils/elles", "parlent"]] },
            ex: { q: "Il faut que tu ___ (venir) à l'heure.", opts: ["viennes", "viens", "venais"], a: 0 },
            title_en: "Subjonctif présent",
            title_ru: "Настоящее сослагательное наклонение",
            exp_en: "Used after expressions of doubt, desire, emotion, or obligation.",
            exp_ru: "Используется после выражений сомнения, желания, эмоции или обязательства.",
            head_en: ["Pronoun", "Parler"],
            head_ru: ["Местоимение", "Parler"],
            q_en: "Il faut que tu ___ (venir) à l'heure.",
            q_ru: "Il faut que tu ___ (venir) à l'heure.",
        },
        // C1
        {
            id: "fr_gr5", level: "C1",
            title: "Subjonctif imparfait",
            exp: "Le subjonctif imparfait est utilisé dans la langue littéraire pour exprimer une action passée non réalisée après une condition ou un souhait.",
            table: { head: ["Pronom", "Parler"], rows: [["que je", "parlasse"], ["que tu", "parlasses"], ["qu'il/elle", "parlât"], ["que nous", "parlassions"], ["que vous", "parlassiez"], ["qu'ils/elles", "parlassent"]] },
            ex: { q: "Il aurait souhaité que je ___ (venir).", opts: ["vinsse", "vienne", "venais"], a: 0 },
            title_en: "Subjonctif imparfait",
            title_ru: "Прошедшее сослагательное наклонение",
            exp_en: "Used in literary language to express an unreal past action.",
            exp_ru: "Используется в литературном языке для выражения нереального действия в прошлом.",
            head_en: ["Pronoun", "Parler"],
            head_ru: ["Местоимение", "Parler"],
            q_en: "Il aurait souhaité que je ___ (venir).",
            q_ru: "Il aurait souhaité que je ___ (venir).",
        },
        // C2
        {
            id: "fr_gr6", level: "C2",
            title: "Conditionnel passé",
            exp: "Le conditionnel passé exprime une action hypothétique dans le passé. Il se forme avec le conditionnel présent de avoir/être + participe passé.",
            table: { head: ["Pronom", "Conditionnel passé"], rows: [["j'", "aurais parlé"], ["tu", "aurais parlé"], ["il/elle", "aurait parlé"]] },
            ex: { q: "Si tu m'avais écouté, tu ___ (réussir).", opts: ["aurais réussi", "réussissais", "réussiras"], a: 0 },
            title_en: "Conditionnel passé",
            title_ru: "Сложное условное наклонение",
            exp_en: "Expresses a hypothetical action in the past.",
            exp_ru: "Выражает гипотетическое действие в прошлом.",
            head_en: ["Pronoun", "Conditionnel passé"],
            head_ru: ["Местоимение", "Сложное условное"],
            q_en: "Si tu m'avais écouté, tu ___ (réussir).",
            q_ru: "Si tu m'avais écouté, tu ___ (réussir).",
        },
    ];

    // =====================================================================
    //  NORSKPROVE_TASKS – ЗАВДАННЯ ДЛЯ ПРАКТИКИ (Аналог Norskprøve)
    // =====================================================================
    const NORSKPROVE_TASKS = {
        A1: {
            reading: [
                {
                    title: "Bonjour!",
                    text: "Bonjour! Je m'appelle Anne. Je viens de Pologne. J'habite à Paris. Je suis étudiante. J'aime la cuisine française.",
                    questions: [
                        { q: "D'où vient Anne?", opts: ["Norvège", "Pologne", "Suède"], a: 1 },
                        { q: "Que fait Anne?", opts: ["Elle est professeure", "Elle est étudiante", "Elle est médecin"], a: 1 },
                        { q: "Où habite Anne?", opts: ["Bergen", "Paris", "Varsovie"], a: 1 },
                    ],
                },
            ],
            listening: [],
            writing: [],
            speaking: [],
        },
        A2: {
            reading: [
                {
                    title: "Une journée au magasin",
                    text: "Hier, je suis allé au magasin. J'ai acheté du pain, du lait et des œufs. Le magasin était plein de monde. J'ai rencontré un ami et nous avons parlé un peu. Puis je suis rentré à la maison.",
                    questions: [
                        { q: "Qu'est-ce que j'ai acheté?", opts: ["Pain, lait, fromage", "Pain, lait, œufs", "Œufs, fromage, beurre"], a: 1 },
                        { q: "Qui ai-je rencontré?", opts: ["Un professeur", "Un ami", "Un médecin"], a: 1 },
                        { q: "Où étais-je?", opts: ["À l'école", "Au magasin", "Au travail"], a: 1 },
                    ],
                },
            ],
            listening: [],
            writing: [],
            speaking: [],
        },
        B1: {
            reading: [
                {
                    title: "Le changement climatique",
                    text: "Le changement climatique est un problème majeur. Les températures augmentent et la glace fond. De nombreux animaux perdent leur habitat. Nous devons réduire la pollution et utiliser des énergies renouvelables.",
                    questions: [
                        { q: "Que se passe-t-il avec la glace?", opts: ["Elle gèle", "Elle fond", "Elle grandit"], a: 1 },
                        { q: "Que pouvons-nous faire?", opts: ["Utiliser plus de pétrole", "Recycler", "Conduire plus"], a: 1 },
                        { q: "Qu'est-ce qui menace les animaux?", opts: ["La perte d'habitat", "La chasse", "La pollution"], a: 0 },
                    ],
                },
            ],
            listening: [],
            writing: [],
            speaking: [],
        },
        B2: {
            reading: [
                {
                    title: "L'avenir du travail",
                    text: "L'automatisation va changer de nombreux métiers. Certains emplois vont disparaître, mais de nouveaux vont apparaître. Les compétences numériques deviendront importantes. Les travailleurs devront être flexibles et apprendre tout au long de leur vie.",
                    questions: [
                        { q: "Qu'arrivera-t-il à certains emplois?", opts: ["Ils vont disparaître", "Ils seront plus sûrs", "Ils seront mieux payés"], a: 0 },
                        { q: "Qu'est-ce qui deviendra important?", opts: ["La force physique", "Les compétences numériques", "Les réseaux sociaux"], a: 1 },
                        { q: "Que peut améliorer la technologie?", opts: ["Le salaire", "L'environnement de travail", "Le temps libre"], a: 1 },
                    ],
                },
            ],
            listening: [],
            writing: [],
            speaking: [],
        },
        C1: {
            reading: [
                {
                    title: "L'éthique de l'IA",
                    text: "L'intelligence artificielle soulève de nouvelles questions éthiques. Qui est responsable quand un algorithme se trompe? L'IA devrait-elle avoir des droits? En même temps, l'IA peut contribuer à la recherche médicale et à la modélisation climatique.",
                    questions: [
                        { q: "Que soulève l'IA?", opts: ["De nouvelles questions éthiques", "Des problèmes techniques", "La croissance économique"], a: 0 },
                        { q: "À quoi peut contribuer l'IA?", opts: ["À la recherche", "À la guerre", "À la surveillance"], a: 0 },
                        { q: "Que devons-nous développer?", opts: ["De nouveaux algorithmes", "Des directives", "Plus de centres de données"], a: 1 },
                    ],
                },
            ],
            listening: [],
            writing: [],
            speaking: [],
        },
        C2: {
            reading: [
                {
                    title: "Philosophie et science",
                    text: "La science repose sur des présupposés philosophiques. La question de ce qui est vrai et comment nous pouvons le savoir est fondamentale. La méthode scientifique nous donne des outils, mais elle n'est pas infaillible. La pensée critique est essentielle.",
                    questions: [
                        { q: "Sur quoi repose la science?", opts: ["Des présupposés philosophiques", "Des dogmes religieux", "Du pouvoir politique"], a: 0 },
                        { q: "Qu'est-ce qui est essentiel?", opts: ["La pensée critique", "Les titres académiques", "La publication"], a: 0 },
                    ],
                },
            ],
            listening: [],
            writing: [],
            speaking: [],
        },
    };

    // =====================================================================
    //  LEVEL_TEST – ТЕСТ НА РІВЕНЬ ФРАНЦУЗЬКОЇ
    // =====================================================================
    const LEVEL_TEST = [
        // A1 (10 questions)
        { lvl: "A1", q: "Bonjour! Comment ___?", opts: ["vas", "suis", "es"], a: 0 },
        { lvl: "A1", q: "Je ___ étudiant.", opts: ["suis", "ai", "est"], a: 0 },
        { lvl: "A1", q: "Elle ___ médecin.", opts: ["est", "suis", "a"], a: 0 },
        { lvl: "A1", q: "Nous ___ de Paris.", opts: ["sommes", "avons", "êtes"], a: 0 },
        { lvl: "A1", q: "Comment ___ tu?", opts: ["t'appelles", "t'appelle", "s'appelle"], a: 0 },
        { lvl: "A1", q: "J'ai ___ pomme.", opts: ["une", "un", "des"], a: 0 },
        { lvl: "A1", q: "C'est ___ chien.", opts: ["un", "une", "le"], a: 0 },
        { lvl: "A1", q: "Nous ___ à l'école tous les jours.", opts: ["allons", "vont", "vas"], a: 0 },
        { lvl: "A1", q: "Elle ___ du café le matin.", opts: ["boit", "bois", "boivent"], a: 0 },
        { lvl: "A1", q: "Je n'aime pas ___ temps.", opts: ["le", "la", "les"], a: 0 },
        // A2 (10 questions)
        { lvl: "A2", q: "Hier, je ___ au cinéma.", opts: ["suis allé", "vais", "allais"], a: 0 },
        { lvl: "A2", q: "Elle ne m'a pas ___.", opts: ["appelé", "appelle", "appelait"], a: 0 },
        { lvl: "A2", q: "___ aimes-tu la glace?", opts: ["Est-ce que", "Qu'est-ce que", "Pourquoi"], a: 0 },
        { lvl: "A2", q: "Nous ___ à Paris la semaine prochaine.", opts: ["allons", "vont", "irons"], a: 0 },
        { lvl: "A2", q: "Il ___ une voiture.", opts: ["a", "ai", "as"], a: 0 },
        { lvl: "A2", q: "Je peux ___ aider.", opts: ["t'", "me", "l'"], a: 0 },
        { lvl: "A2", q: "Elle ___ parler trois langues.", opts: ["peut", "est", "a"], a: 0 },
        { lvl: "A2", q: "Nous ___ dîner à 19 heures.", opts: ["dînons", "dînent", "dîne"], a: 0 },
        { lvl: "A2", q: "Je suis fatigué parce que j'ai ___ tard.", opts: ["travaillé", "travaille", "travaillais"], a: 0 },
        { lvl: "A2", q: "___ vu mes clés?", opts: ["As", "Ai", "A"], a: 0 },
        // B1 (10 questions)
        { lvl: "B1", q: "Je suis ici ___ 2015.", opts: ["depuis", "pour", "en"], a: 0 },
        { lvl: "B1", q: "Elle n'a pas encore fini ses devoirs ___.", opts: ["encore", "déjà", "toujours"], a: 0 },
        { lvl: "B1", q: "Le livre ___ écrit par le professeur.", opts: ["a été", "est", "a"], a: 0 },
        { lvl: "B1", q: "S'il pleut, nous ___ à la maison.", opts: ["restons", "resterons", "restions"], a: 0 },
        { lvl: "B1", q: "Je voudrais que tu ___ plus de temps.", opts: ["aies", "as", "avais"], a: 0 },
        { lvl: "B1", q: "Elle m'a ___ son adresse hier.", opts: ["donnée", "donné", "donner"], a: 0 },
        { lvl: "B1", q: "Ils sont allés au cinéma ___ ils s'ennuyaient.", opts: ["parce que", "bien que", "mais"], a: 0 },
        { lvl: "B1", q: "Il n'aime pas ___ en ville.", opts: ["vivre", "vive", "vit"], a: 0 },
        { lvl: "B1", q: "Je te promets que je ___ plus tard.", opts: ["t'appellerai", "t'appelle", "t'appelais"], a: 0 },
        { lvl: "B1", q: "Le café est ___ chaud pour boire.", opts: ["trop", "assez", "très"], a: 0 },
        // B2 (10 questions)
        { lvl: "B2", q: "___ il avait étudié, il aurait réussi.", opts: ["Si", "Bien que", "Lorsque"], a: 0 },
        { lvl: "B2", q: "Elle m'a demandé ___ j'allais.", opts: ["où", "que", "si"], a: 0 },
        { lvl: "B2", q: "Le film était ___ que prévu.", opts: ["meilleur", "bien", "plus bon"], a: 0 },
        { lvl: "B2", q: "Nous devons discuter ___ résoudre le problème.", opts: ["comment", "ce", "quoi"], a: 0 },
        { lvl: "B2", q: "Il est ___ des deux candidats.", opts: ["le meilleur", "meilleur", "plus bon"], a: 0 },
        { lvl: "B2", q: "Il a nié ___ l'argent.", opts: ["avoir volé", "voler", "volant"], a: 0 },
        { lvl: "B2", q: "L'examen était ___ que je ne le pensais.", opts: ["plus facile", "facile", "aussi facile"], a: 0 },
        { lvl: "B2", q: "Je souhaite que tu ___ plus sur l'art.", opts: ["saches", "sais", "savais"], a: 0 },
        { lvl: "B2", q: "Ils seraient venus s'ils ___ invités.", opts: ["avaient été", "étaient", "ont été"], a: 0 },
        { lvl: "B2", q: "C'est la maison ___ j'ai grandi.", opts: ["où", "que", "dans laquelle"], a: 0 },
        // C1 (10 questions)
        { lvl: "C1", q: "Non seulement ___ à la réunion, mais il a aussi présenté.", opts: ["est-il venu", "il est venu", "vint-il"], a: 0 },
        { lvl: "C1", q: "Je souhaite que tu ___ la réponse.", opts: ["saches", "sais", "savais"], a: 0 },
        { lvl: "C1", q: "Il est essentiel qu'il ___ à l'heure.", opts: ["arrive", "arrive", "arrivât"], a: 0 },
        { lvl: "C1", q: "Le rapport ___ d'ici la fin de la journée.", opts: ["sera terminé", "est terminé", "a été terminé"], a: 0 },
        { lvl: "C1", q: "Si je l'avais su, j'___ autrement.", opts: ["aurais fait", "ferais", "fais"], a: 0 },
        { lvl: "C1", q: "Elle est ___ des deux sœurs.", opts: ["la plus grande", "grande", "la grande"], a: 0 },
        { lvl: "C1", q: "La proposition a été rejetée, ___ nous nous y attendions.", opts: ["comme", "que", "ce qui"], a: 0 },
        { lvl: "C1", q: "Je ne peux m'empêcher de ___ inquiet.", opts: ["être", "suis", "étant"], a: 0 },
        { lvl: "C1", q: "Le cours était ___ long pour les étudiants.", opts: ["trop", "si", "très"], a: 0 },
        { lvl: "C1", q: "Il a tendance ___ être impatient.", opts: ["à", "de", "pour"], a: 0 },
        // C2 (10 questions)
        { lvl: "C2", q: "Si j'étais riche, je ___ le monde.", opts: ["parcourrais", "parcourrai", "aurais parcouru"], a: 0 },
        { lvl: "C2", q: "L'utilisation des métaphores par l'auteur ___ le lecteur.", opts: ["défie", "défient", "défiant"], a: 0 },
        { lvl: "C2", q: "Peu ___ savait ce qui l'attendait.", opts: ["savait", "sut", "a su"], a: 0 },
        { lvl: "C2", q: "Le comité ___ divisé sur la question.", opts: ["est", "sont", "était"], a: 0 },
        { lvl: "C2", q: "Il est impératif que le projet ___ terminé à temps.", opts: ["soit", "est", "fût"], a: 0 },
        { lvl: "C2", q: "Son argument était ___ persuasif.", opts: ["extrêmement", "plus", "très"], a: 0 },
        { lvl: "C2", q: "La recherche, ___ résultats sont révolutionnaires, a pris des années.", opts: ["dont", "que", "desquels"], a: 0 },
        { lvl: "C2", q: "Il parlait avec un air d'___ qui agaçait tout le monde.", opts: ["autorité", "autoritaire", "autocratique"], a: 0 },
        { lvl: "C2", q: "Le scandale a jeté ___ sur la réputation de l'entreprise.", opts: ["le doute", "l'ombre", "la lumière"], a: 1 },
        { lvl: "C2", q: "C'est une ___ critique du gouvernement.", opts: ["farouche", "acerbe", "les deux"], a: 0 },
    ];

    // =====================================================================
    //  РЕЄСТРАЦІЯ ДАНИХ У ГЛОБАЛЬНИЙ ОБ'ЄКТ
    // =====================================================================
    window.LANG_DATA = window.LANG_DATA || {};
    window.LANG_DATA.fr = {
        VOCAB,
        GRAMMAR,
        NORSKPROVE_TASKS,
        LEVEL_TEST,
    };
})();
```