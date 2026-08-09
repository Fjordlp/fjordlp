// =====================================================================
//  js/data-de.js — німецька, окремий файл (як і норвезька в data.js)
// =====================================================================
// Структура повністю відповідає js/data.js (VOCAB/GRAMMAR/
// NORSKPROVE_TASKS/LEVEL_TEST) — реєструється в window.LANG_DATA.de,
// той самий механізм, що й для англійської (js/data-en.js). Рівень A1 —
// вручну складений словник (~78-80 слів), рівні A2-C2 поки не заповнені
// (для них далі працює AI-генерація, як і для мов без власного файлу).
//
// Поле "no" у VOCAB — історична назва (від "норвезька"), технічно означає
// "слово МОВОЮ ВИВЧЕННЯ" для будь-якої мови.
(function () {

    const VOCAB = {
        A1: [
            { t: "Привітання", no: "hallo", uk: "привіт", en: "hello", ru: "привет", ex_no: "Hallo, wie geht es dir?", ex_uk: "Привіт, як справи?", en_ex: "Hello, how are you?", ru_ex: "Привет, как дела?" },
            { t: "Привітання", no: "guten Morgen", uk: "добрий ранок", en: "good morning", ru: "доброе утро", ex_no: "Guten Morgen, hast du gut geschlafen?", ex_uk: "Добрий ранок, ти добре спав?", en_ex: "Good morning, did you sleep well?", ru_ex: "Доброе утро, ты хорошо спал?" },
            { t: "Привітання", no: "guten Abend", uk: "добрий вечір", en: "good evening", ru: "добрый вечер", ex_no: "Guten Abend, willkommen zu Hause.", ex_uk: "Добрий вечір, ласкаво просимо додому.", en_ex: "Good evening, welcome home.", ru_ex: "Добрый вечер, добро пожаловать домой." },
            { t: "Привітання", no: "gute Nacht", uk: "на добраніч", en: "good night", ru: "спокойной ночи", ex_no: "Gute Nacht, schlaf gut!", ex_uk: "На добраніч, солодких снів!", en_ex: "Good night, sleep well!", ru_ex: "Спокойной ночи, сладких снов!" },
            { t: "Привітання", no: "auf Wiedersehen", uk: "до побачення", en: "goodbye", ru: "до свидания", ex_no: "Auf Wiedersehen, bis morgen.", ex_uk: "До побачення, до завтра.", en_ex: "Goodbye, see you tomorrow.", ru_ex: "До свидания, до завтра." },
            { t: "Привітання", no: "danke", uk: "дякую", en: "thank you", ru: "спасибо", ex_no: "Danke für deine Hilfe.", ex_uk: "Дякую за твою допомогу.", en_ex: "Thank you for your help.", ru_ex: "Спасибо за твою помощь." },
            { t: "Привітання", no: "bitte", uk: "будь ласка", en: "please", ru: "пожалуйста", ex_no: "Kannst du mir bitte helfen?", ex_uk: "Можеш допомогти мені, будь ласка?", en_ex: "Can you help me, please?", ru_ex: "Можешь помочь мне, пожалуйста?" },
            { t: "Привітання", no: "Entschuldigung", uk: "вибачте", en: "sorry", ru: "извините", ex_no: "Entschuldigung, wo ist der Bahnhof?", ex_uk: "Вибачте, де вокзал?", en_ex: "Sorry, where is the station?", ru_ex: "Извините, где вокзал?" },
            { t: "Привітання", no: "ja", uk: "так", en: "yes", ru: "да", ex_no: "Ja, das stimmt.", ex_uk: "Так, це правда.", en_ex: "Yes, that's right.", ru_ex: "Да, это правда." },
            { t: "Привітання", no: "nein", uk: "ні", en: "no", ru: "нет", ex_no: "Nein, ich weiß es nicht.", ex_uk: "Ні, я не знаю.", en_ex: "No, I don't know.", ru_ex: "Нет, я не знаю." },
            { t: "Привітання", no: "willkommen", uk: "ласкаво просимо", en: "welcome", ru: "добро пожаловать", ex_no: "Willkommen in unserem Haus!", ex_uk: "Ласкаво просимо до нашого дому!", en_ex: "Welcome to our house!", ru_ex: "Добро пожаловать в наш дом!" },
            { t: "Привітання", no: "wie geht es dir", uk: "як справи", en: "how are you", ru: "как дела", ex_no: "Hallo Anna, wie geht es dir?", ex_uk: "Привіт, Анно, як справи?", en_ex: "Hi Anna, how are you?", ru_ex: "Привет, Анна, как дела?" },
            { t: "Числа", no: "null", uk: "нуль", en: "zero", ru: "ноль", ex_no: "Wir fangen bei null an.", ex_uk: "Ми починаємо з нуля.", en_ex: "We start from zero.", ru_ex: "Мы начинаем с нуля." },
            { t: "Числа", no: "eins", uk: "один", en: "one", ru: "один", ex_no: "Ich habe eine Katze.", ex_uk: "У мене є один кіт.", en_ex: "I have one cat.", ru_ex: "У меня есть один кот." },
            { t: "Числа", no: "zwei", uk: "два", en: "two", ru: "два", ex_no: "Es ist zwei Uhr.", ex_uk: "Зараз друга година.", en_ex: "It's two o'clock.", ru_ex: "Сейчас два часа." },
            { t: "Числа", no: "drei", uk: "три", en: "three", ru: "три", ex_no: "Ich habe drei Brüder.", ex_uk: "У мене три брати.", en_ex: "I have three brothers.", ru_ex: "У меня три брата." },
            { t: "Числа", no: "vier", uk: "чотири", en: "four", ru: "четыре", ex_no: "Der Tisch hat vier Beine.", ex_uk: "У стола чотири ноги.", en_ex: "The table has four legs.", ru_ex: "У стола четыре ноги." },
            { t: "Числа", no: "fünf", uk: "п'ять", en: "five", ru: "пять", ex_no: "Ich höre um fünf auf zu arbeiten.", ex_uk: "Я закінчую роботу о п'ятій.", en_ex: "I finish work at five.", ru_ex: "Я заканчиваю работу в пять." },
            { t: "Числа", no: "sechs", uk: "шість", en: "six", ru: "шесть", ex_no: "Wir wachen um sechs auf.", ex_uk: "Ми прокидаємось о шостій.", en_ex: "We wake up at six.", ru_ex: "Мы просыпаемся в шесть." },
            { t: "Числа", no: "sieben", uk: "сім", en: "seven", ru: "семь", ex_no: "Eine Woche hat sieben Tage.", ex_uk: "У тижні сім днів.", en_ex: "There are seven days in a week.", ru_ex: "В неделе семь дней." },
            { t: "Числа", no: "acht", uk: "вісім", en: "eight", ru: "восемь", ex_no: "Der Laden öffnet um acht.", ex_uk: "Магазин відкривається о восьмій.", en_ex: "The shop opens at eight.", ru_ex: "Магазин открывается в восемь." },
            { t: "Числа", no: "neun", uk: "дев'ять", en: "nine", ru: "девять", ex_no: "Die Schule beginnt um neun.", ex_uk: "Школа починається о дев'ятій.", en_ex: "School starts at nine.", ru_ex: "Школа начинается в девять." },
            { t: "Числа", no: "zehn", uk: "десять", en: "ten", ru: "десять", ex_no: "Ich zähle bis zehn.", ex_uk: "Я рахую до десяти.", en_ex: "I count to ten.", ru_ex: "Я считаю до десяти." },
            { t: "Числа", no: "zwanzig", uk: "двадцять", en: "twenty", ru: "двадцать", ex_no: "Sie ist zwanzig Jahre alt.", ex_uk: "Їй двадцять років.", en_ex: "She is twenty years old.", ru_ex: "Ей двадцать лет." },
            { t: "Числа", no: "hundert", uk: "сто", en: "hundred", ru: "сто", ex_no: "Hier sind hundert Leute.", ex_uk: "Тут сто людей.", en_ex: "There are a hundred people here.", ru_ex: "Здесь сто человек." },
            { t: "Родина", no: "die Familie", uk: "родина", en: "family", ru: "семья", ex_no: "Ich liebe meine Familie.", ex_uk: "Я люблю свою родину.", en_ex: "I love my family.", ru_ex: "Я люблю свою семью." },
            { t: "Родина", no: "die Mutter", uk: "мама", en: "mother", ru: "мама", ex_no: "Meine Mutter kocht das Abendessen.", ex_uk: "Моя мама готує вечерю.", en_ex: "My mother cooks dinner.", ru_ex: "Моя мама готовит ужин." },
            { t: "Родина", no: "der Vater", uk: "тато", en: "father", ru: "папа", ex_no: "Mein Vater arbeitet in der Stadt.", ex_uk: "Мій тато працює в місті.", en_ex: "My father works in the city.", ru_ex: "Мой папа работает в городе." },
            { t: "Родина", no: "die Schwester", uk: "сестра", en: "sister", ru: "сестра", ex_no: "Meine Schwester ist jünger als ich.", ex_uk: "Моя сестра молодша за мене.", en_ex: "My sister is younger than me.", ru_ex: "Моя сестра младше меня." },
            { t: "Родина", no: "der Bruder", uk: "брат", en: "brother", ru: "брат", ex_no: "Mein Bruder wohnt in Berlin.", ex_uk: "Мій брат живе в Берліні.", en_ex: "My brother lives in Berlin.", ru_ex: "Мой брат живёт в Берлине." },
            { t: "Родина", no: "das Kind", uk: "дитина", en: "child", ru: "ребёнок", ex_no: "Das Kind spielt draußen.", ex_uk: "Дитина грається надворі.", en_ex: "The child is playing outside.", ru_ex: "Ребёнок играет на улице." },
            { t: "Родина", no: "die Großmutter", uk: "бабуся", en: "grandmother", ru: "бабушка", ex_no: "Meine Großmutter backt jede Woche Brot.", ex_uk: "Моя бабуся пече хліб щотижня.", en_ex: "My grandmother bakes bread every week.", ru_ex: "Моя бабушка печёт хлеб каждую неделю." },
            { t: "Родина", no: "der Großvater", uk: "дідусь", en: "grandfather", ru: "дедушка", ex_no: "Mein Großvater erzählt tolle Geschichten.", ex_uk: "Мій дідусь розповідає чудові історії.", en_ex: "My grandfather tells great stories.", ru_ex: "Мой дедушка рассказывает отличные истории." },
            { t: "Родина", no: "der Freund", uk: "друг", en: "friend", ru: "друг", ex_no: "Er ist mein bester Freund.", ex_uk: "Він мій найкращий друг.", en_ex: "He is my best friend.", ru_ex: "Он мой лучший друг." },
            { t: "Кольори", no: "rot", uk: "червоний", en: "red", ru: "красный", ex_no: "Der Apfel ist rot.", ex_uk: "Яблуко червоне.", en_ex: "The apple is red.", ru_ex: "Яблоко красное." },
            { t: "Кольори", no: "blau", uk: "синій", en: "blue", ru: "синий", ex_no: "Der Himmel ist heute blau.", ex_uk: "Сьогодні небо синє.", en_ex: "The sky is blue today.", ru_ex: "Сегодня небо синее." },
            { t: "Кольори", no: "grün", uk: "зелений", en: "green", ru: "зелёный", ex_no: "Das Gras ist grün.", ex_uk: "Трава зелена.", en_ex: "The grass is green.", ru_ex: "Трава зелёная." },
            { t: "Кольори", no: "gelb", uk: "жовтий", en: "yellow", ru: "жёлтый", ex_no: "Die Sonne ist gelb.", ex_uk: "Сонце жовте.", en_ex: "The sun is yellow.", ru_ex: "Солнце жёлтое." },
            { t: "Кольори", no: "schwarz", uk: "чорний", en: "black", ru: "чёрный", ex_no: "Sie hat eine schwarze Katze.", ex_uk: "У неї чорний кіт.", en_ex: "She has a black cat.", ru_ex: "У неё чёрный кот." },
            { t: "Кольори", no: "weiß", uk: "білий", en: "white", ru: "белый", ex_no: "Der Schnee ist weiß.", ex_uk: "Сніг білий.", en_ex: "The snow is white.", ru_ex: "Снег белый." },
            { t: "Кольори", no: "orange", uk: "помаранчевий", en: "orange", ru: "оранжевый", ex_no: "Ich mag Orangensaft.", ex_uk: "Мені подобається помаранчевий сік.", en_ex: "I like orange juice.", ru_ex: "Мне нравится апельсиновый сок." },
            { t: "Дні тижня", no: "Montag", uk: "понеділок", en: "Monday", ru: "понедельник", ex_no: "Ich beginne am Montag mit der Arbeit.", ex_uk: "Я починаю роботу в понеділок.", en_ex: "I start work on Monday.", ru_ex: "Я начинаю работу в понедельник." },
            { t: "Дні тижня", no: "Dienstag", uk: "вівторок", en: "Tuesday", ru: "вторник", ex_no: "Wir haben am Dienstag ein Treffen.", ex_uk: "У нас зустріч у вівторок.", en_ex: "We have a meeting on Tuesday.", ru_ex: "У нас встреча во вторник." },
            { t: "Дні тижня", no: "Mittwoch", uk: "середа", en: "Wednesday", ru: "среда", ex_no: "Ich gehe mittwochs ins Fitnessstudio.", ex_uk: "Я ходжу в спортзал у середу.", en_ex: "I go to the gym on Wednesday.", ru_ex: "Я хожу в спортзал в среду." },
            { t: "Дні тижня", no: "Donnerstag", uk: "четвер", en: "Thursday", ru: "четверг", ex_no: "Die Prüfung ist am Donnerstag.", ex_uk: "Іспит у четвер.", en_ex: "The exam is on Thursday.", ru_ex: "Экзамен в четверг." },
            { t: "Дні тижня", no: "Freitag", uk: "п'ятниця", en: "Friday", ru: "пятница", ex_no: "Wir feiern am Freitag.", ex_uk: "Ми святкуємо в п'ятницю.", en_ex: "We celebrate on Friday.", ru_ex: "Мы празднуем в пятницу." },
            { t: "Дні тижня", no: "Samstag", uk: "субота", en: "Saturday", ru: "суббота", ex_no: "Ich putze samstags das Haus.", ex_uk: "Я прибираю в суботу.", en_ex: "I clean the house on Saturday.", ru_ex: "Я убираюсь в субботу." },
            { t: "Дні тижня", no: "Sonntag", uk: "неділя", en: "Sunday", ru: "воскресенье", ex_no: "Wir ruhen uns sonntags aus.", ex_uk: "Ми відпочиваємо в неділю.", en_ex: "We rest on Sunday.", ru_ex: "Мы отдыхаем в воскресенье." },
            { t: "Дієслова", no: "sein", uk: "бути", en: "to be", ru: "быть", ex_no: "Ich bin Student.", ex_uk: "Я студент.", en_ex: "I am a student.", ru_ex: "Я студент." },
            { t: "Дієслова", no: "haben", uk: "мати", en: "to have", ru: "иметь", ex_no: "Ich habe ein Auto.", ex_uk: "У мене є машина.", en_ex: "I have a car.", ru_ex: "У меня есть машина." },
            { t: "Дієслова", no: "gehen", uk: "йти", en: "to go", ru: "идти", ex_no: "Ich gehe jeden Tag zur Arbeit.", ex_uk: "Я йду на роботу щодня.", en_ex: "I go to work every day.", ru_ex: "Я иду на работу каждый день." },
            { t: "Дієслова", no: "essen", uk: "їсти", en: "to eat", ru: "есть", ex_no: "Wir frühstücken um sieben.", ex_uk: "Ми снідаємо о сьомій.", en_ex: "We eat breakfast at seven.", ru_ex: "Мы завтракаем в семь." },
            { t: "Дієслова", no: "trinken", uk: "пити", en: "to drink", ru: "пить", ex_no: "Ich trinke jeden Morgen Wasser.", ex_uk: "Я п'ю воду щоранку.", en_ex: "I drink water every morning.", ru_ex: "Я пью воду каждое утро." },
            { t: "Дієслова", no: "sehen", uk: "бачити", en: "to see", ru: "видеть", ex_no: "Ich kann die Berge sehen.", ex_uk: "Я бачу гори.", en_ex: "I can see the mountains.", ru_ex: "Я вижу горы." },
            { t: "Дієслова", no: "sprechen", uk: "говорити", en: "to speak", ru: "говорить", ex_no: "Sie spricht drei Sprachen.", ex_uk: "Вона говорить трьома мовами.", en_ex: "She speaks three languages.", ru_ex: "Она говорит на трёх языках." },
            { t: "Дієслова", no: "wollen", uk: "хотіти", en: "to want", ru: "хотеть", ex_no: "Ich möchte bitte einen Kaffee.", ex_uk: "Я хочу каву, будь ласка.", en_ex: "I want a coffee, please.", ru_ex: "Я хочу кофе, пожалуйста." },
            { t: "Дієслова", no: "wohnen", uk: "жити", en: "to live", ru: "жить", ex_no: "Wir wohnen in einer kleinen Stadt.", ex_uk: "Ми живемо в маленькому місті.", en_ex: "We live in a small town.", ru_ex: "Мы живём в маленьком городе." },
            { t: "Дієслова", no: "arbeiten", uk: "працювати", en: "to work", ru: "работать", ex_no: "Er arbeitet in einem Krankenhaus.", ex_uk: "Він працює в лікарні.", en_ex: "He works in a hospital.", ru_ex: "Он работает в больнице." },
            { t: "Дієслова", no: "schlafen", uk: "спати", en: "to sleep", ru: "спать", ex_no: "Das Baby schläft viel.", ex_uk: "Дитина багато спить.", en_ex: "The baby sleeps a lot.", ru_ex: "Малыш много спит." },
            { t: "Їжа", no: "das Brot", uk: "хліб", en: "bread", ru: "хлеб", ex_no: "Ich kaufe jeden Tag frisches Brot.", ex_uk: "Я купую свіжий хліб щодня.", en_ex: "I buy fresh bread every day.", ru_ex: "Я покупаю свежий хлеб каждый день." },
            { t: "Їжа", no: "das Wasser", uk: "вода", en: "water", ru: "вода", ex_no: "Kann ich etwas Wasser haben?", ex_uk: "Можна мені трохи води?", en_ex: "Can I have some water?", ru_ex: "Можно мне немного воды?" },
            { t: "Їжа", no: "die Milch", uk: "молоко", en: "milk", ru: "молоко", ex_no: "Ich trinke Milch zum Frühstück.", ex_uk: "Я п'ю молоко зі сніданком.", en_ex: "I drink milk with breakfast.", ru_ex: "Я пью молоко с завтраком." },
            { t: "Їжа", no: "das Ei", uk: "яйце", en: "egg", ru: "яйцо", ex_no: "Ich esse jeden Morgen ein Ei.", ex_uk: "Я їм яйце щоранку.", en_ex: "I eat an egg every morning.", ru_ex: "Я ем яйцо каждое утро." },
            { t: "Їжа", no: "der Apfel", uk: "яблуко", en: "apple", ru: "яблоко", ex_no: "Sie isst einen Apfel zum Mittagessen.", ex_uk: "Вона їсть яблуко на обід.", en_ex: "She eats an apple for lunch.", ru_ex: "Она ест яблоко на обед." },
            { t: "Їжа", no: "das Fleisch", uk: "м'ясо", en: "meat", ru: "мясо", ex_no: "Wir essen freitags kein Fleisch.", ex_uk: "Ми не їмо м'ясо по п'ятницях.", en_ex: "We don't eat meat on Fridays.", ru_ex: "Мы не едим мясо по пятницам." },
            { t: "Їжа", no: "der Käse", uk: "сир", en: "cheese", ru: "сыр", ex_no: "Ich liebe deutschen Käse.", ex_uk: "Я люблю німецький сир.", en_ex: "I love German cheese.", ru_ex: "Я люблю немецкий сыр." },
            { t: "Їжа", no: "der Kaffee", uk: "кава", en: "coffee", ru: "кофе", ex_no: "Ich trinke jeden Morgen Kaffee.", ex_uk: "Я п'ю каву щоранку.", en_ex: "I drink coffee every morning.", ru_ex: "Я пью кофе каждое утро." },
            { t: "Прикметники", no: "groß", uk: "великий", en: "big", ru: "большой", ex_no: "Das ist ein großes Haus.", ex_uk: "Це великий будинок.", en_ex: "This is a big house.", ru_ex: "Это большой дом." },
            { t: "Прикметники", no: "klein", uk: "маленький", en: "small", ru: "маленький", ex_no: "Die Katze ist sehr klein.", ex_uk: "Кіт дуже маленький.", en_ex: "The cat is very small.", ru_ex: "Кот очень маленький." },
            { t: "Прикметники", no: "gut", uk: "добрий", en: "good", ru: "хороший", ex_no: "Das ist eine gute Idee.", ex_uk: "Це добра ідея.", en_ex: "This is a good idea.", ru_ex: "Это хорошая идея." },
            { t: "Прикметники", no: "schlecht", uk: "поганий", en: "bad", ru: "плохой", ex_no: "Das Wetter ist heute schlecht.", ex_uk: "Сьогодні погана погода.", en_ex: "The weather is bad today.", ru_ex: "Сегодня плохая погода." },
            { t: "Прикметники", no: "neu", uk: "новий", en: "new", ru: "новый", ex_no: "Ich habe ein neues Telefon gekauft.", ex_uk: "Я купив новий телефон.", en_ex: "I bought a new phone.", ru_ex: "Я купил новый телефон." },
            { t: "Прикметники", no: "alt", uk: "старий", en: "old", ru: "старый", ex_no: "Dieses Buch ist sehr alt.", ex_uk: "Ця книга дуже стара.", en_ex: "This book is very old.", ru_ex: "Эта книга очень старая." },
            { t: "Тіло", no: "der Kopf", uk: "голова", en: "head", ru: "голова", ex_no: "Mein Kopf tut weh.", ex_uk: "У мене болить голова.", en_ex: "My head hurts.", ru_ex: "У меня болит голова." },
            { t: "Тіло", no: "die Hand", uk: "рука", en: "hand", ru: "рука", ex_no: "Gib mir deine Hand.", ex_uk: "Дай мені руку.", en_ex: "Give me your hand.", ru_ex: "Дай мне руку." },
            { t: "Тіло", no: "das Auge", uk: "око", en: "eye", ru: "глаз", ex_no: "Sie hat blaue Augen.", ex_uk: "У неї блакитні очі.", en_ex: "She has blue eyes.", ru_ex: "У неё голубые глаза." },
            { t: "Дім", no: "das Haus", uk: "будинок", en: "house", ru: "дом", ex_no: "Wir wohnen in einem kleinen Haus.", ex_uk: "Ми живемо в маленькому будинку.", en_ex: "We live in a small house.", ru_ex: "Мы живём в маленьком доме." },
            { t: "Дім", no: "das Zimmer", uk: "кімната", en: "room", ru: "комната", ex_no: "Mein Zimmer ist oben.", ex_uk: "Моя кімната нагорі.", en_ex: "My room is upstairs.", ru_ex: "Моя комната наверху." },
            { t: "Дім", no: "die Tür", uk: "двері", en: "door", ru: "дверь", ex_no: "Bitte mach die Tür zu.", ex_uk: "Будь ласка, зачини двері.", en_ex: "Please close the door.", ru_ex: "Пожалуйста, закрой дверь." },
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
    window.LANG_DATA.de = { VOCAB, GRAMMAR, NORSKPROVE_TASKS, LEVEL_TEST };
})();
