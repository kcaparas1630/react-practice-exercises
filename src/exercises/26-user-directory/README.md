# 26. User search

Timed: 20 minutes. No AI, no reference solution. When the timer ends, stop, commit and push what you have, even if it is not finished.

## Task

Build a search box for users. As I type, call `searchUsers` with what I typed and show the users it gives back.

## Files

- `Exercise.tsx`: **edit this.**
- `given.ts`: the `User` type and the `searchUsers` function. Read it first. Do not edit.

## The function you call

```ts
searchUsers(query: string): Promise<User[]>
```

- It gives back the users whose name or email contains `query`. Capital letters do not matter.
- An empty query `""` gives back all 8 users.
- **A one-letter query is slow** (1.5 seconds). Anything longer takes 0.3 seconds.
- If the query is `fail`, it throws an error.

A `User` looks like this:

```ts
{ id: "u1", name: "Maya Thompson", email: "maya@nova.test", role: "pilot" }
```

## Requirements

1. A text box. Its value is kept in React state (a controlled input).
2. When the page opens, show all users (call `searchUsers("")`).
3. When I type, call `searchUsers` with the text, but **wait until I stop typing for 300 ms**. Typing "maya" quickly should make one call, not four.
4. While waiting for an answer, show "Searching...".
5. Show the results as a list: name, email and role. Above the list, show "3 users found" (with the real number).
6. If nothing matches, show "No users found." instead of an empty list.
7. If `searchUsers` throws, show "Search failed. Try again."
8. **Never show results for old text.** If I type `m`, wait a moment, then type `a` (so the box says `ma`), the slow answer for `m` must not replace the answer for `ma`.

## How to test it yourself

- Open the page: "Searching...", then "8 users found".
- Type `ch`: 2 users (Liam Chen and Chloe Martin).
- Type `zzz`: "No users found."
- Type `fail`: "Search failed. Try again."
- Clear the box. Type `m` and wait half a second (it is still searching, because one letter is slow). Then type `a` so the box says `ma`. Wait 2 seconds. You must end up with **2 users** (Maya Thompson and Chloe Martin), and the list must never jump back to 4.
