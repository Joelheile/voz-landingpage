import { Headline } from "./Headline";
import { Section } from "./Section";

const reasons = [
  {
    label: "hooks",
    body: "Change the cleanup prompt, rewrite text before it lands, add voice commands or grab each recording",
  },
  {
    label: "full access",
    body: "Use any Bun or Node API, your files and the network. Bun runs extensions next to Voz, not inside it",
  },
  {
    label: "npm",
    body: "Share an extension as a package. Anyone installs it with one command",
  },
  {
    label: "zero cost",
    body: "No extensions means no Bun download and no extra process",
  },
  {
    label: "never blocks",
    body: "If an extension crashes or takes too long, Voz inserts your text anyway",
  },
  {
    label: "hot reload",
    body: "Save a .ts file in ~/.voz/extensions and Voz loads it. Edit it and Voz reloads it",
  },
];

export function WhyExtensions() {
  return (
    <Section>
      <Headline text="Every extra is an extension" />
      <p>
        Dictation apps add a setting for every request until nobody can find
        anything. Voz keeps the core to recording, transcription, cleanup and
        insertion. Everything else is a TypeScript file you own.
      </p>
      <p>
        A small core only works if extensions are cheap to write. With a coding
        agent they are: you describe what you want, and it writes a few lines
        against a small, typed API.
      </p>
      <dl className="reasons">
        {reasons.map((reason) => (
          <div key={reason.label}>
            <dt>{reason.label}</dt>
            <dd>{reason.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
