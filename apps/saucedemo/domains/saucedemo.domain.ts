import type { Page } from "@playwright/test";
import { createLoginComponent } from "../components/login.component.js";

/**
 * SauceDemo domain. Composes components into workflows.
 */
export function createSaucedemoDomain(page: Page) {
  const login = createLoginComponent(page);

  return {
    login,
    async loginFlow(webBaseUrl: string, username: string, password: string) {
      await login.goto(webBaseUrl);
      await login.login(username, password);
    },
  };
}
