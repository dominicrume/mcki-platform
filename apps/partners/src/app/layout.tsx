import "../styles/globals.css";
import type { Metadata } from "next";
import { Nav } from "@mcki/ui";

export const metadata: Metadata = { 
  title: "MCKI Partners",
  description: "Join the MCKI Ambassador Program.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-ink text-white font-sans">
        <Nav currentApp="partners" />
        {children}
      </body>
    </html>
  );
}
