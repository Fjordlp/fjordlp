// =====================================================================
//  СЛОВНИК: Польська (Polski) — data-pl.js
// =====================================================================
//  Формат ідентичний data.js (норвезька): поле `no` переносить слово
//  ЦІЛЬОВОЮ мовою (тут — польською), `uk`/`en`/`ru` — переклади,
//  `ex_no`/`ex_uk`/`en_ex`/`ru_ex` — приклади речень.
//  (Назва поля `no` історична: усі екрани читають саме w.no, тож
//  перейменовувати її НЕ можна.)
//
//  СТАТУС: рівень A1 заповнено, A2–C2 — порожні заготовки (екрани
//  слів/карток/тестів мають порожній стан і спільний/AI-словник як
//  запасний варіант). LEVEL_TEST — вручну складений вхідний тест.
//
//  ІСТОРІЯ: раніше файл оголошував `const VOCAB_PL` з полями `pl`/`ex_pl`
//  і в кінці посилався на неіснуючі VOCAB/GRAMMAR/… — через це скрипт
//  падав із ReferenceError і window.LANG_DATA.pl не з'являвся взагалі.
// =====================================================================
(function () {
    const VOCAB = {
    A1: [
        // =========================
        // ПРИВІТАННЯ
        // =========================
        { t: "Привітання", no: "cześć", uk: "привіт", ex_no: "Cześć, jak się masz?", ex_uk: "Привіт, як ти?", en: "hi", en_ex: "Hi, how are you?", ru: "привет", ru_ex: "Привет, как ты?" },
        { t: "Привітання", no: "dzień dobry", uk: "добрий день", ex_no: "Dzień dobry, jak się pan ma?", ex_uk: "Добрий день, як ви поживаєте?", en: "good morning / good day", en_ex: "Good day, how are you?", ru: "добрый день", ru_ex: "Добрый день, как вы поживаете?" },
        { t: "Привітання", no: "dobry wieczór", uk: "добрий вечір", ex_no: "Dobry wieczór, pani Anno.", ex_uk: "Добрий вечір, пані Анно.", en: "good evening", en_ex: "Good evening, Mrs Anna.", ru: "добрый вечер", ru_ex: "Добрый вечер, госпожа Анна." },
        { t: "Привітання", no: "do widzenia", uk: "до побачення", ex_no: "Do widzenia, zobaczymy się jutro.", ex_uk: "До побачення, побачимося завтра.", en: "goodbye", en_ex: "Goodbye, see you tomorrow.", ru: "до свидания", ru_ex: "До свидания, увидимся завтра." },
        { t: "Привітання", no: "do zobaczenia", uk: "до зустрічі", ex_no: "Do zobaczenia w poniedziałek.", ex_uk: "До зустрічі в понеділок.", en: "see you", en_ex: "See you on Monday.", ru: "до встречи", ru_ex: "До встречи в понедельник." },
        { t: "Привітання", no: "dobranoc", uk: "надобраніч", ex_no: "Dobranoc, śpij dobrze.", ex_uk: "Надобраніч, добре спи.", en: "good night", en_ex: "Good night, sleep well.", ru: "спокойной ночи", ru_ex: "Спокойной ночи, спи хорошо." },

        // =========================
        // ВВІЧЛИВІСТЬ
        // =========================
        { t: "Ввічливість", no: "dziękuję", uk: "дякую", ex_no: "Dziękuję za pomoc.", ex_uk: "Дякую за допомогу.", en: "thank you", en_ex: "Thank you for your help.", ru: "спасибо", ru_ex: "Спасибо за помощь." },
        { t: "Ввічливість", no: "proszę", uk: "будь ласка", ex_no: "Proszę, usiądź tutaj.", ex_uk: "Будь ласка, сядь тут.", en: "please", en_ex: "Please, sit here.", ru: "пожалуйста", ru_ex: "Пожалуйста, садись здесь." },
        { t: "Ввічливість", no: "przepraszam", uk: "вибачте", ex_no: "Przepraszam, gdzie jest stacja?", ex_uk: "Вибачте, де станція?", en: "excuse me / sorry", en_ex: "Excuse me, where is the station?", ru: "извините", ru_ex: "Извините, где станция?" },
        { t: "Ввічливість", no: "przepraszam bardzo", uk: "дуже перепрошую", ex_no: "Przepraszam bardzo za spóźnienie.", ex_uk: "Дуже перепрошую за запізнення.", en: "I am very sorry", en_ex: "I am very sorry for being late.", ru: "очень извиняюсь", ru_ex: "Очень извиняюсь за опоздание." },

        // =========================
        // БАЗОВІ СЛОВА
        // =========================
        { t: "Базові слова", no: "tak", uk: "так", ex_no: "Tak, mam czas.", ex_uk: "Так, у мене є час.", en: "yes", en_ex: "Yes, I have time.", ru: "да", ru_ex: "Да, у меня есть время." },
        { t: "Базові слова", no: "nie", uk: "ні", ex_no: "Nie, nie mam czasu.", ex_uk: "Ні, у мене немає часу.", en: "no", en_ex: "No, I don't have time.", ru: "нет", ru_ex: "Нет, у меня нет времени." },
        { t: "Базові слова", no: "może", uk: "можливо", ex_no: "Może pójdziemy jutro.", ex_uk: "Можливо, ми підемо завтра.", en: "maybe", en_ex: "Maybe we will go tomorrow.", ru: "может быть", ru_ex: "Может быть, мы пойдём завтра." },
        { t: "Базові слова", no: "oczywiście", uk: "звичайно", ex_no: "Oczywiście, możesz wejść.", ex_uk: "Звичайно, ти можеш зайти.", en: "of course", en_ex: "Of course, you can come in.", ru: "конечно", ru_ex: "Конечно, ты можешь войти." },
        { t: "Базові слова", no: "dobrze", uk: "добре", ex_no: "Dobrze, zaczynamy.", ex_uk: "Добре, починаємо.", en: "well / okay", en_ex: "Okay, let's start.", ru: "хорошо", ru_ex: "Хорошо, начинаем." },
        { t: "Базові слова", no: "źle", uk: "погано", ex_no: "Dzisiaj czuję się źle.", ex_uk: "Сьогодні я почуваюся погано.", en: "bad / badly", en_ex: "I feel bad today.", ru: "плохо", ru_ex: "Сегодня я плохо себя чувствую." },
        { t: "Базові слова", no: "bardzo", uk: "дуже", ex_no: "Bardzo lubię kawę.", ex_uk: "Я дуже люблю каву.", en: "very", en_ex: "I really like coffee.", ru: "очень", ru_ex: "Я очень люблю кофе." },
        { t: "Базові слова", no: "trochę", uk: "трохи", ex_no: "Mówię trochę po polsku.", ex_uk: "Я трохи говорю польською.", en: "a little", en_ex: "I speak a little Polish.", ru: "немного", ru_ex: "Я немного говорю по-польски." },
        { t: "Базові слова", no: "teraz", uk: "зараз", ex_no: "Teraz jestem w domu.", ex_uk: "Зараз я вдома.", en: "now", en_ex: "I am at home now.", ru: "сейчас", ru_ex: "Сейчас я дома." },
        { t: "Базові слова", no: "później", uk: "пізніше", ex_no: "Zadzwonię później.", ex_uk: "Я зателефоную пізніше.", en: "later", en_ex: "I will call later.", ru: "позже", ru_ex: "Я позвоню позже." },

        // =========================
        // ЗНАЙОМСТВО
        // =========================
        { t: "Знайомство", no: "mam na imię", uk: "мене звати", ex_no: "Mam na imię Piotr.", ex_uk: "Мене звати Пйотр.", en: "my name is", en_ex: "My name is Peter.", ru: "меня зовут", ru_ex: "Меня зовут Пётр." },
        { t: "Знайомство", no: "jak masz na imię?", uk: "як тебе звати?", ex_no: "Jak masz na imię?", ex_uk: "Як тебе звати?", en: "what is your name?", en_ex: "What is your name?", ru: "как тебя зовут?", ru_ex: "Как тебя зовут?" },
        { t: "Знайомство", no: "miło mi", uk: "приємно познайомитися", ex_no: "Miło mi cię poznać.", ex_uk: "Приємно з тобою познайомитися.", en: "nice to meet you", en_ex: "Nice to meet you.", ru: "приятно познакомиться", ru_ex: "Приятно познакомиться." },
        { t: "Знайомство", no: "skąd jesteś?", uk: "звідки ти?", ex_no: "Skąd jesteś?", ex_uk: "Звідки ти?", en: "where are you from?", en_ex: "Where are you from?", ru: "откуда ты?", ru_ex: "Откуда ты?" },
        { t: "Знайомство", no: "jestem z Ukrainy", uk: "я з України", ex_no: "Jestem z Ukrainy.", ex_uk: "Я з України.", en: "I am from Ukraine", en_ex: "I am from Ukraine.", ru: "я из Украины", ru_ex: "Я из Украины." },

        // =========================
        // СІМ'Я
        // =========================
        { t: "Сім'я", no: "rodzina", uk: "сім'я", ex_no: "Moja rodzina jest duża.", ex_uk: "Моя сім'я велика.", en: "family", en_ex: "My family is big.", ru: "семья", ru_ex: "Моя семья большая." },
        { t: "Сім'я", no: "mama", uk: "мама", ex_no: "Moja mama mieszka w Polsce.", ex_uk: "Моя мама живе в Польщі.", en: "mother", en_ex: "My mother lives in Poland.", ru: "мама", ru_ex: "Моя мама живёт в Польше." },
        { t: "Сім'я", no: "tata", uk: "тато", ex_no: "Mój tata pracuje w Warszawie.", ex_uk: "Мій тато працює у Варшаві.", en: "father", en_ex: "My father works in Warsaw.", ru: "папа", ru_ex: "Мой папа работает в Варшаве." },
        { t: "Сім'я", no: "brat", uk: "брат", ex_no: "Mam jednego brata.", ex_uk: "У мене є один брат.", en: "brother", en_ex: "I have one brother.", ru: "брат", ru_ex: "У меня есть один брат." },
        { t: "Сім'я", no: "siostra", uk: "сестра", ex_no: "Moja siostra ma dwadzieścia lat.", ex_uk: "Моїй сестрі двадцять років.", en: "sister", en_ex: "My sister is twenty years old.", ru: "сестра", ru_ex: "Моей сестре двадцать лет." },
        { t: "Сім'я", no: "syn", uk: "син", ex_no: "Mój syn chodzi do szkoły.", ex_uk: "Мій син ходить до школи.", en: "son", en_ex: "My son goes to school.", ru: "сын", ru_ex: "Мой сын ходит в школу." },
        { t: "Сім'я", no: "córka", uk: "донька", ex_no: "Moja córka lubi czytać.", ex_uk: "Моя донька любить читати.", en: "daughter", en_ex: "My daughter likes reading.", ru: "дочь", ru_ex: "Моя дочь любит читать." },

        // =========================
        // ЛЮДИ
        // =========================
        { t: "Люди", no: "człowiek", uk: "людина", ex_no: "To jest dobry człowiek.", ex_uk: "Це хороша людина.", en: "person", en_ex: "This is a good person.", ru: "человек", ru_ex: "Это хороший человек." },
        { t: "Люди", no: "kobieta", uk: "жінка", ex_no: "Ta kobieta pracuje tutaj.", ex_uk: "Ця жінка працює тут.", en: "woman", en_ex: "This woman works here.", ru: "женщина", ru_ex: "Эта женщина работает здесь." },
        { t: "Люди", no: "mężczyzna", uk: "чоловік", ex_no: "Ten mężczyzna jest lekarzem.", ex_uk: "Цей чоловік — лікар.", en: "man", en_ex: "This man is a doctor.", ru: "мужчина", ru_ex: "Этот мужчина — врач." },
        { t: "Люди", no: "dziecko", uk: "дитина", ex_no: "To dziecko ma pięć lat.", ex_uk: "Цій дитині п'ять років.", en: "child", en_ex: "This child is five years old.", ru: "ребёнок", ru_ex: "Этому ребёнку пять лет." },
        { t: "Люди", no: "przyjaciel", uk: "друг", ex_no: "Mój przyjaciel mieszka blisko.", ex_uk: "Мій друг живе неподалік.", en: "friend", en_ex: "My friend lives nearby.", ru: "друг", ru_ex: "Мой друг живёт рядом." },
        { t: "Люди", no: "przyjaciółka", uk: "подруга", ex_no: "Moja przyjaciółka mówi po polsku.", ex_uk: "Моя подруга говорить польською.", en: "female friend", en_ex: "My friend speaks Polish.", ru: "подруга", ru_ex: "Моя подруга говорит по-польски." },

        // =========================
        // ЧИСЛА
        // =========================
        { t: "Числа", no: "jeden", uk: "один", ex_no: "Mam jeden bilet.", ex_uk: "У мене один квиток.", en: "one", en_ex: "I have one ticket.", ru: "один", ru_ex: "У меня один билет." },
        { t: "Числа", no: "dwa", uk: "два", ex_no: "Mam dwa bilety.", ex_uk: "У мене два квитки.", en: "two", en_ex: "I have two tickets.", ru: "два", ru_ex: "У меня два билета." },
        { t: "Числа", no: "trzy", uk: "три", ex_no: "Mam trzy pytania.", ex_uk: "У мене три питання.", en: "three", en_ex: "I have three questions.", ru: "три", ru_ex: "У меня три вопроса." },
        { t: "Числа", no: "cztery", uk: "чотири", ex_no: "Mam cztery książki.", ex_uk: "У мене чотири книги.", en: "four", en_ex: "I have four books.", ru: "четыре", ru_ex: "У меня четыре книги." },
        { t: "Числа", no: "pięć", uk: "п'ять", ex_no: "Mam pięć złotych.", ex_uk: "У мене є п'ять злотих.", en: "five", en_ex: "I have five zloty.", ru: "пять", ru_ex: "У меня есть пять злотых." },
        { t: "Числа", no: "sześć", uk: "шість", ex_no: "Mam sześć lat.", ex_uk: "Мені шість років.", en: "six", en_ex: "I am six years old.", ru: "шесть", ru_ex: "Мне шесть лет." },
        { t: "Числа", no: "siedem", uk: "сім", ex_no: "Jest siedem dni w tygodniu.", ex_uk: "У тижні сім днів.", en: "seven", en_ex: "There are seven days in a week.", ru: "семь", ru_ex: "В неделе семь дней." },
        { t: "Числа", no: "osiem", uk: "вісім", ex_no: "Mam osiem książek.", ex_uk: "У мене вісім книг.", en: "eight", en_ex: "I have eight books.", ru: "восемь", ru_ex: "У меня восемь книг." },
        { t: "Числа", no: "dziewięć", uk: "дев'ять", ex_no: "Jest dziewięć osób.", ex_uk: "Є дев'ять людей.", en: "nine", en_ex: "There are nine people.", ru: "девять", ru_ex: "Есть девять человек." },
        { t: "Числа", no: "dziesięć", uk: "десять", ex_no: "Mam dziesięć minut.", ex_uk: "У мене є десять хвилин.", en: "ten", en_ex: "I have ten minutes.", ru: "десять", ru_ex: "У меня есть десять минут." },

        // =========================
        // ЇЖА
        // =========================
        { t: "Їжа", no: "woda", uk: "вода", ex_no: "Poproszę szklankę wody.", ex_uk: "Будь ласка, склянку води.", en: "water", en_ex: "A glass of water, please.", ru: "вода", ru_ex: "Стакан воды, пожалуйста." },
        { t: "Їжа", no: "chleb", uk: "хліб", ex_no: "Kupuję świeży chleb.", ex_uk: "Я купую свіжий хліб.", en: "bread", en_ex: "I am buying fresh bread.", ru: "хлеб", ru_ex: "Я покупаю свежий хлеб." },
        { t: "Їжа", no: "mleko", uk: "молоко", ex_no: "Piję mleko rano.", ex_uk: "Я п'ю молоко вранці.", en: "milk", en_ex: "I drink milk in the morning.", ru: "молоко", ru_ex: "Я пью молоко утром." },
        { t: "Їжа", no: "kawa", uk: "кава", ex_no: "Rano piję kawę.", ex_uk: "Вранці я п'ю каву.", en: "coffee", en_ex: "I drink coffee in the morning.", ru: "кофе", ru_ex: "Утром я пью кофе." },
        { t: "Їжа", no: "herbata", uk: "чай", ex_no: "Czy chcesz herbatę?", ex_uk: "Ти хочеш чаю?", en: "tea", en_ex: "Do you want tea?", ru: "чай", ru_ex: "Ты хочешь чай?" },
        { t: "Їжа", no: "jabłko", uk: "яблуко", ex_no: "Jem czerwone jabłko.", ex_uk: "Я їм червоне яблуко.", en: "apple", en_ex: "I am eating a red apple.", ru: "яблоко", ru_ex: "Я ем красное яблоко." },
        { t: "Їжа", no: "banan", uk: "банан", ex_no: "Lubię jeść banany.", ex_uk: "Я люблю їсти банани.", en: "banana", en_ex: "I like eating bananas.", ru: "банан", ru_ex: "Я люблю есть бананы." },
        { t: "Їжа", no: "ser", uk: "сир", ex_no: "Lubię ser.", ex_uk: "Я люблю сир.", en: "cheese", en_ex: "I like cheese.", ru: "сыр", ru_ex: "Я люблю сыр." },
        { t: "Їжа", no: "mięso", uk: "м'ясо", ex_no: "Nie jem mięsa.", ex_uk: "Я не їм м'яса.", en: "meat", en_ex: "I don't eat meat.", ru: "мясо", ru_ex: "Я не ем мясо." },
        { t: "Їжа", no: "ryba", uk: "риба", ex_no: "Lubię ryby.", ex_uk: "Я люблю рибу.", en: "fish", en_ex: "I like fish.", ru: "рыба", ru_ex: "Я люблю рыбу." },

        // =========================
        // ДІМ
        // =========================
        { t: "Дім", no: "dom", uk: "будинок", ex_no: "Mój dom jest mały.", ex_uk: "Мій будинок маленький.", en: "house", en_ex: "My house is small.", ru: "дом", ru_ex: "Мой дом маленький." },
        { t: "Дім", no: "mieszkanie", uk: "квартира", ex_no: "Mieszkam w małym mieszkaniu.", ex_uk: "Я живу в маленькій квартирі.", en: "apartment", en_ex: "I live in a small apartment.", ru: "квартира", ru_ex: "Я живу в маленькой квартире." },
        { t: "Дім", no: "pokój", uk: "кімната", ex_no: "Mój pokój jest jasny.", ex_uk: "Моя кімната світла.", en: "room", en_ex: "My room is bright.", ru: "комната", ru_ex: "Моя комната светлая." },
        { t: "Дім", no: "kuchnia", uk: "кухня", ex_no: "Kuchnia jest mała.", ex_uk: "Кухня маленька.", en: "kitchen", en_ex: "The kitchen is small.", ru: "кухня", ru_ex: "Кухня маленькая." },
        { t: "Дім", no: "łazienka", uk: "ванна кімната", ex_no: "Łazienka jest na górze.", ex_uk: "Ванна кімната нагорі.", en: "bathroom", en_ex: "The bathroom is upstairs.", ru: "ванная комната", ru_ex: "Ванная комната наверху." },
        { t: "Дім", no: "drzwi", uk: "двері", ex_no: "Zamknij drzwi, proszę.", ex_uk: "Закрий двері, будь ласка.", en: "door", en_ex: "Close the door, please.", ru: "дверь", ru_ex: "Закрой дверь, пожалуйста." },
        { t: "Дім", no: "okno", uk: "вікно", ex_no: "Otwórz okno, proszę.", ex_uk: "Відкрий вікно, будь ласка.", en: "window", en_ex: "Open the window, please.", ru: "окно", ru_ex: "Открой окно, пожалуйста." },
        { t: "Дім", no: "stół", uk: "стіл", ex_no: "Książka jest na stole.", ex_uk: "Книга на столі.", en: "table", en_ex: "The book is on the table.", ru: "стол", ru_ex: "Книга на столе." },
        { t: "Дім", no: "krzesło", uk: "стілець", ex_no: "Usiądź na krześle.", ex_uk: "Сядь на стілець.", en: "chair", en_ex: "Sit on the chair.", ru: "стул", ru_ex: "Сядь на стул." },
        { t: "Дім", no: "łóżko", uk: "ліжко", ex_no: "Idę do łóżka.", ex_uk: "Я йду в ліжко.", en: "bed", en_ex: "I am going to bed.", ru: "кровать", ru_ex: "Я иду в кровать." },

        // =========================
        // МІСТО
        // =========================
        { t: "Місто", no: "miasto", uk: "місто", ex_no: "Warszawa to duże miasto.", ex_uk: "Варшава — велике місто.", en: "city", en_ex: "Warsaw is a big city.", ru: "город", ru_ex: "Варшава — большой город." },
        { t: "Місто", no: "ulica", uk: "вулиця", ex_no: "Mieszkam na tej ulicy.", ex_uk: "Я живу на цій вулиці.", en: "street", en_ex: "I live on this street.", ru: "улица", ru_ex: "Я живу на этой улице." },
        { t: "Місто", no: "sklep", uk: "магазин", ex_no: "Idę do sklepu.", ex_uk: "Я йду до магазину.", en: "shop", en_ex: "I am going to the shop.", ru: "магазин", ru_ex: "Я иду в магазин." },
        { t: "Місто", no: "dworzec", uk: "вокзал", ex_no: "Gdzie jest dworzec?", ex_uk: "Де вокзал?", en: "station", en_ex: "Where is the station?", ru: "вокзал", ru_ex: "Где вокзал?" },
        { t: "Місто", no: "szkoła", uk: "школа", ex_no: "Dzieci idą do szkoły.", ex_uk: "Діти йдуть до школи.", en: "school", en_ex: "The children are going to school.", ru: "школа", ru_ex: "Дети идут в школу." },
        { t: "Місто", no: "praca", uk: "робота", ex_no: "Idę do pracy.", ex_uk: "Я йду на роботу.", en: "work", en_ex: "I am going to work.", ru: "работа", ru_ex: "Я иду на работу." },
        { t: "Місто", no: "bank", uk: "банк", ex_no: "Bank jest blisko.", ex_uk: "Банк близько.", en: "bank", en_ex: "The bank is nearby.", ru: "банк", ru_ex: "Банк рядом." },
        { t: "Місто", no: "apteka", uk: "аптека", ex_no: "Gdzie jest apteka?", ex_uk: "Де аптека?", en: "pharmacy", en_ex: "Where is the pharmacy?", ru: "аптека", ru_ex: "Где аптека?" },

        // =========================
        // ТРАНСПОРТ
        // =========================
        { t: "Транспорт", no: "samochód", uk: "автомобіль", ex_no: "Mam nowy samochód.", ex_uk: "У мене новий автомобіль.", en: "car", en_ex: "I have a new car.", ru: "машина", ru_ex: "У меня новая машина." },
        { t: "Транспорт", no: "autobus", uk: "автобус", ex_no: "Jadę autobusem do centrum.", ex_uk: "Я їду автобусом до центру.", en: "bus", en_ex: "I am taking the bus to the city center.", ru: "автобус", ru_ex: "Я еду на автобусе в центр." },
        { t: "Транспорт", no: "pociąg", uk: "поїзд", ex_no: "Pociąg odjeżdża o ósmej.", ex_uk: "Потяг відправляється о восьмій.", en: "train", en_ex: "The train leaves at eight.", ru: "поезд", ru_ex: "Поезд отправляется в восемь." },
        { t: "Транспорт", no: "bilet", uk: "квиток", ex_no: "Poproszę jeden bilet.", ex_uk: "Один квиток, будь ласка.", en: "ticket", en_ex: "One ticket, please.", ru: "билет", ru_ex: "Один билет, пожалуйста." },
        { t: "Транспорт", no: "lotnisko", uk: "аеропорт", ex_no: "Lotnisko jest daleko.", ex_uk: "Аеропорт далеко.", en: "airport", en_ex: "The airport is far away.", ru: "аэропорт", ru_ex: "Аэропорт далеко." },

        // =========================
        // ЧАС
        // =========================
        { t: "Час", no: "dzisiaj", uk: "сьогодні", ex_no: "Dzisiaj pracuję.", ex_uk: "Сьогодні я працюю.", en: "today", en_ex: "I am working today.", ru: "сегодня", ru_ex: "Сегодня я работаю." },
        { t: "Час", no: "jutro", uk: "завтра", ex_no: "Jutro mam wolne.", ex_uk: "Завтра я вільний.", en: "tomorrow", en_ex: "I am free tomorrow.", ru: "завтра", ru_ex: "Завтра я свободен." },
        { t: "Час", no: "wczoraj", uk: "вчора", ex_no: "Wczoraj byłem w domu.", ex_uk: "Вчора я був удома.", en: "yesterday", en_ex: "I was at home yesterday.", ru: "вчера", ru_ex: "Вчера я был дома." },
        { t: "Час", no: "rano", uk: "вранці", ex_no: "Rano piję kawę.", ex_uk: "Вранці я п'ю каву.", en: "in the morning", en_ex: "I drink coffee in the morning.", ru: "утром", ru_ex: "Утром я пью кофе." },
        { t: "Час", no: "wieczorem", uk: "увечері", ex_no: "Wieczorem oglądam film.", ex_uk: "Увечері я дивлюся фільм.", en: "in the evening", en_ex: "I watch a movie in the evening.", ru: "вечером", ru_ex: "Вечером я смотрю фильм." },
        { t: "Час", no: "godzina", uk: "година", ex_no: "Mam jedną godzinę.", ex_uk: "У мене є одна година.", en: "hour", en_ex: "I have one hour.", ru: "час", ru_ex: "У меня есть один час." },
        { t: "Час", no: "minuta", uk: "хвилина", ex_no: "Poczekaj minutę.", ex_uk: "Почекай хвилину.", en: "minute", en_ex: "Wait a minute.", ru: "минута", ru_ex: "Подожди минуту." },

        // =========================
        // ДІЄСЛОВА
        // =========================
        { t: "Дієслова", no: "być", uk: "бути", ex_no: "Chcę być w domu.", ex_uk: "Я хочу бути вдома.", en: "to be", en_ex: "I want to be at home.", ru: "быть", ru_ex: "Я хочу быть дома." },
        { t: "Дієслова", no: "mieć", uk: "мати", ex_no: "Mam nowy telefon.", ex_uk: "У мене є новий телефон.", en: "to have", en_ex: "I have a new phone.", ru: "иметь", ru_ex: "У меня новый телефон." },
        { t: "Дієслова", no: "robić", uk: "робити", ex_no: "Co robisz dzisiaj?", ex_uk: "Що ти робиш сьогодні?", en: "to do / make", en_ex: "What are you doing today?", ru: "делать", ru_ex: "Что ты делаешь сегодня?" },
        { t: "Дієслова", no: "mówić", uk: "говорити", ex_no: "Mówię po polsku.", ex_uk: "Я говорю польською.", en: "to speak", en_ex: "I speak Polish.", ru: "говорить", ru_ex: "Я говорю по-польски." },
        { t: "Дієслова", no: "rozumieć", uk: "розуміти", ex_no: "Nie rozumiem tego słowa.", ex_uk: "Я не розумію цього слова.", en: "to understand", en_ex: "I don't understand this word.", ru: "понимать", ru_ex: "Я не понимаю этого слова." },
        { t: "Дієслова", no: "wiedzieć", uk: "знати", ex_no: "Nie wiem, gdzie jest sklep.", ex_uk: "Я не знаю, де магазин.", en: "to know", en_ex: "I don't know where the shop is.", ru: "знать", ru_ex: "Я не знаю, где магазин." },
        { t: "Дієслова", no: "chcieć", uk: "хотіти", ex_no: "Chcę kawę.", ex_uk: "Я хочу каву.", en: "to want", en_ex: "I want coffee.", ru: "хотеть", ru_ex: "Я хочу кофе." },
        { t: "Дієслова", no: "móc", uk: "могти", ex_no: "Czy mogę wejść?", ex_uk: "Чи можу я зайти?", en: "can / may", en_ex: "Can I come in?", ru: "мочь", ru_ex: "Могу я войти?" },
        { t: "Дієслова", no: "lubić", uk: "любити / подобатися", ex_no: "Lubię polską muzykę.", ex_uk: "Мені подобається польська музика.", en: "to like", en_ex: "I like Polish music.", ru: "любить / нравиться", ru_ex: "Мне нравится польская музыка." },
        { t: "Дієслова", no: "iść", uk: "йти", ex_no: "Idę do sklepu.", ex_uk: "Я йду до магазину.", en: "to go", en_ex: "I am going to the shop.", ru: "идти", ru_ex: "Я иду в магазин." },
        { t: "Дієслова", no: "jechać", uk: "їхати", ex_no: "Jadę do Warszawy.", ex_uk: "Я їду до Варшави.", en: "to go / travel by vehicle", en_ex: "I am going to Warsaw.", ru: "ехать", ru_ex: "Я еду в Варшаву." },
        { t: "Дієслова", no: "jeść", uk: "їсти", ex_no: "Lubię jeść owoce.", ex_uk: "Я люблю їсти фрукти.", en: "to eat", en_ex: "I like eating fruit.", ru: "есть", ru_ex: "Я люблю есть фрукты." },
        { t: "Дієслова", no: "pić", uk: "пити", ex_no: "Piję dużo wody.", ex_uk: "Я п'ю багато води.", en: "to drink", en_ex: "I drink a lot of water.", ru: "пить", ru_ex: "Я пью много воды." },
        { t: "Дієслова", no: "czytać", uk: "читати", ex_no: "Lubię czytać książki.", ex_uk: "Я люблю читати книги.", en: "to read", en_ex: "I like reading books.", ru: "читать", ru_ex: "Я люблю читать книги." },
        { t: "Дієслова", no: "pisać", uk: "писати", ex_no: "Piszę wiadomość.", ex_uk: "Я пишу повідомлення.", en: "to write", en_ex: "I am writing a message.", ru: "писать", ru_ex: "Я пишу сообщение." },
        { t: "Дієслова", no: "pracować", uk: "працювати", ex_no: "Pracuję w biurze.", ex_uk: "Я працюю в офісі.", en: "to work", en_ex: "I work in an office.", ru: "работать", ru_ex: "Я работаю в офисе." },
        { t: "Дієслова", no: "mieszkać", uk: "жити / мешкати", ex_no: "Mieszkam w Polsce.", ex_uk: "Я живу в Польщі.", en: "to live", en_ex: "I live in Poland.", ru: "жить", ru_ex: "Я живу в Польше." },

        // =========================
        // ПРИКМЕТНИКИ
        // =========================
        { t: "Прикметники", no: "dobry", uk: "добрий / хороший", ex_no: "To jest dobry film.", ex_uk: "Це хороший фільм.", en: "good", en_ex: "This is a good movie.", ru: "хороший", ru_ex: "Это хороший фильм." },
        { t: "Прикметники", no: "zły", uk: "поганий", ex_no: "To jest zły pomysł.", ex_uk: "Це погана ідея.", en: "bad", en_ex: "This is a bad idea.", ru: "плохой", ru_ex: "Это плохая идея." },
        { t: "Прикметники", no: "duży", uk: "великий", ex_no: "To jest duży dom.", ex_uk: "Це великий будинок.", en: "big", en_ex: "This is a big house.", ru: "большой", ru_ex: "Это большой дом." },
        { t: "Прикметники", no: "mały", uk: "маленький", ex_no: "Mam mały pokój.", ex_uk: "У мене маленька кімната.", en: "small", en_ex: "I have a small room.", ru: "маленький", ru_ex: "У меня маленькая комната." },
        { t: "Прикметники", no: "nowy", uk: "новий", ex_no: "Mam nowy telefon.", ex_uk: "У мене новий телефон.", en: "new", en_ex: "I have a new phone.", ru: "новый", ru_ex: "У меня новый телефон." },
        { t: "Прикметники", no: "stary", uk: "старий", ex_no: "To jest stary samochód.", ex_uk: "Це старий автомобіль.", en: "old", en_ex: "This is an old car.", ru: "старый", ru_ex: "Это старая машина." },
        { t: "Прикметники", no: "ładny", uk: "гарний", ex_no: "To bardzo ładne miasto.", ex_uk: "Це дуже гарне місто.", en: "pretty / nice", en_ex: "This is a very nice city.", ru: "красивый", ru_ex: "Это очень красивый город." },
        { t: "Прикметники", no: "łatwy", uk: "легкий", ex_no: "Ten test jest łatwy.", ex_uk: "Цей тест легкий.", en: "easy", en_ex: "This test is easy.", ru: "лёгкий", ru_ex: "Этот тест лёгкий." },
        { t: "Прикметники", no: "trudny", uk: "важкий / складний", ex_no: "Polski jest czasem trudny.", ex_uk: "Польська іноді складна.", en: "difficult", en_ex: "Polish is sometimes difficult.", ru: "трудный", ru_ex: "Польский иногда трудный." },

        // =========================
        // ПОГОДА
        // =========================
        { t: "Погода", no: "pogoda", uk: "погода", ex_no: "Dzisiaj jest dobra pogoda.", ex_uk: "Сьогодні хороша погода.", en: "weather", en_ex: "The weather is good today.", ru: "погода", ru_ex: "Сегодня хорошая погода." },
        { t: "Погода", no: "słońce", uk: "сонце", ex_no: "Dzisiaj świeci słońce.", ex_uk: "Сьогодні світить сонце.", en: "sun", en_ex: "The sun is shining today.", ru: "солнце", ru_ex: "Сегодня светит солнце." },
        { t: "Погода", no: "deszcz", uk: "дощ", ex_no: "Pada deszcz.", ex_uk: "Йде дощ.", en: "rain", en_ex: "It is raining.", ru: "дождь", ru_ex: "Идёт дождь." },
        { t: "Погода", no: "śnieg", uk: "сніг", ex_no: "Zimą pada śnieg.", ex_uk: "Взимку йде сніг.", en: "snow", en_ex: "It snows in winter.", ru: "снег", ru_ex: "Зимой идёт снег." },
        { t: "Погода", no: "zimno", uk: "холодно", ex_no: "Dzisiaj jest zimno.", ex_uk: "Сьогодні холодно.", en: "cold", en_ex: "It is cold today.", ru: "холодно", ru_ex: "Сегодня холодно." },
        { t: "Погода", no: "ciepło", uk: "тепло", ex_no: "Dzisiaj jest ciepło.", ex_uk: "Сьогодні тепло.", en: "warm", en_ex: "It is warm today.", ru: "тепло", ru_ex: "Сегодня тепло." },

        // =========================
        // ОДЯГ
        // =========================
        { t: "Одяг", no: "koszula", uk: "сорочка", ex_no: "Mam białą koszulę.", ex_uk: "У мене біла сорочка.", en: "shirt", en_ex: "I have a white shirt.", ru: "рубашка", ru_ex: "У меня белая рубашка." },
        { t: "Одяг", no: "spodnie", uk: "штани", ex_no: "Te spodnie są czarne.", ex_uk: "Ці штани чорні.", en: "trousers", en_ex: "These trousers are black.", ru: "брюки", ru_ex: "Эти брюки чёрные." },
        { t: "Одяг", no: "buty", uk: "взуття / черевики", ex_no: "Potrzebuję nowych butów.", ex_uk: "Мені потрібне нове взуття.", en: "shoes", en_ex: "I need new shoes.", ru: "обувь", ru_ex: "Мне нужна новая обувь." },
        { t: "Одяг", no: "kurtka", uk: "куртка", ex_no: "Gdzie jest moja kurtka?", ex_uk: "Де моя куртка?", en: "jacket", en_ex: "Where is my jacket?", ru: "куртка", ru_ex: "Где моя куртка?" },

        // =========================
        // ТІЛО
        // =========================
        { t: "Тіло", no: "głowa", uk: "голова", ex_no: "Boli mnie głowa.", ex_uk: "У мене болить голова.", en: "head", en_ex: "I have a headache.", ru: "голова", ru_ex: "У меня болит голова." },
        { t: "Тіло", no: "ręka", uk: "рука", ex_no: "Mam ból w ręce.", ex_uk: "У мене болить рука.", en: "hand / arm", en_ex: "My arm hurts.", ru: "рука", ru_ex: "У меня болит рука." },
        { t: "Тіло", no: "oko", uk: "око", ex_no: "Mam niebieskie oczy.", ex_uk: "У мене блакитні очі.", en: "eye", en_ex: "I have blue eyes.", ru: "глаз", ru_ex: "У меня голубые глаза." },
        { t: "Тіло", no: "nos", uk: "ніс", ex_no: "Mam mały nos.", ex_uk: "У мене маленький ніс.", en: "nose", en_ex: "I have a small nose.", ru: "нос", ru_ex: "У меня маленький нос." },

        // =========================
        // НАВЧАННЯ
        // =========================
        { t: "Навчання", no: "nauczyciel", uk: "вчитель", ex_no: "Nauczyciel mówi po polsku.", ex_uk: "Вчитель говорить польською.", en: "teacher", en_ex: "The teacher speaks Polish.", ru: "учитель", ru_ex: "Учитель говорит по-польски." },
        { t: "Навчання", no: "uczeń", uk: "учень", ex_no: "Uczeń czyta książkę.", ex_uk: "Учень читає книгу.", en: "student / pupil", en_ex: "The student is reading a book.", ru: "ученик", ru_ex: "Ученик читает книгу." },
        { t: "Навчання", no: "książka", uk: "книга", ex_no: "Czytam ciekawą książkę.", ex_uk: "Я читаю цікаву книгу.", en: "book", en_ex: "I am reading an interesting book.", ru: "книга", ru_ex: "Я читаю интересную книгу." },
        { t: "Навчання", no: "słowo", uk: "слово", ex_no: "Nie znam tego słowa.", ex_uk: "Я не знаю цього слова.", en: "word", en_ex: "I don't know this word.", ru: "слово", ru_ex: "Я не знаю этого слова." },
        { t: "Навчання", no: "język", uk: "мова", ex_no: "Uczę się języka polskiego.", ex_uk: "Я вивчаю польську мову.", en: "language", en_ex: "I am learning Polish.", ru: "язык", ru_ex: "Я учу польский язык." },

        // =========================
        // РОБОТА
        // =========================
        { t: "Робота", no: "biuro", uk: "офіс", ex_no: "Pracuję w biurze.", ex_uk: "Я працюю в офісі.", en: "office", en_ex: "I work in an office.", ru: "офис", ru_ex: "Я работаю в офисе." },
        { t: "Робота", no: "szef", uk: "начальник", ex_no: "Mój szef jest bardzo miły.", ex_uk: "Мій начальник дуже приємний.", en: "boss", en_ex: "My boss is very nice.", ru: "начальник", ru_ex: "Мой начальник очень приятный." },
        { t: "Робота", no: "pracownik", uk: "працівник", ex_no: "Jestem nowym pracownikiem.", ex_uk: "Я новий працівник.", en: "employee", en_ex: "I am a new employee.", ru: "работник", ru_ex: "Я новый работник." },

        // =========================
        // ПОКУПКИ
        // =========================
        { t: "Покупки", no: "pieniądze", uk: "гроші", ex_no: "Nie mam dużo pieniędzy.", ex_uk: "У мене немає багато грошей.", en: "money", en_ex: "I don't have much money.", ru: "деньги", ru_ex: "У меня нет много денег." },
        { t: "Покупки", no: "cena", uk: "ціна", ex_no: "Jaka jest cena?", ex_uk: "Яка ціна?", en: "price", en_ex: "What is the price?", ru: "цена", ru_ex: "Какая цена?" },
        { t: "Покупки", no: "tani", uk: "дешевий", ex_no: "Ten sklep jest tani.", ex_uk: "Цей магазин дешевий.", en: "cheap", en_ex: "This shop is cheap.", ru: "дешёвый", ru_ex: "Этот магазин дешёвый." },
        { t: "Покупки", no: "drogi", uk: "дорогий", ex_no: "Ten telefon jest drogi.", ex_uk: "Цей телефон дорогий.", en: "expensive", en_ex: "This phone is expensive.", ru: "дорогой", ru_ex: "Этот телефон дорогой." },
        { t: "Покупки", no: "kupować", uk: "купувати", ex_no: "Muszę kupować jedzenie.", ex_uk: "Я мушу купувати їжу.", en: "to buy", en_ex: "I have to buy food.", ru: "покупать", ru_ex: "Я должен покупать еду." },
        { t: "Покупки", no: "sprzedawać", uk: "продавати", ex_no: "Ten sklep sprzedaje ubrania.", ex_uk: "Цей магазин продає одяг.", en: "to sell", en_ex: "This shop sells clothes.", ru: "продавать", ru_ex: "Этот магазин продаёт одежду." },

        // =========================
        // ХОБІ
        // =========================
        { t: "Хобі", no: "muzyka", uk: "музика", ex_no: "Lubię polską muzykę.", ex_uk: "Я люблю польську музику.", en: "music", en_ex: "I like Polish music.", ru: "музыка", ru_ex: "Я люблю польскую музыку." },
        { t: "Хобі", no: "film", uk: "фільм", ex_no: "Oglądam dobry film.", ex_uk: "Я дивлюся хороший фільм.", en: "movie", en_ex: "I am watching a good movie.", ru: "фильм", ru_ex: "Я смотрю хороший фильм." },
        { t: "Хобі", no: "sport", uk: "спорт", ex_no: "Lubię sport.", ex_uk: "Я люблю спорт.", en: "sport", en_ex: "I like sport.", ru: "спорт", ru_ex: "Я люблю спорт." },
        { t: "Хобі", no: "piłka", uk: "м'яч", ex_no: "Dzieci grają w piłkę.", ex_uk: "Діти грають у м'яч.", en: "ball", en_ex: "The children are playing with a ball.", ru: "мяч", ru_ex: "Дети играют с мячом." },
        { t: "Хобі", no: "grać", uk: "грати", ex_no: "Lubię grać w piłkę.", ex_uk: "Я люблю грати у футбол.", en: "to play", en_ex: "I like playing football.", ru: "играть", ru_ex: "Я люблю играть в футбол." },

        // =========================
        // ПРИЙМЕННИКИ
        // =========================
        { t: "Прийменники", no: "w", uk: "в / у", ex_no: "Mieszkam w Polsce.", ex_uk: "Я живу в Польщі.", en: "in", en_ex: "I live in Poland.", ru: "в", ru_ex: "Я живу в Польше." },
        { t: "Прийменники", no: "na", uk: "на", ex_no: "Książka jest na stole.", ex_uk: "Книга на столі.", en: "on", en_ex: "The book is on the table.", ru: "на", ru_ex: "Книга на столе." },
        { t: "Прийменники", no: "z", uk: "з", ex_no: "Jestem z Ukrainy.", ex_uk: "Я з України.", en: "from / with", en_ex: "I am from Ukraine.", ru: "из / с", ru_ex: "Я из Украины." },
        { t: "Прийменники", no: "do", uk: "до", ex_no: "Idę do pracy.", ex_uk: "Я йду на роботу.", en: "to", en_ex: "I am going to work.", ru: "в / до", ru_ex: "Я иду на работу." },
        { t: "Прийменники", no: "bez", uk: "без", ex_no: "Kawa bez cukru, proszę.", ex_uk: "Каву без цукру, будь ласка.", en: "without", en_ex: "Coffee without sugar, please.", ru: "без", ru_ex: "Кофе без сахара, пожалуйста." },

        // =========================
        // ПИТАННЯ
        // =========================
        { t: "Питання", no: "kto?", uk: "хто?", ex_no: "Kto to jest?", ex_uk: "Хто це?", en: "who?", en_ex: "Who is that?", ru: "кто?", ru_ex: "Кто это?" },
        { t: "Питання", no: "co?", uk: "що?", ex_no: "Co robisz?", ex_uk: "Що ти робиш?", en: "what?", en_ex: "What are you doing?", ru: "что?", ru_ex: "Что ты делаешь?" },
        { t: "Питання", no: "gdzie?", uk: "де?", ex_no: "Gdzie jest toaleta?", ex_uk: "Де туалет?", en: "where?", en_ex: "Where is the toilet?", ru: "где?", ru_ex: "Где туалет?" },
        { t: "Питання", no: "kiedy?", uk: "коли?", ex_no: "Kiedy wracasz?", ex_uk: "Коли ти повертаєшся?", en: "when?", en_ex: "When are you coming back?", ru: "когда?", ru_ex: "Когда ты возвращаешься?" },
        { t: "Питання", no: "dlaczego?", uk: "чому?", ex_no: "Dlaczego jesteś smutny?", ex_uk: "Чому ти сумний?", en: "why?", en_ex: "Why are you sad?", ru: "почему?", ru_ex: "Почему ты грустный?" },
        { t: "Питання", no: "jak?", uk: "як?", ex_no: "Jak masz na imię?", ex_uk: "Як тебе звати?", en: "how?", en_ex: "What is your name?", ru: "как?", ru_ex: "Как тебя зовут?" },
        { t: "Питання", no: "ile?", uk: "скільки?", ex_no: "Ile to kosztuje?", ex_uk: "Скільки це коштує?", en: "how much / how many?", en_ex: "How much does it cost?", ru: "сколько?", ru_ex: "Сколько это стоит?" },

        // =========================
        // КОРИСНІ ФРАЗИ
        // =========================
        { t: "Корисні фрази", no: "nie wiem", uk: "я не знаю", ex_no: "Nie wiem, gdzie on jest.", ex_uk: "Я не знаю, де він.", en: "I don't know", en_ex: "I don't know where he is.", ru: "я не знаю", ru_ex: "Я не знаю, где он." },
        { t: "Корисні фрази", no: "nie rozumiem", uk: "я не розумію", ex_no: "Przepraszam, nie rozumiem.", ex_uk: "Вибачте, я не розумію.", en: "I don't understand", en_ex: "Sorry, I don't understand.", ru: "я не понимаю", ru_ex: "Извините, я не понимаю." },
        { t: "Корисні фрази", no: "proszę powtórzyć", uk: "повторіть, будь ласка", ex_no: "Proszę powtórzyć jeszcze raz.", ex_uk: "Повторіть ще раз, будь ласка.", en: "please repeat", en_ex: "Please repeat it again.", ru: "повторите, пожалуйста", ru_ex: "Повторите ещё раз, пожалуйста." },
        { t: "Корисні фрази", no: "mówię trochę po polsku", uk: "я трохи говорю польською", ex_no: "Mówię trochę po polsku.", ex_uk: "Я трохи говорю польською.", en: "I speak a little Polish", en_ex: "I speak a little Polish.", ru: "я немного говорю по-польски", ru_ex: "Я немного говорю по-польски." },
        { t: "Корисні фрази", no: "jak się masz?", uk: "як ти?", ex_no: "Cześć, jak się masz?", ex_uk: "Привіт, як ти?", en: "how are you?", en_ex: "Hi, how are you?", ru: "как ты?", ru_ex: "Привет, как ты?" },
        { t: "Корисні фрази", no: "wszystko dobrze", uk: "все добре", ex_no: "Tak, wszystko dobrze.", ex_uk: "Так, все добре.", en: "everything is fine", en_ex: "Yes, everything is fine.", ru: "всё хорошо", ru_ex: "Да, всё хорошо." },
          // =========================
        // НОВІ СЛОВА A1 — ОСОБИСТЕ
        // =========================
        { t: "Особисте", no: "imię", uk: "ім'я", ex_no: "Jak masz na imię?", ex_uk: "Як тебе звати?", en: "name", en_ex: "What is your name?", ru: "имя", ru_ex: "Как тебя зовут?" },
        { t: "Особисте", no: "nazwisko", uk: "прізвище", ex_no: "Jak masz na nazwisko?", ex_uk: "Яке у вас прізвище?", en: "surname", en_ex: "What is your surname?", ru: "фамилия", ru_ex: "Какая у вас фамилия?" },
        { t: "Особисте", no: "wiek", uk: "вік", ex_no: "Jaki masz wiek?", ex_uk: "Скільки тобі років?", en: "age", en_ex: "How old are you?", ru: "возраст", ru_ex: "Сколько тебе лет?" },
        { t: "Особисте", no: "adres", uk: "адреса", ex_no: "Jaki jest twój adres?", ex_uk: "Яка твоя адреса?", en: "address", en_ex: "What is your address?", ru: "адрес", ru_ex: "Какой у тебя адрес?" },
        { t: "Особисте", no: "numer telefonu", uk: "номер телефону", ex_no: "Jaki masz numer telefonu?", ex_uk: "Який у тебе номер телефону?", en: "phone number", en_ex: "What is your phone number?", ru: "номер телефона", ru_ex: "Какой у тебя номер телефона?" },

        // =========================
        // СІМ'Я — ДОДАТКОВО
        // =========================
        { t: "Сім'я", no: "rodzice", uk: "батьки", ex_no: "Moi rodzice mieszkają w Polsce.", ex_uk: "Мої батьки живуть у Польщі.", en: "parents", en_ex: "My parents live in Poland.", ru: "родители", ru_ex: "Мои родители живут в Польше." },
        { t: "Сім'я", no: "mąż", uk: "чоловік / чоловік у шлюбі", ex_no: "Mój mąż pracuje w Warszawie.", ex_uk: "Мій чоловік працює у Варшаві.", en: "husband", en_ex: "My husband works in Warsaw.", ru: "муж", ru_ex: "Мой муж работает в Варшаве." },
        { t: "Сім'я", no: "żona", uk: "дружина", ex_no: "Moja żona jest w domu.", ex_uk: "Моя дружина вдома.", en: "wife", en_ex: "My wife is at home.", ru: "жена", ru_ex: "Моя жена дома." },
        { t: "Сім'я", no: "dziadek", uk: "дідусь", ex_no: "Mój dziadek mieszka na wsi.", ex_uk: "Мій дідусь живе в селі.", en: "grandfather", en_ex: "My grandfather lives in the countryside.", ru: "дедушка", ru_ex: "Мой дедушка живёт в деревне." },
        { t: "Сім'я", no: "babcia", uk: "бабуся", ex_no: "Moja babcia robi ciasto.", ex_uk: "Моя бабуся пече пиріг.", en: "grandmother", en_ex: "My grandmother makes a cake.", ru: "бабушка", ru_ex: "Моя бабушка печёт пирог." },
        { t: "Сім'я", no: "rodzeństwo", uk: "брати і сестри", ex_no: "Mam dużo rodzeństwa.", ex_uk: "У мене багато братів і сестер.", en: "siblings", en_ex: "I have many siblings.", ru: "братья и сёстры", ru_ex: "У меня много братьев и сестёр." },

        // =========================
        // ЇЖА — ДОДАТКОВО
        // =========================
        { t: "Їжа", no: "jajko", uk: "яйце", ex_no: "Jem jajko na śniadanie.", ex_uk: "Я їм яйце на сніданок.", en: "egg", en_ex: "I eat an egg for breakfast.", ru: "яйцо", ru_ex: "Я ем яйцо на завтрак." },
        { t: "Їжа", no: "zupa", uk: "суп", ex_no: "Zupa jest bardzo dobra.", ex_uk: "Суп дуже смачний.", en: "soup", en_ex: "The soup is very good.", ru: "суп", ru_ex: "Суп очень вкусный." },
        { t: "Їжа", no: "ryż", uk: "рис", ex_no: "Lubię ryż z warzywami.", ex_uk: "Я люблю рис з овочами.", en: "rice", en_ex: "I like rice with vegetables.", ru: "рис", ru_ex: "Я люблю рис с овощами." },
        { t: "Їжа", no: "ziemniak", uk: "картопля", ex_no: "Gotuję ziemniaki.", ex_uk: "Я варю картоплю.", en: "potato", en_ex: "I am cooking potatoes.", ru: "картофель", ru_ex: "Я варю картофель." },
        { t: "Їжа", no: "warzywo", uk: "овоч", ex_no: "To jest zdrowe warzywo.", ex_uk: "Це корисний овоч.", en: "vegetable", en_ex: "This is a healthy vegetable.", ru: "овощ", ru_ex: "Это полезный овощ." },
        { t: "Їжа", no: "owoc", uk: "фрукт", ex_no: "Lubię świeże owoce.", ex_uk: "Я люблю свіжі фрукти.", en: "fruit", en_ex: "I like fresh fruit.", ru: "фрукт", ru_ex: "Я люблю свежие фрукты." },
        { t: "Їжа", no: "cukier", uk: "цукор", ex_no: "Nie piję kawy z cukrem.", ex_uk: "Я не п'ю каву з цукром.", en: "sugar", en_ex: "I don't drink coffee with sugar.", ru: "сахар", ru_ex: "Я не пью кофе с сахаром." },
        { t: "Їжа", no: "sól", uk: "сіль", ex_no: "Dodaj trochę soli.", ex_uk: "Додай трохи солі.", en: "salt", en_ex: "Add a little salt.", ru: "соль", ru_ex: "Добавь немного соли." },
        { t: "Їжа", no: "śniadanie", uk: "сніданок", ex_no: "Jem śniadanie o ósmej.", ex_uk: "Я снідаю о восьмій.", en: "breakfast", en_ex: "I have breakfast at eight.", ru: "завтрак", ru_ex: "Я завтракаю в восемь." },
        { t: "Їжа", no: "obiad", uk: "обід", ex_no: "Obiad jest gotowy.", ex_uk: "Обід готовий.", en: "lunch / dinner", en_ex: "Lunch is ready.", ru: "обед", ru_ex: "Обед готов." },
        { t: "Їжа", no: "kolacja", uk: "вечеря", ex_no: "Jemy kolację razem.", ex_uk: "Ми вечеряємо разом.", en: "dinner", en_ex: "We have dinner together.", ru: "ужин", ru_ex: "Мы ужинаем вместе." },

        // =========================
        // НАПОЇ
        // =========================
        { t: "Напої", no: "sok", uk: "сік", ex_no: "Poproszę sok pomarańczowy.", ex_uk: "Апельсиновий сік, будь ласка.", en: "juice", en_ex: "Orange juice, please.", ru: "сок", ru_ex: "Апельсиновый сок, пожалуйста." },
        { t: "Напої", no: "napój", uk: "напій", ex_no: "Jaki chcesz napój?", ex_uk: "Який напій ти хочеш?", en: "drink / beverage", en_ex: "What drink do you want?", ru: "напиток", ru_ex: "Какой напиток ты хочешь?" },
        { t: "Напої", no: "woda gazowana", uk: "газована вода", ex_no: "Poproszę wodę gazowaną.", ex_uk: "Газовану воду, будь ласка.", en: "sparkling water", en_ex: "Sparkling water, please.", ru: "газированная вода", ru_ex: "Газированную воду, пожалуйста." },

        // =========================
        // КІМНАТА / ДІМ
        // =========================
        { t: "Дім", no: "salon", uk: "вітальня", ex_no: "Oglądam telewizję w salonie.", ex_uk: "Я дивлюся телевізор у вітальні.", en: "living room", en_ex: "I watch TV in the living room.", ru: "гостиная", ru_ex: "Я смотрю телевизор в гостиной." },
        { t: "Дім", no: "sypialnia", uk: "спальня", ex_no: "Sypialnia jest na górze.", ex_uk: "Спальня нагорі.", en: "bedroom", en_ex: "The bedroom is upstairs.", ru: "спальня", ru_ex: "Спальня наверху." },
        { t: "Дім", no: "podłoga", uk: "підлога", ex_no: "Książka leży na podłodze.", ex_uk: "Книга лежить на підлозі.", en: "floor", en_ex: "The book is on the floor.", ru: "пол", ru_ex: "Книга лежит на полу." },
        { t: "Дім", no: "ściana", uk: "стіна", ex_no: "Obraz jest na ścianie.", ex_uk: "Картина на стіні.", en: "wall", en_ex: "The picture is on the wall.", ru: "стена", ru_ex: "Картина на стене." },
        { t: "Дім", no: "lampa", uk: "лампа", ex_no: "Lampa jest na stole.", ex_uk: "Лампа на столі.", en: "lamp", en_ex: "The lamp is on the table.", ru: "лампа", ru_ex: "Лампа на столе." },
        { t: "Дім", no: "telewizor", uk: "телевізор", ex_no: "Oglądam telewizor wieczorem.", ex_uk: "Я дивлюся телевізор увечері.", en: "television", en_ex: "I watch television in the evening.", ru: "телевизор", ru_ex: "Я смотрю телевизор вечером." },

        // =========================
        // МІСТО — ДОДАТКОВО
        // =========================
        { t: "Місто", no: "centrum", uk: "центр", ex_no: "Mieszkam blisko centrum.", ex_uk: "Я живу біля центру.", en: "city center", en_ex: "I live near the city center.", ru: "центр", ru_ex: "Я живу рядом с центром." },
        { t: "Місто", no: "park", uk: "парк", ex_no: "Spaceruję w parku.", ex_uk: "Я гуляю в парку.", en: "park", en_ex: "I walk in the park.", ru: "парк", ru_ex: "Я гуляю в парке." },
        { t: "Місто", no: "restauracja", uk: "ресторан", ex_no: "Jemy w restauracji.", ex_uk: "Ми їмо в ресторані.", en: "restaurant", en_ex: "We eat at a restaurant.", ru: "ресторан", ru_ex: "Мы едим в ресторане." },
        { t: "Місто", no: "hotel", uk: "готель", ex_no: "Mieszkamy w hotelu.", ex_uk: "Ми живемо в готелі.", en: "hotel", en_ex: "We are staying at a hotel.", ru: "отель", ru_ex: "Мы живём в отеле." },
        { t: "Місто", no: "poczta", uk: "пошта", ex_no: "Poczta jest niedaleko.", ex_uk: "Пошта недалеко.", en: "post office", en_ex: "The post office is nearby.", ru: "почта", ru_ex: "Почта недалеко." },
        { t: "Місто", no: "policja", uk: "поліція", ex_no: "Gdzie jest policja?", ex_uk: "Де поліція?", en: "police", en_ex: "Where is the police?", ru: "полиция", ru_ex: "Где полиция?" },
        { t: "Місто", no: "szpital", uk: "лікарня", ex_no: "Szpital jest blisko.", ex_uk: "Лікарня поруч.", en: "hospital", en_ex: "The hospital is nearby.", ru: "больница", ru_ex: "Больница рядом." },

        // =========================
        // ТРАНСПОРТ — ДОДАТКОВО
        // =========================
        { t: "Транспорт", no: "tramwaj", uk: "трамвай", ex_no: "Jadę tramwajem do centrum.", ex_uk: "Я їду трамваєм до центру.", en: "tram", en_ex: "I am taking the tram to the center.", ru: "трамвай", ru_ex: "Я еду на трамвае в центр." },
        { t: "Транспорт", no: "metro", uk: "метро", ex_no: "Jadę metrem do pracy.", ex_uk: "Я їду метро на роботу.", en: "subway / metro", en_ex: "I take the metro to work.", ru: "метро", ru_ex: "Я еду на метро на работу." },
        { t: "Транспорт", no: "taksówka", uk: "таксі", ex_no: "Zamawiam taksówkę.", ex_uk: "Я замовляю таксі.", en: "taxi", en_ex: "I am ordering a taxi.", ru: "такси", ru_ex: "Я заказываю такси." },
        { t: "Транспорт", no: "rower", uk: "велосипед", ex_no: "Jeżdżę rowerem do pracy.", ex_uk: "Я їжджу велосипедом на роботу.", en: "bicycle", en_ex: "I ride a bicycle to work.", ru: "велосипед", ru_ex: "Я езжу на велосипеде на работу." },
        { t: "Транспорт", no: "przystanek", uk: "зупинка", ex_no: "Gdzie jest przystanek autobusowy?", ex_uk: "Де автобусна зупинка?", en: "stop", en_ex: "Where is the bus stop?", ru: "остановка", ru_ex: "Где автобусная остановка?" },

        // =========================
        // ЧАС — ДНІ ТИЖНЯ
        // =========================
        { t: "Час", no: "poniedziałek", uk: "понеділок", ex_no: "W poniedziałek pracuję.", ex_uk: "У понеділок я працюю.", en: "Monday", en_ex: "I work on Monday.", ru: "понедельник", ru_ex: "В понедельник я работаю." },
        { t: "Час", no: "wtorek", uk: "вівторок", ex_no: "We wtorek mam lekcję.", ex_uk: "У вівторок у мене урок.", en: "Tuesday", en_ex: "I have a lesson on Tuesday.", ru: "вторник", ru_ex: "Во вторник у меня урок." },
        { t: "Час", no: "środa", uk: "середа", ex_no: "W środę idę do pracy.", ex_uk: "У середу я йду на роботу.", en: "Wednesday", en_ex: "I go to work on Wednesday.", ru: "среда", ru_ex: "В среду я иду на работу." },
        { t: "Час", no: "czwartek", uk: "четвер", ex_no: "W czwartek mam wolne.", ex_uk: "У четвер я вільний.", en: "Thursday", en_ex: "I am free on Thursday.", ru: "четверг", ru_ex: "В четверг я свободен." },
        { t: "Час", no: "piątek", uk: "п'ятниця", ex_no: "W piątek kończę pracę wcześniej.", ex_uk: "У п'ятницю я закінчую роботу раніше.", en: "Friday", en_ex: "I finish work earlier on Friday.", ru: "пятница", ru_ex: "В пятницу я заканчиваю работу раньше." },
        { t: "Час", no: "sobota", uk: "субота", ex_no: "W sobotę odpoczywam.", ex_uk: "У суботу я відпочиваю.", en: "Saturday", en_ex: "I rest on Saturday.", ru: "суббота", ru_ex: "В субботу я отдыхаю." },
        { t: "Час", no: "niedziela", uk: "неділя", ex_no: "W niedzielę jestem w domu.", ex_uk: "У неділю я вдома.", en: "Sunday", en_ex: "I am at home on Sunday.", ru: "воскресенье", ru_ex: "В воскресенье я дома." },
        { t: "Час", no: "tydzień", uk: "тиждень", ex_no: "Mam dużo pracy w tym tygodniu.", ex_uk: "У мене багато роботи цього тижня.", en: "week", en_ex: "I have a lot of work this week.", ru: "неделя", ru_ex: "У меня много работы на этой неделе." },
        { t: "Час", no: "miesiąc", uk: "місяць", ex_no: "Pracuję tutaj od miesiąca.", ex_uk: "Я працюю тут місяць.", en: "month", en_ex: "I have worked here for a month.", ru: "месяц", ru_ex: "Я работаю здесь месяц." },
        { t: "Час", no: "rok", uk: "рік", ex_no: "Mam dwadzieścia lat.", ex_uk: "Мені двадцять років.", en: "year", en_ex: "I am twenty years old.", ru: "год", ru_ex: "Мне двадцать лет." },

        // =========================
        // ЧИСЛА 11–20
        // =========================
        { t: "Числа", no: "jedenaście", uk: "одинадцять", ex_no: "Mam jedenaście lat.", ex_uk: "Мені одинадцять років.", en: "eleven", en_ex: "I am eleven years old.", ru: "одиннадцать", ru_ex: "Мне одиннадцать лет." },
        { t: "Числа", no: "dwanaście", uk: "дванадцять", ex_no: "Jest dwanaście osób.", ex_uk: "Є дванадцять людей.", en: "twelve", en_ex: "There are twelve people.", ru: "двенадцать", ru_ex: "Есть двенадцать человек." },
        { t: "Числа", no: "trzynaście", uk: "тринадцять", ex_no: "Mam trzynaście złotych.", ex_uk: "У мене є тринадцять злотих.", en: "thirteen", en_ex: "I have thirteen zloty.", ru: "тринадцать", ru_ex: "У меня есть тринадцать злотых." },
        { t: "Числа", no: "czternaście", uk: "чотирнадцять", ex_no: "Mam czternaście lat.", ex_uk: "Мені чотирнадцять років.", en: "fourteen", en_ex: "I am fourteen years old.", ru: "четырнадцать", ru_ex: "Мне четырнадцать лет." },
        { t: "Числа", no: "piętnaście", uk: "п'ятнадцять", ex_no: "Czekam piętnaście minut.", ex_uk: "Я чекаю п'ятнадцять хвилин.", en: "fifteen", en_ex: "I wait fifteen minutes.", ru: "пятнадцать", ru_ex: "Я жду пятнадцать минут." },
        { t: "Числа", no: "szesnaście", uk: "шістнадцять", ex_no: "Mam szesnaście książek.", ex_uk: "У мене шістнадцять книг.", en: "sixteen", en_ex: "I have sixteen books.", ru: "шестнадцать", ru_ex: "У меня шестнадцать книг." },
        { t: "Числа", no: "siedemnaście", uk: "сімнадцять", ex_no: "Mam siedemnaście lat.", ex_uk: "Мені сімнадцять років.", en: "seventeen", en_ex: "I am seventeen years old.", ru: "семнадцать", ru_ex: "Мне семнадцать лет." },
        { t: "Числа", no: "osiemnaście", uk: "вісімнадцять", ex_no: "Mam osiemnaście lat.", ex_uk: "Мені вісімнадцять років.", en: "eighteen", en_ex: "I am eighteen years old.", ru: "восемнадцать", ru_ex: "Мне восемнадцать лет." },
        { t: "Числа", no: "dziewiętnaście", uk: "дев'ятнадцять", ex_no: "Mam dziewiętnaście lat.", ex_uk: "Мені дев'ятнадцять років.", en: "nineteen", en_ex: "I am nineteen years old.", ru: "девятнадцать", ru_ex: "Мне девятнадцать лет." },
        { t: "Числа", no: "dwadzieścia", uk: "двадцять", ex_no: "Mam dwadzieścia lat.", ex_uk: "Мені двадцять років.", en: "twenty", en_ex: "I am twenty years old.", ru: "двадцать", ru_ex: "Мне двадцать лет." },

        // =========================
        // ДІЄСЛОВА — НОВІ
        // =========================
        { t: "Дієслова", no: "spaść", uk: "пасти", ex_no: "Liść może spaść z drzewa.", ex_uk: "Листок може впасти з дерева.", en: "to fall", en_ex: "A leaf can fall from a tree.", ru: "падать", ru_ex: "Лист может упасть с дерева." },
        { t: "Дієслова", no: "spaść", uk: "впасти", ex_no: "Piłka spadła na podłogę.", ex_uk: "М'яч впав на підлогу.", en: "to fall", en_ex: "The ball fell on the floor.", ru: "упасть", ru_ex: "Мяч упал на пол." },
        { t: "Дієслова", no: "siedzieć", uk: "сидіти", ex_no: "Siedzę przy stole.", ex_uk: "Я сиджу за столом.", en: "to sit", en_ex: "I am sitting at the table.", ru: "сидеть", ru_ex: "Я сижу за столом." },
        { t: "Дієслова", no: "stać", uk: "стояти", ex_no: "Stoję przed domem.", ex_uk: "Я стою перед будинком.", en: "to stand", en_ex: "I am standing in front of the house.", ru: "стоять", ru_ex: "Я стою перед домом." },
        { t: "Дієслова", no: "spać", uk: "спати", ex_no: "Muszę iść spać.", ex_uk: "Мені треба йти спати.", en: "to sleep", en_ex: "I need to go to sleep.", ru: "спать", ru_ex: "Мне нужно идти спать." },
        { t: "Дієслова", no: "wstać", uk: "встати", ex_no: "Muszę wcześnie wstać.", ex_uk: "Мені треба рано встати.", en: "to get up", en_ex: "I have to get up early.", ru: "встать", ru_ex: "Мне нужно рано встать." },
        { t: "Дієслова", no: "myć", uk: "мити", ex_no: "Myję ręce.", ex_uk: "Я мию руки.", en: "to wash", en_ex: "I wash my hands.", ru: "мыть", ru_ex: "Я мою руки." },
        { t: "Дієслова", no: "otwierać", uk: "відкривати", ex_no: "Otwieram okno.", ex_uk: "Я відкриваю вікно.", en: "to open", en_ex: "I open the window.", ru: "открывать", ru_ex: "Я открываю окно." },
        { t: "Дієслова", no: "zamykać", uk: "закривати", ex_no: "Zamykam drzwi.", ex_uk: "Я закриваю двері.", en: "to close", en_ex: "I close the door.", ru: "закрывать", ru_ex: "Я закрываю дверь." },
        { t: "Дієслова", no: "czekać", uk: "чекати", ex_no: "Czekam na autobus.", ex_uk: "Я чекаю на автобус.", en: "to wait", en_ex: "I am waiting for the bus.", ru: "ждать", ru_ex: "Я жду автобус." },
        { t: "Дієслова", no: "szukać", uk: "шукати", ex_no: "Szukam mojego telefonu.", ex_uk: "Я шукаю свій телефон.", en: "to look for", en_ex: "I am looking for my phone.", ru: "искать", ru_ex: "Я ищу свой телефон." },
        { t: "Дієслова", no: "znaleźć", uk: "знайти", ex_no: "Nie mogę znaleźć kluczy.", ex_uk: "Я не можу знайти ключі.", en: "to find", en_ex: "I can't find the keys.", ru: "найти", ru_ex: "Я не могу найти ключи." },
        { t: "Дієслова", no: "dawać", uk: "давати", ex_no: "Daj mi proszę wodę.", ex_uk: "Дай мені, будь ласка, воду.", en: "to give", en_ex: "Give me some water, please.", ru: "давать", ru_ex: "Дай мне воды, пожалуйста." },
        { t: "Дієслова", no: "brać", uk: "брати", ex_no: "Biorę książkę.", ex_uk: "Я беру книгу.", en: "to take", en_ex: "I take the book.", ru: "брать", ru_ex: "Я беру книгу." },
        { t: "Дієслова", no: "gotować", uk: "готувати", ex_no: "Gotuję obiad.", ex_uk: "Я готую обід.", en: "to cook", en_ex: "I am cooking dinner.", ru: "готовить", ru_ex: "Я готовлю обед." },
        { t: "Дієслова", no: "oglądać", uk: "дивитися", ex_no: "Oglądam film.", ex_uk: "Я дивлюся фільм.", en: "to watch", en_ex: "I am watching a movie.", ru: "смотреть", ru_ex: "Я смотрю фильм." },
        { t: "Дієслова", no: "słuchać", uk: "слухати", ex_no: "Słucham muzyki.", ex_uk: "Я слухаю музику.", en: "to listen", en_ex: "I listen to music.", ru: "слушать", ru_ex: "Я слушаю музыку." },
        { t: "Дієслова", no: "uczyć się", uk: "вчитися", ex_no: "Uczę się polskiego.", ex_uk: "Я вчу польську.", en: "to learn / study", en_ex: "I am learning Polish.", ru: "учиться", ru_ex: "Я учу польский." },

        // =========================
        // ПРИКМЕТНИКИ — НОВІ
        // =========================
        { t: "Прикметники", no: "młody", uk: "молодий", ex_no: "To jest młody człowiek.", ex_uk: "Це молода людина.", en: "young", en_ex: "This is a young person.", ru: "молодой", ru_ex: "Это молодой человек." },
        { t: "Прикметники", no: "wysoki", uk: "високий", ex_no: "Mój brat jest wysoki.", ex_uk: "Мій брат високий.", en: "tall / high", en_ex: "My brother is tall.", ru: "высокий", ru_ex: "Мой брат высокий." },
        { t: "Прикметники", no: "niski", uk: "низький / невисокий", ex_no: "Ten stół jest niski.", ex_uk: "Цей стіл низький.", en: "low / short", en_ex: "This table is low.", ru: "низкий", ru_ex: "Этот стол низкий." },
        { t: "Прикметники", no: "długi", uk: "довгий", ex_no: "To jest długa ulica.", ex_uk: "Це довга вулиця.", en: "long", en_ex: "This is a long street.", ru: "длинный", ru_ex: "Это длинная улица." },
        { t: "Прикметники", no: "krótki", uk: "короткий", ex_no: "Film jest krótki.", ex_uk: "Фільм короткий.", en: "short", en_ex: "The movie is short.", ru: "короткий", ru_ex: "Фильм короткий." },
        { t: "Прикметники", no: "szybki", uk: "швидкий", ex_no: "Ten samochód jest szybki.", ex_uk: "Цей автомобіль швидкий.", en: "fast", en_ex: "This car is fast.", ru: "быстрый", ru_ex: "Эта машина быстрая." },
        { t: "Прикметники", no: "wolny", uk: "повільний / вільний", ex_no: "Autobus jest bardzo wolny.", ex_uk: "Автобус дуже повільний.", en: "slow / free", en_ex: "The bus is very slow.", ru: "медленный / свободный", ru_ex: "Автобус очень медленный." },
        { t: "Прикметники", no: "ciekawe", uk: "цікаве", ex_no: "To jest ciekawe pytanie.", ex_uk: "Це цікаве питання.", en: "interesting", en_ex: "This is an interesting question.", ru: "интересное", ru_ex: "Это интересный вопрос." },
        { t: "Прикметники", no: "ważny", uk: "важливий", ex_no: "To jest ważna informacja.", ex_uk: "Це важлива інформація.", en: "important", en_ex: "This is important information.", ru: "важный", ru_ex: "Это важная информация." },
    ],

        A2: [],
        B1: [],
        B2: [],
        C1: [],
        C2: [],
    };

    // =====================================================================
    //  LEVEL_TEST – вхідний тест на рівень (по 5 питань на кожен рівень A1–C2).
    //  Формат як у data.js: opts — відповіді ЦІЛЬОВОЮ мовою, q_en/q_ru — для
    //  інтерфейсу en/ru. Порядок варіантів перемішується в shuffleLevelTestQuestions().
    // =====================================================================
    const LEVEL_TEST = [
            { lvl: "A1", q: "«Дякую» польською", opts: ["Dziękuję", "Proszę", "Przepraszam"], a: 0, q_en: "\"thank you\" in Polish", q_ru: "«спасибо» по-польски" },
            { lvl: "A1", q: "«Добрий день» польською", opts: ["Dzień dobry", "Dobranoc", "Do widzenia"], a: 0, q_en: "\"good day / hello\" in Polish", q_ru: "«добрый день» по-польски" },
            { lvl: "A1", q: "«Вода» польською", opts: ["woda", "chleb", "mleko"], a: 0, q_en: "\"water\" in Polish", q_ru: "«вода» по-польски" },
            { lvl: "A1", q: "Ja ___ Anna.", opts: ["jestem", "jesteś", "jest"], a: 0 },
            { lvl: "A1", q: "On ___ kawę.", opts: ["pije", "piję", "pijesz"], a: 0 },
            { lvl: "A2", q: "Wczoraj mój brat ___ do kina.", opts: ["poszedł", "pójdzie", "idzie"], a: 0 },
            { lvl: "A2", q: "Mam dwa ___.", opts: ["koty", "kot", "kotów"], a: 0 },
            { lvl: "A2", q: "Idę do ___.", opts: ["sklepu", "sklep", "sklepem"], a: 0 },
            { lvl: "A2", q: "«Скільки це коштує?» польською", opts: ["Ile to kosztuje?", "Gdzie to jest?", "Która jest godzina?"], a: 0, q_en: "\"How much does it cost?\" in Polish", q_ru: "«Сколько это стоит?» по-польски" },
            { lvl: "A2", q: "Lubię ___ muzyki.", opts: ["słuchać", "słucham", "słuchasz"], a: 0 },
            { lvl: "B1", q: "Gdybym miał więcej czasu, ___ częściej.", opts: ["ćwiczyłbym", "ćwiczę", "ćwiczyłem"], a: 0 },
            { lvl: "B1", q: "Ten list ___ wczoraj napisany.", opts: ["został", "została", "zostało"], a: 0 },
            { lvl: "B1", q: "Czekam ___ autobus.", opts: ["na", "za", "do"], a: 0 },
            { lvl: "B1", q: "Mężczyzna, ___ mieszka obok, jest lekarzem.", opts: ["który", "która", "które"], a: 0 },
            { lvl: "B1", q: "Powiedział, że ___ jutro.", opts: ["przyjdzie", "przyjść", "przyjdź"], a: 0 },
            { lvl: "B2", q: "Mimo ___ pojechaliśmy na spacer.", opts: ["deszczu", "deszcz", "deszczem"], a: 0 },
            { lvl: "B2", q: "Chciałbym, żeby ona ___ więcej.", opts: ["mówiła", "mówi", "mówić"], a: 0 },
            { lvl: "B2", q: "Cieszę się ___ twojego sukcesu.", opts: ["z", "na", "do"], a: 0 },
            { lvl: "B2", q: "Zależy mi ___ czasie.", opts: ["na", "w", "o"], a: 0 },
            { lvl: "B2", q: "Gdyby nie ty, nie ___ tego.", opts: ["zrobiłbym", "zrobię", "zrobiłem"], a: 0 },
            { lvl: "C1", q: "Gdybyś ___ wcześniej, uniknąłbyś kłopotów.", opts: ["wiedział", "wiesz", "wiedz"], a: 0 },
            { lvl: "C1", q: "Wyniki są ___ z oczekiwaniami.", opts: ["zgodne", "zgodnie", "zgoda"], a: 0 },
            { lvl: "C1", q: "Rząd zamierza ___ nowe przepisy.", opts: ["wprowadzić", "wprowadzenie", "wprowadza"], a: 0 },
            { lvl: "C1", q: "Chodzi o to, ___ wszyscy mieli równe szanse.", opts: ["żeby", "że", "gdyby"], a: 0 },
            { lvl: "C1", q: "«Мати голову на плечах (бути розсудливим)» польською", opts: ["Mieć głowę na karku", "Mieć muchy w nosie", "Mieć dwie lewe ręce"], a: 0, q_en: "\"to have your head screwed on\" in Polish", q_ru: "«иметь голову на плечах (быть рассудительным)» по-польски" },
            { lvl: "C2", q: "«Бути на сьомому небі» польською", opts: ["Być w siódmym niebie", "Mieć głowę w chmurach", "Spaść z nieba"], a: 0, q_en: "\"to be on cloud nine\" in Polish", q_ru: "«быть на седьмом небе» по-польски" },
            { lvl: "C2", q: "Nie mój cyrk, nie moje ___.", opts: ["małpy", "koty", "konie"], a: 0 },
            { lvl: "C2", q: "Ani be, ani ___.", opts: ["me", "mu", "kwa"], a: 0 },
            { lvl: "C2", q: "Koń by się ___.", opts: ["uśmiał", "zdziwił", "zmęczył"], a: 0 },
            { lvl: "C2", q: "Gdzie dwóch się bije, tam ___ korzysta.", opts: ["trzeci", "czwarty", "pierwszy"], a: 0 },
    ];

    window.LANG_DATA = window.LANG_DATA || {};
    window.LANG_DATA.pl = {
        VOCAB,
        GRAMMAR: [],
        LEVEL_TEST,
        ALPHABET: [],
        LESSONS: [],
    };
})();
