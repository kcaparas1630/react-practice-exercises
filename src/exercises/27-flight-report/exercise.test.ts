// DO NOT EDIT. Run with: npm test 27

import { describe, expect, it } from "vitest";
import { SAMPLE } from "./given";
import { formatMinutes, summarisePilots } from "./Exercise";

describe("27 summarisePilots", () => {
  it("works on the sample", () => {
    expect(summarisePilots(SAMPLE)).toEqual([
      { pilot: "Maya", flights: 2, totalMinutes: 130, longestMinutes: 85, lastFlown: "2026-11-10" },
      { pilot: "Ava", flights: 1, totalMinutes: 125, longestMinutes: 125, lastFlown: "2026-11-14" },
      { pilot: "Sofia", flights: 2, totalMinutes: 125, longestMinutes: 95, lastFlown: "2026-11-05" },
    ]);
  });

  it("puts the most minutes first", () => {
    const result = summarisePilots([
      { pilot: "Ben", minutes: 10, date: "2026-01-01" },
      { pilot: "Zoe", minutes: 50, date: "2026-01-02" },
    ]);
    expect(result.map(r => r.pilot)).toEqual(["Zoe", "Ben"]);
  });

  it("returns an empty array for no flights", () => {
    expect(summarisePilots([])).toEqual([]);
  });

  it("leaves out a pilot whose flights were all 0 minutes", () => {
    expect(summarisePilots([{ pilot: "Ava", minutes: 0, date: "2026-11-11" }])).toEqual([]);
  });
});

describe("27 formatMinutes", () => {
  it("formats minutes as hours and minutes", () => {
    expect(formatMinutes(125)).toBe("2h 05m");
    expect(formatMinutes(60)).toBe("1h 00m");
    expect(formatMinutes(45)).toBe("0h 45m");
    expect(formatMinutes(0)).toBe("0h 00m");
  });
});
