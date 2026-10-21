import { Headline } from "./Headline";
import { Section } from "./Section";

const fixes = [
  {
    title: "Free and open source",
    body: "MIT licensed, no account, no weekly word limit",
  },
  {
    title: "A tiny, fast core",
    body: "Record, transcribe, clean up, insert. Nothing else runs on your words",
  },
  {
    title: "Extensions, not settings",
    body: "Build what you need, share it with others, and the core stays small",
  },
];

export function Solutions() {
  return (
    <Section>
      <Headline text="How Voz fixes it" />
      <ul className="fixes">
        {fixes.map((fix) => (
          <li key={fix.title}>
            <h3>{fix.title}</h3>
            <p>{fix.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
