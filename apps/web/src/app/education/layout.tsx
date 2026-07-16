
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

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav currentApp="education" />
      {children}
    </>
  );
}
