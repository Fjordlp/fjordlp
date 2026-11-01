# security-tests

| File | Needs | What it proves | Status when written |
|---|---|---|---|
| `worker.test.mjs` | Node 20+ | token verification (forged/expired/tampered/`alg=none`), limits, CORS, body caps, no upstream-error leak, ord-api | 37/37 pass |
| `xss-taint.py` + `pw.py` | `pip install playwright && playwright install chromium` | poisons every untrusted data source (state, AI caches, Firestore docs) and visits every route; reports fields that execute script. `SITE_ROOT=.. TLANG=tr SLICE=0:22 LEVEL_POISON=1 python3 security-tests/xss-taint.py` (then `SLICE=22:60`) | 0 executions on 39 routes (15 before the fixes) |
| `client-unit.py` | same | `writeUserDoc`, localized non-enumerating auth errors, storage-quota safety | 15/15 pass |
| `firestore.rules.test.mjs` | Firebase emulator | rules: no self-promotion, field validation, one-shot tournament results | **not run** (no emulator in the authoring environment) |
