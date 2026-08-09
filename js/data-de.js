// =====================================================================
//  js/data-de.js — НІМЕЦЬКА МОВА (ПОВНИЙ НАБІР)
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
            { t: "Greetings", no: "hallo", uk: "привіт", en: "hello", ru: "привет", ex_no: "Hallo, wie geht es dir?", ex_uk: "Привіт, як справи?", en_ex: "Hello, how are you?", ru_ex: "Привет, как дела?" },
            { t: "Greetings", no: "guten Morgen", uk: "добрий ранок", en: "good morning", ru: "доброе утро", ex_no: "Guten Morgen, hast du gut geschlafen?", ex_uk: "Добрий ранок, ти добре спав?", en_ex: "Good morning, did you sleep well?", ru_ex: "Доброе утро, ты хорошо спал?" },
            { t: "Greetings", no: "guten Abend", uk: "добрий вечір", en: "good evening", ru: "добрый вечер", ex_no: "Guten Abend, willkommen zu Hause.", ex_uk: "Добрий вечір, ласкаво просимо додому.", en_ex: "Good evening, welcome home.", ru_ex: "Добрый вечер, добро пожаловать домой." },
            { t: "Greetings", no: "gute Nacht", uk: "на добраніч", en: "good night", ru: "спокойной ночи", ex_no: "Gute Nacht, schlaf gut!", ex_uk: "На добраніч, солодких снів!", en_ex: "Good night, sleep well!", ru_ex: "Спокойной ночи, сладких снов!" },
            { t: "Greetings", no: "auf Wiedersehen", uk: "до побачення", en: "goodbye", ru: "до свидания", ex_no: "Auf Wiedersehen, bis morgen.", ex_uk: "До побачення, до завтра.", en_ex: "Goodbye, see you tomorrow.", ru_ex: "До свидания, до завтра." },
            { t: "Greetings", no: "danke", uk: "дякую", en: "thank you", ru: "спасибо", ex_no: "Danke für deine Hilfe.", ex_uk: "Дякую за твою допомогу.", en_ex: "Thank you for your help.", ru_ex: "Спасибо за твою помощь." },
            { t: "Greetings", no: "bitte", uk: "будь ласка", en: "please", ru: "пожалуйста", ex_no: "Kannst du mir bitte helfen?", ex_uk: "Можеш допомогти мені, будь ласка?", en_ex: "Can you help me, please?", ru_ex: "Можешь помочь мне, пожалуйста?" },
            { t: "Greetings", no: "entschuldigung", uk: "вибачте", en: "sorry", ru: "извините", ex_no: "Entschuldigung, wo ist der Bahnhof?", ex_uk: "Вибачте, де вокзал?", en_ex: "Sorry, where is the station?", ru_ex: "Извините, где вокзал?" },
            { t: "Greetings", no: "ja", uk: "так", en: "yes", ru: "да", ex_no: "Ja, das stimmt.", ex_uk: "Так, це правда.", en_ex: "Yes, that's right.", ru_ex: "Да, это правда." },
            { t: "Greetings", no: "nein", uk: "ні", en: "no", ru: "нет", ex_no: "Nein, ich weiß es nicht.", ex_uk: "Ні, я не знаю.", en_ex: "No, I don't know.", ru_ex: "Нет, я не знаю." },
            { t: "Greetings", no: "willkommen", uk: "ласкаво просимо", en: "welcome", ru: "добро пожаловать", ex_no: "Willkommen in unserem Haus!", ex_uk: "Ласкаво просимо до нашого дому!", en_ex: "Welcome to our house!", ru_ex: "Добро пожаловать в наш дом!" },
            { t: "Greetings", no: "wie geht es dir", uk: "як справи", en: "how are you", ru: "как дела", ex_no: "Hallo Anna, wie geht es dir?", ex_uk: "Привіт, Анно, як справи?", en_ex: "Hi Anna, how are you?", ru_ex: "Привет, Анна, как дела?" },
            // Numbers
            { t: "Numbers", no: "null", uk: "нуль", en: "zero", ru: "ноль", ex_no: "Wir fangen bei null an.", ex_uk: "Ми починаємо з нуля.", en_ex: "We start from zero.", ru_ex: "Мы начинаем с нуля." },
            { t: "Numbers", no: "eins", uk: "один", en: "one", ru: "один", ex_no: "Ich habe eine Katze.", ex_uk: "У мене є один кіт.", en_ex: "I have one cat.", ru_ex: "У меня есть один кот." },
            { t: "Numbers", no: "zwei", uk: "два", en: "two", ru: "два", ex_no: "Es ist zwei Uhr.", ex_uk: "Зараз друга година.", en_ex: "It's two o'clock.", ru_ex: "Сейчас два часа." },
            { t: "Numbers", no: "drei", uk: "три", en: "three", ru: "три", ex_no: "Ich habe drei Brüder.", ex_uk: "У мене три брати.", en_ex: "I have three brothers.", ru_ex: "У меня три брата." },
            { t: "Numbers", no: "vier", uk: "чотири", en: "four", ru: "четыре", ex_no: "Der Tisch hat vier Beine.", ex_uk: "У стола чотири ноги.", en_ex: "The table has four legs.", ru_ex: "У стола четыре ноги." },
            { t: "Numbers", no: "fünf", uk: "п'ять", en: "five", ru: "пять", ex_no: "Ich höre um fünf auf zu arbeiten.", ex_uk: "Я закінчую роботу о п'ятій.", en_ex: "I finish work at five.", ru_ex: "Я заканчиваю работу в пять." },
            { t: "Numbers", no: "sechs", uk: "шість", en: "six", ru: "шесть", ex_no: "Wir wachen um sechs auf.", ex_uk: "Ми прокидаємось о шостій.", en_ex: "We wake up at six.", ru_ex: "Мы просыпаемся в шесть." },
            { t: "Numbers", no: "sieben", uk: "сім", en: "seven", ru: "семь", ex_no: "Eine Woche hat sieben Tage.", ex_uk: "У тижні сім днів.", en_ex: "There are seven days in a week.", ru_ex: "В неделе семь дней." },
            { t: "Numbers", no: "acht", uk: "вісім", en: "eight", ru: "восемь", ex_no: "Der Laden öffnet um acht.", ex_uk: "Магазин відкривається о восьмій.", en_ex: "The shop opens at eight.", ru_ex: "Магазин открывается в восемь." },
            { t: "Numbers", no: "neun", uk: "дев'ять", en: "nine", ru: "девять", ex_no: "Die Schule beginnt um neun.", ex_uk: "Школа починається о дев'ятій.", en_ex: "School starts at nine.", ru_ex: "Школа начинается в девять." },
            { t: "Numbers", no: "zehn", uk: "десять", en: "ten", ru: "десять", ex_no: "Ich zähle bis zehn.", ex_uk: "Я рахую до десяти.", en_ex: "I count to ten.", ru_ex: "Я считаю до десяти." },
            { t: "Numbers", no: "zwanzig", uk: "двадцять", en: "twenty", ru: "двадцать", ex_no: "Sie ist zwanzig Jahre alt.", ex_uk: "Їй двадцять років.", en_ex: "She is twenty years old.", ru_ex: "Ей двадцать лет." },
            { t: "Numbers", no: "hundert", uk: "сто", en: "hundred", ru: "сто", ex_no: "Hier sind hundert Leute.", ex_uk: "Тут сто людей.", en_ex: "There are a hundred people here.", ru_ex: "Здесь сто человек." },
            // Family
            { t: "Family", no: "die Familie", uk: "родина", en: "family", ru: "семья", ex_no: "Ich liebe meine Familie.", ex_uk: "Я люблю свою родину.", en_ex: "I love my family.", ru_ex: "Я люблю свою семью." },
            { t: "Family", no: "die Mutter", uk: "мама", en: "mother", ru: "мама", ex_no: "Meine Mutter kocht das Abendessen.", ex_uk: "Моя мама готує вечерю.", en_ex: "My mother cooks dinner.", ru_ex: "Моя мама готовит ужин." },
            { t: "Family", no: "der Vater", uk: "тато", en: "father", ru: "папа", ex_no: "Mein Vater arbeitet in der Stadt.", ex_uk: "Мій тато працює в місті.", en_ex: "My father works in the city.", ru_ex: "Мой папа работает в городе." },
            { t: "Family", no: "die Schwester", uk: "сестра", en: "sister", ru: "сестра", ex_no: "Meine Schwester ist jünger als ich.", ex_uk: "Моя сестра молодша за мене.", en_ex: "My sister is younger than me.", ru_ex: "Моя сестра младше меня." },
            { t: "Family", no: "der Bruder", uk: "брат", en: "brother", ru: "брат", ex_no: "Mein Bruder wohnt in Berlin.", ex_uk: "Мій брат живе в Берліні.", en_ex: "My brother lives in Berlin.", ru_ex: "Мой брат живёт в Берлине." },
            { t: "Family", no: "das Kind", uk: "дитина", en: "child", ru: "ребёнок", ex_no: "Das Kind spielt draußen.", ex_uk: "Дитина грається надворі.", en_ex: "The child is playing outside.", ru_ex: "Ребёнок играет на улице." },
            { t: "Family", no: "die Großmutter", uk: "бабуся", en: "grandmother", ru: "бабушка", ex_no: "Meine Großmutter backt jede Woche Brot.", ex_uk: "Моя бабуся пече хліб щотижня.", en_ex: "My grandmother bakes bread every week.", ru_ex: "Моя бабушка печёт хлеб каждую неделю." },
            { t: "Family", no: "der Großvater", uk: "дідусь", en: "grandfather", ru: "дедушка", ex_no: "Mein Großvater erzählt tolle Geschichten.", ex_uk: "Мій дідусь розповідає чудові історії.", en_ex: "My grandfather tells great stories.", ru_ex: "Мой дедушка рассказывает отличные истории." },
            { t: "Family", no: "der Freund", uk: "друг", en: "friend", ru: "друг", ex_no: "Er ist mein bester Freund.", ex_uk: "Він мій найкращий друг.", en_ex: "He is my best friend.", ru_ex: "Он мой лучший друг." },
            // Colors
            { t: "Colors", no: "rot", uk: "червоний", en: "red", ru: "красный", ex_no: "Der Apfel ist rot.", ex_uk: "Яблуко червоне.", en_ex: "The apple is red.", ru_ex: "Яблоко красное." },
            { t: "Colors", no: "blau", uk: "синій", en: "blue", ru: "синий", ex_no: "Der Himmel ist heute blau.", ex_uk: "Сьогодні небо синє.", en_ex: "The sky is blue today.", ru_ex: "Сегодня небо синее." },
            { t: "Colors", no: "grün", uk: "зелений", en: "green", ru: "зелёный", ex_no: "Das Gras ist grün.", ex_uk: "Трава зелена.", en_ex: "The grass is green.", ru_ex: "Трава зелёная." },
            { t: "Colors", no: "gelb", uk: "жовтий", en: "yellow", ru: "жёлтый", ex_no: "Die Sonne ist gelb.", ex_uk: "Сонце жовте.", en_ex: "The sun is yellow.", ru_ex: "Солнце жёлтое." },
            { t: "Colors", no: "schwarz", uk: "чорний", en: "black", ru: "чёрный", ex_no: "Sie hat eine schwarze Katze.", ex_uk: "У неї чорний кіт.", en_ex: "She has a black cat.", ru_ex: "У неё чёрный кот." },
            { t: "Colors", no: "weiß", uk: "білий", en: "white", ru: "белый", ex_no: "Der Schnee ist weiß.", ex_uk: "Сніг білий.", en_ex: "The snow is white.", ru_ex: "Снег белый." },
            { t: "Colors", no: "orange", uk: "помаранчевий", en: "orange", ru: "оранжевый", ex_no: "Ich mag Orangensaft.", ex_uk: "Мені подобається помаранчевий сік.", en_ex: "I like orange juice.", ru_ex: "Мне нравится апельсиновый сок." },
            // Days
            { t: "Days", no: "Montag", uk: "понеділок", en: "Monday", ru: "понедельник", ex_no: "Ich beginne am Montag mit der Arbeit.", ex_uk: "Я починаю роботу в понеділок.", en_ex: "I start work on Monday.", ru_ex: "Я начинаю работу в понедельник." },
            { t: "Days", no: "Dienstag", uk: "вівторок", en: "Tuesday", ru: "вторник", ex_no: "Wir haben am Dienstag ein Treffen.", ex_uk: "У нас зустріч у вівторок.", en_ex: "We have a meeting on Tuesday.", ru_ex: "У нас встреча во вторник." },
            { t: "Days", no: "Mittwoch", uk: "середа", en: "Wednesday", ru: "среда", ex_no: "Ich gehe mittwochs ins Fitnessstudio.", ex_uk: "Я ходжу в спортзал у середу.", en_ex: "I go to the gym on Wednesday.", ru_ex: "Я хожу в спортзал в среду." },
            { t: "Days", no: "Donnerstag", uk: "четвер", en: "Thursday", ru: "четверг", ex_no: "Die Prüfung ist am Donnerstag.", ex_uk: "Іспит у четвер.", en_ex: "The exam is on Thursday.", ru_ex: "Экзамен в четверг." },
            { t: "Days", no: "Freitag", uk: "п'ятниця", en: "Friday", ru: "пятница", ex_no: "Wir feiern am Freitag.", ex_uk: "Ми святкуємо в п'ятницю.", en_ex: "We celebrate on Friday.", ru_ex: "Мы празднуем в пятницу." },
            { t: "Days", no: "Samstag", uk: "субота", en: "Saturday", ru: "суббота", ex_no: "Ich putze samstags das Haus.", ex_uk: "Я прибираю в суботу.", en_ex: "I clean the house on Saturday.", ru_ex: "Я убираюсь в субботу." },
            { t: "Days", no: "Sonntag", uk: "неділя", en: "Sunday", ru: "воскресенье", ex_no: "Wir ruhen uns sonntags aus.", ex_uk: "Ми відпочиваємо в неділю.", en_ex: "We rest on Sunday.", ru_ex: "Мы отдыхаем в воскресенье." },
            // Verbs
            { t: "Verbs", no: "sein", uk: "бути", en: "to be", ru: "быть", ex_no: "Ich bin Student.", ex_uk: "Я студент.", en_ex: "I am a student.", ru_ex: "Я студент." },
            { t: "Verbs", no: "haben", uk: "мати", en: "to have", ru: "иметь", ex_no: "Ich habe ein Auto.", ex_uk: "У мене є машина.", en_ex: "I have a car.", ru_ex: "У меня есть машина." },
            { t: "Verbs", no: "gehen", uk: "йти", en: "to go", ru: "идти", ex_no: "Ich gehe jeden Tag zur Arbeit.", ex_uk: "Я йду на роботу щодня.", en_ex: "I go to work every day.", ru_ex: "Я иду на работу каждый день." },
            { t: "Verbs", no: "essen", uk: "їсти", en: "to eat", ru: "есть", ex_no: "Wir frühstücken um sieben.", ex_uk: "Ми снідаємо о сьомій.", en_ex: "We eat breakfast at seven.", ru_ex: "Мы завтракаем в семь." },
            { t: "Verbs", no: "trinken", uk: "пити", en: "to drink", ru: "пить", ex_no: "Ich trinke jeden Morgen Wasser.", ex_uk: "Я п'ю воду щоранку.", en_ex: "I drink water every morning.", ru_ex: "Я пью воду каждое утро." },
            { t: "Verbs", no: "sehen", uk: "бачити", en: "to see", ru: "видеть", ex_no: "Ich kann die Berge sehen.", ex_uk: "Я бачу гори.", en_ex: "I can see the mountains.", ru_ex: "Я вижу горы." },
            { t: "Verbs", no: "sprechen", uk: "говорити", en: "to speak", ru: "говорить", ex_no: "Sie spricht drei Sprachen.", ex_uk: "Вона говорить трьома мовами.", en_ex: "She speaks three languages.", ru_ex: "Она говорит на трёх языках." },
            { t: "Verbs", no: "wollen", uk: "хотіти", en: "to want", ru: "хотеть", ex_no: "Ich möchte bitte einen Kaffee.", ex_uk: "Я хочу каву, будь ласка.", en_ex: "I want a coffee, please.", ru_ex: "Я хочу кофе, пожалуйста." },
            { t: "Verbs", no: "wohnen", uk: "жити", en: "to live", ru: "жить", ex_no: "Wir wohnen in einer kleinen Stadt.", ex_uk: "Ми живемо в маленькому місті.", en_ex: "We live in a small town.", ru_ex: "Мы живём в маленьком городе." },
            { t: "Verbs", no: "arbeiten", uk: "працювати", en: "to work", ru: "работать", ex_no: "Er arbeitet in einem Krankenhaus.", ex_uk: "Він працює в лікарні.", en_ex: "He works in a hospital.", ru_ex: "Он работает в больнице." },
            { t: "Verbs", no: "schlafen", uk: "спати", en: "to sleep", ru: "спать", ex_no: "Das Baby schläft viel.", ex_uk: "Дитина багато спить.", en_ex: "The baby sleeps a lot.", ru_ex: "Малыш много спит." },
            // Food
            { t: "Food", no: "das Brot", uk: "хліб", en: "bread", ru: "хлеб", ex_no: "Ich kaufe jeden Tag frisches Brot.", ex_uk: "Я купую свіжий хліб щодня.", en_ex: "I buy fresh bread every day.", ru_ex: "Я покупаю свежий хлеб каждый день." },
            { t: "Food", no: "das Wasser", uk: "вода", en: "water", ru: "вода", ex_no: "Kann ich etwas Wasser haben?", ex_uk: "Можна мені трохи води?", en_ex: "Can I have some water?", ru_ex: "Можно мне немного воды?" },
            { t: "Food", no: "die Milch", uk: "молоко", en: "milk", ru: "молоко", ex_no: "Ich trinke Milch zum Frühstück.", ex_uk: "Я п'ю молоко зі сніданком.", en_ex: "I drink milk with breakfast.", ru_ex: "Я пью молоко с завтраком." },
            { t: "Food", no: "das Ei", uk: "яйце", en: "egg", ru: "яйцо", ex_no: "Ich esse jeden Morgen ein Ei.", ex_uk: "Я їм яйце щоранку.", en_ex: "I eat an egg every morning.", ru_ex: "Я ем яйцо каждое утро." },
            { t: "Food", no: "der Apfel", uk: "яблуко", en: "apple", ru: "яблоко", ex_no: "Sie isst einen Apfel zum Mittagessen.", ex_uk: "Вона їсть яблуко на обід.", en_ex: "She eats an apple for lunch.", ru_ex: "Она ест яблоко на обед." },
            { t: "Food", no: "das Fleisch", uk: "м'ясо", en: "meat", ru: "мясо", ex_no: "Wir essen freitags kein Fleisch.", ex_uk: "Ми не їмо м'ясо по п'ятницях.", en_ex: "We don't eat meat on Fridays.", ru_ex: "Мы не едим мясо по пятницам." },
            { t: "Food", no: "der Käse", uk: "сир", en: "cheese", ru: "сыр", ex_no: "Ich liebe deutschen Käse.", ex_uk: "Я люблю німецький сир.", en_ex: "I love German cheese.", ru_ex: "Я люблю немецкий сыр." },
            { t: "Food", no: "der Kaffee", uk: "кава", en: "coffee", ru: "кофе", ex_no: "Ich trinke jeden Morgen Kaffee.", ex_uk: "Я п'ю каву щоранку.", en_ex: "I drink coffee every morning.", ru_ex: "Я пью кофе каждое утро." },
            // Adjectives
            { t: "Adjectives", no: "groß", uk: "великий", en: "big", ru: "большой", ex_no: "Das ist ein großes Haus.", ex_uk: "Це великий будинок.", en_ex: "This is a big house.", ru_ex: "Это большой дом." },
            { t: "Adjectives", no: "klein", uk: "маленький", en: "small", ru: "маленький", ex_no: "Die Katze ist sehr klein.", ex_uk: "Кіт дуже маленький.", en_ex: "The cat is very small.", ru_ex: "Кот очень маленький." },
            { t: "Adjectives", no: "gut", uk: "добрий", en: "good", ru: "хороший", ex_no: "Das ist eine gute Idee.", ex_uk: "Це добра ідея.", en_ex: "This is a good idea.", ru_ex: "Это хорошая идея." },
            { t: "Adjectives", no: "schlecht", uk: "поганий", en: "bad", ru: "плохой", ex_no: "Das Wetter ist heute schlecht.", ex_uk: "Сьогодні погана погода.", en_ex: "The weather is bad today.", ru_ex: "Сегодня плохая погода." },
            { t: "Adjectives", no: "neu", uk: "новий", en: "new", ru: "новый", ex_no: "Ich habe ein neues Telefon gekauft.", ex_uk: "Я купив новий телефон.", en_ex: "I bought a new phone.", ru_ex: "Я купил новый телефон." },
            { t: "Adjectives", no: "alt", uk: "старий", en: "old", ru: "старый", ex_no: "Dieses Buch ist sehr alt.", ex_uk: "Ця книга дуже стара.", en_ex: "This book is very old.", ru_ex: "Эта книга очень старая." },
            // Body
            { t: "Body", no: "der Kopf", uk: "голова", en: "head", ru: "голова", ex_no: "Mein Kopf tut weh.", ex_uk: "У мене болить голова.", en_ex: "My head hurts.", ru_ex: "У меня болит голова." },
            { t: "Body", no: "die Hand", uk: "рука", en: "hand", ru: "рука", ex_no: "Gib mir deine Hand.", ex_uk: "Дай мені руку.", en_ex: "Give me your hand.", ru_ex: "Дай мне руку." },
            { t: "Body", no: "das Auge", uk: "око", en: "eye", ru: "глаз", ex_no: "Sie hat blaue Augen.", ex_uk: "У неї блакитні очі.", en_ex: "She has blue eyes.", ru_ex: "У неё голубые глаза." },
            { t: "Body", no: "das Ohr", uk: "вухо", en: "ear", ru: "ухо", ex_no: "Ich habe eine Ohrenentzündung.", ex_uk: "У мене інфекція вуха.", en_ex: "I have an ear infection.", ru_ex: "У меня инфекция уха." },
            { t: "Body", no: "die Nase", uk: "ніс", en: "nose", ru: "нос", ex_no: "Ihre Nase ist rot.", ex_uk: "Її ніс червоний.", en_ex: "Her nose is red.", ru_ex: "У неё красный нос." },
            // Home
            { t: "Home", no: "das Haus", uk: "будинок", en: "house", ru: "дом", ex_no: "Wir wohnen in einem kleinen Haus.", ex_uk: "Ми живемо в маленькому будинку.", en_ex: "We live in a small house.", ru_ex: "Мы живём в маленьком доме." },
            { t: "Home", no: "das Zimmer", uk: "кімната", en: "room", ru: "комната", ex_no: "Mein Zimmer ist oben.", ex_uk: "Моя кімната нагорі.", en_ex: "My room is upstairs.", ru_ex: "Моя комната наверху." },
            { t: "Home", no: "die Tür", uk: "двері", en: "door", ru: "дверь", ex_no: "Bitte mach die Tür zu.", ex_uk: "Будь ласка, зачини двері.", en_ex: "Please close the door.", ru_ex: "Пожалуйста, закрой дверь." },
            { t: "Home", no: "der Tisch", uk: "стіл", en: "table", ru: "стол", ex_no: "Das Buch liegt auf dem Tisch.", ex_uk: "Книга на столі.", en_ex: "The book is on the table.", ru_ex: "Книга на столе." },
            { t: "Home", no: "der Stuhl", uk: "стілець", en: "chair", ru: "стул", ex_no: "Setz dich auf den Stuhl.", ex_uk: "Сідай на стілець.", en_ex: "Sit on the chair.", ru_ex: "Садись на стул." },
            // Transport
            { t: "Transport", no: "das Auto", uk: "машина", en: "car", ru: "машина", ex_no: "Wir fahren mit dem Auto zur Arbeit.", ex_uk: "Ми їздимо на роботу машиною.", en_ex: "We drive to work by car.", ru_ex: "Мы ездим на работу на машине." },
            { t: "Transport", no: "der Bus", uk: "автобус", en: "bus", ru: "автобус", ex_no: "Ich fahre mit dem Bus zur Schule.", ex_uk: "Я їду автобусом до школи.", en_ex: "I take the bus to school.", ru_ex: "Я еду автобусом в школу." },
            { t: "Transport", no: "der Zug", uk: "поїзд", en: "train", ru: "поезд", ex_no: "Der Zug fährt um acht ab.", ex_uk: "Поїзд відправляється о восьмій.", en_ex: "The train leaves at eight.", ru_ex: "Поезд отправляется в восемь." },
            { t: "Transport", no: "das Fahrrad", uk: "велосипед", en: "bicycle", ru: "велосипед", ex_no: "Ich fahre mit dem Fahrrad zur Arbeit.", ex_uk: "Я їду на велосипеді на роботу.", en_ex: "I ride my bicycle to work.", ru_ex: "Я еду на велосипеде на работу." },
        ],

        // -------------------- A2 --------------------
        A2: [
            // Shopping
            { t: "Shopping", no: "das Geschäft", uk: "магазин", en: "shop", ru: "магазин", ex_no: "Das Geschäft öffnet um neun.", ex_uk: "Магазин відкривається о дев'ятій.", en_ex: "The shop opens at nine.", ru_ex: "Магазин открывается в девять." },
            { t: "Shopping", no: "kaufen", uk: "купувати", en: "buy", ru: "покупать", ex_no: "Ich kaufe jeden Tag frisches Brot.", ex_uk: "Я купую свіжий хліб щодня.", en_ex: "I buy fresh bread every day.", ru_ex: "Я покупаю свежий хлеб каждый день." },
            { t: "Shopping", no: "der Preis", uk: "ціна", en: "price", ru: "цена", ex_no: "Was ist der Preis dafür?", ex_uk: "Яка ціна на це?", en_ex: "What is the price of this?", ru_ex: "Какая цена на это?" },
            { t: "Shopping", no: "das Geld", uk: "гроші", en: "money", ru: "деньги", ex_no: "Ich habe nicht genug Geld.", ex_uk: "У мене недостатньо грошей.", en_ex: "I don't have enough money.", ru_ex: "У меня недостаточно денег." },
            // Directions
            { t: "Directions", no: "links", uk: "ліворуч", en: "left", ru: "налево", ex_no: "Biege links an der Ecke ab.", ex_uk: "Поверни ліворуч на розі.", en_ex: "Turn left at the corner.", ru_ex: "Поверни налево на углу." },
            { t: "Directions", no: "rechts", uk: "праворуч", en: "right", ru: "направо", ex_no: "Der Bahnhof ist rechts von dir.", ex_uk: "Вокзал праворуч від тебе.", en_ex: "The station is on your right.", ru_ex: "Вокзал справа от тебя." },
            { t: "Directions", no: "geradeaus", uk: "прямо", en: "straight", ru: "прямо", ex_no: "Geh geradeaus.", ex_uk: "Іди прямо.", en_ex: "Go straight ahead.", ru_ex: "Иди прямо." },
            { t: "Directions", no: "die Karte", uk: "карта", en: "map", ru: "карта", ex_no: "Kannst du es mir auf der Karte zeigen?", ex_uk: "Можеш показати мені на карті?", en_ex: "Can you show me on the map?", ru_ex: "Можешь показать мне на карте?" },
            // Work
            { t: "Work", no: "der Job", uk: "робота", en: "job", ru: "работа", ex_no: "Sie hat einen neuen Job gefunden.", ex_uk: "Вона знайшла нову роботу.", en_ex: "She found a new job.", ru_ex: "Она нашла новую работу." },
            { t: "Work", no: "das Büro", uk: "офіс", en: "office", ru: "офис", ex_no: "Ich arbeite in einem Büro.", ex_uk: "Я працюю в офісі.", en_ex: "I work in an office.", ru_ex: "Я работаю в офисе." },
            { t: "Work", no: "das Treffen", uk: "зустріч", en: "meeting", ru: "встреча", ex_no: "Wir haben um zehn ein Treffen.", ex_uk: "У нас зустріч о десятій.", en_ex: "We have a meeting at ten.", ru_ex: "У нас встреча в десять." },
            { t: "Work", no: "das Gehalt", uk: "зарплата", en: "salary", ru: "зарплата", ex_no: "Mein Gehalt ist gut.", ex_uk: "Моя зарплата хороша.", en_ex: "My salary is good.", ru_ex: "Моя зарплата хорошая." },
            // Hobbies
            { t: "Hobbies", no: "das Hobby", uk: "хобі", en: "hobby", ru: "хобби", ex_no: "Was ist dein Hobby?", ex_uk: "Яке твоє хобі?", en_ex: "What is your hobby?", ru_ex: "Какое у тебя хобби?" },
            { t: "Hobbies", no: "lesen", uk: "читати", en: "read", ru: "читать", ex_no: "Ich lese gerne Bücher.", ex_uk: "Я люблю читати книги.", en_ex: "I like to read books.", ru_ex: "Я люблю читать книги." },
            { t: "Hobbies", no: "reisen", uk: "подорожувати", en: "travel", ru: "путешествовать", ex_no: "Wir reisen gerne.", ex_uk: "Ми любимо подорожувати.", en_ex: "We love to travel.", ru_ex: "Мы любим путешествовать." },
            { t: "Hobbies", no: "die Musik", uk: "музика", en: "music", ru: "музыка", ex_no: "Ich höre jeden Tag Musik.", ex_uk: "Я слухаю музику щодня.", en_ex: "I listen to music every day.", ru_ex: "Я слушаю музыку каждый день." },
            // Weather
            { t: "Weather", no: "der Regen", uk: "дощ", en: "rain", ru: "дождь", ex_no: "Morgen wird es regnen.", ex_uk: "Завтра буде дощ.", en_ex: "It's going to rain tomorrow.", ru_ex: "Завтра будет дождь." },
            { t: "Weather", no: "der Schnee", uk: "сніг", en: "snow", ru: "снег", ex_no: "Im Winter schneit es.", ex_uk: "Взимку йде сніг.", en_ex: "It snows in winter.", ru_ex: "Зимой идёт снег." },
            { t: "Weather", no: "sonnig", uk: "сонячно", en: "sunny", ru: "солнечно", ex_no: "Heute ist es sonnig.", ex_uk: "Сьогодні сонячно.", en_ex: "It's sunny today.", ru_ex: "Сегодня солнечно." },
            { t: "Weather", no: "kalt", uk: "холодно", en: "cold", ru: "холодно", ex_no: "Draußen ist es kalt.", ex_uk: "На вулиці холодно.", en_ex: "It's cold outside.", ru_ex: "На улице холодно." },
            { t: "Weather", no: "heiß", uk: "спекотно", en: "hot", ru: "жарко", ex_no: "Im Sommer ist es sehr heiß.", ex_uk: "Влітку дуже спекотно.", en_ex: "It's very hot in summer.", ru_ex: "Летом очень жарко." },
            // Education
            { t: "Education", no: "die Schule", uk: "школа", en: "school", ru: "школа", ex_no: "Die Kinder gehen zur Schule.", ex_uk: "Діти ходять до школи.", en_ex: "The children go to school.", ru_ex: "Дети ходят в школу." },
            { t: "Education", no: "der Lehrer", uk: "вчитель", en: "teacher", ru: "учитель", ex_no: "Der Lehrer erklärt die Grammatik.", ex_uk: "Вчитель пояснює граматику.", en_ex: "The teacher explains grammar.", ru_ex: "Учитель объясняет грамматику." },
            { t: "Education", no: "der Student", uk: "студент", en: "student", ru: "студент", ex_no: "Sie ist Studentin an der Universität.", ex_uk: "Вона студентка університету.", en_ex: "She is a student at university.", ru_ex: "Она студентка университета." },
            { t: "Education", no: "die Prüfung", uk: "іспит", en: "exam", ru: "экзамен", ex_no: "Ich habe die Prüfung bestanden.", ex_uk: "Я склав іспит.", en_ex: "I passed the exam.", ru_ex: "Я сдал экзамен." },
            // Restaurant
            { t: "Restaurant", no: "die Speisekarte", uk: "меню", en: "menu", ru: "меню", ex_no: "Kann ich die Speisekarte haben?", ex_uk: "Можна меню?", en_ex: "Can I have the menu?", ru_ex: "Можно меню?" },
            { t: "Restaurant", no: "die Rechnung", uk: "рахунок", en: "bill", ru: "счёт", ex_no: "Können wir die Rechnung haben?", ex_uk: "Можна нам рахунок?", en_ex: "Can we have the bill?", ru_ex: "Можно нам счёт?" },
            { t: "Restaurant", no: "der Kellner", uk: "офіціант", en: "waiter", ru: "официант", ex_no: "Der Kellner ist freundlich.", ex_uk: "Офіціант привітний.", en_ex: "The waiter is friendly.", ru_ex: "Официант приветливый." },
            { t: "Restaurant", no: "bestellen", uk: "замовляти", en: "order", ru: "заказывать", ex_no: "Wir bestellen freitags Pizza.", ex_uk: "Ми замовляємо піцу в п'ятницю.", en_ex: "We order pizza on Friday.", ru_ex: "Мы заказываем пиццу в пятницу." },
            // Emotions
            { t: "Emotions", no: "glücklich", uk: "щасливий", en: "happy", ru: "счастливый", ex_no: "Sie fühlt sich heute glücklich.", ex_uk: "Вона сьогодні щаслива.", en_ex: "She feels happy today.", ru_ex: "Она сегодня счастлива." },
            { t: "Emotions", no: "traurig", uk: "сумний", en: "sad", ru: "грустный", ex_no: "Der traurige Film hat mich zum Weinen gebracht.", ex_uk: "Сумний фільм змусив мене плакати.", en_ex: "The sad movie made me cry.", ru_ex: "Грустный фильм заставил меня плакать." },
            { t: "Emotions", no: "wütend", uk: "злий", en: "angry", ru: "злой", ex_no: "Er wird wütend, wenn er zu spät kommt.", ex_uk: "Він злиться, коли запізнюється.", en_ex: "He gets angry when he is late.", ru_ex: "Он злится, когда опаздывает." },
            { t: "Emotions", no: "müde", uk: "втомлений", en: "tired", ru: "уставший", ex_no: "Ich fühle mich nach der Arbeit müde.", ex_uk: "Я почуваюся втомленим після роботи.", en_ex: "I feel tired after work.", ru_ex: "Я чувствую себя уставшим после работы." },
            // Past tense
            { t: "Past tense", no: "gegangen", uk: "пішов", en: "went", ru: "пошёл", ex_no: "Ich bin zur Arbeit gegangen.", ex_uk: "Я пішов на роботу.", en_ex: "I went to work.", ru_ex: "Я пошёл на работу." },
            { t: "Past tense", no: "besucht", uk: "відвідав", en: "visited", ru: "посетил", ex_no: "Wir haben Berlin besucht.", ex_uk: "Ми відвідали Берлін.", en_ex: "We visited Berlin.", ru_ex: "Мы посетили Берлин." },
            { t: "Past tense", no: "geblieben", uk: "зупинився", en: "stayed", ru: "остановился", ex_no: "Wir sind in einem guten Hotel geblieben.", ex_uk: "Ми зупинилися в хорошому готелі.", en_ex: "We stayed at a nice hotel.", ru_ex: "Мы остановились в хорошем отеле." },
            { t: "Past tense", no: "gegessen", uk: "поїв", en: "ate", ru: "поел", ex_no: "Ich habe einen Apfel gegessen.", ex_uk: "Я з'їв яблуко.", en_ex: "I ate an apple.", ru_ex: "Я съел яблоко." },
        ],

        // -------------------- B1 --------------------
        B1: [
            // Travel
            { t: "Travel", no: "der Flughafen", uk: "аеропорт", en: "airport", ru: "аэропорт", ex_no: "Wir treffen uns am Flughafen.", ex_uk: "Зустрінемось в аеропорту.", en_ex: "We meet at the airport.", ru_ex: "Встретимся в аэропорту." },
            { t: "Travel", no: "das Ticket", uk: "квиток", en: "ticket", ru: "билет", ex_no: "Ich habe ein Ticket online gebucht.", ex_uk: "Я забронював квиток онлайн.", en_ex: "I booked a ticket online.", ru_ex: "Я забронировал билет онлайн." },
            { t: "Travel", no: "das Hotel", uk: "готель", en: "hotel", ru: "отель", ex_no: "Das Hotel ist in der Nähe des Zentrums.", ex_uk: "Готель біля центру.", en_ex: "The hotel is near the center.", ru_ex: "Отель рядом с центром." },
            { t: "Travel", no: "der Pass", uk: "паспорт", en: "passport", ru: "паспорт", ex_no: "Vergiss deinen Pass nicht.", ex_uk: "Не забудь паспорт.", en_ex: "Don't forget your passport.", ru_ex: "Не забудь паспорт." },
            { t: "Travel", no: "das Gepäck", uk: "багаж", en: "luggage", ru: "багаж", ex_no: "Mein Gepäck ist schwer.", ex_uk: "Мій багаж важкий.", en_ex: "My luggage is heavy.", ru_ex: "Мой багаж тяжёлый." },
            { t: "Travel", no: "die Verspätung", uk: "затримка", en: "delay", ru: "задержка", ex_no: "Es gab eine Verspätung wegen des Wetters.", ex_uk: "Через погоду сталася затримка.", en_ex: "There was a delay due to bad weather.", ru_ex: "Из-за погоды произошла задержка." },
            { t: "Travel", no: "das Reiseziel", uk: "пункт призначення", en: "destination", ru: "назначение", ex_no: "Unser Reiseziel ist Berlin.", ex_uk: "Наш пункт призначення — Берлін.", en_ex: "Our destination is Berlin.", ru_ex: "Наш пункт назначения — Берлин." },
            { t: "Travel", no: "der Tourist", uk: "турист", en: "tourist", ru: "турист", ex_no: "Die Touristen besuchen das Museum.", ex_uk: "Туристи відвідують музей.", en_ex: "Tourists visit the museum.", ru_ex: "Туристы посещают музей." },
            // Health
            { t: "Health", no: "das Krankenhaus", uk: "лікарня", en: "hospital", ru: "больница", ex_no: "Er wurde ins Krankenhaus gebracht.", ex_uk: "Його відвезли до лікарні.", en_ex: "He was taken to the hospital.", ru_ex: "Его отвезли в больницу." },
            { t: "Health", no: "das Rezept", uk: "рецепт", en: "prescription", ru: "рецепт", ex_no: "Ich brauche ein Rezept für dieses Medikament.", ex_uk: "Мені потрібен рецепт на ці ліки.", en_ex: "I need a prescription for this medicine.", ru_ex: "Мне нужен рецепт на это лекарство." },
            { t: "Health", no: "die Versicherung", uk: "страхування", en: "insurance", ru: "страховка", ex_no: "Es ist klug, eine Reiseversicherung zu haben.", ex_uk: "Розумно мати туристичну страховку.", en_ex: "It's wise to have travel insurance.", ru_ex: "Разумно иметь туристическую страховку." },
            { t: "Health", no: "der Impfstoff", uk: "вакцина", en: "vaccine", ru: "вакцина", ex_no: "Kinder bekommen diesen Impfstoff kostenlos.", ex_uk: "Діти отримують цю вакцину безкоштовно.", en_ex: "Children get this vaccine for free.", ru_ex: "Дети получают эту вакцину бесплатно." },
            // Relationships
            { t: "Relationships", no: "der Freund", uk: "друг", en: "friend", ru: "друг", ex_no: "Er ist mein bester Freund.", ex_uk: "Він мій найкращий друг.", en_ex: "He is my best friend.", ru_ex: "Он мой лучший друг." },
            { t: "Relationships", no: "der Partner", uk: "партнер", en: "partner", ru: "партнёр", ex_no: "Ich habe meinen Partner meiner Familie vorgestellt.", ex_uk: "Я познайомив свого партнера з родиною.", en_ex: "I introduced my partner to my family.", ru_ex: "Я познакомил своего партнёра с семьёй." },
            { t: "Relationships", no: "die Ehe", uk: "шлюб", en: "marriage", ru: "брак", ex_no: "Sie haben zehn Jahre Ehe gefeiert.", ex_uk: "Вони відсвяткували десять років шлюбу.", en_ex: "They celebrated ten years of marriage.", ru_ex: "Они отпраздновали десять лет брака." },
            { t: "Relationships", no: "das Vertrauen", uk: "довіра", en: "trust", ru: "доверие", ex_no: "Vertrauen ist wichtig in einer Beziehung.", ex_uk: "Довіра важлива у стосунках.", en_ex: "Trust is important in a relationship.", ru_ex: "Доверие важно в отношениях." },
            // Media
            { t: "Media", no: "die Nachrichten", uk: "новини", en: "news", ru: "новости", ex_no: "Ich schaue jeden Abend die Nachrichten.", ex_uk: "Я дивлюся новини щовечора.", en_ex: "I watch the news every evening.", ru_ex: "Я смотрю новости каждый вечер." },
            { t: "Media", no: "die Zeitung", uk: "газета", en: "newspaper", ru: "газета", ex_no: "Er liest morgens die Zeitung.", ex_uk: "Він читає газету вранці.", en_ex: "He reads the newspaper in the morning.", ru_ex: "Он читает газету утром." },
            { t: "Media", no: "soziale Medien", uk: "соціальні мережі", en: "social media", ru: "социальные сети", ex_no: "Junge Leute verbringen Zeit in sozialen Medien.", ex_uk: "Молодь проводить час у соціальних мережах.", en_ex: "Young people spend time on social media.", ru_ex: "Молодёжь проводит время в социальных сетях." },
            { t: "Media", no: "der Podcast", uk: "подкаст", en: "podcast", ru: "подкаст", ex_no: "Ich höre Podcasts, während ich trainiere.", ex_uk: "Я слухаю подкасти під час тренування.", en_ex: "I listen to podcasts while exercising.", ru_ex: "Я слушаю подкасты во время тренировки." },
            // Environment
            { t: "Environment", no: "die Umwelt", uk: "довкілля", en: "environment", ru: "окружающая среда", ex_no: "Wir müssen die Umwelt schützen.", ex_uk: "Ми повинні захищати довкілля.", en_ex: "We must protect the environment.", ru_ex: "Мы должны защищать окружающую среду." },
            { t: "Environment", no: "das Klima", uk: "клімат", en: "climate", ru: "климат", ex_no: "Der Klimawandel ist ein globales Problem.", ex_uk: "Зміна клімату — глобальна проблема.", en_ex: "Climate change is a global problem.", ru_ex: "Изменение климата — глобальная проблема." },
            { t: "Environment", no: "die Verschmutzung", uk: "забруднення", en: "pollution", ru: "загрязнение", ex_no: "Die Verschmutzung schadet der Tierwelt.", ex_uk: "Забруднення шкодить дикій природі.", en_ex: "Pollution harms wildlife.", ru_ex: "Загрязнение вредит дикой природе." },
            { t: "Environment", no: "das Recycling", uk: "переробка", en: "recycling", ru: "переработка", ex_no: "Recycling ist wichtig.", ex_uk: "Переробка важлива.", en_ex: "Recycling is important.", ru_ex: "Переработка важна." },
            { t: "Environment", no: "der Müll", uk: "відходи", en: "waste", ru: "отходы", ex_no: "Wir sortieren den Müll in Kategorien.", ex_uk: "Ми сортуємо сміття за категоріями.", en_ex: "We sort waste into categories.", ru_ex: "Мы сортируем отходы по категориям." },
            // Verbs
            { t: "Verbs", no: "verstehen", uk: "розуміти", en: "understand", ru: "понимать", ex_no: "Ich verstehe nicht, was du meinst.", ex_uk: "Я не розумію, що ти маєш на увазі.", en_ex: "I don't understand what you mean.", ru_ex: "Я не понимаю, что ты имеешь в виду." },
            { t: "Verbs", no: "erklären", uk: "пояснювати", en: "explain", ru: "объяснять", ex_no: "Kannst du die Regel noch einmal erklären?", ex_uk: "Можеш пояснити правило ще раз?", en_ex: "Can you explain the rule again?", ru_ex: "Можешь объяснить правило ещё раз?" },
            { t: "Verbs", no: "glauben", uk: "вірити", en: "believe", ru: "верить", ex_no: "Ich glaube, sie hat recht.", ex_uk: "Я вірю, що вона має рацію.", en_ex: "I believe she is right.", ru_ex: "Я верю, что она права." },
            { t: "Verbs", no: "versuchen", uk: "пробувати", en: "try", ru: "пытаться", ex_no: "Ich versuche, Deutsch zu lernen.", ex_uk: "Я намагаюся вивчити німецьку.", en_ex: "I'm trying to learn German.", ru_ex: "Я пытаюсь выучить немецкий." },
            { t: "Verbs", no: "entscheiden", uk: "вирішувати", en: "decide", ru: "решать", ex_no: "Ich habe beschlossen, nach Berlin zu ziehen.", ex_uk: "Я вирішив переїхати до Берліна.", en_ex: "I decided to move to Berlin.", ru_ex: "Я решил переехать в Берлин." },
            { t: "Verbs", no: "vermeiden", uk: "уникати", en: "avoid", ru: "избегать", ex_no: "Wir sollten Risiken vermeiden.", ex_uk: "Нам слід уникати ризиків.", en_ex: "We should avoid risks.", ru_ex: "Нам следует избегать рисков." },
            // Career
            { t: "Career", no: "die Karriere", uk: "кар'єра", en: "career", ru: "карьера", ex_no: "Sie hat eine erfolgreiche Karriere.", ex_uk: "Вона має успішну кар'єру.", en_ex: "She has a successful career.", ru_ex: "У неё успешная карьера." },
            { t: "Career", no: "das Vorstellungsgespräch", uk: "співбесіда", en: "interview", ru: "собеседование", ex_no: "Das Vorstellungsgespräch ist gut gelaufen.", ex_uk: "Співбесіда пройшла добре.", en_ex: "The interview went well.", ru_ex: "Собеседование прошло хорошо." },
            { t: "Career", no: "der Kollege", uk: "колега", en: "colleague", ru: "коллега", ex_no: "Meine Kollegen sind freundlich.", ex_uk: "Мої колеги привітні.", en_ex: "My colleagues are friendly.", ru_ex: "Мои коллеги приветливы." },
            { t: "Career", no: "die Bewerbung", uk: "заявка", en: "application", ru: "заявка", ex_no: "Ich habe meine Bewerbung gestern eingereicht.", ex_uk: "Я подав заявку вчора.", en_ex: "I submitted my application yesterday.", ru_ex: "Я подал заявку вчера." },
        ],

        // -------------------- B2 --------------------
        B2: [
            // Politics
            { t: "Politics", no: "die Regierung", uk: "уряд", en: "government", ru: "правительство", ex_no: "Die Regierung hat einen neuen Haushalt vorgelegt.", ex_uk: "Уряд представив новий бюджет.", en_ex: "The government presented a new budget.", ru_ex: "Правительство представило новый бюджет." },
            { t: "Politics", no: "die Wahl", uk: "вибори", en: "election", ru: "выборы", ex_no: "Die Wahl ist nächsten Monat.", ex_uk: "Вибори наступного місяця.", en_ex: "The election is next month.", ru_ex: "Выборы в следующем месяце." },
            { t: "Politics", no: "die Demokratie", uk: "демократія", en: "democracy", ru: "демократия", ex_no: "Die Meinungsfreiheit ist ein Grundpfeiler der Demokratie.", ex_uk: "Свобода слова — основа демократії.", en_ex: "Freedom of speech is a cornerstone of democracy.", ru_ex: "Свобода слова — основа демократии." },
            { t: "Politics", no: "die Opposition", uk: "опозиція", en: "opposition", ru: "оппозиция", ex_no: "Die Opposition hat den Vorschlag kritisiert.", ex_uk: "Опозиція розкритикувала пропозицію.", en_ex: "The opposition criticized the proposal.", ru_ex: "Оппозиция раскритиковала предложение." },
            // Economy
            { t: "Economy", no: "die Wirtschaft", uk: "економіка", en: "economy", ru: "экономика", ex_no: "Die Wirtschaft wächst langsam.", ex_uk: "Економіка зростає повільно.", en_ex: "The economy is growing slowly.", ru_ex: "Экономика растёт медленно." },
            { t: "Economy", no: "der Markt", uk: "ринок", en: "market", ru: "рынок", ex_no: "Der Markt hat auf die Nachricht reagiert.", ex_uk: "Ринок відреагував на новину.", en_ex: "The market reacted to the news.", ru_ex: "Рынок отреагировал на новость." },
            { t: "Economy", no: "die Inflation", uk: "інфляція", en: "inflation", ru: "инфляция", ex_no: "Die Inflation ist stark gestiegen.", ex_uk: "Інфляція різко зросла.", en_ex: "Inflation has risen sharply.", ru_ex: "Инфляция резко выросла." },
            { t: "Economy", no: "die Investition", uk: "інвестиція", en: "investment", ru: "инвестиция", ex_no: "Langfristige Investitionen sind wichtig.", ex_uk: "Довгострокові інвестиції важливі.", en_ex: "Long-term investment is important.", ru_ex: "Долгосрочные инвестиции важны." },
            // Science
            { t: "Science", no: "die Forschung", uk: "дослідження", en: "research", ru: "исследование", ex_no: "Neue Forschung zeigt überraschende Ergebnisse.", ex_uk: "Нове дослідження показує несподівані результати.", en_ex: "New research shows surprising results.", ru_ex: "Новое исследование показывает неожиданные результаты." },
            { t: "Science", no: "die Theorie", uk: "теорія", en: "theory", ru: "теория", ex_no: "Die Theorie wurde durch Experimente bestätigt.", ex_uk: "Теорію підтвердили експерименти.", en_ex: "The theory was confirmed by experiments.", ru_ex: "Теорию подтвердили эксперименты." },
            { t: "Science", no: "das Experiment", uk: "експеримент", en: "experiment", ru: "эксперимент", ex_no: "Sie führten ein kontrolliertes Experiment durch.", ex_uk: "Вони провели контрольований експеримент.", en_ex: "They conducted a controlled experiment.", ru_ex: "Они провели контролируемый эксперимент." },
            { t: "Science", no: "die Daten", uk: "дані", en: "data", ru: "данные", ex_no: "Die Daten wurden über mehrere Monate gesammelt.", ex_uk: "Дані збирали протягом кількох місяців.", en_ex: "Data was collected over several months.", ru_ex: "Данные собирали в течение нескольких месяцев." },
            // Culture
            { t: "Culture", no: "die Kunst", uk: "мистецтво", en: "art", ru: "искусство", ex_no: "Die Ausstellung zeigt moderne Kunst.", ex_uk: "Виставка демонструє сучасне мистецтво.", en_ex: "The exhibition shows modern art.", ru_ex: "Выставка демонстрирует современное искусство." },
            { t: "Culture", no: "die Literatur", uk: "література", en: "literature", ru: "литература", ex_no: "Sie studiert deutsche Literatur.", ex_uk: "Вона вивчає німецьку літературу.", en_ex: "She studies German literature.", ru_ex: "Она изучает немецкую литературу." },
            { t: "Culture", no: "der Autor", uk: "автор", en: "author", ru: "автор", ex_no: "Der Autor hat Anerkennung erhalten.", ex_uk: "Автор отримав визнання.", en_ex: "The author received recognition.", ru_ex: "Автор получил признание." },
            // Verbs
            { t: "Verbs", no: "beeinflussen", uk: "впливати", en: "influence", ru: "влиять", ex_no: "Die Medien beeinflussen die öffentliche Meinung.", ex_uk: "ЗМІ впливають на громадську думку.", en_ex: "The media influences public opinion.", ru_ex: "СМИ влияют на общественное мнение." },
            { t: "Verbs", no: "bewerten", uk: "оцінювати", en: "assess", ru: "оценивать", ex_no: "Wir müssen die Situation bewerten.", ex_uk: "Нам потрібно оцінити ситуацію.", en_ex: "We need to assess the situation.", ru_ex: "Нам нужно оценить ситуацию." },
            { t: "Verbs", no: "entwickeln", uk: "розвивати", en: "develop", ru: "развивать", ex_no: "Das Unternehmen entwickelt neue Produkte.", ex_uk: "Компанія розробляє нові продукти.", en_ex: "The company is developing new products.", ru_ex: "Компания разрабатывает новые продукты." },
            { t: "Verbs", no: "präsentieren", uk: "представляти", en: "present", ru: "представлять", ex_no: "Sie hat die Ergebnisse dem Vorstand präsentiert.", ex_uk: "Вона представила результати правлінню.", en_ex: "She presented the results to the board.", ru_ex: "Она представила результаты правлению." },
            { t: "Verbs", no: "analysieren", uk: "аналізувати", en: "analyze", ru: "анализировать", ex_no: "Wir müssen die Daten analysieren.", ex_uk: "Нам потрібно проаналізувати дані.", en_ex: "We need to analyze the data.", ru_ex: "Нам нужно проанализировать данные." },
            // Business
            { t: "Business", no: "das Unternehmen", uk: "підприємство", en: "business", ru: "бизнес", ex_no: "Das Unternehmen läuft dieses Jahr gut.", ex_uk: "Цього року бізнес іде добре.", en_ex: "Business is going well this year.", ru_ex: "В этом году бизнес идёт хорошо." },
            { t: "Business", no: "die Strategie", uk: "стратегія", en: "strategy", ru: "стратегия", ex_no: "Wir brauchen eine neue Strategie.", ex_uk: "Нам потрібна нова стратегія.", en_ex: "We need a new strategy.", ru_ex: "Нам нужна новая стратегия." },
            { t: "Business", no: "der Wettbewerb", uk: "конкуренція", en: "competition", ru: "конкуренция", ex_no: "Der Wettbewerb ist hart.", ex_uk: "Конкуренція є жорсткою.", en_ex: "Competition is intense.", ru_ex: "Конкуренция жёсткая." },
            // Medicine
            { t: "Medicine", no: "das Symptom", uk: "симптом", en: "symptom", ru: "симптом", ex_no: "Fieber ist ein häufiges Symptom.", ex_uk: "Температура — поширений симптом.", en_ex: "Fever is a common symptom.", ru_ex: "Температура — распространённый симптом." },
            { t: "Medicine", no: "chronisch", uk: "хронічний", en: "chronic", ru: "хронический", ex_no: "Er hat eine chronische Krankheit.", ex_uk: "Він має хронічну хворобу.", en_ex: "He has a chronic illness.", ru_ex: "У него хроническое заболевание." },
            { t: "Medicine", no: "die Epidemie", uk: "епідемія", en: "epidemic", ru: "эпидемия", ex_no: "Die Epidemie breitete sich schnell aus.", ex_uk: "Епідемія швидко поширилася.", en_ex: "The epidemic spread quickly.", ru_ex: "Эпидемия быстро распространилась." },
            { t: "Medicine", no: "die Prävention", uk: "профілактика", en: "prevention", ru: "профилактика", ex_no: "Prävention ist besser als Heilung.", ex_uk: "Профілактика краща за лікування.", en_ex: "Prevention is better than cure.", ru_ex: "Профилактика лучше лечения." },
        ],

        // -------------------- C1 --------------------
        C1: [
            // Discourse
            { t: "Discourse", no: "jedoch", uk: "однак", en: "however", ru: "однако", ex_no: "Die Ergebnisse waren vielversprechend; jedoch gibt es noch viel zu tun.", ex_uk: "Результати були обнадійливі; однак роботи ще багато.", en_ex: "The results were promising; however, there is still work to do.", ru_ex: "Результаты были обнадёживающими; однако работы ещё много." },
            { t: "Discourse", no: "außerdem", uk: "крім того", en: "moreover", ru: "кроме того", ex_no: "Das Projekt ist teuer und außerdem zeitaufwändig.", ex_uk: "Проєкт дорогий, і до того ж забирає багато часу.", en_ex: "The project is expensive, and moreover time-consuming.", ru_ex: "Проект дорогой, и к тому же отнимает много времени." },
            { t: "Discourse", no: "folglich", uk: "отже", en: "consequently", ru: "следовательно", ex_no: "Die Nachfrage sank, und folglich fielen die Preise.", ex_uk: "Попит впав, і ціни, відповідно, знизилися.", en_ex: "Demand fell, and prices consequently dropped.", ru_ex: "Спрос упал, и цены, соответственно, снизились." },
            { t: "Discourse", no: "trotz", uk: "незважаючи на", en: "despite", ru: "несмотря на", ex_no: "Trotz der Schwierigkeiten haben sie das Projekt abgeschlossen.", ex_uk: "Незважаючи на труднощі, вони завершили проєкт.", en_ex: "Despite the challenges, they completed the project.", ru_ex: "Несмотря на трудности, они завершили проект." },
            { t: "Discourse", no: "mit anderen Worten", uk: "іншими словами", en: "in other words", ru: "другими словами", ex_no: "Mit anderen Worten, die Situation ist komplizierter.", ex_uk: "Іншими словами, ситуація складніша.", en_ex: "In other words, the situation is more complicated.", ru_ex: "Другими словами, ситуация сложнее." },
            // Nuance
            { t: "Nuance", no: "andeuten", uk: "натякати", en: "imply", ru: "намекать", ex_no: "Der Bericht deutet an, dass mehrere Faktoren eine Rolle spielen.", ex_uk: "Звіт натякає, що діють кілька факторів.", en_ex: "The report implies that several factors are at play.", ru_ex: "Отчёт намекает, что действуют несколько факторов." },
            { t: "Nuance", no: "betonen", uk: "підкреслювати", en: "emphasize", ru: "подчёркивать", ex_no: "Der Redner betonte die Bedeutung der Zusammenarbeit.", ex_uk: "Доповідач підкреслив важливість співпраці.", en_ex: "The speaker emphasized the importance of cooperation.", ru_ex: "Докладчик подчеркнул важность сотрудничества." },
            { t: "Nuance", no: "untermauern", uk: "обґрунтовувати", en: "substantiate", ru: "обосновывать", ex_no: "Du musst deine Behauptung mit Beweisen untermauern.", ex_uk: "Тобі потрібно обґрунтувати своє твердження доказами.", en_ex: "You need to substantiate your claim with evidence.", ru_ex: "Тебе нужно обосновать своё утверждение доказательствами." },
            { t: "Nuance", no: "differenziert", uk: "нюансований", en: "nuanced", ru: "нюансированный", ex_no: "Die Debatte erfordert einen differenzierteren Ansatz.", ex_uk: "Дебати потребують більш нюансованого підходу.", en_ex: "The debate requires a more nuanced approach.", ru_ex: "Дебаты требуют более нюансированного подхода." },
            { t: "Nuance", no: "umfassend", uk: "всеохопний", en: "comprehensive", ru: "всеобъемлющий", ex_no: "Dies ist eine umfassende Studie.", ex_uk: "Це всеохопне дослідження.", en_ex: "This is a comprehensive study.", ru_ex: "Это всеобъемлющее исследование." },
            // Academic
            { t: "Academic", no: "die Hypothese", uk: "гіпотеза", en: "hypothesis", ru: "гипотеза", ex_no: "Die Forscher haben die Hypothese getestet.", ex_uk: "Науковці перевірили гіпотезу.", en_ex: "The researchers tested the hypothesis.", ru_ex: "Учёные проверили гипотезу." },
            { t: "Academic", no: "die Methodik", uk: "методологія", en: "methodology", ru: "методология", ex_no: "Die Methodik wird klar beschrieben.", ex_uk: "Методологія чітко описана.", en_ex: "The methodology is clearly described.", ru_ex: "Методология четко описана." },
            { t: "Academic", no: "die Perspektive", uk: "перспектива", en: "perspective", ru: "перспектива", ex_no: "Aus historischer Perspektive war das Ereignis bedeutend.", ex_uk: "З історичної перспективи подія була значущою.", en_ex: "From a historical perspective, the event was significant.", ru_ex: "С исторической точки зрения событие было значимым." },
            { t: "Academic", no: "die Quellenkritik", uk: "критика джерел", en: "source criticism", ru: "критика источников", ex_no: "Eine gute Quellenkritik ist entscheidend.", ex_uk: "Гарна критика джерел є вирішальною.", en_ex: "Good source criticism is crucial.", ru_ex: "Хорошая критика источников имеет решающее значение." },
            // Philosophy
            { t: "Philosophy", no: "die Existenz", uk: "існування", en: "existence", ru: "существование", ex_no: "Die Frage nach der Existenz ist ewig.", ex_uk: "Питання про існування вічне.", en_ex: "The question of existence is eternal.", ru_ex: "Вопрос о существовании вечен." },
            { t: "Philosophy", no: "das Bewusstsein", uk: "свідомість", en: "consciousness", ru: "сознание", ex_no: "Das Bewusstsein ist ein komplexes Phänomen.", ex_uk: "Свідомість — складне явище.", en_ex: "Consciousness is a complex phenomenon.", ru_ex: "Сознание — сложное явление." },
            { t: "Philosophy", no: "die Ethik", uk: "етика", en: "ethics", ru: "этика", ex_no: "Ethik befasst sich mit dem, was richtig und falsch ist.", ex_uk: "Етика стосується того, що правильно, а що ні.", en_ex: "Ethics deals with what is right and wrong.", ru_ex: "Этика касается того, что правильно, а что нет." },
            // Linguistics
            { t: "Linguistics", no: "die Syntax", uk: "синтаксис", en: "syntax", ru: "синтаксис", ex_no: "Syntax ist die Lehre vom Satzbau.", ex_uk: "Синтаксис — це вивчення структури речень.", en_ex: "Syntax is the study of sentence structure.", ru_ex: "Синтаксис — это изучение структуры предложений." },
            { t: "Linguistics", no: "die Semantik", uk: "семантика", en: "semantics", ru: "семантика", ex_no: "Die Semantik befasst sich mit der Bedeutung.", ex_uk: "Семантика займається значенням.", en_ex: "Semantics deals with meaning.", ru_ex: "Семантика занимается значением." },
            // Sociology
            { t: "Sociology", no: "die soziale Ungleichheit", uk: "соціальна нерівність", en: "social inequality", ru: "социальное неравенство", ex_no: "Soziale Ungleichheit ist ein großes Problem.", ex_uk: "Соціальна нерівність — велика проблема.", en_ex: "Social inequality is a major problem.", ru_ex: "Социальное неравенство — большая проблема." },
            { t: "Sociology", no: "die Integration", uk: "інтеграція", en: "integration", ru: "интеграция", ex_no: "Die Integration von Einwanderern ist wichtig.", ex_uk: "Інтеграція іммігрантів важлива.", en_ex: "Integration of immigrants is important.", ru_ex: "Интеграция иммигрантов важна." },
            { t: "Sociology", no: "die Vielfalt", uk: "різноманіття", en: "diversity", ru: "разнообразие", ex_no: "Vielfalt bereichert die Gesellschaft.", ex_uk: "Різноманіття збагачує суспільство.", en_ex: "Diversity enriches society.", ru_ex: "Разнообразие обогащает общество." },
            // Psychology
            { t: "Psychology", no: "die Kognition", uk: "когніція", en: "cognition", ru: "когниция", ex_no: "Kognition umfasst Denken und Gedächtnis.", ex_uk: "Когніція охоплює мислення та пам'ять.", en_ex: "Cognition includes thinking and memory.", ru_ex: "Когниция охватывает мышление и память." },
            { t: "Psychology", no: "die Emotion", uk: "емоція", en: "emotion", ru: "эмоция", ex_no: "Emotionen beeinflussen unsere Entscheidungen.", ex_uk: "Емоції впливають на наш вибір.", en_ex: "Emotions influence our choices.", ru_ex: "Эмоции влияют на наш выбор." },
            { t: "Psychology", no: "das Verhalten", uk: "поведінка", en: "behavior", ru: "поведение", ex_no: "Sein Verhalten war unerwartet.", ex_uk: "Його поведінка була несподіваною.", en_ex: "His behavior was unexpected.", ru_ex: "Его поведение было неожиданным." },
            { t: "Psychology", no: "die Motivation", uk: "мотивація", en: "motivation", ru: "мотивация", ex_no: "Motivation kommt von innen.", ex_uk: "Мотивація походить зсередини.", en_ex: "Motivation comes from within.", ru_ex: "Мотивация исходит изнутри." },
        ],

        // -------------------- C2 --------------------
        C2: [
            // Idioms
            { t: "Idioms", no: "zwei Fliegen mit einer Klappe schlagen", uk: "убити двох зайців", en: "to kill two birds with one stone", ru: "убить двух зайцев", ex_no: "Indem ich von zu Hause aus arbeite, schlage ich zwei Fliegen mit einer Klappe.", ex_uk: "Працюючи з дому, я вбиваю двох зайців.", en_ex: "By working from home I kill two birds with one stone.", ru_ex: "Работая из дома, я убиваю двух зайцев." },
            { t: "Idioms", no: "in den sauren Apfel beißen", uk: "проковтнути гірку пігулку", en: "to bite the bullet", ru: "проглотить горькую пилюлю", ex_no: "Ich musste in den sauren Apfel beißen und zugeben, dass ich falsch lag.", ex_uk: "Мені довелося проковтнути гірку пігулку і визнати, що я помилявся.", en_ex: "I had to bite the bullet and admit I was wrong.", ru_ex: "Мне пришлось проглотить горькую пилюлю и признать, что я ошибался." },
            { t: "Idioms", no: "Perlen vor die Säue werfen", uk: "метати бісер перед свинями", en: "to cast pearls before swine", ru: "метать бисер перед свиньями", ex_no: "Ihm das zu erklären ist wie Perlen vor die Säue zu werfen.", ex_uk: "Пояснювати йому це — все одно що метати бісер перед свинями.", en_ex: "Explaining it to him is like casting pearls before swine.", ru_ex: "Объяснять ему это — всё равно что метать бисер перед свиньями." },
            { t: "Idioms", no: "großen Einfluss haben", uk: "мати великий вплив", en: "to hold great sway", ru: "иметь большое влияние", ex_no: "Er hat großen Einfluss in der Branche.", ex_uk: "Він має величезний вплив у галузі.", en_ex: "He holds great sway in the industry.", ru_ex: "Он имеет большое влияние в отрасли." },
            { t: "Idioms", no: "ein düsteres Bild malen", uk: "згущувати фарби", en: "to paint a bleak picture", ru: "сгущать краски", ex_no: "Male kein düsteres Bild; es wird sich schon regeln.", ex_uk: "Не згущуй фарби; все владнається.", en_ex: "Don't paint a bleak picture; it'll work out.", ru_ex: "Не сгущай краски; всё уладится." },
            { t: "Idioms", no: "das Handtuch werfen", uk: "здатися", en: "to throw in the towel", ru: "сдаться", ex_no: "Nach mehreren Niederlagen warf er das Handtuch.", ex_uk: "Після кількох поразок він здався.", en_ex: "After several defeats, he threw in the towel.", ru_ex: "После нескольких поражений он сдался." },
            // Stylistics
            { t: "Stylistics", no: "die Fiktion", uk: "художня література", en: "fiction", ru: "художественная литература", ex_no: "Sie bevorzugt Fiktion gegenüber Sachbüchern.", ex_uk: "Вона надає перевагу художній літературі перед науковою.", en_ex: "She prefers fiction to non-fiction.", ru_ex: "Она предпочитает художественную литературу научной." },
            { t: "Stylistics", no: "die Satire", uk: "сатира", en: "satire", ru: "сатира", ex_no: "Die Sendung nutzt Satire, um Politik zu kommentieren.", ex_uk: "Шоу використовує сатиру для коментування політики.", en_ex: "The show uses satire to comment on politics.", ru_ex: "Шоу использует сатиру для комментирования политики." },
            { t: "Stylistics", no: "die Ironie", uk: "іронія", en: "irony", ru: "ирония", ex_no: "Sein Kommentar war ironisch gemeint.", ex_uk: "Його коментар був іронією.", en_ex: "His comment was ironic.", ru_ex: "Его комментарий был иронией." },
            // Rare vocabulary
            { t: "Rare vocabulary", no: "vergänglich", uk: "минущий", en: "transient", ru: "преходящий", ex_no: "Ruhm kann vergänglich sein.", ex_uk: "Слава може бути минущою.", en_ex: "Fame can be transient.", ru_ex: "Слава может быть преходящей." },
            { t: "Rare vocabulary", no: "unberechenbar", uk: "непередбачуваний", en: "unpredictable", ru: "непредсказуемый", ex_no: "Das Wetter ist unberechenbar.", ex_uk: "Погода непередбачувана.", en_ex: "The weather is unpredictable.", ru_ex: "Погода непредсказуема." },
            { t: "Rare vocabulary", no: "unvermeidlich", uk: "неминучий", en: "inevitable", ru: "неизбежный", ex_no: "Der Konflikt schien unvermeidlich.", ex_uk: "Конфлікт здавався неминучим.", en_ex: "The conflict seemed inevitable.", ru_ex: "Конфликт казался неизбежным." },
            // Rhetoric
            { t: "Rhetoric", no: "die Rhetorik", uk: "риторика", en: "rhetoric", ru: "риторика", ex_no: "Rhetorik ist die Kunst der Überzeugung.", ex_uk: "Риторика — це мистецтво переконання.", en_ex: "Rhetoric is the art of persuasion.", ru_ex: "Риторика — это искусство убеждения." },
            { t: "Rhetoric", no: "die Argumentation", uk: "аргументація", en: "argumentation", ru: "аргументация", ex_no: "Seine Argumentation war solide.", ex_uk: "Його аргументація була вагомою.", en_ex: "His argumentation was solid.", ru_ex: "Его аргументация была убедительной." },
            { t: "Rhetoric", no: "der Appell", uk: "звернення", en: "appeal", ru: "апелляция", ex_no: "Der Appell an die Emotionen war stark.", ex_uk: "Звернення до емоцій було сильним.", en_ex: "The appeal to emotions was strong.", ru_ex: "Обращение к эмоциям было сильным." },
            // Literary
            { t: "Literary", no: "das Motiv", uk: "мотив", en: "motif", ru: "мотив", ex_no: "Die Liebe ist ein zentrales Motiv im Buch.", ex_uk: "Кохання — центральний мотив у книзі.", en_ex: "Love is a central motif in the book.", ru_ex: "Любовь — центральный мотив в книге." },
            { t: "Literary", no: "das Thema", uk: "тема", en: "theme", ru: "тема", ex_no: "Das Thema des Romans ist die Einsamkeit.", ex_uk: "Тема роману — самотність.", en_ex: "The theme of the novel is loneliness.", ru_ex: "Тема романа — одиночество." },
            { t: "Literary", no: "die Symbolik", uk: "символіка", en: "symbolism", ru: "символика", ex_no: "Das Gedicht ist reich an Symbolik.", ex_uk: "Вірш багатий на символіку.", en_ex: "The poem is rich in symbolism.", ru_ex: "Стихотворение богато на символику." },
            // Abstract
            { t: "Abstract", no: "der Kontrast", uk: "контраст", en: "contrast", ru: "контраст", ex_no: "Der Kontrast zwischen Arm und Reich ist groß.", ex_uk: "Контраст між багатими та бідними великий.", en_ex: "The contrast between rich and poor is stark.", ru_ex: "Контраст между богатыми и бедными велик." },
            { t: "Abstract", no: "ausschließen", uk: "виключати", en: "exclude", ru: "исключать", ex_no: "Wir dürfen niemanden ausschließen.", ex_uk: "Ми не повинні нікого виключати.", en_ex: "We must not exclude anyone.", ru_ex: "Мы не должны никого исключать." },
            { t: "Abstract", no: "einschließen", uk: "включати", en: "include", ru: "включать", ex_no: "Alle sollten eingeschlossen werden.", ex_uk: "Усі повинні бути включені.", en_ex: "Everyone should be included.", ru_ex: "Все должны быть включены." },
            { t: "Abstract", no: "der Kontext", uk: "контекст", en: "context", ru: "контекст", ex_no: "Ohne Kontext ist es schwer zu verstehen.", ex_uk: "Без контексту важко зрозуміти.", en_ex: "Without context, it's hard to understand.", ru_ex: "Без контекста трудно понять." },
            { t: "Abstract", no: "widerspiegeln", uk: "відображати", en: "reflect", ru: "отражать", ex_no: "Das Gespräch spiegelt den gesellschaftlichen Wandel wider.", ex_uk: "Розмова відображає соціальні зміни.", en_ex: "The conversation reflects social changes.", ru_ex: "Разговор отражает социальные изменения." },
            { t: "Abstract", no: "ausführen", uk: "деталізувати", en: "elaborate", ru: "детализировать", ex_no: "Kannst du diesen Punkt näher ausführen?", ex_uk: "Можеш детальніше розкрити цей пункт?", en_ex: "Can you elaborate on that point?", ru_ex: "Можешь детальнее раскрыть этот пункт?" },
        ],
    };

    // =====================================================================
    //  GRAMMAR – НІМЕЦЬКА ГРАМАТИКА (A1-C2)
    // =====================================================================
    const GRAMMAR = [
        // A1
        {
            id: "de_gr1", level: "A1",
            title: "sein und haben (Präsens)",
            exp: "Die Verben sein und haben sind grundlegend. Sein beschreibt, haben drückt Besitz aus.",
            table: { head: ["Pronomen", "sein", "haben"], rows: [["ich", "bin", "habe"], ["du", "bist", "hast"], ["er/sie/es", "ist", "hat"], ["wir", "sind", "haben"], ["ihr", "seid", "habt"], ["sie/Sie", "sind", "haben"]] },
            ex: { q: "Ich ___ Student.", opts: ["bin", "habe", "ist"], a: 0 },
            title_en: "sein and haben (present)",
            title_ru: "Глаголы sein и haben (настоящее время)",
            exp_en: "The verbs sein and haben are fundamental. Sein describes, haben expresses possession.",
            exp_ru: "Глаголы sein и haben являются фундаментальными. Sein описывает, haben выражает обладание.",
            head_en: ["Pronoun", "sein", "haben"],
            head_ru: ["Местоимение", "sein", "haben"],
            q_en: "Ich ___ Student.",
            q_ru: "Ich ___ Student.",
        },
        {
            id: "de_gr2", level: "A1",
            title: "Bestimmter und unbestimmter Artikel",
            exp: "Der bestimmte Artikel (der, die, das) und der unbestimmte Artikel (ein, eine) richten sich nach dem Genus.",
            table: { head: ["Genus", "bestimmt", "unbestimmt"], rows: [["Maskulin", "der", "ein"], ["Feminin", "die", "eine"], ["Neutrum", "das", "ein"]] },
            ex: { q: "___ Auto ist neu.", opts: ["Der", "Die", "Das"], a: 2 },
            title_en: "Definite and indefinite articles",
            title_ru: "Определённый и неопределённый артикль",
            exp_en: "The definite article (der, die, das) and indefinite article (ein, eine) depend on the gender.",
            exp_ru: "Определённый артикль (der, die, das) и неопределённый (ein, eine) зависят от рода.",
            head_en: ["Gender", "definite", "indefinite"],
            head_ru: ["Род", "определённый", "неопределённый"],
            q_en: "___ Auto ist neu.",
            q_ru: "___ Auto ist neu.",
        },
        // A2
        {
            id: "de_gr3", level: "A2",
            title: "Perfekt (haben/sein + Partizip II)",
            exp: "Das Perfekt wird mit haben oder sein und dem Partizip II gebildet. Sein wird bei Bewegungsverben und Zustandsveränderung verwendet.",
            table: { head: ["Verb", "Perfekt"], rows: [["machen", "habe gemacht"], ["gehen", "bin gegangen"], ["fahren", "bin gefahren"]] },
            ex: { q: "Ich ___ gestern einen Kuchen gebacken.", opts: ["habe", "bin", "hat"], a: 0 },
            title_en: "Perfekt (haben/sein + past participle)",
            title_ru: "Perfekt (haben/sein + Partizip II)",
            exp_en: "Perfekt is formed with haben or sein and the past participle. Sein is used with verbs of movement and change of state.",
            exp_ru: "Perfekt образуется с haben или sein и Partizip II. Sein используется с глаголами движения и изменения состояния.",
            head_en: ["Verb", "Perfekt"],
            head_ru: ["Глагол", "Perfekt"],
            q_en: "Ich ___ gestern einen Kuchen gebacken.",
            q_ru: "Ich ___ gestern einen Kuchen gebacken.",
        },
        {
            id: "de_gr4", level: "A2",
            title: "Modalverben (können, müssen, wollen, sollen, dürfen)",
            exp: "Modalverben drücken Fähigkeit, Notwendigkeit, Wunsch, Erlaubnis aus. Sie stehen mit dem Infinitiv am Ende.",
            table: { head: ["Modalverb", "Bedeutung"], rows: [["können", "Fähigkeit"], ["müssen", "Notwendigkeit"], ["wollen", "Wunsch"], ["sollen", "Aufforderung"], ["dürfen", "Erlaubnis"]] },
            ex: { q: "Ich ___ Deutsch sprechen.", opts: ["kann", "muss", "will"], a: 0 },
            title_en: "Modal verbs (können, müssen, wollen, sollen, dürfen)",
            title_ru: "Модальные глаголы (können, müssen, wollen, sollen, dürfen)",
            exp_en: "Modal verbs express ability, necessity, desire, permission. They are used with the infinitive at the end.",
            exp_ru: "Модальные глаголы выражают способность, необходимость, желание, разрешение. Они используются с инфинитивом в конце.",
            head_en: ["Modalverb", "Meaning"],
            head_ru: ["Модальный глагол", "Значение"],
            q_en: "Ich ___ Deutsch sprechen.",
            q_ru: "Ich ___ Deutsch sprechen.",
        },
        // B1
        {
            id: "de_gr5", level: "B1",
            title: "Nebensätze (weil, dass, obwohl)",
            exp: "Nebensätze werden durch Konjunktionen eingeleitet und das Verb steht am Ende.",
            table: { head: ["Konjunktion", "Beispiel"], rows: [["weil", "Ich bleibe zu Hause, weil es regnet."], ["dass", "Ich denke, dass er recht hat."], ["obwohl", "Obwohl es regnet, gehe ich spazieren."]] },
            ex: { q: "Ich bleibe zu Hause, ___ es regnet.", opts: ["weil", "dass", "obwohl"], a: 0 },
            title_en: "Subordinate clauses (weil, dass, obwohl)",
            title_ru: "Придаточные предложения (weil, dass, obwohl)",
            exp_en: "Subordinate clauses are introduced by conjunctions and the verb is placed at the end.",
            exp_ru: "Придаточные предложения вводятся союзами, и глагол стоит в конце.",
            head_en: ["Conjunction", "Example"],
            head_ru: ["Союз", "Пример"],
            q_en: "Ich bleibe zu Hause, ___ es regnet.",
            q_ru: "Ich bleibe zu Hause, ___ es regnet.",
        },
        {
            id: "de_gr6", level: "B1",
            title: "Futur I (werden + Infinitiv)",
            exp: "Das Futur I wird mit werden + Infinitiv gebildet und drückt Zukunft oder Vermutung aus.",
            table: { head: ["Person", "Futur"], rows: [["ich", "werde lernen"], ["du", "wirst lernen"], ["er/sie/es", "wird lernen"]] },
            ex: { q: "Ich ___ morgen nach Berlin fahren.", opts: ["werde", "wirst", "wird"], a: 0 },
            title_en: "Futur I (werden + infinitive)",
            title_ru: "Futur I (werden + инфинитив)",
            exp_en: "Futur I is formed with werden + infinitive and expresses future or assumption.",
            exp_ru: "Futur I образуется с werden + инфинитив и выражает будущее или предположение.",
            head_en: ["Person", "Futur"],
            head_ru: ["Лицо", "Futur"],
            q_en: "Ich ___ morgen nach Berlin fahren.",
            q_ru: "Ich ___ morgen nach Berlin fahren.",
        },
        // B2
        {
            id: "de_gr7", level: "B2",
            title: "Passiv (werden + Partizip II)",
            exp: "Das Passiv wird mit werden + Partizip II gebildet. Das Subjekt der Handlung wird zum Objekt.",
            table: { head: ["Aktiv", "Passiv"], rows: [["Der Mechaniker repariert das Auto.", "Das Auto wird repariert."]] },
            ex: { q: "Die Brücke ___ von den Arbeitern gebaut.", opts: ["wird", "werden", "wurde"], a: 0 },
            title_en: "Passive voice (werden + past participle)",
            title_ru: "Пассивный залог (werden + Partizip II)",
            exp_en: "The passive voice is formed with werden + past participle. The subject of the action becomes the object.",
            exp_ru: "Пассивный залог образуется с werden + Partizip II. Субъект действия становится объектом.",
            head_en: ["Active", "Passive"],
            head_ru: ["Актив", "Пассив"],
            q_en: "Die Brücke ___ von den Arbeitern gebaut.",
            q_ru: "Die Brücke ___ von den Arbeitern gebaut.",
        },
        {
            id: "de_gr8", level: "B2",
            title: "Konjunktiv II (würde + Infinitiv)",
            exp: "Der Konjunktiv II wird für höfliche Bitten, irreale Wünsche und Konditionalsätze verwendet.",
            table: { head: ["Konjunktiv II"], rows: [["Ich würde gerne kommen."], ["Wenn ich Zeit hätte, würde ich reisen."]] },
            ex: { q: "Wenn ich mehr Zeit hätte, ___ ich mehr reisen.", opts: ["würde", "werde", "würde"], a: 0 },
            title_en: "Konjunktiv II (würde + infinitive)",
            title_ru: "Konjunktiv II (würde + инфинитив)",
            exp_en: "Konjunktiv II is used for polite requests, unreal wishes, and conditional clauses.",
            exp_ru: "Konjunktiv II используется для вежливых просьб, нереальных желаний и условных предложений.",
            head_en: ["Konjunktiv II"],
            head_ru: ["Konjunktiv II"],
            q_en: "Wenn ich mehr Zeit hätte, ___ ich mehr reisen.",
            q_ru: "Wenn ich mehr Zeit hätte, ___ ich mehr reisen.",
        },
        // C1
        {
            id: "de_gr9", level: "C1",
            title: "Konjunktiv I (indirekte Rede)",
            exp: "Der Konjunktiv I wird in der indirekten Rede verwendet, um die Aussage einer anderen Person wiederzugeben.",
            table: { head: ["Direkte Rede", "Indirekte Rede"], rows: [["Er sagt: 'Ich komme.'", "Er sagt, er komme."]] },
            ex: { q: "Sie sagt, sie ___ morgen kommen.", opts: ["kommt", "käme", "komme"], a: 2 },
            title_en: "Konjunktiv I (indirect speech)",
            title_ru: "Konjunktiv I (косвенная речь)",
            exp_en: "Konjunktiv I is used in indirect speech to report someone else's statement.",
            exp_ru: "Konjunktiv I используется в косвенной речи для передачи чужого высказывания.",
            head_en: ["Direct speech", "Indirect speech"],
            head_ru: ["Прямая речь", "Косвенная речь"],
            q_en: "Sie sagt, sie ___ morgen kommen.",
            q_ru: "Sie sagt, sie ___ morgen kommen.",
        },
        {
            id: "de_gr10", level: "C1",
            title: "Genitiv",
            exp: "Der Genitiv zeigt Besitz oder Zugehörigkeit an. Er wird oft durch 'von' + Dativ ersetzt.",
            table: { head: ["Genitiv"], rows: [["Das Haus meines Vaters"], ["Die Farben der Blumen"]] },
            ex: { q: "Das ist das Auto ___ Bruders.", opts: ["meines", "meinem", "meinen"], a: 0 },
            title_en: "Genitive case",
            title_ru: "Genitiv (родительный падеж)",
            exp_en: "The genitive case indicates possession or belonging.",
            exp_ru: "Genitiv (родительный падеж) указывает на принадлежность.",
            head_en: ["Genitive"],
            head_ru: ["Genitiv"],
            q_en: "Das ist das Auto ___ Bruders.",
            q_ru: "Das ist das Auto ___ Bruders.",
        },
        // C2
        {
            id: "de_gr11", level: "C2",
            title: "Konjunktiv II der Vergangenheit",
            exp: "Der Konjunktiv II der Vergangenheit wird mit hätte/wäre + Partizip II gebildet und drückt irreale Wünsche in der Vergangenheit aus.",
            table: { head: ["Beispiel"], rows: [["Wenn ich das gewusst hätte, wäre ich gekommen."]] },
            ex: { q: "Wenn ich mehr Zeit gehabt hätte, ___ ich gekommen.", opts: ["wäre", "hätte", "würde"], a: 0 },
            title_en: "Konjunktiv II of the past",
            title_ru: "Konjunktiv II прошедшего времени",
            exp_en: "Konjunktiv II of the past is formed with hätte/wäre + past participle and expresses unreal past wishes.",
            exp_ru: "Konjunktiv II прошедшего времени образуется с hätte/wäre + Partizip II и выражает нереальные желания в прошлом.",
            head_en: ["Example"],
            head_ru: ["Пример"],
            q_en: "Wenn ich mehr Zeit gehabt hätte, ___ ich gekommen.",
            q_ru: "Wenn ich mehr Zeit gehabt hätte, ___ ich gekommen.",
        },
    ];

    // =====================================================================
    //  NORSKPROVE_TASKS – ЗАВДАННЯ ДЛЯ ПРАКТИКИ (Аналог Norskprøve)
    // =====================================================================
    const NORSKPROVE_TASKS = {
        A1: {
            reading: [
                {
                    title: "Hallo!",
                    text: "Hallo! Ich heiße Anna. Ich komme aus Polen. Ich wohne in Berlin. Ich bin Studentin. Ich mag deutsches Essen.",
                    questions: [
                        { q: "Woher kommt Anna?", opts: ["Norwegen", "Polen", "Schweden"], a: 1 },
                        { q: "Was macht Anna?", opts: ["Sie ist Lehrerin", "Sie ist Studentin", "Sie ist Ärztin"], a: 1 },
                        { q: "Wo wohnt Anna?", opts: ["Bergen", "Berlin", "Warschau"], a: 1 },
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
                    title: "Ein Tag im Geschäft",
                    text: "Gestern war ich im Geschäft. Ich kaufte Brot, Milch und Eier. Das Geschäft war voller Leute. Ich traf einen Freund und wir unterhielten uns kurz. Dann ging ich nach Hause.",
                    questions: [
                        { q: "Was kaufte ich?", opts: ["Brot, Milch, Käse", "Brot, Milch, Eier", "Eier, Käse, Butter"], a: 1 },
                        { q: "Wen traf ich?", opts: ["Einen Lehrer", "Einen Freund", "Einen Arzt"], a: 1 },
                        { q: "Wo war ich?", opts: ["In der Schule", "Im Geschäft", "Bei der Arbeit"], a: 1 },
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
                    title: "Klimawandel",
                    text: "Der Klimawandel ist ein großes Problem. Die Temperaturen steigen und das Eis schmilzt. Viele Tiere verlieren ihren Lebensraum. Wir müssen die Umweltverschmutzung reduzieren und erneuerbare Energien nutzen.",
                    questions: [
                        { q: "Was passiert mit dem Eis?", opts: ["Es gefriert", "Es schmilzt", "Es wächst"], a: 1 },
                        { q: "Was können wir tun?", opts: ["Mehr Öl verwenden", "Recyceln", "Mehr Autos fahren"], a: 1 },
                        { q: "Was bedroht die Tiere?", opts: ["Verlust von Lebensraum", "Jagd", "Verschmutzung"], a: 0 },
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
                    title: "Die Zukunft der Arbeit",
                    text: "Die Automatisierung wird viele Berufe verändern. Einige Jobs werden verschwinden, aber neue werden entstehen. Digitale Kompetenzen werden wichtig. Arbeitnehmer müssen flexibel sein und lebenslang lernen.",
                    questions: [
                        { q: "Was wird mit einigen Berufen passieren?", opts: ["Sie werden verschwinden", "Sie werden sicherer", "Sie werden besser bezahlt"], a: 0 },
                        { q: "Was wird wichtig?", opts: ["Körperliche Stärke", "Digitale Kompetenzen", "Soziale Netzwerke"], a: 1 },
                        { q: "Was kann Technologie verbessern?", opts: ["Das Gehalt", "Das Arbeitsumfeld", "Die Freizeit"], a: 1 },
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
                    title: "Ethik der KI",
                    text: "Künstliche Intelligenz wirft neue ethische Fragen auf. Wer ist verantwortlich, wenn ein Algorithmus einen Fehler macht? Sollte KI Rechte haben? Gleichzeitig kann KI zur medizinischen Forschung und Klimamodellierung beitragen.",
                    questions: [
                        { q: "Was wirft KI auf?", opts: ["Neue ethische Fragen", "Technische Probleme", "Wirtschaftswachstum"], a: 0 },
                        { q: "Wozu kann KI beitragen?", opts: ["Zur Forschung", "Zur Kriegsführung", "Zur Überwachung"], a: 0 },
                        { q: "Was müssen wir entwickeln?", opts: ["Neue Algorithmen", "Richtlinien", "Mehr Rechenzentren"], a: 1 },
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
                    title: "Philosophie und Wissenschaft",
                    text: "Die Wissenschaft ruht auf philosophischen Annahmen. Die Frage, was wahr ist und wie wir es wissen können, ist grundlegend. Die wissenschaftliche Methode gibt uns Werkzeuge, ist aber nicht unfehlbar. Kritisches Denken ist unerlässlich.",
                    questions: [
                        { q: "Worauf ruht die Wissenschaft?", opts: ["Philosophischen Annahmen", "Religiösen Dogmen", "Politischer Macht"], a: 0 },
                        { q: "Was ist unerlässlich?", opts: ["Kritisches Denken", "Akademische Titel", "Publikation"], a: 0 },
                    ],
                },
            ],
            listening: [],
            writing: [],
            speaking: [],
        },
    };

    // =====================================================================
    //  LEVEL_TEST – ТЕСТ НА РІВЕНЬ НІМЕЦЬКОЇ
    // =====================================================================
    const LEVEL_TEST = [
        // A1
        { lvl: "A1", q: "Hallo! Wie ___ du?", opts: ["heißt", "bin", "bist"], a: 0 },
        { lvl: "A1", q: "Ich ___ Student.", opts: ["bin", "habe", "ist"], a: 0 },
        { lvl: "A1", q: "Sie ___ Ärztin.", opts: ["ist", "bin", "habe"], a: 0 },
        { lvl: "A1", q: "Wir ___ aus Berlin.", opts: ["sind", "haben", "seid"], a: 0 },
        { lvl: "A1", q: "___ heißt du?", opts: ["Wer", "Wie", "Was"], a: 1 },
        { lvl: "A1", q: "Ich habe ___ Apfel.", opts: ["einen", "ein", "eine"], a: 0 },
        { lvl: "A1", q: "Das ist ___ Haus.", opts: ["ein", "eine", "einen"], a: 0 },
        { lvl: "A1", q: "Wir ___ jeden Tag zur Schule.", opts: ["gehen", "geht", "gehst"], a: 0 },
        { lvl: "A1", q: "Sie ___ morgens Kaffee.", opts: ["trinkt", "trinke", "trinken"], a: 0 },
        { lvl: "A1", q: "Das Wetter ist heute ___.", opts: ["schlecht", "schlechte", "schlechten"], a: 0 },
        // A2
        { lvl: "A2", q: "Gestern ___ ich ins Kino.", opts: ["ging", "gegangen", "gehe"], a: 0 },
        { lvl: "A2", q: "Sie hat mich nicht ___.", opts: ["angerufen", "anrufen", "ruft"], a: 0 },
        { lvl: "A2", q: "___ du gerne Eis?", opts: ["Isst", "Essen", "Esst"], a: 0 },
        { lvl: "A2", q: "Wir ___ nächste Woche nach Berlin.", opts: ["fahren", "fahrt", "fährt"], a: 0 },
        { lvl: "A2", q: "Er ___ ein Auto.", opts: ["hat", "habe", "hast"], a: 0 },
        { lvl: "A2", q: "Ich kann dir ___.", opts: ["helfen", "hilft", "helfe"], a: 0 },
        { lvl: "A2", q: "Sie ___ drei Sprachen sprechen.", opts: ["kann", "ist", "hat"], a: 0 },
        { lvl: "A2", q: "Wir ___ um 7 Uhr Abendbrot.", opts: ["essen", "isst", "esse"], a: 0 },
        { lvl: "A2", q: "Ich bin müde, weil ich ___ gearbeitet habe.", opts: ["hart", "harte", "harten"], a: 0 },
        { lvl: "A2", q: "___ du meine Schlüssel gesehen?", opts: ["Hast", "Habe", "Hat"], a: 0 },
        // B1
        { lvl: "B1", q: "Ich bin ___ 2015 hier.", opts: ["seit", "für", "von"], a: 0 },
        { lvl: "B1", q: "Sie hat ihre Hausaufgaben noch nicht ___.", opts: ["gemacht", "machen", "macht"], a: 0 },
        { lvl: "B1", q: "Das Buch ___ vom Lehrer geschrieben.", opts: ["wurde", "ist", "hat"], a: 0 },
        { lvl: "B1", q: "Wenn es regnet, ___ wir zu Hause.", opts: ["bleiben", "bleibst", "bleibt"], a: 0 },
        { lvl: "B1", q: "Ich wünschte, ich ___ mehr Zeit.", opts: ["hätte", "habe", "hatte"], a: 0 },
        { lvl: "B1", q: "Sie ___ mir gestern ihre Adresse.", opts: ["gab", "gegeben", "gibt"], a: 0 },
        { lvl: "B1", q: "Sie gingen ins Kino, ___ sie gelangweilt waren.", opts: ["weil", "obwohl", "aber"], a: 0 },
        { lvl: "B1", q: "Er mag es nicht, in der Stadt ___.", opts: ["zu wohnen", "wohnen", "wohnte"], a: 0 },
        { lvl: "B1", q: "Ich verspreche, dass ich später ___.", opts: ["anrufe", "angerufen", "rufe an"], a: 0 },
        { lvl: "B1", q: "Der Kaffee ist ___ heiß, um zu trinken.", opts: ["zu", "genug", "sehr"], a: 0 },
        // B2
        { lvl: "B2", q: "___ er gelernt hätte, hätte er die Prüfung bestanden.", opts: ["Wenn", "Obwohl", "Dass"], a: 0 },
        { lvl: "B2", q: "Sie fragte mich, ___ ich ginge.", opts: ["wo", "ob", "dass"], a: 0 },
        { lvl: "B2", q: "Der Film war ___ als erwartet.", opts: ["besser", "gut", "am besten"], a: 0 },
        { lvl: "B2", q: "Wir müssen besprechen, ___ wir das Problem lösen.", opts: ["wie", "dass", "was"], a: 0 },
        { lvl: "B2", q: "Er ist ___ der beiden Kandidaten.", opts: ["der bessere", "besser", "besten"], a: 0 },
        { lvl: "B2", q: "Sie bestritt, das Geld ___.", opts: ["genommen zu haben", "nehmen", "nimmt"], a: 0 },
        { lvl: "B2", q: "Die Prüfung war ___ als gedacht.", opts: ["einfacher", "einfach", "am einfachsten"], a: 0 },
        { lvl: "B2", q: "Ich wünschte, ich ___ mehr über Kunst.", opts: ["wüsste", "weiß", "wusste"], a: 0 },
        { lvl: "B2", q: "Sie wären gekommen, wenn sie ___ worden wären.", opts: ["eingeladen", "einladen", "eingeladen haben"], a: 0 },
        { lvl: "B2", q: "Das ist das Haus, ___ ich aufgewachsen bin.", opts: ["in dem", "das", "wo"], a: 0 },
        // C1
        { lvl: "C1", q: "Nicht nur ___ er zur Versammlung, sondern hielt auch einen Vortrag.", opts: ["kam", "kommt", "ist gekommen"], a: 0 },
        { lvl: "C1", q: "Ich wünschte, ich ___ die Antwort.", opts: ["wüsste", "weiß", "wusste"], a: 0 },
        { lvl: "C1", q: "Es ist wichtig, dass er pünktlich ___.", opts: ["ankommt", "ankäme", "angekommen ist"], a: 0 },
        { lvl: "C1", q: "Der Bericht ___ bis zum Ende des Tages fertiggestellt.", opts: ["wird", "wurde", "ist"], a: 0 },
        { lvl: "C1", q: "Hätte ich es gewusst, ___ ich anders gehandelt.", opts: ["hätte", "würde", "habe"], a: 0 },
        { lvl: "C1", q: "Sie ist ___ der beiden Schwestern.", opts: ["die ältere", "die älteste", "älter"], a: 0 },
        { lvl: "C1", q: "Der Vorschlag wurde abgelehnt, ___ wir erwartet hatten.", opts: ["was", "wie", "dass"], a: 0 },
        { lvl: "C1", q: "Ich kann nicht anders, als mir ___ Sorgen zu machen.", opts: ["Sorgen", "Sorge", "der Sorge"], a: 0 },
        { lvl: "C1", q: "Die Vorlesung war ___ lang für die Studenten.", opts: ["zu", "so", "sehr"], a: 0 },
        { lvl: "C1", q: "Er neigt dazu, ungeduldig zu ___.", opts: ["sein", "werden", "bleiben"], a: 0 },
        // C2
        { lvl: "C2", q: "Wäre ich reich, ___ ich die Welt bereisen.", opts: ["würde", "werde", "hätte"], a: 0 },
        { lvl: "C2", q: "Die Verwendung von Metaphern durch den Autor ___ den Leser.", opts: ["fordert", "fordern", "forderte"], a: 0 },
        { lvl: "C2", q: "Wenig ___ sie ahnen, was auf sie zukam.", opts: ["ahnte", "ahnen", "hatte geahnt"], a: 0 },
        { lvl: "C2", q: "Das Komitee ___ in der Frage gespalten.", opts: ["ist", "sind", "war"], a: 0 },
        { lvl: "C2", q: "Es ist unerlässlich, dass das Projekt ___ Zeit abgeschlossen wird.", opts: ["rechtzeitig", "pünktlich", "zeitig"], a: 0 },
        { lvl: "C2", q: "Sein Argument war ___ überzeugend.", opts: ["äußerst", "mehr", "sehr"], a: 0 },
        { lvl: "C2", q: "Die Forschung, ___ Ergebnisse bahnbrechend sind, dauerte Jahre.", opts: ["deren", "dessen", "der"], a: 0 },
        { lvl: "C2", q: "Er sprach mit einer ___ Autorität, die alle ärgerte.", opts: ["selbstverständlichen", "selbstbewussten", "selbstgefälligen"], a: 0 },
        { lvl: "C2", q: "Der Skandal warf einen Schatten auf den ___ des Unternehmens.", opts: ["Ruf", "Name", "Ansehen"], a: 0 },
        { lvl: "C2", q: "Sie ist eine ___ Kritikerin der Regierung.", opts: ["scharfe", "laute", "beide"], a: 0 },
    ];

    // =====================================================================
    //  РЕЄСТРАЦІЯ ДАНИХ У ГЛОБАЛЬНИЙ ОБ'ЄКТ
    // =====================================================================
    window.LANG_DATA = window.LANG_DATA || {};
    window.LANG_DATA.de = {
        VOCAB,
        GRAMMAR,
        NORSKPROVE_TASKS,
        LEVEL_TEST,
    };
})();