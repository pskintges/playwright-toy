import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Mirror real suite: force structured logging, no console
      "no-console": "error",
      // Force tests to import from the app fixture, never @playwright/test directly
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@playwright/test",
              message:
                "Import test/expect from your app fixture (app.fixture.ts), not @playwright/test directly.",
            },
          ],
        },
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
    },
  },
  {
    // The fixture layer is allowed to import @playwright/test
    files: [ "common/fixtures/**",
      "**/*.fixture.ts",
      "playwright.config.ts",
      "**/components/**",
      "**/domains/**",],
    rules: {
      "no-restricted-imports": "off",
    },
  },
  {
    ignores: ["node_modules", "test-results", "playwright-report", "dist"],
  }
);
