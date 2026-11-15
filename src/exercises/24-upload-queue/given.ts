// DO NOT EDIT. Types, sample data and fakes for this exercise.

export const FILES = Array.from({ length: 8 }, (_, i) => ({ id: `f${i + 1}`, name: `IMG_${1001 + i}.jpg` }));

// Fake upload for practice: 1 to 2.5 seconds, fails about one time in four.
// It is defined here, outside any component, so it is the same function on every render.
export function upload(id: string): Promise<void> {
  void id;
  return new Promise((resolve, reject) => {
    setTimeout(
      () => (Math.random() < 0.25 ? reject(new Error("Upload failed")) : resolve()),
      1000 + Math.random() * 1500
    );
  });
}
