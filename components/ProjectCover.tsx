import Image from "next/image";

import type { Project } from "@/lib/content";

type ProjectCoverProps = {
  project: Project;
  index: number;
  featured?: boolean;
};

/**
 * Couverture typographique (nom du projet en grand) posée au-dessus de la capture.
 * Au survol, la couverture s'efface et révèle l'image ; sans survol possible
 * (écrans tactiles), l'image est affichée directement. Voir .cover-reveal dans globals.css.
 */
export function ProjectCover({ project, index, featured }: ProjectCoverProps) {
  const hasImage = Boolean(project.image);

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-surface ${
        featured ? "aspect-[16/9]" : "aspect-[4/3]"
      } ${hasImage ? "cover-reveal" : ""}`}
    >
      {project.image && (
        <Image
          src={project.image}
          alt={`Aperçu de ${project.name}`}
          fill
          sizes={featured ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 1024px) 300px, 50vw"}
          className={`cover-image object-cover ${
            project.imagePosition === "center" ? "object-center" : "object-left-top"
          }`}
        />
      )}
      <div
        className={`cover-${index % 3} cover-overlay absolute inset-0 flex flex-col justify-between bg-(--c-bg) p-5 text-(--c-ink)`}
        aria-hidden="true"
      >
        <span className="cover-stack mono text-[12px]">
          {project.stack.join(" · ")}
        </span>
        <span
          className={`cover-title display block font-extrabold leading-[0.88] tracking-[-0.02em] transition-transform duration-700 ease-out group-hover:-translate-y-1.5 ${
            featured
              ? "text-[calc(clamp(2.75rem,7vw,5rem)*var(--heading-scale))]"
              : "text-[calc(clamp(2rem,4vw,2.75rem)*var(--heading-scale))]"
          }`}
        >
          {project.name}
        </span>
      </div>
    </div>
  );
}
