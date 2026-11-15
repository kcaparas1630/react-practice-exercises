# 20. Polling with RTK Query

Shared state, about 20 minutes.

## Task

Load the fires for a region with RTK Query and refresh them every 10 minutes.

## Files

- `Exercise.tsx`: **edit this.**
- `given.ts`: types, sample data and fakes. Do not edit.
- `demo.tsx`: renders your code in the app. Do not edit.

In the app, open **20. Polling with RTK Query** in the sidebar. It shows your code. The **Reference solution** button shows the finished version running, without showing its code.

## Requirements

- [ ] `createApi` with one `getFires` query that takes the region.
- [ ] A store with the API reducer and middleware.
- [ ] Loading, error with Try again, empty and list states.
- [ ] If a background refresh fails, keep showing the last data.

## Check your work

- [ ] kamloops lists two fires. coastal shows the empty message.
- [ ] northwest shows an error with Try again, and Try again loads one fire.
- [ ] Pick kamloops, another region, then kamloops again: the list appears at once, from the cache.

## While you work

<details>
<summary>What to say out loud (open after you have a plan)</summary>

- RTK Query is the data-fetching part of Redux Toolkit. I describe the endpoint once and get a hook back.
- Results are cached by endpoint and argument. Two components asking for the same region share one request.
- `pollingInterval` replaces the interval and cleanup I wrote by hand in the polling hook task.
- `isLoading` is the first load with nothing to show. `isFetching` is any request, including a background refresh.

</details>

<details>
<summary>Follow-up questions, with answers</summary>

- **What do you get compared with the hand-written hook?** Caching, shared requests, cleanup, refetch and status flags, all without writing an effect.
- **How do you refresh a list after changing something?** Tags. The query declares `providesTags`, the mutation declares `invalidatesTags`, and the query refetches.
- **How would you stop polling in a hidden tab?** The `skipPollingIfUnfocused` option, with `setupListeners(store.dispatch)` called once.
- **This is how Firefly BC loads fires. Can you find it?** Compare with `fire.api.ts` and `use-fire-feed-query.ts` in your own project, and be able to say what each line does.

</details>

## Reference solution

`src/solutions/20-rtk-query.tsx`. Open it only after your own attempt.
