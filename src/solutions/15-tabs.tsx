// Reference solution for exercise 15. Open it only after your own attempt.

import { useState, type KeyboardEvent, type ReactNode } from "react";

type Tab = { id: string; label: string; content: ReactNode };

export function Tabs({ tabs }: { tabs: Tab[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  // Fall back to the first tab if the active one was removed.
  const active = tabs.find(t => t.id === activeId) ?? tabs[0];

  if (!active) return null;

  function onKeyDown(e: KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const index = tabs.findIndex(t => t.id === active?.id);
    const step = e.key === "ArrowRight" ? 1 : -1;
    const next = tabs[(index + step + tabs.length) % tabs.length];
    if (next) {
      setActiveId(next.id);
      document.getElementById(`tab-${next.id}`)?.focus();
    }
  }

  return (
    <div>
      <div role="tablist" onKeyDown={onKeyDown}>
        {tabs.map(t => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            role="tab"
            aria-selected={t.id === active.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={t.id === active.id ? 0 : -1}
            onClick={() => setActiveId(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${active.id}`} aria-labelledby={`tab-${active.id}`}>
        {active.content}
      </div>
    </div>
  );
}

export default Tabs;
