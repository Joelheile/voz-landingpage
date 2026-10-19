import { useEffect, useState } from "react";

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useTicks({
  running,
  interval,
  length,
  loop,
}: {
  running: boolean;
  interval: number;
  length: number;
  loop: boolean;
}) {
  const [tick, setTick] = useState(0);
  const [still] = useState(reducedMotion);

  useEffect(() => {
    if (!running || still) return;
    const id = setInterval(() => {
      setTick((current) => {
        if (current < length - 1) return current + 1;
        return loop ? 0 : current;
      });
    }, interval);
    return () => clearInterval(id);
  }, [running, still, interval, length, loop]);

  return still ? length - 1 : tick;
}
