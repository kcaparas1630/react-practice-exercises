# 10. The same feature with Context

Shared state, about 15 minutes.

## Task

Same feature. Now the list and the panel are far apart in the tree, with layout components between them. Share the selection without passing props through every layer.

## Files

- `Exercise.tsx`: **edit this.**
- `given.ts`: types, sample data and fakes. Do not edit.
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **10. The same feature with Context** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] A `SelectionProvider` component and a `useSelection()` hook.
- [ ] The hook throws a clear error when used outside the provider.
- [ ] The panel has a Clear selection button.

## Check your work

- [ ] Click a fire: the panel shows it and the button in the list is marked.
- [ ] Clear selection returns the prompt.
- [ ] Render a component that calls useSelection() outside the provider: it throws your error message.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- Context only delivers a value down the tree. The state itself is still `useState`, inside the provider.
- The custom hook hides the context object and gives one place for the missing-provider error.
- I memoise the value so consumers do not re-render when the provider's parent re-renders for another reason.
- Every consumer re-renders when the selection changes. That is fine here, because it changes on a click, not continuously.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **What is the cost of Context?** Any change to the value re-renders every component that reads it. There are no selectors to subscribe to one part.
- **Is there a newer way to write the provider?** In React 19 you can render `<SelectionContext value={...}>` directly. `.Provider` still works.
- **Would you put the fires list in this context too?** No. Data from the server belongs in a query cache. Keep a context small and about one thing.

</details>

## Reference solution

`src/solutions/10-context.tsx`. Open it only after your own attempt.
