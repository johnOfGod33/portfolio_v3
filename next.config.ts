import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Captures des projets hébergées dans les dépôts GitHub de Jean de Dieu.
    remotePatterns: [new URL("https://raw.githubusercontent.com/johnOfGod33/**")],
  },
};

export default nextConfig;
