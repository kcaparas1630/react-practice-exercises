// DO NOT EDIT. Renders your code inside the practice app.

import type * as Exercise from "./Exercise";
import { HOTSPOTS } from "./given";

export default function Demo({ mod }: { mod: typeof Exercise }) {
  const Impl = mod.default;
  return <Impl hotspots={HOTSPOTS} />;
}
