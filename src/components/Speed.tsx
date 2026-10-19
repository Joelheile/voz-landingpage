import { AsciiBars } from "./AsciiBars";
import { Headline } from "./Headline";
import { InsightsPanel } from "./InsightsPanel";
import { Section } from "./Section";

export function Speed() {
  return (
    <Section className="split">
      <div className="split-text">
        <Headline text="You talk 150 words a minute, you type 40" />
        <AsciiBars />
        <p>
          voz drops the "um"s, fixes punctuation and spells names the way your
          dictionary does. Recognition and cleanup run on your Mac, so it works
          on a plane. Insights counts the time you got back.
        </p>
      </div>
      <InsightsPanel />
    </Section>
  );
}
