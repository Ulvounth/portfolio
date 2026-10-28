# Roadmap

Plan for the portfolio overhaul: a new visual design and a better AI chatbot. English-only site, hosted on Netlify.

## How to work with this file

1. Start each phase in a **new conversation** (`/clear`): "Read docs/ROADMAP.md and do phase N. Start in plan mode."
2. Approve the plan first, then implement on a branch named `phase-N-<name>`.
3. Done means `npm run check` and `npm run build` pass (and `npm run test:e2e` from F1 onwards). For UI changes, compare before/after screenshots.
4. At the end of the session, tick the phase below, write a handover note and commit.
5. Aim for 100–200k tokens per session. Check with `/context`. Past roughly 200k, finish the current subtask, write the handover note, commit and start a new conversation. Avoid `/compact` mid-phase.

## Order of work

1. AI setup and automated tests first, so agents can verify their own work.
2. Bugs and security that the redesign does not touch.
3. Design and chatbot last. Accessibility fixes in markup that will be rewritten anyway are done in the redesign, not twice.

## Phases

- [x] **F0 – AI workspace** (S): `AGENTS.md`, `CLAUDE.md`, `.mcp.json`, `.claude/settings.json`, this file.
- [x] **F1 – Safety net** (M): Playwright e2e on all routes, axe a11y checks (WCAG 2.2 AA, `color-contrast` disabled until F5), `npm run screenshots` at 375/768/1440 px, data-integrity Vitest tests, CI e2e job.
- [ ] **F2 – Security and robust APIs** (M):
  - Tighten chat payload limits: about 20 messages, a total character cap, and a body of about 64 KB. Share the limits via `chatLimits` and trim history on the client.
  - Use `x-nf-client-connection-ip` for the client IP on Netlify.
  - Shared rate limiting (Upstash Redis) with a global daily cap on chat. Fall back to the in-memory limiter without env vars.
  - Contact form honeypot and minimum fill time.
  - CSP without nonce, `Permissions-Policy`, `Referrer-Policy: strict-origin-when-cross-origin`, plus an e2e test for headers.
  - Dependabot config.
- [ ] **F3 – Foundation** (M):
  - Tailwind 4 and remove daisyUI (used only for `breadcrumbs` and `timeline`).
  - `next/font` with Inter (it is declared in `tailwind.config.ts` but never loaded).
  - Image config: put `image/avif` before `image/webp`, replace the deprecated `priority` with `preload`, drop `quality={100}`.
  - Move `tailwindcss` to devDependencies and review whether `sharp` is needed.
  - Visually identical before/after, apart from deliberate fixes.
- [ ] **F4 – Architecture and SEO** (M–L, split into 4a and 4b if needed):
  - 4a: rename the two `About` components (`About.tsx` → `Hero.tsx`) and `Contact` in `ContactClient.tsx`; move `app/utils/seo.ts` to `lib/seo.ts`; make Breadcrumbs, Header and the contact page mostly server components; add `not-found.tsx` and `global-error.tsx`; remove hardcoded text in favour of `data/`.
  - 4b: descriptive project slugs with permanent redirects from `/projects/1|3|5`; `opengraph-image.tsx`; `icon`/`apple-icon` and manifest icons; `viewport.themeColor`; JSON-LD for WebSite, BreadcrumbList and projects; canonical per page instead of in the root layout.
- [ ] **F5 – Design system** (M, needs input from Andreas): references and mood, dark only or light and dark, tokens in `@theme` with verified AA contrast, base components in `components/ui/`, re-enable axe `color-contrast`.
- [ ] **F6 – Page redesign** (4 sessions): 6a layout (header, footer, breadcrumbs), 6b home page, 6c projects, 6d about, contact, 404 and error. Per session: before/after screenshots, axe clean, Lighthouse ≥ 95, keyboard test.
- [ ] **F7 – Chatbot v2** (2 sessions):
  - 7a: English UI and errors, `useChat` hook with tests, lazy-loaded chat window, proper dialog semantics and focus handling, `aria-live` for finished replies, stop button, suggested questions, `sessionStorage` persistence.
  - 7b: English system prompt that answers in the user's language, manual `scripts/chat-eval.ts` (not in CI because it costs money), check the Groq model, log token usage and latency without content.
