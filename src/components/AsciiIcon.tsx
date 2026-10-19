import { useInView } from "../hooks/useInView";
import { useTicks } from "../hooks/useTicks";

const face = [
  "",
  "                       ▄█▀",
  "                     ▄█▀",
  "▄▄                ▄▄",
  "████▄▄▄▄▄▄▄▄▄▄▄▄████  ▄▄▄▄▄▄",
  "▀██████████████████▀  ▀▀▀▀▀▀",
  " ▀███░░░░░░░░░░███▀",
  "   ▀█░░░░░░░░░░█▀     ▀█▄",
  "     ▀▀░░░░░░▀▀         ▀█▄",
  "",
];

const inner = 32;
const icon = [
  `╭${"─".repeat(inner)}╮`,
  ...face.map((line) => `│   ${line.padEnd(inner - 3)}│`),
  `╰${"─".repeat(inner)}╯`,
];

const noise = "░▒▓/\\|_-=+";
const width = icon[0].length;

const glyph = (t: number, row: number, col: number) =>
  noise[(t * 7 + row * 13 + col * 31) % noise.length];

export function AsciiIcon() {
  const [ref, inView] = useInView<HTMLPreElement>();
  const t = useTicks({
    running: inView,
    interval: 30,
    length: width + 9 + icon.length,
    loop: false,
  });

  return (
    <pre ref={ref} className="ascii logo" aria-label="The voz app icon">
      {icon.map((line, row) => (
        <span key={row} aria-hidden="true">
          {[...line]
            .map((char, col) => {
              const settled = col < t - 8 - row;
              if (settled || char === " ") return char;
              return col < t + 4 ? glyph(t, row, col) : " ";
            })
            .join("")}
          {"\n"}
        </span>
      ))}
    </pre>
  );
}
