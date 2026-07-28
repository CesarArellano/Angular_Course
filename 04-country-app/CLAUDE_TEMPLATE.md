# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Template for Angular v22 projects. Every `<!-- fill in -->` block is a placeholder —
> verify against this repo's actual `angular.json`, `package.json`, and existing components
> before relying on any of it. Delete this blockquote once filled in.

## Project overview

<!-- fill in: one paragraph — what the app does, who uses it, key domain concepts/vocabulary
     a new contributor would need. -->

## Commands

- `npm start` / `ng serve` — dev server (default http://localhost:4200), reloads on save.
- `ng build` — production build to `dist/`.
- `ng build --configuration development` — unminified dev build.
- `ng test` — run the unit test suite.
- `ng test --watch=false` — single run (CI).
- <!-- fill in: how to run a single test file/spec, e.g. `ng test --include='**/user-list.spec.ts'` -->
- <!-- fill in: lint command, e.g. `ng lint` if @angular-eslint is configured -->
- <!-- fill in: e2e command if a runner (Playwright/Cypress) is present -->
- `ng generate component path/to/name` — scaffold a standalone component (confirm this repo's
  naming convention below before using generators as-is).

## Architecture

### Standalone-first

Angular v22 apps are standalone by default — no NgModules. Every component/directive/pipe
declares its own `imports: []`. Don't introduce NgModules unless the codebase already uses
them for a specific legacy reason (check `app.config.ts` for `bootstrapApplication` +
`ApplicationConfig`, not `AppModule`/`platformBrowserDynamic`).

### Signals over decorators/RxJS where equivalent

- Use `input()` / `input.required()` and `output()` instead of `@Input()`/`@Output()` decorators.
- Use `model()` for two-way bindable component state.
- Use `signal()` + `computed()` for local component state; use `effect()` sparingly and only
  for genuine side effects (not for deriving state — use `computed()` for that).
- Keep RxJS for genuinely async streams (HTTP, WebSockets, router events) and interop via
  `toSignal()`/`toObservable()` at the boundary.

### Async data with `resource()`

For data that depends on reactive state (route params, signals, form values), prefer `resource()`
(or `httpResource()` when the source is `HttpClient`) over manual `effect()` + subscription
plumbing:

- `params` is a reactive computation — read the signals the fetch depends on here, not inside
  `loader`. When `params` changes, the loader reruns automatically and any in-flight request is
  aborted via the provided `abortSignal` (always pass it to `fetch`/`HttpClient` calls that
  support cancellation).
- Read state via the resource's own signals: `value()`, `hasValue()` (type-guard), `isLoading()`,
  `error()`, `status()` (`'idle' | 'loading' | 'resolved' | 'error' | 'reloading' | 'local'`).
  Drive templates off these instead of hand-rolled loading/error booleans.
- Use `httpResource()` over a raw `resource()` + `fetch` when calling this app's HTTP layer —
  it goes through `HttpClient` (interceptors, base URL config) while keeping the same
  resource-signal API.
- Reserve `.reload()` for explicit user-triggered refetch (e.g. a retry button) and
  `.value.set(...)` for optimistic local updates (status becomes `'local'`) — don't reach for
  `effect()` to sync resource state elsewhere; read the signals directly or derive with
  `computed()`.

### New control-flow syntax

Use built-in control flow in templates — `@if`/`@else`, `@for`, `@switch`/`@case`, `@empty` —
instead of `*ngIf`/`*ngFor`/`*ngSwitch` structural directives. `@for` requires a `track`
expression; always track by a stable identity (id), not index, unless the list is static.

### Change detection (zoneless)

Prefer `ChangeDetectionStrategy.OnPush` on every component — as of v22 this is the framework
default (`ChangeDetectionStrategy.Default` was renamed `Eager`), and OnPush is the
recommended baseline even outside zoneless apps. Confirm whether `app.config.ts` calls
`provideZonelessChangeDetection()` (no `zone.js` import/polyfill); if so:

- Zoneless Angular does **not** poll for changes on every browser event. It only schedules
  change detection in response to specific notifications: a signal read in a template being
  updated, `ChangeDetectorRef.markForCheck()`, `ComponentRef.setInput()`, a bound
  host/template listener firing, a view being attached/marked dirty by one of these, or a
  registered render hook. Any state that should update the UI must flow through one of these
  — not a plain class field mutated from a callback or a third-party async API.
- Reactive forms are a common gap: `FormControl.setValue()`/`patchValue()` update form state
  and emit observables, but do **not** by themselves schedule change detection. Either read
  the value through a signal (`toSignal(control.valueChanges)`) or call `markForCheck()`
  explicitly if a template still depends on the raw observable.
- Don't paper over missing notifications with manual `detectChanges()`/`markForCheck()` calls
  sprinkled into unrelated code as a substitute for modeling state as signals — treat that as
  a signal (pun intended) that some state update isn't flowing through Angular's reactivity.
- In tests, `TestBed` still enforces OnPush/zoneless compatibility and throws
  `ExpressionChangedAfterItHasBeenCheckedError` if a template value changes without a
  corresponding notification — prefer `await fixture.whenStable()` over bare
  `fixture.detectChanges()` when asserting on async updates.

### Routing

- Standalone routing via `provideRouter()` in `app.config.ts`.
- Lazy-load feature areas with `loadChildren: () => import('./feature/feature.routes')`
  (route file exports both a named routes const and a `default` export) or `loadComponent`
  for single routed components.
- <!-- fill in: this repo's actual feature folder convention, e.g.
     `layouts/ | components/ | pages/ | <feature>.routes.ts` — confirm by inspecting an
     existing feature before assuming a new one. -->

### File and naming conventions

- File names use hyphens, matching the primary class they contain: a component named
  `UserProfile` lives in `user-profile.ts`. A component's TypeScript, template, and style
  files share the same base name with different extensions (`user-profile.ts`/`.html`/`.css`);
  for extra style files, extend the base name rather than renaming (`user-profile-settings.css`).
- Angular's current (2025) style guide and CLI schematics drop the type suffix from both file
  and class names — `user-profile.ts` exports `UserProfile`, not `UserProfileComponent`
  (same for services: `Auth`, not `AuthService`). Older repos generated under the 2016 style
  (`user-profile.component.ts` / `UserProfileComponent`) are equally valid — **match whatever
  convention the repo's existing files already use**, don't mix the two styles in one codebase.
  Check `angular.json` → `schematics` → `@schematics/angular:component` for an explicit
  `type`/`typeSeparator` override before assuming which style applies.
- One concept (component/directive/service) per file; avoid generic dumping-ground files like
  `helpers.ts`/`utils.ts` — name files after the feature or concept they contain.
- Prefer external `templateUrl`/`styleUrl` files over inline `template`/`styles` for anything
  beyond a couple of lines of markup — confirm this repo's actual cutoff by inspecting existing
  components rather than assuming.
- Component selector prefix: check `angular.json` → `projects.<name>.prefix` and confirm actual
  selectors match it — some repos deviate to feature-based prefixes (e.g. `admin-user-list`
  instead of `app-user-list`); follow whichever the repo already does consistently.

### Styling

<!-- fill in: CSS approach (Tailwind version + config, component library such as Angular
     Material/PrimeNG/a custom design system, or plain SCSS/BEM), theming approach, where
     design tokens live. -->

Regardless of the specific approach, prefer Angular's native view encapsulation (default
`Emulated`) over global stylesheets for component-scoped styles, and reserve global CSS for
true cross-cutting concerns (resets, design tokens/CSS custom properties, theming). Avoid
`ViewEncapsulation.None` except for intentionally global style components.

