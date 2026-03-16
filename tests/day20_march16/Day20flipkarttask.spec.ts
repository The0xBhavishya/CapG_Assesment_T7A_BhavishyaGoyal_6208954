import { test, expect } from "@playwright/test";
import { flipkartE2E } from "../../PageObjectModel/Day20flipkarttask.page";
test("flipkart_senario E2E", async ({ page }) => {
  await page.goto("https://www.flipkart.com");
  await page.locator(".b3wTlE").click();
  let flipkart = new flipkartE2E(page);
  await flipkart.HomeBtn.click();
  await flipkart.GudiPadwaStoreImg.click();
  await flipkart.Deal5.click();
  let [page2] = await Promise.all([
    page.waitForEvent("popup"),
    flipkart.Prod1.click(),
  ]);
  await flipkart.addToCart(page2);
  await page2.close();
  await page.goBack();
  await flipkart.Deal8.click();
  [page2] = await Promise.all([
    page.waitForEvent("popup"),
    flipkart.Prod1.click(),
  ]);
  await flipkart.addToCart(page2);
  await page2.close();
  await flipkart.CartBtn.click();
  await page.screenshot({ path: "day20-March16_flipkartE2E.png" });
});