"use client";

import { ArrowUpRight, Pause, Play } from "lucide-react";
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
 * le disque tourne pendant la lecture. Le lecteur Spotify reste caché.
 */
export function VinylPlayer({ playlistId, playlistUrl }: VinylPlayerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyController | null>(null);
  const [ready, setReady] = useState(false);
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
          controller.addListener("ready", () => setReady(true));
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

  const label = playing ? "Mettre en pause" : "Écouter ma playlist";

  return (
    <div>
      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={toggle}
          aria-label={label}
          aria-pressed={playing}
          className="group relative size-20 shrink-0 rounded-full transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.97]"
        >
          <span
            className="vinyl absolute inset-0 rounded-full ring-1 ring-border shadow-[0_6px_18px_oklch(0.2_0.02_155/0.25)]"
            data-playing={playing}
          >
            <span className="absolute inset-[15%] overflow-hidden rounded-full ring-1 ring-black/40">
              <Image
                src="/portrait.jpg"
                alt=""
                fill
                sizes="64px"
                className="object-cover object-top"
                priority
              />
            </span>
            <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background" />
          </span>
          <span className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-primary text-background shadow-[0_2px_6px_oklch(0.2_0.02_155/0.3)] transition-transform duration-200 group-hover:scale-110">
            {playing ? (
              <Pause size={12} strokeWidth={2.5} fill="currentColor" />
            ) : (
              <Play
                size={12}
                strokeWidth={2.5}
                fill="currentColor"
                className="translate-x-px"
              />
            )}
          </span>
        </button>

        <div className="text-sm leading-6">
          <p className="flex items-center gap-2 font-medium text-foreground">
            {playing ? "En écoute" : "Ce que j’écoute en codant"}
            {playing && (
              <span className="eq flex h-3 items-end gap-0.5" aria-hidden="true">
                <span className="h-full w-0.5 rounded-full bg-primary" />
                <span className="h-full w-0.5 rounded-full bg-primary" />
                <span className="h-full w-0.5 rounded-full bg-primary" />
              </span>
            )}
          </p>
          <p className="text-faint">
            {failed
              ? "Lecteur indisponible"
              : playing
                ? "Clique pour mettre en pause"
                : ready
                  ? "Clique sur le disque"
                  : "Chargement du disque…"}
          </p>
          <a
            href={playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mono inline-flex items-center gap-1 text-[12px] text-faint transition-colors duration-150 hover:text-primary"
          >
            Ouvrir dans Spotify
            <ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>

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
