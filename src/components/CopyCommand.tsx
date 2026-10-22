import { useState } from "react";
import { trackInstallCopy } from "../analytics";

export function CopyCommand({ command, location }: { command: string; location: "hero" | "footer" }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
    } catch (error) {
      trackInstallCopy(location, "failed");
      throw error;
    }
    trackInstallCopy(location, "copied");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="command">
      <code>
        <span className="prompt">$</span> {command}
      </code>
      <button type="button" onClick={copy}>
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
