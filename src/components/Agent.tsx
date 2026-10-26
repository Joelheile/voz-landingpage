import { links } from "../links";
import { AgentDemo } from "./AgentDemo";
import { Headline } from "./Headline";
import { Section } from "./Section";

export function Agent() {
  return (
    <Section>
      <Headline text="Missing one? Write it." />
      <p>
        Run <code>voz new voz-jira</code> to create a package, then{" "}
        <code>voz dev voz-jira</code> to load it. Save a change and Voz reloads
        it. The extension guide has the API and examples.
      </p>
      <p>
        Or tell a coding agent in <code>~/.voz</code> what you want. It reads the
        guide Voz keeps there and writes the extension. Voz loads it when you
        save.
      </p>
      <AgentDemo />
      <h3>Publish it. Anyone can install it.</h3>
      <p>
        Run <code>npm publish</code> in your package. Include the{" "}
        <code>voz-package</code> keyword so people can find it in Extensions,
        or install it with <code>voz install</code> and your package name.
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
