import { BookOpen, Users, BarChart3, ClipboardCheck, Award, Settings, Plus } from "lucide-react";
import { AppShell, EmptyState, type NavSection } from "@/components/AppShell";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCKI Learn — the learning platform",
  description:
    "Courses, cohorts, progress and assessment. The teaching infrastructure behind MCKI Education and MCKI AI.",
  robots: { index: false, follow: false },
};

const sections: NavSection[] = [
  {
    title: "Teaching",
    items: [
      { label: "Courses", icon: BookOpen, href: "/learn", active: true },
      { label: "Cohorts", icon: Users, href: "/learn/cohorts" },
      { label: "Assessment", icon: ClipboardCheck, href: "/learn/assessment" },
      { label: "Progress", icon: BarChart3, href: "/learn/progress" },
    ],
  },
  {
    title: "Admin",
    items: [
      { label: "Certificates", icon: Award, href: "/learn/certificates" },
      { label: "Settings", icon: Settings, href: "/learn/settings" },
    ],
  },
];

/** Build stages, in order. Kept here so the shell tells the truth about itself. */
const stages = [
  { name: "Course model", detail: "Course → module → lesson, authored in markdown", done: false },
  { name: "Player", detail: "Lesson view, video, resources, resume-where-you-left", done: false },
  { name: "Enrolment", detail: "Cohorts, seats, invitations, access windows", done: false },
  { name: "Progress", detail: "Per-learner completion, streaks, time-on-task", done: false },
  { name: "Assessment", detail: "Quizzes, submissions, marking, feedback", done: false },
  { name: "Certificates", detail: "Issued on completion, verifiable", done: false },
];

export default function Page() {
  return (
    <AppShell
      product="Learn"
      accent="#002D62"
      sections={sections}
      title="Courses"
      subtitle="Teaching infrastructure for MCKI Education and MCKI AI"
      actions={
        <button
          type="button"
          disabled
          className="flex items-center gap-1.5 rounded-lg bg-surface-2 px-3 py-1.5 text-xs font-medium text-white/40"
          title="Available once the course model lands"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          New course
        </button>
      }
    >
      <EmptyState
        icon={BookOpen}
        title="No courses yet"
        body="Courses are authored as markdown in content/learn and rendered here. Nothing is published until the course model is built, so this catalogue is deliberately empty."
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
