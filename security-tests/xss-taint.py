"""Dynamic XSS taint test: poison every untrusted data source, visit every route, record which fields execute script."""
import json, os, re, sys
from pw import *
from playwright.sync_api import sync_playwright
LANG = os.environ.get('TLANG', 'tr')          # tr = no built-in data -> AI-generated (generatedVocab) path
ROUTES_SLICE = os.environ.get('SLICE', '')     # e.g. "0:20"
srv = start(); base = f"http://127.0.0.1:{srv.server_address[1]}"

PAYLOAD_JS = r"""
window.__hits = {};
window.__xss = (tag) => { (window.__hits[tag] = window.__hits[tag] || []).push(window.ROUTE_NOW || ''); };
const P = (tag) => `"'><img src=x onerror="__xss('${tag}')">`;
window.P = P;
const KEEP = new Set(['level', 'lang', 'id', 'login']);
window.poisonDeep = function poisonDeep(o, tag) {
  if (typeof o === 'string') return P(tag);
  if (Array.isArray(o)) return o.map((x, i) => poisonDeep(x, tag + '[' + i + ']'));
  if (o && typeof o === 'object') { const r = {}; for (const k of Object.keys(o)) r[k] = KEEP.has(k) ? o[k] : poisonDeep(o[k], tag + '.' + k); return r; }
  return o;
};
"""

