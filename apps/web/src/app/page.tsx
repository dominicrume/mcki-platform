/**
 * Parent brand homepage — mckisolutions.com
 * A unified single-page architecture displaying all divisions with a world-class elite aesthetic.
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
    <main className="relative selection:bg-ai/30 selection:text-white">
      <Nav currentApp="web" />
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-ink">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-ai/5 rounded-full blur-[150px] opacity-50 mix-blend-screen"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-education/10 rounded-full blur-[150px] opacity-30 mix-blend-screen"></div>
      </div>
      
      {/* HERO SECTION */}
      <Section className="pt-32 pb-20 md:pt-48 md:pb-32 text-center animate-fade-in-up">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-ai animate-pulse"></span>
          <span className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-white/80">
            {brand.name} · The Standard of Excellence
          </span>
        </div>
        
        {/* The "Norman Newtimes Roman" elite serif typography for the hook */}
        <h1 className="font-display font-medium text-[clamp(48px,8vw,96px)] leading-[1.05] tracking-tight mb-8 text-white max-w-[1000px] mx-auto drop-shadow-2xl">
          Education Excellence.<br/>
          <span className="italic text-white/50 font-light">meets</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-ai via-[#FFF0B3] to-ai">Autonomous AI.</span>
        </h1>
        
        <p className="font-sans text-[18px] md:text-[22px] font-light text-white/60 max-w-[700px] mx-auto leading-relaxed mb-12">
          We secure admissions into the world's most prestigious universities, and engineer the autonomous AI systems that run modern elite enterprises. 
          <strong className="text-white font-normal block mt-2">Two divisions. One world-class standard.</strong>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button href="#education" accent="bg-white" className="w-full sm:w-auto shadow-[0_0_30px_rgba(255,255,255,0.1)]">Discover Education</Button>
          <Button href="#ai" accent="bg-transparent border border-white/20 hover:bg-white/5 text-white" className="w-full sm:w-auto">Explore AI Division</Button>
        </div>
      </Section>

      {/* LUXURY PROMISE STRIP (Customer Trust) */}
      <section className="relative z-10 border-y border-white/5 bg-white/[0.02] backdrop-blur-xl">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {promise.map((p) => (
              <div key={p.label} className="text-center group pt-8 md:pt-0 first:pt-0">
                <div className="font-display font-medium text-5xl text-white mb-3 transition-transform duration-500 group-hover:scale-110 group-hover:text-ai">{p.value}</div>
                <div className="font-sans text-[12px] font-bold tracking-[0.2em] uppercase text-white/40">{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION DIVISION */}
      <Section className="py-24 md:py-40 relative" id="education">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-education/20 rounded-full blur-[150px] pointer-events-none -translate-y-1/2"></div>
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start relative z-10">
          <div className="lg:w-1/3 sticky top-32">
            <p className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-education mb-4">Division 01</p>
            <h2 className="font-display font-medium text-[clamp(40px,5vw,64px)] text-white mb-6 leading-tight">The Education Consultancy.</h2>
            <p className="font-sans text-lg text-white/60 leading-relaxed mb-8">
              {edu.hero_sub} Our legacy division is built on an uncompromising standard of academic placement and strategic consulting.
            </p>
            <Button href="/education" accent="bg-education" className="shadow-[0_0_30px_rgba(0,45,98,0.4)]">View Full Consultancy →</Button>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {eduServices.map((s: any, i: number) => (
              <div key={i} className={i % 2 === 1 ? "sm:mt-12" : ""}>
                <Card title={s.title} tagline={s.desc} accentClass="bg-education" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* AI DIVISION */}
      <Section className="py-24 md:py-40 relative border-t border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent" id="ai">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-ai/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2"></div>
        
        <div className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-24 items-start relative z-10">
          <div className="lg:w-1/3 sticky top-32">
            <p className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-ai mb-4">Division 02</p>
            <h2 className="font-display font-medium text-[clamp(40px,5vw,64px)] text-white mb-6 leading-tight">The AI & Agents Studio.</h2>
            <p className="font-sans text-lg text-white/60 leading-relaxed mb-8">
              {ai.hero_sub} We engineer bespoke, autonomous AI systems that execute complex workflows and scale elite operations infinitely.
            </p>
            <Button href="/ai" accent="bg-ai" className="shadow-[0_0_30px_rgba(255,215,0,0.3)]">Enter AI Division →</Button>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {aiBuilds.map((s: any, i: number) => (
              <div key={i} className={i % 2 === 0 ? "sm:mt-12" : ""}>
                <Card title={s.title} tagline={s.desc} accentClass="bg-ai" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* LIVE EVENT BANNER */}
      {nextEvent && (
        <Section className="py-24" id="live">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0d1b2a] p-10 md:p-20 group text-center">
            {/* Background luxury gradient */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-ai/10 via-transparent to-education/10 opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <div className="relative z-10 max-w-[800px] mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 mb-8">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase">Upcoming Live Event</span>
              </div>
              
              <h2 className="font-display font-medium text-[clamp(32px,5vw,56px)] text-white mb-6 leading-tight">
                {nextEvent.data.title}
              </h2>
              
              <p className="font-sans text-lg md:text-xl text-white/60 leading-relaxed mb-10">
                Watch advanced AI systems get built in real-time, custom-tailored around a real business chosen directly from the audience. Step into the future of corporate efficiency.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
                <div className="flex flex-col items-center">
                  <span className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2">Date</span>
                  <span className="font-sans text-white/90">{nextEvent.data.date instanceof Date ? nextEvent.data.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : String(nextEvent.data.date)}</span>
                </div>
                <div className="hidden sm:block w-px h-8 bg-white/10"></div>
                <div className="flex flex-col items-center">
                  <span className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2">Location</span>
                  <span className="font-sans text-white/90">{nextEvent.data.venue}</span>
                </div>
              </div>
              
              <Button href="/live" accent="bg-white text-ink">Claim Your Exclusive Spot →</Button>
            </div>
          </div>
        </Section>
      )}

      {/* FOOTER */}
      <footer className="py-16 border-t border-white/5 bg-ink">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-display font-bold text-2xl tracking-tight text-white">
              <span className="text-ai">MCKI</span><span className="font-sans text-sm font-light tracking-[0.2em] text-white/50 uppercase ml-2">Solutions</span>
            </span>
            <p className="font-sans text-[13px] text-white/40">© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 font-sans text-[13px] text-white/60">
            <span className="hover:text-white transition-colors">{brand.address}</span>
            <span className="hover:text-white transition-colors">{brand.email}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
