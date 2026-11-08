---
slug: writing/seo-core
title: Classic SEO in 2026: The Complete Technical and Editorial Guide
description: A rigorous, primary-source guide to classic SEO in 2026 — crawling, indexation, ranking, Core Web Vitals, structured data, links, spam policy and measurement.
answer: Classic SEO in 2026 is four systems in sequence — crawl, index, rank, serve — and almost every expensive mistake is a failure at one of the first two. Google publishes three technical requirements for eligibility (Googlebot is not blocked, the page returns HTTP 200, it has indexable content), one content doctrine (helpful, reliable, people-first content judged on E-E-A-T, with trust weighted above the other three), one page-experience doctrine (Core Web Vitals at the 75th percentile — LCP under 2.5 s, INP under 200 ms, CLS under 0.1 — as the only page-experience factor the ranking systems use directly), and a spam policy list that now includes scaled content abuse and a site reputation policy that Google enforces differently inside the European Economic Area. Everything else — keyword research, link building, schema, sitemap hygiene — is downstream of those four.
is_article: true
published: 2026-11-08
date: 2026-11-08
keywords: [classic SEO 2026, technical SEO, crawling and indexing, Google ranking systems, core updates, spam policy, Core Web Vitals, structured data, canonicalization, robots.txt, sitemaps, search console, E-E-A-T, link building, site migration]
breadcrumbs: [[Writing, writing], [SEO core, writing/seo-core]]
---

# Classic SEO in 2026: The Complete Technical and Editorial Guide

