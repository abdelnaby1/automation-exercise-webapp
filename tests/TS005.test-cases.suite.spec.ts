import { test, expect } from "../fixtures/pageFixtures";

test.describe("Test Cases Page Suite", () => {
  test("TC008 - it should see the test cases on test cases successfully", async ({
    page,
    homePage,
  }) => {
    await page.goto(homePage.url, { waitUntil: "domcontentloaded" });
    await homePage.clickTestCasesLink();

    expect(page.url()).toContain("/test_cases");
  });
});
