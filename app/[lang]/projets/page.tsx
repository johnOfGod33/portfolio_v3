import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectCard } from "@/components/ProjectCard";
import { profile, projects } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale, locales, ogLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projets">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  const title = t.nav.projects;

  return {
    title,
    description: t.meta.projectsDescription,
    alternates: {
      canonical: `/${lang}/projets`,
      languages: { fr: "/fr/projets", en: "/en/projets", "x-default": "/fr/projets" },
    },
    // Un bloc openGraph remplace entièrement celui du layout : on le redonne en entier.
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      siteName: profile.name,
      url: `/${lang}/projets`,
      title: `${title} — ${profile.name}`,
      description: t.meta.projectsDescription,
    },
  };
}

export default async function ProjectsPage({
  params,
}: PageProps<"/[lang]/projets">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <div className="mx-auto max-w-5xl px-6 pb-32 pt-14 sm:pt-20 md:px-12">
      <header className="settle" style={{ "--i": 0 } as React.CSSProperties}>
        <Link
          href={`/${lang}#projets`}
          aria-label={t.projects.back}
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
          {t.nav.projects}
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
            lang={lang}
            t={t.projects}
            featured={i === 0}
          />
        ))}
      </ul>

      <footer className="mono mt-24 flex justify-between gap-6 text-[13px] text-faint">
        <span>© 2026 {profile.shortName}</span>
        <Link
          href={`/${lang}#contact`}
          className="transition-colors duration-150 hover:text-primary"
        >
          {t.projects.contactMe}
        </Link>
      </footer>
    </div>
  );
}
