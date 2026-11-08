---
title: Senior AI Engineer Job Hunt & CV Strategy (2026)
description: Evidence-based ATS, keyword, portfolio, negotiation and AI-search playbook for senior AI/ML and agentic engineering job hunts, with templates and checklists.
slug: writing/job-hunt-and-cv
answer: A senior AI/ML job hunt is won on three fronts at once — a machine-parseable résumé that matches the posting's exact keywords, a public evidence trail (code, case studies, metrics) that survives scrutiny, and a presence that AI assistants and recruiters can actually find. 97.4% of Fortune 500 employers run an ATS; 76.4% of recruiters search those systems by skills from the job description. Meanwhile 49% of US adults now use AI chatbots and 84% of AI citations come from third-party sources — so discovery increasingly happens through retrieved evidence, not through your résumé alone. This guide covers all three, with templates.
date: 2026-11-08
published: 2026-11-08
is_article: true
og_type: article
keywords: [ATS resume parsing, applicant tracking system, boolean search, recruiter outreach, salary negotiation, AI engineer interview, portfolio, GitHub, GEO, AEO, AI search visibility, RAG, evals, agentic AI, MLOps]
breadcrumbs: [[Writing, /writing/], [Senior AI Engineer job hunt and CV strategy, /writing/job-hunt-and-cv/]]
---

# The Senior AI/ML Engineer's Job Hunt and CV Strategy (2026)

A senior candidate does not have a résumé problem. A senior candidate has a *retrieval* problem: the evidence exists, but it is spread across a PDF, a GitHub account, a chat history and three old job descriptions, and none of the systems that decide who gets interviewed — an applicant tracking system, a Boolean search, a hiring manager's six-minute skim, an AI assistant assembling a shortlist — can find it.

This guide is the operating manual for fixing that, in the order the systems actually encounter you.

## What the shortlist of numbers says about the 2026 market

Before tactics, the constraints. Five numbers change the strategy materially.

