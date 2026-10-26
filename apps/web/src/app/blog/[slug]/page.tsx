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
  ctaLabel?: string;
  ctaUrl?: string;
  ctaNote?: string;
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

/** Inline formatting: **bold**, *italic*, [text](url). */
function renderInline(text: string, key: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined && m[2] !== undefined) {
      const external = /^https?:\/\//.test(m[2]);
      parts.push(
        <a
          key={`${key}-a-${i}`}
          href={m[2]}
          className="text-ai underline underline-offset-4 decoration-ai/40 hover:decoration-ai transition-colors"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {m[1]}
        </a>
      );
    } else if (m[3] !== undefined) {
      parts.push(<strong key={`${key}-b-${i}`} className="font-semibold text-white">{m[3]}</strong>);
    } else if (m[4] !== undefined) {
      parts.push(<em key={`${key}-i-${i}`} className="italic text-ai">{m[4]}</em>);
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

    if (/^-\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^-\s/.test(lines[i])) {
        items.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <ul key={key++} className="my-8 grid gap-3">
          {items.map((item, idx) => (
            <li key={idx} className="grid grid-cols-[auto_1fr] gap-4 items-baseline">
              <span className="w-1.5 h-1.5 rounded-full bg-ai mt-2.5" aria-hidden />
              <p className="text-lg leading-relaxed text-white/90 m-0">
                {renderInline(item, `uli-${key}-${idx}`)}
              </p>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("## ") && !lines[i].startsWith("> ") && !/^\d+\.\s/.test(lines[i]) && !/^-\s/.test(lines[i])) {
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

      <header
        className={
          "max-w-6xl mx-auto px-6 pt-10 pb-12 md:pt-16 md:pb-20 grid gap-10 md:gap-16 items-start " +
          (d.cover ? "md:grid-cols-[1fr_1.1fr]" : "md:grid-cols-1 md:max-w-4xl")
        }
      >
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
                <dt className="font-mono text-[10px] tracking-widest uppercase text-white/40 mb-1">By</dt>
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
            {d.event && (
              <figcaption className="mt-3 font-mono text-[11px] tracking-widest uppercase text-white/40">
                <span className="text-white/60">
                  {d.event}
                  {d.eventDate && `, ${formatDate(d.eventDate)}`}
                </span>
              </figcaption>
            )}
          </figure>
        )}
      </header>

      <article className="max-w-2xl mx-auto px-6 pb-24">
        {renderMarkdown(doc.body)}

        {d.ctaUrl && d.ctaLabel && (
          <aside className="mt-16 p-8 md:p-10 rounded-3xl border border-ai/40 bg-gradient-to-br from-ai/10 via-ai/5 to-transparent relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-ai/20 rounded-full blur-[80px] pointer-events-none" aria-hidden />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ai mb-2">
                  Next step
                </p>
                <p className="font-display text-xl md:text-2xl font-semibold text-white leading-snug text-balance max-w-md">
                  {d.ctaNote ?? d.ctaLabel}
                </p>
              </div>
              <a
                href={d.ctaUrl}
                target={/^https?:\/\//.test(d.ctaUrl) ? "_blank" : undefined}
                rel={/^https?:\/\//.test(d.ctaUrl) ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center gap-3 font-semibold text-ink bg-ai hover:bg-white transition-colors px-7 py-4 rounded-full shadow-[0_0_30px_rgba(255,215,0,0.3)] whitespace-nowrap"
              >
                {d.ctaLabel} <span aria-hidden>→</span>
              </a>
            </div>
          </aside>
        )}

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
