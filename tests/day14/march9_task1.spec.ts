import { test, expect } from "@playwright/test";

test("qspider", async ({ page }) => {
  await page.setDefaultTimeout(20000);
  await page.goto("https://demoapps.qspiders.com/ui?scenario=1");
  let name = await page.getByLabel("name");
  let email = await page.getByLabel("email");
  let pass = await page.getByLabel("password");
  let submit = await page.getByRole("button", { name: "Register" });
  await name.fill("Bhavesh");
  await email.fill("Bhavesh@gmail.com");
  await pass.fill("Bhavesh1234@");
  await expect(name).toHaveValue("Bhavesh");
  await expect(email).toHaveValue("Bhavesh@gmail.com");
  await expect(pass).toHaveValue("Bhavesh1234@");
  await expect(submit).toBeVisible();
  await expect(submit).toBeInViewport();
  await submit.click();
  await page.waitForTimeout(2000);
  await page.screenshot({path:"Day14_Task1.png"})
});