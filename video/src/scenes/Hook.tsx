import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Headline } from "../components/Headline";
import { Notch } from "../components/Notch";
import { TextWave } from "../components/TextWave";
import { progress } from "../motion";
import { color } from "../theme";

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const plate = progress(frame, 4, 10);

  return (
    <AbsoluteFill style={{ background: color.canvas }}>
      <TextWave />
      <AbsoluteFill
        style={{
          opacity: plate,
          background: `radial-gradient(ellipse 1150px 300px at 50% 50%, ${color.canvas} 72%, rgba(246,244,239,0) 100%)`,
        }}
      />
      <AbsoluteFill style={{ alignItems: "center" }}>
        <Notch times={{ start: -40, stop: 9999, done: 9999, hidden: 9999 }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <Headline
          display
          text={"Wispr Flow,\nbut free and extensible."}
          size={116}
          at={4}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
