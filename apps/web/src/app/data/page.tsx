import { Database, Table2, LayoutGrid, Workflow, Users, Settings, Plus } from "lucide-react";
import { AppShell, EmptyState, type NavSection } from "@/components/AppShell";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCKI Data — the records platform",
  description:
    "Bases, tables, views and automations. The structured data layer behind MCKI Education and MCKI AI.",
  robots: { index: false, follow: false },
};

const sections: NavSection[] = [
  {
    title: "Workspace",
    items: [
      { label: "Bases", icon: Database, href: "/data", active: true },
      { label: "Tables", icon: Table2, href: "/data/tables" },
      { label: "Views", icon: LayoutGrid, href: "/data/views" },
      { label: "Automations", icon: Workflow, href: "/data/automations" },
    ],
  },
  {
    title: "Admin",
    items: [
      { label: "Members", icon: Users, href: "/data/members" },
      { label: "Settings", icon: Settings, href: "/data/settings" },
    ],
  },
];

/** Build stages, in order. Kept here so the shell tells the truth about itself. */
const stages = [
  { name: "Schema engine", detail: "Bases → tables → fields, typed and versioned", done: false },
  { name: "Grid view", detail: "Virtualised rows, inline edit, keyboard-first", done: false },
  { name: "View layer", detail: "Filter, sort, group; saved per view", done: false },
  { name: "Permissions", detail: "Workspace, base and field-level access", done: false },
  { name: "Automations", detail: "Trigger → condition → action, with run history", done: false },
  { name: "API", detail: "REST + realtime, generated from the schema", done: false },
];

export default function Page() {
  return (
    <AppShell
      product="Data"
      accent="#FFD700"
      sections={sections}
      title="Bases"
      subtitle="Structured records for MCKI Education and MCKI AI"
      actions={
        <button
          type="button"
          disabled
          className="flex items-center gap-1.5 rounded-lg bg-surface-2 px-3 py-1.5 text-xs font-medium text-white/40"
          title="Available once the schema engine lands"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          New base
        </button>
      }
    >
      <EmptyState
        icon={Database}
        title="No bases yet"
        body="A base holds related tables — applicants, universities, offers, agents, runs. Nothing is created until the schema engine is built, so this workspace is deliberately empty."
        note="Scaffold · no backend connected"
      />

      <section className="mt-8" aria-labelledby="build-order">
        <h2 id="build-order" className="text-2xs font-semibold uppercase tracking-[0.14em] text-white/35">
          Build order
        </h2>
        <ol className="mt-3 divide-y divide-surface-line overflow-hidden rounded-xl2 border border-surface-line bg-surface-1">
          {stages.map((stage, i) => (
            <li key={stage.name} className="flex items-baseline gap-4 px-4 py-3 sm:px-5">
              <span className="w-4 shrink-0 font-mono text-2xs text-white/30">{i + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{stage.name}</span>
                <span className="block text-xs leading-relaxed text-white/45">{stage.detail}</span>
              </span>
              <span className="shrink-0 text-2xs uppercase tracking-[0.12em] text-white/25">
                {stage.done ? "Done" : "Planned"}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </AppShell>
  );
}
