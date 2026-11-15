// Reference solution for exercise 21. Open it only after your own attempt.

import { useEffect, useRef, useState } from "react";

export function usePolling<T>(load: () => Promise<T>, intervalMs: number) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  // Keep the latest load function without restarting the interval
  // every time the parent passes a new function.
  const loadRef = useRef(load);
  useEffect(() => {
    loadRef.current = load;
  });

  useEffect(() => {
    let cancelled = false;

    async function tick() {
      try {
        const result = await loadRef.current();
        if (cancelled) return;
        setData(result);
        setError(null);
        setUpdatedAt(new Date());
      } catch (err) {
        if (cancelled) return;
        // Keep the last good data on screen. Only record the error.
        setError(err instanceof Error ? err.message : "Could not refresh");
      }
    }

    tick(); // load immediately, then on every interval
    const id = setInterval(tick, intervalMs);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [intervalMs]);

  return { data, error, updatedAt };
}

type Fire = { id: string; name: string };

export function LiveFireCount({ loadFires }: { loadFires: () => Promise<Fire[]> }) {
  const { data, error, updatedAt } = usePolling(loadFires, 3_000);

  if (data === null && error === null) return <p>Loading…</p>;

  return (
    <div>
      {data !== null && <p>{data.length} active fires</p>}
      {updatedAt && <p>Last updated {updatedAt.toLocaleTimeString()}</p>}
      {error && <p role="alert">Refresh failed: {error}. Showing the last good data.</p>}
    </div>
  );
}

export default LiveFireCount;
