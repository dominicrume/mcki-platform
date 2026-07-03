/**
 * Parent brand homepage — mckisolutions.com
 * Two doors of equal dignity: Education (the original business) and AI.
 */
import { readDoc } from "@mcki/content";
import { brand, promise } from "@mcki/brand/tokens";
import { Section, Card } from "@mcki/ui";

export default function Home() {
  const doc = readDoc("web", "home");
  const d = (doc?.data ?? {}) as any;

  return (
    <main>
      {/* HERO */}
      <Section className="pt-24 pb-16">
        <p className="font-mono text-[12px] tracking-widest uppercase text-ai drop-shadow-[0_0_8px_rgba(255,215,0,0.4)] mb-4">
          {brand.name} · Birmingham
        </p>
        <h1 className="font-extrabold text-[clamp(34px,6vw,64px)] leading-[1.02] text-white mb-5" dangerouslySetInnerHTML={{ __html: d.hero?.title || "" }} />
        <p className="text-[18px] text-white/70 max-w-[620px] leading-relaxed">
          {d.hero?.subtitle}
        </p>
      </Section>

      {/* TWO DOORS */}
      <Section className="pt-0 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card
            accentClass="bg-education"
            kicker="The original business"
            title="Education"
            tagline={brand.pillars.education.tagline}
            href={process.env.NEXT_PUBLIC_EDUCATION_URL || "https://education.mckisolutions.com"}
            cta="Enter Education →"
          />
          <Card
            accentClass="bg-ai"
            kicker="The new division"
            title="AI & Agents"
            tagline={brand.pillars.ai.tagline}
            href={process.env.NEXT_PUBLIC_AI_URL || "https://ai.mckisolutions.com"}
            cta="Enter AI →"
          />
        </div>
      </Section>

      {/* PROMISE */}
      <section className="bg-white/5 py-14 px-6 border-y border-white/10">
        <div className="max-w-[1000px] mx-auto flex gap-10 flex-wrap justify-center">
          {promise.map((p) => (
            <div key={p.label} className="text-center">
              <div className="font-extrabold text-4xl text-ai mb-1">{p.value}</div>
              <div className="text-[13px] tracking-widest uppercase text-white/70">{p.label}</div>
            </div>
          ))}
        </div>
        <p className="text-center mt-6 text-white/70 text-[14px]">
          {d.promise?.note}
        </p>
      </section>

      <footer className="py-10 px-6 text-center text-white/50 text-[13px]">
        {brand.name} · {brand.address} · {brand.email}
      </footer>
    </main>
  );
}
