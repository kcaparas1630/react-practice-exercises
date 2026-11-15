// DO NOT EDIT. Renders your code inside the practice app.

import { useMemo, useState } from "react";
import type * as Exercise from "./Exercise";

export default function Demo({ mod }: { mod: typeof Exercise }) {
  const [fired, setFired] = useState<string[]>([]);
  const record = useMemo(
    () => mod.debounce((text: string) => setFired(prev => [...prev, text]), 300),
    [mod]
  );
  return (
    <div>
      <input aria-label="Type here" placeholder="Type here" onChange={e => record(e.target.value)} />
      <button onClick={() => record.cancel()}>Cancel pending call</button>
      <p>fn was called {fired.length} times:</p>
      <pre>{fired.join("\n")}</pre>
      <p>Check it with: npm test 08</p>
    </div>
  );
}
