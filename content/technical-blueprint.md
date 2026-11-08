---
slug: writing/technical-blueprint
title: Technical blueprint: building a site for search and AI answers
description: The implementation specification for this site: static HTML from Markdown, JSON-LD graphs, markdown twins, llms.txt, a documented AI-crawler policy, and CI gates.
answer: This site is a static, framework-free build that ranks in classic search and gets cited by AI answer engines: hand-written HTML generated from Markdown, one stylesheet, a JSON-LD graph per page, a markdown twin and llms.txt for agents, a documented AI-crawler policy, and two verification scripts that block a publish when a check fails.
keywords: [technical blueprint, static site, SEO architecture, Core Web Vitals, structured data, JSON-LD, llms.txt, markdown twins, AI crawler policy, CI gates, answer engine optimization]
date: 2026-11-08
published: 2026-11-08
is_article: true
breadcrumbs: [[Home, ""], [Writing, "writing"], [Technical blueprint, "writing/technical-blueprint"]]
body_class: page-blueprint
---
# Technical blueprint: building a site for search and AI answers

Implementation specification for the Ivan Weiss van der Pol personal site:
a static, framework-free, deploy-anywhere site that is engineered to rank in
classic search engines **and** to be retrieved and quoted by AI answer
engines. This document is the normative description of that build: the
architecture, the page contract, the structured-data model, the crawler
policy, the performance and accessibility budgets, the verification gates, the
deployment shape, and the measurement loop.

The site is a job-hunting weapon disguised as a technical authority site. A
résumé gets filtered by an ATS and skimmed by a recruiter in seconds; a
*site* that is indexed by classic search and cited by AI assistants creates a
third discovery channel, because an assistant asked "which senior AI engineer
has shipped agent orchestration and regulated QA?" can quote a page that
answers exactly that question in quotable, structured, citable form. Classic
SEO gets the page indexed; answer-engine optimization gets it cited; the
citation converts into an introduction.

Everything below is grounded in primary documentation, with the date each
source was last revised. Where the industry is guessing — as it does about
`llms.txt` adoption, AI visibility "scores" and agentic browsing — that is
labelled as such rather than presented as fact.

## 1. Constraints, and why each one exists

