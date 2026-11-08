# Plan — Authoritative "Senior AI Engineer" Site (SEO + AI Search Optimization)

Status: approved scope, in execution. Owner: Ivan. Date: 2026-11-08.

## 0. The one-paragraph thesis

The site is a job-hunting weapon disguised as a technical authority site. A senior engineer's
CV gets filtered by an ATS and skimmed by a recruiter with 6 seconds. A *site* that ranks in
classic search AND gets cited by ChatGPT/Perplexity/Google AI Overviews creates a third
discovery channel: an AI assistant asked "who is a senior AI engineer who builds agent
orchestration and has FDA-compliance QA background" can cite Ivan's page — because the page
answers exactly that question in quotable, structured, citable form. Classic SEO gets the
page indexed; AEO/GEO gets it *cited*; the citation converts into an introduction.

Therefore every page on this site obeys three rules simultaneously:

1. **Answer-first.** The first 100 words of every page answer the question the title asks.
   Generative engines quote the opening; humans skim the opening.
2. **Citable.** Every factual claim carries a number, a named source and a date. The GEO
   paper (arXiv:2311.09735) shows quotations, statistics and citations are what moves a
   source into a generative answer — and that keyword stuffing *hurts*.
3. **Machine-legible.** Clean semantic HTML, JSON-LD, `llms.txt`, markdown twins of every
   page, and an unobstructed crawler path.

## 1. Why this is the right move in 2026 (evidence, not vibes)

