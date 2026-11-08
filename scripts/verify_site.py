#!/usr/bin/env python3
"""
verify_site.py — pre-publish gate for the static site.

Checks the built site/ directory for everything that must be true before the
site goes live: internal links resolve, every page in the sitemap exists,
markdown twins exist for every page, llms.txt links are valid, JSON-LD parses,
and the core on-page SEO elements are present.

Exit codes:
  0 = all checks passed
  1 = one or more failures (CI blocks the deploy)
  2 = usage error (missing directory)

Usage:
    python3 scripts/verify_site.py [--site site] [--base-url URL] [--strict]
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

HREF_RE = re.compile(r'href="([^"]+)"')
SRC_RE = re.compile(r'src="([^"]+)"')
JSONLD_RE = re.compile(
    r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', re.S | re.I
)

IGNORED_PREFIXES = ("http://", "https://", "mailto:", "tel:", "#", "data:", "javascript:")


class Checker:
    def __init__(self) -> None:
        self.errors: list[str] = []
        self.warnings: list[str] = []
        self.passes: list[str] = []

    def ok(self, msg: str) -> None:
        self.passes.append(msg)

    def warn(self, msg: str) -> None:
        self.warnings.append(msg)

    def error(self, msg: str) -> None:
        self.errors.append(msg)


def local_targets(site: Path, url: str) -> list[Path]:
    """Resolve a site-absolute or relative URL to candidate files on disk."""
    if url.startswith(IGNORED_PREFIXES):
        return []
    url = url.split("#")[0].split("?")[0]
    if not url:
        return []
    if url.startswith("/"):
        rel = url.lstrip("/")
    else:
        rel = url
    candidates = []
    p = site / rel
    candidates.append(p)
    if rel.endswith("/"):
        candidates.append(site / rel / "index.html")
    if not rel.endswith((".html", ".md", ".xml", ".txt", ".json", ".css", ".js")):
        candidates.append(site / (rel + ".html"))
        candidates.append(site / rel / "index.html")
        candidates.append(site / (rel + ".md"))
    return candidates


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--site", default="site")
    ap.add_argument("--base-url", default="")
    ap.add_argument("--strict", action="store_true", help="treat warnings as failures")
    ap.add_argument("--policy", default="", help="path to crawler-policy.json (default content/crawler-policy.json)")
    args = ap.parse_args()

    site = Path(args.site)
    if not site.is_dir():
        print(f"ERROR: site directory not found: {site}", file=sys.stderr)
        return 2

    c = Checker()
    html_files = sorted(site.rglob("*.html"))
    if not html_files:
        c.error("no HTML files found in site/")
        return report(c)

    # ---------------------------------------------------------- per-page checks
    for f in html_files:
        rel = f.relative_to(site).as_posix()
        html = f.read_text(encoding="utf-8", errors="replace")

        if not re.search(r"<title[^>]*>.{10,}?</title>", html, re.I | re.S):
            c.error(f"{rel}: missing or empty <title>")
        if not re.search(r'<meta[^>]*name="description"[^>]*content="[^"]{20,}"', html, re.I):
            c.error(f"{rel}: missing or short meta description")
        if not re.search(r'<link[^>]*rel="canonical"', html, re.I):
            c.error(f"{rel}: missing canonical link")
        if len(re.findall(r"<h1\b", html, re.I)) != 1:
            c.error(f"{rel}: must have exactly one <h1>")
        if not re.search(r'<html[^>]*\blang="', html, re.I):
            c.error(f"{rel}: <html> missing lang attribute")

        # JSON-LD
        blocks = JSONLD_RE.findall(html)
        if not blocks:
            c.error(f"{rel}: no JSON-LD structured data")
        else:
            for b in blocks:
                try:
                    data = json.loads(b.strip())
                except json.JSONDecodeError as e:
                    c.error(f"{rel}: invalid JSON-LD ({e})")
                    continue
                if "@context" not in data:
                    c.error(f"{rel}: JSON-LD missing @context")
                if "@graph" not in data and "@type" not in data:
                    c.error(f"{rel}: JSON-LD missing @type/@graph")

        # images have alt
        for tag in re.findall(r"<img\b[^>]*>", html, re.I):
            if not re.search(r'\balt="[^"]+"', tag):
                c.error(f"{rel}: <img> without non-empty alt attribute")

        # internal links resolve
        for url in HREF_RE.findall(html) + SRC_RE.findall(html):
            if url.startswith(IGNORED_PREFIXES):
                continue
            cands = local_targets(site, url)
            if not cands:
                continue
            if not any(p.exists() for p in cands):
                c.error(f"{rel}: broken internal link -> {url}")

        # markdown twin
        if rel.endswith("/index.html"):
            slug = rel[: -len("/index.html")]
            twin = site / (slug + ".md")
            if not twin.exists():
                c.warn(f"{rel}: no markdown twin at {slug}.md")

    # ------------------------------------------------------------- sitemap.xml
    sm = site / "sitemap.xml"
    if not sm.exists():
        c.error("sitemap.xml is missing")
    else:
        locs = re.findall(r"<loc>(.*?)</loc>", sm.read_text(encoding="utf-8"))
        if not locs:
            c.error("sitemap.xml has no <loc> entries")
        for loc in locs:
            path = loc
            if args.base_url:
                path = path.replace(args.base_url.rstrip("/"), "")
            else:
                # strip scheme://host when no base-url was supplied
                path = re.sub(r"^https?://[^/]+", "", path)
            path = path.lstrip("/")
            cand = site / path
            if not cand.exists() and not (site / (path.rstrip("/") + "/index.html")).exists():
                c.error(f"sitemap.xml lists a URL that does not exist: {loc}")
        indexed_pages = [f for f in html_files if f.name != "404.html"]
        if len(locs) < len(indexed_pages):
            c.warn(f"sitemap.xml lists {len(locs)} URLs but there are {len(indexed_pages)} indexable HTML pages")
        c.ok(f"sitemap.xml: {len(locs)} URLs")

    # ---------------------------------------------------------------- llms.txt
    llms = site / "llms.txt"
    if not llms.exists():
        c.error("llms.txt is missing")
    else:
        text = llms.read_text(encoding="utf-8")
        if not text.startswith("#"):
            c.error("llms.txt should start with an H1 title line")
        if "## " not in text:
            c.error("llms.txt has no section headings")
        n_links = len(re.findall(r"\]\((https?://[^)]+)\)", text))
        if n_links < 3:
            c.error(f"llms.txt has only {n_links} links")
        for url in re.findall(r"\]\((https?://[^)]+)\)", text):
            path = re.sub(r"^https?://[^/]+", "", url).lstrip("/")
            path = path.split("#")[0].split("?")[0]
            if path and not (site / path).exists() and not (site / path / "index.html").exists():
                c.warn(f"llms.txt links to a path that does not exist: {url}")
        c.ok(f"llms.txt: {n_links} links")

    # -------------------------------------------------------------- robots.txt
    rb = site / "robots.txt"
    if not rb.exists():
        c.error("robots.txt is missing")
    else:
        text = rb.read_text(encoding="utf-8")
        if "Sitemap:" not in text:
            c.error("robots.txt has no Sitemap directive")
        if "User-agent:" not in text:
            c.error("robots.txt has no User-agent directives")
        c.ok("robots.txt: present with sitemap directive")

        # the deployed policy must match content/crawler-policy.json exactly
        policy_path = Path(args.policy) if args.policy else Path("content/crawler-policy.json")
        if policy_path.exists():
            policy = json.loads(policy_path.read_text(encoding="utf-8"))
            groups: dict[str, str] = {}
            current = None
            for line in text.splitlines():
                line = line.strip()
                if line.lower().startswith("user-agent:"):
                    current = line.split(":", 1)[1].strip()
                    groups.setdefault(current, "")
                elif line.lower().startswith(("allow:", "disallow:")) and current:
                    groups[current] = line.split(":", 1)[1].strip()
            for token in policy.get("allowed", []):
                if groups.get(token) != "/":
                    c.error(f"robots.txt: {token} must be 'Allow: /' (policy says allowed)")
            for token in policy.get("disallowed", []):
                if groups.get(token) != "/":
                    c.error(f"robots.txt: {token} must be 'Disallow: /' (policy says disallowed)")
            extra = set(groups) - set(policy.get("allowed", [])) - set(policy.get("disallowed", [])) - {"*"}
            if extra:
                c.error(f"robots.txt: tokens not in the policy file: {sorted(extra)}")
            c.ok(f"robots.txt: matches crawler-policy.json ({len(groups) - 1} AI tokens)")

            # every token in the policy must be documented on the policy page
            policy_page = site / "ai-crawler-policy" / "index.html"
            if policy_page.exists():
                page = policy_page.read_text(encoding="utf-8")
                for token in policy.get("allowed", []) + policy.get("disallowed", []):
                    if token not in page:
                        c.error(f"ai-crawler-policy page does not mention {token}")
                c.ok("ai-crawler-policy page documents every token in the policy file")

    # ------------------------------------------------------------ 404 + assets
    if not (site / "404.html").exists():
        c.warn("404.html is missing")
    assets = site / "assets"
    if not assets.is_dir() or not any(assets.iterdir()):
        c.error("assets/ directory is empty")
    else:
        c.ok(f"assets/: {len(list(assets.iterdir()))} file(s)")

    return report(c)


def report(c: Checker) -> int:
    for p in c.passes:
        print(f"  PASS  {p}")
    for w in c.warnings:
        print(f"  WARN  {w}")
    for e in c.errors:
        print(f"  FAIL  {e}")
    print(f"\n{len(c.passes)} passed, {len(c.warnings)} warnings, {len(c.errors)} failures")
    if c.errors:
        return 1
    if c.warnings and "--strict" in sys.argv:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
