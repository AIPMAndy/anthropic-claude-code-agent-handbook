#!/usr/bin/env python3
"""Post-deploy verification against the public GitHub Pages bytes (not the Actions artifact)."""
from __future__ import annotations
import hashlib
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "site"
BASE = "https://aipmandy.github.io/anthropic-claude-code-agent-handbook/"
FILES = (
    "index.html", "study.html", "app.js", "data.js", "source-audit.js",
    "style.css", "robots.txt", "sitemap.xml",
    "downloads/anthropic-claude-code-agent-handbook-guide.pdf",
)

def get(url: str) -> tuple[int, bytes]:
    req = urllib.request.Request(url, headers={"User-Agent": "AgentAtlas-LiveVerify/1.0"})
    with urllib.request.urlopen(req, timeout=30) as response:
        return response.status, response.read()

def verify() -> None:
    expected = {name: hashlib.sha256((SITE / name).read_bytes()).hexdigest() for name in FILES}
    pending = dict(expected)
    # Cache propagation can lag a successful deploy; only accept actual matching bytes.
    for attempt in range(12):
        remaining = {}
        for name, wanted in pending.items():
            try:
                status, body = get(BASE + name)
                actual = hashlib.sha256(body).hexdigest()
                if status == 200 and actual == wanted:
                    print(f"PASS {name}: HTTP {status} SHA-256 {actual}")
                else:
                    remaining[name] = f"HTTP {status} SHA {actual} != {wanted}"
            except (urllib.error.URLError, TimeoutError, OSError) as exc:
                remaining[name] = f"{type(exc).__name__}: {exc}"
        if not remaining:
            print(f"LIVE VERIFIED: {len(FILES)}/{len(FILES)} files, including historical PDF")
            return
        pending = {name: expected[name] for name in remaining}
        print(f"Attempt {attempt+1}/12 pending: {remaining}", flush=True)
        if attempt < 11:
            time.sleep(10)
    raise SystemExit(f"Live Pages mismatches: {sorted(pending)}")

if __name__ == "__main__":
    verify()
