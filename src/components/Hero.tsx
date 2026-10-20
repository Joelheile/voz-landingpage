import { delay } from "../delay";
import { installCommand } from "../links";
import { CopyCommand } from "./CopyCommand";
import { DictationDemo } from "./DictationDemo";
import { Headline } from "./Headline";

export function Hero() {
  return (
    <section className="hero">
      <Headline as="h1" text="Tiny, fast dictation you can extend" />
      <p className="lead rise" style={delay(450)}>
        Tap right ⌘ and talk. Voz types clean text into any app on your Mac.
        <br />
        Free, open source and offline.
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
