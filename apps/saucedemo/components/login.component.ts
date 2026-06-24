import type { Page } from "@playwright/test";
import { childLogger } from "@common/logger/logger.js";

/**
 * SauceDemo login component. Closure-based factory.
 */
export function createLoginComponent(page: Page) {
  const log = childLogger("saucedemo.login");

  return {
    async goto(webBaseUrl: string) {
      log.info({ webBaseUrl }, "navigating to login");
      await page.goto(webBaseUrl);
    },
    async login(username: string, password: string) {
      log.info({ username }, "logging in");
      await page.fill("#user-name", username);
      await page.fill("#password", password);
      await page.click("#login-button");
    },
    inventoryContainer() {
      return page.locator("#inventory_container");
    },
    errorMessage() {
      return page.locator('[data-test="error"]');
    },
  };
}
