// Sons du jeu d'échecs, synthétisés avec la Web Audio API : aucun fichier audio.
// Le contexte audio est créé au premier son, toujours déclenché par un clic du visiteur.

export type ChessSound =
  | "move"
  | "reply"
  | "capture"
  | "hint"
  | "lifeLost"
  | "win"
  | "lost"
  | "allSolved";

let context: AudioContext | null = null;

function audio() {
  if (typeof window === "undefined") return null;
  if (!context) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    context = new Ctor();
  }
  if (context.state === "suspended") void context.resume();
  return context;
}

/** Note brève avec une enveloppe attaque rapide / déclin exponentiel. */
function tone(
  ctx: AudioContext,
  {
    frequency,
    to,
    start = 0,
    duration = 0.18,
    type = "triangle",
    volume = 0.12,
  }: {
    frequency: number;
    to?: number;
    start?: number;
    duration?: number;
    type?: OscillatorType;
    volume?: number;
  },
) {
  const t = ctx.currentTime + start;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, t);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t + duration);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(volume, t + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + duration + 0.02);
}

/** « Toc » de pièce en bois : bruit court filtré autour d'une fréquence. */
function knock(ctx: AudioContext, { pitch = 1400, start = 0, volume = 0.5 } = {}) {
  const t = ctx.currentTime + start;
  const length = Math.floor(ctx.sampleRate * 0.06);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 4;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = pitch;
  filter.Q.value = 4;
  const gain = ctx.createGain();
  gain.gain.value = volume;
  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start(t);
}

const NOTES = { C4: 261.63, Eb4: 311.13, G4: 392, C5: 523.25, E5: 659.25, G5: 783.99, C6: 1046.5, E6: 1318.5, A6: 1760 };

export function playChessSound(sound: ChessSound) {
  const ctx = audio();
  if (!ctx) return;

  switch (sound) {
    case "move":
      knock(ctx, { pitch: 1500 });
      break;
    case "reply":
      knock(ctx, { pitch: 1050 });
      break;
    case "capture":
      knock(ctx, { pitch: 1300, volume: 0.7 });
      knock(ctx, { pitch: 800, start: 0.05, volume: 0.6 });
      break;
    case "hint":
      tone(ctx, { frequency: NOTES.E6, duration: 0.25, type: "sine", volume: 0.08 });
      tone(ctx, { frequency: NOTES.A6, start: 0.09, duration: 0.35, type: "sine", volume: 0.08 });
      break;
    case "lifeLost":
      tone(ctx, { frequency: 330, to: 196, duration: 0.32, type: "triangle", volume: 0.14 });
      break;
    case "win":
      [NOTES.C5, NOTES.E5, NOTES.G5, NOTES.C6].forEach((frequency, i) =>
        tone(ctx, { frequency, start: i * 0.08, duration: 0.3, volume: 0.1 }),
      );
      break;
    case "lost":
      [NOTES.G4, NOTES.Eb4, NOTES.C4].forEach((frequency, i) =>
        tone(ctx, { frequency, start: i * 0.16, duration: 0.42, type: "sawtooth", volume: 0.05 }),
      );
      break;
    case "allSolved":
      [NOTES.C5, NOTES.E5, NOTES.G5, NOTES.C6, NOTES.E6].forEach((frequency, i) =>
        tone(ctx, { frequency, start: i * 0.09, duration: 0.35, volume: 0.1 }),
      );
      [NOTES.C5, NOTES.E5, NOTES.G5].forEach((frequency) =>
        tone(ctx, { frequency, start: 0.5, duration: 0.9, volume: 0.07 }),
      );
      break;
  }
}
