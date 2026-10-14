"use client";

import { ArrowRight, Heart, Lightbulb, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { puzzles, whiteMoves, type Piece, type Puzzle } from "@/lib/chess-puzzles";
import { playChessSound, type ChessSound } from "@/lib/chess-sounds";
import type { Dictionary } from "@/lib/dictionaries";

import { ChessPieceIcon } from "./ChessPieceIcon";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const BLACK_REPLY_DELAY = 550;
const WRONG_RESET_DELAY = 1100;
/** Indices révélés un par un sur un problème : objectif, idée, pièce à jouer. */
const HINT_STEPS = 3;
/** Réserve d'indices pour toute la partie, partagée entre les cinq problèmes. */
const MAX_HINTS = 3;
/** Trois vies pour toute la partie : chaque mauvais coup, sur n'importe quel problème, en coûte une. */
const MAX_LIVES = 3;
const SOLUTION_STEP_DELAY = 750;
/** Après une victoire : temps de lire le motif avant de passer seul au problème suivant. */
const AUTO_NEXT_DELAY = 1200;

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

/** Le coup prend-il une pièce ? (une pièce occupe déjà la case d'arrivée) */
const isCapture = (pieces: Piece[], move: string) =>
  pieces.some((p) => p.square === move.split("-")[1]);

/** Position du problème après les `step` premiers coups de la ligne. */
function positionAt(puzzle: Puzzle, step: number) {
  return puzzle.line.slice(0, step).reduce(applyMove, puzzle.pieces);
}

type Status = "idle" | "good" | "wrong" | "solved" | "lost" | "showing" | "shown";

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
  // Indices déjà révélés pour chaque problème (conservés quand on change de problème).
  const [hintLevels, setHintLevels] = useState<number[]>(() => puzzles.map(() => 0));
  const [hintsLeft, setHintsLeft] = useState(MAX_HINTS);
  const [lives, setLives] = useState(MAX_LIVES);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [muted, setMuted] = useState(false);
  // Lu au moment de jouer : couvre aussi les sons différés (réponses noires, solution).
  const mutedRef = useRef(false);

  function sound(name: ChessSound, delay = 0) {
    const play = () => {
      if (!mutedRef.current) playChessSound(name);
    };
    if (delay) setTimeout(play, delay);
    else play();
  }

  function toggleMuted() {
    mutedRef.current = !mutedRef.current;
    setMuted(mutedRef.current);
  }

  useEffect(() => () => clearTimeout(timer.current), []);

  const puzzle = puzzles[index];
  const bySquare = new Map(pieces.map((p) => [p.square, p]));
  const selectedPiece = pieces.find((p) => p.id === selected);
  const waitingForBlack = step % 2 === 1;
  const finished = status === "solved" || status === "lost" || status === "showing" || status === "shown";
  const gameOver = lives === 0;
  const canPlay = !finished && !gameOver && !waitingForBlack && !resetting;
  const targets = new Set(selectedPiece && canPlay ? movesFor(selectedPiece, pieces) : []);
  const allSolved = solved.size === puzzles.length;
  const [lastFrom, lastTo] = lastMove ? lastMove.split("-") : [];
  // Dernier indice : la case de départ du coup attendu, quand c'est aux blancs de jouer.
  const hintLevel = hintLevels[index];
  const hintedSquare =
    hintLevel >= HINT_STEPS && canPlay ? puzzle.line[step].split("-")[0] : null;

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

  function revealHint() {
    if (hintsLeft === 0 || hintLevel >= HINT_STEPS) return;
    sound("hint");
    setHintsLeft((left) => left - 1);
    setHintLevels((levels) => levels.map((level, i) => (i === index ? level + 1 : level)));
  }

  /** Nouvelle partie : vies et score remis à zéro, retour au premier problème. */
  function newGame() {
    setLives(MAX_LIVES);
    setHintsLeft(MAX_HINTS);
    setHintLevels(puzzles.map(() => 0));
    setSolved(new Set());
    goTo(0);
  }

  /** Rejoue automatiquement la fin de la ligne depuis la position actuelle. */
  function playSolution() {
    clearTimeout(timer.current);
    let current = step;
    let position = positionAt(puzzle, current);
    setPieces(position);
    setLastMove(current > 0 ? puzzle.line[current - 1] : null);
    setStatus("showing");
    const tick = () => {
      if (current >= puzzle.line.length) {
        setStatus("shown");
        return;
      }
      const move = puzzle.line[current];
      sound(isCapture(position, move) ? "capture" : current % 2 ? "reply" : "move");
      position = applyMove(position, move);
      setPieces(position);
      setLastMove(move);
      current += 1;
      setStep(current);
      timer.current = setTimeout(tick, SOLUTION_STEP_DELAY);
    };
    timer.current = setTimeout(tick, SOLUTION_STEP_DELAY / 2);
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
    sound(isCapture(pieces, move) ? "capture" : "move");
    setSelected(null);
    setLastMove(move);
    setPieces((prev) => applyMove(prev, move));
    clearTimeout(timer.current);

    if (move !== puzzle.line[step]) {
      // Mauvais coup : il coûte une vie ; on le montre, puis on revient à la position d'avant.
      const remaining = lives - 1;
      setLives(remaining);
      sound(remaining === 0 ? "lost" : "lifeLost", 160);
      if (remaining === 0) {
        setStatus("lost");
      } else {
        setStatus("wrong");
      }
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
      const nowSolved = new Set(solved).add(index);
      const completesAll = !solved.has(index) && nowSolved.size === puzzles.length;
      sound(completesAll ? "allSolved" : "win", 180);
      setSolved(nowSolved);
      // Enchaîne tout seul sur le prochain problème non résolu (moins de friction).
      const upcoming = puzzles.findIndex((_, i) => i > index && !nowSolved.has(i));
      const target = upcoming !== -1 ? upcoming : puzzles.findIndex((_, i) => !nowSolved.has(i));
      if (target !== -1) timer.current = setTimeout(() => goTo(target), AUTO_NEXT_DELAY);
      return;
    }

    // Bon coup : les noirs répondent automatiquement, puis la main revient aux blancs.
    setStep(afterWhite);
    setStatus("good");
    const reply = puzzle.line[afterWhite];
    const replyCaptures = isCapture(applyMove(pieces, move), reply);
    timer.current = setTimeout(() => {
      sound(replyCaptures ? "capture" : "reply");
      setPieces((prev) => applyMove(prev, reply));
      setLastMove(reply);
      setStep(afterWhite + 1);
    }, BLACK_REPLY_DELAY);
  }

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
        <div className="flex items-center gap-3">
          <p className="mono text-[13px] text-faint">
            <span className="font-semibold text-foreground">{solved.size}</span> /{" "}
            {puzzles.length} {t.solved}
          </p>
          <button
            type="button"
            onClick={toggleMuted}
            aria-label={muted ? t.soundOff : t.soundOn}
            title={muted ? t.soundOff : t.soundOn}
            aria-pressed={muted}
            className="flex size-7 items-center justify-center rounded-full text-faint transition-colors duration-150 hover:bg-surface hover:text-foreground"
          >
            {muted ? (
              <VolumeX size={14} strokeWidth={1.9} aria-hidden="true" />
            ) : (
              <Volume2 size={14} strokeWidth={1.9} aria-hidden="true" />
            )}
          </button>
          <span
            role="img"
            aria-label={`${t.hints} : ${hintsLeft} / ${MAX_HINTS}`}
            className="flex items-center gap-0.5"
          >
            {Array.from({ length: MAX_HINTS }, (_, i) => (
              <Lightbulb
                key={i}
                size={13}
                strokeWidth={2}
                aria-hidden="true"
                className={`transition-colors duration-300 ${
                  i < hintsLeft ? "text-foreground" : "text-border"
                }`}
              />
            ))}
          </span>
          <span
            role="img"
            aria-label={`${t.lives} : ${lives} / ${MAX_LIVES}`}
            className="flex items-center gap-0.5"
          >
            {Array.from({ length: MAX_LIVES }, (_, i) => (
              <Heart
                key={i}
                size={13}
                strokeWidth={2}
                aria-hidden="true"
                className={`transition-colors duration-300 ${
                  i < lives ? "fill-primary text-primary" : "text-border"
                }`}
              />
            ))}
          </span>
        </div>
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
                  (status === "solved" || status === "shown") &&
                  puzzle.goal === "mate" &&
                  piece?.color === "b" &&
                  piece.kind === "K";
                const isSelected = piece && piece.id === selected;
                const isLastMove = sq === lastFrom || sq === lastTo;
                const isHinted = sq === hintedSquare;
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
                    {isHinted && !isSelected && (
                      <span className="absolute inset-[6%] rounded-full ring-[3px] ring-primary" />
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
                <>
                  <p className="mt-3">
                    {t.allSolved}{" "}
                    <a href="#contact" className="text-link text-foreground">
                      {t.writeMe}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={newGame}
                    className="group mt-2 inline-flex min-h-11 items-center gap-1.5 font-medium text-foreground transition-colors duration-150 hover:text-primary"
                  >
                    {t.retry}
                    <ArrowRight
                      size={15}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                    />
                  </button>
                </>
              ) : (
                <div className="mt-3">
                  <p className="mono text-[13px] text-faint">{t.nextSoon}</p>
                  {/* Barre qui se remplit pendant le délai avant le problème suivant. */}
                  <div className="mt-2 h-px w-full max-w-40 overflow-hidden bg-border">
                    <div
                      className="auto-next h-full bg-primary"
                      style={{ animationDuration: `${AUTO_NEXT_DELAY}ms` }}
                    />
                  </div>
                </div>
              )}
            </>
          ) : gameOver ? (
            <>
              <p className="display text-[calc(1.25rem*var(--heading-scale))] font-extrabold leading-none tracking-[-0.02em] text-foreground">
                {t.lost}
              </p>
              <p className="mt-1">
                {status === "shown" ? `${t.itWas} ${t.patterns[puzzle.pattern]}` : t.lostText}
              </p>
              <p className="mono mt-1 text-[13px] text-faint">
                {t.finalScore.replace("{n}", String(solved.size))}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-5">
                {status === "lost" && (
                  <button
                    type="button"
                    onClick={playSolution}
                    className="min-h-11 font-medium text-foreground transition-colors duration-150 hover:text-primary"
                  >
                    {t.showSolution}
                  </button>
                )}
                <button
                  type="button"
                  onClick={newGame}
                  className="group inline-flex min-h-11 items-center gap-1.5 font-medium text-foreground transition-colors duration-150 hover:text-primary"
                >
                  {t.retry}
                  <ArrowRight
                    size={15}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                  />
                </button>
              </div>
            </>
          ) : status === "wrong" ? (
            <>
              <p>
                <span className="font-medium text-foreground">{t.notYet}</span>{" "}
                {lives === 1
                  ? t.livesLeftOne
                  : t.livesLeftMany.replace("{n}", String(lives))}
              </p>
              <p className="text-[14px]">{t.tryAgain}</p>
            </>
          ) : status === "good" ? (
            <p className="font-medium text-foreground">{t.goodMove}</p>
          ) : (
            <>
              <p className="font-medium text-foreground">{t.turn}</p>
              <p>{t.howTo}</p>
            </>
          )}

          {!finished && !gameOver && hintLevel > 0 && (
            <ol className="mt-3 flex flex-col gap-1.5 border-l border-border pl-3 text-[14px] leading-6">
              <li>{goal}</li>
              {hintLevel >= 2 && <li>{t.tips[puzzle.pattern]}</li>}
              {hintLevel >= 3 && <li>{t.hintPiece}</li>}
            </ol>
          )}

          {!finished && !gameOver && hintLevel < HINT_STEPS && (
            <button
              type="button"
              onClick={revealHint}
              disabled={hintsLeft === 0}
              aria-label={hintsLeft === 0 ? t.noHints : t.hintLabel}
              className="group mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-150 enabled:hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="flex size-8 items-center justify-center rounded-full ring-1 ring-border transition-colors duration-150 group-enabled:group-hover:bg-surface group-enabled:group-hover:ring-primary">
                <Lightbulb size={15} strokeWidth={1.9} aria-hidden="true" />
              </span>
              {hintsLeft === 0 ? (
                t.noHints
              ) : (
                <>
                  {t.hint}
                  <span className="mono text-[12px] text-faint">
                    {hintsLeft === 1
                      ? t.hintsLeftOne
                      : t.hintsLeftMany.replace("{n}", String(hintsLeft))}
                  </span>
                </>
              )}
            </button>
          )}

          {(status === "good" || status === "wrong") && (
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
