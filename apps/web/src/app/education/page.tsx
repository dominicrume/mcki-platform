/**
 * /education — the original business. Airhead pass + conversion CTAs.
 */
import { readDoc } from "@mcki/content";
import { Section, Button } from "@mcki/ui";
import { User, BookOpen, Wallet, ShieldCheck, Quote } from "lucide-react";

const ADMISSIONS_MAILTO =
  "mailto:info@mckisolutions.com?subject=University%20admissions%20enquiry&body=Hi%20MCKI%2C%0D%0A%0D%0APlease%20share%20a%20few%20lines%20about%20the%20student%20and%20what%20they%27re%20applying%20for%3A%0D%0A%0D%0A";

export default function EducationHome() {
  const doc = readDoc("education", "index");
  const d = (doc?.data ?? {}) as any;
  const workshop = (readDoc("education", "ai-workshop")?.data ?? {}) as any;

  const pillars = [
    { Icon: User, title: "One advisor per student", body: "Your child works with the same person from day one. No handoffs, no revolving door." },
    { Icon: BookOpen, title: "Done together, not for them", body: "UCAS choices, personal statement, admissions tests, interview practice. We sit in the room until it is ready." },
    { Icon: Wallet, title: "The money question, answered", body: "Student Finance England, loans, grants and scholarships explained in plain English, at no charge." },
    { Icon: ShieldCheck, title: "If you can get in, we tell you how. If you can't, we tell you that too", body: "Honest reads of your realistic university list. No fantasies. No fees for shaped-up applications that were never going to land." },
  ];

  return (
    <main className="bg-[#020813] min-h-screen text-white overflow-hidden">
      {/* ========== HERO ========== */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-education/20 rounded-full blur-[120px] opacity-40 pointer-events-none" aria-hidden />

        <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto px-6">
          <p className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] uppercase text-educationLight mb-6 px-4 py-1.5 rounded-full border border-educationLight/30 bg-educationLight/5">
            <span className="w-1.5 h-1.5 rounded-full bg-educationLight animate-pulse" aria-hidden />
            MCKI · Academic Advisory · Birmingham, UK
          </p>
          <h1 className="font-display font-medium text-[clamp(40px,6.5vw,78px)] leading-[1.03] tracking-tight text-balance mb-8">
            {d.tagline ?? "We get students into top universities."}
          </h1>
          <p className="text-lg md:text-2xl text-white/75 font-light leading-snug max-w-3xl mb-10">
            Honest, one-on-one guidance for UK and international university applications. We sit with your family through every stage. From the first draft to offer day.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href={ADMISSIONS_MAILTO}
              className="inline-flex items-center gap-3 text-ink bg-educationLight hover:bg-white transition-colors px-8 py-5 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(127,179,255,0.35)]"
            >
              Book an admissions call <span aria-hidden>→</span>
            </a>
            <a
              href="/education/ai-workshop"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-colors"
            >
              Or the AI Workshop →
            </a>
          </div>

          {/* Trust signals bar */}
          <div className="w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/10">
            {[
              { k: "UCAS", v: "Full support" },
              { k: "Oxford · Cambridge", v: "Interview prep" },
              { k: "Russell Group", v: "Entrance exams" },
              { k: "International", v: "US · EU · beyond" },
            ].map((t) => (
              <div key={t.k} className="bg-[#020813] p-4 text-center">
                <p className="font-mono text-[9px] tracking-widest uppercase text-educationLight mb-1">{t.k}</p>
                <p className="text-sm text-white/80 font-medium">{t.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW WE WORK ========== */}
      <section className="py-20 md:py-24 bg-white/[0.02] border-y border-white/5 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14 text-center">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-educationLight mb-3">
              How we work
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-medium text-white mb-4 text-balance">
              No formulas. No shortcuts.
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Whether the application is for Oxford, Cambridge, Russell Group or an international institution, the work is the same.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="group relative p-7 rounded-2xl bg-[#0a1428]/50 border border-white/10 hover:border-educationLight/50 hover:bg-[#0a1428]/80 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-educationLight/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-education/20 flex items-center justify-center mb-5 border border-educationLight/40 text-educationLight group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" aria-hidden />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-3 text-balance leading-tight">{title}</h3>
                  <p className="text-white/65 leading-relaxed text-sm">{body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <a
              href={ADMISSIONS_MAILTO}
              className="inline-flex items-center gap-3 text-ink bg-educationLight hover:bg-white transition-colors px-7 py-4 rounded-full font-bold shadow-[0_0_30px_rgba(127,179,255,0.3)]"
            >
              Start with a call <span aria-hidden>→</span>
            </a>
            <p className="text-xs text-white/40 mt-3 font-mono tracking-wide">
              First call is on us. If we are not the right advisor, we will tell you.
            </p>
          </div>
        </div>
      </section>

      {/* ========== FOUNDER QUOTE ========== */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <Quote className="w-14 h-14 text-educationLight/40 mx-auto mb-8 rotate-180" aria-hidden />
          <p className="font-display text-2xl md:text-3xl leading-snug text-white/90 italic mb-10 text-balance">
            &ldquo;Too many families walk away from a university that was within reach. They do not need more talent or more money. They need someone to sit down, explain the options, and say: this is possible, here is how.&rdquo;
          </p>
          <div>
            <p className="font-semibold text-lg text-white">Shofiqul Haque</p>
            <p className="font-mono text-xs uppercase tracking-widest text-educationLight mt-2">Founder, MCKI Solutions</p>
          </div>
        </div>
      </section>

      {/* ========== AI WORKSHOP BRIDGE ========== */}
      <section className="pb-24 md:pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative p-10 md:p-16 rounded-[2rem] md:rounded-[2.5rem] border border-ai/30 bg-gradient-to-br from-[#0a1428] to-black overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ai/20 rounded-full blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" aria-hidden />

            <div className="relative z-10 grid md:grid-cols-[1.5fr_1fr] gap-8 items-start">
              <div>
                <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ai mb-4">
                  {workshop.kicker ?? "AI Skills Enrichment"}
                </p>
                <h2 className="font-display text-3xl md:text-5xl font-medium leading-[1.05] text-white mb-5 text-balance">
                  {workshop.headline ?? "In 6 weeks, your child presents their own AI project. To you."}
                </h2>
                <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
                  Six weekly sessions. Fourteen students a group. Birmingham, in person, taught by Aston MSc specialists. Pay once. Your child leaves with a finished AI project in their own hands.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button href="/education/ai-workshop" accent="bg-ai" className="shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                    See the programme →
                  </Button>
                  {workshop.register_url && (
                    <a
                      href={workshop.register_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white/70 hover:text-ai underline underline-offset-4 decoration-white/20 hover:decoration-ai transition-colors"
                    >
                      Or reserve a seat directly →
                    </a>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 self-stretch">
                {[
                  { k: "KS3", v: "£180 block" },
                  { k: "KS4/5", v: "£240 block" },
                  { k: "Length", v: "6 weeks" },
                  { k: "Group", v: "Cap 14" },
                ].map((t) => (
                  <div key={t.k} className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                    <p className="font-mono text-[10px] tracking-widest uppercase text-ai mb-1">{t.k}</p>
                    <p className="text-base font-semibold text-white">{t.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
