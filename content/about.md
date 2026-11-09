---
slug: about
title: About Ivan Weiss van der Pol — AI & Automation Engineer
description: Ivan Weiss van der Pol is a senior AI and automation engineer in Paraguay: agent fleets, MCP integrations, regulated QA and data systems, open to remote.
answer: I am a senior AI and automation engineer based in San Lorenzo, Paraguay, with 6+ years across software development, quality engineering and data engineering. I build production agentic systems — multi-agent fleets, MCP server integrations, LLM cost and quality controls — and previously led end-to-end QA for an FDA-cleared Class II medical-device platform.
keywords: [about Ivan Weiss van der Pol, senior AI engineer Paraguay, automation engineer, agent orchestration, quality engineering, remote US EU LATAM]
date: 2026-11-08
published: 2026-11-08
breadcrumbs: [[Home, ""], [About, "about"]]
body_class: page-about
---

# About Ivan Weiss van der Pol — AI & Automation Engineer
## The short version

I am a senior AI and automation engineer. I build the machinery that makes
large language models useful in production: agent fleets that dispatch work to
specialised workers, MCP servers that expose real capabilities as typed tools,
budget and evaluation controls that keep those fleets honest, and CI gates
that fail the build when a regression lands.

Before I built AI systems professionally, I spent years on the other side of
the same problem — making software *trustworthy*. That was QA work on a
regulated medical-device platform: an FDA-cleared Class II women's
pelvic-health system with a mobile app, a physician web portal and a
Bluetooth-connected device. Learning to build test strategies for regulated
software is what taught me that an agent fleet without evidence is just a
faster way to be wrong.

## What I actually do

| Area | What it means in practice | Stack I use |
|---|---|---|
| Agent orchestration | Fleet design, task routing, specialist consultation, retry and budget policies | Python, LangChain, LangGraph, MCP |
| LLM platform engineering | Provider abstraction, model routing, spend caps, structured outputs, evaluation harnesses | Python, FastAPI, PostgreSQL, Docker |
| AI-assisted QA | Test strategy, automated API suites, AI-assisted test-case generation, regulatory documentation | Postman, MongoDB, TestRail, Selenium, Charles Proxy |
| Data & backend | Pipelines, REST APIs, storage, reporting, offsite backups | SQLAlchemy, Pandas, NumPy, Spark, Delta Lake |
| Delivery | Docker Swarm, CI/CD, secrets hygiene, audit logging | Docker, GitHub Actions, Jenkins, Azure DevOps |
| Data & dashboards | Operational metrics that operators actually read | Power BI, Python tooling |

## How I work

- **Evidence over adjectives.** Every claim on this site carries a number, a
  source and a date. If I cannot show the artefact, I do not claim the
  capability.
- **Boring where boring works.** A scheduled job that logs is better than an
  agent that improvises. I automate the repetitive, and keep judgement where
  judgement is required.
- **Bounded autonomy.** Agents get scoped tools, explicit budgets, full audit
  logs and CI gates — the same discipline regulated software demands.
- **Operable by the people I hand it to.** Client training and technical
  documentation are part of delivery, not an afterthought; a system the client
  cannot run is a liability.

> "Ivan demonstrates a proactive approach to problem-solving, preferring to
> tackle challenges independently while actively incorporating AI tools to
> enhance workflow efficiency. He excels technically and is unafraid to use
> generative AI, which has also helped him learn new techniques."
> — Monika Koykova, Senior QA Lead at MentorMate

> "Ivan has a never-ending amount of energy and desire to learn and improve.
> When he finds a task interesting, he can go above and beyond to deliver. He
> is a techie with a preference for all back-end related things."
> — Hugo Medina, Software Development Engineer at MentorMate

## The path here

