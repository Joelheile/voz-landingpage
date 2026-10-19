import type { ReactNode } from "react";
import { Window } from "./Window";

type Message = { author: string; text: string; tint: string };

const team: Message[] = [
  { author: "Emma", text: "Is the deck ready for tomorrow?", tint: "#C9785B" },
  {
    author: "Jake",
    text: "Tom wants it tonight if possible.",
    tint: "#5B9AC9",
  },
];

export function Chat({ draft }: { draft: ReactNode }) {
  return (
    <Window title="# design" className="chat">
      <ul className="thread">
        {team.map((message) => (
          <li key={message.author + message.text}>
            <span className="avatar" style={{ background: message.tint }}>
              {message.author[0]}
            </span>
            <div>
              <strong>{message.author}</strong>
              <p>{message.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="draft">
        {draft}
        <span className="caret" />
      </div>
    </Window>
  );
}
