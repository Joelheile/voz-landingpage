import { delay } from "../delay";

export function Headline({
  text,
  as: Tag = "h2",
  step = 60,
}: {
  text: string;
  as?: "h1" | "h2";
  step?: number;
}) {
  return (
    <Tag className="headline" aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={word + i} aria-hidden="true" style={delay(i * step)}>
          {word}{" "}
        </span>
      ))}
    </Tag>
  );
}
