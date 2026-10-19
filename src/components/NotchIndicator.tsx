export type IndicatorState = "hidden" | "recording" | "transcribing" | "done";

export function NotchIndicator({ state }: { state: IndicatorState }) {
  return (
    <div className="notch" data-state={state}>
      <span className="wing leading">
        <span className="rec-dot" />
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
