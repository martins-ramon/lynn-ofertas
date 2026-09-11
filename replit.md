# Replit project notes

## Run

- Runtime: Node.js 22
- Install dependencies: `npm ci`
- Development workflow: `npm run dev`
- Development port: `5000`

The Vite development server listens on `0.0.0.0`, accepts Replit proxy hosts, and uses the `PORT` environment variable when provided.

## Verify

- Type-check and production build: `npm run build`
- Unit tests: `npm test`
- End-to-end tests: `npm run test:e2e` after installing Playwright Chromium

No database, API key, external service, or additional secret is required.