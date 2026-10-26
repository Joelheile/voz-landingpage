import { delay } from "../delay";
import { installCommand } from "../links";
import { CopyCommand } from "./CopyCommand";
import { Headline } from "./Headline";
import { Pipeline } from "./Pipeline";

export function Hero() {
  return (
    <section className="hero">
      <Headline as="h1" text="The dictation app you extend yourself." />
      <p className="lead rise" style={delay(450)}>
        Tap right ⌘ and talk. Voz types clean text into any app. Add a
        TypeScript extension to turn your words into a task, a calendar event,
        or a command of your own.
      </p>
      <div id="install" className="get rise" style={delay(550)}>
        <CopyCommand command={installCommand} location="hero" />
        <p className="note">Free and open source. macOS 26 on Apple Silicon.</p>
      </div>
      <div className="rise" style={delay(700)}>
        <Pipeline />
      </div>
    </section>
  );
}
