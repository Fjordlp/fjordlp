const VOCAB_PL = {
    A1: [
        { t: "Привітання", pl: "cześć", uk: "привіт", ex_pl: "Cześć, jak się masz?", ex_uk: "Привіт, як ти?", en: "hi", en_ex: "Hi, how are you?", ru: "привет", ru_ex: "Привет, как ты?" },
        { t: "Привітання", pl: "dzień dobry", uk: "добрий день", ex_pl: "Dzień dobry, jak się masz?", ex_uk: "Добрий день, як ти?", en: "good morning", en_ex: "Good morning, how are you?", ru: "добрый день", ru_ex: "Добрый день, как ты?" },
        { t: "Привітання", pl: "dobry wieczór", uk: "добрий вечір", ex_pl: "Dobry wieczór, proszę usiąść.", ex_uk: "Добрий вечір, будь ласка, сідайте.", en: "good evening", en_ex: "Good evening, please sit down.", ru: "добрый вечер", ru_ex: "Добрый вечер, пожалуйста, садитесь." },
        { t: "Привітання", pl: "do widzenia", uk: "до побачення", ex_pl: "Do widzenia, zobaczymy się jutro.", ex_uk: "До побачення, побачимося завтра.", en: "goodbye", en_ex: "Goodbye, see you tomorrow.", ru: "до свидания", ru_ex: "До свидания, увидимся завтра." },
        { t: "Подяка", pl: "dziękuję", uk: "дякую", ex_pl: "Dziękuję za pomoc.", ex_uk: "Дякую за допомогу.", en: "thank you", en_ex: "Thank you for your help.", ru: "спасибо", ru_ex: "Спасибо за помощь." },
        { t: "Ввічливість", pl: "proszę", uk: "будь ласка", ex_pl: "Proszę, usiądź tutaj.", ex_uk: "Будь ласка, сядь тут.", en: "please", en_ex: "Please, sit here.", ru: "пожалуйста", ru_ex: "Пожалуйста, садись здесь." },
        { t: "Ввічливість", pl: "przepraszam", uk: "вибачте", ex_pl: "Przepraszam, gdzie jest dworzec?", ex_uk: "Вибачте, де вокзал?", en: "excuse me / sorry", en_ex: "Excuse me, where is the station?", ru: "извините", ru_ex: "Извините, где вокзал?" },

        { t: "Базові слова", pl: "tak", uk: "так", ex_pl: "Tak, oczywiście.", ex_uk: "Так, звичайно.", en: "yes", en_ex: "Yes, of course.", ru: "да", ru_ex: "Да, конечно." },
        { t: "Базові слова", pl: "nie", uk: "ні", ex_pl: "Nie, dziękuję.", ex_uk: "Ні, дякую.", en: "no", en_ex: "No, thank you.", ru: "нет", ru_ex: "Нет, спасибо." },
        { t: "Базові слова", pl: "dobrze", uk: "добре", ex_pl: "Dobrze, zaczynamy.", ex_uk: "Добре, починаємо.", en: "well / okay", en_ex: "Okay, let's start.", ru: "хорошо", ru_ex: "Хорошо, начинаем." },
        { t: "Базові слова", pl: "źle", uk: "погано", ex_pl: "Dzisiaj czuję się źle.", ex_uk: "Сьогодні я почуваюся погано.", en: "bad / badly", en_ex: "I feel bad today.", ru: "плохо", ru_ex: "Сегодня я плохо себя чувствую." },

        { t: "Знайомство", pl: "mam na imię", uk: "мене звати", ex_pl: "Mam na imię Anna.", ex_uk: "Мене звати Анна.", en: "my name is", en_ex: "My name is Anna.", ru: "меня зовут", ru_ex: "Меня зовут Анна." },
        { t: "Знайомство", pl: "jak masz na imię?", uk: "як тебе звати?", ex_pl: "Jak masz na imię?", ex_uk: "Як тебе звати?", en: "what is your name?", en_ex: "What is your name?", ru: "как тебя зовут?", ru_ex: "Как тебя зовут?" },

        { t: "Люди", pl: "kobieta", uk: "жінка", ex_pl: "Ta kobieta mieszka tutaj.", ex_uk: "Ця жінка живе тут.", en: "woman", en_ex: "This woman lives here.", ru: "женщина", ru_ex: "Эта женщина живёт здесь." },
        { t: "Люди", pl: "mężczyzna", uk: "чоловік", ex_pl: "Ten mężczyzna pracuje w Warszawie.", ex_uk: "Цей чоловік працює у Варшаві.", en: "man", en_ex: "This man works in Warsaw.", ru: "мужчина", ru_ex: "Этот мужчина работает в Варшаве." },
        { t: "Люди", pl: "dziecko", uk: "дитина", ex_pl: "To dziecko ma pięć lat.", ex_uk: "Цій дитині п'ять років.", en: "child", en_ex: "This child is five years old.", ru: "ребёнок", ru_ex: "Этому ребёнку пять лет." },

        { t: "Їжа", pl: "woda", uk: "вода", ex_pl: "Poproszę szklankę wody.", ex_uk: "Будь ласка, склянку води.", en: "water", en_ex: "A glass of water, please.", ru: "вода", ru_ex: "Стакан воды, пожалуйста." },
        { t: "Їжа", pl: "chleb", uk: "хліб", ex_pl: "Kupuję świeży chleb.", ex_uk: "Я купую свіжий хліб.", en: "bread", en_ex: "I am buying fresh bread.", ru: "хлеб", ru_ex: "Я покупаю свежий хлеб." },
        { t: "Їжа", pl: "kawa", uk: "кава", ex_pl: "Rano piję kawę.", ex_uk: "Вранці я п'ю каву.", en: "coffee", en_ex: "I drink coffee in the morning.", ru: "кофе", ru_ex: "Утром я пью кофе." },

        { t: "Дім", pl: "dom", uk: "будинок", ex_pl: "Mój dom jest mały.", ex_uk: "Мій будинок маленький.", en: "house", en_ex: "My house is small.", ru: "дом", ru_ex: "Мой дом маленький." },
        { t: "Дім", pl: "mieszkanie", uk: "квартира", ex_pl: "Mieszkam w małym mieszkaniu.", ex_uk: "Я живу в маленькій квартирі.", en: "apartment", en_ex: "I live in a small apartment.", ru: "квартира", ru_ex: "Я живу в маленькой квартире." },

        { t: "Дієслова", pl: "być", uk: "бути", ex_pl: "Chcę być w domu.", ex_uk: "Я хочу бути вдома.", en: "to be", en_ex: "I want to be at home.", ru: "быть", ru_ex: "Я хочу быть дома." },
        { t: "Дієслова", pl: "mieć", uk: "мати", ex_pl: "Mam nowy telefon.", ex_uk: "У мене є новий телефон.", en: "to have", en_ex: "I have a new phone.", ru: "иметь", ru_ex: "У меня новый телефон." },
        { t: "Дієслова", pl: "mówić", uk: "говорити", ex_pl: "Mówię po polsku.", ex_uk: "Я говорю польською.", en: "to speak", en_ex: "I speak Polish.", ru: "говорить", ru_ex: "Я говорю по-польски." },
        { t: "Дієслова", pl: "rozumieć", uk: "розуміти", ex_pl: "Nie rozumiem tego słowa.", ex_uk: "Я не розумію цього слова.", en: "to understand", en_ex: "I don't understand this word.", ru: "понимать", ru_ex: "Я не понимаю этого слова." }
    ]
};

