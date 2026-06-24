/**
 * Environment resolution for dev / qa tiers.
 *
 * The TEST_ENV variable selects which environment the suite runs against.
 * In CodeBuild this is injected per-project (codebuild-dev vs codebuild-qa)
 * or passed as an env var. Locally it defaults to "dev".
 *
 * This is the single source of truth for environment-specific values.
 * Tests and domains never hardcode URLs.
 */

export type EnvName = "dev" | "qa";

export interface AppEnv {
  webBaseUrl: string;
  apiBaseUrl: string;
}

export interface EnvConfig {
  name: EnvName;
  parabank: AppEnv;
  saucedemo: AppEnv;
}

const environments: Record<EnvName, EnvConfig> = {
  dev: {
    name: "dev",
    parabank: {
      webBaseUrl: "https://parabank.parasoft.com/parabank",
      apiBaseUrl: "https://parabank.parasoft.com/parabank/services/bank",
    },
    saucedemo: {
      webBaseUrl: "https://www.saucedemo.com",
      apiBaseUrl: "https://www.saucedemo.com",
    },
  },
  qa: {
    name: "qa",
    // For the toy repo these point at the same public sites.
    // In a real bank, qa would point at an isolated QA deployment.
    parabank: {
      webBaseUrl: "https://parabank.parasoft.com/parabank",
      apiBaseUrl: "https://parabank.parasoft.com/parabank/services/bank",
    },
    saucedemo: {
      webBaseUrl: "https://www.saucedemo.com",
      apiBaseUrl: "https://www.saucedemo.com",
    },
  },
};

export function resolveEnv(): EnvConfig {
  const raw = (process.env.TEST_ENV ?? "dev").toLowerCase();
  if (raw !== "dev" && raw !== "qa") {
    throw new Error(`Unknown TEST_ENV "${raw}". Expected "dev" or "qa".`);
  }
  return environments[raw];
}
