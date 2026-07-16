/**
 * MCKI Brand Tokens — the single source of brand truth.
 * Every app consumes these. Change a colour here → all four apps update.
 * Keep the existing MCKI brand colours; this is "more stable, more robust",
 * not a rebrand.
 */
export const colors = {
  // Core brand
  ink:      "#0A192F",   // deep navy black, primary text
  paper:    "#FFFFFF",
  // Pillar accents
  education:"#002D62",   // classic MCKI Navy
  ai:       "#FFD700",   // premium MCKI Gold
  // Shared signal colours
  lime:     "#6B8E00",   // success / proof / promise
  amber:    "#F59E0B",   // attention / live
  // Neutrals
  mid:      "#555B68",
  line:     "#E4E6EB",
  bgSoft:   "#F5F6F8",
} as const;

export const promise = [
  { label: "Cheaper", value: "5x" },
  { label: "Faster",  value: "7x" },
  { label: "Clearer", value: "10x" },
] as const;

export const type = {
  display: "'Syne', system-ui, sans-serif",
  body:    "'Inter', system-ui, sans-serif",
  mono:    "'JetBrains Mono', monospace",
} as const;

export const space = { xs:4, sm:8, md:16, lg:24, xl:40, xxl:64 } as const;

export const brand = {
  name: "MCKI Solutions Ltd",
  address: "Ravenhurst Street, Digbeth, Birmingham B12 0HD",
  email: "info@mckisolutions.com",
  phone: "+44 7889 417914",
  pillars: {
    education: {
      label: "Education",
      tagline: "We get students into the world's best universities.",
      accent: colors.education,
    },
    ai: {
      label: "AI & Agents",
      tagline: "We build the AI agents that run your business.",
      accent: colors.ai,
    },
  },
} as const;
