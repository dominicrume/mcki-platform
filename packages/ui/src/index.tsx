/**
 * @mcki/ui — shared components built on @mcki/brand tokens.
 * AGENT: expand this into the full design system (Button, Section, Card,
 * Nav, Footer). Stubs below establish the pattern.
 */
import React from "react";
import { colors, brand } from "@mcki/brand/tokens";

export function Button({ children, href, accent = "bg-ai", className = "", external = false }: { children: React.ReactNode; href?: string; accent?: string; className?: string; external?: boolean }) {
  const textColor = accent.includes("ai") || accent.includes("amber") ? "text-ink" : "text-white";
  const baseClasses = `inline-block px-6 py-3 rounded-xl ${textColor} font-bold no-underline transition-transform hover:-translate-y-0.5 shadow-sm hover:shadow-md ${accent} ${className}`;
  if (!href) return <button className={baseClasses}>{children}</button>;
  const target = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return <a href={href} className={baseClasses} {...target}>{children}</a>;
}

export function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`max-w-[1000px] mx-auto px-6 py-16 ${className}`}>{children}</section>;
}

export function Card({ children, accentClass, kicker, title, tagline, href, cta }: { children?: React.ReactNode, accentClass?: string, kicker?: string, title?: string, tagline?: string, href?: string, cta?: string }) {
  const inner = (
    <>
      {kicker && <p className={`font-mono text-[10px] tracking-widest uppercase mb-2 ${accentClass ? `text-${accentClass.replace('bg-', '')}` : ''}`}>{kicker}</p>}
      {title && <h2 className="text-3xl font-extrabold text-white mb-2">{title}</h2>}
      {tagline && <p className="text-[15px] text-white/70 leading-relaxed mb-5">{tagline}</p>}
      {cta && <span className={`text-[14px] font-semibold ${accentClass ? `text-${accentClass.replace('bg-', '')}` : ''}`}>{cta}</span>}
      {children}
    </>
  );
  const classes = `block p-7 rounded-2xl border border-white/10 bg-white/5 transition-transform hover:-translate-y-1 ${accentClass ? `border-t-4 border-t-${accentClass.replace('bg-', '')}` : ''}`;
  return href ? <a href={href} className={classes}>{inner}</a> : <div className={classes}>{inner}</div>;
}

export function ProgressBar({ progress, label, total }: { progress: number; total: number; label: string }) {
  const percentage = Math.min(100, Math.max(0, (progress / total) * 100));
  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <span className="text-[14px] font-semibold text-white/90">{label}</span>
        <span className="text-[12px] font-mono text-ai drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]">{progress} / {total}</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
        <div 
          className="bg-ai h-3 rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${percentage}%`, boxShadow: "0 0 10px rgba(255,215,0,0.5)" }}
        />
      </div>
    </div>
  );
}

export function Nav({ currentApp = "web" }: { currentApp?: "web" | "education" | "ai" | "live" | "partners" }) {
  // The four pillars are routes in one app, not separate deployments, so these default to
  // same-origin paths. They resolve wherever the app is served — a preview URL, the apex, or
  // a pillar subdomain. Set the NEXT_PUBLIC_*_URL vars only to point a pillar at a different origin.
  const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "/";
  const educationUrl = process.env.NEXT_PUBLIC_EDUCATION_URL || "/education";
  const aiUrl = process.env.NEXT_PUBLIC_AI_URL || "/ai";
  const liveUrl = process.env.NEXT_PUBLIC_LIVE_URL || "/live";
  const partnersUrl = process.env.NEXT_PUBLIC_PARTNERS_URL || "/partners";

  return (
    <nav className="border-b border-white/10 px-6 py-4 flex justify-between items-center max-w-[1000px] mx-auto overflow-x-auto whitespace-nowrap">
      <a href={webUrl} className="font-extrabold text-xl tracking-tight text-white no-underline mr-8">MCKI</a>
      <div className="flex gap-6 text-[14px] font-medium items-center">
        <a href={educationUrl} className={`no-underline transition-colors ${currentApp === 'education' ? 'text-ai drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]' : 'text-white/70 hover:text-white'}`}>Education</a>
        <a href={aiUrl} className={`no-underline transition-colors ${currentApp === 'ai' ? 'text-ai drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]' : 'text-white/70 hover:text-white'}`}>AI & Agents</a>
        <a href={liveUrl} className={`no-underline transition-colors ${currentApp === 'live' ? 'text-ai drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]' : 'text-white/70 hover:text-white'}`}>Live</a>
        <a href={partnersUrl} className={`no-underline transition-colors px-3 py-1.5 rounded-full ${currentApp === 'partners' ? 'bg-ai text-ink font-bold' : 'border border-ai text-ai hover:bg-ai/10'}`}>Partners</a>
      </div>
    </nav>
  );
}

export { LeadForm } from "./LeadForm";
export { submitData, supabase } from "./supabase";
export * as emailService from "./email";

