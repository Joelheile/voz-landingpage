import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { ms, progress } from "../motion";
import { color, font } from "../theme";

const days = [
  { label: "Fri", height: 34 },
  { label: "Sat", height: 62 },
  { label: "Sun", height: 48 },
  { label: "Mon", height: 0 },
  { label: "Tue", height: 70 },
  { label: "Wed", height: 40 },
  { label: "Thu", height: 100 },
];

const tiles = [
  { value: "148", label: "words per minute" },
  { value: "9m", label: "talking" },
  { value: "46", label: "fillers removed" },
];

const apps = [
  { name: "Slack", icon: "slack", words: 412 },
  { name: "Mail", icon: "mail", words: 348 },
  { name: "Notion", icon: "notion", words: 236 },
  { name: "Messages", icon: "messages", words: 182 },
  { name: "Notes", icon: "notes", words: 106 },
];

const small = { fontSize: 12, color: color.inkSecondary };

export const InsightsPanel: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const words = Math.round(
    interpolate(frame, [at, at + 27], [0, 1284], {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <div
      style={{
        width: 360,
        padding: 16,
        borderRadius: 16,
        border: `1px solid ${color.hairline}`,
        background: color.surface,
        boxShadow: "0 8px 36px rgba(0,0,0,0.16)",
        fontSize: 13,
        lineHeight: 1.4,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          fontFamily: font.display,
          fontSize: 17,
          fontWeight: 500,
          marginBottom: -4,
        }}
      >
        Insights
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <strong
          style={{
            fontFamily: font.display,
            fontSize: 32,
            fontWeight: 500,
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {words.toLocaleString("en-US")}
        </strong>
        <span style={small}>words this week</span>
      </div>
      <div style={{ display: "flex", gap: 10, height: 116 }}>
        {days.map((day, i) => (
          <span
            key={day.label}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 6,
            }}
          >
            <i
              style={{
                width: "100%",
                height: `${Math.max(day.height, 2)}%`,
                borderRadius: 2,
                background: day.height === 0 ? color.hairline : color.accent,
                transformOrigin: "bottom",
                transform: `scaleY(${0.04 + 0.96 * progress(frame, at + ms(40) * i, ms(500))})`,
              }}
            />
            <small style={{ ...small, color: color.inkTertiary }}>
              {day.label}
            </small>
          </span>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {tiles.map((tile) => (
          <span
            key={tile.label}
            style={{
              ...small,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <strong style={{ fontSize: 17, fontWeight: 600, color: color.ink }}>
              {tile.value}
            </strong>
            {tile.label}
          </span>
        ))}
      </div>
      <span style={{ ...small, marginBottom: -8 }}>Top apps</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {apps.map((app, i) => (
          <div
            key={app.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              opacity: progress(frame, at + 10 + i * 3, ms(260)),
            }}
          >
            <Img
              src={staticFile(`apps/${app.icon}.png`)}
              style={{ width: 18, height: 18 }}
            />
            {app.name}
            <span
              style={{
                ...small,
                marginLeft: "auto",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {app.words}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
