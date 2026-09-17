# tourniquet-basics

Turborepo monorepo for the Tourniquet (turniket) training project under [OFD-org](https://github.com/OFD-org).

**Shared docs**

| Doc | What it covers |
|-----|----------------|
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | System map, app layers, auth & poll flow |
| [docs/CLEAN_CODE.md](./docs/CLEAN_CODE.md) | Naming, layering, React & Nest rules |
| [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) | Setup habits, PR expectations |
| [docs/POLL_FLOW.md](./docs/POLL_FLOW.md) | Decision-tree poll plan (implement next) |

Cursor rules in [`.cursor/rules/`](./.cursor/rules/) apply the same conventions in the editor.

## Apps

| App | Path | Stack | Docs |
|-----|------|-------|------|
| `@tourniquet/web` | `apps/web` | React (CRA), MUI, Redux Toolkit, i18n | [README](./apps/web/README.md) |
| `@tourniquet/api` | `apps/api` | NestJS, TypeORM, Postgres, Passport | [README](./apps/api/README.md) |

Origins: web from `oyakovytskyi/Dima_turniket` (poll); API from `oyakovytskyi/Dima_turniket_be`.

## Requirements

- Node.js 20+
- [pnpm](https://pnpm.io) 9+
- PostgreSQL (for API)

## Setup

```bash
pnpm install
cp apps/api/.env.example apps/api/.env   # fill in secrets
pnpm dev
```

- Web: http://localhost:3000  
- API: http://localhost:8090  
- Swagger: http://localhost:8090/api  

## Develop

```bash
pnpm dev          # web + api in parallel
pnpm dev:web      # frontend only
pnpm dev:api      # backend only
```

## Build / quality

```bash
pnpm build
pnpm lint
pnpm test
```

## Workspace layout

```
tourniquet-basics/
  apps/
    web/              # React training UI + poll
    api/              # NestJS API
  packages/           # shared libs (add as needed)
  docs/               # architecture, clean code, contributing
  .cursor/rules/      # AI / editor rules
  turbo.json
  pnpm-workspace.yaml
```

## Architecture (short)

Apps talk over HTTP with JWT. Web never imports from API source (and vice versa); share code only through `packages/*`. Details: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

Decision-tree poll: [docs/POLL_FLOW.md](./docs/POLL_FLOW.md) · content in `apps/api/src/poll/data/poll-flow.definition.ts` (Ukrainian, TCCC-aligned).
