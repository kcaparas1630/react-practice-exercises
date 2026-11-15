# 24. Upload queue, two at a time

Stretch, about 35 minutes.

## Task

The pilot has selected a batch of images. Upload them at most two at a time. Show each file's status and let me retry one that failed.

## Files

- `Exercise.tsx`: **edit this.**
- `given.ts`: types, sample data and fakes. Do not edit.
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **24. Upload queue, two at a time** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] Each file is queued, uploading, done or failed.
- [ ] Never more than two uploads run at once.
- [ ] When one finishes, the next queued file starts.
- [ ] A failed file has a Retry button.
- [ ] Show "X of Y uploaded".

## Check your work

- [ ] Never more than two files say uploading at once.
- [ ] A failed file shows a Retry button, and Retry uploads it again.
- [ ] The count reaches 8 of 8.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- A file moves through fixed statuses, so a reducer fits better than several `useState` calls.
- State is for what the screen shows. The set of uploads in flight is kept in a ref, because the limit of two must hold even if the effect runs again before the state update arrives.
- The effect looks at the list after every change and starts work if there is a free slot.
- I would run it under Strict Mode. My first version of this started four uploads there, and the ref is the fix.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **Why not count the uploading items in state?** State from the current render can be out of date when the effect runs twice in a row. The ref is always current.
- **What happens if the user leaves mid-upload?** Abort the in-flight requests in a cleanup with `AbortController`, and warn before leaving if uploads are pending.
- **How would you retry automatically?** A retry count per file, a delay that grows each time, and failed only after the limit.
- **Can you do it without an effect?** Yes. Keep the queue outside React, start the next upload from the completion callback, and have the component subscribe to it.

</details>

## Reference solution

`src/solutions/24-upload-queue.tsx`. Open it only after your own attempt.
