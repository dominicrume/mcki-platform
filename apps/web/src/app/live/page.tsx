/**
 * live.mckisolutions.com — THE TIMELESS EVENT ENGINE.
 * Renders whichever event in content/live/events/*.md is status: live.
 * Each module (demos, scan_sessions, polls, qanda, live_build, start_here)
 * is independent and decentralised — one failing never breaks the others.
 * Mobile-first: phones in a live room.
 */
import { listDocs } from "@mcki/content";
import { Button } from "@mcki/ui";

export default function LiveHub() {
  const events = listDocs("live/events");
  const event = events.find((e) => (e.data as any).status === "live") ?? events[0];
  const d = (event?.data ?? {}) as any;
  const m = d.modules ?? {};

  const resolveLink = (link: string) => {
    if (!link) return "#";
    if (link === "[CALCOM_BOOKING_URL]") return process.env.NEXT_PUBLIC_CALCOM_BOOKING_URL || "#";
    if (link.includes("[YOUR_INVITE_CODE]")) return link.replace("[YOUR_INVITE_CODE]", process.env.NEXT_PUBLIC_YOUR_INVITE_CODE || "");
    if (link === "[BOOK_LINK_WEALTH_BLOCKCHAIN]") return process.env.NEXT_PUBLIC_BOOK_LINK_WEALTH_BLOCKCHAIN || "#";
    if (link === "[BOOK_LINK_METAVERSE]") return process.env.NEXT_PUBLIC_BOOK_LINK_METAVERSE || "#";
    return link;
  };

  return (
    <main className="max-w-[640px] mx-auto px-5 py-8 min-h-screen">
      {/* HEADER */}
      <h1 className="font-extrabold text-3xl text-white">{d.title ?? "MCKI Live"}</h1>
      <p className="text-[14px] text-white/70 mt-1">{d.time} · {d.venue}</p>

      {/* PROMISE */}
      {d.promise && (
        <div className="flex gap-5 my-5 justify-center">
          {d.promise.map((p: any) => (
            <div key={p.label} className="text-center">
              <div className="font-extrabold text-3xl text-ai">{p.value}</div>
              <div className="text-[11px] uppercase tracking-widest text-white/70">{p.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* MODULES — each independent. */}
      {m.polls?.enabled && <Module title="Live Poll" note={(m.polls.questions ?? [])[0]} accentClass="border-l-amber" formAction="poll" />}
      {m.scan_sessions?.enabled && <Module title="Scan Session" note={m.scan_sessions.note} accentClass="border-l-ai" />}
      {m.demos?.enabled && <Module title="Watch the Demos" note={(m.demos.items ?? []).map((i: any) => i.name).join(" · ")} accentClass="border-l-white" />}
      {m.qanda?.enabled && <Module title="Ask a Question" note={m.qanda.note} accentClass="border-l-education" formAction="qanda" />}
      {m.live_build?.enabled && <Module title="The Live Build" note={`Built around a real business · ${(m.live_build.options ?? []).join(" or ")}`} accentClass="border-l-[#FF6B9D]" />}

      {/* START HERE — the conversion block */}
      {m.start_here?.enabled && (
        <section className="mt-8 p-5 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="font-extrabold text-xl mb-4 text-white">Start Here</h2>
          <Button href={resolveLink(m.start_here.actions?.booking?.link)} accent="bg-ai" className="block text-center w-full mb-2">
            📅 {m.start_here.actions?.booking?.label}
          </Button>
          <a href={resolveLink(m.start_here.actions?.course?.link)} className="block text-center w-full p-3 mb-2 bg-white/10 text-white border border-white/20 rounded-xl font-medium hover:-translate-y-0.5 transition-transform">
            🎓 {m.start_here.actions?.course?.label}
          </a>
          {(m.start_here.actions?.books ?? []).map((b: any) => (
            <a key={b.title} href={resolveLink(b.link)} className="block text-center w-full p-3 mb-2 bg-white/10 text-white border border-white/20 rounded-xl font-medium hover:-translate-y-0.5 transition-transform">
              📘 {b.title}
            </a>
          ))}
          <a href={resolveLink(m.start_here.actions?.community?.link)} className="block text-center w-full p-3 bg-white/10 text-white border border-white/20 rounded-xl font-medium hover:-translate-y-0.5 transition-transform">
            💬 {m.start_here.actions?.community?.label}
          </a>
        </section>
      )}
    </main>
  );
}

import { LiveForm } from "../../components/LiveForm";

function Module({ title, note, accentClass, formAction }: { title: string; note?: string; accentClass: string; formAction?: string }) {
  return (
    <div className={`mt-3.5 p-4 rounded-xl border border-white/10 bg-white/5 ${accentClass}`}>
      <div className="font-bold text-white">{title}</div>
      {note && <div className="text-[13px] text-white/70 mt-1">{note}</div>}
      {formAction && <LiveForm actionName={formAction} label="Your response..." accentClass={accentClass.replace('border-l-', 'bg-')} />}
    </div>
  );
}
