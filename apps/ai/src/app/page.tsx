/**
 * ai.mckisolutions.com — THE AI DIVISION. Proof-led.
 * Renders content/ai/index.md + content/proof/*.md case studies.
 */
import { readDoc, listDocs } from "@mcki/content";

export default function AiHome() {
  const doc = readDoc("ai", "index");
  const d = (doc?.data ?? {}) as any;
  const proof = listDocs("proof");
  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: "96px 24px" }}>
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#5B3FD9" }}>
        MCKI · AI &amp; Agents
      </p>
      <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(32px,5vw,56px)", fontWeight: 800, color: "#111318", margin: "12px 0 16px" }}>
        {d.tagline ?? "We build the AI agents that run your business."}
      </h1>
      <p style={{ fontSize: 18, color: "#555B68", maxWidth: 620, lineHeight: 1.7, marginBottom: 32 }}>
        {d.hero_sub ?? ""}
      </p>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>The Proof</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {proof.map((p) => {
          const pd = p.data as any;
          return (
            <div key={p.slug} style={{ padding: 20, border: "1px solid #E4E6EB", borderRadius: 12 }}>
              <div style={{ fontWeight: 700, color: "#111318" }}>{pd.client}</div>
              <div style={{ fontSize: 13, color: "#555B68", marginTop: 4 }}>{pd.build}</div>
            </div>
          );
        })}
      </div>
      {/* AGENT: build full services, courses (£600/£799/£999), case study pages */}
    </main>
  );
}
