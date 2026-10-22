import { trackFeatureRequest } from "../analytics";
import { delay } from "../delay";
import { installCommand, links } from "../links";
import { CopyCommand } from "./CopyCommand";
import { DictationDemo } from "./DictationDemo";
import { Headline } from "./Headline";

export function Hero() {
  return (
    <section className="hero">
      <Headline as="h1" text="Simple like Wispr Flow. Extensible like pi." />
      <p className="lead rise" style={delay(450)}>
        Free, open source and private. Your audio never leaves your Mac.
        <br />
        Tap right ⌘ and talk. Voz types clean text into any app.
      </p>
      <div id="install" className="get rise" style={delay(550)}>
        <CopyCommand command={installCommand} location="hero" />
        <p className="feature-request">Missing something? <a href={links.featureRequest} onClick={() => trackFeatureRequest("hero")}>Request a feature on GitHub</a></p>
      </div>
      <div className="rise" style={delay(700)}>
        <DictationDemo />
      </div>
    </section>
  );
}
