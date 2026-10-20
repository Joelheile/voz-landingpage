import { links } from "../links";
import { AgentDemo } from "./AgentDemo";
import { Headline } from "./Headline";
import { Section } from "./Section";

export function Agent() {
  return (
    <Section>
      <Headline text="Describe it, save it, share it" />
      <p>
        Open a coding agent in <code>~/.voz</code> and say what you want. It
        reads <code>AGENTS.md</code>, the guide Voz keeps there, and writes the
        extension. Voz loads it when the file is saved.
      </p>
      <AgentDemo />
      <p>
        Publish it to npm with the <code>voz-package</code> keyword and it shows
        up in the extension list for everyone.
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
