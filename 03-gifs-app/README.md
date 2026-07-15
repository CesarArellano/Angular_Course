# GifsApp

A small admin-style dashboard that browses, searches, and caches trending GIFs from the [Giphy API](https://developers.giphy.com/), built while working through an Angular deep-dive course. It's a training project, but it's wired up like a real app: lazy-loaded feature routes, signal-based state, HTTP data mapping, localStorage-backed search history, and infinite scroll with scroll-position restoration.

**Live demo:** https://gifs-app-ca.netlify.app/

## Features

- **Trending feed** with infinite scroll — new pages load automatically as you approach the bottom of the list.
- **Search** GIFs by keyword against the Giphy API.
- **Search history**, cached in `localStorage`, with a dedicated route per past query (`history/:query`) so results don't need to be re-fetched.
- **Scroll position restoration** — leaving and returning to the trending tab keeps your place in the list.
- **Skeleton loaders** shown while a GIF image is loading.
- Responsive, dark admin layout styled with Tailwind CSS v4.

## Tech stack

| Layer | Tool |
|---|---|
| Framework | Angular 22 (standalone components, no NgModules) |
| Language | TypeScript 6 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/postcss`) |
| State | Angular Signals (`signal`, `computed`, `effect`), RxJS interop (`toSignal`) |
| HTTP | `HttpClient` |
| Testing | Vitest |
| Build tool | `@angular/build` (esbuild + Vite dev server) |
| Hosting | Netlify |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ and npm
- A free [Giphy API key](https://developers.giphy.com/dashboard/) (the app talks directly to `https://api.giphy.com/v1/gifs`)

### Install

```bash
npm install
```

### Configure environment

`src/environments/environment.ts` and `environment.development.ts` hold the API key and are gitignored, so they won't exist after cloning. Create them from the committed template:

```bash
cp src/environments/environment.template.ts src/environments/environment.ts
cp src/environments/environment.template.ts src/environments/environment.development.ts
```

Then drop your own [Giphy API key](https://developers.giphy.com/dashboard/) into both files.

### Run the dev server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app reloads automatically as you edit source files.

### Build

```bash
npm run build
```

Production artifacts are emitted to `dist/`.

### Test

```bash
npm test
```

Runs the unit test suite with Vitest.

## Project structure

```
src/app/
├── app.routes.ts                    # top-level + lazy-loaded child routes
├── app.config.ts
└── gifts/
    ├── pages/
    │   ├── dashboard-page/          # shell layout: side menu + <router-outlet>
    │   ├── trending-page/           # infinite scroll trending feed
    │   ├── search-page/             # search form + results
    │   └── gif-history/             # cached results for a past search query
    ├── components/
    │   ├── side-menu/               # nested side-menu + header + nav options
    │   ├── list/                    # gif grid + list-item
    │   └── skeleton/                # image skeleton loader
    ├── services/
    │   ├── gifs.service.ts          # HTTP calls, signal state, localStorage cache
    │   └── scroll-state.service.ts  # per-route scroll position
    ├── mappers/gif.mapper.ts        # Giphy API DTO -> internal Gif model
    └── interfaces/                  # Gif + Giphy API response types
```

### Routing

| Path | Component | Notes |
|---|---|---|
| `/dashboard` | `DashboardPageComponent` | Shell with side menu, lazy-loaded |
| `/dashboard/trending` | `TrendingPageComponent` | Default child route, lazy-loaded |
| `/dashboard/search` | `SearchPageComponent` | Lazy-loaded |
| `/dashboard/history/:query` | `GifHistoryComponent` | Lazy-loaded, reads from cached search history |
| `**` | — | Redirects to `/dashboard` (and `/dashboard/trending`) |

## What this project covers

The course is split into three parts, each building on the last.

**Angular fundamentals & app structure** — standalone components and `input()`/`output()` for parent-child communication, lazy-loaded routes and child routes, nested `<router-outlet>`s, environment variables per build configuration, the Angular CLI schematics, and Tailwind CSS integration. This is where the dashboard shell (side menu + nested routing) came together.

**State management** — dynamic route params (`history/:query`), `HttpClient` requests against a real API, mapping raw API responses into clean internal models (`GifMapper`), converting RxJS observables to signals with `toSignal`, caching search results in `localStorage`, and reusing components (`ListComponent`, `ListItemComponent`) across pages.

**Advanced / optional topics** — preserving scroll position across route navigation (`ScrollStateService`), building infinite scroll from raw `scroll` events (`scrollTop` / `scrollHeight` / `clientHeight`), a masonry-style responsive grid layout, and general debugging techniques and tooling for Angular apps.

## Deployment

Deployed on Netlify: https://gifs-app-ca.netlify.app/

## Additional resources

For more on the tooling this project was scaffolded with, see the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
