@AGENTS.md

# Portfolio (andreasulvund.no)

Personal portfolio for Andreas Ulvund, a junior web developer seeking a role. Next.js App Router, React, TypeScript (strict), Tailwind CSS. The chatbot uses Groq, the contact form uses Resend. Hosted on Netlify. The site is **English only**.

Work is split into phases. Read `docs/ROADMAP.md` for the plan, the current phase and handover notes from earlier sessions.

## Commands

- `npm run dev`: dev server
- `npm run check`: lint, typecheck, Vitest and Prettier check. Run before every commit.
- `npm run test:e2e`: Playwright e2e and axe checks (builds and starts the app itself)
- `npm run screenshots`: full-page screenshots at 375/768/1440 px in `screenshots/` (set `SCREENSHOT_LABEL` to name a set)
- `npm run build`: production build
- `npm run format`: apply Prettier
- Node 24 (see `.nvmrc`)

## Structure

- `app/`: routes, layout, API routes (`app/api/chat`, `app/api/contact`) and components in `app/components/`
- `data/`: all content. `site.ts` (identity, URLs, navigation), `projects.json`, `experience.ts`, `skills.ts`. The chatbot prompt is built from these too.
- `lib/`: shared validation (`chat.ts`, `contact.ts`) and server helpers in `lib/server/` (request parsing, rate limiting, chat prompt)
- `tests/`: Vitest tests. Providers are mocked, so tests never send email or call the AI API.
- `public/`: images, skill icons and the CV

## Conventions

- Server components by default. Add `"use client"` only where state or browser APIs are needed, and keep client components small.
- Read content from `data/`. Do not hardcode names, contact details or biography text in components.
- All user-visible text is English, including error messages and the chat UI.
- Keep accessibility intact: semantic HTML, visible focus, alt text, WCAG 2.2 AA contrast. Do not use `aria-label` to replace visible link or button text.
- Match the style of the surrounding code. Prettier decides formatting.
- Do not add dependencies without asking first.
- Never read or print `.env*` files. API keys stay server-side.

## Content rule

Never invent biographical facts: dates, courses, certifications, employers or AI experience. Only use what is in `data/`. If a fact is missing, ask.

## Definition of done

`npm run check`, `npm run build` and `npm run test:e2e` pass. For UI changes, also look at the result in a browser at mobile and desktop widths.

## Git

Work on a branch named `phase-N-<name>` (or `fix/...`). Never commit to `main` directly. Small commits with clear messages. Do not push or open a PR unless asked.

## Context discipline

Keep sessions short and focused on one phase. Use Explore subagents for broad searches. In the Next.js docs, read only the relevant guide. At the end of a session, update the status and handover notes in `docs/ROADMAP.md`.
