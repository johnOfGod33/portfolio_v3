"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

import type { Dictionary } from "@/lib/dictionaries";

type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

const darkQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

/** Thème affiché : choix du visiteur (data-theme), sinon préférence système. */
function getTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "light" || chosen === "dark") return chosen;
  return darkQuery().matches ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  const query = darkQuery();
  query.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    query.removeEventListener("change", onChange);
  };
}

type ThemeToggleProps = {
  t: Dictionary["theme"];
};

export function ThemeToggle({ t }: ThemeToggleProps) {
  // null côté serveur : le thème n'est connu qu'une fois dans le navigateur.
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null);
  const next: Theme = theme === "dark" ? "light" : "dark";

  // Changer de langue recrée <html> côté client et efface le data-theme posé par le
  // script de démarrage : on réapplique le choix mémorisé à chaque montage.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "light" || saved === "dark") {
        document.documentElement.dataset.theme = saved;
      }
    } catch {
      // stockage indisponible : préférence système
    }
  }, []);

  function applyTheme() {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // stockage indisponible : le choix vaut pour cette visite
    }
  }

  /** Révélation circulaire : le nouveau thème grandit en cercle depuis le bouton (View Transitions). */
  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduceMotion) {
      applyTheme();
      return;
    }

    // Centre du bouton en pourcentage de l'écran : plus robuste qu'en pixels
    // si la capture de la transition est mise à l'échelle.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    // 150 % du rayon de référence dépasse toujours le coin le plus éloigné.
    const end = `circle(150% at ${x}% ${y}%)`;
    const start = `circle(0% at ${x}% ${y}%)`;

    const transition = document.startViewTransition(applyTheme);
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [start, end] },
        {
          duration: 700,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={next === "dark" ? t.toDark : t.toLight}
      title={next === "dark" ? t.dark : t.light}
      className="group flex size-9 items-center justify-center rounded-full text-muted-foreground transition-[color,background-color,transform] duration-200 hover:bg-surface hover:text-primary active:scale-95"
    >
      <span
        key={theme ?? "pending"}
        className="flex transition-transform duration-500 ease-out group-hover:rotate-[20deg]"
      >
        {theme === "dark" ? (
          <Sun size={17} strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Moon
            size={17}
            strokeWidth={1.75}
            aria-hidden="true"
            className={theme === null ? "opacity-0" : undefined}
          />
        )}
      </span>
    </button>
  );
}
