import type { Page } from "@playwright/test";
import { childLogger } from "@common/logger/logger.js";

/**
 * ParaBank login component. Closure-based: a factory returns an object of
 * actions bound to a Page. No classes.
 */
export function createLoginComponent(page: Page) {
  const log = childLogger("parabank.login");

  return {
    async goto(webBaseUrl: string) {
      log.info({ webBaseUrl }, "navigating to login");
      await page.goto(`${webBaseUrl}/index.htm`);
    },
    async login(username: string, password: string) {
      log.info({ username }, "logging in");
      await page.fill('input[name="username"]', username);
      await page.fill('input[name="password"]', password);
      await page.click('input[value="Log In"]');
    },
    accountsOverviewHeading() {
      return page.locator("h1.title", { hasText: "Accounts Overview" });
    },
    errorMessage() {
      return page.locator("p.error");
    },
  };
}
