// Reference solution for exercise 11. Open it only after your own attempt.

import { memo, useCallback, useState } from "react";

type Hotspot = { id: string; tempC: number };

type RowProps = {
  hotspot: Hotspot;
  confirmed: boolean;
  onToggle: (id: string) => void;
};

// memo: skip the re-render when every prop is the same as last time.
const HotspotRow = memo(function HotspotRow({ hotspot, confirmed, onToggle }: RowProps) {
  console.log("row rendered", hotspot.id); // same log as the starter
  return (
    <li>
      <label>
        <input type="checkbox" checked={confirmed} onChange={() => onToggle(hotspot.id)} />
        {hotspot.id}, {hotspot.tempC} °C
      </label>
    </li>
  );
});

export function ReviewPanel({ hotspots }: { hotspots: Hotspot[] }) {
  const [note, setNote] = useState("");
  const [confirmed, setConfirmed] = useState<Set<string>>(new Set());

  // One stable function for every row. The updater form means it needs
  // no dependencies, so its identity never changes.
  const toggle = useCallback((id: string) => {
    setConfirmed(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <div>
      <input aria-label="Shift note" value={note} onChange={e => setNote(e.target.value)} />
      <p>{confirmed.size} confirmed</p>
      <ul>
        {hotspots.map(h => (
          <HotspotRow
            key={h.id}
            hotspot={h}
            confirmed={confirmed.has(h.id)}
            onToggle={toggle}
          />
        ))}
      </ul>
    </div>
  );
}

export default ReviewPanel;
