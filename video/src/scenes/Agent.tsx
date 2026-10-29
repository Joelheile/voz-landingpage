import { AbsoluteFill } from "remotion";
import { Chat, team } from "../components/Chat";
import { Headline } from "../components/Headline";
import { Panel } from "../components/Panel";
import { Scene } from "../components/Scene";
import { enter, ms, pop, popAt, progress, rise, typed, useFrame } from "../motion";
import { color, font } from "../theme";

const ASK = 'add a voice command: when I say "send it", press return';
const CODE =
  'voz.registerCommand("send it",\n  (event, ctx) => ctx.press("return"));';
const SPOKEN = 110;
const SEND = 132;

export const Agent: React.FC = () => {
  const frame = useFrame();
  const spoken = popAt(frame, SPOKEN) * (1 - progress(frame, SEND, ms(200)));
  const sent = popAt(frame, SEND);

  return (
    <Scene gap={50}>
      <Headline text="Missing a feature? Tell your agent." size={84} />
      <div style={{ display: "flex", gap: 40, alignItems: "stretch" }}>
        <Panel
          title="~/.voz"
          width={860}
          height={460}
          style={pop(popAt(frame, 4))}
        >
          <div
            style={{
              padding: "26px 32px",
              fontFamily: font.mono,
              fontSize: 27,
              lineHeight: 1.6,
              fontVariantLigatures: "none",
              whiteSpace: "pre-wrap",
            }}
          >
            <span style={{ color: color.inkTertiary }}>&gt; </span>
            {typed(ASK, frame, 10, 34)}
            <div
              style={{
                marginTop: 18,
                ...enter(progress(frame, 37, ms(200)), 4),
              }}
            >
              <span style={{ color: color.inkTertiary }}>
                Reading ~/.voz/AGENTS.md
              </span>
            </div>
            <div style={enter(progress(frame, 43, ms(200)), 4)}>
              Created ~/.voz/extensions/send-it.ts
            </div>
            <div
              style={{
                marginTop: 18,
                padding: "18px 22px",
                borderRadius: 14,
                background: color.canvas,
                whiteSpace: "pre",
                opacity: progress(frame, 47, ms(150)),
              }}
            >
              {typed(CODE, frame, 48, 76)}
            </div>
          </div>
        </Panel>
        <div style={{ position: "relative", ...pop(popAt(frame, 8)) }}>
          <Chat
            width={720}
            height={460}
            thread={
              sent > 0
                ? [
                    ...team,
                    {
                      author: "You",
                      text: "Ship it.",
                      tint: color.accent,
                      style: rise(Math.min(1, sent)),
                    },
                  ]
                : team
            }
            draft={
              <span>{sent > 0 ? "" : typed("Ship it.", frame, 84, 94)}</span>
            }
          />
          <AbsoluteFill
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              paddingTop: 110,
            }}
          >
            <div
              style={{
                padding: "16px 34px",
                borderRadius: 999,
                background: "#000",
                color: "#fff",
                fontSize: 34,
                fontWeight: 500,
                ...pop(spoken),
              }}
            >
              "send it"
            </div>
          </AbsoluteFill>
        </div>
      </div>
      <div
        style={{
          padding: "16px 40px",
          borderRadius: 999,
          background: color.accent,
          color: "#fff",
          fontSize: 40,
          fontWeight: 600,
          ...pop(popAt(frame, SEND + 8)),
        }}
      >
        0 PRs, 0 waiting
      </div>
    </Scene>
  );
};
