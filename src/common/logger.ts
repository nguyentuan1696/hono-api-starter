import type { Context, MiddlewareHandler } from "hono";
import { requestId } from "hono/request-id";
import { Logger as DrizzleLogger } from "drizzle-orm/logger";
import pino from "pino";
import { timeNow } from "@common/lib";

const isDevelopment = (process.env.NODE_ENV ?? "development") !== "production";
const requestIdMiddleware = requestId();

const getRequestLogFields = (c: Context, status?: number) => ({
  requestId: c.res.headers.get("X-Request-Id") ?? c.req.header("X-Request-Id"),
  method: c.req.method,
  path: c.req.path,
  status: status ?? c.res.status,
});

class Logger {
  private readonly instance = pino({
    level: process.env.LOG_LEVEL ?? "info",
    timestamp: () => `,"time":"${timeNow()}"`,
    formatters: {
      level: (label) => ({ level: label }),
    },
    transport: isDevelopment
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            ignore: "pid,hostname",
          },
        }
      : undefined,
  });

  info = (object: object, message: string) => {
    this.instance.info(object, message);
  };

  warn = (object: object, message: string) => {
    this.instance.warn(object, message);
  };

  debug = (object: object, message: string) => {
    this.instance.debug(object, message);
  };

  error = (object: object, message: string) => {
    this.instance.error(object, message);
  };

  logRequestError = (c: Context, error: unknown, message: string, response?: Response) => {
    this.error(
      {
        err: error,
        ...getRequestLogFields(c, response?.status),
      },
      message
    );
  };

  requestLogger: MiddlewareHandler = async (c, next) => {
    await requestIdMiddleware(c, next);

    if (c.res.status >= 400) {
      return;
    }

    this.info(getRequestLogFields(c), "request completed");
  };
}

export const logger = new Logger();

class DatabaseLogger implements DrizzleLogger {
  logQuery(query: string, params: unknown[]): void {
    const formattedQuery = query.replace(/\s+/g, " ").trim();

    logger.debug(
      {
        params,
      },
      `sql query: ${formattedQuery}`
    );
  }
}

export const drizzleLogger = new DatabaseLogger();
