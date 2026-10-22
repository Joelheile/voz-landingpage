import { trackFeatureRequest } from "../analytics";
import { installCommand, links } from "../links";
import { CopyCommand } from "./CopyCommand";
import { Headline } from "./Headline";
import { Section } from "./Section";

export function Download() {
  return (
    <Section className="download">
      <Headline text="For people who want their tools their way" />
      <div className="get">
        <CopyCommand command={installCommand} location="footer" />
        <p className="feature-request">Missing something? <a href={links.featureRequest} onClick={() => trackFeatureRequest("download")}>Request a feature on GitHub</a></p>
      </div>
    </Section>
  );
}
