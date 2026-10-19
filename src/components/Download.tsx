import { installCommand, links } from "../links";
import { AsciiIcon } from "./AsciiIcon";
import { CopyCommand } from "./CopyCommand";
import { Headline } from "./Headline";
import { Section } from "./Section";

export function Download() {
  return (
    <Section className="download">
      <AsciiIcon />
      <Headline text="For people who want their tools their way" />
      <div className="get">
        <a className="button" href={links.download}>
          Download for Mac
        </a>
        <CopyCommand command={installCommand} />
      </div>
    </Section>
  );
}
