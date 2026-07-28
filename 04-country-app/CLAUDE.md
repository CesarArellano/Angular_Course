# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Angular 22 app (standalone components, no NgModules) built as part of an Angular course. Uses Tailwind CSS v4 + daisyUI for styling, and Vitest (via `@angular/build:unit-test`) for unit tests.

## Commands

- `npm start` / `ng serve` — dev server at http://localhost:4200, auto-reloads on save.
- `ng build` — production build to `dist/`.
- `npm run watch` — development-config build in watch mode.
- `npm test` / `ng test` — run the full Vitest suite.
- `ng generate component path/to/name` — scaffold a new component (see naming convention below before using this).

There is no configured e2e test runner and no lint script in `package.json`.

## Architecture

### Routing: lazy feature areas with default-export route files

`app.routes.ts` defines the root routes, with the home page (`shared/pages/home-page`) at `''` and the `country` feature lazy-loaded via `loadChildren: () => import('./country/country.routes')`. Feature route files (e.g. `country.routes.ts`) export both a named `countryRoutes` const and a `default` export — the default export is what `loadChildren` consumes. Follow this pattern (named export + `export default`) when adding new lazy-loaded feature areas.

Each feature area has its own layout component holding a `<router-outlet>` for its children (e.g. `country-layout` wraps `by-capital`, `by-country`, `by-region`, and `by/:countryCode` routes and renders the `top-menu` nav). A catch-all `**` route inside the feature redirects to a sensible default page (`by-capital`), and the root catch-all redirects to `''`.

### Directory layout

```
src/app/
  app.ts / app.routes.ts / app.config.ts   — root component, routes, providers
  shared/                                   — cross-feature building blocks (footer, home page)
  country/
    layouts/country-layout/                 — feature shell with router-outlet + top-menu
    components/                              — feature-scoped reusable components (country-list, search-input, top-menu)
    pages/                                    — routed page components (by-capital, by-country, by-region, country detail)
    country.routes.ts                        — feature route definitions
```

New features should follow the same `layouts/ | components/ | pages/ | <feature>.routes.ts` split under `src/app/<feature>/`.

### Component conventions

- Standalone components only; each declares its own `imports: []` array (no shared NgModules).
- File and class naming drops the `Component` suffix from the filename: `country-list.ts` exports `CountryListComponent`, `home-page.ts` exports `HomePageComponent`, etc. Match this when adding files.
- Templates are always external (`templateUrl`), even for small components — no inline `template` strings.
- Component selectors are prefixed by feature area, not by the Angular CLI default `app` prefix configured in `angular.json` (e.g. `country-list`, `country-search-input`, `country-top-menu`, `country-by-capital-page`, `country-home-page`). Match the existing feature-prefix style (`country-*`) for new components in that feature rather than `app-*`.
- Use the `input()`/signal-based APIs (`input<string>('default')`) rather than `@Input()` decorators.

### Styling

Tailwind v4 is wired through PostCSS (`@tailwindcss/postcss` in `.postcssrc.json`) and imported once in `src/styles.css` via `@import 'tailwindcss'`. daisyUI is loaded as a Tailwind plugin in the same file with three themes configured: `light` (default), `dark` (`prefersdark`), and `sunset`. Prefer daisyUI component classes (`btn`, `menu`, `hero`, etc.) over hand-rolled CSS, consistent with existing templates.
