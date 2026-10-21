import { delay } from "../delay";
import { Headline } from "./Headline";
import { Section } from "./Section";

const problems = [
  "Paying monthly to talk",
  "A hundred settings",
  "Waiting months on your PR",
];

const principles = [
  "Speed and reliability come first. Nothing may slow down dictation",
  "The core stays tiny. Everything else is an extension",
  "Your tool, your way. Build what you need and share it",
];

export function Problems() {
  return (
    <Section className="problems">
      <Headline text="Why I built Voz" />
      <ul className="struck-list">
        {problems.map((problem, i) => (
          <li key={problem} style={delay(200 + i * 220)}>
            {problem}
          </li>
        ))}
      </ul>
      <p>
        I paid for Wispr Flow until the price annoyed me. The alternatives I
        tried were bloated. Then I found Hex and liked it, but I couldn't make
        it fit how I work. So I built Voz like pi: a small core, and extensions
        for everything else.
      </p>
      <ul className="ideas">
        {principles.map((principle) => (
          <li key={principle}>{principle}</li>
        ))}
      </ul>
    </Section>
  );
}
