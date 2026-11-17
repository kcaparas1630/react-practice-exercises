// DO NOT EDIT. Types, the user list and API notes for this exercise.

// The API (answered in the browser by src/lib/mock-api.ts, no backend needed):
//
//   GET /api/users/u3   ->   200, one UserDetails as JSON
//   {
//     "id": "u3", "name": "Sofia Reyes", "email": "sofia@mapnova.test", "role": "pilot",
//     "flightCount": 17, "lastFlight": "2026-11-02"
//   }
//
// u1 is SLOW: it takes 2 seconds. Every other user takes under half a second.
// u9 does not exist: the server answers with status 404.
// lastFlight is null for users who have never flown.

export type UserDetails = {
  id: string;
  name: string;
  email: string;
  role: "pilot" | "analyst" | "admin";
  flightCount: number;
  lastFlight: string | null;
};

// The buttons to show. You already have this list, so you do not need to fetch it.
export const PEOPLE = [
  { id: "u1", name: "Maya Thompson" },
  { id: "u2", name: "Liam Chen" },
  { id: "u3", name: "Sofia Reyes" },
  { id: "u5", name: "Ava Patel" },
  { id: "u9", name: "Old account" },
];
