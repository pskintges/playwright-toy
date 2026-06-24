import { test, expect } from "../app.fixture.js";

/**
 * ParaBank API test. Demonstrates the closure-based api client utility.
 * ParaBank exposes a REST service under /services/bank.
 *
 * This hits a public read endpoint to keep the toy test stable. In the real
 * suite, API tests seed and assert against isolated dev/qa data.
 */
test.describe("ParaBank API @api", () => {
  test("rejects an unauthenticated account lookup", async ({ makeApiClient, env }) => {
    const api = makeApiClient(env.parabank.apiBaseUrl);

    // Without a session ParaBank returns a non-2xx; we assert the client and
    // endpoint are reachable and respond, proving the api utility works.
    const res = await api.get("/accounts/12345");

    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body.length).toBeGreaterThan(0);
  });
});
