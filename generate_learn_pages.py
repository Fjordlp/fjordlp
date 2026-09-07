#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Генерує статичні SEO-лендинги /learn/<slug>/index.html для кожної мови,
для якої в застосунку реально є контент (window.LANG_DATA), КРІМ
норвезької — для неї вже є повноцінна головна сторінка (index.html),
заточена під українців у Норвегії, і дублювати її сенсу нема.

Навіщо окремі сторінки, а не просто клієнтський роут:
  Застосунок — SPA без справжньої URL-маршрутизації (ROUTE — просто
  змінна в пам'яті, а не частина адреси), тож пошуковики бачать той
  самий index.html незалежно від того, яку "сторінку" показує JS.
  Кожен /learn/<slug>/index.html — це окремий, по-справжньому інший
  HTML-файл із власними <title>/description/H1 для конкретної мови,
  який спокійно індексується без виконання JS. Кнопка на ньому веде
  на головний застосунок з ?lang=<код>&ui=en, який на вході одразу
  застосує мову навчання (js/state.js: ensureStateDefaults) і
  пропустить екран вибору мови.

Мова копірайту на кожній сторінці = мова, яку там вивчають (сторінка
/learn/german/ написана німецькою, /learn/japanese/ — японською тощо),
а не завжди англійською — це і є "локалізація під аудиторію кожної
мови". Виняток — рядок копірайту в підвалі (юридичний текст), який
свідомо лишається англійською на всіх мовних сторінках, так само як і
на головній (українській) index.html.
"""
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
LEARN_DIR = os.path.join(ROOT, "learn")

# code, slug, flag — технічні поля (URL, параметр ?lang=, іконка).
# Решта полів — це вже готовий, повністю перекладений текст сторінки
# мовою, яку вивчають (а не шаблон, що просто підставляє назву мови в
# англійське речення — граматика різна в кожній мові, підстановка
# такого штибу так чи інакше звучала б неприродно).
LANGS = [
    {
        "code": "en", "slug": "english", "flag": "🇬🇧", "html_lang": "en",
        "seo_title": "Learn English Online for Free — AI Tutor & Games | Fjord",
        "meta_description": "Learn English for free with Fjord: an AI troll tutor, gamified flashcards, adaptive stories and real practice from A1 to C2. No credit card, no ads.",
        "og_description": "An AI troll tutor, gamified flashcards, adaptive stories and real practice from A1 to C2 — free, no credit card.",
        "jsonld_name": "Learn English with Fjord",
        "jsonld_description": "Gamified English learning platform with an AI tutor, flashcards, adaptive stories and CEFR A1-C2 progression.",
        "h1": "Learn English 🇬🇧<br>the way that actually sticks",
        "subtitle": "An AI troll mentor, gamified progress and real practice —<br class=\"hero-br\">so you enjoy learning English, not grind through it.",
        "cta_primary": "Start learning English free →",
        "cta_secondary": "I already have an account",
        "microcopy": "No credit card. No forced sign-up — just open it and start learning.",
        "feat1_title": "An AI troll by your side",
        "feat1_desc": "Explains grammar, checks your sentences, gives examples — just message it like a friend.",
        "feat2_title": "XP, levels, gear",
        "feat2_desc": "Every word you learn levels up your troll — unlocking new hats, glasses and backgrounds.",
        "feat3_title": "Real practice, not rote drills",
        "feat3_desc": "Flashcards, tests, a sentence builder and books with click-to-translate reading.",
        "feat4_title": "Structured CEFR A1 → C2",
        "feat4_desc": "Lessons unlock in order, from complete beginner to advanced English.",
        "footer_nav": "Looking to learn a different language? →",
    },
    {
        "code": "de", "slug": "german", "flag": "🇩🇪", "html_lang": "de",
        "seo_title": "Kostenlos Deutsch lernen online — KI-Tutor & Spiele | Fjord",
        "meta_description": "Lerne Deutsch kostenlos mit Fjord: ein KI-Troll-Tutor, spielerische Karteikarten, adaptive Geschichten und echtes Üben von A1 bis C2. Keine Kreditkarte, keine Werbung.",
        "og_description": "Ein KI-Troll-Tutor, spielerische Karteikarten, adaptive Geschichten und echtes Üben von A1 bis C2 — kostenlos, ohne Kreditkarte.",
        "jsonld_name": "Deutsch lernen mit Fjord",
        "jsonld_description": "Spielerische Deutsch-Lernplattform mit KI-Tutor, Karteikarten, adaptiven Geschichten und GER-Progression A1–C2.",
        "h1": "Deutsch lernen 🇩🇪<br>und es bleibt wirklich hängen",
        "subtitle": "Ein KI-Troll als Mentor, spielerischer Fortschritt und echtes Üben —<br class=\"hero-br\">damit dir Deutschlernen Spaß macht, statt sich wie Pauken anzufühlen.",
        "cta_primary": "Kostenlos Deutsch lernen →",
        "cta_secondary": "Ich habe schon ein Konto",
        "microcopy": "Keine Kreditkarte. Keine Pflichtregistrierung — einfach loslegen.",
        "feat1_title": "Ein KI-Troll an deiner Seite",
        "feat1_desc": "Erklärt Grammatik, prüft deine Sätze, liefert Beispiele — schreib ihm einfach wie einem Freund.",
        "feat2_title": "XP, Level, Ausrüstung",
        "feat2_desc": "Jedes gelernte Wort bringt deinen Troll ein Level weiter — neue Hüte, Brillen und Hintergründe warten.",
        "feat3_title": "Echtes Üben statt stures Pauken",
        "feat3_desc": "Karteikarten, Tests, ein Satzbaukasten und Bücher mit Klick-Übersetzung beim Lesen.",
        "feat4_title": "Strukturiert von A1 bis C2",
        "feat4_desc": "Lektionen schalten sich der Reihe nach frei — vom kompletten Anfänger bis zum fortgeschrittenen Deutsch.",
        "footer_nav": "Willst du eine andere Sprache lernen? →",
    },
    {
        "code": "es", "slug": "spanish", "flag": "🇪🇸", "html_lang": "es",
        "seo_title": "Aprende español gratis online — Tutor con IA y juegos | Fjord",
        "meta_description": "Aprende español gratis con Fjord: un troll tutor con IA, tarjetas gamificadas, historias adaptativas y práctica real de A1 a C2. Sin tarjeta, sin anuncios.",
        "og_description": "Un troll tutor con IA, tarjetas gamificadas, historias adaptativas y práctica real de A1 a C2 — gratis, sin tarjeta.",
        "jsonld_name": "Aprende español con Fjord",
        "jsonld_description": "Plataforma gamificada para aprender español con tutor de IA, tarjetas, historias adaptativas y progresión MCER A1-C2.",
        "h1": "Aprende español 🇪🇸<br>de una forma que sí se te queda",
        "subtitle": "Un troll mentor con IA, progreso gamificado y práctica real —<br class=\"hero-br\">para que disfrutes aprendiendo español, sin sentir que es una obligación.",
        "cta_primary": "Empieza a aprender español gratis →",
        "cta_secondary": "Ya tengo una cuenta",
        "microcopy": "Sin tarjeta de crédito. Sin registro obligatorio — solo entra y empieza a aprender.",
        "feat1_title": "Un troll con IA a tu lado",
        "feat1_desc": "Explica gramática, revisa tus frases, te da ejemplos — solo escríbele como a un amigo.",
        "feat2_title": "XP, niveles, accesorios",
        "feat2_desc": "Cada palabra que aprendes sube de nivel a tu troll, desbloqueando nuevos sombreros, gafas y fondos.",
        "feat3_title": "Práctica real, no repetición mecánica",
        "feat3_desc": "Tarjetas de memoria, tests, un constructor de frases y libros con traducción al hacer clic.",
        "feat4_title": "Estructura MCER de A1 a C2",
        "feat4_desc": "Las lecciones se desbloquean en orden, desde cero hasta un español avanzado.",
        "footer_nav": "¿Quieres aprender otro idioma? →",
    },
    {
        "code": "fr", "slug": "french", "flag": "🇫🇷", "html_lang": "fr",
        "seo_title": "Apprendre le français gratuitement en ligne — Tuteur IA & jeux | Fjord",
        "meta_description": "Apprends le français gratuitement avec Fjord : un troll tuteur IA, des flashcards ludiques, des histoires adaptatives et de la vraie pratique du A1 au C2. Sans carte bancaire, sans pub.",
        "og_description": "Un troll tuteur IA, des flashcards ludiques, des histoires adaptatives et de la vraie pratique du A1 au C2 — gratuit, sans carte bancaire.",
        "jsonld_name": "Apprendre le français avec Fjord",
        "jsonld_description": "Plateforme ludique pour apprendre le français avec tuteur IA, flashcards, histoires adaptatives et progression CECRL A1-C2.",
        "h1": "Apprends le français 🇫🇷<br>d'une façon qui reste vraiment en tête",
        "subtitle": "Un troll mentor propulsé par l'IA, une progression ludique et de la vraie pratique —<br class=\"hero-br\">pour que tu prennes plaisir à apprendre le français, sans que ce soit une corvée.",
        "cta_primary": "Commencer le français gratuitement →",
        "cta_secondary": "J'ai déjà un compte",
        "microcopy": "Sans carte bancaire. Sans inscription forcée — ouvre l'appli et apprends.",
        "feat1_title": "Un troll IA à tes côtés",
        "feat1_desc": "Il explique la grammaire, corrige tes phrases, donne des exemples — écris-lui comme à un ami.",
        "feat2_title": "XP, niveaux, accessoires",
        "feat2_desc": "Chaque mot appris fait grimper ton troll de niveau — de nouveaux chapeaux, lunettes et fonds à débloquer.",
        "feat3_title": "De la vraie pratique, pas du bachotage",
        "feat3_desc": "Flashcards, tests, un générateur de phrases et des livres à traduction en un clic.",
        "feat4_title": "Progression structurée du A1 au C2",
        "feat4_desc": "Les leçons se débloquent dans l'ordre, du débutant complet jusqu'à un français avancé.",
        "footer_nav": "Tu veux apprendre une autre langue ? →",
    },
    {
        "code": "it", "slug": "italian", "flag": "🇮🇹", "html_lang": "it",
        "seo_title": "Impara l'italiano gratis online — Tutor IA e giochi | Fjord",
        "meta_description": "Impara l'italiano gratis con Fjord: un troll tutor IA, flashcard gamificate, storie adattive e pratica vera dall'A1 al C2. Niente carta di credito, niente pubblicità.",
        "og_description": "Un troll tutor IA, flashcard gamificate, storie adattive e pratica vera dall'A1 al C2 — gratis, senza carta di credito.",
        "jsonld_name": "Impara l'italiano con Fjord",
        "jsonld_description": "Piattaforma gamificata per imparare l'italiano con tutor IA, flashcard, storie adattive e progressione CEFR A1-C2.",
        "h1": "Impara l'italiano 🇮🇹<br>in un modo che resta davvero in testa",
        "subtitle": "Un troll mentore con IA, progressi gamificati e pratica vera —<br class=\"hero-br\">per divertirti imparando l'italiano, senza che sia uno sforzo.",
        "cta_primary": "Inizia a imparare l'italiano gratis →",
        "cta_secondary": "Ho già un account",
        "microcopy": "Nessuna carta di credito. Nessuna registrazione obbligatoria — apri e inizia a studiare.",
        "feat1_title": "Un troll IA al tuo fianco",
        "feat1_desc": "Spiega la grammatica, controlla le tue frasi, ti dà esempi — scrivigli come a un amico.",
        "feat2_title": "XP, livelli, accessori",
        "feat2_desc": "Ogni parola imparata fa salire di livello il tuo troll, sbloccando cappelli, occhiali e sfondi nuovi.",
        "feat3_title": "Pratica vera, non esercizi meccanici",
        "feat3_desc": "Flashcard, test, un costruttore di frasi e libri con traduzione al click.",
        "feat4_title": "Percorso strutturato dall'A1 al C2",
        "feat4_desc": "Le lezioni si sbloccano in ordine, da principiante assoluto a un italiano avanzato.",
        "footer_nav": "Vuoi imparare un'altra lingua? →",
    },
    {
        "code": "ja", "slug": "japanese", "flag": "🇯🇵", "html_lang": "ja",
        "seo_title": "無料で日本語を学ぶ — AIチューター＆ゲーム | Fjord",
        "meta_description": "Fjordで無料で日本語を学ぼう：AIトロールチューター、ゲーム感覚のフラッシュカード、適応型ストーリー、A1からC2までの実践的な練習。クレジットカード不要、広告なし。",
        "og_description": "AIトロールチューター、ゲーム感覚のフラッシュカード、適応型ストーリー、A1からC2までの実践的な練習——無料、クレジットカード不要。",
        "jsonld_name": "Fjordで日本語を学ぶ",
        "jsonld_description": "AIチューター、フラッシュカード、適応型ストーリー、CEFR A1-C2の進行を備えたゲーム感覚の日本語学習プラットフォーム。",
        "h1": "日本語を、ちゃんと身につく方法で 🇯🇵<br>学ぼう",
        "subtitle": "AIトロールのメンター、ゲーム感覚の進捗、そして実践的な練習で——<br class=\"hero-br\">日本語学習を苦行ではなく楽しい時間に。",
        "cta_primary": "無料で日本語を学び始める →",
        "cta_secondary": "すでにアカウントを持っている",
        "microcopy": "クレジットカード不要。強制的な登録もなし——開いてすぐ学べます。",
        "feat1_title": "そばにいるAIトロール",
        "feat1_desc": "文法を説明し、文章をチェックし、例文をくれる——友達に話しかけるように使えます。",
        "feat2_title": "XP、レベル、装備",
        "feat2_desc": "単語を覚えるたびにトロールがレベルアップ——新しい帽子・メガネ・背景が解放されます。",
        "feat3_title": "単純な反復ではなく、実践的な練習",
        "feat3_desc": "フラッシュカード、テスト、文章組み立て、クリックで翻訳できる読書コンテンツ。",
        "feat4_title": "CEFR A1〜C2で体系的に",
        "feat4_desc": "レッスンは順番に解放——まったくの初心者から上級の日本語まで。",
        "footer_nav": "他の言語を学びたいですか？ →",
    },
    {
        "code": "nl", "slug": "dutch", "flag": "🇳🇱", "html_lang": "nl",
        "seo_title": "Gratis Nederlands leren online — AI-tutor & spelletjes | Fjord",
        "meta_description": "Leer gratis Nederlands met Fjord: een AI-trol als tutor, speelse flashcards, adaptieve verhalen en echte oefening van A1 tot C2. Geen creditcard, geen advertenties.",
        "og_description": "Een AI-trol als tutor, speelse flashcards, adaptieve verhalen en echte oefening van A1 tot C2 — gratis, zonder creditcard.",
        "jsonld_name": "Leer Nederlands met Fjord",
        "jsonld_description": "Speels Nederlands-leerplatform met AI-tutor, flashcards, adaptieve verhalen en CEFR A1-C2-opbouw.",
        "h1": "Leer Nederlands 🇳🇱<br>op een manier die echt blijft hangen",
        "subtitle": "Een AI-trol als mentor, speelse voortgang en echte oefening —<br class=\"hero-br\">zodat je Nederlands leren leuk vindt, in plaats van afzien.",
        "cta_primary": "Gratis Nederlands leren →",
        "cta_secondary": "Ik heb al een account",
        "microcopy": "Geen creditcard. Geen verplichte registratie — gewoon openen en beginnen.",
        "feat1_title": "Een AI-trol naast je",
        "feat1_desc": "Legt grammatica uit, checkt je zinnen, geeft voorbeelden — schrijf hem gewoon zoals aan een vriend.",
        "feat2_title": "XP, levels, uitrusting",
        "feat2_desc": "Elk woord dat je leert, laat je trol een level stijgen — nieuwe hoedjes, brillen en achtergronden wachten.",
        "feat3_title": "Echte oefening, geen blind stampen",
        "feat3_desc": "Flashcards, toetsen, een zinnenbouwer en boeken met vertalen-met-één-klik.",
        "feat4_title": "Gestructureerd van A1 naar C2",
        "feat4_desc": "Lessen ontgrendelen in volgorde, van complete beginner tot gevorderd Nederlands.",
        "footer_nav": "Wil je een andere taal leren? →",
    },
    {
        "code": "pl", "slug": "polish", "flag": "🇵🇱", "html_lang": "pl",
        "seo_title": "Naucz się polskiego za darmo online — Korepetytor AI i gry | Fjord",
        "meta_description": "Ucz się polskiego za darmo z Fjord: troll-korepetytor AI, zgrywalizowane fiszki, adaptacyjne historie i prawdziwa praktyka od A1 do C2. Bez karty kredytowej, bez reklam.",
        "og_description": "Troll-korepetytor AI, zgrywalizowane fiszki, adaptacyjne historie i prawdziwa praktyka od A1 do C2 — za darmo, bez karty kredytowej.",
        "jsonld_name": "Ucz się polskiego z Fjord",
        "jsonld_description": "Zgrywalizowana platforma do nauki polskiego z korepetytorem AI, fiszkami, adaptacyjnymi historiami i progresją CEFR A1-C2.",
        "h1": "Ucz się polskiego 🇵🇱<br>w sposób, który naprawdę zostaje w głowie",
        "subtitle": "Troll-mentor z AI, zgrywalizowane postępy i prawdziwa praktyka —<br class=\"hero-br\">żebyś cieszył się nauką polskiego, zamiast się męczyć.",
        "cta_primary": "Zacznij uczyć się polskiego za darmo →",
        "cta_secondary": "Mam już konto",
        "microcopy": "Bez karty kredytowej. Bez wymuszonej rejestracji — po prostu wejdź i ucz się.",
        "feat1_title": "Troll AI u twojego boku",
        "feat1_desc": "Tłumaczy gramatykę, sprawdza zdania, podaje przykłady — po prostu napisz do niego jak do znajomego.",
        "feat2_title": "XP, poziomy, ekwipunek",
        "feat2_desc": "Każde poznane słowo podnosi poziom twojego trolla — odblokowując nowe czapki, okulary i tła.",
        "feat3_title": "Prawdziwa praktyka, nie wkuwanie",
        "feat3_desc": "Fiszki, testy, budowniczy zdań i książki z tłumaczeniem jednym kliknięciem.",
        "feat4_title": "Uporządkowana ścieżka od A1 do C2",
        "feat4_desc": "Lekcje odblokowują się po kolei — od zupełnego początkującego po zaawansowany polski.",
        "footer_nav": "Chcesz uczyć się innego języka? →",
    },
    {
        "code": "pt", "slug": "portuguese", "flag": "🇵🇹", "html_lang": "pt",
        "seo_title": "Aprenda português grátis online — Tutor de IA e jogos | Fjord",
        "meta_description": "Aprenda português de graça com o Fjord: um troll tutor de IA, flashcards gamificados, histórias adaptativas e prática real de A1 a C2. Sem cartão de crédito, sem anúncios.",
        "og_description": "Um troll tutor de IA, flashcards gamificados, histórias adaptativas e prática real de A1 a C2 — grátis, sem cartão de crédito.",
        "jsonld_name": "Aprenda português com o Fjord",
        "jsonld_description": "Plataforma gamificada para aprender português com tutor de IA, flashcards, histórias adaptativas e progressão QECR A1-C2.",
        "h1": "Aprenda português 🇵🇹<br>de um jeito que realmente gruda",
        "subtitle": "Um troll mentor com IA, progresso gamificado e prática real —<br class=\"hero-br\">para você aproveitar aprender português, em vez de sofrer.",
        "cta_primary": "Comece a aprender português grátis →",
        "cta_secondary": "Já tenho uma conta",
        "microcopy": "Sem cartão de crédito. Sem cadastro obrigatório — é só abrir e aprender.",
        "feat1_title": "Um troll de IA ao seu lado",
        "feat1_desc": "Explica gramática, corrige suas frases, dá exemplos — é só escrever para ele como para um amigo.",
        "feat2_title": "XP, níveis, equipamentos",
        "feat2_desc": "Cada palavra aprendida sobe de nível o seu troll — desbloqueando novos chapéus, óculos e fundos.",
        "feat3_title": "Prática real, não decoreba",
        "feat3_desc": "Flashcards, testes, um montador de frases e livros com tradução ao clicar.",
        "feat4_title": "Estrutura do QECR de A1 a C2",
        "feat4_desc": "As lições são desbloqueadas em ordem, do iniciante total até um português avançado.",
        "footer_nav": "Quer aprender outro idioma? →",
    },
    {
        "code": "sv", "slug": "swedish", "flag": "🇸🇪", "html_lang": "sv",
        "seo_title": "Lär dig svenska gratis online — AI-lärare & spel | Fjord",
        "meta_description": "Lär dig svenska gratis med Fjord: en AI-trolllärare, gamifierade flashcards, adaptiva berättelser och riktig övning från A1 till C2. Inget kreditkort, inga annonser.",
        "og_description": "En AI-trolllärare, gamifierade flashcards, adaptiva berättelser och riktig övning från A1 till C2 — gratis, utan kreditkort.",
        "jsonld_name": "Lär dig svenska med Fjord",
        "jsonld_description": "Gamifierad plattform för att lära sig svenska med AI-lärare, flashcards, adaptiva berättelser och CEFR A1-C2-progression.",
        "h1": "Lär dig svenska 🇸🇪<br>på ett sätt som verkligen fastnar",
        "subtitle": "En AI-trollmentor, gamifierade framsteg och riktig övning —<br class=\"hero-br\">så att du tycker om att lära dig svenska, istället för att slita.",
        "cta_primary": "Börja lära dig svenska gratis →",
        "cta_secondary": "Jag har redan ett konto",
        "microcopy": "Inget kreditkort. Ingen tvingad registrering — bara öppna och börja lära dig.",
        "feat1_title": "Ett AI-troll vid din sida",
        "feat1_desc": "Förklarar grammatik, kollar dina meningar, ger exempel — skriv till det som till en vän.",
        "feat2_title": "XP, nivåer, prylar",
        "feat2_desc": "Varje ord du lär dig levlar upp ditt troll — nya hattar, glasögon och bakgrunder väntar.",
        "feat3_title": "Riktig övning, inte mekanisk pluggning",
        "feat3_desc": "Flashcards, prov, en meningsbyggare och böcker med klick-och-översätt-läsning.",
        "feat4_title": "Strukturerat från A1 till C2",
        "feat4_desc": "Lektioner låses upp i ordning, från absolut nybörjare till avancerad svenska.",
        "footer_nav": "Vill du lära dig ett annat språk? →",
    },
    {
        "code": "uk", "slug": "ukrainian", "flag": "🇺🇦", "html_lang": "uk",
        "seo_title": "Вивчай українську безкоштовно онлайн — AI-тьютор та ігри | Fjord",
        "meta_description": "Вивчай українську безкоштовно з Fjord: AI-тролль-тьютор, гейміфіковані картки, адаптивні історії й реальна практика від A1 до C2. Без картки, без реклами.",
        "og_description": "AI-тролль-тьютор, гейміфіковані картки, адаптивні історії й реальна практика від A1 до C2 — безкоштовно, без картки.",
        "jsonld_name": "Вивчай українську з Fjord",
        "jsonld_description": "Гейміфікована платформа для вивчення української з AI-тьютором, картками, адаптивними історіями та прогресією CEFR A1-C2.",
        "h1": "Вивчай українську 🇺🇦<br>так, щоб це справді запам'ятовувалось",
        "subtitle": "AI-тролль-наставник, гейміфікований прогрес і реальна практика —<br class=\"hero-br\">щоб вивчення української приносило задоволення, а не було через силу.",
        "cta_primary": "Почати вивчати українську безкоштовно →",
        "cta_secondary": "У мене вже є акаунт",
        "microcopy": "Без банківської картки. Без обов'язкової реєстрації — просто відкривай і вчись.",
        "feat1_title": "AI-тролль поруч",
        "feat1_desc": "Пояснює граматику, перевіряє твої речення, дає приклади — просто пиши йому, як другу.",
        "feat2_title": "XP, рівні, спорядження",
        "feat2_desc": "Кожне вивчене слово підвищує рівень тролля — відкриваючи нові капелюхи, окуляри й фони.",
        "feat3_title": "Реальна практика, а не механічна зубрячка",
        "feat3_desc": "Картки, тести, конструктор речень і книги з перекладом одним кліком.",
        "feat4_title": "Структуровано від A1 до C2",
        "feat4_desc": "Уроки відкриваються по порядку — від повного новачка до просунутого рівня української.",
        "footer_nav": "Хочеш вивчати іншу мову? →",
    },
]

TEMPLATE = """<!DOCTYPE html>
<html lang="{html_lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
    <meta name="author" content="Nazar Maksymenko">
    <meta name="copyright" content="© 2026 Nazar Maksymenko. All rights reserved.">
    <meta name="robots" content="index, follow">

    <!-- ============ PWA ============ -->
    <link rel="manifest" href="../../manifest.json">
    <meta name="theme-color" content="#0A1D2B">
    <link rel="apple-touch-icon" href="../../icons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="512x512" href="../../icons/icon-512.png">
    <link rel="icon" type="image/png" sizes="192x192" href="../../icons/icon-192.png">

    <!-- ============ SEO ============ -->
    <title>{seo_title}</title>
    <meta name="description" content="{meta_description}">
    <link rel="canonical" href="https://fjordlp.com/learn/{slug}/">

    <!-- ============ Open Graph ============ -->
    <meta property="og:title" content="{seo_title}">
    <meta property="og:description" content="{og_description}">
    <meta property="og:url" content="https://fjordlp.com/learn/{slug}/">
    <meta property="og:type" content="website">
    <meta property="og:image" content="https://fjordlp.com/og-image.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">

    <!-- ============ Twitter Card ============ -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{seo_title}">
    <meta name="twitter:description" content="{og_description}">
    <meta name="twitter:image" content="https://fjordlp.com/og-image.jpg">

    <!-- ============ Fonts ============ -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">

    <!-- ============ Styles ============ -->
    <link rel="stylesheet" href="../../css/style.css">

    <!-- ============ Structured data ============ -->
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "{jsonld_name}",
      "description": "{jsonld_description}",
      "provider": {{
        "@type": "Organization",
        "name": "Fjord",
        "sameAs": "https://fjordlp.com/"
      }},
      "offers": {{
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }}
    }}
    </script>
