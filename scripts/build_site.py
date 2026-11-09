#!/usr/bin/env python3
"""
build_site.py — renders the static site from content/*.md.

No third-party dependencies: a small front-matter parser, a Markdown subset
renderer, and one HTML template. The output in site/ is plain static HTML that
can be served by anything (Cloudflare Pages, GitHub Pages, nginx).

Design decisions that matter for SEO + AI search:
  * every page gets a JSON-LD graph (WebSite / WebPage / Person / BreadcrumbList)
  * every page gets a markdown twin at <slug>.md and rel="alternate" link relations
  * answer-first: the front-matter "answer" field renders as the TL;DR block
  * tables, lists and headings survive into HTML so the content can be chunked
  * the .md twin is generated from the same source, so the two never drift

Usage:
    python3 scripts/build_site.py [--content content] [--out site] [--base-url URL]
"""

from __future__ import annotations

import argparse
import html
import json
import re
import shutil
import subprocess
import sys
from datetime import date
from pathlib import Path

# ---------------------------------------------------------------- front matter


def _split_top_level(s: str) -> list[str]:
    """Split a comma-separated list body, ignoring commas inside brackets/quotes."""
    parts, cur, depth, quote = [], "", 0, ""
    for ch in s:
        if quote:
            cur += ch
            if ch == quote:
                quote = ""
            continue
        if ch in "\"'":
            quote = ch
            cur += ch
            continue
        if ch in "[{":
            depth += 1
        elif ch in "]}":
            depth -= 1
        if ch == "," and depth == 0:
            parts.append(cur)
            cur = ""
            continue
        cur += ch
    if cur.strip():
        parts.append(cur)
    return parts


def parse_inline_list(v: str) -> list:
    """Parse '[a, b]' or '[[x, y], [z, w]]' into a list of scalars / pairs."""
    body = v[1:-1].strip()
    if not body:
        return []
    items = []
    for raw in _split_top_level(body):
        raw = raw.strip()
        if not raw:
            continue
        if raw.startswith("[") and raw.endswith("]"):
            inner = _split_top_level(raw[1:-1])
            items.append([p.strip().strip("\"'") for p in inner])
        else:
            items.append(raw.strip().strip("\"'"))
    return items


def parse_front_matter(text: str) -> tuple[dict, str]:
    """Parse a minimal YAML-ish front matter block.

    Supports scalars, inline [a, b] lists and block lists (- item).
    Good enough for our own content files; deliberately not a YAML engine.
    """
    if not text.startswith("---"):
        return {}, text
    end = text.find("\n---", 3)
    if end == -1:
        return {}, text
    raw = text[3:end]
    body = text[end + 4:].lstrip("\n")
    data: dict = {}
    key = None
    for line in raw.splitlines():
        if not line.strip():
            continue
        if line.lstrip().startswith("- ") and key:
            data.setdefault(key, [])
            if isinstance(data[key], list):
                data[key].append(line.lstrip()[2:].strip().strip("\"'"))
            continue
        if ":" not in line:
            continue
        k, _, v = line.partition(":")
        k = k.strip()
        v = v.strip()
        if v.startswith("[") and v.endswith("]"):
            data[k] = parse_inline_list(v)
        elif v == "":
            data[k] = []
            key = k
        else:
            data[k] = v.strip("\"'")
            key = None
    return data, body


# ------------------------------------------------------------------- markdown


def inline(text: str) -> str:
    """Inline markdown -> HTML, escaping first."""
    out = html.escape(text, quote=False)
    # links [text](href)
    out = re.sub(
        r"\[([^\]]+)\]\((https?://[^)\s]+)\)",
        lambda m: f'<a href="{m.group(2)}" rel="noopener">{m.group(1)}</a>',
        out,
    )
    out = re.sub(r"\[([^\]]+)\]\((/[^)\s]*)\)", lambda m: f'<a href="{m.group(2)}">{m.group(1)}</a>', out)
    # mailto: links (mailto:address or mailto:address?subject=...)
    out = re.sub(
        r"\[([^\]]+)\]\((mailto:[^)\s]+)\)",
        lambda m: f'<a href="{m.group(2)}">{m.group(1)}</a>',
        out,
    )
    # relative links to sibling files that we copy into the site root (e.g. ./tools.json)
    out = re.sub(
        r"\[([^\]]+)\]\((\./[^)\s]+)\)",
        lambda m: f'<a href="{m.group(2)[2:]}">{m.group(1)}</a>',
        out,
    )
    out = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", out)
    out = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<em>\1</em>", out)
    out = re.sub(r"`([^`]+)`", r"<code>\1</code>", out)
    return out


