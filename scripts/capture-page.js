import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function capturePage(url, name) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  await page.goto(url, { waitUntil: 'networkidle' });

  const screenshotsDir = path.join(process.cwd(), 'screenshots');
  await fs.mkdir(screenshotsDir, { recursive: true });

  await page.screenshot({
    path: path.join(screenshotsDir, `${name}.png`),
    fullPage: true
  });

  console.log(`✅ Captured ${name}`);
  await browser.close();
}

// Capture both pages
(async () => {
  await capturePage('http://localhost:4321/simple-test', 'simple-test');
  await capturePage('http://localhost:4321/', 'homepage-current');
  console.log('✨ Done!');
})();