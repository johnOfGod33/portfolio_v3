"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Types minimaux de l'API iFrame Spotify : https://developer.spotify.com/documentation/embeds/references/iframe-api
type PlaybackEvent = {
  data: { isPaused: boolean; isBuffering: boolean; position: number };
};
type SpotifyController = {
  togglePlay: () => void;
  addListener: (
    event: "ready" | "playback_update",
    cb: (e: PlaybackEvent) => void,
  ) => void;
};
type SpotifyIFrameAPI = {
  createController: (
    el: HTMLElement,
    options: { uri: string; width?: string | number; height?: number },
    cb: (controller: SpotifyController) => void,
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
  }
}

const SCRIPT_SRC = "https://open.spotify.com/embed/iframe-api/v1";

type VinylPlayerProps = {
  playlistId: string;
  playlistUrl: string;
};

/**
 * Le portrait sert d'étiquette à un vinyle : un clic lance la playlist,
 * le disque tourne et un égaliseur remplace le bouton play pendant la lecture.
 * Mini-lecteur flottant sur mobile, intégré à la colonne fixe sur ordinateur.
 * Le lecteur Spotify reste caché.
 */
export function VinylPlayer({ playlistId, playlistUrl }: VinylPlayerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyController | null>(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Le lecteur est préparé quand le navigateur est libre, pour que le clic joue immédiatement.
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    window.onSpotifyIframeApiReady = (api) => {
      api.createController(
        mount,
        { uri: `spotify:playlist:${playlistId}`, width: "100%", height: 80 },
        (controller) => {
          controllerRef.current = controller;
          // Le premier événement annonce isPaused: false avant toute lecture ;
          // on attend que la position avance pour considérer le disque en lecture.
          controller.addListener("playback_update", (e) => {
            setPlaying(!e.data.isPaused && e.data.position > 0);
          });
        },
      );
    };

    const load = () => {
      if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onerror = () => setFailed(true);
      document.body.appendChild(script);
    };

    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1200));
    const id = idle(load);
    return () => {
      window.cancelIdleCallback?.(id as number);
    };
  }, [playlistId]);

  function toggle() {
    if (failed || !controllerRef.current) {
      window.open(playlistUrl, "_blank", "noopener,noreferrer");
      return;
    }
    controllerRef.current.togglePlay();
  }

  const label = playing
    ? "Mettre en pause ma playlist"
    : "Écouter ce que j’écoute en codant";

  return (
    // Mini-lecteur : pastille flottante en bas à gauche sur mobile,
    // intégré au bas de la colonne fixe sur ordinateur (lg).
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 flex items-center gap-3 rounded-full border border-border bg-background/85 p-1.5 shadow-[0_8px_24px_oklch(0.2_0.02_155/0.18)] backdrop-blur-md lg:static lg:z-auto lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none">
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        aria-pressed={playing}
        title={playing ? "En écoute. Clique pour mettre en pause." : "Ce que j’écoute en codant. Clique pour écouter."}
        className="group relative block size-12 shrink-0 rounded-full transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.97] lg:size-14"
      >
        <span
          className="vinyl absolute inset-0 rounded-full ring-1 ring-border shadow-[0_6px_18px_oklch(0.2_0.02_155/0.25)]"
          data-playing={playing}
        >
          <span className="absolute inset-[15%] overflow-hidden rounded-full ring-1 ring-black/40">
            <Image
              src="/avatar.webp"
              alt=""
              fill
              sizes="56px"
              className="scale-[1.35] object-cover object-[50%_55%]"
              priority
            />
          </span>
          <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background" />
        </span>
        <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-background shadow-[0_2px_6px_oklch(0.2_0.02_155/0.3)] transition-transform duration-200 group-hover:scale-110 lg:size-6">
          {playing ? (
            <span className="eq flex h-2.5 items-end gap-0.5" aria-hidden="true">
              <span className="h-full w-0.5 rounded-full bg-current" />
              <span className="h-full w-0.5 rounded-full bg-current" />
              <span className="h-full w-0.5 rounded-full bg-current" />
            </span>
          ) : (
            <Play
              size={10}
              strokeWidth={2.5}
              fill="currentColor"
              className="translate-x-px"
            />
          )}
        </span>
      </button>

      {/* Légende : toujours visible sur ordinateur ; sur mobile, seulement pendant la lecture. */}
      <p
        aria-hidden="true"
        className={`text-sm font-medium leading-5 text-foreground lg:block ${
          playing ? "pr-3" : "hidden"
        }`}
      >
        {playing ? "En écoute" : "Ce que j’écoute en codant"}
      </p>

      {/* Le lecteur Spotify reste chargé, à sa vraie taille mais transparent :
          Spotify refuse de jouer dans un cadre de hauteur nulle. Le vinyle le pilote. */}
      <div
        className="pointer-events-none fixed bottom-0 left-0 h-20 w-80 opacity-0"
        inert
        aria-hidden="true"
      >
        <div ref={mountRef} />
      </div>
    </div>
  );
}
