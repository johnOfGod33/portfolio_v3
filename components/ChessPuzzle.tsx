"use client";

import { useRef, useState } from "react";

import type { Dictionary } from "@/lib/dictionaries";

import { ChessPieceIcon, type PieceColor, type PieceKind } from "./ChessPieceIcon";

type Piece = { id: string; color: PieceColor; kind: PieceKind; square: string };

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

// Mat du couloir : les blancs jouent Ta8#. Le fou b2 et le cavalier e5 noirs
// ne peuvent ni prendre en a8 ni s'interposer sur la 8e rangée.
const START: Piece[] = [
  { id: "wK", color: "w", kind: "K", square: "g1" },
  { id: "wR", color: "w", kind: "R", square: "a1" },
  { id: "wB", color: "w", kind: "B", square: "e3" },
  { id: "wN", color: "w", kind: "N", square: "c3" },
  { id: "wPf", color: "w", kind: "P", square: "f2" },
  { id: "wPg", color: "w", kind: "P", square: "g2" },
  { id: "wPh", color: "w", kind: "P", square: "h2" },
  { id: "bK", color: "b", kind: "K", square: "g8" },
  { id: "bB", color: "b", kind: "B", square: "b2" },
  { id: "bN", color: "b", kind: "N", square: "e5" },
  { id: "bPf", color: "b", kind: "P", square: "f7" },
  { id: "bPg", color: "b", kind: "P", square: "g7" },
  { id: "bPh", color: "b", kind: "P", square: "h7" },
];
const SOLUTION = { id: "wR", to: "a8" };

const toXY = (sq: string) => [FILES.indexOf(sq[0]), Number(sq[1]) - 1];
const toSq = (x: number, y: number) =>
  x >= 0 && x < 8 && y >= 0 && y < 8 ? `${FILES[x]}${y + 1}` : null;

const ORTHO = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const DIAG = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
const KNIGHT = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];

/** Coups des blancs vers des cases vides : suffisant pour ce problème. */
function movesFor(piece: Piece, pieces: Piece[]) {
  const occupied = new Set(pieces.map((p) => p.square));
  const [x, y] = toXY(piece.square);
  const out: string[] = [];
  const walk = (dirs: number[][], slide: boolean) => {
    for (const [dx, dy] of dirs) {
      let step = 1;
      let sq = toSq(x + dx, y + dy);
      while (sq && !occupied.has(sq)) {
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
      if (one && !occupied.has(one)) {
        out.push(one);
        const two = toSq(x, y + 2);
        if (y === 1 && two && !occupied.has(two)) out.push(two);
      }
    }
  }
  return out;
}

type Status = "idle" | "wrong" | "solved";

type ChessPuzzleProps = {
  t: Dictionary["chess"];
};

export function ChessPuzzle({ t }: ChessPuzzleProps) {
  const [pieces, setPieces] = useState(START);
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const bySquare = new Map(pieces.map((p) => [p.square, p]));
  const selectedPiece = pieces.find((p) => p.id === selected);
  const targets = new Set(
    selectedPiece && status !== "solved" ? movesFor(selectedPiece, pieces) : [],
  );

  function onSquare(sq: string) {
    if (status === "solved") return;
    const piece = bySquare.get(sq);

    if (piece?.color === "w") {
      setSelected(piece.id === selected ? null : piece.id);
      setStatus("idle");
      return;
    }
    if (!selectedPiece || !targets.has(sq)) return;

    setPieces((prev) =>
      prev.map((p) => (p.id === selectedPiece.id ? { ...p, square: sq } : p)),
    );
    setSelected(null);

    if (selectedPiece.id === SOLUTION.id && sq === SOLUTION.to) {
      setStatus("solved");
    } else {
      setStatus("wrong");
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setPieces(START), 1100);
    }
  }

  function restart() {
    clearTimeout(resetTimer.current);
    setPieces(START);
    setSelected(null);
    setStatus("idle");
  }

  const ranks = [7, 6, 5, 4, 3, 2, 1, 0];

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
      <div className="board relative aspect-square w-full max-w-[20rem] shrink-0 overflow-hidden rounded-lg shadow-[0_10px_30px_oklch(0.25_0.04_155/0.18)]">
        <div className="grid size-full grid-cols-8 grid-rows-8">
          {ranks.map((y) =>
            FILES.map((file, x) => {
              const sq = `${file}${y + 1}`;
              const piece = bySquare.get(sq);
              const dark = (x + y) % 2 === 0;
              const isTarget = targets.has(sq);
              const isMated = status === "solved" && piece?.id === "bK";
              const isSelected = piece && piece.id === selected;
              return (
                <button
                  key={sq}
                  type="button"
                  onClick={() => onSquare(sq)}
                  aria-label={`${sq}${piece ? `, ${t.pieces[piece.kind]} ${piece.color === "w" ? t.white : t.black}` : ""}${isTarget ? `, ${t.possibleMove}` : ""}`}
                  className={`relative flex items-center justify-center outline-offset-[-2px] ${
                    dark ? "bg-(--sq-dark)" : "bg-(--sq-light)"
                  } ${piece?.color === "w" || isTarget ? "cursor-pointer" : "cursor-default"}`}
                >
                  {(isSelected || isMated) && (
                    <span
                      className={`absolute inset-0 ${
                        isMated ? "bg-[oklch(0.62_0.2_28/0.55)]" : "bg-[oklch(0.85_0.15_100/0.55)]"
                      }`}
                    />
                  )}
                  {isTarget && (
                    <span className="relative size-[28%] rounded-full bg-[oklch(0.25_0.04_155/0.35)]" />
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
        {status === "solved" ? (
          <>
            <p className="display text-[calc(1.25rem*var(--heading-scale))] font-extrabold leading-none tracking-[-0.02em] text-foreground">
              {t.mate}
            </p>
            <p className="mt-1">
              {t.wellPlayed}{" "}
              <a href="#contact" className="text-link text-foreground">
                {t.writeMe}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={restart}
              className="mono mt-3 min-h-11 text-[13px] text-faint transition-colors hover:text-foreground"
            >
              {t.replay}
            </button>
          </>
        ) : status === "wrong" ? (
          <p>
            <span className="font-medium text-foreground">{t.notYet}</span>{" "}
            {t.escape}
          </p>
        ) : (
          <p>{t.intro}</p>
        )}
      </div>
    </div>
  );
}
