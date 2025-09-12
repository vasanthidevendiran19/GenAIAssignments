import { test, chromium } from '@playwright/test';

/**
 * ICE POT Framework Implementation:
 * I - Initialize browser in headless mode
 * C - Create context and page, navigate to URL
 * E - Execute actions (set viewport)
 * P - Perform row count using locator
 * O - Output row count to console
 * T - Terminate browser
 */
test('Leafground Table - Count Rows (ICE POT)', async () => {
  // I: Initialize browser in headless mode
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  // C: Create page and navigate to the table page
  const page = await context.newPage();
  await page.goto('http://leafground.com/pages/table.html');

  // E: Execute actions (set viewport size)
  await page.setViewportSize({ width: 1280, height: 800 });

  // P: Perform row count
  const allRows = await page.locator('table#table_id tr').all();

  // O: Output row count
  console.log('Number of rows:', allRows.length);

  // T: Terminate browser
  await browser.close();
});