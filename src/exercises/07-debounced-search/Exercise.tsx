// EDIT THIS FILE. The instructions are in README.md, in this folder.

export function useDebouncedValue<T>(value: T, delayMs: number): T {
  // TODO: return the value only after it has stopped changing for delayMs
  void delayMs;
  return value;
}

export default function PlaceSearch({ places }: { places: string[] }) {
  // TODO: an input, the debounced query, the filtered list
  return <p>Not built yet. {places.length} places were passed in.</p>;
}
