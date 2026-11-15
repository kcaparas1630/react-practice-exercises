# 13. Row selection with select all

Take-home size, about 15 minutes.

## Task

Let me tick the hotspots I want to export. Add a select-all box and show how many are selected.

## Files

- `Exercise.tsx`: **edit this.**
- `given.ts`: types, sample data and fakes. Do not edit.
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **13. Row selection with select all** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] Select all ticks every row. Ticking it again clears them.
- [ ] Unticking one row unticks Select all.
- [ ] The Export button is disabled when nothing is selected.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- I store the selected ids, not a `selected` flag copied onto each hotspot. The hotspot data stays untouched.
- A `Set` gives a fast lookup. I copy it before changing it, because React compares state by reference.
- Whether everything is selected is derived from the set size. It is not stored.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **How do you show Select all as half ticked?** `indeterminate` is a DOM property, not an attribute. Set it through a ref in an effect when some but not all rows are selected.
- **The list changes and a selected id no longer exists. What happens?** The count would be wrong. Intersect the set with the current ids when counting, or reset the component by giving it a new `key`.

</details>

## Reference solution

`src/solutions/13-row-selection.tsx`. Open it only after your own attempt.
