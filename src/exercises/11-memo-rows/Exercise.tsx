// EDIT THIS FILE. The instructions are in README.md, in this folder.

// This component works, but every row re-renders on every keystroke in the note field.
// Fix it. Keep the console.log in HotspotRow: it shows which rows render.

import { useState } from "react";
import type { Hotspot } from "./given";

type RowProps = { hotspot: Hotspot; confirmed: boolean; onToggle: () => void };

function HotspotRow({ hotspot, confirmed, onToggle }: RowProps) {
  console.log("row rendered", hotspot.id);
  return (
    <li>
      <label>
        <input type="checkbox" checked={confirmed} onChange={onToggle} />
        {hotspot.id}, {hotspot.tempC} °C
      </label>
    </li>
  );
}

export default function ReviewPanel({ hotspots }: { hotspots: Hotspot[] }) {
  const [note, setNote] = useState("");
  const [confirmed, setConfirmed] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setConfirmed(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div>
      <input aria-label="Shift note" placeholder="Shift note" value={note} onChange={e => setNote(e.target.value)} />
      <p>{confirmed.size} confirmed</p>
      <ul>
        {hotspots.map(h => (
          <HotspotRow key={h.id} hotspot={h} confirmed={confirmed.has(h.id)} onToggle={() => toggle(h.id)} />
        ))}
      </ul>
    </div>
  );
}
