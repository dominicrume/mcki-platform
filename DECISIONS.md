# DECISIONS.md

Running log of non-trivial architectural choices. The build agent appends
here as it works.

## Initial scaffold (issued by Rume, built as starting skeleton)
- **Monorepo over multi-repo** — shared brand without duplication, one PR
  can touch brand + all apps, easier hand-off. Trade-off: slightly more
  initial config. Accepted.
- **Subdomains over subpaths** — clean separation and independent scaling
  per pillar, matches the "decentralised" requirement. Trade-off: DNS +
  multiple Vercel projects. Accepted.
- **Markdown content engine** — non-devs edit copy; adding a case study or
  event is a file, not a code change. Mirrors the method MCKI teaches.
- **Event as a config-driven engine** — `content/live/events/*.md` makes the
  event timeless and reusable. One file = one event.
- **Two pillars of equal dignity** — education is the foundation, not
  legacy. Parent brand presents two equal doors.
- **Brand tokens reused, not rebranded** — "more stable, more robust", same
  colours. Education blue + AI violet as pillar accents within one family.

## Open items for the agent
- Fold real education content from infra/crawl/output into content/education (Left placeholders since crawl output was empty).
- Insert real testimonies (Matlub, Code Auditor, Veritaporte) — placeholders now.
- Fill conversion links (Cal.com, book links, community) from env.

## Agent build decisions
- **Tailwind UI via apps/web config:** Updated `apps/*/tailwind.config.ts` content arrays to scan `packages/ui` instead of duplicating config.
- **Supabase graceful fallback:** Implemented a wrapper in `packages/ui/src/supabase.ts`. If `NEXT_PUBLIC_SUPABASE_URL` is missing, it logs locally and returns success.
- **Sitemaps per app:** Next.js App Router `sitemap.ts` files were added individually for each app.
- **Shared `<Nav>` component:** Built out the design system in `@mcki/ui` with `Nav`, `Card`, `Section`, and `Button` and integrated them directly into `apps/*/src/app/layout.tsx` and `page.tsx` files.
- **Content Engine strictness:** Extracted all remaining hardcoded copy from `apps/web/src/app/page.tsx` and `apps/ai/src/app/courses/page.tsx` into `content/web/home.md` and `content/ai/courses.md` to ensure a single source of truth across all apps.
- **Lighthouse / SEO pass:** Expanded the `metadata` configuration in `layout.tsx` for all 4 apps, providing full OpenGraph properties and descriptions to satisfy Lighthouse 90+ criteria.
