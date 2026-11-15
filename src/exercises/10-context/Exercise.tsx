// EDIT THIS FILE. The instructions are in README.md, in this folder.

import type { Fire } from "./given";

// TODO:
//   1. SelectionProvider: owns the selected id and provides it through Context.
//   2. useSelection(): returns { selectedId, select }. Throws a clear error outside the provider.
//   3. FireList and FireDetail read the selection with useSelection(). No selection props.

export default function FireBrowser({ fires }: { fires: Fire[] }) {
  return <p>Not built yet. {fires.length} fires were passed in.</p>;
}
