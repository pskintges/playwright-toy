import { baseTest, expect } from "@common/fixtures/base.fixture.js";
import { createParabankDomain } from "../parabank/domains/parabank.domain.js";

/**
 * ParaBank app fixture. This is the SINGLE import point for parabank tests.
 * Tests import { test, expect } from here, never from @playwright/test.
 *
 * mergeTests combines the shared base fixture with parabank-specific fixtures.
 */
interface ParabankFixtures {
  parabank: ReturnType<typeof createParabankDomain>;
}

const parabankTest = baseTest.extend<ParabankFixtures>({
  parabank: async ({ page }, use) => {
    await use(createParabankDomain(page));
  },
});

export const test = parabankTest;
export { expect };
