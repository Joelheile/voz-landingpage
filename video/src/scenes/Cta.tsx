import { AppIcon } from "../components/AppIcon";
import { Scene } from "../components/Scene";
import { pop, popAt, useFrame } from "../motion";
import { color, font } from "../theme";

export const Cta: React.FC = () => {
  const frame = useFrame();

  return (
    <Scene gap={72}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 36,
          ...pop(popAt(frame, 0)),
        }}
      >
        <AppIcon size={170} />
        <div
          style={{
            fontFamily: font.display,
            fontSize: 170,
            fontWeight: 500,
            lineHeight: 1,
          }}
        >
          Voz
        </div>
      </div>
      <div
        style={{
          padding: "30px 70px",
          borderRadius: 999,
          background: color.accent,
          color: "#fff",
          fontSize: 76,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          boxShadow: "0 20px 50px rgba(0,87,255,0.3)",
          ...pop(popAt(frame, 10)),
        }}
      >
        voz.joels.tech
      </div>
    </Scene>
  );
};
