import { AbsoluteFill, Series } from "remotion";
import { Exit } from "./components/Exit";
import { Agent } from "./scenes/Agent";
import { Core } from "./scenes/Core";
import { Cta } from "./scenes/Cta";
import { Dictation } from "./scenes/Dictation";
import { Fixes } from "./scenes/Fixes";
import { Hook } from "./scenes/Hook";
import { Problems } from "./scenes/Problems";
import { Share } from "./scenes/Share";
import { Speed } from "./scenes/Speed";
import { ms } from "./motion";
import { color } from "./theme";

export const scenes = [
  { component: Hook, duration: 75 },
  { component: Dictation, duration: 140 },
  { component: Problems, duration: 105 },
  { component: Fixes, duration: 75 },
  { component: Speed, duration: 105 },
  { component: Core, duration: 90 },
  { component: Agent, duration: 170 },
  { component: Share, duration: 80 },
  { component: Cta, duration: 120 },
];

export const LAUNCH_DURATION = scenes.reduce(
  (sum, scene) => sum + scene.duration,
  0,
);

export const Launch: React.FC = () => (
  <AbsoluteFill style={{ background: color.canvas }}>
    <Series>
      {scenes.map(({ component: Scene, duration }, i) => (
        <Series.Sequence key={i} durationInFrames={duration}>
          {i < scenes.length - 1 ? (
            <Exit at={duration - ms(200)}>
              <Scene />
            </Exit>
          ) : (
            <Scene />
          )}
        </Series.Sequence>
      ))}
    </Series>
  </AbsoluteFill>
);