| Signal | Figure | Why it changes your approach |
|---|---|---|
| ATS adoption | 97.4% of Fortune 500 companies run a detectable ATS (487 of 500) in 2026 | Résumé formatting is not optional polish; it is the intake mechanism ([Jobscan 2026 ATS Usage Report](https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems)) |
| Recruiter search behaviour | 76.4% of recruiters search and rank candidates by skills taken from the job description | The posting is literally your search-query specification ([Jobscan 2026 ATS Usage Report](https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems)) |
| AI skill demand | AI skills appear in 2.5% of all US job postings, up 55% in one year, 72% since 2022 and 297% in a decade | AI is not a niche filter; it is a mainstream skill axis ([Stanford AI Index 2026 / Lightcast](https://lightcast.io/resources/research/stanford-ai-index-2026)) |
| Agentic shift | The "Agentic AI" skill cluster went from 0.06% of postings in 2024 to 0.23% in 2025 — roughly 90,000 US postings, a 280% increase | The keyword that will differentiate you in 2026 is orchestration, not chat ([Stanford AI Index 2026, Chapter 4](https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_4_economy.pdf)) |
| Chatbot-mediated discovery | 49% of US adults have used AI chatbots (up from 33% in 2024); 42% use them to search for information | A meaningful slice of candidate research now happens through assistants that synthesise and cite ([Pew Research Center, Americans and AI 2026](https://www.pewresearch.org/internet/2026/06/17/americans-and-ai-2026-chatbots-smart-devices-and-views-on-impact/)) |

Two structural facts deserve emphasis because they are frequently misread.

**First: the ATS is a search engine, not a rejection machine.** The popular claim that "75% of résumés are auto-rejected by ATS" has no published methodology behind it. What the evidence actually shows is *filter-and-rank*: Harvard Business School found that more than 90% of employers use their recruiting management systems to initially filter or rank candidates — 94% for middle-skills roles and 92% for high-skills roles — with the remaining applicants ranked on attributes such as credentials, minimum experience and the presence of key words on the résumé ([Hidden Workers: Untapped Talent, HBS/Accenture](https://www.hbs.edu/ris/Publication%20Files/hiddenworkers09032021_Fuller_white_paper_33a2047f-41dd-47b1-9a8d-bd08cf3bfa94.pdf)). Jobscan's 2026 technical guide makes the same point in plain language: an ATS "rarely rejects a candidate automatically. Instead, it acts as a search engine for recruiters to filter and rank applicants based on specific keywords and 'knockout' requirements" ([Jobscan — What is an ATS?](https://www.jobscan.co/blog/8-things-you-need-to-know-about-applicant-tracking-systems/)). Greenhouse goes further: it does not score résumés at all, because "everyone's resume is wildly different in what they write and how they write it," per co-founder and CEO Daniel Chait ([Greenhouse ATS guide via Jobscan](https://www.jobscan.co/blog/greenhouse-ats-what-job-seekers-need-to-know/)).

The practical consequence is not "make the ATS love you." It is: **be findable by the query the recruiter is running.** A perfect résumé that never matches the query is invisible; a mediocre résumé that matches it is shortlisted.

**Second: the filters are literal, and they are hard.** HBS documented the specific criteria employers configure: 48% of employers filtered middle-skills candidates on employment gaps of more than six months, and many use "a failure to meet certain criteria (such as a gap in full-time employment) as a basis for excluding a candidate from consideration irrespective of their other qualifications" ([Hidden Workers](https://www.hbs.edu/ris/Publication%20Files/hiddenworkers09032021_Fuller_white_paper_33a2047f-41dd-47b1-9a8d-bd08cf3bfa94.pdf)). HBS estimated more than 27 million US "hidden workers" were screened out this way, of whom only 20% ever became a "candidate" and around 7% received a full-time offer ([Hidden Workers](https://www.hbs.edu/ris/Publication%20Files/hiddenworkers09032021_Fuller_white_paper_33a2047f-41dd-47b1-9a8d-bd08cf3bfa94.pdf)). If your CV has a gap, contract, freelance stretch or self-built company in it, **you must address it in the document** — the filter will not infer that it was continuous work.

## How an ATS actually reads your résumé

This section is the mechanics. Everything else is downstream of it.

### What parsing means mechanically

An ATS does not "read" your résumé the way a human does. It runs a pipeline: text extraction (optical character recognition when a PDF has no reliable text layer), tokenisation, then named-entity recognition that labels tokens as organizations, date ranges, titles, skills and contacts, before writing them into indexed database fields ([Jobscan — What is an ATS?](https://www.jobscan.co/blog/8-things-you-need-to-know-about-applicant-tracking-systems/)). The fields are then searched through an inverted index — the same structure as a book's back-of-book index — rather than by re-reading files on each query ([Jobscan — What is an ATS?](https://www.jobscan.co/blog/8-things-you-need-to-know-about-applicant-tracking-systems/)).

Two consequences follow directly:

1. **Content becomes fields, not a page.** If a date range is not recognised as a date range, it is not searchable as one. If a skill is inside a graphic, it does not exist.
2. **Search is literal.** The index contains the tokens that survived extraction. A synonym that never appears in your document is invisible to a keyword query — which is why mirroring the posting's exact phrasing beats being "more accurate."

### Which file format should you send?

The formats that major platforms accept are documented, and the answer is "the one the portal asks for, with a text-based file as the default."

| Platform | Accepted formats | Practical guidance |
|---|---|---|
| Greenhouse | `.doc`, `.docx`, `.pdf`, `.rtf`, `.txt`, uploads up to 100 MB | Format is rarely the failure point; structure is ([Greenhouse Support](https://support.greenhouse.io/hc/en-us/articles/360052218132-Supported-formats-for-resumes-cover-letters-and-other-candidate-uploads)) |
| Lever | Microsoft Word (including `.docx`), Adobe PDF, RTF, Corel WordPerfect, HTML, MS Office HTML, Open Office (ODF) | Accepts broadly; images and "fancy stuff" are what it cannot parse ([Lever — Understanding Resume Parsing](https://help.lever.co/s/article/Understanding-Resume-Parsing), [Jobscan Lever guide](https://www.jobscan.co/blog/lever-ats)) |
| General ATS behaviour | "All ATS recognize Word documents. Most of them can also read PDF files" | A text-based PDF is the safe default; a Word file is safe where the portal is Word-centric ([Jobscan — What is an ATS?](https://www.jobscan.co/blog/8-things-you-need-to-know-about-applicant-tracking-systems/)) |

Decision rule:

- **Portal explicitly requests Word** → send `.docx`, exported from Word or Google Docs, single column, standard heading styles.
- **Portal is neutral** → send a text-based PDF (selectable text, not a scan). Never send a flattened image PDF.
- **Portal requests plain text** → send `.txt` with `Job Title`, `MM/YYYY` date formats and one skill per line. Greenhouse accepts `.txt` directly ([Greenhouse Support](https://support.greenhouse.io/hc/en-us/articles/360052218132-Supported-formats-for-resumes-cover-letters-and-other-candidate-uploads)).
- **Never** send a PDF that is a scan, or a document exported through a design tool that flattens text layers (see next section).

### Why tables, columns and graphics break parsing

A table is a two-dimensional grid; a parser reading a linear text stream will slice across it horizontally rather than reading cell A before cell B. The result is "text-layer scrambling": the content appears out of order or missing when the document is converted to text, so the ATS sees word salad where the human sees a clean grid ([Jobscan — Why ATS tables and columns ruin your resume](https://www.jobscan.co/blog/resume-tables-columns-ats/)). The same failure hits design-tool PDFs, whose visual layout does not match their underlying data structure, so the text layer is read in code order rather than screen order — and recruiters' systems end up extracting the work-experience section while silently ignoring skills, the summary and contact links ([Jobscan — Tables and columns](https://www.jobscan.co/blog/resume-tables-columns-ats/)).

Graphics fail differently and just as totally: content baked into an image is not text, so OCR is invoked (or skipped) and the result is unreliable or absent.

**The fix is structural, and it is cheap:**

- Single column, top to bottom. No sidebars, no two-column "skills rail".
- Real text, never text inside shapes or images.
- Standard section headings in the body: `Experience`, `Education`, `Skills`, `Projects`, `Certifications`. Parsers key off structure, not styling.
- Skills as a comma-separated list or a vertical-bar list, not a two-column table ([Jobscan — Tables and columns](https://www.jobscan.co/blog/resume-tables-columns-ats/)).
- Contact details as plain text in the document body — not as icons with labels.
- No header/footer content that duplicates or displaces body content; do not repeat your name on page two.

This is not just a machine constraint. It is also what the human skim rewards: Ladders' eye-tracking study found recruiters averaged only **7.4 seconds** on an initial résumé screen, spending that time scanning the left side for titles, and that the best-performing résumés shared "clear, simple layouts with clearly marked section and title headers" and an F- or E-pattern reading flow; the worst-performing ones were cluttered, multi-column, and showed evidence of keyword stuffing ([The Ladders Eye-Tracking Study, 2018](https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf)). One machine-friendly layout optimises both readers at once.

### Does a multi-page résumé hurt?

For a senior candidate, no. Ladders found that an engaged recruiter spends as much time on the second page as the first, but that time is strongly predicted by how compelling the first page is ([The Ladders Eye-Tracking Study](https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf)). So the rule is: two pages maximum for a senior résumé, with the first page carrying the role, the summary, the core stack and the two or three most relevant roles.

### ATS self-test checklist

Run through this before every application. Any "no" is a defect to fix.

- [ ] I can select and copy all the text in the file; nothing is an image.
- [ ] The layout is one column; no tables, no text boxes, no graphics.
- [ ] Standard headings: `Summary`, `Experience`, `Skills`, `Projects`, `Education`, `Certifications`.
- [ ] Every role has `MM/YYYY – MM/YYYY` dates.
- [ ] Contact details (name, email, phone, city/country, LinkedIn, GitHub, site) are plain text in the body.
- [ ] The file is under ~2 MB and has no embedded photo.
- [ ] My name and current title appear in the first two lines of the extracted text.
- [ ] I have opened the file and confirmed the text order matches the visual order (paste into a plain-text editor and read it linearly).

## How recruiters actually search for you

Your résumé is only useful if the query matches. There are three distinct search surfaces and they behave differently.

### 1. ATS keyword search

The recruiter defines the requisition, the system indexes résumés, and the recruiter queries the index. Jobscan reports that 76.4% of surveyed recruiters search and rank candidates by skills from the job description, then by education, title match, licences and certifications, and years of experience ([Jobscan 2026 ATS Usage Report](https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/)). Example from their research: filling a visual-designer role, "we could search for resumes that only include the skill 'brand identity.' That would immediately narrow the candidate pool down" ([Jobscan 2026 ATS Usage Report](https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/)).

Implication: the posting's own nouns are the query. A posting that says "retrieval-augmented generation" is searching for that string. Write "retrieval-augmented generation (RAG)" on first use and "RAG" thereafter — never only one of the two.

### 2. Boolean search on sourcing platforms

Boolean syntax differs per platform and the differences are load-bearing.

**LinkedIn Recruiter** (official help): `AND`, `OR`, `NOT` in capitals, plus parentheses, e.g. `account AND finance NOT (manager OR executive)`. The `+` and `-` operators are **not** officially supported — use `AND` and `NOT` instead. The filter dropdowns map to the same logic ("Must have" = AND, "Can have" = OR, "Doesn't have" = NOT). Keywords entered in the Keywords field are highlighted on the candidate's profile card and in the Summary, Experience and Skills sections — meaning a term placed in your headline, summary or experience bullets is easier for a recruiter to spot than one buried in a skills list. Stop words are ignored in the Keywords field: `and, or, the, of, at, by, to, for, with, in, they, have, from, not, but` — and a search containing a stop word returns profiles that lack the full phrase ([LinkedIn Recruiter Help — Boolean](https://www.linkedin.com/help/recruiter/answer/a415295)).

**LinkedIn Skills matching** is a separate, richer layer. Recruiter's Skills Match uses explicit skills (the Skills section), implicit skills extracted from the summary, position description, title and headline, and requires the applicant and the job to be in the same country except in the EEA. The skill facet search recognises skill-associated keywords and matches synonyms — searching "SaaS" also returns members who wrote "Software as a service" ([LinkedIn Recruiter Help — Skills filter](https://www.linkedin.com/help/recruiter/answer/a593591)). The practical read: **write skills in the vocabulary a recruiter would type, and also write the expansion.**

**Indeed** (official employer guide): `AND`, `OR`, `NOT`, parentheses and quotation marks, e.g. `"payroll specialist" AND payroll AND Excel NOT intern` ([Indeed Employer Guide — Boolean Search](https://www.indeed.com/hire/c/info/what-is-boolean-search)). The guide's advice is to keep title variants in an `OR` group and exclusions minimal, so the query stays legible to the human writing it.

**Boolean strings to memorise** (adapt the terms; keep the shape):

```text
("AI Engineer" OR "LLM Engineer" OR "Machine Learning Engineer" OR "Applied AI Engineer")
AND ("RAG" OR "retrieval-augmented generation")
AND (LangGraph OR LangChain OR "agent orchestration")
AND (Python)
NOT ("intern" OR "junior")
```

The final `NOT` clause is recruiter hygiene, but it is also a warning: if your résumé contains "Intern" or "Junior" anywhere in the last two years, you are excluded from some queries. Decide deliberately whether to keep that line.

### 3. AI-assisted candidate search

This is new and it changes your surface area. LinkedIn's Recruiter product now offers "Start a Recruiter search with filters" or "Start a new AI search," where the recruiter describes the ideal candidate in plain text ([LinkedIn Recruiter Help — Standard search](https://www.linkedin.com/help/recruiter/answer/a413329)). LinkedIn's September 2026 announcement of Hiring Assistant 2 describes an agent that brings together verification status, ATS insights, pre-screening responses and relevant work experience as "richer, more trusted signals" for shortlisting, and reports that demand for forward-deployed experts grew 226% over the prior year, AI forensic analyst roles 169% and AI safety roles 91% — while 64% of US talent-acquisition professionals say it is becoming harder to know who to trust and what is real when assessing candidates ([LinkedIn — Hiring Assistant 2](https://news.linkedin.com/2026/hiring-assistant-2)).

Two operational implications: your LinkedIn profile is now a *retrieval corpus* for a model, and unverifiable claims are worth less than verifiable ones. A repository, a published write-up, a dated metric with a source — those are the signals an agent can check.

## Tailoring a résumé per posting

Tailoring is not "add more keywords." It is deciding, per application, which of your experience is *the* answer to this employer's problem — and putting that first.

The mechanics are well documented and mostly boring, which is the point. Jobscan's keyword guidance is direct: find the terms in the posting (job titles, hard skills, certifications, tools mentioned repeatedly), mirror the exact phrasing because "the ATS doesn't always recognize synonyms," use them naturally in the summary, skills section and experience bullets without keyword stuffing, combine with action verbs, and tailor for every job because "a one-size-fits-all resume is less likely to be found or read" ([Jobscan — Top 500+ Resume Keywords](https://www.jobscan.co/blog/top-resume-keywords-boost-resume)). Jobscan's ATS résumé guide makes a similar point with a warning about excess: a rich bullet point combines measurable accomplishments, an action verb, and keywords rather than describing responsibilities, and the guide recommends keeping the skills list tight and mirroring the posting's own terms ([Jobscan — How to write an ATS resume](https://www.jobscan.co/blog/ats-resume/)). Indeed's employer-side guide adds the mechanics a candidate must anticipate: recruiters search candidate databases with `AND`, `OR` and `NOT`, and a query built around skills will return only the profiles that carry those exact terms ([Indeed Employer Guide — Boolean Search](https://www.indeed.com/hire/c/info/what-is-boolean-search)).

### The 20-minute tailoring routine

For every serious application, in this order:

1. **Extract the query (5 min).** Copy the posting into a scratch file. Pull out: the title, every hard skill, every named tool, every certification, every domain noun ("HIPAA", "SOC 2", "unit economics", "FDA"), the seniority cues, and the three verbs ("design", "operate", "scale").
2. **Decide the thesis (3 min).** Write one sentence: "This posting is really asking for someone who can do X." Everything else is subordinate.
3. **Reorder (5 min).** Move the two roles that prove X to the top of Experience. Rewrite their first two bullets to lead with X.
4. **Swap the skills block (3 min).** Replace the five-skill list with the posting's five highest-signal terms plus your differentiators. Keep both the acronym and the expansion on first use.
5. **Mirror the vocabulary (2 min).** Search your draft for every term the posting uses; if it is absent, insert it where it is true. Never insert a term you cannot defend in an interview.
6. **Close (2 min).** Add the matching case study link from your portfolio in the relevant experience bullet.

### Why tailoring is not optional

The evidence for tailoring is directional rather than a precise multiplier: recruiters report preferring tailored résumés and cover letters, and the widely-cited figure from career-services research is that tailored applications materially raise interview rates. The mechanism, however, is well established and does not depend on the exact multiplier: a tailored document raises keyword overlap with the query that the ATS is running and with the criteria the recruiter is scanning for. That is the same mechanism as the 76.4% keyword-search statistic, and it is enough. Beware, at the same time, of the same failure mode Ladders documented in human skimming: evidence of keyword stuffing was among the markers of the *worst*-performing résumés ([The Ladders Eye-Tracking Study](https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf)). Keywords in context beat keywords in bulk.

## The senior AI/ML résumé: structure and template

### The outline

```text
IVAN WEISS VAN DER POL
Senior AI & Automation Engineer  |  San Lorenzo, Paraguay (open to remote: US / EU / LATAM)
weissvanderpol.ivan@gmail.com  |  +595 981 324 569  |  linkedin.com/in/ivanweissvanderpol
github.com/IvanWeissVanDerPol  |  ivanweissvanderpol.github.io

SUMMARY                              (3 lines, role-specific, quantified)
One-line positioning that names the domain, the scale and the differentiator.
Example shape: "Senior AI/automation engineer with 6+ years across software, quality
engineering and data engineering, now building production agentic systems — agent
fleets, MCP integrations, LLM cost controls and CI gates — on a foundation that
includes FDA-cleared Class II medical-device software."

SKILLS                              (grouped, 4-6 groups, 3-6 terms each, comma-separated)
AI & agents: LLM orchestration (LangChain, LangGraph), MCP servers, agent fleets,
prompt/context engineering, retrieval pipelines, evaluation harnesses, model routing,
cost and budget guards, audit logging
Languages: Python, TypeScript, JavaScript, SQL, Bash
Data & backend: FastAPI, Flask, SQLAlchemy, Postgres, MongoDB, Redis, Pandas, NumPy
Cloud & platform: Docker, Docker Swarm, Cloudflare Pages/Workers, Linux VPS, AWS
QA & automation: Selenium, Cypress, Postman, TestRail, CI/CD (GitHub Actions, Jenkins)

EXPERIENCE
Role | Company | Location | MM/YYYY – Present                     (reverse chronological)
  - Outcome-first bullet: [action verb] + [what you built] + [metric or scale].
  - Second bullet: the hard technical detail that proves the first.
  - Third bullet: scope/people/context (team size, regulated environment, budget).
  - Optional fourth: link to the public repo or case study.

  (For each earlier role, 3-4 bullets. One line of context: what the company does
  and why the work mattered.)

PROJECTS                             (3-5 entries, each one line + a link)
Name — what it proves — link.

EDUCATION
Degree, Institution, year. GPA if strong. One line of relevant specialisations.

CERTIFICATIONS
One per line. Only those relevant to the target role.
```

### The bullet formula

```text
[Strong verb] + [concrete artefact or system] + [scope or outcome] + [evidence]
```

Worked example, using only verifiable facts:

```text
Built an AI-assisted test-case generation pipeline for an FDA-cleared Class II
medical-device platform, cutting generation time by 40% across mobile, portal and
Bluetooth-device test suites.
```

Compare with the failure mode:

```text
Responsible for testing of mobile and web applications, including writing test cases
and reporting defects.
```

The second version is a job description; the first is evidence. Recruiters skim
for seven seconds ([Ladders](https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf)) — the number is the reason every bullet must carry a verb and a magnitude.

### Senior-specific rules

- **Show scope, not just tasks.** "Migrated a monolith to 12 services" beats "worked on microservices." "Ran a 3-person team" beats "collaborated."
- **Name the regulated or high-stakes context.** FDA-cleared medical devices, PCI, SOC 2, safety-critical systems — this is a differentiator that generic portfolios never mention, and it is exactly the kind of phrase a Boolean query on domain nouns will catch.
- **Show operating ownership.** "Owned" beats "contributed to": incident response, on-call, cost budgets, release gates.
- **Make the stack legible.** Recruiters keyword-search on tool names. Python, AWS, Docker, Postgres, LangGraph, MCP, CI/CD — name them, because a human reading your bullet will not translate "our container orchestration platform."
- **One URL per claim that matters.** A GitHub repo, a case study, a live dashboard. A link in the relevant bullet, not a dump at the bottom.
- **Do not inflate titles.** Use the real title; put the scope in the bullets. A search for "Senior AI Engineer" that finds "Founder & CEO, AI Whisperers" is still a match on the skills section — but an inflated title is the first thing a hiring manager checks and the fastest way to lose them.
- **Address gaps explicitly.** Contract work, freelance, a self-built company, a caregiving year: put a one-line context next to it. HBS shows the default is exclusion, not inference ([Hidden Workers](https://www.hbs.edu/ris/Publication%20Files/hiddenworkers09032021_Fuller_white_paper_33a2047f-41dd-47b1-9a8d-bd08cf3bfa94.pdf)).

### Résumé quality checklist

- [ ] Fits in two pages at 11pt with sane margins.
- [ ] One column; no tables, graphics, text boxes, photo, icons.
- [ ] Standard section headings; heading hierarchy is visually obvious.
- [ ] Every bullet has a verb and, where truthful, a number.
- [ ] The first five lines state role, domain, scale and differentiator.
- [ ] The skills block matches the target posting's top five hard skills.
- [ ] Both acronym and expansion appear for every core term (RAG / retrieval-augmented generation; MCP / Model Context Protocol).
- [ ] Every role has MM/YYYY dates with no unexplained gaps.
- [ ] At least two links to public evidence.
- [ ] Read aloud in 60 seconds: it should sound like you, not like a job description.
- [ ] Text-paste test passes (paste into a plain editor; order is correct).

## The project case-study: outline and template

A case study is the highest-leverage artefact in a senior AI/ML search. It is the only document that can prove operational competence, because it can show the failure modes, the numbers and the trade-offs. It is also what an AI assistant can quote, which makes it an SEO/AEO asset (see the AEO section below).

### The outline

```text
1. ONE-PARAGRAPH SUMMARY          (80-120 words; answer-first)
   What the system is, who used it, the scale, the outcome, one number.
   Written so it can be quoted verbatim without the surrounding context.

2. CONTEXT AND CONSTRAINTS
   Business problem, who had the pain, what was already tried.
   Hard constraints: latency, cost, data residency, compliance, team size, deadline.
   Explicit non-goals.

3. ARCHITECTURE
   Components and data flow. Mermaid or an ASCII diagram.
   Explicit choices: model(s), orchestration pattern, retrieval design, tools, state.
   What you rejected and why (this is the part interviewers probe).

4. THE HARD PARTS
   3-5 numbered subsections, each: the problem, the options, the decision, the evidence.
   Typical hard parts for senior AI engineering:
   - Retrieval quality (chunking, hybrid search, reranking, freshness)
   - Tool use and agent reliability (retry, idempotency, approval gates)
   - Evaluation (how you know it works; offline vs online; golden sets)
   - Cost and latency (tokens per task, caching, routing, batching)
   - Safety and access (permissions, prompt injection, auditability)
   - Operations (observability, replay, cost guards, CI gates)

5. RESULTS
   Metrics table with definition + how measured + date + baseline.
   Metrics that matter for senior candidates:
   latency (p50/p95), cost per task, success/task-completion rate, accuracy or
   pass@k, hallucination/defect rate, human hours saved, deflection rate,
   error rate, time-to-detect, cost guard trigger rate.

6. WHAT I WOULD DO DIFFERENTLY
   Honest limitations + the next increment. This section is a differentiator,
   because it demonstrates judgement rather than execution.

7. ARTIFACTS
   Repository, architecture doc, demo, dashboard, incident write-up, eval harness.
   Each with a one-line description of what a reviewer should look at.

8. DATE AND SCOPE NOTE
   "As of <date>. <what changed since>."
```

### Case-study quality checklist

- [ ] Section 1 works when quoted alone, out of context.
- [ ] At least one diagram and at least one metrics table.
- [ ] Every metric states its unit, measurement method and date.
- [ ] At least one metric includes a baseline or before/after comparison.
- [ ] At least one documented failure, with cause and fix.
- [ ] Section 6 is honest — no "everything went perfectly."
- [ ] Artifacts are reachable without a login, or you say explicitly that they are not.
- [ ] No client names or clinical data that the client has not cleared.
- [ ] Written to be quoted: short declarative sentences, named entities, no pronouns across section boundaries.

## The application tracker: fields and template

Most candidates track applications as a list of company names. That is not enough: you need to know which document version you sent, what the posting said, and what happens next, because the follow-up is where the job is actually won.

### The fields

| Field | Type | Why it exists | Example |
|---|---|---|---|
| `date_saved` | date | Age of the opportunity; refresh or drop | 2026-11-02 |
| `company` | text | | AI Whisperers |
| `role` | text | Exact posting title, for keyword recall | Applied AI Engineer (Agentic Systems) |
| `url` | URL | Source of truth for the posting | `jobs.example.com/1234` |
| `jd_snapshot` | text or file path | The posting as it was on `date_saved`; postings change | `saved/2026-11-02-ai-engineer.md` |
| `location_work_mode` | enum | Eligibility filter, applied before anything else | Remote (US/EU/LATAM) |
| `comp_range_posted` | text | Anchor for negotiation later | $180k–$230k + equity |
| `fit_score` | 1–5 | Your own ranking; drives where effort goes | 4 |
| `thesis` | text | One sentence: what this employer is really asking | "Wants someone to own agent reliability in prod" |
| `keywords_matched` | text | The posting's hard skills, ticked off | RAG, LangGraph, evals, Python, AWS |
| `keywords_missing` | text | Gaps you either close or address in the cover note | Kubernetes, SOC 2 |
| `resume_version` | filename | Which file went out — critical when tailoring | `cv-agentic-2026-11-02.pdf` |
| `cover_note` | filename or text | The thing you actually wrote to them | `notes/aiw.md` |
| `case_studies_sent` | text | Which evidence you attached or linked | hermes-agent, ops-toolkit |
| `source` | enum | Where you found it, so you can double down | Referral / LinkedIn / Direct |
| `referral` | text | Name and relationship — the highest-yield channel | "M. Koykova (former manager)" |
| `date_applied` | date | | 2026-11-03 |
| `stage` | enum | The only field you update | Saved / Applied / Screen / Recruiter / HM / Onsite / Take-home / Offer / Closed |
| `last_action` | date | Triggers the follow-up; the single most-neglected field | 2026-11-06 |
| `next_action` | text | The one thing that must happen next | "Send follow-up if no reply by 11-12" |
| `next_action_date` | date | | 2026-11-12 |
| `contacts` | text | Who, role, email, LinkedIn | "L. Recruiter — Talent Lead" |
| `interview_notes` | text | What was asked, what you said, what to fix | Free-form, dated |
| `signal` | enum | Evidence quality of this process | Strong / Medium / Weak |
| `outcome` | enum | | Offer accepted / Offer declined / Rejected / Withdrawn |
| `lessons` | text | What to change in the CV or pitch | "Lead with evals, not RAG" |

### The CSV header (paste straight into a sheet)

```csv
date_saved,company,role,url,jd_snapshot,location_work_mode,comp_range_posted,fit_score,thesis,keywords_matched,keywords_missing,resume_version,cover_note,case_studies_sent,source,referral,date_applied,stage,last_action,next_action,next_action_date,contacts,interview_notes,signal,outcome,lessons
```

### Tracker operating rules

- **One row per application.** Not per company. A company with three roles is three rows with three documents.
- **`next_action_date` is the only one that matters.** If that column is empty for a row, the application is dead. Set it the day you apply.
- **Snapshot the posting.** Postings are edited after applications spike; a saved copy is your evidence of what you answered and your defence if the role changes.
- **Track the résumé version.** If you send three different documents for three roles and get no callbacks, you cannot tell whether the problem was the documents or the market.
- **Review weekly, not daily.** Pick a fixed day, mark every row whose `next_action_date` has passed, and do those actions. ZipRecruiter's data suggests a realistic operating cadence: new hires submitted a median of 16 applications, completed 5 interviews and received 2 offers over a median 5-week search ([ZipRecruiter New Hire Survey 2026 Q2](https://www.ziprecruiter-research.org/economic-insights-research/new-hire-survey-2026-q2)) — roughly 3–4 applications per week, not 20 per day.

## LinkedIn, job boards and recruiter outreach

### LinkedIn is now a search corpus, not a CV

LinkedIn remains the primary professional index, and the 2026 data shows employers leaning on skills over degrees and titles: its Skills on the Rise 2026 report states that "employers are increasingly prioritizing skills over degrees, job titles or linear career paths," and that one in five professionals globally say not having the right skills is making the job search more challenging; the fastest-growing technical AI skills it names include prompt engineering and large language models ([LinkedIn — Skills on the Rise 2026](https://news.linkedin.com/2026/Skills-on-the-rise-2026)). Separately, AI engineer topped LinkedIn's Jobs on the Rise 2026 list of the 25 fastest-growing US jobs, a ranking based on three years of hiring data ([LinkedIn News — America's 25 fastest-growing jobs](https://www.linkedin.com/news/story/these-are-americas-25-fastest-growing-jobs-6851116)).

Practical profile rules, derived from how Recruiter searches rather than from taste:

- **Headline = a query, not a slogan.** "Senior AI & Automation Engineer | Agent Orchestration, LLM Platforms, MCP | RAG + Evals + Cost Controls" is searchable. "Building the future of AI" is not.
- **Fill the Skills section with the posting vocabulary.** Explicit skills are what the Skills Match filter reads first ([LinkedIn Recruiter Help — Skills filter](https://www.linkedin.com/help/recruiter/answer/a593591)).
- **Repeat the critical terms in the About section and in the newest role.** Recruiter highlights keywords across the profile card, Summary, Experience and Skills ([LinkedIn Recruiter Help — Boolean](https://www.linkedin.com/help/recruiter/answer/a415295)), and implicit skills are extracted from the summary, position description, title and headline ([LinkedIn Recruiter Help — Skills filter](https://www.linkedin.com/help/recruiter/answer/a593591)).
- **Write both the acronym and the expansion** — "RAG (retrieval-augmented generation)" — so the synonym-aware matcher finds you either way.
- **Attach proof**: a linked case study, a pinned repo, a conference talk. With 64% of US talent-acquisition professionals saying it is harder to know what is real ([LinkedIn — Hiring Assistant 2](https://news.linkedin.com/2026/hiring-assistant-2)), proof is the differentiator.

### Job boards: treat them as a funnel, not a slot machine

Board mechanics differ enough that you should not spray applications. A practical split:

| Channel | Use it for | How to win there |
|---|---|---|
| Company site / ATS portal | Roles you genuinely want | Tailored document; the ATS query is the posting |
| LinkedIn | Roles plus passive discovery | Optimised profile; targeted alerts on the exact title stack |
| Indeed / aggregators | Volume and long-tail roles | Fast, lightly tailored; boolean filters on comp and location |
| Referrals / warm | Anything you actually want | Ask for an intro, don't ask for a referral blind |
| Niche (HN, Dev.to, Discord, meetups, niche boards) | Senior and specialised roles | Contribute publicly; the signal precedes the application |

### Recruiter outreach, done properly

Outreach works when it is specific, verifiable and short. The constraint is that recruiters are judged on response rates: LinkedIn's Recruiter InMail Policy sets a **13% response-rate threshold** over each 14-day period, with a warning below it and a possible InMail Improvement Period on repeated breach; a response counts as an InMail reply, accepting the InMail invitation, or replying "Not Interested" ([LinkedIn Recruiter Help — InMail Policy](https://www.linkedin.com/help/recruiter/answer/a413279)). The practical implication for you: **recruiters are optimising for replies, so a message that is easy to answer beats a message that is impressive.** They are also volume-limited by platform rules — up to 1,000 InMails per day per seat, 150 monthly credits per seat (Recruiter Lite: 30), 200 in the first week, and 350 Open Profile messages per calendar month per seat ([LinkedIn Recruiter Help — InMail sending limits](https://www.linkedin.com/help/recruiter/answer/a745199)).

The outreach message template:

```text
Subject: [Role] — [the one thing that makes me relevant]

Hi [Name],

I saw you are hiring for [Role] at [Company]. The part that matches my work is [specific
requirement quoted from the posting] — [one sentence of evidence with a number].

Two things you can check in five minutes: [link to case study] and [link to repo].
[Optional: one line on why this company — a specific product, customer or problem.]

Happy to send a one-page write-up or talk for 20 minutes. Remote in [time zone],
available [notice period].

— [Name] · [LinkedIn] · [site]
```

Rules that make it work:

1. **Quote one line of their posting.** It proves you read it and gives them an easy yes/no.
2. **One number, one link.** The link must be public and must load fast.
3. **State location and notice period.** These are the two disqualifiers recruiters screen for automatically.
4. **Ask for a small thing.** "20 minutes" converts; "a conversation about opportunities" does not.
5. **Never send the same message twice.** Platform policy forbids untargeted mass messaging, and both LinkedIn and Indeed's guidance emphasise query specificity ([LinkedIn Recruiter Help — InMail Policy](https://www.linkedin.com/help/recruiter/answer/a413279), [Indeed Employer Guide](https://www.indeed.com/hire/c/info/what-is-boolean-search)).
6. **Follow up once, with new information.** "Adding a number" is a follow-up. "Just bumping" is not.

## Salary negotiation

Negotiation is where disciplined preparation pays out most reliably. The base rates:

- ZipRecruiter's Q4 2025 new-hire survey found only 30.4% of new hires negotiated their offer, but among those who did, **90.2% received some additional benefit** and 69% got better base pay ([ZipRecruiter New Hire Survey 2025 Q4](https://www.ziprecruiter-research.org/economic-insights-research/new-hire-survey-2025-q4)). The people who do not negotiate are the reason the average is low.
- Appetite is still there but caution has grown: 69% of job seekers in Q3 2026 said they are prepared to negotiate, down from 73% in Q1, while the median expected pay increase is 27%; 67% feel financial pressure to accept the first offer and 55% believe employers hold the upper hand ([ZipRecruiter Job Seeker Confidence Survey 2026 Q3](https://www.ziprecruiter-research.org/economic-insights-research/job-seeker-confidence-2026-q3)). Expect the first offer to be the opening offer, not the final one.
- Employer side: 64% of employers (75% of major enterprises) say candidates frequently negotiate pay; 72% now post salary information in all postings; and 41% said a position went unfilled in the previous six months because candidates wanted more pay than the company was prepared to offer ([ZipRecruiter — Pay Trends Amid Rising Pay Transparency](https://www.ziprecruiter-research.org/economic-insights-research/pay-trends-amid-rising-pay-transparency)). Both sides know the number; the range is the anchor.

### Benchmarks for senior AI/ML

- Levels.fyi reports a median total compensation of **$155,500** for AI Engineer in the US, with a 25th percentile of $110,000, 75th of $212,500 and 90th of $287,500, from 330 self-reported packages (data as of 8 November 2026) ([Levels.fyi — AI Engineer](https://www.levels.fyi/t/software-engineer/title/ai-engineer)). Levels.fyi reports total compensation — base plus annualised stock plus bonus — from offers and salaries employees submit themselves.
- Frontier-lab bands are public and specific: Anthropic's Applied AI Engineer, Enterprise role lists **$200,000–$320,000** USD ([Anthropic — Applied AI Engineer, Enterprise](http://job-boards.greenhouse.io/anthropic/jobs/5057647008)); its Cyber Evaluations Engineer role lists **$300,000–$405,000** ([Anthropic — Cyber Evaluations Engineer](https://www.anthropic.com/careers/jobs/5406367008)). These are posted ranges, which is the most reliable anchor class available in 2026 — many postings now disclose bands.
- Lightcast finds a market-wide premium: postings that mention AI skills pay **28% more**, roughly **$18,000** per year, than postings that do not ([Lightcast — Beyond the Buzz](https://lightcast.io/research/beyond-the-buzz-developing-the-ai-skills-employers-actually-need)).

### The negotiation sequence

1. **Never negotiate against yourself.** If they ask for expectations, give a researched range: "Based on [posted band], I'm targeting [X]–[Y] total compensation, depending on how equity is structured." A range with a documented basis is not a bluff.
2. **Anchor late, on total compensation.** Base, bonus, equity, vesting, remote days, and start date all have value; "comp" conversations that only discuss base leave money on the table.
3. **Bring evidence, not need.** "My RAG pipeline cut cost per task by 62% and p95 latency to 1.8s" is a position. "I have three offers and one expires Friday" is a deadline — useful only once, and only if true.
4. **Trade, don't haggle.** Ask for what matters most to you (equity over base, a later start date, a specific title, a budget for conference travel) and give something real in return.
5. **Get the offer in writing before you negotiate.** Include base, bonus, equity with strike price/vesting, start date, location and work-mode terms.
6. **Use a deadline.** "I'd like to decide by Friday" is normal and effective.
7. **Do not negotiate against a good team by insulting the offer.** A specific, evidence-backed improvement is a negotiation; a complaint is a rejection.

### Offer comparison worksheet

```text
                        Offer A       Offer B       Offer C
Base salary
Target bonus (and how it's determined)
Equity: type / amount / strike / vesting / cliff
Total comp (year 1) / (year 4)
Remote days / location expectation
Start date
Sign-on / relocation
Title (and the level it maps to internally)
Learning budget / conference budget
Manager and team (name, tenure)
Stability: funding runway, customer concentration
Time-to-decision deadline
```

Fill this in before responding to any offer. The sheet exists to stop you from negotiating the wrong line item.

## Interview preparation for senior AI/ML and agentic roles

The bar at senior level is not "do you know RAG." It is "can you make an AI system dependable, and can you prove it."

### What the postings themselves say

Read the roles. Anthropic's Cyber Evaluations Engineer posting asks for "experience building or running evaluations, benchmarks, or test suites for software or ML systems, including delivering results on short, fixed timelines," Python proficiency, and "strong ability to communicate evaluation results with multiple cross-functional stakeholders"; the responsibilities are designing capability and safety evaluations, running per-release robustness testing, designing detection probes, and building "internal tooling used to run and score evaluations" ([Anthropic — Cyber Evaluations Engineer](https://www.anthropic.com/careers/jobs/5406367008)). Anthropic's Applied AI Engineer, Enterprise role centres on architecture advice, "developing evaluation frameworks," and guiding customers through implementation patterns for LLMs ([Anthropic — Applied AI Engineer, Enterprise](http://job-boards.greenhouse.io/anthropic/jobs/5057647008)). Even a non-AI engineering role at the same company states its seniority bar explicitly: "10+ years of experience across AV, collaboration, or IT systems engineering, including 4+ years writing, shipping, and maintaining production code that other people depend on," plus "Git-based workflows, code review, automated testing, CI/CD, logging, and observability" ([Anthropic — AV Engineer, Platform & Automation](https://www.anthropic.com/careers/jobs/5383714008)).

Three patterns: **evals are a first-class skill**; **production ownership is the differentiator**; **communication to non-engineering stakeholders is required, not optional**.

### The senior AI/ML question bank

Prepare written answers — one page each, with numbers — for:

**System design**
- Design an end-to-end RAG system for a regulated document corpus: ingestion, chunking, hybrid retrieval, reranking, citation, freshness, access control. What do you measure first?
- Design an agent that can take actions in a production system: tools, permissions, idempotency, approval gates, retries, audit trail, failure recovery.
- Design an LLM-backed feature that must hold a latency SLO and a unit-cost ceiling. Where does the budget go: retrieval, generation, verification, retries?

**Evaluation**
- How do you know a prompt change improved things? What is your golden set, how was it built, who maintains it?
- Offline evals versus online metrics: when does each lie?
- LLM-as-judge: when is it trustworthy, what calibration do you apply, how do you detect judge drift?
- How do you evaluate an agent whose task takes 20 tool calls?

**Reliability and operations**
- A production RAG system starts returning confidently wrong answers after a source-document change. Your debugging sequence?
- Inference cost per task tripled overnight. Where do you look, and what do you change first — model, routing, caching, retrieval, prompt, or harness?
- Prompt injection in a tool-using agent: what are the containment layers and which one actually holds?
- How do you make agent behaviour auditable for a compliance review?

**Craft and judgement**
- When is a deterministic pipeline better than an agent? Give a case where you chose the boring option and why.
- What did you build that you later deleted, and why?
- How do you keep a skills/plugin architecture from rotting? (Versioning, CI gates, deprecation, ownership.)

### Logistics of the process itself

- **AI proficiency is now assessed.** 32% of new hires reported being tested on AI proficiency, and 35% encountered AI somewhere in the hiring process ([ZipRecruiter New Hire Survey 2026 Q2](https://www.ziprecruiter-research.org/economic-insights-research/new-hire-survey-2026-q2)). Expect an AI-literacy exercise or an AI-assisted-take-home; know your tools and know how to verify their output.
- **Take-homes are a fit test, not a free project.** Bound the scope explicitly, state assumptions in writing, ship a README that explains trade-offs, and time-box to 4–6 hours.
- **Prepare a 90-second self-introduction** and a 3-minute version of your most recent project, with the metric at the end.
- **Write the follow-up email immediately after each round** — two sentences of specific substance plus one artefact. The follow-up is where intent is communicated; most candidates simply fail to send one.

### Interview-prep checklist

- [ ] Five system-design answers written, one page each, with numbers.
- [ ] Five evaluation answers written, including one where the metric lied.
- [ ] Two failure stories with root cause, detection, fix, and what changed afterwards.
- [ ] One page of cost/latency arithmetic I can do without tools (tokens × price × volume).
- [ ] One live demo or repository I can navigate in under two minutes.
- [ ] Ninety-second self-introduction, recorded and re-listened to.
- [ ] Ten questions for them, specific to the team and product — written before the call.
- [ ] A take-home scoping template ready to paste.
- [ ] A follow-up-email template with a blank "one new fact" slot.

## Portfolio and GitHub as evidence

Public work is the strongest evidence channel available to a senior engineer, and it is the channel AI systems can retrieve and quote.

The academic case is straightforward: keyword-based résumé matching "fails to extract the actual abilities of candidates, such as the quality of their written code," and mining open-source artefacts is proposed as the corrective ([Vaishampayan, Gulzar & Brown — Improving Evidence-Based Tech Hiring with GitHub-Supported Resume Matching, SANER 2025](https://www.computer.org/csdl/proceedings-article/saner/2025/351000a797/26TIsUeEm4g)). For hiring, this also means a repository can substitute for a résumé bullet — if the code is legible, the README explains why the project exists, and the commit history shows iteration rather than a single upload.

### What to make public

| Artefact | Why a hiring manager opens it |
|---|---|
| Profile README | Orientation in 15 seconds: what you build, current focus, how to reach you |
| 3–5 pinned repositories | Chosen for signal: orchestration, evals, cost control, data — not tutorials |
| Case studies | The narrative version: problem, constraints, decisions, metrics |
| A live demo or dashboard | Proof it runs, not that it ran once |
| Architecture or incident write-up | Evidence of judgement and of operating real systems |
| An open issue you commented on | Social proof of working inside a codebase that is not yours |

### GitHub profile checklist

- [ ] Profile README states role, domain, the two or three systems you build, and where you are.
- [ ] Pinned repos are the strongest four or five, each with a README that has: problem, stack, architecture, how to run, what you would improve.
- [ ] Every repo has a one-line description and a "Why this exists" paragraph.
- [ ] Issues, releases and commit history look alive — consistent activity, not one bulk upload.
- [ ] `About` includes the same job-title vocabulary you use on LinkedIn and your résumé.
- [ ] No credentials, no client data, no copied code without attribution. (For clinical or regulated clients, redact before publishing — this is a professional obligation, not a preference.)

## The senior AI/ML keyword set: what recruiters actually screen for

This is the data-driven part, and it is where most generic advice goes wrong. The following comes from Lightcast's analysis of US job postings in the Stanford AI Index 2026 ([AI Index 2026, Chapter 4 — Economy](https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_4_economy.pdf)).

### Skill-cluster penetration (share of all US postings)

| Skill cluster | Share of US postings | Read |
|---|---|---|
| Artificial intelligence | 1.70% | The umbrella term; cheap to include |
| Machine learning | 0.99% | Classic baseline |
| Generative AI | 0.41% | Now mainstream |
| AI agent | 0.23% | Fastest-growing cluster; a 2026 differentiator |
| Natural language processing | 0.22% | Still screened for explicitly |
| Neural networks | 0.20% | Older but persistent |

### Top specialised skills in US AI postings, 2025 vs 2013–15

| Skill | 2025 postings | Change vs 2013–15 |
|---|---|---|
| Python | 258,674 | +391% |
| Computer science | 257,127 | +165% |
| Scalability | 197,744 | +733% |
| Automation | 190,758 | +610% |
| Workflow management | 186,325 | +818% |
| Data analysis | 170,396 | +210% |
| SQL | 151,191 | +132% |
| Project management | 149,865 | +147% |
| Data science | 142,120 | +431% |
| Amazon Web Services | 142,037 | +1,358% |

### Generative-AI skills in US AI postings, 2025 vs 2024

| Skill | 2025 postings | YoY |
|---|---|---|
| Generative artificial intelligence | 138,188 | +111% |
| Large language modeling | 38,526 | +102% |
| Prompt engineering | 22,227 | +261% |
| Retrieval augmented generation | 12,609 | +337% |
| Text to speech | 1,900 | +81% |
| Generative adversarial networks | 1,571 | +24% |
| Multimodal models | 1,459 | +137% |
| Variational autoencoders | 717 | +15% |
| Stable Diffusion | 703 | +7,711% |
| Context engineering | 628 | — |

### Agent skills in US AI postings, 2025 vs 2024

| Skill | 2025 postings | YoY |
|---|---|---|
| Agentic systems | 16,541 | +10,854% |
| Microsoft Copilot Studio | 15,217 | +1,062% |
| LangGraph | 14,376 | +160% |
| Chatbot | 6,976 | +28% |
| Multi-agent systems | 6,395 | +352% |
| Microsoft Copilot | 5,461 | +234% |
| Conversational AI | 4,596 | +98% |
| AI agents | 4,294 | +2,113% |
| Agentic AI | 3,366 | +513% |
| ChatGPT | 2,850 | +1,384% |

### How to read this table set

- **Deployment beats experimentation.** The AI Index is explicit: demand is shifting "from general familiarity with chat-based tools toward skills required to coordinate and operationalize task-oriented systems," and the fastest growth is in "skills needed to build and operate systems at scale" ([AI Index 2026, Chapter 4](https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_4_economy.pdf)). A résumé that says "built a chatbot" is on the declining side of that line; one that says "owned agent orchestration in production, with eval harness and cost guard" is on the growing side.
- **Context engineering is new and cheap to claim credibly.** 628 US postings in 2025 — small, but it is a differentiator precisely because few people can demonstrate it. Context engineering grew from 9 postings in 2024 to 628 in 2025.
- **RAG is table stakes; agentic orchestration is the edge.** RAG appears in 12,609 postings (+337%); "agentic systems" in 16,541 (+10,854%).
- **Non-AI skills still gate the AI ones.** Project management (+147%), workflow management (+818%), scalability (+733%), SQL (+132%) sit in the same top-10 list as Python and AWS. For a senior candidate this is good news: the differentiator is often operational, not research-y.
- **Geography matters for targeting.** California leads with 170,881 AI postings (17.2% of the US total), Texas 80,547 (8.1%) and New York 66,029 (6.6%); Washington DC has the highest density at 6.2% of postings in its labour market ([AI Index 2026, Chapter 4](https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_4_economy.pdf)). AI skills appear in 13.2% of information-sector postings, 6.5% of professional/scientific/technical services, 5.3% of finance and insurance and 4.7% of manufacturing — so the AI-skill search is not only a tech-sector search ([AI Index 2026, Chapter 4](https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_4_economy.pdf)).
- **Beware the junior pipeline.** Employment for software developers aged 22–25 has fallen close to 20% from its 2022 peak, and among AI-exposed occupations employment for 22–25-year-olds is down roughly 16% relative to the least-exposed, even as older cohorts grow ([AI Index 2026, Chapter 4](https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_4_economy.pdf)). Senior hiring is the resilient part of this market — and a senior candidate competing for senior roles is competing in the least-crowded queue.

### The keyword block to keep current

Revisit this quarterly against the live postings you actually target, not from memory:

```text
CORE          LLM orchestration · agent orchestration · agentic systems · multi-agent
              systems · AI agents · prompt engineering · context engineering ·
              retrieval-augmented generation (RAG) · large language modeling (LLM) ·
              generative AI · evaluation harnesses / evals / LLM-as-judge · model
              routing · tool use / function calling · MCP (Model Context Protocol)
OPERATIONS    MLOps · inference cost optimisation · cost guard / budget guard ·
              latency (p95) · caching · batching · observability / tracing ·
              CI/CD for AI systems · guardrails · prompt injection defence · audit
              logging · rollback and versioning of prompts and models
DATA          vector databases (pgvector, Qdrant, Pinecone, Weaviate) · hybrid search ·
              reranking · embeddings · data pipelines · SQL · Spark
MODELS        fine-tuning (LoRA/QLoRA) · RLHF · distillation · quantisation ·
              open-weight models · Claude / GPT / Gemini API
DOMAIN        retrieval quality metrics · hallucination rate · task-completion rate ·
              cost per task · human-in-the-loop escalation · regulatory evidence
```

Read that list as a coverage map, not a shopping list. Every term must be attached to a bullet with a number behind it, or it is noise that a careful interviewer will test.

## Evidence of impact: the metrics that make a senior claim credible

"Built a scalable RAG platform" is a claim. "Cut cost per resolved query 62% and p95 latency to 1.8 s while holding answer accuracy at 94% on a 1,200-question golden set" is evidence. The second sentence survives a technical screen; the first does not.

### Metric families to own

| Family | Metrics | What it proves |
|---|---|---|
| Quality | Accuracy, pass rate, task-completion rate, citation precision/recall, hallucination rate | The system is correct |
| Reliability | Error rate, retry rate, escalation rate, mean time to detect/resolve | The system is dependable |
| Efficiency | Cost per task/request, tokens per task, p50/p95 latency, throughput | You understand unit economics |
| Business | Human hours saved, tickets deflected, cycle time, revenue or risk avoided | You build for outcomes, not demos |
| Engineering | Test coverage on AI paths, eval-suite size, deployment frequency, rollback time | You operate production systems |
| Safety & compliance | Audit coverage, policy-violation rate, access-control incidents, documentation completeness | You work where the stakes are real |

### Every metric needs four attributes

1. **Unit** — per task, per 1,000 queries, per seat, per month.
2. **Definition** — what exactly was counted ("resolved" = answered without escalation).
3. **Baseline** — before your change.
4. **Date and scope** — when measured, on what volume, on which population.

A metric without a baseline is an anecdote. A metric without a date decays.

### The evidence line

```text
[System] + [change you made] + [metric] + [baseline] + [how measured] + [date]
```

```text
Rebuilt retrieval over a 1,900-document corpus with hybrid BM25 + vector search and
a cross-encoder reranker: answer accuracy rose from 71% to 94% on a 1,200-question
golden set (built 2026-03), p95 latency fell from 4.2 s to 1.8 s, and cost per
resolved query dropped 62% (2026-05 billing data).
```

That line does several jobs at once: it names mechanisms a recruiter can keyword-match, it demonstrates measurement discipline, and it answers the first technical question before it is asked.

### A note on AI-assisted work

Report AI-assisted output honestly. Where an agent generated a large fraction of a deliverable, say so and describe the verification you performed. Some of the most credible 2026 findings are unflattering: METR found experienced open-source developers were 19% *slower* with AI assistance while believing they were faster ([Becker et al., 2025, cited in AI Index 2026, Chapter 4](https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_4_economy.pdf)). The organisations that win will be the ones that measure, not the ones that assume.

## AEO: how candidate discovery through AI search actually works

This is the newest channel and the one most candidates have not thought about. The mechanics are documented by the platforms themselves, so this section is not speculation.

### The retrieval path

Generative search systems work by retrieval plus generation, and the retrieval step is where you are either present or absent.

- **Google's AI Overviews and AI Mode** use retrieval-augmented generation over Google's core Search index, plus a "query fan-out" that issues many related sub-queries across subtopics to develop the answer. Google states plainly that "there are no additional technical requirements" to appear in AI features: the page must be indexed and eligible for a snippet, and the same fundamentals apply ([Google Search Central — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)).
- **ChatGPT search** works the same way at the OpenAI layer. OpenAI's crawler documentation defines `OAI-SearchBot` as the bot that "is used to surface websites in search results in ChatGPT's search features," and warns that "sites that are opted out of OAI-SearchBot will not be shown in ChatGPT search answers" (though they can still appear as navigational links) ([OpenAI — Overview of OpenAI Crawlers](https://developers.openai.com/api/docs/bots)). `GPTBot` is the training crawler and is a separate switch; `ChatGPT-User` handles user-triggered fetches ([OpenAI — Overview of OpenAI Crawlers](https://developers.openai.com/api/docs/bots)).
- **Claude** separates the same concerns: `ClaudeBot` for model training, `Claude-SearchBot` for search indexing, and `Claude-User` for user-initiated retrieval — and Anthropic states that disabling `Claude-SearchBot` prevents your content from being indexed for search and "may reduce your site's visibility" ([Anthropic — crawler documentation](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)).
- **Perplexity** documents `PerplexityBot` as "designed to surface and link websites in search results on Perplexity" and `Perplexity-User` for user-initiated fetches ([Perplexity — Crawlers](https://docs.perplexity.ai/guides/bots)).
- **Bing/Copilot** publishes grounding eligibility rules directly: content must be discoverable, accurate, well-structured, and created for users; and it explicitly ties canonical URLs, sitemaps, `IndexNow`, crawlable internal links and structured content to "eligibility for grounding results and citations" ([Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)).

### What gets cited, and why this matters for a candidate

The 2026 citation data is blunt about who gets quoted. Muck Rack and Generative Pulse's October 2026 *What Is AI Reading?* study, covering more than 40 million AI responses and 207 million citations in 2026, found that nearly **99% of links cited in AI-generated responses come from non-paid sources**, and more than **84% come from earned and third-party sources** — journalism, government and NGO sites, academic research, encyclopedic sources and third-party corporate content; paid and advertorial content was 0.3%. Owned media rose from 13.7% to 15.2% of citations, and journalism fell from 27% to 22% ([Muck Rack — What Is AI Reading, October 2026](https://muckrack.com/blog/what-is-ai-reading-october-2026)).

For a candidate, the operational translation is: **your own site alone will not carry you into AI answers.** The citations come from third-party sources — a conference talk page, an open-source repository, an engineering blog, a community answer, a news write-up, a university page. The site is the canonical reference; the third-party presence is what gets retrieved and quoted.

### The click question — why being cited still matters

Classic SEO's assumption — rank first, get the click — is weakening. Ahrefs re-ran its study on December 2025 data across 300,000 keywords and found the presence of an AI Overview correlates with a **58% lower average click-through rate** for the top-ranking page, up from the 34.5% reduction it measured in April 2025 ([Ahrefs — Update: AI Overviews reduce clicks by 58%](https://ahrefs.com/blog/ai-overviews-reduce-clicks-update)). Pew's panel analysis of 68,879 real Google searches by 900 US adults found users who encountered an AI summary clicked a traditional result link on 8% of visits, against 15% for those who did not see a summary, and that users "very rarely clicked on the sources cited" ([Pew Research Center — Do people click on links in Google AI summaries?](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)).

But referral traffic from assistants is real and growing: SE Ranking's analysis of traffic across 101,574 websites in 250 countries found ChatGPT's referral share rose from 0.23% in April 2026 to 0.32% in May 2026 — a 36.7% monthly jump and 8% above the previous peak — while ChatGPT's share of all AI referral traffic fell from 79.74% in 2025 to 75.96% in 2026, meaning Gemini, Perplexity, Copilot and Claude now matter enough to track separately ([SE Ranking — ChatGPT referral traffic, May 2026](https://seranking.com/blog/chatgpt-referral-traffic-may-2026)). And OpenAI's own web-search documentation confirms the mechanism: by default a response includes inline citations for URLs found in the web search results, with a `url_citation` annotation carrying the URL, title and location of each cited source ([OpenAI — Web search guide](https://developers.openai.com/api/docs/guides/tools-web-search)).

The strategic read: **being quoted inside an AI answer can substitute for the click.** A candidate surfaced by name in an assistant's answer has been introduced by the assistant, in a context the recruiter asked for. That is worth more than a page visit.

### The GEO techniques that work — and the one that backfires

The academic basis is Aggarwal et al., "GEO: Generative Engine Optimization," published at KDD 2024 ([arXiv:2311.09735](https://arxiv.org/abs/2311.09735)). Their GEO-bench benchmark of 10,000 queries across domains found that GEO methods can boost source visibility by **up to 40%**, with inclusions of citations, quotations and statistics able to increase visibility by over 40% across queries, and real-world gains of up to 37% on Perplexity. Their results table is the part that matters for a résumé-adjacent site: the traditional SEO technique of **keyword stuffing performed below the no-optimization baseline** on position-adjusted word count (21.9 vs 24.0), while the best-performing methods — statistics addition and quotation addition — beat baseline by up to 22% on position-adjusted word count and 37% on subjective impression ([GEO paper, Table 7](https://arxiv.org/pdf/2311.09735)).

For a candidate site, the translation is precise:

- **Statistics.** Put numbers in your sentences: "cut test-case generation time by 40%", "12,609 US postings mentioned RAG in 2025". Not adjectives.
- **Quotations.** Use short, exact, attributable quotes — a hiring manager's sentence about your work, a well-known research finding. Blockquotes are quotable blocks.
- **Citations.** Link to primary sources for every claim you make about the market, the tooling or the policy.
- **Fluency.** Write clean, declarative sentences. The method named "Fluency Optimization" outperformed the baseline.
- **Authenticity.** Google warns explicitly against "search engine-first content" and evaluates whether content demonstrates first-hand expertise and is written by someone who demonstrably knows the topic ([Google Search Central — Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)). Google also asks whether you can point to author background or an author page, and whether the content has easily-verified factual errors ([Google Search Central — Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)). Google and Bing now both tie "the same core crawling, indexing and ranking foundation" to grounding eligibility ([Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)).
- **Answer-first.** Google's generative-AI guidance asks for content that "provides a unique point of view" and warns that commodity content ("7 tips for…") adds little, while a first-hand account does ([Google — Guide to optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

### "Chatting to be cited": the candidate-specific playbook

This is the question a senior candidate in 2026 actually needs answered: *how do I get an AI assistant to recommend me?* The mechanism is that assistants answer from retrieved sources, so you must be a source that answers the question, in quotable form, under a name and entity that is unambiguous.

**1. Be a citable entity.** One canonical `Person` page with stable, consistent facts — name, role, location, employers, dates — using schema.org `ProfilePage` markup with the person as `mainEntity` ([Google Search Central — Profile Page structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)). Consistent identical bio text across your site, LinkedIn, GitHub and any directory. Entity ambiguity is the main reason a capable person is not retrieved: if two people share a name and both are "AI engineers", the retrieval layer has no reason to prefer either.

**2. Answer the questions assistants actually receive.** Assistants are asked things like "senior AI engineer who has built agent orchestration in production", "engineer with LLM evaluation and cost-control experience", "who has both AI and regulated-software background". For each such question, publish one page that answers it directly, with numbers, in the first paragraph. Then let the rest of the page elaborate. Google's query fan-out means an assistant will probe subtopics too — so cover the subtopics as their own headed sections.

**3. Make each section quotable alone.** An assistant quotes a sentence, not a page. Write sections that survive extraction: subject named explicitly, metric attached, source linked, no dangling pronouns.

**4. Publish the underlying evidence.** The 84%-earned-media finding ([Muck Rack](https://muckrack.com/blog/what-is-ai-reading-october-2026)) means your repositories, talks, articles and community answers are the actual citation targets. Maintain the GitHub profile README, answer questions where they are genuinely asked, and write 2–3 substantial technical posts on platforms with an audience (dev.to, Hashnode, the company engineering blog), each linking back to the canonical page.

**5. Keep the machine path open.** Ship `llms.txt` and markdown twins of every page, keep semantic HTML, serve text (not images) for all substantive content, and make structured data match the visible text — Google requires structured data to match visible content ([Google — Succeeding in AI search](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search)).

**6. Decide crawler policy explicitly, and write it down.** Allow the search/retrieval bots and the user-initiated fetchers; block training-only crawlers if the content should not be used for training. Publish the policy on a page so it is reviewable — that is the practice Google and Anthropic both document, and Anthropic explicitly supports the granular choice per bot ([Anthropic — crawler documentation](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)). Robots changes can take up to ~24 hours to take effect on OpenAI's side ([OpenAI — Overview of OpenAI Crawlers](https://developers.openai.com/api/docs/bots)).

**7. Measure it.** Two first-party instruments exist and most candidates never use them:
   - **Google Search Console generative AI performance reports**, launched June 2026, showing impressions, pages, countries, devices and dates for AI Overviews, AI Mode and Discover ([Google Search Central Blog — Search Generative AI performance reports](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)).
   - **Bing Webmaster Tools AI Performance report**, showing which pages are cited in AI-generated answers across Copilot and partner experiences, plus the "grounding queries" your content appears in ([Bing Webmaster Tools — AI Performance](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c)).

   The grounding-query list is the most actionable dataset a candidate will ever get: it is literally the set of questions an assistant asked before citing you.

**8. Ask the assistants your own questions, monthly.** A fixed prompt set — "senior AI engineer with agent orchestration experience", "engineer with RAG and evaluation background", "AI engineer with regulated-industry QA experience" — run across ChatGPT, Perplexity, Gemini and Copilot, recording whether you are mentioned, with what description, and with which citation. It is not a vanity metric; it is a regression test on your own discoverability. Note the honest caveat: no vendor publishes per-candidate citation data, so this measurement is your own instrument, and the primary-source measurement (Search Console, Bing AI Performance) is the one to trust for causality.

### The site structure that supports all of this

```text
/                     Home: the quotable one-paragraph answer to "who is X"
/cv/                  Résumé as HTML (semantic headings, ATS-readable) + PDF twin
/about/               Long narrative, dated timeline, named recommendations
/work/                One page per project: problem → decisions → metrics → artefacts
/writing/             Index of guides
/writing/job-hunt-and-cv/   This guide
/writing/ai-search-optimization/  How retrieval and citation work
/llms.txt             Machine-readable summary + link list
/llms/*.md            Markdown twin of every page
/sitemap.xml · robots.txt      With an explicit, published AI-crawler policy
```

Each `/work/` page follows the case-study outline above, because that outline is simultaneously good engineering writing, good recruiter evidence and good citation fodder: problem, constraints, decisions with rejected alternatives, metrics with baselines, honest limitations, artefacts.

## The 30-day operating plan

A job hunt fails on execution, not on strategy. This is the plan.

### Week 1 — rebuild the instruments

- [ ] Rewrite the master résumé from the template above; single column; two pages; every bullet with a verb and a number.
- [ ] Create the tracker sheet with the CSV header above; import every live application.
- [ ] Build the keyword block from the live postings you target; re-derive it from postings, not from memory.
- [ ] Publish or refresh the GitHub profile README; pin four repositories; give each a README with problem/stack/architecture/run/what-I-would-improve.
- [ ] Write one case study end-to-end, using the outline above, with real metrics.

### Week 2 — evidence and visibility

- [ ] Write two more case studies (evaluation, cost/operations).
- [ ] Fix the canonical `Person` page; add `ProfilePage` structured data; align bio text across site, LinkedIn, GitHub.
- [ ] Ship `llms.txt`, markdown twins, `sitemap.xml`, and a published AI-crawler policy.
- [ ] Rewrite the LinkedIn headline and About section as search queries; complete the Skills section with the target vocabulary.
- [ ] Set up the monthly assistant prompt-set check and record the baseline.

### Weeks 3–4 — the funnel

- [ ] 8–12 tailored applications per week: follow the 20-minute routine, every time.
- [ ] 3–5 warm outreach messages per week, each quoting one line of a real posting.
- [ ] One published artefact per week: a technical post, a repo release, a talk, a community answer with a backlink.
- [ ] Weekly tracker review: close every row whose `next_action_date` has passed.
- [ ] One case study published per week, and one link added to the résumé from it.

### Standing rules

1. Never send a document you have not read end-to-end.
2. Never claim a metric you cannot source. If you cannot measure it, describe the mechanism instead.
3. Every 10 applications, review the funnel: applications → screens → interviews → take-homes. If the first step is weak, the résumé is wrong; if the last step is weak, the interview story is wrong.
4. Keep one honest, dated narrative. The résumé, the site, the LinkedIn and the interview must not contradict each other — contradictions are what an AI assistant or a careful recruiter will find first.

## Primary sources

- [Stanford AI Index 2026 — Chapter 4, Economy](https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_4_economy.pdf) — AI labour demand, skill clusters, top specialised skills, agentic-AI growth, workforce impact.
- [Lightcast — The Stanford AI Index 2026](https://lightcast.io/resources/research/stanford-ai-index-2026) and [Beyond the Buzz: the AI skills employers actually need](https://lightcast.io/research/beyond-the-buzz-developing-the-ai-skills-employers-actually-need) — 28% pay premium for AI-skill postings.
- [Jobscan — 2026 ATS Usage Report](https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems), [What is an ATS](https://www.jobscan.co/blog/8-things-you-need-to-know-about-applicant-tracking-systems/), [Why ATS tables and columns ruin your resume](https://www.jobscan.co/blog/resume-tables-columns-ats/), [Greenhouse ATS guide](https://www.jobscan.co/blog/greenhouse-ats-what-job-seekers-need-to-know/), [Lever ATS guide](https://www.jobscan.co/blog/lever-ats), [Top 500+ resume keywords](https://www.jobscan.co/blog/top-resume-keywords-boost-resume).
- [Harvard Business School / Accenture — Hidden Workers: Untapped Talent (2021)](https://www.hbs.edu/ris/Publication%20Files/hiddenworkers09032021_Fuller_white_paper_33a2047f-41dd-47b1-9a8d-bd08cf3bfa94.pdf) — filter-and-rank behaviour, exclusion criteria, hidden-worker conversion rates.
- [Greenhouse Support — supported upload formats](https://support.greenhouse.io/hc/en-us/articles/360052218132-Supported-formats-for-resumes-cover-letters-and-other-candidate-uploads); [Lever — Understanding Resume Parsing](https://help.lever.co/s/article/Understanding-Resume-Parsing).
- [The Ladders — Eye-Tracking Study (2018)](https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf) — 7.4-second scan, layout findings, keyword-stuffing penalty.
- [LinkedIn Recruiter Help — Boolean search](https://www.linkedin.com/help/recruiter/answer/a415295), [Skills filter](https://www.linkedin.com/help/recruiter/answer/a593591), [Standard candidate search](https://www.linkedin.com/help/recruiter/answer/a413329), [InMail Policy](https://www.linkedin.com/help/recruiter/answer/a413279), [InMail sending limits](https://www.linkedin.com/help/recruiter/answer/a745199); [LinkedIn News — Hiring Assistant 2](https://news.linkedin.com/2026/hiring-assistant-2), [Skills on the Rise 2026](https://news.linkedin.com/2026/Skills-on-the-rise-2026), [America's 25 fastest-growing jobs](https://www.linkedin.com/news/story/these-are-americas-25-fastest-growing-jobs-6851116).
- [Indeed Employer Guide — Boolean Search](https://www.indeed.com/hire/c/info/what-is-boolean-search); [Jobscan — How to write an ATS resume](https://www.jobscan.co/blog/ats-resume/).
- [ZipRecruiter — New Hire Survey 2026 Q2](https://www.ziprecruiter-research.org/economic-insights-research/new-hire-survey-2026-q2), [Job Seeker Confidence Survey 2026 Q3](https://www.ziprecruiter-research.org/economic-insights-research/job-seeker-confidence-2026-q3), [New Hire Survey 2025 Q4](https://www.ziprecruiter-research.org/economic-insights-research/new-hire-survey-2025-q4), [Pay Trends Amid Rising Pay Transparency](https://www.ziprecruiter-research.org/economic-insights-research/pay-trends-amid-rising-pay-transparency).
- [Levels.fyi — AI Engineer compensation](https://www.levels.fyi/t/software-engineer/title/ai-engineer); [Anthropic — Applied AI Engineer, Enterprise ($200k–$320k)](http://job-boards.greenhouse.io/anthropic/jobs/5057647008), [Cyber Evaluations Engineer ($300k–$405k)](https://www.anthropic.com/careers/jobs/5406367008), [AV Engineer, Platform & Automation](https://www.anthropic.com/careers/jobs/5383714008).
- [Vaishampayan, Gulzar & Brown — Improving Evidence-Based Tech Hiring with GitHub-Supported Resume Matching (SANER 2025)](https://www.computer.org/csdl/proceedings-article/saner/2025/351000a797/26TIsUeEm4g).
- [Aggarwal et al. — GEO: Generative Engine Optimization (KDD 2024)](https://arxiv.org/abs/2311.09735) · [PDF](https://arxiv.org/pdf/2311.09735).
- [Google Search Central — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features), [Optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [Profile Page structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page), [Search Generative AI performance reports](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports), [Succeeding in AI search](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search).
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a) · [Bing AI Performance report](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c).
- [OpenAI — Overview of OpenAI Crawlers](https://developers.openai.com/api/docs/bots) · [Web search guide: output and citations](https://developers.openai.com/api/docs/guides/tools-web-search); [Anthropic — crawler documentation](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler); [Perplexity — Crawlers](https://docs.perplexity.ai/guides/bots).
- [Muck Rack & Generative Pulse — What Is AI Reading?, October 2026](https://muckrack.com/blog/what-is-ai-reading-october-2026) — earned-media share of AI citations.
- [SE Ranking — ChatGPT referral traffic, May 2026](https://seranking.com/blog/chatgpt-referral-traffic-may-2026); [Ahrefs — AI Overviews reduce clicks by 58%](https://ahrefs.com/blog/ai-overviews-reduce-clicks-update); [Pew Research Center — Do people click on links in Google AI summaries?](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/) and [Americans and AI 2026](https://www.pewresearch.org/internet/2026/06/17/americans-and-ai-2026-chatbots-smart-devices-and-views-on-impact/).

---

*Figures and policies are current as of November 2026. ATS behaviour, platform policies and hiring statistics change: re-verify the platform-specific figures (acceptance thresholds, send limits, crawler rules) before quoting them in an interview.*
