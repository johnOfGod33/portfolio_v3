import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Le mini-lecteur occupe le coin bas gauche : l'indicateur de dev passe à droite.
  devIndicators: { position: "bottom-right" },
  images: {
    // Captures des projets hébergées dans les dépôts GitHub de Jean de Dieu.
    remotePatterns: [new URL("https://raw.githubusercontent.com/johnOfGod33/**")],
  },
};

export default nextConfig;
