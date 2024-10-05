import { test, expect } from "../fixtures/pageFixtures";
import { personData, emailAlreadyExists } from "../data/data.json"; // or use: import { persons } from '../data.json';

test.describe("Register Suite", () => {
  test.beforeEach(async ({ page, homePage, registerPage }) => {
    await page.goto(homePage.url, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle("Automation Exercise");
    await homePage.clickLoginLink();
    await expect(registerPage.signUpForm).toBeVisible();
    await expect(registerPage.signUpFormTitile).toBeVisible();
  });

  test(
    "TC001 - it can register successfully",
    { tag: "@regression" },
    async ({ homePage, registerPage, page }) => {
      let email: string = `${personData.username}${Date.now()}@gmail.com`;
      await registerPage.signup(personData.name, email);
      await expect(page).toHaveURL(/.*signup/);
      await registerPage.completeSignup(personData);
      await expect(registerPage.accountMsg).toBeVisible();
      await expect(registerPage.accountMsg).toContainText("Account Created!");
      await registerPage.continue();
      await expect(homePage.user).toContainText("Logged in as");
    }
  );

  test.skip("TC003 - it can delete his account successfully", async ({
    homePage,
    registerPage,
  }) => {
    await homePage.deleteAccount();
    expect(registerPage.accountMsg).toContainText("Account Deleted!");
    await registerPage.continue();
  });

  test(
    "TC002 - it can not register with email already exists",
    { tag: "@regression" },
    async ({ homePage, registerPage }) => {
      await homePage.clickLoginLink();
      await registerPage.signup(personData.name, emailAlreadyExists);
      await expect(registerPage.signupErrorMsg).toContainText(
        "Email Address already exist!"
      );
    }
  );
});
