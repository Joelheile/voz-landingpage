import { Headline } from "./Headline";
import { HomePanel } from "./HomePanel";
import { Section } from "./Section";

const traits = [
  "Lives in the menu bar",
  "Click a transcript to copy it, search finds the rest",
  "Use it as it is, or add your own extensions",
];

export function Core() {
  return (
    <Section className="split reverse">
      <HomePanel />
      <div className="split-text">
        <Headline text="The everyday part stays simple." />
        <p>
          Voz records, transcribes, cleans up and types. It saves your history
          on your Mac. Free, MIT licensed, with no monthly fee.
        </p>
        <ul className="ideas">
          {traits.map((trait) => (
            <li key={trait}>{trait}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
