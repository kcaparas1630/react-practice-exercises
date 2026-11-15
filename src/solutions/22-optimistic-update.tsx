// Reference solution for exercise 22. Open it only after your own attempt.

import { useState } from "react";

type Hotspot = { id: string; confirmed: boolean };

type Props = {
  initial: Hotspot[];
  // Resolves when the server has saved, rejects when it has not.
  saveConfirmed: (id: string, confirmed: boolean) => Promise<void>;
};

export function HotspotReview({ initial, saveConfirmed }: Props) {
  const [hotspots, setHotspots] = useState(initial);
  const [saving, setSaving] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  function setConfirmed(id: string, confirmed: boolean) {
    setHotspots(prev => prev.map(h => (h.id === id ? { ...h, confirmed } : h)));
  }

  function setIsSaving(id: string, isSaving: boolean) {
    setSaving(prev => {
      const next = new Set(prev);
      if (isSaving) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  async function toggle(hotspot: Hotspot) {
    const next = !hotspot.confirmed;
    setError(null);
    setConfirmed(hotspot.id, next); // 1. show the change straight away
    setIsSaving(hotspot.id, true);
    try {
      await saveConfirmed(hotspot.id, next); // 2. save in the background
    } catch {
      setConfirmed(hotspot.id, !next); // 3. put it back if the save failed
      setError(`Could not save ${hotspot.id}. The change was undone.`);
    } finally {
      setIsSaving(hotspot.id, false);
    }
  }

  return (
    <div>
      {error && <p role="alert">{error}</p>}
      <ul>
        {hotspots.map(h => (
          <li key={h.id}>
            <label>
              <input
                type="checkbox"
                checked={h.confirmed}
                disabled={saving.has(h.id)} // one save per row at a time
                onChange={() => toggle(h)}
              />
              {h.id}
              {saving.has(h.id) && " (saving…)"}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HotspotReview;
