import { useInView } from "../hooks/useInView";
import { useTicks } from "../hooks/useTicks";
import { Chat } from "./Chat";

type IndicatorState = "hidden" | "recording" | "transcribing" | "done";

const clock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

function NotchIndicator({
  state,
  seconds,
}: {
  state: IndicatorState;
  seconds: number;
}) {
  return (
    <div className="notch" data-state={state}>
      <span className="wing leading">
        <span className="timer">{clock(seconds)}</span>
      </span>
      <span className="wing trailing">
        <span className="level-bars">
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="progress-dots">
          <i />
          <i />
          <i />
        </span>
        <svg className="check" viewBox="0 0 16 16">
          <path d="M3.5 8.5l3 3 6-7" />
        </svg>
      </span>
    </div>
  );
}

const bars = 32;

function level(t: number, bar: number) {
  const edge = Math.sin(((bar + 0.5) / bars) * Math.PI);
  const wobble = Math.abs(Math.sin(t * 1.9 + bar * 0.83) * Math.cos(t * 0.7 + bar * 0.37));
  return 0.15 + 0.85 * edge * wobble;
}

function Waveform({
  t,
  recording,
  speaking,
}: {
  t: number;
  recording: boolean;
  speaking: boolean;
}) {
  return (
    <div className="waveform" data-recording={recording}>
      {Array.from({ length: bars }, (_, bar) => (
        <i
          key={bar}
          style={{ transform: `scaleY(${speaking ? level(t, bar) : 0.08})` }}
        />
      ))}
    </div>
  );
}

const words = [
  { raw: "um", clean: null },
  { raw: "so", clean: null },
  { raw: "tell", clean: "Tell" },
  { raw: "kaitlyn", clean: "Kaitlyn" },
  { raw: "the", clean: "the" },
  { raw: "uh", clean: null },
  { raw: "deck", clean: "deck" },
  { raw: "is", clean: "is" },
  { raw: "ready", clean: "ready." },
];

const result = "Tell Kaitlyn the deck is ready.";

const start = 3;
const firstWord = 6;
const wordTicks = 2;
const lastWord = firstWord + words.length * wordTicks;
const stop = lastWord + 2;
const struckAt = stop + 2;
const cleanedAt = stop + 4;
const doneAt = stop + 6;
const insertAt = doneAt + 2;
const hiddenAt = insertAt + 8;
const length = insertAt + 26;

function indicatorState(t: number): IndicatorState {
  if (t > start && t < stop) return "recording";
  if (t >= stop && t < doneAt) return "transcribing";
  if (t >= doneAt && t < hiddenAt) return "done";
  return "hidden";
}

const status: Record<IndicatorState, string> = {
  hidden: "Tap to talk",
  recording: "Listening",
  transcribing: "Cleaning up",
  done: "Done",
};

export function DictationDemo() {
  const [ref, inView] = useInView<HTMLDivElement>(false);
  const t = useTicks({
    running: inView,
    interval: 150,
    length,
    loop: true,
  });

  const state = indicatorState(t);
  const pressed = t === start || t === stop;
  const recordedSeconds = Math.floor(
    (Math.max(start, Math.min(t, stop)) - start) * 0.15,
  );
  const spoken = Math.max(
    0,
    Math.min(words.length, Math.floor((t - firstWord) / wordTicks) + 1),
  );
  const speaking = t >= firstWord && t < lastWord;
  const struck = t >= struckAt;
  const cleaned = t >= cleanedAt;
  const inserting = t >= insertAt;

  return (
    <div
      ref={ref}
      className="dictation"
      aria-label={`You say "um so tell kaitlyn the uh deck is ready" and Voz types "${result}"`}
    >
      <div className="screen" aria-hidden="true">
        <NotchIndicator state={state} seconds={recordedSeconds} />
      </div>
      <div className="stage" aria-hidden="true">
        <div className="scene" data-active={!inserting}>
          <div className="trigger">
            <span className={pressed ? "shortcut pressed" : "shortcut"}>
              Right ⌘
            </span>
            <span className="status">{status[state]}</span>
          </div>
          <Waveform
            t={t}
            recording={state === "recording"}
            speaking={speaking}
          />
          <p className="spoken">
            {words.map((word, i) => {
              const filler = word.clean === null;
              const classes = [
                "word",
                i < spoken && "shown",
                filler && struck && "struck",
                filler && cleaned && "collapsed",
              ].filter(Boolean);
              return (
                <span key={word.raw + i} className={classes.join(" ")}>
                  {cleaned && word.clean ? word.clean : word.raw}
                </span>
              );
            })}
          </p>
        </div>
        <div className="scene" data-active={inserting}>
          <Chat
            draft={
              <span className={inserting ? "typed in" : "typed"}>
                {inserting ? result : ""}
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
}