</head>
<body>
    <div class="auth-page" style="padding-bottom:60px;">
        <section class="hero-landing">
            <div class="hero-inner">
                <div class="hero-brand" style="justify-content:center;">
                    <span class="mark"><svg viewBox="0 0 30 30" width="34" height="34"><circle cx="15" cy="20" r="6" fill="#2FA89B"/><path d="M2 20 A13 13 0 0 1 28 20" stroke="#E8A33D" stroke-width="2" fill="none"/></svg></span>
                    Fjord
                </div>
                <h1 class="hero-title">{h1}</h1>
                <p class="hero-subtitle">{subtitle}</p>
                <div class="hero-cta-row">
                    <a class="btn btn-hero-primary" href="/?lang={code}&amp;ui=en">{cta_primary}</a>
                    <a class="btn btn-hero-ghost" href="/?lang={code}&amp;ui=en">{cta_secondary}</a>
                </div>
                <p class="hero-microcopy">{microcopy}</p>
            </div>

            <div class="hero-features">
                <div class="hero-feature-card">
                    <div class="hero-feature-icon">🧌</div>
                    <h3>{feat1_title}</h3>
                    <p>{feat1_desc}</p>
                </div>
                <div class="hero-feature-card">
                    <div class="hero-feature-icon">🎮</div>
                    <h3>{feat2_title}</h3>
                    <p>{feat2_desc}</p>
                </div>
                <div class="hero-feature-card">
                    <div class="hero-feature-icon">📚</div>
                    <h3>{feat3_title}</h3>
                    <p>{feat3_desc}</p>
                </div>
                <div class="hero-feature-card">
                    <div class="hero-feature-icon">🌍</div>
                    <h3>{feat4_title}</h3>
                    <p>{feat4_desc}</p>
                </div>
            </div>
        </section>

        <p style="margin-top:24px;font-size:.85rem;"><a href="/" style="color:var(--frost);opacity:.75;">{footer_nav}</a></p>

        <footer class="appfoot" style="width:100%;">© 2026 Fjord. Production by Nazar Maksymenko. All rights reserved.</footer>
    </div>
</body>
</html>
"""

def main():
    os.makedirs(LEARN_DIR, exist_ok=True)
    written = []
    for lang in LANGS:
        out_dir = os.path.join(LEARN_DIR, lang["slug"])
        os.makedirs(out_dir, exist_ok=True)
        out_path = os.path.join(out_dir, "index.html")
        html = TEMPLATE.format(**lang)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(html)
        written.append(f"learn/{lang['slug']}/index.html")
    print(f"Wrote {len(written)} pages:")
    for w in written:
        print(" -", w)

if __name__ == "__main__":
    main()
