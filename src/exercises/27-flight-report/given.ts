// DO NOT EDIT. Types and sample data for this exercise.

export type Flight = {
  pilot: string;   // the pilot's name
  minutes: number; // how long the flight was
  date: string;    // the day it happened, written as "YYYY-MM-DD"
};

export type PilotSummary = {
  pilot: string;
  flights: number;        // how many flights this pilot did
  totalMinutes: number;   // all their minutes added up
  longestMinutes: number; // their single longest flight
  lastFlown: string;      // the date of their most recent flight
};

export const SAMPLE: Flight[] = [
  { pilot: "Maya", minutes: 45, date: "2026-11-02" },
  { pilot: "Sofia", minutes: 30, date: "2026-11-05" },
  { pilot: "Maya", minutes: 85, date: "2026-11-10" },
  { pilot: "Ava", minutes: 0, date: "2026-11-11" }, // cancelled flight: 0 minutes, ignore it
  { pilot: "Sofia", minutes: 95, date: "2026-11-01" },
  { pilot: "Ava", minutes: 125, date: "2026-11-14" },
];
