# Contributing

How we work in this Turborepo. Read with [ARCHITECTURE.md](./ARCHITECTURE.md) and [CLEAN_CODE.md](./CLEAN_CODE.md).

## Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL for `@tourniquet/api`

## Setup

```bash
pnpm install
cp apps/api/.env.example apps/api/.env   # fill Postgres, JWT, Google, FRONTEND_URL
pnpm dev                                 # web :3000 + api :8090
```

## Commands (from repo root)

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Both apps |
| `pnpm dev:web` / `pnpm dev:api` | One app |
| `pnpm build` | Build all |
| `pnpm lint` / `pnpm test` | Turbo pipeline |

Prefer root scripts over `cd apps/... && npm …` so workspace and turbo stay consistent.

## Branch & PR habits

1. One concern per PR (feature, fix, or docs — not all three mixed).
2. Keep diffs focused; no unrelated formatting sweeps.
3. Update docs when you change architecture, env vars, or public API routes.
4. If you introduce a shared type used by web and api, put it under `packages/` instead of duplicating.

## Definition of done

- Behavior matches the ticket / request
- Follows [clean code](./CLEAN_CODE.md) and [architecture](./ARCHITECTURE.md) boundaries
- Env examples updated if new secrets/config were added
- Manual smoke: login (or guest path) + the screen you touched

## Where to put new code

| Change | Location |
|--------|----------|
| New screen | `apps/web/src/pages/<Name>/` |
| Shared UI | `apps/web/src/components/` |
| API endpoint | Nest module under `apps/api/src/<feature>/` |
| Shared types | `packages/<name>/` (create package; do not cross-import apps) |

## Agent / AI notes

Cursor rules under `.cursor/rules/` mirror these docs. Prefer editing code to match existing patterns over inventing a second architecture.
