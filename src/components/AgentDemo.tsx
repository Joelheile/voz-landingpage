import { useInView } from "../hooks/useInView";
import { useTicks } from "../hooks/useTicks";
import { Window } from "./Window";

const ask = 'add a voice command: when I say "send it", press return';
const code =
  'voz.registerCommand("send it",\n  (event, ctx) => ctx.press("return"));';

const typed = (text: string, t: number, from: number, perTick: number) =>
  text.slice(0, Math.max(0, (t - from) * perTick));

export function AgentDemo() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const t = useTicks({
    running: inView,
    interval: 40,
    length: 80,
    loop: false,
  });

  return (
    <div ref={ref}>
      <Window title="~/.voz" className="terminal">
        <pre>
          <span className="muted">&gt; </span>
          {typed(ask, t, 0, 2)}
          {"\n\n"}
          <span className={t >= 36 ? "line in muted" : "line"}>
            Reading ~/.voz/AGENTS.md
          </span>
          {"\n"}
          <span className={t >= 44 ? "line in" : "line"}>
            Created ~/.voz/extensions/send-it.ts
          </span>
        </pre>
        <pre className={t >= 48 ? "snippet in" : "snippet"}>
          {typed(code, t, 50, 3)}
        </pre>
      </Window>
    </div>
  );
}
