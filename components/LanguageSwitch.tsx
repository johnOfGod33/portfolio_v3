"use client";

import { usePathname } from "next/navigation";

import { LOCALE_COOKIE, locales, type Locale } from "@/lib/i18n";

type LanguageSwitchProps = {
  lang: Locale;
  label: string;
};

/** Mémorise la langue choisie pour les prochaines visites sur une URL sans langue. */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * Bascule FR / EN sur la même page ; le choix est mémorisé dans un cookie lu par proxy.ts.
 * Lien classique (rechargement complet) plutôt que <Link> : changer de langue recrée le
 * layout racine, et le lecteur Spotify ne se laisse pas recréer sur une page déjà chargée.
 */
export function LanguageSwitch({ lang, label }: LanguageSwitchProps) {
  const pathname = usePathname();

  function hrefFor(target: Locale) {
    const rest = pathname.replace(/^\/(fr|en)(?=\/|$)/, "");
    return `/${target}${rest}`;
  }

  return (
    <nav
      aria-label={label}
      className="flex items-center"
    >
      {locales.map((locale) => {
        const active = locale === lang;
        return (
          <a
            key={locale}
            href={hrefFor(locale)}
            hrefLang={locale}
            lang={locale}
            aria-current={active ? "true" : undefined}
            onClick={() => rememberLocale(locale)}
            className={`mono flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-[12px] font-medium uppercase transition-colors duration-150 ${
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {locale}
          </a>
        );
      })}
    </nav>
  );
}
