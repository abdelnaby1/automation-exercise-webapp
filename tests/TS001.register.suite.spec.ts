import { test, expect } from "../fixtures/pageFixtures";
import { person, emailAlreadyExists } from "../data/data.json"; // or use: import { persons } from '../data.json';

test.describe("Register Suite", () => {
  test.beforeEach(async ({ page, homePage, registerPage }) => {
    await page.goto(homePage.url, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle("Automation Exercise");
    await homePage.clickLoginLink();
    await expect(registerPage.signUpForm).toBeVisible();
    await expect(registerPage.signUpFormTitile).toBeVisible();
  });

  test("TC001 - it can register successfully", async ({
    homePage,
    registerPage,
    page,
  }) => {
    let email: string = `${person.username}${Date.now()}@gmail.com`;
    await registerPage.signup(person.name, email);
    await expect(page).toHaveURL(/.*signup/);

    await registerPage.completeSignup(person);
    await expect(registerPage.accountMsg).toBeVisible();
    await expect(registerPage.accountMsg).toContainText("Account Created!");

    await registerPage.continue();
    await expect(homePage.user).toContainText("Logged in as");
  });
  test.skip("TC003 - it can delete his account successfully", async ({
    homePage,
    registerPage,
    page,
  }) => {
    await homePage.deleteAccount();

    expect(registerPage.accountMsg).toContainText("Account Deleted!");

    await registerPage.continue();
  });
  test("TC002 - it can not register with email already exists", async ({
    homePage,
    registerPage,
    page,
  }) => {
    await homePage.clickLoginLink();
    await registerPage.signup(person.name, emailAlreadyExists);

    await expect(registerPage.signupErrorMsg).toContainText(
      "Email Address already exist!"
    );
  });
});
