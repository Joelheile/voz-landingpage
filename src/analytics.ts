const consentKey = "voz.analytics";

export function analyticsChoice() {
  return localStorage.getItem(consentKey);
}

// Until a visitor clicks Allow, PostHog runs in cookieless mode: it stores nothing in the browser and counts visits with a server-side hash.
const client = Promise.all([
  import("posthog-js/no-external"),
  import("posthog-js/dist/web-vitals"),
  import("posthog-js/dist/exception-autocapture"),
]).then(([{ default: posthog }]) => {
  posthog.init("phc_pprHknWQHntzTK6vR4vzHK9B6hWNv4nKXbAYpkYcoLXS", {
    api_host: "https://eu.i.posthog.com",
    person_profiles: "never",
    persistence: "localStorage",
    cookieless_mode: "on_reject",
    opt_out_capturing_by_default: analyticsChoice() !== "yes",
    respect_dnt: true,
    capture_pageview: false,
    capture_pageleave: true,
    capture_exceptions: true,
    autocapture: { capture_copied_text: false },
    capture_performance: { web_vitals: true },
    disable_session_recording: true,
    disable_surveys: true,
    advanced_disable_flags: true,
    disable_external_dependency_loading: true,
    loaded(loaded) {
      loaded.register({
        surface: "website",
        environment:
          import.meta.env.DEV || window.location.hostname !== "voz.joels.tech"
            ? "development"
            : "production",
      });
      loaded.capture("$pageview");
    },
  });
  return posthog;
});

export function setAnalyticsChoice(choice: "yes" | "no") {
  localStorage.setItem(consentKey, choice);
  void client.then((posthog) =>
    choice === "yes" ? posthog.opt_in_capturing() : posthog.opt_out_capturing(),
  );
}

export function trackInstallCopy(
  location: "hero" | "footer",
  state: "copied" | "failed",
) {
  void client.then((posthog) =>
    posthog.capture("install_command_copy", {
      location,
      state,
      method: "terminal",
    }),
  );
}

export function trackFeatureRequest(location: "header" | "download") {
  void client.then((posthog) =>
    posthog.capture("feature_request_opened", {
      location,
      destination: "github",
    }),
  );
}
