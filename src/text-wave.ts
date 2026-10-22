type Rgb = readonly [number, number, number];
type Layout = { cols: number; rows: number };

type Palette = Record<"text" | "edge" | "body" | "core" | "peak", Rgb>;

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
const frameMs = 100;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const mix = (from: Rgb, to: Rgb, amount: number): Rgb => {
  const t = clamp(amount);
  return [
    from[0] + (to[0] - from[0]) * t,
    from[1] + (to[1] - from[1]) * t,
    from[2] + (to[2] - from[2]) * t,
  ];
};

const hex = (element: Element, name: string): Rgb => {
  const value = getComputedStyle(element).getPropertyValue(name).trim();
  const digits = Number.parseInt(value.slice(1), 16);
  return [(digits >> 16) & 255, (digits >> 8) & 255, digits & 255];
};

const readPalette = (element: Element): Palette => {
  const canvas = hex(element, "--canvas");
  const ink = hex(element, "--ink");
  const accent = hex(element, "--accent");
  return {
    text: mix(canvas, ink, 0.1),
    edge: mix(canvas, accent, 0.45),
    body: accent,
    core: mix(accent, ink, 0.5),
    peak: ink,
  };
};

const rgb = (color: Rgb) =>
  `rgb(${Math.round(color[0])} ${Math.round(color[1])} ${Math.round(color[2])})`;

function ramp(palette: Palette, intensity: number): Rgb {
  if (intensity < 0.4) return mix(palette.edge, palette.body, intensity / 0.4);
  if (intensity < 0.8) {
    return mix(palette.body, palette.core, (intensity - 0.4) / 0.4);
  }
  return mix(palette.core, palette.peak, (intensity - 0.8) / 0.2);
}

function amplitude(x: number, t: number, layout: Layout) {
  const u = x / layout.cols;
  const taper = Math.sin(Math.PI * u) ** 0.7;
  const syllables = 0.5 + 0.5 * Math.sin(x * 0.55 - t * 6);
  const words = 0.5 + 0.5 * Math.sin(x * 0.13 - t * 2.2);
  const phrase = 0.6 + 0.4 * Math.sin(x * 0.031 - t * 0.7);
  const level = syllables * 0.35 + words * 0.65;
  return taper * phrase * level * layout.rows * 0.46;
}

const letterAt = (x: number, y: number) => corpus[(x + y * 23) % corpus.length];

export function mountTextWave(canvas: HTMLCanvasElement | null) {
  const context = canvas?.getContext("2d");
  if (!canvas || !context) return;

  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scheme = matchMedia("(prefers-color-scheme: dark)");
  let palette = readPalette(canvas);
  let layout: Layout = { cols: 0, rows: 0 };
  let cellWidth = 0;
  let lineHeight = 0;
  let frame = 0;
  let last = 0;

  const draw = (t: number) => {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    const middle = (layout.rows - 1) / 2;
    for (let x = 0; x < layout.cols; x++) {
      const reach = amplitude(x, t, layout);
      for (let y = 0; y < layout.rows; y++) {
        const letter = letterAt(x, y);
        const distance = Math.abs(y - middle);
        const inside = distance < reach;
        if (letter === " ") continue;
        const intensity = inside ? 1 - distance / reach : 0;
        context.fillStyle = rgb(inside ? ramp(palette, intensity) : palette.text);
        context.fillText(letter, x * cellWidth, y * lineHeight);
      }
    }
  };

  const resize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const scale = devicePixelRatio;
    canvas.width = width * scale;
    canvas.height = height * scale;
    context.setTransform(scale, 0, 0, scale, 0, 0);
    const fontSize = width < 560 ? 8 : 10;
    lineHeight = fontSize * 1.25;
    context.font = `${fontSize}px "Geist Mono", ui-monospace, monospace`;
    context.textBaseline = "top";
    cellWidth = context.measureText("M").width;
    layout = {
      cols: Math.ceil(width / cellWidth),
      rows: Math.floor(height / lineHeight),
    };
    draw(last / 1000);
  };

  const loop = (time: number) => {
    frame = requestAnimationFrame(loop);
    if (time - last < frameMs) return;
    last = time;
    draw(time / 1000);
  };

  const sizes = new ResizeObserver(resize);
  sizes.observe(canvas);
  const visibility = new IntersectionObserver(([entry]) => {
    cancelAnimationFrame(frame);
    if (entry.isIntersecting && !still) frame = requestAnimationFrame(loop);
  });
  visibility.observe(canvas);
  document.fonts.ready.then(resize);
  const recolor = () => {
    palette = readPalette(canvas);
    draw(last / 1000);
  };
  scheme.addEventListener("change", recolor);

  return () => {
    cancelAnimationFrame(frame);
    scheme.removeEventListener("change", recolor);
    sizes.disconnect();
    visibility.disconnect();
  };
}
