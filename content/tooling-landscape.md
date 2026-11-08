---
slug: writing/tooling
title: The SEO & AI-search tooling landscape (2026)
description: A verified inventory of open-source and paid SEO, AEO/GEO, AI-search visibility and job-search/ATS tools, with licences, dates and a verdict on each.
answer: This is the tooling map for running a search- and AI-search-visible site in 2026. Every GitHub figure was pulled from the API on 2026-11-08, every paid price from the vendor's own pricing page. The short version: Google states AI Overviews and AI Mode add no technical requirements beyond ordinary indexing, so the AI-visibility category is measurement infrastructure rather than a ranking lever - and the tools that earn their keep are the ones giving you evidence. Free and self-hosted covers most of it (SiteOne Crawler, Lighthouse CI with its llms.txt audit, web-vitals, ldlint, GEOInflow, Umami, n8n), the agent layer is MCP servers and skills that feed your own Search Console and GA4 data to a model (SEOMonster, open-seo-mcp-skills, claude-seo, marketingskills), and the only spend worth making early is a SerpApi starter at $25/mo because Google AI Overview is the hardest data point to collect yourself.
keywords: [SEO tooling, AEO tooling, GEO tools, AI search visibility, llms.txt, WebMCP, MCP SEO server, agent skills SEO, self-hosted SEO, SERP rank tracking, Core Web Vitals tooling, schema validator, AI crawler analytics, programmatic SEO, job search ATS tools, AI content detection, Screaming Frog alternative]
date: 2026-11-08
is_article: true
published: 2026-11-08
breadcrumbs: [[Writing, writing], [Tooling landscape, writing/tooling]]
---

# The SEO & AI-search tooling landscape (2026)

Every GitHub number in this document — stars, licence, primary language, last push — was pulled from the
GitHub REST API (`GET /repos/{owner}/{repo}`) on **2026-11-08**. Star counts move; licences and last-push
dates are the durable parts, so treat those as the deciding factors. Paid-tool prices were read off the
vendor's own pricing page on the same date. The machine-readable version of this table is
[`tools.json`](./tools.json) (98 entries).