def slugify(text: str) -> str:
    s = re.sub(r"[^a-zA-Z0-9\s-]", "", text.lower())
    s = re.sub(r"[\s_-]+", "-", s).strip("-")
    return s or "section"


def render_table(rows: list[list[str]]) -> str:
    if not rows:
        return ""
    head, *body = rows
    th = "".join(f"<th scope=\"col\">{inline(c.strip())}</th>" for c in head)
    trs = []
    for r in body:
        tds = "".join(f"<td>{inline(c.strip())}</td>" for c in r)
        trs.append(f"<tr>{tds}</tr>")
    return (
        '<div class="table-wrap"><table><thead><tr>'
        + th
        + "</tr></thead><tbody>"
        + "".join(trs)
        + "</tbody></table></div>"
    )


def split_row(line: str) -> list[str]:
    s = line.strip()
    if s.startswith("|"):
        s = s[1:]
    if s.endswith("|"):
        s = s[:-1]
    # naive but correct for our content: split on unescaped pipes
    parts, cur, esc = [], "", False
    for ch in s:
        if esc:
            cur += ch
            esc = False
        elif ch == "\\":
            esc = True
        elif ch == "|":
            parts.append(cur)
            cur = ""
        else:
            cur += ch
    parts.append(cur)
    return parts


def md_to_html(md: str) -> str:
    lines = md.splitlines()
    out: list[str] = []
    i = 0
    in_code = False
    code_lang = ""
    code_buf: list[str] = []

    def flush_code() -> None:
        if not code_buf:
            return
        cls = f' class="language-{html.escape(code_lang)}"' if code_lang else ""
        out.append(f"<pre><code{cls}>{html.escape(chr(10).join(code_buf))}</code></pre>")
        code_buf.clear()

    while i < len(lines):
        line = lines[i]

        if line.strip().startswith("```"):
            if in_code:
                flush_code()
                in_code = False
                code_lang = ""
            else:
                in_code = True
                code_lang = line.strip()[3:].strip()
            i += 1
            continue
        if in_code:
            code_buf.append(line)
            i += 1
            continue

        # table
        if line.strip().startswith("|") and i + 1 < len(lines) and re.match(r"^\s*\|[\s:|-]+\|\s*$", lines[i + 1]):
            rows = []
            rows.append(split_row(line))
            i += 2
            while i < len(lines) and lines[i].strip().startswith("|"):
                rows.append(split_row(lines[i]))
                i += 1
            out.append(render_table(rows))
            continue

        # headings
        m = re.match(r"^(#{1,6})\s+(.*)$", line)
        if m:
            level = len(m.group(1))
            text = m.group(2).strip()
            anchor = slugify(re.sub(r"[`*_]", "", text))
            out.append(f'<h{level} id="{anchor}">{inline(text)}</h{level}>')
            i += 1
            continue

        # blockquote
        if line.startswith(">"):
            buf = []
            while i < len(lines) and lines[i].startswith(">"):
                buf.append(lines[i].lstrip("> ").rstrip())
                i += 1
            out.append("<blockquote><p>" + inline(" ".join(buf)) + "</p></blockquote>")
            continue

        # hr
        if re.match(r"^\s*(-{3,}|\*{3,})\s*$", line):
            out.append("<hr>")
            i += 1
            continue

        # lists
        m_ul = re.match(r"^\s*[-*]\s+(.*)$", line)
        m_ol = re.match(r"^\s*\d+[.)]\s+(.*)$", line)
        if m_ul or m_ol:
            ordered = bool(m_ol)
            tag = "ol" if ordered else "ul"
            items = []
            while i < len(lines):
                cur = lines[i]
                mm = re.match(r"^\s*\d+[.)]\s+(.*)$", cur) if ordered else re.match(r"^\s*[-*]\s+(.*)$", cur)
                if not mm:
                    if cur.strip() and cur.startswith("  ") and items:
                        items[-1] += " " + cur.strip()
                        i += 1
                        continue
                    break
                items.append(mm.group(1).strip())
                i += 1
            lis = "".join(f"<li>{inline(it)}</li>" for it in items)
            out.append(f"<{tag}>{lis}</{tag}>")
            continue

        # paragraph
        if line.strip():
            buf = []
            while i < len(lines) and lines[i].strip() and not re.match(
                r"^\s*(#{1,6}\s|\||>|```|[-*]\s|\d+[.)]\s)", lines[i]
            ):
                buf.append(lines[i].strip())
                i += 1
            if buf:
                out.append("<p>" + inline(" ".join(buf)) + "</p>")
            continue

        i += 1

    flush_code()
    return "\n".join(out)


