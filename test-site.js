const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  console.log('Navigating to homepage...');
  await page.goto('https://mcki-web-1090728564162.us-central1.run.app', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'home.png' });
  
  console.log('Navigating to /education...');
  await page.goto('https://mcki-web-1090728564162.us-central1.run.app/education', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'education.png' });
  
  console.log('Navigating to /ai...');
  await page.goto('https://mcki-web-1090728564162.us-central1.run.app/ai', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'ai.png' });
  
  console.log('Navigating to /live...');
  await page.goto('https://mcki-web-1090728564162.us-central1.run.app/live', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'live.png' });
  
  await browser.close();
  console.log('Done.');
})();
