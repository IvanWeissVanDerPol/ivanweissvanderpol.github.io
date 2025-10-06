/**
 * Quick Website Checker
 * Simple script to verify website is working and capture current state
 */

import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function checkWebsite() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('🔍 Checking website at http://localhost:4321...\n');

  try {
    // Navigate to homepage
    await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });

    // Get page title
    const title = await page.title();
    console.log(`✅ Page Title: ${title}`);

    // Check if hero section exists
    const heroExists = await page.$('.hero-section, .hero, #hero') !== null;
    console.log(`${heroExists ? '✅' : '❌'} Hero Section: ${heroExists ? 'Found' : 'Not found'}`);

    // Check for main content areas
    const sections = await page.$$eval('section', sections => sections.length);
    console.log(`📊 Total Sections: ${sections}`);

    // Check for navigation
    const navExists = await page.$('nav, .nav, .navigation') !== null;
    console.log(`${navExists ? '✅' : '❌'} Navigation: ${navExists ? 'Found' : 'Not found'}`);

    // Get all text content to verify it's not empty
    const textContent = await page.evaluate(() => {
      const body = document.body;
      return body ? body.innerText.substring(0, 500) : 'No content';
    });

    console.log('\n📝 First 500 characters of content:');
    console.log(textContent);

    // Check background color
    const bgColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    console.log(`\n🎨 Background Color: ${bgColor}`);

    // Check for any console errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Take a simple screenshot
    const screenshotsDir = path.join(process.cwd(), 'screenshots');
    await fs.mkdir(screenshotsDir, { recursive: true });

    await page.screenshot({
      path: path.join(screenshotsDir, 'quick-check.png'),
      fullPage: false
    });
    console.log('\n📸 Screenshot saved to screenshots/quick-check.png');

    // Check all major components
    const components = [
      { selector: '.hero-content', name: 'Hero Content' },
      { selector: '.hero-stats, .value-props', name: 'Stats/Value Props' },
      { selector: '.projects, #projects', name: 'Projects Section' },
      { selector: '.skills, #skills', name: 'Skills Section' },
      { selector: '.work, #work', name: 'Work Section' },
      { selector: '.contact, #contact', name: 'Contact Section' }
    ];

    console.log('\n🔎 Component Check:');
    for (const component of components) {
      const exists = await page.$(component.selector) !== null;
      console.log(`  ${exists ? '✅' : '❌'} ${component.name}: ${exists ? 'Found' : 'Not found'}`);
    }

    // Get all headings to understand content structure
    const headings = await page.$$eval('h1, h2, h3', elements =>
      elements.map(el => ({
        tag: el.tagName,
        text: el.innerText.substring(0, 50)
      }))
    );

    console.log('\n📚 Headings Found:');
    headings.slice(0, 10).forEach(h => {
      console.log(`  ${h.tag}: ${h.text}`);
    });

    if (errors.length > 0) {
      console.log('\n❌ Console Errors:');
      errors.forEach(err => console.log(`  - ${err}`));
    } else {
      console.log('\n✅ No console errors detected');
    }

  } catch (error) {
    console.error('❌ Error checking website:', error.message);
  } finally {
    await browser.close();
  }

  console.log('\n✨ Quick check complete!');
}

// Run the check
checkWebsite().catch(console.error);