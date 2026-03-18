import { test, expect } from "@playwright/test";
import { UploadPage } from "../../PageObjectModel/task1.page";
import data from '../../testdata/task.json'

test("E2E File Upload → Validate Uploaded File Name", async ({ page }) => {
  const uploadPage = new UploadPage(page);
  await uploadPage.navigate();
  await uploadPage.uploadFile(data.filePath);
  await uploadPage.clickUpload();
  const actualFileName = await uploadPage.getUploadedFileName();
  expect(actualFileName?.trim()).toBe(data.expectedFileName);
  await page.screenshot({
    path: "day22_task1.png",
    fullPage: true,
  });
});