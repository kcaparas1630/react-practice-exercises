// EDIT THIS FILE. The instructions are in README.md, in this folder.

import { useState, useEffect } from "react";
import { REGIONS, type Fire } from "./given";

export default function FirePanel() {
  // TODO: a <select> of REGIONS, then fetch `/api/fires?region=${region}` and show every state
  type FetchState = 
    | { state: "Loading" }
    | { state: "Error", message: string }
    | { state: "Success", fires: Fire[] }
  
  const [state, setState] = useState<FetchState>({ state: "Loading" });
  const [region, setRegion] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(0);
  
  useEffect(() => {
    const controller = new AbortController();
    setState({state: "Loading"})
    const fetchFireData = async () => {
      try {
        const fireData = await fetch(`/api/fires?region=${region}`, { signal: controller.signal});
        if (!fireData.ok) throw new Error(`Request Failed: ${fireData.status}`);
        setState({ state: "Success", fires: await fireData.json() });
      }
      catch (error: unknown) {
        if (controller.signal.aborted) return;
        setState({ state: "Error", message: `Could not load fires: ${error}` })
      }
    }
    fetchFireData();
  }, [region, attempts]);

  const renderContent = () => {
    switch (state.state) {
      case "Loading":
        return <p>Loading fires...</p>;
      case "Error":
        return (
          <div>
            <p>{state.message}</p>
            <button onClick={() => setAttempts((prev) => prev + 1)}>Try Again</button>
          </div>
        )
      case "Success":
        return (
          <div>
            <h2>Fires in {region}</h2>
            <ul>
              {state.fires.map((fire) => (
                <li key={fire.id}>{fire.name}</li>
              ))}
            </ul>
          </div>
        );
    }
  }
  return (
    <div>
      <label htmlFor="region-select">Select a region:</label>
      <select
        id="region-select"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      >
        <option value="">-- Select a region --</option>
        {REGIONS.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      {renderContent()}
    </div>
  )
}
