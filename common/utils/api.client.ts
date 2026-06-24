import type { APIRequestContext, APIResponse } from "@playwright/test";
import { childLogger } from "@common/logger/logger.js";

/**
 * Closure-based API client (functional, not class-based) mirroring the
 * real suite's preference. Wraps Playwright's APIRequestContext with
 * logging and a base URL so domain code stays clean.
 *
 * Usage:
 *   const api = createApiClient(request, env.parabank.apiBaseUrl);
 *   const res = await api.get("/accounts/12345");
 */
export interface ApiClient {
  get: (path: string, init?: RequestInit) => Promise<APIResponse>;
  post: (path: string, body?: unknown, init?: RequestInit) => Promise<APIResponse>;
  put: (path: string, body?: unknown, init?: RequestInit) => Promise<APIResponse>;
  delete: (path: string, init?: RequestInit) => Promise<APIResponse>;
}

interface RequestInit {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
}

export function createApiClient(
  request: APIRequestContext,
  baseUrl: string
): ApiClient {
  const log = childLogger("api-client");

  const url = (path: string) =>
    `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  return {
    async get(path, init) {
      const target = url(path);
      log.info({ method: "GET", target }, "api request");
      return request.get(target, {
        headers: init?.headers,
        params: init?.params,
      });
    },
    async post(path, body, init) {
      const target = url(path);
      log.info({ method: "POST", target }, "api request");
      return request.post(target, {
        headers: init?.headers,
        params: init?.params,
        data: body,
      });
    },
    async put(path, body, init) {
      const target = url(path);
      log.info({ method: "PUT", target }, "api request");
      return request.put(target, {
        headers: init?.headers,
        params: init?.params,
        data: body,
      });
    },
    async delete(path, init) {
      const target = url(path);
      log.info({ method: "DELETE", target }, "api request");
      return request.delete(target, {
        headers: init?.headers,
        params: init?.params,
      });
    },
  };
}
