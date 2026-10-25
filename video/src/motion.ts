import { Easing, interpolate } from "remotion";
import { FPS } from "./theme";

const easeOut = Easing.bezier(0.23, 1, 0.32, 1);
export const springOut = Easing.bezier(0.34, 1.25, 0.64, 1);

export const ms = (value: number) => (value / 1000) * FPS;

export const progress = (
  frame: number,
  at: number,
  duration = ms(420),
  easing = easeOut,
) =>
  interpolate(frame, [at, at + duration], [0, 1], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const enter = (p: number, blur = 8) => ({
  opacity: p,
  filter: `blur(${blur * (1 - p)}px)`,
});

export const rise = (p: number) => ({
  opacity: p,
  transform: `translateY(${16 * (1 - p)}px)`,
});

export const scene = (p: number) => ({
  opacity: p,
  filter: `blur(${4 * (1 - p)}px)`,
  transform: `translateY(${16 * (1 - p)}px) scale(${0.98 + 0.02 * p})`,
});

export const typed = (text: string, frame: number, from: number, to: number) =>
  text.slice(
    0,
    Math.round(
      interpolate(frame, [from, to], [0, text.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );

export const popAt = (frame: number, at: number) =>
  progress(frame, at, ms(380), springOut);

export const pop = (p: number) => ({
  opacity: Math.min(1, p * 2),
  transform: `scale(${0.6 + 0.4 * p})`,
});
