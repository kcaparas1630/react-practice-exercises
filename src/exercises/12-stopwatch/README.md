# 12. Stopwatch

Take-home size, about 15 minutes.

## Task

Build a stopwatch with Start, Pause and Reset. Show minutes, seconds and tenths of a second.

## Files

- `Exercise.tsx`: **edit this.**
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **12. Stopwatch** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] Pause then Start continues from the same time.
- [ ] Reset stops it and returns to zero.
- [ ] The timer is cleared when the component unmounts.
- [ ] It stays accurate over several minutes.

## Check your work

- [ ] Start, wait, Pause, wait, Start: the time continues from where it paused.
- [ ] Reset stops it and shows 00:00.0.
- [ ] Start it, then switch to another exercise: no timer is left running.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- State is what the screen shows: elapsed time and whether it is running.
- The start timestamp is never displayed, so it goes in a ref.
- The interval exists only while running. The effect depends on `running` and its cleanup clears the interval.
- I calculate elapsed time from the clock. Adding 100 on every tick drifts, because ticks can arrive late.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **Why does counting ticks drift?** `setInterval` is a minimum delay, and browsers slow timers in background tabs. The clock does not have that problem.
- **How would you add lap times?** An array in state. Each lap appends the current elapsed time.
- **How would you make the display smoother?** `requestAnimationFrame` in place of the interval.

</details>

## Reference solution

`src/solutions/12-stopwatch.tsx`. Open it only after your own attempt.
