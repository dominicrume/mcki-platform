/**
 * education.mckisolutions.com — THE ORIGINAL BUSINESS.
 * Content preserved from the old site via infra/crawl + content/education/*.md.
 * The agent must fold real crawled content here. Never present as legacy.
 */
import { readDoc } from "@mcki/content";

export default function EducationHome() {
  const doc = readDoc("education", "index");
  const d = (doc?.data ?? {}) as any;
  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: "96px 24px" }}>
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#1E5B8F" }}>
        MCKI · The Original Business
      </p>
      <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(32px,5vw,56px)", fontWeight: 800, color: "#111318", margin: "12px 0 16px" }}>
        {d.tagline ?? "We get students into the world's best universities."}
      </h1>
      <p style={{ fontSize: 18, color: "#555B68", maxWidth: 620, lineHeight: 1.7 }}>
        {d.hero_sub ?? "[ PRESERVE FROM OLD SITE ]"}
      </p>
      {/* AGENT: render d.services and fold in crawled content from infra/crawl/output */}
    </main>
  );
}
