import { readDoc } from "@mcki/content";
import { Section, Card, LeadForm } from "@mcki/ui";

export default function CoursesPage() {
  const doc = readDoc("ai", "courses");
  const d = (doc?.data ?? {}) as any;

  return (
    <main>
      <Section className="pt-24 pb-16">
        <p className="font-mono text-[12px] tracking-widest uppercase text-ai drop-shadow-[0_0_8px_rgba(255,215,0,0.4)] mb-3">
          MCKI · AI &amp; Agents
        </p>
        <h1 className="font-extrabold text-[clamp(32px,5vw,56px)] leading-tight text-white mb-4">
          {d.hero?.title}
        </h1>
        <p className="text-[18px] text-white/70 max-w-[620px] leading-relaxed mb-12">
          {d.hero?.subtitle}
        </p>

        {d.partner && (
          <div className="bg-ai/10 border border-ai/30 p-8 rounded-2xl mb-12 text-center">
            <h2 className="font-extrabold text-2xl text-white mb-2">{d.partner.title}</h2>
            <p className="text-white/70 text-[16px] max-w-[500px] mx-auto">{d.partner.subtitle}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {(d.courses ?? []).map((c: any, i: number) => (
            <Card 
              key={i}
              title={c.title} 
              tagline={c.tagline} 
              kicker={c.kicker}
              accentClass={c.accentClass}
              href={c.link}
              cta={c.cta}
            />
          ))}
        </div>

        <div className="bg-white/5 p-8 rounded-2xl max-w-[600px] mx-auto text-center border border-white/10">
          <h2 className="font-extrabold text-2xl text-white mb-3">{d.waitlist?.title}</h2>
          <p className="text-white/70 mb-6 text-[15px]">{d.waitlist?.subtitle}</p>
          <LeadForm formId="course-waitlist" accentClass="bg-ai" />
        </div>
      </Section>
    </main>
  );
}
