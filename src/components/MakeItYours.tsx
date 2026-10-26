import { Headline } from "./Headline";
import { Section } from "./Section";

const examples = [
  {
    name: "voz-things",
    say: "todo call Sam, deadline Friday",
    result: "A to-do in Things 3, due Friday.",
  },
  {
    name: "voz-calendar",
    say: "calendar deep work tomorrow at 9 for 2 hours",
    result: "A two-hour block in Apple Calendar.",
  },
  {
    name: "voz-mcp",
    say: "agent …",
    result: "Call a tool on one of your connected MCP servers.",
  },
];

export function MakeItYours() {
  return (
    <Section>
      <Headline text="Say it. Put it to work." />
      <p>
        These are extensions I built for my own Mac. Each is a separate
        TypeScript package. Open the source to see how it works.
      </p>
      <div className="extension-examples">
        <table>
          <thead>
            <tr>
              <th scope="col">You say</th>
              <th scope="col">What happens</th>
            </tr>
          </thead>
          <tbody>
            {examples.map((example) => (
              <tr key={example.name}>
                <td>
                  <q>{example.say}</q>
                </td>
                <td>
                  <p>{example.result}</p>
                  <a href={`https://github.com/Joelheile/voz-extensions/tree/main/${example.name}`}>
                    {example.name}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="note">
        By Joel. These examples require extension API 2. Extensions can use
        external services; built-in dictation runs on your Mac.
      </p>
    </Section>
  );
}
