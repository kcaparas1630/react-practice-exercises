# 23. Undo and redo

Live session, about 25 minutes.

## Task

Add undo and redo to a list of map annotations. I can add an annotation, remove one, and step backwards and forwards through my changes.

## Files

- `Exercise.tsx`: **edit this.**
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **23. Undo and redo** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] A reusable `useHistory(initial)` hook.
- [ ] Undo and Redo are disabled when there is nothing to undo or redo.
- [ ] A new change after an undo clears the redo history.

## Check your work

- [ ] Add three labels, Undo twice, Redo once: two labels show.
- [ ] After an undo, add a new label: Redo becomes disabled.
- [ ] Undo and Redo are disabled when there is nothing to undo or redo.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- Three parts: the past states, the present one, and the future ones.
- A change pushes the present onto the past. Undo moves the present to the future. Redo does the opposite.
- Each action updates all three together, so a reducer fits.
- The hook is generic. It works for any value, not only this list.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **What about memory with a long history?** Cap the length of the past and drop the oldest entries.
- **What if the state is large?** Store the changes instead of full copies, for example Immer patches.
- **How would you add Ctrl+Z?** A `keydown` listener on the window in an effect, removed in the cleanup.

</details>

## Reference solution

`src/solutions/23-undo-redo.tsx`. Open it only after your own attempt.
