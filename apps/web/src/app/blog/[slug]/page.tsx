/**
 * blog/[slug] — individual blog post renderer.
 * Reads content/blog/<slug>.md, parses frontmatter, renders a tiny
 * markdown subset (h2, p, ol, blockquote, em, strong).
 */
import { readDoc, listDocs } from "@mcki/content";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

type Frontmatter = {
  title: string;
  subtitle?: string;
  excerpt?: string;
  author?: string;
  authorRole?: string;
  event?: string;
  eventDate?: string;
  publishedAt?: string;
  tag?: string;
  cover?: string;
  coverAlt?: string;
};

export function generateStaticParams() {
  return listDocs<Frontmatter>("blog").map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const doc = readDoc<Frontmatter>("blog", params.slug);
  if (!doc) return { title: "Post not found · MCKI Solutions" };
  const d = doc.data;
  return {
    title: `${d.title} · MCKI Solutions`,
    description: d.excerpt ?? d.subtitle ?? "",
    openGraph: {
      title: d.title,
      description: d.excerpt ?? d.subtitle ?? "",
      type: "article",
      images: d.cover ? [{ url: d.cover }] : undefined,
    },
  };
}

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/** Inline formatting: **bold**, *italic*. */
function renderInline(text: string, key: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      parts.push(<strong key={`${key}-b-${i}`} className="font-semibold text-white">{m[1]}</strong>);
    } else if (m[2] !== undefined) {
      parts.push(<em key={`${key}-i-${i}`} className="italic text-ai">{m[2]}</em>);
    }
    last = regex.lastIndex;
    i++;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/** Minimal block-level markdown renderer for the shapes used in our posts. */
function renderMarkdown(src: string): React.ReactNode[] {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") { i++; continue; }

    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={key++} className="font-display text-3xl md:text-4xl font-semibold text-white mt-16 mb-6 tracking-tight">
          {renderInline(line.slice(3).trim(), `h${key}`)}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <blockquote key={key++} className="my-10 pl-6 border-l-2 border-ai">
          <p className="font-display italic text-2xl md:text-3xl leading-snug text-white/95 text-balance">
            {renderInline(quoteLines.join(" "), `q${key}`)}
          </p>
        </blockquote>
      );
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push(
        <ol key={key++} className="my-10 grid gap-5 counter-reset-blog">
          {items.map((item, idx) => (
            <li key={idx} className="grid grid-cols-[auto_1fr] gap-5 items-baseline p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="font-mono text-xs tracking-widest text-ai">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <p className="font-display text-lg md:text-xl leading-snug text-white m-0">
                {renderInline(item, `oli-${key}-${idx}`)}
              </p>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("## ") && !lines[i].startsWith("> ") && !/^\d+\.\s/.test(lines[i])) {
      paraLines.push(lines[i]);
      i++;
    }
    const text = paraLines.join(" ").trim();
    if (text) {
      blocks.push(
        <p key={key++} className="mb-6 text-lg leading-relaxed text-white/85">
          {renderInline(text, `p${key}`)}
        </p>
      );
    }
  }

  return blocks;
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const doc = readDoc<Frontmatter>("blog", params.slug);
  if (!doc) notFound();
  const d = doc.data;

  return (
    <main className="bg-[#020813] min-h-screen text-white overflow-hidden">
      <nav className="max-w-6xl mx-auto px-6 pt-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-white/50 hover:text-ai transition-colors"
        >
          <span aria-hidden>←</span> Back to field notes
        </Link>
      </nav>

      <header className="max-w-6xl mx-auto px-6 pt-10 pb-12 md:pt-16 md:pb-20 grid md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-start">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ai mb-6 flex items-center gap-3">
            <span className="w-6 h-px bg-ai" aria-hidden /> {d.tag ?? "Field Notes"}
          </p>
          <h1 className="font-display font-medium text-[clamp(36px,5.5vw,68px)] leading-[1.03] tracking-tight text-balance mb-6">
            {d.title}
          </h1>
          {d.subtitle && (
            <p className="text-xl md:text-2xl text-white/70 leading-snug max-w-xl mb-10 font-light">
              {d.subtitle}
            </p>
          )}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 pt-6 border-t border-white/10 max-w-md">
            {d.author && (
              <div>
                <dt className="font-mono text-[10px] tracking-widest uppercase text-white/40 mb-1">Speaker</dt>
                <dd className="font-medium text-white">{d.author}</dd>
                {d.authorRole && <dd className="text-sm text-white/60 mt-0.5">{d.authorRole}</dd>}
              </div>
            )}
            {d.event && (
              <div>
                <dt className="font-mono text-[10px] tracking-widest uppercase text-white/40 mb-1">Event</dt>
                <dd className="font-medium text-white">{d.event}</dd>
                {d.eventDate && <dd className="text-sm text-white/60 mt-0.5">{formatDate(d.eventDate)}</dd>}
              </div>
            )}
          </dl>
        </div>

        {d.cover && (
          <figure className="m-0">
            <div
              className="relative aspect-[3/5] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] bg-no-repeat"
              style={{
                backgroundImage: `url(${d.cover})`,
                backgroundSize: "cover",
                backgroundPosition: "center 48%",
              }}
              role="img"
              aria-label={d.coverAlt ?? d.title}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#020813]/50 via-transparent to-transparent pointer-events-none" />
            </div>
            {d.coverAlt && (
              <figcaption className="mt-3 font-mono text-[11px] tracking-widest uppercase text-white/40">
                On stage · <span className="text-white/60">{d.event}, {formatDate(d.eventDate)}</span>
              </figcaption>
            )}
          </figure>
        )}
      </header>

      <article className="max-w-2xl mx-auto px-6 pb-24">
        {renderMarkdown(doc.body)}

        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-white/40 mb-1">Published</p>
            <p className="text-white/80">{formatDate(d.publishedAt)}</p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase px-5 py-3 rounded-full border border-white/15 hover:border-ai hover:text-ai transition-colors"
          >
            More field notes <span aria-hidden>→</span>
          </Link>
        </div>
      </article>
    </main>
  );
}
