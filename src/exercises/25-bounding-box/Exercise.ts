// EDIT THIS FILE. The instructions are in README.md, in this folder.

import type { Bounds, Point } from "./given";

export function boundsOf(points: Point[]): Bounds | null {
  // TODO: the smallest box containing every point. null for an empty list.
  throw new Error(`Not built yet. ${points.length} points were passed in.`);
}

export function withinBounds(points: Point[], bounds: Bounds): Point[] {
  // TODO: only the points inside the box. Points on the edge count as inside.
  throw new Error(`Not built yet. ${points.length} points, box starts at ${bounds.minLat}.`);
}
