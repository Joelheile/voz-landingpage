import { Headline } from "./Headline";
import { Section } from "./Section";

const ideas = [
  "Turn rambling into a clear prompt for your coding agent",
  "Write mail in your style, with your greeting and sign-off",
  "Add a todo to your todo app",
  "File a Linear issue from what you said",
  "Run a script with a voice command",
];

export function MakeItYours() {
  return (
    <Section>
      <Headline text="Build the extensions you need, share them with everyone" />
      <p>
        Instead of a setting for each wish, Voz has extensions. Small TypeScript
        files that can use your apps, files, terminal and the network.
      </p>
      <p>A few ideas to start with:</p>
      <ul className="ideas">
        {ideas.map((idea) => (
          <li key={idea}>{idea}</li>
        ))}
      </ul>
      <p>
        Get creative. Start with your own problem, build the fix and share it
        with others.
      </p>
    </Section>
  );
}
