import { installCommand } from "../links";
import { CopyCommand } from "./CopyCommand";
import { Headline } from "./Headline";
import { Section } from "./Section";

export function Download() {
  return (
    <Section className="download">
      <Headline text="For people who want their tools their way" />
      <div className="get">
        <CopyCommand command={installCommand} />
      </div>
    </Section>
  );
}
