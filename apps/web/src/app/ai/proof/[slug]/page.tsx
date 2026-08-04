import { readDoc, listDocs } from "@mcki/content";
import { Section, DynamicKYABadge } from "@mcki/ui";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export async function generateStaticParams() {
  const proof = listDocs("proof");
  return proof.map((p) => ({ slug: p.slug }));
}

export default async function ProofPage({ params }: { params: { slug: string } }) {
  const doc = readDoc("proof", params.slug);
  if (!doc) notFound();

  const d = doc.data as any;

  return (
    <main>
      <Section className="pt-24 pb-16 max-w-[800px]">
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-[12px] tracking-widest uppercase text-ai drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]">
            Case Study · {d.client}
          </p>
          <DynamicKYABadge 
            action={`Rendered Proof Document: ${d.client}`}
            rule_applied="KYA Protocol - Rule 3 (Immutable Audit Trail)"
            approver="System (Autonomous)" 
          />
        </div>
        <h1 className="font-extrabold text-[clamp(32px,5vw,56px)] leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
          {d.build}
        </h1>
        <div className="flex flex-wrap gap-4 mb-12">
          {d.results && d.results.map((r: string, i: number) => (
            <div key={i} className="px-4 py-2 bg-ai/10 border border-ai/30 text-ai font-semibold rounded-lg text-[14px]">
              {r}
            </div>
          ))}
        </div>
        
        <div className="prose prose-lg max-w-none prose-headings:font-extrabold prose-headings:text-white prose-p:text-white/70 prose-p:leading-relaxed prose-li:text-white/70 prose-strong:text-white prose-blockquote:border-l-ai prose-blockquote:text-white/80 prose-blockquote:italic" dangerouslySetInnerHTML={{ __html: doc.body }} />
      </Section>
    </main>
  );
}
