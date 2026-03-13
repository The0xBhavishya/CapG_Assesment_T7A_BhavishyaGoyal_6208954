import { test, expect } from "@playwright/test";
import path from "node:path";

test("user_registration task 20", async ({ page }) => {
  await page.goto("https://demoqa.com/upload-download");
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.locator("#downloadButton").click()
  ]);
  await download.saveAs(`C:\\Users\\${process.env.USERNAME}\\Downloads\\sampleFile.jpeg`);
  let image = `C:\\Users\\${process.env.USERNAME}\\Downloads\\sampleFile.jpeg`;
  await page.locator("#uploadFile").setInputFiles(image);
  await page.waitForTimeout(2000);
  await expect(page.locator("#uploadedFilePath")).toContainText(
    "sampleFile.jpeg",
  );
});