# Roadmap

Plan for the portfolio overhaul: a new visual design and a better AI chatbot. English-only site, hosted on Netlify.

## How to work with this file

1. Start each phase in a **new conversation** (`/clear`): "Read docs/ROADMAP.md and do phase N. Start in plan mode."
2. Approve the plan first, then implement directly on `main` (no branches or PRs, ask before committing).
3. Done means `npm run check` and `npm run build` pass (and `npm run test:e2e` from F1 onwards). For UI changes, compare before/after screenshots.
4. At the end of the session, tick the phase below, write a handover note and ask before committing.
5. Aim for 100–200k tokens per session. Check with `/context`. Past roughly 200k, finish the current subtask, write the handover note, commit and start a new conversation. Avoid `/compact` mid-phase.

## Order of work

1. AI setup and automated tests first, so agents can verify their own work.
2. Bugs and security that the redesign does not touch.
3. Design and chatbot last. Accessibility fixes in markup that will be rewritten anyway are done in the redesign, not twice.

## Phases

- [x] **F0 – AI workspace** (S): `AGENTS.md`, `CLAUDE.md`, `.mcp.json`, `.claude/settings.json`, this file.
- [x] **F1 – Safety net** (M): Playwright e2e on all routes, axe a11y checks (WCAG 2.2 AA, `color-contrast` disabled until F5), `npm run screenshots` at 375/768/1440 px, data-integrity Vitest tests, CI e2e job.
- [x] **F2 – Security and robust APIs** (M):
  - Tighten chat payload limits: about 20 messages, a total character cap, and a body of about 64 KB. Share the limits via `chatLimits` and trim history on the client.
  - Use `x-nf-client-connection-ip` for the client IP on Netlify.
  - Shared rate limiting (Upstash Redis) with a global daily cap on chat. Fall back to the in-memory limiter without env vars.
  - Contact form honeypot and minimum fill time.
  - CSP without nonce, `Permissions-Policy`, `Referrer-Policy: strict-origin-when-cross-origin`, plus an e2e test for headers.
  - Dependabot config.
- [x] **F3 – Foundation** (M):
  - Tailwind 4 and remove daisyUI (used only for `breadcrumbs` and `timeline`).
  - `next/font` with Inter (it is declared in `tailwind.config.ts` but never loaded).
  - Image config: put `image/avif` before `image/webp`, replace the deprecated `priority` with `preload`, drop `quality={100}`.
  - Move `tailwindcss` to devDependencies and review whether `sharp` is needed.
  - Visually identical before/after, apart from deliberate fixes.
- [x] **F4 – Architecture and SEO** (M–L, split into 4a and 4b if needed):
  - [x] 4a: rename the two `About` components (`About.tsx` → `Hero.tsx`) and `Contact` in `ContactClient.tsx`; move `app/utils/seo.ts` to `lib/seo.ts`; make Breadcrumbs, Header and the contact page mostly server components; add `not-found.tsx` and `global-error.tsx`; remove hardcoded text in favour of `data/`.
  - [x] 4b: descriptive project slugs with permanent redirects from `/projects/1|3|5`; `opengraph-image.tsx`; `icon`/`apple-icon` and manifest icons; `viewport.themeColor`; JSON-LD for WebSite, BreadcrumbList and projects; canonical per page instead of in the root layout.
- [x] **F5 – Design system** (M, needs input from Andreas): references and mood, dark only or light and dark, tokens in `@theme` with verified AA contrast, base components in `components/ui/`, re-enable axe `color-contrast`.
- [ ] **F6 – Page redesign** (4 sessions): 6a layout (header, footer, breadcrumbs), 6b home page, 6c projects, 6d about, contact, 404 and error. Per session: before/after screenshots, axe clean, Lighthouse ≥ 95, keyboard test.
- [ ] **F7 – Chatbot v2** (2 sessions):
  - 7a: English UI and errors, `useChat` hook with tests, lazy-loaded chat window, proper dialog semantics and focus handling, `aria-live` for finished replies, stop button, suggested questions, `sessionStorage` persistence.
  - 7b: English system prompt that answers in the user's language, manual `scripts/chat-eval.ts` (not in CI because it costs money), check the Groq model, log token usage and latency without content.
