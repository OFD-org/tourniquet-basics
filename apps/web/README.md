# @tourniquet/web

React (CRA) frontend for Tourniquet training content and the assessment poll.

Part of the [tourniquet-basics](../../README.md) Turborepo. Shared rules: [Architecture](../../docs/ARCHITECTURE.md) · [Clean code](../../docs/CLEAN_CODE.md).

## Stack

- React 19 + TypeScript (Create React App / `react-scripts`)
- MUI 7 + Emotion
- Redux Toolkit (global loading)
- React Router 7
- axios + i18next (`uk`)

## Run

From **repo root** (preferred):

```bash
pnpm dev:web
# or
pnpm dev
```

App URL: http://localhost:3000  
API URL: set `REACT_APP_API_URL` (defaults to http://localhost:8090)

## Layout

```
src/
  api/           # axios + authApi / pollApi
  components/    # Navbar, loaders, route guards
  hooks/         # useAuth, usePoll, …
  pages/         # route screens (folder-per-page)
  store/         # Redux slices
  theme/         # MUI theme
  locales/uk/    # translations
```

## Conventions (web)

- New screens → `src/pages/<Name>/<Name>.tsx` + `index.ts`
- Cross-page UI → `src/components/`
- HTTP only via `src/api/` (no axios inside presentational components)
- Feature state in hooks/local state; Redux for cross-cutting only
- Prefer i18n keys over hardcoded UI strings

## Scripts

| Script | Notes |
|--------|--------|
| `dev` / `start` | CRA dev server |
| `build` | Production build → `build/` |
| `test` | CRA test runner |
| `lint` | Placeholder — tighten when ESLint is wired at workspace level |
