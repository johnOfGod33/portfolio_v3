"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { puzzles, whiteMoves, type Piece, type Puzzle } from "@/lib/chess-puzzles";
import type { Dictionary } from "@/lib/dictionaries";

import { ChessPieceIcon } from "./ChessPieceIcon";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const BLACK_REPLY_DELAY = 550;
const WRONG_RESET_DELAY = 1100;

const toXY = (sq: string) => [FILES.indexOf(sq[0]), Number(sq[1]) - 1];
const toSq = (x: number, y: number) =>
  x >= 0 && x < 8 && y >= 0 && y < 8 ? `${FILES[x]}${y + 1}` : null;

const ORTHO = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const DIAG = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
const KNIGHT = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];

/** Cases d'arrivée d'une pièce blanche : cases vides et prises de pièces noires. */
function movesFor(piece: Piece, pieces: Piece[]) {
  const at = new Map(pieces.map((p) => [p.square, p]));
  const [x, y] = toXY(piece.square);
  const out: string[] = [];
  const walk = (dirs: number[][], slide: boolean) => {
    for (const [dx, dy] of dirs) {
      let step = 1;
      let sq = toSq(x + dx, y + dy);
      while (sq) {
        const other = at.get(sq);
        if (other) {
          if (other.color !== piece.color) out.push(sq);
          break;
        }
        out.push(sq);
        if (!slide) break;
        step += 1;
        sq = toSq(x + dx * step, y + dy * step);
      }
    }
  };

  switch (piece.kind) {
    case "R":
      walk(ORTHO, true);
      break;
    case "B":
      walk(DIAG, true);
      break;
    case "Q":
      walk([...ORTHO, ...DIAG], true);
      break;
    case "K":
      walk([...ORTHO, ...DIAG], false);
      break;
    case "N":
      walk(KNIGHT, false);
      break;
    case "P": {
      const one = toSq(x, y + 1);
      if (one && !at.has(one)) {
        out.push(one);
        const two = toSq(x, y + 2);
        if (y === 1 && two && !at.has(two)) out.push(two);
      }
      for (const dx of [-1, 1]) {
        const diag = toSq(x + dx, y + 1);
        if (diag && at.get(diag)?.color === "b") out.push(diag);
      }
    }
  }
  return out;
}

/** Joue un coup "de-vers" : la pièce arrivée retire celle qui occupait la case. */
function applyMove(pieces: Piece[], move: string) {
  const [from, to] = move.split("-");
  return pieces
    .filter((p) => p.square !== to)
    .map((p) => (p.square === from ? { ...p, square: to } : p));
}

/** Position du problème après les `step` premiers coups de la ligne. */
function positionAt(puzzle: Puzzle, step: number) {
  return puzzle.line.slice(0, step).reduce(applyMove, puzzle.pieces);
}

type Status = "idle" | "good" | "wrong" | "solved";

type ChessPuzzleProps = {
  t: Dictionary["chess"];
};

