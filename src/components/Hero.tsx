import { delay } from "../delay";
import { installCommand } from "../links";
import { CopyCommand } from "./CopyCommand";
import { DictationDemo } from "./DictationDemo";
import { Headline } from "./Headline";

export function Hero() {
  return (
    <section className="hero">
      <Headline as="h1" text="Free Wispr Flow alternative, extensible like pi" />
      <p className="lead rise" style={delay(450)}>
        Tap right ⌘ and talk. Voz types clean text into any app on your Mac.
        <br />
        Open source, offline and fast.
      </p>
      <div id="install" className="get rise" style={delay(550)}>
        <CopyCommand command={installCommand} />
      </div>
      <div className="rise" style={delay(700)}>
        <DictationDemo />
      </div>
    </section>
  );
}
