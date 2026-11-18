// EDIT THIS FILE. The instructions are in README.md, in this folder.

import { useState, useEffect } from "react";

/**
 * Requirements
 * - Build the reusable useDebouncedValue hook
 * - The text should appear in the input field, and not laggy.
 * - An empty query will show "No Results - type to show a result"
 * - When nothing matches, show a message saying "No Result"
 * 
 * Proposed Plan
 * - Build the reusable useDebounceValue hook with a state called debouncedValue
 * - and a useEffect with a cleanup for setTimer
 * - Implement a state ith useDebouncedValue hook that will store the query which we used in the value
 */

export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs)

    return () => clearTimeout(handler);
  }, [value, delayMs]);

  return debouncedValue;
}

export default function PlaceSearch({ places }: { places: string[] }) {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebouncedValue(query, 300);
  const trimmedQuery = debouncedQuery.trim().toLowerCase();

  const filteredPlaces = trimmedQuery === "" ? [] : places.filter((place) => place.toLowerCase().includes(trimmedQuery));

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        />
      {filteredPlaces.length === 0 && trimmedQuery !== ""  && <p>No results</p>}
      {trimmedQuery === "" && <p>No Results - start typing to show results</p>}
      {filteredPlaces.map((places) => (
        <ul>
          <li key={places}>{places}</li>
        </ul>
      ))}
    </div>
  )
}
