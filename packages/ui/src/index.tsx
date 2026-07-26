/**
 * @mcki/ui — shared components built on @mcki/brand tokens.
 * Elite UI component system utilizing glassmorphism, precise typography, and subtle micro-animations.
 */
import React from "react";
import { colors, brand } from "@mcki/brand/tokens";

export function Button({ children, href, accent = "bg-ai", className = "", external = false }: { children: React.ReactNode; href?: string; accent?: string; className?: string; external?: boolean }) {
  const isDarkText = accent.includes("ai") || accent.includes("amber") || accent.includes("white");
  const textColor = isDarkText ? "text-[#0A192F]" : "text-white";
  
  // Elite button styling: precise padding, fully rounded, sophisticated shadows and transitions
  const baseClasses = `inline-flex items-center justify-center px-8 py-4 rounded-full ${textColor} font-bold tracking-wide no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-${accent.replace('bg-', '')}/30 active:scale-95 ${accent} ${className}`;
  
  if (!href) return <button className={baseClasses}>{children}</button>;
  const target = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return <a href={href} className={baseClasses} {...target}>{children}</a>;
}

export function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`max-w-[1200px] mx-auto px-6 py-20 md:py-32 ${className}`}>{children}</section>;
}

export function Card({ children, accentClass, kicker, title, tagline, href, cta }: { children?: React.ReactNode, accentClass?: string, kicker?: string, title?: string, tagline?: string, href?: string, cta?: string }) {
  // Never use dark text-education (#002D62) on dark backgrounds; use luminous blue-300 for 100% legibility
  const textColorClass = accentClass?.includes("education") ? "text-blue-300 font-bold" : accentClass ? `text-${accentClass.replace('bg-', '')} font-bold` : "text-white/70";

  const inner = (
    <div className="flex flex-col h-full relative z-10">
      {kicker && <p className={`font-sans text-xs tracking-[0.2em] uppercase mb-4 ${textColorClass}`}>{kicker}</p>}
      {title && <h2 className="font-display text-3xl lg:text-4xl font-medium text-white mb-4 leading-tight">{title}</h2>}
      {tagline && <p className="font-sans text-base lg:text-lg text-white/85 leading-relaxed mb-8 flex-grow">{tagline}</p>}
      {cta && (
        <div className={`mt-auto inline-flex items-center gap-2 font-sans text-sm tracking-wide uppercase transition-colors ${textColorClass}`}>
          {cta} <span className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span>
        </div>
      )}
      {children}
    </div>
  );
  
  // High-trust institutional card matting with sharp 2px border and deep rich background contrast
  const classes = `group relative block p-8 lg:p-12 h-full rounded-[2rem] border-2 border-white/15 bg-[#0D1E36]/90 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:bg-[#112645] hover:border-white/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]`;
  
  const CardWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className={classes}>
      {accentClass && (
        <div className={`absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${accentClass}`}></div>
      )}
      {children}
    </div>
  );

  return href ? (
    <a href={href} className="block h-full no-underline outline-none">
      <CardWrapper>{inner}</CardWrapper>
    </a>
  ) : (
    <CardWrapper>{inner}</CardWrapper>
  );
}

export function ProgressBar({ progress, label, total }: { progress: number; total: number; label: string }) {
  const percentage = Math.min(100, Math.max(0, (progress / total) * 100));
  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-3">
        <span className="font-sans text-sm font-semibold tracking-wide text-white/90 uppercase">{label}</span>
        <span className="font-sans text-xs tracking-widest text-ai opacity-80">{progress} / {total}</span>
      </div>
      <div className="w-full bg-white/5 border border-white/10 rounded-full h-2 overflow-hidden backdrop-blur-sm">
        <div 
          className="bg-gradient-to-r from-ai/80 to-ai h-full rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${percentage}%`, boxShadow: "0 0 15px rgba(255,215,0,0.5)" }}
        />
      </div>
    </div>
  );
}

export function Nav({ currentApp = "web" }: { currentApp?: "web" | "education" | "ai" | "live" | "partners" }) {
  const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "/";
  const educationUrl = process.env.NEXT_PUBLIC_EDUCATION_URL || "/education";
  const aiUrl = process.env.NEXT_PUBLIC_AI_URL || "/ai";
  const liveUrl = process.env.NEXT_PUBLIC_LIVE_URL || "/live";
  const partnersUrl = process.env.NEXT_PUBLIC_PARTNERS_URL || "/partners";

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#0A192F]/80 backdrop-blur-xl">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex justify-between items-center">
        <a href={webUrl} className="font-display font-bold text-2xl tracking-tight text-white no-underline flex items-center gap-2">
          <span className="text-ai">MCKI</span><span className="font-sans text-sm font-light tracking-[0.2em] text-white/50 uppercase hidden sm:inline">Solutions</span>
        </a>
        <div className="flex gap-4 sm:gap-8 font-sans text-sm font-medium items-center overflow-x-auto no-scrollbar mask-edges">
          <a href={educationUrl} className={`no-underline transition-colors whitespace-nowrap ${currentApp === 'education' ? 'text-white' : 'text-white/50 hover:text-white'}`}>Education</a>
          <a href={aiUrl} className={`no-underline transition-colors whitespace-nowrap ${currentApp === 'ai' ? 'text-white' : 'text-white/50 hover:text-white'}`}>AI & Agents</a>
          <a href={liveUrl} className={`no-underline transition-colors whitespace-nowrap flex items-center gap-2 ${currentApp === 'live' ? 'text-white' : 'text-white/50 hover:text-white'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Live
          </a>
          <a href={partnersUrl} className={`no-underline transition-colors px-5 py-2 rounded-full whitespace-nowrap ${currentApp === 'partners' ? 'bg-white text-ink font-bold' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}>Partners</a>
        </div>
      </div>
    </nav>
  );
}

export { LeadForm } from "./LeadForm";
export * as emailService from "./email";
export { FadeIn } from "./FadeIn";
export { EmailCapture } from "./EmailCapture";

