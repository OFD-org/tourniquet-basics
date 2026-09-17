# tourniquet-basics

Turborepo monorepo for the Tourniquet (turniket) project under [OFD-org](https://github.com/OFD-org).

## Apps

| App | Path | Stack | Origin |
|-----|------|-------|--------|
| `@tourniquet/web` | `apps/web` | React (CRA) | `oyakovytskyi/Dima_turniket` → `poll` |
| `@tourniquet/api` | `apps/api` | NestJS | `oyakovytskyi/Dima_turniket_be` |

## Requirements

- Node.js 20+
- [pnpm](https://pnpm.io) 9+

## Setup

```bash
pnpm install
cp apps/api/.env.example apps/api/.env   # fill in secrets
```

## Develop

```bash
pnpm dev          # web + api in parallel
pnpm dev:web      # frontend only
pnpm dev:api      # backend only
```

## Build

```bash
pnpm build
```

## Workspace layout

```
tourniquet-basics/
  apps/
    web/          # React poll UI
    api/          # NestJS API
  packages/       # shared libs (add as needed)
  turbo.json
  pnpm-workspace.yaml
```
