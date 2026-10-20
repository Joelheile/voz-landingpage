import { useInView } from "../hooks/useInView";
import { useTicks } from "../hooks/useTicks";
import { Panel } from "./Panel";

const transcripts = [
  "Tell Kaitlyn the deck is ready.",
  "Can we move standup to 10 tomorrow?",
  "Thanks, merged. I'll cut the release after lunch.",
  "Remind me to book the flight to Lisbon.",
  "The bug was in the retry loop. Fixed in the last commit.",
  "Love it, let's keep the serif headings.",
  "Ship it.",
];

const ages = ["now", "2m", "9m", "24m", "1h"];
const rowHeight = 38;
const cycle = 8;

const statuses = {
  ready: { title: "Ready", hint: "Tap right ⌘ to dictate" },
  recording: { title: "Recording", hint: "Tap right ⌘ again to stop" },
  transcribing: { title: "Transcribing", hint: "Processing your recording" },
};

function statusAt(phase: number): keyof typeof statuses {
  if (phase >= 3 && phase < 6) return "recording";
  if (phase === 6) return "transcribing";
  return "ready";
}

const transcriptAt = (index: number) =>
  transcripts[
    ((index % transcripts.length) + transcripts.length) % transcripts.length
  ];

export function HomePanel() {
  const [ref, inView] = useInView<HTMLDivElement>(false);
  const t = useTicks({
    running: inView,
    interval: 650,
    length: cycle * transcripts.length,
    loop: true,
  });

  const phase = t % cycle;
  const added = Math.floor(t / cycle) + (phase === cycle - 1 ? 1 : 0);
  const status = statusAt(phase);

  return (
    <div ref={ref}>
      <Panel label="The Voz menu bar panel with its status, recent transcripts and a stats line">
        <div className="panel-header">
          <span className="status-mark" data-status={status} />
          <div>
            <strong>{statuses[status].title}</strong>
            <span>{statuses[status].hint}</span>
          </div>
        </div>
        <div className="rows" style={{ height: ages.length * rowHeight }}>
          <ul key={added} className={added > 0 ? "push" : undefined}>
            {ages.map((age, i) => (
              <li
                key={age}
                className={i === 0 && added > 0 ? "new" : undefined}
              >
                <span>{transcriptAt(added - i)}</span>
                <time>{age}</time>
              </li>
            ))}
          </ul>
        </div>
        <div className="stats-line">
          <span>
            {(1284 + added * 7).toLocaleString("en-US")} words this week, 148
            wpm, 6-day streak
          </span>
          <svg viewBox="0 0 16 16">
            <path d="m6 3.5 4.5 4.5L6 12.5" />
          </svg>
        </div>
        <div className="panel-footer">
          <svg viewBox="0 0 16 16">
            <path d="M3 8a5 5 0 1 0 1.5-3.5M3 2.5V5h2.5" />
          </svg>
          <svg viewBox="0 0 16 16">
            <path d="M3 5h3V3.5a1.5 1.5 0 0 1 3 0V5h3v3h-1.5a1.5 1.5 0 0 0 0 3H12v2.5H3z" />
          </svg>
          <svg viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="2.2" />
            <circle
              cx="8"
              cy="8"
              r="5.2"
              strokeDasharray="2 2.08"
              strokeWidth="2.4"
            />
          </svg>
          <svg viewBox="0 0 16 16">
            <path d="M8 2v5.5M4.5 4.5a5 5 0 1 0 7 0" />
          </svg>
        </div>
      </Panel>
    </div>
  );
}
