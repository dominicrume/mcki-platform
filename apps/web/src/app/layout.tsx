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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-ink text-white font-sans bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#112340] via-ink to-ink min-h-screen antialiased selection:bg-ai/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
