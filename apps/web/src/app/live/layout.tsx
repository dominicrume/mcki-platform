
import type { Metadata } from "next";

export const metadata: Metadata = { 
  title: "MCKI Live Events",
  description: "Join MCKI live events. Watch agentic AI demos, participate in live polls, and ask questions in real-time.",
  openGraph: {
    title: "MCKI Live",
    description: "Interactive live event engine for MCKI.",
    type: "website",
  },
};
import { Nav } from "@mcki/ui";

export default function LiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav currentApp="live" />
      {children}
    </>
  );
}
