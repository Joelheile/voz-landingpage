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
  children,
}: {
  location: "header" | "hero" | "build" | "download";
  label?: string;
  children?: ReactNode;
}) {
  return (
    <a
      className="star-button"
      href={links.repo}
      onClick={() => trackStar(location)}
    >
      <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true">
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
      </svg>
      {label}
      {children}
    </a>
  );
}
