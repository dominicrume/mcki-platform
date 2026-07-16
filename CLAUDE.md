# CLAUDE.md — MCKI Platform Build Instructions

Read this file fully before doing anything. This is the goal file for the
coding agent building the MCKI Solutions platform. Follow it exactly. Work
autonomously overnight. Log every non-trivial decision in `DECISIONS.md`.

---

## THE GOAL (Definition of Done)

Build the complete **MCKI Solutions platform** — a monorepo of four
independently deployable Next.js apps under one brand, representing a
company with **two pillars**:

1. **Education** (the ORIGINAL business) — university admissions and
   educational consulting. This must NOT be abandoned or minimised.
2. **AI & Agents** (the NEW division) — agentic-AI builds that grew out of
   the education infrastructure (a talent pool + teaching capability).

Plus a **timeless event engine** (`live.`) that delivers the full event
experience — demos, scan sessions, polls, Q&A — reusable for any future
event, not hardwired to one date.

**Done when:** every item in the ACCEPTANCE CHECKLIST is true, all four
apps build with zero errors, and the platform deploys to Vercel.

---

## THE STORY — NEVER LOSE THIS

MCKI started in education. Because we grew a talent pool and already had
teaching infrastructure, we opened an AI division. The new brand honours
BOTH. We are not abandoning the old business because of the AI events —
we are unifying them under one stronger brand:

- **Education pillar:** "We get students into the world's best universities."
- **AI pillar:** "We build the AI agents that run your business." Promise:
  **5x cheaper · 7x faster · 10x clearer.**
- **One brand, two doors.** The parent site routes each visitor to the
  pillar they came for.

---

## PRESERVE THE OLD EDUCATION SITE (critical)

The current mckisolutions.com is the education-consultancy site (UK/EU and
international student admissions advisory, talent-to-opportunity matching).
**Do not lose this content.**

- A Firecrawl crawl of the old site goes in `infra/crawl/output/`. The
  agent must read every file there and fold the real education content into
  `content/education/*.md`.
- If `infra/crawl/output/` is empty (crawl not yet run), build the
  education app from `content/education/*.md` using the known positioning
  and leave clear `[ PRESERVE FROM OLD SITE: ... ]` placeholders where the
  original copy should slot in. Never fabricate education credentials,
  partner universities, or success stats — placeholder them.

---

## STACK (use exactly this)

- **pnpm workspaces + Turborepo** monorepo
- **Next.js 14** (App Router, TypeScript) per app
- **Tailwind CSS** consuming tokens from `packages/brand`
- **Markdown content** via `packages/content` (gray-matter). No hardcoded copy.
- **Supabase** for forms + event data (polls, signups, leads). Degrade
  gracefully if env vars absent — apps must always build.
- **Vercel** deployment, one project per app, mapped to subdomains.
- Keep dependencies minimal. No CMS, no public-visitor auth.

---

## SUBDOMAIN MAP

| App | Subdomain | Build priority |
|---|---|---|
| `apps/web` | mckisolutions.com | 1 — the parent brand + two doors |
| `apps/education` | education.mckisolutions.com | 2 — preserve old business |
| `apps/ai` | ai.mckisolutions.com | 2 — proof-led AI division |
| `apps/live` | live.mckisolutions.com | 3 — timeless event engine |

---

## THE EVENT ENGINE (`apps/live`) — BUILD TIMELESS

The biggest rethink: `live.` is NOT a one-off page for one event. It is a
reusable engine. Each part is a separate, decentralised module:

- **Module: Demos** — the watch-the-board demos, configurable per event.
- **Module: Scan Sessions** — QR-driven phone moments (the agentic scan
  sessions), each independent.
- **Module: Polls** — live audience polls, results in realtime.
- **Module: Q&A / Questions** — audience question capture.
- **Module: Start Here** — the conversion block: books, course, booking
  call, community.

Drive each event from a single config file `content/live/events/<slug>.md`.
A new event = a new markdown file. The engine renders it. Same brand,
stable, robust, timeless.

Every module must work independently — if polls fail, demos still run.
Decentralised by design.

---

## FOLDER STRUCTURE (build to this)

