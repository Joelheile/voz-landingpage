import type { ReactNode } from "react";

export function Panel({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="panel" role="img" aria-label={label}>
      <div aria-hidden="true">{children}</div>
    </div>
  );
}

export function PageBar({ title }: { title: string }) {
  return (
    <div className="page-bar">
      <svg viewBox="0 0 16 16">
        <path d="M10 3.5 5.5 8l4.5 4.5" />
      </svg>
      {title}
    </div>
  );
}
