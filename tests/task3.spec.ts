import {test} from "@playwright/test"

test("task3",async({page})=>{
    await page.goto("https://demoapps.qspiders.com/ui?scenario=1");
    await page.locator('//input[@id="name"]').fill("Bhavishya12u");
    await page.locator('//input[@id="email"]').fill("bhavishya0110@gmail.com");
    await page.locator('//input[@id="password"]').fill("Bhavishya@12u");
    await page.locator('button[type="submit"]').click();
    await page.locator('//input[@id="email"]').fill("bhavishya0110@gmail.com");
    await page.locator('//input[@id="password"]').fill("Bhavishya@12u");
        await page.locator('button[type="submit"]').click();
        await page.screenshot({ path:'task3.png'});

});