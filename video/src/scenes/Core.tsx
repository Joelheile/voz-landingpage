import { useCurrentFrame } from "remotion";
import { Headline } from "../components/Headline";
import { HomePanel } from "../components/HomePanel";
import { Scene } from "../components/Scene";
import { pop, popAt } from "../motion";

export const Core: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Scene gap={56}>
      <Headline text="A tiny core that stays fast." size={84} />
      <div style={{ zoom: 2, ...pop(popAt(frame, 4)) }}>
        <HomePanel at={8} every={20} />
      </div>
    </Scene>
  );
};
