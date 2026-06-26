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
- Fold real education content from infra/crawl/output into content/education.
- Insert real testimonies (Matlub, Code Auditor, Veritaporte) — placeholders now.
- Fill conversion links (Cal.com, book links, community) from env.
- Build out full pages, components, forms, SEO per CLAUDE.md.
