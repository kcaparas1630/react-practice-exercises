# React practice exercises

Twenty-five small React and TypeScript exercises, each with instructions, sample data, a starter file to edit, and a reference solution.

## Setup

```bash
npm install
npm run dev
```

Open the address Vite prints. Pick an exercise in the sidebar.

## How an exercise is laid out

```
src/exercises/01-hotspot-table/
  README.md      instructions, requirements, a self-check list
  Exercise.tsx   EDIT THIS
  given.ts       types, sample data, fake APIs   (do not edit)
  demo.tsx       renders your code in the app    (do not edit)
src/solutions/01-hotspot-table.tsx                reference solution
```

Everything outside `Exercise.tsx` is marked `DO NOT EDIT` on its first line.

In the app, **My code** runs your `Exercise.tsx`. **Reference solution** runs the finished version so you can see the expected behaviour without reading its code.

## How to practise

1. Read the exercise README. Set a timer for the minutes shown.
2. Write the code yourself: no AI agent, no AI autocomplete. The React docs are fair to use.
3. Talk out loud while you type.
4. Tick the requirements and the self-check list.
5. Only then open the reference solution and compare.
6. Redo it from the starter the next day: `git checkout -- src/exercises/01-hotspot-table/Exercise.tsx`

The first twelve are a set of six pairs: 1 and 2, 3 and 4, and so on. Do one pair per sitting.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the app |
| `npm test 06` | Run the tests for exercise 6. Exercises 6, 8 and 25 have tests |
| `npm test solutions` | Check that every exercise loads and every reference solution works |
| `npm run typecheck` | Type-check the whole project |

`npm test` with no argument also runs the tests for exercises 6, 8 and 25, which fail until you have written them.

## No backend needed

`src/lib/mock-api.ts` answers `GET /api/fires?region=...` in the browser. Exercises 2 and 20 use it. The regions are `kamloops` (two fires), `cariboo` (slow), `coastal` (none) and `northwest` (fails once, then works).

## Exercises

### Start here

| # | Exercise | Kind | Minutes |
|---|---|---|---|
| 1 | [Hotspot table with filter and sort](src/exercises/01-hotspot-table/README.md) | Take-home size | 15 |
| 2 | [Fetch with every state handled](src/exercises/02-fetch-states/README.md) | Live session | 20 |
| 3 | [Task list](src/exercises/03-task-list/README.md) | Take-home size | 15 |
| 4 | [Find the six bugs](src/exercises/04-six-bugs/README.md) | Live session | 15 |
| 5 | [Form with validation](src/exercises/05-annotation-form/README.md) | Live session | 20 |
| 6 | [Group and summarise hotspots](src/exercises/06-group-and-summarise/README.md) | Plain TypeScript | 10 |
| 7 | [Debounced search](src/exercises/07-debounced-search/README.md) | Take-home size | 15 |
| 8 | [Implement debounce](src/exercises/08-debounce/README.md) | Plain TypeScript | 10 |
| 9 | [Shared selection by lifting state](src/exercises/09-lift-state/README.md) | Shared state | 10 |
| 10 | [The same feature with Context](src/exercises/10-context/README.md) | Shared state | 15 |
| 11 | [Stop a list re-rendering on every keystroke](src/exercises/11-memo-rows/README.md) | Live session | 15 |
| 12 | [Stopwatch](src/exercises/12-stopwatch/README.md) | Take-home size | 15 |

### More practice

| # | Exercise | Kind | Minutes |
|---|---|---|---|
| 13 | [Row selection with select all](src/exercises/13-row-selection/README.md) | Take-home size | 15 |
| 14 | [Map layer panel with a reducer](src/exercises/14-layer-reducer/README.md) | Take-home size | 15 |
| 15 | [Reusable tabs](src/exercises/15-tabs/README.md) | Take-home size | 15 |
| 16 | [Pagination with a filter](src/exercises/16-pagination/README.md) | Take-home size | 15 |
| 17 | [A useLocalStorage hook](src/exercises/17-use-local-storage/README.md) | Take-home size | 15 |
| 18 | [The same feature with Redux Toolkit](src/exercises/18-redux-toolkit/README.md) | Shared state | 20 |
| 19 | [Fix a context that re-renders everything](src/exercises/19-split-context/README.md) | Shared state | 15 |
| 20 | [Polling with RTK Query](src/exercises/20-rtk-query/README.md) | Shared state | 20 |
| 21 | [A polling hook](src/exercises/21-use-polling/README.md) | Live session | 25 |
| 22 | [Optimistic update with rollback](src/exercises/22-optimistic-update/README.md) | Live session | 20 |
| 23 | [Undo and redo](src/exercises/23-undo-redo/README.md) | Live session | 25 |
| 24 | [Upload queue, two at a time](src/exercises/24-upload-queue/README.md) | Stretch | 35 |
| 25 | [Bounding box for a set of points](src/exercises/25-bounding-box/README.md) | Plain TypeScript | 10 |

Every reference solution passes strict TypeScript and a behaviour test on React 19.
