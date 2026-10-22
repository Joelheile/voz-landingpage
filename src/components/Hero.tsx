import { delay } from "../delay";
import { installCommand } from "../links";
import { CopyCommand } from "./CopyCommand";
import { Headline } from "./Headline";
import { Pipeline } from "./Pipeline";

export function Hero() {
  return (
    <section className="hero">
      <Headline as="h1" text="Simple like Wispr Flow. Extensible like pi." />
      <p className="lead rise" style={delay(450)}>
        Tap right ⌘ and talk. Voz types clean text into any app.
        <br />
        Free and open source. Your audio never leaves your Mac.
      </p>
      <div id="install" className="get rise" style={delay(550)}>
        <CopyCommand command={installCommand} location="hero" />
      </div>
      <div className="rise" style={delay(700)}>
        <Pipeline />
      </div>
    </section>
  );
}
