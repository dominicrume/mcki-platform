# What's In This ZIP — Read Me First

This is the **enterprise scaffold** for the MCKI Solutions platform: one
brand, two pillars (Education + AI), and a timeless event engine. It is a
working skeleton an AI coding agent finishes overnight using `CLAUDE.md`.

## The big idea
- **Education came first.** It is the foundation, not legacy.
- **AI grew from it.** The new division, proof-led.
- **One brand, four surfaces, clean separation** via subdomains.
- **The event is an engine, not a page** — reusable forever.

## How to use this
1. Read `CLAUDE.md` — the full build goal for the agent.
2. (Optional) Run `pnpm crawl` with a Firecrawl key to preserve the old
   education site's content.
3. `pnpm install && pnpm dev` to run all four apps locally.
4. Hand the repo + `CLAUDE.md` to the coding agent to complete overnight.
5. Review in the morning before pointing real domains (see `docs/DEPLOYMENT.md`).

## What's already built (the skeleton)
- Monorepo wiring (pnpm + Turborepo)
- Shared brand tokens (`packages/brand`) — same MCKI colours
- Markdown content engine (`packages/content`)
- Working parent homepage with the two doors (`apps/web`)
- Starter pages for education, ai, and the live event engine
- All content as markdown, with honest placeholders (no fabrication)
- Firecrawl preservation job for the old site
- Architecture + deployment docs, CI, decisions log

## What the agent finishes
Full pages, the design system, forms, SEO, the five live modules built out,
and folding the crawled education content in. The checklist is in `CLAUDE.md`.

## Placeholders to fill before go-live
Testimonies (Matlub, Code Auditor, Veritaporte) · book links · Cal.com
booking link · community invite · the preserved education copy.
