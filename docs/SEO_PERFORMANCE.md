# SEO & Performance Optimization Guide

## Overview

This document outlines SEO best practices and performance optimization strategies implemented in the portfolio website to achieve high search rankings and excellent user experience.

## SEO Optimization

### Meta Tags Implementation

#### Essential Meta Tags
```html
<!-- In Layout.astro -->
<head>
  <!-- Primary Meta Tags -->
  <title>Ivan Weiss Van Der Pol - Portfolio</title>
  <meta name="title" content="Ivan Weiss Van Der Pol - Portfolio" />
  <meta name="description" content="Computer Science Student & Data Engineering Professional showcasing projects, skills, and experience" />
  <meta name="keywords" content="data engineering, computer science, portfolio, web development, Ivan Weiss Van Der Pol" />
  <meta name="author" content="Ivan Weiss Van Der Pol" />
  <meta name="robots" content="index, follow" />

  <!-- Canonical URL -->
  <link rel="canonical" href="https://ivanweissvanderpol.github.io/" />

  <!-- Language -->
  <meta name="language" content="English" />
  <meta http-equiv="content-language" content="en" />
</head>
```

#### Open Graph Protocol
```html
<!-- Facebook/Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://ivanweissvanderpol.github.io/" />
<meta property="og:title" content="Ivan Weiss Van Der Pol - Portfolio" />
<meta property="og:description" content="Computer Science Student & Data Engineering Professional" />
<meta property="og:image" content="https://ivanweissvanderpol.github.io/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="Ivan Weiss Van Der Pol Portfolio" />
```

#### Twitter Card
```html
<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="https://ivanweissvanderpol.github.io/" />
<meta name="twitter:title" content="Ivan Weiss Van Der Pol - Portfolio" />
<meta name="twitter:description" content="Computer Science Student & Data Engineering Professional" />
<meta name="twitter:image" content="https://ivanweissvanderpol.github.io/twitter-image.jpg" />
```

### Structured Data (JSON-LD)

#### Person Schema
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ivan Weiss Van Der Pol",
  "url": "https://ivanweissvanderpol.github.io",
  "jobTitle": "Data Engineering Professional",
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "University Name"
  },
  "sameAs": [
    "https://github.com/ivanweissvanderpol",
    "https://linkedin.com/in/ivanweissvanderpol"
  ]
}
</script>
```

#### WebSite Schema
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Ivan Weiss Van Der Pol Portfolio",
  "url": "https://ivanweissvanderpol.github.io",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://ivanweissvanderpol.github.io/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

### URL Structure

#### Best Practices
- Clean URLs without parameters
- Lowercase letters
- Hyphens for word separation
- Descriptive paths

```
Good: /projects/data-analysis
Bad: /p?id=123&cat=proj
```

### Sitemap Generation

Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ivanweissvanderpol.github.io/</loc>
    <lastmod>2024-01-20</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ivanweissvanderpol.github.io/about</loc>
    <lastmod>2024-01-20</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ivanweissvanderpol.github.io/projects</loc>
    <lastmod>2024-01-20</lastmod>
    <priority>0.9</priority>
  </url>
</urlset>
```

### Robots.txt

Create `public/robots.txt`:
```txt
User-agent: *
Allow: /
Sitemap: https://ivanweissvanderpol.github.io/sitemap.xml

# Block development files
Disallow: /src/
Disallow: /.github/
Disallow: /node_modules/
```

## Performance Optimization

### Core Web Vitals

#### Target Metrics
| Metric | Good | Target |
|--------|------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | < 2.0s |
| FID (First Input Delay) | < 100ms | < 50ms |
| CLS (Cumulative Layout Shift) | < 0.1 | < 0.05 |
| FCP (First Contentful Paint) | < 1.8s | < 1.5s |
| TTI (Time to Interactive) | < 3.8s | < 3.5s |

### Image Optimization

#### Best Practices
```html
<!-- Responsive images with WebP -->
<picture>
  <source
    type="image/webp"
    srcset="image.webp 1x, image@2x.webp 2x"
  />
  <source
    type="image/jpeg"
    srcset="image.jpg 1x, image@2x.jpg 2x"
  />
  <img
    src="image.jpg"
    alt="Descriptive alt text"
    loading="lazy"
    decoding="async"
    width="800"
    height="600"
  />
</picture>
```

#### Image Optimization Checklist
- [ ] Use WebP format with fallbacks
- [ ] Implement lazy loading
- [ ] Specify width and height
- [ ] Use responsive images
- [ ] Optimize file sizes (< 200KB)
- [ ] Use CDN for images
- [ ] Add alt text for SEO

### CSS Optimization

