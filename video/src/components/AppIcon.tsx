import { Img, staticFile } from "remotion";

export const AppIcon: React.FC<{
  size: number;
  style?: React.CSSProperties;
}> = ({ size, style }) => (
  <Img
    src={staticFile("app-icon.png")}
    style={{ width: size, height: size, ...style }}
  />
);
