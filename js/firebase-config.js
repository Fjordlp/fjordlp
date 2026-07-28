// =====================================================================
//  FIREBASE CONFIG – ВСТАВТЕ ВАШ КОНФІГ ТУТ
// =====================================================================
const firebaseConfig = {
  apiKey: "AIzaSyATVYk9vNfVVwOGiw5taE5-ZzmKSlhQ8bc",
  authDomain: "fjord-f0e0b.firebaseapp.com",
  projectId: "fjord-f0e0b",
  storageBucket: "fjord-f0e0b.firebasestorage.app",
  messagingSenderId: "1093590978902",
  appId: "1:1093590978902:web:b0a81ca2c9bca5de9a46f7",
  measurementId: "G-6NL887S4V8"
};

// =====================================================================
//  AI ПОМІЧНИК (ТРОЛЬ) – НАЛАШТУВАННЯ ПРОКСІ
// =====================================================================
// Сюди встав URL свого Cloudflare Worker після деплою (див. worker.js
// та інструкцію, які додаються окремим файлом). Приклад:
// const AI_PROXY_URL = "https://fjord-ai-proxy.твій-нік.workers.dev";
// Поки поле порожнє – чат покаже користувачу повідомлення, що асистент
// ще не підключений (і не буде намагатись стукати в нікуди).
const AI_PROXY_URL = "https://fjord-ai-proxy.maksimenkonazar013.workers.dev/";
