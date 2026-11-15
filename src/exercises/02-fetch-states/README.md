# 2. Fetch with every state handled

Live session, about 20 minutes.

## Task

Load the fires for the selected region from `/api/fires?region=...` and show them. Handle everything that can happen.

## Files

- `Exercise.tsx`: **edit this.**
- `given.ts`: types, sample data and fakes. Do not edit.
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **2. Fetch with every state handled** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] Use a `<select>` for the region, not a text input.
- [ ] Show four states: loading, error, empty (no fires) and the list.
- [ ] A response that is not 200 counts as an error.
- [ ] The error state has a Try again button that repeats the request.
- [ ] Race condition: if I pick cariboo and then quickly pick kamloops, the slow cariboo response must never replace the kamloops list.

## Check your work

- [ ] Pick northwest: an error and a Try again button appear. Try again loads one fire.
- [ ] Pick coastal: the empty message appears.
- [ ] Pick cariboo, then kamloops within two seconds: the kamloops list stays. Dogtooth never appears.
- [ ] While a request is running, a loading message shows.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- I model the request as one union type: loading, error or success. That makes impossible combinations, such as loading with an error, unrepresentable.
- `fetch` only rejects when the network fails. A 500 resolves, so I check `res.ok` myself.
- The cleanup aborts the request. If the region changes, the old response is dropped and cannot overwrite the new one.
- I set the loading state in the event handlers, not inside the effect. The effect only talks to the network.
- In a real app I would use TanStack Query or RTK Query. I am writing it by hand to show I know what they do.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **Why is `attempt` in the dependency array?** Changing it re-runs the effect. That is how Try again repeats the same request.
- **What does a query library add?** Caching, request de-duplication, retries, refetch on focus, and the same loading and error states without the boilerplate.
- **What if the component unmounts mid-request?** The cleanup runs on unmount too, so the request is aborted and no state is set.

</details>

## Reference solution

`src/solutions/02-fetch-states.tsx`. Open it only after your own attempt.
