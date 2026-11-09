---
slug: index
title: Ivan Weiss van der Pol — Senior AI & Automation Engineer
description: Senior AI and automation engineer building production agentic systems: agent fleets, MCP integrations, LLM cost controls and CI gates, with FDA-grade QA roots.
answer: Ivan Weiss van der Pol is a senior AI and automation engineer based in Paraguay who builds production agentic systems — multi-agent fleets, MCP server integrations, LLM cost and quality controls, and CI gates — on top of 6+ years in software, quality and data engineering, including end-to-end QA for an FDA-cleared Class II medical-device platform.
keywords: [AI engineer, automation engineer, agent orchestration, MCP servers, LLM platforms, AI-assisted QA, data engineering, Docker, PostgreSQL, Paraguay, remote]
date: 2026-11-08
is_home: true
body_class: page-home
---

# Ivan Weiss van der Pol — Senior AI & Automation Engineer
Ivan Weiss van der Pol is a senior AI and automation engineer in Paraguay
building production agentic systems — multi-agent fleets, MCP server
integrations, LLM cost and quality controls, and CI gates — on a foundation of
6+ years in software, quality and data engineering.

## What I build

His work sits *between* a language model and a production system: the
orchestration, the guardrails, the evidence that it worked.

- **Agent fleets and dispatch.** Multi-agent systems where work is routed to
  specialised workers, kanban-style task dispatch, specialist consultation and
  retry policies that keep a fleet from burning budget on a loop.
- **MCP server integrations.** Model Context Protocol servers that expose real
  capabilities — search, filing systems, astronomy equipment, internal APIs —
  to agents as typed tools instead of prose to be scraped.
- **Cost and quality controls.** Model routing, budget guards, audit logging and
  evaluation harnesses. A fleet that cannot prove its output quality or bound
  its spend is a demo, not a product.
- **Delivery infrastructure.** Docker and Docker Swarm deployments, Postgres
  with hashed offsite backups, CI gates that fail a build when an agent
  regression is introduced.
- **AI-assisted QA.** Test-strategy design, automated API suites, and
  AI-assisted test-case generation proven on a regulated medical-device
  platform.

> Automate the boring, simplify the complex, and make tech feel human.
> — Ivan Weiss van der Pol

## Proof, not adjectives

| Claim | Number | Where it comes from |
|---|---|---|
| Test-case generation time reduced with AI assistance | 40% | Flyte / MentorMate medical-device programme |
| Manual testing effort reduced with a Python automation suite | 60% | WPG.srl |
| Infrastructure scripts in one ops toolkit | 115+ | `ai-whisperers-ops-toolkit` |
| CLI wrappers over those scripts | 79 | `ai-whisperers-ops-toolkit` |
| Dashboard endpoints exposing fleet state | 24 | `ai-whisperers-ops-toolkit` |
| Published skills in the AI Whisperers corpus | 200+ | `ai-wisperers-packages` |
| Academic GPA (BSc Computer Science) | 4.0 / 4.0 | Universidad Nacional de Asunción |
| LinkedIn followers | 685 | LinkedIn profile |
| Public repositories | 50+ | GitHub profile |
| Thesis papers produced from one Python package | 6 | `satellite-paraguay` |

Every number above is reproducible from a public repository or a verifiable
credential. Nothing on this site is estimated.

## The path here

