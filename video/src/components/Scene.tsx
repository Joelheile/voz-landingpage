import { AbsoluteFill } from "remotion";
import { useFrame } from "../motion";
import { color, font } from "../theme";

const PUSH_IN_PER_FRAME = 0.00015;

export const Scene: React.FC<{ gap?: number; children: React.ReactNode }> = ({
  gap = 48,
  children,
}) => {
  const frame = useFrame();
  return (
    <AbsoluteFill
      style={{
        background: color.canvas,
        fontFamily: font.sans,
        color: color.ink,
        justifyContent: "center",
        alignItems: "center",
        gap,
        padding: "0 140px",
        transform: `scale(${1 + frame * PUSH_IN_PER_FRAME})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
