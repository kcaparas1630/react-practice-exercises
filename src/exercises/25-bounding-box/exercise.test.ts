// DO NOT EDIT. Run with: npm test 25

import { describe, it } from "vitest";
import { boundsSpec } from "../../tests/specs";
import { boundsOf, withinBounds } from "./Exercise";

describe("25 bounding box", () => {
  it("finds the box and filters points", () => boundsSpec(boundsOf, withinBounds));
});
