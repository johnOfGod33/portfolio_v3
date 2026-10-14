import type { PieceColor, PieceKind } from "@/components/ChessPieceIcon";

// Problèmes d'échecs, blancs au trait. `line` alterne coups blancs (joués par le visiteur)
// et réponses noires (jouées automatiquement), au format "de-vers".
// Vérification hors site : pour les mats, chaque coup blanc de la ligne est le SEUL coup
// qui force le mat dans les coups restants, quelle que soit la défense noire.
// Notation des pièces : couleur + type, ex. "wR" = tour blanche, "bK" = roi noir.

export type PatternKey =
  | "backRank"
  | "queenBishop"
  | "fork"
  | "sacrifice"
  | "philidor";

export type Piece = {
  id: string;
  color: PieceColor;
  kind: PieceKind;
  square: string;
};

export type Puzzle = {
  pattern: PatternKey;
  level: "easy" | "hard";
  /** « mate » : mater ; « win » : gagner la dame adverse. */
  goal: "mate" | "win";
  pieces: Piece[];
  line: string[];
};

function setup(position: Record<string, string>): Piece[] {
  return Object.entries(position).map(([square, code]) => ({
    id: `${code}-${square}`,
    color: code[0] as PieceColor,
    kind: code[1] as PieceKind,
    square,
  }));
}

/** Nombre de coups blancs de la ligne (mat en N). */
export const whiteMoves = (puzzle: Puzzle) => Math.ceil(puzzle.line.length / 2);

export const puzzles: Puzzle[] = [
  {
    // 1. Ta8# : la tour prend la dernière rangée, le roi est muré par ses pions.
    pattern: "backRank",
    level: "easy",
    goal: "mate",
    pieces: setup({
      g1: "wK", a1: "wR", e3: "wB", c3: "wN", f2: "wP", g2: "wP", h2: "wP",
      g8: "bK", b2: "bB", e5: "bN", f7: "bP", g7: "bP", h7: "bP",
    }),
    line: ["a1-a8"],
  },
  {
    // 1. Dg7# : la dame, protégée par le fou h6, ne peut pas être prise.
    pattern: "queenBishop",
    level: "easy",
    goal: "mate",
    pieces: setup({
      g1: "wK", g4: "wQ", h6: "wB", f2: "wP", g2: "wP", h2: "wP",
      h8: "bK", h7: "bP", f7: "bP", a8: "bR", c8: "bB", b7: "bP",
    }),
    line: ["g4-g7"],
  },
  {
    // 1. Ce7+ (échec et attaque de la dame) Rh8 2. Cxc8.
    pattern: "fork",
    level: "easy",
    goal: "win",
    pieces: setup({
      g1: "wK", d5: "wN", f2: "wP", g2: "wP", h2: "wP",
      g8: "bK", c8: "bQ", f7: "bP", g7: "bP", h7: "bP", a7: "bP",
    }),
    line: ["d5-e7", "g8-h8", "e7-c8"],
  },
  {
    // 1. Dg8+ !! Txg8 2. Cf7# : sacrifice de dame, puis mat étouffé.
    pattern: "sacrifice",
    level: "hard",
    goal: "mate",
    pieces: setup({
      g1: "wK", d5: "wQ", h6: "wN", f2: "wP", g2: "wP", h2: "wP",
      h8: "bK", a8: "bR", g7: "bP", h7: "bP", a7: "bP", b7: "bP",
    }),
    line: ["d5-g8", "a8-g8", "h6-f7"],
  },
  {
    // 1. Cf7+ Rg8 2. Ch6++ (double échec) Rh8 3. Dg8#.
    pattern: "philidor",
    level: "hard",
    goal: "mate",
    pieces: setup({
      g1: "wK", d5: "wQ", g5: "wN", f2: "wP", g2: "wP", h2: "wP",
      h8: "bK", a8: "bR", f8: "bB", g7: "bP", h7: "bP", a7: "bP", b7: "bP",
    }),
    line: ["g5-f7", "h8-g8", "f7-h6", "g8-h8", "d5-g8"],
  },
];
