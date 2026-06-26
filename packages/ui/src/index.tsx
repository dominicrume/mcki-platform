/**
 * @mcki/ui — shared components built on @mcki/brand tokens.
 * AGENT: expand this into the full design system (Button, Section, Card,
 * Nav, Footer). Stubs below establish the pattern.
 */
import React from "react";
import { colors } from "@mcki/brand/tokens";

export function Button({ children, href, accent = colors.ai }: { children: React.ReactNode; href?: string; accent?: string }) {
  const style: React.CSSProperties = { display: "inline-block", padding: "12px 22px", borderRadius: 10, background: accent, color: "#fff", textDecoration: "none", fontWeight: 600, fontFamily: "'Inter',sans-serif" };
  return href ? <a href={href} style={style}>{children}</a> : <button style={style}>{children}</button>;
}

export function Section({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <section style={{ maxWidth: 1000, margin: "0 auto", padding: "64px 24px", ...style }}>{children}</section>;
}
