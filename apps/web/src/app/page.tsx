/**
 * Parent brand homepage — mckisolutions.com
 * Human-crafted, architectural elite aesthetic with high-contrast typography and solid structure.
 */
import Image from "next/image";
import { readDoc, listDocs } from "@mcki/content";
import { brand, promise } from "@mcki/brand/tokens";
import { Section, Card, Nav, Button, FadeIn, EmailCapture } from "@mcki/ui";

export default function Home() {
  const doc = readDoc("web", "home");
  const d = (doc?.data ?? {}) as any;
  const testimonials = d.testimonials ?? [];

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
    <main className="relative selection:bg-ai selection:text-ink bg-[#0A0D14] text-white">
      <Nav currentApp="web" />
      
      {/* SUBTLE ARCHITECTURAL GRID BACKGROUND (Human-crafted clean structure) */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      {/* HERO SECTION */}
      <Section className="pt-32 pb-20 md:pt-48 md:pb-32 text-center relative z-10">
        <FadeIn delay={0.1}>
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-md shadow-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-ai animate-pulse"></span>
            <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-white">
              {brand.name} · The Standard of Excellence
            </span>
          </div>
          
          <h1 className="font-display font-medium text-[clamp(48px,8vw,96px)] leading-[1.05] tracking-tight mb-8 text-white max-w-[1050px] mx-auto drop-shadow-xl">
            Education Excellence.<br/>
            <span className="italic text-white/70 font-light">meets</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-ai via-[#FFF0B3] to-ai font-semibold">Agentic AI.</span>
          </h1>
          
          <p className="font-sans text-[20px] md:text-[24px] font-normal text-white/90 max-w-[750px] mx-auto leading-relaxed mb-12 drop-shadow-md">
            We secure admissions into the world's most prestigious universities, and engineer the agentic AI systems that run modern elite enterprises. 
            <strong className="text-white font-bold block mt-3 underline decoration-ai decoration-2 underline-offset-8">Two divisions. One world-class standard.</strong>
          </p>
          
          <div className="flex justify-center items-center">
            <EmailCapture source="hero-homepage" ctaText="Request a Private Consultation" accentClass="bg-white text-ink font-bold shadow-2xl hover:bg-ai transition-colors" />
          </div>
        </FadeIn>
      </Section>

      {/* CREDIBILITY STRIP (INTERACTIVE UNIVERSITY LOGOS) */}
      <div className="w-full border-y border-white/15 bg-white/[0.03] py-12 relative z-10 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 text-center mb-6">
          <p className="font-sans text-xs font-bold tracking-[0.25em] text-white/70 uppercase">Trusted by Candidates & Alumni Across Global Institutions</p>
        </div>
        <div className="flex w-[200%] animate-marquee items-center">
          {[1, 2].map((group) => (
            <div key={group} className="flex justify-around items-center w-1/2 px-4 gap-12 md:gap-20 font-display text-3xl md:text-4xl tracking-wider uppercase font-semibold text-white/50">
              <span className="hover:text-white hover:scale-110 hover:text-ai transition-all duration-300 cursor-pointer drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">Oxford</span>
              <span className="hover:text-white hover:scale-110 hover:text-ai transition-all duration-300 cursor-pointer drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">Harvard</span>
              <span className="hover:text-white hover:scale-110 hover:text-ai transition-all duration-300 cursor-pointer drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">LSE</span>
              <span className="hover:text-white hover:scale-110 hover:text-ai transition-all duration-300 cursor-pointer drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">Stanford</span>
              <span className="hover:text-white hover:scale-110 hover:text-ai transition-all duration-300 cursor-pointer drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">MIT</span>
              <span className="hover:text-white hover:scale-110 hover:text-ai transition-all duration-300 cursor-pointer drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">Cambridge</span>
            </div>
          ))}
        </div>
      </div>

      {/* LUXURY PROMISE STRIP (Customer Trust) */}
      <section className="relative z-10 border-b border-white/15 bg-white/[0.02] py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-white/15">
              {promise.map((p) => (
                <div key={p.label} className="text-center group pt-8 md:pt-0 first:pt-0">
                  <div className="font-display font-bold text-5xl md:text-6xl text-white mb-3 transition-transform duration-300 group-hover:scale-105 group-hover:text-ai">{p.value}</div>
                  <div className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-white/80">{p.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* EDUCATION DIVISION */}
      <Section className="py-24 md:py-36 relative z-10 border-b border-white/15" id="education">
        <FadeIn delay={0.2}>
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            <div className="lg:w-1/3 sticky top-32">
              <div className="inline-block px-3 py-1 rounded bg-education/30 border border-education text-white font-sans text-xs font-bold tracking-[0.2em] uppercase mb-6">Division 01</div>
              <h2 className="font-display font-bold text-[clamp(40px,5vw,64px)] text-white mb-6 leading-tight">The Education Consultancy.</h2>
              <p className="font-sans text-lg md:text-xl font-normal text-white/90 leading-relaxed mb-8">
                {edu.hero_sub} Our legacy division is built on an uncompromising standard of academic placement and strategic consulting.
              </p>
              
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-8 border-2 border-white/20 shadow-2xl group">
                <Image src="/images/education_campus.jpg" alt="Prestigious University Campus" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>

              <Button href="/education" accent="bg-education" className="w-full text-center font-bold text-md shadow-2xl py-4">View Full Consultancy →</Button>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
              {eduServices.map((s: any, i: number) => (
                <div key={i} className={i % 2 === 1 ? "sm:mt-12" : ""}>
                  <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/15 hover:border-white/40 hover:bg-white/[0.07] transition-all shadow-xl h-full flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-2xl text-white mb-4">{s.title}</h3>
                      <p className="font-sans text-base font-normal text-white/80 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* AI DIVISION */}
      <Section className="py-24 md:py-36 relative z-10 border-b border-white/15 bg-white/[0.01]" id="ai">
        <FadeIn delay={0.2}>
          <div className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-24 items-start">
            <div className="lg:w-1/3 sticky top-32">
              <div className="inline-block px-3 py-1 rounded bg-ai/30 border border-ai text-white font-sans text-xs font-bold tracking-[0.2em] uppercase mb-6">Division 02</div>
              <h2 className="font-display font-bold text-[clamp(40px,5vw,64px)] text-white mb-6 leading-tight">The AI & Agents Studio.</h2>
              <p className="font-sans text-lg md:text-xl font-normal text-white/90 leading-relaxed mb-8">
                {ai.hero_sub} We engineer bespoke, agentic AI systems that execute complex workflows and scale elite operations infinitely.
              </p>
              
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-8 border-2 border-white/20 shadow-2xl group">
                <Image src="/images/ai_nodes.jpg" alt="Abstract Agentic AI Network" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>

              <Button href="/ai" accent="bg-ai" className="w-full text-center font-bold text-md text-ink shadow-2xl py-4">Enter AI Studio →</Button>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
              {aiBuilds.map((s: any, i: number) => (
                <div key={i} className={i % 2 === 0 ? "sm:mt-12" : ""}>
                  <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/15 hover:border-white/40 hover:bg-white/[0.07] transition-all shadow-xl h-full flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-2xl text-white mb-4">{s.title}</h3>
                      <p className="font-sans text-base font-normal text-white/80 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* THE FIRM / PHILOSOPHY */}
      <Section className="py-24 md:py-36 relative z-10 border-b border-white/15 bg-[#070A10]" id="firm">
        <FadeIn delay={0.2}>
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 w-full">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 group">
                <Image src="/images/firm_boardroom.jpg" alt="The MCKI Firm Boardroom" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <span className="font-sans text-xs font-bold tracking-[0.25em] uppercase text-ai mb-4 block">The Firm</span>
              <h2 className="font-display font-bold text-[clamp(40px,5vw,56px)] text-white mb-8 leading-tight">{d.philosophy?.title || "We Build The Future of Leadership."}</h2>
              <p className="font-sans text-xl font-normal text-white/90 leading-relaxed mb-10">
                {d.philosophy?.body}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="#education" accent="bg-education" className="font-bold px-8 py-3">Explore Education</Button>
                <Button href="#ai" accent="bg-ai" className="font-bold px-8 py-3 text-ink">Explore AI Studio</Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* CLIENT SUCCESS (CASE PROOF / TESTIMONIALS) */}
      <Section className="py-24 md:py-36 relative z-10 border-b border-white/15 bg-white/[0.02]" id="success">
        <FadeIn delay={0.2}>
          <div className="text-center max-w-[800px] mx-auto mb-20">
             <span className="font-sans text-xs font-bold tracking-[0.25em] uppercase text-ai mb-4 block">Verifiable Track Record</span>
             <h2 className="font-display font-bold text-[clamp(36px,4.5vw,56px)] text-white leading-tight mb-6">Uncompromising Results.</h2>
             <p className="font-sans text-lg text-white/80 font-normal">Our credibility is built on hard metrics and admissions into the world's most selective institutions and enterprises.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t: any, i: number) => (
              <div key={i} className="p-8 md:p-10 rounded-3xl bg-white/[0.05] border-2 border-white/20 hover:border-white/50 hover:bg-white/[0.08] transition-all duration-300 shadow-2xl flex flex-col justify-between group">
                <div>
                  {t.metric && (
                    <div className="inline-block px-3 py-1.5 rounded-md bg-ai/20 border border-ai/50 text-ai font-sans text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                      {t.metric}
                    </div>
                  )}
                  <p className="font-sans text-lg text-white font-normal leading-relaxed mb-8">"{t.quote}"</p>
                </div>
                <div className="pt-6 border-t border-white/15">
                  <p className="font-sans font-bold text-xl text-white mb-1">{t.name}</p>
                  <p className={`font-sans text-sm font-semibold ${t.division === 'ai' ? 'text-ai' : 'text-education'}`}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* LIVE EVENT BANNER */}
      {nextEvent && (
        <Section className="py-24 relative z-10" id="live">
          <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-white/20 bg-[#0d1b2a] p-10 md:p-20 group text-center shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-ai/15 via-transparent to-education/15 opacity-80 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <FadeIn delay={0.2}>
              <div className="relative z-10 max-w-[850px] mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 mb-8 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="font-sans text-xs tracking-[0.2em] uppercase">Upcoming Live Executive Briefing</span>
                </div>
                
                <h2 className="font-display font-bold text-[clamp(36px,5vw,60px)] text-white mb-6 leading-tight">
                  {nextEvent.data.title}
                </h2>
                
                <p className="font-sans text-xl font-normal text-white/90 leading-relaxed mb-10">
                  Watch advanced AI systems get built in real-time, custom-tailored around a real business chosen directly from the audience. Step into the future of corporate efficiency.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-12 bg-white/5 py-4 px-8 rounded-2xl border border-white/10 inline-flex">
                  <div className="flex flex-col items-center">
                    <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-ai mb-1">Date</span>
                    <span className="font-sans text-lg font-bold text-white">{nextEvent.data.date instanceof Date ? nextEvent.data.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : String(nextEvent.data.date)}</span>
                  </div>
                  <div className="hidden sm:block w-px h-10 bg-white/20"></div>
                  <div className="flex flex-col items-center">
                    <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-ai mb-1">Location</span>
                    <span className="font-sans text-lg font-bold text-white">{nextEvent.data.venue}</span>
                  </div>
                </div>
                
                <div className="flex justify-center items-center">
                  <EmailCapture source="live-event-banner" ctaText="Claim Your Executive Seat" accentClass="bg-white text-ink font-bold shadow-2xl hover:bg-ai transition-colors" />
                </div>
              </div>
            </FadeIn>
          </div>
        </Section>
      )}

      {/* FOOTER */}
      <footer className="py-16 border-t border-white/20 bg-[#070A10] relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-display font-bold text-3xl tracking-tight text-white">
              <span className="text-ai">MCKI</span><span className="font-sans text-sm font-bold tracking-[0.25em] text-white/70 uppercase ml-2">Solutions</span>
            </span>
            <p className="font-sans text-sm font-normal text-white/60">© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 font-sans text-sm font-semibold text-white/80">
            <span className="hover:text-white transition-colors cursor-pointer">{brand.address}</span>
            <span className="hover:text-white transition-colors cursor-pointer">{brand.email}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
