import { test, expect } from '@playwright/test';

test('Task 2', async ({ page }) => {

  await page.goto('https://www.flipkart.com');

  await page.waitForTimeout(2000);

  const closeBtn = page.locator('//button[contains(text(),"✕")]');
  if (await closeBtn.isVisible()) {
    await closeBtn.click();
  }


  const searchBox = page.locator('//input[@name="q"]').first();
  await expect(searchBox).toBeEditable();

  await searchBox.fill('shoes');
  await searchBox.press('Enter');

  await expect(page).toHaveURL(/search/);

  const womenShoes = page.locator('//a[contains(translate(text(),"WOMEN","women"),"women")]');

  await expect(womenShoes).toHaveCount(await womenShoes.count());

  const textValue = await womenShoes.first().innerText();
  await expect(textValue.toLowerCase().includes('women')).toBeTruthy();

  await expect(page).toHaveTitle(/Flipkart/i);

//   await expect(page).toHaveScreenshot('flipkart_women_result.png');

  await page.waitForTimeout(2000);

  await page.screenshot({ path: `9MarchTask2.png`});

});