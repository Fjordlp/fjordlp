import http.server, socketserver, threading, os, json, sys
ROOT = os.environ.get('SITE_ROOT', '/home/claude/site4')
class H(http.server.SimpleHTTPRequestHandler):
    def __init__(self,*a,**k): super().__init__(*a,directory=ROOT,**k)
    def do_GET(self):
        p = self.path.split('?')[0]
        f = os.path.join(ROOT, p.lstrip('/'))
        if not os.path.exists(f) or (os.path.isdir(f) and not os.path.exists(os.path.join(f,'index.html'))):
            self.path = '/index.html'
        return super().do_GET()
    def log_message(self,*a): pass
def start():
    srv = socketserver.ThreadingTCPServer(('127.0.0.1',0),H); srv.daemon_threads=True
    threading.Thread(target=srv.serve_forever,daemon=True).start(); return srv
GUEST = {"name":"Nazar","targetLang":"no","uiLang":"en","admin":False,"langData":{"no":{"xp":120}}}
def login(pg, base, path='/no', admin=False):
    g = dict(GUEST); g["admin"]=admin
    pg.add_init_script("localStorage.setItem('fjord_guest', %s); localStorage.setItem('fjord_entry_done','1'); localStorage.setItem('fjord_ui_lang','en');" % json.dumps(json.dumps(g)))
    pg.goto(base+path); pg.wait_for_selector('#guestBtn', state='attached'); pg.evaluate("document.getElementById('guestBtn').click()")
    pg.wait_for_selector('#app.active'); pg.wait_for_timeout(500)
