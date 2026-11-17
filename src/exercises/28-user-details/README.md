# 28. User details panel

Timed: 20 minutes. No AI, no reference solution. When the timer ends, stop, commit and push what you have, even if it is not finished.

## Task

Show a row of buttons, one per person. When I click a person, load their details from the server and show them.

## Files

- `Exercise.tsx`: **edit this.**
- `given.ts`: the `PEOPLE` list for the buttons, the `UserDetails` type, and what the server sends back. Read it first. Do not edit.

## The server

`fetch("/api/users/u3")` returns one person's details, like this:

```json
{
  "id": "u3", "name": "Sofia Reyes", "email": "sofia@mapnova.test", "role": "pilot",
  "flightCount": 17, "lastFlight": "2026-11-02"
}
```

- **u1 (Maya) is slow:** it takes 2 seconds. Everyone else takes under half a second.
- **u9 (Old account) does not exist:** the server answers with status 404.
- `lastFlight` is `null` for someone who has never flown.

## Requirements

1. Show one button per person in `PEOPLE`, using their name.
2. Before anyone is clicked, show "Pick a person to see their details."
3. Clicking a button loads that person from `/api/users/<id>`. While it loads, show "Loading...".
4. When it arrives, show their name, email, role, number of flights and last flight date. If `lastFlight` is `null`, show "Never flown" instead.
5. The button for the person I picked looks different from the others (for example bold, or a different background).
6. If the server says 404, show "This user no longer exists." For any other failed request, show "Something went wrong."
7. **Clicking fast must never show the wrong person.** If I click Maya (slow) and then click Liam right away, I must end up seeing Liam. Maya's details must never appear, not even for a moment, after I clicked Liam.

## How to test it yourself

- Open the page: you see the buttons and "Pick a person to see their details."
- Click Sofia: "Loading...", then her details.
- Click Liam: "Never flown".
- Click Old account: "This user no longer exists."
- Click Maya, then click Liam within 2 seconds. Wait 3 seconds. You still see Liam.
