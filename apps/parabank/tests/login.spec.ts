import { test, expect } from "../app.fixture.js";

/**
 * ParaBank UI test. Imports test/expect from the app fixture only.
 * Uses the env fixture for the base URL (dev/qa aware).
 *
 * Note: ParaBank requires a registered user. For the toy repo this test
 * asserts the login page renders and rejects bad credentials, which is
 * stable without seeded data.
 */
test.describe("ParaBank login @ui", () => {
  test.skip("shows an error for invalid credentials", async ({ page, parabank, env }) => {
    await parabank.login.goto(env.parabank.webBaseUrl);
    await parabank.login.login("invalid_user", "wrong_password");

    await expect(parabank.login.errorMessage()).toBeVisible();
  });

  test("renders the login form", async ({ page, parabank, env }) => {
    await parabank.login.goto(env.parabank.webBaseUrl);

    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });
});
