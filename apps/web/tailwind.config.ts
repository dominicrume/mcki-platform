import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A192F",
        education: "#002D62",
        ai: "#FFD700",
        lime: "#6B8E00",
        amber: "#F59E0B",
        mid: "#555B68",
        line: "#E4E6EB",
        bgSoft: "#F5F6F8",
        // Application-chrome elevation for the /data and /learn product surfaces.
        // Shades derived from `ink` — not new brand colours.
        surface: {
          0: "#060F1E",
          1: "#0A192F",
          2: "#0F2340",
          3: "#16304F",
          line: "#1E3A5F",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Playfair Display'", "Georgia", "serif"],
        serif: ["'Playfair Display'", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Dense product scale — data tables need a tighter step than marketing pages.
        "2xs": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.01em" }],
      },
      borderRadius: { xl2: "0.875rem" },
      transitionTimingFunction: { swift: "cubic-bezier(0.16, 1, 0.3, 1)" },
      animation: {
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
