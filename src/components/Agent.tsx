import { links } from "../links";
import { AgentDemo } from "./AgentDemo";
import { Headline } from "./Headline";
import { Section } from "./Section";

export function Agent() {
  return (
    <Section>
      <Headline text="Build extensions at the speed of thought" />
      <p>
        Tell a coding agent in <code>~/.voz</code> what you want. It reads the
        guide Voz keeps there and writes the extension. Voz loads it when you
        save.
      </p>
      <AgentDemo />
      <p>
        Publish it to npm with the <code>voz-package</code> keyword and it shows
        up in Extensions for everyone.
      </p>
      <div className="actions">
        <a className="button" href={links.buildExtension}>
          Build an extension
        </a>
        <a href={links.extensions}>Browse extensions</a>
      </div>
    </Section>
  );
}
