import { AbsoluteFill } from "remotion";
import { color, font } from "../theme";

export const Scene: React.FC<{ gap?: number; children: React.ReactNode }> = ({
  gap = 48,
  children,
}) => (
  <AbsoluteFill
    style={{
      background: color.canvas,
      fontFamily: font.sans,
      color: color.ink,
      justifyContent: "center",
      alignItems: "center",
      gap,
      padding: "0 140px",
    }}
  >
    {children}
  </AbsoluteFill>
);
