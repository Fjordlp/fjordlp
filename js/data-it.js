// =====================================================================
//  js/data-it.js — італійська, окремий файл (як і норвезька в data.js)
// =====================================================================
// Структура повністю відповідає js/data.js (VOCAB/GRAMMAR/
// NORSKPROVE_TASKS/LEVEL_TEST) — реєструється в window.LANG_DATA.it,
// той самий механізм, що й для англійської (js/data-en.js). Рівень A1 —
// вручну складений словник (~78-80 слів), рівні A2-C2 поки не заповнені
// (для них далі працює AI-генерація, як і для мов без власного файлу).
//
// Поле "no" у VOCAB — історична назва (від "норвезька"), технічно означає
// "слово МОВОЮ ВИВЧЕННЯ" для будь-якої мови.
(function () {

    const VOCAB = {
        A1: [
            { t: "Привітання", no: "ciao", uk: "привіт", en: "hello", ru: "привет", ex_no: "Ciao, come stai?", ex_uk: "Привіт, як справи?", en_ex: "Hello, how are you?", ru_ex: "Привет, как дела?" },
            { t: "Привітання", no: "buongiorno", uk: "добрий ранок", en: "good morning", ru: "доброе утро", ex_no: "Buongiorno, hai dormito bene?", ex_uk: "Добрий ранок, ти добре спав?", en_ex: "Good morning, did you sleep well?", ru_ex: "Доброе утро, ты хорошо спал?" },
            { t: "Привітання", no: "buonasera", uk: "добрий вечір", en: "good evening", ru: "добрый вечер", ex_no: "Buonasera, benvenuto a casa nostra.", ex_uk: "Добрий вечір, ласкаво просимо до нас.", en_ex: "Good evening, welcome to our home.", ru_ex: "Добрый вечер, добро пожаловать к нам." },
            { t: "Привітання", no: "buonanotte", uk: "на добраніч", en: "good night", ru: "спокойной ночи", ex_no: "Buonanotte, dormi bene!", ex_uk: "На добраніч, солодких снів!", en_ex: "Good night, sleep well!", ru_ex: "Спокойной ночи, сладких снов!" },
            { t: "Привітання", no: "arrivederci", uk: "до побачення", en: "goodbye", ru: "до свидания", ex_no: "Arrivederci, ci vediamo domani.", ex_uk: "До побачення, побачимось завтра.", en_ex: "Goodbye, see you tomorrow.", ru_ex: "До свидания, увидимся завтра." },
            { t: "Привітання", no: "grazie", uk: "дякую", en: "thank you", ru: "спасибо", ex_no: "Grazie per il tuo aiuto.", ex_uk: "Дякую за твою допомогу.", en_ex: "Thank you for your help.", ru_ex: "Спасибо за твою помощь." },
            { t: "Привітання", no: "per favore", uk: "будь ласка", en: "please", ru: "пожалуйста", ex_no: "Puoi aiutarmi, per favore?", ex_uk: "Можеш допомогти мені, будь ласка?", en_ex: "Can you help me, please?", ru_ex: "Можешь помочь мне, пожалуйста?" },
            { t: "Привітання", no: "scusa", uk: "вибачте", en: "sorry", ru: "извините", ex_no: "Scusa, dov'è la stazione?", ex_uk: "Вибачте, де вокзал?", en_ex: "Sorry, where is the station?", ru_ex: "Извините, где вокзал?" },
            { t: "Привітання", no: "sì", uk: "так", en: "yes", ru: "да", ex_no: "Sì, è vero.", ex_uk: "Так, це правда.", en_ex: "Yes, that's right.", ru_ex: "Да, это правда." },
            { t: "Привітання", no: "no", uk: "ні", en: "no", ru: "нет", ex_no: "No, non lo so.", ex_uk: "Ні, я не знаю.", en_ex: "No, I don't know.", ru_ex: "Нет, я не знаю." },
            { t: "Привітання", no: "benvenuto", uk: "ласкаво просимо", en: "welcome", ru: "добро пожаловать", ex_no: "Benvenuto a casa nostra!", ex_uk: "Ласкаво просимо до нашого дому!", en_ex: "Welcome to our home!", ru_ex: "Добро пожаловать в наш дом!" },
            { t: "Привітання", no: "come stai", uk: "як справи", en: "how are you", ru: "как дела", ex_no: "Ciao Anna, come stai?", ex_uk: "Привіт, Анно, як справи?", en_ex: "Hi Anna, how are you?", ru_ex: "Привет, Анна, как дела?" },
            { t: "Числа", no: "zero", uk: "нуль", en: "zero", ru: "ноль", ex_no: "Iniziamo da zero.", ex_uk: "Ми починаємо з нуля.", en_ex: "We start from zero.", ru_ex: "Мы начинаем с нуля." },
            { t: "Числа", no: "uno", uk: "один", en: "one", ru: "один", ex_no: "Ho un gatto.", ex_uk: "У мене є один кіт.", en_ex: "I have one cat.", ru_ex: "У меня есть один кот." },
            { t: "Числа", no: "due", uk: "два", en: "two", ru: "два", ex_no: "Sono le due.", ex_uk: "Зараз друга година.", en_ex: "It's two o'clock.", ru_ex: "Сейчас два часа." },
            { t: "Числа", no: "tre", uk: "три", en: "three", ru: "три", ex_no: "Ho tre fratelli.", ex_uk: "У мене три брати.", en_ex: "I have three brothers.", ru_ex: "У меня три брата." },
            { t: "Числа", no: "quattro", uk: "чотири", en: "four", ru: "четыре", ex_no: "Il tavolo ha quattro gambe.", ex_uk: "У стола чотири ноги.", en_ex: "The table has four legs.", ru_ex: "У стола четыре ноги." },
            { t: "Числа", no: "cinque", uk: "п'ять", en: "five", ru: "пять", ex_no: "Finisco di lavorare alle cinque.", ex_uk: "Я закінчую роботу о п'ятій.", en_ex: "I finish work at five.", ru_ex: "Я заканчиваю работу в пять." },
            { t: "Числа", no: "sei", uk: "шість", en: "six", ru: "шесть", ex_no: "Ci svegliamo alle sei.", ex_uk: "Ми прокидаємось о шостій.", en_ex: "We wake up at six.", ru_ex: "Мы просыпаемся в шесть." },
            { t: "Числа", no: "sette", uk: "сім", en: "seven", ru: "семь", ex_no: "Una settimana ha sette giorni.", ex_uk: "У тижні сім днів.", en_ex: "There are seven days in a week.", ru_ex: "В неделе семь дней." },
            { t: "Числа", no: "otto", uk: "вісім", en: "eight", ru: "восемь", ex_no: "Il negozio apre alle otto.", ex_uk: "Магазин відкривається о восьмій.", en_ex: "The shop opens at eight.", ru_ex: "Магазин открывается в восемь." },
            { t: "Числа", no: "nove", uk: "дев'ять", en: "nine", ru: "девять", ex_no: "La scuola inizia alle nove.", ex_uk: "Школа починається о дев'ятій.", en_ex: "School starts at nine.", ru_ex: "Школа начинается в девять." },
            { t: "Числа", no: "dieci", uk: "десять", en: "ten", ru: "десять", ex_no: "Conto fino a dieci.", ex_uk: "Я рахую до десяти.", en_ex: "I count to ten.", ru_ex: "Я считаю до десяти." },
            { t: "Числа", no: "venti", uk: "двадцять", en: "twenty", ru: "двадцать", ex_no: "Lei ha vent'anni.", ex_uk: "Їй двадцять років.", en_ex: "She is twenty years old.", ru_ex: "Ей двадцать лет." },
            { t: "Числа", no: "cento", uk: "сто", en: "hundred", ru: "сто", ex_no: "Ci sono cento persone qui.", ex_uk: "Тут сто людей.", en_ex: "There are a hundred people here.", ru_ex: "Здесь сто человек." },
            { t: "Родина", no: "la famiglia", uk: "родина", en: "family", ru: "семья", ex_no: "Amo la mia famiglia.", ex_uk: "Я люблю свою родину.", en_ex: "I love my family.", ru_ex: "Я люблю свою семью." },
            { t: "Родина", no: "la madre", uk: "мама", en: "mother", ru: "мама", ex_no: "Mia madre cucina la cena.", ex_uk: "Моя мама готує вечерю.", en_ex: "My mother cooks dinner.", ru_ex: "Моя мама готовит ужин." },
            { t: "Родина", no: "il padre", uk: "тато", en: "father", ru: "папа", ex_no: "Mio padre lavora in città.", ex_uk: "Мій тато працює в місті.", en_ex: "My father works in the city.", ru_ex: "Мой папа работает в городе." },
            { t: "Родина", no: "la sorella", uk: "сестра", en: "sister", ru: "сестра", ex_no: "Mia sorella è più giovane di me.", ex_uk: "Моя сестра молодша за мене.", en_ex: "My sister is younger than me.", ru_ex: "Моя сестра младше меня." },
            { t: "Родина", no: "il fratello", uk: "брат", en: "brother", ru: "брат", ex_no: "Mio fratello vive a Roma.", ex_uk: "Мій брат живе в Римі.", en_ex: "My brother lives in Rome.", ru_ex: "Мой брат живёт в Риме." },
            { t: "Родина", no: "il bambino", uk: "дитина", en: "child", ru: "ребёнок", ex_no: "Il bambino gioca fuori.", ex_uk: "Дитина грається надворі.", en_ex: "The child is playing outside.", ru_ex: "Ребёнок играет на улице." },
            { t: "Родина", no: "la nonna", uk: "бабуся", en: "grandmother", ru: "бабушка", ex_no: "Mia nonna fa il pane ogni settimana.", ex_uk: "Моя бабуся пече хліб щотижня.", en_ex: "My grandmother bakes bread every week.", ru_ex: "Моя бабушка печёт хлеб каждую неделю." },
            { t: "Родина", no: "il nonno", uk: "дідусь", en: "grandfather", ru: "дедушка", ex_no: "Mio nonno racconta belle storie.", ex_uk: "Мій дідусь розповідає чудові історії.", en_ex: "My grandfather tells great stories.", ru_ex: "Мой дедушка рассказывает отличные истории." },
            { t: "Родина", no: "l'amico", uk: "друг", en: "friend", ru: "друг", ex_no: "Lui è il mio migliore amico.", ex_uk: "Він мій найкращий друг.", en_ex: "He is my best friend.", ru_ex: "Он мой лучший друг." },
            { t: "Кольори", no: "rosso", uk: "червоний", en: "red", ru: "красный", ex_no: "La mela è rossa.", ex_uk: "Яблуко червоне.", en_ex: "The apple is red.", ru_ex: "Яблоко красное." },
            { t: "Кольори", no: "blu", uk: "синій", en: "blue", ru: "синий", ex_no: "Il cielo è blu oggi.", ex_uk: "Сьогодні небо синє.", en_ex: "The sky is blue today.", ru_ex: "Сегодня небо синее." },
            { t: "Кольори", no: "verde", uk: "зелений", en: "green", ru: "зелёный", ex_no: "L'erba è verde.", ex_uk: "Трава зелена.", en_ex: "The grass is green.", ru_ex: "Трава зелёная." },
            { t: "Кольори", no: "giallo", uk: "жовтий", en: "yellow", ru: "жёлтый", ex_no: "Il sole è giallo.", ex_uk: "Сонце жовте.", en_ex: "The sun is yellow.", ru_ex: "Солнце жёлтое." },
            { t: "Кольори", no: "nero", uk: "чорний", en: "black", ru: "чёрный", ex_no: "Lei ha un gatto nero.", ex_uk: "У неї чорний кіт.", en_ex: "She has a black cat.", ru_ex: "У неё чёрный кот." },
            { t: "Кольори", no: "bianco", uk: "білий", en: "white", ru: "белый", ex_no: "La neve è bianca.", ex_uk: "Сніг білий.", en_ex: "The snow is white.", ru_ex: "Снег белый." },
            { t: "Кольори", no: "arancione", uk: "помаранчевий", en: "orange", ru: "оранжевый", ex_no: "Mi piace il succo d'arancia.", ex_uk: "Мені подобається помаранчевий сік.", en_ex: "I like orange juice.", ru_ex: "Мне нравится апельсиновый сок." },
            { t: "Дні тижня", no: "lunedì", uk: "понеділок", en: "Monday", ru: "понедельник", ex_no: "Inizio a lavorare lunedì.", ex_uk: "Я починаю роботу в понеділок.", en_ex: "I start work on Monday.", ru_ex: "Я начинаю работу в понедельник." },
            { t: "Дні тижня", no: "martedì", uk: "вівторок", en: "Tuesday", ru: "вторник", ex_no: "Abbiamo una riunione martedì.", ex_uk: "У нас зустріч у вівторок.", en_ex: "We have a meeting on Tuesday.", ru_ex: "У нас встреча во вторник." },
            { t: "Дні тижня", no: "mercoledì", uk: "середа", en: "Wednesday", ru: "среда", ex_no: "Vado in palestra il mercoledì.", ex_uk: "Я ходжу в спортзал у середу.", en_ex: "I go to the gym on Wednesday.", ru_ex: "Я хожу в спортзал в среду." },
            { t: "Дні тижня", no: "giovedì", uk: "четвер", en: "Thursday", ru: "четверг", ex_no: "L'esame è giovedì.", ex_uk: "Іспит у четвер.", en_ex: "The exam is on Thursday.", ru_ex: "Экзамен в четверг." },
            { t: "Дні тижня", no: "venerdì", uk: "п'ятниця", en: "Friday", ru: "пятница", ex_no: "Festeggiamo venerdì.", ex_uk: "Ми святкуємо в п'ятницю.", en_ex: "We celebrate on Friday.", ru_ex: "Мы празднуем в пятницу." },
            { t: "Дні тижня", no: "sabato", uk: "субота", en: "Saturday", ru: "суббота", ex_no: "Pulisco la casa il sabato.", ex_uk: "Я прибираю в суботу.", en_ex: "I clean the house on Saturday.", ru_ex: "Я убираюсь в субботу." },
            { t: "Дні тижня", no: "domenica", uk: "неділя", en: "Sunday", ru: "воскресенье", ex_no: "Ci riposiamo la domenica.", ex_uk: "Ми відпочиваємо в неділю.", en_ex: "We rest on Sunday.", ru_ex: "Мы отдыхаем в воскресенье." },
            { t: "Дієслова", no: "essere", uk: "бути", en: "to be", ru: "быть", ex_no: "Sono uno studente.", ex_uk: "Я студент.", en_ex: "I am a student.", ru_ex: "Я студент." },
            { t: "Дієслова", no: "avere", uk: "мати", en: "to have", ru: "иметь", ex_no: "Ho una macchina.", ex_uk: "У мене є машина.", en_ex: "I have a car.", ru_ex: "У меня есть машина." },
            { t: "Дієслова", no: "andare", uk: "йти", en: "to go", ru: "идти", ex_no: "Vado al lavoro ogni giorno.", ex_uk: "Я йду на роботу щодня.", en_ex: "I go to work every day.", ru_ex: "Я иду на работу каждый день." },
            { t: "Дієслова", no: "mangiare", uk: "їсти", en: "to eat", ru: "есть", ex_no: "Facciamo colazione alle sette.", ex_uk: "Ми снідаємо о сьомій.", en_ex: "We eat breakfast at seven.", ru_ex: "Мы завтракаем в семь." },
            { t: "Дієслова", no: "bere", uk: "пити", en: "to drink", ru: "пить", ex_no: "Bevo acqua ogni mattina.", ex_uk: "Я п'ю воду щоранку.", en_ex: "I drink water every morning.", ru_ex: "Я пью воду каждое утро." },
            { t: "Дієслова", no: "vedere", uk: "бачити", en: "to see", ru: "видеть", ex_no: "Posso vedere le montagne.", ex_uk: "Я бачу гори.", en_ex: "I can see the mountains.", ru_ex: "Я вижу горы." },
            { t: "Дієслова", no: "parlare", uk: "говорити", en: "to speak", ru: "говорить", ex_no: "Lei parla tre lingue.", ex_uk: "Вона говорить трьома мовами.", en_ex: "She speaks three languages.", ru_ex: "Она говорит на трёх языках." },
            { t: "Дієслова", no: "volere", uk: "хотіти", en: "to want", ru: "хотеть", ex_no: "Vorrei un caffè, per favore.", ex_uk: "Я хочу каву, будь ласка.", en_ex: "I want a coffee, please.", ru_ex: "Я хочу кофе, пожалуйста." },
            { t: "Дієслова", no: "vivere", uk: "жити", en: "to live", ru: "жить", ex_no: "Viviamo in una piccola città.", ex_uk: "Ми живемо в маленькому місті.", en_ex: "We live in a small town.", ru_ex: "Мы живём в маленьком городе." },
            { t: "Дієслова", no: "lavorare", uk: "працювати", en: "to work", ru: "работать", ex_no: "Lui lavora in un ospedale.", ex_uk: "Він працює в лікарні.", en_ex: "He works in a hospital.", ru_ex: "Он работает в больнице." },
            { t: "Дієслова", no: "dormire", uk: "спати", en: "to sleep", ru: "спать", ex_no: "Il bambino dorme molto.", ex_uk: "Дитина багато спить.", en_ex: "The baby sleeps a lot.", ru_ex: "Малыш много спит." },
            { t: "Їжа", no: "il pane", uk: "хліб", en: "bread", ru: "хлеб", ex_no: "Compro pane fresco ogni giorno.", ex_uk: "Я купую свіжий хліб щодня.", en_ex: "I buy fresh bread every day.", ru_ex: "Я покупаю свежий хлеб каждый день." },
            { t: "Їжа", no: "l'acqua", uk: "вода", en: "water", ru: "вода", ex_no: "Posso avere un po' d'acqua?", ex_uk: "Можна мені трохи води?", en_ex: "Can I have some water?", ru_ex: "Можно мне немного воды?" },
            { t: "Їжа", no: "il latte", uk: "молоко", en: "milk", ru: "молоко", ex_no: "Bevo latte a colazione.", ex_uk: "Я п'ю молоко зі сніданком.", en_ex: "I drink milk with breakfast.", ru_ex: "Я пью молоко с завтраком." },
            { t: "Їжа", no: "l'uovo", uk: "яйце", en: "egg", ru: "яйцо", ex_no: "Mangio un uovo ogni mattina.", ex_uk: "Я їм яйце щоранку.", en_ex: "I eat an egg every morning.", ru_ex: "Я ем яйцо каждое утро." },
            { t: "Їжа", no: "la mela", uk: "яблуко", en: "apple", ru: "яблоко", ex_no: "Lei mangia una mela a pranzo.", ex_uk: "Вона їсть яблуко на обід.", en_ex: "She eats an apple for lunch.", ru_ex: "Она ест яблоко на обед." },
            { t: "Їжа", no: "la carne", uk: "м'ясо", en: "meat", ru: "мясо", ex_no: "Non mangiamo carne il venerdì.", ex_uk: "Ми не їмо м'ясо по п'ятницях.", en_ex: "We don't eat meat on Fridays.", ru_ex: "Мы не едим мясо по пятницам." },
            { t: "Їжа", no: "il formaggio", uk: "сир", en: "cheese", ru: "сыр", ex_no: "Adoro il formaggio italiano.", ex_uk: "Я люблю італійський сир.", en_ex: "I love Italian cheese.", ru_ex: "Я люблю итальянский сыр." },
            { t: "Їжа", no: "il caffè", uk: "кава", en: "coffee", ru: "кофе", ex_no: "Bevo il caffè ogni mattina.", ex_uk: "Я п'ю каву щоранку.", en_ex: "I drink coffee every morning.", ru_ex: "Я пью кофе каждое утро." },
            { t: "Прикметники", no: "grande", uk: "великий", en: "big", ru: "большой", ex_no: "Questa è una casa grande.", ex_uk: "Це великий будинок.", en_ex: "This is a big house.", ru_ex: "Это большой дом." },
            { t: "Прикметники", no: "piccolo", uk: "маленький", en: "small", ru: "маленький", ex_no: "Il gatto è molto piccolo.", ex_uk: "Кіт дуже маленький.", en_ex: "The cat is very small.", ru_ex: "Кот очень маленький." },
            { t: "Прикметники", no: "buono", uk: "добрий", en: "good", ru: "хороший", ex_no: "Questa è una buona idea.", ex_uk: "Це добра ідея.", en_ex: "This is a good idea.", ru_ex: "Это хорошая идея." },
            { t: "Прикметники", no: "cattivo", uk: "поганий", en: "bad", ru: "плохой", ex_no: "Il tempo è cattivo oggi.", ex_uk: "Сьогодні погана погода.", en_ex: "The weather is bad today.", ru_ex: "Сегодня плохая погода." },
            { t: "Прикметники", no: "nuovo", uk: "новий", en: "new", ru: "новый", ex_no: "Ho comprato un telefono nuovo.", ex_uk: "Я купив новий телефон.", en_ex: "I bought a new phone.", ru_ex: "Я купил новый телефон." },
            { t: "Прикметники", no: "vecchio", uk: "старий", en: "old", ru: "старый", ex_no: "Questo libro è molto vecchio.", ex_uk: "Ця книга дуже стара.", en_ex: "This book is very old.", ru_ex: "Эта книга очень старая." },
            { t: "Тіло", no: "la testa", uk: "голова", en: "head", ru: "голова", ex_no: "Mi fa male la testa.", ex_uk: "У мене болить голова.", en_ex: "My head hurts.", ru_ex: "У меня болит голова." },
            { t: "Тіло", no: "la mano", uk: "рука", en: "hand", ru: "рука", ex_no: "Dammi la tua mano.", ex_uk: "Дай мені руку.", en_ex: "Give me your hand.", ru_ex: "Дай мне руку." },
            { t: "Тіло", no: "l'occhio", uk: "око", en: "eye", ru: "глаз", ex_no: "Lei ha gli occhi azzurri.", ex_uk: "У неї блакитні очі.", en_ex: "She has blue eyes.", ru_ex: "У неё голубые глаза." },
            { t: "Дім", no: "la casa", uk: "будинок", en: "house", ru: "дом", ex_no: "Viviamo in una piccola casa.", ex_uk: "Ми живемо в маленькому будинку.", en_ex: "We live in a small house.", ru_ex: "Мы живём в маленьком доме." },
            { t: "Дім", no: "la camera", uk: "кімната", en: "room", ru: "комната", ex_no: "La mia camera è al piano di sopra.", ex_uk: "Моя кімната нагорі.", en_ex: "My room is upstairs.", ru_ex: "Моя комната наверху." },
            { t: "Дім", no: "la porta", uk: "двері", en: "door", ru: "дверь", ex_no: "Per favore, chiudi la porta.", ex_uk: "Будь ласка, зачини двері.", en_ex: "Please close the door.", ru_ex: "Пожалуйста, закрой дверь." },
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
    window.LANG_DATA.it = { VOCAB, GRAMMAR, NORSKPROVE_TASKS, LEVEL_TEST };
})();
