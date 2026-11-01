import json, os
from pw import *
from playwright.sync_api import sync_playwright
srv = start(); base = f"http://127.0.0.1:{srv.server_address[1]}"
fails = 0
def ok(c, m, x=''):
    global fails
    if not c: fails += 1
    print(('PASS ' if c else 'FAIL ') + m + (f'  [{x}]' if x != '' else ''))
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_context().new_page()
    pg.route("**/*", lambda r: r.abort() if not r.request.url.startswith(base) else r.continue_())
    login(pg, base, '/no')
    # --- writeUserDoc
    r = pg.evaluate("""async () => {
      window.firebase = { firestore: { FieldValue: { delete: () => '__DELETE__' } } };
      const log = [];
      const mk = (failFirst) => ({ update: async (d) => { log.push(['update', d]); if (failFirst) { const e = new Error('nf'); e.code = 'not-found'; throw e; } },
                                   set: async (d, o) => { log.push(['set', d, o || null]); } });
      const data = { name: 'N', admin: true, langData: { no: { xp: 1 } }, generatedVocab: { tr: 1 } };
      await writeUserDoc(mk(false), data);
      await writeUserDoc(mk(true), data);
      return log;
    }""")
    upd, upd2, setc = r[0], r[1], r[2]
    ok(upd[0] == 'update' and 'admin' not in upd[1], 'update payload never contains the admin field', list(upd[1].keys()))
    ok(all(upd[1][k] == '__DELETE__' for k in ['generatedVocab', 'generatedTasks', 'generatedGrammar', 'wordTranslations']), 'stale AI caches are deleted explicitly (FieldValue.delete)')
    ok(upd[1]['langData'] == {'no': {'xp': 1}}, 'langData replaced as a whole (no deep merge)')
    ok(setc[0] == 'set' and setc[2] is None and 'admin' not in setc[1] and 'generatedVocab' in setc[1], 'not-found -> first save uses plain set() (no merge) without admin', str(setc[2]))
    # --- localized, non-enumerating auth errors
    msgs = pg.evaluate("""() => { const out = {};
      for (const ui of ['uk', 'en', 'ru']) { setUiLang(ui);
        out[ui] = { wrong: authErrorMessage({code:'auth/wrong-password'}, 'login'), nouser: authErrorMessage({code:'auth/user-not-found'}, 'login'),
                    inv: authErrorMessage({code:'auth/invalid-credential'}, 'login'), weak: authErrorMessage({code:'auth/weak-password'}, 'register'),
                    many: authErrorMessage({code:'auth/too-many-requests'}, 'login'), raw: authErrorMessage({code:'x', message:'Firebase: Error (auth/zzz)'}, 'register') }; }
      return out; }""")
    for ui, m in msgs.items():
        ok(m['wrong'] == m['nouser'] == m['inv'], f'[{ui}] wrong password / unknown user / invalid credential give the SAME message (no enumeration)', m['wrong'])
        ok('Firebase' not in m['raw'] and 'auth/' not in m['raw'], f'[{ui}] raw Firebase text is never shown', m['raw'])
        ok(m['weak'] and m['many'] and m['weak'] != m['many'], f'[{ui}] weak-password and too-many-requests have their own messages')
    # --- lsSet survives QuotaExceeded and does not throw out of updateState
    r = pg.evaluate("""() => { const orig = Storage.prototype.setItem; Storage.prototype.setItem = function () { const e = new Error('quota'); e.name = 'QuotaExceededError'; throw e; };
      let threw = false; try { updateState(); saveGuestState(STATE); saveSession('guest', true); } catch (e) { threw = true; } Storage.prototype.setItem = orig; return threw; }""")
    ok(r is False, 'full localStorage (QuotaExceededError) no longer throws out of updateState()/saveGuestState()/saveSession()')
    src = open('' + os.environ.get('SITE_ROOT', '..') + '/js/auth.js', encoding='utf-8').read()
    ok('const password = passwordInput.value;' in src and 'passwordInput.value.trim()' not in src, 'auth.js no longer trims the password')
    b.close()
print(f'\n{fails} FAILED' if fails else '\nALL PASSED')
