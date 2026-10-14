export type PieceKind = "K" | "Q" | "R" | "B" | "N" | "P";
export type PieceColor = "w" | "b";

// Les pièces sont des objets : couleurs fixes, identiques en mode clair et sombre.
const PALETTE = {
  w: { fill: "oklch(0.985 0.003 155)", line: "oklch(0.18 0.01 155)" },
  b: { fill: "oklch(0.27 0.012 155)", line: "oklch(0.13 0.01 155)" },
};
const DETAIL = { w: "oklch(0.18 0.01 155)", b: "oklch(0.9 0.01 155)" };

const BASE = "M11.5 35.5h22v3h-22z";

/** Silhouettes dessinées pour le site (viewBox 45×45). */
const SHAPES: Record<PieceKind, { body: string[]; detail?: string; dots?: [number, number, number][] }> = {
  P: {
    body: [
      "M22.5 9.5a4 4 0 0 0-3.2 6.4A5.5 5.5 0 0 0 17 20.5a5.5 5.5 0 0 0 2.2 4.4c-2.8 1.4-5.7 5.1-5.7 10.6h18c0-5.5-2.9-9.2-5.7-10.6a5.5 5.5 0 0 0 2.2-4.4 5.5 5.5 0 0 0-2.3-4.6 4 4 0 0 0-3.2-6.4z",
      BASE,
    ],
  },
  R: {
    body: [
      BASE,
      "M14 35.5l1.5-4h14l1.5 4z",
      "M15.5 31.5v-13h14v13z",
      "M13.5 18.5l2-3h14l2 3z",
      "M12.5 15.5v-6h4v2.5H20v-2.5h5v2.5h3.5v-2.5h4v6z",
    ],
  },
  B: {
    body: [
      BASE,
      "M16.5 30.5h12l2.5 5h-17z",
      "M17.5 27.5h10v3h-10z",
      "M22.5 11c-4.2 3.2-7 7.3-7 11 0 2.6 1.4 4.4 3 5.5h8c1.6-1.1 3-2.9 3-5.5 0-3.7-2.8-7.8-7-11z",
    ],
    detail: "M22.5 16.5v6M19.5 19.5h6",
    dots: [[22.5, 8, 2.3]],
  },
  N: {
    body: [
      "M13.5 35.5h22v3h-22z",
      "M24 10.5c6 .6 9.5 5 9.5 12.5v12.5h-17c0-5 2.5-7 4.5-9.5 1.3-1.6 1.2-3.3-.4-3.6-1.5 2-3.7 2.6-6 3.1-1.8.4-3.2-.4-3.6-1.9-.3-1.2.4-2.3 1.2-3.3l4.8-6.3-.4-2.7 2.3 1.4 1.5-3.3 1.7 2.6z",
    ],
    detail: "M28.5 15c2 2.5 2.5 7 2 12",
    dots: [[19.6, 17.2, 0.9]],
  },
  Q: {
    body: [
      BASE,
      "M14 31h17l1.5 4.5h-20z",
      "M14.5 28.5h16V31h-16z",
      "M11 15l3.5 13.5h16L34 15l-5.5 7-1.5-10.5-2.5 9.5-2-11.5-2 11.5-2.5-9.5-1.5 10.5z",
    ],
    dots: [
      [11, 13.2, 1.8],
      [18, 9.7, 1.8],
      [22.5, 7.7, 1.8],
      [27, 9.7, 1.8],
      [34, 13.2, 1.8],
    ],
  },
  K: {
    body: [
      BASE,
      "M15.5 24.5h14l2 11h-18z",
      "M14.5 21.5h16v3h-16z",
      "M15.5 21.5c0-4 3-7.5 7-7.5s7 3.5 7 7.5z",
      "M21.5 4.5h2v3h3v2h-3v4h-2v-4h-3v-2h3z",
    ],
  },
};

type ChessPieceIconProps = {
  kind: PieceKind;
  color: PieceColor;
  className?: string;
};

export function ChessPieceIcon({ kind, color, className }: ChessPieceIconProps) {
  const shape = SHAPES[kind];
  const { fill, line } = PALETTE[color];
  return (
    <svg
      viewBox="0 0 45 45"
      className={className}
      aria-hidden="true"
      fill={fill}
      stroke={line}
      strokeWidth={1.5}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {shape.body.map((d) => (
        <path key={d} d={d} />
      ))}
      {shape.dots?.map(([cx, cy, r]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={r}
          fill={r < 1.5 ? DETAIL[color] : fill}
          stroke={r < 1.5 ? "none" : line}
        />
      ))}
      {shape.detail && (
        <path d={shape.detail} fill="none" stroke={DETAIL[color]} strokeWidth={1.4} />
      )}
    </svg>
  );
}
