# 18. The same feature with Redux Toolkit

Shared state, about 20 minutes.

## Task

Same feature again, with Redux Toolkit. The fires and the selected id live in the store.

## Files

- `Exercise.tsx`: **edit this.**
- `given.ts`: types, sample data and fakes. Do not edit.
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **18. The same feature with Redux Toolkit** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] A slice with `firesLoaded` and `fireSelected` actions.
- [ ] Typed `useAppSelector` and `useAppDispatch` hooks.
- [ ] The selected fire comes from a selector. It is not stored a second time.
- [ ] The panel has a Clear selection button.

## Check your work

- [ ] Click a fire: the panel shows it and the button in the list is marked.
- [ ] Clear selection returns the prompt.
- [ ] Install the Redux DevTools browser extension: each click shows a fires/fireSelected action.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- A slice is the state, its reducers and the generated action creators in one place.
- The reducers look like they mutate. Immer turns that into a new immutable state.
- I store the minimum: the items and the selected id. The selected fire is derived in a selector.
- `useSelector` re-renders a component only when the value it selected changes. That is the main difference from Context.
- A `makeStore` function lets each test create a fresh store.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **What does Redux give you that Context does not?** Selectors, so components re-render only for the part they read. DevTools that list every action. Middleware. One predictable place where state changes.
- **When is Redux more than you need?** A small app, state that is local to one screen, or an app that is mostly server data. A query library plus local state covers that.
- **The selector calls `find` on every run. Is that a problem?** No. It returns the same object each time, so nothing re-renders. A selector that builds a new array or object should be memoised with `createSelector`.
- **Where would the request for the fires go?** RTK Query, as in the next task, or `createAsyncThunk` for a one-off.

</details>

## Reference solution

`src/solutions/18-redux-toolkit.tsx`. Open it only after your own attempt.
