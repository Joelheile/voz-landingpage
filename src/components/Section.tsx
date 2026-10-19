import type { ReactNode } from "react";
import { useInView } from "../hooks/useInView";

export function Section({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section ref={ref} className={`section ${className}`} data-inview={inView}>
      {children}
    </section>
  );
}
