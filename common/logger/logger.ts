import pino from "pino";

/**
 * Central structured logger. ESLint bans console; everything logs through here.
 */
export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  formatters: {
    level: (label) => ({ level: label }),
  },
});

export function childLogger(scope: string) {
  return logger.child({ scope });
}
