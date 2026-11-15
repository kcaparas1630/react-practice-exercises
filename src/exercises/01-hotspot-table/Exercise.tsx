// EDIT THIS FILE. The instructions are in README.md, in this folder.

import { useState } from "react";
import type { Hotspot } from "./given";

export default function HotspotTable({ hotspots }: { hotspots: Hotspot[] }) {
  // TODO: minimum temperature filter, sortable columns, "Showing X of Y"
  type SortKey = "tempC" | "areaM2" | "distanceM";

  const COLUMNS: { key: SortKey, label: string | number }[] = [
    { key: "tempC", label: "Temperature(C)" },
    { key: "areaM2", label: "Area(m^2)" },
    { key: "distanceM", label: "To perimeter (m)" },
  ];

  // Local States
  const [minTemp, setMinTemp] = useState<number>(0);
  const [sortKey, setSortKey] = useState<SortKey>("tempC");
  const [descending, setDescending] = useState<boolean>(true);

  const sortBy = (key: SortKey) => {
    if (key === sortKey) {
      setDescending(position => !position);
    }
    else {
      setSortKey(key);
      setDescending(true);
    }
  }
  const rows = hotspots
    .filter((temp) => temp.tempC >= minTemp)
    .sort((a, b) => descending ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey])

  return (
    <div>
      <input
        type="number"
        value={minTemp}
        onChange={event => setMinTemp(Number(event.target.value))}
        placeholder="Enter minimum temperature"
      />
      <p>Showing {rows.length} of {hotspots.length}</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            {COLUMNS.map((cols) => (
              <th key={cols.key}>
                <button type="button" onClick={() => sortBy(cols.key)}>
                  {cols.label}
                  {sortKey === cols.key ? (descending ? "^" : "v") : ""}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((hotspots) => (
            <tr key={hotspots.id}>
              <td>{hotspots.id}</td>
              <td>{hotspots.tempC}</td>
              <td>{hotspots.areaM2}</td>
              <td>{hotspots.distanceM}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
