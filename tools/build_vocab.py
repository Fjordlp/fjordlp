#!/usr/bin/env python3
"""
Builds js/data-<lang>.js from a shared concept list, so every new language
only needs (word, example sentence) per concept; the uk/en/ru translations
are written once. Usage:  python tools/build_vocab.py [lang ...]
To grow a language: add concepts to CONCEPTS (with uk/en/ru) and one
(word, example) per language in LANGS. Then re-run and re-run generate_audio.py.
"""
import json, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent

# level, topic_uk, uk, en, ru, ex_uk, ex_en, ex_ru
CONCEPTS = [
 ("A1","Привітання","привіт","hello","привет","Привіт, як справи?","Hello, how are you?","Привет, как дела?"),
 ("A1","Привітання","дякую","thank you","спасибо","Дякую за допомогу.","Thank you for your help.","Спасибо за помощь."),
 ("A1","Привітання","будь ласка","please","пожалуйста","Допоможи мені, будь ласка.","Help me, please.","Помоги мне, пожалуйста."),
 ("A1","Привітання","так","yes","да","Так, це правда.","Yes, that is true.","Да, это правда."),
 ("A1","Привітання","ні","no","нет","Ні, я не знаю.","No, I don't know.","Нет, я не знаю."),
 ("A1","Привітання","до побачення","goodbye","до свидания","До побачення, до завтра.","Goodbye, see you tomorrow.","До свидания, до завтра."),
 ("A1","Родина та люди","мама","mother","мама","Моя мама вдома.","My mother is at home.","Моя мама дома."),
 ("A1","Родина та люди","тато","father","папа","Мій тато працює.","My father is working.","Мой папа работает."),
 ("A1","Родина та люди","друг","friend","друг","Він мій друг.","He is my friend.","Он мой друг."),
 ("A1","Родина та люди","ім'я","name","имя","Моє ім'я Анна.","My name is Anna.","Меня зовут Анна."),
 ("A1","Їжа та напої","вода","water","вода","Я п'ю воду.","I drink water.","Я пью воду."),
 ("A1","Їжа та напої","хліб","bread","хлеб","Я їм хліб.","I eat bread.","Я ем хлеб."),
 ("A1","Їжа та напої","молоко","milk","молоко","Дитина п'є молоко.","The child drinks milk.","Ребёнок пьёт молоко."),
 ("A1","Їжа та напої","кава","coffee","кофе","Я люблю каву.","I like coffee.","Я люблю кофе."),
 ("A1","Їжа та напої","яблуко","apple","яблоко","Це червоне яблуко.","This is a red apple.","Это красное яблоко."),
 ("A1","Дім і речі","будинок","house","дом","Наш будинок великий.","Our house is big.","Наш дом большой."),
 ("A1","Дім і речі","двері","door","дверь","Відчини двері, будь ласка.","Open the door, please.","Открой дверь, пожалуйста."),
 ("A1","Дім і речі","стіл","table","стол","Книга лежить на столі.","The book is on the table.","Книга лежит на столе."),
 ("A1","Дім і речі","книга","book","книга","Я читаю книгу.","I am reading a book.","Я читаю книгу."),
 ("A1","Дім і речі","машина","car","машина","Машина стоїть надворі.","The car is outside.","Машина стоит на улице."),
 ("A1","Місця","місто","city","город","Це велике місто.","This is a big city.","Это большой город."),
 ("A1","Місця","школа","school","школа","Діти йдуть до школи.","The children go to school.","Дети идут в школу."),
 ("A1","Числа","один","one","один","У мене один кіт.","I have one cat.","У меня один кот."),
 ("A1","Числа","два","two","два","У мене два брати.","I have two brothers.","У меня два брата."),
 ("A1","Числа","три","three","три","Тут три стільці.","There are three chairs here.","Здесь три стула."),
 ("A1","Дієслова","їсти","to eat","есть","Ми їмо вдома.","We eat at home.","Мы едим дома."),
 ("A1","Дієслова","пити","to drink","пить","Вони п'ють чай.","They drink tea.","Они пьют чай."),
 ("A1","Дієслова","йти","to go","идти","Я йду до парку.","I am going to the park.","Я иду в парк."),
 ("A1","Дієслова","читати","to read","читать","Він читає газету.","He reads a newspaper.","Он читает газету."),
 ("A1","Дієслова","любити","to love","любить","Я люблю свою сім'ю.","I love my family.","Я люблю свою семью."),
 ("A1","Прикметники","хороший","good","хороший","Це хороша ідея.","This is a good idea.","Это хорошая идея."),
 ("A1","Прикметники","великий","big","большой","У нього великий пес.","He has a big dog.","У него большая собака."),
 ("A1","Прикметники","маленький","small","маленький","Це маленька кімната.","This is a small room.","Это маленькая комната."),
 ("A1","Прикметники","новий","new","новый","У мене новий телефон.","I have a new phone.","У меня новый телефон."),
 ("A1","Час","сьогодні","today","сегодня","Сьогодні тепло.","It is warm today.","Сегодня тепло."),
 ("A1","Час","завтра","tomorrow","завтра","Завтра я працюю.","I am working tomorrow.","Завтра я работаю."),
 ("A1","Час","день","day","день","Це гарний день.","It is a nice day.","Это хороший день."),
 ("A1","Час","ніч","night","ночь","Уночі темно.","It is dark at night.","Ночью темно."),
 ("A1","Тварини","кіт","cat","кот","Кіт спить на дивані.","The cat is sleeping on the sofa.","Кот спит на диване."),
 ("A1","Тварини","собака","dog","собака","Собака грає надворі.","The dog is playing outside.","Собака играет на улице."),
]

