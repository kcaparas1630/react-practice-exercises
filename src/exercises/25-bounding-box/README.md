# 25. Bounding box for a set of points

Plain TypeScript, about 10 minutes.

## Task

Given a list of points, return the box that contains them all, so the map can zoom to fit. Then write a function that returns only the points inside a given box.

## Files

- `Exercise.ts`: **edit this.**
- `given.ts`: types, sample data and fakes. Do not edit.
- `demo.tsx`: renders your code in the app. Do not edit.
- `exercise.test.ts`: checks your code. Run `npm test 25`. Do not edit.

In the app, open **25. Bounding box for a set of points** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] An empty list returns `null`.
- [ ] Points on the edge of the box count as inside.

## Check your work

- [ ] Run `npm test 25`. It passes.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- I ask what an empty list should return before writing anything.
- One loop that tracks four values.
- I avoid `Math.min(...points)` because spreading a very large array can overflow the call stack.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **How would you pass this to Mapbox?** `map.fitBounds([[minLng, minLat], [maxLng, maxLat]], { padding: 40 })`. Mapbox puts longitude first.
- **What breaks near 180° longitude?** Points on both sides give a box that spans the whole globe. It needs special handling, such as shifting longitudes before comparing.

</details>

## Reference solution

`src/solutions/25-bounding-box.ts`. Open it only after your own attempt.
