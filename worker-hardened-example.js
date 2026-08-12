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
};

const MAX_MESSAGE_LEN = 4000;
const MAX_HISTORY_ITEMS = 12;
// Було 12/хв — це майже гарантовано впиралось у ліміт, якщо адмін генерував
// словник у кілька пакетів (5-8 запитів) для однієї мови, а тим паче для
// кількох мов підряд в одній сесії. Піднято до 30/хв; клієнт (generateBulkVocab)
// також тепер сам витримує паузу ~600мс між пакетами.
const RATE_LIMIT_PER_MIN = 30;

// Список моделей для fallback (перша робоча буде використана)
const MODEL_CANDIDATES = [
  "gemini-3.1-flash-lite",
  "gemini-1.5-pro",
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
  "gemini-2.0-flash-exp",
];

// ============================================================
//  ПРОКСІ ДЛЯ ord.uib.no (словник)
// ============================================================

async function handleOrdApi(request, corsHeaders) {
  const url = new URL(request.url);
  const path = url.pathname;

  let targetPath = '';
  if (path === '/ord-api/suggest' || path === '/ord-api') {
    targetPath = '/api/suggest';
  } else if (path === '/ord-api/articles') {
    targetPath = '/api/articles';
  } else if (path.startsWith('/ord-api/article/')) {
    const id = path.replace('/ord-api/article/', '');
    targetPath = `/bm/article/${id}`;
  } else {
    return new Response('Not found', { status: 404, headers: corsHeaders });
  }

  const params = url.searchParams;
  const targetUrl = `https://ord.uib.no${targetPath}?${params.toString()}`;

  const resp = await fetch(targetUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; FjordBot/1.0)',
      'Accept': 'application/json',
    }
  });
  const data = await resp.json();
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      // Раніше тут був "*" (дозволено з будь-якого сайту) — звужено до
      // того самого списку дозволених джерел, що й для решти Worker'а.
      ...corsHeaders,
    }
  });
}

