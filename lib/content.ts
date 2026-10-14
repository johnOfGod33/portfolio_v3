// Contenu du portfolio. Les champs Localized existent en français et en anglais.

import type { Localized } from "@/lib/i18n";

export const profile = {
  name: "Jean de Dieu Sessou",
  shortName: "Jean de Dieu",
  role: { fr: "Ingénieur backend", en: "Backend Engineer" } as Localized,
  location: "Lomé, Togo",
  /** Disponibilité affichée sous le rôle. */
  availability: { fr: "Ouvert au remote", en: "Open to remote" } as Localized,
  timeZone: "Africa/Lome",
  email: "sessoujeandedieu@gmail.com",
  pitch: {
    fr: "Je transforme des idées en applications propres, livrées vite et prêtes à grandir.",
    en: "I turn ideas into clean applications, shipped fast and ready to grow.",
  } as Localized,
  // CV sur Google Drive : téléchargement direct du PDF (fichier partagé publiquement).
  // Aperçu : https://drive.google.com/file/d/1f_BlZEG-yheUAmi4xLB_oncQrtxhlPhx/view
  cvUrl:
    "https://drive.google.com/uc?export=download&id=1f_BlZEG-yheUAmi4xLB_oncQrtxhlPhx",
  playlistId: "1b0pmYBYbIxrJQStqG2c3X",
  playlistUrl: "https://open.spotify.com/playlist/1b0pmYBYbIxrJQStqG2c3X",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/johnOfGod33" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jean-de-dieu-sessou-260897292",
  },
  // TODO : remplacer par l'URL du blog.
  { label: "Articles", href: "#" },
];

export const stack = [
  "Python",
  "FastAPI",
  "Node.js",
  "MongoDB",
  "SQL",
  "Redis",
  "Docker",
  "AWS",
  "n8n",
];

export type Project = {
  name: string;
  description: Localized;
  stack: string[];
  year?: string;
  /** Site en ligne ou doc d’API. */
  live?: string;
  /** Dépôt GitHub. */
  code?: string;
  /** Capture locale (/public) ou hébergée sur GitHub. Sans image, une couverture typographique est générée. */
  image?: string;
  /** Cadrage de l’image : "top" (calée en haut à gauche) pour une capture, "center" pour un logo. */
  imagePosition?: "top" | "center";
};

const GH_RAW = "https://raw.githubusercontent.com/johnOfGod33";

