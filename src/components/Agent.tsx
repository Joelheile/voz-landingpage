import { links } from "../links";
import { AgentDemo } from "./AgentDemo";
import { CopyCommand } from "./CopyCommand";
import { Headline } from "./Headline";
import { Section } from "./Section";

export function Agent() {
  return (
    <Section>
      <Headline text="No PR, your agent writes the extension" />
      <p>
        Open a coding agent in <code>~/.voz</code> and say what you want. It
        reads the guide voz keeps there and writes a TypeScript file. voz
        reloads it when you save.
      </p>
      <AgentDemo />
      <p>
        Share yours as an npm package with the <code>voz-package</code>{" "}
        keyword, or install someone else's:
      </p>
      <CopyCommand command="voz install npm:voz-jira" />
      <p className="note">
        <a href={links.extensions}>Read the extension docs</a> or{" "}
        <a href={links.npm}>browse packages</a>
      </p>
    </Section>
  );
}
