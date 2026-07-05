import type { Context } from "hono";
import { timeNow } from "@common/lib";

interface SuccessResponse {
  code: number;
  message: string;
  data?: any;
  meta?: any;
  timestamp: string;
}

interface ErrorResponse {
  code: number;
  detail?: any;
  message: string;
  timestamp: string;
}

interface InternalErrorResponse {
  code: number;
  message: string;
  timestamp: string;
}

export class BaseController {
  success(c: Context, code: number, data?: any, meta?: any, message = "success") {
    const response: SuccessResponse = {
      code,
      message,
      timestamp: timeNow(),
    };

    if (data !== null) {
      response.data = data;
    }

    if (meta !== null) {
      response.meta = meta;
    }

    return c.json(response, 200);
  }

  badRequest(c: Context, code: number, message: string, detail?: any) {
    const response: ErrorResponse = {
      code,
      message,
      detail,
      timestamp: timeNow(),
    };

    return c.json(response, 400);
  }

  internalError(c: Context, code: number, message: string) {
    const response: InternalErrorResponse = {
      code,
      message,
      timestamp: timeNow(),
    };

    return c.json(response, 500);
  }
}

export const baseController = new BaseController();
