import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: { extend: { colors: {
    ink: "#111318", education: "#1E5B8F", ai: "#5B3FD9",
    lime: "#6B8E00", amber: "#FFAD33", mid: "#555B68", line: "#E4E6EB", bgSoft: "#F5F6F8",
  }}},
  plugins: [],
};
export default config;
