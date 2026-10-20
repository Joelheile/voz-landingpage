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
          Voz cuts the "um"s and fixes punctuation. It all runs on your Mac,
          so it works offline.
        </p>
      </div>
      <InsightsPanel />
    </Section>
  );
}