# -------------------------------------------------------------------- template

CSS = """
:root{
  --bg:#0f1115; --panel:#161a21; --ink:#e8ecf1; --muted:#9aa6b2; --line:#252b35;
  --accent:#4ade80; --accent2:#60a5fa; --maxw:74ch;
}
@media (prefers-color-scheme: light){
  :root{ --bg:#ffffff; --panel:#f7f9fb; --ink:#131820; --muted:#5a6673; --line:#e2e8f0;
         --accent:#047857; --accent2:#1d4ed8; }
}
*{box-sizing:border-box}
html{ -webkit-text-size-adjust:100% }
body{
  margin:0; background:var(--bg); color:var(--ink); line-height:1.65;
  font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  font-size:17px;
}
.wrap{ max-width:var(--maxw); margin:0 auto; padding:0 1.25rem }
header.site{
  border-bottom:1px solid var(--line); background:var(--panel); position:sticky; top:0; z-index:10;
}
header.site .wrap{ display:flex; align-items:center; gap:1rem; flex-wrap:wrap; padding-top:.6rem; padding-bottom:.6rem }
header.site a{ color:var(--ink); text-decoration:none; font-weight:600 }
header.site nav{ display:flex; gap:.9rem; flex-wrap:wrap; font-size:.95rem }
header.site nav a{ font-weight:500; color:var(--muted) }
header.site nav a:hover, header.site nav a:focus{ color:var(--accent) }
.brand{ font-size:1rem; letter-spacing:.01em }
main{ padding:2.5rem 0 4rem }
h1{ font-size:2rem; line-height:1.2; margin:.2rem 0 1rem; letter-spacing:-.01em }
h2{ font-size:1.35rem; margin:2.4rem 0 .6rem; padding-bottom:.3rem; border-bottom:1px solid var(--line) }
h3{ font-size:1.08rem; margin:1.7rem 0 .4rem }
p{ margin:.85rem 0 }
a{ color:var(--accent2) }
a:hover{ color:var(--accent) }
code{ background:var(--panel); border:1px solid var(--line); border-radius:4px; padding:.1em .35em; font-size:.9em;
      font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace }
pre{ background:var(--panel); border:1px solid var(--line); border-radius:8px; padding:1rem; overflow:auto }
pre code{ background:none; border:0; padding:0 }
.answer{ border-left:4px solid var(--accent); background:var(--panel); padding:1rem 1.15rem; border-radius:0 8px 8px 0; margin:1.4rem 0 2rem }
.answer p:first-child{ margin-top:0 } .answer p:last-child{ margin-bottom:0 }
.answer strong{ color:var(--accent) }
.meta{ color:var(--muted); font-size:.9rem; margin:-.4rem 0 1.6rem }
.table-wrap{ overflow-x:auto; margin:1.2rem 0 }
table{ border-collapse:collapse; width:100%; font-size:.93rem }
th,td{ border:1px solid var(--line); padding:.5rem .65rem; text-align:left; vertical-align:top }
th{ background:var(--panel) }
blockquote{ margin:1.2rem 0; padding:.4rem 0 .4rem 1rem; border-left:3px solid var(--accent2); color:var(--muted) }
blockquote p{ margin:.3rem 0 }
ul,ol{ padding-left:1.3rem } li{ margin:.35rem 0 }
footer.site{ border-top:1px solid var(--line); background:var(--panel); color:var(--muted); font-size:.9rem; padding:1.6rem 0 2.5rem }
footer.site a{ color:var(--accent2) }
.skip{ position:absolute; left:-9999px }
.skip:focus{ left:1rem; top:1rem; position:fixed; background:var(--accent); color:#000; padding:.5rem .9rem; border-radius:6px; z-index:100 }
.toc{ background:var(--panel); border:1px solid var(--line); border-radius:8px; padding:.8rem 1rem; margin:1.5rem 0 }
.toc summary{ cursor:pointer; font-weight:600 }
.toc ul{ margin:.6rem 0 0 }
.grid{ display:grid; gap:1rem; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:1.5rem 0 }
.card{ background:var(--panel); border:1px solid var(--line); border-radius:8px; padding:1rem }
.card h3{ margin-top:0 }
.badge{ display:inline-block; font-size:.78rem; border:1px solid var(--line); border-radius:999px; padding:.1rem .55rem; color:var(--muted); margin:.15rem .2rem .15rem 0 }
@media (max-width:640px){ body{font-size:16px} h1{font-size:1.55rem} }
@media print{
  header.site, footer.site{ display:none }
  body{ background:#fff; color:#000; font-size:11pt; line-height:1.45 }
  main{ padding:0 }
  .wrap{ max-width:none; padding:0 }
  a{ color:#000; text-decoration:none }
  a[href^="http"]::after{ content:" (" attr(href) ")"; font-size:8pt; color:#444 }
  h1{ font-size:17pt; margin:0 0 .3rem }
  h2{ font-size:12.5pt; margin:1rem 0 .3rem; border-bottom:1px solid #bbb; break-after:avoid }
  h3{ font-size:11pt; break-after:avoid }
  .answer{ border-left:3px solid #000; background:#fff; padding:.4rem .6rem }
  .meta{ color:#333 }
  .card,.toc{ background:#fff; border:1px solid #bbb; break-inside:avoid }
  table{ font-size:9.5pt } th,td{ border:1px solid #bbb }
  li{ margin:.15rem 0 }
  h2,h3,.card,tr{ break-inside:avoid }
}
"""


