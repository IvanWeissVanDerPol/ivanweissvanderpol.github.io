---
slug: ai-crawler-policy
title: AI crawler policy — who may read this site, and why
description: The documented robots.txt policy for this site: AI search and user-initiated crawlers allowed, AI training crawlers refused, with the primary sources.
answer: This site allows the AI crawlers that produce search results, citations and referrals (OAI-SearchBot, Claude-SearchBot, PerplexityBot, ChatGPT-User, Claude-User, Perplexity-User, Applebot) and refuses the ones that exist only to train models (GPTBot, ClaudeBot, Applebot-Extended, CCBot, Bytespider, meta-externalagent), because training crawlers return no traffic and no attribution while a job-hunting site depends on both. Google-Extended is allowed as a disclosed trade-off, because it also governs Gemini grounding.
keywords: [AI crawler policy, robots.txt, GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, AI training, AI search, crawler taxonomy]
date: 2026-11-08
published: 2026-11-08
breadcrumbs: [[Home, ""], [AI crawler policy, "ai-crawler-policy"]]
body_class: page-policy
---

# AI crawler policy — who may read this site, and why
The rule is one line: **automated readers are welcome when they bring people
to the site, and refused when they only take the content and give nothing
back.** This page states what that means token by token — which AI crawlers
are allowed, which are refused, and which primary document decides each case.

## The policy in one paragraph