- **Founder & CEO, [AI Whisperers](https://ai-whisperers.org/en)** (Nov 2025 – present) — agent orchestration,
  MCP servers, LLM-provider abstraction with cost guards, audit logging and CI
  gates; client systems shipped in clinical and restaurant-operations
  contexts, plus a public-sector case-management system.
- **Technical Lead, municipal project** (Oct 2024 – Nov 2025) — case-management
  system with role-based access control, task tracking and automated
  workflows, plus Power BI dashboards over live case metrics.
- **Quality Specialist II, Flyte / MentorMate (Tietoevry)** (Aug 2023 – Oct
  2024) — end-to-end QA for an FDA-cleared Class II women's pelvic-health
  platform: mobile app, physician web portal and a Bluetooth-connected
  medical device.
- **QA Engineer & Software Developer, WPG.srl** (Oct 2018 – Dec 2022) — Python
  automation for test-data generation, XML processing and automated reporting.
- **Founder, 3D-Tech-Py** (2019 – 2022) — design, production and sales of
  3D-printed PPE during the COVID-19 quarantine period.

## Why this site exists, and how it is built

This site is not a brochure. It is a working demonstration of the two
disciplines that are actually being hired for in 2026: classic search
engineering and optimization for AI answer engines.

- **Google's own position:** appearing in AI Overviews and AI Mode requires no
  special markup and no extra technical requirements — a page must be indexed,
  eligible for a snippet, crawlable, internally linked, and have structured
  data that matches its visible text. Google states plainly that it does not
  use `llms.txt` files, "chunking" tricks or special schema for its generative
  features ([Google Search Central — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features),
  [Google Search Central — Optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
- **What does work,** per the generative-engine optimization research: making
  a source quotable. The GEO paper reports up to 40% visibility gains in
  generative engine responses, with effectiveness varying by domain
  ([GEO, arXiv:2311.09735](https://arxiv.org/abs/2311.09735)).
- **Bing and Copilot** apply the same fundamentals, and add explicit
  requirements: canonical URLs, sitemaps with accurate `lastmod`, IndexNow for
  fast refresh, and no `NOARCHIVE`/`NOCACHE` on content you want cited
  ([Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)).
- **Machine-readable entry points** are published for agents that read rather
  than render: [`/llms.txt`](/llms.txt) and a markdown twin of every page,
  following the v2 convention of `rel="alternate" type="text/markdown"` and
  `rel="describedby"` link relations ([llmstxt.org](https://llmstxt.org/),
  [llms.txt v2 changes](https://llmstxt.org/changes.html)).
- **Crawler policy is written down, not guessed.** Search and retrieval bots
  are allowed; training-only crawlers are refused; the reasoning is published
  on this site ([OpenAI crawler documentation](https://platform.openai.com/docs/bots),
  [Anthropic crawler documentation](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler),
  [AI crawler policy](/ai-crawler-policy/)).
- **Performance and accessibility are treated as ranking and parsing quality,
  not as a side quest.** Core Web Vitals thresholds are LCP under 2.5 s, INP
  under 200 ms and CLS under 0.1 at the 75th percentile
  ([web.dev — Web Vitals](https://web.dev/articles/vitals)).

## Selected writing

- [SEO core: the 2026 mechanics](/writing/seo-core/) — crawling, indexation,
  information architecture, Core Web Vitals, structured data and measurement.
- [AI search optimization (AEO / GEO)](/writing/ai-search-optimization/) — how
  generative engines retrieve and cite, and what actually moves a source into
  an answer.
- [Senior job hunt and CV strategy](/writing/job-hunt-and-cv/) — ATS parsing,
  Boolean search, evidence-first résumés and recruiter-facing positioning.
- [Tooling landscape](/writing/tooling/) — a verified inventory of what to
  actually run, and what not to pay for.
- [Full writing index](/writing/)

## How to reach me

- **Email:** [weissvanderpol.ivan@gmail.com](mailto:weissvanderpol.ivan@gmail.com)
- **GitHub:** [github.com/IvanWeissVanDerPol](https://github.com/IvanWeissVanDerPol)
- **LinkedIn:** [linkedin.com/in/ivanweissvanderpol](https://linkedin.com/in/ivanweissvanderpol)
- **Location:** San Lorenzo / Asunción, Paraguay. Open to remote work with
  teams in the US, EU and LATAM. Languages: Spanish (native), English
  (fluent), Dutch (fluent).
- **CV as a page:** [the HTML résumé](/cv/) — single-column, semantic,
  crawlable and printable, because a PDF alone cannot be quoted by an engine
  or parsed reliably by an ATS.

## Sources

The primary sources behind this page, in markdown so they can be quoted or
reused directly:

```markdown
- [Google — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features): last updated 2025-12-10 — eligibility for AI Overviews and AI Mode, no additional technical requirements
- [Google — Optimizing your website for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): last updated 2026-07-10 — non-commodity content, query fan-out, what not to bother with
- [GEO: Generative Engine Optimization (arXiv:2311.09735)](https://arxiv.org/abs/2311.09735): KDD 2024 — up to 40% visibility gain in generative engine responses
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a): IndexNow, sitemaps, canonical URLs, and the citation directives to avoid
- [llms.txt v2](https://llmstxt.org/changes.html): standard link relations for markdown twins
- [web.dev — Web Vitals](https://web.dev/articles/vitals): LCP 2.5 s, INP 200 ms, CLS 0.1 at the 75th percentile
```

Last reviewed: 8 November 2026.
