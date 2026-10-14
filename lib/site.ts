// URL publique du site, utilisée pour les liens absolus (Open Graph, sitemap, données structurées).
// Définir NEXT_PUBLIC_SITE_URL avec le domaine final ; sur Vercel, l'URL de production sert de repli.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
