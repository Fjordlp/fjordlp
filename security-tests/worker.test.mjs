// Запуск: node security-tests/worker.test.mjs   (Node 20+; тестує Worker локально з підробленим ключем Google, KV і fetch)
import { webcrypto as crypto } from 'node:crypto';
import worker from '../worker-hardened-example.js';

const PROJECT = 'fjord-f0e0b';
const b64u = (buf) => Buffer.from(buf).toString('base64url');
const enc = (o) => b64u(JSON.stringify(o));
let pass = 0, fail = 0;
const ok = (c, m, x = '') => { c ? pass++ : fail++; console.log((c ? 'PASS ' : 'FAIL ') + m + (x !== '' ? `  [${x}]` : '')); };

// --- fake Google signing key + JWKS
const kp = await crypto.subtle.generateKey({ name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' }, true, ['sign', 'verify']);
const other = await crypto.subtle.generateKey({ name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' }, true, ['sign', 'verify']);
const pubJwk = { ...(await crypto.subtle.exportKey('jwk', kp.publicKey)), kid: 'k1', alg: 'RS256', use: 'sig' };
const now = () => Math.floor(Date.now() / 1000);
async function token({ aud = PROJECT, iss = 'https://securetoken.google.com/' + PROJECT, sub = 'UID1', exp = now() + 3600, iat = now() - 5, kid = 'k1', alg = 'RS256', key = kp.privateKey } = {}) {
  const h = enc({ alg, kid, typ: 'JWT' }), p = enc({ aud, iss, sub, exp, iat, auth_time: iat });
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(h + '.' + p));
  return `${h}.${p}.${b64u(sig)}`;
}

// --- mocks
const calls = [];
globalThis.fetch = async (url, init = {}) => {
  calls.push({ url: String(url), init });
  const u = String(url);
  if (u.includes('securetoken@system.gserviceaccount.com')) return new Response(JSON.stringify({ keys: [pubJwk] }), { headers: { 'cache-control': 'public, max-age=3600' } });
  if (u.includes('generativelanguage.googleapis.com')) {
    if (globalThis.__geminiFail) return new Response('{"error":{"message":"API key SECRET-ABC invalid for project 123"}}', { status: 429 });
    return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: 'hei!' }] } }] }));
  }
  if (u.includes('ord.uib.no')) return new Response(globalThis.__ordHtml ? '<html>oops</html>' : '{"a":1}');
  return new Response('x', { status: 500 });
};
const mkKV = () => { const m = new Map(); return { get: async (k) => m.get(k) ?? null, put: async (k, v) => { m.set(k, v); }, _m: m }; };
const mkEnv = (extra = {}) => ({ GEMINI_API_KEY: 'REAL-KEY-123', RATE_KV: mkKV(), ...extra });
const ctx = { waitUntil: (p) => p };
const ORIGIN = 'https://fjordlp.com';
const post = (body, headers = {}, path = '/') => new Request('https://w.example' + path, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
const msg = { mode: 'chat', message: 'hello', history: [] };
const call = (req, env) => worker.fetch(req, env, ctx);

// 1. CORS
let r = await call(new Request('https://w.example/', { method: 'OPTIONS', headers: { Origin: ORIGIN } }), mkEnv());
ok(r.status === 204 && r.headers.get('access-control-allow-origin') === ORIGIN, 'OPTIONS from allowed origin -> 204 + ACAO=origin');
ok((r.headers.get('access-control-allow-headers') || '').includes('Authorization'), 'preflight allows the Authorization header');
r = await call(new Request('https://w.example/', { method: 'OPTIONS', headers: { Origin: 'https://evil.example' } }), mkEnv());
ok(r.headers.get('access-control-allow-origin') === null, 'OPTIONS from evil origin -> no ACAO header');
r = await call(post(msg, { Origin: 'null' }), mkEnv());
ok(r.status === 403 && r.headers.get('access-control-allow-origin') === null, 'Origin: null -> 403 and NO "null" ACAO (old bug allowed it)', r.status);
r = await call(post(msg, { Origin: 'https://evil.example' }), mkEnv());
ok(r.status === 403, 'POST from evil origin -> 403');

// 2. guest happy path + key not in URL
calls.length = 0;
r = await call(post(msg, { Origin: ORIGIN }), mkEnv());
const j = await r.json(); const g = calls.find(c => c.url.includes('generativelanguage'));
ok(r.status === 200 && j.reply === 'hei!', 'guest chat works', r.status);
ok(g && !g.url.includes('REAL-KEY') && g.init.headers['x-goog-api-key'] === 'REAL-KEY-123', 'Gemini key sent in header, not in URL');
r = await call(post(msg), mkEnv());
ok(r.status === 200, 'request without Origin (curl-like) still works as a GUEST (limited)');

// 3. guest limit per minute (8) and per day (60)
let env = mkEnv(); let last;
for (let i = 0; i < 9; i++) last = await call(post(msg, { 'CF-Connecting-IP': '1.2.3.4' }), env);
ok(last.status === 429, 'guest: 9th request within a minute -> 429', last.status);
const r2 = await call(post(msg, { 'CF-Connecting-IP': '5.6.7.8' }), env);
ok(r2.status === 200, 'limit is per IP: another IP unaffected');
env = mkEnv(); const dayKey = `rl:ai:guest:9.9.9.9:d${new Date().toISOString().slice(0, 10)}`; await env.RATE_KV.put(dayKey, '60');
r = await call(post(msg, { 'CF-Connecting-IP': '9.9.9.9' }), env);
ok(r.status === 429, 'guest: daily cap (60) enforced', r.status);

// 4. token verification
env = mkEnv();
r = await call(post(msg, { Authorization: 'Bearer ' + await token() }), env);
ok(r.status === 200, 'valid Firebase token -> 200');
const keys = [...env.RATE_KV._m.keys()].join(' ');
ok(keys.includes('ai:user:UID1'), 'limits are keyed by uid for signed-in users', keys.slice(0, 60));
const bad = {
  'expired token': await token({ exp: now() - 10 }),
  'wrong audience': await token({ aud: 'other-project' }),
  'wrong issuer': await token({ iss: 'https://evil.example/' }),
  'signature from a different key': await token({ key: other.privateKey }),
  'unknown kid': await token({ kid: 'nope' }),
  'empty sub': await token({ sub: '' }),
  'iat in the future': await token({ iat: now() + 3600 }),
};
for (const [name, t] of Object.entries(bad)) { r = await call(post(msg, { Authorization: 'Bearer ' + t }), mkEnv()); ok(r.status === 401, `${name} -> 401`, r.status); }
const noneTok = enc({ alg: 'none', typ: 'JWT', kid: 'k1' }) + '.' + enc({ aud: PROJECT, iss: 'https://securetoken.google.com/' + PROJECT, sub: 'x', exp: now() + 99, iat: now() }) + '.';
r = await call(post(msg, { Authorization: 'Bearer ' + noneTok }), mkEnv()); ok(r.status === 401, 'alg=none token -> 401');
r = await call(post(msg, { Authorization: 'Bearer garbage' }), mkEnv()); ok(r.status === 401, 'garbage token -> 401 (not silently treated as guest)');
// tampered payload keeps original signature
const t0 = await token(); const [h0, , s0] = t0.split('.'); const tam = `${h0}.${enc({ aud: PROJECT, iss: 'https://securetoken.google.com/' + PROJECT, sub: 'ADMIN', exp: now() + 999, iat: now() })}.${s0}`;
r = await call(post(msg, { Authorization: 'Bearer ' + tam }), mkEnv()); ok(r.status === 401, 'payload tampered after signing -> 401');
// signed-in user limit is higher than guest
env = mkEnv(); const tk = await token(); let okCount = 0;
for (let i = 0; i < 31; i++) { r = await call(post(msg, { Authorization: 'Bearer ' + tk }), env); if (r.status === 200) okCount++; }
ok(okCount === 30 && r.status === 429, 'signed-in user: 30/min then 429', okCount);

// 5. AUTH_MODE=required
r = await call(post(msg), mkEnv({ AUTH_MODE: 'required' })); ok(r.status === 401, 'AUTH_MODE=required: no token -> 401');
r = await call(post(msg, { Authorization: 'Bearer ' + await token() }), mkEnv({ AUTH_MODE: 'required' })); ok(r.status === 200, 'AUTH_MODE=required: valid token -> 200');

// 6. body validation
r = await call(post('x'.repeat(100001)), mkEnv()); ok(r.status === 413, 'oversized body -> 413', r.status);
r = await call(post('{not json'), mkEnv()); ok(r.status === 400, 'invalid JSON -> 400');
r = await call(post('null'), mkEnv()); ok(r.status === 400, 'JSON null -> 400');
r = await call(post({ mode: 'chat', message: '' }), mkEnv()); ok(r.status === 400, 'empty message -> 400');
calls.length = 0; r = await call(post({ mode: '__proto__', message: 'x', history: [null, 5, { role: 'user', text: 'ok' }] }), mkEnv());
ok(r.status === 200, 'mode "__proto__" and junk history entries do not crash', r.status);

// 7. upstream failure does not leak the Google error body
globalThis.__geminiFail = true; r = await call(post(msg), mkEnv()); const ej = await r.json(); globalThis.__geminiFail = false;
ok(r.status === 502 && !JSON.stringify(ej).includes('SECRET-ABC') && ej.detail === 'upstream status 429', 'Gemini failure -> generic 502, upstream body not leaked', JSON.stringify(ej));

// 8. ord-api
r = await call(new Request('https://w.example/ord-api/article/..%2F..%2Fadmin', { headers: { Origin: ORIGIN } }), mkEnv()); ok(r.status === 400 || r.status === 404, 'ord-api: path-traversal article id rejected', r.status);
r = await call(new Request('https://w.example/ord-api/article/12345'), mkEnv()); ok(r.status === 200, 'ord-api: valid id works', r.status);
r = await call(new Request('https://w.example/ord-api/suggest', { method: 'POST' }), mkEnv()); ok(r.status === 405, 'ord-api: POST -> 405');
globalThis.__ordHtml = true; r = await call(new Request('https://w.example/ord-api/suggest?q=a'), mkEnv()); globalThis.__ordHtml = false;
ok(r.status === 502, 'ord-api: non-JSON upstream -> 502 (used to throw)', r.status);
env = mkEnv(); let lastOrd; for (let i = 0; i < 17; i++) lastOrd = await call(new Request('https://w.example/ord-api/suggest?q=a', { headers: { 'CF-Connecting-IP': '3.3.3.3' } }), env);
ok(lastOrd.status === 429, 'ord-api is rate limited per IP (16/min for guests)', lastOrd.status);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
