// DO NOT EDIT. Renders your code inside the practice app.

import type * as Exercise from "./Exercise";
import { POINTS } from "./given";

export default function Demo({ mod }: { mod: typeof Exercise }) {
  let output: string;
  try {
    const box = mod.boundsOf(POINTS);
    const inside = box ? mod.withinBounds(POINTS, { ...box, minLat: 49 }) : [];
    output = JSON.stringify({ boundsOf: box, withinBoundsNorthOf49: inside }, null, 2);
  } catch (err) {
    output = err instanceof Error ? err.message : String(err);
  }
  return (
    <div>
      <pre>{output}</pre>
      <p>Check it with: npm test 25</p>
    </div>
  );
}
