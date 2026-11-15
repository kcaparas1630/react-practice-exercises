// DO NOT EDIT. Run with: npm test 06

import { describe, it } from "vitest";
import { summariseSpec } from "../../tests/specs";
import { summarise } from "./Exercise";

describe("06 summarise", () => {
  it("groups, totals and finds the hottest", () => summariseSpec(summarise));
});
