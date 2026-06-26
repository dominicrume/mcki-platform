# Preserve the Old Education Site

The original mckisolutions.com is an **education consultancy** (UK/EU and
international university admissions). The rebuild must NOT lose it.

## Steps
1. Get a Firecrawl API key from https://firecrawl.dev
2. `FIRECRAWL_API_KEY=xxx pnpm crawl`
3. Crawled pages land in `output/` as markdown.
4. The build agent reads `output/` and folds the real education content
   into `content/education/*.md`.

If you skip the crawl, the education app uses `[ PRESERVE FROM OLD SITE ]`
placeholders that you fill in by hand. Either way, the business is kept.
