# 6. Group and summarise hotspots

Plain TypeScript, about 10 minutes.

## Task

Group these hotspots into low, medium and high by temperature. For each group return the count, the total area and the id of the hottest one.

## Files

- `Exercise.ts`: **edit this.**
- `given.ts`: types, sample data and fakes. Do not edit.
- `demo.tsx`: renders your code in the app. Do not edit.
- `exercise.test.ts`: checks your code. Run `npm test 06`. Do not edit.

In the app, open **6. Group and summarise hotspots** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] All three groups appear in the result, even when empty.
- [ ] An empty input does not throw.

## Check your work

- [ ] Run `npm test 06`. Both tests pass.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- One pass over the list.
- I create all three groups up front so an empty group still shows a count of 0.
- I track the hottest temperature per group separately, so the result shape stays clean.
- I check the boundary values: exactly 100 and exactly 300.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **Could you use `reduce`?** Yes, with the same logic. A loop is easier to read aloud and to debug.
- **What is the complexity?** Linear in the number of hotspots.
- **Is there a built-in for grouping?** `Object.groupBy` in current browsers and Node. You would group first, then summarise each group.

</details>

## Reference solution

`src/solutions/06-group-and-summarise.ts`. Open it only after your own attempt.
