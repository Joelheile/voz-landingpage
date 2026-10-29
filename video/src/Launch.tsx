import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import { Exit } from "./components/Exit";
import { Agent } from "./scenes/Agent";
import { Cta } from "./scenes/Cta";
import { Dictation } from "./scenes/Dictation";
import { Hook } from "./scenes/Hook";
import { Montage } from "./scenes/Montage";
import { Problems } from "./scenes/Problems";
import { Race } from "./scenes/Race";
import { ms, toRender } from "./motion";
import { color } from "./theme";

const scenes = [
  { component: Race, duration: 84 },
  { component: Hook, duration: 66 },
  { component: Problems, duration: 96 },
  { component: Dictation, duration: 120 },
  { component: Montage, duration: 66 },
  { component: Agent, duration: 170 },
  { component: Cta, duration: 90 },
];

export const LAUNCH_DURATION = scenes.reduce(
  (sum, scene) => sum + scene.duration,
  0,
);

export const Launch: React.FC = () => (
  <AbsoluteFill style={{ background: color.canvas }}>
    <Audio src={staticFile("soundtrack.wav")} />
    <Series>
      {scenes.map(({ component: Scene, duration }, i) => (
        <Series.Sequence key={i} durationInFrames={toRender(duration)}>
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
