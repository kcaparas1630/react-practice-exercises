// EDIT THIS FILE. The instructions are in README.md, in this folder.

import { configureStore } from "@reduxjs/toolkit";
import type { Fire } from "./given";

// TODO:
//   1. createSlice named "fires" with state { items, selectedId } and two reducers:
//      firesLoaded(Fire[]) and fireSelected(string | null). Export both actions.
//   2. makeStore() returns configureStore with that slice.
//   3. Typed useAppSelector and useAppDispatch hooks.
//   4. FireList and FireDetail read from the store. The selected fire comes from a selector.
//
// The demo calls makeStore(), dispatches firesLoaded(FIRES), and renders <FireBrowser store={store} />.

export const firesLoaded = (fires: Fire[]) => ({ type: "fires/firesLoaded", payload: fires });

export function makeStore() {
  return configureStore({ reducer: (state: object = {}) => state });
}

type AppStore = ReturnType<typeof makeStore>;

export default function FireBrowser({ store }: { store: AppStore }) {
  return <p>Not built yet. The store has {Object.keys(store.getState()).length} keys.</p>;
}
