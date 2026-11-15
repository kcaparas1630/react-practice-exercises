// Reference solution for exercise 10. Open it only after your own attempt.

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type Fire = { id: string; name: string; sizeHa: number; status: string };

type Selection = {
  selectedId: string | null;
  select: (id: string | null) => void;
};

// null default, so using the hook outside the provider fails loudly.
const SelectionContext = createContext<Selection | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Same object until selectedId changes, so consumers do not
  // re-render just because the provider's parent re-rendered.
  const value = useMemo(() => ({ selectedId, select: setSelectedId }), [selectedId]);

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useSelection must be used inside SelectionProvider");
  return ctx;
}

function FireList({ fires }: { fires: Fire[] }) {
  const { selectedId, select } = useSelection();
  return (
    <ul>
      {fires.map(f => (
        <li key={f.id}>
          <button aria-pressed={f.id === selectedId} onClick={() => select(f.id)}>
            {f.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

function FireDetail({ fires }: { fires: Fire[] }) {
  const { selectedId, select } = useSelection();
  const fire = fires.find(f => f.id === selectedId);
  if (!fire) return <p>Select a fire to see details.</p>;
  return (
    <section>
      <h2>{fire.name}</h2>
      <p>
        {fire.sizeHa} ha, {fire.status}
      </p>
      <button onClick={() => select(null)}>Clear selection</button>
    </section>
  );
}

export function FireBrowser({ fires }: { fires: Fire[] }) {
  return (
    <SelectionProvider>
      <FireList fires={fires} />
      <FireDetail fires={fires} />
    </SelectionProvider>
  );
}

export default FireBrowser;
