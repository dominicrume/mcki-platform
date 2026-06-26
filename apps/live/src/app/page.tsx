/**
 * live.mckisolutions.com — THE TIMELESS EVENT ENGINE.
 * Renders whichever event in content/live/events/*.md is status: live.
 * Each module (demos, scan_sessions, polls, qanda, live_build, start_here)
 * is independent and decentralised — one failing never breaks the others.
 * Mobile-first: phones in a live room.
 */
import { listDocs } from "@mcki/content";

export default function LiveHub() {
  const events = listDocs("live/events");
  const event = events.find((e) => (e.data as any).status === "live") ?? events[0];
  const d = (event?.data ?? {}) as any;
  const m = d.modules ?? {};

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "32px 20px", minHeight: "100vh" }}>
      {/* HEADER */}
      <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 30, fontWeight: 800, color: "#111318" }}>{d.title ?? "MCKI Live"}</h1>
      <p style={{ color: "#555B68", fontSize: 14, marginTop: 4 }}>{d.time} · {d.venue}</p>

      {/* PROMISE */}
      {d.promise && (
        <div style={{ display: "flex", gap: 20, margin: "20px 0", justifyContent: "center" }}>
          {d.promise.map((p: any) => (
            <div key={p.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: "#5B3FD9" }}>{p.value}</div>
              <div style={{ fontSize: 11, textTransform: "uppercase", color: "#555B68" }}>{p.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* MODULES — each independent. AGENT: build each as its own component. */}
      {m.polls?.enabled && <Module title="Live Poll" note={(m.polls.questions ?? [])[0]} accent="#FFAD33" />}
      {m.scan_sessions?.enabled && <Module title="Scan Session" note={m.scan_sessions.note} accent="#5B3FD9" />}
      {m.demos?.enabled && <Module title="Watch the Demos" note={(m.demos.items ?? []).map((i: any) => i.name).join(" · ")} accent="#111318" />}
      {m.qanda?.enabled && <Module title="Ask a Question" note={m.qanda.note} accent="#1E5B8F" />}
      {m.live_build?.enabled && <Module title="The Live Build" note={`Built around a real business · ${(m.live_build.options ?? []).join(" or ")}`} accent="#FF6B9D" />}

      {/* START HERE — the conversion block */}
      {m.start_here?.enabled && (
        <section style={{ marginTop: 32, padding: 20, borderRadius: 14, background: "#F5F6F8" }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Start Here</h2>
          {/* Primary CTA first */}
          <a href={m.start_here.actions?.booking?.link} style={ctaPrimary}>📅 {m.start_here.actions?.booking?.label}</a>
          <a href={m.start_here.actions?.course?.link} style={ctaSecondary}>🎓 {m.start_here.actions?.course?.label}</a>
          {(m.start_here.actions?.books ?? []).map((b: any) => (
            <a key={b.title} href={b.link} style={ctaSecondary}>📘 {b.title}</a>
          ))}
          <a href={m.start_here.actions?.community?.link} style={ctaSecondary}>💬 {m.start_here.actions?.community?.label}</a>
        </section>
      )}
    </main>
  );
}

function Module({ title, note, accent }: { title: string; note?: string; accent: string }) {
  return (
    <div style={{ marginTop: 14, padding: 16, borderRadius: 12, border: "1px solid #E4E6EB", borderLeft: `4px solid ${accent}` }}>
      <div style={{ fontWeight: 700, color: "#111318" }}>{title}</div>
      {note && <div style={{ fontSize: 13, color: "#555B68", marginTop: 4 }}>{note}</div>}
    </div>
  );
}

const ctaPrimary: React.CSSProperties = { display: "block", padding: "14px 18px", borderRadius: 10, background: "#5B3FD9", color: "#FFF", textDecoration: "none", fontWeight: 600, marginBottom: 8, textAlign: "center" };
const ctaSecondary: React.CSSProperties = { display: "block", padding: "12px 18px", borderRadius: 10, background: "#FFF", color: "#111318", textDecoration: "none", fontWeight: 500, marginBottom: 8, border: "1px solid #E4E6EB" };
