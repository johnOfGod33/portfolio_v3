import { LanguageSwitch } from "@/components/LanguageSwitch";
import { ThemeToggle } from "@/components/ThemeToggle";
import { VinylPlayer } from "@/components/VinylPlayer";
import { profile } from "@/lib/content";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

type DockProps = {
  lang: Locale;
  t: Dictionary;
};

function Divider() {
  return <span aria-hidden="true" className="mx-1 h-5 w-px bg-border" />;
}

/**
 * Dock : une seule pastille flottante en bas au centre, identique sur ordinateur et mobile,
 * qui regroupe le mini-lecteur, le sélecteur de langue et la bascule de thème.
 * Centré sans transform (inset-x-0 + mx-auto) et sans backdrop-filter : l'un comme l'autre
 * capturerait le lecteur Spotify caché, qui doit rester en position: fixed pour jouer.
 */
export function Dock({ lang, t }: DockProps) {
  return (
    <div
      role="toolbar"
      aria-label={t.dock.label}
      className="fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 mx-auto flex w-fit items-center rounded-full border border-border bg-background p-1.5 shadow-[0_8px_24px_oklch(0.2_0.02_155/0.16)]"
    >
      <VinylPlayer
        playlistId={profile.playlistId}
        playlistUrl={profile.playlistUrl}
        t={t.vinyl}
      />
      <Divider />
      <LanguageSwitch lang={lang} label={t.language.label} />
      <Divider />
      <ThemeToggle t={t.theme} />
    </div>
  );
}
