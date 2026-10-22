import { useInView } from "../hooks/useInView";
import { useTicks } from "../hooks/useTicks";
import { Panel } from "./Panel";

const transcripts = [
  { text: "Tell Kaitlyn the deck is ready.", app: "messages" },
  { text: "Can we move standup to 10 tomorrow?", app: "slack" },
  { text: "Thanks, merged. I'll cut the release after lunch.", app: "mail" },
  { text: "Remind me to book the flight to Lisbon.", app: "notes" },
  {
    text: "The bug was in the retry loop. Fixed in the last commit.",
    app: "slack",
  },
  { text: "Love it, let's keep the serif headings.", app: "notion" },
  { text: "Ship it.", app: "messages" },
];

const ages = ["1m", "2m", "9m", "24m", "1h"];
const rowHeight = 40;
const cycle = 8;

const statuses = {
  ready: "Ready",
  recording: "Recording",
  transcribing: "Transcribing",
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
    <div ref={ref} className="home">
      <Panel label="The Voz menu bar panel with transcript search, recent transcripts and the dictation status">
        <div className="search-row">
          <svg viewBox="0 0 24 24">
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
          Search
        </div>
        <hr />
        <div className="rows" style={{ height: ages.length * rowHeight }}>
          <ul key={added} className={added > 0 ? "push" : undefined}>
            {ages.map((age, i) => {
              const transcript = transcriptAt(added - i);
              return (
                <li
                  key={age}
                  className={i === 0 && added > 0 ? "new" : undefined}
                >
                  <img
                    src={`/apps/${transcript.app}.png`}
                    alt=""
                    width={24}
                    height={24}
                  />
                  <span>{transcript.text}</span>
                  <time>{age}</time>
                </li>
              );
            })}
          </ul>
        </div>
        <hr />
        <div className="panel-footer">
          <strong>
            {status === "recording" && <i className="recording-mark" />}
            {statuses[status]}
            {status === "ready" && <kbd>right ⌘</kbd>}
          </strong>
          <svg viewBox="0 0 24 24">
            <path d="M5 21v-6" />
            <path d="M12 21V3" />
            <path d="M19 21V9" />
          </svg>
          <svg viewBox="0 0 24 24">
            <path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z" />
          </svg>
          <svg viewBox="0 0 24 24">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <svg viewBox="0 0 24 24">
            <path d="M12 2v10" />
            <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
          </svg>
        </div>
      </Panel>
    </div>
  );
}
