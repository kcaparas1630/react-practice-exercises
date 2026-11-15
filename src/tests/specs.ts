// DO NOT EDIT. Shared checks for the plain TypeScript exercises.
// Each one runs against your code (npm test 06) and against the reference solution.

import { expect, vi } from "vitest";

type Severity = "low" | "medium" | "high";
type Summary = { count: number; totalAreaM2: number; hottestId: string | null };
type Point = { lat: number; lng: number };
type Bounds = { minLat: number; maxLat: number; minLng: number; maxLng: number };

export function summariseSpec(
  summarise: (hotspots: { id: string; tempC: number; areaM2: number }[]) => Record<Severity, Summary>
) {
  expect(
    summarise([
      { id: "H-01", tempC: 412, areaM2: 6 },
      { id: "H-02", tempC: 95, areaM2: 2 },
      { id: "H-03", tempC: 230, areaM2: 14 },
      { id: "H-04", tempC: 300, areaM2: 1 }, // exactly 300 is high
      { id: "H-05", tempC: 180, areaM2: 3 },
    ])
  ).toEqual({
    low: { count: 1, totalAreaM2: 2, hottestId: "H-02" },
    medium: { count: 2, totalAreaM2: 17, hottestId: "H-03" },
    high: { count: 2, totalAreaM2: 7, hottestId: "H-01" },
  });

  // Empty input: all three groups still exist.
  expect(summarise([])).toEqual({
    low: { count: 0, totalAreaM2: 0, hottestId: null },
    medium: { count: 0, totalAreaM2: 0, hottestId: null },
    high: { count: 0, totalAreaM2: 0, hottestId: null },
  });
}

export function debounceSpec(
  debounce: (fn: (text: string) => void, waitMs: number) => ((text: string) => void) & { cancel: () => void }
) {
  vi.useFakeTimers();
  try {
    const fn = vi.fn();
    const debounced = debounce(fn, 200);

    debounced("a");
    vi.advanceTimersByTime(150);
    debounced("b"); // restarts the wait
    vi.advanceTimersByTime(150);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("b"); // the last arguments win

    debounced("c");
    debounced.cancel();
    vi.advanceTimersByTime(500);
    expect(fn).toHaveBeenCalledTimes(1); // cancelled, so no second call
  } finally {
    vi.useRealTimers();
  }
}

export function boundsSpec(
  boundsOf: (points: Point[]) => Bounds | null,
  withinBounds: (points: Point[], bounds: Bounds) => Point[]
) {
  const points = [
    { lat: 50.67, lng: -120.33 },
    { lat: 48.43, lng: -123.37 },
    { lat: 53.92, lng: -122.75 },
  ];
  expect(boundsOf(points)).toEqual({ minLat: 48.43, maxLat: 53.92, minLng: -123.37, maxLng: -120.33 });
  expect(boundsOf([])).toBeNull();
  expect(boundsOf([{ lat: 1, lng: 2 }])).toEqual({ minLat: 1, maxLat: 1, minLng: 2, maxLng: 2 });

  expect(withinBounds(points, { minLat: 49, maxLat: 52, minLng: -121, maxLng: -120 })).toEqual([points[0]]);
  // A point exactly on the edge counts as inside.
  expect(withinBounds(points, { minLat: 48.43, maxLat: 48.43, minLng: -123.37, maxLng: -123.37 })).toEqual([points[1]]);
}
