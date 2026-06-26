import { Section, Card, LeadForm } from "@mcki/ui";

export default function CoursesPage() {
  return (
    <main>
      <Section className="pt-24 pb-16">
        <p className="font-mono text-[12px] tracking-widest uppercase text-ai mb-3">
          MCKI · AI &amp; Agents
        </p>
        <h1 className="font-extrabold text-[clamp(32px,5vw,56px)] leading-tight text-ink mb-4">
          Learn how to build what we build.
        </h1>
        <p className="text-[18px] text-mid max-w-[620px] leading-relaxed mb-12">
          We open-source our proprietary methods through our training programmes. Learn agentic AI architecture from the engineers who build it for enterprise.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          <Card 
            title="The Foundations" 
            tagline="Understand agentic workflows, prompt engineering, and the tools required to build basic agents." 
            kicker="£600"
            accentClass="bg-line"
          />
          <Card 
            title="The Builder" 
            tagline="Learn how to orchestrate multi-agent systems and deploy them to production environments." 
            kicker="£799"
            accentClass="bg-mid"
          />
          <Card 
            title="The Enterprise" 
            tagline="Master autonomous AI architectures, security, and scaling for complex business logic." 
            kicker="£999"
            accentClass="bg-ai"
          />
        </div>

        <div className="bg-bgSoft p-8 rounded-2xl max-w-[600px] mx-auto text-center border border-line">
          <h2 className="font-extrabold text-2xl text-ink mb-3">Enrolment Opening Soon</h2>
          <p className="text-mid mb-6 text-[15px]">Drop your email below to get early access to the next cohort.</p>
          <LeadForm formId="course-waitlist" accentClass="bg-ai" />
        </div>
      </Section>
    </main>
  );
}