- [ ] **F8 – Launch and maintenance** (S–M): Lighthouse on a Netlify deploy preview, cookie-free analytics, content review with Andreas, README and CLAUDE.md update, ESLint 10 and TypeScript 7 when `eslint-config-next` supports them.

## Known issues (assigned to a phase above)

- `aria-label` overrides visible text on several links and buttons (label-in-name, WCAG 2.5.3). `aria-label` on `<p>` and `<span>` is invalid. (F6)
- Chat UI, API error messages and `confirm()` are in Norwegian on an English site. (F7)
- CSP allows `'unsafe-inline'` for scripts and styles because there is no nonce. Tightening that would make every page dynamic. (accepted in F2)

## Decisions to make along the way

- F2: ~~Upstash?~~ Decided: yes, with an in-memory fallback. Andreas still has to create the database and set the env vars on Netlify.
- F4: ~~project slugs?~~ Decided: `holidaze`, `auction-website`, `golfassistant`.
- F5: ~~design direction and theme?~~ Decided: dark only, technical/developer mood, one teal accent, JetBrains Mono for small labels.
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

### F2 – 2026-10-28

- Chat limits (`chatLimits` in `lib/chat.ts`): 20 messages, 2000 characters per user message, 10,000 per assistant message, 16,000 in total, 64 KB body. `trimChatHistory` trims on the client, keeping the newest messages (the newest one is always kept) and starting on a user turn.
- `getClientIdentifier` prefers `x-nf-client-connection-ip`. `x-forwarded-for` and `x-real-ip` stay as fallbacks for local runs only.
- Rate limiting: `createRateLimiter(limit, windowMs, name)` is now async and uses Upstash Redis (fixed window, `@upstash/redis` added with Andreas's approval) when `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set. Identifiers are SHA-256 hashed in the keys. It falls back to the old per-process limiter (`createMemoryRateLimiter`) without env vars or if Redis fails. Each hit is one Redis transaction (`INCR`, `PEXPIRE NX`, `PTTL`), so a key never lacks a TTL. Chat also has a per-client cap of 40 requests per 24 hours (`chat-client-daily`) and a global cap of 300 per 24 hours (`chat-daily`), both checked after validation and just before the Groq call. A determined attacker with many IPs can still spend the global cap; that trades availability for a bounded bill.
- Contact form: hidden `ref_code` honeypot (autofill can fill it, so a hit returns an error that points to the email address, never a fake success) and a minimum fill time of 3 s (`elapsedMs` measured with `performance.now()`, so clock skew does not matter; `checkContactBot` in `lib/contact.ts`). Both values come from the client, so this only stops naive bots.
- `next.config.mjs`: CSP without nonce (`'unsafe-inline'` for script and style, `'unsafe-eval'` in dev only), `Permissions-Policy`, `Referrer-Policy: strict-origin-when-cross-origin`. `e2e/security.spec.ts` checks the headers and that every page plus the open chat has no CSP violations. If an external script, font or image is added later, update the CSP.
- Added `.github/dependabot.yml` (weekly npm and GitHub Actions, minor and patch grouped).
- Playwright now also blanks the Upstash env vars, so e2e never touches Redis.
- Baseline: `npm run check` (84 Vitest tests), `npm run build` and `npm run test:e2e` (43 tests) pass.
- **Andreas must do:** create a free Upstash Redis database, then add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in Netlify's environment variables. Until then the in-memory limiter is used. The new daily-cap message is English; the rest of the chat UI is still Norwegian (F7).
- Next: F3. Start a new conversation and say "Read docs/ROADMAP.md and do phase 3. Start in plan mode."

### F3 – 2026-10-28

- Tailwind 4: `tailwindcss` and `@tailwindcss/postcss` (devDependencies, added with Andreas's approval), `postcss.config.mjs` uses `@tailwindcss/postcss`, `tailwind.config.ts` is gone. `app/globals.css` has `@import "tailwindcss" source("../app")` and an `@theme` block with the same colours (camelCase names `primaryDark` and `secondaryDark` kept so no class names changed; F5 rewrites the tokens). Removed `daisyui`, `autoprefixer`, `postcss` and the direct `sharp` dependency (`next` still installs `sharp` as an optional dependency for `next start`; Netlify uses its own image CDN).
- Tailwind 4 differences handled: `outline-none` → `outline-hidden`, bare `rounded` → `rounded-sm`, `flex-grow` → `grow`, buttons keep `cursor: pointer` and placeholders keep gray-400 (both in `@layer base`), bare `border` on `Footer` and `ProjectTags` now names `border-gray-200` (v4 defaults to `currentColor`). The dead `mt-4` on the hero button row was removed: `space-y` overrode it in v3 but not in v4.
- `Breadcrumbs.tsx` and `Experience.tsx` no longer use daisyUI. The timeline is a grid per entry (measurements copied from the daisyUI version) and matches it pixel for pixel on desktop.
- `next/font`: Inter (`latin`, `display: swap`) as `--font-inter`, used by `--font-sans`. Self-hosted, so the CSP needs no change. Before F3 the site rendered in the browser's default sans-serif because Inter was never loaded, so text is a bit wider now and some lines wrap differently.
- Images: `formats` is `["image/avif", "image/webp"]`, `qualities` is `[75]`, `priority` → `preload` on the two LCP images (`About.tsx`, `app/about/page.tsx`), `quality={100}` removed.
- Deliberate differences from before F3: one breadcrumb separator instead of chevron plus `/`; breadcrumb links get a visible focus ring (daisyUI made it transparent); on mobile every timeline entry has the same bottom margin (daisyUI dropped it for the right-aligned entries, so the page was about 36 px shorter per such entry); Tailwind 4's palette is slightly different, so some greys and the green check icons shift a shade; `hover:` styles only apply on devices that can hover.
- Left for later: on `/about` the bullet list uses `list-inside`, so a wrapped item like "JavaScript Servers (Node.js, Express)" now breaks back to the bullet column at tablet width (wider Inter text exposes it). F6d rewrites that page. Not checked: Lighthouse/LCP (F8 runs it on a Netlify deploy preview).
- Baseline: `npm run check` (85 Vitest tests), `npm run build` and `npm run test:e2e` (43 tests) pass. `npm audit --omit=dev` reports 0 vulnerabilities. Screenshot sets in `screenshots/` (git-ignored): `before`, `after-tw4`, `after-font`.
- Next: F4 (split into 4a and 4b if needed). Start a new conversation and say "Read docs/ROADMAP.md and do phase 4a. Start in plan mode." Remember to add the axe scan for `not-found.tsx` then.

### F4a – 2026-10-28

- Renames: `About.tsx` → `Hero.tsx`, `/about` page component → `AboutPage`, `ContactClient.tsx` → `ContactForm.tsx`. `app/utils/seo.ts` moved to `lib/seo.ts` (import it as `@/lib/seo`).
- `Breadcrumbs` is a server component that takes `items: { label, href }[]` (the trail below Home, the last item is the current page). It is no longer in `app/layout.tsx`: every page renders it itself (`/projects`, `/about`, `/contact`, `/projects/[projectId]`). `navLabel(href)` in `data/site.ts` gives the label from `navigation`. 4b can reuse the same items for BreadcrumbList JSON-LD.
- `Header` is a server component. `NavLink.tsx` (client) handles the active state, `MobileMenu.tsx` (client) owns the dialog, the open button and the close-on-desktop effect. The link list is server-rendered and passed in as `children`; a click on any link inside closes the menu.
- `/contact`: the page itself is a server component with the contact details. Only `ContactForm.tsx` is a client component (form, messages, honeypot, fill time).
- New `app/not-found.tsx` (English, "Page not found", links to home and projects) and `app/global-error.tsx` (own `<html>`, imports `globals.css`). `error.tsx` and `global-error.tsx` use `retry` (Next 16.3+ docs prefer it over `reset`). `global-error` was checked in dev by throwing in the root layout (status 500, styled, button visible) and the throw was removed again. It has no automated test.
- Hardcoded text moved to `data/`: `site.intro` (hero paragraphs, word for word) and new `data/about.ts` (the `/about` prose and studies list, word for word; the paragraph that ends in "My studies covered:" lives in `studies.text` next to `studies.items`). `site.intro`, `site.description` and the about text overlap and have no shared source, so check them together in the F8 content review. The Inter setup is shared in `app/fonts.ts` (layout and `global-error`). Names, phone and location in `Hero`, the contact page and metadata descriptions come from `site`. Left alone on purpose: `aria-label` overrides (F6), Norwegian chat UI (F7), colour tokens (F5).
- Deliberate differences: the contact meta description now says "Torrevieja, Spain" (from `site.location`) instead of "Spain"; the remaining contact-page aria-labels use the full name; the `aria-label` is gone from the email link and the hero "Contact Me" link (it replaced the visible text), the others stay for F6; the hero `h1`/`h2` are uppercased with CSS instead of being typed in capitals; unknown routes show the new 404 page (no breadcrumbs). The before/after screenshots at 375/768/1440 px for all 7 routes are byte-identical.
- Tests: e2e checks the 404 heading and home link for unknown routes and unknown project ids, axe scans the 404 page (the gap from F1 is closed), Vitest covers `site.intro`, `navLabel` and `about`. The mobile menu test does not cover "click the link of the current page"; that was checked by hand.
- Baseline: `npm run check` (88 Vitest tests), `npm run build` and `npm run test:e2e` (51 tests, including a breadcrumb-trail check per route) pass. Screenshot sets in `screenshots/` (git-ignored): `before-f4a`, `after-f4a`, `after-f4a-review`.
- Next: F4b. Start a new conversation and say "Read docs/ROADMAP.md and do phase 4b. Start in plan mode." The slug decision (`holidaze`, `bidbazaar`, `golfassistant`?) is still open: ask Andreas before planning.

### F4b – 2026-10-29

- Slugs: project ids are now `holidaze`, `auction-website` and `golfassistant`. `data/projects.json` keeps the old numeric id as `legacyId`, and `next.config.mjs` builds the permanent (308) redirects `/projects/1|3|5` → slug from that file, so there is no second list to maintain. The chat prompt example link and the Markdown test fixtures use the slug. The screenshot files are now named `projects-<slug>.png`.
- Canonical per page: the root layout no longer spreads `generateSEO`, so it sets no canonical, `og:url` or image. Every page still gets its own canonical from `generateSEO`; the 404 page has none. `viewport.themeColor`, the manifest `theme_color` and `background_color` and the share image background all read `site.themeColor` (`#1A202C`, the page background; the manifest used `#9333EA` before). A data-integrity test checks that it matches `--color-background` in `app/globals.css`, so F5 has to change both together.
- Share image: `app/opengraph-image.tsx` (text only: name, title, host on `#1A202C`, default font so the name is not bold). A page's own `openGraph` replaces the one from the layout, including a file-based image, so on `/about`, `/contact` and `/projects` the generated image had disappeared. `generateSEO` therefore names `/opengraph-image` (1200×630) when no image is given; the route and size live in `shareImage` in `lib/seo.ts`, which `opengraph-image.tsx` also reads, and e2e checks that the PNG really has the size the page declares. The layout and `generateSEO` share `openGraphDefaults` and `twitterDefaults` for the same reason. Project pages keep their first screenshot. There is no `twitter-image` file (X falls back to `og:image`).
- Icons: made from `public/images/logo-new.webp` with a one-off `sharp` script (not committed; `sharp` is only `next`'s optional dependency): `app/icon.png` (96), `app/apple-icon.png` (180), `public/icons/icon-192.png` and `icon-512.png` for the manifest. `favicon.ico` is unchanged. Redo the icons if F5/F6 changes the logo.
- JSON-LD: `lib/structured-data.ts` builds Person (moved from the layout, still on every page), WebSite (home page only), BreadcrumbList (rendered by `Breadcrumbs` from the same `items` as the visible trail, so they cannot drift) and `SoftwareSourceCode` for projects. `app/components/JsonLd.tsx` renders them with `<` escaped. `site.image` is now only used by the Person block and the about page. The Person address country comes from `site.countryCode`.
- Tests: `tests/structured-data.test.ts`, extra cases in `tests/seo.test.ts` and `tests/data-integrity.test.ts` (legacy ids), and `e2e/seo.spec.ts` (redirects, sitemap, canonical and share image per route, no canonical on 404, theme colour, icons and manifest icons, JSON-LD per route including breadcrumbs matching the visible trail).
- Baseline: `npm run check` (99 Vitest tests), `npm run build` and `npm run test:e2e` (73 tests) pass. The 21 before/after screenshots at 375/768/1440 px are byte-identical to the F4a set (`after-f4b` vs `after-f4a-review`). Not run: Google's Rich Results test and a social-card preview (they need the deployed site; F8).
- Next: F5 (design system, needs input from Andreas): references and mood, dark only or light and dark, tokens, base components, re-enable axe `color-contrast`. Start a new conversation and say "Read docs/ROADMAP.md and do phase 5. Start in plan mode."

### F5 – 2026-10-29

- Decisions (Andreas): dark only, technical/developer mood, palette chosen by Claude. The old indigo `primary` and purple `secondary` are gone; there is one accent.
- Tokens in the `@theme` block of `app/globals.css` (kebab-case, so `bg-surface`, `text-muted`, `border-border`): `background` #0d1117, `surface` #161b22, `surface-raised` #1f262f, `border` #30363d (decorative), `border-control` #6e7681 (borders of inputs and tags, 3:1), `foreground` #e6edf3, `muted` #9da7b3, `accent` #2dd4bf, `accent-strong` #5eead4 (hover), `on-accent` #0d1117, `danger` #ff7b72, `success` #56d364. `site.themeColor` is `#0D1117` (tested against `--color-background`). The focus ring and skip link use `accent`.
- `tests/design-tokens.test.ts` parses `globals.css` and checks WCAG ratios: all text colours ≥ 4.5:1 on background, surface and surface-raised, `on-accent` on both accents, control border and focus ring ≥ 3:1. Change a token and this test tells you whether it still passes.
- Fonts: `JetBrains_Mono` via `next/font/google` in `app/fonts.ts` as `--font-mono` (used for tags, breadcrumbs and chat code). Inter stays for text.
- `components/ui/`: `Button` (variants `primary`/`secondary`, sizes `md`/`lg`, renders `<button>`, `next/link` or `<a>` depending on `href`/`download`), `TextLink`, `Card` (`interactive` adds the hover state), `Tag`, and `fieldStyles.ts` (`fieldClasses`, shared by the contact form and the chat input). A `Field` component was not made: the form's `aria-describedby` wiring is specific to it, so only the classes are shared. Tailwind scans `components/` through `@source` in `globals.css`; any new folder with class names needs the same.
- All 24 files that used colour classes now use tokens or the base components (no raw `gray-*`, `blue-*`, `white`, `primary*`, `secondary*` left in `app/`, apart from `bg-white` behind skill icons that need a light background and the black backdrops). The per-component `focus:ring-*` classes are gone; the one `:focus-visible` rule in `globals.css` covers everything.
- Deliberate differences: buttons are `rounded-md` everywhere (hero and CV buttons were pills), the CV button is outlined instead of filled purple, project links are filled/outlined teal, the contact-page social links are outlined buttons, the chat window is dark (header, bubbles, input), the user's chat bubbles are teal. Layout, spacing and copy are unchanged. The chat window is only recoloured (F7 rewrites it); it is still Norwegian.
- axe `color-contrast` is enforced again in `e2e/a11y.spec.ts` on every route, the 404 page, the open chat and the mobile menu, with no exclusions. Only `label-content-name-mismatch` is still deferred (F6).
- Known and left alone: a few skill icons are dark on the dark card (Node.js, .NET, Jest). They are images, so axe does not check them; look at them in F6b and give them the light background via `needsBackground` in `data/skills.ts` if they bother you. The app and manifest icons come from the logo, which has its own background, so they were not redone. Not run: Lighthouse (F8).
- Baseline: `npm run check` (125 Vitest tests), `npm run build` and `npm run test:e2e` (73 tests) pass. Screenshot sets (git-ignored): `before-f5` and `after-f5`.
- Next: F6a (layout: header, footer, breadcrumbs). Start a new conversation and say "Read docs/ROADMAP.md and do phase 6a. Start in plan mode." F6 also owns the `aria-label` clean-up.

### F5 follow-up – 2026-10-29

- New logo: an AU monogram (white A, teal U) drawn as SVG. `components/ui/Logo.tsx` renders it inline in the header with token colours (it follows the theme). `app/icon.png`, `app/apple-icon.png`, `public/icons/icon-192.png`/`icon-512.png` and `app/favicon.ico` (one 32 px PNG entry) were regenerated from the same shapes with a one-off `sharp` script (not committed; the colours are hard-coded in it: `#161b22`, `#e6edf3`, `#2dd4bf`). The apple and manifest icons are full-bleed squares, the favicon and `icon.png` have rounded corners. `public/images/logo-new.webp` was deleted. If the palette changes, redo the icons.
- `/about` was redone in the home page's style, a part of F6d done early: hero-style heading, large intro, Studies card with the studies as tags, story paragraphs, LinkedIn link, and Contact/Projects buttons. The photo is gone (the home page has the portrait); `site.image` (`andreas-bg.png`) is now only used by the Person JSON-LD. Text is unchanged and still comes from `data/about.ts`. F6d still covers the `aria-label` clean-up and a final look at this page.
- `Tag` is `inline-block` so a long tag wraps as one box on narrow screens.
- `/about` also has an "At a glance" card (role, location, email from `data/site.ts`, plus the CV button). From `lg` it sits in a right column and is sticky; below `lg` it comes after the buttons.

### F5 review fixes – 2026-10-29

- Review findings fixed: `fieldClasses` has no radius any more (callers add `rounded-md` or `rounded-full`, so two radius classes never compete); hover colours in `Button` and the chat send button use `not-disabled:hover:`, so a disabled button does not react to hover; skill tiles are no longer `interactive` cards; the share image reads its colours from `lib/theme.ts` (`themeColors`), which `tests/design-tokens.test.ts` checks against `globals.css`; the contrast test also covers the control border on `surface-raised` and the dialog close button pairs; `Button` defaults `type` to `"button"` even when a caller passes `type={undefined}`. Not changed: `href=""` still renders a link (only `undefined` gives a `<button>`), which is how the type is meant to work.
- **The F6 `aria-label` task is mostly done.** Removed the overrides on `CVDownload`, the contact page links and `ProjectLinks` (the "opens in new tab" hint is now visually hidden text inside the link, and project links say which project they belong to). Project cards use a stretched link around the title (`after:absolute after:inset-0` on the link, `relative` on the card, `z-10` on the buttons row), so the link name is the project title. `label-content-name-mismatch` is **no longer disabled in axe**: `e2e/a11y.spec.ts` has no `deferredRules` at all. Remaining `aria-label`s are on landmarks, icon-only controls and the chat UI (F7), none of which show visible text.
- Not run: a keyboard pass over the stretched project card (the focus ring is drawn on the card through `::after`); look at it in F6c.
- Baseline: `npm run check` (131 Vitest tests), `npm run build` and `npm run test:e2e` (73 tests, no axe exclusions) pass.

### RoboConnect content and Next.js update – 2026-11-26

- `next` was updated to 16.4.6 (lockfile only): 16.4.3 refused to start because of known advisories.
- RoboConnect was added to `data/experience.ts` as the only current entry, replacing "Seeking developer opportunities" (that text is already covered by the story in `data/about.ts`). The founder approved naming RoboConnect and asked for more detail and responsibility; Andreas chose not to send them the final wording. Do not add RoboConnect details beyond what is in `data/`: the source repository is private.
- `data/about.ts` has a second intro paragraph and a `howIWork` section, shown on `/about` before Studies. The experience description uses a blank line before the stack list (`whitespace-pre-line`).
- The chat prompt now describes the current role (it said "without a job") and includes `howIWork`.
- `site.title` is now "Junior Full-Stack Developer". The home intro, `site.description` and the About story say that Andreas is looking for a junior role in Spain or Norway and can relocate. `site.location` is unchanged. The RoboConnect role is unpaid, and since 2026-11-27 the experience entry and the chat prompt say so (it started as a summer position). The entry's wording was also made plainer, and the LinkedIn text uses the same words. Nothing on the site may suggest paid employment; employment type and hours are not stated.
- Skills are grouped (`skillGroups` in `data/skills.ts`; `skills` is the flat list used by the chat prompt and JSON-LD). Jest and the .NET tile were removed (.NET is still named in the study texts); Supabase, PostgreSQL, Prisma and Playwright were added. New icons: Simple Icons 15.0.0 paths with a fill colour (Supabase, PostgreSQL, Prisma, Node.js) and the Devicon 2.17.0 Playwright icon on a white background. `Skills.tsx` is now a list per group, with decorative icons (`alt=""`) and no `aria-label` on the names.
- The Facebook link was removed from the footer and from `site.social`.
- Open: the CV PDF needs the new role.
