import { color } from "../theme";
import { Caret, Panel } from "./Panel";

export type Message = {
  author: string;
  text: string;
  tint: string;
  style?: React.CSSProperties;
};

export const team: Message[] = [
  { author: "Emma", text: "Is the deck ready for tomorrow?", tint: "#C9785B" },
  {
    author: "Jake",
    text: "Tom wants it tonight if possible.",
    tint: "#5B9AC9",
  },
];

const Row: React.FC<{ message: Message }> = ({ message }) => (
  <div style={{ display: "flex", gap: 16, ...message.style }}>
    <div
      style={{
        width: 50,
        height: 50,
        flexShrink: 0,
        borderRadius: 12,
        background: message.tint,
        color: "#fff",
        fontSize: 22,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {message.author[0]}
    </div>
    <div>
      <div style={{ fontSize: 22, fontWeight: 600 }}>{message.author}</div>
      <div style={{ fontSize: 29, marginTop: 2 }}>{message.text}</div>
    </div>
  </div>
);

export const Chat: React.FC<{
  width: number;
  height: number;
  draft: React.ReactNode;
  thread?: Message[];
  style?: React.CSSProperties;
}> = ({ width, height, draft, thread = team, style }) => (
  <Panel title="# design" width={width} height={height} style={style}>
    <div
      style={{
        flex: 1,
        padding: "20px 28px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        gap: 20,
      }}
    >
      {thread.map((message) => (
        <Row key={message.author + message.text} message={message} />
      ))}
    </div>
    <div
      style={{
        margin: "0 20px 20px",
        height: 72,
        padding: "0 22px",
        borderRadius: 14,
        border: `1px solid ${color.hairline}`,
        background: color.canvas,
        display: "flex",
        alignItems: "center",
        fontSize: 30,
      }}
    >
      {draft}
      <Caret />
    </div>
  </Panel>
);
