// Reference solution for exercise 09. Open it only after your own attempt.

import { useState } from "react";

export type Fire = { id: string; name: string; sizeHa: number; status: string };

type ListProps = {
  fires: Fire[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

function FireList({ fires, selectedId, onSelect }: ListProps) {
  return (
    <ul>
      {fires.map(f => (
        <li key={f.id}>
          <button aria-pressed={f.id === selectedId} onClick={() => onSelect(f.id)}>
            {f.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

function FireDetail({ fire }: { fire: Fire | null }) {
  if (!fire) return <p>Select a fire to see details.</p>;
  return (
    <section>
      <h2>{fire.name}</h2>
      <p>
        {fire.sizeHa} ha, {fire.status}
      </p>
    </section>
  );
}

export function FireBrowser({ fires }: { fires: Fire[] }) {
  // The nearest common parent owns the state. Store the id, not the object,
  // so the detail can never show an out-of-date copy.
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = fires.find(f => f.id === selectedId) ?? null;

  return (
    <div>
      <FireList fires={fires} selectedId={selectedId} onSelect={setSelectedId} />
      <FireDetail fire={selected} />
    </div>
  );
}

export default FireBrowser;
