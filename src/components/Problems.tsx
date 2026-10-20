import { delay } from "../delay";
import { Section } from "./Section";

const problems = [
  "Paying monthly to talk",
  "A hundred settings",
  "Waiting months on your PR",
];

const fixes = [
  {
    title: "Free and open source",
    body: "MIT licensed, no account, no weekly word limit",
  },
  {
    title: "A tiny core",
    body: "Record, transcribe, clean up, insert. Nothing else runs on your words",
  },
  {
    title: "Extend it yourself",
    body: "Add what you need as a small TypeScript extension instead of waiting on a maintainer",
  },
];

export function Problems() {
  return (
    <Section className="problems">
      <ul className="struck-list">
        {problems.map((problem, i) => (
          <li key={problem} style={delay(200 + i * 220)}>
            {problem}
          </li>
        ))}
      </ul>
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
