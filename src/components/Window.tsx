import type { ReactNode } from "react";

export function Window({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`window ${className}`}>
      <div className="titlebar">
        <span className="lights" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        {title}
      </div>
      {children}
    </div>
  );
}
