/**
 * Typos de titre en réserve — non importé, donc jamais chargé par le site.
 *
 * Pour en activer une :
 *   1. Dans lib/fonts.ts, remplace `fontDisplay` par la déclaration ci-dessous
 *      (garde `variable: "--font-display"`).
 *   2. Dans app/globals.css, règle `--heading-scale` sur la valeur indiquée :
 *      les tailles de titre sont multipliées par ce facteur pour compenser
 *      la largeur de chaque police.
 */
import {
  Anybody,
  Bricolage_Grotesque,
  Funnel_Display,
  Unbounded,
} from "next/font/google";

// Très large, arrondie, futuriste. --heading-scale: 0.66
export const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
});

// Géométrique, coupes inattendues, fraîche. --heading-scale: 0.82
export const funnelDisplay = Funnel_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

// Largeur variable, énergie d'affiche. --heading-scale: 0.95
export const anybody = Anybody({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["wdth"],
});

// Ancienne typo de titre, pièges à encre. --heading-scale: 1
export const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});
