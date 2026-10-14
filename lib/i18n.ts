// Langues du site. Le français est la langue par défaut.
export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

/** Cookie posé par le sélecteur de langue, lu par proxy.ts pour les visites suivantes. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Texte disponible dans chaque langue. */
export type Localized<T = string> = Record<Locale, T>;

/** Locale Intl utilisée pour les dates et heures. */
export const intlLocale: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
};

/** Locale Open Graph. */
export const ogLocale: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
};
