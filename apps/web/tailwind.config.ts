import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: { extend: { colors: {
    ink: "#0A192F", education: "#002D62", ai: "#FFD700",
    lime: "#6B8E00", amber: "#F59E0B", mid: "#555B68", line: "#E4E6EB", bgSoft: "#F5F6F8",
  }}},
  plugins: [],
};
export default config;