### State management

- Default to signals + services rather than a dedicated state-management library. A root-level
  (`providedIn: 'root'`) service holds a private writable `signal`/`linkedSignal` and exposes a
  public `.asReadonly()` view (or a `computed()`), with mutation only through explicit methods
  on the service — never expose the raw writable signal outside its owning service/component.
- Use `computed()` for derived state; keep it pure (no side effects, no `set`/`update` calls
  inside a `computed`). Update signals with `set`/`update`, not in-place mutation of object/array
  values — treat signal values as immutable and replace them.
- Reach for NgRx / NgRx SignalStore / Akita only when the app has genuinely complex, highly
  interdependent shared state that a handful of signal-based services can't express cleanly —
  don't introduce one of these alongside an existing signals-based convention, and don't add one
  preemptively for an app that doesn't need it yet.
- <!-- fill in: this repo's actual choice, and where shared/global state lives (e.g.
     `src/app/<feature>/data-access/*.ts`) if one has been established. -->

### HTTP / API layer

- `provideHttpClient(withInterceptors([...]))` with **functional** interceptors
  (`(req, next) => ...` using `inject()`), not class-based `HttpInterceptor` — functional
  interceptors are the recommended default and have more predictable ordering.
- Prefer `httpResource()` for component-level reads that should drive template state (see
  "Async data with `resource()`" above); keep `HttpClient` + RxJS for imperative calls (submits,
  mutations) that aren't naturally modeled as a reactive resource.
