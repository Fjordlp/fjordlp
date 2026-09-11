// =====================================================================
//  SERVICE WORKER — офлайн-доступ до "оболонки" застосунку (Fjord PWA)
// =====================================================================
// Стратегія: NETWORK-FIRST для файлів застосунку. Кеш використовується
// ЛИШЕ як запасний варіант, коли мережі немає (офлайн).
//
// ⚠️ ЧОМУ ЗМІНЕНО (було cache-first / stale-while-revalidate):
// стара версія робила `return cached || network` — тобто ЯКЩО в кеші
// вже була відповідь, вона поверталась ЗАВЖДИ, а свіжа версія з мережі
// лише мовчки записувалась у кеш "на майбутнє". У результаті після
// будь-якого оновлення сайту людина, що вже відкривала застосунок
// раніше, могла роками бачити стару версію JS/CSS, навіть після
// повного перезавантаження сторінки — адже кожне перезавантаження
// знову й знову віддавало вже застарілий кеш, а не щойно завантажений
// в фоні файл. Саме через це виправлення в js/i18n.js могли "не
// діяти" на реальному сайті, хоча самі файли на сервері вже оновлені.
//
// Тепер: поки є інтернет — завжди береться найсвіжіша версія з мережі
// (і кеш оновлюється разом з тим). Кеш використовується тільки якщо
// fetch провалився (людина офлайн) — тоді хоч стара, та робоча версія.
//
// 🔥 CACHE_NAME лишається динамічним (Date.now()), щоб при кожному
// новому встановленні SW старі кеші гарантовано підчищались в activate.
// =====================================================================
const CACHE_NAME = 'fjord-shell-' + Date.now();

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/firebase-config.js',
  './js/firebase-auth.js',
  './js/state.js',
  './js/i18n.js',
  './js/languages.js',
  './js/assistant.js',
  './js/data.js',
  './js/data-en.js',
  './js/data-de.js',
  './js/data-es.js',
  './js/data-fr.js',
  './js/data-it.js',
  './js/helpers.js',
  './js/gear-i18n.js',
  './js/bust-accessories.js',
  './js/troll.js',
  './js/books.js',
  './js/story.js',
  './js/router.js',
  './js/views-core.js',
  './js/views-more.js',
  './js/views-books.js',
  './js/views-story.js',
  './js/views-admin.js',
  './js/auth.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((n) => n !== CACHE_NAME)
          .map((n) => caches.delete(n))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (!isSameOrigin) {
    return;
  }

  event.respondWith(
    fetch(req).then((res) => {
      // Свіжа відповідь з мережі — саме те, що бачить користувач ЗАРАЗ,
      // і паралельно кладемо копію в кеш на випадок майбутнього офлайну.
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
      }
      return res;
    }).catch(() => caches.match(req)) // мережі немає — віддаємо те, що встигли закешувати раніше
  );
});