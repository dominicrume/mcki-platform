import "../styles/globals.css";
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
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><head>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  </head><body className="bg-ink text-white font-sans">
    <Nav currentApp="live" />
    {children}
  </body></html>);
}
