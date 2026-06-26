/**
 * Parent brand homepage — mckisolutions.com
 * Two doors of equal dignity: Education (the original business) and AI.
 */
import { brand, promise } from "@mcki/brand/tokens";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section style={{ padding: "96px 24px 64px", maxWidth: 1000, margin: "0 auto" }}>
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "#555B68", marginBottom: 16 }}>
          {brand.name} · Birmingham
        </p>
        <h1 className="display" style={{ fontSize: "clamp(34px,6vw,64px)", lineHeight: 1.02, color: "#111318", marginBottom: 20, fontWeight: 800 }}>
          One company.<br />Two ways we change your future.
        </h1>
        <p style={{ fontSize: 18, color: "#555B68", maxWidth: 620, lineHeight: 1.7 }}>
          MCKI started in education — getting students into the world&apos;s best
          universities. From that foundation we built an AI division that
          builds the agents running modern businesses. Choose your door.
        </p>
      </section>

      {/* TWO DOORS */}
      <section style={{ padding: "0 24px 80px", maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <DoorCard
          accent={brand.pillars.education.accent}
          kicker="The original business"
          title="Education"
          tagline={brand.pillars.education.tagline}
          href="https://education.mckisolutions.com"
          cta="Enter Education →"
        />
        <DoorCard
          accent={brand.pillars.ai.accent}
          kicker="The new division"
          title="AI & Agents"
          tagline={brand.pillars.ai.tagline}
          href="https://ai.mckisolutions.com"
          cta="Enter AI →"
        />
      </section>

      {/* PROMISE */}
      <section style={{ background: "#F5F6F8", padding: "56px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "center" }}>
          {promise.map((p) => (
            <div key={p.label} style={{ textAlign: "center" }}>
              <div className="display" style={{ fontSize: 44, fontWeight: 800, color: "#5B3FD9" }}>{p.value}</div>
              <div style={{ fontSize: 13, letterSpacing: 1, textTransform: "uppercase", color: "#555B68" }}>{p.label}</div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 24, color: "#555B68", fontSize: 14 }}>
          The promise of the AI division — what agentic AI delivers.
        </p>
      </section>

      <footer style={{ padding: "40px 24px", textAlign: "center", color: "#555B68", fontSize: 13, borderTop: "1px solid #E4E6EB" }}>
        {brand.name} · {brand.address} · {brand.email}
      </footer>
    </main>
  );
}

function DoorCard({ accent, kicker, title, tagline, href, cta }: {
  accent: string; kicker: string; title: string; tagline: string; href: string; cta: string;
}) {
  return (
    <a href={href} style={{
      display: "block", padding: 28, borderRadius: 16, border: "1px solid #E4E6EB",
      borderTop: `4px solid ${accent}`, textDecoration: "none", background: "#FFF", transition: "transform .15s",
    }}>
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 10 }}>{kicker}</p>
      <h2 className="display" style={{ fontSize: 30, fontWeight: 800, color: "#111318", marginBottom: 8 }}>{title}</h2>
      <p style={{ fontSize: 15, color: "#555B68", lineHeight: 1.6, marginBottom: 20 }}>{tagline}</p>
      <span style={{ fontSize: 14, fontWeight: 600, color: accent }}>{cta}</span>
    </a>
  );
}
