import { test, expect } from "../fixtures/pageFixtures";
import { emailAlreadyExists } from "../data/data.json";
test.describe("Search Products Suite", () => {
  test.beforeEach(async ({ page, homePage }) => {
    await page.goto(homePage.url, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle("Automation Exercise");
  });
  test("TC013 - it should subscribed in home page by email successfully", async ({
    homePage,
  }) => {
    await homePage.scrollToFooter();
    await expect(homePage.subscribeTitle).toContainText("Subscription");

    await homePage.subscribe(emailAlreadyExists);
    await homePage.subscribeMsg.waitFor({ state: "attached" });
    await expect(homePage.subscribeMsg).toContainText(
      "You have been successfully subscribed!"
    );
  });

  test("TC014 - it should subscribed in cart page by email successfully", async ({
    homePage,
  }) => {
    await homePage.clickCartLink();
    await homePage.scrollToFooter();
    await expect(homePage.subscribeTitle).toContainText("Subscription");
    await homePage.subscribe(emailAlreadyExists);
    await homePage.subscribeMsg.waitFor({ state: "attached" });
    await expect(homePage.subscribeMsg).toContainText(
      "You have been successfully subscribed!"
    );
  });
});
