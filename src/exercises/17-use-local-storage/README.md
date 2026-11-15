# 17. A useLocalStorage hook

Take-home size, about 15 minutes.

## Task

Write a `useLocalStorage(key, initial)` hook that works like `useState` but remembers the value after a refresh. Use it for a metric or imperial units toggle.

## Files

- `Exercise.tsx`: **edit this.**
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **17. A useLocalStorage hook** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] The saved value is read on the first render.
- [ ] Every change is saved.
- [ ] It does not crash if storage is blocked or holds invalid JSON.

## Check your work

- [ ] Switch to imperial, refresh the page: it is still imperial.
- [ ] In the console run localStorage.setItem("units", "{not json") and refresh: the page still loads, in metric.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- The initial state is a function, so storage is read once and not on every render.
- Writing to storage is syncing with something outside React, which is what an effect is for.
- Both the read and the write are in try/catch. Storage can be blocked, full or hold bad data.
- `as const` makes the return type a pair, like `useState`.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **How would you keep two tabs in sync?** Listen for the `storage` event, which fires in other tabs when a value changes.
- **What breaks with server rendering?** `localStorage` does not exist on the server. Start from the initial value and read storage in an effect after mount.

</details>

## Reference solution

`src/solutions/17-use-local-storage.tsx`. Open it only after your own attempt.
