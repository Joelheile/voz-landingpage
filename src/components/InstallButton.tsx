import { useRef, useState, type MouseEvent } from "react";
import { trackInstallCopy } from "../analytics";
import { installCommand, links } from "../links";

export function InstallButton() {
  const [copied, setCopied] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  async function copy(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(installCommand);
    } catch {
      trackInstallCopy("header", "failed");
      location.href = links.install;
      return;
    }
    trackInstallCopy("header", "copied");
    setCopied(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setCopied(false), 4000);
  }

  return (
    <div className="install-button">
      <a className="button small" href={links.install} onClick={copy}>
        Install
      </a>
      <div className="install-hint" data-open={copied} role="status">
        <strong>Install command copied</strong>
        <span>
          Open Terminal, paste with <kbd>⌘V</kbd> and press Return.
        </span>
      </div>
    </div>
  );
}
