/**
 * education.mckisolutions.com — THE ORIGINAL BUSINESS.
 * Content preserved from the old site via infra/crawl + content/education/*.md.
 * The agent must fold real crawled content here. Never present as legacy.
 */
import { readDoc } from "@mcki/content";
import { Section, Card } from "@mcki/ui";

export default function EducationHome() {
  const doc = readDoc("education", "index");
  const d = (doc?.data ?? {}) as any;
  const services = d.services ?? [];

  return (
    <main>
      <Section className="pt-24 pb-16">
        <p className="font-mono text-[12px] tracking-widest uppercase text-ai drop-shadow-[0_0_8px_rgba(255,215,0,0.4)] mb-3">
          MCKI · The Original Business
        </p>
        <h1 className="font-extrabold text-[clamp(32px,5vw,56px)] leading-tight text-white mb-4">
          {d.tagline ?? "We get students into the world's best universities."}
        </h1>
        <p className="text-[18px] text-white/70 max-w-[620px] leading-relaxed mb-10">
          {d.hero_sub ?? "[ PRESERVE FROM OLD SITE ]"}
        </p>
        
        <h2 className="font-extrabold text-2xl text-white mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {services.map((s: any, i: number) => (
            <Card key={i} title={s.title} tagline={s.desc} accentClass="bg-education" />
          ))}
        </div>

        <div className="prose prose-lg max-w-[800px] prose-headings:font-extrabold prose-headings:text-white prose-p:text-white/70 prose-p:leading-relaxed prose-li:text-white/70 prose-blockquote:border-l-ai prose-blockquote:text-white prose-blockquote:italic" dangerouslySetInnerHTML={{ __html: doc?.body ?? "" }} />
      </Section>
    </main>
  );
}
