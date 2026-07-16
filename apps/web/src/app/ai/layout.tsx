
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

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav currentApp="ai" />
      {children}
    </>
  );
}