Classic SEO in 2026 is four systems in sequence — crawl, index, rank, serve — and almost every
expensive mistake is a failure at one of the first two. Google publishes exactly three technical
requirements for eligibility: Googlebot is not blocked, the page returns HTTP `200`, and it has
indexable content ([technical requirements](https://developers.google.com/search/docs/essentials/technical)).
It publishes one content doctrine — helpful, reliable, people-first content, judged on experience,
expertise, authoritativeness and trust, with **trust weighted above the other three**
([creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)).
It publishes one page-experience doctrine — Core Web Vitals at the 75th percentile, and nothing else
from the page-experience checklist is used directly by the ranking systems
([understanding page experience](https://developers.google.com/search/docs/appearance/page-experience)).
And it publishes a spam policy list that, as of August 2026, includes scaled content abuse and a
site reputation policy that Google enforces differently inside the European Economic Area
([spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies),
[August 2026 site reputation update](https://developers.google.com/search/blog/2026/08/update-site-reputation-policy)).

Everything else — keyword research, link acquisition, schema, sitemap hygiene, internal linking —
is downstream of those four. This guide works through them in the order Google itself describes
them, cites the primary documentation for every non-obvious claim, and states the date each source
was last revised so you can tell settled ground from moving ground.

**Scope.** This is classic search: getting a page crawled, indexed, ranked and served in Google
Search and Bing, and defending it against the spam filters. It deliberately does **not** cover
AI answer engines, citation share, `llms.txt`, AI crawler policy or retrieval-layer behaviour —
that is a separate guide, because the mechanics and the measurement are different
([AI search optimization](/writing/ai-search-optimization/)). The boundary matters: Google states
that appearing in AI Overviews and AI Mode requires no additional technical work beyond ordinary
Search eligibility ([AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)),
so everything below is simultaneously the foundation layer of AI search. What differs is that in
classic search you are competing for a ranked list entry, and in AI search for a quotable passage.

---

## The 2026 cheat sheet

| Question | Answer in 2026 | Primary source |
|---|---|---|
| What makes a page eligible? | Googlebot not blocked, HTTP `200`, indexable content | [technical requirements](https://developers.google.com/search/docs/essentials/technical) |
| What is the content doctrine? | Helpful, reliable, people-first; trust matters most; no preferred word count | [helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) |
| Which page-experience factor does ranking use directly? | Core Web Vitals only | [page experience](https://developers.google.com/search/docs/appearance/page-experience) |
| What are the Core Web Vitals thresholds? | LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1, at the 75th percentile | [web.dev — Web Vitals](https://web.dev/articles/vitals) |
| Does `robots.txt` remove a page from Google? | No — it blocks crawling, not indexing; use `noindex` | [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro) |
| Does Google obey my canonical tag? | It is a hint among several signals; Google may choose differently | [canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization) |
| How big can a sitemap be? | 50 MB uncompressed or 50,000 URLs per file | [sitemaps.org protocol](https://www.sitemaps.org/protocol.html) |
| Is there a duplicate-content penalty? | No — duplicate content is a selection problem, not a punishment | [demystifying the "duplicate content penalty"](https://developers.google.com/search/blog/2008/09/demystifying-duplicate-content-penalty) |
| Which redirect type moves the canonical signal? | `301`/`308` (strong); `302`/`307` are weak | [redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects) |
| Does Google still use FAQ rich results? | No — the feature stopped appearing on 7 May 2026 and the docs were removed in June 2026 | [documentation updates](https://developers.google.com/search/updates) |
| Can I pay for better ranking? | No — appearing in Search is free and ranking is not for sale | [how Google Search works](https://developers.google.com/search/docs/fundamentals/how-search-works) |
| How many core updates ran in 2026? | Two — March (27 Mar–8 Apr) and May (21 May–2 Jun) — plus four spam updates | [ranking update history](https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history) |
| How long after a core update should I judge a drop? | At least a full week after rollout completes | [core updates](https://developers.google.com/search/docs/appearance/core-updates) |

---

## What actually changed in 2026

Search documentation is a living document, and 2026 was not a quiet year. Google's own changelog
records the following substantive changes to the classic-search surface
([latest Google Search documentation updates](https://developers.google.com/search/updates), last
updated 26 October 2026):

- **8 May 2026 — FAQ rich results deprecated.** Google added a deprecation notice stating the
  feature "will no longer appear in Google Search starting May 7, 2026", and removed the
  documentation entirely on **15 June 2026**. If your content strategy included `FAQPage` markup
  for rich-result visibility, that revenue line ended in 2026.
- **5 June 2026 — new guidance on third-party SEO tools and advice.** Google published
  [guidance on using third-party SEO tools, services and advice](https://developers.google.com/search/docs/fundamentals/third-party-seo),
  stating plainly that Google does not evaluate third-party services, that third-party tools do
  not have access to Google's internal ranking data, and that predictions from such tools "are their
  own and like predictions generally, may not happen."
- **15 June 2026 — `llms.txt` clarified as irrelevant to Google Search.** Google stated that
  `llms.txt` files are not needed for Google Search and will not positively or negatively affect
  visibility or rankings.
- **23 October 2026 — URL structure guidance tightened.** Word separation guidance was clarified
  to prefer hyphens over underscores in URLs, for historical reasons because underscores are
  commonly used to denote concepts kept together in code.
- **28 August 2026 — site reputation policy enforcement changed in the EEA.** Manual actions under
  the site reputation policy now apply to results shown to users outside the European Economic
  Area, while inside the EEA the affected section is separated and ranks on its own merits
  ([Update to the Site Reputation Policy](https://developers.google.com/search/blog/2026/08/update-site-reputation-policy)).
- **1 July 2026 — AMP delivery simplified.** Google now sends users directly to publishers' AMP
  host pages rather than routing through the AMP viewer and cache; AMP content continues to rank
  like any other web page.

The 2026 ranking-update calendar, taken from Google's
[Search Status Dashboard](https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history):

| Update | Window | Duration | Type |
|---|---|---|---|
| February 2026 Discover update | 5–27 Feb 2026 | 21 days | Discover only, US/English at launch |
| March 2026 spam update | 24–25 Mar 2026 | ~19 hours | Spam detection systems |
| March 2026 core update | 27 Mar – 8 Apr 2026 | 12 days | Core ranking systems |
| June 2026 spam update | 24–26 Jun 2026 | ~2 days | Spam detection systems |
| May 2026 core update | 21 May – 2 Jun 2026 | ~12 days | Core ranking systems |
| August 2026 spam update | 18–21 Aug 2026 | ~3 days | Spam detection systems |
| September 2026 spam update | 24 Sep – 8 Oct 2026 | ~14 days | Spam detection systems |

Note the shape of the year: **two core updates and four spam updates**. The spam updates are not
narrow policy patches — Google describes them as notable improvements to systems that "are
constantly operating", applied globally and to all languages
([spam updates](https://developers.google.com/search/docs/appearance/spam-updates)). A site that
sails through a core update and then loses 40% of traffic to a spam update has a policy problem,
not a content problem, and the remediation path is completely different.

---

## How Google Search actually works

Google's own in-depth guide describes three stages, and not all pages survive each one
([how Google Search works](https://developers.google.com/search/docs/fundamentals/how-search-works)):
**crawling** (Google downloads text, images and video from pages it found), **indexing** (it
analyses and stores that content, and decides what is canonical), and **serving** (it matches
queries against the index and returns results).

Two framing corrections belong at the top of a 2026 guide, because both are still routinely
misstated:

1. **Google does not accept payment to crawl a site more frequently or to rank it higher.** The
   documentation says so directly, and adds that appearing in Search results costs nothing
   regardless of what anyone tells you
   ([how Google Search works](https://developers.google.com/search/docs/fundamentals/how-search-works),
   [Search Essentials](https://developers.google.com/search/docs/essentials)).
2. **Meeting every requirement does not guarantee anything.** Meeting the technical requirements
   and best practices makes a site *more likely* to appear; Google retains complete discretion
   over whether it crawls, indexes or serves any given page
   ([Search Essentials](https://developers.google.com/search/docs/essentials)).

### What the ranking systems key on

Google's public [ranking-systems guide](https://developers.google.com/search/docs/appearance/ranking-systems-guide)
names five key signal families — **meaning, relevance, quality, usability and context** — and
states that the weight applied to each varies by query: for a current-news query, freshness
carries more weight than for a dictionary definition
([how results are ranked](https://www.google.com/search/howsearchworks/how-search-works/ranking-results/)).

The same page describes the individual systems Google will name publicly:

| System | What it does | Status |
|---|---|---|
| [BERT](https://blog.google/products/search/how-ai-powers-great-search-results/) | Understands how word combinations express meaning and intent | Active |
| [Neural matching](https://blog.google/products/search/how-ai-powers-great-search-results/) | Matches representations of concepts in queries and pages | Active |
| [Passage ranking](https://blog.google/products/search/search-on/) | Identifies individual sections of a page to judge relevance | Active |
| [RankBrain](https://blog.google/products/search/how-ai-powers-great-search-results/) | Understands how words relate to concepts, so pages match without exact terms | Active |
| [Link analysis / PageRank](https://www.google.com/search/howsearchworks/how-search-works/ranking-results/) | Uses the link structure of the web to determine what pages are about and which may be most helpful | Active, core since launch |
| Exact match domain system | Ensures Google does not over-credit domains whose names exactly match queries | Active |
| Freshness systems | Favours fresh content for queries that deserve freshness | Active |
| Original content systems | Promotes original reporting ahead of those who merely cite it | Active |
| Site diversity system | Generally avoids showing more than two listings from the same site in top results | Active |
| Reliable information systems | Surfaces more authoritative pages, demotes low-quality content | Active |
| Reviews system | Rewards in-depth reviews and original research by experts or enthusiasts | Active, 11 languages |
| Spam detection systems | Includes SpamBrain; constantly updated | Active |
| MUM | Understands and generates language | Not used for general ranking |
| Helpful content system | Folded into the core ranking systems in March 2024 | Retired |
| Panda / Penguin / Hummingbird | Folded into core (2015, 2016) or superseded (2013) | Retired |

Two details in that table are load-bearing. First, **PageRank is still a core ranking system** and
still link-based — Google's guide links the original PageRank research paper and the underlying
patent, and states plainly that "how PageRank works has evolved a lot since then, and it continues
to be part of our core ranking systems." The underlying patent is
[US 6,285,999, *Method for node ranking in a linked database*](https://patents.google.com/patent/US6285999),
assigned to Stanford University with Lawrence Page as inventor. Second, **the systems work at the
page level, with site-wide signals layered on top** — and Google is explicit that good site-wide
signals do not guarantee that all content from the site will rank highly, nor bad site-wide signals
guarantee that all content will rank poorly.

### Core updates: what to do when rankings move

Google's [core-updates documentation](https://developers.google.com/search/docs/appearance/core-updates)
is deliberately vague about mechanism and unusually specific about process. Core updates are "broad
in nature, and don't target specific sites or individual web pages." The prescribed response:

1. **Confirm the rollout is finished** on the [Search Status Dashboard](https://status.search.google.com/).
2. **Wait at least a full week** after it completes before analysing Search Console, then compare
   the week after with the week before the rollout began.
3. **Classify the drop by size.** A small drop — say position 2 to 4 — needs no drastic action, and
   Google explicitly recommends *against* changing content that is already performing well. A large
   drop — position 4 to 29 — warrants a site-wide self-assessment against the
   [people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
   questions.
4. **Analyse search types separately** (Web, Images, Video, News) so you do not mistake a
   vertical shift for a site-wide collapse.

Google's explicit warnings on what *not* to do are worth quoting because they contradict most
"recovery" advice in the industry: avoid "quick fix" changes made because you heard a page element
was bad for SEO; prefer changes that make sense for users and are sustainable; and **deleting
content is a last resort** — if you are considering deleting whole sections of a site, that is
likely a sign those sections were created for search engines first, and removing them can help the
good content on the site perform better.

The patience requirement is real: some changes take effect within days, but it "could take several
months for our systems to learn and confirm that the site as a whole is now producing helpful,
reliable, people-first content in the long term."

---

## Technical eligibility: the three gates

The bar for appearing in Google Search is lower than the industry implies. Google lists exactly
three [technical requirements](https://developers.google.com/search/docs/essentials/technical):

1. **Googlebot is not blocked.** If the page requires a login, or `robots.txt` disallows it, it
   will not be crawled.
2. **The page works** — Google receives HTTP `200 (success)`. Client and server error pages are
   not indexed.
3. **The page has indexable content** — textual content in a supported file type, not violating
   the spam policies.

Everything else in technical SEO is about making sure these three stay true as the site scales, and
about the quality of the signals attached to a page that clears them.

### HTTP status codes are ranking instructions

Google publishes a definitive table of how each status code affects its crawlers
([how HTTP status codes affect Google's crawlers](https://developers.google.com/search/docs/crawling-indexing/http-network-errors)).
The behaviours that matter most:

| Status | Effect on the index |
|---|---|
| `200` | Content is passed to indexing; indexing is still not guaranteed |
| `301` / `308` | Permanent. Google follows it and treats the target as a **strong** canonicalisation signal |
| `302` / `303` / `307` | Temporary. Google follows it but the target is only a **weak** signal |
| `304` | Content unchanged; signals may be recalculated, no indexing effect |
| `4xx` | Google stops using the URL and removes it from the index; crawling frequency decays |
| `5xx` / `429` | Crawl rate is reduced proportionally; indexed URLs are preserved for now but eventually dropped |

Two operational consequences follow. A server that returns `500` under load does not merely lose
traffic — it actively teaches Google to crawl you less. And a page that should not exist must
return `404` or `410`, not `200` with a "not found" body, because Google cannot tell the
difference between a soft 404 and a thin page, and it will keep crawling the URL.

Google follows up to **10 redirect hops** by default; each hop in a chain is latency for users and
work for the crawler.

### Canonicalization is a hint, not a command

Google clusters pages with similar main content and picks the most representative one; that page
is crawled most regularly and is what normally appears in results. The signals that feed the
decision are whether the page is served over HTTP or HTTPS, whether it redirects, whether it
appears in a sitemap, and whether it carries a `rel="canonical"` link
([what is canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization)).

Google's wording is unambiguous: "indicating a canonical preference is a hint, not a rule," and
Google may choose a different page than you do. The canonical page is also used as the main source
for evaluating content and quality — so a wrong canonical is expensive, because it redirects the
evaluation to the wrong URL.

Two separate mistakes are worth naming:

- **Duplicate content is not a spam violation.** Google has said so since 2008: duplicate content
  on a site "is not grounds for action on that site unless it appears that the intent of the
  duplicate content is deceptive and manipulate search engine results"
  ([demystifying the "duplicate content penalty"](https://developers.google.com/search/blog/2008/09/demystifying-duplicate-content-penalty)).
  Duplicates are a *selection* problem, and the fix is consolidation, not punishment.
- **`robots.txt` is not an indexing control.** It manages crawler traffic, and a blocked URL can
  still appear in results as a bare link with no description, because Google may discover the URL
  from links elsewhere. To keep a page out of the index, allow crawling and use `noindex`, or
  password-protect it
  ([introduction to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)).
  Google does not support `noindex` inside `robots.txt`
  ([block indexing with `noindex`](https://developers.google.com/search/docs/crawling-indexing/block-indexing)).

The underlying protocol is an IETF Standards Track document: [RFC 9309, *Robots Exclusion
Protocol*](https://www.rfc-editor.org/rfc/rfc9309.html), September 2022.

### Redirects: permanent means permanent

The distinction Google draws is between permanent and temporary, and it decides whether the
redirect target becomes canonical
([redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects)):

- **Permanent (`301`, `308`):** Googlebot follows the redirect and the indexing pipeline uses the
  redirect as a signal that the target should be canonical.
- **Temporary (`302`, `303`, `307`):** Googlebot follows it, but the target is not promoted to
  canonical; the source page can remain the one shown in results.

Server-side redirects are interpreted most reliably. An instant `meta refresh` (0 seconds) is
treated as permanent; a delayed one (more than 0 seconds) as temporary. Google also tracks the
redirect *source* as an "alternate name" of the canonical URL, and those alternates can still
appear in results — which is normal and fades over time.

### Sitemaps: a discovery aid, not an index command

A sitemap tells search engines which URLs you consider important and when they last changed. For
sites of roughly **500 pages or fewer** that are comprehensively internally linked, Google says you
may not need one at all ([learn about sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)).
You probably do need one if the site is large, is new with few external links, or is rich in
media or news content.

The hard limits come from the protocol itself
([sitemaps.org](https://www.sitemaps.org/protocol.html)): **50 MB uncompressed or 50,000 URLs per
file**, UTF-8 encoded, absolute URLs only. Google repeats the same limits and adds two rules that
are easy to get wrong ([build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)):

- A sitemap file **posted anywhere other than the site root** affects only the descendants of its
  parent directory unless you submit it through Search Console.
- **Google ignores `priority` and `changefreq`** and uses `lastmod` only if it is consistently and
  verifiably accurate.

Include only canonical, indexable URLs. A sitemap does not force indexing; it is a hint about
preference.

### Crawl budget: when it becomes a real constraint

Most sites never need to think about crawl budget. Google's guidance for
[optimizing your crawl budget](https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget)
is aimed at sites with **1 million+ unique URLs updated weekly or more**, **10,000+ unique URLs
changing daily**, or a large share of URLs reported as "Discovered – currently not indexed".

The model is two-sided: **crawl capacity limit** (how hard Google's infrastructure can hit your
server without overwhelming it — a function of response time, latency and error rates) and **crawl
demand** (how much Google wants to crawl you — driven by site size, update frequency, quality and
popularity). The controllable lever is **perceived inventory**: every URL you make Google aware of
that you do not want crawled consumes capacity. The concrete moves are consolidating duplicates,
blocking unimportant URLs in `robots.txt`, returning real `404`/`410` for removed pages, eliminating
soft 404s, keeping sitemaps current, and avoiding long redirect chains.

### JavaScript and rendering: three phases, one caveat

Google processes JavaScript in three phases — crawling, rendering, indexing — running an evergreen
version of Chromium, and it uses the **rendered HTML** to index the page
([JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)).
That is why a client-rendered single-page app is indexable at all. The caveats are specific:

- Rendering happens on a queue, so it is not instantaneous, and a page waiting to render is
  indistinguishable from one waiting to be crawled.
- **Server-side rendering or pre-rendering is still "a great idea"** because it is faster for users
  and crawlers, and not every bot runs JavaScript.
- Use the **History API, not URL fragments**, for client-side routing; Google cannot reliably
  resolve fragment URLs.
- Set the canonical in HTML; if you must set it with JavaScript, set it to the same value as the
  original HTML.
- **Avoid soft 404s** in single-page apps. Either redirect to a real server-side `404` URL or add a
  `noindex` meta tag to error pages.
- Do not lazy-load primary content behind interaction, and keep the `robots` meta tags identical
  between mobile and desktop.

### Mobile-first indexing is the default

Google uses the **mobile version** of a page, crawled with the smartphone agent, for indexing and
ranking ([mobile-first indexing best practices](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing)).
A mobile version is not strictly required, but if one exists it is what gets indexed. Practical
rules: identical `robots` meta tags on both versions, the same main content on both, the same
headings, and the same structured data. Google recommends **responsive design** over dynamic
serving or separate URLs because it is the easiest pattern to implement and maintain.

---

## The content doctrine, stated precisely

Google's [helpful-content documentation](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
is the single most useful page in the corpus, because it is written as a self-assessment rather
than a rule set. The signals that matter:

### E-E-A-T, and the ordering inside it

The framework is experience, expertise, authoritativeness and trust. Three precise statements:

- **Trust is the most important.** "Of these aspects, trust is most important. The others
  contribute to trust, but content doesn't necessarily have to demonstrate all of them."
- **E-E-A-T is not itself a ranking factor.** "While E-E-A-T itself isn't a specific ranking
  factor, using a mix of factors that can identify content with good E-E-A-T is useful."
- **Weight is higher on YMYL topics.** Google's systems give "even more weight to content that
  aligns with strong E-E-A-T for topics that could significantly impact the health, financial
  stability, or safety of people, or the welfare or well-being of society" — what Google calls
  "Your Money or Your Life" topics.

### Who, How and Why

Google asks three questions of every piece of content, and the third is the decisive one:

- **Who** created it. Is authorship self-evident? Do pages carry a byline where one would be
  expected? Do bylines lead to an author page with background? Google's warning is explicit:
  fabricating creator profiles — AI-generated headshots, made-up names, false credentials — "is a
  form of deception" and a signal of a low-quality page.
- **How** it was created. For product reviews this means how many products were tested, what the
  results were and how the tests were conducted. Google states that this applies to automated,
  AI-generated and AI-assisted content too, and asks whether automation is self-evident, whether
  background is provided, and why automation was useful.
- **Why** it was created. This is "perhaps the most important question". If the why is to help
  people, you align with what the systems reward. If the why is to attract search traffic, you do
  not.

### Main content, and the four attributes raters judge

Google defines main content as any part of a page that directly helps it achieve its purpose:
primary text and media, interactive features, user-generated contributions that fulfil the purpose,
tabbed or expanded sections, and page titles and headings. Raters then assess four attributes:

- **Effort** — "the extent to which human work went into creating the content". Automatically
  generating pages from feeds, or producing large amounts of text with generative AI without manual
  oversight or curation, represents little to no effort. Attribution or credit does not substitute
  for original effort.
- **Originality** — "the extent to which the content offers unique, original information or
  perspectives that aren't already available on other websites."
- **Talent or skill** — the skill needed to give a satisfying experience. Google is careful here:
  not every page requires specialised expertise.
- **Accuracy** — factually accurate for informational pages, and for YMYL topics, highly accurate and
  consistent with established expert consensus.

The underlying [Search Quality Evaluator Guidelines](https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf)
(current version dated 11 September 2025) are public and worth reading end to end if you own a
YMYL-adjacent site: they define the page-quality rating scale, the main-content and
supplementary-content split, and the separate treatment of YMYL topics.

### There is no preferred word count, and no freshness trick

Google's own list of "search engine-first" warning signs includes two questions whose answers are
parenthetical in the original:

- "Are you writing to a particular word count because you've heard or read that Google has a
  preferred word count? **(No, we don't.)**"
- "Are you adding a lot of new content or removing a lot of older content primarily because you
  believe it will help your search rankings overall by somehow making your site seem 'fresh'? **(No,
  it won't.)**"

Likewise from the same page: "Are you changing the date of pages to make them seem fresh when the
content has not substantially changed?" — a question with no approved answer.

The dating guidance that *is* legitimate is separate and documented
([influence your byline dates](https://developers.google.com/search/docs/appearance/publication-dates)):
Google does not depend on a single date factor, so provide a user-visible date labelled "Published"
or "Last updated", mirror it in `datePublished`/`dateModified` structured data, keep the two
consistent, and **do not specify future dates or the date of the event the page describes**.

---

## The spam policy list

Google's [spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
are the only list on the page that can take a site out of the index entirely, and they are
enforced by both automated systems and human review resulting in manual actions. A site that
violates them "may rank lower in results or not appear in results at all."

The current list, with the ones most likely to be missed in 2026 flagged:

| Policy | What it actually prohibits |
|---|---|
| **Cloaking** | Serving different content to users and to search engines in order to manipulate ranking |
| **Doorway abuse** | Pages created to rank for similar queries that funnel users to the real destination |
| **Expired domain abuse** | Buying an expired domain and repurposing it to manipulate rankings with low-value content |
| **Hacked content** | Content placed on a site without permission — code injection, page injection, content injection, malicious redirects |
| **Hidden text and link abuse** | White-on-white text, text behind images, off-screen CSS positioning, zero font size or opacity, single-character links |
| **Keyword stuffing** | Filling a page with keywords or numbers to manipulate rankings; lists of phone numbers; blocks of city names |
| **Link spam** | Buying or selling links, excessive link exchanges, automated link creation, text ads without `nofollow`, advertorials with optimised anchors, low-quality directory links, keyword-rich widget links, footer links, forum comment links with optimised anchors |
| **Machine-generated traffic** | Automated queries and scraping of results, including automated rank-checking |
| **Malicious practices** | Malware, unwanted software, back-button hijacking |
| **Misleading functionality** | Fake generators or tools that exist only to route users to deceptive ads |
| **Scaled content abuse** | "Many pages are generated for the primary purpose of manipulating search rankings and not helping users… no matter how it's created" |
| **Scraping** | Republishing or lightly transforming other sites' content without added value |
| **Site reputation policy** | Third-party content published on a host site mainly because of that host site's established ranking signals |
| **Sneaky redirects** | Redirects designed to show users and search engines different content |
| **Thin affiliation** | Affiliate pages that copy merchant copy verbatim with no original content or added value |
| **User-generated spam** | Spammy accounts, forum posts, comments, uploaded files |
| **Legal / personal-information removals** | Volume-based demotion: sustained valid copyright removals, doxxing, non-consensual imagery, CSAM |
| **Policy circumvention** | Attempts to bypass the spam policies or Google Search content policies |

Three of these deserve emphasis because they are 2026-specific or counter-intuitive:

**Scaled content abuse is method-neutral.** Google's text is explicit that the abuse is "no matter
how it's created". The examples named are generating many pages with generative AI without adding
value, scraping feeds or search results to generate pages (including through synonymising,
translating or other obfuscation), stitching content from different pages without adding value,
and creating multiple sites to hide the scaled nature of the content. The remedy, if you are
already hosting it, is to exclude it from Search.

**The site reputation policy now treats the EEA differently.** From 30 August 2026, a manual action
under the site reputation policy applies directly to results shown to users **outside** the EEA.
Inside the EEA, the affected portion of the site is separated and may rank independently on its own
merits — and, critically, the fact that a page was previously subject to such an action is not used
as a ranking signal. Google also published worked examples: an integrated coupons-and-deals
section and an authored original affiliate article are unlikely to draw action; an unauthored
affiliate article that is not integrated into the publication and is duplicated across other sites
likely is
([update to the site reputation policy](https://developers.google.com/search/blog/2026/08/update-site-reputation-policy),
[site reputation policy](https://developers.google.com/search/docs/essentials/spam-policies#site-reputation)).

**Link spam is about *how* links are created, not about how many.** Buying and selling links is
listed — but Google explicitly recognises that buying and selling links is a normal part of the
economy of the web. The policy is satisfied by qualifying such links with `rel="nofollow"` or
`rel="sponsored"`. What remains prohibited is the deliberate construction of ranking-manipulation
link patterns: partner pages existing solely for cross-linking, automated link creation, and
keyword-stuffed widget links distributed across sites.

---

## On-page: how a page is titled, described and found

### Title links

A title link is the clickable title in a result. Google generates it **completely automatically**
from a set of sources, and your influence is a set of preferences rather than a command
([influencing title links](https://developers.google.com/search/docs/appearance/title-link)):

- Content in the `<title>` element
- The main visual title shown on the page
- Heading elements such as `<h1>`
- Content in `og:title` meta tags
- Other large, prominent text on the page
- Other page text, anchor text, and text within links pointing to the page
- `WebSite` structured data

Google's stated best practices: give every page a title; write descriptive and concise text and
avoid vague descriptors like "Home" or "Profile"; avoid keyword stuffing; avoid repeated or
boilerplate titles across a site; brand titles concisely rather than repeating the brand on every
page; make the main title visually distinct from other text on the page; use the same language and
writing system as the primary content; and avoid putting flight prices in `<title>`, because Google
will not show prices that can change every few minutes.

Google also documents the failure modes it detects and corrects — half-empty titles, obsolete
titles that no longer match the visible heading, inaccurate titles, and micro-boilerplate titles
that differ by one token across a set of pages.

### Snippets and meta descriptions

Snippets are generated from page content. Google "primarily" uses the content itself and only
sometimes uses the meta description, when it would describe the page better
([control your snippets](https://developers.google.com/search/docs/appearance/snippet)). The
practical guidance is therefore: write a meta description because it is a pitch for the human, not
because it is the ranking surface. Make each one unique and page-specific; include information
that may not otherwise be visible (author, date, price, manufacturer); programmatic generation is
acceptable for large database-driven sites as long as the output is human-readable and diverse; and
do not build descriptions out of keyword strings.

For snippet length control Google supports `nosnippet`, `max-snippet:[number]` and
`data-nosnippet`
([robots meta tag, `data-nosnippet` and `X-Robots-Tag` specifications](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)).
In the same document Google notes that it does not enforce placement of robots meta tags in the
`<head>` and will respect them in the body as well — behaviour that was documented, not changed, in
March 2026.

### Links, internally and externally

Google's [link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
cover the mechanics:

- Only an `<a>` element with an `href` attribute is reliably crawlable. JavaScript event handlers
  are not.
- Anchor text should be "descriptive, reasonably concise, and relevant to the page that it's on and
  to the page it links to". "Click here" and "Read more" are bad. A 40-word sentence is also bad.
- Give links surrounding context, and do not chain them next to each other — you lose the
  sentence that tells the reader what the destination is about.
- **Every page you care about should have a link from at least one other page on your site.**
- Linking out is not risky and can help establish trustworthiness — citing sources is a quality
  signal, and Google explicitly says using external links "can help establish trustworthiness".
- Use `nofollow` only when you do not trust the source — not for every external link.

Qualifying outbound links is a separate, documented mechanism
([qualify your outbound links](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links)):

| `rel` value | Use it for |
|---|---|
| `sponsored` | Advertisements and paid placements. Preferred over `nofollow` for this, though `nofollow` remains acceptable |
| `ugc` | User-generated links such as comments and forum posts. You may remove it from consistently high-quality contributors |
| `nofollow` | Everything else where you do not want Google to associate your site with, or crawl from, the target |
| Multiple values | Space- or comma-separated, e.g. `rel="ugc nofollow"` |

### URLs and site structure

Google's [URL structure guidance](https://developers.google.com/search/docs/crawling-indexing/url-structure)
requires that URLs follow IETF STD 66, that fragments not be used to change page content, and that
parameters use `=` and `&` as separators. The recommendations: use readable words rather than long
ID numbers, use your audience's language, percent-encode non-ASCII characters, and — since the
October 2026 clarification — **separate words with hyphens rather than underscores**.

Site structure matters for crawl efficiency, not just human legibility. On sites with more than a
few thousand URLs, grouping similar topics into directories helps Google learn how often each
directory changes and crawl them at different frequencies
([SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)).

---

## Site architecture, topical clusters and internal linking

Site structure is not a ranking feature on its own, but it decides three things that are: how
efficiently the crawler spends its attention, which page Google treats as the representative of a
duplicate set, and how much topical context each individual URL inherits from its neighbours.

### What Google actually documents about structure

Google's [SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
makes two concrete claims, and both are conditional on size:

> **Group topically similar pages in directories.** If you have more than a few thousand URLs on
> your site, how you organize your content may have effects on how Google crawls and indexes your
> site. Specifically, using directories (or folders) to group similar topics can help Google learn
> how often the URLs in individual directories change.

> **Organize your site.** When you're setting up or redoing your site, it can be good to organize
> your site in a logical way because it can help search engines and users understand how your pages
> relate to the rest of your site. Don't drop everything and start reorganizing your site right now
> though: while these suggestions can be helpful long term, search engines will likely understand
> your pages as they are right now, regardless of how your site is organized.

The second paragraph is the one practitioners skip. Google is saying a site restructure is not a
ranking event; a correct structure that ships late beats a perfect structure that never ships.

Duplicate handling is documented as a separate mechanism. During indexing, Google groups pages it
finds with similar content into clusters and selects "the one that's most representative of the
group" as the canonical, keeping the rest as alternate versions for contexts such as mobile or a
more specific sub-query
([how Search works](https://developers.google.com/search/docs/fundamentals/how-search-works)).
Google also collects signals about the canonical page — including the language of the page and the
country the content is local to — which are then used at serving time.

### The internal-link rule that is actually enforced

From Google's [link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable):

> **Every page you care about should have a link from at least one other page on your site.**

That is the whole rule. It is a crawl-discovery requirement, not an equity mechanic — Google does
not publish a formula that converts a link into rank. What the same page does specify is the
quality of the link: the anchor text should be "descriptive, reasonably concise, and relevant to the
page that it's on and to the page it links to," because it "provides context for the link, and sets
the expectation for your readers." Generic anchors ("click here", "read more") fail the test, and
so does an anchor that is a whole sentence.

The practical test: after every content change, can you name the contextual inbound link to each
new page, and quote its anchor text? If you cannot, the page is an orphan until the next crawl.

### Why passage ranking makes section-level structure a ranking concern

Google's [ranking-systems guide](https://developers.google.com/search/docs/appearance/ranking-systems-guide)
lists **passage ranking** as an active core system: it "identifies individual sections of a page
to judge relevance." That single line changes editorial design. If a page is judged section by
section, then a page whose sections are complete answers to single questions can win a query that
a longer page with a vaguer structure loses.

The same guide lists **BERT** ("understands how word combinations express meaning and intent") and
**neural matching** ("matches representations of concepts in queries and pages"). Together they
mean topical coverage — saying the thing a reader would say, in the vocabulary of the field — is
worth more than repeating a keyword. Both are reasons the [GEO paper's](https://arxiv.org/abs/2311.09735)
keyword-stuffing result is unsurprising in classic search as well as generative ones.

### Building a topical cluster that is not a keyword list

"Topic cluster" is a practitioner term, not Google's. The documented pieces it assembles are:
directory grouping, the one-inbound-link rule, descriptive anchor text, passage-level retrievability,
and the helpful-content question "Does the content provide a substantial, complete, or comprehensive
description of the topic?"
([creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)).
Assembled, the method is:

| Layer | What it is | Documented mechanism it relies on |
|---|---|---|
| Pillar | One page that defines the topic and links out to every spoke | Directory grouping; passage ranking on the pillar's own summary section |
| Spoke | One page per sub-question, each self-contained | Passage ranking; the "substantial, complete, comprehensive description" test |
| Link graph | Every spoke links up to the pillar and across to its siblings | The one-inbound-link rule; descriptive anchor text |
| Vocabulary | One canonical term per concept, used consistently across the cluster | BERT and neural matching |

The failure modes are specific. A cluster of spokes that all link only to the pillar is a silo: each
spoke inherits none of its siblings' context, and the pillar becomes a list rather than a map. A
cluster whose spokes repeat the pillar's framing in different words is a duplicate set, and Google
clusters it and picks one representative. A cluster that covers a topic with eight variations of
one idea is a thin cluster — the helpful-content question is about coverage of the *topic*, not
volume of posts.

### Entities: what the documentation actually says, and what it does not

There is no public Google document titled "entity SEO", and no public documentation of a
Knowledge Graph API for site owners. Claims that you can "optimise for the knowledge graph" by
adding schema are not grounded in anything Google has published. What is published is narrower and
more useful:

- **The `sameAs` property** is the documented way to connect an entity to its other identities.
  Google's [introduction to structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
  states that "Google can make general use of the `sameAs` property and other schema.org structured
  data," and that such elements "may be used to enable future Search features, if they are deemed
  useful." Note the hedge: it is a signal of identity, not a ranking factor.
- **Profile pages have their own type.** The [`ProfilePage` structured data guide](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
  requires `mainEntity` (a `Person` or `Organization`) and lists `sameAs` as the URL to "other
  external profiles or home pages for the profile" — exactly the multi-profile identity problem a
  personal site has, and exactly what a personal site's `Person` node should carry.
- **The people-first doctrine asks for authorship.** The expertise questions in
  [creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
  ask whether the content presents "background about the author or the site that publishes it, such
  as through links to an author page or a site's About page."

So the honest formulation of entity work is: use `sameAs` to make your identity unambiguous across
the web, publish an author page with a stable `Person` entity, and keep the name, title and
one-line description identical on every third-party profile. Google may use that to understand you;
it has not published a mechanism that turns it into rank, and any source that claims otherwise is
selling something.

---

## Structured data: eligibility, not ranking

Structured data is machine-readable markup that lets Google understand and display page content.
The rules that matter are in the
[general structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies),
and the failure mode that catches people out is this:

> **A structured data manual action means that a page loses eligibility for appearance as a rich
> result; it doesn't affect how the page ranks in Google web search.**

So structured data is an *eligibility* lever, not a ranking lever. The specific rules:

- **Format:** JSON-LD (recommended by Google), Microdata or RDFa.
- **Access:** do not block structured-data pages from Googlebot with `robots.txt`, `noindex` or
  other access control.
- **Content:** provide up-to-date, original content; **do not mark up content that is not visible to
  readers**; do not mark up irrelevant or misleading content; do not use it to deceive or
  impersonate.
- **Relevance:** the markup must be a true representation of the page. A woodworking site labelling
  instructions as recipes is irrelevant markup.
- **Completeness:** specify all required properties for the type, plus recommended ones.
- **Location:** put the markup on the page it describes. If you have duplicate pages, place the
  same structured data on all of them, not just the canonical.
- **Specificity:** use the most specific applicable schema.org type.
- **Images:** all image URLs in markup must be crawlable and indexable.

The [schema.org vocabulary](https://schema.org/) itself consists of 826 types, 1,540 properties, 19
datatypes, 96 enumerations and 544 enumeration members, and as of 2024 was in use on more than
45 million web domains covering over 450 billion objects
([schema.org](https://schema.org/)). It was founded by Google, Microsoft, Yahoo and Yandex and is
developed through an open community process hosted by the W3C.

Google's [rich-result gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
lists the supported feature types. The ones that carry the most traffic in practice are
[Article](https://developers.google.com/search/docs/appearance/structured-data/article),
[Product / merchant listings](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing),
[LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business),
[Breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb),
[JobPosting](https://developers.google.com/search/docs/appearance/structured-data/job-posting),
[ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page),
[VideoObject](https://developers.google.com/search/docs/appearance/structured-data/video),
[SoftwareApplication](https://developers.google.com/search/docs/appearance/structured-data/software-app),
[Dataset](https://developers.google.com/search/docs/appearance/structured-data/dataset) and
[ReviewSnippet](https://developers.google.com/search/docs/appearance/structured-data/review-snippet).
The FAQ type is gone as of 2026.

A separate but related lever is the **site name**. Google derives it automatically, but
`WebSite` structured data on the home page is the strongest way to express a preference. One name
per site, defined at domain or subdomain level — not subdirectory
([provide a site name to Google Search](https://developers.google.com/search/docs/appearance/site-names)).

### Images and video

For images, the technical requirements apply plus image-specific ones: use standard HTML `<img>`
elements (Google does not index CSS images), submit an image sitemap for images you cannot otherwise
discover, provide a `src` fallback alongside `srcset`/`<picture>`, and use supported formats — BMP,
GIF, JPEG, PNG, WebP, SVG and AVIF. Alt text is both an accessibility requirement and an anchor-text
signal when the image is itself a link
([Google image SEO best practices](https://developers.google.com/search/docs/appearance/google-images)).

For video, Google requires a dedicated video page on the same domain where users can watch the
video, and describes [video SEO best practices](https://developers.google.com/search/docs/appearance/video)
in terms of structured data accuracy, thumbnail quality, and making sure the video is actually
watchable on the page.

---

## Page experience and Core Web Vitals

Google is unusually precise here, and the precision is the guidance.

**What the ranking systems use.** Only Core Web Vitals. From the
[page-experience documentation](https://developers.google.com/search/docs/appearance/page-experience):
"Core Web Vitals are used by our ranking systems… Beyond Core Web Vitals, other page experience
aspects don't directly help your website rank higher in search results." There is no single
"page experience signal"; the systems consider a variety of signals aligned with overall page
experience, and evaluate content **page-specifically**.

**The thresholds.** From [web.dev's Web Vitals article](https://web.dev/articles/vitals) and
[PageSpeed Insights' thresholds table](https://developers.google.com/speed/docs/insights/v5/about):

| Metric | Good | Needs improvement | Poor |
|---|---|---|---|
| Largest Contentful Paint (LCP) | ≤ 2.5 s | ≤ 4.0 s | > 4.0 s |
| Interaction to Next Paint (INP) | ≤ 200 ms | ≤ 500 ms | > 500 ms |
| Cumulative Layout Shift (CLS) | ≤ 0.1 | ≤ 0.25 | > 0.25 |
| First Contentful Paint (FCP) | ≤ 1.8 s | ≤ 3.0 s | > 3.0 s |
| Time to First Byte (TTFB, experimental) | ≤ 800 ms | ≤ 1.8 s | > 1.8 s |

**The measurement rule.** A page passes if the **75th percentile** of loads is "good" for all three
Core Web Vitals, segmented across mobile and desktop
([web.dev](https://web.dev/articles/vitals), [PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about)).
Real-user data comes from the [Chrome UX Report (CrUX)](https://developer.chrome.com/docs/crux), a
dataset of how real Chrome users experience popular destinations, reported by PageSpeed Insights
over the **previous 28-day collection period**. Lab data comes from Lighthouse, which is useful for
debugging but does not capture real-world bottlenecks.

**What else is on the checklist but not a ranking input.** Secure HTTPS, mobile-friendliness, no
excessive ads, no intrusive interstitials, and clear separation of main content from the rest. These
make the page better to use and align with what the systems seek to reward, but Google is explicit
that a good score in the Search Console Core Web Vitals report does not guarantee ranking.

---

## Links, authority and the disavow tool

Link acquisition is the part of classic SEO most damaged by over-selling. Google's position is
documented and unglamorous:

- **Links are a signal for relevance and for discovery.** They are how Google finds new pages.
- **Links are one quality signal among many.** "One of the factors used to determine quality is
  understanding if other prominent websites link or refer to the content."
- **Paid placement is legitimate when qualified.** Advertising with Google has no effect on
  organic presence, but buying and selling links for ranking purposes is a policy violation unless
  qualified with `rel="sponsored"` or `rel="nofollow"`.

Google's disavow tool is a genuine last resort, and the documentation says so
([disavow links to your site](https://support.google.com/webmasters/answer/2648487)):

> In most cases, Google can assess which links to trust without additional guidance, so most sites
> will not need to use this tool.

You should disavow only if **both** conditions hold: you have a considerable number of spammy,
artificial or low-quality links pointing at your site, **and** those links have caused — or are
likely to cause — a manual action. First, try to get the links removed. If you do disavow: one URL
or domain per line, `domain:` prefix for whole domains, no subpaths, UTF-8 or 7-bit ASCII, `.txt`
filename, maximum URL length **2,048 characters**, maximum file size **100,000 lines and 2 MB**.
One list per property; uploading a new list replaces the old one. The tool does not support Domain
properties. And the warning is explicit: "If used incorrectly, this feature can potentially harm
your site's performance in Google Search results."

One more mechanical point about spam updates, which surprises people
([spam updates](https://developers.google.com/search/docs/appearance/spam-updates)): when a spam
update removes the effect of spammy links, the ranking benefit those links had generated is lost
and **cannot be regained**. That is a one-way door, and it is why link hygiene from the start beats
cleanup later.

---

## International and multi-region

For sites with multiple language or regional versions, Google documents three equivalent methods —
HTML `<link>` elements, HTTP headers, or sitemap entries — and one hard rule: each language version
must list **itself as well as** all other versions
([localized versions of your page](https://developers.google.com/search/docs/specialty/international/localized-versions)).

- URLs must be fully qualified including transport method.
- `hreflang` must be **bidirectional**: if two pages do not point at each other, the tags are
  ignored — which is also what stops another site arbitrarily declaring your page as an alternate.
- Provide a catch-all `x-default` for users whose locale matches no specific variant.
- Google does **not** use `hreflang` or the HTML `lang` attribute to detect page language; it uses
  its own algorithms.
- Localized versions count as duplicates only when the main content remains untranslated.

For regional variants in the same language, use **both** canonicalisation and `hreflang` — the
canonical tells Google which is the master, `hreflang` tells it which audience each is for.

Local presence has its own track. Claim and verify your
[Business Profile](https://developers.google.com/search/docs/appearance/establish-business-details),
verify the site in Search Console, mark up `Organization` structured data for your logo, and keep
the two in sync — Google reads business details from the web, and verified owners can correct the
knowledge panel.

---

## Measurement: the Search Console reports that matter

Search Console is free and is the primary instrumentation for classic SEO
([about Search Console](https://support.google.com/webmasters/answer/9128668)). The reports that
carry signal, and what each answers:

| Report | Question it answers | Link |
|---|---|---|
| Performance | Which queries produce impressions and clicks, at what position and CTR? | [Performance report](https://support.google.com/webmasters/answer/7576553) |
| Page Indexing | Which URLs are indexed, and why are the others excluded? | [Page Indexing report](https://support.google.com/webmasters/answer/7440203) |
| Crawl Stats | What is Google actually crawling, and when? | [Crawl Stats report](https://support.google.com/webmasters/answer/9679690) |
| URL Inspection | What does Googlebot see for this specific URL? | [URL Inspection tool](https://support.google.com/webmasters/answer/9012289) |
| Manual Actions | Has a human reviewer issued a policy action? | [Manual Actions report](https://support.google.com/webmasters/answer/9044175) |
| Security Issues | Has Google detected malware, phishing or hacking? | [Security issues in Search](https://developers.google.com/search/docs/monitor-debug/security) |
| Data Anomalies | Is there a processing or logging fault behind the numbers? | [Data Anomalies](https://support.google.com/webmasters/answer/6211453) |

Two operational rules from Google's own debugging guide
([debugging drops in Google Search traffic](https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops)):

- **Impressions down and clicks down** points to an algorithmic update, a technical issue, a
  security issue, a spam issue, seasonality, or a site move. **Impressions flat and clicks down**
  points to title/snippet quality or a SERP layout change — the ranking held, the click did not.
- After a site move, "a medium-sized website can take a few weeks for Google to notice the change;
  larger sites can take longer."

For validation requests, Google sets expectations: validation "typically takes up to about two
weeks, but in some cases can take much longer"
([Page Indexing report](https://support.google.com/webmasters/answer/7440203)).

Pairing Search Console with analytics is worth the setup, and Google publishes a template for it
([using Search Console and Google Analytics data for SEO](https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console)).
The two tools count different things — Search Console counts clicks, analytics counts sessions —
so they will never match exactly, and Google explicitly says to compare them on general pattern
rather than exact totals.

For automation, the [Search Console API](https://developers.google.com/webmaster-tools/search-console-api)
exists, but the [Indexing API](https://developers.google.com/search/apis/indexing-api/v3/quickstart)
is far narrower than its name suggests: it can only be used on pages with `JobPosting` structured
data or `BroadcastEvent` embedded in `VideoObject`. It is not a general "tell Google to crawl this"
button.

### Ranking, position and CTR: what the research says

Position is the strongest predictor of organic click-through rate. The clearest primary evidence is
Fubel et al., *Beyond Rankings: Exploring the Impact of SERP Features on Organic Click-through
Rates* ([arXiv:2306.01785](https://arxiv.org/abs/2306.01785)), which models CTR over **67,000
keywords**, more than **40 US e-commerce domains**, and over **6 million clicks from 24 million
views**, across 24 SERP feature types. Two findings matter for classic SEO:

- Position is "the most significant predictor of CTR", established by ablation against the other
  feature families.
- The presence of SERP features has a **negative overall influence on organic CTR**, in two
  recognisable patterns: CTR declines across all positions, or it declines for the top three
  positions and rises below them.

The honest caveat: the dataset is US e-commerce, so treat the magnitudes as directional. But the
structural conclusion is stable across industries — position still matters most, and the surface
around the position matters too.

A second piece of research is a useful corrective to the industry's favourite mental model. In
Schultheiß, Häußler and Lewandowski's study of health-related pages
([arXiv:2301.10105](https://arxiv.org/abs/2301.10105), CHIIR '22), **61 participants** — laypeople
and health-information experts — rated the expertise of **non-optimised** pages as higher than
optimised ones, justifying it by the more competent and reputable appearance of the non-optimised
pages; comments about the non-optimised sites' operators were exclusively positive. The authors'
conclusion is that since non-optimised but high-quality content may be outranked by optimised
content of lower quality, trusted sources should be prioritised in rankings. Optimisation and
quality are not the same axis, and search-visible polish is not evidence of quality to a human
evaluator.

---

## Working with other engines, and with vendors

Classic SEO is no longer a single-engine discipline. Bing's
[Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a) largely
mirror Google's mechanics with a few operational differences worth knowing:

- Use `301` for permanent URL changes and `302` only for very short-term changes (under two days).
- Use **redirects rather than canonical tags** for URL moves.
- `robots.txt` controls crawl access, not indexing — use `NOINDEX` to keep a URL out of results.
- Notify Bing of adds, updates and removals promptly with
  [IndexNow](https://www.bing.com/indexnow), avoiding batch submissions.
- Consolidate duplicate URLs: "Duplicate URLs dilute signals and reduce Bing's confidence in
  selecting a URL."
- Avoid excessive HTTP requests to render content and avoid low-value parameter URLs.

On the vendor question, Google's own guidance is unusually direct
([guidance on using third-party SEO tools, services and advice](https://developers.google.com/search/docs/fundamentals/third-party-seo)):
"Google doesn't evaluate third-party services, so be wary of such claims and those making them."
Third-party tools have no access to internal ranking data, cannot guarantee performance, and their
predictions "are their own and like predictions generally, may not happen."

The companion [Do you need an SEO?](https://developers.google.com/search/docs/fundamentals/do-i-need-seo)
page gives the hiring checklist, and the items on it are a good internal test for whether an
in-house team has the fundamentals covered: do they follow the Search Essentials, can they explain
how they measure success and in what timeframe, and do they cite official Google documentation as
evidence for their recommendations? The red flags are specific — guaranteeing first place, and
asking for write access to Search Console during an audit rather than read access.

---

## The myths that still cost money

| Myth | Reality | Source |
|---|---|---|
| Word count is a ranking factor | "No, we don't" have a preferred word count | [helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) |
| Adding fresh content makes the site "fresh" | "No, it won't" | [helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) |
| Duplicate content triggers a penalty | It does not; Google picks a version | [demystifying the duplicate content penalty](https://developers.google.com/search/blog/2008/09/demystifying-duplicate-content-penalty) |
| `robots.txt` keeps a page out of Google | It blocks crawling, not indexing; use `noindex` | [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro) |
| `rel="canonical"` forces the URL Google shows | It is a hint among several signals | [canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization) |
| More Core Web Vitals metrics means more ranking | Only Core Web Vitals is used directly | [page experience](https://developers.google.com/search/docs/appearance/page-experience) |
| A perfect Lighthouse score guarantees rankings | Google says it does not | [page experience](https://developers.google.com/search/docs/appearance/page-experience) |
| E-E-A-T is a ranking factor | It is not itself one; trust carries the most weight | [helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) |
| Paying for ads improves organic ranking | No; ads have no effect on organic presence | [Do you need an SEO?](https://developers.google.com/search/docs/fundamentals/do-i-need-seo) |
| Schema markup is a ranking boost | A structured data manual action affects rich-result eligibility, not ranking | [structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) |
| A sitemap forces indexing | It is a discovery and preference hint | [build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) |
| You can recover from a core update with quick fixes | Google explicitly warns against quick fixes | [core updates](https://developers.google.com/search/docs/appearance/core-updates) |
| Keyword research tells you what to write | Google's language matching handles variation you do not anticipate | [SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) |

---

## A 90-day operating plan

**Days 1–30 — establish ground truth.**

1. Verify the site in Search Console and register every variant (http/https, www/non-www).
2. Run the URL Inspection tool over the ten highest-value URLs. Fix anything where the rendered
   HTML differs from what you intended.
3. Crawl the site for status-code hygiene. Every removed page should return `404` or `410`; every
   moved page should return `301`; every error page should not return `200`.
4. Confirm exactly one canonical per content set, and confirm the canonical Google picked matches
   the one you want — where it does not, fix the underlying signals rather than the tag alone.
5. Check `robots.txt` against the sitemap. No sitemap URL should be disallowed.
6. Generate a clean sitemap containing canonical, indexable URLs only, submit it, and monitor
   coverage in the Page Indexing report.
7. Run PageSpeed Insights on the twenty most important URLs, mobile and desktop. Fix the largest
   LCP element, the longest INP interaction and the biggest layout shift on each.
8. Validate structured data with the Rich Results Test, and check the Manual Actions report.

**Days 31–60 — fix the highest-leverage defects.**

9. Resolve every `4xx` and `5xx` in the crawl report. Server errors are the fastest way to lose
   crawl capacity.
10. Consolidate duplicate URL spaces — parameters, trailing slashes, casing, pagination — to one
    canonical form, and redirect the rest.
11. Repair internal linking: every orphaned page gets at least one contextual inbound link, and
    anchor text is rewritten to be descriptive rather than generic.
12. Align mobile and desktop: same content, same headings, same structured data, same robots tags.
13. Publish the authorship infrastructure — real author pages, real bylines, real organisational
    pages — if the site touches YMYL topics.

**Days 61–90 — editorial and authority.**

14. Run the people-first self-assessment on the top twenty pages. For each, answer Who, How and
    Why, and name the concrete evidence of first-hand experience.
15. Fix the pages that fail it. Rewrite where the structure is failing; **delete only what cannot be
    salvaged**, and expect that to be pages created for search engines first.
16. Consolidate thin affiliate and doorway pages, or remove them from the index.
17. Earn links the way Google will credit them: original research and primary sources that other
    people cite because they are useful. No paid placements without `rel="sponsored"`.
18. Re-check the Performance report at 28, 56 and 84 days, segmented by query and page, and compare
    impressions against clicks separately so a ranking loss and a CTR loss are never confused.

---

## Related reading on this site

- [AI search optimization](/writing/ai-search-optimization/) — how AI answer engines retrieve and
  quote sources, and the crawler policy that governs it. This guide covers the index; that one
  covers the retrieval layer on top of it.
- [The technical blueprint](/writing/technical-blueprint/) — the implementation specification for
  the site these guides describe: static HTML from Markdown, JSON-LD graphs, markdown twins,
  `llms.txt`, and the CI gates that block a bad publish.
- [Senior job hunt and CV strategy](/writing/job-hunt-and-cv/) — where the same mechanics land
  when the site is a candidate's portfolio rather than a company's.
- [The SEO and AI-search tooling landscape](/writing/tooling/) — which tools give evidence for
  every lever in this guide, with verified licences and dates.
- [The AI crawler policy](/ai-crawler-policy/) — the published decision table for AI crawlers,
  and the reasoning behind it.

---

## Primary sources

Every claim in this guide traces to one of the following. Dates are the "last updated" stamps the
pages carried when they were retrieved on 8 November 2026, except where a dated entry is given.

**Google Search Central — fundamentals**
- [Google Search Essentials](https://developers.google.com/search/docs/essentials) — updated 2025-12-10
- [Technical requirements](https://developers.google.com/search/docs/essentials/technical) — updated 2025-12-18
- [Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies) — updated 2026-08-28
- [SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) — updated 2025-12-10
- [How Google Search works](https://developers.google.com/search/docs/fundamentals/how-search-works) — updated 2025-12-18
- [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) — updated 2026-10-05
- [Guidance on third-party SEO tools, services and advice](https://developers.google.com/search/docs/fundamentals/do-i-need-seo) — updated 2026-06-05
- [Do you need an SEO?](https://developers.google.com/search/docs/fundamentals/do-i-need-seo) — updated 2026-06-05
- [Update to the Site Reputation Policy](https://developers.google.com/search/blog/2026/08/update-site-reputation-policy) — 2026-08-28

**Google Search Central — ranking and appearance**
- [A guide to Google Search ranking systems](https://developers.google.com/search/docs/appearance/ranking-systems-guide) — updated 2025-12-10
- [How Google Search ranks results](https://www.google.com/search/howsearchworks/how-search-works/ranking-results/)
- [Core updates](https://developers.google.com/search/docs/appearance/core-updates) — updated 2025-12-10
- [Spam updates](https://developers.google.com/search/docs/appearance/spam-updates) — updated 2025-12-10
- [Understanding page experience](https://developers.google.com/search/docs/appearance/page-experience) — updated 2026-09-22
- [Core Web Vitals in Google Search](https://developers.google.com/search/docs/appearance/core-web-vitals) — updated 2025-12-10
- [Influencing title links](https://developers.google.com/search/docs/appearance/title-link) — updated 2025-12-10
- [Control your snippets](https://developers.google.com/search/docs/appearance/snippet) — updated 2026-04-20
- [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) — updated 2026-07-10
- [Introduction to structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) — updated 2025-12-10
- [Profile page structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page) — updated 2026-09-08
- [Rich-result gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) — updated 2026-06-15
- [Provide a site name](https://developers.google.com/search/docs/appearance/site-names) — updated 2025-12-10
- [Influence your byline dates](https://developers.google.com/search/docs/appearance/publication-dates) — updated 2025-12-10
- [Reviews system](https://developers.google.com/search/docs/appearance/reviews-system) — updated 2025-12-10
- [Google image SEO best practices](https://developers.google.com/search/docs/appearance/google-images) — updated 2026-03-02
- [Video SEO best practices](https://developers.google.com/search/docs/appearance/video) — updated 2025-12-18
- [Establish your business details](https://developers.google.com/search/docs/appearance/establish-business-details) — updated 2025-12-10

**Google Search Central — crawling and indexing**
- [Introduction to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro) — updated 2025-12-10
- [Block indexing with `noindex`](https://developers.google.com/search/docs/crawling-indexing/block-indexing) — updated 2025-12-10
- [Robots meta tag, `data-nosnippet` and `X-Robots-Tag`](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) — updated 2026-03-24
- [What is canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization) — updated 2026-08-20
- [How to specify a canonical URL](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) — updated 2026-07-10
- [Redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects) — updated 2026-04-14
- [How HTTP status codes affect Google's crawlers](https://developers.google.com/search/docs/crawling-indexing/http-network-errors) — updated 2026-02-04
- [Learn about sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) — updated 2025-12-10
- [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) — updated 2026-07-08
- [Optimize your crawl budget](https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget) — updated 2026-07-22
- [JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) — updated 2026-03-04
- [Mobile-first indexing best practices](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing) — updated 2025-12-10
- [URL structure best practices](https://developers.google.com/search/docs/crawling-indexing/url-structure) — updated 2026-10-21
- [Link best practices for Google](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) — updated 2025-12-10
- [Qualify your outbound links](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links) — updated 2025-12-10
- [How to move a site](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) — updated 2026-08-20
- [Overview of Google crawlers and fetchers](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers) — updated 2026-06-12
- [File types indexable by Google](https://developers.google.com/search/docs/crawling-indexing/indexable-file-types) — updated 2026-02-03
- [Localized versions of your page](https://developers.google.com/search/docs/specialty/international/localized-versions) — updated 2026-09-21

**Measurement**
- [About Search Console](https://support.google.com/webmasters/answer/9128668)
- [Performance report](https://support.google.com/webmasters/answer/7576553)
- [Page Indexing report](https://support.google.com/webmasters/answer/7440203)
- [Crawl Stats report](https://support.google.com/webmasters/answer/9679690)
- [URL Inspection tool](https://support.google.com/webmasters/answer/9012289)
- [Manual Actions report](https://support.google.com/webmasters/answer/9044175)
- [Disavow links to your site](https://support.google.com/webmasters/answer/2648487)
- [Debugging drops in Google Search traffic](https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops) — updated 2025-12-10
- [Using Search Console and Google Analytics data for SEO](https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console) — updated 2026-01-07
- [Indexing API quickstart](https://developers.google.com/search/apis/indexing-api/v3/quickstart) — updated 2026-10-16
- [Ranking update history](https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history)
- [Latest Google Search documentation updates](https://developers.google.com/search/updates) — updated 2026-10-26

**Performance, standards and other engines**
- [Web Vitals — web.dev](https://web.dev/articles/vitals) — updated 2024-10-31
- [About PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about) — updated 2024-10-21
- [Chrome UX Report (CrUX)](https://developer.chrome.com/docs/crux) — updated 2024-02-08
- [RFC 9309: Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309.html) — September 2022, IETF Standards Track
- [Sitemaps protocol](https://www.sitemaps.org/protocol.html)
- [schema.org](https://schema.org/) and [schema.org schemas](https://schema.org/docs/schemas.html)
- [Search Quality Evaluator Guidelines](https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf) — 11 September 2025
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a) and [IndexNow](https://www.bing.com/indexnow)
- [US 6,285,999 — Method for node ranking in a linked database](https://patents.google.com/patent/US6285999) (the PageRank patent, Stanford University / Lawrence Page)

**Research**
- Fubel, Groll, Gundlach, Han, Kaiser — *Beyond Rankings: Exploring the Impact of SERP Features on Organic Click-through Rates*, [arXiv:2306.01785](https://arxiv.org/abs/2306.01785) (67,000 keywords, 40+ US e-commerce domains, 6M+ clicks from 24M views)
- Schultheiß, Häußler, Lewandowski — *Does Search Engine Optimization come along with high-quality content?*, [arXiv:2301.10105](https://arxiv.org/abs/2301.10105), CHIIR '22 (N = 61 participants)

---

**A note on the date.** The 2026 update calendar above was read from Google's status dashboard and
changelog on 8 November 2026, and the Google documentation was retrieved the same day. Core and
spam updates occur several times a year, so re-check the
[ranking update history](https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history) and
the [documentation changelog](https://developers.google.com/search/updates) before acting on any
claim about "what Google currently does".

Last reviewed: 8 November 2026.
