import { defineConfig, devices } from "@playwright/test";
import { resolveEnv } from "./common/utils/env.config.js";

const env = resolveEnv();

/**
 * Playwright config for the toy monorepo.
 *
 * - Projects are split per app so CI can run them in a matrix.
 * - storageState is set at the project config level (mirrors real suite).
 * - JUnit + HTML reporters: JUnit feeds CodeBuild/Databricks, HTML for humans.
 * - TEST_ENV (dev|qa) drives base URLs via env.config.ts.
 */
export default defineConfig({
  testDir: "./apps",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ["list"],
    ["junit", { outputFile: "test-results/junit/results.xml" }],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "parabank",
      testDir: "./apps/parabank/tests",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: env.parabank.webBaseUrl,
        // storageState would be set here in the real suite for authed sessions:
        // storageState: "common/.auth/parabank.json",
      },
    },
    {
      name: "saucedemo",
      testDir: "./apps/saucedemo/tests",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: env.saucedemo.webBaseUrl,
        // storageState: "common/.auth/saucedemo.json",
      },
    },
  ],
});