def page_html(meta: dict, body_html: str, nav: str, extra_head: str = "") -> str:
    title = meta.get("title", "Ivan Weiss van der Pol")
    desc = meta.get("description", "")
    slug = meta.get("slug", "")
    base = meta.get("base_url", "").rstrip("/")
    # Canonical URLs must match the served URL exactly, trailing slash included,
    # or search engines treat the page as a duplicate of the slash variant.
    canonical = f"{base}/{slug}/" if slug else (base + "/" if base else "")
    # The 404 artifact is not a canonical target for anything: it is served at
    # /404.html, carries noindex, and is returned for unknown paths. Emitting a
    # canonical that points at a non-existent /404/ URL would be a self-
    # referential dead link for every crawler that reads it.
    is_404 = bool(meta.get("is_404"))
    if is_404 and base:
        # GitHub Pages serves the error artifact at /404.html with a 200 status
        # when requested directly, so that is the real, resolvable URL.
        canonical = f"{base}/404.html"
    body_class = meta.get("body_class", "")
    # A 404 page must never be indexed, and must not compete with the home page.
    robots = '<meta name="robots" content="noindex, follow">\n' if meta.get("is_404") else ""
    return f"""<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
{robots}<title>{html.escape(title)}</title>
<meta name="description" content="{html.escape(desc, quote=True)}">
<link rel="canonical" href="{html.escape(canonical, quote=True)}">
<meta name="author" content="Ivan Weiss van der Pol">
<meta property="og:type" content="{meta.get('og_type','website')}">
<meta property="og:title" content="{html.escape(title, quote=True)}">
<meta property="og:description" content="{html.escape(desc, quote=True)}">
<meta property="og:url" content="{html.escape(canonical, quote=True)}">
<meta property="og:site_name" content="Ivan Weiss van der Pol — Senior AI Engineer">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{html.escape(title, quote=True)}">
<meta name="twitter:description" content="{html.escape(desc, quote=True)}">
{"" if meta.get('no_md_alternate') else '<link rel="alternate" type="text/markdown" href="' + html.escape((('/' + slug + '.md') if slug else '/index.md'), quote=True) + '">'}
<link rel="describedby" href="{html.escape((base or '') + '/llms.txt', quote=True)}">
<link rel="stylesheet" href="{meta.get('assets','/assets')}/style.css">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>&#128187;</text></svg>">
{extra_head}
</head>
<body class="{body_class}">
<a class="skip" href="#main">Skip to content</a>
<header class="site"><div class="wrap">
  <a class="brand" href="/">Ivan Weiss van der Pol</a>
  <nav aria-label="Primary">{nav}</nav>
</div></header>
<main id="main"><div class="wrap">
{body_html}
</div></main>
<footer class="site"><div class="wrap">
<p><strong>Ivan Weiss van der Pol</strong> — Senior AI &amp; Automation Engineer. Paraguay · Open to remote.
Contact <a href="mailto:weissvanderpol.ivan@gmail.com">weissvanderpol.ivan@gmail.com</a> ·
<a href="https://github.com/IvanWeissVanDerPol">GitHub</a> ·
<a href="https://linkedin.com/in/ivanweissvanderpol">LinkedIn</a>.</p>
<p>Machine-readable entry points: <a href="/llms.txt">llms.txt</a> · <a href="/sitemap.xml">sitemap.xml</a> ·
<a href="/robots.txt">robots.txt</a>. Page last reviewed: {meta.get('date','')}.</p>
</div></footer>
</body>
</html>
"""