**Read this first.** The single most important fact in the 2026 landscape is that Google says AI Overviews
and AI Mode have **no additional technical requirements** beyond ordinary indexing and snippet eligibility
([Google Search Central, *AI features and your website*](https://developers.google.com/search/docs/appearance/ai-features)).
Everything below in the AI-visibility category is therefore **measurement infrastructure, not a ranking
lever**. The tools that earn their keep are the ones that give you evidence: server logs, first-party
Search Console data, real-user field metrics, and a repeatable crawl.

## 1. What the landscape actually looks like

Three structural shifts, all visible in the data:

**1. The dashboard is being replaced by the agent.** The fastest-growing projects in this space are not
web apps with charts — they are MCP servers and Agent Skills. `open-seo-mcp-skills` (9.0k stars),
`claude-seo` (27.5k), `marketingskills` (59.2k) and `career-ops` (81.2k) are all packages you install into an agent,
not dashboards you log into. The design principle is the same across all of them: **give the agent your real
numbers and let it reason** — do not hand it generic advice.

**2. Self-hosted means "your data, someone else's SERP feed."** Almost every open rank tracker is a
dashboard over a paid API (SerpApi, DataForSEO) or a scraper. The genuinely self-contained options pull from
first-party sources: Search Console and GA4. That distinction matters more than the licence.

**3. "llms.txt" went from proposal to de-facto standard in about two years.** The v2 proposal is dated
2024-09-03 (revised 2026-08-10); by 2026 thousands of sites publish one, Mintlify generates them
automatically, Chrome's Lighthouse audits them as part of its agentic-browsing checks, and OpenAI,
Anthropic and Google all ship their own for their developer docs. It is cheap to implement and it is
already a table-stakes check.

### Category scorecard

| Category | Open-source options | Paid options | Free enough to start? |
|---|---:|---:|---|
| Site crawling & auditing | 6 | 3 | Yes — SiteOne Crawler + linkinator cover the Screaming Frog essentials |
| Core Web Vitals / performance | 5 | 0 | Yes — Lighthouse, Lighthouse CI and web-vitals are free and sufficient |
| SERP & rank tracking | 9 | 2 | Partly — SerpBear is free, the SERP feed is not |
| AI-answer visibility | 10 | 7 | Partly — Elmo (self-hosted) and geo-optimizer-skill are free; tracking needs API keys |
| AI-crawler & log analytics | 4 | 0 | Yes — GEOInflow plus crawler-user-agents / isbot |
| Schema / markup validation | 3 | 2 | Yes — Rich Results Test and validator.schema.org are free |
| llms.txt | 4 | 0 | Yes — the spec is Apache-2.0 and generation is a small script |
| Content & keyword research | 6 | 0 | Partly — the skill layer is free, the volume data is not |
| Backlinks | 1 | 0 | No — only Common Crawl mention discovery is free |
| Programmatic SEO | 2 | 0 | Yes — reference implementations, not tools |
| Agent readiness (WebMCP / MCP) | 4 | 0 | Yes — specs and reference servers are open |
| SEO-as-agent skills & MCP | 5 | 0 | Yes — the skills are MIT/Apache; the data behind them may not be |
| Job search & ATS | 9 | 3 | Yes — career-ops, Resume-Matcher and ats-buddy are all open and local-first |
| AI-content detection | 2 | 0 | Yes — lmscan is local and free |

Paid-tool counts include vendor APIs consumed by the open tools, which is where most of the real spend lands.

## 2. The tools, by category

Columns: **Stars** (as of 2026-11-08), **Licence**, **Lang**, **Last push**, **Self-hosted**. Paid tools have
no GitHub row, so they appear at the end of each section with a price instead of stars.

### Site crawling & auditing (Screaming Frog alternatives)

The commercial default is Screaming Frog (GBP 199 per seat per year, free to 500 URLs). The open alternatives split cleanly: **desktop/CLI crawlers** that report and gate in CI (SiteOne Crawler, linkinator), **web-app crawlers** you host for a team (LibreCrawl, SEOnaut), and **all-in-one dashboards** that fold crawl + Search Console + Core Web Vitals into one tool (crawlseo). For one personal site, SiteOne Crawler plus linkinator in CI covers the Screaming Frog feature set that actually matters.

| Tool | Stars | Licence | Lang | Last push | Self-hosted | What it does | Verdict |
|---|---:|---|---|---|---|---|---|
| [`linkinator`](https://github.com/JustinBeckwith/linkinator) | 1.3k | MIT | TypeScript | 2026-11-06 | yes | Broken-link checker and site crawler with CLI + API | Yes — wire it into CI in under a minute. Not an SEO auditor, only a link checker; use it alongside, not instead of, a crawler. |
| [`LibreCrawl`](https://github.com/PhialsBasement/LibreCrawl) | 1.1k | MIT | Python | 2026-11-07 | yes | Multi-tenant web app (Python/Flask + MongoDB) that crawls a site and reports pages, links, SEO elements and performance | Yes if you want a hosted, multi-seat crawler UI. Single maintainer, sponsorship-funded, no paid tier — treat as a solo-maintainer dependency, not a vendor. |
| [`SiteOne Crawler`](https://github.com/janreges/siteone-crawler) | 997 | MIT | Rust | 2026-09-27 | yes | Rust rewrite of a cross-platform crawler/analyzer: single static binary (Win/macOS/Linux, x64+arm64), HTML/JSON/text reports with 0-10 quality scoring, sitemap... | Yes — best-in-class for CI integration and for shipping your own content to LLMs as Markdown. The single most useful open alternative to Screaming Frog today. |
| [`SEOnaut`](https://github.com/StJudeWasHere/seonaut) | 863 | MIT | Go | 2026-10-08 | yes | Go + MySQL open-source SEO audit tool: full site scan, issues bucketed critical/high/low (broken links, redirect loops, missing/duplicate meta, heading order),... | Yes, but only for a Go/MySQL shop. Thin feature set versus LibreCrawl/siteone-crawler; live at seonaut.org. |
| [`crawlseo`](https://github.com/crawlseo/crawlseo) | 682 | MIT | TypeScript | 2026-11-02 | yes | Self-hosted dashboard combining Google Search Console, a site crawler (2,000 pages/crawl default), Core Web Vitals, index status, BYOK keyword research and... | Yes, if you want one small app instead of six. BYOK (DataForSEO) for keywords/backlinks, Google Autocomplete as the free fallback. |
| [`open-seo-crawler`](https://github.com/puneetindersingh/open-seo-crawler) | 81 | MIT | Python | 2026-10-23 | yes | Self-hosted Python crawler/audit that also checks whether AI crawlers can reach the site | Only if AI-crawler reachability is the specific gap you have. Small project (81 stars), verify it still runs before adopting. |
| [DeepCrawl](https://www.deepcrawl.com/pricing/) | — | proprietary | — | — | no | Cloud crawler with large-scale scheduling, JavaScript rendering and bot-management-aware crawling | Skip for a personal site. Overkill until you are crawling many domains on a schedule. |
| [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/seo-spider/pricing/) | — | proprietary | — | — | no | Desktop crawler, the de-facto technical SEO standard | Buy one seat at GBP 199 if a client ever needs a crawl you cannot do in open source. For your own site, siteone-crawler covers 80% of it for free. |
| [Sitebulb](https://www.sitebulb.com/pricing/) | — | proprietary | — | — | no | Browser-based SaaS crawler with a spreadsheet UI, JavaScript rendering, site health, link and performance analysis | Only if you want zero-install CSV-style audits for non-technical stakeholders. Otherwise LibreCrawl + siteone-crawler. |

### Core Web Vitals & performance measurement

Google's own tools are the reference and they are free. Lighthouse is now the only mainstream **llms.txt linter** — it ships an `llms-txt` audit inside its 'agentic browsing' category (merged 2026-04-20, shipping in v13.2) that checks the file is fetchable, has an H1, is long enough, and contains links. Lighthouse CI turns it into a build gate. `web-vitals` is the 4 KB front-end library that gives you real-user LCP/INP/CLS, and sitespeed.io is the option when you need continuous monitoring across many URLs.

| Tool | Stars | Licence | Lang | Last push | Self-hosted | What it does | Verdict |
|---|---:|---|---|---|---|---|---|
| [`Lighthouse`](https://github.com/GoogleChrome/lighthouse) | 31k | Apache-2.0 | JavaScript | 2026-11-08 | yes | The audit engine behind PageSpeed Insights: performance, accessibility, best practices, SEO, and - since v13.2 (audit merged 2026-04-20) - an 'agentic browsing'... | Yes. It is the reference implementation of the metrics that matter and now also the only mainstream lms.txt linter. |
| [`web-vitals`](https://github.com/GoogleChrome/web-vitals) | 8.7k | Apache-2.0 | JavaScript | 2026-11-04 | yes | The tiny front-end library that reports LCP, INP, CLS and FCP from real users via the PerformanceObserver API - the standard way to collect your own field data | Yes — 4 KB, no dependencies, and the only way to get true INP/LCP field numbers for your own pages. |
| [`Lighthouse CI`](https://github.com/GoogleChrome/lighthouse-ci) | 7.1k | Apache-2.0 | JavaScript | 2026-11-03 | yes | Runs Lighthouse on every commit, stores and diffs the results, asserts configurable budgets so a perf or SEO regression fails the build | Yes — the highest-leverage CI piece in this entire list. Wire it to your static site on day one. |
| [`sitespeed.io`](https://github.com/sitespeedio/sitespeed.io) | 5k | MIT | JavaScript | 2026-11-05 | yes | Web performance testing and monitoring at scale: browser-based runs, WebPageTest-like budgets, CI integration, long-term trend storage and a Grafana/InfluxDB path | Yes for continuous field-style monitoring across many URLs. Heavier setup than lighthouse-ci for a single small site. |
| [`web-quality-skills`](https://github.com/addyosmani/web-quality-skills) | 3.1k | MIT | Shell | 2026-08-24 | yes | Agent Skills that turn Lighthouse + Chrome DevTools MCP + Core Web Vitals + WCAG 2.2 into measurement-first instructions for agents: live audits, performance... | Yes if you already run agents over your site. It teaches the agent to measure before changing anything — the discipline most AI SEO tools lack. |

### SERP & rank tracking (self-hosted)

The pattern is always the same: **the tracker is open source, the SERP data is not.** SerpBear, OpenGSC, SearchMirror and SerpTrail are dashboards; underneath they need SerpApi, DataForSEO or a scraper. The one repo that breaks the pattern is `open-seo-mcp-skills`, which pulls positions from your own Google Search Console — first-party data, no API bill, and it already reports AI referral traffic from GA4.

| Tool | Stars | Licence | Lang | Last push | Self-hosted | What it does | Verdict |
|---|---:|---|---|---|---|---|---|
| [`SearXNG`](https://github.com/searxng/searxng) | 39.4k | AGPL-3.0 | Python | 2026-11-08 | yes | AGPL-3.0 metasearch engine that aggregates many search services without tracking users | Yes as a privacy-preserving research/SERP front end for agents. Not a substitute for a commercial SERP API for rank tracking. |
| [`SerpBear`](https://github.com/towfiqi/serpbear) | 2.2k | MIT | TypeScript | 2026-10-30 | yes | Open-source rank tracker: unlimited domains and keywords, scheduled SERP checks, change notifications by email, a built-in API and a Docker image on Docker Hub | Yes — the default self-hosted rank tracker. Needs a SERP provider key underneath; it is the dashboard, not the data. |
| [`search-console-mcp`](https://github.com/saurabhsharma2u/search-console-mcp) | 321 | MIT | TypeScript | 2026-10-21 | yes | MCP server for Google Search Console and Bing Webmaster Tools: exposes search and analytics data to Claude/Cursor as a data layer rather than a set of instructions | Yes if you want an agent querying GSC directly. Pairs naturally with the agent-skills layer. |
| [`SerpScrap`](https://github.com/ecoron/SerpScrap) | 272 | MIT | Python | 2026-09-02 | yes | Python library/CLI that retrieves structured search results for SEO, research and automation | Only if you need raw SERP HTML without a paid API. Check its proxy/ToS posture before running it at volume. |
| [`google-browser-scraper`](https://github.com/nodemaven/google-browser-scraper) | 113 | MIT | Python | 2026-11-08 | yes | Self-hosted Google SERP scraper driving a real Chrome browser via CDP, so results are not the stripped-down JSON a plain HTTP client sees | Useful escape hatch when a SERP API is too coarse. Fragile and ToS-sensitive; treat as a diagnostic, not a pipeline. |
| [`SearchMirror`](https://github.com/databluedev/searchmirror) | 110 | AGPL-3.0 | Python | 2026-10-01 | yes | Self-hosted Google rank tracker plus AI-visibility monitor: positions by country/language/device, competitor comparison, Geo Citations (AI brand-mention checks... | Not yet. The pre-1.0 warning and Django 3.2 runtime are real blockers — watch it, do not deploy it. |
| [`SEO Playground`](https://github.com/paulmassen/seo-playground) | 87 | None | TypeScript | 2026-11-04 | yes | Self-hosted SEO and Local SEO dashboard on the DataForSEO API: rankings, LLM prompt tracking, geo-grid visibility scans (square/diamond/circle, rotated, mileage... | Yes for local SEO — the geo-grid and review-velocity features are things no open-source rank tracker has. Disclosed DataForSEO affiliate link; budget accordingly. |
| [`OpenGSC`](https://github.com/fenjo26/OpenGSC) | 56 | MIT | TypeScript | 2026-11-06 | yes | Self-hosted Google Search Console dashboard on your own VPS: rank tracking, keyword research, AI-visibility audits, an AI SEO content suite and a private... | Yes if you want a private GSC console and do not want to hand Google credentials to a third-party SaaS. Verify the private indexer before pointing it at production. |
| [`SerpTrail`](https://github.com/serpapi/serptrail) | 50 | MIT | Ruby | 2026-09-28 | yes | Self-hosted Ruby on Rails + SQLite rank tracker: multi-site, multi-keyword, multi-location, scheduled checks, historical SERP storage, AI-Overview citation... | Yes if you want AI-Overview citation tracking with historical SERP retention and you are comfortable with Rails. Small project (50 stars) — read the code before trusting it with a client domain. |
| [DataForSEO](https://dataforseo.com/pricing) | — | proprietary | — | — | no | Pay-as-you-go API family: SERP API, Keyword Data, Backlinks, Domain Analytics, On-Page, Labs (AI-optimization endpoints included), Business Data | Yes for keyword volume, backlinks and on-page at scale without a $130+/mo subscription — but budget per-request, not per-seat. |
| [SerpApi](https://serpapi.com/pricing) | — | proprietary | — | — | no | SERP API with per-engine endpoints including Google AI Overview, Google AI Mode, Google Jobs, Google News, Bing Copilot, Duck AI and Perplexity | Buy the $25 starter while you build. It is the single most useful paid API here: it is the only mainstream one with a first-class Google AI Overview endpoint. |

### AI-answer visibility (mention & citation share)

This is the newest and least settled category. The paid field has consolidated around Profound (enterprise, no published self-serve tier), Peec AI ($95/mo entry), Otterly.AI ($29/mo entry), Scrunch (~$250/mo) plus the AI-visibility add-ons inside Ahrefs and Semrush. Open source, the real options are **Elmo** (the most complete tracker I verified), **Ansvisor** and **GetCito** (agent-facing platforms), and the audit-only tools **geo-optimizer-skill** and **E-GEO**. Critical context: Google's own documentation states that AI Overviews and AI Mode have **no additional technical requirements** beyond ordinary indexing and snippet eligibility — so most of what these tools sell is measurement, not a ranking lever.

| Tool | Stars | Licence | Lang | Last push | Self-hosted | What it does | Verdict |
|---|---:|---|---|---|---|---|---|
| [`gtm-engineer-skills`](https://github.com/onvoyage-ai/gtm-engineer-skills) | 1.4k | MIT | HTML | 2026-10-11 | yes | Claude Code skills for AEO/GEO GTM work: research-brand, research-keywords, geo-content-research, geo-content-planning, write-seo-geo-content, create-geo-charts,... | Yes if you want agent-generated artifacts with a human review step. Closest thing to an end-to-end GEO content pipeline in open source. |
| [`geo-optimizer-skill`](https://github.com/Auriti-Labs/geo-optimizer-skill) | 1.3k | MIT | Python | 2026-11-04 | yes | Open-source engine behind GeoReady: one command scores any site 0-100 on whether ChatGPT, Perplexity, Gemini, Claude and Google AI Overviews can crawl,... | Yes — the cheapest way to get a repeatable GEO score for a URL. Audit only: it does not track over time. |
| [`Elmo`](https://github.com/elmohq/elmo) | 577 | MIT | TypeScript | 2026-11-07 | yes | Self-hosted open-source AEO/GEO platform: tracks how ChatGPT, Claude, Perplexity, Gemini and Google AI Overviews mention, cite and describe your brand -... | Yes — the most complete open AI-visibility tracker I verified. Use it if you can supply your own model API keys. |
| [`GEORank`](https://github.com/yaojingang/GEORank) | 533 | Apache-2.0 | Python | 2026-10-28 | yes | Python GEO workbench: site diagnosis (schema, page structure, meta, readability, citation signals), structured AI Q&A, 30/60/90-day action plans,... | Yes, and it is the only open tool I verified that actually generates llms.txt and JSON-LD from a diagnosis. UI and docs are Chinese-first; English README exists. |
| [`GetCito`](https://github.com/ai-search-guru/getcito-worlds-first-open-source-aio-aeo-or-geo-tool) | 425 | MIT | TypeScript | 2026-11-05 | yes | Open-source AI Search Optimization platform: prompt/topic organization, query fan-out exploration, brand mentions, sentiment and citation tracking across answer... | Yes if you want an end-to-end agent-facing platform rather than a tracker. It is one of the few open tools exposing AI-visibility data over MCP. |
| [`GEO-Content-Optimizer-Skill`](https://github.com/liangdabiao/GEO-Content-Optimizer-Skill) | 236 | None | Python | 2026-08-05 | yes | Three Chinese-language GEO skills for Claude Code/Codex: geo-content-optimizer (single-page audit by pulling the Google AI Overview for your title and diffing it... | Useful idea, weak fit: the single-page diff-against-AI-Overview pattern is worth copying; the tooling and docs are Chinese-first. |
| [`Ansvisor`](https://github.com/ansvisor/ansvisor) | 234 | MIT | TypeScript | 2026-11-08 | yes | Open-source agentic AI Search Execution Platform: prompt monitoring, brand mentions, sentiment, citations, competitors, AI traffic and source analysis across... | Promising but early (234 stars, ~1 week of commit cadence at fetch time). The agent-drafts-fix-and-you-approve loop is the right shape; verify the deployment path before betting on it. |
| [`E-GEO (eGEOagents)`](https://github.com/mverab/eGEOagents) | 218 | MIT | Python | 2026-11-07 | yes | Open-source CLI plus Claude Code skills for GEO/AEO, built on published GEO research (arXiv 2511.20867): scores a Markdown page against generative-engine... | Yes for content-level work on your own Markdown. The paper-backed scoring is the differentiator; the surface is still young. |
| [`searchstack-aeo`](https://github.com/alexpospekhov/searchstack-aeo) | 115 | MIT | Python | 2026-09-29 | yes | PyPI CLI for AI-native founders: monitors visibility across Google, AI Overviews, ChatGPT, Perplexity and Claude from one command, with GSC-backed rankings and a... | Yes as a terminal-first substitute for a $130+/mo suite. Verify which engines it actually calls before you report numbers to anyone. |
| [`sample-llm-search-citation-analysis (Bedrock)`](https://github.com/aws-samples/sample-llm-search-citation-analysis-with-amazon-bedrock) | 23 | MIT-0 | Python | 2026-11-08 | yes | AWS sample that tracks a brand's visibility in AI search with a citation-analysis tool built on Amazon Bedrock | Yes as a reference implementation if you are already on Bedrock. 23 stars and sample-quality — copy the pattern, do not depend on the repo. |
| [Ahrefs Brand Radar](https://ahrefs.com/brand-radar/) | — | proprietary | — | — | no | AI visibility inside Ahrefs: a searchable AI index across seven platforms plus custom prompts | Only worth it if you already pay for Ahrefs - then it is the cheapest incremental AI-visibility add-on in the market. |
| [Otterly.AI](https://otterly.ai/pricing) | — | proprietary | — | — | no | Monitoring for ChatGPT, Google AI Overviews, Perplexity and MS Copilot (Claude, AI Mode and Gemini as add-ons): Lite $29/mo (15 prompts), Standard $189/mo (100... | Cheapest credible managed entry at $29/mo — the one to try before committing to $95+ platforms. |
| [Peec AI](https://peec.ai/pricing) | — | proprietary | — | — | no | AI search analytics: Starter $95/mo (50 prompts, 1 project, 3 models, daily), Pro $245/mo (150 prompts, 2 projects), Advanced $495/mo (350 prompts, 5 projects,... | Reasonable mid-market option with unlimited seats. At $95/mo entry it loses to self-hosted Elmo unless you need the managed reports. |
| [Profound](https://www.tryprofound.com/pricing) | — | proprietary | — | — | no | Enterprise AI-visibility platform: answer-engine insights, agent analytics and attribution across up to 9 engines, agents, context manager, sheets | Only for enterprise budgets. At solo scale the free Elmo/self-hosted route covers the same metrics at zero licence cost. |
| [SE Ranking](https://seranking.com/subscription.html) | — | proprietary | — | — | no | SEO+GEO suite: Core $129/mo ($103.20 annual) - 10 projects, 2k keywords, 100 prompts tracked daily, 5 domains in GEO research, 250k pages/mo audit, 25k API... | Yes — best value in the paid tier: 100 daily AI prompts inside a full SEO suite for $103–129/mo, with MCP access. |
| [Scrunch AI](https://www.scrunchai.com/pricing) | — | proprietary | — | — | no | Sitecore-owned AEO platform | Skip unless you are an enterprise buyer. $250/mo buys less model coverage and fewer prompts than the $29-95 tiers. |
| [Semrush AI Visibility](https://www.semrush.com/pricing/seo-ai-search/) | — | proprietary | — | — | no | SEO + AI Search plans: SEO $117.33/mo billed annually ($139 monthly) with 5 sites, 500 keywords tracked daily, AI search tracking, AI sentiment and custom prompts | Yes if you want one vendor for SEO + AI visibility + MCP. At $117/mo it is more than Elmo + a SERP API starter. |

### AI-crawler & server-log analytics

This is where the defensible advantage lies. **GEOInflow** is the only open tool I verified that joins server-log crawler evidence (identity, purpose, request volume, HTTP status, verification) to your content inventory (sitemap vs observed crawls). `crawler-user-agents` and `isbot` are the reference datasets for classifying AI traffic; `changedetection.io` is the cheap primitive for watching a rendered AI answer page for changes.

| Tool | Stars | Licence | Lang | Last push | Self-hosted | What it does | Verdict |
|---|---:|---|---|---|---|---|---|
| [`changedetection.io`](https://github.com/dgtlmoon/changedetection.io) | 35.7k | Apache-2.0 | Python | 2026-11-08 | yes | Website change detection and monitoring with alerts | Yes, as a cheap competitor/answer-tracking primitive: snapshot the AI answer page you care about and diff it weekly. |
| [`crawler-user-agents`](https://github.com/monperrus/crawler-user-agents) | 1.4k | MIT | Go | 2026-10-31 | yes | Syntactic patterns of HTTP user-agents used by bots, robots, crawlers, scrapers and spiders, kept as a pull-request-welcoming Go dataset | Yes, as a log-parsing reference and a bot-detection library. Keep your own allowlist of AI user-agent tokens separately — this list does not distinguish training from search crawlers. |
| [`isbot`](https://github.com/omrilotan/isbot) | 1.2k | Unlicense | TypeScript | 2026-10-01 | yes | Zero-dependency, dependency-free TypeScript library that detects bots/crawlers/spiders from a user-agent string, with an extensive pattern list including AI crawlers | Yes — drop it into your edge or log pipeline to classify AI traffic. Unlicense, so no license friction. |
| [`GEOInflow`](https://github.com/yaojingang/GEOInflow) | 818 | MIT | TypeScript | 2026-11-03 | yes | Self-hosted web + AI crawler analytics for GEO: crawler identity, purpose, provider, request volume and verification status, repeated-crawl and directory... | Yes — the only open tool I verified that joins server-log crawler evidence to content inventory. This is the ground truth AI-visibility trackers lack. |

### Schema / markup validation

Two free validators cover the whole job: the **Google Rich Results Test** for eligibility and the **official Schema.org validator** for vocabulary correctness. For CI, `ldlint` (Go) validates JSON-LD against the full schema.org vocabulary over your build output, and `@adobe/structured-data-validator` gives you Google's Rich Results rules as a library.

| Tool | Stars | Licence | Lang | Last push | Self-hosted | What it does | Verdict |
|---|---:|---|---|---|---|---|---|
| [`schemarama`](https://github.com/google/schemarama) | 150 | Apache-2.0 | JavaScript | 2024-08-19 | yes | Google's exploration of standards-based validation for structured data, especially Schema.org, including a JSON-LD previewer | No — archived in 2024. Use it as reference reading on how Google thinks about structured data, not as a tool. |
| [`@adobe/structured-data-validator`](https://github.com/adobe/structured-data-validator) | 18 | Apache-2.0 | JavaScript | 2026-11-02 | yes | JS library validating structured data against both Schema.org and Google Rich Results specifications, with extensible custom type handlers | Yes if you are validating structured data programmatically in Node. Canonical Rich-Results rule set, not a crawler. |
| [`ldlint`](https://github.com/KevHQ/ldlint) | 1 | MIT | Go | 2026-08-09 | yes | Fast Go CLI that validates JSON-LD against the full schema.org vocabulary - invalid properties, wrong types, schema misuse - over a directory of HTML files or a... | Yes — cheap to run in CI over your build output, and it catches vocabulary errors the Rich Results Test misses. 1 star, but the code is short and readable. |
| [Google Rich Results Test](https://search.google.com/test/rich-results) | — | proprietary | — | — | no | Free hosted validator: paste a URL or code snippet, get Rich Results eligibility plus the exact field errors per supported type (FAQ, HowTo, Article, Product,... | Yes — it is still the ground truth for rich-result eligibility, and it is free. Automate with ldlint, confirm here before publishing. |
| [Schema Markup Validator (validator.schema.org)](https://validator.schema.org/) | — | proprietary | — | — | no | Free official Schema.org vocabulary validator | Yes — free and authoritative for vocabulary correctness, though it does not know Google's rich-result rules. |

### llms.txt

The spec is `AnswerDotAI/llms-txt` (v2 proposal by Jeremy Howard) and it is now load-bearing: Lighthouse audits for it, Mintlify auto-generates it, and OpenAI, Anthropic and Google all publish their own. Generation options are thin — `create-llmstxt-py` is the practical script (fork it; it is unlicensed and unmaintained since 2025-06) and `llms-txt-hub` is the best directory of live examples. GEORank generates both llms.txt and JSON-LD from a diagnosis, which is the closest thing to a one-stop generator I found.

| Tool | Stars | Licence | Lang | Last push | Self-hosted | What it does | Verdict |
|---|---:|---|---|---|---|---|---|
| [`llms.txt (v2 proposal)`](https://github.com/AnswerDotAI/llms-txt) | 2.7k | Apache-2.0 | Jupyter Notebook | 2026-09-24 | yes | Jeremy Howard's v2 proposal for the /llms.txt file: a Markdown file at the site root giving LLMs concise background and links to detailed .md versions of pages | Read it, then implement it. This is the normative spec, not a tool — but it is the reference every other llms.txt project points at. |
| [`mcpdoc`](https://github.com/langchain-ai/mcpdoc) | 1k | MIT | Python | 2026-08-20 | yes | LangChain tool that exposes llms.txt content to IDEs and agents during development | No — archived. The pattern (let the agent read your llms.txt) survives; the package does not. |
| [`llms-txt-hub`](https://github.com/thedaviddias/llms-txt-hub) | 926 | NOASSERTION | TypeScript | 2026-11-08 | yes | Largest public directory of AI-ready documentation and tools implementing the llms.txt standard, plus an llms.txt of its own | Yes, as a discovery index and as a living reference of what 'llms.txt done well' looks like in practice. |
| [`create-llmstxt-py`](https://github.com/firecrawl/create-llmstxt-py) | 327 | None | Python | 2025-06-02 | yes | Python example that crawls a site with Firecrawl and emits llms.txt and llms-full.txt | Yes, as a generator you can run against your own site — if you already use Firecrawl. No license file and no pushes since 2025-06; treat as a starting point to fork, not a dependency. |

### Content & keyword research

Keyword *volume* data is never free — it comes from Google Ads Keyword Planner, DataForSEO, Semrush or Ahrefs. What is free and open is the **skill and agent layer** on top of it: marketingskills (59k stars), claude-seo (27k stars) and the MCP adapters (semrush-ai-tool, dataforseo/mcp-server-typescript) that give an agent structured access to a paid account you already have. `dataseo-mcp` scrapes Ahrefs' free endpoints through captcha-solving services — its own README warns you are responsible for the terms of service. Do not put it in production.

| Tool | Stars | Licence | Lang | Last push | Self-hosted | What it does | Verdict |
|---|---:|---|---|---|---|---|---|
| [`marketingskills`](https://github.com/coreyhaines31/marketingskills) | 59.2k | MIT | JavaScript | 2026-11-06 | yes | Marketing Agent Skills for Claude Code, Codex, Cursor, Windsurf and anything speaking the Agent Skills spec: CRO, copywriting, SEO, analytics, content marketing... | Yes — the most useful general marketing skill library in open source, and the one most likely to already be in your toolchain. |
| [`claude-seo`](https://github.com/AgriciDaniel/claude-seo) | 27.5k | MIT | Python | 2026-11-01 | yes | Claude Code SEO plugin: 26 sub-skills + 19 specialist agents covering technical SEO, E-E-A-T, schema, GEO/AEO, agent readiness (Lighthouse Agentic Browsing,... | Yes, if you run Claude Code. It is the most complete open SEO skill set and it already knows about llms.txt and WebMCP. |
| [`semrush-ai-tool`](https://github.com/springvoiceswell/semrush-ai-tool) | 365 | MIT | JavaScript | 2026-09-26 | yes | MIT MCP server + CLI giving agents 18 tools over the live Semrush API: keyword research, domain analytics, backlink analysis, traffic insights, competitor... | Yes if you already pay for Semrush — it is a thin, readable adapter. Requires a paid API key, so it is not a free path to Semrush-grade data. |
| [`dataforseo/mcp-server-typescript`](https://github.com/dataforseo/mcp-server-typescript) | 261 | Apache-2.0 | TypeScript | 2026-11-02 | yes | Official DataForSEO MCP server exposing SERP, keyword-data, backlinks, on-page and Labs endpoints to MCP clients | Yes if you are already paying DataForSEO. The most data-complete MCP adapter for paid SERP/keyword APIs. |
| [`seranking/seo-skills`](https://github.com/seranking/seo-skills) | 201 | MIT | Python | 2026-11-05 | yes | Production Claude Agent Skills for the SE Ranking MCP server: content briefs, AI Search checks and reporting against SE Ranking's unified API | Yes alongside an SE Ranking subscription. Narrowest useful case of the skill repos — but it is the official pairing. |
| [`dataseo-mcp`](https://github.com/egebese/dataseo-mcp) | 193 | NOASSERTION | Python | 2026-07-06 | yes | Free MCP server pulling backlinks, keyword difficulty, traffic estimates and keyword ideas from Ahrefs' free tools, plus AI query planning | No in production. It depends on Ahrefs' free web endpoints and captcha-solving services — that is a ToS and account-risk liability, and the repo itself says so. |

### Backlinks

The weakest open category, and worth being honest about. There is no open backlink index; authority metrics require a paid provider. What *is* free is discovery: **Common Crawl** via `mcp-common-crawl` finds mentions and expired domains across three indexes, which is enough to spot a competitor's link sources or find expired domains worth reclaiming.

| Tool | Stars | Licence | Lang | Last push | Self-hosted | What it does | Verdict |
|---|---:|---|---|---|---|---|---|
| [`mcp-common-crawl`](https://github.com/arturseo-geo/mcp-common-crawl) | 1 | NOASSERTION | JavaScript | 2026-03-26 | yes | MCP server for the Common Crawl CDX index: backlink discovery across three indexes, expired/parked domain finding, competitor analysis | Yes as a free, index-based backlink discovery source — Common Crawl is the only free source of any scale. It finds mentions, not authority. 1 star; validate output quality before relying on it. |

### Programmatic SEO

Google's spam policy (last updated 2026-08-28) names **scaled content abuse** as a violation: "many pages are generated for the primary purpose of manipulating search rankings and not helping users... no matter how it's created." The test is purpose and value, not method or volume. So the reference implementations here matter more than the frameworks: `santifer-irepair` (15,500+ pages from Airtable) and `awesome-programmatic-seo` show what distinct, data-backed pages look like.

| Tool | Stars | Licence | Lang | Last push | Self-hosted | What it does | Verdict |
|---|---:|---|---|---|---|---|---|
| [`santifer-irepair`](https://github.com/santifer/santifer-irepair) | 43 | None | Astro | 2026-08-27 | yes | Astro-based programmatic SEO site that generated 15,500+ unique pages from an Airtable data source - a concrete, inspectable reference implementation | Yes as a template to read. It shows the data-model-plus-template shape that makes pSEO pages genuinely distinct rather than spun. |
| [`awesome-programmatic-seo`](https://github.com/guptadeepak/awesome-programmatic-seo) | 8 | None | None | 2025-09-24 | yes | Curated resource for scaling organic growth through programmatic SEO: templates, tool stacks, case studies and playbooks | Yes, as a planning reference. The honest framing it carries — pSEO needs real data per page — is the correct one under Google's scaled-content-abuse policy. |

### Agent readiness (WebMCP, MCP servers)

**WebMCP** (the spec) is the one to learn: expose web functionality as tools — JavaScript functions with natural-language descriptions and structured schemas — so in-browser agents can actuate content built for humans. The `modelcontextprotocol/servers` reference collection is the architectural pattern for anything you expose to an agent. Note the practical caveat: WebMCP browser support is still in progress, so treat it as forward-looking rather than something to ship this quarter.

| Tool | Stars | Licence | Lang | Last push | Self-hosted | What it does | Verdict |
|---|---:|---|---|---|---|---|---|
| [`mcp/servers (reference servers)`](https://github.com/modelcontextprotocol/servers) | 91.9k | NOASSERTION | TypeScript | 2026-11-05 | yes | The official Model Context Protocol reference server collection - the canonical pattern for exposing a capability to agents | Yes as the architectural reference for anything you expose to an agent. The reference set itself is being split into per-domain collections; pull only what you use. |
| [`webmcp (spec)`](https://github.com/webmachinelearning/webmcp) | 4.9k | NOASSERTION | Bikeshed | 2026-11-06 | yes | The WebMCP specification: expose web app functionality as tools - JavaScript functions with natural-language descriptions and structured schemas - so in-browser... | Yes, as the spec to read before building agent-accessible UI. Browser support is still in progress, so treat it as forward-looking rather than ship-blocking. |
| [`WebMCP (early implementation)`](https://github.com/MiguelsPizza/WebMCP) | 1.1k | NOASSERTION | TypeScript | 2025-10-07 | yes | Independent, earlier WebMCP implementation - TypeScript, browser-side tool exposure for agents | Reference implementation only. Last push was 2025-10-07; the webmachinelearning spec has moved on since. |
| [`webmcp-tools`](https://github.com/GoogleChromeLabs/webmcp-tools) | 772 | Apache-2.0 | TypeScript | 2026-11-06 | yes | Chrome Labs utilities and demos supporting WebMCP adoption: developer tooling, examples and adoption aids | Yes, as the practical companion to the spec. Early but it is the reference implementation team. |

### SEO-as-agent skills & MCP servers

The 2026 pattern: instead of a dashboard, an MCP server that hands your **own first-party data** to an agent and lets it reason. `open-seo-mcp-skills` (9k stars) is the most complete — rankings from your Search Console, traffic from GA4 including AI referrals, and a clearly-labelled paid source for the data Google will not give you. **SEOMonster** is the cleanest local alternative (uvx, your own credentials, no SaaS). `claude-seo` and `marketingskills` are the skill libraries that sit on top.

| Tool | Stars | Licence | Lang | Last push | Self-hosted | What it does | Verdict |
|---|---:|---|---|---|---|---|---|
| [`open-seo-mcp-skills`](https://github.com/Ryze-AI-Adgent/open-seo-mcp-skills) | 9k | MIT | Shell | 2026-10-27 | yes | MIT SEO + GEO skills for Claude with a free SEO MCP server (the Ryze connector): keyword research, rank tracking, site audits, backlinks, competitor gaps, AI... | Yes, and it is the most honest architecture in this list: your own first-party data plus a clearly-labelled paid data source. The skills are MIT and forkable. |
| [`seo (seoskill)`](https://github.com/iannuttall/seo) | 610 | Apache-2.0 | TypeScript | 2026-11-08 | yes | Google Search Console MCP server and CLI for agent-native teams: your clicks, impressions and positions from GSC, visits from GA/Clicky, Bing data, Google update... | Yes, if you want a GSC facts layer. Note the hosted MCP endpoint: the CLI runs locally but the remote MCP service is a separate dependency. |
| [`SEOMonster`](https://github.com/avansaber/seo-monster) | 491 | MIT | Python | 2026-11-06 | yes | Local, user-credential-driven MCP server for SEO workflows over Google Search Console, Google Analytics and PageSpeed, running on your machine via uvx | Yes. The closest thing to 'the SEO analyst that lives in your assistant' without handing credentials to a SaaS. |
| [`Suganthans-GSC-MCP`](https://github.com/Suganthan-Mohanadasan/Suganthans-GSC-MCP) | 185 | Apache-2.0 | TypeScript | 2026-09-27 | yes | Focused MCP server for Google Search Console: ask your assistant questions about your search data and get answers | Yes, as the minimal GSC-only server. Redundant if you already run seo-monster or iannuttall/seo. |
| [`seo-audit`](https://github.com/houtini-ai/seo-audit) | 98 | Apache-2.0 | TypeScript | 2026-11-03 | yes | Free SEO Audit MCP server for Claude that captures and stores all the raw data needed for a complete technical audit, so the agent reasons over evidence rather... | Yes, paired with a crawler skill. Raw-evidence-first is the correct design for agent-driven audits. |

### Job search & ATS workflows

Two distinct problems, two distinct toolchains. **Finding and filtering**: career-ops (81k stars) is the standout — it scores every posting against your CV, tells you what to skip, and leaves Submit to you; JobSpy is the scraper underneath it. **Tailoring**: Resume-Matcher and ats-buddy do the CV-vs-JD matching, with ats-buddy running the model locally so your resume never leaves the machine. Auto-apply (AIHawk) works but carries real platform-policy risk.

| Tool | Stars | Licence | Lang | Last push | Self-hosted | What it does | Verdict |
|---|---:|---|---|---|---|---|---|
| [`career-ops`](https://github.com/career-ops-hq/career-ops) | 81.2k | MIT | JavaScript | 2026-11-08 | yes | Open-source AI job search agent (Claude Code plugin, 700+ contributors): scan job boards, score each posting 1-5 against your CV, mark non-fits, tailor your CV,... | Yes — the strongest open job-search agent, and the honest one: it filters aggressively before it automates anything. |
| [`SimplifyJobs/Summer2027-Internships`](https://github.com/SimplifyJobs/Summer2027-Internships) | 48.3k | None | Python | 2026-11-08 | yes | Continuously updated list of summer 2027 SWE, data science, AI, quant, product and hardware internship postings, with direct application links, maintained by... | Yes as a source of postings — but it is a data set, not a workflow. Verify each link before applying; listings go stale. |
| [`Reactive Resume`](https://github.com/reactive-resume/reactive-resume) | 45.5k | MIT | TypeScript | 2026-11-08 | yes | Privacy-first, self-hostable resume builder: modern templates, import from PDF, role-based sharing links, JSON import/export, PDF/HTML/DOCX export | Yes, as the best open resume builder for hosting your own. Better template layer than OpenResume, weaker ATS-analysis layer. |
| [`Jobs_Applier_AI_Agent (AIHawk)`](https://github.com/feder-cr/Jobs_Applier_AI_Agent) | 32.4k | MIT | Python | 2026-11-08 | yes | AIHawk: an AI job application bot that narrows millions of postings to the ones matching your resume, then auto-applies by driving a browser | Yes, but understand the risk profile: mass auto-apply has triggered recruiter scrutiny and platform policy friction. Use it for the search and filtering stage. |
| [`Resume-Matcher`](https://github.com/srbhr/Resume-Matcher) | 29.2k | Apache-2.0 | Python | 2026-11-07 | yes | Self-hosted AI harness for building resumes, PDFs and cover letters locally against 100+ LLMs (Claude, ChatGPT, DeepSeek, Kimi, GLM, Gemma), tailoring a CV to a... | Yes. The de-facto reference implementation for tailoring a CV to a JD, and it keeps your documents local. |
| [`SimplifyJobs/New-Grad-Positions`](https://github.com/SimplifyJobs/New-Grad-Positions) | 18.3k | None | None | 2026-11-08 | yes | Continuously updated collection of full-time SWE, quant and PM new-grad roles | Yes as a postings source for the entry-level search. Same caveat: verify before applying. |
| [`OpenResume`](https://github.com/xitanggg/open-resume) | 9k | AGPL-3.0 | TypeScript | 2024-10-29 | yes | Browser-only resume builder and resume parser: ATS-friendly formatting for Greenhouse and Lever, real-time PDF preview, import from an existing PDF, and a... | Yes for ATS parsing specifically — its parser is the reason to use it. Runs fully in-browser, nothing leaves the machine. Last push was 2024-10-29, so treat it as stable-but-static. |
| [`JobSpy`](https://github.com/speedyapply/JobSpy) | 4.7k | MIT | Python | 2026-10-27 | yes | Jobs scraper library for LinkedIn, Indeed, Glassdoor, ZipRecruiter, Bayt, Naukri, BDJobs and HelloWork | Yes, as the data layer under a job agent. Pair it with career-ops rather than running an auto-applier directly against the scraped results. |
| [`ats-buddy`](https://github.com/seehiong/ats-buddy) | 140 | MIT | TypeScript | 2026-08-10 | yes | Private-by-design ATS resume analyzer that runs entirely on your machine via WebLLM in the browser or a local Ollama model: match score against a JD, missing... | Yes — the only ATS analyzer I verified with no server and no upload. Small project (140 stars) but the privacy property is the point. |
| [Jobscan](https://www.jobscan.co/pricing) | — | proprietary | — | — | no | Paid ATS resume scanner: compares your resume against a job description, counts keyword matches against the employer's ATS, flags formatting issues, and provides... | Skip it if you run ats-buddy or Resume-Matcher locally; the matching logic is the same and the price is not. |
| [Simplify.jobs](https://simplify.jobs/) | — | proprietary | — | — | no | AI job-search platform (free registration plus a Simplify+ subscription): proactive role matching, resume tailoring, browser-form autofill and an Autopilot that... | Useful for breadth of listings. Verify each posting on the employer's own ATS - aggregator data ages badly, and Autopilot carries the same policy risk as any auto-applier. |
| [Teal](https://www.tealhq.com/pricing) | — | proprietary | — | — | no | AI job search suite (free tier plus a Teal+ paid tier): resume builder, ATS keyword matching against a JD, real-time resume feedback, unlimited job tracking,... | Good tracker and keyword UI. The trade-off is that the free tier uploads your resume — ats-buddy gives the same signal with nothing leaving the machine. |

### AI-content detection risk

**Google does not penalise AI authorship.** It penalises low value: the scaled-content-abuse policy applies "no matter how it's created". So detectors are a *style* tool, not a ranking tool. Use `lmscan` as a pre-publish lint for slop signals (burstiness, sentence-length variance, slop-word density) and rely on an editorial checklist for substance. A detector score is not evidence of a ranking risk, and treating it as one wastes editorial effort.

| Tool | Stars | Licence | Lang | Last push | Self-hosted | What it does | Verdict |
|---|---:|---|---|---|---|---|---|
| [`lmscan`](https://github.com/stef41/lmscan) | 37 | NOASSERTION | Python | 2026-04-11 | yes | Detects AI-generated text and fingerprints which LLM wrote it, offline with zero dependencies: burstiness, sentence-length variance, slop-word density,... | Yes, as a pre-publish lint for your own drafts. Treat the score as a smell test, not a verdict — detectors are gameable and Google's policy is about value, not authorship. |
| [`ai-slop-detector`](https://github.com/fs0cietyx/ai-slop-detector) | 23 | MIT | Python | 2026-07-06 | yes | Production-ready AI text classifier built on PyTorch with LoRA, detecting machine-generated content for pre-publication quality gating | Only if you have the GPU budget and the training data. The default should be an editorial checklist, not a model. |

### Automation & scraping infrastructure

The glue layer. n8n for scheduled workflows, crawl4ai for scraping pages into clean Markdown, browser-use when a site needs JavaScript or a login, and markitdown to make any document pipeline LLM-readable. None of these are SEO tools, and the stack does not work without them.

| Tool | Stars | Licence | Lang | Last push | Self-hosted | What it does | Verdict |
|---|---:|---|---|---|---|---|---|
| [`n8n`](https://github.com/n8n-io/n8n) | 209.8k | NOASSERTION | TypeScript | 2026-11-08 | yes | Fair-code workflow automation with native AI capabilities | Yes, as the glue: schedule crawl → parse → query GSC → post to Slack. The SEO-community n8n nodes (SE Ranking, DataForSEO) extend it. |
| [`markitdown`](https://github.com/microsoft/markitdown) | 194.5k | MIT | Python | 2026-11-07 | yes | Converts files and office documents (including PDF, DOCX, XLSX, PPTX) into Markdown for LLM consumption | Yes — the boring dependency that makes any document pipeline LLM-ready. |
| [`browser-use`](https://github.com/browser-use/browser-use) | 120.3k | MIT | Python | 2026-11-08 | yes | Open-source Python library for AI browser agents, plus a cloud with stealth browsers, driving real Chrome through an LLM | Yes when a site needs JavaScript or a login. Heavyweight for anything a plain HTTP client can reach. |
| [`crawl4ai`](https://github.com/unclecode/crawl4ai) | 87.1k | Apache-2.0 | Python | 2026-11-04 | yes | Open-source LLM-friendly web crawler and scraper that emits clean Markdown | Yes for scraping competitor/AI-answer pages into Markdown for analysis. The hosted API is a fast path; self-host to keep it free. |

### Self-hosted analytics

You cannot track AI referral traffic you do not record. Umami (MIT) is the lightest self-hosted option; Matomo (GPL) gives you user-level data and heatmaps; Plausible (AGPL) is the middle ground. Pair with GA4 if you want Search Console's view of reality — GA4 is where the ChatGPT, Perplexity, Claude and Gemini referral data shows up.

| Tool | Stars | Licence | Lang | Last push | Self-hosted | What it does | Verdict |
|---|---:|---|---|---|---|---|---|
| [`umami`](https://github.com/umami-software/umami) | 40k | MIT | TypeScript | 2026-11-07 | yes | Privacy-first web and product analytics: traffic, campaigns, behavior, conversions, no cookie banner | Yes, as the analytics of record so you can actually see AI referral traffic (ChatGPT, Perplexity, Claude, Gemini) land as sessions and conversions. |
| [`Plausible Analytics`](https://github.com/plausible/analytics) | 29.8k | AGPL-3.0 | Elixir | 2026-11-08 | yes | AGPL-3.0, Elixir-based, privacy-first, cookie-free analytics: light and fast, self-hostable, one query per page view | Yes as the lightest self-hosted analytics. Less depth than Matomo for AI-referral segmentation. |
| [`Matomo`](https://github.com/matomo-org/matomo) | 22k | GPL-3.0 | PHP | 2026-11-08 | yes | GPL-3.0 analytics platform with full data ownership, session recording, heatmaps, and - relevant here - a WebAnalytics API and third-party integrations for... | Yes if you need user-level data and cannot use GA4. Heavier to run than Umami. |

### Curated references

Reading lists, kept separate from tools because they age differently. `awesome-seo` is the one with an editorial policy (it refuses vendor listings), `awesome-geo` is the most current GEO map, and `awesome-generative-engine-optimization` has not moved since 2026-04 — a snapshot, not a live index.

| Tool | Stars | Licence | Lang | Last push | Self-hosted | What it does | Verdict |
|---|---:|---|---|---|---|---|---|
| [`awesome-seo`](https://github.com/i365dev/awesome-seo) | 2.8k | MIT | None | 2026-10-21 | yes | Curated SEO guides, tools and references maintained since 2019, with an explicit policy of refusing vendor and self-promotional listings | Yes, as a reading list with editorial standards. The no-vendor-listing policy makes it more trustworthy than most awesome lists. |
| [`awesome-generative-engine-optimization`](https://github.com/amplifying-ai/awesome-generative-engine-optimization) | 539 | None | None | 2026-04-14 | yes | Curated GEO resource list covering guides, case studies, tools, research papers, technical documentation, agentic commerce, monitoring and analytics | Yes as a map of the field. No license file and it has not been pushed since 2026-04 — treat it as a snapshot, not a live index. |
| [`awesome-geo`](https://github.com/luka2chat/awesome-geo) | 132 | CC0-1.0 | None | 2026-10-14 | yes | Extensive GEO list with research papers (including the Princeton GEO paper), tools and platforms, AI search engines, strategies, analytics and monitoring, plus a... | Yes — the most current and comprehensive GEO reading list I verified. |

### Research & primary sources

The primary source worth reading is **AutoGEO** (ICLR 2026, arXiv 2510.11438), which formalises the GEO concept with a visibility score (GEO) and a utility score (GEU). Its caveat is important: rule extraction is engine- and dataset-specific, so anything it learns must be re-extracted when you change engines or domains.

| Tool | Stars | Licence | Lang | Last push | Self-hosted | What it does | Verdict |
|---|---:|---|---|---|---|---|---|
| [`AutoGEO`](https://github.com/cxcscmu/AutoGEO) | 237 | MIT | Python | 2026-06-14 | yes | ICLR 2026 research framework (arXiv 2510.11438) that automatically extracts content-preference rules from generative engines and rewrites documents to maximize... | Read the paper, do not deploy the model. Rule extraction is engine- and dataset-specific, so retraining is required the moment you switch engines. |

## 3. Paid tools: what you are actually buying

Prices below were read from each vendor's own pricing page on **2026-11-08** and will drift.

| Product | Category | Entry price | What you get at entry | Open-source equivalent |
|---|---|---|---|---|
| [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/seo-spider/pricing/) | Crawler | Free (500 URLs) / GBP 199 per seat per year | Unlimited URLs, JS rendering, custom extraction, scheduling, GSC + GA + PageSpeed integrations, Looker Studio reports | [SiteOne Crawler](https://github.com/janreges/siteone-crawler) + [LibreCrawl](https://github.com/PhialsBasement/LibreCrawl) |
| [SerpApi](https://serpapi.com/pricing) | SERP API | Free 250 searches/mo; $25/mo for 1,000 | Google SERP + **Google AI Overview** + AI Mode + Jobs + News endpoints; 50/hr throughput free | [SerpBear](https://github.com/towfiqi/serpbear) (dashboard only — still needs a feed) |
| [DataForSEO](https://dataforseo.com/pricing) | SERP + keyword + backlink API | Pay-as-you-go, $50 minimum first payment | SERP, Keyword Data, Backlinks, Domain Analytics, On-Page, Labs (incl. AI-optimization) | No open equivalent for the data; [crawlseo](https://github.com/crawlseo/crawlseo) is the BYOK frontend |
| [Ahrefs](https://ahrefs.com/pricing) | SEO suite | $29/mo Starter (research); $129/mo Lite | Lite: 750 tracked keywords, 150 AI prompt checks, 100k crawl credits, API + MCP; Standard $249, Advanced $449, Enterprise $1,499 | None — [Search Console MCP](https://github.com/saurabhsharma2u/search-console-mcp) gives first-party GSC instead |
| [Semrush](https://www.semrush.com/pricing/seo-ai-search/) | SEO + AI visibility suite | $117.33/mo annual ($139 monthly) | 5 sites, 500 keywords, AI search tracking, AI sentiment, custom prompts; Starter $165.17/mo adds full AI Search; ships MCP + API | None — [Elmo](https://github.com/elmohq/elmo) for AI visibility, [open-seo-mcp-skills](https://github.com/Ryze-AI-Adgent/open-seo-mcp-skills) for GSC/GA4 |
| [SE Ranking](https://seranking.com/subscription.html) | SEO + GEO suite | $129/mo ($103.20 annual) | Core: 10 projects, 2k keywords, **100 prompts tracked daily**, 5 GEO domains, 250k pages/mo audit, 25k API credits, MCP access; Growth $279/mo | None at this prompt volume — [Elmo](https://github.com/elmohq/elmo) is the free route but self-operated |
| [Otterly.AI](https://otterly.ai/pricing) | AI visibility monitoring | $29/mo (Lite) | 15 prompts daily across ChatGPT, AI Overviews, Perplexity, Copilot; Claude/AI Mode/Gemini add-ons; unlimited seats; Standard $189 (100 prompts, API + MCP) | [Elmo](https://github.com/elmohq/elmo) self-hosted |
| [Peec AI](https://peec.ai/pricing) | AI visibility analytics | $95/mo (Starter) | 50 prompts, 1 project, 3 models, daily; Pro $245 (150 prompts), Advanced $495 (350 prompts, multi-country, Looker Studio) | [Elmo](https://github.com/elmohq/elmo) self-hosted |
| [Profound](https://www.tryprofound.com/pricing) | AI visibility enterprise | Free trial (50 prompts, 7 days) → Enterprise custom | Answer-engine insights, agent analytics, attribution, up to 9 engines, SSO/SOC 2 — no published self-serve paid tier | [Elmo](https://github.com/elmohq/elmo), [Ansvisor](https://github.com/ansvisor/ansvisor) |
| [Scrunch AI](https://www.scrunchai.com/pricing) | AEO enterprise | Core $250/mo (Enterprise custom) | Core: 4 LLMs (ChatGPT, Perplexity, Google AIO, Copilot), 125 unique prompts, 5,000 responses/mo, 1 country, 1 language, 5 competitors, 5 site audits/mo, 5 licences; Enterprise adds 9 LLMs incl. Claude, Gemini, Grok, AI Mode | Skip unless you are an enterprise buyer. $250/mo buys less model coverage and fewer prompts than the $29-95 tiers. |
| [Ahrefs Brand Radar](https://ahrefs.com/brand-radar/) | AI visibility index | $199/mo per platform, $699/mo all platforms; custom prompts from $50 | Searchable AI index across 7 platforms plus 2,500 custom checks per package | None — the index is the product |
| [Sitebulb](https://www.sitebulb.com/pricing/) | Crawler (browser SaaS) | Subscription per user | Spreadsheet-style crawl UI, JS rendering, site health, no per-URL pricing | [LibreCrawl](https://github.com/PhialsBasement/LibreCrawl) |
| [DeepCrawl](https://www.deepcrawl.com/pricing/) | Cloud crawler | Subscription per account | Scheduled large-scale crawling, JS rendering, bot-aware crawling | [SiteOne Crawler](https://github.com/janreges/siteone-crawler) |
| [Teal](https://www.tealhq.com/pricing) | Job search suite | Free tier; Teal+ paid tier | ATS keyword matching against a JD, real-time resume feedback, unlimited job tracking, tailored bullets, cover-letter generator; the free tier uploads your resume to their servers | [ats-buddy](https://github.com/seehiong/ats-buddy) (nothing leaves your machine) |
| [Jobscan](https://www.jobscan.co/pricing) | ATS scanner | Subscription | ATS keyword match count against the employer's ATS, formatting checks, match score | [ats-buddy](https://github.com/seehiong/ats-buddy), [OpenResume parser](https://github.com/xitanggg/open-resume) |
| [GPTZero](https://www.gptzero.me/pricing) | AI detection | Free tier; paid per seat/word quota | Institutional-grade detection; API in 17 languages | [lmscan](https://github.com/stef41/lmscan) (offline, fingerprints the model) |
| [Originality.ai](https://originality.ai/pricing) | AI detection + plagiarism | Free 3 scans/day; Pro $12.95/mo annual ($14.95 monthly) | 2,000 credits/mo (1 credit = 100 words), full-site scans, plagiarism + readability + content-quality checks, and an MCP endpoint | [lmscan](https://github.com/stef41/lmscan) (offline, fingerprints the model) |
| [Simplify.jobs](https://simplify.jobs/) | Job aggregator + Autopilot | Free registration; Simplify+ subscription | AI-matched roles, resume tailoring, form autofill and Autopilot auto-apply (claims 50 applications in ~5 minutes of your time); web and iOS apps, 2M+ job seekers | Useful for breadth of listings. Verify each posting on the employer's own ATS — aggregator data ages badly, and Autopilot carries the same policy risk as any auto-applier. |

### The honest read on paid vs open

- **Cheap and closed beats expensive and open for the AI-visibility category.** Otterly at $29/mo
  tracks 15 prompts across four engines with unlimited seats. Peec at $95 tracks 50 prompts across three.
  Ahrefs Brand Radar at $199 *per platform* is a different order of magnitude — and requires an Ahrefs
  subscription underneath.
- **SE Ranking is the value pick** if you want one vendor for classical SEO *and* AI visibility: 100
  daily AI prompts plus 250k pages/month of audit inside a full suite for $103-129/mo, with MCP access
  (the only paid suite here whose MCP server is worth wiring into an agent).
- **SerpApi's $25 starter is the highest-leverage spend in this document.** Google AI Overview is the
  single hardest data point to collect yourself, and it is what every AI-visibility tool is ultimately
  measuring.
- **Do not pay for a crawler you can run yourself.** SiteOne Crawler, LibreCrawl and linkinator cover
  the useful part of Screaming Frog for $0. The £199 buys you saved setup time, not capability.

## 4. Recommended stack for 2026

Assumption: a small team (1-3 people) running a content site that must be visible in Google *and* in
AI answers, with a budget of roughly $50-150/month and a preference for owning its own data.

### Tier 0 — free, self-hosted, day one (\$0)

| Need | Pick | Why this one |
|---|---|---|
| Crawl + CI gate | [SiteOne Crawler](https://github.com/janreges/siteone-crawler) | Single Rust binary, HTML/JSON reports, `--ci` exits 10 on failure, whole-site Markdown export |
| Broken links in CI | [linkinator](https://github.com/JustinBeckwith/linkinator) | Standalone binaries + Docker image; runs on local HTML and Markdown too |
| Perf + SEO + llms.txt gate | [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) | The `llms-txt` audit ships inside Lighthouse; budgets fail the build on regression |
| Real-user field metrics | [web-vitals](https://github.com/GoogleChrome/web-vitals) | 4 KB, no dependencies; the only way to get true INP/LCP for your own pages |
| Agent-accessible site | [llms.txt spec](https://github.com/AnswerDotAI/llms-txt) + a generator you fork | Standard now: Lighthouse audits it, docs platforms emit it, the labs publish their own |
| Structured data CI | [ldlint](https://github.com/KevHQ/ldlint) | Go binary, validates JSON-LD against the full schema.org vocabulary over your build output |
| AI crawler evidence | [GEOInflow](https://github.com/yaojingang/GEOInflow) | Joins server logs to your content inventory — the ground truth the trackers lack |
| Bot classification | [isbot](https://github.com/omrilotan/isbot) + [crawler-user-agents](https://github.com/monperrus/crawler-user-agents) | Drop into your edge/log pipeline; Unlicense / MIT, no friction |
| Analytics | [Umami](https://github.com/umami-software/umami) | MIT, cookie-free, self-hosted; records the AI referral traffic |
| Content-to-Markdown | [markitdown](https://github.com/microsoft/markitdown) + [crawl4ai](https://github.com/unclecode/crawl4ai) | Your own content becomes the corpus agents read |
| Automation | [n8n](https://github.com/n8n-io/n8n) | Schedule crawl -> parse -> query GSC -> report |

### Tier 1 — the agent layer (\$0-30/month)

| Need | Pick | Why this one |
|---|---|---|
| First-party SEO data for an agent | [SEOMonster](https://github.com/avansaber/seo-monster) | Runs locally via uvx on your own GSC/GA/PageSpeed credentials; nothing leaves the machine |
| Broader SEO skill set | [open-seo-mcp-skills](https://github.com/Ryze-AI-Adgent/open-seo-mcp-skills) | GSC + GA4 + keyword planner + DataForSEO; MIT and forkable |
| Claude Code skills | [claude-seo](https://github.com/AgriciDaniel/claude-seo) | 26 sub-skills + 19 agents; already covers llms.txt, WebMCP and Lighthouse agentic browsing |
| General marketing skills | [marketingskills](https://github.com/coreyhaines31/marketingskills) | 59k stars, spec-compliant, works in Claude Code, Codex and Cursor |
| Audit-only GEO score | [geo-optimizer-skill](https://github.com/Auriti-Labs/geo-optimizer-skill) | `uvx geo audit --url ...` — 0-100 score, no key, no account, seconds to run |
| Ongoing AI visibility | [Elmo](https://github.com/elmohq/elmo) self-hosted | The most complete open tracker: visibility, share of voice, sentiment, citations, query fan-out |
| SERP data | [SerpApi](https://serpapi.com/pricing) $25/mo | Only mainstream API with a first-class Google AI Overview endpoint; 250 free searches/mo to start |

### Tier 2 — spend only when the free tier is not enough

| Trigger | Buy | Cost |
|---|---|---|
| You need AI-visibility tracking with no ops burden | [Otterly.AI](https://otterly.ai/pricing) $29/mo → [Peec AI](https://peec.ai/pricing) $95/mo | $29-495/mo |
| You want one vendor for SEO *and* AI visibility | [SE Ranking](https://seranking.com/subscription.html) Core | $103-129/mo annual |
| You need keyword volume at scale | [DataForSEO](https://dataforseo.com/pricing) | Pay-as-you-go, $50 minimum |
| A client needs a crawl you cannot run | [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/pricing/) | GBP 199/seat/yr |
| You need a backlink index | [Ahrefs](https://ahrefs.com/pricing) $129/mo or [DataForSEO](https://dataforseo.com/pricing) backlinks API | $129+/mo or per-call |

### What the stack looks like on a day

```
GitHub Actions
  ├─ lighthouse-ci        → perf / a11y / SEO / llms.txt budgets; fails the build
  ├─ siteone-crawler      → full-site crawl, JSON report, --ci gate
  ├─ linkinator           → broken links (site + markdown)
  └─ ldlint               → JSON-LD vs schema.org vocabulary

Nightly (n8n)
  ├─ GEOInflow            → AI crawler hits, statuses, crawl coverage vs sitemap
  ├─ SEROMonster / GSC    → positions, queries, near-ranking opportunities
  └─ SerpApi              → AI Overview snapshots for your tracked prompts

Weekly
  ├─ Elmo / geo-optimizer → AI visibility + GEO score trend
  ├─ changedetection.io   → did the AI answer page change?
  └─ lmscan               → slop lint on new drafts before publish
```

### The rules this stack enforces

1. **Ship llms.txt and validate it in CI.** It costs an afternoon and Lighthouse now scores it.
2. **Measure field metrics, not lab scores.** Lighthouse INP/LCP numbers are lab data on a throttled
   connection; `web-vitals` gives you real users.
3. **Keep first-party data first-party.** Positions come from Search Console, traffic from GA4/Umami,
   crawler behaviour from your own logs. Buy SERP data; never buy your own data back.
4. **Split robots.txt by intent.** Allow the search crawlers (`OAI-SearchBot`, `Claude-SearchBot`,
   `PerplexityBot`), block the training crawlers (`GPTBot`, `ClaudeBot`, `CCBot`) if that is your call.
   An October 2026 robots.txt study of the Tranco top 10,000 found GPTBot blocked at 20.8% of the top
   1,000 sites versus 12.1% for OAI-SearchBot, and 19.2% blocking at least one training crawler against
   10.8% blocking a search crawler — most large sites have already made the split. (Reported figure,
   from a third-party crawl; verify before citing externally.)
5. **Treat AI-visibility numbers as noisy.** One industry analysis puts month-over-month citation
   drift at 54-59% for ChatGPT and Google AI Overviews, and 40-53% for Perplexity and Copilot — that
   is a third-party measurement, but the direction is well attested. Track trends across many prompts,
   never a single answer.
6. **Do not publish at scale without per-page value.** Google's scaled-content-abuse policy applies
   "no matter how it's created" — pSEO pages need real data per page or they are a liability.

## 5. What to skip

| Skip | Because |
|---|---|
| `dataseo-mcp` | Scrapes Ahrefs' free endpoints through captcha-solving services. The repo's own README says you are responsible for those terms of service. Account-risk, not just ToS-risk. |
| `google/schemarama` | Archived in 2024. Read it for design history, do not depend on it. |
| `langchain-ai/mcpdoc` | Archived in 2026-08. The pattern survives; the package does not. |
| `SearchMirror` | Self-describes as pre-1.0 with a legacy Django 3.2 / MongoDB 4.4 runtime. Not production-ready by its own README. |
| `MiguelsPizza/WebMCP` | Last push 2025-10-07; the spec moved on. Use `webmachinelearning/webmcp`. |
| `firecrawl/llmstxt-generator` | Explicitly deprecated in favour of `create-llmstxt-py`; the API is no longer maintained. |
| `Awesome GEO` as a live index | It is a good map, but it has not moved since 2026-04. Check dates before citing it. |
| `AutoGEO` as a production tool | It is research. Rule extraction is engine-specific and must be redone whenever you change engines. |
| `AIHawk` for unattended mass apply | It works, but auto-apply has drawn recruiter scrutiny and platform-policy friction. Use it for search and filtering, apply by hand. |
| Detector-driven editing | Google penalises low value, not machine authorship. Rewriting to beat a detector score degrades the content and does nothing for ranking. |
| A second analytics tool | You will not look at two. Pick Umami *or* Matomo *or* GA4 and instrument AI referrals properly. |

## Related reading on this site

- [Classic SEO in 2026](/writing/seo-core/) — what each tool in this inventory is actually
  measuring, and which of the levers still matter.
- [AI search optimization](/writing/ai-search-optimization/) — the AI-visibility categories
  explained: why the free tools cover most of the measurement gap.
- [The technical blueprint](/writing/technical-blueprint/) — the build specification, including the
  verification gates and CI setup this stack assumes.
- [Senior job hunt and CV strategy](/writing/job-hunt-and-cv/) — the ATS and job-search half of
  the inventory, in the context of an actual campaign.
- [The machine-readable tool index](/tools.json) — the same inventory as JSON, for scripts and
  agents.

---

## 6. Method, and how to re-verify

**What was verified, and how.**

| Claim type | Method |
|---|---|
| Stars, licence, language, last push | `gh api repos/{owner}/{repo}` per repo, 2026-11-08. 84 repos fetched individually, no search-result estimates used. |
| Repo descriptions and features | The repo's own README, fetched via `GET /repos/{o}/{r}/readme`. |
| Paid-tool prices | Each vendor's own pricing page, fetched 2026-11-08 (Screaming Frog, Ahrefs, Semrush, SE Ranking, SerpApi, DataForSEO, Profound, Peec AI, Otterly). |
| Google's AI-features policy | [developers.google.com/search/docs/appearance/ai-features](https://developers.google.com/search/docs/appearance/ai-features) |
| Google's spam policy | [developers.google.com/search/docs/essentials/spam-policies](https://developers.google.com/search/docs/essentials/spam-policies) (last updated 2026-08-28) |
| Lighthouse's llms.txt audit | The audit source itself: `core/audits/agentic/llms-txt.js` in `GoogleChrome/lighthouse` |
| llms.txt adoption claims | `AnswerDotAI/llms-txt` README v2 (revised 2026-08-10) |

**What I did not verify, and how to close the gap.**

- *Reported* third-party figures (citation-drift percentages, AI-answer source distributions, prompt
  counts for paid tiers I could not read on the vendor page) are labelled as reported in the text. Verify
  them before repeating them to a client.
- Open-source tools with no published license (`create-llmstxt-py`, the SimplifyJobs lists, some GEO
  skill repos) are marked `None` in the table — that means *no license file*, which legally means
  all-rights-reserved, not public domain. Do not vendor them into a product without asking.
- I did not run any of these tools. Descriptions come from their documentation, not from execution.
  For anything you will depend on, install it and confirm it still runs — several of these repos move fast.

**Re-running the verification.**

```bash
# One repo
gh api repos/{owner}/{repo} --jq '{stars:.stargazers_count, license:.license.spdx_id, pushed:.pushed_at}'

# The whole set (expects a repos.txt with one owner/name per line)
while read -r r; do
  gh api "repos/$r" --jq '"\(.full_name)|\(.stargazers_count)|\(.license.spdx_id)|\(.pushed_at)"'
done < repos.txt
```

**License meanings.** MIT / Apache-2.0 / BSD: use it commercially, keep the notice. GPL-3.0: derivative
works must be published under GPL. AGPL-3.0: the same applies to network use — relevant if you
self-host a modified version and expose it. CC0-1.0 / Unlicense: public domain, no conditions.
`NOASSERTION` means GitHub could not classify the license — read `LICENSE` before use.

