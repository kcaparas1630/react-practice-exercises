// Reference solution for exercise 13. Open it only after your own attempt.

import { useState } from "react";

type Hotspot = { id: string; tempC: number };

export function HotspotPicker({ hotspots }: { hotspots: Hotspot[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev); // copy first. Never mutate state.
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const allSelected = hotspots.length > 0 && selected.size === hotspots.length;

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(hotspots.map(h => h.id)));
  }

  return (
    <div>
      <label>
        <input type="checkbox" checked={allSelected} onChange={toggleAll} />
        Select all
      </label>
      <p>
        {selected.size} of {hotspots.length} selected
      </p>
      <ul>
        {hotspots.map(h => (
          <li key={h.id}>
            <label>
              <input
                type="checkbox"
                checked={selected.has(h.id)}
                onChange={() => toggle(h.id)}
              />
              {h.id}, {h.tempC} °C
            </label>
          </li>
        ))}
      </ul>
      <button disabled={selected.size === 0}>Export {selected.size} to map</button>
    </div>
  );
}

export default HotspotPicker;
