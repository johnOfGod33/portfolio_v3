// Formatage des périodes d'expérience à partir de dates AAAA-MM.

const monthYear = new Intl.DateTimeFormat("fr-FR", {
  month: "short",
  year: "numeric",
});

function parse(value: string) {
  const [year, month] = value.split("-").map(Number);
  return { year, month };
}

function toDate(value: string) {
  const { year, month } = parse(value);
  return new Date(Date.UTC(year, month - 1, 1));
}

/** « févr. 2025 — aujourd’hui » */
export function formatPeriod(start: string, end?: string) {
  const from = monthYear.format(toDate(start));
  const to = end ? monthYear.format(toDate(end)) : "aujourd’hui";
  return `${from} — ${to}`;
}

/** Durée comptée comme LinkedIn, mois de début et de fin inclus : « 1 an 9 mois ». */
export function formatDuration(start: string, end?: string, now = new Date()) {
  const from = parse(start);
  const to = end
    ? parse(end)
    : { year: now.getUTCFullYear(), month: now.getUTCMonth() + 1 };
  const total = (to.year - from.year) * 12 + (to.month - from.month) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts = [];
  if (years) parts.push(`${years} an${years > 1 ? "s" : ""}`);
  if (months) parts.push(`${months} mois`);
  return parts.join(" ");
}
