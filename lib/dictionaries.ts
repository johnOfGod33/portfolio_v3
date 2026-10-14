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
    // {n} est remplacé par le nombre de coups.
    goalMateIn1: "Les blancs jouent et matent en un coup.",
    goalMateIn: "Les blancs jouent et matent en {n} coups.",
    goalWin: "Les blancs jouent et gagnent la dame.",
    howTo: "Clique une pièce blanche, puis sa case d’arrivée.",
    puzzle: "Problème",
    easy: "Facile",
    hard: "Difficile",
    goodMove: "Bien vu. Les noirs répondent, à toi de jouer.",
    winHint: "Cherche un coup qui attaque deux pièces à la fois.",
    queenWon: "Dame gagnée.",
    solved: "résolus",
    notYet: "Pas encore.",
    escape: "Le roi noir s’en sort. Cherche un échec qui ne lui laisse aucune case.",
    mate: "Échec et mat.",
    itWas: "C’était",
    next: "Problème suivant",
    previous: "Précédent",
    allSolved: "Les cinq sont résolus. On fait une vraie partie ?",
    writeMe: "Écris-moi",
    replay: "Recommencer",
    patterns: {
      backRank: "le mat du couloir.",
      queenBishop: "un mat de la dame appuyée par le fou.",
      fork: "une fourchette du cavalier : échec au roi et attaque de la dame.",
      sacrifice: "un sacrifice de dame, suivi d’un mat étouffé.",
      philidor: "l’héritage de Philidor : un double échec, puis le mat.",
    },
    possibleMove: "coup possible",
    // Noms complets, accordés en genre : « tour blanche », « roi noir ».
    pieces: {
      w: { K: "roi blanc", Q: "dame blanche", R: "tour blanche", B: "fou blanc", N: "cavalier blanc", P: "pion blanc" },
      b: { K: "roi noir", Q: "dame noire", R: "tour noire", B: "fou noir", N: "cavalier noir", P: "pion noir" },
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
    goalMateIn1: "White to play and mate in one.",
    goalMateIn: "White to play and mate in {n}.",
    goalWin: "White to play and win the queen.",
    howTo: "Click a white piece, then its target square.",
    puzzle: "Puzzle",
    easy: "Easy",
    hard: "Hard",
    goodMove: "Good move. Black replies, your turn.",
    winHint: "Look for a move that attacks two pieces at once.",
    queenWon: "Queen won.",
    solved: "solved",
    notYet: "Not yet.",
    escape: "The black king gets out. Look for a check that leaves it no square.",
    mate: "Checkmate.",
    itWas: "That was",
    next: "Next puzzle",
    previous: "Previous",
    allSolved: "All five solved. Up for a real game?",
    writeMe: "Write to me",
    replay: "Reset",
    patterns: {
      backRank: "a back-rank mate.",
      queenBishop: "a queen mate backed by the bishop.",
      fork: "a knight fork: check to the king and an attack on the queen.",
      sacrifice: "a queen sacrifice, followed by a smothered mate.",
      philidor: "Philidor’s legacy: a double check, then mate.",
    },
    possibleMove: "possible move",
    pieces: {
      w: { K: "white king", Q: "white queen", R: "white rook", B: "white bishop", N: "white knight", P: "white pawn" },
      b: { K: "black king", Q: "black queen", R: "black rook", B: "black bishop", N: "black knight", P: "black pawn" },
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
