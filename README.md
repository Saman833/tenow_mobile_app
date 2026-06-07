# TeNow Mobile

The mobile app for [TeNow](https://github.com/) - an AI-native learning platform for high school and university teachers and students.

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

- Node.js and npm
- Expo Go on a physical device, or an Android/iOS simulator
- Git

**Setup**

```bash
git clone https://github.com/Saman833/tenow_mobile_app.git
cd tenow_mobile
npm install
```

Create or update `.env.local` with the backend API URL:

```bash
EXPO_PUBLIC_API_URL=https://tenow-server-production.up.railway.app
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
npx expo-doctor
npx tsc --noEmit
npx jest --ci
npx expo start
```

Press `i` for the iOS simulator, `a` for Android, `w` for web, or scan the QR code with Expo Go on a device.

This repo includes `.npmrc` with `legacy-peer-deps=true` so `npm install` matches the Expo dependency setup used in development.

---

## Rules and considerations

- Keep application code in `src/` and organize it by feature modlets, not by layer-based folders.
- Keep navigation separate from screen rendering and business logic.
- Import shared and cross-feature code only through public entrypoints (`#shared`, `#features/*`).
- Abstract device and platform APIs in `#shared`; inject dependencies through `ServiceContainer`.
- Update tests with behavior changes and validate with `npx jest --ci`, `npx tsc --noEmit`, and `npx expo-doctor`.

**AI use**

- AI may be used before committing to review code, catch bugs, and improve test coverage.
- AI is appropriate for helping write or refine tests, but every test should still reflect real app behavior.
- Do not use AI to write core business logic, domain models, or service-layer code. Those parts should be understood and owned by the developer.
- If AI assistance is not intended for a task, disable related assistant features in the editor settings before working.

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

## Project status

Current features include:

- Auth screens wired to the backend API with secure token storage.
- Organization creation and active organization refresh after setup.
- Classes tab with API-backed class listing, class detail, create class, and join class flows.
- Clipboard device feature for copying and pasting class join codes.
- FlatList class list with pull-to-refresh and end-reached loading.
- Shared design-system primitives and screen patterns.
- Unit and smoke tests for navigation, APIs, device abstractions, and screen behavior.

