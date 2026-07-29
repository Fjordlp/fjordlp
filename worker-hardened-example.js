//**
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
const SYSTEM_PROMPTS = {
  chat: "Ти — дружній тролль-помічник у застосунку Fjord для вивчення норвезької мови. Відповідай українською (норвезькі приклади можна давати норвезькою з перекладом). Допомагай пояснювати граматику, слова, перекладати короткі фрази, складати приклади речень і підказувати, як користуватись розділами застосунку. Пиши коротко, дружньо, по суті. Форматування: це чат, тому НЕ використовуй заголовки (#), нумеровані списки чи таблиці. Дозволено лише **жирний текст** і списки рядками з «- ».",
  writing_check: "Ти — досвідчений сенсор (екзаменатор), який перевіряє письмові роботи кандидатів на іспиті Norskprøve (HK-dir, рівні A1–B2). Тобі надсилають рівень, тему завдання і текст студента норвезькою. Відповідай українською, чат-форматом (без заголовків #, без нумерованих списків/таблиць, можна **жирний текст** і списки з «- »): спочатку 1 речення — чи текст відповідає рівню й темі; далі **Помилки та виправлення** (оригінал → виправлення); далі **Що покращити** — 2-4 конкретні поради; наприкінці коротке підбадьорення.",
  gen_task: "Ти генеруєш ОДНЕ нове тренувальне завдання для підготовки до Norskprøve (HK-dir, рівні A1-B2) за схемою, яку тобі дає користувач у повідомленні. Відповідай ЛИШЕ чистим JSON без жодного тексту навколо і без markdown-огорожі (```).",
  gen_vocab: "Ти генеруєш нові слова для словника вивчення норвезької мови за схемою, яку тобі дає користувач у повідомленні. Відповідай ЛИШЕ чистим JSON-масивом без жодного тексту навколо і без markdown-огорожі (```).",
};

const MAX_MESSAGE_LEN = 4000;
const MAX_HISTORY_ITEMS = 12;
const RATE_LIMIT_PER_MIN = 12;

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

async function handleOrdApi(request) {
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
    return new Response('Not found', { status: 404 });
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
      'Access-Control-Allow-Origin': '*'
    }
  });
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
      return handleOrdApi(request);
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
