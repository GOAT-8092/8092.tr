# Repository Guidelines

## Project Structure & Module Organization

- `src/components/` contains Astro UI components (Hero, Gallery, Contact, admin widgets).
- `src/pages/` houses routed Astro pages; `/pages/admin/` powers the CMS dashboard, while `/pages/api/` provides serverless utilities (e.g., search).
- `src/lib/` includes i18n helpers, translations, and shared utilities; locale data lives under `src/locales/`.
- Static assets are grouped under `public/` (logos, manifest, service worker) and `src/assets/gallery/` for optimized imagery.
- Configuration files (`astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`) sit at the root for easy reference.

## Build, Test, and Development Commands

- `npm run dev` – start the Astro dev server with live reload.
- `npm run build` – produce the static build for deployment (runs type/content checks first).
- `npm run preview` – serve the production build locally.
- `npm run lint` / `npm run lint:fix` – run ESLint across `.astro`, `.ts`, and `.js` files (autofix with `:fix`).
- `npm run format` – apply Prettier formatting to the entire workspace.

## Coding Style & Naming Conventions

- Use TypeScript/ES2022 modules and two-space indentation; avoid semicolons unless required.
- Components follow PascalCase (`ContactForm.astro`), utilities use camelCase, constants SCREAMING_SNAKE_CASE.
- Prettier (`.prettierrc`) and ESLint (`eslint.config.js`) enforce formatting; run them before committing.
- Tailwind CSS powers styling—prefer utility classes over custom CSS except in dedicated component stylesheets.

## Testing Guidelines

- No automated test suite yet; validate major changes with `npm run build` and smoke-test key routes (`/`, `/en`, `/admin`).
- For logic additions, add lightweight checks (e.g., console assertions) and remove them before merging.

## Commit & Pull Request Guidelines

- Follow the existing history style: start messages with an imperative, optionally prefixed (`feat:`, `fix:`), and describe scope plus impact (e.g., `feat: add Iridescence hero background`).
- Reference issues in the body (`Closes #123`) when applicable.
- Pull requests should include: summary of changes, screenshots or GIFs for UI updates, test/build evidence, and notes on i18n or accessibility impacts.

## Architecture & Configuration Notes

- Astro v5 with React integration powers select interactive widgets; use `client:load` judiciously.
- All user-facing copy should route through `src/lib/translations.ts`; mirror keys for both `tr` and `en` locales when adding content.
