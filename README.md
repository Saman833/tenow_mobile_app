# TeNow Mobile

The mobile app for [TeNow](https://github.com/) — an **AI-native learning platform** for high school and university teachers and students.

TeNow is not a bolt-on AI button on top of a legacy LMS. It is built around a single conversation engine that powers two profiles:

- **Class TA** — a knowledge-base-grounded assistant for students, with per-assignment AI policies (from closed-book to open-with-disclosure).
- **Teacher Assistant** — rubric-aligned feedback drafts, assignment and rubric generation, announcements, and class insights for educators.

The platform treats **transparent AI use and process tracking** as the integrity model: version history, chat trails, and AI-use disclosure on every submission — not AI-detection verdicts.

---

## What this app is for

`tenow_mobile` is the native companion to the TeNow web product (`apps/frontend` in the main monorepo). It is aimed at the workflows that benefit most from a phone or tablet:

| Audience | Mobile use cases |
|---|---|
| **Students** | Chat with the Class TA, check assignments and deadlines, submit work, review rubric feedback, study with practice and reverse-outline intents |
| **Teachers** | Skim submissions, approve AI-suggested feedback, post announcements, glance at misconception clusters between classes |

STEM-heavy classes (math, CS, physics, lab sciences) are the first wedge — the same focus as the broader TeNow product.

---

## Relationship to the main repo

This directory lives alongside the TeNow monorepo. The backend API, shared contracts, and web app live in the parent project:

| Component | Path |
|---|---|
| API (NestJS) | `../apps/backend` |
| Web app (Next.js) | `../apps/frontend` |
| Evaluation worker | `../apps/worker` |
| Shared types / validation | `../packages/shared` |
| Product strategy | `../docs/tenow-strategy.md` |

The mobile app will consume the same authenticated REST API as the web frontend.

---

## Tech stack

- [Expo](https://expo.dev) (SDK 56+) — React Native
- TypeScript
- Targets iOS, Android, and web via Expo

See [Expo SDK 56 docs](https://docs.expo.dev/versions/v56.0.0/) before making changes — Expo APIs are version-specific.

---

## Getting started

From this directory:

```bash
npm install
npx expo start
```

Then press `i` for the iOS simulator, `a` for Android, or scan the QR code with Expo Go on a device.

For a local backend during development, run the TeNow stack from the repo root:

```bash
cd ..
docker compose up -d postgres redis minio
npm install
npm run migration:run -w apps/backend
npm run start:dev -w apps/backend
```

Point the mobile app at your local API base URL (configure in app env when wired up).

---

## Project structure

```
src/
  app/             composition root: bootstrap, DI, navigation
  features/        auth, home, classes, settings, orgs (each exports index.ts)
  shared/          #shared — config, api, design-system tokens/components
tests/
  smoke/           fast render and wiring checks
  unit/            domain and infrastructure tests
e2e/
  web/             Playwright end-to-end (web target)
  maestro/         Maestro flows for Expo Go / device
```

---

## Testing

```bash
npm test              # all Jest tests
npm run test:smoke    # smoke tests only
npm run test:coverage # unit + smoke with coverage thresholds
npm run test:e2e      # Playwright web E2E (starts Expo web automatically)
npm run test:e2e:mobile  # Maestro on device (requires Maestro CLI + Expo Go)
```

Coverage thresholds are enforced at 70% lines/functions/statements and 60% branches.

---

## AI use note

AI assistance was used only as a pre-commit review aid for finding bugs and checking implementation quality. App features, tests, and final commits remain reviewed and owned by the project author.

If AI assistance is not intended for a task, disable the related assistant features in the editor settings before working.

---

## Project status

Current mobile features include:

- Auth screens wired to the backend API with secure token storage.
- Organization creation and active organization refresh after setup.
- Classes tab with API-backed class listing, class detail, create class, and join class flows.
- Clipboard device feature for copying and pasting class join codes.
- FlatList class list with pull-to-refresh and end-reached loading.
- Shared design system primitives and patterns for consistent screens.
- Unit and smoke tests for navigation, APIs, device abstractions, and screen behavior.

---

## Positioning (one line)

> TeNow is teacher-controlled, AI-native classroom support where students get guided help grounded in the syllabus — and teachers get evidence of progress, not a black-box answer machine.
