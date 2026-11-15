# 5. Form with validation

Live session, about 20 minutes.

## Task

Build a form to add a map annotation: a name, a latitude and a longitude. Validate it and call `onAdd` with numbers.

## Files

- `Exercise.tsx`: **edit this.**
- `given.ts`: types, sample data and fakes. Do not edit.
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **5. Form with validation** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] Name is required.
- [ ] Latitude must be between -90 and 90. Longitude must be between -180 and 180.
- [ ] Errors appear only after the first submit attempt, then update as I type.
- [ ] A valid submit calls `onAdd` with numbers and clears the form.

## Check your work

- [ ] Submit the empty form: three error messages appear.
- [ ] Enter latitude 95: its error stays. Change it to 50.67: the error clears as you type.
- [ ] A valid submit adds an entry under "Received by onAdd" with numbers, not strings, and clears the form.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- The inputs hold strings. I convert to numbers only when submitting.
- Errors are derived from the values on every render. There is no error state to keep in sync.
- `Number("")` is 0, which would pass as a valid latitude, so I check for empty first.
- A `submitted` flag decides when errors become visible.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **Why keep numbers as strings in state?** While typing, the field passes through values such as "-" or "50." that are not numbers yet. Number state fights the input.
- **How would you make the errors accessible?** `aria-invalid` on the input, `aria-describedby` pointing at the message, and focus moved to the first invalid field.
- **And with many forms?** A form library with a schema, such as react-hook-form with Zod.

</details>

## Reference solution

`src/solutions/05-annotation-form.tsx`. Open it only after your own attempt.
