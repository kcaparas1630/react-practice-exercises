// EDIT THIS FILE. The instructions are in README.md, in this folder.

import { useEffect, useState } from "react";
import { REGIONS, type Fire } from "./given";

type FetchStatus =
  | { state: "Loading"}
  | { state: "error", message: string }
  | { state: "success", fires: Fire[] }

export default function FirePanel() {
  const [fetchState, setFetchState] = useState<FetchStatus>({ state: "Loading" });
  const [region, setRegion] = useState<string>("kamloops");
  const [isAttempted, setIsAttempted] = useState<boolean>(false);

  useEffect(() => {
    setFetchState({ state: "Loading" });
    const controller = new AbortController();
    const fetchFireData = async () => {
      try {
        if (!region) return;
        const response = await fetch(`/api/fires?region=${region}`, { signal: controller.signal });
        if (!response.ok) throw new Error(`No fires: ${response.status}`);
        const data = await response.json();
        setFetchState({state:"success", fires: data})
      } catch (error: unknown) {
        setFetchState({ state: "error", message: `Something went wrong: ${error}` })
      } finally {
        if (controller.signal.aborted) {
          setFetchState({ state: "Loading" });
        }
      }
    }
    fetchFireData();
    return () => controller.abort();
  }, [region, isAttempted])

  function handleAttempt() {
    setIsAttempted(prev => !prev);
  }

  function renderContent() {
    if (fetchState.state === "Loading") {
      return <p>Loading...</p>
    }
    if (fetchState.state === "error") {
      return (
        <div>
          <p>Couldn't fetch fires</p>
          <button type="button" onClick={handleAttempt}>
            Try again
          </button>
        </div>
      )
    }
    if (fetchState.fires.length === 0) {
      return <p>No Fires in this area</p>
    }
    return (
      <ul>
        {fetchState.fires.map((fire) => (
          <li key={fire.id}>{fire.name},{fire.sizeHa}</li>
        ))}
      </ul>
    )
  }
  return (
    <div>
      <select
        value={region}
        onChange={e => setRegion(e.target.value)}
      >
        {REGIONS.map((region) => (
          <option value={region}>{region}</option>
        ))}
      </select>
      {renderContent()}
    </div>
  )
}
