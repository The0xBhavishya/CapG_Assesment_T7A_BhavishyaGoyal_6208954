import {test} from "@playwright/test"

test("Samsung Mobiles", async ({page, context}) => {
    await page.goto("https://www.amazon.com/")
    await page.getByPlaceholder('Search Amazon').fill("samsung mobile")
    await page.keyboard.press("Enter")
    await page.waitForTimeout(2000)
    const product =  page.locator("//a[@class='a-link-normal s-line-clamp-2 puis-line-clamp-3-for-col-4-and-8 s-link-style a-text-normal']").first()
    await product.evaluate(el => el.setAttribute("target","_blank"))

    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        product.click()
    ])

    await newPage.waitForLoadState()
    const title = newPage.locator("span#productTitle")
    await page.waitForTimeout(2000)
    console.log(page.url())
    console.log(newPage.url())
    const productTitle = await title.textContent()
    console.log("Product Title:", productTitle)

    await newPage.close()
    await page.waitForTimeout(1000)
    await page.bringToFront()
    await page.screenshot({path:"Samsung.png"})
    await page.waitForTimeout(1000)

})