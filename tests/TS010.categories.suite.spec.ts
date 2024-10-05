import { test, expect } from "../fixtures/pageFixtures";
import { categories } from "../data/data.json";
test.describe("Categories Suite", () => {
  test("TC019 - it should view products of a category", async ({
    page,
    homePage,
    prodcutsPage,
  }) => {
    await page.goto(homePage.url, { waitUntil: "domcontentloaded" });

    let count = await homePage.categories.count();
    for (let i = 0; i < count; i++) {
      await expect(homePage.categories.nth(i)).toBeVisible();
    }
    for (let i = 0; i < categories.length; i++) {
      await homePage.clickCategory(
        categories[i].category,
        categories[i].subcaregory
      );
      await expect(prodcutsPage.title).toContainText(
        `${categories[i].category} - ${categories[i].subcaregory}`
      );
    }
  });
});
