import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ProjectCard } from "@/components/ProjectCard";
import { profile, projects } from "@/lib/content";

const description =
  "Les projets de Jean de Dieu Sessou, ingénieur backend : Kizo, APIs REST, outils en ligne de commande et applications web.";

export const metadata: Metadata = {
  title: "Projets",
  description,
  alternates: { canonical: "/projets" },
  // Un bloc openGraph remplace entièrement celui du layout : on le redonne en entier.
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: profile.name,
    url: "/projets",
    title: `Projets — ${profile.name}`,
    description,
  },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-14 sm:pt-20 md:px-12">
      <header className="settle" style={{ "--i": 0 } as React.CSSProperties}>
        <Link
          href="/#projets"
          className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-primary"
        >
          <ArrowLeft
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            className="transition-transform duration-200 ease-out group-hover:-translate-x-1"
          />
          {profile.shortName}
        </Link>
        <h1 className="display mt-8 flex items-baseline gap-4 text-[calc(clamp(3rem,6vw,4.5rem)*var(--heading-scale))] font-extrabold leading-[0.92] tracking-[-0.02em] text-foreground">
          Projets
          <span className="mono text-base font-normal tracking-normal text-faint">
            {projects.length}
          </span>
        </h1>
      </header>

      <ul className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={i}
            featured={i === 0}
          />
        ))}
      </ul>

      <footer className="mono mt-24 flex justify-between gap-6 text-[13px] text-faint">
        <span>© 2026 {profile.shortName}</span>
        <Link
          href="/#contact"
          className="transition-colors duration-150 hover:text-primary"
        >
          Me contacter
        </Link>
      </footer>
    </div>
  );
}