STUB_JS = r"""
(() => {
  const ARR = new Set(['words','topics','items','pages','chapters','sentences','questions','options','examples','letters','tasks','blocks','rows','list','entries','lessons','participants','vocab','grammar','cards']);
  const NUM = new Set(['xp','streak','score','count','total','correct','points','leaderboardScore','order','index','size','number','duration','max','min','limit','timeLimit','stars','level_num']);
  const mkDoc = (coll, id, depth = 0) => new Proxy({}, {
    get(_, p) {
      if (typeof p !== 'string') return undefined;
      if (p === 'then') return undefined;
      if (p === 'level') return window.__POISON_LEVEL ? P(`FS:${coll}.level`) : 'A1'; if (p === 'lang') return window.__LANG;
      if (p === 'admin') return false;
      if (NUM.has(p)) return 5;
      if (/(At|Date|Time|date|time)$/.test(p)) return { toDate: () => new Date(), seconds: 1, toMillis: () => Date.now() };
      if (ARR.has(p) && depth < 2) return [0, 1, 2].map(i => mkDoc(coll, id + 'i' + i, depth + 1));
      return P(`FS:${coll}.${p}`);
    },
    has: () => true,
    ownKeys: () => ['name','email','title','description','word','no','uk','en','ru','text','author','topic','note','desc','question','answer','t','ex_no','ex_uk','en_ex','ru_ex'],
    getOwnPropertyDescriptor: (t, p) => ({ enumerable: true, configurable: true, writable: true, value: undefined }),
  });
  const snapDoc = (coll, id) => ({ id, exists: true, data: () => mkDoc(coll, id), ref: null, get: (f) => mkDoc(coll, id)[f] });
  const mkSnap = (coll) => { const docs = [0, 1, 2].map(i => snapDoc(coll, 'D' + i)); return { empty: false, size: 3, docs, forEach: (fn) => docs.forEach(fn), docChanges: () => [] }; };
  const Q = (coll) => new Proxy(function () {}, {
    get(_, p) {
      if (p === 'get') return async () => mkSnap(coll);
      if (p === 'doc') return (id) => D(coll, id || 'D0');
      if (p === 'onSnapshot') return (cb) => { setTimeout(() => cb(mkSnap(coll)), 0); return () => {}; };
      if (p === 'add') return async () => ({ id: 'NEW' });
      if (p === 'then') return undefined;
      return () => Q(coll);       // where / orderBy / limit / startAfter ... chain
    },
  });
  const D = (coll, id) => new Proxy({}, {
    get(_, p) {
      if (p === 'get') return async () => snapDoc(coll, id);
      if (p === 'collection') return (name) => Q(coll + '/' + name);
      if (p === 'set' || p === 'update' || p === 'delete') return async () => undefined;
      if (p === 'onSnapshot') return (cb) => { setTimeout(() => cb(snapDoc(coll, id)), 0); return () => {}; };
      if (p === 'id') return id;
      if (p === 'then') return undefined;
      return undefined;
    },
  });
  const db = { collection: (n) => Q(n), batch: () => ({ set() {}, update() {}, delete() {}, commit: async () => {} }), runTransaction: async (fn) => fn({ get: async () => snapDoc('t', 't'), set() {}, update() {} }) };
  window.firebase = window.firebase || {};
  window.firebase.firestore = Object.assign(() => db, { FieldValue: { serverTimestamp: () => 0, increment: n => n, delete: () => null, arrayUnion: (...a) => a, arrayRemove: (...a) => a }, Timestamp: { now: () => ({ toDate: () => new Date() }), fromDate: d => d } });
  window.firebase.auth = () => ({ currentUser: { uid: 'U1', email: 'a@b.c', getIdToken: async () => 'tok' } });
  (0, eval)('firebaseDb = window.firebase.firestore(); firebaseReady = true;');
})();
"""

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={'width': 1200, 'height': 900}); pg = ctx.new_page()
    errors = []
    pg.on('pageerror', lambda e: errors.append(str(e)[:140]))
    pg.on('dialog', lambda d: d.dismiss())
    pg.route("**/*", lambda r: r.abort() if not r.request.url.startswith(base) else r.continue_())
    pg.add_init_script(PAYLOAD_JS)
    # empty guest first; the poisoned state is injected after login (so ensureStateDefaults/migrations cannot drop it)
    g = dict(GUEST); g.update(uiLang='en', targetLang=LANG, admin=True, langData={LANG: {'xp': 120}})
    pg.add_init_script("localStorage.setItem('fjord_guest', %s); localStorage.setItem('fjord_entry_done','1'); localStorage.setItem('fjord_ui_lang','en');" % json.dumps(json.dumps(g)))
    pg.goto(base + '/' + LANG); pg.wait_for_selector('#guestBtn', state='attached'); pg.evaluate("document.getElementById('guestBtn').click()")
    pg.wait_for_selector('#app.active'); pg.wait_for_timeout(500)
    pg.evaluate("window.__LANG = %s; window.__POISON_LEVEL = %s" % (json.dumps(LANG), 'true' if os.environ.get('LEVEL_POISON') else 'false')); pg.evaluate(STUB_JS)

    # ---- poison every client-side source, shaped like real data
    pg.evaluate("""(LANG) => {
      const word = (VOCAB.A1 && VOCAB.A1[0]) || { no: 'x', uk: 'x', en: 'x', ru: 'x', ex_no: 'x', ex_uk: 'x', t: 'x', level: 'A1' };
      const mk = (n, tag) => Array.from({ length: n }, (_, i) => Object.assign(poisonDeep(word, tag + i), { level: 'A1', lang: LANG }));
      STATE.name = P('STATE.name');
      STATE.generatedVocab = { [LANG]: { A1: mk(40, 'gen.vocab.'), A2: mk(10, 'gen.vocab2.') } };
      LD().customWords = mk(8, 'custom.word.');
      const g0 = (typeof GRAMMAR !== 'undefined' && GRAMMAR.A1 && GRAMMAR.A1[0]) || (typeof GRAMMAR !== 'undefined' && GRAMMAR[0]) || { title: 'x', rule: 'x', examples: ['a'] };
      STATE.generatedGrammar = { [LANG]: { A1: [0, 1, 2].map(i => Object.assign(poisonDeep(g0, 'gen.grammar.' + i), { level: 'A1' })) } };
      STATE.wordTranslations = { en: { a: P('wordTranslations') } };
      STATE.assistantChat = [{ role: 'user', content: P('chat.user'), text: P('chat.user.text') }, { role: 'assistant', content: P('chat.ai'), text: P('chat.ai.text') }];
      STATE.customNorskTasks = { A1: [poisonDeep({ title: 't', text: 't', prompt: 't', question: 't', answer: 't' }, 'norskTask')] };
      updateState();
    }""", LANG)

    routes = pg.evaluate("[...renderView.toString().matchAll(/case '([\\w-]+)'/g)].map(m => m[1])")
    if ROUTES_SLICE:
        a, c = ROUTES_SLICE.split(':'); routes = routes[int(a):int(c)]
    print(f'target={LANG}  routes ({len(routes)}):', ' '.join(routes))
    CLICKABLE = "#mainContent button:visible, #mainContent [onclick]:visible, #mainContent .card:visible, #mainContent a:visible, #mainContent summary:visible"
    for route in routes:
        pg.evaluate("(()=>{const id=setTimeout(()=>{},0);for(let i=0;i<=id;i++)clearTimeout(i);})()")
        pg.evaluate("window.ROUTE_NOW = %s; try { navigate(%s) } catch (e) { }" % (json.dumps(route), json.dumps(route))); pg.wait_for_timeout(500)
        n = min(pg.locator(CLICKABLE).count(), 7)
        for k in range(n):
            pg.evaluate("(()=>{const id=setTimeout(()=>{},0);for(let i=0;i<=id;i++)clearTimeout(i);})()")
            pg.evaluate("try { navigate(%s) } catch (e) { }" % json.dumps(route)); pg.wait_for_timeout(250)
            try:
                el = pg.locator(CLICKABLE).nth(k)
                if el.count(): el.click(timeout=1200, force=True)
            except Exception: pass
            pg.wait_for_timeout(250)
    hits = pg.evaluate("window.__hits")
    print('\nEXECUTED PAYLOADS (field -> routes where it fired):')
    for tag, rts in sorted(hits.items()): print(f'  {tag:44} {sorted(set(rts))}')
    if not hits: print('  none')
    print('\npage errors (unique, first 6):', sorted(set(e for e in errors if "reading 'style'" not in e))[:6])
    b.close()
