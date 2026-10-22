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
      <Headline text="Why I built Voz" />
      <ul className="struck-list">
        {problems.map((problem, i) => (
          <li key={problem} style={delay(200 + i * 220)}>
            {problem}
          </li>
        ))}
      </ul>
      <p>
        I paid for Wispr Flow until paying a subscription to talk to my own
        computer started to annoy me. The open source apps I tried felt bloated.
        Hex came closest. I liked it, but every change I wanted meant a pull
        request and a long wait.
      </p>
      <p>
        So I built Voz the way pi works. The core records, transcribes, cleans
        up and types, and I keep it fast. Anything else is an extension you
        write for yourself. If it helps someone else, publish it and they can
        install it from the menu bar.
      </p>
    </Section>
  );
}
