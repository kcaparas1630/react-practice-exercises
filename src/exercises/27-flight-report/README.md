# 27. Flight report

Timed: 20 minutes. Plain TypeScript, no React. No AI, no reference solution. When the timer ends, stop, commit and push what you have, even if it is not finished.

## Task

You get a list of drone flights. Write two functions that turn it into a report per pilot.

## Files

- `Exercise.ts`: **edit this.**
- `given.ts`: the `Flight` and `PilotSummary` types and the `SAMPLE` list. Read it first. Do not edit.
- `exercise.test.ts`: the checks. Do not edit.

## Function 1: `summarisePilots(flights)`

Return **one object per pilot** with:

- `pilot`: their name
- `flights`: how many flights they did
- `totalMinutes`: all their minutes added up
- `longestMinutes`: their longest single flight
- `lastFlown`: the date of their **most recent** flight. The list is not in date order, so don't just take the last one you see. Dates are written as `"YYYY-MM-DD"`, so you can compare them as plain strings: `"2026-11-14" > "2026-11-05"` is true.

Rules:

1. A flight with 0 minutes (or less) was cancelled. Skip it completely. It does not count for anything.
2. Put the pilot with the **most total minutes first**.
3. If two pilots have the same total, put them in **alphabetical order** by name.
4. An empty list gives back an empty array `[]`.

For the SAMPLE list, the answer is:

```ts
[
  { pilot: "Maya",  flights: 2, totalMinutes: 130, longestMinutes: 85,  lastFlown: "2026-11-10" },
  { pilot: "Ava",   flights: 1, totalMinutes: 125, longestMinutes: 125, lastFlown: "2026-11-14" },
  { pilot: "Sofia", flights: 2, totalMinutes: 125, longestMinutes: 95,  lastFlown: "2026-11-05" },
]
```

Ava and Sofia both have 125, so Ava comes first (A before S). Ava's 0-minute flight is not counted.

## Function 2: `formatMinutes(minutes)`

Turn a number of minutes into text like `"2h 05m"`. Minutes always have two digits.

| Input | Output |
|---|---|
| 125 | `"2h 05m"` |
| 60 | `"1h 00m"` |
| 45 | `"0h 45m"` |
| 0 | `"0h 00m"` |

## How to test it yourself

Run `npm test 27`. All five checks should pass. The app page for exercise 27 also prints your report.