- <!-- fill in: API base URL / environment config, error-handling and retry conventions, auth
     token attachment (env config path, environment.ts vs runtime config, existing interceptors
     to compose with rather than duplicate). -->

### Testing

- This repo uses Vitest (`@angular/build:unit-test`) unless `angular.json` shows a Karma/Jasmine
  builder instead — check before assuming.
- Inject services/components under test via `TestBed.inject(...)` / `TestBed.createComponent(...)`
  inside `beforeEach`, so each test gets a fresh instance — don't share instances across tests.
- Mock HTTP with `provideHttpClientTesting()` + `HttpTestingController`
  (`expectOne(...).flush(...)`), registered **after** `provideHttpClient(...)` in the testing
  module's providers so it correctly overrides the real HTTP backend — not hand-rolled
  `fetch`/service mocks, unless the repo already established that pattern elsewhere.
- For routed components, use `RouterTestingHarness` with `provideRouter([...])` rather than
  manually constructing `ActivatedRoute` stubs.
- In zoneless/OnPush suites, prefer `await fixture.whenStable()` (or
  `TestBed.inject(ApplicationRef).whenStable()` for resources/effects) over bare
  `fixture.detectChanges()` when asserting on async signal/resource updates.
- <!-- fill in: coverage thresholds if enforced, any e2e framework (Playwright/Cypress) and how
     it's invoked. -->

## Conventions to preserve

<!-- fill in: anything this repo's history has established that isn't obvious from the code —
     commit message format, PR template/checks, code review gates, i18n conventions,
     accessibility requirements, performance budgets in `angular.json`. -->

## Do not

- Don't add NgModules to a standalone-only codebase, and don't reintroduce
  `platformBrowserDynamic`/`AppModule` bootstrapping alongside `bootstrapApplication`.
- Don't use `*ngIf`/`*ngFor`/`*ngSwitch` or the `CommonModule` structural directives in new or
  edited templates — use `@if`/`@for`/`@switch` instead.
- Don't mix the 2016 (`*.component.ts` / `FooComponent`) and 2025 (`*.ts` / `Foo`) file/class
  naming styles within the same codebase — match whatever this repo already uses.
- Don't use class-based `HttpInterceptor` when the repo already uses functional interceptors
  (or vice versa) — stay consistent, and don't bypass the shared interceptor chain for new API
  calls by calling `fetch` directly.
- Don't introduce a second state-management approach (e.g. adding NgRx to a signals-based repo,
  or vice versa) without an explicit decision to migrate.
- In zoneless apps, don't mutate component state from callbacks/third-party async APIs without
  routing it through a signal, `markForCheck()`, or another notification Angular's scheduler
  recognizes (see "Change detection (zoneless)" above) — and don't reach for manual
  `detectChanges()` calls as a workaround instead of fixing the underlying reactivity gap.
- Don't add `effect()` to derive or sync state that `computed()` (or a `resource()`'s own
  signals) can express directly.
- <!-- fill in additional project-specific guardrails learned from this repo's history. -->
