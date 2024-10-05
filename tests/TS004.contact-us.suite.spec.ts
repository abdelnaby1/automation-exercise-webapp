import { test, expect } from "../fixtures/pageFixtures";
import { loggedInUser } from "../data/data.json";
test.describe("Contact Us Suite", () => {
  test("TC007 - it should contact with us successfully", async ({
    page,
    homePage,
    contactUsPage,
  }) => {
    await page.goto(homePage.url, { waitUntil: "domcontentloaded" });

    await homePage.clickContactUsLink();

    expect(page.url()).toContain("/contact_us");

    await expect(contactUsPage.title).toBeVisible();
    await expect(contactUsPage.title).toContainText("Get In Touch");
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
    await contactUsPage.fillTheForm(
      loggedInUser.firstName,
      loggedInUser.email,
      loggedInUser.contactUsSubject,
      loggedInUser.contactUsMessage,
      loggedInUser.contactUsFileName
    );
    await contactUsPage.status.waitFor({ state: "visible" });
    await expect(contactUsPage.status).toContainText(
      "Success! Your details have been submitted successfully."
    );
    await contactUsPage.clickHomeBtn();
    expect(page.url()).toBe("https://automationexercise.com/");
  });
});
