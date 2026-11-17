// DO NOT EDIT. Renders your code inside the practice app.

import type * as Exercise from "./Exercise";
import { SAMPLE } from "./given";

export default function Demo({ mod }: { mod: typeof Exercise }) {
  let output: string;
  try {
    output = mod
      .summarisePilots(SAMPLE)
      .map(s => `${s.pilot}: ${s.flights} flights, ${mod.formatMinutes(s.totalMinutes)} total, longest ${mod.formatMinutes(s.longestMinutes)}, last flown ${s.lastFlown}`)
      .join("\n");
  } catch (err) {
    output = err instanceof Error ? err.message : String(err);
  }
  return (
    <div>
      <p>Your report for the SAMPLE flights:</p>
      <pre>{output}</pre>
      <p>Check it with: npm test 27</p>
    </div>
  );
}
