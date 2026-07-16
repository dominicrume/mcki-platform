
import type { Metadata } from "next";
import { Nav } from "@mcki/ui";

export const metadata: Metadata = { 
  title: "MCKI Partners",
  description: "Join the MCKI Ambassador Program.",
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav currentApp="partners" />
      {children}
    </>
  );
}
