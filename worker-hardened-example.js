/**
 * Fjord Worker – AI-проксі (Gemini) + проксі для ord.uib.no
 * Оновлення: автоматичний вибір моделі + CORS для кількох доменів
 */

// ============================================================
//  НАЛАШТУВАННЯ
// ============================================================

const ALLOWED_ORIGINS = [
  "https://fjordlp.com",
  "https://fjordlp.pages.dev",
  "https://fjordnorge.netlify.app"  // залиште, якщо хочете, щоб старий сайт теж працював
];

// Системні промпти
// УВАГА: writing_check і gen_task навмисно лишаються прив'язаними до
// норвезької — Norskprøve це офіційний норвезький іспит, іншими мовами
// його не існує. А от chat і gen_vocab раніше теж були жорстко "зашиті"
// на норвезьку — через це AI-помічник і генератор слів завжди видавали
// норвезький контент, навіть коли людина в Налаштуваннях обирала іншу
// мову вивчення (STATE.targetLang). Тепер обидва читають мову з самого
// повідомлення користувача (клієнт завжди явно пише, яку мову вивчає,
// у тексті message) замість того, щоб мати її захардкоджено тут.
const SYSTEM_PROMPTS = {
  chat: "Ти — дружній тролль-помічник у застосунку Fjord для вивчення іноземних мов. Яку саме мову зараз вивчає користувач — дивись у його повідомленні (там явно вказано мову вивчення); якщо не вказано, вважай, що це норвезька. Відповідай українською (приклади мовою вивчення можна давати з перекладом). Допомагай пояснювати граматику, слова, перекладати короткі фрази, складати приклади речень і підказувати, як користуватись розділами застосунку. Пиши коротко, дружньо, по суті. Форматування: це чат, тому НЕ використовуй заголовки (#), нумеровані списки чи таблиці. Дозволено лише **жирний текст** і списки рядками з «- ».",
  writing_check: "Ти — досвідчений сенсор (екзаменатор), який перевіряє письмові роботи кандидатів на іспиті Norskprøve (HK-dir, рівні A1–B2). Тобі надсилають рівень, тему завдання і текст студента норвезькою. Відповідай українською, чат-форматом (без заголовків #, без нумерованих списків/таблиць, можна **жирний текст** і списки з «- »): спочатку 1 речення — чи текст відповідає рівню й темі; далі **Помилки та виправлення** (оригінал → виправлення); далі **Що покращити** — 2-4 конкретні поради; наприкінці коротке підбадьорення.",
  gen_task: "Ти генеруєш ОДНЕ нове тренувальне завдання для підготовки до Norskprøve (HK-dir, рівні A1-B2) за схемою, яку тобі дає користувач у повідомленні. Відповідай ЛИШЕ чистим JSON без жодного тексту навколо і без markdown-огорожі (```).",
  gen_vocab: "Ти генеруєш нові слова для словника вивчення іноземної мови за схемою, яку тобі дає користувач у повідомленні — саме там явно вказано, яку мову вивчає користувач і рівень CEFR; використовуй саме її (якщо не вказано — норвезьку). Відповідай ЛИШЕ чистим JSON-масивом без жодного тексту навколо і без markdown-огорожі (```).",
  // Три режими нижче раніше НЕ були в цьому списку — сервер (навмисно, з
  // міркувань безпеки: клієнтський body.system ІГНОРУЄТЬСЯ, використовується
  // лише цей серверний словник за назвою режиму) підставляв замість них
  // режим "chat" за замовчуванням. Через це сайт надсилав чіткий запит
  // "лише JSON", а у відповідь отримував звичайну дружню розмовну репліку
  // тролля (бо саме так каже поводитись chat-промпт) — параметр
  // JSON.parse на клієнті падав з "Unexpected non-whitespace character",
  // бо у відповіді був не JSON, а звичайний текст.
  gen_grammar: "Ти — досвідчений викладач іноземних мов, який готує стислі граматичні картки для рівня CEFR. Відповідай ЛИШЕ чистим JSON-масивом без жодного тексту навколо, без markdown-огорожі.",
  gen_book_tasks: "Ти — вчитель іноземної мови, який готує завдання на розуміння прочитаного (reading comprehension) за КОНКРЕТНИМ текстом, який тобі надають — не вигадуй сюжет від себе, спирайся лише на наданий уривок. Відповідай ЛИШЕ чистим JSON-масивом без жодного тексту навколо, без markdown-огорожі.",
  translate_word: "Ти — точний і стислий словниковий перекладач для читача, який вивчає мову. Відповідай ЛИШЕ чистим JSON-об'єктом без жодного тексту навколо, без markdown-огорожі.",
  story_chapter: "Ти — майстер інтерактивних історій \"вибери свій шлях\" для вивчення мов, який пише короткі розділи СПЕЦІАЛЬНО під словниковий запас конкретного читача (гіпотеза i+1: майже все зрозуміло, лише трохи нового). Точно дотримуйся вказаної мови тексту й рівня CEFR, використовуй переважно подані \"вже відомі\" слова, природно вплітай кілька нових. Відповідай ЛИШЕ чистим JSON-об'єктом без жодного тексту навколо, без markdown-огорожі.",
  gen_alphabet: "Ти — досвідчений викладач іноземної мови для україномовних початківців з нуля, який складає абетку із практичними, зрозумілими поясненнями вимови (не наукову фонетику). Відповідай ЛИШЕ чистим JSON-масивом без жодного тексту навколо, без markdown-огорожі.",
  gen_sentence_builder: "Ти — досвідчений викладач мови, який складає вправи на побудову речень із блоків для рівня CEFR. Відповідай ЛИШЕ чистим JSON-масивом без жодного тексту навколо, без markdown-огорожі.",
};

