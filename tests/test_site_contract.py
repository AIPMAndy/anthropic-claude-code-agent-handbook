"""SEO and publication contract for the independently authored website."""
import hashlib
import json
import unittest
from html.parser import HTMLParser
from pathlib import Path
from xml.etree import ElementTree

ROOT=Path(__file__).resolve().parents[1]
SITE=ROOT/"site"
BASE="https://aipmandy.github.io/anthropic-claude-code-agent-handbook/"

class Metadata(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonical=[]
        self.h1=0
        self.json_ld=[]
        self.in_script=False
        self.script_parts=[]
        self.ids=set()
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=="h1": self.h1+=1
        if "id" in a: self.ids.add(a["id"])
        if tag=="link" and a.get("rel")=="canonical": self.canonical.append(a.get("href"))
        if tag=="script" and a.get("type")=="application/ld+json":
            self.in_script=True
            self.script_parts=[]
    def handle_data(self, data):
        if self.in_script: self.script_parts.append(data)
    def handle_endtag(self, tag):
        if tag=="script" and self.in_script:
            self.json_ld.append(json.loads("".join(self.script_parts)))
            self.in_script=False

class SiteContractTests(unittest.TestCase):
    def test_both_pages_have_unique_canonical_and_h1(self):
        for path,url in [("index.html",BASE),("study.html",BASE+"study.html")]:
            with self.subTest(path=path):
                p=Metadata()
                p.feed((SITE/path).read_text(encoding="utf-8"))
                self.assertEqual(p.canonical,[url])
                self.assertEqual(p.h1,1)
                self.assertTrue(p.json_ld)
                self.assertIn("main",p.ids)
    def test_study_article_source_and_author(self):
        p=Metadata()
        p.feed((SITE/"study.html").read_text(encoding="utf-8"))
        article=p.json_ld[0]
        self.assertEqual(article["@type"],"Article")
        self.assertEqual(article["mainEntityOfPage"],BASE+"study.html")
        self.assertEqual(article["author"]["url"],"https://metaver.vip/")
        self.assertTrue(article["isBasedOn"])
    def test_source_controls_and_pdf_link(self):
        html=(SITE/"index.html").read_text(encoding="utf-8")
        for key in ('id="reset-sources"','id="export-sources"','src="source-audit.js"',
                    'downloads/anthropic-claude-code-agent-handbook-guide.pdf'):
            self.assertIn(key,html)
    def test_sitemap_is_accurate(self):
        root=ElementTree.fromstring((SITE/"sitemap.xml").read_text(encoding="utf-8"))
        urls=[e.text for e in root.iter() if e.tag.endswith("}loc")]
        self.assertEqual(urls,[BASE,BASE+"study.html"])
    def test_pdf_archive_has_matching_edition(self):
        edition=json.loads((ROOT/"pdf/edition.json").read_text(encoding="utf-8"))
        data=(ROOT/edition["pdf_path"]).read_bytes()
        self.assertEqual(len(data),edition["bytes"])
        self.assertEqual(hashlib.sha256(data).hexdigest(),edition["sha256"])

if __name__=="__main__":
    unittest.main()
