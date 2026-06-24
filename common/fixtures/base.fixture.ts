import { test as base, expect } from "@playwright/test";
import { resolveEnv, type EnvConfig } from "@common/utils/env.config.js";
import { createApiClient, type ApiClient } from "@common/utils/api.client.js";

/**
 * Base fixture shared by every app. Provides:
 *  - env: resolved dev/qa config
 *  - apiClient factory bound to a base URL
 *
 * App-level fixtures extend this via mergeTests in their own app.fixture.ts.
 * This base file is the only place that imports @playwright/test besides
 * the app fixtures (ESLint enforces this).
 */
export interface BaseFixtures {
  env: EnvConfig;
  makeApiClient: (baseUrl: string) => ApiClient;
}

export const baseTest = base.extend<BaseFixtures>({
  env: async ({}, use) => {
    await use(resolveEnv());
  },
  makeApiClient: async ({ request }, use) => {
    await use((baseUrl: string) => createApiClient(request, baseUrl));
  },
});

export { expect };
