"use client";

import { useEffect, useState } from "react";

type LocalTimeProps = {
  timeZone: string;
  className?: string;
};

function formatTime(timeZone: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(new Date());
}

/** Heure locale de Lomé, mise à jour toutes les 30 secondes. Vide au rendu serveur pour éviter un écart d'hydratation. */
export function LocalTime({ timeZone, className }: LocalTimeProps) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatTime(timeZone));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <time className={className} suppressHydrationWarning>
      {time ?? "--:--"}
    </time>
  );
}
