# @tourniquet/api

NestJS backend for Tourniquet: auth, users, and poll sessions.

Part of the [tourniquet-basics](../../README.md) Turborepo. Shared rules: [Architecture](../../docs/ARCHITECTURE.md) · [Clean code](../../docs/CLEAN_CODE.md).

## Stack

- NestJS 10 + TypeScript
- TypeORM + PostgreSQL
- Passport JWT + Google OAuth 2.0
- Swagger (`/api`)
- class-validator / class-transformer

## Run

1. Copy env and fill values:

```bash
cp .env.example .env
```

2. From **repo root**:

```bash
pnpm dev:api
# or
pnpm dev
```

- API: http://localhost:8090  
- Swagger: http://localhost:8090/api  

## Environment

See `.env.example`:

| Variable | Purpose |
|----------|---------|
| `POSTGRES_*` | Database connection |
| `JWT_SECRET` | Access token signing |
| `GOOGLE_CLIENT_ID` / `SECRET` / `CALLBACK_URL` | Google OAuth |
| `FRONTEND_URL` | OAuth redirect target (e.g. `http://localhost:3000`) |

## Layout

```
src/
  auth/     # login, signup, JWT, Google strategies
  users/    # user entity + service
  poll/     # sessions, answers, question bank
  main.ts   # bootstrap (port 8090, CORS, Swagger)
```

## Modules & routes (high level)

| Area | Examples |
|------|----------|
| Auth | `POST /auth/login`, `POST /auth/signup`, `GET /auth/google`, `GET /auth/profile` |
| Poll | `GET /poll/start`, `GET /poll/resume`, `POST /poll/answer`, `GET /poll/results/:sessionId` |

Controllers stay thin; business rules live in services. DTOs validate input.

## Conventions (API)

- One Nest module per domain (`auth`, `users`, `poll`)
- `*.dto.ts` with validators + Swagger decorators
- Entities colocated under the module (`entities/`, or `user.entity.ts`)
- Do not import from `apps/web`

## Scripts

| Script | Notes |
|--------|--------|
| `dev` / `start:dev` | Watch mode |
| `build` | Compile → `dist/` |
| `start:prod` | `node dist/main` |
| `lint` | ESLint |
| `test` / `test:e2e` | Jest |

## Notes

- TypeORM `synchronize: true` is for local development — use migrations before production.
- CORS allows the web origin (`localhost:3000` / `FRONTEND_URL`).
