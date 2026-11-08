#!/usr/bin/env python3
"""
GEO / AEO content linter for the Ivan Weiss van der Pol site.

Checks each long-form guide against the techniques that the GEO literature
(arXiv:2311.09735, KDD'24) and Google's own AI-features guidance actually
correlate with being retrieved, quoted and cited by generative engines.

It is a heuristic linter, not an oracle: it scores *craft* signals, not rankings.
Treat the output as a pre-publication checklist.

Usage:
    python3 scripts/geo_lint.py                 # lint every page in site/
    python3 scripts/geo_lint.py site/writing/ai-search-optimization/index.html
    python3 scripts/geo_lint.py --json

Exit code 1 if any file has a FAIL on a hard gate (so CI can block a bad merge).
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

# ---------------------------------------------------------------- extraction

TAG_RE = re.compile(r"<[^>]+>")
SCRIPT_STYLE_RE = re.compile(r"<(script|style)\b.*?</\1>", re.I | re.S)
H1_RE = re.compile(r"<h1\b[^>]*>(.*?)</h1>", re.I | re.S)
H2_RE = re.compile(r"<h2\b[^>]*>(.*?)</h2>", re.I | re.S)
LINK_RE = re.compile(r'<a\b[^>]*href="([^"]+)"', re.I)
HREF_RE = re.compile(r'<a\b[^>]*href="(https?://[^"]+)"', re.I)
IMG_RE = re.compile(r"<img\b[^>]*>", re.I)
META_RE = re.compile(r"<meta\b[^>]*>", re.I)
LINK_TAG_RE = re.compile(r"<link\b[^>]*>", re.I)
JSONLD_RE = re.compile(
    r'<script\b[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', re.I | re.S
)

STAT_RE = re.compile(
    r"(?:\b\d+(?:[.,]\d+)?\s?(?:%|percent|x\b|ms\b|s\b|kb\b|mb\b|gb\b|k\b|m\b|b\b)"
    r"|\b\d{4}\b"
    r"|\b(?:up to|about|roughly|around|more than|fewer than|at least|upward of)\s+\d+"
    r"|\b\d+(?:[.,]\d+)?\s*(?:times|×)\b)",
    re.I,
)
CITATION_RE = re.compile(
    r"\[(?P<text>[^\]]{2,120}?)\]\((?P<href>https?://[^)]+)\)", re.I
)
BARE_URL_RE = re.compile(r"https?://[^\s<>\"]+")
DATE_RE = re.compile(r"\b(?:19|20)\d{2}\b")
QUESTION_H_RE = re.compile(r"<h[23]\b[^>]*>\s*(?:what|why|how|when|where|which|who|can|does|is|are|should)\b", re.I)
TABLE_RE = re.compile(r"<table\b", re.I)
UL_RE = re.compile(r"<ul\b", re.I)
OL_RE = re.compile(r"<ol\b", re.I)
DL_RE = re.compile(r"<dl\b", re.I)
CODE_RE = re.compile(r"<pre\b|<code\b", re.I)
BLOCKQUOTE_RE = re.compile(r"<blockquote\b", re.I)


@dataclass
class Finding:
    level: str          # FAIL | WARN | INFO | PASS
    rule: str
    detail: str


@dataclass
class Report:
    path: str
    findings: list[Finding] = field(default_factory=list)

    @property
    def fails(self) -> int:
        return sum(1 for f in self.findings if f.level == "FAIL")

    @property
    def warns(self) -> int:
        return sum(1 for f in self.findings if f.level == "WARN")

    def add(self, level: str, rule: str, detail: str) -> None:
        self.findings.append(Finding(level, rule, detail))


def html_to_text(html: str) -> str:
    html = SCRIPT_STYLE_RE.sub(" ", html)
    text = TAG_RE.sub(" ", html)
    text = text.replace("&amp;", "&").replace("&nbsp;", " ").replace("&lt;", "<").replace("&gt;", ">")
    text = text.replace("&quot;", '"').replace("&#39;", "'")
    return re.sub(r"\s+", " ", text).strip()


def visible_text_after_h1(html: str) -> str:
    """Text of the first ~2 paragraphs after the H1 (the answer-first zone)."""
    body = html
    m = H1_RE.search(body)
    if m:
        body = body[m.end():]
    paras = re.findall(r"<p\b[^>]*>(.*?)</p>", body, re.I | re.S)
    out = []
    for p in paras[:3]:
        t = html_to_text(p)
        if t:
            out.append(t)
        if sum(len(x) for x in out) > 700:
            break
    return " ".join(out)


# ------------------------------------------------------------------- checks


def lint_html(path: Path) -> Report:
    rep = Report(str(path))
    html = path.read_text(encoding="utf-8", errors="replace")
    text = html_to_text(html)
    words = len(text.split())

    # ---- classic SEO hard gates ------------------------------------------
    title = re.search(r"<title[^>]*>(.*?)</title>", html, re.I | re.S)
    if not title:
        rep.add("FAIL", "seo/title-missing", "no <title> element")
    else:
        t = html_to_text(title.group(1))
        if not (20 <= len(t) <= 70):
            rep.add("FAIL", "seo/title-length", f"title is {len(t)} chars (want 20-70)")
        else:
            rep.add("PASS", "seo/title-length", f"{len(t)} chars")

    desc = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\'](.*?)["\']', html, re.I | re.S)
    if not desc:
        rep.add("FAIL", "seo/meta-description", "no meta description")
    else:
        d = html_to_text(desc.group(1))
        if not (70 <= len(d) <= 165):
            rep.add("FAIL", "seo/meta-description-length", f"description is {len(d)} chars (want 70-165)")
        else:
            rep.add("PASS", "seo/meta-description-length", f"{len(d)} chars")

    if not re.search(r'<link[^>]*rel=["\']canonical["\']', html, re.I):
        rep.add("FAIL", "seo/canonical", "no rel=canonical link")
    else:
        rep.add("PASS", "seo/canonical", "canonical present")

    h1s = H1_RE.findall(html)
    if len(h1s) != 1:
        rep.add("FAIL", "seo/single-h1", f"found {len(h1s)} <h1> elements (want exactly 1)")
    else:
        rep.add("PASS", "seo/single-h1", html_to_text(h1s[0])[:80])

    if not re.search(r'<html[^>]*\blang=["\']', html, re.I):
        rep.add("FAIL", "a11y/lang", "no lang attribute on <html>")
    else:
        rep.add("PASS", "a11y/lang", "lang attribute present")

    if not re.search(r'<meta[^>]*name=["\']viewport["\']', html, re.I):
        rep.add("FAIL", "seo/viewport", "no viewport meta")

    og = re.search(r'<meta[^>]*property=["\']og:title["\']', html, re.I)
    if not og:
        rep.add("WARN", "seo/open-graph", "no og:title (social sharing will be plain)")
    else:
        rep.add("PASS", "seo/open-graph", "og:title present")

    # ---- structured data ---------------------------------------------------
    jsonld = JSONLD_RE.findall(html)
    if not jsonld:
        rep.add("FAIL", "structured-data/none", "no JSON-LD block")
    else:
        types: list[str] = []
        for block in jsonld:
            try:
                data = json.loads(block.strip())
            except json.JSONDecodeError as e:
                rep.add("FAIL", "structured-data/invalid-json", str(e))
                continue
            nodes = data if isinstance(data, list) else [data]
            flat: list[dict] = []
            for n in nodes:
                if not isinstance(n, dict):
                    continue
                flat.append(n)
                # The build emits {"@context":..., "@graph":[...]} — the types
                # live inside the graph, not at the top level.
                inner = n.get("@graph")
                if isinstance(inner, list):
                    flat.extend(x for x in inner if isinstance(x, dict))
            for n in flat:
                t = n.get("@type")
                types.extend(t if isinstance(t, list) else [t] if t else [])
        if types:
            rep.add("PASS", "structured-data/types", ", ".join(map(str, types)))
        else:
            rep.add("WARN", "structured-data/types", "JSON-LD present but no @type found")

    # ---- AI-crawler / agent readiness -------------------------------------
    if re.search(r'rel=["\']alternate["\'][^>]*type=["\']text/markdown["\']', html, re.I) or \
       re.search(r'type=["\']text/markdown["\'][^>]*rel=["\']alternate["\']', html, re.I):
        rep.add("PASS", "aio/markdown-twin-link", "rel=alternate text/markdown present")
    else:
        rep.add("WARN", "aio/markdown-twin-link", "no rel=alternate text/markdown link to the .md twin")

    if not re.search(r'rel=["\']describedby["\'][^>]*href=["\'][^"\']*llms\.txt', html, re.I) and \
       not re.search(r'href=["\'][^"\']*llms\.txt[^"\']*["\'][^>]*rel=["\']describedby["\']', html, re.I):
        rep.add("WARN", "aio/llms-txt-describedby", "no rel=describedby link to llms.txt")

    # ---- GEO craft signals -------------------------------------------------
    answer = visible_text_after_h1(html)
    if not answer:
        rep.add("FAIL", "geo/answer-first", "no paragraph found after the H1")
    else:
        n_words = len(answer.split())
        first_sentence = re.split(r"(?<=[.!?])\s", answer)[0]
        n_sent = len(first_sentence.split())
        if n_words < 40:
            rep.add("FAIL", "geo/answer-first", f"opening section only {n_words} words (want >=40)")
        else:
            rep.add("PASS", "geo/answer-first", f"opening section {n_words} words")
        if n_sent > 45:
            rep.add("WARN", "geo/answer-first-sentence", f"first sentence is {n_sent} words — split it")
        else:
            rep.add("PASS", "geo/answer-first-sentence", f"first sentence {n_sent} words")

    stats = STAT_RE.findall(text)
    if len(stats) < 3:
        rep.add("FAIL", "geo/statistics", f"only {len(stats)} statistic-like tokens — GEO needs quotable numbers")
    else:
        rep.add("PASS", "geo/statistics", f"{len(stats)} statistics/quantities found")

    # In rendered HTML a citation is an external anchor, not markdown syntax.
    # Count both so a page passes whether it was linted from .md or from HTML.
    html_cites = HREF_RE.findall(html)
    cites = CITATION_RE.findall(html)
    n_cites = len(html_cites) + len(cites)
    if n_cites < 5:
        rep.add("FAIL", "geo/citations", f"only {n_cites} inline citations — need >=5")
    else:
        rep.add("PASS", "geo/citations", f"{n_cites} inline citations")

    bare = [u for u in BARE_URL_RE.findall(text)]
    if bare:
        rep.add("WARN", "geo/bare-urls", f"{len(bare)} bare URL(s) in body text — use linked citations")
    else:
        rep.add("PASS", "geo/bare-urls", "no bare URLs")

    if DATE_RE.search(text):
        rep.add("PASS", "geo/freshness-signal", "year/date present (freshness cue)")
    else:
        rep.add("WARN", "geo/freshness-signal", "no date/year anywhere in the page")

    # scannable structure: the extractor chunks on headings, lists and tables
    h2 = len(H2_RE.findall(html))
    if h2 < 3:
        rep.add("WARN", "geo/chunking", f"only {h2} H2 sections — long pages chunk better with more")
    else:
        rep.add("PASS", "geo/chunking", f"{h2} H2 sections")

    if not (TABLE_RE.search(html) or UL_RE.search(html) or OL_RE.search(html) or DL_RE.search(html)):
        rep.add("WARN", "geo/list-structure", "no lists or tables — add a scannable summary")
    else:
        rep.add("PASS", "geo/list-structure", "lists/tables present")

    if QUESTION_H_RE.search(html):
        rep.add("PASS", "geo/question-headings", "question-form headings present")
    else:
        rep.add("WARN", "geo/question-headings", "no question-form headings")

    if CODE_RE.search(html):
        rep.add("PASS", "geo/technical-content", "code blocks present")
    if BLOCKQUOTE_RE.search(html):
        rep.add("PASS", "geo/quotable", "blockquote(s) present (quotation-addition signal)")

    # ---- performance & accessibility budgets --------------------------------
    kb = len(html.encode("utf-8")) / 1024
    if kb > 120:
        rep.add("FAIL", "perf/page-weight", f"{kb:.1f} KB of HTML (budget 120 KB)")
    else:
        rep.add("PASS", "perf/page-weight", f"{kb:.1f} KB of HTML")

    imgs = IMG_RE.findall(html)
    no_alt = [i for i in imgs if not re.search(r'\balt=["\'][^"\']+["\']', i, re.I)]
    if no_alt:
        rep.add("FAIL", "a11y/img-alt", f"{len(no_alt)} <img> without non-empty alt")
    elif imgs:
        rep.add("PASS", "a11y/img-alt", f"{len(imgs)} images, all with alt")

    links = LINK_RE.findall(html)
    empty_links = [l for l in links if not l.strip() or l.strip() == "#"]
    if empty_links:
        rep.add("WARN", "a11y/empty-links", f"{len(empty_links)} links with empty/placeholder href")
    if not re.search(r'<a[^>]*class=["\'][^"\']*skip', html, re.I):
        rep.add("WARN", "a11y/skip-link", "no skip-to-content link found")

    if words < 400:
        rep.add("WARN", "depth/word-count", f"only {words} words — thin content is rarely cited")
    else:
        rep.add("PASS", "depth/word-count", f"{words} words")

    return rep


def lint_markdown(path: Path) -> Report:
    """Markdown twins get a smaller subset of checks."""
    rep = Report(str(path))
    md = path.read_text(encoding="utf-8", errors="replace")
    text = re.sub(r"```.*?```", " ", md, flags=re.S)
    text = re.sub(r"^\s*[-*]\s+", "", text, flags=re.M)
    plain = re.sub(r"[#*_>`\[\]]", "", text)

    cites = CITATION_RE.findall(md)
    if len(cites) < 5:
        rep.add("FAIL", "geo/citations", f"only {len(cites)} citations — need >=5")
    else:
        rep.add("PASS", "geo/citations", f"{len(cites)} citations")

    stats = STAT_RE.findall(plain)
    if len(stats) < 3:
        rep.add("FAIL", "geo/statistics", f"only {len(stats)} statistics — add quotable numbers")
    else:
        rep.add("PASS", "geo/statistics", f"{len(stats)} statistics")

    if not re.search(r"^#\s+\S", md, re.M):
        rep.add("FAIL", "seo/single-h1", "no level-1 heading")
    if not DATE_RE.search(plain):
        rep.add("WARN", "geo/freshness-signal", "no year/date in the document")
    return rep


def collect(root: Path) -> list[Path]:
    files = []
    for p in sorted(root.rglob("*")):
        if not p.is_file():
            continue
        if p.name == "404.html":
            continue  # generated error page: not a content page, exempt from GEO gates
        if p.suffix in (".html", ".htm"):
            files.append(p)
        elif p.suffix == ".md" and p.name.endswith(".md"):
            files.append(p)
    return files


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("paths", nargs="*", help="files or dirs (default: site/)")
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()

    targets: list[Path] = []
    for raw in args.paths or ["site"]:
        p = Path(raw)
        targets.extend(collect(p) if p.is_dir() else [p])
    if not targets:
        print("no files to lint")
        return 0

    reports = []
    for t in targets:
        reports.append(lint_markdown(t) if t.suffix == ".md" else lint_html(t))

    if args.json:
        print(json.dumps([
            {"file": r.path, "fails": r.fails, "warns": r.warns,
             "findings": [{"level": f.level, "rule": f.rule, "detail": f.detail} for f in r.findings]}
            for r in reports
        ], indent=2))
    else:
        for r in reports:
            status = "FAIL" if r.fails else ("WARN" if r.warns else "OK")
            print(f"[{status}] {r.path}  ({r.fails} fail, {r.warns} warn)")
            for f in r.findings:
                if f.level in ("FAIL", "WARN"):
                    print(f"    {f.level:<4} {f.rule:<32} {f.detail}")
        tf = sum(r.fails for r in reports)
        tw = sum(r.warns for r in reports)
        print(f"\n{len(reports)} files — {tf} failures, {tw} warnings")

    return 1 if any(r.fails for r in reports) else 0


if __name__ == "__main__":
    sys.exit(main())