export function ChessPuzzle({ t }: ChessPuzzleProps) {
  const [index, setIndex] = useState(0);
  const [solved, setSolved] = useState<Set<number>>(() => new Set());
  // `step` : nombre de coups de la ligne déjà joués (pair = aux blancs de jouer).
  const [step, setStep] = useState(0);
  const [pieces, setPieces] = useState<Piece[]>(puzzles[0].pieces);
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [lastMove, setLastMove] = useState<string | null>(null);
  // Plateau bloqué pendant qu'un mauvais coup est affiché, avant le retour en arrière.
  const [resetting, setResetting] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const puzzle = puzzles[index];
  const bySquare = new Map(pieces.map((p) => [p.square, p]));
  const selectedPiece = pieces.find((p) => p.id === selected);
  const waitingForBlack = step % 2 === 1;
  const canPlay = status !== "solved" && !waitingForBlack && !resetting;
  const targets = new Set(selectedPiece && canPlay ? movesFor(selectedPiece, pieces) : []);
  const allSolved = solved.size === puzzles.length;
  const [lastFrom, lastTo] = lastMove ? lastMove.split("-") : [];

  const n = whiteMoves(puzzle);
  const goal =
    puzzle.goal === "win"
      ? t.goalWin
      : n === 1
        ? t.goalMateIn1
        : t.goalMateIn.replace("{n}", String(n));

  function goTo(next: number) {
    clearTimeout(timer.current);
    setIndex(next);
    setStep(0);
    setPieces(puzzles[next].pieces);
    setSelected(null);
    setStatus("idle");
    setLastMove(null);
    setResetting(false);
  }

  function onSquare(sq: string) {
    if (!canPlay) return;
    const piece = bySquare.get(sq);

    if (piece?.color === "w") {
      setSelected(piece.id === selected ? null : piece.id);
      return;
    }
    if (!selectedPiece || !targets.has(sq)) return;

    const move = `${selectedPiece.square}-${sq}`;
    setSelected(null);
    setLastMove(move);
    setPieces((prev) => applyMove(prev, move));
    clearTimeout(timer.current);

    if (move !== puzzle.line[step]) {
      // Mauvais coup : on montre le coup, puis on revient à la position d'avant.
      setStatus("wrong");
      setResetting(true);
      timer.current = setTimeout(() => {
        setPieces(positionAt(puzzle, step));
        setLastMove(step > 0 ? puzzle.line[step - 1] : null);
        setResetting(false);
      }, WRONG_RESET_DELAY);
      return;
    }

    const afterWhite = step + 1;
    if (afterWhite >= puzzle.line.length) {
      setStep(afterWhite);
      setStatus("solved");
      setSolved((prev) => new Set(prev).add(index));
      return;
    }

    // Bon coup : les noirs répondent automatiquement, puis la main revient aux blancs.
    setStep(afterWhite);
    setStatus("good");
    const reply = puzzle.line[afterWhite];
    timer.current = setTimeout(() => {
      setPieces((prev) => applyMove(prev, reply));
      setLastMove(reply);
      setStep(afterWhite + 1);
    }, BLACK_REPLY_DELAY);
  }

  const nextPuzzle = (() => {
    const after = puzzles.findIndex((_, i) => i > index && !solved.has(i));
    return after !== -1 ? after : puzzles.findIndex((_, i) => !solved.has(i));
  })();

  const ranks = [7, 6, 5, 4, 3, 2, 1, 0];

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <ol className="flex items-center gap-1" aria-label={t.puzzle}>
          {puzzles.map((p, i) => {
            const isCurrent = i === index;
            const isSolved = solved.has(i);
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`${t.puzzle} ${i + 1}, ${p.level === "hard" ? t.hard : t.easy}${isSolved ? `, ${t.solved}` : ""}`}
                  aria-current={isCurrent ? "step" : undefined}
                  className="flex size-8 items-center justify-center rounded-full transition-colors duration-150 hover:bg-surface"
                >
                  <span
                    className={`mono flex size-6 items-center justify-center rounded-full text-[11px] font-semibold transition-colors duration-200 ${
                      isSolved
                        ? "bg-primary text-background"
                        : isCurrent
                          ? "bg-foreground text-background"
                          : p.level === "hard"
                            ? "text-foreground ring-1 ring-foreground/40"
                            : "text-faint ring-1 ring-border"
                    }`}
                  >
                    {i + 1}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <p className="mono text-[13px] text-faint">
          <span className="font-semibold text-foreground">{solved.size}</span> /{" "}
          {puzzles.length} {t.solved}
        </p>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
        <div className="board relative aspect-square w-full max-w-[20rem] shrink-0 overflow-hidden rounded-lg shadow-[0_10px_30px_oklch(0.25_0.04_155/0.18)]">
          <div className="grid size-full grid-cols-8 grid-rows-8">
            {ranks.map((y) =>
              FILES.map((file, x) => {
                const sq = `${file}${y + 1}`;
                const piece = bySquare.get(sq);
                const dark = (x + y) % 2 === 0;
                const isTarget = targets.has(sq);
                const isMated =
                  status === "solved" &&
                  puzzle.goal === "mate" &&
                  piece?.color === "b" &&
                  piece.kind === "K";
                const isSelected = piece && piece.id === selected;
                const isLastMove = sq === lastFrom || sq === lastTo;
                return (
                  <button
                    key={sq}
                    type="button"
                    onClick={() => onSquare(sq)}
                    aria-label={`${sq}${piece ? `, ${t.pieces[piece.color][piece.kind]}` : ""}${isTarget ? `, ${t.possibleMove}` : ""}`}
                    className={`relative flex items-center justify-center outline-offset-[-2px] ${
                      dark ? "bg-(--sq-dark)" : "bg-(--sq-light)"
                    } ${piece?.color === "w" || isTarget ? "cursor-pointer" : "cursor-default"}`}
                  >
                    {(isSelected || isMated || isLastMove) && (
                      <span
                        className={`absolute inset-0 ${
                          isMated
                            ? "bg-[oklch(0.62_0.2_28/0.55)]"
                            : isSelected
                              ? "bg-[oklch(0.85_0.15_100/0.55)]"
                              : "bg-[oklch(0.85_0.15_100/0.3)]"
                        }`}
                      />
                    )}
                    {isTarget && (
                      <span
                        className={`relative rounded-full ${
                          piece
                            ? "size-[86%] ring-[3px] ring-[oklch(0.25_0.04_155/0.35)]"
                            : "size-[28%] bg-[oklch(0.25_0.04_155/0.35)]"
                        }`}
                      />
                    )}
                    {y === 0 && (
                      <span
                        className={`mono absolute bottom-0.5 right-1 text-[9px] font-semibold ${
                          dark ? "text-(--sq-light)" : "text-(--sq-dark)"
                        }`}
                      >
                        {file}
                      </span>
                    )}
                    {x === 0 && (
                      <span
                        className={`mono absolute left-1 top-0.5 text-[9px] font-semibold ${
                          dark ? "text-(--sq-light)" : "text-(--sq-dark)"
                        }`}
                      >
                        {y + 1}
                      </span>
                    )}
                  </button>
                );
              }),
            )}
          </div>

          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {pieces.map((p) => {
              const [x, y] = toXY(p.square);
              return (
                <div
                  key={p.id}
                  className="piece absolute left-0 top-0 flex size-[12.5%] items-center justify-center"
                  style={{ transform: `translate(${x * 100}%, ${(7 - y) * 100}%)` }}
                >
                  <ChessPieceIcon
                    kind={p.kind}
                    color={p.color}
                    className={`size-[88%] drop-shadow-[0_1px_1px_oklch(0.2_0.02_155/0.35)] transition-transform duration-200 ${
                      p.id === selected ? "-translate-y-[6%] scale-110" : ""
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-xs text-[15px] leading-7" aria-live="polite">
          <p className="mono mb-2 flex items-center gap-2 text-[13px] text-faint">
            {t.puzzle} {index + 1} / {puzzles.length}
            <span aria-hidden="true">·</span>
            <span className={puzzle.level === "hard" ? "font-semibold text-foreground" : undefined}>
              {puzzle.level === "hard" ? t.hard : t.easy}
            </span>
          </p>
          {status === "solved" ? (
            <>
              <p className="display text-[calc(1.25rem*var(--heading-scale))] font-extrabold leading-none tracking-[-0.02em] text-foreground">
                {puzzle.goal === "win" ? t.queenWon : t.mate}
              </p>
              <p className="mt-1">
                {t.itWas} {t.patterns[puzzle.pattern]}
              </p>
              {allSolved ? (
                <p className="mt-3">
                  {t.allSolved}{" "}
                  <a href="#contact" className="text-link text-foreground">
                    {t.writeMe}
                  </a>
                  .
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => goTo(nextPuzzle)}
                  className="group mt-3 inline-flex min-h-11 items-center gap-2 font-medium text-foreground transition-colors duration-150 hover:text-primary"
                >
                  {t.next}
                  <ArrowRight
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                  />
                </button>
              )}
            </>
          ) : status === "wrong" ? (
            <p>
              <span className="font-medium text-foreground">{t.notYet}</span>{" "}
              {puzzle.goal === "win" ? t.winHint : t.escape}
            </p>
          ) : status === "good" ? (
            <>
              <p className="font-medium text-foreground">{goal}</p>
              <p>{t.goodMove}</p>
            </>
          ) : (
            <>
              <p className="font-medium text-foreground">{goal}</p>
              <p>{t.howTo}</p>
            </>
          )}
          {status !== "idle" && (
            <button
              type="button"
              onClick={() => goTo(index)}
              className="mono mt-1 block min-h-11 text-[13px] text-faint transition-colors hover:text-foreground"
            >
              {t.replay}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
