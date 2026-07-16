# MCKI Solutions — Platform Monorepo

**One brand. Two pillars. A timeless event engine.**

MCKI Solutions began as an **education consultancy** — helping students into
UK and international universities. From that foundation (a growing talent
pool and real teaching infrastructure) we opened an **AI division** that
builds working agentic-AI systems for businesses. This monorepo holds the
whole brand, architected so neither pillar is abandoned and the event
experience is reusable forever — not a one-off.

---

## The Architecture (at a glance)

```
                    ┌───────────────────────────────┐
                    │      mckisolutions.com        │
                    │      PARENT BRAND (apps/web)  │
                    │   Two doors: Education · AI   │
                    └───────────────┬───────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        ▼                           ▼                           ▼
┌────────────────┐        ┌────────────────┐         ┌────────────────┐
│ education.     │        │ ai.            │         │ live.          │
│ mckisolutions  │        │ mckisolutions  │         │ mckisolutions  │
│ .com           │        │ .com           │         │ .com           │
│ (apps/         │        │ (apps/ai)      │         │ (apps/live)    │
│  education)    │        │                │         │                │
├────────────────┤        ├────────────────┤         ├────────────────┤
│ University     │        │ Agentic AI     │         │ Timeless event │
│ admissions     │        │ builds, proof- │         │ engine: demos, │
│ Talent dev     │        │ led. Courses.  │         │ scan sessions, │
│ The ORIGINAL   │        │ The NEW        │         │ polls, Q&A —   │
│ business       │        │ division       │         │ decentralised  │
└────────────────┘        └────────────────┘         └────────────────┘

        Shared across all: packages/ui · packages/brand ·
        packages/content · packages/config
```

**Why subdomains.** Each pillar is independently deployable, independently
scalable, and cleanly separated — an event traffic spike on `live.` never
touches the education admissions funnel. Decentralised by design, unified
by one shared brand system.

---

## Why a Monorepo (FDE / scaling rationale)

A senior-FDE structure optimises for three things: **shared brand without
duplication, independent deployment, and the ability to hand any single
app to a different engineer without breaking the others.**

- **`apps/*`** — four independently deployable Next.js apps (web, education,
  ai, live). Each maps to one subdomain. Each scales on its own.
- **`packages/*`** — shared code used by all apps: the design system (`ui`),
  brand tokens (`brand`), the markdown content engine (`content`), and
  shared config (`config`). Change a brand colour once → every app updates.
- **`content/*`** — all copy as markdown, the single source of truth.
  Editors change words without touching code.
- **`infra/*`** — deployment, environment, and the Firecrawl job that
  preserves the old education site's content.

This is the structure that lets MCKI grow from 4 surfaces to 20 without a
rewrite. Add a new division = add an app + a subdomain. Nothing else moves.

---

## Apps

| App | Subdomain | Purpose |
|---|---|---|
| `apps/web` | mckisolutions.com | Parent brand. Routes visitors to the two pillars. |
| `apps/education` | education.mckisolutions.com | The original education consultancy. Content preserved from the old site. |
| `apps/ai` | ai.mckisolutions.com | The AI build division. Proof-led. Courses. |
| `apps/live` | live.mckisolutions.com | The timeless event engine. Demos, scans, polls, Q&A — each a separate module. |

## Shared Packages

| Package | Purpose |
|---|---|
| `packages/brand` | Design tokens: colours, type, spacing. One source of brand truth. |
| `packages/ui` | Shared components (Button, Section, Card, Nav) built on the tokens. |
| `packages/content` | Markdown reader (gray-matter). Every app reads copy through this. |
| `packages/config` | Shared TS, Tailwind, ESLint config. |

---

## Quick Start

```bash
pnpm install          # install all workspaces
pnpm dev              # run all apps in parallel
pnpm dev --filter web # run just the parent brand
pnpm build            # build everything
```

See `docs/ARCHITECTURE.md` for the deep dive, `docs/DEPLOYMENT.md` for the
Vercel multi-app setup, and `CLAUDE.md` for the agent build instructions.

---

*MCKI Solutions Ltd · Ravenhurst Street, Digbeth, Birmingham B12 0HD*
