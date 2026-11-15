// DO NOT EDIT. Checks that every exercise loads and that every reference solution works.
// Run it alone with: npm test solutions

import type { ComponentType } from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import "../lib/mock-api";
import { CATALOG } from "../lib/catalog";
import { boundsSpec, debounceSpec, summariseSpec } from "./specs";

type Mod = Record<string, unknown>;
type DemoModule = { default: ComponentType<{ mod: never }> };

const demos = import.meta.glob<DemoModule>("../exercises/*/demo.tsx", { eager: true });
const starters = import.meta.glob<Mod>("../exercises/*/Exercise.{ts,tsx}", { eager: true });
const references = import.meta.glob<Mod>("../solutions/*.{ts,tsx}", { eager: true });

function find<T>(modules: Record<string, T>, folder: string): T {
  const key = Object.keys(modules).find(k => k.includes(`/${folder}/`) || k.includes(`/${folder}.`));
  if (!key) throw new Error(`No file found for ${folder}`);
  return modules[key]!;
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(console, "log").mockImplementation(() => {});
  // Node needs an absolute URL for Request. A browser resolves "/api" against the page.
  const NodeRequest = Request;
  vi.stubGlobal(
    "Request",
    class extends NodeRequest {
      constructor(input: RequestInfo | URL, init?: RequestInit) {
        super(typeof input === "string" ? new URL(input, "http://localhost") : input, init);
      }
    }
  );
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("every exercise", () => {
  it("has 25 entries", () => {
    expect(CATALOG).toHaveLength(25);
  });

  for (const entry of CATALOG) {
    it(`${entry.folder}: the reference solution renders`, () => {
      const Demo = find(demos, entry.folder).default;
      const { container } = render(<Demo mod={find(references, entry.folder) as never} />);
      expect(container.textContent).not.toContain("Not built yet");
    });

    it(`${entry.folder}: the starter renders without crashing`, () => {
      const Demo = find(demos, entry.folder).default;
      const { container } = render(<Demo mod={find(starters, entry.folder) as never} />);
      expect(container).toBeTruthy();
    });
  }
});

describe("reference solutions for the plain TypeScript exercises", () => {
  it("06 summarise", () => {
    summariseSpec(find(references, "06-group-and-summarise").summarise as Parameters<typeof summariseSpec>[0]);
  });
  it("08 debounce", () => {
    vi.useRealTimers();
    debounceSpec(find(references, "08-debounce").debounce as Parameters<typeof debounceSpec>[0]);
  });
  it("25 bounding box", () => {
    const mod = find(references, "25-bounding-box");
    boundsSpec(mod.boundsOf as Parameters<typeof boundsSpec>[0], mod.withinBounds as Parameters<typeof boundsSpec>[1]);
  });
});
