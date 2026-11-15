# 7. Debounced search

Take-home size, about 15 minutes.

## Task

Filter this list of place names as I type, but wait until I have stopped typing for 300 ms.

## Files

- `Exercise.tsx`: **edit this.**
- `given.ts`: types, sample data and fakes. Do not edit.
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **7. Debounced search** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] Write a reusable `useDebouncedValue(value, delayMs)` hook.
- [ ] The input must stay responsive while typing.
- [ ] An empty query shows no results.
- [ ] Show a message when nothing matches.

## Check your work

- [ ] Type "k" quickly followed by "a": the list updates once, about 300 ms after you stop.
- [ ] The input itself never lags.
- [ ] Clear the input: no results are shown.
- [ ] Type "zzz": a no-match message appears.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- There are two values. The raw query drives the input so typing never lags. The debounced copy drives the filter.
- The hook sets a timer in an effect. The cleanup clears it, so each keystroke cancels the last timer.
- The hook is generic, so it works for any value type.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **Debounce or throttle?** Debounce waits for a pause, which suits search. Throttle runs at most once per interval, which suits continuous events such as map movement.
- **Why not debounce the change handler?** You can, but the debounced function must be the same one across renders. Created inline, every render makes a new one with its own timer.
- **What if the filter called an API?** Then stale responses must also be cancelled, as in the fetch task.

</details>

## Reference solution

`src/solutions/07-debounced-search.tsx`. Open it only after your own attempt.
