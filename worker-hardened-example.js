/**
 * ПРИКЛАД посиленого Cloudflare Worker для AI-проксі Fjord (Gemini).
 *
 * Це НЕ ваш реальний worker.js — ви його мені не завантажували, тож я не
 * бачу поточної реалізації виклику Gemini. Це шаблон із ключовими
 * правками БЕЗПЕКИ, який потрібно перенести у ваш справжній Worker і
 * задеплоїти самостійно (wrangler deploy або через дашборд Cloudflare).
 * Контракт запиту з клієнта я вже узгодив зі своєї сторони (js/assistant.js
 * тепер надсилає {mode, message, history} замість {system, message,
 * history}) — тож серверна частина нижче приймає саме такий payload.
 *
 * ГОЛОВНІ ПРОБЛЕМИ, ЯКІ ЦЕ ВИРІШУЄ:
 *  1. Раніше клієнт сам формував і надсилав повний текст system-промпту.
 *     URL Worker'а й так публічний (лежить у firebase-config.js) — це
 *     нормально, Worker і мають викликати з браузера. Але будь-хто, хто
 *     відкриє DevTools і викличе цей URL напряму (в обхід сайту), міг
 *     підставити ДОВІЛЬНИЙ system-промпт і перетворити ваш Worker (а
 *     разом з ним — ваш ключ Gemini) на безкоштовний персональний
 *     AI-проксі для будь-кого стороннього.
 *  2. CORS був відкритий для всіх джерел — будь-який сторонній сайт міг
 *     смикати ваш Worker і накручувати рахунок/квоту.
 *  3. Не було rate-limit — один зловмисник міг за хвилину зробити тисячі
 *     запитів.
 * Нижче — виправлення всіх трьох пунктів.
 */

// Дозволений origin — ТІЛЬКИ ваш сайт.
const ALLOWED_ORIGIN = "https://fjordnorge.netlify.app";

// Фіксовані системні промпти на СЕРВЕРІ (тексти нижче я скопіював з
// поточного js/assistant.js: AI_SYSTEM_PROMPT → chat, AI_WRITING_CHECK_PROMPT
// → writing_check; gen_task/gen_vocab — узагальнені інструкції, бо сама
// схема JSON для кожного випадку вже приходить у тілі повідомлення).
// Клієнт передає лише коротку назву "mode" — НІКОЛИ сам текст промпту.
const SYSTEM_PROMPTS = {
  chat: "Ти — дружній тролль-помічник у застосунку Fjord для вивчення норвезької мови. Відповідай українською (норвезькі приклади можна давати норвезькою з перекладом). Допомагай пояснювати граматику, слова, перекладати короткі фрази, складати приклади речень і підказувати, як користуватись розділами застосунку. Пиши коротко, дружньо, по суті. Форматування: це чат, тому НЕ використовуй заголовки (#), нумеровані списки чи таблиці. Дозволено лише **жирний текст** і списки рядками з «- ».",
  writing_check: "Ти — досвідчений сенсор (екзаменатор), який перевіряє письмові роботи кандидатів на іспиті Norskprøve (HK-dir, рівні A1–B2). Тобі надсилають рівень, тему завдання і текст студента норвезькою. Відповідай українською, чат-форматом (без заголовків #, без нумерованих списків/таблиць, можна **жирний текст** і списки з «- »): спочатку 1 речення — чи текст відповідає рівню й темі; далі **Помилки та виправлення** (оригінал → виправлення); далі **Що покращити** — 2-4 конкретні поради; наприкінці коротке підбадьорення.",
  gen_task: "Ти генеруєш ОДНЕ нове тренувальне завдання для підготовки до Norskprøve (HK-dir, рівні A1-B2) за схемою, яку тобі дає користувач у повідомленні. Відповідай ЛИШЕ чистим JSON без жодного тексту навколо і без markdown-огорожі (```).",
  gen_vocab: "Ти генеруєш нові слова для словника вивчення норвезької мови за схемою, яку тобі дає користувач у повідомленні. Відповідай ЛИШЕ чистим JSON-масивом без жодного тексту навколо і без markdown-огорожі (```).",
};

const MAX_MESSAGE_LEN = 4000;     // символів у повідомленні користувача
const MAX_HISTORY_ITEMS = 12;     // скільки попередніх реплік передавати
const RATE_LIMIT_PER_MIN = 12;    // запитів на хвилину з одного IP

// Модель Gemini, яку ви зараз використовуєте — перенесіть зі свого
// поточного Worker'а (назва могла відрізнятись).
const GEMINI_MODEL = "gemini-2.0-flash";

export default {
  async fetch(request, env, ctx) {
    // ---- CORS: відповідаємо тільки своєму домену ----
    const origin = request.headers.get("Origin") || "";
    const corsHeaders = {
      "Access-Control-Allow-Origin": origin === ALLOWED_ORIGIN ? origin : "null",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }
    if (origin !== ALLOWED_ORIGIN) {
      return new Response(JSON.stringify({ error: "Forbidden origin" }), {
        status: 403,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // ---- Rate limiting (потрібен KV namespace, прив'язаний як env.RATE_KV) ----
    // wrangler.toml:
    //   [[kv_namespaces]]
    //   binding = "RATE_KV"
    //   id = "<ваш kv id>"
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

    // ---- Валідація вхідних даних ----
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
    const systemPrompt = SYSTEM_PROMPTS[mode]; // НІКОЛИ не беремо system з body напряму!

    const message = typeof body.message === "string" ? body.message.slice(0, MAX_MESSAGE_LEN) : "";
    if (!message) {
      return new Response(JSON.stringify({ error: "Empty message" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    const history = Array.isArray(body.history)
      ? body.history.slice(-MAX_HISTORY_ITEMS).map(h => ({
          role: h.role === "assistant" ? "model" : "user", // Gemini використовує "model", не "assistant"
          parts: [{ text: String(h.text || "").slice(0, MAX_MESSAGE_LEN) }],
        }))
      : [];

    // ---- Виклик Gemini API (ключ — секрет Worker'а, env.GEMINI_API_KEY,
    //      задається через `wrangler secret put GEMINI_API_KEY`, НІКОЛИ не
    //      пишеться прямо в код) ----
    try {
      const apiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [...history, { role: "user", parts: [{ text: message }] }],
          }),
        }
      );
      if (!apiRes.ok) {
        const errText = await apiRes.text();
        return new Response(JSON.stringify({ error: "Upstream error", detail: errText }), {
          status: 502,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const data = await apiRes.json();
      const reply = data?.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("\n") || "";
      return new Response(JSON.stringify({ reply }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: "Server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  },
};
