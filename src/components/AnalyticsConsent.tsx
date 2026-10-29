import { useState } from "react";
import { analyticsChoice, setAnalyticsChoice } from "../analytics";

export function AnalyticsConsent() {
  const [open, setOpen] = useState(() => analyticsChoice() === null);
  const [details, setDetails] = useState(false);

  function choose(value: "yes" | "no") {
    setAnalyticsChoice(value);
    setOpen(false);
  }

  return (
    <div className="analytics-consent ph-no-capture">
      <button type="button" onClick={() => setOpen(!open)}>Website analytics</button>
      {open && <div role="region" aria-label="Website analytics">
        <p>Analytics cookies?</p>
        <button type="button" onClick={() => choose("yes")}>Allow</button>
        <button type="button" onClick={() => choose("no")}>Decline</button>
        <button type="button" aria-expanded={details} onClick={() => setDetails(!details)}>Info</button>
        {details && <p className="analytics-details">PostHog counts visits and clicks here and stores the data in the EU. It starts only after you click Allow.</p>}
      </div>}
    </div>
  );
}
