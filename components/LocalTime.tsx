"use client";

import { useEffect, useState } from "react";

type LocalTimeProps = {
  timeZone: string;
  /** Locale Intl, ex. "fr-FR". */
  locale: string;
  className?: string;
};

function formatTime(timeZone: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(new Date());
}

/** Heure locale de Lomé, mise à jour toutes les 30 secondes. Vide au rendu serveur pour éviter un écart d'hydratation. */
export function LocalTime({ timeZone, locale, className }: LocalTimeProps) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatTime(timeZone, locale));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, [timeZone, locale]);

  return (
    <time className={className} suppressHydrationWarning>
      {time ?? "--:--"}
    </time>
  );
}
