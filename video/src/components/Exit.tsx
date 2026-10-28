import { AbsoluteFill } from "remotion";
import { easeIn, ms, progress, scene, useFrame } from "../motion";

export const Exit: React.FC<{ at: number; children: React.ReactNode }> = ({
  at,
  children,
}) => {
  const frame = useFrame();
  return (
    <AbsoluteFill style={scene(1 - progress(frame, at, ms(200), easeIn))}>
      {children}
    </AbsoluteFill>
  );
};
