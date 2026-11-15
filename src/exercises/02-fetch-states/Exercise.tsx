// EDIT THIS FILE. The instructions are in README.md, in this folder.

import { REGIONS, type Fire } from "./given";

export default function FirePanel() {
  // TODO: a <select> of REGIONS, then fetch `/api/fires?region=${region}` and show every state
  const example: Fire | null = null;
  return (
    <p>
      Not built yet. Regions: {REGIONS.join(", ")}. {example}
    </p>
  );
}
