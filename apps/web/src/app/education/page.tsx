/**
 * education.mckisolutions.com — THE ORIGINAL BUSINESS.
 * Elite UI/UX redesign. Content preserved from legacy, reimagined for premium presentation.
 */
import { readDoc } from "@mcki/content";
import { Section, Card, Button } from "@mcki/ui";
import { User, BookOpen, Wallet, ShieldCheck, Quote } from "lucide-react";

export default function EducationHome() {
  const doc = readDoc("education", "index");
  const d = (doc?.data ?? {}) as any;
  const services = d.services ?? [];
  const workshop = (readDoc("education", "ai-workshop")?.data ?? {}) as any;

  return (
    <main className="bg-[#020813] min-h-screen text-white overflow-hidden">
      {/* 1. The Hero Section */}
      <Section className="pt-32 pb-24 relative">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-education/20 rounded-full blur-[120px] opacity-40 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          <p className="font-mono text-[12px] tracking-widest uppercase text-education drop-shadow-[0_0_8px_rgba(30,91,143,0.6)] mb-6">
            MCKI · Academic Advisory
          </p>
          <h1 className="font-extrabold text-[clamp(40px,6vw,72px)] leading-[1.1] tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/50">
            {d.tagline ?? "We get students into the world's best universities."}
          </h1>
          <p className="text-[18px] md:text-[22px] text-white/70 max-w-2xl leading-relaxed mb-12 font-medium">
            Applying to university is one of the most important decisions a student will make. Our practice is dedicated to providing calm, honest, and experienced advice.
          </p>
        </div>
      </Section>

      {/* 2. Our Approach (The 4 Pillars) */}
      <Section className="py-20 bg-white/[0.02] border-y border-white/5 relative backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="font-extrabold text-[clamp(28px,4vw,40px)] text-white mb-4">Our Approach</h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Whether a student is applying to Oxford, Cambridge, Russell Group, or leading international institutions, our approach is centered on personal preparation and academic integrity. We do not use formulas or shortcuts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="group relative p-8 rounded-3xl bg-[#0a1428]/50 border border-white/10 hover:border-education/50 hover:bg-[#0a1428]/80 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-education/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-education/20 flex items-center justify-center mb-6 border border-education/30 text-education group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(30,91,143,0.4)] transition-all duration-300">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-white mb-3">Personal Attention</h3>
                <p className="text-white/60 leading-relaxed text-sm">Every student works directly with an experienced advisor who understands university admissions standards at the highest level.</p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="group relative p-8 rounded-3xl bg-[#0a1428]/50 border border-white/10 hover:border-education/50 hover:bg-[#0a1428]/80 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-education/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-education/20 flex items-center justify-center mb-6 border border-education/30 text-education group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(30,91,143,0.4)] transition-all duration-300">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-white mb-3">Thorough Preparation</h3>
                <p className="text-white/60 leading-relaxed text-sm">We assist with UCAS choices, rigorous personal statements, entrance examinations, and intensive interview practice.</p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="group relative p-8 rounded-3xl bg-[#0a1428]/50 border border-white/10 hover:border-education/50 hover:bg-[#0a1428]/80 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-education/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-education/20 flex items-center justify-center mb-6 border border-education/30 text-education group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(30,91,143,0.4)] transition-all duration-300">
                  <Wallet className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-white mb-3">Financial Guidance</h3>
                <p className="text-white/60 leading-relaxed text-sm">We explain student funding, tuition loans, and Student Finance England (SFE) clearly, helping identify grants and scholarships.</p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="group relative p-8 rounded-3xl bg-[#0a1428]/50 border border-white/10 hover:border-education/50 hover:bg-[#0a1428]/80 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-education/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-education/20 flex items-center justify-center mb-6 border border-education/30 text-education group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(30,91,143,0.4)] transition-all duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-white mb-3">Honest Advice</h3>
                <p className="text-white/60 leading-relaxed text-sm">We provide realistic assessments and practical advice designed entirely around the student's best interests and genuine capabilities.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. The Founder's Quote */}
      <Section className="py-32 relative">
        <div className="max-w-4xl mx-auto text-center relative">
          <Quote className="w-16 h-16 text-education/30 mx-auto mb-8 rotate-180" />
          <h2 className="font-serif text-[clamp(24px,3.5vw,36px)] leading-relaxed text-white/90 italic mb-10">
            "I watched too many people walk away from an opportunity that was genuinely within their reach. They didn't need more talent or more money — they needed someone to sit with them, explain the options, and say: 'This is possible. Here's how.' That is exactly what we do. Every single day."
          </h2>
          <div className="flex flex-col items-center">
            <p className="font-bold text-xl text-white tracking-wide">Shofiqul Haque</p>
            <p className="font-mono text-xs uppercase tracking-widest text-education mt-2">Founder, MCKI Solutions</p>
          </div>
        </div>
      </Section>

      {/* 4. The AI Workshop Bridge */}
      <Section className="pb-32">
        <div className="relative p-12 md:p-16 rounded-[2.5rem] border border-ai/30 bg-gradient-to-br from-[#0a1428] to-black overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ai/20 rounded-full blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <p className="font-mono text-[12px] tracking-widest uppercase text-ai mb-4 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]">
              {workshop.kicker ?? "Next Generation"}
            </p>
            <h2 className="font-extrabold text-[clamp(32px,4vw,48px)] leading-tight text-white mb-6">
              {workshop.headline ?? "Equipping Students for the Agentic Future"}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              {workshop.strapline ?? "Beyond traditional admissions, we now train the next generation to build and deploy autonomous AI agents. The future belongs to those who can build it."}
            </p>
            <Button href="/education/ai-workshop" accent="bg-ai" className="shadow-[0_0_20px_rgba(255,215,0,0.2)]">
              Explore the AI Workshop →
            </Button>
          </div>
        </div>
      </Section>

    </main>
  );
}
