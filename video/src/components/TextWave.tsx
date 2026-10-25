import { useLayoutEffect, useRef } from "react";
import { useCurrentFrame } from "remotion";
import { FPS, color, font } from "../theme";

type Rgb = readonly [number, number, number];

const phrases = [
  "tell kaitlyn the deck is ready",
  "move standup to ten tomorrow",
  "reply that i'm on my way",
  "add oat milk to the list",
  "let's ship it, send it",
  "draft a note to the team about friday",
  "remind me to call mom at six",
  "the build is green, merging now",
  "can we push the review to monday",
  "thanks, that looks great",
];
const corpus = phrases.join("  ·  ") + "  ·  ";
const WIDTH = 1920;
const HEIGHT = 1080;
const SIZE = 20;
const LINE = SIZE * 1.25;

const rgb = (value: string): Rgb => {
  const digits = Number.parseInt(value.slice(1), 16);
  return [(digits >> 16) & 255, (digits >> 8) & 255, digits & 255];
};

const mix = (from: Rgb, to: Rgb, amount: number): Rgb => {
  const t = Math.min(1, Math.max(0, amount));
  return [
    from[0] + (to[0] - from[0]) * t,
    from[1] + (to[1] - from[1]) * t,
    from[2] + (to[2] - from[2]) * t,
  ];
};

const canvas = rgb(color.canvas);
const ink = rgb(color.ink);
const accent = rgb(color.accent);
const palette = {
  text: mix(canvas, ink, 0.1),
  edge: mix(canvas, accent, 0.45),
  body: accent,
  core: mix(accent, ink, 0.5),
  peak: ink,
};

const ramp = (intensity: number) => {
  if (intensity < 0.4) return mix(palette.edge, palette.body, intensity / 0.4);
  if (intensity < 0.8)
    return mix(palette.body, palette.core, (intensity - 0.4) / 0.4);
  return mix(palette.core, palette.peak, (intensity - 0.8) / 0.2);
};

const amplitude = (
  x: number,
  t: number,
  cols: number,
  rows: number,
  gain: number,
) => {
  const taper = Math.sin((Math.PI * x) / cols) ** 0.7;
  const syllables = 0.5 + 0.5 * Math.sin(x * 0.55 - t * 6);
  const words = 0.5 + 0.5 * Math.sin(x * 0.13 - t * 2.2);
  const phrase = 0.6 + 0.4 * Math.sin(x * 0.031 - t * 0.7);
  return (
    taper * phrase * (syllables * 0.35 + words * 0.65) * rows * 0.46 * gain
  );
};

export const TextWave: React.FC<{
  gain?: number;
  style?: React.CSSProperties;
}> = ({ gain = 1, style }) => {
  const frame = useCurrentFrame();
  const ref = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const context = ref.current?.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, WIDTH, HEIGHT);
    context.font = `${SIZE}px "${font.mono}"`;
    context.textBaseline = "top";
    const cell = context.measureText("M").width;
    const cols = Math.ceil(WIDTH / cell);
    const rows = Math.floor(HEIGHT / LINE);
    const middle = (rows - 1) / 2;
    const t = frame / FPS;
    for (let x = 0; x < cols; x++) {
      const reach = amplitude(x, t, cols, rows, gain);
      for (let y = 0; y < rows; y++) {
        const letter = corpus[(x + y * 23) % corpus.length];
        if (letter === " ") continue;
        const distance = Math.abs(y - middle);
        const value =
          distance < reach ? ramp(1 - distance / reach) : palette.text;
        context.fillStyle = `rgb(${value.map(Math.round).join(" ")})`;
        context.fillText(
          letter,
          x * cell,
          y * LINE + (HEIGHT - rows * LINE) / 2,
        );
      }
    }
  }, [frame, gain]);

  return (
    <canvas
      ref={ref}
      width={WIDTH}
      height={HEIGHT}
      style={{ position: "absolute", inset: 0, ...style }}
    />
  );
};
