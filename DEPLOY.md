# Deployment

The site is deployed by GitHub Actions from this repository to
`https://ivanweissvanderpol.github.io` — the canonical domain, kept as a single
origin for entity consistency and link equity.

## Live path (already in place)

`.github/workflows/deploy.yml` runs on every push to `master`:

1. `scripts/build_site.py` — Markdown -> static HTML (no dependencies, no framework)
2. the build renders the canonical CV page to `cv.pdf` (on by default; `--no-pdf` disables)
3. `scripts/verify_site.py` — structural + SEO gate, exits non-zero on failure
4. `scripts/geo_lint.py` — GEO/AEO content lint, exits non-zero on hard failures
5. `actions/upload-pages-artifact` + `actions/deploy-pages`

The build cannot publish a broken site: both gates run inside the deploy job, so a
failed verification stops the deployment.

`site-checks.yml` runs the same gates on every push and pull request, so problems
surface in CI before they reach the live domain.

### Repository variable

`SITE_BASE_URL` (repository variable, not a secret) sets the canonical origin used
by the build. It defaults to `https://ivanweissvanderpol.github.io` when unset.

```bash
gh variable set SITE_BASE_URL --body "https://ivanweissvanderpol.github.io" \
  --repo IvanWeissVanDerPol/ivanweissvanderpol.github.io
```

## Previous site

The earlier Astro portfolio is preserved, not lost:

- branch `astro-legacy` — the Astro project exactly as it was
- tag `astro-v1` — the same commit, tagged

To roll back the live site to it, check out `astro-legacy`, restore the Astro
`deploy.yml`, and re-run the workflow.

## Local reproduction

```bash
python3 scripts/build_site.py --content content --out site \
        --base-url https://ivanweissvanderpol.github.io
python3 scripts/verify_site.py --site site
python3 scripts/geo_lint.py site
```

The PDF render needs a Chrome/Chromium binary. Without one the script prints a warning and
skips the PDF — the HTML build is unaffected. Pass `--no-pdf` to skip it explicitly.

## Alternatives (if the canonical domain ever moves)

### Cloudflare Pages

- Build command: `python3 scripts/build_site.py --content content --out site --base-url https://<domain>`
- Build output directory: `site`
- Environment variable `SITE_BASE_URL` = the production origin
- Upload `site/404.html` as the custom 404

For a custom domain, verify by bypassing the proxy edge once:

```bash
curl -sI --resolve <domain>:443:<origin-ip> https://<domain>/ | head -5
```

### Any static host (nginx, S3 + CloudFront, Netlify, Vercel static)

Upload `site/` verbatim. Requirements:

- serve `/foo/` as `/foo/index.html` (most hosts do this by default)
- serve `/foo.md` as `text/markdown` (or `text/plain`; both are acceptable to the llms.txt spec)
- return `404.html` with HTTP 404 for unknown paths
- keep `robots.txt`, `sitemap.xml` and `llms.txt` at the root, not rewritten
- enable gzip/brotli; the whole site is well under 2 MB uncompressed

## Post-deploy checklist

```bash
BASE=https://ivanweissvanderpol.github.io
for p in / /cv/ /about/ /work/ /writing/ /cv.pdf /llms.txt /robots.txt /sitemap.xml /tools.json /writing/seo-core/ ; do
  printf '%-28s %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code} %{content_type}' "$BASE$p")"
done
curl -s "$BASE/llms.txt" | head -20
```

Then:

1. Submit `sitemap.xml` in Google Search Console (URL Inspection -> submit for each key page).
2. Register the site in Bing Webmaster Tools and submit the sitemap there too.
3. Check the Lighthouse "agentic browsing" audits, including the `llms.txt` audit.
4. Re-run the GEO linter against the *deployed* HTML (`curl` the pages into a temp dir and lint).
5. Set up AI-referral analytics: filter referrers for `chatgpt.com`, `perplexity.ai`,
   `gemini.google.com`, `copilot.microsoft.com`, `you.com` in the analytics tool, and keep the
   raw server logs — those are the only ground truth for AI crawler activity.
