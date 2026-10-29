import { useRef, useState } from "react";
import { trackVideoSound } from "../analytics";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function LaunchVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function toggleSound() {
    const element = video.current;
    if (!element) return;
    element.muted = !muted;
    if (muted) {
      element.currentTime = 0;
      void element.play();
    }
    setMuted(!muted);
    trackVideoSound(muted ? "on" : "off");
  }

  return (
    <div className="launch-video">
      <video
        ref={video}
        src="/launch.mp4"
        poster="/launch.jpg"
        width={1920}
        height={1080}
        autoPlay={!reducedMotion}
        controls={reducedMotion}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Voz launch video: Voz beside Wispr Flow, dictation cleaned in real time, and a coding agent writing a missing feature as an extension."
      />
      {!reducedMotion && (
        <button type="button" className="sound-toggle" onClick={toggleSound} aria-pressed={!muted}>
          <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true">
            <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
            {muted ? <path d="m22 9-6 6M16 9l6 6" /> : <path d="M16 9a5 5 0 0 1 0 6M19.364 18.364a9 9 0 0 0 0-12.728" />}
          </svg>
          {muted ? "Sound on" : "Sound off"}
        </button>
      )}
    </div>
  );
}
