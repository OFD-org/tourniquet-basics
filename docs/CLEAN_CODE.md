# Clean code

Rules for readable, maintainable TypeScript across the monorepo. Prefer clarity over cleverness.

## Principles

1. **One responsibility per unit** — a module, component, or function should do one job well.
2. **Name for intent** — `submitPollAnswer` over `handleClick` / `doStuff`.
3. **Small surfaces** — short functions; extract when a block needs its own name or tests.
4. **Explicit over implicit** — typed DTOs, clear return types at module boundaries.
5. **Delete dead code** — unused slices, routes, and commented blocks do not stay “for later”.

## Structure

| Do | Don't |
|----|--------|
| Feature folder: `Flow/Flow.tsx` + `index.ts` | Dump every page into a flat `pages/` list of unrelated files |
| Nest module owns controller, service, DTOs, entities | Put poll logic in `AppService` |
| Colocate page-only hooks under `pages/hooks/` | Inflate global `hooks/` with one-off form state |
| Barrel `index.ts` for public exports | Deep-import private internals across features |

## Naming

- **Components / pages:** `PascalCase` (`FeatureCard.tsx`)
- **Hooks:** `use` + camelCase (`usePoll.ts`)
- **Services / modules:** Nest conventions (`poll.service.ts`, `PollModule`)
- **DTOs:** `*.dto.ts` with class-validator
- **Types / interfaces:** descriptive nouns; avoid `I` prefix unless matching an existing file
- **Booleans:** `isLoading`, `hasToken`, `completed`

## TypeScript

- Prefer `unknown` + narrowing over `any`.
- Model API payloads with shared or mirrored types; keep web `poll.types.ts` in sync with API until a package exists.
- Avoid non-null assertions (`!`) unless the invariant is obvious and local.
- Do not silence errors with empty `catch` blocks.

```ts
// Bad
try {
  await pollApi.submitAnswer(payload);
} catch (e) {}

// Good
try {
  await pollApi.submitAnswer(payload);
} catch (error) {
  setError(getErrorMessage(error));
  throw error; // or return a typed Result
}
```

## React (`apps/web`)

- Functional components only.
- Side effects and fetching live in hooks, not deep in JSX.
- Redux is for **cross-cutting** state (loading, auth cache if added). Feature flow → local state / dedicated hook.
- Keep presentational components free of axios imports; call APIs via hooks or page containers.
- Prefer MUI `sx` / theme tokens over one-off magic colors when possible.
- User-facing copy: prefer i18n keys in `locales/`; avoid hardcoding new Ukrainian/English strings in components.

## NestJS (`apps/api`)

- Controllers: HTTP mapping + guards only.
- Services: business rules, persistence, validation beyond DTO shape.
- Validate input with DTOs (`class-validator`) and document with `@ApiProperty`.
- Never log secrets (`JWT_SECRET`, passwords, tokens).
- Fail loudly with Nest HTTP exceptions (`UnauthorizedException`, `NotFoundException`, …).

```ts
// Bad — business rule in controller
@Post('answer')
answer(@Body() body: SubmitAnswerDto) {
  if (body.questionId !== session.currentStep) throw new Error('bad step');
  return this.repo.save(...);
}

// Good — controller delegates
@Post('answer')
answer(@Body() body: SubmitAnswerDto, @Req() req: Request) {
  return this.pollService.submitAnswer(req.user.id, body);
}
```

## Error handling & security

- On 401, clear client auth state and send the user to login (existing axios interceptor pattern).
- Do not store passwords or long-lived secrets in `localStorage` beyond the JWT/session tokens already used.
- Sanitize assumptions about `synchronize: true` — it is not a migration strategy.

## Diff hygiene

- Change only what the task needs; no drive-by refactors in the same PR unless agreed.
- Match existing file style (quotes, imports, folder layout).
- New shared constants → one place (`constants/` or a future package), not duplicated literals.
- If you add a route or Navbar link, add the page (or remove the link).

## Checklist before merge

- [ ] New code lives in the right layer (see [ARCHITECTURE.md](./ARCHITECTURE.md))
- [ ] Names explain why the code exists
- [ ] No new `any` / empty catches without justification
- [ ] Types/DTOs updated on both sides if the contract changed
- [ ] Dead code from the change removed
- [ ] App still runs: `pnpm dev` (or filtered `dev:web` / `dev:api`)
