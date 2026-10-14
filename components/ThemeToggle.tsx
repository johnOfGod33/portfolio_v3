"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

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

export function ThemeToggle() {
  // null côté serveur : le thème n'est connu qu'une fois dans le navigateur.
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null);
  const next: Theme = theme === "dark" ? "light" : "dark";

  function toggle() {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // stockage indisponible : le choix vaut pour cette visite
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={next === "dark" ? "Passer en mode sombre" : "Passer en mode clair"}
      title={next === "dark" ? "Mode sombre" : "Mode clair"}
      className="group fixed right-4 top-4 z-50 flex size-11 items-center justify-center rounded-full border border-border bg-background/85 text-foreground shadow-[0_4px_14px_oklch(0.2_0.02_155/0.12)] backdrop-blur-md transition-[color,transform,border-color] duration-200 hover:scale-105 hover:border-primary hover:text-primary active:scale-95 md:right-6 md:top-6"
    >
      <span
        key={theme ?? "pending"}
        className="flex transition-transform duration-500 ease-out group-hover:rotate-[20deg]"
      >
        {theme === "dark" ? (
          <Sun size={18} strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Moon
            size={18}
            strokeWidth={1.75}
            aria-hidden="true"
            className={theme === null ? "opacity-0" : undefined}
          />
        )}
      </span>
    </button>
  );
}
