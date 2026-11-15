# 19. Fix a context that re-renders everything

Shared state, about 15 minutes.

## Task

This map provider works, but the zoom buttons re-render every time the mouse moves. Explain why, then fix it.

## Files

- `Exercise.tsx`: **edit this.** It already contains working code with a problem to fix.
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **19. Fix a context that re-renders everything** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] Moving the mouse must not re-render `ZoomButtons`.
- [ ] Keep the same three components.

## Check your work

- [ ] Move the mouse over the grey area: the "ZoomButtons rendered" count does not change.
- [ ] The coordinates still update as the mouse moves.
- [ ] Zoom in: the zoom number changes and the count goes up. In development it goes up by two, because Strict Mode renders twice.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- The context value is one object holding everything, and it is a new object on every render of the provider.
- The cursor changes on every mouse move, so every consumer gets a new value, including the zoom buttons that never read the cursor.
- I split it into two contexts by how often each part changes, and memoise each value.
- I export a hook per context so components do not touch the context objects.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **Would wrapping `ZoomButtons` in `memo` fix it?** No. `memo` only compares props. A context change re-renders the consumer anyway.
- **How do you confirm the fix?** React DevTools Profiler, or the highlight-updates setting, while moving the mouse.
- **What else could you do?** Keep the cursor out of React state, since it changes every frame: hold it in a ref and write to the DOM directly. Or use a store with selectors.

</details>

## Reference solution

`src/solutions/19-split-context.tsx`. Open it only after your own attempt.
