// Contenu du portfolio.
// Les projets et expériences marqués `placeholder: true` sont des exemples
// (affichés avec la mention « exemple ») à remplacer avant la mise en ligne.

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
  href?: string;
  /** Capture du site dans /public (ex. "/projects/mon-site.png"). Sans image, une couverture typographique est générée. */
  image?: string;
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    name: "Nom du projet",
    description: "API de réservation avec paiement et notifications.",
    stack: ["FastAPI", "PostgreSQL", "Docker"],
    year: "2026",
    href: "#",
    placeholder: true,
  },
  {
    name: "Second projet",
    description: "Site vitrine et back-office pour une PME locale.",
    stack: ["Next.js", "Node.js", "MongoDB"],
    year: "2025",
    href: "#",
    placeholder: true,
  },
  {
    name: "Troisième projet",
    description: "Pipeline de traitement de données pour un modèle de ML.",
    stack: ["Python", "FastAPI", "AWS"],
    year: "2025",
    href: "#",
    placeholder: true,
  },
];

export type Experience = {
  period: string;
  title: string;
  company: string;
  description: string;
  stack: string[];
  placeholder?: boolean;
};

export const experiences: Experience[] = [
  {
    period: "2025 — aujourd’hui",
    title: "Développeur backend",
    company: "Entreprise",
    description:
      "Conception d’APIs, modélisation de bases de données et mise en production.",
    stack: ["FastAPI", "PostgreSQL", "Docker"],
    placeholder: true,
  },
  {
    period: "2024 — 2025",
    title: "Développeur fullstack",
    company: "Entreprise",
    description: "Applications web de bout en bout pour des clients variés.",
    stack: ["Next.js", "Node.js", "MongoDB"],
    placeholder: true,
  },
];
