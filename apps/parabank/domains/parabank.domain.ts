import type { Page } from "@playwright/test";
import { createLoginComponent } from "../components/login.component.js";

/**
 * ParaBank domain. Composes components into higher-level workflows.
 * Closure-based factory pattern.
 */
export function createParabankDomain(page: Page) {
  const login = createLoginComponent(page);

  return {
    login,
    async loginFlow(webBaseUrl: string, username: string, password: string) {
      await login.goto(webBaseUrl);
      await login.login(username, password);
    },
  };
}
