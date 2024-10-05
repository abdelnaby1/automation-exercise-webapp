import { test, expect } from "../fixtures/pageFixtures";

import { loggedInUser } from "../data/data.json"; // or use: import { persons } from '../data.json';
import storageState from "../storagestate.json";
test.describe("Logout Suite", () => {
  test.use({
    storageState: "stortagestate.json",
  });

  test("TC006 - it should logout successfully", async ({ page, homePage }) => {
    await page.goto(homePage.url, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(20000);
    await expect(homePage.user).toContainText(
      `Logged in as ${loggedInUser.firstName}`
    );

    await homePage.clickLogoutLink();

    await expect(page).toHaveURL(/(.*)\/login/);
  });
});
