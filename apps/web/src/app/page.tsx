/**
 * Parent brand homepage — mckisolutions.com
 * A unified single-page architecture displaying all divisions.
 */
import { readDoc, listDocs } from "@mcki/content";
import { brand, promise } from "@mcki/brand/tokens";
import { Section, Card, Nav, Button } from "@mcki/ui";

export default function Home() {
  const doc = readDoc("web", "home");
  const d = (doc?.data ?? {}) as any;

  // Education Content
  const eduDoc = readDoc("education", "index");
  const edu = (eduDoc?.data ?? {}) as any;
  const eduServices = edu.services ?? [];

  // AI Content
  const aiDoc = readDoc("ai", "index");
  const ai = (aiDoc?.data ?? {}) as any;
  const aiBuilds = ai.builds ?? [];

  // Live Event Content
  const events = listDocs<any>("live/events");
  const nextEvent = events.find(e => e.data.status === "live") || events[0];

  return (
    <main>
      <Nav currentApp="web" />
      
      {/* HERO */}
      <Section className="pt-24 pb-16 animate-fade-in-up text-center">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
          <span className="font-mono text-[12px] tracking-widest uppercase text-ai drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]">
            {brand.name} · Dual Division Platform
          </span>
        </div>
        <h1 
          className="font-extrabold text-[clamp(40px,7vw,72px)] leading-[1.05] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70 tracking-tight" 
        >
          Education Excellence.<br/>
          <span className="text-ai drop-shadow-[0_0_15px_rgba(255,215,0,0.2)]">Artificial Intelligence.</span>
        </h1>
        <p className="text-[20px] text-white/70 max-w-[700px] mx-auto leading-relaxed mb-10">
          We get students into the world's best universities, and we build the autonomous AI systems that run modern enterprises. Two pillars. One world-class standard.
        </p>
        <div className="flex gap-4 justify-center items-center">
          <Button href="#education" accent="bg-education" className="px-8 shadow-lg shadow-[#1E5B8F]/20">Explore Education</Button>
          <Button href="#ai" accent="bg-ai" className="px-8 shadow-lg shadow-[#FFD700]/20">Explore AI Division</Button>
        </div>
      </Section>

      {/* PROMISE STRIP */}
      <section className="bg-white/5 py-12 px-6 border-y border-white/10 backdrop-blur-sm">
        <div className="max-w-[1000px] mx-auto flex gap-12 flex-wrap justify-center">
          {promise.map((p) => (
            <div key={p.label} className="text-center group">
              <div className="font-extrabold text-4xl text-ai mb-2 transition-transform group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">{p.value}</div>
              <div className="text-[13px] tracking-widest uppercase text-white/70">{p.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <Section className="py-24" id="education">
        <div className="text-center mb-16">
          <p className="font-mono text-[13px] tracking-widest uppercase text-white/50 mb-4 border border-white/10 px-4 py-1 inline-block rounded-full">Pillar 01</p>
          <h2 className="text-[clamp(32px,5vw,48px)] font-extrabold text-white mb-6">The Original Business</h2>
          <p className="text-[18px] text-white/70 max-w-[800px] mx-auto leading-relaxed">
            {edu.hero_sub}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eduServices.map((s: any, i: number) => (
            <Card key={i} title={s.title} tagline={s.desc} accentClass="bg-education" />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/education" accent="bg-education" className="bg-transparent border border-white/20 hover:bg-white/10 hover:border-white/30 text-white shadow-none">View Full Education Services →</Button>
        </div>
      </Section>

      {/* AI SECTION */}
      <section className="py-24 bg-gradient-to-b from-ink via-[#0d1b2a] to-ink relative overflow-hidden" id="ai">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ai/30 to-transparent"></div>
        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <p className="font-mono text-[13px] tracking-widest uppercase text-ai mb-4 border border-ai/30 bg-ai/5 px-4 py-1 inline-block rounded-full shadow-[0_0_15px_rgba(255,215,0,0.1)]">Pillar 02</p>
            <h2 className="text-[clamp(32px,5vw,48px)] font-extrabold text-white mb-6">AI & Agents</h2>
            <p className="text-[18px] text-white/70 max-w-[800px] mx-auto leading-relaxed">
              {ai.hero_sub}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiBuilds.map((s: any, i: number) => (
              <Card key={i} title={s.title} tagline={s.desc} accentClass="bg-ai" />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/ai" accent="bg-ai" className="shadow-[0_0_20px_rgba(255,215,0,0.2)]">Enter AI Division →</Button>
          </div>
        </div>
      </section>

      {/* LIVE EVENT SECTION */}
      {nextEvent && (
        <Section className="py-24" id="live">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 md:p-16 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-ai opacity-5 blur-[100px] group-hover:opacity-10 transition-opacity"></div>
            
            <p className="font-mono text-[12px] tracking-widest uppercase text-white/50 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Upcoming Live Event
            </p>
            
            <h2 className="font-extrabold text-[clamp(28px,4vw,40px)] text-white mb-4 leading-tight">
              {nextEvent.data.title}
            </h2>
            
            <div className="flex flex-wrap gap-4 text-[15px] font-medium text-white/80 mb-8">
              <span className="bg-white/10 px-4 py-2 rounded-lg border border-white/5">🗓 {nextEvent.data.date instanceof Date ? nextEvent.data.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : String(nextEvent.data.date)}</span>
              <span className="bg-white/10 px-4 py-2 rounded-lg border border-white/5">📍 {nextEvent.data.venue}</span>
            </div>
            
            <p className="text-white/70 max-w-[600px] leading-relaxed mb-10">
              Watch advanced AI systems get built in real-time, custom-tailored around a real business chosen directly from the audience. Step into the future of corporate efficiency.
            </p>
            
            <Button href="/live" accent="bg-ai">Claim Your Spot →</Button>
          </div>
        </Section>
      )}

      <footer className="py-12 border-t border-white/10 text-center text-white/40 text-[14px]">
        <div className="max-w-[1000px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <span>{brand.address}</span>
            <span>{brand.email}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
