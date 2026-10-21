export type IndicatorState = "hidden" | "recording" | "transcribing" | "done";

const clock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

export function NotchIndicator({
  state,
  seconds,
}: {
  state: IndicatorState;
  seconds: number;
}) {
  return (
    <div className="notch" data-state={state}>
      <span className="wing leading">
        <span className="timer">{clock(seconds)}</span>
      </span>
      <span className="wing trailing">
        <span className="level-bars">
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="progress-dots">
          <i />
          <i />
          <i />
        </span>
        <svg className="check" viewBox="0 0 16 16">
          <path d="M3.5 8.5l3 3 6-7" />
        </svg>
      </span>
    </div>
  );
}
