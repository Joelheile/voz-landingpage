import { links } from "../links";
import { AgentDemo } from "./AgentDemo";
import { Headline } from "./Headline";
import { Section } from "./Section";
import { StarButton } from "./StarButton";

const published = [
  ["voz-meeting", "records meetings and transcribes them"],
  ["voz-autocorrect", "fixes words Voz keeps mishearing"],
  ["voz-smart-spacing", "adds the missing space when you dictate after existing text"],
];

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
        up in Extensions for everyone. A few are already there:
      </p>
      <ul className="ideas">
        {published.map(([name, does]) => (
          <li key={name}>
            <code>voz install {name}</code> {does}
          </li>
        ))}
      </ul>
      <div className="actions">
        <a className="button" href={links.buildExtension}>
          Build an extension
        </a>
        <a href={links.extensions}>Browse extensions</a>
      </div>
      <div className="get">
        <StarButton location="build" label="Built something? Star Voz so others find it" />
      </div>
    </Section>
  );
}
