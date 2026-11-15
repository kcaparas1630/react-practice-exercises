// Reference solution for exercise 18. Open it only after your own attempt.

import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";

type Fire = { id: string; name: string; sizeHa: number; status: string };
type FiresState = { items: Fire[]; selectedId: string | null };

const initialState: FiresState = { items: [], selectedId: null };

const firesSlice = createSlice({
  name: "fires",
  initialState,
  reducers: {
    // These look like mutations. Redux Toolkit runs them through Immer,
    // which produces a new immutable state.
    firesLoaded(state, action: PayloadAction<Fire[]>) {
      state.items = action.payload;
    },
    fireSelected(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload;
    },
  },
});

export const { firesLoaded, fireSelected } = firesSlice.actions;

export function makeStore() {
  return configureStore({ reducer: { fires: firesSlice.reducer } });
}

type AppStore = ReturnType<typeof makeStore>;
type RootState = ReturnType<AppStore["getState"]>;
type AppDispatch = AppStore["dispatch"];

// Typed once here, so components never repeat the types.
const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

// Selector: derived data lives here, not in the store.
const selectSelectedFire = (state: RootState) =>
  state.fires.items.find(f => f.id === state.fires.selectedId) ?? null;

function FireList() {
  const fires = useAppSelector(state => state.fires.items);
  const selectedId = useAppSelector(state => state.fires.selectedId);
  const dispatch = useAppDispatch();
  return (
    <ul>
      {fires.map(f => (
        <li key={f.id}>
          <button
            aria-pressed={f.id === selectedId}
            onClick={() => dispatch(fireSelected(f.id))}
          >
            {f.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

function FireDetail() {
  const fire = useAppSelector(selectSelectedFire);
  const dispatch = useAppDispatch();
  if (!fire) return <p>Select a fire to see details.</p>;
  return (
    <section>
      <h2>{fire.name}</h2>
      <p>
        {fire.sizeHa} ha, {fire.status}
      </p>
      <button onClick={() => dispatch(fireSelected(null))}>Clear selection</button>
    </section>
  );
}

export function FireBrowser({ store }: { store: AppStore }) {
  return (
    <Provider store={store}>
      <FireList />
      <FireDetail />
    </Provider>
  );
}

// Usage:
// const store = makeStore();
// store.dispatch(firesLoaded(fires));
// <FireBrowser store={store} />

export default FireBrowser;
