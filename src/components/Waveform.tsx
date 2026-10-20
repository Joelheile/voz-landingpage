const bars = 32;

function level(t: number, bar: number) {
  const edge = Math.sin(((bar + 0.5) / bars) * Math.PI);
  const wobble = Math.abs(Math.sin(t * 1.9 + bar * 0.83) * Math.cos(t * 0.7 + bar * 0.37));
  return 0.15 + 0.85 * edge * wobble;
}

export function Waveform({
  t,
  recording,
  speaking,
}: {
  t: number;
  recording: boolean;
  speaking: boolean;
}) {
  return (
    <div className="waveform" data-recording={recording}>
      {Array.from({ length: bars }, (_, bar) => (
        <i
          key={bar}
          style={{ transform: `scaleY(${speaking ? level(t, bar) : 0.08})` }}
        />
      ))}
    </div>
  );
}