```
mcki-platform/
├── CLAUDE.md  DECISIONS.md  README.md
├── package.json  pnpm-workspace.yaml  turbo.json
├── apps/
│   ├── web/         # parent brand → mckisolutions.com
│   ├── education/    # → education.mckisolutions.com
│   ├── ai/           # → ai.mckisolutions.com
│   └── live/         # → live.mckisolutions.com (event engine)
├── packages/
│   ├── brand/        # design tokens (colours, type, spacing)
│   ├── ui/           # shared components on the tokens
│   ├── content/      # markdown reader (gray-matter)
│   └── config/       # shared TS / Tailwind / ESLint config
├── content/
│   ├── education/    # education copy (preserve old site here)
│   ├── ai/           # AI division copy + proof
│   ├── proof/        # case studies (Matlub, Code Auditor, Veritaporte)
│   └── live/
│       └── events/   # one markdown file per event
├── infra/
│   ├── crawl/        # Firecrawl job + output of old site
│   └── deploy/       # vercel config notes
├── docs/
│   ├── ARCHITECTURE.md
│   └── DEPLOYMENT.md
└── .github/workflows/ci.yml
```

---

## HARD RULES (do not break)

1. **Two pillars, equal dignity.** Never present education as legacy or
   lesser. It is the foundation the AI division stands on.
2. **Mobile-first always.** Especially `apps/live` — phones in a live room.
3. **One source of truth.** All copy in `content/*.md`. No duplication.
4. **Proof beats adjectives.** No AI claim without a real proof beside it.
5. **Keep the proprietary build METHOD off all public surfaces.** Teach the
   shape, sell the depth via the course.
6. **Never fabricate.** No invented testimonials, university partners,
   metrics, or credentials. Use clearly-marked placeholders.
7. **Secrets only in `.env`.** `.env.example` committed, real keys never.
8. **Brand only** — consume `packages/brand` tokens. Same brand colours
   across all four apps. No off-brand colours/fonts.
9. **Every app must build and deploy independently.** A failure in one app
   never blocks the others.
10. **Change one thing at a time.** Small, described commits.

---

## BUILD ORDER (overnight)

1. Scaffold the monorepo: pnpm-workspace, turbo.json, root config. Commit.
2. `packages/brand` — tokens (reuse existing MCKI brand colours). Commit.
3. `packages/content` — gray-matter markdown reader. Commit.
4. `packages/ui` — Button, Section, Card, Nav on the tokens. Commit.
5. `apps/web` — parent brand, two doors (Education / AI). Commit.
6. `apps/education` — preserve old business; read crawl output if present. Commit.
7. `apps/ai` — proof-led AI division + courses. Commit.
8. `apps/live` — the event engine with the five modules. Commit.
9. Wire Supabase (forms + event data) with graceful fallback. Commit.
10. SEO, OG, sitemaps per app. Commit.
11. `pnpm build` across all apps; fix every error; Lighthouse pass. Commit.
12. Finalise `docs/*` and `DECISIONS.md`.

---

## ACCEPTANCE CHECKLIST (done when ALL true)

- [ ] `pnpm build` builds all four apps with zero errors
- [ ] Parent site presents two equal doors: Education and AI
- [ ] Education app preserves the original business (real content or clear
      preserve-placeholders; nothing fabricated)
- [ ] AI app is proof-led with the three case studies + the 5x/7x/10x promise
- [ ] `live` event engine renders an event from a single markdown file
- [ ] `live` modules (demos, scans, polls, Q&A, start-here) each work
      independently
- [ ] All four apps share ONE brand via `packages/brand` — identical colours
- [ ] All copy lives in `content/*.md`; none hardcoded
- [ ] Adding a case study = adding one markdown file
- [ ] Adding an event = adding one markdown file
- [ ] Forms + event data submit, or degrade gracefully without Supabase env
- [ ] Lighthouse 90+ (perf, a11y, SEO) on each app
- [ ] No proprietary method exposed publicly
- [ ] No fabricated quotes, universities, metrics, or credentials
- [ ] Each app deploys independently to Vercel on its subdomain
- [ ] `README.md`, `docs/*`, `DECISIONS.md` complete

---

## IF YOU FINISH EARLY

Tighten copy. Improve mobile spacing. Add subtle on-brand micro-interactions
(no heavy animation libs). Do NOT add scope or new pillars. A focused
platform that converts beats a sprawling one that confuses.

---

*MCKI Solutions Ltd · Build goal issued for overnight completion.*
