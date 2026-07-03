import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = { 
  title: "MCKI Education Consultancy",
  description: "We get students into the world's best universities through expert admissions advisory and talent matching.",
  openGraph: {
    title: "MCKI Education",
    description: "Expert university admissions advisory.",
    type: "website",
  },
};
import { Nav } from "@mcki/ui";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><head>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  </head><body className="bg-ink text-white font-sans">
    <Nav currentApp="education" />
    {children}
  </body></html>);
}
