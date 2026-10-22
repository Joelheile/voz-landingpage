import type { ReactNode } from "react";
import { Window } from "./Window";

type Message = { author: string; text: string; photo: string };

const team: Message[] = [
  {
    author: "Emma",
    text: "Is the deck ready for tomorrow?",
    photo: "/avatars/emma.jpg",
  },
  {
    author: "Jake",
    text: "Tom wants it tonight if possible.",
    photo: "/avatars/jake.jpg",
  },
];

export function Chat({ draft }: { draft: ReactNode }) {
  return (
    <Window title="# design" className="chat">
      <ul className="thread">
        {team.map((message) => (
          <li key={message.author + message.text}>
            <img
              className="avatar"
              src={message.photo}
              alt=""
              width={36}
              height={36}
            />
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
