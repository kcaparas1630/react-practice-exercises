# 4. Find the six bugs

Live session, about 15 minutes.

## Task

This component has six bugs. Read it without running it. For each bug, say what the user would see, then fix it.

## Files

- `Exercise.tsx`: **edit this.** It already contains working code with a problem to fix.
- `given.ts`: types, sample data and fakes. Do not edit.
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **4. Find the six bugs** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] Find all six.
- [ ] Describe the symptom of each before you fix it.

## Check your work

- [ ] Three fires are listed. (The starter shows none. That is one of the bugs.)
- [ ] The seconds counter keeps counting past 1.
- [ ] Type a note beside Bute Inlet, then dismiss Shetland Creek: the note stays with Bute Inlet.
- [ ] Dismiss removes exactly one row.
- [ ] "2 large fires" shows on the first render, with no flash of 0.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- I read in order: state, effects, handlers, then the JSX.
- For each effect I ask what it starts and whether it stops it.
- For each handler I ask whether it creates a new value or changes the old one.
- For each list I check the key.

</details>

<details>
<summary>The six bugs (spoiler)</summary>

- **1. The interval is never cleared.** It keeps running after unmount, and Strict Mode starts two in development.
- **2. The interval reads a stale `seconds`.** The callback captured 0, so the counter goes to 1 and stays there.
- **3. `large` is state filled by an effect.** It is derived data. The effect costs an extra render and shows 0 on the first one.
- **4. `splice` mutates state.** The same array is passed to the setter, so React sees no change and the row stays on screen.
- **5. The key is the array index.** After a dismiss, the notes typed in the inputs shift to the wrong fires.
- **6. `onClick={dismiss(i)}` calls the function.** It runs during render for every row. It must be `() => dismiss(...)`.
- **Discussion point: `useState(fires)`.** It copies the prop once. Later changes to the prop are ignored. Whether that is a bug depends on what the parent expects, so say it and ask.

</details>

## Reference solution

`src/solutions/04-six-bugs.tsx`. Open it only after your own attempt.
