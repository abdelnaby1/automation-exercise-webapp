import { test, expect } from "../fixtures/pageFixtures";
import { getsRnadomProductName } from "../utils/getAllProducts";

test.describe("Search Products Suite", () => {
  test("TC012 - it should search for a product successfully", async ({
    page,
    homePage,
    prodcutsPage,
  }) => {
    await page.goto(homePage.url, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle("Automation Exercise");
    await homePage.clickProductsLink();
    expect(page.url()).toContain("/products");
    await expect(prodcutsPage.title).toBeVisible();
    let productName = await getsRnadomProductName();
    await prodcutsPage.searchForProduct(productName);
    expect(decodeURIComponent(page.url())).toContain(`search=${productName}`);
    let titles = await prodcutsPage.getTitles();
    for (let i = 0; i < titles.length; i++) {
      expect.soft(titles[i].toLowerCase()).toContain(productName.toLowerCase());
    }
  });
});
