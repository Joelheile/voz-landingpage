import { Headline } from "./Headline";
import { HomePanel } from "./HomePanel";
import { Pipeline } from "./Pipeline";
import { Section } from "./Section";

export function Core() {
  return (
    <Section>
      <Headline text="A tiny core, no settings maze" />
      <p>
        Voz does four things and saves your history. Extensions plug in
        between the steps. Add none and Voz runs nothing extra.
      </p>
      <Pipeline />
      <div className="split reverse">
        <HomePanel />
        <div className="split-text">
          <h3>Lives in the menu bar</h3>
          <p>
            One panel shows what Voz is doing and your last transcripts. Click
            one to copy it. Search finds the rest.
          </p>
        </div>
      </div>
    </Section>
  );
}
