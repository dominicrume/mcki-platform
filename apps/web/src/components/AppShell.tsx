import type { ReactNode } from "react";
import { ArrowLeft, type LucideIcon } from "lucide-react";

export type NavItem = { label: string; icon: LucideIcon; href: string; active?: boolean };
export type NavSection = { title: string; items: NavItem[] };

/**
 * The application chrome both MCKI product apps share in spirit but own
 * separately: a left rail on desktop, a bottom bar on phones, a quiet top bar,
 * and a canvas that owns its own scroll.
 *
 * Rendered entirely on the server — no client state — so the first paint is the
 * real interface, not a spinner.
 */
export function AppShell({
  product,
  accent,
  sections,
  title,
  subtitle,
  actions,
  children,
}: {
  product: string;
  accent: string;
  sections: NavSection[];
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const flat = sections.flatMap((s) => s.items);
  const primary = flat.slice(0, 4);

  return (
    <div className="flex min-h-screen bg-surface-0 text-white">
      {/* Left rail — desktop */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-surface-line bg-surface-1 lg:flex">
        <div className="flex items-center gap-2.5 border-b border-surface-line px-5 py-4">
          <span
            className="grid h-7 w-7 place-items-center rounded-lg text-2xs font-bold tracking-tight text-ink"
            style={{ background: accent }}
            aria-hidden
          >
            M
          </span>
          <span className="text-sm font-semibold tracking-tight">
            MCKI <span className="text-white/45">{product}</span>
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Primary">
          {sections.map((section) => (
            <div key={section.title} className="mb-5">
              <p className="px-2 pb-1.5 text-2xs font-semibold uppercase tracking-[0.14em] text-white/35">
                {section.title}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      aria-current={item.active ? "page" : undefined}
                      className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors duration-150 ease-swift ${
                        item.active
                          ? "bg-surface-3 text-white"
                          : "text-white/60 hover:bg-surface-2 hover:text-white"
                      }`}
                    >
                      <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-surface-line px-3 py-3">
          <a
            href="/"
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-2xs text-white/45 transition-colors hover:bg-surface-2 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
            MCKI Solutions
          </a>
          <div className="mt-1 flex items-center gap-2.5 rounded-lg px-2 py-1.5">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-surface-3 text-2xs font-semibold text-white/70" aria-hidden>
              —
            </span>
            <span className="text-2xs leading-tight text-white/45">
              Not signed in
              <br />
              <span className="text-white/30">Auth not yet wired</span>
            </span>
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col pb-16 lg:pb-0">
        <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-surface-line bg-surface-0/85 px-5 py-3.5 backdrop-blur-md sm:px-7">
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-semibold tracking-tight sm:text-lg">{title}</h1>
            {subtitle ? (
              <p className="truncate text-2xs text-white/45 sm:text-xs">{subtitle}</p>
            ) : null}
          </div>
          {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
        </header>

        <main className="flex-1 px-5 py-6 sm:px-7 sm:py-8">{children}</main>
      </div>

      {/* Bottom bar — phones */}
      <nav
        className="fixed inset-x-0 bottom-0 z-20 flex border-t border-surface-line bg-surface-1/95 backdrop-blur-md lg:hidden"
        aria-label="Primary"
      >
        {primary.map((item) => (
          <a
            key={item.label}
            href={item.href}
            aria-current={item.active ? "page" : undefined}
            className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-2xs transition-colors ${
              item.active ? "text-white" : "text-white/50"
            }`}
          >
            <item.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

/** A clearly-labelled empty state. Honest about what is not built yet. */
export function EmptyState({
  icon: Icon,
  title,
  body,
  note,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  note?: string;
}) {
  return (
    <div className="animate-fade-in rounded-xl2 border border-dashed border-surface-line bg-surface-1/50 px-6 py-12 text-center">
      <Icon className="mx-auto h-7 w-7 text-white/25" strokeWidth={1.5} aria-hidden />
      <h2 className="mt-4 text-lg font-semibold tracking-tight">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/55">{body}</p>
      {note ? <p className="mt-4 text-2xs uppercase tracking-[0.14em] text-white/30">{note}</p> : null}
    </div>
  );
}
