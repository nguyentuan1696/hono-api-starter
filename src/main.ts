import { Hono } from "hono";
import { logger } from "@common/logger";
import router from "./routes/index";

const app = new Hono();

app.use("*", logger.requestLogger);

app.route("/api/v1", router);

//TODO: add graceful shutdown support
export default {
  port: Number(process.env.PORT || 9096),
  fetch: app.fetch,
};
