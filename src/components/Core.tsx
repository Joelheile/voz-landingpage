import { Headline } from "./Headline";
import { HomePanel } from "./HomePanel";
import { Section } from "./Section";

const traits = [
  "Lives in the menu bar",
  "Click a transcript to copy it, search finds the rest",
  "Extensions plug in between the steps. Add none and Voz runs nothing extra",
];

export function Core() {
  return (
    <Section className="split reverse">
      <HomePanel />
      <div className="split-text">
        <Headline text="A tiny core that stays fast" />
        <p>
          Voz records, transcribes, cleans up and types. It saves your history
          on your Mac. That is all the core does.
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
