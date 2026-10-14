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
  year: string;
  href: string;
  /** Capture du site dans /public (ex. "/projects/mon-site.png"). Sans image, une couverture typographique est générée. */
  image?: string;
};

// Projets publics (source : GitHub johnOfGod33). Le premier est mis en avant.
export const projects: Project[] = [
  {
    name: "Personal Blog API",
    description:
      "API REST d’un blog : authentification JWT, articles publiés ou en brouillon, commentaires, cache Redis et documentation Swagger.",
    stack: ["Node.js", "Express", "MongoDB", "Redis"],
    year: "2024",
    href: "https://github.com/johnOfGod33/Personal-Blog-API",
  },
  {
    name: "Caching Proxy CLI",
    description:
      "Outil en ligne de commande qui lance un serveur proxy : il intercepte les requêtes et met les réponses en cache.",
    stack: ["TypeScript", "Express", "Redis"],
    year: "2024",
    href: "https://github.com/johnOfGod33/Caching-Proxy-CLI",
  },
  {
    name: "Admin Blog Panel",
    description:
      "Interface d’administration du blog pour rédiger et gérer les articles, branchée sur Personal Blog API.",
    stack: ["React", "React Router", "Axios"],
    year: "2024",
    href: "https://github.com/johnOfGod33/admin-blog-panel",
  },
  {
    name: "Password Generator",
    description:
      "Générateur de mots de passe selon les critères choisis, avec un indicateur de robustesse.",
    stack: ["JavaScript", "SCSS", "HTML"],
    year: "2024",
    href: "https://johnofgod33.github.io/password-generator/",
  },
];

export type Experience = {
  period: string;
  title: string;
  company: string;
  /** Réalisations, une par ligne. */
  highlights: string[];
  stack: string[];
};

// Source : profil LinkedIn (Profile.pdf).
export const experiences: Experience[] = [
  {
    period: "août 2025 — aujourd’hui",
    title: "Backend Engineer",
    company: "EdoMatch",
    highlights: [
      "Conception et sécurisation de la base MongoDB de la plateforme (6 500+ offres actives, 50K+ profils, 3K+ entreprises).",
      "Temps de chargement réduits de 40 % et protection contre les injections NoSQL.",
      "85 % de couverture de tests et temps de réponse API réduit de 25 % grâce à une CI/CD sur AWS, debug des incidents en production.",
    ],
    stack: ["Python", "FastAPI", "MongoDB", "AWS"],
  },
  {
    period: "févr. 2025 — juil. 2025",
    title: "Backend Engineer",
    company: "EdoMatch",
    highlights: [
      "APIs REST en Python / FastAPI pour l’extraction et la structuration de CV, au cœur d’un moteur de recommandation basé sur les embeddings OpenAI.",
      "Pipeline de traitement des candidatures avec n8n et Python (ingestion d’e-mails, extraction PDF/DOCX, dédoublonnage) : 3 000+ candidatures traitées.",
      "Génération d’offres d’emploi par IA, adoptée par 3 000 entreprises de la plateforme.",
    ],
    stack: ["Python", "FastAPI", "OpenAI", "n8n"],
  },
  {
    period: "juil. 2024 — sept. 2024",
    title: "Développeur frontend",
    company: "Projet Business Manager",
    highlights: [
      "Application web de gestion de stock en React : suivi des produits et reporting en temps réel via API.",
      "Travail en binôme avec le développeur backend et le chef de projet pour garder un projet techniquement cohérent.",
    ],
    stack: ["React"],
  },
];
