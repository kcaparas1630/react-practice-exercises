// DO NOT EDIT. Renders your code inside the practice app.

import { useMemo } from "react";
import type * as Exercise from "./Exercise";
import { FIRES } from "./given";

export default function Demo({ mod }: { mod: typeof Exercise }) {
  const Impl = mod.default;
  const store = useMemo(() => {
    const s = mod.makeStore();
    s.dispatch(mod.firesLoaded(FIRES));
    return s;
  }, [mod]);
  return <Impl store={store} />;
}
