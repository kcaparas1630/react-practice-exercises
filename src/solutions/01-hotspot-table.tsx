// Reference solution for exercise 01. Open it only after your own attempt.

import { useState } from "react";

export type Hotspot = { id: string; tempC: number; areaM2: number; distanceM: number };
type SortKey = "tempC" | "areaM2" | "distanceM";

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "tempC", label: "Temp (°C)" },
  { key: "areaM2", label: "Area (m²)" },
  { key: "distanceM", label: "To perimeter (m)" },
];

export function HotspotTable({ hotspots }: { hotspots: Hotspot[] }) {
  const [minTemp, setMinTemp] = useState(0);
  const [sortKey, setSortKey] = useState<SortKey>("tempC");
  const [descending, setDescending] = useState(true);

  function sortBy(key: SortKey) {
    if (key === sortKey) {
      setDescending(d => !d);
    } else {
      setSortKey(key);
      setDescending(true);
    }
  }

  // filter() returns a new array, so sorting it does not mutate the prop.
  const rows = hotspots
    .filter(h => h.tempC >= minTemp)
    .sort((a, b) => (descending ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey]));

  return (
    <div>
      <label>
        Minimum temperature
        <input
          type="number"
          value={minTemp}
          onChange={e => setMinTemp(Number(e.target.value))}
        />
      </label>

      <p>
        Showing {rows.length} of {hotspots.length}
      </p>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            {COLUMNS.map(col => (
              <th key={col.key}>
                <button onClick={() => sortBy(col.key)}>
                  {col.label}
                  {sortKey === col.key ? (descending ? " ↓" : " ↑") : ""}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(h => (
            <tr key={h.id}>
              <td>{h.id}</td>
              <td>{h.tempC}</td>
              <td>{h.areaM2}</td>
              <td>{h.distanceM}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HotspotTable;
