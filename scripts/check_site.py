#!/usr/bin/env python3
"""Offline preflight checks for the independently curated static website."""
from __future__ import annotations
import json
import re
from pathlib import Path
from html.parser import HTMLParser

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "site"
ALLOWED = (
    "https://www.anthropic.com/",
    "https://claude.com/",
    "https://code.claude.com/",
    "https://github.com/anthropics/",
    "https://www-cdn.anthropic.com/",
    "https://resources.anthropic.com/",
)

class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.external = []
        self.local = []
    def handle_starttag(self, name, attrs):
        a = dict(attrs)
        if "id" in a:
            assert a["id"] not in self.ids, f"Duplicate HTML ID: {a['id']}"
            self.ids.add(a["id"])
        if name in ("script", "link") and (a.get("src") or (a.get("rel") == "stylesheet" and a.get("href"))):
            self.local.append(a.get("src") or a.get("href"))
        if name == "a" and a.get("href", "").startswith("http"):
            self.external.append(a["href"])

def main():
    html = (SITE / "index.html").read_text(encoding="utf-8")
    data_js = (SITE / "data.js").read_text(encoding="utf-8")
    app_js = (SITE / "app.js").read_text(encoding="utf-8")
    prefix = "window.ANTHROPIC_LIBRARY = "
    assert prefix in data_js, "Catalog missing"
    payload = data_js.split(prefix, 1)[1].rsplit(";", 1)[0]
    catalog = json.loads(payload)
    assert len(catalog) >= 100, f"Expected >=100 curated links, got {len(catalog)}"
    assert len({r["id"] for r in catalog}) == len(catalog), "Duplicate IDs"
    urls = set()
    for r in catalog:
        assert r["title"] and r["description"] and r["topic"], r
        assert any(r["url"].startswith(host) for host in ALLOWED), r["url"]
        assert r["url"] not in urls, f"Duplicate source URL: {r['url']}"
        urls.add(r["url"])
    p = Parser()
    p.feed(html)
    for asset in p.local:
        assert (SITE / asset).is_file(), f"Site references missing file: {asset}"
    for target in ("teams", "methods", "paths", "sources", "practice", "contact"):
        assert target in p.ids, f"Missing anchor: {target}"
    for value in ("AIPMAndy", "https://metaver.vip/", "https://www.a6no1.cn/"):
        assert value in html, f"Missing author contact: {value}"
    for term in ("非 Anthropic 官方网站", "不是 Anthropic 内部 Prompt", "虚构广告"):
        assert term in html or term in app_js, f"Missing disclosure: {term}"
    assert app_js.count('["0') >= 6, "Case list missing"
    assert "window.ANTHROPIC_LIBRARY" in app_js
    print(f"PASS: {len(catalog)} sources, {len(p.ids)} HTML IDs, author CTAs and disclosure checks")

if __name__ == "__main__":
    main()
