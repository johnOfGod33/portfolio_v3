// Contenu du portfolio.

export const profile = {
  name: "Jean de Dieu Sessou",
  shortName: "Jean de Dieu",
  role: "Ingénieur backend",
  location: "Lomé, Togo",
  timeZone: "Africa/Lome",
  email: "sessoujeandedieu@gmail.com",
  pitch:
    "Backend, IA, déploiement — je construis de bout en bout, sur assez de stacks pour savoir ce qui marche vraiment.",
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

export const stack = ["FastAPI", "Python", "Node.js", "PostgreSQL", "Docker"];

export type Project = {
  name: string;
  description: string;
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
    description:
      "Une plateforme que j’ai cofondée et construite pour découvrir des événements, recevoir des rappels personnalisés et se retrouver autour d’expériences partagées.",
    stack: ["Next.js", "TypeScript", "Supabase", "MongoDB"],
    live: "https://kizoapp.com",
    image: "/projects/kizo.png",
    imagePosition: "center",
  },
  {
    name: "Personal Blog API",
    description:
      "L’API REST qui fait tourner un blog : articles, catégories, authentification JWT et accès publics ou privés, avec une documentation Swagger.",
    stack: ["Node.js", "Express", "MongoDB", "Redis"],
    year: "2024",
    live: "https://personal-blog-api-7cge.onrender.com/api-docs/",
    code: "https://github.com/johnOfGod33/Personal-Blog-API",
    image: `${GH_RAW}/Personal-Blog-API/main/assets/Personal%20blog%20api.png`,
  },
  {
    name: "Password Generator",
    description:
      "Génère des mots de passe selon tes critères, longueur, symboles ou chiffres, et en évalue la robustesse en temps réel.",
    stack: ["JavaScript", "SCSS", "HTML"],
    year: "2024",
    live: "https://johnofgod33.github.io/password-generator/",
    code: "https://github.com/johnOfGod33/password-generator",
    image: `${GH_RAW}/password-generator/main/assets/passwordGenerator.PNG`,
  },
  {
    name: "Admin Blog Panel",
    description:
      "L’interface pour écrire, modifier et publier les articles du blog, avec authentification et brouillons. Elle s’appuie sur Personal Blog API.",
    stack: ["React", "React Router", "Axios"],
    year: "2024",
    code: "https://github.com/johnOfGod33/admin-blog-panel",
    image: `${GH_RAW}/admin-blog-panel/main/src/assets/img/articles_homepage.png`,
  },
  {
    name: "Caching Proxy CLI",
    description:
      "Un outil en ligne de commande qui lance un proxy de cache : il intercepte les requêtes HTTP et garde les réponses dans Redis pour éviter les appels inutiles au serveur d’origine.",
    stack: ["TypeScript", "Express", "Redis"],
    year: "2024",
    code: "https://github.com/johnOfGod33/Caching-Proxy-CLI",
    image: `${GH_RAW}/Caching-Proxy-CLI/main/asset/cli%20example.png`,
  },
];

export type Experience = {
  period: string;
  title: string;
  company: string;
  /** Site de l’entreprise. */
  url?: string;
  /** Résumé de ce qui a été accompli, en une ou deux phrases. */
  summary: string;
  stack: string[];
};

// Source : profil LinkedIn (Profile.pdf).
export const experiences: Experience[] = [
  {
    period: "févr. 2025 — aujourd’hui",
    title: "Backend Engineer junior",
    company: "EdoMatch",
    url: "https://www.edomatch.com",
    summary:
      "Je travaille sur le backend d’une plateforme de recrutement qui compte plus de 50 000 profils, 6 500 offres actives et 3 000 entreprises. J’y ai construit les fonctionnalités IA : les APIs FastAPI qui lisent et structurent les CV pour le moteur de recommandation par embeddings OpenAI, un pipeline n8n qui a traité plus de 3 000 candidatures, et une génération d’offres d’emploi adoptée par 3 000 entreprises. Côté données, je conçois et sécurise la base MongoDB : les chargements sont 40 % plus rapides et l’API répond 25 % plus vite grâce à une CI/CD sur AWS. Et quand un incident tombe en production, c’est moi qui le débogue.",
    stack: ["Python", "FastAPI", "MongoDB", "OpenAI", "n8n", "AWS"],
  },
  {
    period: "juil. 2024 — sept. 2024",
    title: "Développeur frontend",
    company: "Projet Business Manager",
    summary:
      "Une application de gestion de stock en React, avec suivi des produits et reporting en temps réel via l’API. Je travaillais main dans la main avec le développeur backend et le chef de projet pour que l’ensemble reste cohérent.",
    stack: ["React"],
  },
];
