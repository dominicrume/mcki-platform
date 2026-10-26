/**
 * AI Workshop Tuition Programme — the one page where a click ends in a £180-£240 sale.
 * All copy lives in content/education/ai-workshop.md.
 */
import type { Metadata } from "next";
import { readDoc } from "@mcki/content";
import { Section, Button } from "@mcki/ui";
import { Users, Clock, GraduationCap, MapPin, Sparkles, Hand, ShieldCheck, Rocket } from "lucide-react";

const doc = readDoc("education", "ai-workshop");
const d = (doc?.data ?? {}) as any;

export const metadata: Metadata = {
  title: d.title ?? "AI Workshop Tuition Programme | MCKI Solutions",
  description: d.description,
  openGraph: {
    title: d.title ?? "AI Workshop Tuition Programme",
    description: d.description,
    type: "website",
  },
};

const takeawayIcons = [Rocket, Sparkles, ShieldCheck, GraduationCap];

export default function AiWorkshop() {
  const tracks = d.tracks ?? [];
  const registerUrl = d.register_url;
  const takeaways: string[] = d.takeaways ?? [];
  const pricing: { tier: string; per_session: string; block: string }[] = d.pricing ?? [];

  return (
    <main className="bg-[#020813] text-white overflow-hidden">
      {/* ========== HERO ========== */}
      <section className="relative pt-20 md:pt-28 pb-16 md:pb-20">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-ai/15 rounded-full blur-[140px] opacity-70 pointer-events-none" aria-hidden />

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Scarcity + credibility pill row */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center text-center">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-ai px-3 py-1.5 rounded-full border border-ai/40 bg-ai/5">
              <span className="w-1.5 h-1.5 rounded-full bg-ai animate-pulse" aria-hidden /> 14 seats per block
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-educationLight px-3 py-1.5 rounded-full border border-educationLight/30 bg-educationLight/5">
              <MapPin className="w-3 h-3" aria-hidden /> Birmingham, in person
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-white/70 px-3 py-1.5 rounded-full border border-white/20 bg-white/5">
              <GraduationCap className="w-3 h-3" aria-hidden /> Taught by Aston MSc
            </span>
          </div>

          <h1 className="text-center font-display font-medium text-[clamp(36px,6.5vw,78px)] leading-[1.03] tracking-tight text-balance text-white max-w-5xl mx-auto mb-8">
            {d.headline ?? "In 6 weeks, your child presents their own AI project. To you."}
          </h1>

          <p className="text-center text-lg md:text-2xl text-white/75 font-light leading-snug max-w-3xl mx-auto mb-10">
            Six weekly sessions. Ninety minutes each. Fourteen students a group. Your child leaves the final session with a finished project they built themselves, and the confidence to walk you through it.
          </p>

          {/* CTA + guarantee microcopy */}
          <div className="flex flex-col items-center gap-3">
            {registerUrl && (
              <a
                href={registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-ink bg-ai hover:bg-white transition-colors px-8 py-5 rounded-full font-bold text-lg shadow-[0_0_40px_rgba(255,215,0,0.35)]"
              >
                {d.register_cta ?? "Reserve a seat"} <span aria-hidden>→</span>
              </a>
            )}
            <p className="text-xs text-white/50 font-mono tracking-wide">
              Pay once · Six sessions · No subscription · Project showcase on week 6
            </p>
          </div>

          {/* At-a-glance stats under hero */}
          <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 max-w-4xl mx-auto">
            {[
              { Icon: Clock, label: "Each session", value: "90 min" },
              { Icon: Users, label: "Group size", value: "14 students" },
              { Icon: Sparkles, label: "Length", value: "6 weeks" },
              { Icon: Hand, label: "Format", value: "Hands-on" },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="bg-[#020813] p-5 md:p-6 text-center">
                <Icon className="w-5 h-5 text-ai mx-auto mb-2" aria-hidden />
                <p className="font-mono text-[10px] tracking-widest uppercase text-white/50 mb-1">{label}</p>
                <p className="text-base md:text-lg font-bold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRICING ========== */}
      <section className="py-20 md:py-24 border-t border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent" id="pricing">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center font-mono text-[11px] tracking-[0.25em] uppercase text-ai mb-3">
            Pricing
          </p>
          <h2 className="text-center font-display text-3xl md:text-5xl font-medium text-white mb-4 text-balance">
            One payment. All six sessions.
          </h2>
          <p className="text-center text-white/60 max-w-xl mx-auto mb-14">
            Choose the track that matches your child's year. The block price covers every session and the final project showcase.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pricing.map((p, i) => (
              <div
                key={i}
                className="group relative p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.03] hover:border-ai/50 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-ai/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden />
                <div className="relative z-10">
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-educationLight mb-6">
                    {p.tier}
                  </p>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-display font-bold text-5xl md:text-6xl text-white">{p.block}</span>
                  </div>
                  <p className="text-white/60 mb-8">
                    Full six-week block. <span className="text-white/80">({p.per_session})</span>
                  </p>
                  {registerUrl && (
                    <a
                      href={registerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-ai font-semibold group-hover:gap-3 transition-all"
                    >
                      Reserve this tier <span aria-hidden>→</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHAT THEY LEAVE WITH ========== */}
      <section className="py-20 md:py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center font-mono text-[11px] tracking-[0.25em] uppercase text-ai mb-3">
            Outcomes
          </p>
          <h2 className="text-center font-display text-3xl md:text-5xl font-medium text-white mb-16 text-balance max-w-3xl mx-auto">
            What your child walks home with.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {takeaways.map((t, i) => {
              const Icon = takeawayIcons[i % takeawayIcons.length];
              return (
                <div
                  key={i}
                  className="group p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-ai/40 hover:bg-white/[0.05] transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-xl bg-ai/15 border border-ai/40 flex items-center justify-center mb-5 text-ai group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" aria-hidden />
                  </div>
                  <p className="text-[15px] text-white leading-relaxed">{t}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== TRACKS ========== */}
      {tracks.length > 0 && (
        <section className="py-20 md:py-24 border-t border-white/10 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-center font-mono text-[11px] tracking-[0.25em] uppercase text-ai mb-3">
              The programme
            </p>
            <h2 className="text-center font-display text-3xl md:text-5xl font-medium text-white mb-16 text-balance">
              Week by week.
            </h2>

            <div className="grid gap-12">
              {tracks.map((track: any) => (
                <div key={track.key} id={track.key}>
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-educationLight mb-3">
                    {track.eyebrow}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-medium text-white mb-3">{track.title}</h3>
                  <p className="text-white/70 leading-relaxed mb-8 max-w-2xl">{track.intro}</p>

                  <ol className="grid gap-3">
                    {(track.sessions ?? []).map((s: any) => (
                      <li
                        key={s.n}
                        className={`flex gap-5 p-5 md:p-6 rounded-xl border transition-colors ${
                          s.featured
                            ? "bg-ai/[0.08] border-ai/40"
                            : "bg-white/[0.02] border-white/10 hover:border-white/20"
                        }`}
                      >
                        <span className="font-mono text-xs tracking-widest text-ai shrink-0 pt-1 w-10">
                          0{s.n}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white mb-1 flex items-center gap-2 flex-wrap">
                            {s.title}
                            {s.featured && (
                              <span className="font-mono text-[10px] uppercase tracking-wider text-ink bg-ai px-2 py-0.5 rounded-full">
                                Showcase
                              </span>
                            )}
                          </p>
                          <p className="text-[15px] text-white/70 leading-relaxed">{s.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== TAUGHT BY ========== */}
      {d.taught_by && (
        <section className="py-20 md:py-24 border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-educationLight mb-3">
              Who teaches it
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white mb-5 text-balance">
              {d.taught_by.heading}
            </h2>
            <p className="text-white/70 leading-relaxed text-lg mb-8 max-w-2xl">{d.taught_by.body}</p>
            {d.taught_by.fields?.length > 0 && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {d.taught_by.fields.map((f: string) => (
                  <li key={f} className="flex gap-3 items-baseline text-white/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-ai mt-2 shrink-0" aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* ========== SCHEDULE ========== */}
      {d.schedule && (
        <section className="py-20 md:py-24 border-t border-white/10 bg-white/[0.02]" id="schedule">
          <div className="max-w-4xl mx-auto px-6">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ai mb-3">
              {d.schedule.heading}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white mb-10 text-balance">
              Pick a slot that fits the week.
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#020813]">
              <table className="w-full text-left border-collapse min-w-[320px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03]">
                    <th className="p-4 text-[11px] font-mono tracking-widest font-semibold text-white/60 uppercase">Day</th>
                    <th className="p-4 text-[11px] font-mono tracking-widest font-semibold text-white/60 uppercase">Available slots</th>
                  </tr>
                </thead>
                <tbody>
                  {(d.schedule.rows ?? []).map((row: any, i: number) => (
                    <tr key={row.day} className={i % 2 ? "bg-white/[0.015]" : ""}>
                      <th scope="row" className="p-4 align-top font-semibold text-white whitespace-nowrap">
                        {row.day}
                      </th>
                      <td className="p-4 text-ai font-mono text-sm space-y-1">
                        {(row.slots ?? []).map((slot: string) => (
                          <div key={slot}>{slot}</div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ========== FINAL CONVERSION BLOCK ========== */}
      <section className="py-24 md:py-32 border-t border-white/10" id="register">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative p-10 md:p-14 rounded-3xl border border-ai/40 bg-gradient-to-br from-ai/[0.08] via-ai/[0.03] to-transparent overflow-hidden">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-ai/20 rounded-full blur-[100px] pointer-events-none" aria-hidden />
            <div className="relative z-10 text-center">
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ai mb-4">
                {d.register?.heading ?? "Apply now"}
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-medium text-white mb-6 text-balance max-w-2xl mx-auto">
                Six weeks from today, you&rsquo;re watching your child present.
              </h2>
              <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
                {d.register?.body ?? "Register your child for the next block. Groups are capped at 14 students, so places on each session slot are limited."}
              </p>
              {registerUrl && (
                <a
                  href={registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-ink bg-ai hover:bg-white transition-colors px-8 py-5 rounded-full font-bold text-lg shadow-[0_0_40px_rgba(255,215,0,0.35)]"
                >
                  {d.register_cta ?? "Reserve a seat"} <span aria-hidden>→</span>
                </a>
              )}

              {/* Contact fallback */}
              {d.contact && (
                <div className="mt-10 pt-8 border-t border-white/10 text-sm">
                  <p className="text-white/60 mb-2">
                    {d.contact.heading}. {d.contact.body}
                  </p>
                  <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-white/80">
                    {d.contact.email && (
                      <a href={`mailto:${d.contact.email}`} className="text-ai hover:text-white transition-colors">
                        {d.contact.email}
                      </a>
                    )}
                    {(d.contact.phones ?? []).map((p: string) => (
                      <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="text-white/80 hover:text-white transition-colors">
                        {p}
                      </a>
                    ))}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========== STICKY MOBILE CTA ========== */}
      {registerUrl && (
        <div
          className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-gradient-to-t from-[#020813] via-[#020813]/95 to-[#020813]/0 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]"
        >
          <a
            href={registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-ai text-ink font-bold px-6 py-4 rounded-full shadow-[0_8px_30px_rgba(255,215,0,0.4)] active:scale-[0.98] transition-transform"
          >
            {d.register_cta ?? "Reserve a seat"} <span aria-hidden>→</span>
          </a>
        </div>
      )}
    </main>
  );
}
