import { links } from "../links";

export function Footer() {
  return (
    <footer className="footer">
      <span>MIT License</span>
      <nav>
        <a href={links.repo}>GitHub</a>
        <a href={links.extensions}>Extensions</a>
        <a href={links.buildExtension}>Build an extension</a>
        <a href={links.security}>Privacy</a>
        <a href={links.issues}>Issues</a>
      </nav>
    </footer>
  );
}
