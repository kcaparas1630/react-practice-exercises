# Study plan: Tuesday, before Wednesday's interview

Interview format: a few small programming tasks in 60 minutes, so probably 2–3 tasks of 15–25 minutes each. The take-home was React (fetch users, search with an input's `onChange`), so expect at least one React task, possibly an extension of the take-home.

Tomorrow is for practice and getting fluent, not for learning new things. Give each exercise about 20 minutes and talk out loud while you work. If you run over, write down where you got stuck and move on.

## Must do

- [ ] **[02-fetch-states](src/exercises/02-fetch-states/README.md):** loading, error and success states. This is the core of the take-home.
- [ ] **[07-debounced-search](src/exercises/07-debounced-search/README.md):** the most likely follow-up to the take-home.
- [ ] **[11-memo-rows](src/exercises/11-memo-rows/README.md):** `React.memo`, `useMemo` and `useCallback`. Practise saying when to use them and when not to.
- [ ] **[06-group-and-summarise](src/exercises/06-group-and-summarise/README.md) from a blank file:** use the 5-step process below.

## If there's time

- [ ] **[08-debounce](src/exercises/08-debounce/README.md):** write debounce yourself.
- [ ] **[04-six-bugs](src/exercises/04-six-bugs/README.md):** read someone else's code and find the bugs.
- [ ] **[01-hotspot-table](src/exercises/01-hotspot-table/README.md):** render a list with keys.
- [ ] **[16-pagination](src/exercises/16-pagination/README.md)** and **[13-row-selection](src/exercises/13-row-selection/README.md)**.

## The 5-step process for any task

1. **Start from the output shape.** Write the return value with empty values first. It becomes your starting variable and handles empty input.
2. **Solve it by hand on the sample, out loud.** What you track in your head becomes a variable; what you repeat per item becomes the loop body.
3. **Name the pattern** (table below).
4. **Write the plain version first.** A `for...of` loop with clear names. Use `map` / `filter` / `reduce` only if they make it easier to read.
5. **Check the edges:** empty input, exact boundaries, zero or negative values, ties, a single item.

| You hear... | Pattern | Loop shape |
|---|---|---|
| "for each, turn it into..." | transform | push a new value into a new array |
| "only the ones that..." | keep some | `if`, then push |
| "total / count / how many" | accumulate | `let x = 0` before the loop, `x += ...` inside |
| "biggest / hottest / first" | track the best | best-so-far variable plus an `if (better)` check |
| "group by / per category" | group by key | an object keyed by category, indexed with `obj[key]` |
| "find by id / have we seen it" | lookup | an object, `Map` or `Set` built before the loop |

## Be ready to explain

- **Derived state:** compute the filtered list during render instead of storing it in state. It can always be worked out from `users` and `query`, so storing it creates two sources of truth that can get out of sync.
- **Stale responses:** if each keystroke fetches, an older response can arrive last and overwrite a newer one. Fix it in `useEffect` cleanup with an `ignore` flag or an `AbortController`.
- **`useMemo` / `useCallback`:** they keep a value or function the same between renders. Use them when a calculation is expensive or when something compares by reference (a `React.memo` child, a `useEffect` dependency). Not by default: for small lists the filter is cheap and memoising only adds cost and noise.
  - Sample answer: "I compute the filtered list during render. With a small list I wouldn't memoise it. If it got large, or I passed it to a memoised child, I'd wrap it in `useMemo` with `[users, query]`."
- **Your take-home:** walk through what you built and what you'd add next (loading/error/empty states, debounce, stale-response handling, case-insensitive search).

## In the interview

- **Before typing,** repeat the task in your own words and ask about edge cases ("case-sensitive?", "what if the request fails?").
- **Get a working version first,** then improve it.
- **If you're stuck,** say what you're trying to do, or "let me do it by hand on the example first".
- **Watch the clock.** If a task runs long, say so and ask whether to move on.

## Wednesday morning

Skim this file, maybe redo one exercise you're comfortable with to warm up, and stop there. Going in rested helps more than cramming.
