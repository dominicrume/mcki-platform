import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCKI Solutions — Education & AI",
  description: "One brand, two pillars: Education consultancy and AI agent builds. We get students into top universities and build the AI agents that run your business.",
  openGraph: {
    title: "MCKI Solutions",
    description: "Education consultancy and AI agent builds.",
    type: "website",
  },
};

import { Nav } from "@mcki/ui";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-ink font-sans">
        <Nav currentApp="web" />
        {children}
      </body>
    </html>
  );
}
