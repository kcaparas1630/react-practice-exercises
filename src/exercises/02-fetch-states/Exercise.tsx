// EDIT THIS FILE. The instructions are in README.md, in this folder.

import { useState, useEffect } from "react";
import { REGIONS, type Fire } from "./given";

export default function FirePanel() {
  // TODO: a <select> of REGIONS, then fetch `/api/fires?region=${region}` and show every state
  const [region, setRegion] = useState<string>("kamloops");
  const [state, setState] = useState<FetchState>({status:"loading"});
  const [attempt, setAttempt] = useState<number>(0);

  type FetchState =
    | { status: "loading" }
    | { status: "error", message: string }
    | { status: "success", fires: Fire[] }

  useEffect(() => {
    const controller = new AbortController();
    const fetchedFireData = async () => {
      try {
        setState({ status: "loading"})
        const res = await fetch(`api/fires?region=${region}`, { signal: controller.signal })
        if (!res.ok) throw new Error(`Request failed ${res.status}`)
        const fetchedData = await res.json();
        setState({ status:"success", fires:fetchedData })
      }
      catch (error: unknown) {
        if (controller.signal.aborted) return;
        setState({ status: "error", message: `Could not load fires: ${error}`})
      }
    }
    fetchedFireData();
    return () => controller.abort();
  }, [region, attempt])

  function renderContent() {
    switch (state.status) {
      case "loading":
        return <p>Loading fires...</p>
      case "error":
        return (
          <div role="alert" >
            <p>{state.message}</p>
            <button
              type="button"
              onClick={() => setAttempt(() => attempt + 1)}>
              Try Again
              </button>
          </div>
        )
      case "success":
        if (state.fires.length === 0) return <p>No active fires in this region</p>
        return (
          <ul>
            {state.fires.map((fires) => (
              <li key={fires.id}>{fires.name}, {fires.sizeHa}</li>
            ))}
         </ul>
        )
    }
  }
  return (
    <div>
      <select
        name="Regions"
        onChange={event => setRegion(event.target.value)}
      >
        {REGIONS.map((region) => (
          <option value={region}>{region}</option>
        ))}
      </select>
      {renderContent()}
    </div>


  )
}
