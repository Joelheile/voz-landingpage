import { enter, ms, progress, springOut, useFrame } from "../motion";
import { FPS } from "../theme";

export type NotchTimes = {
  start: number;
  stop: number;
  done: number;
  hidden: number;
};

const S = 1.8;
const LEVELS = [
  { period: 520, offset: 0 },
  { period: 410, offset: -120 },
  { period: 600, offset: -300 },
  { period: 450, offset: -80 },
  { period: 560, offset: -220 },
];

const clock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

const between = (frame: number, from: number, to: number) =>
  progress(frame, from, ms(300)) * (1 - progress(frame, to, ms(300)));

const Ear: React.FC<{ side: "left" | "right" }> = ({ side }) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      [side]: -6 * S,
      width: 6 * S,
      height: 6 * S,
      background: `radial-gradient(circle at ${side === "left" ? 0 : "100%"} 100%, transparent ${5.5 * S}px, #000 ${6 * S}px)`,
    }}
  />
);

export const Notch: React.FC<{ times: NotchTimes }> = ({ times }) => {
  const frame = useFrame();
  const { start, stop, done, hidden } = times;
  const open =
    progress(frame, start, ms(340), springOut) -
    progress(frame, hidden, ms(320));
  const wing = (delay: number) => {
    const p =
      progress(frame, start + ms(delay), ms(340)) *
      (1 - progress(frame, hidden, ms(120)));
    return {
      ...enter(p, 4),
      transform: `scale(${0.4 + 0.6 * p}, ${0.85 + 0.15 * p})`,
    };
  };
  const recording = between(frame, start, stop);
  const elapsed = ((frame - start) / FPS) * 1000;
  const seconds = Math.floor(
    (Math.max(start, Math.min(frame, stop)) - start) / FPS,
  );
  const tick = progress(frame, done + ms(100), ms(300));

  return (
    <div
      style={{
        position: "relative",
        width: (160 + 92 * open) * S,
        height: 32 * S,
        borderRadius: `0 0 ${(10 + 4 * open) * S}px ${(10 + 4 * open) * S}px`,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Ear side="left" />
      <Ear side="right" />
      <div
        style={{
          width: 46 * S,
          display: "grid",
          placeItems: "center",
          ...wing(80),
        }}
      >
        <span
          style={{
            fontSize: 12 * S,
            fontWeight: 500,
            fontVariantNumeric: "tabular-nums",
            color: `rgba(255,255,255,${0.4 + 0.5 * recording})`,
          }}
        >
          {clock(seconds)}
        </span>
      </div>
      <div
        style={{
          width: 46 * S,
          height: "100%",
          display: "grid",
          placeItems: "center",
          ...wing(120),
        }}
      >
        <div
          style={{
            gridArea: "1 / 1",
            display: "flex",
            alignItems: "center",
            gap: 3 * S,
            height: 14 * S,
            ...enter(recording, 4),
          }}
        >
          {LEVELS.map(({ period, offset }) => (
            <i
              key={period}
              style={{
                width: 3 * S,
                height: 14 * S,
                borderRadius: 2 * S,
                background: "rgba(255,255,255,0.9)",
                transform: `scaleY(${0.21 + 0.79 * (0.5 - 0.5 * Math.cos((Math.PI * (elapsed - offset)) / period))})`,
              }}
            />
          ))}
        </div>
        <div
          style={{
            gridArea: "1 / 1",
            display: "flex",
            gap: 3 * S,
            ...enter(between(frame, stop, done), 4),
          }}
        >
          {[0, 150, 300].map((delay) => {
            const phase = (((frame - stop) / FPS) * 1000 - delay + 900) % 900;
            const lit =
              phase < 270 ? phase / 270 : Math.max(0, 1 - (phase - 270) / 630);
            return (
              <i
                key={delay}
                style={{
                  width: 4.5 * S,
                  height: 4.5 * S,
                  borderRadius: "50%",
                  background: "#fff",
                  opacity: 0.3 + 0.7 * lit,
                }}
              />
            );
          })}
        </div>
        <svg
          viewBox="0 0 16 16"
          style={{
            gridArea: "1 / 1",
            width: 14 * S,
            height: 14 * S,
            ...enter(between(frame, done, hidden), 4),
          }}
        >
          <path
            d="M3.5 8.5l3 3 6-7"
            fill="none"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={16}
            strokeDashoffset={16 * (1 - tick)}
          />
        </svg>
      </div>
    </div>
  );
};
