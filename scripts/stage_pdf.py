#!/usr/bin/env python3
"""Verify the historical PDF edition and copy identical bytes into the Pages artifact."""
from __future__ import annotations
import hashlib
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
edition = json.loads((ROOT / "pdf/edition.json").read_text(encoding="utf-8"))
original = ROOT / edition["pdf_path"]
assert original.is_file(), f"PDF missing: {original}"
raw = original.read_bytes()
assert raw[:5] == b"%PDF-", "Invalid PDF header"
assert len(raw) == edition["bytes"], "PDF edition byte count differs"
digest = hashlib.sha256(raw).hexdigest()
assert digest == edition["sha256"], f"PDF edition hash differs: {digest}"
target = ROOT / "site/downloads" / original.name
target.parent.mkdir(parents=True, exist_ok=True)
shutil.copyfile(original, target)
assert hashlib.sha256(target.read_bytes()).hexdigest() == digest
print(f"PDF stage verified: {len(raw)} bytes SHA-256={digest}; historical edition {edition['date']}")
