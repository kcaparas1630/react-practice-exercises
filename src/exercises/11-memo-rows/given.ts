// DO NOT EDIT. Types, sample data and fakes for this exercise.

export type Hotspot = { id: string; tempC: number };

// 300 rows, enough to feel the lag.
export const HOTSPOTS: Hotspot[] = Array.from({ length: 300 }, (_, i) => ({
  id: `H-${String(i + 1).padStart(3, "0")}`,
  tempC: 100 + (i % 40) * 8,
}));
