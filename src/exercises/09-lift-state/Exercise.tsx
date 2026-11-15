// EDIT THIS FILE. The instructions are in README.md, in this folder.

import type { Fire } from "./given";

// TODO: write FireList and FireDetail as two separate components.
// The state they share lives here, in their parent. Props only: no Context, no store.

export default function FireBrowser({ fires }: { fires: Fire[] }) {
  return <p>Not built yet. {fires.length} fires were passed in.</p>;
}
