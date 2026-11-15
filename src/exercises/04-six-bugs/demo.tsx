// DO NOT EDIT. Renders your code inside the practice app.

import { useState } from "react";
import type * as Exercise from "./Exercise";
import { FIRES } from "./given";

export default function Demo({ mod }: { mod: typeof Exercise }) {
  const Impl = mod.default;
  // A fresh copy each time, so a bug that mutates the list cannot damage the sample data.
  const [fires] = useState(() => FIRES.map(f => ({ ...f })));
  return <Impl fires={fires} />;
}
