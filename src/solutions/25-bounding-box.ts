// Reference solution for exercise 25. Open it only after your own attempt.

type Point = { lat: number; lng: number };
type Bounds = { minLat: number; maxLat: number; minLng: number; maxLng: number };

export function boundsOf(points: Point[]): Bounds | null {
  const first = points[0];
  if (!first) return null; // no points, no box

  const bounds: Bounds = {
    minLat: first.lat,
    maxLat: first.lat,
    minLng: first.lng,
    maxLng: first.lng,
  };

  // One pass. Math.min(...array) can overflow the call stack
  // on very large arrays, so use a loop.
  for (const p of points) {
    if (p.lat < bounds.minLat) bounds.minLat = p.lat;
    if (p.lat > bounds.maxLat) bounds.maxLat = p.lat;
    if (p.lng < bounds.minLng) bounds.minLng = p.lng;
    if (p.lng > bounds.maxLng) bounds.maxLng = p.lng;
  }
  return bounds;
}

export function withinBounds(points: Point[], b: Bounds): Point[] {
  return points.filter(
    p => p.lat >= b.minLat && p.lat <= b.maxLat && p.lng >= b.minLng && p.lng <= b.maxLng
  );
}
