// =====================================================================
//  SERVICE WORKER — офлайн-доступ до "оболонки" застосунку (Fjord PWA)
// =====================================================================
// Стратегія: cache-first для файлів застосунку (stale-while-revalidate);
// зовнішні запити (Firebase, CDN, шрифти) НЕ перехоплюються — вони
// завантажуються безпосередньо з мережі, щоб уникнути помилок.
//
// CACHE_NAME треба бампати щоразу, коли міняється JS/CSS/HTML застосунку —
// activate() видаляє лише кеші з ІНШОЮ назвою, тож поки назва не зміниться,
// стара версія файлів (у т.ч. вже полагоджені баги) може роками "застрягати"
// в кеші користувача, і stale-while-revalidate віддаватиме її першою.
const CACHE_NAME = 'fjord-shell-v3';

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
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return; // POST-запити не кешуємо

  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;

  // Зовнішні запити (Firebase, CDN, шрифти) — пропускаємо, не перехоплюємо
  if (!isSameOrigin) {
    return;
  }

  // Для власних файлів застосунку — stale-while-revalidate
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
});