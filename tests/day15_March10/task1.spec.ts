import {expect, test} from "@playwright/test";

test("Lenskart", async ({page}) =>{
    await page.goto('https://www.lenskart.com/');
    await page.hover('//a[@id="lrd9"]');
    const bangalore = page.locator("//a[@class='sc-2ea48804-9 byBHlR getGaData']").nth(1);
    await expect(bangalore).toBeVisible();
    await bangalore.click();
    console.log(await page.url());
    await page.screenshot({path: "lenskart.png"});
    await page.waitForTimeout(5000);
})