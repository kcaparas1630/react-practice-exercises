// DO NOT EDIT. Types, sample data and fakes for this exercise.

export type Fire = { id: string; name: string };

// Fake loader for practice. Takes 400 ms and fails on every third call.
let calls = 0;

export async function loadFires(): Promise<Fire[]> {
  calls += 1;
  const call = calls;
  await new Promise(resolve => setTimeout(resolve, 400));
  if (call % 3 === 0) throw new Error("Network error");
  return Array.from({ length: 3 + (call % 4) }, (_, i) => ({ id: `F-${i}`, name: `Fire ${i + 1}` }));
}
