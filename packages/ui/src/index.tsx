/**
 * @mcki/ui — shared components built on @mcki/brand tokens.
 * AGENT: expand this into the full design system (Button, Section, Card,
 * Nav, Footer). Stubs below establish the pattern.
 */
import React from "react";
import { colors, brand } from "@mcki/brand/tokens";

export function Button({ children, href, accent = "bg-ai", className = "" }: { children: React.ReactNode; href?: string; accent?: string; className?: string }) {
  const textColor = accent.includes("ai") || accent.includes("amber") ? "text-ink" : "text-white";
  const baseClasses = `inline-block px-6 py-3 rounded-xl ${textColor} font-bold no-underline transition-transform hover:-translate-y-0.5 shadow-sm hover:shadow-md ${accent} ${className}`;
  return href ? <a href={href} className={baseClasses}>{children}</a> : <button className={baseClasses}>{children}</button>;
}

export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`max-w-[1000px] mx-auto px-6 py-16 ${className}`}>{children}</section>;
}

export function Card({ children, accentClass, kicker, title, tagline, href, cta }: { children?: React.ReactNode, accentClass?: string, kicker?: string, title?: string, tagline?: string, href?: string, cta?: string }) {
  const inner = (
    <>
      {kicker && <p className={`font-mono text-[10px] tracking-widest uppercase mb-2 ${accentClass ? `text-${accentClass.replace('bg-', '')}` : ''}`}>{kicker}</p>}
      {title && <h2 className="text-3xl font-extrabold text-ink mb-2">{title}</h2>}
      {tagline && <p className="text-[15px] text-mid leading-relaxed mb-5">{tagline}</p>}
      {cta && <span className={`text-[14px] font-semibold ${accentClass ? `text-${accentClass.replace('bg-', '')}` : ''}`}>{cta}</span>}
      {children}
    </>
  );
  const classes = `block p-7 rounded-2xl border border-line bg-white transition-transform hover:-translate-y-1 ${accentClass ? `border-t-4 border-t-${accentClass.replace('bg-', '')}` : ''}`;
  return href ? <a href={href} className={classes}>{inner}</a> : <div className={classes}>{inner}</div>;
}

export function Nav({ currentApp = "web" }: { currentApp?: "web" | "education" | "ai" | "live" }) {
  const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "https://mckisolutions.com";
  const educationUrl = process.env.NEXT_PUBLIC_EDUCATION_URL || "https://education.mckisolutions.com";
  const aiUrl = process.env.NEXT_PUBLIC_AI_URL || "https://ai.mckisolutions.com";
  const liveUrl = process.env.NEXT_PUBLIC_LIVE_URL || "https://live.mckisolutions.com";

  return (
    <nav className="border-b border-line px-6 py-4 flex justify-between items-center max-w-[1000px] mx-auto">
      <a href={webUrl} className="font-extrabold text-xl tracking-tight text-ink no-underline">MCKI</a>
      <div className="flex gap-6 text-[14px] font-medium">
        <a href={educationUrl} className={`no-underline ${currentApp === 'education' ? 'text-education' : 'text-mid hover:text-ink'}`}>Education</a>
        <a href={aiUrl} className={`no-underline ${currentApp === 'ai' ? 'text-ai' : 'text-mid hover:text-ink'}`}>AI & Agents</a>
        <a href={liveUrl} className={`no-underline ${currentApp === 'live' ? 'text-amber' : 'text-mid hover:text-ink'}`}>Live</a>
      </div>
    </nav>
  );
}

export { LeadForm } from "./LeadForm";
export { submitData, supabase } from "./supabase";

