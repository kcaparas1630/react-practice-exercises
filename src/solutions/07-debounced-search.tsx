// Reference solution for exercise 07. Open it only after your own attempt.

import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    // Every new keystroke cancels the previous timer.
    return () => clearTimeout(id);
  }, [value, delayMs]);

  return debounced;
}

export function PlaceSearch({ places }: { places: string[] }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);

  const q = debouncedQuery.trim().toLowerCase();
  const matches = q === "" ? [] : places.filter(p => p.toLowerCase().includes(q));

  return (
    <div>
      <input
        aria-label="Search places"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {q !== "" && matches.length === 0 && <p>No places match "{debouncedQuery}".</p>}
      <ul>
        {matches.map(p => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlaceSearch;
