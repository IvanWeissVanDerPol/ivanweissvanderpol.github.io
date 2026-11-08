---
slug: work
title: Selected work — agentic systems, QA automation and data tooling
description: Case studies from Ivan Weiss van der Pol: agent orchestration platforms, MCP servers, regulated QA automation and Python data tooling, with public evidence.
answer: The work below is production engineering, not slides: an agent-fleet runtime with cost guards and CI gates, an MCP server driving real hardware, a 115+ script operations toolkit, and QA automation that cut manual testing effort by 60% on a regulated medical-device platform. Every project links to public code or a verifiable credential.
keywords: [case studies, agent orchestration, MCP servers, ops toolkit, QA automation, Python automation, Docker Swarm, PostgreSQL, medical device QA]
date: 2026-11-08
published: 2026-11-08
breadcrumbs: [[Home, ""], [Work, "work"]]
body_class: page-work
---

# Selected work — agentic systems, QA automation and data tooling
Seven production systems, built by Ivan Weiss van der Pol, a senior AI and
automation engineer. An agent-fleet runtime with cost guards and CI gates. An
operations toolkit of 115+ scripts. An MCP server driving Celestron mounts. QA
automation on an FDA-cleared medical device. A Python suite that cut manual
testing effort by 60%. Municipal case management with live dashboards. An
earth-observation package that produced six thesis papers.

## What do these case studies prove?

