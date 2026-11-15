# 15. Reusable tabs

Take-home size, about 15 minutes.

## Task

Build a reusable Tabs component. It takes a list of tabs, each with a label and content, and shows one panel at a time.

## Files

- `Exercise.tsx`: **edit this.**
- `given.tsx`: types, sample data and fakes. Do not edit.
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **15. Reusable tabs** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] The first tab is active at the start.
- [ ] Only the active panel is rendered.
- [ ] Use the `tablist`, `tab` and `tabpanel` roles and `aria-selected`.
- [ ] Left and right arrow keys move between tabs.

## Check your work

- [ ] Click a tab, then press the right arrow key: the next tab opens and has focus.
- [ ] Right arrow on the last tab wraps to the first.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- One piece of state: the active tab's id. An id survives reordering. An index does not.
- The active tab is looked up during render, with a fallback to the first one.
- Only the active tab is in the keyboard tab order. The arrow keys move between tabs. That is the standard pattern.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **How would you let the parent control it?** Accept `activeId` and `onChange` props and use them instead of internal state.
- **A panel loses its state when I switch away. Why, and how do you keep it?** It unmounts. Render every panel and hide the inactive ones with `hidden`, or lift that state up.
- **How would you build a `<Tabs><Tab>` style API?** A context inside `Tabs` shares the active id with the child components.

</details>

## Reference solution

`src/solutions/15-tabs.tsx`. Open it only after your own attempt.
