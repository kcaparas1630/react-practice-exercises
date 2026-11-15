// Reference solution for exercise 17. Open it only after your own attempt.

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  // Lazy initial state: the function runs once, on the first render only.
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? initial : (JSON.parse(raw) as T);
    } catch {
      return initial; // storage blocked, or the saved value is not valid JSON
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or blocked. The setting still works for this visit.
    }
  }, [key, value]);

  return [value, setValue] as const;
}

type Units = "metric" | "imperial";

export function UnitToggle({ areaHa }: { areaHa: number }) {
  const [units, setUnits] = useLocalStorage<Units>("units", "metric");
  const area =
    units === "metric" ? `${areaHa} ha` : `${(areaHa * 2.471).toFixed(1)} acres`;

  return (
    <div>
      <p>Fire size: {area}</p>
      <button onClick={() => setUnits(units === "metric" ? "imperial" : "metric")}>
        Switch to {units === "metric" ? "imperial" : "metric"}
      </button>
    </div>
  );
}

export default UnitToggle;
