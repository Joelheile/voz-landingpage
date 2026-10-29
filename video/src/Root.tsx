import { Composition } from "remotion";
import { LAUNCH_DURATION, Launch } from "./Launch";
import { toRender } from "./motion";
import { RENDER_FPS } from "./theme";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Launch"
    component={Launch}
    durationInFrames={toRender(LAUNCH_DURATION)}
    fps={RENDER_FPS}
    width={1920}
    height={1080}
  />
);
