/**
 * ai.mckisolutions.com — THE AI DIVISION. Proof-led.
 * Renders content/ai/index.md + content/proof/*.md case studies.
 */
import { readDoc, listDocs } from "@mcki/content";
import { Section, Card } from "@mcki/ui";

export default function AiHome() {
  const doc = readDoc("ai", "index");
  const d = (doc?.data ?? {}) as any;
  const proof = listDocs("proof");
  const builds = d.builds ?? [];

  return (
    <main>
      <Section className="pt-24 pb-16">
        <p className="font-mono text-[12px] tracking-widest uppercase text-ai drop-shadow-[0_0_8px_rgba(255,215,0,0.4)] mb-3">
          MCKI · AI &amp; Agents
        </p>
        <h1 className="font-extrabold text-[clamp(32px,5vw,56px)] leading-tight text-white mb-4">
          {d.tagline ?? "We build the AI agents that run your business."}
        </h1>
        <p className="text-[18px] text-white/70 max-w-[620px] leading-relaxed mb-12">
          {d.hero_sub ?? ""}
        </p>

        <h2 className="font-extrabold text-2xl text-white mb-6">Our Builds & Training</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {builds.map((b: any, i: number) => (
            <Card key={i} title={b.title} tagline={b.desc} accentClass="bg-ai" />
          ))}
        </div>
        <div className="mb-16">
          <a href="/courses" className="inline-block px-6 py-3 rounded-xl bg-ai text-ink font-bold transition-transform hover:-translate-y-0.5 shadow-sm hover:shadow-md">
            View Training Courses →
          </a>
        </div>

        <h2 className="font-extrabold text-2xl text-white mb-6">The Proof</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {proof.map((p) => {
            const pd = p.data as any;
            return (
              <Card key={p.slug} title={pd.client} tagline={pd.build} href={`/proof/${p.slug}`} cta="Read Case Study →" />
            );
          })}
        </div>
      </Section>
    </main>
  );
}
