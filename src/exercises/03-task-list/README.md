# 3. Task list

Take-home size, about 15 minutes.

## Task

Build a task list. I can add a task, mark it done, delete it, and filter by all, open or done.

## Files

- `Exercise.tsx`: **edit this.**
- `given.ts`: types, sample data and fakes. Do not edit.
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **3. Task list** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] Pressing Enter adds the task and clears the input.
- [ ] Empty or whitespace-only tasks are not added.
- [ ] Show how many tasks are still open.
- [ ] Show a message when the filtered list is empty.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- Three pieces of state: the list, the input text and the filter. The visible list and the open count are derived, so I calculate them during render.
- Each task gets a stable id for its key. An index key breaks as soon as I delete a row.
- I use a `form` so Enter works without a key handler.
- Every update builds a new array with `map` or `filter`. Nothing is mutated.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **Where would the id come from in a real app?** From the server, or `crypto.randomUUID()` on the client. A module counter is fine for an exercise.
- **How would you keep the list after a refresh?** Read from `localStorage` in a lazy initial state function and write in an effect when the list changes, both inside try/catch.
- **How would you add editing a task in place?** One more piece of state, the id being edited, and a controlled input for that row.

</details>

## Reference solution

`src/solutions/03-task-list.tsx`. Open it only after your own attempt.
