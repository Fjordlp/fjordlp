#!/usr/bin/env python3
"""
Pre-generates natural neural-voice MP3s for every vocab word and example
sentence, so the site no longer depends on a live TTS quota.

Setup (run on YOUR computer, needs internet):
    pip install edge-tts
    node tools/export_texts.js > tools/texts.json
    python tools/generate_audio.py              # all languages
    python tools/generate_audio.py de ru        # only some languages
    python tools/generate_audio.py --words-only # skip example sentences (smaller)

Output: audio/<lang>/<sha1(text)[:16]>.mp3  +  audio/manifest.json
Re-running skips files that already exist, so it is safe to resume/extend.
"""
import asyncio, hashlib, json, re, sys
from pathlib import Path

try:
    import edge_tts
except ImportError:
    sys.exit("Run: pip install edge-tts")

ROOT = Path(__file__).resolve().parent.parent
AUDIO = ROOT / "audio"
CONCURRENCY = 6

def voices():
    src = (ROOT / "js" / "languages.js").read_text(encoding="utf-8")
    return dict(re.findall(r"^\s*(\w+):\s*\{\s*edge:\s*'([^']+)'", src, re.M))

def h(text):  # must match audioHash() in js/troll.js
    return hashlib.sha1(text.strip().encode("utf-8")).hexdigest()[:16]

async def one(sem, text, voice, path, fails):
    async with sem:
        for attempt in range(3):
            try:
                await edge_tts.Communicate(text, voice, rate="-10%").save(str(path))
                return
            except Exception as e:
                await asyncio.sleep(1.5 * (attempt + 1))
        fails.append(text)

async def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    words_only = "--words-only" in sys.argv
    texts = json.loads((ROOT / "tools" / "texts.json").read_text(encoding="utf-8"))
    vmap = voices()
    manifest_path = AUDIO / "manifest.json"
    manifest = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
    sem, fails = asyncio.Semaphore(CONCURRENCY), []
    for lang, items in texts.items():
        if args and lang not in args: continue
        voice = vmap.get(lang)
        if not voice: print("no voice for", lang); continue
        if words_only: items = [t for t in items if len(t.split()) <= 3]
        (AUDIO / lang).mkdir(parents=True, exist_ok=True)
        jobs, hashes = [], set(manifest.get(lang, []))
        for t in items:
            p = AUDIO / lang / f"{h(t)}.mp3"
            hashes.add(h(t))
            if not p.exists(): jobs.append(one(sem, t, voice, p, fails))
        print(f"{lang}: {len(items)} texts, {len(jobs)} to generate ({voice})")
        await asyncio.gather(*jobs)
        manifest[lang] = sorted(x for x in hashes if (AUDIO / lang / f"{x}.mp3").exists())
        manifest_path.write_text(json.dumps(manifest))
    if fails: print("FAILED:", len(fails), "(re-run to retry)")

asyncio.run(main())
