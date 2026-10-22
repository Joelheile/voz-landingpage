import { useInView } from "../hooks/useInView";
import { useTicks } from "../hooks/useTicks";

const words = [
  { raw: "um", filler: true },
  { raw: "so", filler: true },
  { raw: "tell", clean: "Tell" },
  { raw: "kaitlyn", clean: "Kaitlyn" },
  { raw: "the" },
  { raw: "uh", filler: true },
  { raw: "deck" },
  { raw: "is" },
  { raw: "ready", clean: "ready." },
];

const steps = [
  { title: "You talk", start: 0 },
  { title: "Voz transcribes", start: 18 },
  { title: "It cleans up", start: 34 },
  { title: "It types", start: 50 },
];

const bars = [
  0.4, 0.7, 0.5, 0.9, 0.6, 1, 0.45, 0.8, 0.55, 0.95, 0.5, 0.75, 0.35, 0.85, 0.6,
  0.9, 0.4, 0.7, 0.5, 0.8, 0.45, 0.65, 0.3, 0.55,
];

const length = 80;
const marked = 37;
const cleaned = 40;

export function Pipeline() {
  const [ref, inView] = useInView<HTMLDivElement>(false);
  const t = useTicks({ running: inView, interval: 100, length, loop: true });
  const step = steps.findLastIndex((candidate) => t >= candidate.start);

  return (
    <div ref={ref} className="pipeline">
      <div
        className="pipeline-stage"
        role="img"
        aria-label="You say “um so tell kaitlyn the uh deck is ready”. Voz transcribes it, removes the filler words and types “Tell Kaitlyn the deck is ready.” into Slack."
      >
        <div className="pipeline-field" data-step={step} aria-hidden="true">
          <span className="pipeline-app">Slack · #launch</span>
          <div className="pipeline-wave">
            {bars.map((height, i) => (
              <i
                key={i}
                style={{
                  "--h": height,
                  animationDelay: `${(i % 6) * -110}ms`,
                }}
              />
            ))}
          </div>
          <p className="pipeline-text">
            {words.map((word, i) => (
              <span
                key={word.raw + i}
                className="pipeline-word"
                data-shown={t >= steps[1].start + 3 + i * 1.5}
                data-filler={word.filler && t >= marked}
                data-gone={word.filler && t >= cleaned}
              >
                <span key={t >= cleaned && word.clean ? "clean" : "raw"}>
                  {t >= cleaned && word.clean ? word.clean : word.raw}
                </span>
              </span>
            ))}
            <span className="pipeline-caret" />
          </p>
        </div>
      </div>
      <ol className="pipeline-steps">
        {steps.map((candidate, i) => (
          <li
            key={candidate.title}
            style={{
              "--duration": `${((steps[i + 1]?.start ?? length) - candidate.start) * 100}ms`,
            }}
            data-state={i < step ? "done" : i === step ? "active" : "next"}
          >
            {candidate.title}
          </li>
        ))}
      </ol>
    </div>
  );
}
