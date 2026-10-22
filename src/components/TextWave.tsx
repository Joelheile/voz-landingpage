import { mountTextWave } from "../text-wave";

export function TextWave() {
  return (
    <div className="text-wave">
      <canvas
        ref={mountTextWave}
        role="img"
        aria-label="ASCII art of a voice waveform moving through a field of dictated phrases, lighting up the words it passes"
      />
    </div>
  );
}
