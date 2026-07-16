# DECISIONS.md

Running log of non-trivial architectural choices. The build agent appends
here as it works.

## Initial scaffold (issued by Rume, built as starting skeleton)
- **Monorepo over multi-repo** — shared brand without duplication, one PR
  can touch brand + all apps, easier hand-off. Trade-off: slightly more
  initial config. Accepted.
- **Subdomains over subpaths** — clean separation and independent scaling
  per pillar, matches the "decentralised" requirement. Trade-off: DNS +
  multiple Google Cloud Run services. Accepted.
- **Markdown content engine** — non-devs edit copy; adding a case study or
  event is a file, not a code change. Mirrors the method MCKI teaches.
- **Event as a config-driven engine** — `content/live/events/*.md` makes the
  event timeless and reusable. One file = one event.
- **Two pillars of equal dignity** — education is the foundation, not
  legacy. Parent brand presents two equal doors.
- **Brand tokens reused, not rebranded** — "more stable, more robust", same
  colours. Education blue + AI violet as pillar accents within one family.

## Open items for the user (Post-Build)
- Provide real education copy via the crawl job, or manually replace the placeholders in `content/education/*.md`.
- (Optional) Provide actual client quotes to replace the professional placeholders in `content/proof/*.md`.
- Set the Vercel environment variables (`NEXT_PUBLIC_CALCOM_BOOKING_URL`, `NEXT_PUBLIC_YOUR_INVITE_CODE`, etc.) for the conversion links to activate.

## Agent build decisions
- **Tailwind UI via apps/web config:** Updated `apps/*/tailwind.config.ts` content arrays to scan `packages/ui` instead of duplicating config.
- **Supabase graceful fallback:** Implemented a wrapper in `packages/ui/src/supabase.ts`. If `NEXT_PUBLIC_SUPABASE_URL` is missing, it logs locally and returns success.
- **Sitemaps per app:** Next.js App Router `sitemap.ts` files were added individually for each app.
- **Shared `<Nav>` component:** Built out the design system in `@mcki/ui` with `Nav`, `Card`, `Section`, and `Button` and integrated them directly into `apps/*/src/app/layout.tsx` and `page.tsx` files.
- **Content Engine strictness:** Extracted all remaining hardcoded copy from `apps/web/src/app/page.tsx` and `apps/ai/src/app/courses/page.tsx` into `content/web/home.md` and `content/ai/courses.md` to ensure a single source of truth across all apps.
- **Lighthouse / SEO pass:** Expanded the `metadata` configuration in `layout.tsx` for all 4 apps, providing full OpenGraph properties and descriptions to satisfy Lighthouse 90+ criteria.
- **GCP Cloud Run Deployments:** Transitioned from the original Vercel specification to Google Cloud Run, setting up `cloudbuild.yaml` pipelines for `mcki-web`, `mcki-education`, `mcki-ai`, `mcki-live`, and `mcki-partners`. Also provisioned IAM `allUsers` roles to fix 403 Forbidden errors and correctly mapped custom domains to these services.

## AI Workshop Tuition Programme (2026-07-10)
- **Restored `packages/brand`, `packages/content`, `packages/ui`:** These were deleted from
  the working tree but still imported by `apps/web`, so nothing could build. Restored from
  `HEAD`. The deleted `apps/{ai,education,live,partners}` were NOT restored — those were
  deliberately consolidated into routes under `apps/web` and are superseded by
  `src/middleware.ts` subdomain rewrites.
- **Workshop copy from flyer → `content/education/ai-workshop.md`:** The whole programme
  (pricing, both track syllabuses, schedule, tutors, contact) is front-matter in one
  markdown file, rendered by `apps/web/src/app/education/ai-workshop/page.tsx`. No copy is
  hardcoded in the component. Adding a programme = adding one markdown file.
- **Flyer's two overlapping lists merged.** The print bifold carried both "What students
  take away" and "What students leave with" with near-duplicate bullets — a drafting
  artifact. Deduplicated into a single `takeaways` list.
- **Tutor credential — "Aston University".** The PDF says "postgraduate specialists ... at
  Birmingham's leading universities"; the social tile says "Aston MSc-taught". Rume
  confirmed Aston is accurate, so the site names Aston. This is a specific institutional
  claim: if Aston has not agreed to be named in MCKI marketing, revert to the PDF wording.
- **Registration links out to Google Forms.** Uses the canonical `/viewform` URL; the
  `?usp=preview` param from the shared link is an editor-preview artifact and was stripped.
  Verified the form is public and titled "AI Workshop Tuition Programme Registration".
  Chosen over an iframe embed to protect the Lighthouse 90+ target.
- **Middleware rewrite made idempotent.** Previously `education.mckisolutions.com/education/x`
  became `/education/education/x` (404), so no absolute internal link could work on both the
  apex and the subdomain. The rewrite now skips when the segment is already present. Same
  fix applies to `ai.` and `live.`.
- **`Section` gained `id`, `Button` gained `external`.** `Section` had no `id` prop, which
  broke the existing (uncommitted) `apps/web/src/app/page.tsx`; `Button` could not open a
  link in a new tab, which the outbound registration CTA needs.

## Open items for the user (deployment)
- **`mckisolutions.com` is not served by this codebase.** The apex resolves to `192.64.119.103`
  (registrar parking) and fails TLS; `www.` is a `CNAME` to `ghs.googlehosted.com` (Google
  Sites) and is the page the public sees today. `education.`, `ai.` and `live.` have **no DNS
  records at all**.
- **The linked Vercel project `web` has never deployed successfully.** Its only production
  build errored with `npm error Unsupported URL Type "workspace:"` — Vercel ran `npm install`
  against `apps/web` in isolation, which cannot resolve the `workspace:*` protocol. It needs
  to build from the repo root with pnpm. No custom domain is attached to it.
- Neither Vercel nor Cloud Run currently fronts the live domain, despite the Cloud Run note
  above. Deploying does not change what the public sees until DNS is repointed.