Each entry has the same four parts: the **problem**, the **approach**, the
**result**, and **what it proves**. The results are limited to what is
verifiable in a public repository, a credential or a measured number from the
CV — no estimates, no vanity metrics. Source of truth for every claim:
[the canonical profile data](/writing/technical-blueprint/) and the
[public repositories](https://github.com/IvanWeissVanDerPol) linked below.

## Case study 1 — Agent fleet runtime with cost guards and CI gates

**Problem.** Running several LLM agents against real client systems raises
three failure modes that ordinary software does not have: unbounded spend,
unverifiable output quality, and silent regressions between model or prompt
changes. A team can ship a demo in a day and operate it for months only if
the fleet is instrumented.

**Approach.** Architected a runtime around six mechanisms: a task dispatcher
that routes work to specialised workers; a provider abstraction that lets a
task run on Claude, Gemini, Copilot, Cursor or Windsurf without code changes;
per-task budget guards that stop a runaway loop; an audit log of every agent
action; an evaluation harness that scores outputs; and CI gates that fail a
build when a change regresses a score. The stack is Python, FastAPI,
LangChain, LangGraph, n8n, Docker Swarm, PostgreSQL and MCP.

**Result.** The runtime underpins client systems in clinical,
restaurant-operations and public-sector contexts, an internal skills corpus of
200+ published skills with secret scanning, and a scheduled cron fleet. The
reasoning is why it matters: the same guardrails that make an agent
*operable* are the controls that make it auditable, and auditability is what
regulated buyers ask for first.

**What it proves.** Agent orchestration is an engineering problem with
production constraints — cost, determinism, evaluation and rollback — not a
prompt-engineering exercise.

Source: [ai-whisperers-hermes-agent](https://github.com/IvanWeissVanDerPol/ai-whisperers-hermes-agent)
and [ai-whisperers-packages](https://github.com/IvanWeissVanDerPol/ai-whisperers-packages).

## Case study 2 — Operations toolkit: 115+ scripts, 79 wrappers, 24 dashboards

**Problem.** Infrastructure work spreads across ad-hoc shell commands. When
one person knows how the fleet is wired, the fleet is not operable by anyone
else, and every incident becomes archaeology.

**Approach.** Built an operations toolkit where every capability is a script
with a tested wrapper, and every signal is exposed as a dashboard endpoint:
115+ scripts, 79 wrappers and 24 dashboard endpoints covering fleet state.

**Result.** Day-two operations became a supported surface rather than tribal
knowledge, and the same tooling backs the CI gates used by the agent runtime.

**What it proves.** Treat infrastructure as a product with an API surface —
and an agent fleet is only as reliable as the operations layer underneath it.

Source: [ai-whisperers-ops-toolkit](https://github.com/IvanWeissVanDerPol/ai-whisperers-ops-toolkit).

## Case study 3 — MCP server driving Celestron mounts

**Problem.** Telescope control normally lives in vendor software that no
language model can call. A model that can *see* and *control* the sky is a
genuinely useful agent — but only if the tools are typed, safe and explicit
rather than scraped DOM.

**Approach.** Built an MCP server that exposes Celestron mount control as typed tools:
tracking, a night scheduler and plate solving. Agents call the tools; they do
not guess at a UI.

**Result.** A working agent-controlled observatory path: the scheduler
decides what to observe, the mount tracks, the solver confirms the target.

**What it proves.** MCP is the right integration surface for exposing real
capability to agents, and the pattern — schema-typed tools, no DOM scraping —
transfers from hardware to any internal system.

Source: [telescope-ai](https://github.com/IvanWeissVanDerPol/telescope-ai).

## Case study 4 — QA automation on an FDA-cleared Class II platform

**Problem.** A regulated women's pelvic-health platform shipped three
surfaces at once: a mobile app, a physician web portal and a
Bluetooth-connected medical device. Test coverage had to keep pace with
regulatory expectations, and test data for therapy workflows could not be
copied from production.

**Approach.** Built test strategies aligned to regulatory compliance,
automated API suites in Postman driven by MongoDB-generated test data, and
introduced AI-assisted test-case generation with human review. Led a JSON →
XLSX therapy-data conversion initiative so client data management worked
without manual exports.

**Result.** Test-case generation time cut by 40%. End-to-end QA across
Paraguay, USA and Bulgaria teams on a product under FDA Class II clearance.

**What it proves.** AI-assisted testing is defensible in regulated
environments when the generation is auditable and the strategy is written by
someone who understands the compliance requirements.

Source: [Flyte / MentorMate engagement](https://www.linkedin.com/in/ivanweissvanderpol)
and the CV entry on the [CV page](/cv/).

## Case study 5 — Python automation that removed 60% of manual testing effort

**Problem.** At WPG.srl, regression testing on client applications was manual
and repetitive: test data had to be prepared, XML had to be processed by hand,
and results had to be reported by hand.

**Approach.** Built a Python automation suite covering test-data generation,
XML processing and automated report generation, then integrated it into the
SDLC documentation so the workflow was reproducible for the rest of the team.

**Result.** Manual testing effort reduced by 60%, with the same suite
covering multiple client applications.

**What it proves.** The highest-leverage QA work is not test authoring — it is
removing the manual steps between a change and a trustworthy report.

Source: CV entry on the [CV page](/cv/).

## Case study 6 — Municipal case management with Power BI over live metrics

**Problem.** A municipal government team tracked cases, documents and
workflows across disconnected systems, and leadership had no reliable view of
case volume or throughput.

**Approach.** Architected a case-management system with role-based access
control, task tracking and automated workflows; implemented SharePoint
document management; delivered Power BI dashboards over live case metrics;
and ran client training so the team could operate the system without me.

**Result.** A system the client owns and runs, with reporting on live data
rather than manual extracts.

**What it proves.** Delivery includes enablement — and dashboards over live
data beat recurring reports.

Source: CV entry on the [CV page](/cv/).

## Case study 7 — Multi-temporal earth observation as one Python package

**Problem.** Multi-temporal analysis of satellite imagery is usually a
research mess: one script per date, one script per sensor, no shared
preprocessing.

**Approach.** Built a single Python package with shared preprocessing,
temporal compositing and analysis layers, so a study is a configuration
change rather than a rewrite.

**Result.** 6 thesis papers produced from that one package.

**What it proves.** Data tooling earns its keep by making the second study
cheaper than the first — the same argument behind reusable agent tooling.

Source: [satellite-paraguay](https://github.com/IvanWeissVanDerPol/satellite-paraguay).

## The pattern across all seven

- **Bounded autonomy.** Every system that acts has explicit limits, budgets and
  logs.
- **Evidence over assertion.** Numbers, public code, verifiable credentials.
- **Operable handover.** Documentation and training so the client owns the
  result.
- **Reuse.** A fleet needs an ops layer; a data study needs a package; a QA
  practice needs a suite that other people can run.

More context: [about](/about/), [the CV](/cv/), and the method behind these
pages in [the technical blueprint](/writing/technical-blueprint/).

## Sources

The primary sources behind this page, in markdown so they can be quoted or
reused directly:

```markdown
- [Google — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features): last updated 2025-12-10 — the eligibility bar every case study here is measured against
- [Google — Optimizing your website for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): last updated 2026-07-10 — first-hand experience as the retrieval differentiator
- [GEO: Generative Engine Optimization (arXiv:2311.09735)](https://arxiv.org/abs/2311.09735): why results, not adjectives, travel
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a): canonical URLs and freshness signals for the case-study pages
- [WebMCP — Chrome for Developers](https://developer.chrome.com/docs/ai/webmcp/): the typed-tool pattern used in the telescope case study
- [web.dev — Web Vitals](https://web.dev/articles/vitals): the performance bar a deployed system has to clear
```

Last reviewed: 8 November 2026.
