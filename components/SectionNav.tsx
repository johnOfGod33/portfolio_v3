"use client";

import { useEffect, useState } from "react";

type SectionNavProps = {
  sections: { id: string; label: string }[];
  label: string;
};

/** Navigation de la colonne fixe : surligne la section visible au centre de l'écran. */
export function SectionNav({ sections, label }: SectionNavProps) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label={label}>
      <ul className="flex flex-col">
        {sections.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className={`group flex min-h-10 items-center short:min-h-8 gap-4 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-foreground"
                    : "text-faint hover:text-foreground"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-px transition-[width,background-color] duration-300 ease-out ${
                    isActive
                      ? "w-14 bg-primary"
                      : "w-7 bg-border group-hover:w-14 group-hover:bg-foreground"
                  }`}
                />
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
