// DO NOT EDIT. Types, sample data and fakes for this exercise.

export type Hotspot = { id: string; confirmed: boolean };

export const INITIAL: Hotspot[] = [
  { id: "H-01", confirmed: false },
  { id: "H-02", confirmed: false },
  { id: "H-03", confirmed: true },
];

// Fake save for practice: takes one second, fails about one time in three.
export function saveConfirmed(id: string, confirmed: boolean): Promise<void> {
  void id;
  void confirmed;
  return new Promise((resolve, reject) => {
    setTimeout(() => (Math.random() < 0.33 ? reject(new Error("Save failed")) : resolve()), 1000);
  });
}
