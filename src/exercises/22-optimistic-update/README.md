# 22. Optimistic update with rollback

Live session, about 20 minutes.

## Task

A crew lead ticks a hotspot as confirmed. On a weak connection the save takes a second. Make the tick appear immediately and undo it if the save fails.

## Files

- `Exercise.tsx`: **edit this.**
- `given.ts`: types, sample data and fakes. Do not edit.
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **22. Optimistic update with rollback** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] The checkbox changes at once.
- [ ] While a row is saving it is disabled and marked.
- [ ] If the save fails, the tick is reverted and a message appears.
- [ ] Other rows stay usable during a save.

## Check your work

- [ ] Tick a box: it changes at once, then shows it is saving for a second.
- [ ] About one save in three fails: the tick reverts and a message appears.
- [ ] While one row is saving, the other rows can still be ticked.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- Three steps: change the screen, save, put it back if the save fails.
- I track saving per row in a set. One global flag would lock the whole list.
- The rollback uses the updater form, so changes made to other rows in the meantime are kept.
- Disabling the row while it saves prevents two overlapping saves for the same hotspot.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **Is there a built-in for this?** React 19 has `useOptimistic`. It shows a temporary value during an Action and drops it when the Action finishes.
- **What if the user could toggle twice quickly?** Responses can arrive out of order. Queue saves per row, or send only the latest and ignore older responses.
- **When should you not be optimistic?** When showing a wrong result is costly or the action cannot be undone, such as a payment or a delete.

</details>

## Reference solution

`src/solutions/22-optimistic-update.tsx`. Open it only after your own attempt.