# One (word, example) per concept, same order as CONCEPTS. "ru" is derived.
LANGS = {
 "ru": None,
 "tr": [("merhaba","Merhaba, nasılsın?"),("teşekkürler","Yardımın için teşekkürler."),("lütfen","Lütfen bana yardım et."),("evet","Evet, bu doğru."),("hayır","Hayır, bilmiyorum."),("hoşça kal","Hoşça kal, yarın görüşürüz."),
  ("anne","Annem evde."),("baba","Babam çalışıyor."),("arkadaş","O benim arkadaşım."),("isim","Benim adım Anna."),
  ("su","Su içiyorum."),("ekmek","Ekmek yiyorum."),("süt","Çocuk süt içiyor."),("kahve","Kahveyi severim."),("elma","Bu kırmızı bir elma."),
  ("ev","Evimiz büyük."),("kapı","Lütfen kapıyı aç."),("masa","Kitap masanın üstünde."),("kitap","Kitap okuyorum."),("araba","Araba dışarıda."),
  ("şehir","Bu büyük bir şehir."),("okul","Çocuklar okula gidiyor."),
  ("bir","Bir kedim var."),("iki","İki erkek kardeşim var."),("üç","Burada üç sandalye var."),
  ("yemek","Evde yemek yiyoruz."),("içmek","Onlar çay içiyor."),("gitmek","Parka gidiyorum."),("okumak","O gazete okuyor."),("sevmek","Ailemi seviyorum."),
  ("iyi","Bu iyi bir fikir."),("büyük","Onun büyük bir köpeği var."),("küçük","Bu küçük bir oda."),("yeni","Yeni bir telefonum var."),
  ("bugün","Bugün hava sıcak."),("yarın","Yarın çalışıyorum."),("gün","Bu güzel bir gün."),("gece","Gece karanlık."),
  ("kedi","Kedi koltukta uyuyor."),("köpek","Köpek dışarıda oynuyor.")],
 "da": [("hej","Hej, hvordan har du det?"),("tak","Tak for hjælpen."),("vær så venlig","Hjælp mig, vær så venlig."),("ja","Ja, det er rigtigt."),("nej","Nej, jeg ved det ikke."),("farvel","Farvel, vi ses i morgen."),
  ("mor","Min mor er hjemme."),("far","Min far arbejder."),("ven","Han er min ven."),("navn","Mit navn er Anna."),
  ("vand","Jeg drikker vand."),("brød","Jeg spiser brød."),("mælk","Barnet drikker mælk."),("kaffe","Jeg kan lide kaffe."),("æble","Det er et rødt æble."),
  ("hus","Vores hus er stort."),("dør","Åbn døren, tak."),("bord","Bogen ligger på bordet."),("bog","Jeg læser en bog."),("bil","Bilen står udenfor."),
  ("by","Det er en stor by."),("skole","Børnene går i skole."),
  ("en","Jeg har én kat."),("to","Jeg har to brødre."),("tre","Der er tre stole her."),
  ("at spise","Vi spiser hjemme."),("at drikke","De drikker te."),("at gå","Jeg går i parken."),("at læse","Han læser avisen."),("at elske","Jeg elsker min familie."),
  ("god","Det er en god idé."),("stor","Han har en stor hund."),("lille","Det er et lille værelse."),("ny","Jeg har en ny telefon."),
  ("i dag","I dag er det varmt."),("i morgen","I morgen arbejder jeg."),("dag","Det er en god dag."),("nat","Om natten er det mørkt."),
  ("kat","Katten sover i sofaen."),("hund","Hunden leger udenfor.")],
 "fi": [("hei","Hei, mitä kuuluu?"),("kiitos","Kiitos avusta."),("ole hyvä","Auta minua, ole hyvä."),("kyllä","Kyllä, se on totta."),("ei","Ei, en tiedä."),("näkemiin","Näkemiin, nähdään huomenna."),
  ("äiti","Äitini on kotona."),("isä","Isäni on töissä."),("ystävä","Hän on ystäväni."),("nimi","Nimeni on Anna."),
  ("vesi","Juon vettä."),("leipä","Syön leipää."),("maito","Lapsi juo maitoa."),("kahvi","Pidän kahvista."),("omena","Tämä on punainen omena."),
  ("talo","Talomme on suuri."),("ovi","Avaa ovi, ole hyvä."),("pöytä","Kirja on pöydällä."),("kirja","Luen kirjaa."),("auto","Auto on ulkona."),
  ("kaupunki","Tämä on iso kaupunki."),("koulu","Lapset menevät kouluun."),
  ("yksi","Minulla on yksi kissa."),("kaksi","Minulla on kaksi veljeä."),("kolme","Täällä on kolme tuolia."),
  ("syödä","Syömme kotona."),("juoda","He juovat teetä."),("mennä","Menen puistoon."),("lukea","Hän lukee sanomalehteä."),("rakastaa","Rakastan perhettäni."),
  ("hyvä","Se on hyvä idea."),("suuri","Hänellä on suuri koira."),("pieni","Tämä on pieni huone."),("uusi","Minulla on uusi puhelin."),
  ("tänään","Tänään on lämmintä."),("huomenna","Huomenna olen töissä."),("päivä","Tämä on kaunis päivä."),("yö","Yöllä on pimeää."),
  ("kissa","Kissa nukkuu sohvalla."),("koira","Koira leikkii ulkona.")],
}

