# 11. Stop a list re-rendering on every keystroke

Live session, about 15 minutes.

## Task

Typing in the note field re-renders every hotspot row. With a few hundred rows it lags. Stop the rows re-rendering when only the note changes.

## Files

- `Exercise.tsx`: **edit this.** It already contains working code with a problem to fix.
- `given.ts`: types, sample data and fakes. Do not edit.
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **11. Stop a list re-rendering on every keystroke** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] Typing a note re-renders no rows.
- [ ] Ticking one row re-renders only that row.

## Check your work

- [ ] Open the browser console and clear it. Type in the note field: no "row rendered" lines appear.
- [ ] Tick one row: "row rendered" appears for that row only. In development each render logs twice, because Strict Mode renders twice.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- The note is state in the parent. When it changes, the parent re-renders and so does every child.
- The simplest fix is to move the note input into its own component, so its state never touches the list. I would say that first.
- To fix it in place, I wrap the row in `memo` so it skips rendering when its props are unchanged.
- `memo` alone is not enough. The inline arrow is a new function on every render, so I pass one stable function from `useCallback` and let the row call it with its id.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **Why can `useCallback` have an empty dependency array here?** The function uses the updater form of the setter, so it reads nothing from the render it was created in.
- **How do you prove it worked?** Record a keystroke in the React DevTools Profiler and check that the rows did not render.
- **Does React Compiler change this?** It adds this memoisation at build time. You still need to understand it to read a profile or work in a project without it.
- **When is `memo` not worth it?** When the component is cheap, or its props change on every render anyway.

</details>

## Reference solution

`src/solutions/11-memo-rows.tsx`. Open it only after your own attempt.
