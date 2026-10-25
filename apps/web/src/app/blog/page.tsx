/**
 * /blog — index of MCKI field notes (talks, essays, and dispatches from the stage).
 */
import { listDocs } from "@mcki/content";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

type Frontmatter = {
  title: string;
  subtitle?: string;
  excerpt?: string;
  author?: string;
  event?: string;
  eventDate?: string;
  publishedAt?: string;
  tag?: string;
  cover?: string;
  coverAlt?: string;
};

export const metadata: Metadata = {
  title: "Field Notes — MCKI Solutions",
  description: "Dispatches from the MCKI stage: talks on agentic AI, education, and the craft of building both.",
};

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogIndex() {
  const posts = listDocs<Frontmatter>("blog")
    .filter((d) => d.data.publishedAt)
    .sort((a, b) => (b.data.publishedAt ?? "").localeCompare(a.data.publishedAt ?? ""));

  const [featured, ...rest] = posts;

  return (
    <main className="bg-[#020813] min-h-screen text-white overflow-hidden">
      <header className="max-w-6xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-20">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ai mb-6 flex items-center gap-3">
          <span className="w-6 h-px bg-ai" aria-hidden /> MCKI · Field Notes
        </p>
        <h1 className="font-display font-medium text-[clamp(44px,6vw,80px)] leading-[1.03] tracking-tight text-balance max-w-3xl mb-6">
          Dispatches from the stage.
        </h1>
        <p className="text-xl md:text-2xl text-white/60 leading-snug max-w-2xl font-light">
          Talks, essays and notes on building agentic AI and the education practice it grew out of.
        </p>
      </header>

      {featured && (
        <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid md:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-center p-6 md:p-10 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-ai/50 transition-all duration-500"
          >
            {featured.data.cover && (
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/[0.02] order-last md:order-first">
                <Image
                  src={featured.data.cover}
                  alt={featured.data.coverAlt ?? featured.data.title}
                  fill
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="object-cover object-[50%_28%] scale-[1.35] origin-[50%_42%] group-hover:scale-[1.4] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020813]/60 via-transparent to-transparent" />
              </div>
            )}
            <div>
              <p className="font-mono text-[10px] tracking-widest uppercase text-ai mb-4">
                Featured · {featured.data.tag ?? "Field Notes"}
              </p>
              <h2 className="font-display font-medium text-3xl md:text-5xl leading-[1.05] tracking-tight text-balance mb-5 group-hover:text-ai transition-colors">
                {featured.data.title}
              </h2>
              {featured.data.excerpt && (
                <p className="text-lg text-white/70 leading-relaxed mb-8">
                  {featured.data.excerpt}
                </p>
              )}
              <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] tracking-widest uppercase text-white/50">
                {featured.data.author && <span><span className="text-white/30">By</span> <span className="text-white/80">{featured.data.author}</span></span>}
                {featured.data.event && <span>{featured.data.event}</span>}
                {featured.data.publishedAt && <span>{formatDate(featured.data.publishedAt)}</span>}
              </div>
            </div>
          </Link>
        </section>
      )}

      {rest.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-ai/40 transition-colors"
              >
                <p className="font-mono text-[10px] tracking-widest uppercase text-ai mb-4">
                  {post.data.tag ?? "Field Notes"}
                </p>
                <h3 className="font-display text-2xl leading-tight text-balance mb-3 group-hover:text-ai transition-colors">
                  {post.data.title}
                </h3>
                {post.data.excerpt && (
                  <p className="text-sm text-white/60 leading-relaxed mb-6 line-clamp-3">
                    {post.data.excerpt}
                  </p>
                )}
                <p className="font-mono text-[10px] tracking-widest uppercase text-white/40">
                  {formatDate(post.data.publishedAt)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {posts.length === 0 && (
        <section className="max-w-2xl mx-auto px-6 pb-32 text-center">
          <p className="text-white/60">No posts yet. Come back soon.</p>
        </section>
      )}
    </main>
  );
}