| Constraint | Decision | Reason |
|---|---|---|
| No heavyweight framework | Hand-written static HTML generated from Markdown by a ~700-line Python script | Zero runtime cost, no hydration, no build-time dependency on a Node toolchain; the pages are the product |
| Fast pages | One stylesheet, no web fonts, no blocking JavaScript, explicit image dimensions | Core Web Vitals thresholds are LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at the 75th percentile ([web.dev — Web Vitals](https://web.dev/articles/vitals)); a budget is only real if it is enforced in CI |
| Accessible | WCAG 2.2 AA as a hard gate, not an aspiration | The accessibility tree is what screen-reader users and AI agents both read; structure is the intersection of the two audiences ([web.dev — agent-friendly websites](https://web.dev/articles/ai-agent-site-ux)) |
| Classic SEO | Unique title, meta description, canonical, one H1, OG/Twitter cards, XML sitemap, `robots.txt`, JSON-LD | Google's own structured-data policy requires markup to be a true representation of visible content, and warns that hidden or misleading markup can trigger a manual action ([general structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)) |
| AI search | Answer-first blocks, statistics, quotations, citations, markdown twins, `llms.txt`, documented crawler policy | Generative engines quote passages, not pages; the GEO study measured up to **40%** visibility gains from GEO methods and found keyword stuffing *worse* than doing nothing ([GEO, arXiv:2311.09735](https://arxiv.org/abs/2311.09735)) |
| Deploy anywhere | Pure static output: HTML, one CSS file, XML, TXT, PNG | Cloudflare Pages, GitHub Pages, Netlify, S3 + CloudFront or plain nginx all serve the same directory without configuration |
| Reviewable | Every claim carries a number, a source and a date; uncertain items are flagged, not hidden | The site's own editorial rule, and the only way the credibility survives its own scrutiny |

### Non-goals

- **Not a blog engine.** No CMS, no comments, no pagination, no taxonomy. The
  content set is small, deliberate and hand-edited.
- **Not an AI-chasing experiment.** Google's own optimization guide is
  explicit that its generative features need no special files or markup, that
  "chunking" content is unnecessary, and that structured data is not required
  for generative search ([optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
  The AI-specific work here is therefore about *quotability, access policy and
  machine legibility* — not about tricks.
- **Not a ranking-guarantee product.** Nothing in this document promises
  positions. It specifies mechanisms that are known to correlate with
  retrieval, citation and index eligibility, and it measures them.

## 2. Architecture

```
content/*.md          ← human-authored source of truth (this blueprint lives here)
      │
      │  scripts/build_site.py   (front-matter parser → Markdown subset → HTML)
      │  scripts/geo_lint.py     (GEO/AEO craft + on-page gate)
      │  scripts/verify_site.py  (link, sitemap, twin, JSON-LD, robots gate)
      ▼
site/                 ← the deployable artefact
   index.html              home
   <slug>/index.html       one directory per page
   <slug>.md               markdown twin of the same page
   assets/style.css        one stylesheet, dark/light, print rules
   llms.txt                agent index
   robots.txt              crawl policy incl. per-token AI decisions
   sitemap.xml             canonical URLs only
   404.html
```

Three properties of this shape matter more than the code:

1. **The Markdown twin and the HTML come from the same string.** The builder
   writes `body` to `<slug>.md` and the rendered `body` to
   `<slug>/index.html` in one pass, so the two cannot drift. That is the
   entire point of the twin: an agent that reads plain text gets the same
   content a browser gets, without the navigation chrome.
2. **Every page emits a JSON-LD graph, not a snippet.** One `@graph` per
   document, with stable `@id` values, so `WebSite`, `WebPage`, `Person`,
   `TechArticle` and `BreadcrumbList` nodes cross-reference instead of
   duplicating facts.
3. **The checks are scripts, not opinions.** `verify_site.py` exits non-zero
   on a broken internal link, a missing markdown twin, a sitemap URL that
   does not exist, an unparseable JSON-LD block, a page without a canonical,
   a page without exactly one `<h1>`, or an image without `alt`. `geo_lint.py`
   exits non-zero on a failed hard gate. A build that passes both is
   publishable; a build that does not is not, regardless of how good it
   looks.

## 3. Information architecture

| URL | Page | Purpose | JSON-LD types |
|---|---|---|---|
| `/` | Home | Positioning, proof table, navigation into the three content pillars, contact | `WebSite`, `WebPage`, `Person` |
| `/about/` | About | Long-form professional narrative, verifiable timeline, public recommendations | `WebPage`, `Person`, `BreadcrumbList` |
| `/cv/` | CV | The résumé as a crawlable, ATS-readable page with a printable/PDF twin | `WebPage`, `Person`, `BreadcrumbList` |
| `/work/` | Work | Case studies in problem / approach / result / what-it-proves form | `WebPage`, `BreadcrumbList` |
| `/writing/` | Writing | Index of the long-form guides; the hub of internal linking | `WebPage`, `BreadcrumbList` |
| `/writing/<guide>/` | Guides | The four pillar guides (SEO core, AI search optimization, job hunt & CV, tooling) | `WebPage`, `TechArticle`, `BreadcrumbList` |
| `/ai-crawler-policy/` | Policy | The documented, citable AI-crawler policy with primary sources | `WebPage`, `BreadcrumbList` |
| `/llms.txt` | Agent index | Curated, plain-language map of the site | — |
| `/robots.txt` | Crawl policy | Per-token allow/disallow decisions | — |
| `/sitemap.xml` | Discovery | Canonical URLs only | — |

**Why the CV is a page and not only a PDF.** Applicant tracking systems
extract PDF text in ways that lose reading order, and a PDF cannot be quoted
by an answer engine with a link to a specific claim. A semantic HTML résumé
with real headings, a `Person` JSON-LD node and a downloadable PDF twin
serves the ATS, the crawler, the AI extractor and the human reader at once.
The PDF is a convenience copy; the HTML is canonical.

**Why `/ai-crawler-policy/` is public.** A policy nobody can read is not a
policy. Publishing the per-token decisions with citations makes the site a
reference on the topic, and gives an answer engine a quotable table —
exactly the kind of asset that gets cited.

**URL rules.** Lowercase, hyphen-separated, directory-style (`/writing/<guide>/`)
so every page has a stable `index.html` and a flat markdown twin at
`/<slug>.md`. Slugs never change: a move is a 301 plus a canonical update,
never a silent re-slug.

## 4. The page contract

Every content file starts with a front-matter block. The parser is
deliberately minimal — scalars, inline `[a, b]` lists, block `- item` lists,
and nested `[[Name, path], ...]` pairs — and the builder is the only
consumer, so the contract can stay small enough to read in one sitting.

```yaml
---
slug: writing/ai-search-optimization     # required; directory path, no leading slash
title: AI Search Optimization in 2026     # required; 20–70 characters, unique per page
description: One-sentence summary         # required; 70–165 characters, unique per page
answer: The direct answer, 1–3 sentences   # required; renders as the "Short answer" block
keywords: [a, b, c]                       # optional; used by TechArticle markup
date: 2026-11-08                          # required; last reviewed
published: 2026-11-08                     # required for articles
is_home: true                             # optional; adds the WebSite node
is_article: true                          # optional; adds the TechArticle node
breadcrumbs: [[Home, ""], [Writing, "writing"]]   # optional; adds BreadcrumbList
body_class: page-writing                  # optional; styling hook
---

<level-1 heading: the page title, identical to `title`>

Body copy…
```

The body opens with the page title as a level-1 heading — exactly one per
page, textually identical to `title` — and then `##` sections.

### What are the hard rules per page?

1. **Exactly one `<h1>`**, textually identical to `title`, as the first
   element of the body. `verify_site.py` counts `<h1>` occurrences and
   `geo_lint.py` independently counts them; both fail on zero or two+.
2. **`##` for sections, `###` for subsections.** Never skip a level.
3. **Every page answers its own title question within the first 100 words.**
   The `answer:` front-matter value is rendered as a bordered "Short answer"
   block directly under the title, before the narrative. Google identifies the
   main visual title, heading elements and other prominent text as sources
   for the title link, and warns that multiple equally-weighted headings make
   it harder to tell which is the main one
   ([title link guidance](https://developers.google.com/search/docs/appearance/title-link)).
4. **At least three statistics per page**, each traceable to a source or to
   the canonical CV. A page with no numbers is not citable.
5. **At least three inline citations** as markdown links to primary
   documentation, with the source named in the link text so the citation
   survives into plain text.
6. **A visible review date** in the closing line, and `date:` in front
   matter. Freshness is a retrieval signal and an honesty signal.
7. **Tables for comparison, lists for enumeration, prose for argument.**
   Generative systems chunk on structure; a wall of prose is harder to quote
   accurately than a table row.

## 5. On-page SEO contract

Every generated page carries, without exception:

- `<title>` — the front-matter title, unique across the site, 20–70
  characters. Distinct text per page; boilerplate titles are explicitly
  called out as bad practice by Google.
- `<meta name="description">` — 70–165 characters, unique, and a real
  summary rather than a keyword list. Google uses the description when it
  describes the page better than the body does
  ([snippet control](https://developers.google.com/search/docs/appearance/snippet)).
- `<link rel="canonical">` — absolute, pointing at the canonical URL.
- Open Graph and Twitter card metadata — `og:title`, `og:description`,
  `og:url`, `og:type`, `og:site_name`, `twitter:card`.
- `<meta name="author">`, `charset`, `viewport`, and `<html lang="en">`.
- `rel="alternate" type="text/markdown"` → the markdown twin of that exact
  page, and `rel="describedby"` → the `llms.txt` that covers it. These are
  the v2 link relations for letting an agent find the plain-text version
  without guessing ([llmstxt.org v2 changes](https://llmstxt.org/changes.html)).
- A skip link, `<header>`, `<nav aria-label="Primary">`, `<main id="main">`
  and `<footer>` — real landmarks, so the accessibility tree carries the
  structure.
- The JSON-LD `@graph`.

## 6. Structured data model

The graph is deliberately small and deliberately cross-referenced. Node
`@id`s are stable absolute URLs plus a fragment (`#website`, `#person`,
`#webpage`, `#article`), so a consumer can join nodes across pages.

| Node | Where | Key properties |
|---|---|---|
| `WebSite` | Home | `name`, `url`, `description`, `inLanguage`, `publisher → #person` |
| `Person` | Home, About, CV | `name`, `jobTitle`, `email`, `telephone`, `address`, `knowsLanguage`, `alumniOf`, `hasCredential`, `knowsAbout`, `sameAs` (GitHub, LinkedIn) |
| `WebPage` | Every page | `url`, `name`, `description`, `isPartOf → #website`, `dateModified`, `inLanguage` |
| `TechArticle` | Long-form guides | `headline`, `description`, `datePublished`, `dateModified`, `author → #person`, `keywords`, `isAccessibleForFree` |
| `BreadcrumbList` | Every non-home page | `itemListElement` with `position`, `name`, `item` |

Rules that come straight from Google's policy, and are enforced by review
rather than by a validator:

- **Markup must match visible content.** Google states plainly: "Don't mark
  up content that is not visible to readers of the page." A `Person` node
  describing a title that the page never shows, or a credential that is not
  printed on the page, is a policy violation, not a richness win.
- **Use the most specific applicable type, and keep the vocabulary honest.**
  The graph currently emits `Person` on the home, about and CV pages, which
  is the entity the rest of the markup points at. The schema-native way to
  say "this page is about one person" is `ProfilePage` with a `Person`
  `mainEntity`, and Google's `ProfilePage` documentation describes exactly
  this use case — "an 'About Me' page on a blog site" — and notes that
  `Article` and other features can point at it
  ([ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page),
  [schema.org `ProfilePage`](https://schema.org/ProfilePage)). Adding
  `ProfilePage` to the about and CV pages means adding one node whose
  `mainEntity` is the existing `Person` node — no new facts, no new
  duplication, and the `@id` cross-references keep working. Until that
  wrapper exists, the graph describes the entity accurately and the page
  types stay the ones the builder actually emits.
- **Never emit deprecated rich-result types.** Google's FAQ rich result
  stopped appearing in Search results on 7 May 2026 and the documentation was
  removed in June 2026 ([Search documentation updates](https://developers.google.com/search/updates));
  the How-to rich result was retired earlier. The site therefore ships **no**
  `FAQPage` and **no** `HowTo` markup. Questions that readers ask are
  answered as visible prose and visible headings — which is what an answer
  engine quotes anyway — rather than as a rich-result type that no longer
  exists.
- **No `JobPosting`.** This is a personal profile, not a job board, and
  misrepresenting a page's purpose violates Google's spam policies.

Validation path: parse the JSON-LD with the local checker on every build,
then confirm in the Rich Results Test and the URL Inspection tool before
publishing a change.

## 7. The answer-first content model

This is the layer that distinguishes an answer-engine-optimized page from a
conventional blog post. Four mechanisms, applied to every page.

### 7.1 The "Short answer" block

The first thing on every page is a bordered block containing the direct
answer, rendered from the front-matter `answer:` field. It is inside the
`<main>` landmark, in the normal reading order, and it is plain text a
retrieval system can lift verbatim.

Why it works, mechanically: generative engines synthesize a response from
retrieved passages, and the passage most likely to be lifted is the one that
answers the question directly. A page whose first 100 words restate the
question and then answer it gives the engine a quotable chunk that needs no
re-writing — and, per Google's own guidance, a distinctive main title makes
it easier for a system to tell what the page is about
([title link guidance](https://developers.google.com/search/docs/appearance/title-link)).

### 7.2 Statistics, quotations and citations

The GEO benchmark evaluated **9** content interventions against a baseline of
unmodified source text, across a 10,000-query benchmark. The findings that
shape this site: adding **statistics** and **quotations** increased
visibility, and the best methods improved on baseline by **41%** and **28%**
on Position-Adjusted Word Count and Subjective Impression respectively;
**keyword stuffing performed worse than the unmodified baseline** and was
classified as non-performing; and effectiveness varied by domain, so
domain-specific optimisation matters. Repeating the experiment on a live
engine (Perplexity.ai) put the best methods at **22%** and **37%** improvement
on the same two metrics
([GEO: Generative Engine Optimization, arXiv:2311.09735](https://arxiv.org/abs/2311.09735)).

Applied here:

- **Statistics** — every page carries at least three numbers with units
  ("40%", "115+", "24 dashboard endpoints", "0.1 at the 75th percentile").
- **Quotations** — blockquotes with named sources: the public recommendations
  on the About page, the positioning line, the verbatim policy language from
  each vendor's documentation.
- **Citations** — markdown links with descriptive anchor text, so the citation
  survives into the markdown twin where an agent sees a URL and a name
  together.

Each page closes with a **Sources** block: a short fenced `markdown` list of
the primary sources behind that page, each with its title, URL and the date
the source was last revised. It is deliberately in raw markdown rather than
prose, because it is a citation manifest — copy-pasteable by a human writing
a post, and directly parseable by an agent building an answer. The same
block satisfies the `geo/citations` gate on both the HTML page and the
markdown twin.

### 7.3 Why do sections need to be self-contained?

Each `##` section is written to be quoted out of context: the heading states
the question, the first sentence states the answer, and the rest supplies
the evidence and the source. No section depends on a previous section to be
understood. This is what makes a page citable in a paragraph-length excerpt.

### 7.4 Why does entity consistency matter for citation?

One `Person` node, one bio, one set of credentials, one wording — reused
across the site, the LinkedIn profile, the GitHub README and any third-party
write-up. Google's guidance for generative features stresses that providing
a unique point of view and first-hand experience is what distinguishes a
source from a summary of what everyone else already says
([optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
Consistency across surfaces is what lets a retrieval system connect
"Ivan Weiss van der Pol" with "Senior AI & Automation Engineer" reliably.

## 8. Machine-legibility layer

| Artefact | Spec | Why it exists |
|---|---|---|
| `/llms.txt` | llms.txt v2: H1, blockquote summary, then `##` sections of link lists with one-line notes ([llmstxt.org](https://llmstxt.org/)) | A curated map of the site for an agent that would otherwise crawl to discover its shape. Lighthouse audits the file as part of its agentic-browsing checks and marks it Not Applicable only if the server 404s ([Lighthouse llms.txt audit](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt)) |
| `/<slug>.md` twins | The same body text as the HTML page, emitted in the same build pass | The v2 convention: agents follow links that point to LLM-friendly content; the twin is that content ([llms.txt v2 changes](https://llmstxt.org/changes.html)) |
| `rel="alternate" type="text/markdown"` | Per page | Tells a crawler where the plain-text version is, without guessing |
| `rel="describedby"` → `/llms.txt` | Per page | Tells a crawler which `llms.txt` covers this page |
| JSON-LD `@graph` | Per page | Machine-readable entity and page semantics |
| `sitemap.xml` | Canonical URLs only, with `lastmod` | Bing's guidance is explicit that sitemaps should list only canonical URLs and carry accurate freshness signals, because duplicate URLs dilute signals and reduce confidence in selecting a URL for grounding results ([Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)) |

**Honest note on `llms.txt` and Google.** Google's optimization guide says
directly that you do not need `llms.txt` or other machine-readable files for
its generative features, because Google Search does not use them
([optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
That is stated plainly, and this blueprint states it plainly too. The file
is cheap, is being adopted by thousands of sites, is audited by Lighthouse,
and is published by OpenAI, Anthropic and Google for their own documentation
— so it is worth shipping. It is *not* a Google ranking lever, and the site
never claims otherwise. Google is explicit that it may crawl and index many
kinds of files without treating them specially.

## 9. What is the AI-crawler policy?

The policy is implemented in `robots.txt`, mirrored by the Search generative
AI control, and published at `/ai-crawler-policy/` so that it is reviewable
and citable. The full reasoning, including the per-token table and the
verification method, lives on that page; the mechanics are:

**The distinction that matters is purpose, not vendor.** Each vendor now runs
several crawlers for several distinct purposes, and only the user-agent token
distinguishes them:

- *Search / retrieval* — produces a result, a citation or a referral:
  `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, `Applebot`.
  **Allowed.**
- *User-initiated* — a human asked, so the fetch is the answer being served:
  `ChatGPT-User`, `Claude-User`, `Perplexity-User`, `Google-CloudVertexBot`.
  **Allowed.**
- *Training-only* — no traffic, no referral, no attribution: `GPTBot`,
  `ClaudeBot`, `Applebot-Extended`, `CCBot`, `anthropic-ai`, `Bytespider`,
  `meta-externalagent`, `Amazonbot`, `Diffbot`. **Disallowed.**
- *One deliberate exception* — `Google-Extended`, allowed with the trade-off
  written down. **Allowed.**

**Why `ClaudeBot` is training-only while `Claude-SearchBot` is not.** Anthropic
documents the two separately: `ClaudeBot` collects web content for training
its models, while `Claude-SearchBot` indexes content to improve search result
quality, and `Claude-User` serves a user-initiated request
([Anthropic crawler documentation](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)).
Allowing one is not allowing the others, which is the whole point of reading
the vendor documentation instead of pattern-matching on the product name.

**Why `Google-Extended` is the one exception.** Google documents it as a
standalone token that governs both Gemini training *and* Gemini grounding, and
states that it does not affect inclusion in Google Search and is not a
ranking signal there ([Google common crawlers](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers)).
Grounding is a citation path — the model retrieves the content and links it —
so refusing the token would give up a real citation channel to avoid a
training use that costs nothing in classic search. That is a compromise, and
`/ai-crawler-policy/` says so on the record rather than burying it.

**Why `Applebot-Extended` is refused but `Applebot` is not.** Apple's own
documentation separates them: `Applebot` powers search across Spotlight, Siri
and Safari, while `Applebot-Extended` is the token publishers use to opt out
of having their content train Apple's foundation models — and disallowing it
leaves the site in Spotlight, Siri and Safari search
([About Applebot](https://support.apple.com/en-us/119829)). Refusing the
training token therefore costs no discoverability.

**What is *not* used.** No `NOINDEX`, no `NOARCHIVE`, no `NOCACHE`, no
`nosnippet`, no `max-snippet`, no `data-nosnippet` anywhere on this site.
Bing documents that `NOARCHIVE` prevents content from being used in Copilot
responses and grounding results, and that `NOCACHE` limits Copilot to the
URL, title and snippet, reducing citation depth
([Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)).
Every one of those directives would trade citations for a privacy posture
this site does not need — the content is a public professional profile meant
to be found.

**Site-level AI control.** Google's Search generative AI control manages
inclusion in AI Overviews, AI Mode and generative AI in Discover, defaults to
including the site, and takes effect within one to two days of a change
([Search generative AI control](https://support.google.com/webmasters/answer/16908024)).
It is left at the default, because exclusion is the opposite of the intent.

**Verification method.** User-agent headers are trivially spoofed. Each
vendor publishes the IP ranges its crawlers use — OpenAI
([searchbot.json](https://openai.com/searchbot.json),
[chatgpt-user.json](https://openai.com/chatgpt-user.json)), Anthropic
([bots.json](https://claude.com/crawling/bots.json)), Perplexity
([perplexitybot.json](https://www.perplexity.com/perplexitybot.json),
[perplexity-user.json](https://www.perplexity.com/perplexity-user.json)),
Google ([common-crawlers.json](https://developers.google.com/static/crawling/ipranges/common-crawlers.json)).
Google additionally documents that a genuine Googlebot identifies itself
three ways — user-agent header, source IP and reverse-DNS hostname — and
that all three must agree
([verify Google's requests](https://developers.google.com/crawling/docs/crawlers-fetchers/verify-google-requests)).
Robots.txt changes are not instant: OpenAI states roughly 24 hours, and
Perplexity states the same for its own bots.

**How the file is kept honest.** The deployed `robots.txt` must contain
exactly nine `Allow: /` groups (`OAI-SearchBot`, `ChatGPT-User`,
`Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`,
`Google-CloudVertexBot`, `Google-Extended`, `Applebot`) and nine `Disallow: /`
groups (`GPTBot`, `ClaudeBot`, `Applebot-Extended`, `CCBot`, `anthropic-ai`,
`Bytespider`, `meta-externalagent`, `Amazonbot`, `Diffbot`). The policy page
publishes that list and records the current divergence — the generator still
emits `Allow: /` for `ClaudeBot`, `Applebot-Extended`, `Bytespider` and
`meta-externalagent` — rather than leaving the discrepancy to be discovered
in a crawler log.

**Agent-facing tools.** WebMCP — a proposed standard for exposing site
capabilities to agents as typed tools with JSON Schemas, currently in origin
trial in Chrome with an Intent to Experiment
([WebMCP](https://developer.chrome.com/docs/ai/webmcp/)) — is used only for
read-only, non-transactional capabilities. Nothing on this site can be
purchased, submitted or modified by an agent, so no confirmation-gated
transaction tool is needed. The accessibility tree and the DOM do the
structural work; WebMCP is optional on top of it.

## 10. Performance budget

| Metric | Budget | Reference |
|---|---|---|
| HTML per page | < 20 KB for standard pages, < 60 KB for long-form guides (CI gate at 120 KB) | Page-weight gate in `geo_lint.py`; the blueprint page itself is the heaviest at ~53 KB, and it is text |
| CSS | One file, < 12 KB, no build step | System font stack, no web fonts, no icon font |
| JavaScript | Zero blocking JS; the only script on the site is the JSON-LD block | INP target is meaningless if there is no interaction to measure |
| LCP | < 1.5 s target; hard threshold 2.5 s | [web.dev — Web Vitals](https://web.dev/articles/vitals) |
| INP | < 200 ms | Same |
| CLS | < 0.05 target; hard threshold 0.1 | Same |
| Images | Explicit `width`/`height`, `alt` text, `loading="lazy"` below the fold | Prevents layout shift and gives agents a described asset |
| Fonts | System stack only | Zero font requests, zero FOUT, zero CLS from font swap |
| Caching | Immutable CSS gets a long `max-age`; HTML revalidated | Static host headers |

Techniques that do the work: `font-display` is moot with no web fonts;
layout stability comes from fixed image dimensions and no injected
banner; responsiveness comes from a single-column `max-width` measure with
`auto-fit` grids; the dark/light switch is a
`prefers-color-scheme` media query, so there is no flash and no toggle
script; print rules strip the chrome so the CV prints cleanly.

## 11. Accessibility budget (WCAG 2.2 AA)

Accessibility is not a side quest here — it is the same work as machine
legibility, because agents read the accessibility tree and screen-reader
users read it too
([web.dev — agent-friendly websites](https://web.dev/articles/ai-agent-site-ux)).

- Contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text and UI boundaries.
  Both palettes (dark and light) are checked against the same rule.
- A visible skip link as the first focusable element.
- Exactly one `<h1>` per page; no skipped heading levels.
- Real `<table>` markup with `<th scope="col">` — not layout tables.
- `<label>` for every form control; every control has an accessible name.
- Visible focus indicators with adequate contrast against both backgrounds.
- Touch targets ≥ 44 × 44 px.
- No meaning conveyed by colour alone.
- `<html lang="en">`, `dir="ltr"`, `charset` first in `<head>`.
- Motion respects `prefers-reduced-motion`.
- The page remains fully usable at 320 px width and at 200% zoom.

## 12. Verification gates

Two scripts, both exiting non-zero on failure, both runnable locally and in
CI.

**`scripts/verify_site.py` — structural gate.** Checks the built `site/`
directory: every HTML page has a title, a meta description of at least 20
characters, a canonical link, exactly one `<h1>`, a `lang` attribute, at
least one JSON-LD block that parses as JSON with `@context` and `@type` or
`@graph`, and `<img>` tags with non-empty `alt`. It resolves every internal
`href` and `src` to a file on disk and fails on a broken link. It confirms a
markdown twin exists for every page, that `sitemap.xml` exists and lists
only URLs that exist, that `llms.txt` exists with an H1, section headings and
at least three links, that `robots.txt` exists with `User-agent` and
`Sitemap` directives, and that `assets/` is populated.

**`scripts/geo_lint.py` — craft gate.** A heuristic linter over the built
pages and the markdown twins. Hard failures: title outside 20–70 characters,
meta description outside 70–165, missing canonical, zero or multiple `<h1>`,
missing `lang`, missing viewport, no JSON-LD, unparseable JSON-LD, an opening
section under 40 words, fewer than three statistics, fewer than five inline
citations, no level-1 heading in a markdown twin, an image without `alt`,
page weight over 120 KB. Warnings (non-blocking, but tracked): no
`rel="alternate" type="text/markdown"`, no `rel="describedby"` to
`llms.txt`, bare URLs in body text, no year/date, fewer than three `##`
sections, no list or table, no question-form headings, no quote, thin word
count, no skip link.

The distinction matters: the structural gate is binary and blocks the
deploy; the craft gate is a pre-publication checklist for the writing.

**Local pre-publish loop.**

```bash
python3 scripts/build_site.py --content content --out site --base-url "$SITE_URL"
python3 scripts/verify_site.py --site site --base-url "$SITE_URL"
python3 scripts/geo_lint.py site
```

## 13. Deployment

The `site/` directory is the deployable artefact. It is pure static files,
so it works unchanged on any of:

- **Cloudflare Pages** — build command `python3 scripts/build_site.py`, output
  directory `site`.
- **GitHub Pages** — same command, `site/` as the publishing directory.
- **Netlify / Vercel static** — same command, `site/` as the publish
  directory.
- **nginx / Caddy / S3 + CloudFront** — copy `site/` and serve it; add
  `Cache-Control` for the stylesheet and `X-Robots-Tag: noindex` only on
  build artefacts such as `cache/`.

Post-deploy: submit `sitemap.xml` in Search Console and Bing Webmaster
Tools; verify the property; confirm the `llms.txt` file returns 200 with
`text/plain`; run the Rich Results Test against the home page and one guide;
confirm the canonical host matches the deployed host exactly, with the
`www`/apex choice made once and enforced by a redirect rather than by
canonical tags alone; and confirm `robots.txt` is served from the site root
with no CDN interception.

## 14. Measurement loop

| Question | Instrument |
|---|---|
| Is the site indexed and ranked in classic search? | Search Console Performance report; the AI-feature impressions appear inside the Web search type ([AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)) |
| Is it appearing in AI Overviews and AI Mode? | The dedicated [Generative AI performance report](https://support.google.com/webmasters/answer/16984139), live worldwide since 31 August 2026, with pages/countries/dates/devices dimensions |
| Is it cited inside third-party answers? | A self-built citation-share tracker: a fixed query set run weekly across ChatGPT search, Perplexity and AI Overviews, recording whether the domain is cited and which URL is cited. There is no official reporting surface for this, so it has to be built |
| Are AI crawlers actually arriving? | Server log analysis filtered by the published bot IP ranges, not by user-agent alone |
| Is the site fast for real users? | Core Web Vitals field data at the 75th percentile; CrUX / Search Console Core Web Vitals report |
| Are bots being served correctly? | Spot-check `robots.txt` and `llms.txt` with a crawler user-agent from outside the network, and re-check after 24 hours to confirm propagation |
| Is content still accurate? | The `date:` field on every page, reviewed quarterly; upstream documentation that changes materially (Google's own docs are revised frequently — the AI-features page was last updated 10 December 2025, the generative-AI optimization guide 10 July 2026, the crawler overview 12 June 2026, the common-crawlers page 15 October 2026) |

## 15. Content operations

**Editorial rules inherited from the canonical profile data.** Claim roles,
dates and technologies exactly as recorded; publish no client names or
clinical detail beyond what is already public in public repositories; reuse
the quantified outcomes that exist (40% faster test-case generation, 60%
less manual testing effort, 4.0/4.0 GPA) and invent no others; attribute
every photograph, testimonial and case study to a named source with a date.
Where a fact is uncertain, mark it in the source file rather than smoothing
it over in the copy.

**Publishing cadence.** One guide per pillar, revised rather than replaced,
each with a review date. A page that cannot be revised in place ages badly;
the `date:` field and the "last reviewed" line make staleness visible.

**Off-site distribution.** The site is the canonical version; third-party
surfaces point back to it. The GitHub profile README and the flagship
repository READMEs become the canonical proof of the engineering claims, with
links to the relevant case study on `/work/`. Technical posts on dev.to or
Hashnode canonicalise back to the guide. Answers on Stack Overflow, Reddit
and Hacker News link to the canonical guide only where the question is
genuinely asked. Entity consistency across these surfaces is what lets a
retrieval system connect the name, the title and the evidence.

**The failure mode to avoid.** A site that publishes ten thin pages to
capture long-tail queries violates Google's scaled-content abuse policy and
is explicitly called out as ineffective in Google's own guidance
([optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
This site publishes fewer pages, each answerable on its own terms.

## 16. Open items for the pipeline owner

These are the known gaps between this blueprint and the current build, listed
so they are finished rather than discovered. None of them is a content
problem; all of them live in files the build owns.

| # | Item | Where | Status |
|---|---|---|---|
| 1 | The generated `robots.txt` still emits `Allow: /` for `ClaudeBot`, `Applebot-Extended`, `Bytespider` and `meta-externalagent`, which the documented policy disallows | `scripts/build_site.py` | Open — the policy page records the divergence so it is visible |
| 2 | The `ProfilePage` wrapper around the existing `Person` node is not emitted on `/about/` and `/cv/` | `scripts/build_site.py` | Open — one node, no new facts |
| 3 | The generated `404.html` fails the craft gate: it carries no citations, no statistics and no JSON-LD | `scripts/build_site.py` | Open — a 404 page is a real page and should be linted, but it is not a content page |
| 4 | `geo_lint.py` now reads the `@graph` wrapper correctly, so the "JSON-LD present but no @type found" warning no longer fires | `scripts/geo_lint.py` | Closed — every page's graph carries `@context` and typed nodes |

## 17. Definition of done

1. `verify_site.py` exits 0 on the built `site/` directory, with zero broken
   internal links and every sitemap URL resolving to a real file.
2. `geo_lint.py` reports zero hard failures on every page and every markdown
   twin.
3. Every page has a unique title (20–70 characters), a unique meta
   description (70–165 characters), a canonical, exactly one `<h1>`, a
   visible review date, at least three statistics and at least three inline
   citations to primary sources.
4. Every page emits a valid JSON-LD graph with cross-referenced `@id`s, and
   no deprecated rich-result type (`FAQPage`, `HowTo`) appears anywhere.
5. A markdown twin exists for every page, is reachable via
   `rel="alternate" type="text/markdown"`, and its content matches the HTML
   body.
6. `llms.txt` exists, follows the v2 structure, and every URL it lists
   resolves.
7. `robots.txt` documents the per-token AI-crawler decisions, and the same
   decisions are published at `/ai-crawler-policy/` with primary citations —
   including the reconciliation of the four tokens where the generated file
   still disagrees with the policy.
8. `sitemap.xml` lists canonical URLs only, and the sitemap is submitted in
   Search Console and Bing Webmaster Tools.
9. The site is deployable as-is to any static host from the `site/`
   directory with no server-side configuration.
10. Lighthouse on the home page: Performance ≥ 95, Accessibility ≥ 95, Best
    Practices ≥ 95, SEO = 100, and the `llms.txt` audit passing.

## 18. Sources

Every source behind this blueprint, in raw markdown so it can be copied into
a citation or parsed by an agent. Dates are the source's own "last updated"
stamp, not the date it was read.

```markdown
Google Search Central
- [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features): 2025-12-10 — eligibility for AI Overviews and AI Mode; no additional technical requirements
- [Optimizing your website for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): 2026-07-10 — RAG and query fan-out; non-commodity content; what to ignore
- [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies): 2026-07-10 — markup must match visible content
- [Intro to structured data markup](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data): JSON-LD as the recommended format
- [ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page): 2026-09-08 — the page type for a page focused on one person
- [Structured data markup that Google Search supports](https://developers.google.com/search/docs/appearance/structured-data/search-gallery): the live list of supported features
- [Influencing your title links](https://developers.google.com/search/docs/appearance/title-link): descriptive, distinct titles
- [Controlling your snippets](https://developers.google.com/search/docs/appearance/snippet): 2026-04-20 — unique meta descriptions; nosnippet, max-snippet, data-nosnippet
- [Control what you share with Google Search](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share): 2026-10-21 — robots meta, data-nosnippet and the Search generative AI control
- [Overview of Google crawlers and fetchers](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers): 2026-06-12 — how Google's clients are categorised
- [Google's common crawlers](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers): 2026-10-15 — Google-Extended does not affect Search inclusion or ranking
- [Verifying Google's requests](https://developers.google.com/crawling/docs/crawlers-fetchers/verify-google-requests): user-agent, source IP and reverse DNS must all agree
- [Preferred sources in Google Search](https://developers.google.com/search/docs/appearance/preferred-sources): 2026-09-18 — how a site asks to be a reader's preferred source
- [Guidance on generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content): 2026-10-01 — fact-check everything, including metadata
- [Latest Search documentation updates](https://developers.google.com/search/updates): the FAQ rich result deprecation of 2026-05-07
- [Search generative AI control](https://support.google.com/webmasters/answer/16908024): worldwide since 2026-08-31
- [Generative AI performance report](https://support.google.com/webmasters/answer/16984139): worldwide since 2026-08-31

web.dev and Chrome
- [Web Vitals](https://web.dev/articles/vitals): LCP 2.5 s, INP 200 ms, CLS 0.1 at the 75th percentile
- [Build agent-friendly websites](https://web.dev/articles/ai-agent-site-ux): screenshots, DOM and the accessibility tree
- [WebMCP](https://developer.chrome.com/docs/ai/webmcp/): origin trial, typed tools with JSON Schemas
- [Lighthouse llms.txt audit](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt): 2026-05-05

Standards and vendor policies
- [The /llms.txt file, v2](https://llmstxt.org/): the format this build follows
- [llms.txt v2 changes](https://llmstxt.org/changes.html): discoverability via link relations
- [OpenAI crawler documentation](https://platform.openai.com/docs/bots): OAI-SearchBot, GPTBot, ChatGPT-User, OAI-AdsBot
- [Anthropic crawler documentation](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler): ClaudeBot, Claude-User, Claude-SearchBot
- [Perplexity crawler documentation](https://docs.perplexity.ai/guides/bots): PerplexityBot, Perplexity-User
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a): IndexNow, canonical URLs, NOARCHIVE and NOCACHE effects on citations
- [IndexNow documentation](https://www.indexnow.org/documentation): the submission protocol
- [schema.org ProfilePage](https://schema.org/ProfilePage) and [Person](https://schema.org/Person): the vocabulary behind the Person and ProfilePage nodes

Research
- [GEO: Generative Engine Optimization (arXiv:2311.09735)](https://arxiv.org/abs/2311.09735): KDD 2024 — up to 40% visibility gain; statistics and quotations beat keyword stuffing
- [Pew Research Center on click behaviour with AI summaries](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/): 8% click-through with an AI summary versus 15% without
- [Ahrefs on AI Overviews and click-through](https://ahrefs.com/blog/ai-overviews-reduce-clicks-update): a 58% average CTR drop on AI Overview keywords
```

Last reviewed: 8 November 2026.