This site allows **search and retrieval** crawlers and **user-initiated**
fetchers, and refuses **training-only** crawlers. The policy is implemented in
`robots.txt`, mirrored by the [Search generative AI control](https://support.google.com/webmasters/answer/16908024)
in Search Console, and published here so that it is reviewable rather than
implicit. Nothing on this site is hidden behind a bot check: every page is
public, indexable and linked from the navigation.

## Why the bots have to be separated by purpose

The reason a single "block AI" rule is the wrong tool is that vendors now run
several distinct crawlers for several distinct purposes, and the only way to
tell them apart is by user-agent token. Each vendor documents its own tokens,
and each of them publishes the IP ranges the crawler uses so that site owners
can verify a request rather than trusting the header.

| Vendor | Token | Purpose | What blocking it means |
|---|---|---|---|
| OpenAI | `OAI-SearchBot` | Surfaces sites in ChatGPT search results | Sites that opt out are not shown in ChatGPT search answers, though they can still appear as navigational links ([OpenAI crawler docs](https://platform.openai.com/docs/bots)) |
| OpenAI | `GPTBot` | Collects content for training foundation models | Content is excluded from OpenAI model training datasets; no effect on search presence |
| OpenAI | `ChatGPT-User` | Fetches a page when a user asks ChatGPT a question | User-initiated retrieval is prevented; per OpenAI, robots.txt rules may not apply to it anyway |
| OpenAI | `OAI-AdsBot` | Validates pages submitted as ads | Only affects pages submitted as advertisements |
| Anthropic | `Claude-SearchBot` | Indexes content to improve search result quality | Content is not indexed for search optimization, reducing visibility and accuracy in Claude search results ([Anthropic crawler docs](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)) |
| Anthropic | `Claude-User` | Fetches a page when a user asks Claude a question | User-initiated retrieval is prevented, reducing visibility for user-directed web search |
| Anthropic | `ClaudeBot` | Collects web content for model training | Content is excluded from Anthropic training datasets |
| Perplexity | `PerplexityBot` | Surfaces and links sites in Perplexity search results | Not used for training; disallowing removes the site from Perplexity search results ([Perplexity crawler docs](https://docs.perplexity.ai/guides/bots)) |
| Perplexity | `Perplexity-User` | Fetches a page to answer a user's question | User-initiated retrieval is prevented; Perplexity notes this fetcher generally ignores robots.txt |
| Google | `Googlebot` | Classic Search, including AI Overviews and AI Mode | Google states there are no additional technical requirements for AI features; pages must simply be indexed and snippet-eligible ([Google crawler overview](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers)) |
| Google | `Google-Extended` | Controls Gemini training *and* grounding (feeding retrieved content to a model at prompt time) — not Google Search | Google is explicit: it does not affect inclusion in Google Search and is not a ranking signal in Search ([Google common crawlers](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers)) |
| Google | `Google-CloudVertexBot` | Crawls for building Vertex AI agents | No effect on Google Search or other products |
| Apple | `Applebot` | Powers search across Apple products — Spotlight, Siri, Safari | Allowing it puts the site in Apple search results; disallowing it removes the site from that surface |
| Apple | `Applebot-Extended` | Controls use of crawled content to train Apple's foundation models for Apple Intelligence | Apple is explicit: disallowing it opts the content out of training while keeping it discoverable in Spotlight, Siri and Safari ([About Applebot](https://support.apple.com/en-us/119829)) |

The taxonomy that matters is three questions: **does the crawl produce a
search result or a citation**, **is it triggered by a human request**, and
**is it training a model**.

## What this site allows, and what it refuses

| Token | Decision | Reason |
|---|---|---|
| `Googlebot`, `Bingbot`, all classic crawlers | Allow | The entire purpose of the site is to be found |
| `OAI-SearchBot` | Allow | Produces search results and citations in ChatGPT — the exact channel this site wants |
| `Claude-SearchBot` | Allow | Improves Claude's search result quality and visibility |
| `PerplexityBot` | Allow | Surfaces the site in Perplexity search results |
| `ChatGPT-User`, `Claude-User`, `Perplexity-User` | Allow | User-initiated retrieval: a human asked, so a fetch is the answer being served |
| `Google-CloudVertexBot` | Allow | Agent grounding on request; no Search impact either way |
| `Applebot` | Allow | Powers Apple search across Spotlight, Siri and Safari — a search surface with real users behind it ([About Applebot](https://support.apple.com/en-us/119829)) |
| `Google-Extended` | Allow, with a disclosed trade-off | It governs Gemini grounding, which is a citation channel: the model retrieves content and links it. It also permits Gemini training, which is the cost. Since Google states it has no effect on Google Search inclusion or ranking, allowing it costs nothing in classic search and buys a real AI citation path |
| `GPTBot` | Disallow | Training only; no referral, no citation, no attribution |
| `ClaudeBot` | Disallow | Anthropic's own description of this token is training-only; Anthropic's search crawler is `Claude-SearchBot`, which is allowed above |
| `Applebot-Extended` | Disallow | Apple's documentation is explicit that this token exists to let publishers opt content out of training Apple's foundation models, and that disallowing it leaves the site in Spotlight, Siri and Safari search — so refusing it costs no discoverability |
| `CCBot`, `anthropic-ai`, `Bytespider`, `meta-externalagent`, `Amazonbot`, `Diffbot` | Disallow | Training-oriented crawlers; refused on the same reasoning. Where a vendor has not published a primary document naming the token's purpose, the refusal is a conservative default rather than a citation-backed finding |
| `OAI-AdsBot` | Allow | Only visits pages submitted as ads; this site runs no ads |

### How this page is enforced

`/robots.txt` is the machine-readable form of the table above: one
`User-agent:` group per token, with `Allow: /` for the search, retrieval and
user-initiated tokens and `Disallow: /` for the training-only ones. It is
regenerated by the site build, so it must mirror this table.

The table is derived from vendor documentation, and the deployed file is
derived from the table. Read them next to each other whenever you want to
audit the policy — the file carries its own header comment with a summary of
the same decisions, so a divergence shows up in seconds instead of hiding in
a crawler log. If a group is missing or inverted in the deployed file, the
deployed file is what crawlers obey and this page is the policy of record:
that makes it a build defect to report, not a policy to argue about.

Two consequences of that rule are worth stating explicitly, because they are
the cases people get wrong:

- **Allowing `Claude-SearchBot` does not allow `ClaudeBot`.** Anthropic runs
  them for different purposes, and only one of them is a search crawler.
- **Allowing `Googlebot` does not allow `Google-Extended`.** Google separates
  them as well, and only `Googlebot` governs Search.

The file therefore needs exactly these groups: `Allow: /` for `OAI-SearchBot`,
`ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`,
`Perplexity-User`, `Google-CloudVertexBot`, `Google-Extended` and `Applebot`;
`Disallow: /` for `GPTBot`, `ClaudeBot`, `Applebot-Extended`, `CCBot`,
`anthropic-ai`, `Bytespider`, `meta-externalagent`, `Amazonbot` and
`Diffbot`.

**The file and this page cannot drift.** Both are generated from one source,
`content/crawler-policy.json`: the build writes `robots.txt` from the token
lists in that file, and the verification step fails the build if the deployed
`robots.txt` disagrees with it or if a token appears in one place and not the
other. Change a decision in the JSON, rebuild, and both artefacts move
together.

### The reasoning, in the open

- **A job-hunting site is a distribution problem.** This site's purpose is to
  be found by people — recruiters, hiring managers, and the assistants they
  now ask first. Search and retrieval crawlers are the ones that create that
  path. Blocking them would remove the channel while keeping zero benefit.
- **Training crawlers return nothing.** There is no traffic, no referral, no
  attribution link, no analytics entry, and no way to tell when the content is
  reused. For a professional profile whose value depends on being
  attributable, that is a one-way transfer.
- **One token is allowed against our own preference, and the trade-off is
  written down.** `Google-Extended` is allowed because it governs Gemini
  grounding, which is a citation path: the model retrieves the content and
  links it. It also permits Gemini training, which is the cost — and Google
  states it does not affect inclusion in Google Search or act as a ranking
  signal there, so nothing is lost in classic search. Every other
  training-only token is refused. A policy that cannot say where it
  compromised is not a policy.
- **The refusal is honest and specific.** Each vendor publishes what its
  tokens do. Refusing training tokens while allowing search tokens is
  decidable from primary documentation, not guesswork — which is the standard
  this site holds its own content to.
- **Reversibility.** The policy is one `robots.txt` file. If a vendor
  documents a different purpose for a token, the decision is re-reviewable in
  minutes, and the reasoning is published so nobody has to guess.

## Two caveats that are commonly got wrong

**robots.txt controls crawling, not indexing, and it is not a privacy
switch.** For Bing and Copilot the distinction is explicit: robots.txt
controls crawl access, not indexing, and `NOINDEX` is the directive that
removes a URL from search, Copilot experiences and grounding results. It also
warns that `NOARCHIVE` prevents content from being used in Copilot responses
and grounding results, and that `NOCACHE` limits Copilot to the URL, title and
snippet, reducing citation depth
([Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)).
On this site nothing is `NOINDEX`, nothing is `NOARCHIVE`, and nothing is
`NOCACHE`.

**Google's AI controls are separate from robots.txt.** Google states that
robots.txt directives for `Googlebot` govern crawling for Search, while
`nosnippet`, `max-snippet`, `data-nosnippet` and `noindex` control what is
shown from a page in Search, including in AI features
([controlling your snippets](https://developers.google.com/search/docs/appearance/snippet)).
At the site level, the [Search generative AI control](https://support.google.com/webmasters/answer/16908024)
manages inclusion in AI Overviews, AI Mode and generative AI in Discover, and
defaults to including the site. Google also notes that Google-Extended is the
control for training, not this one
([control what you share with Google Search](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share)).

## What a permitted crawler should find

Nothing is degraded for bots. The same HTML, the same JSON-LD, the same
markdown twin, the same tables.

- **Semantic HTML** with a single visible H1 per page, real headings, real
  lists and real tables with header cells.
- **JSON-LD** describing the page: `WebSite`, `WebPage`, `Person`,
  `BreadcrumbList` and, on long-form guides, `TechArticle`.
- **A markdown twin** at the same URL with a `.md` extension, linked with
  `rel="alternate" type="text/markdown"`, plus `rel="describedby"` pointing at
  `llms.txt` — the v2 convention for letting an agent find the plain-text
  version of a page without guessing
  ([llmstxt.org v2](https://llmstxt.org/changes.html)).
- **An `llms.txt` index** at the site root, listing every page with a
  one-line description.
- **A performance budget** that keeps the pages fast for the humans who land
  on them: LCP under 2.5 s, INP under 200 ms, CLS under 0.1 at the 75th
  percentile ([web.dev — Web Vitals](https://web.dev/articles/vitals)).

Agents also read the accessibility tree and the DOM, so the semantic
structure here is the same structure a screen-reader user gets
([web.dev — agent-friendly websites](https://web.dev/articles/ai-agent-site-ux)).

## Agent tools and the WebMCP proposal

WebMCP is a proposed web standard for exposing a site's capabilities to
agents as typed tools with JSON Schemas, so an agent calls a declared tool
instead of guessing at a DOM; it is in origin trial in Chrome with an Intent
to Experiment ([WebMCP](https://developer.chrome.com/docs/ai/webmcp/)). Where
this site exposes agent-facing tools, they are read-only and
non-transactional — a recruiter assistant can retrieve the résumé, the work
index and the guides, and nothing on this site can be bought, submitted or
modified by an agent. WebMCP's own security guidance is the reason: a tool
that changes state needs a confirmation step and a human in the loop.

## If you want to verify a crawler

Do not trust the user-agent header. Each vendor publishes the IP ranges its
crawlers use, and Google documents that crawlers identify themselves three
ways — the `User-Agent` header, the source IP, and the reverse-DNS hostname
— all three of which must agree
([verifying Google's requests](https://developers.google.com/crawling/docs/crawlers-fetchers/verify-google-requests)).
Published ranges: OpenAI
([searchbot.json](https://openai.com/searchbot.json),
[chatgpt-user.json](https://openai.com/chatgpt-user.json)),
Anthropic ([bots.json](https://claude.com/crawling/bots.json)), Perplexity
([perplexitybot.json](https://www.perplexity.com/perplexitybot.json),
[perplexity-user.json](https://www.perplexity.com/perplexity-user.json)),
Google ([common-crawlers.json](https://developers.google.com/static/crawling/ipranges/common-crawlers.json)).

Changes take effect on a delay: OpenAI states it can take roughly 24 hours
for systems to reflect a robots.txt change, and Perplexity states the same
for its own bots ([OpenAI crawler docs](https://platform.openai.com/docs/bots),
[Perplexity crawler docs](https://docs.perplexity.ai/guides/bots)).

## Questions

If you are a crawler operator and believe your token is misclassified, or a
site owner comparing policies, write to
[weissvanderpol.ivan@gmail.com](mailto:weissvanderpol.ivan@gmail.com). The
policy is re-reviewed whenever a vendor changes what its tokens do.

Related: [about](/about/), [the CV](/cv/), [selected work](/work/),
[writing index](/writing/), and the build specification in
[the technical blueprint](/writing/technical-blueprint/).

## Sources

The primary sources behind this page, in markdown so they can be quoted or
reused directly:

```markdown
- [OpenAI — Overview of OpenAI Crawlers](https://platform.openai.com/docs/bots): OAI-SearchBot, GPTBot, ChatGPT-User, OAI-AdsBot; roughly 24 hours to propagate a robots.txt change
- [Anthropic — Does Anthropic crawl data from the web?](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler): ClaudeBot, Claude-User, Claude-SearchBot
- [Perplexity — Perplexity Crawlers](https://docs.perplexity.ai/guides/bots): PerplexityBot and Perplexity-User, plus the published IP ranges
- [Google — Overview of Google crawlers and fetchers](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers): last updated 2026-06-12
- [Google — Google's common crawlers](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers): last updated 2026-10-15 — Google-Extended does not affect Google Search inclusion or ranking
- [Google — Verifying Google's requests](https://developers.google.com/crawling/docs/crawlers-fetchers/verify-google-requests): user-agent, source IP and reverse DNS must all agree
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a): robots.txt controls crawling, not indexing; NOARCHIVE and NOCACHE limit Copilot citations
- [Google — Search generative AI control](https://support.google.com/webmasters/answer/16908024): worldwide since 2026-08-31
- [Apple — About Applebot](https://support.apple.com/en-us/119829): Applebot for search, Applebot-Extended as the training opt-out token
```

Last reviewed: 8 November 2026.
