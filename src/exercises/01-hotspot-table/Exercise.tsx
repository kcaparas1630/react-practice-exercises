// EDIT THIS FILE. The instructions are in README.md, in this folder.

import { EventHandler, useEffect, useState } from "react";
import type { Hotspot } from "./given";

type SortKey = "areaM2" | "tempC" | "distanceM";

export default function HotspotTable({ hotspots }: { hotspots: Hotspot[] }) {
  const [minTemp, setMinTemp] = useState<number>(0);
  const [sortKey, setSortKey] = useState<SortKey>("tempC");
  const [descending, setDescending] = useState<boolean>(true);

  const filteredHotspots = hotspots
    .filter((hotspot) => hotspot.tempC >= minTemp)
    .sort((a, b) => descending ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey])

  const handleDescending = (key: SortKey) => {
    setDescending(prev => !prev);
    setSortKey(key);
  }

  return (
    <div>
      <input
        type="number"
        value={minTemp}
        onChange={e => setMinTemp(Number(e.target.value))}
      />
      <p>Showing {filteredHotspots.length} of {hotspots.length}</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>
              <button type="button" onClick={() => handleDescending("tempC")}>
                {descending ? "TempC v" : "TempC ^"}
              </button>
            </th>
            <th>
              <button type="button" onClick={() => handleDescending("areaM2")}>
                {descending ? "AreaM2 v" : "AreaM2 ^"}
              </button>
            </th>
            <th>
              <button type="button" onClick={() => handleDescending("distanceM")}>
                {descending ? "To Perimeter v" : "To Perimeter ^"}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredHotspots.map((hotspot) => (
              <tr key={hotspot.id}>
                <td>{hotspot.id}</td>
                <td>{hotspot.tempC}</td>
                <td>{hotspot.areaM2}</td>
                <td>{hotspot.distanceM}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
