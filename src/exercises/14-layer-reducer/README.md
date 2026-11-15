# 14. Map layer panel with a reducer

Take-home size, about 15 minutes.

## Task

Build the layer panel for a map. Each layer can be shown or hidden and has an opacity slider. Add a Reset button.

## Files

- `Exercise.tsx`: **edit this.**
- `given.ts`: types, sample data and fakes. Do not edit.
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **14. Map layer panel with a reducer** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] Use `useReducer`.
- [ ] A layer's slider is disabled while the layer is hidden.
- [ ] Show "X of Y layers visible".
- [ ] Reset returns every layer to its starting values.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- Several different actions change one piece of state, so a reducer keeps every update in one pure function.
- The actions are a union type. TypeScript checks that each one carries the right data.
- The `never` line turns a forgotten action type into a compile error.
- The reducer returns new arrays and objects. It never changes the old ones.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **When `useState`, when `useReducer`?** `useState` for simple independent values. A reducer when several handlers update the same object or the next state depends on the previous one in several ways.
- **How is this related to Redux?** It is the same idea, a reducer and actions, kept inside one component. Redux moves it into a global store with tooling.
- **How would you test it?** Call the reducer with a state and an action and check the result. No React needed.

</details>

## Reference solution

`src/solutions/14-layer-reducer.tsx`. Open it only after your own attempt.
