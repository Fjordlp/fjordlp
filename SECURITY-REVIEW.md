# Fjord – security review & hardening

**Scope:** static + dynamic review of the client (`js/*`, `index.html`, `sw.js`, `_headers`), `firestore.rules` and the AI Worker (`worker-hardened-example.js`).

**What this is NOT:** the Claude Security plugin's verified-panel scan. That pipeline needs a `Workflow` tool and plugin scripts that do not exist in this environment, so it was not run and no "verified" report is claimed. Everything below is a direct review, backed by the tests in `security-tests/`.
The Supabase Postgres skill does not apply (the project uses Firestore, not Postgres); only its principles (least privilege, validate writes server-side, never trust user-editable fields for authorization) were used as a checklist for `firestore.rules`.

## Findings and status

| # | Severity | Finding | Evidence | Status |
|---|---|---|---|---|
| 1 | **High** | **Stored XSS → admin takeover chain.** Admin "Users" list rendered `name`, `email`, `level` of other users unescaped. A user can write those fields into their own `users/{uid}` doc; the script then runs in the admin's session (admin can publish shared content to every user). | `security-tests/xss-taint.py`: 15 distinct fields executed script (3 user-written, 12 admin/AI-authored) | **Fixed** (`views-admin.js`: 41 template sites escaped, inline-handler ids JSON-encoded). Re-run: 0 of 39 routes execute payloads |
| 2 | **High** | **AI proxy is effectively open.** CORS/`Origin` is not authentication (curl sends none, or forges it). No token, rate limit optional → anyone can spend the Gemini key. `Access-Control-Allow-Origin: "null"` matched `Origin: null` (sandboxed iframes, `file://`). | `worker.test.mjs` (37 checks) | **Fixed in code, needs deploy** (Firebase ID-token verification, per-uid / per-IP limits, daily caps, strict CORS) |
| 3 | **High** | **Firestore rules trusted the client's data.** No type/size validation of profile fields (the XSS vector above); tournament results could be overwritten (replay / "improve" a score) and had no range checks. | review of `firestore.rules` | **Fixed in code, needs publish + emulator run** |
| 4 | Medium | Quiz feedback inserted answer text via `tf()` into `innerHTML` unescaped (AI-generated / shared words). | taint test: `test-translate` fired | **Fixed** (4 sites) |
| 5 | Medium | Gemini API key sent in the URL query string; upstream error body returned to clients. | code review + test | **Fixed** (header `x-goog-api-key`, generic error) |
| 6 | Medium | `/ord-api` open proxy: no rate limit, unvalidated article id, unhandled upstream non-JSON → 500. | test | **Fixed** |
| 7 | Medium | Account enumeration + raw English Firebase errors on login. | `client-unit.py` | **Fixed** (same message for wrong password / unknown user, localized) |
| 8 | Medium | Passwords were silently `.trim()`-ed; no minimum length at sign-up. | code | **Fixed** (no trim; ≥ 8 characters on registration) |
| 9 | Medium | `set(..., {merge:true})` never removed trimmed keys, so the 1 MB document limit was not actually avoided; stale AI caches stayed in the doc; the client sent a possibly stale `admin` field. | code + `client-unit.py` | **Fixed** (`writeUserDoc`: `update()`, explicit `FieldValue.delete()`, never sends `admin`) |
| 10 | Low | `level` undefined in `renderNorskproveTask` (ReferenceError on save/AI check). | code | **Fixed** |
| 11 | Low | Cloze/Order tests crashed on empty question sets (e.g. Dutch `welkom`); Order also on words without example. | audit | **Fixed** |
| 12 | Low | Service worker: cache name from `Date.now()` re-evaluated on every SW start (cache leak), no offline fallback for deep links, 9 scripts missing from the shell. | code | **Fixed** |
| 13 | Low | Unguarded `localStorage.setItem` (quota / private mode) threw out of `updateState()`. | `client-unit.py` | **Fixed** |
| 14 | Low | `initFirebase` retried forever. | code | **Fixed** (≈15 s cap) |
| 15 | Low | `_headers`: stale second Worker host in CSP `connect-src` (and an account name); no `no-cache` for `sw.js`/`index.html`. | file | **Fixed** (+ `upgrade-insecure-requests`, COOP) |

## Not changed – needs a decision or action outside the code

1. **Deploy order.** The client works with the old *and* the new Worker. Publish `firestore.rules` only after running `security-tests/firestore.rules.test.mjs` in the emulator (it was **not** run here). Bind `RATE_KV` on the Worker: without it there is still **no** rate limit (the Worker logs a warning). Decide `AUTH_MODE=required` if guests should not use AI.
2. **Firebase console:** enable App Check, email-enumeration protection and a password policy; restrict the browser API key to `fjordlp.com` referrers and the needed APIs; set budget alerts/quotas on the Gemini key.
3. **CSP still allows `'unsafe-inline'`** (inline `onclick=` handlers and inline scripts). It is the main remaining reason an XSS would not be contained. Removing it means moving handlers to `addEventListener` – a larger refactor.
4. **No Subresource Integrity** on the Firebase SDK scripts from `gstatic.com` (hashes cannot be computed offline). Pin versions and add `integrity=`, or self-host.
5. **Tournament / leaderboard scores are computed in the browser.** Rules now validate type and range and allow one attempt, but a determined player can still submit any score from 0 to total.
6. **Sign-up race** (Firebase auto-login vs. the "registered, please log in" flow) and the first-login `onAuthStateChanged` double navigation were not changed.
7. No account-deletion / data-export feature yet (GDPR).
