/**
 * @mcki/content — the markdown content engine.
 * Single source of truth for all copy across every app.
 * Reads content/<area>/<slug>.md, parses front-matter + body.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.resolve(process.cwd(), "..", "..", "content");

export interface Doc<T = Record<string, unknown>> {
  slug: string;
  data: T;
  body: string;
}

export function readDoc<T = Record<string, unknown>>(area: string, slug: string): Doc<T> | null {
  const file = path.join(ROOT, area, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { slug, data: data as T, body: content };
}

export function listDocs<T = Record<string, unknown>>(area: string): Doc<T>[] {
  const dir = path.join(ROOT, area);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => readDoc<T>(area, f.replace(/\.md$/, "")))
    .filter((d): d is Doc<T> => d !== null);
}
