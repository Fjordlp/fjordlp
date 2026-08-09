// =====================================================================
//  js/data-en.js — англійська мова, окремий файл (як і норвезька в data.js)
// =====================================================================
// Це РОБОЧИЙ ШАБЛОН: структура полів 1:1 співпадає з js/data.js
// (VOCAB/GRAMMAR/NORSKPROVE_TASKS/LEVEL_TEST), тож щоб додати ще одну
// мову — скопіюй увесь цей файл під новою назвою (наприклад
// js/data-de.js), заміни вміст на словник/граматику потрібної мови і
// заміни рядок реєстрації внизу (LANG_DATA.en → LANG_DATA.de).
//
// Все загорнуто в IIFE (function(){ ... })() навмисно: кожен файл
// оголошує СВОЇ власні const VOCAB/GRAMMAR/... — без IIFE вони б
// конфліктували між собою і з тими самими іменами в data.js (у
// звичайних <script>-тегах, без модулів, усі const на верхньому рівні
// файлу — спільні для сторінки, повторне оголошення = помилка).
//
// Поле "no" у VOCAB — це історична назва (від "норвезька"), але
// технічно вона означає "слово МОВОЮ ВИВЧЕННЯ" для будь-якої мови —
// решта коду сайту звертається саме до w.no незалежно від того, яка це
// мова насправді. Тому в цьому файлі w.no містить англійські слова.
(function () {

    const VOCAB = {
        A1: [
            { t: "Привітання", no: "hello", uk: "привіт", en: "hello", ru: "привет", ex_no: "Hello, how are you?", ex_uk: "Привіт, як справи?", en_ex: "Hello, how are you?", ru_ex: "Привет, как дела?" },
            { t: "Привітання", no: "good morning", uk: "добрий ранок", en: "good morning", ru: "доброе утро", ex_no: "Good morning, did you sleep well?", ex_uk: "Добрий ранок, ти добре спав?", en_ex: "Good morning, did you sleep well?", ru_ex: "Доброе утро, ты хорошо спал?" },
            { t: "Привітання", no: "good evening", uk: "добрий вечір", en: "good evening", ru: "добрый вечер", ex_no: "Good evening, welcome home.", ex_uk: "Добрий вечір, ласкаво просимо додому.", en_ex: "Good evening, welcome home.", ru_ex: "Добрый вечер, добро пожаловать домой." },
            { t: "Привітання", no: "good night", uk: "на добраніч", en: "good night", ru: "спокойной ночи", ex_no: "Good night, sleep well!", ex_uk: "На добраніч, солодких снів!", en_ex: "Good night, sleep well!", ru_ex: "Спокойной ночи, сладких снов!" },
            { t: "Привітання", no: "goodbye", uk: "до побачення", en: "goodbye", ru: "до свидания", ex_no: "Goodbye, see you tomorrow.", ex_uk: "До побачення, побачимось завтра.", en_ex: "Goodbye, see you tomorrow.", ru_ex: "До свидания, увидимся завтра." },
            { t: "Привітання", no: "thank you", uk: "дякую", en: "thank you", ru: "спасибо", ex_no: "Thank you for your help.", ex_uk: "Дякую за допомогу.", en_ex: "Thank you for your help.", ru_ex: "Спасибо за помощь." },
            { t: "Привітання", no: "please", uk: "будь ласка", en: "please", ru: "пожалуйста", ex_no: "Can you help me, please?", ex_uk: "Можеш допомогти мені, будь ласка?", en_ex: "Can you help me, please?", ru_ex: "Можешь помочь мне, пожалуйста?" },
            { t: "Привітання", no: "sorry", uk: "вибачте", en: "sorry", ru: "извините", ex_no: "Sorry, where is the station?", ex_uk: "Вибачте, де вокзал?", en_ex: "Sorry, where is the station?", ru_ex: "Извините, где вокзал?" },
            { t: "Привітання", no: "yes", uk: "так", en: "yes", ru: "да", ex_no: "Yes, that's right.", ex_uk: "Так, це правда.", en_ex: "Yes, that's right.", ru_ex: "Да, это правда." },
            { t: "Привітання", no: "no", uk: "ні", en: "no", ru: "нет", ex_no: "No, I don't know.", ex_uk: "Ні, я не знаю.", en_ex: "No, I don't know.", ru_ex: "Нет, я не знаю." },
            { t: "Привітання", no: "welcome", uk: "ласкаво просимо", en: "welcome", ru: "добро пожаловать", ex_no: "Welcome to our home!", ex_uk: "Ласкаво просимо до нашого дому!", en_ex: "Welcome to our home!", ru_ex: "Добро пожаловать в наш дом!" },
            { t: "Привітання", no: "how are you", uk: "як справи", en: "how are you", ru: "как дела", ex_no: "Hi Anna, how are you?", ex_uk: "Привіт, Анно, як справи?", en_ex: "Hi Anna, how are you?", ru_ex: "Привет, Анна, как дела?" },
            { t: "Числа", no: "zero", uk: "нуль", en: "zero", ru: "ноль", ex_no: "We start from zero.", ex_uk: "Ми починаємо з нуля.", en_ex: "We start from zero.", ru_ex: "Мы начинаем с нуля." },
            { t: "Числа", no: "one", uk: "один", en: "one", ru: "один", ex_no: "I have one cat.", ex_uk: "У мене є один кіт.", en_ex: "I have one cat.", ru_ex: "У меня есть один кот." },
            { t: "Числа", no: "two", uk: "два", en: "two", ru: "два", ex_no: "It's two o'clock.", ex_uk: "Зараз друга година.", en_ex: "It's two o'clock.", ru_ex: "Сейчас два часа." },
            { t: "Числа", no: "three", uk: "три", en: "three", ru: "три", ex_no: "I have three brothers.", ex_uk: "У мене три брати.", en_ex: "I have three brothers.", ru_ex: "У меня три брата." },
            { t: "Числа", no: "four", uk: "чотири", en: "four", ru: "четыре", ex_no: "The table has four legs.", ex_uk: "У стола чотири ноги.", en_ex: "The table has four legs.", ru_ex: "У стола четыре ноги." },
            { t: "Числа", no: "five", uk: "п'ять", en: "five", ru: "пять", ex_no: "I finish work at five.", ex_uk: "Я закінчую роботу о п'ятій.", en_ex: "I finish work at five.", ru_ex: "Я заканчиваю работу в пять." },
            { t: "Числа", no: "six", uk: "шість", en: "six", ru: "шесть", ex_no: "We wake up at six.", ex_uk: "Ми прокидаємось о шостій.", en_ex: "We wake up at six.", ru_ex: "Мы просыпаемся в шесть." },
            { t: "Числа", no: "seven", uk: "сім", en: "seven", ru: "семь", ex_no: "There are seven days in a week.", ex_uk: "У тижні сім днів.", en_ex: "There are seven days in a week.", ru_ex: "В неделе семь дней." },
            { t: "Числа", no: "eight", uk: "вісім", en: "eight", ru: "восемь", ex_no: "The shop opens at eight.", ex_uk: "Магазин відкривається о восьмій.", en_ex: "The shop opens at eight.", ru_ex: "Магазин открывается в восемь." },
            { t: "Числа", no: "nine", uk: "дев'ять", en: "nine", ru: "девять", ex_no: "School starts at nine.", ex_uk: "Школа починається о дев'ятій.", en_ex: "School starts at nine.", ru_ex: "Школа начинается в девять." },
            { t: "Числа", no: "ten", uk: "десять", en: "ten", ru: "десять", ex_no: "I count to ten.", ex_uk: "Я рахую до десяти.", en_ex: "I count to ten.", ru_ex: "Я считаю до десяти." },
            { t: "Числа", no: "twenty", uk: "двадцять", en: "twenty", ru: "двадцать", ex_no: "She is twenty years old.", ex_uk: "Їй двадцять років.", en_ex: "She is twenty years old.", ru_ex: "Ей двадцать лет." },
            { t: "Числа", no: "hundred", uk: "сто", en: "hundred", ru: "сто", ex_no: "There are a hundred people here.", ex_uk: "Тут сто людей.", en_ex: "There are a hundred people here.", ru_ex: "Здесь сто человек." },
            { t: "Родина", no: "family", uk: "родина", en: "family", ru: "семья", ex_no: "I love my family.", ex_uk: "Я люблю свою родину.", en_ex: "I love my family.", ru_ex: "Я люблю свою семью." },
            { t: "Родина", no: "mother", uk: "мама", en: "mother", ru: "мама", ex_no: "My mother cooks dinner.", ex_uk: "Моя мама готує вечерю.", en_ex: "My mother cooks dinner.", ru_ex: "Моя мама готовит ужин." },
            { t: "Родина", no: "father", uk: "тато", en: "father", ru: "папа", ex_no: "My father works in the city.", ex_uk: "Мій тато працює в місті.", en_ex: "My father works in the city.", ru_ex: "Мой папа работает в городе." },
            { t: "Родина", no: "sister", uk: "сестра", en: "sister", ru: "сестра", ex_no: "My sister is younger than me.", ex_uk: "Моя сестра молодша за мене.", en_ex: "My sister is younger than me.", ru_ex: "Моя сестра младше меня." },
            { t: "Родина", no: "brother", uk: "брат", en: "brother", ru: "брат", ex_no: "My brother lives in London.", ex_uk: "Мій брат живе в Лондоні.", en_ex: "My brother lives in London.", ru_ex: "Мой брат живёт в Лондоне." },
            { t: "Родина", no: "child", uk: "дитина", en: "child", ru: "ребёнок", ex_no: "The child is playing outside.", ex_uk: "Дитина грається надворі.", en_ex: "The child is playing outside.", ru_ex: "Ребёнок играет на улице." },
            { t: "Родина", no: "grandmother", uk: "бабуся", en: "grandmother", ru: "бабушка", ex_no: "My grandmother bakes bread every week.", ex_uk: "Моя бабуся пече хліб щотижня.", en_ex: "My grandmother bakes bread every week.", ru_ex: "Моя бабушка печёт хлеб каждую неделю." },
            { t: "Родина", no: "grandfather", uk: "дідусь", en: "grandfather", ru: "дедушка", ex_no: "My grandfather tells great stories.", ex_uk: "Мій дідусь розповідає чудові історії.", en_ex: "My grandfather tells great stories.", ru_ex: "Мой дедушка рассказывает отличные истории." },
            { t: "Родина", no: "friend", uk: "друг", en: "friend", ru: "друг", ex_no: "He is my best friend.", ex_uk: "Він мій найкращий друг.", en_ex: "He is my best friend.", ru_ex: "Он мой лучший друг." },
            { t: "Кольори", no: "red", uk: "червоний", en: "red", ru: "красный", ex_no: "The apple is red.", ex_uk: "Яблуко червоне.", en_ex: "The apple is red.", ru_ex: "Яблоко красное." },
            { t: "Кольори", no: "blue", uk: "синій", en: "blue", ru: "синий", ex_no: "The sky is blue today.", ex_uk: "Сьогодні небо синє.", en_ex: "The sky is blue today.", ru_ex: "Сегодня небо синее." },
            { t: "Кольори", no: "green", uk: "зелений", en: "green", ru: "зелёный", ex_no: "The grass is green.", ex_uk: "Трава зелена.", en_ex: "The grass is green.", ru_ex: "Трава зелёная." },
            { t: "Кольори", no: "yellow", uk: "жовтий", en: "yellow", ru: "жёлтый", ex_no: "The sun is yellow.", ex_uk: "Сонце жовте.", en_ex: "The sun is yellow.", ru_ex: "Солнце жёлтое." },
            { t: "Кольори", no: "black", uk: "чорний", en: "black", ru: "чёрный", ex_no: "She has a black cat.", ex_uk: "У неї чорний кіт.", en_ex: "She has a black cat.", ru_ex: "У неё чёрный кот." },
            { t: "Кольори", no: "white", uk: "білий", en: "white", ru: "белый", ex_no: "The snow is white.", ex_uk: "Сніг білий.", en_ex: "The snow is white.", ru_ex: "Снег белый." },
            { t: "Кольори", no: "orange", uk: "помаранчевий", en: "orange", ru: "оранжевый", ex_no: "I like orange juice.", ex_uk: "Мені подобається помаранчевий сік.", en_ex: "I like orange juice.", ru_ex: "Мне нравится апельсиновый сок." },
            { t: "Дні тижня", no: "Monday", uk: "понеділок", en: "Monday", ru: "понедельник", ex_no: "I start work on Monday.", ex_uk: "Я починаю роботу в понеділок.", en_ex: "I start work on Monday.", ru_ex: "Я начинаю работу в понедельник." },
            { t: "Дні тижня", no: "Tuesday", uk: "вівторок", en: "Tuesday", ru: "вторник", ex_no: "We have a meeting on Tuesday.", ex_uk: "У нас зустріч у вівторок.", en_ex: "We have a meeting on Tuesday.", ru_ex: "У нас встреча во вторник." },
            { t: "Дні тижня", no: "Wednesday", uk: "середа", en: "Wednesday", ru: "среда", ex_no: "I go to the gym on Wednesday.", ex_uk: "Я ходжу в спортзал у середу.", en_ex: "I go to the gym on Wednesday.", ru_ex: "Я хожу в спортзал в среду." },
            { t: "Дні тижня", no: "Thursday", uk: "четвер", en: "Thursday", ru: "четверг", ex_no: "The exam is on Thursday.", ex_uk: "Іспит у четвер.", en_ex: "The exam is on Thursday.", ru_ex: "Экзамен в четверг." },
            { t: "Дні тижня", no: "Friday", uk: "п'ятниця", en: "Friday", ru: "пятница", ex_no: "We celebrate on Friday.", ex_uk: "Ми святкуємо в п'ятницю.", en_ex: "We celebrate on Friday.", ru_ex: "Мы празднуем в пятницу." },
            { t: "Дні тижня", no: "Saturday", uk: "субота", en: "Saturday", ru: "суббота", ex_no: "I clean the house on Saturday.", ex_uk: "Я прибираю в суботу.", en_ex: "I clean the house on Saturday.", ru_ex: "Я убираюсь в субботу." },
            { t: "Дні тижня", no: "Sunday", uk: "неділя", en: "Sunday", ru: "воскресенье", ex_no: "We rest on Sunday.", ex_uk: "Ми відпочиваємо в неділю.", en_ex: "We rest on Sunday.", ru_ex: "Мы отдыхаем в воскресенье." },
            { t: "Дієслова", no: "to be", uk: "бути", en: "to be", ru: "быть", ex_no: "I am a student.", ex_uk: "Я студент.", en_ex: "I am a student.", ru_ex: "Я студент." },
            { t: "Дієслова", no: "to have", uk: "мати", en: "to have", ru: "иметь", ex_no: "I have a car.", ex_uk: "У мене є машина.", en_ex: "I have a car.", ru_ex: "У меня есть машина." },
            { t: "Дієслова", no: "to go", uk: "йти", en: "to go", ru: "идти", ex_no: "I go to work every day.", ex_uk: "Я йду на роботу щодня.", en_ex: "I go to work every day.", ru_ex: "Я иду на работу каждый день." },
            { t: "Дієслова", no: "to eat", uk: "їсти", en: "to eat", ru: "есть", ex_no: "We eat breakfast at seven.", ex_uk: "Ми снідаємо о сьомій.", en_ex: "We eat breakfast at seven.", ru_ex: "Мы завтракаем в семь." },
            { t: "Дієслова", no: "to drink", uk: "пити", en: "to drink", ru: "пить", ex_no: "I drink water every morning.", ex_uk: "Я п'ю воду щоранку.", en_ex: "I drink water every morning.", ru_ex: "Я пью воду каждое утро." },
            { t: "Дієслова", no: "to see", uk: "бачити", en: "to see", ru: "видеть", ex_no: "I can see the mountains.", ex_uk: "Я бачу гори.", en_ex: "I can see the mountains.", ru_ex: "Я вижу горы." },
            { t: "Дієслова", no: "to speak", uk: "говорити", en: "to speak", ru: "говорить", ex_no: "She speaks three languages.", ex_uk: "Вона говорить трьома мовами.", en_ex: "She speaks three languages.", ru_ex: "Она говорит на трёх языках." },
            { t: "Дієслова", no: "to want", uk: "хотіти", en: "to want", ru: "хотеть", ex_no: "I want a coffee, please.", ex_uk: "Я хочу каву, будь ласка.", en_ex: "I want a coffee, please.", ru_ex: "Я хочу кофе, пожалуйста." },
            { t: "Дієслова", no: "to live", uk: "жити", en: "to live", ru: "жить", ex_no: "We live in a small town.", ex_uk: "Ми живемо в маленькому місті.", en_ex: "We live in a small town.", ru_ex: "Мы живём в маленьком городе." },
            { t: "Дієслова", no: "to work", uk: "працювати", en: "to work", ru: "работать", ex_no: "He works in a hospital.", ex_uk: "Він працює в лікарні.", en_ex: "He works in a hospital.", ru_ex: "Он работает в больнице." },
            { t: "Дієслова", no: "to sleep", uk: "спати", en: "to sleep", ru: "спать", ex_no: "The baby sleeps a lot.", ex_uk: "Дитина багато спить.", en_ex: "The baby sleeps a lot.", ru_ex: "Малыш много спит." },
            { t: "Їжа", no: "bread", uk: "хліб", en: "bread", ru: "хлеб", ex_no: "I buy fresh bread every day.", ex_uk: "Я купую свіжий хліб щодня.", en_ex: "I buy fresh bread every day.", ru_ex: "Я покупаю свежий хлеб каждый день." },
            { t: "Їжа", no: "water", uk: "вода", en: "water", ru: "вода", ex_no: "Can I have some water?", ex_uk: "Можна мені трохи води?", en_ex: "Can I have some water?", ru_ex: "Можно мне немного воды?" },
            { t: "Їжа", no: "milk", uk: "молоко", en: "milk", ru: "молоко", ex_no: "I drink milk with breakfast.", ex_uk: "Я п'ю молоко зі сніданком.", en_ex: "I drink milk with breakfast.", ru_ex: "Я пью молоко с завтраком." },
            { t: "Їжа", no: "egg", uk: "яйце", en: "egg", ru: "яйцо", ex_no: "I eat an egg every morning.", ex_uk: "Я їм яйце щоранку.", en_ex: "I eat an egg every morning.", ru_ex: "Я ем яйцо каждое утро." },
            { t: "Їжа", no: "apple", uk: "яблуко", en: "apple", ru: "яблоко", ex_no: "She eats an apple for lunch.", ex_uk: "Вона їсть яблуко на обід.", en_ex: "She eats an apple for lunch.", ru_ex: "Она ест яблоко на обед." },
            { t: "Їжа", no: "meat", uk: "м'ясо", en: "meat", ru: "мясо", ex_no: "We don't eat meat on Fridays.", ex_uk: "Ми не їмо м'ясо по п'ятницях.", en_ex: "We don't eat meat on Fridays.", ru_ex: "Мы не едим мясо по пятницам." },
            { t: "Їжа", no: "cheese", uk: "сир", en: "cheese", ru: "сыр", ex_no: "I love French cheese.", ex_uk: "Я люблю французький сир.", en_ex: "I love French cheese.", ru_ex: "Я люблю французский сыр." },
            { t: "Їжа", no: "coffee", uk: "кава", en: "coffee", ru: "кофе", ex_no: "I drink coffee every morning.", ex_uk: "Я п'ю каву щоранку.", en_ex: "I drink coffee every morning.", ru_ex: "Я пью кофе каждое утро." },
            { t: "Прикметники", no: "big", uk: "великий", en: "big", ru: "большой", ex_no: "This is a big house.", ex_uk: "Це великий будинок.", en_ex: "This is a big house.", ru_ex: "Это большой дом." },
            { t: "Прикметники", no: "small", uk: "маленький", en: "small", ru: "маленький", ex_no: "The cat is very small.", ex_uk: "Кіт дуже маленький.", en_ex: "The cat is very small.", ru_ex: "Кот очень маленький." },
            { t: "Прикметники", no: "good", uk: "добрий", en: "good", ru: "хороший", ex_no: "This is a good idea.", ex_uk: "Це добра ідея.", en_ex: "This is a good idea.", ru_ex: "Это хорошая идея." },
            { t: "Прикметники", no: "bad", uk: "поганий", en: "bad", ru: "плохой", ex_no: "The weather is bad today.", ex_uk: "Сьогодні погана погода.", en_ex: "The weather is bad today.", ru_ex: "Сегодня плохая погода." },
            { t: "Прикметники", no: "new", uk: "новий", en: "new", ru: "новый", ex_no: "I bought a new phone.", ex_uk: "Я купив новий телефон.", en_ex: "I bought a new phone.", ru_ex: "Я купил новый телефон." },
            { t: "Прикметники", no: "old", uk: "старий", en: "old", ru: "старый", ex_no: "This book is very old.", ex_uk: "Ця книга дуже стара.", en_ex: "This book is very old.", ru_ex: "Эта книга очень старая." },
            { t: "Тіло", no: "head", uk: "голова", en: "head", ru: "голова", ex_no: "My head hurts.", ex_uk: "У мене болить голова.", en_ex: "My head hurts.", ru_ex: "У меня болит голова." },
            { t: "Тіло", no: "hand", uk: "рука", en: "hand", ru: "рука", ex_no: "Give me your hand.", ex_uk: "Дай мені руку.", en_ex: "Give me your hand.", ru_ex: "Дай мне руку." },
            { t: "Тіло", no: "eye", uk: "око", en: "eye", ru: "глаз", ex_no: "She has blue eyes.", ex_uk: "У неї блакитні очі.", en_ex: "She has blue eyes.", ru_ex: "У неё голубые глаза." },
            { t: "Дім", no: "house", uk: "будинок", en: "house", ru: "дом", ex_no: "We live in a small house.", ex_uk: "Ми живемо в маленькому будинку.", en_ex: "We live in a small house.", ru_ex: "Мы живём в маленьком доме." },
            { t: "Дім", no: "room", uk: "кімната", en: "room", ru: "комната", ex_no: "My room is upstairs.", ex_uk: "Моя кімната нагорі.", en_ex: "My room is upstairs.", ru_ex: "Моя комната наверху." },
            { t: "Дім", no: "door", uk: "двері", en: "door", ru: "дверь", ex_no: "Please close the door.", ex_uk: "Будь ласка, зачини двері.", en_ex: "Please close the door.", ru_ex: "Пожалуйста, закрой дверь." },
            { t: "Дім", no: "table", uk: "стіл", ex_no: "The book is on the table.", ex_uk: "Книга на столі.", en: "table", en_ex: "The book is on the table.", ru: "стол", ru_ex: "Книга на столе." },

        ],
        A2: [
            { t: "Покупки", no: "shop", uk: "магазин", ex_no: "The shop opens at nine.", ex_uk: "Магазин відкривається о дев'ятій.", en: "shop", en_ex: "The shop opens at nine.", ru: "магазин", ru_ex: "Магазин открывается в девять." },
            { t: "Напрямки", no: "left", uk: "ліворуч", ex_no: "Turn left at the corner.", ex_uk: "Поверни ліворуч на розі.", en: "left", en_ex: "Turn left at the corner.", ru: "налево", ru_ex: "Поверни налево на углу." },
            { t: "Напрямки", no: "right", uk: "праворуч", ex_no: "The station is on your right.", ex_uk: "Станція праворуч від тебе.", en: "right", en_ex: "The station is on your right.", ru: "направо", ru_ex: "Станция справа от тебя." },
            { t: "Робота", no: "job", uk: "робота", ex_no: "She found a new job.", ex_uk: "Вона знайшла нову роботу.", en: "job", en_ex: "She found a new job.", ru: "работа", ru_ex: "Она нашла новую работу." },
            { t: "Погода", no: "rain", uk: "дощ", ex_no: "It's going to rain tomorrow.", ex_uk: "Завтра буде дощ.", en: "rain", en_ex: "It's going to rain tomorrow.", ru: "дождь", ru_ex: "Завтра будет дождь." },
        ],
        B1: [],
        B2: [],
        C1: [],
        C2: [],
    };

    const GRAMMAR = [
        {
            id: "en_gr1", level: "A1",
            title: "Дієслово to be (am/is/are)", exp: "У теперішньому часі 'to be' змінюється залежно від особи: I am, he/she/it is, you/we/they are.",
            table: { head: ["Займенник", "Форма"], rows: [["I", "am"], ["he / she / it", "is"], ["you / we / they", "are"]] },
            ex: { q: "Оберіть правильну форму: She ___ a doctor.", opts: ["am", "is", "are"], a: 1 },
            title_en: "The verb 'to be' (am/is/are)", title_ru: "Глагол to be (am/is/are)",
            exp_en: "In the present tense, 'to be' changes depending on the subject: I am, he/she/it is, you/we/they are.",
            exp_ru: "В настоящем времени 'to be' меняется в зависимости от лица: I am, he/she/it is, you/we/they are.",
            head_en: ["Pronoun", "Form"], head_ru: ["Местоимение", "Форма"],
            q_en: "Choose the correct form: She ___ a doctor.", q_ru: "Выберите правильную форму: She ___ a doctor.",
        },
        {
            id: "en_gr2", level: "A1",
            title: "Множина іменників (-s)", exp: "Більшість іменників у множині отримують закінчення -s.",
            table: { head: ["Однина", "Множина"], rows: [["a book", "books"], ["a car", "cars"], ["a house", "houses"]] },
            ex: { q: "Множина від 'apple'", opts: ["apples", "appleis", "applees"], a: 0 },
            title_en: "Plural nouns (-s)", title_ru: "Множественное число существительных (-s)",
            exp_en: "Most nouns form the plural by adding -s.", exp_ru: "Большинство существительных образуют множественное число, добавляя -s.",
            head_en: ["Singular", "Plural"], head_ru: ["Единственное", "Множественное"],
            q_en: "Plural of 'apple'", q_ru: "Множественное число от 'apple'",
        },
        {
            id: "en_gr3", level: "A2",
            title: "Минулий час правильних дієслів (-ed)", exp: "Правильні дієслова в минулому часі отримують закінчення -ed.",
            table: { head: ["Теперішній", "Минулий"], rows: [["work", "worked"], ["play", "played"], ["watch", "watched"]] },
            ex: { q: "Минулий час від 'walk'", opts: ["walked", "walkd", "walkied"], a: 0 },
            title_en: "Past tense of regular verbs (-ed)", title_ru: "Прошедшее время правильных глаголов (-ed)",
            exp_en: "Regular verbs form the past tense by adding -ed.", exp_ru: "Правильные глаголы образуют прошедшее время, добавляя -ed.",
            head_en: ["Present", "Past"], head_ru: ["Настоящее", "Прошедшее"],
            q_en: "Past tense of 'walk'", q_ru: "Прошедшее время от 'walk'",
        },
    ];

    // Завдання для розділу "Завдання" (аналог Norskprøve, але без прив'язки
    // до конкретного іспиту — просто reading/listening/writing/speaking
    // вправи для практики англійської).
    const NORSKPROVE_TASKS = {
        A1: {
            reading: [
                {
                    title: "Hello!",
                    text: "Hello! My name is Anna. I am from Poland. I live in London. I am a student. I like English food.",
                    questions: [
                        { q: "Where is Anna from?", opts: ["Norway", "Poland", "Sweden"], a: 1 },
                        { q: "What does Anna do?", opts: ["She is a teacher", "She is a student", "She is a doctor"], a: 1 },
                        { q: "Where does Anna live?", opts: ["Bergen", "London", "Warsaw"], a: 1 },
                    ],
                },
            ],
            listening: [],
            writing: [],
            speaking: [],
        },
        A2: { reading: [], listening: [], writing: [], speaking: [] },
        B1: { reading: [], listening: [], writing: [], speaking: [] },
        B2: { reading: [], listening: [], writing: [], speaking: [] },
        C1: { reading: [], listening: [], writing: [], speaking: [] },
        C2: { reading: [], listening: [], writing: [], speaking: [] },
    };

    const LEVEL_TEST = [
        { lvl: "A1", q: "«Привіт» англійською", opts: ["Hello", "Goodbye", "Thanks"], a: 0, q_en: "\"Hi\" in English", opts_en: ["Hello", "Goodbye", "Thanks"], q_ru: "«Привет» по-английски", opts_ru: ["Hello", "Goodbye", "Thanks"] },
        { lvl: "A1", q: "«Дякую» — це", opts: ["Thank you", "Sorry", "Please"], a: 0, q_en: "\"Thanks\" is", opts_en: ["Thank you", "Sorry", "Please"], q_ru: "«Спасибо» — это", opts_ru: ["Thank you", "Sorry", "Please"] },
        { lvl: "A1", q: "«One» означає", opts: ["один", "два", "три"], a: 0, q_en: "\"One\" means", opts_en: ["one", "two", "three"], q_ru: "«One» означает", opts_ru: ["один", "два", "три"] },
        { lvl: "A1", q: "«Mother» — це", opts: ["мати", "батько", "сестра"], a: 0, q_en: "\"Mother\" is", opts_en: ["mother", "father", "sister"], q_ru: "«Mother» — это", opts_ru: ["мать", "отец", "сестра"] },
        { lvl: "A2", q: "«Shop» означає", opts: ["магазин", "школа", "лікарня"], a: 0, q_en: "\"Shop\" means", opts_en: ["shop", "school", "hospital"], q_ru: "«Shop» означает", opts_ru: ["магазин", "школа", "больница"] },
        { lvl: "A2", q: "Минулий час від «to walk»", opts: ["walks", "walked", "walking"], a: 1, q_en: "Past tense of \"to walk\"", opts_en: ["walks", "walked", "walking"], q_ru: "Прошедшее время от «to walk»", opts_ru: ["walks", "walked", "walking"] },
    ];

    window.LANG_DATA = window.LANG_DATA || {};
    window.LANG_DATA.en = { VOCAB, GRAMMAR, NORSKPROVE_TASKS, LEVEL_TEST };
})();
