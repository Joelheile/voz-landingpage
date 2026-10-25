import { useCurrentFrame } from "remotion";
import { enter, ms, progress } from "../motion";
import { color, font } from "../theme";

export const Headline: React.FC<{
  text: string;
  at?: number;
  size?: number;
  display?: boolean;
  style?: React.CSSProperties;
}> = ({ text, at = 0, size = 96, display = false, style }) => {
  const frame = useCurrentFrame();
  let index = 0;

  return (
    <div
      style={{
        fontFamily: display ? font.display : font.sans,
        fontWeight: display ? 500 : 600,
        fontSize: size,
        lineHeight: 1.08,
        letterSpacing: display ? 0 : "-0.03em",
        color: color.ink,
        textAlign: "center",
        ...style,
      }}
    >
      {text.split("\n").map((line) => (
        <div key={line}>
          {line.split(" ").map((word, i, words) => (
            <span
              key={word + i}
              style={{
                display: "inline-block",
                whiteSpace: "pre",
                ...enter(progress(frame, at + ms(50) * index++, ms(260))),
              }}
            >
              {i < words.length - 1 ? `${word} ` : word}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};
