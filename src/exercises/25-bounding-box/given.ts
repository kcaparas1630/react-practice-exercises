// DO NOT EDIT. Types, sample data and fakes for this exercise.

export type Point = { lat: number; lng: number };
export type Bounds = { minLat: number; maxLat: number; minLng: number; maxLng: number };

export const POINTS: Point[] = [
  { lat: 50.67, lng: -120.33 }, // Kamloops
  { lat: 48.43, lng: -123.37 }, // Victoria
  { lat: 53.92, lng: -122.75 }, // Prince George
];

// Expected: boundsOf(POINTS)
// { minLat: 48.43, maxLat: 53.92, minLng: -123.37, maxLng: -120.33 }
