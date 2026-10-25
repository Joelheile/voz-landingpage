import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { enter, ms, progress } from "../motion";
import { color, font } from "../theme";

const transcripts = [
  { text: "Ship it.", app: "messages" },
  { text: "Love it, let's keep the serif headings.", app: "notion" },
  {
    text: "The bug was in the retry loop. Fixed in the last commit.",
    app: "slack",
  },
  { text: "Remind me to book the flight to Lisbon.", app: "notes" },
  { text: "Thanks, merged. I'll cut the release after lunch.", app: "mail" },
  { text: "Can we move standup to 10 tomorrow?", app: "slack" },
  { text: "Tell Kaitlyn the deck is ready.", app: "messages" },
];

const ROW = 40;
const VISIBLE = 5;
const icons = [
  ["M5 21v-6", "M12 21V3", "M19 21V9"],
  ["M12 2v10", "M18.4 6.6a9 9 0 1 1-12.77.04"],
];

const Icon: React.FC<{ paths: string[] }> = ({ paths }) => (
  <svg
    viewBox="0 0 24 24"
    style={{
      width: 30,
      height: 30,
      padding: 7.5,
      fill: "none",
      stroke: color.inkSecondary,
      strokeWidth: 1.75,
      strokeLinecap: "round",
    }}
  >
    {paths.map((d) => (
      <path key={d} d={d} />
    ))}
  </svg>
);

const Hr = () => (
  <div style={{ height: 1, margin: "0 -16px", background: color.hairline }} />
);

export const HomePanel: React.FC<{ at: number; every: number }> = ({
  at,
  every,
}) => {
  const frame = useCurrentFrame();
  const added = Math.min(
    transcripts.length - VISIBLE,
    Math.max(0, Math.floor((frame - at) / every)),
  );
  const since = frame - at - added * every;
  const push = added > 0 ? progress(since, 0, ms(220)) : 1;
  const phase = (frame - at) % every;
  const status =
    added >= transcripts.length - VISIBLE
      ? "Ready"
      : phase < every * 0.6
        ? "Recording"
        : "Transcribing";
  const rows = transcripts.slice(
    transcripts.length - VISIBLE - added,
    transcripts.length - added,
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
        gap: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          height: 24,
          fontSize: 14,
          color: color.inkTertiary,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          style={{
            width: 20,
            height: 15,
            fill: "none",
            stroke: color.inkTertiary,
            strokeWidth: 1.75,
            strokeLinecap: "round",
          }}
        >
          <path d="m21 21-4.34-4.34" />
          <circle cx="11" cy="11" r="8" />
        </svg>
        Search
      </div>
      <Hr />
      <div
        style={{ height: VISIBLE * ROW, margin: "0 -8px", overflow: "hidden" }}
      >
        <div style={{ transform: `translateY(${-ROW * (1 - push)}px)` }}>
          {rows.map((row, i) => (
            <div
              key={row.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                height: ROW,
                padding: "0 10px 0 6px",
                ...(i === 0 && added > 0 ? enter(push, 4) : {}),
              }}
            >
              <Img
                src={staticFile(`apps/${row.app}.png`)}
                style={{ width: 24, height: 24 }}
              />
              <span
                style={{
                  flex: 1,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {row.text}
              </span>
              <span
                style={{
                  marginLeft: 8,
                  fontFamily: font.display,
                  fontSize: 11,
                  color: color.inkTertiary,
                }}
              >
                {["1m", "2m", "9m", "24m", "1h"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Hr />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginRight: -8,
        }}
      >
        <strong
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginRight: "auto",
            fontFamily: font.display,
            fontSize: 13,
            fontWeight: 400,
          }}
        >
          {status === "Recording" ? (
            <i
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                background: "#FF3B30",
                opacity: interpolate(Math.sin(frame / 5), [-1, 1], [0.35, 1]),
              }}
            />
          ) : null}
          {status}
          {status === "Ready" ? (
            <span
              style={{
                height: 18,
                padding: "0 6px",
                border: `1px solid ${color.hairline}`,
                borderRadius: 5,
                background: color.canvas,
                fontFamily: font.sans,
                fontSize: 11,
                fontWeight: 500,
                color: color.inkSecondary,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              right ⌘
            </span>
          ) : null}
        </strong>
        {icons.map((paths) => (
          <Icon key={paths[0]} paths={paths} />
        ))}
      </div>
    </div>
  );
};