- **Founder & CEO, [AI Whisperers](https://ai-whisperers.org/en)** (Nov 2025 – present, remote). Architected
  the technical strategy: agent fleet orchestration, MCP servers, LLM-provider
  abstraction with cost guards, audit logging and CI gates. Built the Hermes
  Agent runtime stack — profiles, skills, plugins, a cron fleet and a kanban
  dispatcher — and shipped client systems in clinical and
  restaurant-operations contexts, plus a public-sector case-management system. Stack: Python, FastAPI, LangChain, LangGraph,
  n8n, Docker Swarm, PostgreSQL, MCP.
- **Technical Lead, municipal project** (Oct 2024 – Nov 2025, remote).
  Architected a case-management system for municipal operations with
  role-based access control, task tracking and automated workflows; delivered
  Power BI dashboards over live case metrics and SharePoint document
  management; ran client training so the client could operate it independently.
  Stack: Power Apps, Power Automate, Power BI, SharePoint, Dataverse, Azure.
- **Quality Specialist II, Flyte project at MentorMate (Tietoevry)** (Aug 2023
  – Oct 2024, Asunción). End-to-end QA for an FDA-cleared Class II platform:
  mobile app, physician web portal and a Bluetooth-connected medical device.
  Built test strategies for regulatory compliance; automated API suites with
  MongoDB-generated test data; introduced AI-assisted test-case generation,
  cutting generation time by 40%; led a JSON → XLSX therapy-data conversion
  initiative. Collaborated across Paraguay, USA and Bulgaria teams. Stack:
  Postman, MongoDB, Charles Proxy, TestRail, Selenium, Python.
- **QA Engineer & Software Developer, WPG.srl** (Oct 2018 – Dec 2022, San
  Lorenzo). Built a Python automation suite for test-data generation, XML
  processing and automated report generation, reducing manual testing effort
  by 60%; reproduced and analysed client-reported defects; defined test cases
  for complex applications; maintained SDLC documentation. Stack: Python,
  Selenium, Java, C, SQL, Git.
- **Founder, 3D-Tech-Py** (2019 – 2022, San Lorenzo). Designed, produced and
  sold 3D-printed supplies, including PPE for medical personnel during the
  COVID-19 quarantine.

## Education and credentials

- **BSc Computer Science**, Facultad Politécnica — Universidad Nacional de
  Asunción (2018–2022), GPA 4.0 / 4.0. Specializations in software
  engineering, machine learning, data security and database systems. Top
  placement at the Paraguay National Programming Competition 2022; ETYC
  Programming Competition 2019.
- **Study Abroad — Computer Science**, Wichita State University, USA
  (Jan–May 2023): advanced software engineering, entrepreneurship, strategic
  marketing, technical communication. BECAL scholarship recipient. Capstone:
  "Botanic Buddy", an AI-powered reforestation rover.
- **Industrial Technical Baccalaureate**, Instituto Paraguayo de
  Telecomunicaciones (Dec 2018), GPA 3.2 / 4.0.
- **Certifications and awards:** ISTQB Certified Tester — Foundation Level
  (2022); NASA Galactic Problem Solver, NASA International Space Apps
  Challenge (2023); Hexawise Test Design Professional (2024); AI For Everyone,
  DeepLearning.AI (2024); BECAL Scholarship for advanced English, Paraguayan
  Government (2021).

## How I work with modern tooling

The tooling I reach for is chosen for evidence, not novelty.

- **Agent orchestration and MCP.** I build and run agent fleets with typed
  tools over Model Context Protocol rather than DOM scraping, because WebMCP
  is a proposed standard precisely so that an agent calls a declared tool
  instead of guessing at markup
  ([WebMCP — Chrome for Developers](https://developer.chrome.com/docs/ai/webmcp/)).
- **Retrieval quality.** The generative-engine research is the reason my
  writing carries statistics, quotations and citations rather than keyword
  repetition: those interventions measurably improved source visibility,
  while keyword stuffing scored worse than the unmodified baseline
  ([GEO: Generative Engine Optimization, arXiv:2311.09735](https://arxiv.org/abs/2311.09735)).
- **Performance as a first-class constraint.** Core Web Vitals thresholds are
  LCP under 2.5 s, INP under 200 ms and CLS under 0.1 at the 75th percentile,
  so a system that slows down under load is a system with a defect, not a
  trade-off ([web.dev — Web Vitals](https://web.dev/articles/vitals)).
- **Accessibility as a machine-legibility layer.** Agents read the
  accessibility tree and the DOM, so semantic structure serves screen-reader
  users and retrieval systems at the same time
  ([web.dev — agent-friendly websites](https://web.dev/articles/ai-agent-site-ux)).
- **Verifiable identity.** One `Person` entity, consistent across the site,
  GitHub and LinkedIn, with the same credentials and the same job title
  everywhere — the schema.org model for a page focused on one person is
  `ProfilePage` with a `Person` main entity
  ([schema.org ProfilePage](https://schema.org/ProfilePage)).

## Where I am, and what I am looking for

San Lorenzo / Asunción, Paraguay, open to remote work with teams in the US,
EU and LATAM. I speak Spanish natively, English fluently and Dutch fluently.

I am looking for a **Senior AI / Automation Engineer** role where agentic
systems, LLM platform engineering, AI-assisted QA and data engineering are all
in scope — ideally with real production load and someone who cares about
evidence. If you are hiring for that, the fastest route is email:
[weissvanderpol.ivan@gmail.com](mailto:weissvanderpol.ivan@gmail.com).

## Why this site is written the way it is

This page is deliberately built as a demonstration rather than a brochure.
Pages like it are what search engines index and what AI answer engines quote,
so the mechanics are documented rather than hidden: the
[AI crawler policy](/ai-crawler-policy/) is published, the
[technical blueprint](/writing/technical-blueprint/) explains the build, and
every page offers a markdown twin for agents that read instead of render
([llmstxt.org v2](https://llmstxt.org/changes.html)). Google's guidance for
generative AI features is that the same fundamentals apply — no special
markup, no special files ([AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)) —
so the fundamentals are simply applied well.

Related: [selected work](/work/), [the CV](/cv/), [writing index](/writing/).

## Sources

The primary sources behind this page, in markdown so they can be quoted or
reused directly:

```markdown
- [Google — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features): last updated 2025-12-10
- [Google — Optimizing your website for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): last updated 2026-07-10 — why a unique, first-hand point of view is what gets retrieved
- [GEO: Generative Engine Optimization (arXiv:2311.09735)](https://arxiv.org/abs/2311.09735): statistics, quotations and citations versus keyword stuffing
- [web.dev — Agent-friendly websites](https://web.dev/articles/ai-agent-site-ux): the accessibility tree as the machine-legibility layer
- [web.dev — Web Vitals](https://web.dev/articles/vitals): LCP 2.5 s, INP 200 ms, CLS 0.1 at the 75th percentile
- [WebMCP — Chrome for Developers](https://developer.chrome.com/docs/ai/webmcp/): origin trial, typed tools with JSON Schemas
- [schema.org — ProfilePage](https://schema.org/ProfilePage): the page type for a page focused on one person
```

Last reviewed: 8 November 2026.
