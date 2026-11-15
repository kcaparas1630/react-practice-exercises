// DO NOT EDIT. Types, sample data and fakes for this exercise.

import type { ReactNode } from "react";

export type Tab = { id: string; label: string; content: ReactNode };

export const TABS: Tab[] = [
  { id: "map", label: "Map", content: <p>Map view</p> },
  { id: "list", label: "List", content: <p>List view</p> },
  { id: "log", label: "Log", content: <p>Log view</p> },
];
