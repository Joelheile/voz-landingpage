import { Img, staticFile } from "remotion";
import { Headline } from "../components/Headline";
import { Scene } from "../components/Scene";
import { pop, popAt, progress, useFrame } from "../motion";
import { color, shadow } from "../theme";

const apps = [
  { icon: "slack", name: "Slack", text: "Tell Kaitlyn the deck is ready." },
  { icon: "mail", name: "Mail", text: "Hi Sam, the contract is signed." },
  { icon: "notes", name: "Notes", text: "Buy oat milk and coffee." },
];
const EVERY = 14;

export const Montage: React.FC = () => {
  const frame = useFrame();

  return (
    <Scene gap={70}>
      <Headline text="Works in every app." size={84} />
      <div style={{ display: "flex", gap: 40 }}>
        {apps.map((app, i) => {
          const at = 6 + i * EVERY;
          const fly = progress(frame, at + 6, 8);
          return (
            <div
              key={app.name}
              style={{
                width: 500,
                height: 330,
                padding: 34,
                borderRadius: 28,
                background: color.surface,
                border: `1px solid ${color.hairline}`,
                boxShadow: shadow,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                ...pop(popAt(frame, at)),
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <Img
                  src={staticFile(`apps/${app.icon}.png`)}
                  style={{
                    width: 84,
                    height: 84,
                    ...pop(popAt(frame, at + 3)),
                  }}
                />
                <div style={{ fontSize: 36, fontWeight: 600 }}>{app.name}</div>
              </div>
              <div
                style={{
                  minHeight: 120,
                  padding: "22px 26px",
                  borderRadius: 18,
                  background: color.canvas,
                  fontSize: 32,
                  fontWeight: 500,
                  lineHeight: 1.3,
                  opacity: fly,
                  filter: `blur(${6 * (1 - fly)}px)`,
                  transform: `translateY(${-120 * (1 - fly)}px)`,
                }}
              >
                {app.text}
              </div>
            </div>
          );
        })}
      </div>
    </Scene>
  );
};
