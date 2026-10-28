import { AbsoluteFill, interpolate } from "remotion";
import { Chat } from "../components/Chat";
import { Headline } from "../components/Headline";
import { Notch } from "../components/Notch";
import { Scene } from "../components/Scene";
import { enter, ms, progress, scene, useFrame } from "../motion";
import { color, font } from "../theme";

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

const RESULT = "Tell Kaitlyn the deck is ready.";
const TICK = 3;
const at = (ticks: number) => 4 + ticks * TICK;
const START = at(1);
const FIRST_WORD = at(3);
const LAST_WORD = at(6 + words.length * 2);
const STOP = LAST_WORD + 2 * TICK;
const STRUCK = STOP + 2 * TICK;
const CLEANED = STOP + 4 * TICK;
const DONE = STOP + 6 * TICK;
const INSERT = DONE + 2 * TICK;
const HIDDEN = INSERT + 8 * TICK;
const BARS = 32;
const steps = [
  { title: "You talk", from: START, to: STOP },
  { title: "Voz transcribes", from: STOP, to: STRUCK },
  { title: "It cleans up", from: STRUCK, to: DONE },
  { title: "It types", from: DONE, to: HIDDEN },
];

const Steps: React.FC<{ frame: number }> = ({ frame }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 24,
      width: 1500,
    }}
  >
    {steps.map((step) => {
      const fill = interpolate(frame, [step.from, step.to], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const active = frame >= step.from && frame < step.to;
      return (
        <div
          key={step.title}
          style={{
            position: "relative",
            paddingTop: 22,
            fontSize: 30,
            color: active
              ? color.ink
              : frame >= step.to
                ? color.inkSecondary
                : color.inkTertiary,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              borderRadius: 2,
              background: color.hairline,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              borderRadius: 2,
              background: color.accent,
              transformOrigin: "left",
              transform: `scaleX(${fill})`,
            }}
          />
          {step.title}
        </div>
      );
    })}
  </div>
);

const status = (frame: number) => {
  if (frame < START) return "Tap to talk";
  if (frame < STOP) return "Listening";
  if (frame < DONE) return "Cleaning up";
  return "Done";
};

const level = (t: number, bar: number) => {
  const edge = Math.sin(((bar + 0.5) / BARS) * Math.PI);
  const wobble = Math.abs(
    Math.sin(t * 1.9 + bar * 0.83) * Math.cos(t * 0.7 + bar * 0.37),
  );
  return 0.15 + 0.85 * edge * wobble;
};

const press = (frame: number, key: number) =>
  interpolate(
    frame,
    [key - 1, key, key + TICK, key + TICK + ms(120)],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

export const Dictation: React.FC = () => {
  const frame = useFrame();
  const t = frame / TICK;
  const speaking = frame >= FIRST_WORD && frame < LAST_WORD;
  const recording =
    progress(frame, START, ms(300)) * (1 - progress(frame, STOP, ms(300)));
  const pressed = Math.max(press(frame, START), press(frame, STOP));
  const struck = frame >= STRUCK;
  const collapse = progress(frame, CLEANED, ms(300));
  const cleaned = frame >= CLEANED;
  const inserted = progress(frame, INSERT, ms(300));

  return (
    <Scene gap={44}>
      <Headline text="Tap right ⌘ and talk." size={84} />
      <div
        style={{
          position: "relative",
          width: 1500,
          height: 560,
          borderRadius: 40,
          overflow: "hidden",
          border: `1px solid ${color.hairline}`,
          background: color.desktop,
          ...enter(progress(frame, 0, ms(200)), 4),
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Notch
            times={{ start: START, stop: STOP, done: DONE, hidden: HIDDEN }}
          />
        </div>
        <AbsoluteFill
          style={{
            top: 60,
            justifyContent: "center",
            alignItems: "center",
            gap: 44,
            ...scene(1 - inserted),
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <span
              style={{
                padding: "8px 24px",
                borderRadius: 999,
                fontSize: 26,
                fontWeight: 600,
                background: pressed > 0.5 ? color.ink : color.selected,
                color: pressed > 0.5 ? color.surface : color.ink,
                transform: `scale(${1 - 0.03 * pressed})`,
              }}
            >
              Right ⌘
            </span>
            <span
              style={{
                fontFamily: font.mono,
                fontSize: 26,
                color: color.inkTertiary,
              }}
            >
              {status(frame)}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: 110,
              opacity: 0.35 + 0.65 * recording,
            }}
          >
            {Array.from({ length: BARS }, (_, bar) => (
              <i
                key={bar}
                style={{
                  width: 8,
                  height: "100%",
                  borderRadius: 4,
                  background: color.accent,
                  transform: `scaleY(${speaking ? level(t, bar) : 0.08})`,
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              minHeight: 70,
              fontSize: 52,
              fontWeight: 500,
            }}
          >
            {words.map((word, i) => {
              const filler = word.clean === null;
              const shown = progress(frame, FIRST_WORD + i * 2 * TICK, ms(260));
              const gone = filler ? collapse : 0;
              return (
                <span
                  key={word.raw + i}
                  style={{
                    display: "inline-block",
                    overflow: "hidden",
                    whiteSpace: "pre",
                    maxWidth: `${6 * (1 - gone)}em`,
                    marginRight: `${0.28 * (1 - gone)}em`,
                    ...enter(shown * (1 - gone), 6),
                    color: filler && struck ? color.accent : color.ink,
                    textDecoration: filler && struck ? "line-through" : "none",
                  }}
                >
                  {cleaned && word.clean ? word.clean : word.raw}
                </span>
              );
            })}
          </div>
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            top: 60,
            justifyContent: "center",
            alignItems: "center",
            ...scene(inserted),
          }}
        >
          <Chat
            width={940}
            height={420}
            draft={
              <span style={enter(inserted)}>{inserted > 0 ? RESULT : ""}</span>
            }
          />
        </AbsoluteFill>
      </div>
      <Steps frame={frame} />
    </Scene>
  );
};
