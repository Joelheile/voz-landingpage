import { links } from "../links";

export function Header() {
  return (
    <header className="header">
      <a className="brand" href="/">
        <img src="/icon.png" alt="" width={24} height={24} />
        voz
      </a>
      <nav>
        <a href={links.extensions}>Extensions</a>
        <a href={links.repo}>GitHub</a>
        <a className="button small" href={links.download}>
          Download
        </a>
      </nav>
    </header>
  );
}