// Le premier projet est mis en avant ; les trois premiers sont sur l’accueil, tous sont sur /projets.
export const projects: Project[] = [
  {
    name: "Kizo",
    description: {
      fr: "J’ai cofondé et construit Kizo, une plateforme pour découvrir des événements, recevoir des rappels pensés pour soi et retrouver d’autres gens autour des mêmes expériences.",
      en: "I co-founded and built Kizo, a platform to discover events, get reminders tailored to you and meet people around the same experiences.",
    },
    stack: ["Next.js", "TypeScript", "Supabase", "MongoDB"],
    live: "https://kizoapp.com",
    image: "/projects/kizo.png",
    imagePosition: "center",
  },
  {
    name: "Personal Blog API",
    description: {
      fr: "L’API REST qui fait tourner un blog. Elle gère les articles, les catégories, l’authentification JWT et les accès publics ou privés, le tout documenté avec Swagger.",
      en: "The REST API behind a blog. It handles posts, categories, JWT authentication and public or private access, all documented with Swagger.",
    },
    stack: ["Node.js", "Express", "MongoDB", "Redis"],
    year: "2024",
    live: "https://personal-blog-api-7cge.onrender.com/api-docs/",
    code: "https://github.com/johnOfGod33/Personal-Blog-API",
    image: `${GH_RAW}/Personal-Blog-API/main/assets/Personal%20blog%20api.png`,
  },
  {
    name: "Password Generator",
    description: {
      fr: "Tu choisis la longueur, les symboles et les chiffres, il génère le mot de passe et te dit tout de suite s’il est solide.",
      en: "You pick the length, symbols and numbers; it generates the password and tells you right away whether it’s strong.",
    },
    stack: ["JavaScript", "SCSS", "HTML"],
    year: "2024",
    live: "https://johnofgod33.github.io/password-generator/",
    code: "https://github.com/johnOfGod33/password-generator",
    image: `${GH_RAW}/password-generator/main/assets/passwordGenerator.PNG`,
  },
  {
    name: "Admin Blog Panel",
    description: {
      fr: "L’interface d’administration du blog. On s’y connecte pour écrire, modifier et publier ses articles, brouillons compris. Elle tourne sur Personal Blog API.",
      en: "The blog’s admin interface. You log in to write, edit and publish posts, drafts included. It runs on Personal Blog API.",
    },
    stack: ["React", "React Router", "Axios"],
    year: "2024",
    code: "https://github.com/johnOfGod33/admin-blog-panel",
    image: `${GH_RAW}/admin-blog-panel/main/src/assets/img/articles_homepage.png`,
  },
  {
    name: "Caching Proxy CLI",
    description: {
      fr: "Un outil en ligne de commande qui lance un proxy de cache. Il intercepte les requêtes HTTP et garde les réponses dans Redis, ce qui évite de rappeler le serveur d’origine pour rien.",
      en: "A command-line tool that spins up a caching proxy. It intercepts HTTP requests and keeps the responses in Redis, so the origin server isn’t called for nothing.",
    },
    stack: ["TypeScript", "Express", "Redis"],
    year: "2024",
    code: "https://github.com/johnOfGod33/Caching-Proxy-CLI",
    image: `${GH_RAW}/Caching-Proxy-CLI/main/asset/cli%20example.png`,
  },
];

export type Experience = {
  /** Début au format AAAA-MM. */
  start: string;
  /** Fin au format AAAA-MM ; absent pour un poste en cours. */
  end?: string;
  title: Localized;
  company: Localized;
  /** Site de l’entreprise. */
  url?: string;
  /** Résumé de ce qui a été accompli. Les passages entre **…** sont mis en avant. */
  summary: Localized;
  stack: string[];
};

// Source : profil LinkedIn (Profile.pdf).
export const experiences: Experience[] = [
  {
    start: "2025-02",
    title: { fr: "Ingénieur backend", en: "Backend Engineer" },
    company: { fr: "EdoMatch", en: "EdoMatch" },
    url: "https://www.edomatch.com",
    summary: {
      fr: "Je conçois, développe et maintiens les APIs qui font tourner la plateforme de recrutement d’EdoMatch et ses **50 000+ profils**, de l’idée jusqu’à la production. Je travaille avec les développeurs frontend et l’équipe produit, relis le code de l’équipe et veille à ce que les services tiennent la charge et restent rapides.",
      en: "Design, build and maintain the APIs behind EdoMatch’s recruiting platform and its **50,000+ profiles**, from first sketch to production. Work closely with frontend developers and the product team, review teammates’ code, and make sure services hold the load and stay fast.",
    },
    stack: ["Python", "FastAPI", "MongoDB", "OpenAI", "n8n", "AWS"],
  },
  {
    start: "2024-07",
    end: "2024-09",
    title: { fr: "Développeur frontend", en: "Frontend Developer" },
    company: { fr: "Projet Business Manager", en: "Business Manager project" },
    summary: {
      fr: "J’ai développé le frontend d’une application de gestion de stock en React, du suivi des produits au reporting en temps réel via l’API. J’ai travaillé avec le développeur backend et le chef de projet pour que l’interface et l’API restent cohérentes.",
      en: "Built the frontend of a stock management app in React, from product tracking to real-time reporting through the API. Worked closely with the backend developer and the project manager to keep the interface and the API consistent.",
    },
    stack: ["React"],
  },
];
