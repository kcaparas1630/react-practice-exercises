// DO NOT EDIT. Types, sample data and fakes for this exercise.

export type Hotspot = { id: string; tempC: number; areaM2: number };
export type Severity = "low" | "medium" | "high";
export type Summary = { count: number; totalAreaM2: number; hottestId: string | null };

// high: 300 and above. medium: 100 to 299. low: under 100.

export const SAMPLE: Hotspot[] = [
  { id: "H-01", tempC: 412, areaM2: 6 },
  { id: "H-02", tempC: 95, areaM2: 2 },
  { id: "H-03", tempC: 230, areaM2: 14 },
  { id: "H-04", tempC: 300, areaM2: 1 },
  { id: "H-05", tempC: 180, areaM2: 3 },
];

// Expected result for SAMPLE:
// {
//   low:    { count: 1, totalAreaM2: 2,  hottestId: "H-02" },
//   medium: { count: 2, totalAreaM2: 17, hottestId: "H-03" },
//   high:   { count: 2, totalAreaM2: 7,  hottestId: "H-01" },
// }
