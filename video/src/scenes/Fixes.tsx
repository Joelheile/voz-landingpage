import { useCurrentFrame } from "remotion";
import { Scene } from "../components/Scene";
import { pop, popAt } from "../motion";
import { color } from "../theme";

const fixes = [
  "Free and open source",
  "A tiny, fast core",
  "Extensions, not settings",
];

export const Fixes: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Scene>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        {fixes.map((fix, i) => (
          <div
            key={fix}
            style={{
              padding: "30px 56px",
              borderRadius: 999,
              background: i === 0 ? color.ink : color.surface,
              color: i === 0 ? color.surface : color.ink,
              border: `1px solid ${color.hairline}`,
              fontSize: 68,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              ...pop(popAt(frame, i * 10)),
            }}
          >
            {fix}
          </div>
        ))}
      </div>
    </Scene>
  );
};
