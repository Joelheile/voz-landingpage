import { interpolate, useCurrentFrame } from "remotion";
import { Scene } from "../components/Scene";
import { ms, pop, popAt, progress } from "../motion";
import { color, font, shadow } from "../theme";

const Settings: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{ height: 150, overflow: "hidden" }}>
    <div style={{ transform: `translateY(${-frame * 6}px)` }}>
      {Array.from({ length: 30 }, (_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 38,
          }}
        >
          <div
            style={{
              width: 120 + ((i * 53) % 140),
              height: 12,
              borderRadius: 6,
              background: color.selected,
            }}
          />
          <div
            style={{
              width: 40,
              height: 24,
              borderRadius: 12,
              background: i % 3 ? color.selected : color.inkTertiary,
            }}
          />
        </div>
      ))}
    </div>
  </div>
);

const cards = [
  {
    label: "Paying monthly to talk",
    body: () => (
      <div
        style={{
          fontSize: 110,
          fontWeight: 600,
          letterSpacing: "-0.04em",
          lineHeight: "150px",
        }}
      >
        $/mo
      </div>
    ),
  },
  {
    label: "A hundred settings",
    body: (frame: number) => <Settings frame={frame} />,
  },
  {
    label: "Waiting months on your PR",
    body: () => (
      <div
        style={{
          height: 150,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 14,
        }}
      >
        <div style={{ fontFamily: font.mono, fontSize: 26 }}>
          #142 Add my feature
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            fontSize: 22,
            color: color.inkTertiary,
          }}
        >
          <span
            style={{
              padding: "4px 14px",
              borderRadius: 999,
              background: "#1F883D",
              color: "#fff",
              fontWeight: 600,
            }}
          >
            Open
          </span>
          6 months ago
        </div>
      </div>
    ),
  },
];

export const Problems: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Scene>
      <div style={{ display: "flex", gap: 40 }}>
        {cards.map((card, i) => {
          const at = i * 12;
          const struck = progress(frame, at + 30, ms(260));
          return (
            <div
              key={card.label}
              style={{
                width: 540,
                padding: "28px 34px 34px",
                borderRadius: 28,
                background: color.surface,
                border: `1px solid ${color.hairline}`,
                boxShadow: shadow,
                ...pop(popAt(frame, at)),
              }}
            >
              <div style={{ opacity: interpolate(struck, [0, 1], [1, 0.4]) }}>
                {card.body(frame)}
              </div>
              <div
                style={{
                  position: "relative",
                  width: "fit-content",
                  marginTop: 18,
                  fontSize: 36,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: struck > 0.5 ? color.inkTertiary : color.ink,
                }}
              >
                {card.label}
                <div
                  style={{
                    position: "absolute",
                    left: -8,
                    right: -8,
                    top: "54%",
                    height: 5,
                    borderRadius: 3,
                    background: color.ink,
                    transformOrigin: "left",
                    transform: `scaleX(${struck})`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Scene>
  );
};