- [ ] **F8 – Launch and maintenance** (S–M): Lighthouse on a Netlify deploy preview, cookie-free analytics, content review with Andreas, README and CLAUDE.md update, ESLint 10 and TypeScript 7 when `eslint-config-next` supports them.

## Known issues (assigned to a phase above)

- Contrast: `primary` (#4C51BF) is about 2.5:1 and `secondary` (#9333EA) about 3:1 on #1A202C. Need 4.5:1 for text. (F5)
- `aria-label` overrides visible text on several links and buttons (label-in-name, WCAG 2.5.3). `aria-label` on `<p>` and `<span>` is invalid. (F6)
- Chat UI, API error messages and `confirm()` are in Norwegian on an English site. (F7)
- Breadcrumbs may render a double separator (daisyUI plus a manual `/`). (F3)
- Chat accepts 50 messages and up to 12,000 characters per assistant message, which the client can forge. (F2)
- The rate limiter is per process, which is weak on Netlify. (F2)
- No CSP or `Permissions-Policy`. (F2)

## Decisions to make along the way

- F2: Upstash account for shared rate limiting? If not, keep the in-memory limiter with lower caps.
- F4: project slugs (`holidaze`, `bidbazaar`, `golfassistant`?).
- F5: design direction and theme.
- F6: keep the Facebook link and the public phone number?
- F8: analytics tool.

## Handover notes

Add one entry per finished session: what was done, what was left, anything the next session must know.

### F0 – 2026-10-28

- Added `AGENTS.md` (Next's managed block, copied from `node_modules/next/dist/server/lib/generate-agent-files.js`), `CLAUDE.md`, `.mcp.json` (`next-devtools-mcp`), `.claude/settings.json` and this file.
- `.claude/settings.json` was created by Andreas by hand, because Claude Code blocks the agent from editing its own permission settings.
- Baseline before F1: lint, typecheck, 56 Vitest tests and Prettier all pass. `npm audit --omit=dev` reports 0 vulnerabilities.
- Next: F1. Start a new conversation and say "Read docs/ROADMAP.md and do phase 1. Start in plan mode."

### F1 – 2026-10-28

- Added `@playwright/test` and `@axe-core/playwright` (devDependencies), `playwright.config.ts` and `e2e/`: page, navigation, mobile menu, skip link, metadata file and API specs (32 tests), plus axe scans of every route, the open chat window and the mobile menu.
- The e2e web server runs `npm run build && npm run start` on port 3100 with empty `RESEND_API_KEY` and `GROQ_API_KEY`, so e2e never sends email or calls the AI API. The API specs rely on the 503 the routes return without keys.
- `npm run test:e2e` runs everything except `@screenshots`. `npm run screenshots` writes 375/768/1440 px full-page PNGs for every route to `screenshots/<label>/` (git-ignored). Set `SCREENSHOT_LABEL=before` (PowerShell: `$env:SCREENSHOT_LABEL="before"`) to keep sets side by side.
- Added `tests/data-integrity.test.ts` (13 tests: unique ids, URLs, files in `public/` exist). Vitest now has 69 tests.
- CI has a new `e2e` job that uploads the Playwright report on failure.
- axe `deferredRules` in `e2e/a11y.spec.ts`: `color-contrast` (re-enable in F5) and `label-content-name-mismatch` (re-enable in F6, the aria-label issue). With only `color-contrast` disabled, axe reports the latter on every route except `/about`.
- Not covered: the default Next 404 page has no axe scan (F4 adds `not-found.tsx`; add the scan then). `npm run check` does not include e2e, so run `npm run test:e2e` too.
- Baseline: `npm run check`, `npm run build` and `npm run test:e2e` pass.
- Next: F2. Start a new conversation and say "Read docs/ROADMAP.md and do phase 2. Start in plan mode."
