#!/usr/bin/env python3
"""Render the canonical CV page to a print-optimised PDF.

The HTML page at /cv/ is the source of truth; this script only rasterises the
already-built page, so the PDF and the page can never disagree. Headless
Chrome is used because it honours the site's own @media print rules.

Usage:
    python3 scripts/make_pdf.py --site site [--chrome /path/to/chrome]

Exits 0 and skips the PDF (with a warning) when no Chrome binary is available,
so the build never hard-fails in an environment without a browser.
"""
from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys
import tempfile
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

CANDIDATES = [
    "google-chrome",
    "google-chrome-stable",
    "chromium",
    "chromium-browser",
    "/opt/data/.local/bin/google-chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
]


def find_chrome() -> str | None:
    for c in CANDIDATES:
        if os.path.sep in c:
            if Path(c).exists() and os.access(c, os.X_OK):
                return c
        else:
            found = shutil.which(c)
            if found:
                return found
    return None


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--site", default="site")
    ap.add_argument("--chrome", default="")
    ap.add_argument("--page", default="cv", help="slug of the page to render")
    ap.add_argument("--out", default="", help="output path (default <site>/<page>.pdf)")
    args = ap.parse_args()

    site = Path(args.site).resolve()
    src = site / args.page / "index.html"
    if not src.exists():
        print(f"[pdf] {src} not found — skipping", file=sys.stderr)
        return 0

    chrome = args.chrome or find_chrome()
    if not chrome:
        print("[pdf] no Chrome/Chromium binary found — skipping PDF generation", file=sys.stderr)
        return 0

    out = Path(args.out) if args.out else site / f"{args.page}.pdf"
    out.parent.mkdir(parents=True, exist_ok=True)

    # The site uses root-absolute asset paths (/assets/style.css), which do not
    # resolve under file://. Serve the build over a throwaway local HTTP server
    # so the page renders exactly as it will in production.
    handler = partial(SimpleHTTPRequestHandler, directory=str(site))
    handler.log_message = lambda *a, **k: None  # type: ignore[assignment]
    httpd = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    port = httpd.server_address[1]
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    url = f"http://127.0.0.1:{port}/{args.page}/"

    try:
        with tempfile.TemporaryDirectory() as profile:
            cmd = [
                chrome,
                "--headless",
                "--disable-gpu",
                "--no-sandbox",
                "--no-pdf-header-footer",
                "--run-all-compositor-stages-before-draw",
                "--virtual-time-budget=4000",
                f"--user-data-dir={profile}",
                f"--print-to-pdf={out}",
                url,
            ]
            proc = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
    finally:
        httpd.shutdown()
        httpd.server_close()

    if not out.exists() or out.stat().st_size < 2000:
        print("[pdf] PDF generation failed", file=sys.stderr)
        print(proc.stderr[-1500:], file=sys.stderr)
        return 1

    print(f"  {args.page}.pdf -> {out} ({out.stat().st_size} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
