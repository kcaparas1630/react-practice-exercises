// DO NOT EDIT. Renders your code inside the practice app.

import { useMemo, useState } from "react";
import { Provider } from "react-redux";
import type * as Exercise from "./Exercise";
import { REGIONS } from "./given";

export default function Demo({ mod }: { mod: typeof Exercise }) {
  const Impl = mod.default;
  const store = useMemo(() => mod.makeStore(), [mod]);
  const [region, setRegion] = useState<string>(REGIONS[0]);
  return (
    <Provider store={store}>
      <label>
        Region{" "}
        <select value={region} onChange={e => setRegion(e.target.value)}>
          {REGIONS.map(r => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>
      <Impl region={region} />
    </Provider>
  );
}
