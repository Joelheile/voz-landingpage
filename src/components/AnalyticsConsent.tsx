import { useState } from "react";
import { analyticsChoice, setAnalyticsChoice } from "../analytics";

export function AnalyticsConsent() {
  const [open, setOpen] = useState(() => analyticsChoice() === null);

  function choose(value: "yes" | "no") {
    setAnalyticsChoice(value);
    setOpen(false);
  }

  return (
    <div className="analytics-consent ph-no-capture">
      <button type="button" onClick={() => setOpen(!open)}>Website analytics</button>
      {open && <div role="region" aria-label="Website analytics">
        <p>Allow PostHog analytics to measure visits, sources, clicks and install interest? Data is stored in the EU. No session recordings. App usage has a separate opt-in.</p>
        <button type="button" onClick={() => choose("yes")}>Allow</button>{" "}
        <button type="button" onClick={() => choose("no")}>Decline</button>
      </div>}
    </div>
  );
}
