import { Locator, Page } from "@playwright/test";

export class flipkartE2E {
  HomeBtn: Locator;
  GudiPadwaStoreImg: Locator;
  Deal5: Locator;
  Prod1: Locator;
  AddtoCart: Locator;
  Deal8: Locator;
  CartBtn: Locator;

  constructor(page: Page) {
    this.HomeBtn = page.locator(
      '//div[@class="css-g5y9jx"]//div[text()="Home"]',
    );
    this.GudiPadwaStoreImg = page.locator(
      '//*[@id="slot-list-container"]/div/div[5]/div/div/div/div/div/div/div/div/div/div[2]/div/div[1]/div/div/div/a/div/picture/img',
    );
    this.Deal5 = page.locator('//div[@class="pU9R5m"][5]').first();
    this.Deal8 = page.locator(
      '//*[@id="slot-list-container"]/div/div[3]/div/div/div/div/div/div/div/div/div/div[2]/div/div[2]/div/div/div',
    );
    this.Prod1 = page.locator('//div[@class="RGLWAk"]').first();
    this.AddtoCart = page.locator('//div[text()="Add to cart"]');
    this.CartBtn = page.locator(".WGWdFn");
  }
  async addToCart(page2: Page) {
    await page2.locator('//div[text()="Add to cart"]').click();
  }
}