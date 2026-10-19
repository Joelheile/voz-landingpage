import { useInView } from "../hooks/useInView";
import { useTicks } from "../hooks/useTicks";

const stages = [
  "voice",
  "record",
  "transcribe",
  "clean up",
  "insert",
  "cursor",
];
const hooks = [
  { stage: "cursor", name: "afterInsert" },
  { stage: "insert", name: "beforeInsert" },
  { stage: "clean up", name: "beforeCleanup" },
  { stage: "record", name: "recording" },
];

const flow = stages.join(" ──▶ ");
const column = (stage: string) =>
  flow.indexOf(stage) + Math.floor(stage.length / 2);

function hookRows() {
  const columns = hooks.map((hook) => column(hook.stage));
  const width = Math.max(...columns) + 16;
  const row = (marks: number[], label?: { at: number; text: string }) => {
    const chars = Array.from({ length: width }, () => " ");
    marks.forEach((at) => (chars[at] = "│"));
    if (label)
      [...("└─ " + label.text)].forEach(
        (char, i) => (chars[label.at + i] = char),
      );
    return chars.join("").trimEnd();
  };
  return [
    row(columns),
    ...hooks.map((hook, i) =>
      row(columns.slice(i + 1), { at: columns[i], text: hook.name }),
    ),
  ];
}

const lines = [flow, ...hookRows()];
const length = Math.max(...lines.map((line) => line.length)) + 24;

export function Pipeline() {
  const [ref, inView] = useInView<HTMLPreElement>();
  const cursor = useTicks({
    running: inView,
    interval: 45,
    length,
    loop: false,
  });

  return (
    <pre
      ref={ref}
      className="ascii pipeline"
      aria-label="voice, record, transcribe, clean up, insert, cursor. Extensions hook in at recording, beforeCleanup, beforeInsert and afterInsert."
    >
      {lines.map((line, i) => (
        <span key={i} aria-hidden="true">
          <span className="lit">{line.slice(0, cursor + 1)}</span>
          {line.slice(cursor + 1)}
          {"\n"}
        </span>
      ))}
    </pre>
  );
}
