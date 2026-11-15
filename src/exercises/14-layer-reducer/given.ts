// DO NOT EDIT. Types, sample data and fakes for this exercise.

export type Layer = { id: string; label: string; visible: boolean; opacity: number };

export const INITIAL: Layer[] = [
  { id: "hotspots", label: "Hotspots", visible: true, opacity: 100 },
  { id: "perimeter", label: "Fire perimeter", visible: true, opacity: 100 },
  { id: "ortho", label: "Orthomosaic", visible: false, opacity: 80 },
];
