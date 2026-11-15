// DO NOT EDIT. Renders your code inside the practice app.

import { useState } from "react";
import type * as Exercise from "./Exercise";
import type { Annotation } from "./given";

export default function Demo({ mod }: { mod: typeof Exercise }) {
  const Impl = mod.default;
  const [added, setAdded] = useState<Annotation[]>([]);
  return (
    <div>
      <Impl onAdd={a => setAdded(prev => [...prev, a])} />
      <h3>Received by onAdd</h3>
      <pre>{JSON.stringify(added, null, 2)}</pre>
    </div>
  );
}
