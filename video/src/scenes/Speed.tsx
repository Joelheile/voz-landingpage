import { interpolate, useCurrentFrame } from "remotion";
import { Headline } from "../components/Headline";
import { InsightsPanel } from "../components/InsightsPanel";
import { Scene } from "../components/Scene";
import { enter, pop, popAt, progress } from "../motion";
import { color, font } from "../theme";

const WIDTH = 24;
const bars = [
  { label: "typing ", wpm: 40 },
  { label: "talking", wpm: 150 },
];

export const Speed: React.FC = () => {
  const frame = useCurrentFrame();
  const ticks = Math.round(
    interpolate(frame, [12, 42], [0, WIDTH], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <Scene>
      <div style={{ display: "flex", alignItems: "center", gap: 110 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
          <Headline
            text={"You talk 150 words\na minute, you type 40."}
            size={72}
            style={{ textAlign: "left" }}
          />
          <pre
            style={{
              margin: 0,
              fontFamily: font.mono,
              fontSize: 32,
              lineHeight: 1.6,
              color: color.inkTertiary,
              ...enter(progress(frame, 8, 8), 4),
            }}
          >
            {bars.map((bar) => {
              const full = Math.round((bar.wpm / 150) * WIDTH);
              const filled = Math.min(full, ticks);
              return (
                <span key={bar.label}>
                  <span style={{ color: color.ink }}>{bar.label}</span>{" "}
                  <span style={{ color: color.accent }}>
                    {"█".repeat(filled)}
                  </span>
                  <span style={{ opacity: 0.45 }}>
                    {"░".repeat(WIDTH - filled)}
                  </span>
                  {"  "}
                  <span style={{ color: color.ink }}>
                    {String(Math.round((filled / full) * bar.wpm)).padStart(3)}
                  </span>{" "}
                  wpm
                  {"\n"}
                </span>
              );
            })}
          </pre>
        </div>
        <div style={{ zoom: 1.6, ...pop(popAt(frame, 4)) }}>
          <InsightsPanel at={10} />
        </div>
      </div>
    </Scene>
  );
};
