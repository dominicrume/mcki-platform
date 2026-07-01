import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = { 
  title: "MCKI AI & Agents",
  description: "We build the AI agents that run your business. Cheaper. Faster. Clearer. Proven agentic workflows and custom SaaS platforms.",
  openGraph: {
    title: "MCKI AI & Agents",
    description: "Agentic AI workflows and SaaS platforms for enterprise.",
    type: "website",
  },
};
import { Nav } from "@mcki/ui";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><head>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  </head><body className="bg-white text-ink font-sans">
    <Nav currentApp="ai" />
    {children}
  </body></html>);
}
