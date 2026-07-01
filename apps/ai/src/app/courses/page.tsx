import { readDoc } from "@mcki/content";
import { Section, Card, LeadForm } from "@mcki/ui";

export default function CoursesPage() {
  const doc = readDoc("ai", "courses");
  const d = (doc?.data ?? {}) as any;

  return (
    <main>
      <Section className="pt-24 pb-16">
        <p className="font-mono text-[12px] tracking-widest uppercase text-ai mb-3">
          MCKI · AI &amp; Agents
        </p>
        <h1 className="font-extrabold text-[clamp(32px,5vw,56px)] leading-tight text-ink mb-4">
          {d.hero?.title}
        </h1>
        <p className="text-[18px] text-mid max-w-[620px] leading-relaxed mb-12">
          {d.hero?.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {(d.courses ?? []).map((c: any, i: number) => (
            <Card 
              key={i}
              title={c.title} 
              tagline={c.tagline} 
              kicker={c.kicker}
              accentClass={c.accentClass}
            />
          ))}
        </div>

        <div className="bg-bgSoft p-8 rounded-2xl max-w-[600px] mx-auto text-center border border-line">
          <h2 className="font-extrabold text-2xl text-ink mb-3">{d.waitlist?.title}</h2>
          <p className="text-mid mb-6 text-[15px]">{d.waitlist?.subtitle}</p>
          <LeadForm formId="course-waitlist" accentClass="bg-ai" />
        </div>
      </Section>
    </main>
  );
}
