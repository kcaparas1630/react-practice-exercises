// DO NOT EDIT. Types, sample data and fakes for this exercise.

// The API (answered in the browser by src/lib/mock-api.ts, no backend needed):
//
//   GET /api/fires?region=kamloops   ->   200, a JSON array of Fire
//   [
//     { "id": "K1", "name": "Shetland Creek", "sizeHa": 28000 },
//     { "id": "K2", "name": "Ross Moore Lake", "sizeHa": 120 }
//   ]
//
// A region with no fires returns [] with status 200.
// A failure returns a non-200 status, for example 500.

export type Fire = { id: string; name: string; sizeHa: number };

// What each region tests:
//   kamloops   two fires                     (list)
//   cariboo    one fire, takes 2 seconds     (race: pick it, then quickly pick kamloops)
//   coastal    no fires                      (empty)
//   northwest  fails once, then works        (error and Try again)
export const REGIONS = ["kamloops", "cariboo", "coastal", "northwest"] as const;
