import { readDoc, listDocs } from "@mcki/content";
import { Section } from "@mcki/ui";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export async function generateStaticParams() {
  const proof = listDocs("proof");
  return proof.map((p) => ({ slug: p.slug }));
}

export default function ProofPage({ params }: { params: { slug: string } }) {
  const doc = readDoc("proof", params.slug);
  if (!doc) notFound();

  const d = doc.data as any;

  return (
    <main>
      <Section className="pt-24 pb-16 max-w-[800px]">
        <p className="font-mono text-[12px] tracking-widest uppercase text-ai mb-3">
          Case Study · {d.client}
        </p>
        <h1 className="font-extrabold text-[clamp(28px,4vw,48px)] leading-tight text-ink mb-6">
          {d.build}
        </h1>
        <div className="flex flex-wrap gap-4 mb-12">
          {d.results && d.results.map((r: string, i: number) => (
            <div key={i} className="px-4 py-2 bg-ai/10 text-ai font-semibold rounded-lg text-[14px]">
              {r}
            </div>
          ))}
        </div>
        
        <div className="prose prose-lg max-w-none prose-headings:font-extrabold prose-headings:text-ink prose-p:text-mid prose-p:leading-relaxed" dangerouslySetInnerHTML={{ __html: doc.body }} />
      </Section>
    </main>
  );
}
