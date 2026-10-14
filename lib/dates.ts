// Formatage des périodes d'expérience à partir de dates AAAA-MM.

import { intlLocale, type Locale } from "@/lib/i18n";

const present: Record<Locale, string> = { fr: "aujourd’hui", en: "present" };

function parse(value: string) {
  const [year, month] = value.split("-").map(Number);
  return { year, month };
}

function toDate(value: string) {
  const { year, month } = parse(value);
  return new Date(Date.UTC(year, month - 1, 1));
}

/** « févr. 2025 — aujourd’hui » / « Feb 2025 — present » */
export function formatPeriod(lang: Locale, start: string, end?: string) {
  const monthYear = new Intl.DateTimeFormat(intlLocale[lang], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  const from = monthYear.format(toDate(start));
  const to = end ? monthYear.format(toDate(end)) : present[lang];
  return `${from} — ${to}`;
}

/** Durée comptée comme LinkedIn, mois de début et de fin inclus : « 1 an 9 mois » / « 1 year 9 months ». */
export function formatDuration(
  lang: Locale,
  start: string,
  end?: string,
  now = new Date(),
) {
  const from = parse(start);
  const to = end
    ? parse(end)
    : { year: now.getUTCFullYear(), month: now.getUTCMonth() + 1 };
  const total = (to.year - from.year) * 12 + (to.month - from.month) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;

  const words =
    lang === "fr"
      ? { year: (n: number) => `${n} an${n > 1 ? "s" : ""}`, month: (n: number) => `${n} mois` }
      : {
          year: (n: number) => `${n} year${n > 1 ? "s" : ""}`,
          month: (n: number) => `${n} month${n > 1 ? "s" : ""}`,
        };

  const parts = [];
  if (years) parts.push(words.year(years));
  if (months) parts.push(words.month(months));
  return parts.join(" ");
}
