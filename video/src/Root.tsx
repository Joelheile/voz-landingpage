import { Composition } from "remotion";
import { LAUNCH_DURATION, Launch } from "./Launch";
import { FPS } from "./theme";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Launch"
    component={Launch}
    durationInFrames={LAUNCH_DURATION}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
