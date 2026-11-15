// Reference solution for exercise 02. Open it only after your own attempt.

import { useEffect, useState } from "react";

type Fire = { id: string; name: string; sizeHa: number };

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; fires: Fire[] };

const REGIONS = ["kamloops", "cariboo", "coastal", "northwest"];

export function FirePanel() {
  const [region, setRegion] = useState("kamloops");
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/fires?region=${region}`, { signal: controller.signal })
      .then(res => {
        // fetch only rejects on network failure. A 500 still resolves.
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json() as Promise<Fire[]>;
      })
      .then(fires => setState({ status: "success", fires }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return; // a newer request replaced this one
        setState({
          status: "error",
          message: err instanceof Error ? err.message : "Something went wrong",
        });
      });

    // Runs before the next effect and on unmount, so a slow old
    // response can never overwrite a newer one.
    return () => controller.abort();
  }, [region, attempt]);

  function changeRegion(next: string) {
    setRegion(next);
    setState({ status: "loading" });
  }

  function retry() {
    setAttempt(a => a + 1);
    setState({ status: "loading" });
  }

  return (
    <div>
      <label>
        Region
        <select value={region} onChange={e => changeRegion(e.target.value)}>
          {REGIONS.map(r => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      {state.status === "loading" && <p>Loading fires…</p>}

      {state.status === "error" && (
        <div role="alert">
          <p>Could not load fires: {state.message}</p>
          <button onClick={retry}>Try again</button>
        </div>
      )}

      {state.status === "success" && state.fires.length === 0 && (
        <p>No active fires in this region.</p>
      )}

      {state.status === "success" && state.fires.length > 0 && (
        <ul>
          {state.fires.map(f => (
            <li key={f.id}>
              {f.name}, {f.sizeHa} ha
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FirePanel;
