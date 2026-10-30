import { links } from "../links";
import { InstallButton } from "./InstallButton";
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
        <StarButton location="header" label="GitHub" icon="github">
          <StarCount />
        </StarButton>
        <InstallButton />
      </nav>
    </header>
  );
}
