# Ivan Weiss van der Pol — Canonical Profile Data

Single source of truth for the site copy (CV page, About page, JSON-LD `Person` node,
schema.org `ProfilePage`). Sourced from the private portfolio repo
`IvanWeissVanDerPol/Ivan_Weiss_Portfolio` → `Ivan_Weiss_Van_Der_Pol_CV.md` (last updated March 2026)
and the public GitHub account. Facts below are the ones used for structured data; anything
not listed here must not be asserted in markup.

## Identity

| Field | Value |
|---|---|
| Full name | Ivan Weiss van der Pol |
| Current title | Founder & CEO, AI Whisperers (Nov 2025 – present) |
| Target role | Senior AI/Automation Engineer — Agentic systems, LLM platforms, AI-assisted QA, Data/Automation Engineering |
| Location | San Lorenzo / Asunción, Paraguay — open to remote (US, EU, LATAM) |
| Previously based | Wichita, Kansas, USA (Wichita State University, Jan–May 2023) |
| Languages | Spanish (native, Paraguay), English (fluent, BECAL scholar), Dutch (fluent, heritage) |
| Email | weissvanderpol.ivan@gmail.com |
| Phone | +595 981 324 569 |
| LinkedIn | linkedin.com/in/ivanweissvanderpol |
| GitHub | github.com/IvanWeissVanDerPol |
| Company (AI Whisperers) | ai-whisperers.org/en — canonical; the same site also serves at ai-whisperers.paragu-ai.com/en, which declares the .org URL canonical. GitHub org: github.com/Ai-Whisperers |
| Portfolio (prior) | ivanweissvanderpol.github.io |
| GitHub followers context | 685 LinkedIn followers; 50+ public repositories |

## Positioning statement (used as H1 subhead and as `Person` `jobTitle` context)

Senior AI and automation engineer with 6+ years across software development, quality
engineering and data engineering, now building production agentic systems (Hermes Agent
runtime, multi-agent fleets, LLM orchestration) on top of a QA foundation that includes
FDA-cleared Class II medical-device software and a NASA Galactic Problem Solver award.

The differentiator for a senior hire: Ivan does not only *use* AI tooling, he builds the
orchestration layer — agent fleets, kanban dispatch, MCP integrations, cost guards, CI gates,
observability — and he can prove it with working systems rather than slideware.

## Career (reverse chronological)

### Founder & CEO — AI Whisperers (Nov 2025 – present, Remote)
- Architected the company technical strategy: agent fleet orchestration, MCP servers,
  LLM-provider abstraction with cost guards, audit logging and CI gates.
- Built the Hermes Agent runtime stack (profiles, skills, plugins, cron fleet, kanban
  dispatcher) and shipped multiple client systems: Ometz DMS (clinical, Docker Swarm,
  Postgres + S3 backups), Sazón/Saskia RMS (restaurant ops, Flask/SQLAlchemy), ParaguAI
  platform (Next.js on Cloudflare Pages).
- Established multi-provider support (Claude, Gemini, Copilot, Cursor, Windsurf) and
  an educational AI platform.
- Stack: Python, FastAPI, LangChain, LangGraph, n8n, Docker Swarm, Postgres, MCP.

### Technical Lead — Municipal Project (Oct 2024 – Nov 2025, Remote)
- Architected a case-management system (role-based access control, task tracking,
  automated workflows) for municipal government operations.
- Delivered Power BI dashboards over live case metrics; SharePoint document management.
- Ran client training and technical documentation so the client could operate it independently.
- Stack: Power Apps, Power Automate, Power BI, SharePoint, Dataverse, Azure.

### Quality Specialist II — Flyte Project, MentorMate (Tietoevry) (Aug 2023 – Oct 2024, Asunción)
- End-to-end QA for an FDA-cleared Class II women's pelvic-health platform: mobile app,
  physician web portal, and a Bluetooth-connected medical device.
- Built test strategies for regulatory compliance; automated API suites (Postman) with
  MongoDB-generated test data.
- Introduced AI-assisted test case generation, cutting generation time by 40%.
- Led a JSON → XLSX therapy-data conversion initiative for client data management.
- Collaboration across Paraguay, USA and Bulgaria teams.
- Stack: Postman, MongoDB, Charles Proxy, TestRail, Selenium, Python, FDA compliance.

### QA Engineer & Software Developer — WPG.srl (Oct 2018 – Dec 2022, San Lorenzo)
- Built a Python automation suite for test-data generation, XML processing and automated
  report generation, reducing manual testing effort by 60%.
- Reproduced and analysed client-reported defects; defined test cases for complex
  applications; maintained SDLC documentation.
- Stack: Python, Selenium, Java, C, SQL, Git.

### Founder — 3D-Tech-Py (2019 – 2022, San Lorenzo)
- Built and ran a 3D-printing supply business end to end (design, production, sales).
- Produced and distributed PPE for medical personnel during COVID-19 quarantine.

## Selected engineering projects (evidence for senior-level claims)

