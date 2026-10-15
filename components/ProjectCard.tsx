import { ArrowUpRight } from "lucide-react";

import { ProjectCover } from "@/components/ProjectCover";
import type { Project } from "@/lib/content";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

type ProjectCardProps = {
  project: Project;
  index: number;
  lang: Locale;
  t: Dictionary["projects"];
  featured?: boolean;
};

/** Carte projet : la carte ouvre le site (ou le code), une ligne de liens donne accès aux deux. */
export function ProjectCard({
  project,
  index,
  lang,
  t,
  featured,
}: ProjectCardProps) {
  const links = [
    { label: t.live, href: project.live },
    { label: t.code, href: project.code },
  ].filter((link) => link.href);

  return (
    <li className={`reveal ${featured ? "sm:col-span-2" : ""}`}>
      <a
        href={project.live ?? project.code}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <ProjectCover
          project={project}
          index={index}
          featured={featured}
          alt={t.previewOf(project.name)}
        />
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className="flex items-center gap-1 text-lg font-semibold tracking-normal text-foreground transition-colors duration-150 group-hover:text-primary">
            {project.logo && (
              <span
                aria-hidden="true"
                className="mr-1 size-[1.1em] shrink-0 bg-current"
                style={{
                  mask: `url(${project.logo}) center / contain no-repeat`,
                  WebkitMask: `url(${project.logo}) center / contain no-repeat`,
                }}
              />
            )}
            {project.name}
            <ArrowUpRight
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </h3>
          {project.status ? (
            <span className="mono inline-flex shrink-0 items-center gap-1.5 text-[12px] text-foreground">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
              {project.status[lang]}
            </span>
          ) : (
            project.year && (
              <span className="mono text-[13px] text-faint">{project.year}</span>
            )
          )}
        </div>
        <p className="mt-1 text-pretty text-[15px] leading-7">
          {project.description[lang]}
        </p>
      </a>
      <ul className="mt-2 flex flex-wrap gap-x-5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mono inline-flex min-h-9 items-center gap-1 text-[13px] text-faint transition-colors duration-150 hover:text-primary"
            >
              {link.label}
              <ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}
