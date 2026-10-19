import { Headline } from "./Headline";
import { Section } from "./Section";

export function Privacy() {
  return (
    <Section>
      <Headline text="Your voice stays on your Mac" />
      <p>
        Audio stays in memory and transcripts stay in a private folder on your
        disk. Usage analytics are off unless you opt in, and they never include
        what you said.
      </p>
    </Section>
  );
}
