const consentKey = "voz.analytics";
let started = false;
let client: Awaited<ReturnType<typeof loadPostHog>> | undefined;

export function analyticsChoice() {
  return localStorage.getItem(consentKey);
}

async function loadPostHog() {
  const [{ default: posthog }] = await Promise.all([
    import("posthog-js/no-external"),
    import("posthog-js/dist/web-vitals"),
  ]);
  return posthog;
}

export async function startAnalytics() {
  if (started || analyticsChoice() !== "yes") return;
  started = true;
  const posthog = await loadPostHog();
  posthog.init("phc_pprHknWQHntzTK6vR4vzHK9B6hWNv4nKXbAYpkYcoLXS", {
    api_host: "https://eu.i.posthog.com",
    person_profiles: "never",
    persistence: "localStorage",
    respect_dnt: true,
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: { capture_copied_text: false },
    capture_performance: { web_vitals: true },
    disable_session_recording: true,
    disable_surveys: true,
    advanced_disable_flags: true,
    disable_external_dependency_loading: true,
    loaded(loaded) {
      loaded.register({ surface: "website", environment: import.meta.env.DEV || window.location.hostname !== "voz.joels.tech" ? "development" : "production" });
      loaded.opt_in_capturing();
      loaded.capture("$pageview");
    },
  });
  client = posthog;
}

export function setAnalyticsChoice(choice: "yes" | "no") {
  localStorage.setItem(consentKey, choice);
  if (choice === "yes") {
    if (client) {
      client.opt_in_capturing();
      client.capture("$pageview");
    } else void startAnalytics();
  } else client?.opt_out_capturing();
}

export function trackInstallCopy(location: "header" | "hero" | "footer", state: "copied" | "failed") {
  client?.capture("install_command_copy", { location, state, method: "terminal" });
}

export function trackFeatureRequest(location: "download") {
  client?.capture("feature_request_opened", { location, destination: "github" });
}

export function trackStar(location: "header" | "hero" | "build" | "download") {
  client?.capture("github_star_opened", { location });
}

export function trackVideoSound(state: "on" | "off") {
  client?.capture("launch_video_sound", { state });
}

void startAnalytics();
