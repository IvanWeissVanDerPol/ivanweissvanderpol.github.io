---
slug: writing
title: Writing — SEO, AI search optimization and senior job hunting
description: Guides by Ivan Weiss van der Pol on classic SEO, AI search optimization (AEO/GEO), senior job hunts and CVs, and a verified tooling landscape.
answer: I write about the two things that decide whether a page gets found and cited: classic search fundamentals (crawling, indexation, Core Web Vitals, structured data) and AI search optimization (how answer engines retrieve and quote sources). The GEO research found that adding statistics and quotations measurably increases visibility in generative answers, while keyword stuffing performs worse than doing nothing.
keywords: [SEO guides, AI search optimization, AEO, GEO, LLMO, technical SEO, Core Web Vitals, structured data, job hunt, CV strategy, tooling]
date: 2026-11-08
published: 2026-11-08
breadcrumbs: [[Home, ""], [Writing, "writing"]]
body_class: page-writing
---

# Writing — SEO, AI search optimization and senior job hunting
Ivan Weiss van der Pol writes about the two disciplines that decide whether a
page is found and cited. The first is classic search engineering: crawling,
indexation, information architecture, Core Web Vitals, structured data and
measurement. The second is AI search optimization — the mechanics of how
answer engines retrieve and quote sources.

## What do these guides cover?

Four guides, each written to be read by a search engineer or a hiring manager
who wants the mechanics rather than the slogans. Every guide cites primary
documentation, and every statistic carries its source and the date that
source was last revised.

| Guide | What it answers | Who it is for |
|---|---|---|
| [SEO core: the 2026 mechanics](/writing/seo-core/) | How pages get crawled, indexed, rendered and ranked, and which of those levers still matter | SEO engineers, technical leads, in-house teams |
| [AI search optimization](/writing/ai-search-optimization/) | How AI answer engines retrieve, quote and attribute sources — and the crawler policy that governs it | SEO engineers moving into AEO/GEO, content leads |
| [Senior job hunt and CV strategy](/writing/job-hunt-and-cv/) | How ATS parsing, recruiter search and AI assistants change what a senior candidate must publish | Senior candidates, hiring managers, recruiters |
| [Tooling landscape](/writing/tooling/) | Which tools are worth the time and money for crawl analysis, AI-visibility tracking and content QA | Anyone building a search or AEO workflow |

## Why these guides read the way they do

**Answer first.** Every guide opens with a direct answer before the argument,
because that is how generative engines quote and how humans skim. Google's
guidance for its AI features is blunt about the mechanics: AI Overviews and AI
Mode are built on the same index, ranking and snippet-eligibility systems as
classic search, and there are **no additional technical requirements** to be
shown ([AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)).

**Statistics and quotations, not keyword stuffing.** The original generative
engine optimization work found that adding statistics and quotations to source
documents measurably increased visibility in generative engine responses,
while keyword stuffing scored *worse* than the unmodified baseline, and that
effectiveness varied by domain ([GEO: Generative Engine Optimization, arXiv:2311.09735](https://arxiv.org/abs/2311.09735)).

**Machine-readable, not just human-readable.** Every page on this site ships
a markdown twin and a `llms.txt` index, using the v2 link relations
`rel="alternate" type="text/markdown"` and `rel="describedby"`
([llmstxt.org v2](https://llmstxt.org/changes.html)). Lighthouse audits the
`llms.txt` file as part of its agentic-browsing checks
([Lighthouse llms.txt audit](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt)).
Google, for its part, has said plainly that it does **not** use `llms.txt`
files for its own generative features ([generative AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)) —
the file serves other agents, not Googlebot.

**Primary sources with dates.** Search documentation moves: Google's FAQ rich
result stopped appearing in Search results on 7 May 2026 and the
documentation was removed in June 2026 ([Search documentation updates](https://developers.google.com/search/updates)),
and Google's structured-data general guidelines were last revised on 10 July
2026 ([general structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)).
A guide that does not state when its source was last updated is not
trustworthy.

**Performance and accessibility treated as part of the craft.** Core Web
Vitals thresholds are LCP under 2.5 s, INP under 200 ms and CLS under 0.1 at
the 75th percentile ([web.dev — Web Vitals](https://web.dev/articles/vitals)).
Agents read pages through the accessibility tree and the DOM, so the same
semantic structure that helps a screen-reader user helps an agent
([web.dev — agent-friendly websites](https://web.dev/articles/ai-agent-site-ux)).

## How to read them

- If you are hiring for senior AI or automation work, start with
  [the CV](/cv/) and then [the AI search guide](/writing/ai-search-optimization/),
  which is the strongest available demonstration of the optimization
  discipline being hired for.
- If you are building a search or AEO workflow, the
  [SEO core guide](/writing/seo-core/) is the foundation and the
  [tooling landscape](/writing/tooling/) is the shopping list.
- If you are job hunting at senior level,
  [the job-hunt guide](/writing/job-hunt-and-cv/) covers the mechanics of
  being found: ATS parsing, recruiter search strings, and publishing
  evidence in a form that both a keyword filter and an AI assistant can read.

## The method behind the pages

The build for this site — static HTML from Markdown, one stylesheet, JSON-LD
per page, markdown twins, a documented crawler policy, and a linter that
blocks the build on a failed check — is written up in full in
[the technical blueprint](/writing/technical-blueprint/). If you want to
reproduce it, that is the specification.

Also: [about](/about/), [selected work](/work/), and the
[AI crawler policy](/ai-crawler-policy/) that governs how this site is read
by automated agents.

## Sources

The primary sources behind this page, in markdown so they can be quoted or
reused directly:

```markdown
- [Google — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features): last updated 2025-12-10
- [Google — Optimizing your website for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): last updated 2026-07-10
- [GEO: Generative Engine Optimization (arXiv:2311.09735)](https://arxiv.org/abs/2311.09735): statistics and quotations raise generative visibility
- [llms.txt v2](https://llmstxt.org/changes.html): the markdown-twin and describedby link relations used on every page here
- [Lighthouse — llms.txt audit](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt): last updated 2026-05-05
- [web.dev — Agent-friendly websites](https://web.dev/articles/ai-agent-site-ux): semantic structure for humans and agents
- [Google — Search documentation updates](https://developers.google.com/search/updates): the FAQ rich result deprecation of 7 May 2026
```

Last reviewed: 8 November 2026.
