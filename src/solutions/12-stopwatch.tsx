// Reference solution for exercise 12. Open it only after your own attempt.

import { useEffect, useRef, useState } from "react";

function format(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  const tenths = Math.floor((ms % 1000) / 100);
  return `${minutes}:${seconds}.${tenths}`;
}

export function Stopwatch() {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [running, setRunning] = useState(false);
  // The clock time that counts as zero. Not shown, so a ref.
  const startedAt = useRef(0);

  useEffect(() => {
    if (!running) return;
    // Measure from the clock. Counting ticks drifts, because
    // setInterval is not guaranteed to fire on time.
    const id = setInterval(() => setElapsedMs(Date.now() - startedAt.current), 100);
    return () => clearInterval(id);
  }, [running]);

  function start() {
    startedAt.current = Date.now() - elapsedMs; // resume from where it stopped
    setRunning(true);
  }

  function pause() {
    setElapsedMs(Date.now() - startedAt.current);
    setRunning(false);
  }

  function reset() {
    setRunning(false);
    setElapsedMs(0);
  }

  return (
    <div>
      <p aria-label="Elapsed time">{format(elapsedMs)}</p>
      {running ? <button onClick={pause}>Pause</button> : <button onClick={start}>Start</button>}
      <button onClick={reset} disabled={elapsedMs === 0}>
        Reset
      </button>
    </div>
  );
}

export default Stopwatch;
