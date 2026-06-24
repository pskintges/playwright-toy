import { test, expect } from "../app.fixture.js";

/**
 * SauceDemo UI login test. SauceDemo provides stable demo credentials,
 * so this test does a full successful login against the env base URL.
 */
test.describe("SauceDemo login @ui", () => {
  test("logs in with standard_user and reaches inventory", async ({
    saucedemo,
    env,
  }) => {
    await saucedemo.loginFlow(env.saucedemo.webBaseUrl, "standard_user", "secret_sauce");

    await expect(saucedemo.login.inventoryContainer().first()).toBeVisible();
  });

  test("rejects a locked out user", async ({ saucedemo, env }) => {
    await saucedemo.loginFlow(env.saucedemo.webBaseUrl, "locked_out_user", "secret_sauce");

    await expect(saucedemo.login.errorMessage()).toBeVisible();
  });
});
