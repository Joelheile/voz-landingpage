import { trackFeatureRequest } from "../analytics";
import { links } from "../links";

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
        <a href={links.featureRequest} onClick={() => trackFeatureRequest("header")}>Request a feature</a>
        <a className="button small" href={links.install}>
          Install
        </a>
      </nav>
    </header>
  );
}