| Project | What it proves | Link |
|---|---|---|
| Hermes Agent runtime (AI Whisperers) | Agent orchestration, MCP, skills/plugins, cron fleet, cost control | github.com/IvanWeissVanDerPol/ai-whisperers-hermes-agent |
| ai-whisperers-ops-toolkit | Infra-as-code: 115+ scripts, 79 wrappers, 24 dashboard endpoints | github.com/IvanWeissVanDerPol/ai-whisperers-ops-toolkit |
| opencode-swarm | Architect-centric multi-agent swarm with SME consultation | github.com/IvanWeissVanDerPol/opencode-swarm |
| Ometz DMS | Clinical data platform (Ometz Dental), Docker Swarm deploys, hashed offsite backups | private client repository — not linked publicly |
| satellite-paraguay | Multi-temporal earth observation; 6 thesis papers from one Python package | github.com/IvanWeissVanDerPol/satellite-paraguay |
| telescope-ai | MCP server driving Celestron mounts: tracking, night scheduler, plate solving | github.com/IvanWeissVanDerPol/telescope-ai |
| Skills corpus + AIW monorepo | 200+ published skills, CI gates, secret scanning, scheduled automation | github.com/IvanWeissVanDerPol/ai-whisperers-packages |
| Portfolio (Astro) | Personal site: Astro + TypeScript + SCSS, SEO, dark mode | github.com/IvanWeissVanDerPol/ivanweissvanderpol.github.io |

## Technical skills (ATS-safe keyword set)

- **AI/agents:** LLM orchestration (LangChain, LangGraph), MCP servers, agent fleets,
  prompt/context engineering, retrieval pipelines, evaluation harnesses, model routing,
  cost and budget guards, audit logging, MCP tool design, WebMCP / agentic browsing (new).
- **Languages:** Python, TypeScript, JavaScript, SQL, Bash; Java (legacy QA work).
- **Data & backend:** FastAPI, Flask, SQLAlchemy, Postgres, MongoDB, Redis, Pandas, NumPy,
  PySpark, Spark SQL, Delta Lake, Databricks, REST APIs.
- **QA & automation:** Selenium, Cypress, WebdriverIO, Postman, Charles Proxy, TestRail,
  Cucumber/BDD, Applitools, n8n, Power Automate, CI/CD (Jenkins, GitHub Actions, Azure DevOps).
- **Cloud & platform:** Docker, Docker Swarm, Cloudflare Pages/Workers, Linux VPS, Tailscale,
  GitHub Apps, AWS basics, Azure (Power Platform), Vercel/Next.js hosting.
- **Data viz & BI:** Power BI, custom dashboards, Python data tooling.
- **Practices:** SDLC, Agile/Scrum, JIRA, regulatory documentation, client training.

## Education

- **BSc Computer Science**, Facultad Politécnica — Universidad Nacional de Asunción (2018–2022),
  GPA 4.0/4.0. Specializations: Software Engineering, Machine Learning, Data Security, Database Systems.
  Top placement, Paraguay National Programming Competition 2022; ETYC Programming Competition 2019.
- **Study Abroad — Computer Science**, Wichita State University, USA (Jan–May 2023):
  Advanced Software Engineering, Entrepreneurship, Strategic Marketing, Technical Communication.
  BECAL scholarship recipient. Capstone: "Botanic Buddy", an AI-powered reforestation rover.
- **Industrial Technical Baccalaureate**, Instituto Paraguayo de Telecomunicaciones (Dec 2018), GPA 3.2/4.0.

## Certifications

- ISTQB Certified Tester – Foundation Level (2022)
- NASA Galactic Problem Solver, NASA International Space Apps Challenge (2023)
- Hexawise Test Design Professional (2024)
- AI For Everyone, DeepLearning.AI / Coursera (2024)
- BECAL Scholarship – Advanced English, Paraguayan Government (2021)
- Test Automation University track (Selenium Java & Python, Postman API Testing,
  Jenkins CI, Cucumber BDD, locator strategies, Applitools visual testing,
  AI in test automation, WebdriverIO, Cypress)

## Public recommendations (verbatim, quotable — good E-E-A-T material)

> "Ivan demonstrates a proactive approach to problem-solving, preferring to tackle challenges
> independently while actively incorporating AI tools to enhance workflow efficiency. He excels
> technically and is unafraid to use generative AI, which has also helped me learn new techniques."
> — Monika Koykova, Senior QA Lead at MentorMate

> "I think Ivan is INCREDIBLY smart and talented. He thinks things through, has automation and
> electrical/mechanical skills, and can analyze things well. He is really attentive to details,
> always positive and polite, and has a teamwork mindset."
> — Sarah Johnson, Business Analyst at MentorMate

> "Ivan has a never-ending amount of energy and desire to learn and improve. When he finds a task
> interesting, he can go above and beyond to deliver. He is a techie with a preference for all
> back-end related things."
> — Hugo Medina, Software Development Engineer at MentorMate

## Positioning line used across the site

"Automate the boring, simplify the complex, and make tech feel human."

## Editorial rules for this site (from the profile)

- Claim roles, dates and technologies exactly as listed above; no inflated titles.
- Do not publish client names or clinical data beyond what is already public in public repos.
- Quantified outcomes come from the CV (40% test-case-generation reduction, 60% manual-testing
  reduction, 4.0/4.0 GPA) — reuse those numbers, do not invent new ones.
- Photos, testimonials and case studies must be attributed to a named source and dated.
