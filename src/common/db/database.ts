import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { drizzleLogger } from "@common/logger";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, {
  logger: process.env.NODE_ENV === "development" ? drizzleLogger : false,
});
