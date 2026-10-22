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

const ages = ["1m ago", "2m ago", "9m ago", "24m ago", "1h ago"];
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
      <Panel label="The Voz menu bar panel with its status, transcript search and recent transcripts">
        <div className="panel-header">
          <strong>
            {status === "recording" && <i className="recording-mark" />}
            {statuses[status].title}
          </strong>
          <span>{statuses[status].hint}</span>
        </div>
        <div className="search-field">
          <svg viewBox="0 0 16 16">
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" />
          </svg>
          Search transcripts
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
        <div className="panel-footer">
          <svg viewBox="0 0 16 16">
            <rect x="2" y="8" width="3" height="5.5" rx="1" />
            <rect x="6.5" y="5" width="3" height="8.5" rx="1" />
            <rect x="11" y="2.5" width="3" height="11" rx="1" />
          </svg>
          <svg viewBox="0 0 16 16">
            <path d="M2.5 4.5h9V7a1.5 1.5 0 0 1 0 3v2.5h-9z" />
          </svg>
          <svg viewBox="0 0 24 24" className="gear">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <svg viewBox="0 0 16 16">
            <path d="M8 2v5.5M4.5 4.5a5 5 0 1 0 7 0" />
          </svg>
        </div>
      </Panel>
    </div>
  );
}
