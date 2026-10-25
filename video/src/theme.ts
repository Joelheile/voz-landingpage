import { loadFont as loadLocal } from "@remotion/fonts";
import { loadFont as loadSans } from "@remotion/google-fonts/Geist";
import { loadFont as loadMono } from "@remotion/google-fonts/GeistMono";
import { staticFile } from "remotion";

export const FPS = 30;

export const color = {
  canvas: "#F6F4EF",
  surface: "#FFFFFF",
  desktop: "#ECE9E2",
  ink: "#141414",
  inkSecondary: "#5F5C55",
  inkTertiary: "#7B7870",
  hairline: "rgba(20,20,20,0.08)",
  selected: "#E9E6DF",
  accent: "#5163F9",
};

export const shadow =
  "0 40px 100px rgba(20,20,20,0.08), 0 2px 6px rgba(20,20,20,0.05)";

const DISPLAY = "Geist Pixel Square";
loadLocal({ family: DISPLAY, url: staticFile("fonts/GeistPixel-Square.ttf") });

export const font = {
  display: DISPLAY,
  sans: loadSans("normal", {
    weights: ["400", "500", "600"],
    subsets: ["latin"],
  }).fontFamily,
  mono: loadMono("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily,
};