const MAX_MESSAGE_LEN = 4000;
const MAX_HISTORY_ITEMS = 12;
// Верхня межа розміру тіла запиту (12 реплік історії × 4000 символів + повідомлення ≈ 55 КБ).
const MAX_BODY_BYTES = 100000;

// ---- Автентифікація й ліміти ------------------------------------------------
// ВАЖЛИВО: перевірка Origin/CORS НЕ є захистом від зловмисника: це лише інструкція для браузера.
// curl/скрипт просто не шле Origin (або підробляє його) — і потрапляє до платного AI-ключа.
// Справжні межі довіри тут — (1) Firebase ID-токен (підтверджує, хто викликає) і (2) ліміти запитів
// по акаунту/IP. Клієнт (js/assistant.js) додає "Authorization: Bearer <ID-токен>", коли людина
// увійшла в акаунт. Гості (без токена) отримують суворіші ліміти.
//   env.AUTH_MODE = "required"  → без дійсного токена AI/TTS недоступні (рекомендовано, якщо гості не потрібні)
//   env.AUTH_MODE = "optional"  → (за замовчуванням) гості пускаються, але з гостьовими лімітами
//   env.FIREBASE_PROJECT_ID     → id проєкту Firebase (за замовчуванням нижче)
const FIREBASE_PROJECT_ID_DEFAULT = "fjord-f0e0b";
const LIMITS = {
  user:  { perMin: 30, perDay: 400 },  // увійшов у акаунт (ключ — Firebase uid)
  guest: { perMin: 8,  perDay: 60  },  // без токена (ключ — IP)
};
// Було 12/хв — це майже гарантовано впиралось у ліміт, якщо адмін генерував
// словник у кілька пакетів (5-8 запитів) для однієї мови, а тим паче для
// кількох мов підряд в одній сесії. Піднято до 30/хв; клієнт (generateBulkVocab)
// також тепер сам витримує паузу ~600мс між пакетами.

// Список моделей для fallback (перша робоча буде використана)
// Було: gemini-3.1-flash-lite, gemini-1.5-pro, gemini-1.5-flash,
// gemini-1.5-flash-8b, gemini-2.0-flash-exp. Уся лінія Gemini 1.5 і
// Gemini 2.0 Flash офіційно вимкнена Google (усі запити повертають 404),
// а gemini-3.1-flash-lite сама по собі актуальна, але, судячи з
// помилок, доступна не для кожного API-ключа (preview-доступ). Через це
// генерація слів для БУДЬ-ЯКОЇ мови (не лише англійської) падала: перебір
// доходив до кінця списку, і всі кандидати були мертві чи недоступні.
// Тепер першими йдуть стабільні GA-моделі (gemini-2.5-flash/-lite,
// доступні для будь-якого ключа з 2025 року), а 3.1-flash-lite лишається
// як бонусний останній варіант — якщо ключ до неї має доступ.
const MODEL_CANDIDATES = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-3.1-flash-lite",
];

// ============================================================
//  ПРОКСІ ДЛЯ ord.uib.no (словник)
// ============================================================

