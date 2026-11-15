// Reference solution for exercise 04. Open it only after your own attempt.

import { useEffect, useState } from "react";

type Fire = { id: string; name: string; sizeHa: number };

export function FireFeed({ fires }: { fires: Fire[] }) {
  const [list, setList] = useState(fires);
  const [seconds, setSeconds] = useState(0);

  // Fix 3: derived value, calculated during render. No state, no effect.
  const large = list.filter(f => f.sizeHa > 100);

  useEffect(() => {
    // Fix 2: updater function, so the callback never reads a stale value.
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    // Fix 1: cleanup stops the interval on unmount.
    return () => clearInterval(id);
  }, []);

  function dismiss(id: string) {
    // Fix 4: build a new array. splice() mutated the old one.
    setList(prev => prev.filter(f => f.id !== id));
  }

  return (
    <div>
      <p>
        Open for {seconds}s. {large.length} large fires.
      </p>
      <ul>
        {list.map(fire => (
          // Fix 5: stable id as key, so each note stays with its fire.
          <li key={fire.id}>
            <input placeholder="Note" aria-label={`Note for ${fire.name}`} />
            {fire.name}
            {/* Fix 6: pass a function. dismiss(i) ran during render. */}
            <button onClick={() => dismiss(fire.id)}>Dismiss</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FireFeed;
