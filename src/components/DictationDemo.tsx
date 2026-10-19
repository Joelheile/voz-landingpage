import { useInView } from "../hooks/useInView";
import { useTicks } from "../hooks/useTicks";
import { Chat } from "./Chat";
import { NotchIndicator, type IndicatorState } from "./NotchIndicator";

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

function indicatorState(t: number): IndicatorState {
  if (t >= 4 && t < 20) return "recording";
  if (t >= 20 && t < 25) return "transcribing";
  if (t >= 25 && t < 31) return "done";
  return "hidden";
}

export function DictationDemo() {
  const [ref, inView] = useInView<HTMLDivElement>(false);
  const t = useTicks({
    running: inView,
    interval: 150,
    length: 48,
    loop: true,
  });

  const pressed = t === 3 || t === 19;
  const spoken = Math.max(0, Math.min(words.length, t - 6));
  const struck = t >= 21;
  const cleaned = t >= 24;
  const inserted = t >= 26;

  return (
    <div
      ref={ref}
      className="dictation"
      aria-label={`You say "um so tell kaitlyn the uh deck is ready" and voz types "${result}"`}
    >
      <div className="screen" aria-hidden="true">
        <NotchIndicator state={indicatorState(t)} />
      </div>
      <div className="dictation-body" aria-hidden="true">
        <span className={pressed ? "shortcut pressed" : "shortcut"}>
          Right ⌘
        </span>
        <p className={inserted ? "spoken gone" : "spoken"}>
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
        <Chat
          draft={
            <span className={inserted ? "typed in" : "typed"}>
              {inserted ? result : ""}
            </span>
          }
        />
      </div>
    </div>
  );
}
