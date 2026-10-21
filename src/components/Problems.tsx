import { delay } from "../delay";
import { Headline } from "./Headline";
import { Section } from "./Section";

const problems = [
  "Paying monthly to talk",
  "A hundred settings",
  "Waiting months on your PR",
];

export function Problems() {
  return (
    <Section className="problems">
      <Headline text="Why Voz exists" />
      <ul className="struck-list">
        {problems.map((problem, i) => (
          <li key={problem} style={delay(200 + i * 220)}>
            {problem}
          </li>
        ))}
      </ul>
      <p>
        Dictation apps charge every month for what your Mac can do offline. Each
        feature someone asks for becomes another setting, and every setting
        slows the core down. If you need a change, you open an issue and wait
        for a maintainer, often forever.
      </p>
    </Section>
  );
}
