# 21. A polling hook

Live session, about 25 minutes.

## Task

Write a `usePolling` hook that calls a loader now and then every N milliseconds. Use it to show a live count of active fires.

## Files

- `Exercise.tsx`: **edit this.**
- `given.ts`: types, sample data and fakes. Do not edit.
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **21. A polling hook** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] Load immediately, then on every interval.
- [ ] If a refresh fails, keep showing the last good data and add a warning.
- [ ] Show the time of the last successful update.
- [ ] Stop when the component unmounts.
- [ ] A parent that passes a new loader function on every render must not restart the timer.

## Check your work

- [ ] A count appears within a second and changes every three seconds.
- [ ] Every third refresh fails: the last count stays on screen with a warning, then recovers.
- [ ] The last update time only changes on a successful refresh.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- The interval lives in an effect and the cleanup clears it.
- A `cancelled` flag stops a response that arrives after unmount from setting state.
- The latest loader is kept in a ref, so the effect depends only on the interval length.
- On failure I keep the old data. For someone in the field, slightly old data with a timestamp is more useful than an empty screen.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **Why the ref?** Putting `load` in the dependency array restarts the interval whenever the parent passes an inline function. Leaving it out reads a stale function. The ref avoids both. From React 19.2, `useEffectEvent` does the same job.
- **What if a request takes longer than the interval?** Calls overlap. Switch to a `setTimeout` that schedules the next call only after the current one finishes.
- **How would you pause while the tab is hidden?** Listen for `visibilitychange` and skip or stop ticks while `document.hidden` is true.
- **How would you show "updated 40 seconds ago"?** A separate one-second ticker in state, so the label re-renders without refetching.

</details>

## Reference solution

`src/solutions/21-use-polling.tsx`. Open it only after your own attempt.
