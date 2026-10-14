import { Big_Shoulders, Bricolage_Grotesque, Geist_Mono } from "next/font/google";

// Texte courant : Bricolage Grotesque, taille optique automatique.
export const fontBody = Bricolage_Grotesque({
  variable: "--font-body",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});

// Titres (nom, sections, couvertures) : Big Shoulders, condensée et industrielle.
// Pour changer de typo de titre, voir lib/fonts-reserve.ts.
export const fontDisplay = Big_Shoulders({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
  // Next ne connaît pas ses métriques : on déclare un secours condensé à la main.
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "sans-serif"],
});

// Données uniquement : dates, stack, coordonnées.
export const fontCode = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
});

export const fontVariables = [fontBody, fontDisplay, fontCode]
  .map((font) => font.variable)
  .join(" ");
