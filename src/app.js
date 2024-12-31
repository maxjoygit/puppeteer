import puppeteer from 'puppeteer';

import * as dotenv from 'dotenv'

dotenv.config()

try {

  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 50,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],

  });

  const context = await browser.createBrowserContext();

  const page = await context.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

  // Navigate the page to a URL.
  await page.goto('https://buddy.works/sign-in', { waitUntil: 'domcontentloaded' });

  // Set screen size.
  await page.setViewport({ width: 1920, height: 1080 });

  await page.mouse.move(200, 200);

  await page.mouse.click(200, 200);

  await page.waitForSelector('input[name="email"]', { visible: true });
  await page.waitForSelector('input[name="password"]', { visible: true });
  const submit = await page.waitForSelector('button[type="submit"]', { visible: true })

  await page.type('input[name="email"]', process.env.BUDDY_EMAIL); // Replace with your email/username

  await page.type('input[name="password"]', process.env.BUDDY_PASSWORD); // Replace with your password

  await submit.click()

  const region = await page.waitForSelector('a[href="/sign-in/region/US', { visible: true })

  await region.click()

  await browser.close();

} catch (error) {
  console.log(error.message)
}
