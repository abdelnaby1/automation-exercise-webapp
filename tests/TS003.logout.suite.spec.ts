import { test, expect } from "../fixtures/pageFixtures";

import { loggedInUser } from "../data/data.json"; // or use: import { persons } from '../data.json';
test.describe("Logout Suite", () => {
  // test.use({
  //   storageState: "storgageForLogout.json",
  // });

  test("TC006 - it should logout successfully", async ({
    page,
    homePage,
    loginPage,
  }) => {
    await page.goto(homePage.url, { waitUntil: "domcontentloaded" });
    await homePage.clickLoginLink();
    await loginPage.login(loggedInUser.email, loggedInUser.password);
    await expect(homePage.user).toContainText(
      `Logged in as ${loggedInUser.firstName}`
    );
    await homePage.clickLogoutLink();
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL(/(.*)\/login/);
  });
});
