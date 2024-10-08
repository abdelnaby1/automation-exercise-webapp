import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: "./tests",
  /* Maximum time one test can run for. */
  // timeout: 70 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    // timeout: 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: [['list'],['allure-playwright'],["html"]],
  reporter: [["list"], ["html"]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    screenshot: "only-on-failure",
    headless: false,
    trace: "retain-on-failure",
  },

  projects: [
    {
      name: "staging",
      use: {
        // ...devices["Desktop Chrome"],
        baseURL: "https://automationexercise.com",
        // channel: "chrome", // if you want to run it in local browser
      },
      retries: 1,
    },
    // {
    //   name: "production",
    //   use: {
    //     // ...devices["Desktop Chrome"],
    //     baseURL: "https://automationexercise.com",
    //   },
    //   retries: 0,
    // },
    // {
    //   name: "dockerized",
    //   use: {
    //     // ...devices["Desktop Chrome"],
    //     baseURL: "https://automationexercise.com",
    //     headless: true,
    //   },
    //   retries: 1,
    // },
  ],
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
