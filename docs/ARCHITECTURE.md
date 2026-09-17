# Architecture

Shared context for how `tourniquet-basics` is structured and how pieces talk to each other.

## System overview

```
┌─────────────────────┐         HTTP + JWT          ┌─────────────────────┐
│  @tourniquet/web    │ ──────────────────────────► │  @tourniquet/api    │
│  React (CRA) :3000  │                             │  NestJS :8090       │
└─────────────────────┘                             └──────────┬──────────┘
                                                              │
                                                              ▼
                                                     ┌─────────────────────┐
                                                     │  PostgreSQL         │
                                                     └─────────────────────┘
```

| Layer | Package | Role |
|-------|---------|------|
| UI | `apps/web` | Training content, auth screens, poll flow |
| API | `apps/api` | Auth (JWT + Google), users, poll sessions |
| Shared libs | `packages/*` | Reserved — add shared types/config here when ready |

Orchestration: **Turborepo** + **pnpm workspaces**. Run apps from the repo root with filtered turbo tasks.

## Monorepo boundaries

- **Apps own runtime.** Do not import from `apps/web` into `apps/api` (or the reverse).
- **Share via `packages/`.** Types, validators, and constants that both apps need belong in a workspace package (e.g. `@tourniquet/poll-types`), not copy-pasted.
- **Config stays local** unless it is truly shared (ESLint/TS base configs can live in `packages/` later).

## Web (`apps/web`)

### Layers

| Folder | Responsibility |
|--------|----------------|
| `src/pages/` | Route screens; folder-per-page + `index.ts` barrel |
| `src/components/` | Cross-page UI (Navbar, routes, loaders) |
| `src/hooks/` | Reusable hooks (`useAuth`, `usePoll`, …) |
| `src/api/` | Axios client + endpoint modules (`authApi`, `pollApi`) |
| `src/store/` | Redux Toolkit — global concerns only (e.g. loading) |
| `src/theme/` | MUI theme (palette, typography, breakpoints) |
| `src/locales/` | i18n resources (default: `uk`) |

### UI data flow

1. Pages / hooks call `src/api/*`.
2. Axios attaches `Authorization: Bearer` from `localStorage.token` and drives the global loading slice.
3. Feature UI state stays in hooks / local state unless it must be global.
4. Auth redirects and guest routes live in `components/`; do not scatter token checks across pages without a shared helper.

### Main routes

| Path | Purpose |
|------|---------|
| `/` | Home / entry |
| `/flow` | Assessment poll |
| `/syndrome`, `/wound`, `/shift` | Training content |
| `/login`, `/signup`, `/auth/callback` | Auth |

## API (`apps/api`)

### Module map

| Module | Path | Owns |
|--------|------|------|
| Auth | `src/auth/` | Login, signup, JWT, Google OAuth |
| Users | `src/users/` | User entity, hashing, find-or-create |
| Poll | `src/poll/` | Sessions, answers, static question bank |

Follow Nest feature modules: **controller → service → entity/DTO**. Keep business rules in services, not controllers.

### Cross-cutting

- **Config:** `@nestjs/config` + `.env` (see `.env.example`).
- **DB:** TypeORM + PostgreSQL; entities colocated with their module.
- **API docs:** Swagger at `/api`.
- **CORS:** frontend origin (`FRONTEND_URL` / localhost:3000 in dev).

### Poll domain (session flow)

```
GET /poll/start | resume  →  session token + current question
POST /poll/answer         →  persist answer, next step or completed
GET /poll/results/:id     →  session results
```

Questions live in `src/poll/data/` (static for now). Sessions and answers are persisted entities.

## Auth contract

- Web stores JWT in `localStorage` under `token`.
- Poll session uses a separate opaque `poll_token`.
- Google OAuth: API → frontend `/auth/callback?token=...`.
- API guards protect poll and profile routes with Passport JWT.

## Dependency direction (keep this)

```
pages / components  →  hooks  →  api  →  axios
modules             →  services  →  entities / repositories
apps/*              →  packages/*   (never apps → apps)
```

## Evolution guidelines

- Prefer a new Nest module or web feature folder over growing a god-file.
- When poll types diverge between web and API, extract `@tourniquet/poll-types` under `packages/`.
- Treat `synchronize: true` as **dev-only**; plan migrations before production.
- Prefer env-driven API URLs on the web over hardcoded localhost.
