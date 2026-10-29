import { links } from "../links";
import { StarButton, StarCount } from "./StarButton";

export function Header() {
  return (
    <header className="header">
      <a className="brand" href="/">
        <img src="/icon.png" alt="" width={24} height={24} />
        Voz
      </a>
      <nav>
        <a href={links.extensions}>Extensions</a>
        <a href={links.buildExtension}>Build</a>
        <StarButton location="header" label="Star">
          <StarCount />
        </StarButton>
        <a className="button small" href={links.install}>
          Install
        </a>
      </nav>
    </header>
  );
}
