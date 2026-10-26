/**
 * /ai — the AI division. Proof-led, conversion-first.
 * Reads content/ai/index.md + content/proof/*.md.
 */
import { readDoc, listDocs } from "@mcki/content";
import { Section } from "@mcki/ui";
import { promise } from "@mcki/brand/tokens";
import Link from "next/link";
import { Zap, Wrench, GraduationCap, ArrowRight } from "lucide-react";

const AI_ENQUIRY_MAILTO =
  "mailto:info@mckisolutions.com?subject=AI%20project%20enquiry&body=Hi%20MCKI%2C%0D%0A%0D%0ATell%20us%20about%20your%20business%20and%20what%20you%27d%20like%20an%20agent%20to%20do%3A%0D%0A%0D%0A";

const buildIcons = [Wrench, GraduationCap, Zap];

export default function AiHome() {
  const doc = readDoc("ai", "index");
  const d = (doc?.data ?? {}) as any;
  const proof = listDocs("proof");
  const builds = d.builds ?? [];

  return (
    <main className="bg-[#020813] text-white overflow-hidden">
      {/* ========== HERO ========== */}
      <section className="relative pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-ai/15 rounded-full blur-[140px] opacity-70 pointer-events-none" aria-hidden />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-8 justify-center text-center">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-ai px-3 py-1.5 rounded-full border border-ai/40 bg-ai/5">
              <span className="w-1.5 h-1.5 rounded-full bg-ai animate-pulse" aria-hidden /> MCKI · AI &amp; Agents
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-white/60 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.03]">
              Birmingham, UK
            </span>
          </div>

          <h1 className="text-center font-display font-medium text-[clamp(36px,6.5vw,78px)] leading-[1.03] tracking-tight text-balance max-w-5xl mx-auto mb-8">
            {d.tagline ?? "We build the AI agents that run your business."}
          </h1>

          <p className="text-center text-lg md:text-2xl text-white/75 font-light leading-snug max-w-3xl mx-auto mb-10">
            Autonomous software that does the work your team cannot get to. Inbox triage, sales qualification, operations, research. Shipped in weeks. Priced in outcomes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={AI_ENQUIRY_MAILTO}
              className="inline-flex items-center gap-3 text-ink bg-ai hover:bg-white transition-colors px-8 py-5 rounded-full font-bold text-lg shadow-[0_0_40px_rgba(255,215,0,0.35)]"
            >
              Start a project <span aria-hidden>→</span>
            </a>
            <Link
              href="#proof"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-colors"
            >
              See three agents we built
            </Link>
          </div>
        </div>
      </section>

      {/* ========== PROMISE STRIP ========== */}
      <section className="py-16 md:py-20 border-t border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center font-mono text-[11px] tracking-[0.25em] uppercase text-ai mb-3">
            Our promise
          </p>
          <h2 className="text-center font-display text-3xl md:text-4xl font-medium text-white mb-14 max-w-2xl mx-auto text-balance">
            Every agent we ship is held to the same three numbers.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(promise as readonly { label: string; value: string; note?: string }[]).map((p) => (
              <div
                key={p.label}
                className="group relative text-center p-8 md:p-10 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-ai/50 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden cursor-default"
              >
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-ai/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" aria-hidden />
                <div className="relative z-10">
                  <div className="font-display font-extrabold text-6xl md:text-7xl text-white mb-3 group-hover:text-ai group-hover:scale-105 transition-all duration-500">
                    {p.value}
                  </div>
                  <div className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-white/90 mb-3">
                    {p.label}
                  </div>
                  {p.note && (
                    <p className="text-sm text-white/60 leading-relaxed max-w-[20ch] mx-auto">{p.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHAT WE BUILD ========== */}
      <section className="py-20 md:py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center font-mono text-[11px] tracking-[0.25em] uppercase text-ai mb-3">
            What we build
          </p>
          <h2 className="text-center font-display text-3xl md:text-5xl font-medium text-white mb-14 max-w-3xl mx-auto text-balance">
            Three things we do. All of them ship.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {builds.map((b: any, i: number) => {
              const Icon = buildIcons[i % buildIcons.length];
              return (
                <div
                  key={i}
                  className="group p-7 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-ai/40 hover:bg-white/[0.05] transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-xl bg-ai/15 border border-ai/40 flex items-center justify-center mb-5 text-ai group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" aria-hidden />
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-3">
                    {b.title}
                  </h3>
                  <p className="text-[15px] text-white/70 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-center gap-6 flex-wrap">
            <Link
              href="/ai/courses"
              className="inline-flex items-center gap-2 text-white/70 hover:text-ai underline underline-offset-4 decoration-white/20 hover:decoration-ai transition-colors"
            >
              Or browse training courses <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== PROOF ========== */}
      <section className="py-20 md:py-24 border-t border-white/10 bg-white/[0.02]" id="proof">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center font-mono text-[11px] tracking-[0.25em] uppercase text-ai mb-3">
            The proof
          </p>
          <h2 className="text-center font-display text-3xl md:text-5xl font-medium text-white mb-4 text-balance">
            Agents already in production.
          </h2>
          <p className="text-center text-white/60 max-w-2xl mx-auto mb-14">
            Three live builds, three sectors. Read the case study to see what we built and what it changed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {proof.map((p) => {
              const pd = p.data as any;
              return (
                <Link
                  key={p.slug}
                  href={`/ai/proof/${p.slug}`}
                  className="group flex flex-col p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-ai/50 hover:bg-white/[0.05] transition-all duration-500"
                >
                  {pd.sector && (
                    <p className="font-mono text-[10px] tracking-widest uppercase text-educationLight mb-4">
                      {pd.sector}
                    </p>
                  )}
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-2 group-hover:text-ai transition-colors">
                    {pd.client}
                  </h3>
                  <p className="text-[15px] text-white/70 leading-relaxed mb-6 flex-grow">{pd.build}</p>
                  <span className="inline-flex items-center gap-2 text-ai font-semibold text-sm group-hover:gap-3 transition-all">
                    Read the case study <span aria-hidden>→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== FINAL CONVERSION ========== */}
      <section className="py-24 md:py-32 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative p-10 md:p-14 rounded-3xl border border-ai/40 bg-gradient-to-br from-ai/[0.08] via-ai/[0.03] to-transparent overflow-hidden">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-ai/20 rounded-full blur-[100px] pointer-events-none" aria-hidden />
            <div className="relative z-10 text-center">
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ai mb-4">
                Start a project
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-medium text-white mb-6 text-balance max-w-2xl mx-auto">
                Tell us what you&rsquo;d like the agent to do. We&rsquo;ll tell you honestly whether we can build it.
              </h2>
              <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
                First call is on us. If we&rsquo;re a fit, we scope the build. If we&rsquo;re not, we&rsquo;ll tell you who is.
              </p>
              <a
                href={AI_ENQUIRY_MAILTO}
                className="inline-flex items-center gap-3 text-ink bg-ai hover:bg-white transition-colors px-8 py-5 rounded-full font-bold text-lg shadow-[0_0_40px_rgba(255,215,0,0.35)]"
              >
                Email the team <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
