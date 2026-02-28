import {selectors, test} from "@playwright/test"
// import { text } from "stream/consumers"

test("task4", async ({page}) => {
await page.goto("https://www.olympics.com/en/olympic-games/tokyo-2020")
await page.locator('//a[@class="Button-styles__Button-sc-37ebb3b-0 eEVWbV cta cta-button"]').click()

    let b = await page.locator('(//span[@class="OcsText-styles__StyledText-sc-bf256156-0 cjPVFu text--sm-body"])[6]').textContent()
    console.log(b);
    await page.waitForTimeout(5000)
    await page.screenshot({path:"task4.png", fullPage:true})

})