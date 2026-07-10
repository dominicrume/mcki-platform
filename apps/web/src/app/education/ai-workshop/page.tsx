/**
 * AI Workshop Tuition Programme — the education pillar's skills enrichment offering.
 * All copy lives in content/education/ai-workshop.md. Nothing hardcoded here.
 */
import type { Metadata } from "next";
import { readDoc } from "@mcki/content";
import { Section, Button } from "@mcki/ui";

const doc = readDoc("education", "ai-workshop");
const d = (doc?.data ?? {}) as any;

export const metadata: Metadata = {
  title: d.title ?? "AI Workshop Tuition Programme",
  description: d.description,
  openGraph: {
    title: d.title ?? "AI Workshop Tuition Programme",
    description: d.description,
    type: "website",
  },
};

export default function AiWorkshop() {
  const tracks = d.tracks ?? [];
  const registerUrl = d.register_url;

  return (
    <main>
      {/* HERO */}
      <Section className="pt-20 pb-12 animate-fade-in-up">
        <p className="font-mono text-[12px] tracking-widest uppercase text-ai drop-shadow-[0_0_8px_rgba(255,215,0,0.4)] mb-3">
          {d.kicker}
        </p>
        <h1 className="font-extrabold text-[clamp(30px,5.5vw,56px)] leading-[1.1] mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
          {d.headline}
        </h1>
        <p className="text-[18px] text-white/70 max-w-[620px] leading-relaxed mb-4">{d.strapline}</p>
        <p className="font-mono text-[13px] tracking-wide text-white/50 mb-10">{d.tracks_summary}</p>
        {registerUrl && (
          <Button href={registerUrl} accent="bg-ai" external>
            {d.register_cta} →
          </Button>
        )}
      </Section>

      {/* AT A GLANCE */}
      <Section className="py-12" id="glance">
        <h2 className="font-extrabold text-2xl text-white mb-6">Programme at a glance</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
          {(d.glance ?? []).map((g: any, i: number) => (
            <div key={i} className="bg-ink p-5">
              <dt className="font-mono text-[11px] tracking-widest uppercase text-white/50 mb-1">{g.label}</dt>
              <dd className="text-[16px] font-semibold text-white">{g.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* PRICING */}
      <Section className="py-12" id="pricing">
        <h2 className="font-extrabold text-2xl text-white mb-6">Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {(d.pricing ?? []).map((p: any, i: number) => (
            <div key={i} className="p-7 rounded-2xl border border-white/10 border-t-4 border-t-ai bg-white/5">
              <p className="text-[15px] font-semibold text-white/70 mb-3">{p.tier}</p>
              <p className="text-3xl font-extrabold text-white mb-1">{p.per_session}</p>
              <p className="text-[15px] text-ai font-semibold">{p.block}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TAKEAWAYS */}
      <Section className="py-12">
        <h2 className="font-extrabold text-2xl text-white mb-6">What students leave with</h2>
        <ul className="space-y-3 max-w-[720px]">
          {(d.takeaways ?? []).map((t: string, i: number) => (
            <li key={i} className="flex gap-3 text-white/70 leading-relaxed">
              <span aria-hidden="true" className="text-ai font-bold shrink-0">
                —
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* TRACKS */}
      {tracks.map((track: any) => (
        <Section key={track.key} className="py-12" id={track.key}>
          <p className="font-mono text-[11px] tracking-widest uppercase text-ai mb-3">{track.eyebrow}</p>
          <h2 className="font-extrabold text-[clamp(22px,3.2vw,30px)] text-white mb-3">{track.title}</h2>
          <p className="text-white/70 leading-relaxed max-w-[720px] mb-8">{track.intro}</p>
          <ol className="space-y-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {(track.sessions ?? []).map((s: any) => (
              <li
                key={s.n}
                className={`flex gap-4 p-5 ${s.featured ? "bg-ai/10 border-l-4 border-l-ai" : "bg-ink"}`}
              >
                <span className="font-mono text-[13px] text-ai/80 shrink-0 pt-0.5 w-4">{s.n}</span>
                <div>
                  <p className="font-bold text-white mb-1">
                    {s.featured && <span aria-hidden="true">★ </span>}
                    {s.title}
                    {s.featured && (
                      <span className="ml-2 font-normal font-mono text-[11px] uppercase tracking-wider text-ai">
                        Featured session
                      </span>
                    )}
                  </p>
                  <p className="text-[15px] text-white/70 leading-relaxed">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      ))}

      {/* SCHEDULE */}
      {d.schedule && (
        <Section className="py-12" id="schedule">
          <h2 className="font-extrabold text-2xl text-white mb-6">{d.schedule.heading}</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-left border-collapse min-w-[320px]">
              <thead>
                <tr className="bg-education">
                  <th scope="col" className="p-4 text-[13px] font-bold text-white uppercase tracking-wider">
                    Day
                  </th>
                  <th scope="col" className="p-4 text-[13px] font-bold text-white uppercase tracking-wider">
                    Available slots
                  </th>
                </tr>
              </thead>
              <tbody>
                {(d.schedule.rows ?? []).map((row: any, i: number) => (
                  <tr key={row.day} className={i % 2 ? "bg-white/[0.03]" : "bg-transparent"}>
                    <th scope="row" className="p-4 align-top font-bold text-white whitespace-nowrap">
                      {row.day}
                    </th>
                    <td className="p-4 text-ai font-mono text-[14px] space-y-1">
                      {(row.slots ?? []).map((slot: string) => (
                        <div key={slot}>{slot}</div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* TAUGHT BY */}
      {d.taught_by && (
        <Section className="py-12">
          <h2 className="font-extrabold text-2xl text-white mb-4">{d.taught_by.heading}</h2>
          <p className="text-white/70 leading-relaxed max-w-[720px] mb-5">{d.taught_by.body}</p>
          <ul className="space-y-2">
            {(d.taught_by.fields ?? []).map((f: string) => (
              <li key={f} className="flex gap-3 text-white/70">
                <span aria-hidden="true" className="text-ai shrink-0">
                  —
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ABOUT */}
      {d.about && (
        <Section className="py-12">
          <p className="font-mono text-[11px] tracking-widest uppercase text-white/50 mb-3">About MCKI Solutions</p>
          <h2 className="font-extrabold text-2xl text-white mb-4">{d.about.heading}</h2>
          <p className="text-white/70 leading-relaxed max-w-[720px]">{d.about.body}</p>
        </Section>
      )}

      {/* REGISTER + CONTACT */}
      <Section className="pt-12 pb-24" id="register">
        <div className="p-8 rounded-2xl border border-ai/30 bg-ai/[0.06]">
          <h2 className="font-extrabold text-[clamp(24px,3.5vw,32px)] text-white mb-3">{d.register?.heading}</h2>
          <p className="text-white/70 leading-relaxed max-w-[620px] mb-7">{d.register?.body}</p>
          {registerUrl && (
            <Button href={registerUrl} accent="bg-ai" className="mb-8" external>
              {d.register_cta} →
            </Button>
          )}
          <div className="pt-7 border-t border-white/10 text-[15px] space-y-2">
            <p className="font-bold text-white mb-1">{d.contact?.heading}</p>
            <p className="text-white/70 max-w-[620px] mb-3">{d.contact?.body}</p>
            <p>
              <a href={`mailto:${d.contact?.email}`} className="text-ai no-underline hover:underline">
                {d.contact?.email}
              </a>
            </p>
            <p className="flex flex-wrap gap-x-2 gap-y-1 text-white/70">
              {(d.contact?.phones ?? []).map((p: string, i: number) => (
                <span key={p}>
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="text-white/70 no-underline hover:text-white">
                    {p}
                  </a>
                  {i < (d.contact?.phones?.length ?? 0) - 1 && <span aria-hidden="true" className="ml-2">·</span>}
                </span>
              ))}
            </p>
            <p className="text-white/50">{d.contact?.location}</p>
          </div>
        </div>
      </Section>
    </main>
  );
}
