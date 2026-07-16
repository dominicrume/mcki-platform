# Architecture — MCKI Platform

## The shape
A pnpm + Turborepo monorepo. Four independently deployable Next.js apps,
four shared packages, all copy as markdown.

## Apps → subdomains
- `apps/web` → mckisolutions.com — parent brand, two doors
- `apps/education` → education.mckisolutions.com — the original business
- `apps/ai` → ai.mckisolutions.com — the AI division (proof-led)
- `apps/live` → live.mckisolutions.com — the timeless event engine

## Why this structure (FDE rationale)
1. **Shared brand, zero duplication.** `packages/brand` is the one source
   of colour/type/spacing. Every app imports it. Change once, update all.
2. **Independent deploy + scale.** Event-day traffic on `live.` is isolated
   from the education admissions funnel. No shared failure domain.
3. **Hand-off friendly.** Any one app can be given to a different engineer
   without touching the others — clean boundaries.
4. **Grow without rewrite.** New division = new app + subdomain. Nothing
   else moves.

## The two-pillar principle
Education came first and is the foundation. AI grew from it. The parent
brand presents both as equal doors. The architecture encodes this: neither
pillar depends on the other, both share one brand.

## The event engine
`apps/live` renders events from `content/live/events/*.md`. One file = one
event. Modules (demos, scans, polls, Q&A, live build, start-here) are
independent. Timeless: any future event is a new markdown file, not a
rebuild.

## Content engine
`packages/content` reads markdown via gray-matter. All copy lives in
`content/`. Non-developers edit words without touching code. Adding a case
study or an event = adding a markdown file.

## Preservation
`infra/crawl` runs Firecrawl on the old education site and saves markdown
into `infra/crawl/output/`. The education app folds that real content in so
the original business is never lost.
