import { links } from "../links";
import { AgentDemo } from "./AgentDemo";
import { Headline } from "./Headline";
import { Section } from "./Section";

const ideas = [
  "Turn rambling into a clear prompt for your coding agent",
  "Write mail in your style, with your greeting and sign-off",
  "Add a todo to your todo app",
  "File a Linear issue from what you said",
  "Run a script with a voice command",
];

export function MakeItYours() {
  return (
    <Section>
      <Headline text="Build what you need, share it with everyone" />
      <p>
        Instead of a setting for each wish, Voz has extensions. Small
        TypeScript files that can use your apps, files, terminal and the
        network.
      </p>
      <p>A few ideas to start with:</p>
      <ul className="ideas">
        {ideas.map((idea) => (
          <li key={idea}>{idea}</li>
        ))}
      </ul>
      <p>
        Get creative. Start with your own problem, build the fix and share it
        with others.
      </p>
      <h3>Build extensions at the speed of thought</h3>
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
