.PHONY: run dev lint lint-fix format format-check db-generate db-migrate db-push db-push-force db-reset

# Usage:
#   make dev            # run local server
#   make lint           # run eslint
#   make format         # format code with prettier
#   make db-generate    # generate drizzle migration from schema
#   make db-migrate     # apply generated drizzle migrations
#   make db-push        # push schema directly to database
#   make db-push-force  # push schema and auto-approve destructive changes
#   make db-reset       # drop and recreate public schema

DRIZZLE_CONFIG = drizzle.config.ts

# App
run:
	bun run dev

dev:
	bun run dev

# Quality
lint:
	bun run lint

lint-fix:
	bun run lint:fix

format:
	bun run format

format-check:
	bun run format:check

# Database / Drizzle
db-generate:
	bunx drizzle-kit generate --config $(DRIZZLE_CONFIG)

db-migrate:
	bunx drizzle-kit migrate --config $(DRIZZLE_CONFIG)

db-push:
	bunx drizzle-kit push --config $(DRIZZLE_CONFIG)

db-push-force:
	bunx drizzle-kit push --config $(DRIZZLE_CONFIG) --force

db-reset:
	node --input-type=module -e "import 'dotenv/config'; import pg from 'pg'; const { Client } = pg; const client = new Client({ connectionString: process.env.DATABASE_URL }); await client.connect(); try { await client.query('drop schema if exists public cascade'); await client.query('create schema public'); await client.query('grant all on schema public to public'); console.log('Database schema public has been reset.'); } finally { await client.end(); }"