LEVELS = ["A1","A2","B1","B2","C1","C2"]

def build(lang):
    rows = LANGS[lang]
    if rows is None and lang == "ru":
        rows = [(c[4], c[7]) for c in CONCEPTS]
    assert len(rows) == len(CONCEPTS), f"{lang}: {len(rows)} rows vs {len(CONCEPTS)} concepts"
    vocab = {l: [] for l in LEVELS}
    for c, (w, ex) in zip(CONCEPTS, rows):
        lvl, topic, uk, en, ru, exuk, exen, exru = c
        vocab[lvl].append({"t": topic, "no": w, "uk": uk, "en": en, "ru": ru,
                           "ex_no": ex, "ex_uk": exuk, "en_ex": exen, "ru_ex": exru})
    out = ["// AUTO-GENERATED by tools/build_vocab.py — edit the source there, not here.",
           f"// js/data-{lang}.js — vocabulary only (grammar/tests fall back to AI generation).",
           "(function () {", "    const VOCAB = {"]
    for l in LEVELS:
        out.append(f"        {l}: [")
        out += ["            " + json.dumps(w, ensure_ascii=False) + "," for w in vocab[l]]
        out.append("        ],")
    empty_tasks = "{ reading: [], listening: [], writing: [], speaking: [] }"
    out += ["    };", "    const GRAMMAR = [];",
            "    const NORSKPROVE_TASKS = { " + ", ".join(f"{l}: {empty_tasks}" for l in LEVELS) + " };",
            "    const LEVEL_TEST = [];", "    const ALPHABET = [];", "    const LESSONS = [];",
            "    window.LANG_DATA = window.LANG_DATA || {};",
            f"    window.LANG_DATA.{lang} = {{ VOCAB, GRAMMAR, NORSKPROVE_TASKS, LEVEL_TEST, ALPHABET, LESSONS }};",
            "})();", ""]
    (ROOT / "js" / f"data-{lang}.js").write_text("\n".join(out), encoding="utf-8")
    print(f"wrote js/data-{lang}.js ({len(CONCEPTS)} words)")

for lang in (sys.argv[1:] or LANGS):
    build(lang)
