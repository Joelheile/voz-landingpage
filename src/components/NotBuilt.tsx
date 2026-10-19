import { Headline } from "./Headline";
import { Section } from "./Section";

const items = [
  { title: "No voice commands", body: "Add yours with registerCommand" },
  { title: "No per-app styles", body: "Swap the cleanup prompt in beforeCleanup" },
  { title: "No snippets", body: "Expand your own shortcuts in beforeInsert" },
  { title: "No notetaker", body: "Get each recording as a WAV and build one" },
  { title: "No integrations", body: "Send what you said to any API in afterInsert" },
  { title: "No cloud", body: "Recognition and cleanup run on your Mac" },
];

export function NotBuilt() {
  return (
    <Section>
      <Headline text="What we left out" />
      <p>
        Every feature in the core slows every dictation, so these are
        extensions. Each one is a few lines.
      </p>
      <dl className="not-built">
        {items.map((item) => (
          <div key={item.title}>
            <dt>{item.title}</dt>
            <dd>{item.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
