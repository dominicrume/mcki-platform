/**
 * Preserve the OLD education business.
 *
 * Crawls the current mckisolutions.com (the education consultancy site) and
 * saves every page as markdown into infra/crawl/output/. The build agent
 * then folds this real content into content/education/*.md so the original
 * business is never lost in the rebuild.
 *
 * Run:  FIRECRAWL_API_KEY=xxx node infra/crawl/firecrawl-old-site.mjs
 *
 * Requires a Firecrawl API key (https://firecrawl.dev). If you don't have
 * one, the education app falls back to placeholders marked
 * [ PRESERVE FROM OLD SITE: ... ] and you fill them by hand.
 */
import fs from "node:fs";
import path from "node:path";

const KEY = process.env.FIRECRAWL_API_KEY;
const TARGET = "https://mckisolutions.com";
const OUT = path.resolve("infra/crawl/output");

if (!KEY) {
  console.error("No FIRECRAWL_API_KEY set. Skipping crawl.");
  console.error("The education app will use preserve-placeholders instead.");
  process.exit(0);
}

fs.mkdirSync(OUT, { recursive: true });

const res = await fetch("https://api.firecrawl.dev/v1/crawl", {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${KEY}` },
  body: JSON.stringify({
    url: TARGET,
    limit: 50,
    scrapeOptions: { formats: ["markdown"], onlyMainContent: true },
  }),
});

const job = await res.json();
console.log("Crawl started:", job.id || job);

// Poll for completion
let done = false, data = null;
while (!done) {
  await new Promise((r) => setTimeout(r, 4000));
  const check = await fetch(`https://api.firecrawl.dev/v1/crawl/${job.id}`, {
    headers: { Authorization: `Bearer ${KEY}` },
  });
  const status = await check.json();
  if (status.status === "completed") { done = true; data = status.data; }
  else if (status.status === "failed") { console.error("Crawl failed"); process.exit(1); }
  else process.stdout.write(".");
}

(data || []).forEach((page, i) => {
  const slug = (page.metadata?.title || `page-${i}`)
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  fs.writeFileSync(path.join(OUT, `${slug}.md`),
    `---\nsource: ${page.metadata?.sourceURL || ""}\ntitle: ${page.metadata?.title || ""}\n---\n\n${page.markdown || ""}`);
});

console.log(`\nSaved ${(data||[]).length} pages to infra/crawl/output/`);
console.log("Now fold these into content/education/*.md — preserve the business.");
