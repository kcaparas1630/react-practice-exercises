// DO NOT EDIT. Renders your code inside the practice app.

import type * as Exercise from "./Exercise";
import { TABS } from "./given";

export default function Demo({ mod }: { mod: typeof Exercise }) {
  const Impl = mod.default;
  return <Impl tabs={TABS} />;
}
