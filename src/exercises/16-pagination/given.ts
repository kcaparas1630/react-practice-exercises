// DO NOT EDIT. Types, sample data and fakes for this exercise.

export type Hotspot = { id: string; tempC: number };

// Twelve hotspots: H-01 at 30 °C up to H-12 at 360 °C.
export const HOTSPOTS: Hotspot[] = Array.from({ length: 12 }, (_, i) => ({
  id: `H-${String(i + 1).padStart(2, "0")}`,
  tempC: (i + 1) * 30,
}));
