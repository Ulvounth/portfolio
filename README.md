# Andreas Ulvund — portfolio

Next.js App Router, React, TypeScript and Tailwind CSS. The chatbot uses Groq; the contact form uses Resend.

## Local development

Use Node.js 24 (see `.nvmrc`).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Set `GROQ_API_KEY` for chat and `RESEND_API_KEY` for email. `GROQ_MODEL` is optional. `EMAIL_FROM` must use a domain verified in Resend; `EMAIL_TO` sets the recipient. Keys are used only by server routes. Pages build without keys; unconfigured integrations return a recoverable error.

Rate limits are shared between Netlify instances when `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set (free Upstash Redis database, REST API). The chat then also has a cap of 40 requests per client and 300 in total per 24 hours. Without them the API routes fall back to a per-process limiter, which works but is weaker.

## Checks

```sh
npm run check
npm run build
```

`check` runs ESLint, TypeScript, Vitest and formatting checks. Use `npm run format` to format source files. GitHub Actions runs the same checks and production build. Tests mock the providers and never send emails or use paid AI calls.

## Content and structure

- `data/site.ts`: public identity, URLs, contact details and navigation.
- `data/projects.json`: projects, screenshots and links. Preserve IDs to keep existing URLs stable.
- `data/experience.ts` and `data/skills.ts`: shared by the website and chatbot context.
- `app/components/`: UI, including shared project cards, links, tags and native dialogs.
- `app/utils/seo.ts`: consistent metadata for every page.
- `lib/contact.ts` and `lib/chat.ts`: shared validation and chat stream decoding.
- `lib/server/`: request parsing, rate limiting and chatbot instructions.

Keep biography text accurate and update `site.updatedAt` when content changes. The CV is a separately maintained file in `public/cv/`.

## Production

```sh
npm run build
npm start
```

Configure server environment variables in your hosting provider. The application needs a Node.js runtime for its API routes.

The built-in rate limiter is bounded and works per process. For limits shared across multiple serverless instances, use a shared store. Forwarded IP headers must be set by a trusted hosting proxy; direct public exposure of the Node server requires configuring that proxy first.
