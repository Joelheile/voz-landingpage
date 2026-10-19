import { useInView } from "../hooks/useInView";
import { useTicks } from "../hooks/useTicks";

const width = 32;
const bars = [
  { label: "typing ", wpm: 40 },
  { label: "talking", wpm: 150 },
];

export function AsciiBars() {
  const [ref, inView] = useInView<HTMLPreElement>();
  const t = useTicks({
    running: inView,
    interval: 35,
    length: width + 1,
    loop: false,
  });

  return (
    <pre
      ref={ref}
      className="ascii bars"
      aria-label="Typing: 40 words a minute. Talking: 150 words a minute."
    >
      {bars.map((bar) => {
        const full = Math.round((bar.wpm / 150) * width);
        const filled = Math.min(full, t);
        return (
          <span key={bar.label} aria-hidden="true">
            {bar.label} <span className="fill">{"█".repeat(filled)}</span>
            <span className="empty">{"░".repeat(width - filled)}</span>
            {"  "}
            {String(Math.round((filled / full) * bar.wpm)).padStart(3)} wpm
            {"\n"}
          </span>
        );
      })}
    </pre>
  );
}
