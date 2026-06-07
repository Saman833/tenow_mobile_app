# TeNow Mobile

The mobile app for TeNow - an AI-native learning platform for high school and university teachers and students.

---

## What this app is for

`tenow_mobile` is the native companion app for TeNow classrooms. It helps teachers and students handle the mobile parts of class setup and access: signing in, creating or joining organizations, viewing classes, creating classes, joining by class code, and opening class details. The mobile app is useful because these workflows often happen away from a desktop, especially when a teacher shares a class code and students need to join quickly from their phones.

---

## Tech stack

TeNow Mobile is an Expo SDK 56 React Native app written in TypeScript. The app is organized by feature modlets under `src/features`, with app composition and navigation under `src/app`, and shared API, device, design-system, and domain utilities under `src/shared`. It uses React Navigation for stack and tab routing, a `ServiceContainer` for dependency wiring, REST API clients for backend communication, Expo SecureStore for auth token persistence, and Expo Clipboard for class-code copy/paste. Tests use Jest, `jest-expo`, and React Native Testing Library.

Important stack pieces:

- Expo SDK 56 / React Native
- TypeScript
- React Navigation
- Expo SecureStore
- Expo Clipboard
- Jest, `jest-expo`, and React Native Testing Library
- TeNow backend REST API
- Railway-hosted API for shared development

---

## Getting started

New team members should be able to run the app with these steps.

**Prerequisites**

- Node.js 24 and npm (see `.nvmrc`)
- Expo Go on a physical device, or an Android/iOS simulator
- Git

**Setup**

```bash
git clone https://github.com/Saman833/tenow_mobile_app.git
cd tenow_mobile
npm install
```

Copy `.env.example` to `.env.local` and set the backend API URL:

```bash
cp .env.example .env.local
```

If you run your own backend instead, use the URL your device can reach:

```bash
# Android emulator
EXPO_PUBLIC_API_URL=http://10.0.2.2:4000

# Web/local dev on the same machine
EXPO_PUBLIC_API_URL=http://localhost:4000

# Real phone on Wi-Fi
EXPO_PUBLIC_API_URL=http://YOUR_LAN_IP:4000
```

**Validate and run**

```bash
npm run verify   # expo-doctor + typecheck + tests (same as CI)
npx expo start
```

Press `i` for the iOS simulator, `a` for Android, `w` for web, or scan the QR code with Expo Go on a device.

This repo includes `.npmrc` with `legacy-peer-deps=true` so `npm install` matches the Expo dependency setup used in development.

---

## CI/CD

GitHub Actions workflow: `.github/workflows/verify-and-build.yaml`

**CI (on every push and pull request)**

- `npm ci`
- `npx expo-doctor`
- `npm run lint-typecheck`
- `npm run test:ci`

**CD (manual)**

From the GitHub Actions tab, run **Verify and Build** with `workflow_dispatch`. After verify passes, the workflow builds a Docker image and pushes it to GitHub Container Registry (`ghcr.io/<owner>/<repo>:latest`).

Node version is pinned in `.nvmrc` (24).

---

## Docker (web)

Build and serve the exported web app with nginx:

```bash
docker build -t tenow-mobile .
docker run -p 8080:80 tenow-mobile
```

Open http://localhost:8080. The API URL is set at image build time via `EXPO_PUBLIC_API_URL` (see `Dockerfile`).

To build the web bundle without Docker:

```bash
npm run build:web
```

---

## Rules and considerations for new collaborators

Read this before your first PR. The rules below match what `tests/unit/architecture.test.ts` enforces.

**Architecture**

- Put application code under `src/` and organize by **feature modlets** (`auth`, `home`, `classes`, `settings`, `orgs`), not by layer folders like `presentation/` or `infrastructure/`.
- `src/app` is the composition root: bootstrap, `ServiceContainer`, and navigation only.
- `src/shared` (`#shared`) holds cross-cutting code: API clients, design-system components, config, and device abstractions.
- Each feature exposes a public `index.ts`. Import another feature only via `#features/<name>` — never deep-import another feature’s internal files.
- Keep navigation in `src/app/navigation`. Screens receive APIs and services as props; they should not construct HTTP clients or read platform modules directly.
- Wire dependencies in `ServiceContainer` and pass them into navigators/screens. Do not import `expo-*` device modules from `src/features`; wrap them in `#shared` first (see `ClipboardAccess`).

**UI**

- Reuse design-system primitives from `#shared` (`Button`, `AppText`, `ScreenContainer`, `ListRow`, etc.) instead of one-off styled components.
- Follow existing screen patterns: header, loading, empty, and error states should look and behave like current feature screens.

**Testing**

- Add or update tests when behavior changes. Prefer unit tests for APIs, view models, and abstractions; screen tests for user-visible flows.
- Run `npm run verify` before opening a PR (same checks as CI).
- Architecture boundaries are tested automatically — broken imports or `expo-*` usage in features will fail the build.

**Git and workflow**

- Work on a feature branch; open a PR against `master`.
- Keep commits focused. Write messages that explain *why*, not just what changed.
- Do not commit secrets. Copy `.env.example` to `.env.local` for local API URL overrides.
- Push early so CI runs on your branch. Fix failing checks before requesting review.

**Expo and dependencies**

- This project targets **Expo SDK 56**. Check the [v56 docs](https://docs.expo.dev/versions/v56.0.0/) before adding packages or APIs.
- Use `npm install` (with the repo’s `.npmrc`) so peer dependencies resolve the same way for everyone.
- After dependency changes, run `npx expo-doctor` and update tests if needed.

**AI use**

- AI may be used before committing to review code, catch bugs, and improve test coverage.
- AI is appropriate for helping write or refine tests, but every test should still reflect real app behavior.
- Do not use AI to write core business logic, domain models, or service-layer code. Those parts should be understood and owned by the developer.
- If AI assistance is not intended for a task, disable related assistant features in the editor settings before working.

---

## Project structure

```
tenow_mobile/
  src/
    app/
    features/
      auth/
      home/
      classes/
      orgs/
      settings/
    shared/
  tests/
    smoke/
    unit/
  e2e/
    web/
    maestro/
  assets/
  docker/
  .github/
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

## Project status

Current features include:

- Auth screens wired to the backend API with secure token storage.
- Organization creation and active organization refresh after setup.
- Classes tab with API-backed class listing, class detail, create class, and join class flows.
- Clipboard device feature for copying and pasting class join codes.
- FlatList class list with pull-to-refresh and end-reached loading.
- Shared design-system primitives and screen patterns.
- Unit and smoke tests for navigation, APIs, device abstractions, and screen behavior.
- GitHub Actions CI and Docker-based web deployment.

