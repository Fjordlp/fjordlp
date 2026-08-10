// =====================================================================
//  js/data-es.js — ІСПАНСЬКА МОВА (ПОВНИЙ НАБІР)
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
            { t: "Привітання", no: "hola", uk: "привіт", en: "hello", ru: "привет", ex_no: "Hola, ¿cómo estás?", ex_uk: "Привіт, як справи?", en_ex: "Hello, how are you?", ru_ex: "Привет, как дела?" },
            { t: "Привітання", no: "buenos días", uk: "добрий ранок", en: "good morning", ru: "доброе утро", ex_no: "Buenos días, ¿dormiste bien?", ex_uk: "Добрий ранок, ти добре спав?", en_ex: "Good morning, did you sleep well?", ru_ex: "Доброе утро, ты хорошо спал?" },
            { t: "Привітання", no: "buenas tardes", uk: "добрий день", en: "good afternoon", ru: "добрый день", ex_no: "Buenas tardes, ¿cómo estás?", ex_uk: "Добрий день, як справи?", en_ex: "Good afternoon, how are you?", ru_ex: "Добрый день, как дела?" },
            { t: "Привітання", no: "buenas noches", uk: "на добраніч", en: "good night", ru: "спокойной ночи", ex_no: "Buenas noches, que duermas bien.", ex_uk: "На добраніч, солодких снів.", en_ex: "Good night, sleep well.", ru_ex: "Спокойной ночи, сладких снов." },
            { t: "Привітання", no: "adiós", uk: "до побачення", en: "goodbye", ru: "до свидания", ex_no: "Adiós, nos vemos mañana.", ex_uk: "До побачення, побачимось завтра.", en_ex: "Goodbye, see you tomorrow.", ru_ex: "До свидания, увидимся завтра." },
            { t: "Привітання", no: "gracias", uk: "дякую", en: "thank you", ru: "спасибо", ex_no: "Gracias por tu ayuda.", ex_uk: "Дякую за твою допомогу.", en_ex: "Thank you for your help.", ru_ex: "Спасибо за твою помощь." },
            { t: "Привітання", no: "por favor", uk: "будь ласка", en: "please", ru: "пожалуйста", ex_no: "¿Puedes ayudarme, por favor?", ex_uk: "Можеш допомогти мені, будь ласка?", en_ex: "Can you help me, please?", ru_ex: "Можешь помочь мне, пожалуйста?" },
            { t: "Привітання", no: "lo siento", uk: "вибачте", en: "sorry", ru: "извините", ex_no: "Lo siento, ¿dónde está la estación?", ex_uk: "Вибачте, де вокзал?", en_ex: "Sorry, where is the station?", ru_ex: "Извините, где вокзал?" },
            { t: "Привітання", no: "sí", uk: "так", en: "yes", ru: "да", ex_no: "Sí, eso es correcto.", ex_uk: "Так, це правда.", en_ex: "Yes, that's right.", ru_ex: "Да, это правда." },
            { t: "Привітання", no: "no", uk: "ні", en: "no", ru: "нет", ex_no: "No, no lo sé.", ex_uk: "Ні, я не знаю.", en_ex: "No, I don't know.", ru_ex: "Нет, я не знаю." },
            { t: "Привітання", no: "bienvenido", uk: "ласкаво просимо", en: "welcome", ru: "добро пожаловать", ex_no: "¡Bienvenido a nuestra casa!", ex_uk: "Ласкаво просимо до нашого дому!", en_ex: "Welcome to our house!", ru_ex: "Добро пожаловать в наш дом!" },
            { t: "Привітання", no: "cómo estás", uk: "як справи", en: "how are you", ru: "как дела", ex_no: "Hola Ana, ¿cómo estás?", ex_uk: "Привіт, Анно, як справи?", en_ex: "Hi Ana, how are you?", ru_ex: "Привет, Анна, как дела?" },
            // Numbers
            { t: "Числа", no: "cero", uk: "нуль", en: "zero", ru: "ноль", ex_no: "Empezamos desde cero.", ex_uk: "Ми починаємо з нуля.", en_ex: "We start from zero.", ru_ex: "Мы начинаем с нуля." },
            { t: "Числа", no: "uno", uk: "один", en: "one", ru: "один", ex_no: "Tengo un gato.", ex_uk: "У мене є один кіт.", en_ex: "I have one cat.", ru_ex: "У меня есть один кот." },
            { t: "Числа", no: "dos", uk: "два", en: "two", ru: "два", ex_no: "Son las dos en punto.", ex_uk: "Зараз друга година.", en_ex: "It's two o'clock.", ru_ex: "Сейчас два часа." },
            { t: "Числа", no: "tres", uk: "три", en: "three", ru: "три", ex_no: "Tengo tres hermanos.", ex_uk: "У мене три брати.", en_ex: "I have three brothers.", ru_ex: "У меня три брата." },
            { t: "Числа", no: "cuatro", uk: "чотири", en: "four", ru: "четыре", ex_no: "La mesa tiene cuatro patas.", ex_uk: "У стола чотири ноги.", en_ex: "The table has four legs.", ru_ex: "У стола четыре ноги." },
            { t: "Числа", no: "cinco", uk: "п'ять", en: "five", ru: "пять", ex_no: "Termino de trabajar a las cinco.", ex_uk: "Я закінчую роботу о п'ятій.", en_ex: "I finish work at five.", ru_ex: "Я заканчиваю работу в пять." },
            { t: "Числа", no: "seis", uk: "шість", en: "six", ru: "шесть", ex_no: "Nos despertamos a las seis.", ex_uk: "Ми прокидаємось о шостій.", en_ex: "We wake up at six.", ru_ex: "Мы просыпаемся в шесть." },
            { t: "Числа", no: "siete", uk: "сім", en: "seven", ru: "семь", ex_no: "Una semana tiene siete días.", ex_uk: "У тижні сім днів.", en_ex: "There are seven days in a week.", ru_ex: "В неделе семь дней." },
            { t: "Числа", no: "ocho", uk: "вісім", en: "eight", ru: "восемь", ex_no: "La tienda abre a las ocho.", ex_uk: "Магазин відкривається о восьмій.", en_ex: "The shop opens at eight.", ru_ex: "Магазин открывается в восемь." },
            { t: "Числа", no: "nueve", uk: "дев'ять", en: "nine", ru: "девять", ex_no: "La escuela empieza a las nueve.", ex_uk: "Школа починається о дев'ятій.", en_ex: "School starts at nine.", ru_ex: "Школа начинается в девять." },
            { t: "Числа", no: "diez", uk: "десять", en: "ten", ru: "десять", ex_no: "Cuento hasta diez.", ex_uk: "Я рахую до десяти.", en_ex: "I count to ten.", ru_ex: "Я считаю до десяти." },
            { t: "Числа", no: "veinte", uk: "двадцять", en: "twenty", ru: "двадцать", ex_no: "Ella tiene veinte años.", ex_uk: "Їй двадцять років.", en_ex: "She is twenty years old.", ru_ex: "Ей двадцать лет." },
            { t: "Числа", no: "cien", uk: "сто", en: "hundred", ru: "сто", ex_no: "Hay cien personas aquí.", ex_uk: "Тут сто людей.", en_ex: "There are a hundred people here.", ru_ex: "Здесь сто человек." },
            // Family
            { t: "Родина", no: "la familia", uk: "родина", en: "family", ru: "семья", ex_no: "Amo a mi familia.", ex_uk: "Я люблю свою родину.", en_ex: "I love my family.", ru_ex: "Я люблю свою семью." },
            { t: "Родина", no: "la madre", uk: "мама", en: "mother", ru: "мама", ex_no: "Mi madre cocina la cena.", ex_uk: "Моя мама готує вечерю.", en_ex: "My mother cooks dinner.", ru_ex: "Моя мама готовит ужин." },
            { t: "Родина", no: "el padre", uk: "тато", en: "father", ru: "папа", ex_no: "Mi padre trabaja en la ciudad.", ex_uk: "Мій тато працює в місті.", en_ex: "My father works in the city.", ru_ex: "Мой папа работает в городе." },
            { t: "Родина", no: "la hermana", uk: "сестра", en: "sister", ru: "сестра", ex_no: "Mi hermana es más joven que yo.", ex_uk: "Моя сестра молодша за мене.", en_ex: "My sister is younger than me.", ru_ex: "Моя сестра младше меня." },
            { t: "Родина", no: "el hermano", uk: "брат", en: "brother", ru: "брат", ex_no: "Mi hermano vive en Madrid.", ex_uk: "Мій брат живе в Мадриді.", en_ex: "My brother lives in Madrid.", ru_ex: "Мой брат живёт в Мадриде." },
            { t: "Родина", no: "el niño", uk: "дитина", en: "child", ru: "ребёнок", ex_no: "El niño está jugando afuera.", ex_uk: "Дитина грається надворі.", en_ex: "The child is playing outside.", ru_ex: "Ребёнок играет на улице." },
            { t: "Родина", no: "la abuela", uk: "бабуся", en: "grandmother", ru: "бабушка", ex_no: "Mi abuela hornea pan cada semana.", ex_uk: "Моя бабуся пече хліб щотижня.", en_ex: "My grandmother bakes bread every week.", ru_ex: "Моя бабушка печёт хлеб каждую неделю." },
            { t: "Родина", no: "el abuelo", uk: "дідусь", en: "grandfather", ru: "дедушка", ex_no: "Mi abuelo cuenta historias maravillosas.", ex_uk: "Мій дідусь розповідає чудові історії.", en_ex: "My grandfather tells great stories.", ru_ex: "Мой дедушка рассказывает отличные истории." },
            { t: "Родина", no: "el amigo", uk: "друг", en: "friend", ru: "друг", ex_no: "Él es mi mejor amigo.", ex_uk: "Він мій найкращий друг.", en_ex: "He is my best friend.", ru_ex: "Он мой лучший друг." },
            // Colors
            { t: "Кольори", no: "rojo", uk: "червоний", en: "red", ru: "красный", ex_no: "La manzana es roja.", ex_uk: "Яблуко червоне.", en_ex: "The apple is red.", ru_ex: "Яблоко красное." },
            { t: "Кольори", no: "azul", uk: "синій", en: "blue", ru: "синий", ex_no: "El cielo está azul hoy.", ex_uk: "Сьогодні небо синє.", en_ex: "The sky is blue today.", ru_ex: "Сегодня небо синее." },
            { t: "Кольори", no: "verde", uk: "зелений", en: "green", ru: "зелёный", ex_no: "La hierba es verde.", ex_uk: "Трава зелена.", en_ex: "The grass is green.", ru_ex: "Трава зелёная." },
            { t: "Кольори", no: "amarillo", uk: "жовтий", en: "yellow", ru: "жёлтый", ex_no: "El sol es amarillo.", ex_uk: "Сонце жовте.", en_ex: "The sun is yellow.", ru_ex: "Солнце жёлтое." },
            { t: "Кольори", no: "negro", uk: "чорний", en: "black", ru: "чёрный", ex_no: "Ella tiene un gato negro.", ex_uk: "У неї чорний кіт.", en_ex: "She has a black cat.", ru_ex: "У неё чёрный кот." },
            { t: "Кольори", no: "blanco", uk: "білий", en: "white", ru: "белый", ex_no: "La nieve es blanca.", ex_uk: "Сніг білий.", en_ex: "The snow is white.", ru_ex: "Снег белый." },
            { t: "Кольори", no: "naranja", uk: "помаранчевий", en: "orange", ru: "оранжевый", ex_no: "Me gusta el jugo de naranja.", ex_uk: "Мені подобається помаранчевий сік.", en_ex: "I like orange juice.", ru_ex: "Мне нравится апельсиновый сок." },
            // Days
            { t: "Дні тижня", no: "lunes", uk: "понеділок", en: "Monday", ru: "понедельник", ex_no: "Empiezo a trabajar el lunes.", ex_uk: "Я починаю роботу в понеділок.", en_ex: "I start work on Monday.", ru_ex: "Я начинаю работу в понедельник." },
            { t: "Дні тижня", no: "martes", uk: "вівторок", en: "Tuesday", ru: "вторник", ex_no: "Tenemos una reunión el martes.", ex_uk: "У нас зустріч у вівторок.", en_ex: "We have a meeting on Tuesday.", ru_ex: "У нас встреча во вторник." },
            { t: "Дні тижня", no: "miércoles", uk: "середа", en: "Wednesday", ru: "среда", ex_no: "Voy al gimnasio los miércoles.", ex_uk: "Я ходжу в спортзал у середу.", en_ex: "I go to the gym on Wednesday.", ru_ex: "Я хожу в спортзал в среду." },
            { t: "Дні тижня", no: "jueves", uk: "четвер", en: "Thursday", ru: "четверг", ex_no: "El examen es el jueves.", ex_uk: "Іспит у четвер.", en_ex: "The exam is on Thursday.", ru_ex: "Экзамен в четверг." },
            { t: "Дні тижня", no: "viernes", uk: "п'ятниця", en: "Friday", ru: "пятница", ex_no: "Celebramos el viernes.", ex_uk: "Ми святкуємо в п'ятницю.", en_ex: "We celebrate on Friday.", ru_ex: "Мы празднуем в пятницу." },
            { t: "Дні тижня", no: "sábado", uk: "субота", en: "Saturday", ru: "суббота", ex_no: "Limpio la casa los sábados.", ex_uk: "Я прибираю в суботу.", en_ex: "I clean the house on Saturday.", ru_ex: "Я убираюсь в субботу." },
            { t: "Дні тижня", no: "domingo", uk: "неділя", en: "Sunday", ru: "воскресенье", ex_no: "Descansamos los domingos.", ex_uk: "Ми відпочиваємо в неділю.", en_ex: "We rest on Sunday.", ru_ex: "Мы отдыхаем в воскресенье." },
            // Verbs
            { t: "Дієслова", no: "ser", uk: "бути", en: "to be", ru: "быть", ex_no: "Soy estudiante.", ex_uk: "Я студент.", en_ex: "I am a student.", ru_ex: "Я студент." },
            { t: "Дієслова", no: "estar", uk: "бути (перебувати)", en: "to be (location/state)", ru: "быть (нахождение)", ex_no: "Estoy en casa.", ex_uk: "Я вдома.", en_ex: "I am at home.", ru_ex: "Я дома." },
            { t: "Дієслова", no: "tener", uk: "мати", en: "to have", ru: "иметь", ex_no: "Tengo un coche.", ex_uk: "У мене є машина.", en_ex: "I have a car.", ru_ex: "У меня есть машина." },
            { t: "Дієслова", no: "ir", uk: "йти", en: "to go", ru: "идти", ex_no: "Voy al trabajo todos los días.", ex_uk: "Я йду на роботу щодня.", en_ex: "I go to work every day.", ru_ex: "Я иду на работу каждый день." },
            { t: "Дієслова", no: "comer", uk: "їсти", en: "to eat", ru: "есть", ex_no: "Desayunamos a las siete.", ex_uk: "Ми снідаємо о сьомій.", en_ex: "We eat breakfast at seven.", ru_ex: "Мы завтракаем в семь." },
            { t: "Дієслова", no: "beber", uk: "пити", en: "to drink", ru: "пить", ex_no: "Bebo agua cada mañana.", ex_uk: "Я п'ю воду щоранку.", en_ex: "I drink water every morning.", ru_ex: "Я пью воду каждое утро." },
            { t: "Дієслова", no: "ver", uk: "бачити", en: "to see", ru: "видеть", ex_no: "Puedo ver las montañas.", ex_uk: "Я бачу гори.", en_ex: "I can see the mountains.", ru_ex: "Я вижу горы." },
            { t: "Дієслова", no: "hablar", uk: "говорити", en: "to speak", ru: "говорить", ex_no: "Ella habla tres idiomas.", ex_uk: "Вона говорить трьома мовами.", en_ex: "She speaks three languages.", ru_ex: "Она говорит на трёх языках." },
            { t: "Дієслова", no: "querer", uk: "хотіти", en: "to want", ru: "хотеть", ex_no: "Quiero un café, por favor.", ex_uk: "Я хочу каву, будь ласка.", en_ex: "I want a coffee, please.", ru_ex: "Я хочу кофе, пожалуйста." },
            { t: "Дієслова", no: "vivir", uk: "жити", en: "to live", ru: "жить", ex_no: "Vivimos en un pueblo pequeño.", ex_uk: "Ми живемо в маленькому місті.", en_ex: "We live in a small town.", ru_ex: "Мы живём в маленьком городе." },
            { t: "Дієслова", no: "trabajar", uk: "працювати", en: "to work", ru: "работать", ex_no: "Él trabaja en un hospital.", ex_uk: "Він працює в лікарні.", en_ex: "He works in a hospital.", ru_ex: "Он работает в больнице." },
            { t: "Дієслова", no: "dormir", uk: "спати", en: "to sleep", ru: "спать", ex_no: "El bebé duerme mucho.", ex_uk: "Дитина багато спить.", en_ex: "The baby sleeps a lot.", ru_ex: "Малыш много спит." },
            // Food
            { t: "Їжа", no: "el pan", uk: "хліб", en: "bread", ru: "хлеб", ex_no: "Compro pan fresco todos los días.", ex_uk: "Я купую свіжий хліб щодня.", en_ex: "I buy fresh bread every day.", ru_ex: "Я покупаю свежий хлеб каждый день." },
            { t: "Їжа", no: "el agua", uk: "вода", en: "water", ru: "вода", ex_no: "¿Me puede dar un poco de agua?", ex_uk: "Можна мені трохи води?", en_ex: "Can I have some water?", ru_ex: "Можно мне немного воды?" },
            { t: "Їжа", no: "la leche", uk: "молоко", en: "milk", ru: "молоко", ex_no: "Bebo leche en el desayuno.", ex_uk: "Я п'ю молоко зі сніданком.", en_ex: "I drink milk with breakfast.", ru_ex: "Я пью молоко с завтраком." },
            { t: "Їжа", no: "el huevo", uk: "яйце", en: "egg", ru: "яйцо", ex_no: "Como un huevo cada mañana.", ex_uk: "Я їм яйце щоранку.", en_ex: "I eat an egg every morning.", ru_ex: "Я ем яйцо каждое утро." },
            { t: "Їжа", no: "la manzana", uk: "яблуко", en: "apple", ru: "яблоко", ex_no: "Ella come una manzana en el almuerzo.", ex_uk: "Вона їсть яблуко на обід.", en_ex: "She eats an apple for lunch.", ru_ex: "Она ест яблоко на обед." },
            { t: "Їжа", no: "la carne", uk: "м'ясо", en: "meat", ru: "мясо", ex_no: "No comemos carne los viernes.", ex_uk: "Ми не їмо м'ясо по п'ятницях.", en_ex: "We don't eat meat on Fridays.", ru_ex: "Мы не едим мясо по пятницам." },
            { t: "Їжа", no: "el queso", uk: "сир", en: "cheese", ru: "сыр", ex_no: "Me encanta el queso español.", ex_uk: "Я люблю іспанський сир.", en_ex: "I love Spanish cheese.", ru_ex: "Я люблю испанский сыр." },
            { t: "Їжа", no: "el café", uk: "кава", en: "coffee", ru: "кофе", ex_no: "Bebo café cada mañana.", ex_uk: "Я п'ю каву щоранку.", en_ex: "I drink coffee every morning.", ru_ex: "Я пью кофе каждое утро." },
            // Adjectives
            { t: "Прикметники", no: "grande", uk: "великий", en: "big", ru: "большой", ex_no: "Esta es una casa grande.", ex_uk: "Це великий будинок.", en_ex: "This is a big house.", ru_ex: "Это большой дом." },
            { t: "Прикметники", no: "pequeño", uk: "маленький", en: "small", ru: "маленький", ex_no: "El gato es muy pequeño.", ex_uk: "Кіт дуже маленький.", en_ex: "The cat is very small.", ru_ex: "Кот очень маленький." },
            { t: "Прикметники", no: "bueno", uk: "добрий", en: "good", ru: "хороший", ex_no: "Esta es una buena idea.", ex_uk: "Це добра ідея.", en_ex: "This is a good idea.", ru_ex: "Это хорошая идея." },
            { t: "Прикметники", no: "malo", uk: "поганий", en: "bad", ru: "плохой", ex_no: "El tiempo está malo hoy.", ex_uk: "Сьогодні погана погода.", en_ex: "The weather is bad today.", ru_ex: "Сегодня плохая погода." },
            { t: "Прикметники", no: "nuevo", uk: "новий", en: "new", ru: "новый", ex_no: "Compré un teléfono nuevo.", ex_uk: "Я купив новий телефон.", en_ex: "I bought a new phone.", ru_ex: "Я купил новый телефон." },
            { t: "Прикметники", no: "viejo", uk: "старий", en: "old", ru: "старый", ex_no: "Este libro es muy viejo.", ex_uk: "Ця книга дуже стара.", en_ex: "This book is very old.", ru_ex: "Эта книга очень старая." },
            // Body
            { t: "Тіло", no: "la cabeza", uk: "голова", en: "head", ru: "голова", ex_no: "Me duele la cabeza.", ex_uk: "У мене болить голова.", en_ex: "My head hurts.", ru_ex: "У меня болит голова." },
            { t: "Тіло", no: "la mano", uk: "рука", en: "hand", ru: "рука", ex_no: "Dame tu mano.", ex_uk: "Дай мені руку.", en_ex: "Give me your hand.", ru_ex: "Дай мне руку." },
            { t: "Тіло", no: "el ojo", uk: "око", en: "eye", ru: "глаз", ex_no: "Ella tiene los ojos azules.", ex_uk: "У неї блакитні очі.", en_ex: "She has blue eyes.", ru_ex: "У неё голубые глаза." },
            { t: "Тіло", no: "la oreja", uk: "вухо", en: "ear", ru: "ухо", ex_no: "Tengo una infección de oído.", ex_uk: "У мене інфекція вуха.", en_ex: "I have an ear infection.", ru_ex: "У меня инфекция уха." },
            { t: "Тіло", no: "la nariz", uk: "ніс", en: "nose", ru: "нос", ex_no: "Su nariz está roja.", ex_uk: "Її ніс червоний.", en_ex: "Her nose is red.", ru_ex: "У неё красный нос." },
            // Home
            { t: "Дім", no: "la casa", uk: "будинок", en: "house", ru: "дом", ex_no: "Vivimos en una casa pequeña.", ex_uk: "Ми живемо в маленькому будинку.", en_ex: "We live in a small house.", ru_ex: "Мы живём в маленьком доме." },
            { t: "Дім", no: "la habitación", uk: "кімната", en: "room", ru: "комната", ex_no: "Mi habitación está arriba.", ex_uk: "Моя кімната нагорі.", en_ex: "My room is upstairs.", ru_ex: "Моя комната наверху." },
            { t: "Дім", no: "la puerta", uk: "двері", en: "door", ru: "дверь", ex_no: "Por favor, cierra la puerta.", ex_uk: "Будь ласка, зачини двері.", en_ex: "Please close the door.", ru_ex: "Пожалуйста, закрой дверь." },
            { t: "Дім", no: "la mesa", uk: "стіл", en: "table", ru: "стол", ex_no: "El libro está sobre la mesa.", ex_uk: "Книга на столі.", en_ex: "The book is on the table.", ru_ex: "Книга на столе." },
            { t: "Дім", no: "la silla", uk: "стілець", en: "chair", ru: "стул", ex_no: "Siéntate en la silla.", ex_uk: "Сідай на стілець.", en_ex: "Sit on the chair.", ru_ex: "Садись на стул." },
            // Transport
            { t: "Транспорт", no: "el coche", uk: "машина", en: "car", ru: "машина", ex_no: "Vamos al trabajo en coche.", ex_uk: "Ми їздимо на роботу машиною.", en_ex: "We drive to work by car.", ru_ex: "Мы ездим на работу на машине." },
            { t: "Транспорт", no: "el autobús", uk: "автобус", en: "bus", ru: "автобус", ex_no: "Tomo el autobús para ir a la escuela.", ex_uk: "Я їду автобусом до школи.", en_ex: "I take the bus to school.", ru_ex: "Я еду автобусом в школу." },
            { t: "Транспорт", no: "el tren", uk: "поїзд", en: "train", ru: "поезд", ex_no: "El tren sale a las ocho.", ex_uk: "Поїзд відправляється о восьмій.", en_ex: "The train leaves at eight.", ru_ex: "Поезд отправляется в восемь." },
            { t: "Транспорт", no: "la bicicleta", uk: "велосипед", en: "bicycle", ru: "велосипед", ex_no: "Voy al trabajo en bicicleta.", ex_uk: "Я їду на велосипеді на роботу.", en_ex: "I ride my bicycle to work.", ru_ex: "Я еду на велосипеде на работу." },
        ],

        // -------------------- A2 --------------------
        A2: [
            // Shopping
            { t: "Покупки", no: "la tienda", uk: "магазин", en: "shop", ru: "магазин", ex_no: "La tienda abre a las nueve.", ex_uk: "Магазин відкривається о дев'ятій.", en_ex: "The shop opens at nine.", ru_ex: "Магазин открывается в девять." },
            { t: "Покупки", no: "comprar", uk: "купувати", en: "buy", ru: "покупать", ex_no: "Compro pan fresco todos los días.", ex_uk: "Я купую свіжий хліб щодня.", en_ex: "I buy fresh bread every day.", ru_ex: "Я покупаю свежий хлеб каждый день." },
            { t: "Покупки", no: "el precio", uk: "ціна", en: "price", ru: "цена", ex_no: "¿Cuál es el precio de esto?", ex_uk: "Яка ціна на це?", en_ex: "What is the price of this?", ru_ex: "Какая цена на это?" },
            { t: "Покупки", no: "el dinero", uk: "гроші", en: "money", ru: "деньги", ex_no: "No tengo suficiente dinero.", ex_uk: "У мене недостатньо грошей.", en_ex: "I don't have enough money.", ru_ex: "У меня недостаточно денег." },
            // Directions
            { t: "Напрямки", no: "a la izquierda", uk: "ліворуч", en: "left", ru: "налево", ex_no: "Gira a la izquierda en la esquina.", ex_uk: "Поверни ліворуч на розі.", en_ex: "Turn left at the corner.", ru_ex: "Поверни налево на углу." },
            { t: "Напрямки", no: "a la derecha", uk: "праворуч", en: "right", ru: "направо", ex_no: "La estación está a tu derecha.", ex_uk: "Вокзал праворуч від тебе.", en_ex: "The station is on your right.", ru_ex: "Вокзал справа от тебя." },
            { t: "Напрямки", no: "todo recto", uk: "прямо", en: "straight", ru: "прямо", ex_no: "Sigue todo recto.", ex_uk: "Іди прямо.", en_ex: "Go straight ahead.", ru_ex: "Иди прямо." },
            { t: "Напрямки", no: "el mapa", uk: "карта", en: "map", ru: "карта", ex_no: "¿Puedes mostrarme en el mapa?", ex_uk: "Можеш показати мені на карті?", en_ex: "Can you show me on the map?", ru_ex: "Можешь показать мне на карте?" },
            // Work
            { t: "Робота", no: "el trabajo", uk: "робота", en: "job", ru: "работа", ex_no: "Ella encontró un nuevo trabajo.", ex_uk: "Вона знайшла нову роботу.", en_ex: "She found a new job.", ru_ex: "Она нашла новую работу." },
            { t: "Робота", no: "la oficina", uk: "офіс", en: "office", ru: "офис", ex_no: "Trabajo en una oficina.", ex_uk: "Я працюю в офісі.", en_ex: "I work in an office.", ru_ex: "Я работаю в офисе." },
            { t: "Робота", no: "la reunión", uk: "зустріч", en: "meeting", ru: "встреча", ex_no: "Tenemos una reunión a las diez.", ex_uk: "У нас зустріч о десятій.", en_ex: "We have a meeting at ten.", ru_ex: "У нас встреча в десять." },
            { t: "Робота", no: "el salario", uk: "зарплата", en: "salary", ru: "зарплата", ex_no: "Mi salario es bueno.", ex_uk: "Моя зарплата хороша.", en_ex: "My salary is good.", ru_ex: "Моя зарплата хорошая." },
            // Hobbies
            { t: "Хобі", no: "el hobby", uk: "хобі", en: "hobby", ru: "хобби", ex_no: "¿Cuál es tu hobby?", ex_uk: "Яке твоє хобі?", en_ex: "What is your hobby?", ru_ex: "Какое у тебя хобби?" },
            { t: "Хобі", no: "leer", uk: "читати", en: "read", ru: "читать", ex_no: "Me gusta leer libros.", ex_uk: "Я люблю читати книги.", en_ex: "I like to read books.", ru_ex: "Я люблю читать книги." },
            { t: "Хобі", no: "viajar", uk: "подорожувати", en: "travel", ru: "путешествовать", ex_no: "Nos encanta viajar.", ex_uk: "Ми любимо подорожувати.", en_ex: "We love to travel.", ru_ex: "Мы любим путешествовать." },
            { t: "Хобі", no: "la música", uk: "музика", en: "music", ru: "музыка", ex_no: "Escucho música todos los días.", ex_uk: "Я слухаю музику щодня.", en_ex: "I listen to music every day.", ru_ex: "Я слушаю музыку каждый день." },
            // Weather
            { t: "Погода", no: "la lluvia", uk: "дощ", en: "rain", ru: "дождь", ex_no: "Mañana va a llover.", ex_uk: "Завтра буде дощ.", en_ex: "It's going to rain tomorrow.", ru_ex: "Завтра будет дождь." },
            { t: "Погода", no: "la nieve", uk: "сніг", en: "snow", ru: "снег", ex_no: "En invierno nieva.", ex_uk: "Взимку йде сніг.", en_ex: "It snows in winter.", ru_ex: "Зимой идёт снег." },
            { t: "Погода", no: "soleado", uk: "сонячно", en: "sunny", ru: "солнечно", ex_no: "Hoy está soleado.", ex_uk: "Сьогодні сонячно.", en_ex: "It's sunny today.", ru_ex: "Сегодня солнечно." },
            { t: "Погода", no: "frío", uk: "холодно", en: "cold", ru: "холодно", ex_no: "Hace frío afuera.", ex_uk: "На вулиці холодно.", en_ex: "It's cold outside.", ru_ex: "На улице холодно." },
            { t: "Погода", no: "calor", uk: "спекотно", en: "hot", ru: "жарко", ex_no: "Hace mucho calor en verano.", ex_uk: "Влітку дуже спекотно.", en_ex: "It's very hot in summer.", ru_ex: "Летом очень жарко." },
            // Education
            { t: "Освіта", no: "la escuela", uk: "школа", en: "school", ru: "школа", ex_no: "Los niños van a la escuela.", ex_uk: "Діти ходять до школи.", en_ex: "The children go to school.", ru_ex: "Дети ходят в школу." },
            { t: "Освіта", no: "el profesor", uk: "вчитель", en: "teacher", ru: "учитель", ex_no: "El profesor explica la gramática.", ex_uk: "Вчитель пояснює граматику.", en_ex: "The teacher explains grammar.", ru_ex: "Учитель объясняет грамматику." },
            { t: "Освіта", no: "el estudiante", uk: "студент", en: "student", ru: "студент", ex_no: "Ella es estudiante en la universidad.", ex_uk: "Вона студентка університету.", en_ex: "She is a student at university.", ru_ex: "Она студентка университета." },
            { t: "Освіта", no: "el examen", uk: "іспит", en: "exam", ru: "экзамен", ex_no: "Aprobé el examen.", ex_uk: "Я склав іспит.", en_ex: "I passed the exam.", ru_ex: "Я сдал экзамен." },
            // Restaurant
            { t: "Ресторан", no: "el menú", uk: "меню", en: "menu", ru: "меню", ex_no: "¿Puedo ver el menú?", ex_uk: "Можна меню?", en_ex: "Can I have the menu?", ru_ex: "Можно меню?" },
            { t: "Ресторан", no: "la cuenta", uk: "рахунок", en: "bill", ru: "счёт", ex_no: "¿Nos puede traer la cuenta?", ex_uk: "Можна нам рахунок?", en_ex: "Can we have the bill?", ru_ex: "Можно нам счёт?" },
            { t: "Ресторан", no: "el camarero", uk: "офіціант", en: "waiter", ru: "официант", ex_no: "El camarero es amable.", ex_uk: "Офіціант привітний.", en_ex: "The waiter is friendly.", ru_ex: "Официант приветливый." },
            { t: "Ресторан", no: "pedir", uk: "замовляти", en: "order", ru: "заказывать", ex_no: "Pedimos pizza los viernes.", ex_uk: "Ми замовляємо піцу в п'ятницю.", en_ex: "We order pizza on Friday.", ru_ex: "Мы заказываем пиццу в пятницу." },
            // Emotions
            { t: "Емоції", no: "feliz", uk: "щасливий", en: "happy", ru: "счастливый", ex_no: "Se siente feliz hoy.", ex_uk: "Вона сьогодні щаслива.", en_ex: "She feels happy today.", ru_ex: "Она сегодня счастлива." },
            { t: "Емоції", no: "triste", uk: "сумний", en: "sad", ru: "грустный", ex_no: "La película triste me hizo llorar.", ex_uk: "Сумний фільм змусив мене плакати.", en_ex: "The sad movie made me cry.", ru_ex: "Грустный фильм заставил меня плакать." },
            { t: "Емоції", no: "enfadado", uk: "злий", en: "angry", ru: "злой", ex_no: "Se enfada cuando llega tarde.", ex_uk: "Він злиться, коли запізнюється.", en_ex: "He gets angry when he is late.", ru_ex: "Он злится, когда опаздывает." },
            { t: "Емоції", no: "cansado", uk: "втомлений", en: "tired", ru: "уставший", ex_no: "Me siento cansado después del trabajo.", ex_uk: "Я почуваюся втомленим після роботи.", en_ex: "I feel tired after work.", ru_ex: "Я чувствую себя уставшим после работы." },
            // Past tense
            { t: "Минулий час", no: "caminé", uk: "я пішов", en: "I walked", ru: "я пошёл", ex_no: "Caminé hasta la estación.", ex_uk: "Я пішов на вокзал пішки.", en_ex: "I walked to the station.", ru_ex: "Я пошёл на вокзал пешком." },
            { t: "Минулий час", no: "visité", uk: "я відвідав", en: "I visited", ru: "я посетил", ex_no: "Visitamos Madrid el año pasado.", ex_uk: "Ми відвідали Мадрид минулого року.", en_ex: "We visited Madrid last year.", ru_ex: "Мы посетили Мадрид в прошлом году." },
            { t: "Минулий час", no: "me quedé", uk: "я зупинився", en: "I stayed", ru: "я остановился", ex_no: "Nos quedamos en un buen hotel.", ex_uk: "Ми зупинилися в хорошому готелі.", en_ex: "We stayed at a nice hotel.", ru_ex: "Мы остановились в хорошем отеле." },
            { t: "Минулий час", no: "miré", uk: "я дивився", en: "I watched", ru: "я смотрел", ex_no: "Miré la televisión anoche.", ex_uk: "Я дивився телевізор учора ввечері.", en_ex: "I watched TV last night.", ru_ex: "Я смотрел телевизор вчера вечером." },
            // Health
            { t: "Здоров'я", no: "el médico", uk: "лікар", en: "doctor", ru: "врач", ex_no: "Necesito ver a un médico.", ex_uk: "Мені потрібно піти до лікаря.", en_ex: "I need to see a doctor.", ru_ex: "Мне нужно пойти к врачу." },
            { t: "Здоров'я", no: "la medicina", uk: "ліки", en: "medicine", ru: "лекарство", ex_no: "Toma esta medicina tres veces al día.", ex_uk: "Приймай ці ліки тричі на день.", en_ex: "Take this medicine three times a day.", ru_ex: "Принимай это лекарство три раза в день." },
            { t: "Здоров'я", no: "la fiebre", uk: "температура", en: "fever", ru: "температура", ex_no: "Tiene fiebre alta.", ex_uk: "У нього висока температура.", en_ex: "He has a high fever.", ru_ex: "У него высокая температура." },
        ],

        // -------------------- B1 --------------------
        B1: [
            // Travel
            { t: "Подорожі", no: "el aeropuerto", uk: "аеропорт", en: "airport", ru: "аэропорт", ex_no: "Nos reunimos en el aeropuerto.", ex_uk: "Зустрінемось в аеропорту.", en_ex: "We meet at the airport.", ru_ex: "Встретимся в аэропорту." },
            { t: "Подорожі", no: "el billete", uk: "квиток", en: "ticket", ru: "билет", ex_no: "Reservé un billete online.", ex_uk: "Я забронював квиток онлайн.", en_ex: "I booked a ticket online.", ru_ex: "Я забронировал билет онлайн." },
            { t: "Подорожі", no: "el hotel", uk: "готель", en: "hotel", ru: "отель", ex_no: "El hotel está cerca del centro.", ex_uk: "Готель біля центру.", en_ex: "The hotel is near the center.", ru_ex: "Отель рядом с центром." },
            { t: "Подорожі", no: "el pasaporte", uk: "паспорт", en: "passport", ru: "паспорт", ex_no: "No olvides tu pasaporte.", ex_uk: "Не забудь паспорт.", en_ex: "Don't forget your passport.", ru_ex: "Не забудь паспорт." },
            { t: "Подорожі", no: "el equipaje", uk: "багаж", en: "luggage", ru: "багаж", ex_no: "Mi equipaje es pesado.", ex_uk: "Мій багаж важкий.", en_ex: "My luggage is heavy.", ru_ex: "Мой багаж тяжёлый." },
            { t: "Подорожі", no: "el retraso", uk: "затримка", en: "delay", ru: "задержка", ex_no: "Hubo un retraso por el mal tiempo.", ex_uk: "Через негоду сталася затримка.", en_ex: "There was a delay due to bad weather.", ru_ex: "Из-за непогоды произошла задержка." },
            { t: "Подорожі", no: "el destino", uk: "пункт призначення", en: "destination", ru: "назначение", ex_no: "Nuestro destino es Madrid.", ex_uk: "Наш пункт призначення — Мадрид.", en_ex: "Our destination is Madrid.", ru_ex: "Наш пункт назначения — Мадрид." },
            { t: "Подорожі", no: "el turista", uk: "турист", en: "tourist", ru: "турист", ex_no: "Los turistas visitan el museo.", ex_uk: "Туристи відвідують музей.", en_ex: "Tourists visit the museum.", ru_ex: "Туристы посещают музей." },
            // Health
            { t: "Здоров'я", no: "el hospital", uk: "лікарня", en: "hospital", ru: "больница", ex_no: "Fue llevado al hospital.", ex_uk: "Його відвезли до лікарні.", en_ex: "He was taken to the hospital.", ru_ex: "Его отвезли в больницу." },
            { t: "Здоров'я", no: "la receta", uk: "рецепт", en: "prescription", ru: "рецепт", ex_no: "Necesito una receta para este medicamento.", ex_uk: "Мені потрібен рецепт на ці ліки.", en_ex: "I need a prescription for this medicine.", ru_ex: "Мне нужен рецепт на это лекарство." },
            { t: "Здоров'я", no: "el seguro", uk: "страхування", en: "insurance", ru: "страховка", ex_no: "Es aconsejable tener seguro de viaje.", ex_uk: "Розумно мати туристичну страховку.", en_ex: "It's wise to have travel insurance.", ru_ex: "Разумно иметь туристическую страховку." },
            { t: "Здоров'я", no: "la vacuna", uk: "вакцина", en: "vaccine", ru: "вакцина", ex_no: "Los niños reciben esta vacuna gratis.", ex_uk: "Діти отримують цю вакцину безкоштовно.", en_ex: "Children get this vaccine for free.", ru_ex: "Дети получают эту вакцину бесплатно." },
            // Relationships
            { t: "Стосунки", no: "la pareja", uk: "партнер", en: "partner", ru: "партнёр", ex_no: "Presenté a mi pareja a mi familia.", ex_uk: "Я познайомив свого партнера з родиною.", en_ex: "I introduced my partner to my family.", ru_ex: "Я познакомил своего партнёра с семьёй." },
            { t: "Стосунки", no: "el matrimonio", uk: "шлюб", en: "marriage", ru: "брак", ex_no: "Celebraron diez años de matrimonio.", ex_uk: "Вони відсвяткували десять років шлюбу.", en_ex: "They celebrated ten years of marriage.", ru_ex: "Они отпраздновали десять лет брака." },
            { t: "Стосунки", no: "la confianza", uk: "довіра", en: "trust", ru: "доверие", ex_no: "La confianza es importante en una relación.", ex_uk: "Довіра важлива у стосунках.", en_ex: "Trust is important in a relationship.", ru_ex: "Доверие важно в отношениях." },
            // Media
            { t: "Медіа", no: "las noticias", uk: "новини", en: "news", ru: "новости", ex_no: "Veo las noticias todas las noches.", ex_uk: "Я дивлюся новини щовечора.", en_ex: "I watch the news every evening.", ru_ex: "Я смотрю новости каждый вечер." },
            { t: "Медіа", no: "el periódico", uk: "газета", en: "newspaper", ru: "газета", ex_no: "Lee el periódico por la mañana.", ex_uk: "Він читає газету вранці.", en_ex: "He reads the newspaper in the morning.", ru_ex: "Он читает газету утром." },
            { t: "Медіа", no: "las redes sociales", uk: "соціальні мережі", en: "social media", ru: "социальные сети", ex_no: "Los jóvenes pasan tiempo en las redes sociales.", ex_uk: "Молодь проводить час у соціальних мережах.", en_ex: "Young people spend time on social media.", ru_ex: "Молодёжь проводит время в социальных сетях." },
            { t: "Медіа", no: "el podcast", uk: "подкаст", en: "podcast", ru: "подкаст", ex_no: "Escucho podcasts mientras hago ejercicio.", ex_uk: "Я слухаю подкасти під час тренування.", en_ex: "I listen to podcasts while exercising.", ru_ex: "Я слушаю подкасты во время тренировки." },
            // Environment
            { t: "Довкілля", no: "el medio ambiente", uk: "довкілля", en: "environment", ru: "окружающая среда", ex_no: "Debemos proteger el medio ambiente.", ex_uk: "Ми повинні захищати довкілля.", en_ex: "We must protect the environment.", ru_ex: "Мы должны защищать окружающую среду." },
            { t: "Довкілля", no: "el clima", uk: "клімат", en: "climate", ru: "климат", ex_no: "El cambio climático es un problema global.", ex_uk: "Зміна клімату — глобальна проблема.", en_ex: "Climate change is a global problem.", ru_ex: "Изменение климата — глобальная проблема." },
            { t: "Довкілля", no: "la contaminación", uk: "забруднення", en: "pollution", ru: "загрязнение", ex_no: "La contaminación daña la vida silvestre.", ex_uk: "Забруднення шкодить дикій природі.", en_ex: "Pollution harms wildlife.", ru_ex: "Загрязнение вредит дикой природе." },
            { t: "Довкілля", no: "el reciclaje", uk: "переробка", en: "recycling", ru: "переработка", ex_no: "El reciclaje es importante.", ex_uk: "Переробка важлива.", en_ex: "Recycling is important.", ru_ex: "Переработка важна." },
            { t: "Довкілля", no: "la basura", uk: "відходи", en: "waste", ru: "отходы", ex_no: "Clasificamos la basura por categorías.", ex_uk: "Ми сортуємо сміття за категоріями.", en_ex: "We sort waste into categories.", ru_ex: "Мы сортируем отходы по категориям." },
            // Verbs
            { t: "Дієслова", no: "entender", uk: "розуміти", en: "understand", ru: "понимать", ex_no: "No entiendo lo que quieres decir.", ex_uk: "Я не розумію, що ти маєш на увазі.", en_ex: "I don't understand what you mean.", ru_ex: "Я не понимаю, что ты имеешь в виду." },
            { t: "Дієслова", no: "explicar", uk: "пояснювати", en: "explain", ru: "объяснять", ex_no: "¿Puedes explicar la regla otra vez?", ex_uk: "Можеш пояснити правило ще раз?", en_ex: "Can you explain the rule again?", ru_ex: "Можешь объяснить правило ещё раз?" },
            { t: "Дієслова", no: "creer", uk: "вірити", en: "believe", ru: "верить", ex_no: "Creo que ella tiene razón.", ex_uk: "Я вірю, що вона має рацію.", en_ex: "I believe she is right.", ru_ex: "Я верю, что она права." },
            { t: "Дієслова", no: "intentar", uk: "пробувати", en: "try", ru: "пытаться", ex_no: "Intento aprender español.", ex_uk: "Я намагаюся вивчити іспанську.", en_ex: "I'm trying to learn Spanish.", ru_ex: "Я пытаюсь выучить испанский." },
            { t: "Дієслова", no: "decidir", uk: "вирішувати", en: "decide", ru: "решать", ex_no: "Decidí mudarme a Madrid.", ex_uk: "Я вирішив переїхати до Мадрида.", en_ex: "I decided to move to Madrid.", ru_ex: "Я решил переехать в Мадрид." },
            { t: "Дієслова", no: "evitar", uk: "уникати", en: "avoid", ru: "избегать", ex_no: "Debemos evitar los riesgos.", ex_uk: "Нам слід уникати ризиків.", en_ex: "We should avoid risks.", ru_ex: "Нам следует избегать рисков." },
            // Career
            { t: "Кар'єра", no: "la carrera", uk: "кар'єра", en: "career", ru: "карьера", ex_no: "Ella tiene una carrera exitosa.", ex_uk: "Вона має успішну кар'єру.", en_ex: "She has a successful career.", ru_ex: "У неё успешная карьера." },
            { t: "Кар'єра", no: "la entrevista", uk: "співбесіда", en: "interview", ru: "собеседование", ex_no: "La entrevista fue bien.", ex_uk: "Співбесіда пройшла добре.", en_ex: "The interview went well.", ru_ex: "Собеседование прошло хорошо." },
            { t: "Кар'єра", no: "el colega", uk: "колега", en: "colleague", ru: "коллега", ex_no: "Mis colegas son amables.", ex_uk: "Мої колеги привітні.", en_ex: "My colleagues are friendly.", ru_ex: "Мои коллеги приветливы." },
            { t: "Кар'єра", no: "la solicitud", uk: "заявка", en: "application", ru: "заявка", ex_no: "Envié mi solicitud ayer.", ex_uk: "Я подав заявку вчора.", en_ex: "I submitted my application yesterday.", ru_ex: "Я подал заявку вчера." },
        ],

        // -------------------- B2 --------------------
        B2: [
            // Politics
            { t: "Політика", no: "el gobierno", uk: "уряд", en: "government", ru: "правительство", ex_no: "El gobierno presentó un nuevo presupuesto.", ex_uk: "Уряд представив новий бюджет.", en_ex: "The government presented a new budget.", ru_ex: "Правительство представило новый бюджет." },
            { t: "Політика", no: "las elecciones", uk: "вибори", en: "election", ru: "выборы", ex_no: "Las elecciones son el mes que viene.", ex_uk: "Вибори наступного місяця.", en_ex: "The election is next month.", ru_ex: "Выборы в следующем месяце." },
            { t: "Політика", no: "la democracia", uk: "демократія", en: "democracy", ru: "демократия", ex_no: "La libertad de expresión es un pilar de la democracia.", ex_uk: "Свобода слова — основа демократії.", en_ex: "Freedom of speech is a cornerstone of democracy.", ru_ex: "Свобода слова — основа демократии." },
            { t: "Політика", no: "la oposición", uk: "опозиція", en: "opposition", ru: "оппозиция", ex_no: "La oposición criticó la propuesta.", ex_uk: "Опозиція розкритикувала пропозицію.", en_ex: "The opposition criticized the proposal.", ru_ex: "Оппозиция раскритиковала предложение." },
            // Economy
            { t: "Економіка", no: "la economía", uk: "економіка", en: "economy", ru: "экономика", ex_no: "La economía está creciendo lentamente.", ex_uk: "Економіка зростає повільно.", en_ex: "The economy is growing slowly.", ru_ex: "Экономика растёт медленно." },
            { t: "Економіка", no: "el mercado", uk: "ринок", en: "market", ru: "рынок", ex_no: "El mercado reaccionó a la noticia.", ex_uk: "Ринок відреагував на новину.", en_ex: "The market reacted to the news.", ru_ex: "Рынок отреагировал на новость." },
            { t: "Економіка", no: "la inflación", uk: "інфляція", en: "inflation", ru: "инфляция", ex_no: "La inflación ha aumentado considerablemente.", ex_uk: "Інфляція різко зросла.", en_ex: "Inflation has risen sharply.", ru_ex: "Инфляция резко выросла." },
            { t: "Економіка", no: "la inversión", uk: "інвестиція", en: "investment", ru: "инвестиция", ex_no: "La inversión a largo plazo es importante.", ex_uk: "Довгострокові інвестиції важливі.", en_ex: "Long-term investment is important.", ru_ex: "Долгосрочные инвестиции важны." },
            // Science
            { t: "Наука", no: "la investigación", uk: "дослідження", en: "research", ru: "исследование", ex_no: "Nuevas investigaciones muestran resultados sorprendentes.", ex_uk: "Нове дослідження показує несподівані результати.", en_ex: "New research shows surprising results.", ru_ex: "Новое исследование показывает неожиданные результаты." },
            { t: "Наука", no: "la teoría", uk: "теорія", en: "theory", ru: "теория", ex_no: "La teoría fue confirmada por experimentos.", ex_uk: "Теорію підтвердили експерименти.", en_ex: "The theory was confirmed by experiments.", ru_ex: "Теорию подтвердили эксперименты." },
            { t: "Наука", no: "el experimento", uk: "експеримент", en: "experiment", ru: "эксперимент", ex_no: "Realizaron un experimento controlado.", ex_uk: "Вони провели контрольований експеримент.", en_ex: "They conducted a controlled experiment.", ru_ex: "Они провели контролируемый эксперимент." },
            { t: "Наука", no: "los datos", uk: "дані", en: "data", ru: "данные", ex_no: "Los datos se recopilaron durante varios meses.", ex_uk: "Дані збирали протягом кількох місяців.", en_ex: "Data was collected over several months.", ru_ex: "Данные собирали в течение нескольких месяцев." },
            // Culture
            { t: "Культура", no: "el arte", uk: "мистецтво", en: "art", ru: "искусство", ex_no: "La exposición muestra arte moderno.", ex_uk: "Виставка демонструє сучасне мистецтво.", en_ex: "The exhibition shows modern art.", ru_ex: "Выставка демонстрирует современное искусство." },
            { t: "Культура", no: "la literatura", uk: "література", en: "literature", ru: "литература", ex_no: "Ella estudia literatura española.", ex_uk: "Вона вивчає іспанську літературу.", en_ex: "She studies Spanish literature.", ru_ex: "Она изучает испанскую литературу." },
            { t: "Культура", no: "el autor", uk: "автор", en: "author", ru: "автор", ex_no: "El autor recibió reconocimiento.", ex_uk: "Автор отримав визнання.", en_ex: "The author received recognition.", ru_ex: "Автор получил признание." },
            // Verbs
            { t: "Дієслова", no: "influir", uk: "впливати", en: "influence", ru: "влиять", ex_no: "Los medios influyen en la opinión pública.", ex_uk: "ЗМІ впливають на громадську думку.", en_ex: "The media influences public opinion.", ru_ex: "СМИ влияют на общественное мнение." },
            { t: "Дієслова", no: "evaluar", uk: "оцінювати", en: "assess", ru: "оценивать", ex_no: "Necesitamos evaluar la situación.", ex_uk: "Нам потрібно оцінити ситуацію.", en_ex: "We need to assess the situation.", ru_ex: "Нам нужно оценить ситуацию." },
            { t: "Дієслова", no: "desarrollar", uk: "розвивати", en: "develop", ru: "развивать", ex_no: "La empresa está desarrollando nuevos productos.", ex_uk: "Компанія розробляє нові продукти.", en_ex: "The company is developing new products.", ru_ex: "Компания разрабатывает новые продукты." },
            { t: "Дієслова", no: "presentar", uk: "представляти", en: "present", ru: "представлять", ex_no: "Presentó los resultados al consejo.", ex_uk: "Вона представила результати правлінню.", en_ex: "She presented the results to the board.", ru_ex: "Она представила результаты правлению." },
            { t: "Дієслова", no: "analizar", uk: "аналізувати", en: "analyze", ru: "анализировать", ex_no: "Necesitamos analizar los datos.", ex_uk: "Нам потрібно проаналізувати дані.", en_ex: "We need to analyze the data.", ru_ex: "Нам нужно проанализировать данные." },
            // Business
            { t: "Бізнес", no: "la empresa", uk: "підприємство", en: "business", ru: "бизнес", ex_no: "La empresa va bien este año.", ex_uk: "Цього року бізнес іде добре.", en_ex: "Business is going well this year.", ru_ex: "В этом году бизнес идёт хорошо." },
            { t: "Бізнес", no: "la estrategia", uk: "стратегія", en: "strategy", ru: "стратегия", ex_no: "Necesitamos una nueva estrategia.", ex_uk: "Нам потрібна нова стратегія.", en_ex: "We need a new strategy.", ru_ex: "Нам нужна новая стратегия." },
            { t: "Бізнес", no: "la competencia", uk: "конкуренція", en: "competition", ru: "конкуренция", ex_no: "La competencia es fuerte.", ex_uk: "Конкуренція є жорсткою.", en_ex: "Competition is intense.", ru_ex: "Конкуренция жёсткая." },
            // Medicine
            { t: "Медицина", no: "el síntoma", uk: "симптом", en: "symptom", ru: "симптом", ex_no: "La fiebre es un síntoma común.", ex_uk: "Температура — поширений симптом.", en_ex: "Fever is a common symptom.", ru_ex: "Температура — распространённый симптом." },
            { t: "Медицина", no: "crónico", uk: "хронічний", en: "chronic", ru: "хронический", ex_no: "Él tiene una enfermedad crónica.", ex_uk: "Він має хронічну хворобу.", en_ex: "He has a chronic illness.", ru_ex: "У него хроническое заболевание." },
            { t: "Медицина", no: "la epidemia", uk: "епідемія", en: "epidemic", ru: "эпидемия", ex_no: "La epidemia se extendió rápidamente.", ex_uk: "Епідемія швидко поширилася.", en_ex: "The epidemic spread quickly.", ru_ex: "Эпидемия быстро распространилась." },
            { t: "Медицина", no: "la prevención", uk: "профілактика", en: "prevention", ru: "профилактика", ex_no: "La prevención es mejor que la cura.", ex_uk: "Профілактика краща за лікування.", en_ex: "Prevention is better than cure.", ru_ex: "Профилактика лучше лечения." },
        ],

        // -------------------- C1 --------------------
        C1: [
            // Discourse
            { t: "Дискурс", no: "sin embargo", uk: "однак", en: "however", ru: "однако", ex_no: "Los resultados fueron prometedores; sin embargo, aún queda trabajo por hacer.", ex_uk: "Результати були обнадійливі; однак роботи ще багато.", en_ex: "The results were promising; however, there is still work to do.", ru_ex: "Результаты были обнадёживающими; однако работы ещё много." },
            { t: "Дискурс", no: "además", uk: "крім того", en: "moreover", ru: "кроме того", ex_no: "El proyecto es caro y además requiere mucho tiempo.", ex_uk: "Проєкт дорогий, і до того ж забирає багато часу.", en_ex: "The project is expensive, and moreover time-consuming.", ru_ex: "Проект дорогой, и к тому же отнимает много времени." },
            { t: "Дискурс", no: "por consiguiente", uk: "отже", en: "consequently", ru: "следовательно", ex_no: "La demanda cayó y, por consiguiente, los precios bajaron.", ex_uk: "Попит впав, і ціни, відповідно, знизилися.", en_ex: "Demand fell, and prices consequently dropped.", ru_ex: "Спрос упал, и цены, соответственно, снизились." },
            { t: "Дискурс", no: "a pesar de", uk: "незважаючи на", en: "despite", ru: "несмотря на", ex_no: "A pesar de las dificultades, completaron el proyecto.", ex_uk: "Незважаючи на труднощі, вони завершили проєкт.", en_ex: "Despite the challenges, they completed the project.", ru_ex: "Несмотря на трудности, они завершили проект." },
            { t: "Дискурс", no: "en otras palabras", uk: "іншими словами", en: "in other words", ru: "другими словами", ex_no: "En otras palabras, la situación es más complicada.", ex_uk: "Іншими словами, ситуація складніша.", en_ex: "In other words, the situation is more complicated.", ru_ex: "Другими словами, ситуация сложнее." },
            // Nuance
            { t: "Нюанси", no: "insinuar", uk: "натякати", en: "imply", ru: "намекать", ex_no: "El informe insinúa que varios factores están en juego.", ex_uk: "Звіт натякає, що діють кілька факторів.", en_ex: "The report implies that several factors are at play.", ru_ex: "Отчёт намекает, что действуют несколько факторов." },
            { t: "Нюанси", no: "enfatizar", uk: "підкреслювати", en: "emphasize", ru: "подчёркивать", ex_no: "El orador enfatizó la importancia de la cooperación.", ex_uk: "Доповідач підкреслив важливість співпраці.", en_ex: "The speaker emphasized the importance of cooperation.", ru_ex: "Докладчик подчеркнул важность сотрудничества." },
            { t: "Нюанси", no: "fundamentar", uk: "обґрунтовувати", en: "substantiate", ru: "обосновывать", ex_no: "Debes fundamentar tu afirmación con pruebas.", ex_uk: "Тобі потрібно обґрунтувати своє твердження доказами.", en_ex: "You need to substantiate your claim with evidence.", ru_ex: "Тебе нужно обосновать своё утверждение доказательствами." },
            { t: "Нюанси", no: "matizado", uk: "нюансований", en: "nuanced", ru: "нюансированный", ex_no: "El debate requiere un enfoque más matizado.", ex_uk: "Дебати потребують більш нюансованого підходу.", en_ex: "The debate requires a more nuanced approach.", ru_ex: "Дебаты требуют более нюансированного подхода." },
            { t: "Нюанси", no: "exhaustivo", uk: "всеохопний", en: "comprehensive", ru: "всеобъемлющий", ex_no: "Este es un estudio exhaustivo.", ex_uk: "Це всеохопне дослідження.", en_ex: "This is a comprehensive study.", ru_ex: "Это всеобъемлющее исследование." },
            // Academic
            { t: "Академічна", no: "la hipótesis", uk: "гіпотеза", en: "hypothesis", ru: "гипотеза", ex_no: "Los investigadores probaron la hipótesis.", ex_uk: "Науковці перевірили гіпотезу.", en_ex: "The researchers tested the hypothesis.", ru_ex: "Учёные проверили гипотезу." },
            { t: "Академічна", no: "la metodología", uk: "методологія", en: "methodology", ru: "методология", ex_no: "La metodología está claramente descrita.", ex_uk: "Методологія чітко описана.", en_ex: "The methodology is clearly described.", ru_ex: "Методология четко описана." },
            { t: "Академічна", no: "la perspectiva", uk: "перспектива", en: "perspective", ru: "перспектива", ex_no: "Desde una perspectiva histórica, el evento fue significativo.", ex_uk: "З історичної перспективи подія була значущою.", en_ex: "From a historical perspective, the event was significant.", ru_ex: "С исторической точки зрения событие было значимым." },
            { t: "Академічна", no: "la crítica de fuentes", uk: "критика джерел", en: "source criticism", ru: "критика источников", ex_no: "Una buena crítica de fuentes es fundamental.", ex_uk: "Гарна критика джерел є вирішальною.", en_ex: "Good source criticism is crucial.", ru_ex: "Хорошая критика источников имеет решающее значение." },
            // Philosophy
            { t: "Філософія", no: "la existencia", uk: "існування", en: "existence", ru: "существование", ex_no: "La cuestión de la existencia es eterna.", ex_uk: "Питання про існування вічне.", en_ex: "The question of existence is eternal.", ru_ex: "Вопрос о существовании вечен." },
            { t: "Філософія", no: "la conciencia", uk: "свідомість", en: "consciousness", ru: "сознание", ex_no: "La conciencia es un fenómeno complejo.", ex_uk: "Свідомість — складне явище.", en_ex: "Consciousness is a complex phenomenon.", ru_ex: "Сознание — сложное явление." },
            { t: "Філософія", no: "la ética", uk: "етика", en: "ethics", ru: "этика", ex_no: "La ética se ocupa de lo que está bien y mal.", ex_uk: "Етика стосується того, що правильно, а що ні.", en_ex: "Ethics deals with what is right and wrong.", ru_ex: "Этика касается того, что правильно, а что нет." },
            // Linguistics
            { t: "Лінгвістика", no: "la sintaxis", uk: "синтаксис", en: "syntax", ru: "синтаксис", ex_no: "La sintaxis es el estudio de la estructura de las oraciones.", ex_uk: "Синтаксис — це вивчення структури речень.", en_ex: "Syntax is the study of sentence structure.", ru_ex: "Синтаксис — это изучение структуры предложений." },
            { t: "Лінгвістика", no: "la semántica", uk: "семантика", en: "semantics", ru: "семантика", ex_no: "La semántica se ocupa del significado.", ex_uk: "Семантика займається значенням.", en_ex: "Semantics deals with meaning.", ru_ex: "Семантика занимается значением." },
            // Sociology
            { t: "Соціологія", no: "la desigualdad social", uk: "соціальна нерівність", en: "social inequality", ru: "социальное неравенство", ex_no: "La desigualdad social es un gran problema.", ex_uk: "Соціальна нерівність — велика проблема.", en_ex: "Social inequality is a major problem.", ru_ex: "Социальное неравенство — большая проблема." },
            { t: "Соціологія", no: "la integración", uk: "інтеграція", en: "integration", ru: "интеграция", ex_no: "La integración de los inmigrantes es importante.", ex_uk: "Інтеграція іммігрантів важлива.", en_ex: "Integration of immigrants is important.", ru_ex: "Интеграция иммигрантов важна." },
            { t: "Соціологія", no: "la diversidad", uk: "різноманіття", en: "diversity", ru: "разнообразие", ex_no: "La diversidad enriquece la sociedad.", ex_uk: "Різноманіття збагачує суспільство.", en_ex: "Diversity enriches society.", ru_ex: "Разнообразие обогащает общество." },
            // Psychology
            { t: "Психологія", no: "la cognición", uk: "когніція", en: "cognition", ru: "когниция", ex_no: "La cognición incluye el pensamiento y la memoria.", ex_uk: "Когніція охоплює мислення та пам'ять.", en_ex: "Cognition includes thinking and memory.", ru_ex: "Когниция охватывает мышление и память." },
            { t: "Психологія", no: "la emoción", uk: "емоція", en: "emotion", ru: "эмоция", ex_no: "Las emociones influyen en nuestras decisiones.", ex_uk: "Емоції впливають на наш вибір.", en_ex: "Emotions influence our choices.", ru_ex: "Эмоции влияют на наш выбор." },
            { t: "Психологія", no: "el comportamiento", uk: "поведінка", en: "behavior", ru: "поведение", ex_no: "Su comportamiento fue inesperado.", ex_uk: "Його поведінка була несподіваною.", en_ex: "His behavior was unexpected.", ru_ex: "Его поведение было неожиданным." },
            { t: "Психологія", no: "la motivación", uk: "мотивація", en: "motivation", ru: "мотивация", ex_no: "La motivación viene de dentro.", ex_uk: "Мотивація походить зсередини.", en_ex: "Motivation comes from within.", ru_ex: "Мотивация исходит изнутри." },
        ],

        // -------------------- C2 --------------------
        C2: [
            // Idioms
            { t: "Ідіоми", no: "matar dos pájaros de un tiro", uk: "убити двох зайців", en: "to kill two birds with one stone", ru: "убить двух зайцев", ex_no: "Trabajando desde casa mato dos pájaros de un tiro.", ex_uk: "Працюючи з дому, я вбиваю двох зайців.", en_ex: "By working from home I kill two birds with one stone.", ru_ex: "Работая из дома, я убиваю двух зайцев." },
            { t: "Ідіоми", no: "tragar el sapo", uk: "проковтнути гірку пігулку", en: "to bite the bullet", ru: "проглотить горькую пилюлю", ex_no: "Tuve que tragar el sapo y admitir que me equivoqué.", ex_uk: "Мені довелося проковтнути гірку пігулку і визнати, що я помилявся.", en_ex: "I had to bite the bullet and admit I was wrong.", ru_ex: "Мне пришлось проглотить горькую пилюлю и признать, что я ошибался." },
            { t: "Ідіоми", no: "echar perlas a los cerdos", uk: "метати бісер перед свинями", en: "to cast pearls before swine", ru: "метать бисер перед свиньями", ex_no: "Explicárselo es como echar perlas a los cerdos.", ex_uk: "Пояснювати йому це — все одно що метати бісер перед свинями.", en_ex: "Explaining it to him is like casting pearls before swine.", ru_ex: "Объяснять ему это — всё равно что метать бисер перед свиньями." },
            { t: "Ідіоми", no: "tener gran influencia", uk: "мати великий вплив", en: "to hold great sway", ru: "иметь большое влияние", ex_no: "Él tiene gran influencia en el sector.", ex_uk: "Він має величезний вплив у галузі.", en_ex: "He holds great sway in the industry.", ru_ex: "Он имеет большое влияние в отрасли." },
            { t: "Ідіоми", no: "pintar un cuadro sombrío", uk: "згущувати фарби", en: "to paint a bleak picture", ru: "сгущать краски", ex_no: "No pintes un cuadro sombrío; todo se arreglará.", ex_uk: "Не згущуй фарби; все владнається.", en_ex: "Don't paint a bleak picture; it'll work out.", ru_ex: "Не сгущай краски; всё уладится." },
            { t: "Ідіоми", no: "tirar la toalla", uk: "здатися", en: "to throw in the towel", ru: "сдаться", ex_no: "Después de varias derrotas, tiró la toalla.", ex_uk: "Після кількох поразок він здався.", en_ex: "After several defeats, he threw in the towel.", ru_ex: "После нескольких поражений он сдался." },
            // Stylistics
            { t: "Стилістика", no: "la ficción", uk: "художня література", en: "fiction", ru: "художественная литература", ex_no: "Ella prefiere la ficción a la no ficción.", ex_uk: "Вона надає перевагу художній літературі перед науковою.", en_ex: "She prefers fiction to non-fiction.", ru_ex: "Она предпочитает художественную литературу научной." },
            { t: "Стилістика", no: "la sátira", uk: "сатира", en: "satire", ru: "сатира", ex_no: "El programa usa la sátira para comentar la política.", ex_uk: "Шоу використовує сатиру для коментування політики.", en_ex: "The show uses satire to comment on politics.", ru_ex: "Шоу использует сатиру для комментирования политики." },
            { t: "Стилістика", no: "la ironía", uk: "іронія", en: "irony", ru: "ирония", ex_no: "Su comentario fue irónico.", ex_uk: "Його коментар був іронією.", en_ex: "His comment was ironic.", ru_ex: "Его комментарий был иронией." },
            // Rare vocabulary
            { t: "Рідкісна лексика", no: "efímero", uk: "минущий", en: "transient", ru: "преходящий", ex_no: "La fama puede ser efímera.", ex_uk: "Слава може бути минущою.", en_ex: "Fame can be transient.", ru_ex: "Слава может быть преходящей." },
            { t: "Рідкісна лексика", no: "impredecible", uk: "непередбачуваний", en: "unpredictable", ru: "непредсказуемый", ex_no: "El tiempo es impredecible.", ex_uk: "Погода непередбачувана.", en_ex: "The weather is unpredictable.", ru_ex: "Погода непредсказуема." },
            { t: "Рідкісна лексика", no: "inevitable", uk: "неминучий", en: "inevitable", ru: "неизбежный", ex_no: "El conflicto parecía inevitable.", ex_uk: "Конфлікт здавався неминучим.", en_ex: "The conflict seemed inevitable.", ru_ex: "Конфликт казался неизбежным." },
            // Rhetoric
            { t: "Риторика", no: "la retórica", uk: "риторика", en: "rhetoric", ru: "риторика", ex_no: "La retórica es el arte de la persuasión.", ex_uk: "Риторика — це мистецтво переконання.", en_ex: "Rhetoric is the art of persuasion.", ru_ex: "Риторика — это искусство убеждения." },
            { t: "Риторика", no: "la argumentación", uk: "аргументація", en: "argumentation", ru: "аргументация", ex_no: "Su argumentación era sólida.", ex_uk: "Його аргументація була вагомою.", en_ex: "His argumentation was solid.", ru_ex: "Его аргументация была убедительной." },
            { t: "Риторика", no: "el llamado", uk: "звернення", en: "appeal", ru: "апелляция", ex_no: "El llamado a las emociones fue fuerte.", ex_uk: "Звернення до емоцій було сильним.", en_ex: "The appeal to emotions was strong.", ru_ex: "Обращение к эмоциям было сильным." },
            // Literary
            { t: "Літературознавство", no: "el motivo", uk: "мотив", en: "motif", ru: "мотив", ex_no: "El amor es un motivo central en el libro.", ex_uk: "Кохання — центральний мотив у книзі.", en_ex: "Love is a central motif in the book.", ru_ex: "Любовь — центральный мотив в книге." },
            { t: "Літературознавство", no: "el tema", uk: "тема", en: "theme", ru: "тема", ex_no: "El tema de la novela es la soledad.", ex_uk: "Тема роману — самотність.", en_ex: "The theme of the novel is loneliness.", ru_ex: "Тема романа — одиночество." },
            { t: "Літературознавство", no: "el simbolismo", uk: "символіка", en: "symbolism", ru: "символика", ex_no: "El poema es rico en simbolismo.", ex_uk: "Вірш багатий на символіку.", en_ex: "The poem is rich in symbolism.", ru_ex: "Стихотворение богато на символику." },
            // Abstract
            { t: "Абстрактне", no: "el contraste", uk: "контраст", en: "contrast", ru: "контраст", ex_no: "El contraste entre ricos y pobres es grande.", ex_uk: "Контраст між багатими та бідними великий.", en_ex: "The contrast between rich and poor is stark.", ru_ex: "Контраст между богатыми и бедными велик." },
            { t: "Абстрактне", no: "excluir", uk: "виключати", en: "exclude", ru: "исключать", ex_no: "No debemos excluir a nadie.", ex_uk: "Ми не повинні нікого виключати.", en_ex: "We must not exclude anyone.", ru_ex: "Мы не должны никого исключать." },
            { t: "Абстрактне", no: "incluir", uk: "включати", en: "include", ru: "включать", ex_no: "Todos deberían ser incluidos.", ex_uk: "Усі повинні бути включені.", en_ex: "Everyone should be included.", ru_ex: "Все должны быть включены." },
            { t: "Абстрактне", no: "el contexto", uk: "контекст", en: "context", ru: "контекст", ex_no: "Sin contexto, es difícil de entender.", ex_uk: "Без контексту важко зрозуміти.", en_ex: "Without context, it's hard to understand.", ru_ex: "Без контекста трудно понять." },
            { t: "Абстрактне", no: "reflejar", uk: "відображати", en: "reflect", ru: "отражать", ex_no: "La conversación refleja los cambios sociales.", ex_uk: "Розмова відображає соціальні зміни.", en_ex: "The conversation reflects social changes.", ru_ex: "Разговор отражает социальные изменения." },
            { t: "Абстрактне", no: "elaborar", uk: "деталізувати", en: "elaborate", ru: "детализировать", ex_no: "¿Puedes elaborar ese punto?", ex_uk: "Можеш детальніше розкрити цей пункт?", en_ex: "Can you elaborate on that point?", ru_ex: "Можешь детальнее раскрыть этот пункт?" },
        ],
    };

    // =====================================================================
    //  GRAMMAR – ІСПАНСЬКА ГРАМАТИКА (A1-C2)
    // =====================================================================
    const GRAMMAR = [
        // A1
        {
            id: "es_gr1", level: "A1",
            title: "Ser y estar (presente)",
            exp: "Ser se usa para identidad, origen, profesión y características permanentes. Estar se usa para ubicación, estados temporales y emociones.",
            table: { head: ["Pronombre", "Ser", "Estar"], rows: [["yo", "soy", "estoy"], ["tú", "eres", "estás"], ["él/ella/usted", "es", "está"], ["nosotros", "somos", "estamos"], ["vosotros", "sois", "estáis"], ["ellos/ellas/ustedes", "son", "están"]] },
            ex: { q: "Yo ___ estudiante.", opts: ["soy", "estoy", "eres"], a: 0 },
            title_en: "Ser and estar (present tense)",
            title_ru: "Ser и estar (настоящее время)",
            exp_en: "Ser is used for identity, origin, profession, and permanent characteristics. Estar is used for location, temporary states, and emotions.",
            exp_ru: "Ser используется для идентичности, происхождения, профессии и постоянных характеристик. Estar используется для местоположения, временных состояний и эмоций.",
            head_en: ["Pronoun", "Ser", "Estar"],
            head_ru: ["Местоимение", "Ser", "Estar"],
            q_en: "Yo ___ estudiante.",
            q_ru: "Yo ___ estudiante.",
        },
        // A2
        {
            id: "es_gr2", level: "A2",
            title: "Pretérito perfecto (haber + participio)",
            exp: "El pretérito perfecto se forma con el verbo haber + participio pasado. Se usa para acciones pasadas con relevancia en el presente.",
            table: { head: ["Pronombre", "Haber", "Participio"], rows: [["yo", "he", "hablado"], ["tú", "has", "comido"], ["él/ella", "ha", "vivido"]] },
            ex: { q: "Yo ___ comido.", opts: ["he", "has", "ha"], a: 0 },
            title_en: "Pretérito perfecto (haber + past participle)",
            title_ru: "Pretérito perfecto (haber + причастие прошедшего времени)",
            exp_en: "Pretérito perfecto is formed with the verb haber + past participle. Used for past actions relevant to the present.",
            exp_ru: "Pretérito perfecto образуется с глаголом haber + причастие прошедшего времени. Используется для прошлых действий, имеющих отношение к настоящему.",
            head_en: ["Pronoun", "Haber", "Participle"],
            head_ru: ["Местоимение", "Haber", "Причастие"],
            q_en: "Yo ___ comido.",
            q_ru: "Yo ___ comido.",
        },
        // B1
        {
            id: "es_gr3", level: "B1",
            title: "Pretérito indefinido (verbos regulares)",
            exp: "El pretérito indefinido se usa para acciones completadas en el pasado. Verbos regulares: -ar, -er, -ir.",
            table: { head: ["Pronombre", "hablar", "comer", "vivir"], rows: [["yo", "hablé", "comí", "viví"], ["tú", "hablaste", "comiste", "viviste"], ["él/ella", "habló", "comió", "vivió"]] },
            ex: { q: "Ayer ___ (hablar) con ella.", opts: ["hablé", "hablo", "hablaba"], a: 0 },
            title_en: "Pretérito indefinido (regular verbs)",
            title_ru: "Pretérito indefinido (правильные глаголы)",
            exp_en: "Pretérito indefinido is used for completed past actions. Regular verbs: -ar, -er, -ir.",
            exp_ru: "Pretérito indefinido используется для завершенных действий в прошлом. Правильные глаголы: -ar, -er, -ir.",
            head_en: ["Pronoun", "hablar", "comer", "vivir"],
            head_ru: ["Местоимение", "hablar", "comer", "vivir"],
            q_en: "Ayer ___ (hablar) con ella.",
            q_ru: "Ayer ___ (hablar) con ella.",
        },
        // B2
        {
            id: "es_gr4", level: "B2",
            title: "Subjuntivo presente",
            exp: "El subjuntivo se usa para expresar duda, deseo, emoción o situaciones hipotéticas. Se forma con la raíz del presente + terminaciones opuestas.",
            table: { head: ["Pronombre", "hablar", "comer", "vivir"], rows: [["yo", "hable", "coma", "viva"], ["tú", "hables", "comas", "vivas"], ["él/ella", "hable", "coma", "viva"]] },
            ex: { q: "Espero que ___ (venir) pronto.", opts: ["venga", "viene", "venía"], a: 0 },
            title_en: "Subjunctive present",
            title_ru: "Настоящее сослагательное наклонение",
            exp_en: "The subjunctive is used to express doubt, desire, emotion, or hypothetical situations.",
            exp_ru: "Сослагательное наклонение используется для выражения сомнения, желания, эмоции или гипотетических ситуаций.",
            head_en: ["Pronoun", "hablar", "comer", "vivir"],
            head_ru: ["Местоимение", "hablar", "comer", "vivir"],
            q_en: "Espero que ___ (venir) pronto.",
            q_ru: "Espero que ___ (venir) pronto.",
        },
        // C1
        {
            id: "es_gr5", level: "C1",
            title: "Subjuntivo imperfecto",
            exp: "El subjuntivo imperfecto se usa para expresar deseos o condiciones en el pasado. Se forma con la raíz del pretérito indefinido + terminaciones.",
            table: { head: ["Pronombre", "hablar", "comer", "vivir"], rows: [["yo", "hablara", "comiera", "viviera"], ["tú", "hablaras", "comieras", "vivieras"], ["él/ella", "hablara", "comiera", "viviera"]] },
            ex: { q: "Si ___ (tener) más tiempo, viajaría.", opts: ["tuviera", "tengo", "tenía"], a: 0 },
            title_en: "Subjunctive imperfect",
            title_ru: "Прошедшее сослагательное наклонение",
            exp_en: "The imperfect subjunctive is used to express wishes or conditions in the past.",
            exp_ru: "Imperfecto de subjuntivo используется для выражения желаний или условий в прошлом.",
            head_en: ["Pronoun", "hablar", "comer", "vivir"],
            head_ru: ["Местоимение", "hablar", "comer", "vivir"],
            q_en: "Si ___ (tener) más tiempo, viajaría.",
            q_ru: "Si ___ (tener) más tiempo, viajaría.",
        },
        // C2
        {
            id: "es_gr6", level: "C2",
            title: "Condicional compuesto",
            exp: "El condicional compuesto se usa para expresar acciones hipotéticas en el pasado. Se forma con el condicional de haber + participio.",
            table: { head: ["Pronombre", "Condicional compuesto"], rows: [["yo", "habría hablado"], ["tú", "habrías comido"], ["él/ella", "habría vivido"]] },
            ex: { q: "Si me lo hubieras dicho, te ___ (ayudar).", opts: ["habría ayudado", "ayudaría", "he ayudado"], a: 0 },
            title_en: "Condicional compuesto",
            title_ru: "Сложное условное наклонение",
            exp_en: "The conditional perfect is used to express hypothetical actions in the past.",
            exp_ru: "Condicional compuesto используется для выражения гипотетических действий в прошлом.",
            head_en: ["Pronoun", "Condicional compuesto"],
            head_ru: ["Местоимение", "Сложное условное"],
            q_en: "Si me lo hubieras dicho, te ___ (ayudar).",
            q_ru: "Si me lo hubieras dicho, te ___ (ayudar).",
        },
    ];

    // =====================================================================
    //  NORSKPROVE_TASKS – ЗАВДАННЯ ДЛЯ ПРАКТИКИ (Аналог Norskprøve)
    // =====================================================================
    const NORSKPROVE_TASKS = {
        A1: {
            reading: [
                {
                    title: "¡Hola!",
                    text: "¡Hola! Me llamo Ana. Soy de Polonia. Vivo en Madrid. Soy estudiante. Me gusta la comida española.",
                    questions: [
                        { q: "¿De dónde es Ana?", opts: ["Noruega", "Polonia", "Suecia"], a: 1 },
                        { q: "¿Qué hace Ana?", opts: ["Es profesora", "Es estudiante", "Es médica"], a: 1 },
                        { q: "¿Dónde vive Ana?", opts: ["Bergen", "Madrid", "Varsovia"], a: 1 },
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
                    title: "Un día en la tienda",
                    text: "Ayer fui a la tienda. Compré pan, leche y huevos. La tienda estaba llena de gente. Encontré a un amigo y hablamos un poco. Luego me fui a casa.",
                    questions: [
                        { q: "¿Qué compré?", opts: ["Pan, leche, queso", "Pan, leche, huevos", "Huevos, queso, mantequilla"], a: 1 },
                        { q: "¿A quién encontré?", opts: ["Un profesor", "Un amigo", "Un médico"], a: 1 },
                        { q: "¿Dónde estaba?", opts: ["En la escuela", "En la tienda", "En el trabajo"], a: 1 },
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
                    title: "El cambio climático",
                    text: "El cambio climático es un gran problema. Las temperaturas aumentan y el hielo se derrite. Muchos animales pierden sus hábitats. Debemos reducir la contaminación y usar energías renovables.",
                    questions: [
                        { q: "¿Qué está pasando con el hielo?", opts: ["Se está congelando", "Se está derritiendo", "Está creciendo"], a: 1 },
                        { q: "¿Qué podemos hacer?", opts: ["Usar más petróleo", "Reciclar", "Conducir más"], a: 1 },
                        { q: "¿Qué amenaza a los animales?", opts: ["La pérdida de hábitat", "La caza", "La contaminación"], a: 0 },
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
                    title: "El futuro del trabajo",
                    text: "La automatización cambiará muchas profesiones. Algunos trabajos desaparecerán, pero surgirán otros nuevos. Las habilidades digitales serán importantes. Los trabajadores deberán ser flexibles y aprender durante toda la vida.",
                    questions: [
                        { q: "¿Qué pasará con algunos trabajos?", opts: ["Desaparecerán", "Serán más seguros", "Pagarán mejor"], a: 0 },
                        { q: "¿Qué será importante?", opts: ["La fuerza física", "Las habilidades digitales", "Las redes sociales"], a: 1 },
                        { q: "¿Qué puede mejorar la tecnología?", opts: ["El salario", "El entorno laboral", "El tiempo libre"], a: 1 },
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
                    title: "La ética de la IA",
                    text: "La inteligencia artificial plantea nuevas cuestiones éticas. ¿Quién es responsable cuando un algoritmo se equivoca? ¿Debería tener derechos la IA? Al mismo tiempo, la IA puede contribuir a la investigación médica y a la modelización climática.",
                    questions: [
                        { q: "¿Qué plantea la IA?", opts: ["Nuevas cuestiones éticas", "Problemas técnicos", "Crecimiento económico"], a: 0 },
                        { q: "¿A qué puede contribuir la IA?", opts: ["A la investigación", "A la guerra", "A la vigilancia"], a: 0 },
                        { q: "¿Qué debemos desarrollar?", opts: ["Nuevos algoritmos", "Directrices", "Más centros de datos"], a: 1 },
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
                    title: "Filosofía y ciencia",
                    text: "La ciencia se basa en supuestos filosóficos. La pregunta sobre qué es verdadero y cómo podemos saberlo es fundamental. El método científico nos da herramientas, pero no es infalible. El pensamiento crítico es esencial.",
                    questions: [
                        { q: "¿En qué se basa la ciencia?", opts: ["Supuestos filosóficos", "Dogmas religiosos", "Poder político"], a: 0 },
                        { q: "¿Qué es esencial?", opts: ["El pensamiento crítico", "Los títulos académicos", "La publicación"], a: 0 },
                    ],
                },
            ],
            listening: [],
            writing: [],
            speaking: [],
        },
    };

    // =====================================================================
    //  LEVEL_TEST – ТЕСТ НА РІВЕНЬ ІСПАНСЬКОЇ
    // =====================================================================
    const LEVEL_TEST = [
        // A1 (10 preguntas)
        { lvl: "A1", q: "Hola! ¿Cómo ___?", opts: ["estás", "soy", "eres"], a: 0 },
        { lvl: "A1", q: "Yo ___ estudiante.", opts: ["soy", "estoy", "eres"], a: 0 },
        { lvl: "A1", q: "Ella ___ médica.", opts: ["es", "soy", "está"], a: 0 },
        { lvl: "A1", q: "Nosotros ___ de Madrid.", opts: ["somos", "estamos", "soy"], a: 0 },
        { lvl: "A1", q: "¿Cómo ___ llamas?", opts: ["te", "me", "se"], a: 0 },
        { lvl: "A1", q: "Tengo ___ manzana.", opts: ["una", "un", "uno"], a: 0 },
        { lvl: "A1", q: "Este es ___ perro.", opts: ["un", "una", "uno"], a: 0 },
        { lvl: "A1", q: "Nosotros ___ a la escuela todos los días.", opts: ["vamos", "van", "voy"], a: 0 },
        { lvl: "A1", q: "Ella ___ café por la mañana.", opts: ["bebe", "bebo", "beben"], a: 0 },
        { lvl: "A1", q: "No me gusta ___ tiempo.", opts: ["el", "la", "lo"], a: 0 },
        // A2 (10 preguntas)
        { lvl: "A2", q: "Ayer ___ al cine.", opts: ["fui", "voy", "iba"], a: 0 },
        { lvl: "A2", q: "Ella no me ___ .", opts: ["llamó", "llama", "llamado"], a: 0 },
        { lvl: "A2", q: "___ te gusta el helado?", opts: ["A", "De", "Por"], a: 0 },
        { lvl: "A2", q: "Nosotros ___ a Madrid la semana que viene.", opts: ["vamos", "voy", "van"], a: 0 },
        { lvl: "A2", q: "Él ___ un coche.", opts: ["tiene", "tengo", "tienes"], a: 0 },
        { lvl: "A2", q: "Puedo ___ ayudarte.", opts: ["ayudar", "ayudo", "ayudado"], a: 0 },
        { lvl: "A2", q: "Ella ___ hablar tres idiomas.", opts: ["puede", "es", "tiene"], a: 0 },
        { lvl: "A2", q: "Nosotros ___ cena a las 7.", opts: ["cenamos", "cenan", "ceno"], a: 0 },
        { lvl: "A2", q: "Estoy cansado porque ___ tarde.", opts: ["trabajé", "trabajo", "trabajaba"], a: 0 },
        { lvl: "A2", q: "___ visto mis llaves?", opts: ["Has", "Ha", "He"], a: 0 },
        // B1 (10 preguntas)
        { lvl: "B1", q: "Estoy aquí ___ 2015.", opts: ["desde", "por", "en"], a: 0 },
        { lvl: "B1", q: "No ha terminado los deberes ___ .", opts: ["aún", "ya", "todavía"], a: 0 },
        { lvl: "B1", q: "El libro ___ escrito por el profesor.", opts: ["fue", "ha", "es"], a: 0 },
        { lvl: "B1", q: "Si llueve, ___ en casa.", opts: ["nos quedamos", "quedaremos", "quedamos"], a: 0 },
        { lvl: "B1", q: "Ojalá ___ más tiempo.", opts: ["tuviera", "tenga", "tengo"], a: 0 },
        { lvl: "B1", q: "Ella me ___ su dirección ayer.", opts: ["dio", "da", "dará"], a: 0 },
        { lvl: "B1", q: "Fueron al cine ___ estaban aburridos.", opts: ["porque", "aunque", "pero"], a: 0 },
        { lvl: "B1", q: "No le gusta ___ en la ciudad.", opts: ["vivir", "vive", "viviendo"], a: 0 },
        { lvl: "B1", q: "Te prometo que ___ más tarde.", opts: ["llamaré", "llamo", "llamaba"], a: 0 },
        { lvl: "B1", q: "El café está ___ caliente para beber.", opts: ["demasiado", "bastante", "muy"], a: 0 },
        // B2 (10 preguntas)
        { lvl: "B2", q: "___ hubiera estudiado, habría aprobado.", opts: ["Si", "Aunque", "Cuando"], a: 0 },
        { lvl: "B2", q: "Me preguntó ___ iba.", opts: ["adónde", "que", "si"], a: 0 },
        { lvl: "B2", q: "La película fue ___ de lo esperado.", opts: ["mejor", "buena", "más mejor"], a: 0 },
        { lvl: "B2", q: "Debemos discutir ___ resolver el problema.", opts: ["cómo", "qué", "lo"], a: 0 },
        { lvl: "B2", q: "Él es ___ de los dos candidatos.", opts: ["el mejor", "mejor", "más bueno"], a: 0 },
        { lvl: "B2", q: "Negó ___ el dinero.", opts: ["haber robado", "robar", "robando"], a: 0 },
        { lvl: "B2", q: "El examen fue ___ de lo que pensaba.", opts: ["más fácil", "fácil", "más fácil que"], a: 0 },
        { lvl: "B2", q: "Ojalá ___ más sobre arte.", opts: ["supiera", "sé", "sabía"], a: 0 },
        { lvl: "B2", q: "Habrían venido si ___ invitados.", opts: ["hubieran sido", "fueron", "eran"], a: 0 },
        { lvl: "B2", q: "Esta es la casa ___ crecí.", opts: ["donde", "que", "la cual"], a: 0 },
        // C1 (10 preguntas)
        { lvl: "C1", q: "No solo ___ a la reunión, sino que también presentó.", opts: ["vino", "venía", "ha venido"], a: 0 },
        { lvl: "C1", q: "Ojalá ___ la respuesta.", opts: ["supiera", "sé", "sabía"], a: 0 },
        { lvl: "C1", q: "Es esencial que ___ a tiempo.", opts: ["llegue", "llega", "llegara"], a: 0 },
        { lvl: "C1", q: "El informe ___ para el final del día.", opts: ["estará terminado", "es terminado", "fue terminado"], a: 0 },
        { lvl: "C1", q: "Si lo hubiera sabido, ___ diferente.", opts: ["habría hecho", "haría", "hice"], a: 0 },
        { lvl: "C1", q: "Ella es ___ de las dos hermanas.", opts: ["la mayor", "mayor", "más grande"], a: 0 },
        { lvl: "C1", q: "La propuesta fue rechazada, ___ esperábamos.", opts: ["como", "que", "lo cual"], a: 0 },
        { lvl: "C1", q: "No puedo evitar ___ preocupado.", opts: ["estar", "estoy", "siendo"], a: 0 },
        { lvl: "C1", q: "La clase era ___ larga para los estudiantes.", opts: ["demasiado", "tan", "muy"], a: 0 },
        { lvl: "C1", q: "Tiene tendencia ___ ser impaciente.", opts: ["a", "de", "para"], a: 0 },
        // C2 (10 preguntas)
        { lvl: "C2", q: "Si fuera rico, ___ el mundo.", opts: ["recorrería", "recorreré", "habría recorrido"], a: 0 },
        { lvl: "C2", q: "El uso de metáforas del autor ___ al lector.", opts: ["desafía", "desafían", "desafiante"], a: 0 },
        { lvl: "C2", q: "Poco ___ sabía lo que le esperaba.", opts: ["sabía", "supo", "hubiera sabido"], a: 0 },
        { lvl: "C2", q: "El comité ___ dividido en el tema.", opts: ["está", "están", "fueron"], a: 0 },
        { lvl: "C2", q: "Es imperativo que el proyecto ___ a tiempo.", opts: ["sea completado", "es completado", "fuera completado"], a: 0 },
        { lvl: "C2", q: "Su argumento fue ___ persuasivo.", opts: ["sumamente", "más", "muy"], a: 0 },
        { lvl: "C2", q: "La investigación, ___ resultados son revolucionarios, tomó años.", opts: ["cuyos", "que", "de los cuales"], a: 0 },
        { lvl: "C2", q: "Hablaba con un aire de ___ que molestaba a todos.", opts: ["autoridad", "autoritarismo", "autoritariamente"], a: 0 },
        { lvl: "C2", q: "El escándalo puso en ___ la reputación de la empresa.", opts: ["duda", "tela de juicio", "cuestión"], a: 1 },
        { lvl: "C2", q: "Es una ___ crítica del gobierno.", opts: ["feroz", "acerba", "ambas"], a: 0 },
    ];

    // =====================================================================
    //  РЕЄСТРАЦІЯ ДАНИХ У ГЛОБАЛЬНИЙ ОБ'ЄКТ
    // =====================================================================
    window.LANG_DATA = window.LANG_DATA || {};
    window.LANG_DATA.es = {
        VOCAB,
        GRAMMAR,
        NORSKPROVE_TASKS,
        LEVEL_TEST,
    };
})();