async function handleOrdApi(request, corsHeaders) {
  if (request.method !== 'GET') {
    return json({ error: 'Method not allowed' }, 405, corsHeaders);
  }
  const url = new URL(request.url);
  const path = url.pathname;

  let targetPath = '';
  if (path === '/ord-api/suggest' || path === '/ord-api') {
    targetPath = '/api/suggest';
  } else if (path === '/ord-api/articles') {
    targetPath = '/api/articles';
  } else if (path.startsWith('/ord-api/article/')) {
    // id статті — лише літери/цифри/крапка/дефіс: без "../" та інших шляхів на тому ж хості.
    const id = path.replace('/ord-api/article/', '');
    if (!/^[A-Za-z0-9._-]{1,40}$/.test(id) || id.includes('..')) return json({ error: 'Bad article id' }, 400, corsHeaders);
    targetPath = `/bm/article/${id}`;
  } else {
    return json({ error: 'Not found' }, 404, corsHeaders);
  }

  const params = url.searchParams;
  if (params.toString().length > 300) return json({ error: 'Query too long' }, 400, corsHeaders);
  const targetUrl = `https://ord.uib.no${targetPath}?${params.toString()}`;

  try {
    const resp = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; FjordBot/1.0)', 'Accept': 'application/json' },
    });
    // Раніше resp.json() не був обгорнутий у try: якщо ord.uib.no віддавав HTML-помилку — Worker падав з 500.
    const data = await resp.json();
    return json(data, resp.ok ? 200 : 502, corsHeaders);
  } catch (e) {
    console.warn('ord.uib.no недоступний:', e && e.message);
    return json({ error: 'Upstream dictionary unavailable' }, 502, corsHeaders);
  }
}

// ============================================================
//  TTS-ПРОКСІ (VoiceRSS)
// ============================================================
// Було: спершу Azure Cognitive Services Speech, потім Google Cloud
// Text-to-Speech — обидва технічно мають безкоштовний рівень, АЛЕ обидва
// вимагають прив'язати платіжну картку до акаунта вже на етапі
// реєстрації (навіть якщо реально нічого не спишеться, поки не
// перевищено безкоштовну квоту). Це саме та причина, чому обидва
// варіанти не підійшли.
//
// VoiceRSS (voicerss.org) — офіційно документований REST API, ключ
// видається одразу після реєстрації лише поштою, БЕЗ картки (перевірено
// за офіційною документацією: voicerss.org/api). Голоси не такі
// "живі", як нейронні WaveNet/Neural2 у Google/Azure, але помітно
// природніші за вбудований роботизований голос браузера — і головне,
// не вимагають платіжного акаунта взагалі.
//
// ОБМЕЖЕННЯ, про які варто знати:
//   - Покриває 28 із 30 мов застосунку. НЕМАЄ української (uk) та
//     ісландської (is) — для цих двох мов /tts-api поверне помилку, і
//     клієнт (troll.js) сам тихо відкотиться на вбудований голос
//     браузера, як і для будь-якої іншої помилки цього маршруту.
//   - Безкоштовний ключ має денний ліміт запитів (перевірте актуальне
//     число на voicerss.org/pricing). Ліміт спільний на ВЕСЬ сайт (один
//     ключ на всіх відвідувачів), а не на кожного окремо, тож у дуже
//     активний день озвучення може тимчасово "скінчитись" до опівночі —
//     сайт при цьому не ламається, просто тихо повертається до голосу
//     браузера, доки ліміт не скинеться.
//
// Налаштування (обов'язково перед використанням):
//   1. Зареєструйтесь на https://www.voicerss.org/personel (лише email,
//      картка не потрібна) — ключ приходить одразу.
//   2. wrangler secret put VOICERSS_API_KEY
//   Без цього секрету маршрут поверне зрозумілу помилку 501, а не впаде
//   мовчки.

// Мови, яких VoiceRSS не підтримує (перевірено за офіційним списком мов
// у документації) — відсікаємо одразу, без зайвого запиту до їхнього API.
const VOICERSS_UNSUPPORTED_LANGS = new Set(['uk', 'is']);

