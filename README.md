# Hono API Starter

A backend API starter built with Hono, Bun, TypeScript, Drizzle ORM, and PostgreSQL.

## Overview

This project provides a foundation for building REST APIs with a modular structure that is easy to extend and maintain. The codebase separates concerns clearly across:
- HTTP routes
- controllers / services / repositories
- DTOs / validators / mappers
- database schema and migrations

The project currently includes a `categories` module with both public and internal APIs.

## Tech Stack

- Bun
- Hono
- TypeScript
- Drizzle ORM
- PostgreSQL
- Pino logger
- Wrangler

## Project Structure

```txt
src/
  common/         # logger, db, constants, shared helpers
  modules/        # business modules
  routes/         # root route registration
  tests/          # unit and integration tests
drizzle/          # migration files
```

## Available APIs

Base path:

```txt
/api/v1
```

Categories:
- `GET /api/v1/categories`
- `POST /api/v1/internal/categories`
- `GET /api/v1/internal/categories`
- `GET /api/v1/internal/categories/:id`
- `PUT /api/v1/internal/categories/:id`
- `DELETE /api/v1/internal/categories/:id`

## Requirements

- Bun
- Docker / Docker Compose
- PostgreSQL

## Installation

```sh
bun install
```

## Run Local Database

```sh
docker compose up -d
```

Local PostgreSQL settings:
- Host: `localhost`
- Port: `9632`
- Database: `local_dev_backend`
- User: `postgres`
- Password: `password`

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgres://postgres:password@localhost:9632/local_dev_backend
PORT=9096
NODE_ENV=development
```

## Run the Application

```sh
bun run dev
```

By default, the application runs at:

```txt
http://localhost:9096
```

## Useful Commands

```sh
make dev
make lint
make lint-fix
make format
make format-check
make db-generate
make db-migrate
make db-push
make db-push-force
make db-reset
```

## Database

The schema is defined in:

```txt
src/common/db/schema.ts
```

Migration files are stored in:

```txt
drizzle/
```

## Architecture

The project follows a modular structure. Each module is separated into:
- `*.controller.ts`
- `*.service.ts`
- `*.repository.ts`
- `*.dto.ts`
- `*.validator.ts`
- `*.mapper.ts`

This structure makes the code easier to maintain, test, and extend.

## Roadmap

The project can be extended with additional modules such as:
- documents
- tags
- series
- files

The schema for these entities is already defined in the database layer.

## TODO

- [ ] Update the logging system to provide a more consistent and structured logging strategy across the application.
- [ ] Revisit the error code system to standardize error definitions and response handling across all modules.

## License

Internal project.