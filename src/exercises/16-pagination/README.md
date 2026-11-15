# 16. Pagination with a filter

Take-home size, about 15 minutes.

## Task

Show these hotspots five per page with Previous and Next buttons. Add a minimum temperature filter.

## Files

- `Exercise.tsx`: **edit this.**
- `given.ts`: types, sample data and fakes. Do not edit.
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **16. Pagination with a filter** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] Show "Page X of Y".
- [ ] Previous and Next are disabled at the ends.
- [ ] Changing the filter returns to page 1.
- [ ] Show a message when nothing matches.

## Check your work

- [ ] Go to page 3, then set the minimum to 200: it returns to "Page 1 of 2".
- [ ] Set the minimum to 999: the no-match message shows and both buttons are disabled.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- State is the page number and the filter. The filtered list, the page count and the visible rows are all derived.
- I reset the page in the filter's change handler. The handler knows why the page must change, so no effect is needed.
- I also clamp the page during render, in case the list shrinks for another reason.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **Why not reset the page in an effect?** The component would render once with the wrong page, then again with the right one.
- **What changes when the server does the paging?** The page goes into the request. The server returns the rows and a total count. Keep the previous page on screen while the next one loads.
- **How would you keep the page after a refresh?** Put it in the URL's search parameters.

</details>

## Reference solution

`src/solutions/16-pagination.tsx`. Open it only after your own attempt.
