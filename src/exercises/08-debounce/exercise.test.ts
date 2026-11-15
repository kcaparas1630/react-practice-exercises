// DO NOT EDIT. Run with: npm test 08

import { describe, it } from "vitest";
import { debounceSpec } from "../../tests/specs";
import { debounce } from "./Exercise";

describe("08 debounce", () => {
  it("waits, uses the last arguments, and can be cancelled", () => debounceSpec(debounce));
});
