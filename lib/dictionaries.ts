import type { Locale } from "@/lib/i18n";

// Textes de l'interface. Les passages entre **…** sont mis en avant à l'affichage.
const fr = {
  meta: {
    description:
      "Jean de Dieu Sessou, ingénieur backend à Lomé, ouvert au remote. APIs Python / FastAPI et Node.js, MongoDB, IA appliquée et déploiement sur AWS, chez EdoMatch.",
    projectsDescription:
      "Les projets de Jean de Dieu Sessou, ingénieur backend : Kizo, APIs REST, outils en ligne de commande et applications web.",
  },
  nav: {
    label: "Sections",
    experience: "Expérience",
    projects: "Projets",
    about: "À propos",
    game: "Une partie ?",
    contact: "Contact",
  },
  hero: {
    at: "Chez",
    cv: "Télécharger mon CV",
    inLome: "à Lomé",
  },
  projects: {
    seeAll: "Voir tous les projets",
    live: "En ligne",
    code: "Code source",
    previewOf: (name: string) => `Aperçu de ${name}`,
    back: "Retour à l’accueil",
    contactMe: "Me contacter",
  },
  about: {
    intro:
      "Je suis ingénieur logiciel au Togo, en **M2 intelligence artificielle à l’ESGIS**. Au départ, j’ai fait une **licence en génie mécanique**, puis je me suis entièrement reconverti dans la tech parce que j’aimais trop ça pour rester ailleurs. Ce virage m’a appris à apprendre vite.",
    outside:
      "Hors du code, il y a la musique, les échecs, les jeux vidéo et beaucoup de lecture. Le disque avec ma photo, c’est justement ce que j’écoute en codant. Clique dessus, ça se lance ici.",
  },
  contact: {
    heading: "Un projet, un poste, une question ? Écris-moi.",
    cv: "Mon CV",
    copy: (email: string) => `Copier ${email}`,
    copied: "Adresse copiée",
  },
  chess: {
    intro:
      "Les blancs jouent et matent en un coup. Clique une pièce blanche, puis sa case d’arrivée.",
    notYet: "Pas encore.",
    escape: "Le roi noir s’échappe. Regarde la dernière rangée.",
    mate: "Échec et mat.",
    wellPlayed: "Bien vu. On fait une vraie partie ?",
    writeMe: "Écris-moi",
    replay: "Rejouer",
    white: "blanc",
    black: "noir",
    possibleMove: "coup possible",
    pieces: {
      K: "roi",
      Q: "dame",
      R: "tour",
      B: "fou",
      N: "cavalier",
      P: "pion",
    },
  },
  vinyl: {
    idle: "Ce que j’écoute en codant",
    playing: "En écoute",
    play: "Écouter ce que j’écoute en codant",
    pause: "Mettre en pause ma playlist",
    titleIdle: "Ce que j’écoute en codant. Clique pour écouter.",
    titlePlaying: "En écoute. Clique pour mettre en pause.",
  },
  theme: {
    toDark: "Passer en mode sombre",
    toLight: "Passer en mode clair",
    dark: "Mode sombre",
    light: "Mode clair",
  },
  language: {
    label: "Langue du site",
  },
  dock: {
    label: "Musique, langue et thème",
  },
};

export type Dictionary = typeof fr;

const en: Dictionary = {
  meta: {
    description:
      "Jean de Dieu Sessou, backend engineer in Lomé, open to remote. Python / FastAPI and Node.js APIs, MongoDB, applied AI and AWS deployment, at EdoMatch.",
    projectsDescription:
      "Projects by Jean de Dieu Sessou, backend engineer: Kizo, REST APIs, command-line tools and web apps.",
  },
  nav: {
    label: "Sections",
    experience: "Experience",
    projects: "Projects",
    about: "About",
    game: "Fancy a game?",
    contact: "Contact",
  },
  hero: {
    at: "At",
    cv: "Download my CV",
    inLome: "in Lomé",
  },
  projects: {
    seeAll: "See all projects",
    live: "Live",
    code: "Source code",
    previewOf: (name: string) => `Preview of ${name}`,
    back: "Back to home",
    contactMe: "Contact me",
  },
  about: {
    intro:
      "I’m a software engineer based in Togo, in the **second year of a Master’s in AI at ESGIS**. I started with a **bachelor’s degree in mechanical engineering**, then switched to tech for good because I loved it too much to stay anywhere else. That turn taught me how to learn fast.",
    outside:
      "Outside of code, there’s music, chess, video games and a lot of reading. The record with my face on it is what I listen to while I code. Click it and it plays right here.",
  },
  contact: {
    heading: "A project, a role, a question? Write to me.",
    cv: "My CV",
    copy: (email: string) => `Copy ${email}`,
    copied: "Address copied",
  },
  chess: {
    intro: "White to play and mate in one. Click a white piece, then its target square.",
    notYet: "Not yet.",
    escape: "The black king gets away. Look at the back rank.",
    mate: "Checkmate.",
    wellPlayed: "Nicely spotted. Up for a real game?",
    writeMe: "Write to me",
    replay: "Play again",
    white: "white",
    black: "black",
    possibleMove: "possible move",
    pieces: {
      K: "king",
      Q: "queen",
      R: "rook",
      B: "bishop",
      N: "knight",
      P: "pawn",
    },
  },
  vinyl: {
    idle: "What I listen to while coding",
    playing: "Now playing",
    play: "Play what I listen to while coding",
    pause: "Pause my playlist",
    titleIdle: "What I listen to while coding. Click to play.",
    titlePlaying: "Now playing. Click to pause.",
  },
  theme: {
    toDark: "Switch to dark mode",
    toLight: "Switch to light mode",
    dark: "Dark mode",
    light: "Light mode",
  },
  language: {
    label: "Site language",
  },
  dock: {
    label: "Music, language and theme",
  },
};

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export const getDictionary = (lang: Locale) => dictionaries[lang];
