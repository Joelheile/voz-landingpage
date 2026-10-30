import { Suspense, use, type ReactNode } from "react";
import { trackStar } from "../analytics";
import { links } from "../links";

let stars: Promise<number | null> | undefined;

function fetchStars() {
  stars ??= fetch("https://api.github.com/repos/Joelheile/voz")
    .then((response) => {
      if (!response.ok) throw new Error(`GitHub answered ${response.status}`);
      return response.json();
    })
    .then((body: { stargazers_count: number }) => body.stargazers_count)
    .catch((error: Error) => {
      console.warn(`Star count unavailable: ${error.message}`);
      return null;
    });
  return stars;
}

function Count() {
  const count = use(fetchStars());
  if (count === null) return null;
  return <span className="star-count">{count.toLocaleString("en-US")}</span>;
}

export function StarCount() {
  return (
    <Suspense fallback={null}>
      <Count />
    </Suspense>
  );
}

export function StarButton({
  location,
  label = "Star on GitHub",
  icon = "star",
  children,
}: {
  location: "header" | "hero" | "build" | "download";
  label?: string;
  icon?: "star" | "github";
  children?: ReactNode;
}) {
  return (
    <a
      className="star-button"
      href={links.repo}
      onClick={() => trackStar(location)}
    >
      {icon === "github" ? <GitHubIcon /> : <StarIcon />}
      {label}
      {children}
    </a>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true">
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      className="github-icon"
      viewBox="0 0 24 24"
      width={16}
      height={16}
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