#### Critical CSS
```html
<!-- Inline critical CSS -->
<style>
  /* Critical above-fold styles */
  :root {
    --color-primary: #007bff;
  }
  body {
    margin: 0;
    font-family: system-ui;
  }
  .hero {
    /* Hero section styles */
  }
</style>

<!-- Preload non-critical CSS -->
<link rel="preload" href="/styles/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

#### CSS Performance Tips
```css
/* Use CSS containment */
.component {
  contain: layout style paint;
}

/* Optimize animations */
.animated {
  will-change: transform;
  transform: translateZ(0); /* Hardware acceleration */
}

/* Avoid expensive selectors */
/* Bad */
div > ul > li > a.active { }

/* Good */
.nav-link--active { }
```

### JavaScript Optimization

#### Code Splitting
```javascript
// Dynamic imports for code splitting
const heavyModule = () => import('./heavy-module.js');

// Lazy load on interaction
button.addEventListener('click', async () => {
  const module = await heavyModule();
  module.doSomething();
});
```

#### Performance Patterns
```javascript
// Debounce scroll events
let ticking = false;
function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      // Handle scroll
      ticking = false;
    });
    ticking = true;
  }
}

// Use Intersection Observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Load content
    }
  });
});
```

### Resource Hints

```html
<!-- DNS Prefetch for external domains -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">

<!-- Preconnect for critical origins -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload critical resources -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>

<!-- Prefetch next page resources -->
<link rel="prefetch" href="/about">
```

### Caching Strategy

#### HTTP Headers
```nginx
# Static assets (1 year)
location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff2?)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

# HTML (no cache)
location ~* \.html$ {
  expires -1;
  add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

#### Service Worker (Optional)
```javascript
// Basic service worker for offline support
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        '/styles/main.css',
        '/scripts/main.js'
      ]);
    })
  );
});
```

### Bundle Size Optimization

#### Webpack/Vite Configuration
```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['sal.js'],
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      }
    }
  }
}
```

### Font Optimization

```css
/* Optimal font loading */
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/font.woff2') format('woff2');
  font-display: swap; /* Prevent FOIT */
  unicode-range: U+0000-00FF; /* Subset for performance */
}

/* System font stack fallback */
body {
  font-family: 'CustomFont', -apple-system, BlinkMacSystemFont,
               'Segoe UI', Roboto, sans-serif;
}
```

## Monitoring & Analytics

### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://ivanweissvanderpol.github.io/
          uploadArtifacts: true
```

### Performance Monitoring Tools

1. **Google PageSpeed Insights**
   - Mobile and desktop scores
   - Core Web Vitals
   - Actionable recommendations

2. **GTmetrix**
   - Waterfall analysis
   - Video playback
   - Historical tracking

3. **WebPageTest**
   - Multi-location testing
   - Connection throttling
   - Filmstrip view

### Analytics Implementation

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Mobile Optimization

### Responsive Design
```css
/* Mobile-first approach */
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Touch-friendly targets */
button, a {
  min-height: 44px;
  min-width: 44px;
}
```

### Mobile Performance
- Reduce JavaScript execution
- Optimize for 3G connections
- Minimize redirects
- Use adaptive images
- Enable text compression

## Accessibility SEO

### ARIA Labels
```html
<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="/">Home</a></li>
  </ul>
</nav>

<main role="main" aria-label="Main content">
  <h1>Page Title</h1>
</main>
```

### Semantic HTML
```html
<!-- Use proper heading hierarchy -->
<h1>Main Title</h1>
  <h2>Section Title</h2>
    <h3>Subsection Title</h3>

<!-- Use semantic elements -->
<article>
  <header>
    <h2>Article Title</h2>
  </header>
  <section>
    <p>Content</p>
  </section>
  <footer>
    <time datetime="2024-01-20">January 20, 2024</time>
  </footer>
</article>
```

## Performance Budget

### Resource Budgets
| Resource Type | Budget | Current |
|--------------|--------|---------|
| HTML | < 20 KB | - |
| CSS | < 50 KB | - |
| JavaScript | < 100 KB | - |
| Images | < 500 KB | - |
| Fonts | < 100 KB | - |
| Total | < 1 MB | - |

### Metric Budgets
| Metric | Budget |
|--------|--------|
| Lighthouse Performance | > 90 |
| Lighthouse SEO | > 95 |
| Lighthouse Accessibility | > 95 |
| Lighthouse Best Practices | > 95 |

## Continuous Optimization

### Regular Audits
- [ ] Weekly Lighthouse checks
- [ ] Monthly PageSpeed analysis
- [ ] Quarterly content audit
- [ ] Annual technical SEO review

### Optimization Checklist
- [ ] Compress images
- [ ] Minify CSS/JS
- [ ] Enable GZIP
- [ ] Optimize fonts
- [ ] Reduce redirects
- [ ] Minimize requests
- [ ] Use CDN
- [ ] Enable caching
- [ ] Remove unused code
- [ ] Optimize critical path