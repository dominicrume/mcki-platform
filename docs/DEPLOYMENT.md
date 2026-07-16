# Deployment — Vercel multi-app

Each app is its own Vercel project, pointed at the monorepo, with a
distinct root directory and domain.

| Vercel project | Root directory | Domain |
|---|---|---|
| mcki-web | apps/web | mckisolutions.com |
| mcki-education | apps/education | education.mckisolutions.com |
| mcki-ai | apps/ai | ai.mckisolutions.com |
| mcki-live | apps/live | live.mckisolutions.com |

## Steps per app
1. New Vercel project → import the repo.
2. Set **Root Directory** to the app folder (e.g. `apps/live`).
3. Build command: `cd ../.. && pnpm install && pnpm build --filter @mcki/<app>`
4. Add the subdomain under Domains.
5. Add env vars from `.env.example` (Supabase, Cal.com, book links, etc.).

## DNS
Add CNAME records for `education`, `ai`, `live` → Vercel, and the apex/www
for the parent. Vercel handles SSL.

## Graceful degradation
If Supabase env vars are absent, forms and event data log locally and show
a success state. The apps always build and deploy.
