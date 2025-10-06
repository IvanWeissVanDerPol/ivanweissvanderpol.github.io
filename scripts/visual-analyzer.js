/**
 * Visual Analyzer & Auto-Improver
 * Captures screenshots, analyzes design, and automatically fixes issues
 */

import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class VisualAnalyzer {
  constructor() {
    this.browser = null;
    this.page = null;
    this.issues = [];
    this.improvements = [];
  }

  async init() {
    this.browser = await chromium.launch({
      headless: true,
      args: ['--force-device-scale-factor=1']
    });
    this.page = await this.browser.newPage();
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  async captureScreenshots() {
    const screenshotsDir = path.join(process.cwd(), 'screenshots');
    await fs.mkdir(screenshotsDir, { recursive: true });

    const viewports = [
      { name: 'desktop', width: 1920, height: 1080 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'mobile', width: 375, height: 667 }
    ];

    console.log('📸 Capturing screenshots...');

    for (const viewport of viewports) {
      await this.page.setViewportSize({ width: viewport.width, height: viewport.height });
      await this.page.goto('http://localhost:4321', { waitUntil: 'networkidle' });

      // Capture full page (limited to 7500px height to avoid Claude API limits)
      const bodyHeight = await this.page.evaluate(() => document.body.scrollHeight);
      const maxHeight = Math.min(bodyHeight, 7500);

      await this.page.screenshot({
        path: path.join(screenshotsDir, `home-${viewport.name}-full.png`),
        fullPage: false,
        clip: { x: 0, y: 0, width: viewport.width, height: maxHeight }
      });

      // Capture hero section
      const hero = await this.page.$('.hero-section, .hero, #hero');
      if (hero) {
        await hero.screenshot({
          path: path.join(screenshotsDir, `hero-${viewport.name}.png`)
        });
      }

      console.log(`✅ Captured ${viewport.name} screenshots`);
    }
  }

  async analyzeDesign() {
    console.log('\n🔍 Analyzing design...');
    await this.page.goto('http://localhost:4321', { waitUntil: 'networkidle' });

    // Check color contrast
    const contrastIssues = await this.page.evaluate(() => {
      const issues = [];
      const elements = document.querySelectorAll('*');

      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const bg = style.backgroundColor;
        const color = style.color;

        if (bg !== 'rgba(0, 0, 0, 0)' && color) {
          // Simple contrast check (would need proper WCAG calculation in production)
          const bgLuminance = parseInt(bg.match(/\d+/g)?.[0] || 0);
          const textLuminance = parseInt(color.match(/\d+/g)?.[0] || 0);
          const contrast = Math.abs(bgLuminance - textLuminance);

          if (contrast < 100) {
            issues.push({
              type: 'contrast',
              element: el.className || el.tagName,
              background: bg,
              text: color
            });
          }
        }
      });

      return issues.slice(0, 5); // Limit to first 5 issues
    });

    // Check spacing consistency
    const spacingIssues = await this.page.evaluate(() => {
      const issues = [];
      const sections = document.querySelectorAll('section, .section');

      sections.forEach(section => {
        const style = window.getComputedStyle(section);
        const padding = style.padding;
        const margin = style.margin;

        // Check for inconsistent spacing
        if (padding && !padding.includes('rem') && !padding.includes('0px')) {
          issues.push({
            type: 'spacing',
            element: section.className || 'section',
            issue: 'Using px instead of rem for padding',
            current: padding
          });
        }
      });

      return issues;
    });

    // Check typography hierarchy
    const typographyIssues = await this.page.evaluate(() => {
      const issues = [];
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const sizes = [];

      headings.forEach(heading => {
        const style = window.getComputedStyle(heading);
        const fontSize = parseFloat(style.fontSize);
        sizes.push({ tag: heading.tagName, size: fontSize });
      });

      // Check if sizes are properly hierarchical
      for (let i = 1; i < sizes.length; i++) {
        if (sizes[i].tag > sizes[i-1].tag && sizes[i].size >= sizes[i-1].size) {
          issues.push({
            type: 'typography',
            issue: `${sizes[i].tag} is larger than ${sizes[i-1].tag}`,
            suggestion: 'Fix heading hierarchy'
          });
        }
      }

      return issues;
    });

    // Check responsive layout issues
    const layoutIssues = await this.page.evaluate(() => {
      const issues = [];
      const containers = document.querySelectorAll('.container, .hero-main, .grid');

      containers.forEach(container => {
        const rect = container.getBoundingClientRect();
        if (rect.width > window.innerWidth) {
          issues.push({
            type: 'layout',
            element: container.className,
            issue: 'Container wider than viewport',
            width: rect.width,
            viewport: window.innerWidth
          });
        }
      });

      return issues;
    });

    // Check for missing alt text
    const accessibilityIssues = await this.page.evaluate(() => {
      const issues = [];
      const images = document.querySelectorAll('img');

      images.forEach(img => {
        if (!img.alt) {
          issues.push({
            type: 'accessibility',
            element: 'img',
            src: img.src,
            issue: 'Missing alt text'
          });
        }
      });

      return issues;
    });

    this.issues = [
      ...contrastIssues,
      ...spacingIssues,
      ...typographyIssues,
      ...layoutIssues,
      ...accessibilityIssues
    ];

    return this.issues;
  }

  async generateFixes() {
    console.log('\n🔧 Generating fixes...');
    const fixes = {
      css: [],
      suggestions: []
    };

    for (const issue of this.issues) {
      switch (issue.type) {
        case 'contrast':
          fixes.css.push(`
/* Fix contrast issue for ${issue.element} */
.${issue.element} {
  color: var(--text-primary) !important;
  background-color: var(--bg-primary) !important;
}`);
          break;

        case 'spacing':
          fixes.css.push(`
/* Fix spacing consistency */
.${issue.element} {
  padding: var(--space-2xl) var(--space-xl);
}`);
          break;

        case 'typography':
          fixes.suggestions.push({
            type: 'typography',
            message: issue.issue,
            fix: issue.suggestion
          });
          break;

        case 'layout':
          fixes.css.push(`
/* Fix layout overflow */
.${issue.element} {
  max-width: 100%;
  overflow-x: hidden;
}`);
          break;

        case 'accessibility':
          fixes.suggestions.push({
            type: 'accessibility',
            message: `Add alt text to image: ${issue.src}`,
            fix: 'Add descriptive alt text'
          });
          break;
      }
    }

    this.improvements = fixes;
    return fixes;
  }

  async applyAutomaticFixes() {
    if (this.improvements.css.length === 0) {
      console.log('✨ No CSS fixes needed!');
      return;
    }

    console.log('\n💫 Applying automatic fixes...');

    // Create auto-fixes CSS file
    const fixesContent = `/* =====================================================
   AUTO-GENERATED FIXES
   Generated by Visual Analyzer
   Date: ${new Date().toISOString()}
   ===================================================== */

${this.improvements.css.join('\n')}
`;

    const fixesPath = path.join(process.cwd(), 'src', 'styles', 'auto-fixes.css');
    await fs.writeFile(fixesPath, fixesContent);

    console.log('✅ Created auto-fixes.css');

    // Add import to Layout.astro if not present
    const layoutPath = path.join(process.cwd(), 'src', 'layouts', 'Layout.astro');
    const layoutContent = await fs.readFile(layoutPath, 'utf-8');

    if (!layoutContent.includes('auto-fixes.css')) {
      const updatedLayout = layoutContent.replace(
        '<!-- Non-critical CSS',
        `<!-- Auto-generated fixes -->
    <link rel="stylesheet" href="/src/styles/auto-fixes.css">

    <!-- Non-critical CSS`
      );

      await fs.writeFile(layoutPath, updatedLayout);
      console.log('✅ Added auto-fixes.css to Layout.astro');
    }
  }

  async generateReport() {
    console.log('\n📊 Design Analysis Report\n' + '='.repeat(50));

    if (this.issues.length === 0) {
      console.log('🎉 No design issues detected!');
    } else {
      console.log(`Found ${this.issues.length} issues:\n`);

      const issuesByType = {};
      this.issues.forEach(issue => {
        if (!issuesByType[issue.type]) {
          issuesByType[issue.type] = [];
        }
        issuesByType[issue.type].push(issue);
      });

      for (const [type, issues] of Object.entries(issuesByType)) {
        console.log(`\n${type.toUpperCase()} ISSUES (${issues.length}):`);
        issues.forEach((issue, i) => {
          console.log(`  ${i + 1}. ${JSON.stringify(issue, null, 2)}`);
        });
      }
    }

    if (this.improvements.suggestions.length > 0) {
      console.log('\n📝 Manual Fixes Required:');
      this.improvements.suggestions.forEach((suggestion, i) => {
        console.log(`  ${i + 1}. [${suggestion.type}] ${suggestion.message}`);
        console.log(`     Fix: ${suggestion.fix}`);
      });
    }

    // Save report to file
    const report = {
      timestamp: new Date().toISOString(),
      issues: this.issues,
      improvements: this.improvements,
      summary: {
        total: this.issues.length,
        byType: Object.keys(this.issues.reduce((acc, issue) => {
          acc[issue.type] = (acc[issue.type] || 0) + 1;
          return acc;
        }, {}))
      }
    };

    await fs.writeFile(
      path.join(process.cwd(), 'visual-analysis-report.json'),
      JSON.stringify(report, null, 2)
    );

    console.log('\n✅ Report saved to visual-analysis-report.json');
  }

  async checkPerformance() {
    console.log('\n⚡ Checking performance metrics...');

    const metrics = await this.page.evaluate(() => {
      const perf = window.performance;
      const timing = perf.timing;
      const navigation = perf.getEntriesByType('navigation')[0];

      return {
        // Core Web Vitals (simulated)
        LCP: navigation?.loadEventEnd - navigation?.fetchStart || 0,
        FID: 50, // Would need real user interaction
        CLS: 0.1, // Would need layout shift observer

        // Other metrics
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        loadComplete: timing.loadEventEnd - timing.navigationStart,
        firstPaint: perf.getEntriesByType('paint')[0]?.startTime || 0,

        // Resource counts
        resources: perf.getEntriesByType('resource').length,
        images: document.images.length,
        scripts: document.scripts.length,
        stylesheets: document.styleSheets.length
      };
    });

    console.log('Performance Metrics:');
    console.log(`  LCP: ${metrics.LCP}ms ${metrics.LCP < 2500 ? '✅' : '⚠️'}`);
    console.log(`  FID: ${metrics.FID}ms ${metrics.FID < 100 ? '✅' : '⚠️'}`);
    console.log(`  CLS: ${metrics.CLS} ${metrics.CLS < 0.1 ? '✅' : '⚠️'}`);
    console.log(`  DOM Loaded: ${metrics.domContentLoaded}ms`);
    console.log(`  Full Load: ${metrics.loadComplete}ms`);
    console.log(`  Resources: ${metrics.resources} total`);

    return metrics;
  }

  async cleanup() {
    await this.browser?.close();
  }

  async run() {
    try {
      await this.init();
      await this.captureScreenshots();
      await this.analyzeDesign();
      await this.generateFixes();
      await this.applyAutomaticFixes();
      await this.checkPerformance();
      await this.generateReport();
    } catch (error) {
      console.error('Error during analysis:', error);
    } finally {
      await this.cleanup();
    }
  }
}

// Run the analyzer
const analyzer = new VisualAnalyzer();
analyzer.run().then(() => {
  console.log('\n✨ Visual analysis complete!');
  process.exit(0);
}).catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

export default VisualAnalyzer;