"use client";

/**
 * Script exécuté pendant l'analyse du HTML, avant le premier affichage (premier chargement).
 * Côté client (navigation entre /fr et /en), il est rendu inerte en text/plain :
 * React n'exécute jamais un <script> rendu côté client et avertit sinon.
 * Voir la doc Next : guides/preventing-flash-before-hydration.
 */
export function InlineScript({
  html,
  type = "text/javascript",
}: {
  html: string;
  /** Type rendu côté serveur, ex. "application/ld+json" pour des données structurées. */
  type?: string;
}) {
  return (
    <script
      type={typeof window === "undefined" ? type : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
