import { useCurrentFrame } from "remotion";
import { color, font, shadow } from "../theme";

export const Panel: React.FC<{
  width: number;
  height?: number;
  title?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ width, height, title, style, children }) => (
  <div
    style={{
      width,
      height,
      borderRadius: 22,
      background: color.surface,
      border: `1px solid ${color.hairline}`,
      boxShadow: shadow,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      fontFamily: font.sans,
      color: color.ink,
      ...style,
    }}
  >
    {title ? (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "18px 24px",
          borderBottom: `1px solid ${color.hairline}`,
        }}
      >
        {["#FF5F57", "#FEBC2E", "#28C840"].map((light) => (
          <div
            key={light}
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: light,
            }}
          />
        ))}
        <div style={{ marginLeft: 14, fontSize: 22, fontWeight: 600 }}>
          {title}
        </div>
      </div>
    ) : null}
    {children}
  </div>
);

export const Caret: React.FC<{ height?: number }> = ({ height = 34 }) => {
  const frame = useCurrentFrame();
  return (
    <span
      style={{
        display: "inline-block",
        width: 2.5,
        height,
        marginLeft: 3,
        verticalAlign: "middle",
        background: color.ink,
        opacity: Math.floor(frame / 15) % 2 === 0 ? 1 : 0,
      }}
    />
  );
};
