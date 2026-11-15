// DO NOT EDIT. Types, sample data and fakes for this exercise.

// Same API as exercise 02, answered in the browser by src/lib/mock-api.ts:
//
//   GET /api/fires?region=kamloops   ->   200, a JSON array of Fire
//
// Regions: kamloops (two fires), cariboo (slow), coastal (none), northwest (fails once).

export type Fire = { id: string; name: string; sizeHa: number };

export const REGIONS = ["kamloops", "cariboo", "coastal", "northwest"] as const;
