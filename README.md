# ivanweissvanderpol.github.io — senior AI engineer site

A static personal site built to do two jobs at once:

1. **Rank in classic search.** Technical fundamentals done properly — crawlability, indexation,
   information architecture, Core Web Vitals, structured data, E-E-A-T.
2. **Get cited by AI answer engines.** Every page is answer-first, quotable, statistics-dense,
   source-linked, and readable by both a human skimming and an extractor pulling chunks.

The site is the proof of competence for a senior AI/automation engineering job hunt, and the
guides themselves are the demonstration of the skill being sold.

## Build

```bash
python3 scripts/build_site.py --content content --out site \
        --base-url https://ivanweissvanderpol.github.io --pdf
python3 scripts/verify_site.py --site site      # structural + SEO gate (exit 1 on failure)
python3 scripts/geo_lint.py site                # GEO/AEO craft lint (exit 1 on hard failures)
```

No dependencies, no framework, no build step beyond one Python script. The output in `site/`
is plain HTML + one CSS file and can be served by anything. The build also renders the
canonical CV page to `site/cv.pdf` using headless Chrome (skipped automatically when no
Chrome binary is available); pass `--no-pdf` to skip it.

## Layout

```
content/            Markdown source; front matter drives titles, descriptions, JSON-LD, breadcrumbs
  profile.md        canonical personal facts (single source of truth for CV/about/work copy)
  home.md about.md cv.md work.md writing.md ai-crawler-policy.md
  seo-core.md ai-search-optimization.md job-hunt-and-cv.md tooling-landscape.md
  crawler-policy.json  single source of truth for the AI-crawler allow/block lists
  tools.json           machine-readable inventory of the open-source SEO/AEO/ATS tooling
scripts/
  build_site.py     markdown -> static HTML + llms.txt + robots.txt + sitemap.xml + 404
  verify_site.py    link resolution, sitemap coverage, JSON-LD validity, on-page SEO gate
  geo_lint.py       GEO/AEO craft lint (answer-first, statistics, citations, chunkability)
  make_pdf.py       headless-Chrome print export of the CV page
site/               build output (git-ignored)
```

## Deployment

`master` is deployed by GitHub Actions (`.github/workflows/deploy.yml`): build -> verify ->
GEO lint -> upload Pages artifact. `site-checks.yml` runs the same gates on every push and
pull request. The previous Astro portfolio is preserved on the `astro-legacy` branch and the
`astro-v1` tag.

## Content front matter

```yaml
---
slug: writing/seo-core          # output path: site/writing/seo-core/index.html (+ .md twin)
title: "…"                      # <= 70 chars
description: "…"                # 70-165 chars
answer: "…"                     # 1-3 sentences -> the highlighted short-answer block
keywords: [a, b]
date: 2026-11-08
published: 2026-11-08
is_home: false
is_article: true
breadcrumbs: [[Home, ""], [Writing, "writing"], [SEO, "writing/seo-core"]]
---
```

## Ground rules

- Every statistic carries a source link. No unsourced numbers.
- Never claim a metric that is not in `content/profile.md`.
- The AI-crawler policy in `robots.txt` is explained publicly at `/ai-crawler-policy/` —
  if the policy changes, both change together.

## Not this site

This repository is Ivan van der Pol's own site. Anything about another person
(Alexander van der Pol's CV, evidence dossier, job-search material or research)
lives in the **private** repository `IvanWeissVanDerPol/alexander-van-der-pol`,
not here. That private repository's `START-HERE.md` tells any new session
which repository to work in.

**History.** Between 2025 and 2026-11-09 this repository briefly carried a copy of
another person's site material — an accidental inclusion, not a decision to publish it.
It was removed on 2026-11-09 by rewriting `master` onto this site's own pre-existing
history: no file about anyone else is in the current tree, and none is in any commit
reachable from `master`, `astro-legacy` or the `astro-v1` tag. The published tree was
left byte-identical, so nothing on the live site changed.

A Git rewrite is not an erasure. GitHub keeps serving unreachable objects to anyone who
has their SHA, and any clone or mirror made before the rewrite still holds them. The
reachable history is clean and is kept clean — `site-checks.yml` audits every blob of
every ref, and the `public-trunk-policy` ruleset blocks the force-push that would undo
the cleanup. Removing what was already copied elsewhere is outside what Git can do.

## Branch policy

`master` is the default branch and the deployed trunk. `astro-legacy` and the `astro-v1`
tag preserve the previous Astro portfolio. A feature branch may exist only while its
pull request is open; the `public-trunk-policy` ruleset forbids branch deletion and
non-fast-forward updates on `master` and `astro-legacy`.
