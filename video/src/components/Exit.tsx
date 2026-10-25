import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ms, progress, scene } from "../motion";

export const Exit: React.FC<{ at: number; children: React.ReactNode }> = ({
  at,
  children,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={scene(1 - progress(frame, at, ms(200)))}>
      {children}
    </AbsoluteFill>
  );
};
