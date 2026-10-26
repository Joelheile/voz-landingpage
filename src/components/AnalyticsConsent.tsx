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
        <p>This site counts visits and clicks without cookies. Allow PostHog to also keep an ID in your browser, so repeat visits count once? Data is stored in the EU. No session recordings.</p>
        <button type="button" onClick={() => choose("yes")}>Allow</button>{" "}
        <button type="button" onClick={() => choose("no")}>Decline</button>
      </div>}
    </div>
  );
}