// ============================================================
//  TTS-ПРОКСІ (Azure Cognitive Services Speech)
// ============================================================
// НАВІЩО САМЕ ТАК: клієнтська бібліотека @edge-tts/universal, яку сайт
// пробував використовувати раніше, працює ЛИШЕ в самому браузері
// Microsoft Edge (протокол вимагає WebSocket-заголовок Sec-MS-GEC, який
// звичайний браузерний API забороняє виставляти скриптом) — у решті
// браузерів вона завжди мовчки провалюється. Перенести цю саму логіку
// сюди, у Worker, теж ризиковано: за свідченнями спільноти (issue-трекер
// проєкту edge-tts, форумні звіти про розгортання на Colab/HF Spaces),
// Microsoft часто ФІЛЬТРУЄ запити з дата-центрових/хмарних IP-адрес —
// а Cloudflare Workers це якраз такий IP: з'єднання приймається, але
// аудіо-даних у відповідь не приходить. Тобто навіть бездоганна
// реалізація протоколу могла б просто мовчки не працювати з Worker'а.
//
// Замість цього тут — ОФІЦІЙНИЙ, стабільний, документований REST API:
// Azure Cognitive Services Speech. Це та сама технологія й ТІ САМІ
// нейронні голоси (наприклад nb-NO-FinnNeural), що вже прописані в
// TTS_VOICES на клієнті — міняється лише канал доставки, не голоси.
//
// Налаштування (обов'язково перед використанням):
//   1. Створіть безкоштовний ресурс "Speech" в Azure Portal (free tier:
//      ~500 000 символів нейронного голосу на місяць).
//   2. wrangler secret put AZURE_SPEECH_KEY
//   3. wrangler secret put AZURE_SPEECH_REGION   (наприклад "westeurope")
//   Без цих двох секретів маршрут поверне зрозумілу помилку 501, а не
//   впаде мовчки — клієнт (troll.js) при цьому сам відкотиться на
//   вбудований SpeechSynthesis браузера.

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Токен доступу Azure дійсний 10 хвилин — кешуємо в тому самому KV, що й
// rate-limit (якщо він підключений), щоб не запитувати новий токен на
// кожне окреме слово, яке хтось озвучує.
async function getAzureSpeechToken(env) {
  const cacheKey = 'azure-speech-token';
  if (env.RATE_KV) {
    const cached = await env.RATE_KV.get(cacheKey);
    if (cached) return cached;
  }
  const region = env.AZURE_SPEECH_REGION || 'westeurope';
  const res = await fetch(`https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, {
    method: 'POST',
    headers: { 'Ocp-Apim-Subscription-Key': env.AZURE_SPEECH_KEY, 'Content-Length': '0' },
  });
  if (!res.ok) throw new Error(`Не вдалось отримати токен Azure Speech (${res.status})`);
  const token = await res.text();
  if (env.RATE_KV) {
    // Кешуємо трохи менше за реальні 10 хв — про всяк випадок, щоб не
    // намагатись використати токен, який Azure вже встиг відкликати.
    await env.RATE_KV.put(cacheKey, token, { expirationTtl: 480 });
  }
  return token;
}

async function handleTtsApi(request, corsHeaders, env, ctx) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
  if (!env.AZURE_SPEECH_KEY) {
    return new Response(JSON.stringify({ error: 'AZURE_SPEECH_KEY не налаштований на сервері (wrangler secret put AZURE_SPEECH_KEY)' }), {
      status: 501, headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  // Окремий rate-limit від AI-запитів (озвучення дешевше й частіше, але
  // все одно не повинно бути необмеженим — це обмежує зловживання
  // платним ключем Azure).
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (env.RATE_KV) {
    const rateKey = `rl:tts:${ip}:${Math.floor(Date.now() / 60000)}`;
    const current = parseInt((await env.RATE_KV.get(rateKey)) || '0', 10);
    if (current >= 60) {
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

  const text = typeof body.text === 'string' ? body.text.slice(0, 600) : '';
  const voice = typeof body.voice === 'string' && body.voice ? body.voice : 'en-US-JennyNeural';
  if (!text) {
    return new Response(JSON.stringify({ error: 'Empty text' }), {
      status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
  // xml:lang у SSML беремо з початку імені голосу (напр. "nb-NO" із
  // "nb-NO-FinnNeural") — Azure не надто суворий до точності цього поля,
  // коли вже явно вказане конкретне ім'я голосу.
  const langMatch = voice.match(/^([a-zA-Z]{2,3}-[a-zA-Z]{2,4})/);
  const xmlLang = langMatch ? langMatch[1] : 'en-US';
  const ssml = `<speak version='1.0' xml:lang='${xmlLang}'><voice xml:lang='${xmlLang}' name='${voice}'>${escapeXml(text)}</voice></speak>`;
  const region = env.AZURE_SPEECH_REGION || 'westeurope';

  try {
    const token = await getAzureSpeechToken(env);
    const ttsRes = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
        'User-Agent': 'FjordLearningPlatform',
      },
      body: ssml,
    });
    if (!ttsRes.ok) {
      const errText = await ttsRes.text();
      console.warn('Azure Speech TTS помилка:', ttsRes.status, errText);
      return new Response(JSON.stringify({ error: 'Azure Speech TTS помилка', status: ttsRes.status, detail: errText.slice(0, 300) }), {
        status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
    const audioData = await ttsRes.arrayBuffer();
    return new Response(audioData, {
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
//  ОСНОВНА ФУНКЦІЯ FETCH
// ============================================================

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin") || "";
    const corsHeaders = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : "null",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
    };

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Перевірка походження (безпека)
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return new Response(JSON.stringify({ error: "Forbidden origin" }), {
        status: 403,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const url = new URL(request.url);

    // --- Маршрут для ord.uib.no ---
    if (url.pathname.startsWith('/ord-api')) {
      return handleOrdApi(request, corsHeaders);
    }

    // --- Маршрут для озвучення (Azure Speech) ---
    if (url.pathname.startsWith('/tts-api')) {
      return handleTtsApi(request, corsHeaders, env, ctx);
    }

    // --- Маршрут для AI (Gemini) ---
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Rate limiting (опціонально)
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const rateKey = `rl:${ip}:${Math.floor(Date.now() / 60000)}`;
    if (env.RATE_KV) {
      const current = parseInt((await env.RATE_KV.get(rateKey)) || "0", 10);
      if (current >= RATE_LIMIT_PER_MIN) {
        return new Response(JSON.stringify({ error: "Забагато запитів, спробуйте за хвилину" }), {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      ctx.waitUntil(env.RATE_KV.put(rateKey, String(current + 1), { expirationTtl: 60 }));
    }

    // Валідація вхідних даних
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const mode = typeof body.mode === "string" && SYSTEM_PROMPTS[body.mode] ? body.mode : "chat";
    const systemPrompt = SYSTEM_PROMPTS[mode];
    const message = typeof body.message === "string" ? body.message.slice(0, MAX_MESSAGE_LEN) : "";
    if (!message) {
      return new Response(JSON.stringify({ error: "Empty message" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    const history = Array.isArray(body.history)
      ? body.history.slice(-MAX_HISTORY_ITEMS).map(h => ({
          role: h.role === "assistant" ? "model" : "user",
          parts: [{ text: String(h.text || "").slice(0, MAX_MESSAGE_LEN) }],
        }))
      : [];

    // ---- Виклик Gemini з автоматичним вибором моделі (fallback) ----
    let lastError = null;
    for (const modelName of MODEL_CANDIDATES) {
      try {
        const apiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: systemPrompt }] },
              contents: [...history, { role: "user", parts: [{ text: message }] }],
            }),
          }
        );

        if (apiRes.ok) {
          const data = await apiRes.json();
          const reply = data?.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("\n") || "";
          return new Response(JSON.stringify({ reply }), {
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const errText = await apiRes.text();
        lastError = errText;
        console.warn(`Модель ${modelName} не вдалася:`, errText);
      } catch (e) {
        lastError = e.message;
        console.warn(`Помилка при спробі моделі ${modelName}:`, e.message);
      }
    }

    // Якщо жодна модель не спрацювала
    return new Response(JSON.stringify({
      error: "All Gemini models failed",
      detail: lastError || "Unknown error"
    }), {
      status: 502,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};
