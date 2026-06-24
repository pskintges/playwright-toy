import { baseTest, expect } from "@common/fixtures/base.fixture.js";
import { createSaucedemoDomain } from "../saucedemo/domains/saucedemo.domain.js";

/**
 * SauceDemo app fixture. Single import point for saucedemo tests.
 */
interface SaucedemoFixtures {
  saucedemo: ReturnType<typeof createSaucedemoDomain>;
}

const saucedemoTest = baseTest.extend<SaucedemoFixtures>({
  saucedemo: async ({ page }, use) => {
    await use(createSaucedemoDomain(page));
  },
});

export const test = saucedemoTest;
export { expect };