| Fact | Source | Implication for this site |
|---|---|---|
| Google: AI Overviews and AI Mode surface links via query fan-out across many subtopics; **there are no additional technical requirements** to appear — the same fundamentals apply, and pages must be indexed and snippet-eligible | [Google Search Central — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) | Don't build exotic tricks. Build a genuinely well-structured, indexed, useful site. |
| GEO methods boost source visibility in generative answers by **up to 40%**; the best combination (fluency + statistics) beats any single method by >5.5% | [GEO paper, arXiv:2311.09735](https://arxiv.org/abs/2311.09735) | Write with statistics and fluency, not keyword stuffing (which scored *worse* than baseline on Perplexity). |
| `llms.txt` is now an **emerging convention audited by Lighthouse**; OpenAI, Anthropic and Gemini all publish one for their own docs; spec v2 (Aug 2026) adds markdown page twins and `rel="alternate"` link relations | [llmstxt.org](https://llmstxt.org/), [Lighthouse llms.txt audit](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt) | Ship `/llms.txt` + `.md` twins + `rel=alternate` link relations. Cheap, forward-looking, real. |
| **WebMCP** is a proposed web standard (Chrome origin trial, "Intent to Experiment") where websites declare their own tools with JSON Schemas so agents act correctly instead of scraping the DOM | [Chrome for Developers — WebMCP](https://developer.chrome.com/docs/ai/webmcp) | Expose one or two genuinely useful tools (e.g. "search this site", "get Ivan's résumé as JSON"). Cheapest possible agent-readiness win. |
| The AI-crawler split matters: `OAI-SearchBot` (search results) vs `GPTBot` (training), `ClaudeBot` vs `Claude-User` (user-initiated), `PerplexityBot`, `Google-Extended` (training/grounding, not Google Search ranking) | [Anthropic crawler docs](https://support.anthropic.com/en/articles/8896518), [Google crawler docs](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers) | Decide policy per bot, per purpose, and *say so in robots.txt*. A senior site about AI search must model good AI-crawler citizenship. |
| AI Overviews reduce clicks materially (Ahrefs measured a much larger drop than earlier estimates; industry studies vary by query mix) | [Ahrefs — AI Overviews reduce clicks](https://ahrefs.com/blog/ai-overviews-reduce-clicks) | Classic "rank #1 → get clicks" is broken; the win is *being the cited source* inside the answer. Optimize for citation, not position alone. |

## 2. Information architecture (pages and why each exists)

```
/                      Home — positioning, proof, navigation to the three content pillars
/cv/                   Résumé as a page (ATS-readable HTML + PDF + JSON-LD Person + JobPosting-free)
/about/                Long-form professional narrative + verifiable timeline + recommendations
/work/                 Project case studies, each with problem/method/result/metrics (E-E-A-T)
/writing/              Index of all guides (also the hub for internal linking)
/writing/seo-core/     Classic SEO 2026 — the full mechanics
/writing/ai-search-optimization/   AEO / GEO / LLMO — the differentiator
/writing/job-hunt/     Senior AI job-hunt & CV strategy (also useful to recruiters)
/writing/tooling/      Verified tooling landscape + recommended stack
/llms.txt              Machine summary of the whole site
/llms/*.md             Markdown twins of every page (spec v2)
/sitemap.xml           Generated
/robots.txt            Classic + AI-crawler policy, documented in-page
/.well-known/mcp.json? WebMCP tool manifest (or /mcp.json per WebMCP convention)
/404.html
```

**Why the CV is a page and not just a PDF:** the ATS parses PDFs poorly (column order,
tables, headers/footers, graphics), search engines rarely index PDF text reliably, and an AI
assistant cannot cite a PDF's structure. A semantic HTML résumé with a `<h1>`/`<h2>` section
structure, JSON-LD `Person` + `Occupation`, and a downloadable PDF twin serves ATS, crawler,
AI extractor and human reader at once.

**Why `/writing/job-hunt/` is on the site at all:** it demonstrates the exact competence being
hired for (SEO + AI search + content strategy), it captures recruiter searches, and it is
genuinely useful to other senior candidates — the kind of thing AI answers cite.

## 3. Content pillars (the "explains properly all areas" requirement)

| Pillar | Coverage | Primary sources |
|---|---|---|
| **Classic SEO (P1)** | Crawling/indexation, information architecture & internal linking, keyword research, on-page, technical SEO (canonicals, redirects, sitemaps, robots, JS rendering, hreflang, international, local), Core Web Vitals (LCP/INP/CLS), structured data & rich results, E-E-A-T, content strategy, topical authority, programmatic SEO, off-site/links, local, mobile & page experience, penalties & recovery, measurement (GSC, GA4, logs) | Google Search Central, web.dev, schema.org, W3C |
| **AI search optimization (P2)** | How generative engines retrieve and cite; the 9 GEO methods and their measured effects; answer-first writing; statistics & quotations; citations; entity/brand presence; `llms.txt` v2 + markdown twins; agent-readiness (WebMCP, MCP); AI crawler taxonomy & policy; AI Overviews / AI Mode mechanics; measuring citation share; AI-content detection & quality risk | arXiv:2311.09735, llmstxt.org, Chrome WebMCP + Lighthouse, Google Search Central AI features doc, vendor docs |
| **Job hunt & CV (P3)** | ATS parsing mechanics, keyword/boolean search, tailoring, résumé structure, case-study structure, application tracker, recruiter outreach, interview prep, negotiation, GitHub/portfolio as evidence, senior-AI keyword set, and how candidate visibility (classic + AI) works | ATS vendor docs, recruiter guidance, primary research |

Cross-cutting: **agent-readiness**, **measurement**, **tooling** (verified inventory).

## 4. Technical blueprint (summary; full detail in `content/technical-blueprint.md`)

- **Stack:** hand-written static HTML + one small CSS file. No framework, no build step required,
  no client-side JS beyond an optional 1 KB theme toggle. Rationale: the site must be fast
  (CWV), crawlable, and trivially deployable to Cloudflare Pages / GitHub Pages.
- **Every page ships:** unique `<title>` + meta description, canonical, Open Graph/Twitter card,
  JSON-LD (`WebSite` + `WebPage`/`Article` + `Person` on /about), `rel="alternate" type="text/markdown"`,
  `rel="describedby"` → llms.txt, breadcrumbs, `lang`, semantic landmarks, skip link, visible H1.
- **Content format:** answer-first TL;DR block → definition → mechanics → table → checklist →
  sources. Tables and bullet lists are quotable by LLMs; prose walls are not.
- **Performance budget:** HTML < 30 KB per page, one CSS file < 12 KB, zero web fonts,
  zero blocking JS, images as explicit dimensions + lazy loading, LCP < 1.5 s,
  CLS < 0.05, INP < 200 ms.
- **Accessibility:** WCAG 2.2 AA — contrast ≥ 4.5:1, visible focus, 44px targets, no color-only
  meaning, real `<table>` headers, skip link. (Accessibility is also a ranking and AI-parsing
  quality signal — treat it as part of the SEO work, not as a side quest.)
- **Verification:** a `scripts/verify_site.py` that checks every page for the full checklist
  (title, description, canonical, h1, JSON-LD validity, alt text, link resolution, sitemap
  coverage, llms.txt link validity, markdown twin presence) and exits non-zero on failure.
  CI runs it on every push.

## 5. AI-crawler policy (documented, not guessed)

Chosen policy for this site (rationale: a job-hunting site wants maximum AI visibility):

- Allow **search/retrieval** bots (`OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`,
  `Perplexity-User`, `Googlebot`, `Bingbot`) — these produce referral traffic and citations.
- Allow **user-initiated** fetchers (`Claude-User`, `GPT-User`, `Perplexity-User`).
- **Disallow training-only** bots (`GPTBot`, `Google-Extended`, `CCBot`, `anthropic-ai`,
  `Bytespider`) — this site is a professional profile; training crawlers give no benefit to
  the job hunt and content is republished without attribution.
- Ship `llms.txt` with a plain-language summary and a curated link list.
- Declare `X-Robots-Tag` equivalents only via robots.txt (no server-level overrides), and
  publish the policy in a visible page so it is citable and reviewable.

## 6. Distribution / promotion plan (the part that actually gets interviews)

| Lever | Action | Why |
|---|---|---|
| **Classic search** | Target long-tail informational queries with genuine answers ("how to get cited by AI search engines", "ATS resume parsing what actually happens") | Evergreen + citation-prone |
| **AI search** | Publish the guide that answers the questions assistants are asked about senior AI engineers; make each section self-contained so it can be quoted out of context | AI answers cite self-contained sections |
| **Entity presence** | One canonical `Person` page, consistent bio text across site + LinkedIn + GitHub profile + Crunchbase-style profiles; same wording everywhere | Entity consistency is a ranking/citation factor |
| **Off-site** | Rewrite GitHub profile README; make `aiw-hermes-agent` / `aiw-ops-toolkit` READMEs the canonical proof; link from LinkedIn; write 2–3 technical posts on dev.to/Hashnode with canonical back-links | Third-party pages are what gets retrieved and cited |
| **Off-site (cont.)** | Answer on Stack Overflow / Reddit / HN where the question is genuinely asked, pointing to the canonical guide | Referral + citation + proof of expertise |
| **Direct** | Recruiter outreach with a one-page role-targeted pitch, not the generic CV | Conversions happen in the message, not the attachment |

## 7. Work plan (execution order)

1. ✅ Research + repo/tool inventory (delegated, verified via GitHub API).
2. ✅ Canonical profile data extracted (`content/profile.md`).
3. ⏳ Write the three pillar guides + tooling landscape (delegated, citation-backed).
4. ⏳ Build the static site skeleton: pages, CSS, JSON-LD, llms.txt, robots, sitemap, verify script.
5. ⏳ Assemble: convert guides to HTML pages with markdown twins, wire sitemap + internal links.
6. ⏳ Run `scripts/verify_site.py`; fix every failure; run a local Lighthouse/axe pass if available.
7. ⏳ Git init, commit, publish (GitHub Pages / Cloudflare Pages), submit sitemap to GSC.
8. ⏳ Post-launch measurement plan: GSC + AI-referral analytics + citation-share tracker.

## 8. Definition of done

- Every page passes `scripts/verify_site.py` (0 failures).
- Every guide cites its sources with working links; no unsourced statistic.
- `/llms.txt` + markdown twin for every page; Lighthouse llms.txt audit passes.
- JSON-LD validates against schema.org for `Person`, `WebSite`, `WebPage`, `BreadcrumbList`.
- Lighthouse: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100 on the home page.
- The home page contains an explicit, quotable answer to "who is Ivan Weiss van der Pol" —
  one paragraph, three proof points, no marketing adjectives.
- Repository public and live, sitemap submitted.