NAV = (
    '<a href="/cv/">CV</a>'
    '<a href="/about/">About</a>'
    '<a href="/work/">Work</a>'
    '<a href="/writing/">Writing</a>'
    '<a href="/ai-crawler-policy/">AI crawler policy</a>'
)


# ------------------------------------------------------------------ pipeline

# AI Whisperers is a separate, real organisation with its own canonical URL.
# It is published under its own @id (not under this site's origin) so the
# entity keeps one identity no matter which page references it.
ORG_URL = "https://ai-whisperers.paragu-ai.com/"
ORG_ID = ORG_URL + "#organization"
ORG_GITHUB = "https://github.com/Ai-Whisperers"



def jsonld_graph(meta: dict) -> list[dict]:
    base = meta.get("base_url", "").rstrip("/")
    slug = meta.get("slug", "")
    url = f"{base}/{slug}/" if slug else (base + "/" if base else "")
    graph: list[dict] = []

    if meta.get("is_home"):
        graph.append({
            "@type": "WebSite",
            "@id": f"{base}/#website",
            "url": base + "/",
            "name": "Ivan Weiss van der Pol — Senior AI Engineer",
            "description": meta.get("description", ""),
            "inLanguage": "en",
            "publisher": {"@id": f"{base}/#person"},
        })

    # /about/ and /cv/ are profile pages: the person IS the subject of the
    # page, so the page node carries the ProfilePage type and points at the
    # Person as its mainEntity. It stays ONE node for one URL - emitting a
    # separate ProfilePage node with the same `url` would give the same page
    # two entities in the same graph.
    # https://developers.google.com/search/docs/appearance/structured-data/profile-page
    is_profile_page = slug in ("about", "cv")
    page_node = {
        "@type": ["WebPage", "ProfilePage"] if is_profile_page else "WebPage",
        "@id": f"{url}#webpage",
        "url": url,
        "name": meta.get("title", ""),
        "description": meta.get("description", ""),
        "isPartOf": {"@id": f"{base}/#website"},
        "inLanguage": "en",
        "dateModified": meta.get("date", ""),
    }
    if is_profile_page:
        page_node["mainEntity"] = {"@id": f"{base}/#person"}
        page_node["about"] = {"@id": f"{base}/#person"}
    graph.append(page_node)

    if meta.get("is_home") or slug in ("about", "cv"):
        graph.append({
            "@type": "Person",
            "@id": f"{base}/#person",
            "name": "Ivan Weiss van der Pol",
            "url": base + "/",
            "jobTitle": "Senior AI & Automation Engineer",
            "description": "Senior AI and automation engineer with 6+ years across software development, quality engineering and data engineering; founder of AI Whisperers.",
            "email": "mailto:weissvanderpol.ivan@gmail.com",
            "telephone": "+595-981-324-569",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "San Lorenzo",
                "addressCountry": "PY",
            },
            "knowsLanguage": ["es", "en", "nl"],
            # The employer is a real, separate entity with its own canonical
            # URL and @id. That gives search engines and retrieval systems an
            # unambiguous edge between the person and the company, instead of
            # leaving "founder of AI Whisperers" as free text to be parsed.
            "worksFor": {"@id": ORG_ID},
            "alumniOf": [
                {"@type": "CollegeOrUniversity", "name": "Facultad Politécnica — Universidad Nacional de Asunción"},
                {"@type": "CollegeOrUniversity", "name": "Wichita State University"},
            ],
            "hasCredential": [
                {"@type": "EducationalOccupationalCredential", "name": "ISTQB Certified Tester — Foundation Level", "credentialCategory": "certification"},
                {"@type": "EducationalOccupationalCredential", "name": "NASA Galactic Problem Solver (2023)", "credentialCategory": "award"},
                {"@type": "EducationalOccupationalCredential", "name": "Hexawise Test Design Professional (2024)", "credentialCategory": "certification"},
                {"@type": "EducationalOccupationalCredential", "name": "AI For Everyone — DeepLearning.AI (2024)", "credentialCategory": "certification"},
            ],
            "knowsAbout": [
                "Agent orchestration", "Large language models", "Retrieval-augmented generation",
                "Model Context Protocol (MCP)", "AI search optimization", "Generative Engine Optimization",
                "Search Engine Optimization", "Test automation", "Data engineering", "Docker", "PostgreSQL",
            ],
            "sameAs": [
                "https://github.com/IvanWeissVanDerPol",
                "https://linkedin.com/in/ivanweissvanderpol",
            ],
        })

    if meta.get("is_home") or slug in ("about", "cv"):
        # The Organization the Person works for and founded. Every claim here
        # comes from content/profile.md - the same rule applies to every node.
        graph.append({
            "@type": "Organization",
            "@id": ORG_ID,
            "name": "AI Whisperers",
            "url": ORG_URL,
            "sameAs": [ORG_URL, ORG_GITHUB],
            "description": "AI engineering company building agentic systems, MCP integrations and LLM cost controls.",
            "founder": {"@id": f"{base}/#person"},
        })

    if meta.get("is_article"):
        graph.append({
            "@type": "TechArticle",
            "@id": f"{url}#article",
            "headline": meta.get("title", ""),
            "description": meta.get("description", ""),
            "url": url,
            "datePublished": meta.get("published", meta.get("date", "")),
            "dateModified": meta.get("date", ""),
            "author": {"@id": f"{base}/#person"},
            "inLanguage": "en",
            "keywords": ", ".join(meta.get("keywords", [])),
            "isAccessibleForFree": True,
        })

    if meta.get("breadcrumbs"):
        items = []
        for nme, it in meta["breadcrumbs"]:
            it = str(it).strip().strip("/")
            url = f"{base}/{it}/" if it else base + "/"
            items.append((nme, url))
        # a breadcrumb trail always starts at Home
        if not items or items[0][1] != base + "/":
            items.insert(0, ("Home", base + "/"))
        graph.append({
            "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type": "ListItem", "position": n, "name": nme, "item": url}
                for n, (nme, url) in enumerate(items, start=1)
            ],
        })

    return graph


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--content", default="content")
    ap.add_argument("--out", default="site")
    ap.add_argument("--base-url", default="https://ivanweissvanderpol.github.io")
    ap.add_argument("--assets", default="/assets")
    ap.add_argument("--pdf", action="store_true", help="render the CV page to cv.pdf (default: on; skipped when Chrome is missing)")
    ap.add_argument("--no-pdf", dest="pdf", action="store_false", help="skip the PDF render step")
    ap.set_defaults(pdf=True)
    args = ap.parse_args()

    content_dir = Path(args.content)
    out_dir = Path(args.out)
    if out_dir.exists():
        shutil.rmtree(out_dir)
    (out_dir / "assets").mkdir(parents=True, exist_ok=True)

    written: list[tuple[str, str]] = []   # (url path, title)
    for md_path in sorted(content_dir.glob("*.md")):
        meta, body = parse_front_matter(md_path.read_text(encoding="utf-8"))
        if not meta.get("slug"):
            continue
        meta.setdefault("base_url", args.base_url)
        meta.setdefault("assets", args.assets)
        meta.setdefault("date", date.today().isoformat())

        slug = meta["slug"]
        body_html = md_to_html(body)

        # The home page lives at /, so normalise its slug before any URL is derived
        # (canonical, JSON-LD, sitemap) — otherwise the root URL is emitted as
        # /index/ and the page looks like a duplicate of the real home page.
        if slug == "index":
            meta["slug"] = ""

        answer = meta.get("answer")
        if answer:
            # The answer block goes directly AFTER the H1: the H1 must stay the
            # first element of the page for search engines, and the answer must
            # still be the first thing a reader (or a retrieval system) reads.
            answer_html = (
                '<div class="answer" role="note" aria-label="Direct answer">'
                f"<p><strong>Short answer.</strong> {inline(answer)}</p></div>\n"
            )
            if "</h1>" in body_html:
                head, _, tail = body_html.partition("</h1>")
                body_html = head + "</h1>\n" + answer_html + tail
            else:
                body_html = answer_html + body_html

        extra = ""
        if meta.get("is_article"):
            extra = (
                '<meta property="article:published_time" content="%s">\n'
                '<meta property="article:modified_time" content="%s">\n'
                '<meta property="article:author" content="Ivan Weiss van der Pol">'
                % (meta.get("published", meta.get("date")), meta.get("date"))
            )

        graph = jsonld_graph(meta)
        if graph:
            extra += (
                '\n<script type="application/ld+json">'
                + json.dumps({"@context": "https://schema.org", "@graph": graph}, indent=1)
                + "</script>"
            )

        html_doc = page_html(meta, body_html, NAV, extra)
        if slug == "index":
            dest = out_dir / "index.html"
            meta["slug"] = ""
            html_doc = page_html(meta, body_html, NAV, extra)
        else:
            dest = out_dir / slug / "index.html"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(html_doc, encoding="utf-8")

        # markdown twin at the same URL with .md appended
        twin = out_dir / (slug + ".md") if slug != "index" else out_dir / "index.md"
        twin.parent.mkdir(parents=True, exist_ok=True)
        twin.write_text(body, encoding="utf-8")

        written.append((slug, meta.get("title", slug)))
        print(f"  {slug:<42} -> {dest}")

    # assets
    (out_dir / "assets" / "style.css").write_text(CSS, encoding="utf-8")
    # non-markdown content files (e.g. tools.json) are copied verbatim to the site root
    for extra_file in sorted(content_dir.glob("*")):
        if extra_file.is_file() and extra_file.suffix.lower() not in (".md",):
            shutil.copy2(extra_file, out_dir / extra_file.name)
            print(f"  {extra_file.name}")

    # llms.txt
    llms = ["# Ivan Weiss van der Pol", "",
            "> Senior AI & Automation Engineer. Agent orchestration, LLM platforms,",
            "> AI-assisted QA and data engineering. Paraguay — open to remote.", "",
            "Ivan Weiss van der Pol builds production agentic systems: multi-agent fleets,",
            "MCP server integrations, LLM cost and quality controls, and the CI gates that",
            "keep them honest. Before that he led QA for an FDA-cleared Class II medical-device",
            "platform (40% faster test-case generation with AI) and built Python automation that",
            "cut manual testing effort by 60%.", "",
            "## Start here", ""]
    host = args.base_url.rstrip("/")
    n_tools = 0
    tj = content_dir / "tools.json"
    if tj.exists():
        try:
            n_tools = len(json.loads(tj.read_text(encoding="utf-8")))
        except Exception:
            n_tools = 0
    llms.append(f"- [Home]({host}/): the one-paragraph version.")
    llms.append(f"  markdown: {host}/index.md")
    for slug, title in written:
        if slug == "index" or slug.startswith("writing/"):
            continue
        llms.append(f"- [{title}]({host}/{slug}/):")
        llms.append(f"  markdown: {host}/{slug}.md")

    guides = [(s, t) for s, t in written if s.startswith("writing/")]
    if guides:
        llms += ["", "## Guides (long-form, citation-backed)", ""]
        for slug, title in guides:
            llms.append(f"- [{title}]({host}/{slug}/):")
            llms.append(f"  markdown: {host}/{slug}.md")

    llms += ["", "## Machine-readable data", "",
             f"- [tools.json]({host}/tools.json): {n_tools} SEO / AEO / GEO / ATS tools with licences,",
             "  activity dates and verdicts, extracted from the GitHub API on 2026-11-08.",
             f"- [sitemap.xml]({host}/sitemap.xml): every indexable URL on this site.",
             f"- [robots.txt]({host}/robots.txt): crawler policy, including which AI crawlers are",
             "  allowed for search/retrieval and which are blocked for training.", "",
             "## Contact", "",
             "- Email: weissvanderpol.ivan@gmail.com",
             "- GitHub: https://github.com/IvanWeissVanDerPol",
             "- LinkedIn: https://linkedin.com/in/ivanweissvanderpol", ""]
    (out_dir / "llms.txt").write_text("\n".join(llms), encoding="utf-8")
    print("  llms.txt")

    # robots.txt — generated from content/crawler-policy.json so the machine-readable
    # file and the published policy page can never drift apart.
    policy_path = content_dir / "crawler-policy.json"
    if policy_path.exists():
        policy = json.loads(policy_path.read_text(encoding="utf-8"))
    else:
        policy = {"allowed": [], "disallowed": [], "notes": {}}
    allowed = policy.get("allowed", [])
    disallowed = policy.get("disallowed", [])
    lines = [
        "# robots.txt — Ivan Weiss van der Pol (senior AI engineer site)",
        "#",
        "# Generated from content/crawler-policy.json by scripts/build_site.py.",
        "# Policy of record with full rationale: /ai-crawler-policy/",
        "#",
        "#   ALLOWED  classic search crawlers + AI *search/retrieval* + user-initiated fetchers",
        "#   BLOCKED  AI *training* crawlers (no attribution benefit for a personal profile)",
        "#",
        "# Classic search",
        "User-agent: *",
        "Allow: /",
        "Disallow: /cache/",
        "Disallow: /scripts/",
        "",
        "# --- AI search / retrieval (these produce referrals and citations) ---",
    ]
    for token in allowed:
        lines += [f"User-agent: {token}", "Allow: /"]
    lines += ["", "# --- AI training crawlers: disallowed (see /ai-crawler-policy/) ---"]
    for token in disallowed:
        lines += [f"User-agent: {token}", "Disallow: /"]
    lines += ["", "Sitemap: {base}/sitemap.xml", ""]
    robots = "\n".join(lines)

    (out_dir / "robots.txt").write_text(robots.replace("{base}", args.base_url.rstrip("/")), encoding="utf-8")
    print("  robots.txt")

    # sitemap.xml
    sm = ['<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for slug, _ in written:
        loc = args.base_url.rstrip("/") + ("/" if slug == "index" else f"/{slug}/")
        sm.append(f"  <url><loc>{loc}</loc></url>")
    sm.append("</urlset>")
    (out_dir / "sitemap.xml").write_text("\n".join(sm), encoding="utf-8")
    print("  sitemap.xml")

    # 404 page
    not_found = page_html(
        {
            "title": "Page not found — Ivan Weiss van der Pol",
            "description": "The requested page does not exist on this site. Use the navigation or the machine-readable llms.txt file to find the content you need.",
            "slug": "404",
            "base_url": args.base_url,
            "assets": args.assets,
            "date": date.today().isoformat(),
            "no_md_alternate": True,
            "is_404": True,
        },
        "<h1>Page not found</h1>"
        "<p>That URL does not exist on this site. Nothing here is hidden — the site is fully "
        "enumerable, which is exactly what search engines and AI agents prefer.</p>"
        '<div class="grid">'
        '<div class="card"><h3>Read</h3><ul>'
        '<li><a href="/writing/">All guides</a></li>'
        '<li><a href="/writing/seo-core/">Search Engine Optimization</a></li>'
        '<li><a href="/writing/ai-search-optimization/">AI Search Optimization (AEO/GEO)</a></li>'
        '<li><a href="/writing/job-hunt-and-cv/">Senior job hunt &amp; CV strategy</a></li>'
        '<li><a href="/writing/tooling/">Tooling landscape</a></li>'
        '</ul></div>'
        '<div class="card"><h3>Know me</h3><ul>'
        '<li><a href="/about/">About</a></li>'
        '<li><a href="/cv/">CV</a></li>'
        '<li><a href="/work/">Selected work</a></li>'
        '</ul></div>'
        '<div class="card"><h3>Machine-readable</h3><ul>'
        '<li><a href="/llms.txt">llms.txt</a></li>'
        '<li><a href="/sitemap.xml">sitemap.xml</a></li>'
        '<li><a href="/robots.txt">robots.txt</a></li>'
        '</ul></div>'
        '</div>',
        NAV,
        '\n<script type="application/ld+json">' + json.dumps({
            "@context": "https://schema.org",
            "@graph": [{
                "@type": "WebPage",
                "@id": args.base_url.rstrip("/") + "/404.html#webpage",
                "url": args.base_url.rstrip("/") + "/404.html",
                "name": "Page not found",
                "description": "The requested page does not exist on this site.",
                "isPartOf": {"@id": args.base_url.rstrip("/") + "/#website"},
                "inLanguage": "en",
            }],
        }, indent=1) + '</script>',
    )
    (out_dir / "404.html").write_text(not_found, encoding="utf-8")
    print("  404.html")

    # PDF export of the canonical CV page (print-optimised, same source).
    # On by default: the CV page links to /cv.pdf, so a build without it ships a
    # broken link. make_pdf.py skips cleanly when no Chrome binary exists.
    if args.pdf:
        here = Path(__file__).resolve().parent
        subprocess.run(
            [sys.executable, str(here / "make_pdf.py"), "--site", str(out_dir), "--page", "cv"],
            check=False,
        )

    print(f"\nBuilt {len(written)} pages into {out_dir}/")
    return 0


if __name__ == "__main__":
    sys.exit(main())
