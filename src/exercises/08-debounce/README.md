# 8. Implement debounce

Plain TypeScript, about 10 minutes.

## Task

Implement `debounce(fn, waitMs)`. It returns a function that calls `fn` only after it has not been called for `waitMs`.

## Files

- `Exercise.ts`: **edit this.**
- `demo.tsx`: renders your code in the app. Do not edit.
- `exercise.test.ts`: checks your code. Run `npm test 08`. Do not edit.

In the app, open **8. Implement debounce** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] The arguments of the last call are the ones used.
- [ ] The returned function has a `cancel()` method.

## Check your work

- [ ] Run `npm test 08`. It passes.
- [ ] In the app, type "kam" quickly: fn is called once, with "kam".

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- A closure holds one timer id.
- Every call clears the pending timer and starts a new one.
- `cancel` clears the timer without calling `fn`.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **Add a leading-edge option.** Call `fn` straight away if no timer is pending, then ignore calls until the wait has passed.
- **How is throttle different?** Throttle lets one call through per interval no matter how many arrive. Debounce waits for silence.
- **Why `ReturnType<typeof setTimeout>`?** The timer id is a number in the browser and an object in Node. This type is right in both.

</details>

## Reference solution

`src/solutions/08-debounce.ts`. Open it only after your own attempt.
