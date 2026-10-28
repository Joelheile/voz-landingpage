import { interpolate } from "remotion";
import { AppIcon } from "../components/AppIcon";
import { Scene } from "../components/Scene";
import { enter, ms, pop, popAt, progress, useFrame } from "../motion";
import { color, shadow } from "../theme";

const rows = [
  { label: "Price", voz: "$0", wispr: "$144/yr" },
  { label: "Works offline", voz: true, wispr: false },
  { label: "Extensions", voz: true, wispr: false },
  { label: "Open source", voz: "MIT", wispr: false },
];
const FIRST_ROW = 8;
const EVERY = 9;
const DIM = FIRST_ROW + rows.length * EVERY + 6;

const Mark: React.FC<{ value: string | boolean; win: boolean }> = ({
  value,
  win,
}) => {
  if (typeof value === "string") return <>{value}</>;
  return (
    <svg viewBox="0 0 16 16" style={{ width: 56, height: 56 }}>
      <path
        d={value ? "M3.5 8.5l3 3 6-7" : "M4.5 4.5l7 7M11.5 4.5l-7 7"}
        fill="none"
        stroke={win ? color.accent : color.inkTertiary}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const cell: React.CSSProperties = {
  height: 120,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const Race: React.FC = () => {
  const frame = useFrame();
  const dim = progress(frame, DIM, ms(300));
  const loser = (at: number) => {
    const p = popAt(frame, at);
    return {
      ...pop(p),
      opacity: Math.min(1, p * 2) * interpolate(dim, [0, 1], [1, 0.35]),
      filter: `grayscale(${dim})`,
    };
  };

  return (
    <Scene>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "460px 520px 520px",
          columnGap: 40,
          alignItems: "center",
        }}
      >
        <div />
        <div
          style={{
            ...cell,
            gap: 20,
            fontSize: 52,
            fontWeight: 600,
            ...pop(popAt(frame, 0)),
          }}
        >
          <AppIcon size={72} />
          Voz
        </div>
        <div
          style={{
            ...cell,
            fontSize: 52,
            fontWeight: 600,
            color: color.inkSecondary,
            ...loser(3),
          }}
        >
          Wispr Flow
        </div>
        {rows.map((row, i) => {
          const at = FIRST_ROW + i * EVERY;
          return [
            <div
              key={`${row.label}-label`}
              style={{
                ...cell,
                justifyContent: "flex-start",
                fontSize: 48,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                ...enter(progress(frame, at, ms(260)), 6),
              }}
            >
              {row.label}
            </div>,
            <div
              key={`${row.label}-voz`}
              style={{
                ...cell,
                borderRadius: 28,
                background: color.surface,
                border: `1px solid ${color.hairline}`,
                boxShadow: shadow,
                margin: "8px 0",
                fontSize: 60,
                fontWeight: 600,
                color: color.accent,
                ...pop(popAt(frame, at + 2)),
              }}
            >
              <Mark value={row.voz} win />
            </div>,
            <div
              key={`${row.label}-wispr`}
              style={{
                ...cell,
                fontSize: 60,
                fontWeight: 600,
                color: color.inkSecondary,
                ...loser(at + 4),
              }}
            >
              <Mark value={row.wispr} win={false} />
            </div>,
          ];
        })}
      </div>
    </Scene>
  );
};
