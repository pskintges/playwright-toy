# qe-playwright-toy

A toy Playwright monorepo mirroring the `qe-playwright-suite` architecture,
built as the learning ground for an AWS Bedrock agentic QA pipeline.

## Architecture

- **common/** — shared layer
  - `fixtures/base.fixture.ts` — base test fixture (env + api client)
  - `utils/env.config.ts` — dev/qa environment resolution
  - `utils/api.client.ts` — closure-based API client utility
  - `logger/logger.ts` — Pino structured logging
- **apps/** — per-app suites, each with its own `app.fixture.ts` (single import point)
  - `parabank/` — banking app (UI + API tests)
  - `saucedemo/` — e-commerce app (UI tests)

## Patterns

- TypeScript, NodeNext module resolution
- Closure-based (functional) domains and components — no classes
- ESLint flat config bans `console` and direct `@playwright/test` imports
- Pino logging throughout
- Project-level config in `playwright.config.ts` (storageState-ready)

## Environments

`TEST_ENV` selects the tier:

```bash
TEST_ENV=dev npm test
TEST_ENV=qa  npm test
```

## Running

```bash
npm ci
npx playwright install --with-deps chromium
npm test                 # all apps
npm run test:parabank    # one app
npm run test:saucedemo
```

## CI

`buildspec.yml` runs the suite in AWS CodeBuild. Two projects
(`codebuild-dev`, `codebuild-qa`) inject `TEST_ENV` and push JUnit +
HTML output as artifacts to S3.
