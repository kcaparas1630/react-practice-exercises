// DO NOT EDIT. Renders your code inside the practice app.

import type * as Exercise from "./Exercise";
import { SAMPLE } from "./given";

export default function Demo({ mod }: { mod: typeof Exercise }) {
  let output: string;
  try {
    output = JSON.stringify(mod.summarise(SAMPLE), null, 2);
  } catch (err) {
    output = err instanceof Error ? err.message : String(err);
  }
  return (
    <div>
      <p>summarise(SAMPLE) returns:</p>
      <pre>{output}</pre>
      <p>Check it with: npm test 06</p>
    </div>
  );
}
