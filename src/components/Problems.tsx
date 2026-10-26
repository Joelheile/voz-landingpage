import { Headline } from "./Headline";
import { Section } from "./Section";

export function Problems() {
  return (
    <Section className="problems">
      <Headline text="Every change I wanted meant a pull request." />
      <p>
        I paid for Wispr Flow until paying a subscription to talk to my own
        computer started to annoy me. Hex came closest of the open source apps
        I tried, but every change I wanted meant a pull request and a long wait.
      </p>
      <p>
        In Voz, you write the change as an extension. Change how your text
        is cleaned up, send it to another app, or run a script. Load it without
        rebuilding Voz. If it helps someone else, share it.
      </p>
    </Section>
  );
}
