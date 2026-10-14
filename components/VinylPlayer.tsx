"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { Dictionary } from "@/lib/dictionaries";

// Types minimaux de l'API iFrame Spotify : https://developer.spotify.com/documentation/embeds/references/iframe-api
type PlaybackEvent = {
  data: { isPaused: boolean; isBuffering: boolean; position: number };
};
type SpotifyController = {
  togglePlay: () => void;
  play: () => void;
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
  t: Dictionary["vinyl"];
};

/**
 * Le portrait sert d'étiquette à un vinyle : un clic lance la playlist,
 * le disque tourne et un égaliseur remplace le bouton play pendant la lecture.
 * Il vit dans le dock, avec le sélecteur de langue et la bascule de thème.
 * Le lecteur Spotify reste caché.
 */
export function VinylPlayer({ playlistId, playlistUrl, t }: VinylPlayerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyController | null>(null);
  // Clic arrivé avant que le lecteur soit prêt : la lecture démarre dès qu'il l'est.
  const pendingPlayRef = useRef(false);
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
          if (pendingPlayRef.current) {
            pendingPlayRef.current = false;
            controller.play();
          }
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
    // Seul un vrai échec de chargement renvoie vers Spotify.
    if (failed) {
      window.open(playlistUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (!controllerRef.current) {
      pendingPlayRef.current = true;
      return;
    }
    controllerRef.current.togglePlay();
  }

  const label = playing ? t.pause : t.play;

  return (
    // Mini-lecteur intégré au dock (voir Dock.tsx) : un petit disque, et « En écoute » pendant la lecture.
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        aria-pressed={playing}
        title={playing ? t.titlePlaying : t.titleIdle}
        className="group relative block size-9 shrink-0 rounded-full transition-transform duration-300 ease-out hover:scale-[1.06] active:scale-[0.95]"
      >
        <span
          className="vinyl absolute inset-0 rounded-full ring-1 ring-border"
          data-playing={playing}
        >
          <span className="absolute inset-[14%] overflow-hidden rounded-full ring-1 ring-black/40">
            <Image
              src="/avatar.webp"
              alt=""
              fill
              sizes="28px"
              className="scale-[1.35] object-cover object-[50%_55%]"
              priority
            />
          </span>
        </span>
        <span className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-background ring-2 ring-background transition-transform duration-200 group-hover:scale-110">
          {playing ? (
            <span className="eq flex h-2 items-end gap-px" aria-hidden="true">
              <span className="h-full w-0.5 rounded-full bg-current" />
              <span className="h-full w-0.5 rounded-full bg-current" />
              <span className="h-full w-0.5 rounded-full bg-current" />
            </span>
          ) : (
            <Play
              size={8}
              strokeWidth={3}
              fill="currentColor"
              className="translate-x-px"
            />
          )}
        </span>
      </button>

      {playing && (
        <span
          aria-hidden="true"
          className="whitespace-nowrap pl-2.5 pr-1 text-[13px] font-medium text-foreground"
        >
          {t.playing}
        </span>
      )}

      {/* Le lecteur Spotify reste chargé, à sa vraie taille mais transparent, fixé à l'écran :
          Spotify refuse de jouer dans un cadre de hauteur nulle ou décalé. Le disque le pilote.
          Aucun parent ne doit avoir de transform/filter/backdrop-filter (voir Dock.tsx). */}
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