async function handleTtsApi(request, corsHeaders, env, ctx) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
  if (!env.VOICERSS_API_KEY) {
    return new Response(JSON.stringify({ error: 'VOICERSS_API_KEY не налаштований на сервері (wrangler secret put VOICERSS_API_KEY)' }), {
      status: 501, headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  // Окремий rate-limit від AI-запитів — тут особливо важливо, оскільки
  // безкоштовна квота VoiceRSS невелика й спільна на весь сайт (див.
  // коментар вище); власний ліміт на IP додатково стримує одну людину
  // від випадкового "проїдання" денної квоти всіх користувачів.
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (env.RATE_KV) {
    const rateKey = `rl:tts:${ip}:${Math.floor(Date.now() / 60000)}`;
    const current = parseInt((await env.RATE_KV.get(rateKey)) || '0', 10);
    if (current >= 20) {
      return new Response(JSON.stringify({ error: 'Забагато запитів на озвучення, спробуйте за хвилину' }), {
        status: 429, headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
    ctx.waitUntil(env.RATE_KV.put(rateKey, String(current + 1), { expirationTtl: 60 }));
  }

  let body;
  try { body = await request.json(); }
  catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  const text = typeof body.text === 'string' ? body.text.trim().slice(0, 2000) : '';
  // voice, який шле клієнт, — це ім'я голосу Edge-стилю (напр.
  // "nb-NO-FridaNeural"), успадковане від попередньої реалізації; тут нам
  // потрібен лише BCP-47 префікс мови (напр. "nb-NO") — за щасливим
  // збігом формат VoiceRSS ("nb-no", маленькими літерами) для 28 із 30
  // наших мов — це просто той самий префікс у нижньому регістрі.
  const voiceHint = typeof body.voice === 'string' ? body.voice : '';
  const langMatch = voiceHint.match(/^([a-zA-Z]{2,3})-([a-zA-Z]{2,4})/);
  const baseLangCode = langMatch ? langMatch[1].toLowerCase() : 'en';
  const voicerssLang = langMatch ? `${langMatch[1].toLowerCase()}-${langMatch[2].toLowerCase()}` : 'en-us';
  if (!text) {
    return new Response(JSON.stringify({ error: 'Empty text' }), {
      status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
  if (VOICERSS_UNSUPPORTED_LANGS.has(baseLangCode)) {
    return new Response(JSON.stringify({ error: `VoiceRSS не підтримує мову "${baseLangCode}"` }), {
      status: 501, headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    const ttsRes = await fetch('https://api.voicerss.org/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        key: env.VOICERSS_API_KEY,
        hl: voicerssLang,
        src: text,
        c: 'MP3',
        f: '44khz_16bit_mono',
      }).toString(),
    });
    const buf = await ttsRes.arrayBuffer();
    const bytes = new Uint8Array(buf);
    // VoiceRSS не використовує HTTP-статус для помилок — повертає 200 OK
    // з текстовим тілом "ERROR: ..." замість аудіо (задокументована
    // поведінка їхнього API). Перевіряємо перші байти як текст: справжній
    // mp3-файл ніколи не почнеться з читабельного "ERROR" ASCII-рядка.
    const preview = new TextDecoder('utf-8', { fatal: false }).decode(bytes.slice(0, 16));
    if (preview.toUpperCase().startsWith('ERROR')) {
      const errText = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
      console.warn('VoiceRSS TTS помилка:', errText);
      return new Response(JSON.stringify({ error: 'VoiceRSS TTS помилка', detail: errText.slice(0, 300) }), {
        status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
    return new Response(bytes, {
      headers: { 'Content-Type': 'audio/mpeg', ...corsHeaders },
    });
  } catch (e) {
    console.error('TTS-проксі впав:', e.message);
    return new Response(JSON.stringify({ error: 'TTS proxy failed', detail: e.message }), {
      status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

// ============================================================
//  ДОПОМІЖНЕ: відповіді, CORS, токен, ліміти
// ============================================================

function json(obj, status, corsHeaders) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { "Content-Type": "application/json", ...(corsHeaders || {}) },
  });
}

// CORS: заголовки Access-Control-Allow-* видаємо ЛИШЕ дозволеному Origin. Раніше для чужого джерела
// віддавалось літеральне "null" — а браузер надсилає саме Origin: null із sandbox-iframe та file://,
// тобто таке значення збігалося б і ДОЗВОЛЯЛО доступ. Тепер для чужого/відсутнього Origin заголовка немає.
function buildCorsHeaders(origin) {
  const h = { "Vary": "Origin" };
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    h["Access-Control-Allow-Origin"] = origin;
    h["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS";
    h["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
    h["Access-Control-Max-Age"] = "86400";
  }
  return h;
}

// ---- Firebase ID-токен: перевірка підпису RS256 за публічними ключами Google (JWKS) ----
let _jwksCache = { keys: null, exp: 0 };
async function getFirebaseJwks() {
  if (_jwksCache.keys && Date.now() < _jwksCache.exp) return _jwksCache.keys;
  const res = await fetch("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com");
  if (!res.ok) throw new Error("JWKS fetch failed: " + res.status);
  const m = (res.headers.get("cache-control") || "").match(/max-age=(\d+)/);
  const ttl = m ? Math.min(parseInt(m[1], 10), 3600) : 600;
  _jwksCache = { keys: (await res.json()).keys || [], exp: Date.now() + ttl * 1000 };
  return _jwksCache.keys;
}
function b64urlToBytes(str) {
  const pad = "=".repeat((4 - (str.length % 4)) % 4);
  const bin = atob(str.replace(/-/g, "+").replace(/_/g, "/") + pad);
  return Uint8Array.from(bin, c => c.charCodeAt(0));
}
const _dec = new TextDecoder();
// Повертає { uid } для дійсного токена або null. Перевіряє: підпис (alg=RS256, kid зі списку Google),
// aud === id проєкту, iss === https://securetoken.google.com/<проєкт>, exp/iat/auth_time, непорожній sub.
async function verifyFirebaseIdToken(token, projectId) {
  try {
    const parts = String(token || "").split(".");
    if (parts.length !== 3) return null;
    const header = JSON.parse(_dec.decode(b64urlToBytes(parts[0])));
    const p = JSON.parse(_dec.decode(b64urlToBytes(parts[1])));
    if (header.alg !== "RS256" || !header.kid) return null;
    const now = Math.floor(Date.now() / 1000);
    if (p.aud !== projectId || p.iss !== "https://securetoken.google.com/" + projectId) return null;
    if (typeof p.sub !== "string" || !p.sub || p.sub.length > 128) return null;
    if (typeof p.exp !== "number" || p.exp <= now) return null;
    if (typeof p.iat !== "number" || p.iat > now + 300) return null;
    if (typeof p.auth_time === "number" && p.auth_time > now + 300) return null;
    const jwk = (await getFirebaseJwks()).find(k => k.kid === header.kid);
    if (!jwk) return null;
    const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
    const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64urlToBytes(parts[2]),
      new TextEncoder().encode(parts[0] + "." + parts[1]));
    return ok ? { uid: p.sub } : null;
  } catch (e) {
    return null; // будь-яка помилка розбору = недійсний токен (нічого не розкриваємо)
  }
}

// Лічильники "за хвилину" і "за добу". KV не атомарний (два паралельні запити можуть прослизнути), тому це
// м'який запобіжник від зловживань, а не точна бухгалтерія; для жорсткої квоти — Rate Limiting binding
// або Durable Object. Якщо RATE_KV не підключений — ліміту НЕМАЄ (попереджаємо в логах): прив'яжіть KV!
async function underLimit(env, ctx, scope, id, lim) {
  if (!env.RATE_KV) { console.warn("RATE_KV не підключений — ліміти запитів не діють"); return true; }
  const minKey = `rl:${scope}:${id}:m${Math.floor(Date.now() / 60000)}`;
  const dayKey = `rl:${scope}:${id}:d${new Date().toISOString().slice(0, 10)}`;
  const [m, d] = await Promise.all([env.RATE_KV.get(minKey), env.RATE_KV.get(dayKey)]);
  const mi = parseInt(m || "0", 10), di = parseInt(d || "0", 10);
  if (mi >= lim.perMin || di >= lim.perDay) return false;
  ctx.waitUntil(Promise.all([
    env.RATE_KV.put(minKey, String(mi + 1), { expirationTtl: 120 }),
    env.RATE_KV.put(dayKey, String(di + 1), { expirationTtl: 172800 }),
  ]));
  return true;
}

// Хто викликає: { kind: "user", id: uid } | { kind: "guest", id: ip } | { error: Response }
async function identify(request, env, corsHeaders) {
  const authz = request.headers.get("Authorization") || "";
  const m = authz.match(/^Bearer\s+(\S+)$/i);
  if (m) {
    const user = await verifyFirebaseIdToken(m[1], env.FIREBASE_PROJECT_ID || FIREBASE_PROJECT_ID_DEFAULT);
    if (user) return { kind: "user", id: user.uid };
    return { error: json({ error: "Недійсний або прострочений токен — увійдіть знову" }, 401, corsHeaders) };
  }
  if (env.AUTH_MODE === "required") {
    return { error: json({ error: "Потрібен вхід в акаунт" }, 401, corsHeaders) };
  }
  return { kind: "guest", id: request.headers.get("CF-Connecting-IP") || "unknown" };
}

// ============================================================
//  ОСНОВНА ФУНКЦІЯ FETCH
// ============================================================

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin") || "";
    const corsHeaders = buildCorsHeaders(origin);

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Браузер із чужого сайту → 403. (Запити БЕЗ Origin — curl/скрипти — тут не відсікаються: це не
    // захист, їх обмежують токен і ліміти нижче.)
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return json({ error: "Forbidden origin" }, 403, corsHeaders);
    }

    const url = new URL(request.url);

    // Хто викликає і які в нього ліміти (для /ord-api теж: це відкритий проксі до стороннього сервісу).
    const who = await identify(request, env, corsHeaders);
    if (who.error) return who.error;
    const lim = LIMITS[who.kind];

    // --- Маршрут для ord.uib.no ---
    if (url.pathname.startsWith("/ord-api")) {
      if (!(await underLimit(env, ctx, "ord:" + who.kind, who.id, { perMin: lim.perMin * 2, perDay: lim.perDay * 5 }))) {
        return json({ error: "Забагато запитів, спробуйте за хвилину" }, 429, corsHeaders);
      }
      return handleOrdApi(request, corsHeaders);
    }

    // --- Маршрут для озвучення (VoiceRSS) ---
    if (url.pathname.startsWith("/tts-api")) {
      return handleTtsApi(request, corsHeaders, env, ctx);
    }

    // --- Маршрут для AI (Gemini) ---
    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, corsHeaders);
    }

    if (!(await underLimit(env, ctx, "ai:" + who.kind, who.id, lim))) {
      return json({ error: "Забагато запитів, спробуйте пізніше" }, 429, corsHeaders);
    }

    // Валідація вхідних даних: спершу розмір, потім JSON.
    if (parseInt(request.headers.get("Content-Length") || "0", 10) > MAX_BODY_BYTES) {
      return json({ error: "Payload too large" }, 413, corsHeaders);
    }
    let body;
    try {
      const raw = await request.text();
      if (raw.length > MAX_BODY_BYTES) return json({ error: "Payload too large" }, 413, corsHeaders);
      body = JSON.parse(raw);
    } catch {
      return json({ error: "Invalid JSON" }, 400, corsHeaders);
    }
    if (!body || typeof body !== "object") return json({ error: "Invalid JSON" }, 400, corsHeaders);

    const mode = typeof body.mode === "string" && Object.prototype.hasOwnProperty.call(SYSTEM_PROMPTS, body.mode) ? body.mode : "chat";
    const systemPrompt = SYSTEM_PROMPTS[mode];
    const message = typeof body.message === "string" ? body.message.slice(0, MAX_MESSAGE_LEN) : "";
    if (!message) return json({ error: "Empty message" }, 400, corsHeaders);
    const history = Array.isArray(body.history)
      ? body.history.slice(-MAX_HISTORY_ITEMS).filter(h => h && typeof h === "object").map(h => ({
          role: h.role === "assistant" ? "model" : "user",
          parts: [{ text: String(h.text || "").slice(0, MAX_MESSAGE_LEN) }],
        }))
      : [];

    // ---- Виклик Gemini з автоматичним вибором моделі (fallback) ----
    // Ключ — у заголовку x-goog-api-key, а не в URL (URL потрапляє в логи/трасування).
    let lastStatus = 0;
    for (const modelName of MODEL_CANDIDATES) {
      try {
        const apiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-goog-api-key": env.GEMINI_API_KEY },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: systemPrompt }] },
              contents: [...history, { role: "user", parts: [{ text: message }] }],
            }),
          }
        );

        if (apiRes.ok) {
          const data = await apiRes.json();
          const reply = data?.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("\n") || "";
          return json({ reply }, 200, corsHeaders);
        }

        lastStatus = apiRes.status;
        // Сире тіло помилки Google лишається лише в логах Worker — клієнту його не віддаємо.
        console.warn(`Модель ${modelName} не вдалася:`, apiRes.status, (await apiRes.text()).slice(0, 500));
      } catch (e) {
        console.warn(`Помилка при спробі моделі ${modelName}:`, e.message);
      }
    }

    // Якщо жодна модель не спрацювала
    return json({ error: "All Gemini models failed", detail: lastStatus ? "upstream status " + lastStatus : "upstream unreachable" }, 502, corsHeaders);
  }
};
