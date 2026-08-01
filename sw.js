// =====================================================================
//  SERVICE WORKER — офлайн-доступ до "оболонки" застосунку (Fjord PWA)
// =====================================================================
// Стратегія: cache-first для файлів застосунку (HTML/CSS/JS/іконки) — вони
// рідко змінюються і мають бути доступні миттєво й офлайн; network-first
// (з відкатом на кеш) для всього іншого (Firebase, AI-проксі, зовнішні
// шрифти) — щоб дані завжди намагались оновитись, коли є інтернет.
const CACHE_NAME = 'fjord-shell-v1';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/firebase-config.js',
  './js/firebase-auth.js',
  './js/state.js',
  './js/i18n.js',
  './js/assistant.js',
  './js/data.js',
  './js/helpers.js',
  './js/gear-i18n.js',
  './js/bust-accessories.js',
  './js/troll.js',
  './js/router.js',
  './js/views-core.js',
  './js/views-more.js',
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
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return; // POST-запити (AI-проксі, Firestore) не кешуємо

  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (isSameOrigin) {
    // Файли самого застосунку — спочатку кеш, паралельно тихо оновлюємо його
    // на майбутнє (stale-while-revalidate), щоб офлайн завжди щось показав.
    event.respondWith(
      caches.match(req).then((cached) => {
        const network = fetch(req).then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        }).catch(() => cached);
        return cached || network;
      })
    );
  } else {
    // Зовнішнє (Firebase SDK, Google Fonts, AI-проксі GET-запити тощо) —
    // мережа спочатку, кеш лише як запасний варіант офлайн.
    event.respondWith(
      fetch(req).catch(() => caches.match(req))
    );
  }
});
