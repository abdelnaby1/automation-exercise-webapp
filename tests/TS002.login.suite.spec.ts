import { test, expect } from "../fixtures/pageFixtures";
import { loggedInUser, invalidEmail, inValidPassword } from "../data/data.json";

test.describe("Login Suite", () => {
  test.beforeEach(async ({ page, homePage, loginPage }) => {
    await page.goto(homePage.url, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle("Automation Exercise");
    await homePage.clickLoginLink();
    await expect(loginPage.loginForm).toBeVisible();
    await expect(loginPage.loginFormTitile).toBeVisible();
    await expect(loginPage.loginFormTitile).toContainText(
      "Login to your account"
    );
  });

  test(
    "TC004 - it sohuld login with valid credidential",
    { tag: "@regression" },
    async ({ page, loginPage, homePage }) => {
      await loginPage.login(loggedInUser.email, loggedInUser.password);
      await expect(homePage.user).toContainText(
        `Logged in as ${loggedInUser.firstName}`
      );
      await page.context().storageState({ path: "storagestate.json" });

      // the below 2 lines were commented as we can use the session id and key of this user
      //   await homePage.clickLogoutLink();
      //   await expect(page).toHaveURL(/(.*)\/login/);
    }
  );

  test(
    "TC005 - it sohuld not login with invalid credidential",
    { tag: "@regression" },
    async ({ loginPage }) => {
      await loginPage.login(invalidEmail, inValidPassword);
      await expect(loginPage.loginErrorMsg).toContainText(
        "Your email or password is incorrect!"
      );
    }
  );
});
