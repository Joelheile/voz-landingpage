import { useCurrentFrame } from "remotion";
import { AppIcon } from "../components/AppIcon";
import { Headline } from "../components/Headline";
import { Scene } from "../components/Scene";
import { ms, pop, popAt, progress } from "../motion";
import { color, shadow } from "../theme";

const extensions = [
  "Clear prompts for your agent",
  "Mail in your style",
  "Linear issues from speech",
  "Run a script by voice",
];

export const Share: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Scene gap={70}>
      <div
        style={{
          position: "relative",
          width: 1400,
          height: 560,
          display: "grid",
          placeItems: "center",
        }}
      >
        <svg
          width={1400}
          height={560}
          style={{ position: "absolute", inset: 0 }}
        >
          {extensions.map((name, i) => {
            const angle = (i / extensions.length) * Math.PI * 2 - Math.PI / 2;
            const length = Math.hypot(
              Math.cos(angle) * 560,
              Math.sin(angle) * 230,
            );
            return (
              <line
                key={name}
                x1={700}
                y1={280}
                x2={700 + Math.cos(angle) * 560}
                y2={280 + Math.sin(angle) * 230}
                stroke={color.accent}
                strokeOpacity={0.35}
                strokeWidth={3}
                strokeDasharray={length}
                strokeDashoffset={
                  length * (1 - progress(frame, 6 + i * 3, ms(300)))
                }
              />
            );
          })}
        </svg>
        <div style={{ position: "relative", ...pop(popAt(frame, 0)) }}>
          <AppIcon size={200} />
        </div>
        {extensions.map((name, i) => {
          const p = popAt(frame, 6 + i * 3);
          const angle = (i / extensions.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * 560 * p;
          const y = Math.sin(angle) * 230 * p;
          return (
            <div
              key={name}
              style={{
                position: "absolute",
                padding: "18px 34px",
                borderRadius: 999,
                background: color.surface,
                border: `1px solid ${color.hairline}`,
                boxShadow: shadow,
                fontSize: 36,
                fontWeight: 600,
                whiteSpace: "nowrap",
                opacity: Math.min(1, p * 2),
                transform: `translate(${x}px, ${y}px) scale(${0.6 + 0.4 * p})`,
              }}
            >
              {name}
            </div>
          );
        })}
      </div>
      <Headline text="Share them with everyone." size={84} at={20} />
    </Scene>
  );
};
