# 9. Shared selection by lifting state

Shared state, about 10 minutes.

## Task

Show a list of fires and a detail panel. Clicking a fire in the list shows its details in the panel. The list and the panel are separate components.

## Files

- `Exercise.tsx`: **edit this.**
- `given.ts`: types, sample data and fakes. Do not edit.
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **9. Shared selection by lifting state** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] The selected fire is marked in the list.
- [ ] The panel shows a prompt when nothing is selected.
- [ ] No Context and no store. Props only.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- Two components need the same fact, so the state moves to their nearest common parent.
- I store the selected id and look the fire up during render. Storing the object would leave a stale copy if the list refreshes.
- The list gets the id and a callback. The panel gets the fire. Neither owns the state.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **When does this stop working well?** When the value has to pass through several components that do not use it. That is prop drilling, and it is the cue for Context.
- **Is prop drilling always bad?** No. Two or three levels of explicit props are easier to follow than a context. Do not reach for Context early.

</details>

## Reference solution

`src/solutions/09-lift-state.tsx`. Open it only after your own attempt.
