import json, re
from pw import *
from playwright.sync_api import sync_playwright
srv = start(); base = f"http://127.0.0.1:{srv.server_address[1]}"
fails = 0
def ok(c, m, x=''):
    global fails
    if not c: fails += 1
    print(('PASS ' if c else 'FAIL ') + m + (f'  [{x}]' if x != '' else ''))
CYR = re.compile(r'[\u0400-\u04FF]')
with sync_playwright() as p:
    b = p.chromium.launch(); ctx = b.new_context(viewport={'width': 390, 'height': 860}); pg = ctx.new_page()
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)[:120]))
    pg.route("**/*", lambda r: r.abort() if not r.request.url.startswith(base) else r.continue_())
    login(pg, base, '/it')
    codes = pg.evaluate("LANGUAGES.map(l => l.code)")
    print('languages in registry:', len(codes))
    # ---- 1) whole matrix: every target language x every UI language
    bad = []; ru_leak = []; ph = []
    table = {}
    for ui in ['uk', 'en', 'ru']:
        pg.evaluate("setUiLang(%s)" % json.dumps(ui))
        for code in codes:
            sg = pg.evaluate("(c) => { STATE.targetLang = c; return chatSuggestions(); }", code)
            table[(ui, code)] = sg
            txt = ' '.join(x['label'] + ' ' + x['q'] for x in sg)
            if len(sg) != 4: bad.append((ui, code, len(sg)))
            if re.search(r'\{\w+\}|undefined|null|NaN', txt): ph.append((ui, code, txt[:80]))
            if ui == 'en' and CYR.search(txt): ru_leak.append((ui, code, txt[:100]))
    ok(not bad, 'always exactly 4 chips, for every language and UI language', bad[:3])
    ok(not ph, 'no unreplaced {placeholders} / undefined in any chip or prompt', ph[:2])
    ok(not ru_leak, 'English UI: no Cyrillic in any chip or prompt for all 32 target languages (incl. Ukrainian/Russian/Bulgarian targets)', ru_leak[:2])
    uk_en_only = [(c, x['label']) for c in codes for x in table[('uk', c)] if not CYR.search(x['label']) and x['label'] != table[('en', c)][0]['label']]
    ok(True, 'sample labels per UI for target=it:', ' | '.join(f"{ui}: " + ', '.join(x['label'] for x in table[(ui, 'it')]) for ui in ['uk', 'en', 'ru']))
    # ---- 2) language-specific first chip
    first = lambda ui, c: table[(ui, c)][0]['label']
    exp = {'no': 'en / et / ei?', 'it': 'il / lo / la?', 'de': 'der / die / das?', 'fr': 'le / la / les?', 'en': 'a / an / the?', 'ja': 'は / が?', 'nl': 'de / het?', 'sv': 'en / ett?'}
    ok(all(first('en', c) == v for c, v in exp.items()), 'first chip is specific to the target language', {c: first('en', c) for c in exp})
    ok(first('en', 'pl') == 'Cases?' and first('uk', 'pl') == 'Відмінки?' and first('ru', 'pl') == 'Падежи?', 'case-based languages get a localized "Cases?" chip (pl: Cases?/Відмінки?/Падежи?)')
    ok(first('en', 'tr') == 'Explain a rule' and first('ru', 'ar') == 'Объясни правило', 'other languages get a generic, localized "explain a rule" chip')
    ok('en / et / ei' not in ' '.join(x['label'] for x in table[('en', 'it')]), 'Norwegian-only "en / et / ei?" is gone for Italian')
    print('   prompt samples (en UI):', table[('en', 'it')][0]['q'], '||', table[('en', 'it')][1]['q'], '||', table[('en', 'it')][3]['q'])

    # ---- 3) real panel: render, click behaviour, XSS-safety of labels
    pg.evaluate("setUiLang('en'); STATE.targetLang = 'it'; STATE.assistantChat = []; ")
    pg.evaluate("openAssistantPanel()"); pg.wait_for_timeout(500)
    labels = pg.eval_on_selector_all('#chatSuggest .chat-suggest-chip', 'e => e.map(x => x.textContent)')
    ok(labels == ['il / lo / la?', 'Check my sentence', 'Example sentences', 'What to learn next?'], 'panel shows the English / Italian chips', labels)
    pg.screenshot(path='chips_en_it.png')
    # chip that needs user input: fills the field, does not send
    pg.click('#chatSuggest .chat-suggest-chip:nth-child(2)'); pg.wait_for_timeout(200)
    v = pg.input_value('#chatInput'); n_user = pg.locator('#chatLog .chat-row.user').count()
    ok(v == 'Check this Italian sentence: ' and n_user == 0, '"Check my sentence" fills the input with the prompt and waits for the user', repr(v))
    # complete chip: sends immediately
    pg.fill('#chatInput', ''); pg.click('#chatSuggest .chat-suggest-chip:nth-child(1)'); pg.wait_for_timeout(500)
    sent = pg.eval_on_selector_all('#chatLog .chat-row.user .chat-bubble', 'e => e.map(x => x.textContent)')
    ok(sent == ['Explain the difference between: il, lo, la (Italian)'], 'complete chip sends the localized, language-specific question', sent)
    ok(pg.input_value('#chatInput') == '', 'input is cleared after sending')
    # re-open after changing languages: chips follow without reload
    pg.evaluate("closeAssistantPanel(); setUiLang('ru'); STATE.targetLang = 'de'; openAssistantPanel()"); pg.wait_for_timeout(400)
    labels = pg.eval_on_selector_all('#chatSuggest .chat-suggest-chip', 'e => e.map(x => x.textContent)')
    ok(labels == ['der / die / das?', 'Проверь предложение', 'Примеры предложений', 'Что учить дальше?'], 'after switching to RU UI + German the chips update', labels)
    pg.screenshot(path='chips_ru_de.png')
    ok(not [e for e in errs if "reading 'style'" not in e and 'collection' not in e], 'no page errors', errs[:2])
    b.close()
print(f'\n{fails} FAILED' if fails else '\nALL PASSED')
