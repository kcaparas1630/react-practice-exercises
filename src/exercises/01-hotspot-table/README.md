# 1. Hotspot table with filter and sort

Take-home size, about 15 minutes.

## Task

Here are the hotspots from one flight. Show them in a table. Let me hide anything under a minimum temperature and sort by any numeric column.

## Files

- `Exercise.tsx`: **edit this.**
- `given.ts`: types, sample data and fakes. Do not edit.
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **1. Hotspot table with filter and sort** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] A number input sets the minimum temperature. Rows below it are hidden.
- [ ] Show how many rows are visible out of the total, for example "Showing 3 of 5".
- [ ] Clicking a column header sorts by that column. Clicking it again reverses the order.
- [ ] Show which column is sorted and in which direction, for example an arrow beside the header.
- [ ] Do not change the array that was passed in.

## Check your work

- [ ] Set the minimum to 200: three rows remain and the line reads "Showing 3 of 5".
- [ ] Click a header twice: the order reverses and the arrow flips.
- [ ] Switch to the reference solution and back: your table still starts in the original order.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- State is only the three things the user controls: minimum temperature, sort column, direction. The rows are derived.
- `sort` changes an array in place. `filter` already gives me a new array, so sorting that is safe. Without the filter I would copy first.
- Row keys are the hotspot ids.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **What changes with 10,000 rows?** Measure first. Then wrap the derived rows in `useMemo` and render only the visible rows with a virtualised list.
- **Why not keep the sorted rows in state?** That creates two sources of truth that can drift apart. Deriving them cannot go out of sync.
- **How would you sort a text column?** `a.name.localeCompare(b.name)`.

</details>

## Reference solution

`src/solutions/01-hotspot-table.tsx`. Open it only after your own attempt.
