// Reference solution for exercise 16. Open it only after your own attempt.

import { useState } from "react";

type Hotspot = { id: string; tempC: number };

const PAGE_SIZE = 5;

export function PagedHotspots({ hotspots }: { hotspots: Hotspot[] }) {
  const [minTemp, setMinTemp] = useState(0);
  const [page, setPage] = useState(1);

  const filtered = hotspots.filter(h => h.tempC >= minTemp);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  // Clamp during render, in case the list shrank under the current page.
  const current = Math.min(page, pageCount);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  function changeMinTemp(value: number) {
    setMinTemp(value);
    setPage(1); // reset in the handler. No effect needed.
  }

  return (
    <div>
      <label>
        Minimum temperature
        <input
          type="number"
          value={minTemp}
          onChange={e => changeMinTemp(Number(e.target.value))}
        />
      </label>

      {rows.length === 0 ? (
        <p>No hotspots match.</p>
      ) : (
        <ul>
          {rows.map(h => (
            <li key={h.id}>
              {h.id}, {h.tempC} °C
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => setPage(current - 1)} disabled={current === 1}>
        Previous
      </button>
      <span>
        Page {current} of {pageCount}
      </span>
      <button onClick={() => setPage(current + 1)} disabled={current === pageCount}>
        Next
      </button>
    </div>
  );
}

export default PagedHotspots;
