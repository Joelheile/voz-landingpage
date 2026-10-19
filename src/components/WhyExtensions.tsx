import { Headline } from "./Headline";
import { Section } from "./Section";

const reasons = [
  {
    label: "~/.voz/extensions",
    body: "Save a .ts file and voz loads it. Edit it and voz reloads it",
  },
  {
    label: "hooks",
    body: "Change the cleanup prompt, rewrite text before it lands, add voice commands or grab each recording",
  },
  {
    label: "full access",
    body: "Use any Bun or Node API, your files and the network. Bun runs extensions next to voz, not inside it",
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
    body: "If an extension crashes or takes too long, voz inserts your text anyway",
  },
];

export function WhyExtensions() {
  return (
    <Section>
      <Headline text="Adapt voz to how you work" />
      <p>
        Most dictation apps add a setting for every request until nobody can
        find anything. voz keeps the core small. Everything else is a
        TypeScript file you own.
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
