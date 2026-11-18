// EDIT THIS FILE. The instructions are in README.md, in this folder.
// Type checking is switched off here so the compiler does not give the bugs away.
// Remove the first line once you think you have fixed all six.

import { useEffect, useState } from "react";
import type { Fire } from "./given";

export default function FireFeed({ fires }: { fires: Fire[] }) {
  // Local States
  const [list, setList] = useState<Fire[]>(fires);
  const [seconds, setSeconds] = useState(0);

  const largeFires = list.filter((fire) => fire.sizeHa > 100);

  useEffect(() => {
   const id = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  function dismiss(id: string) {
    const filteredList = list.filter((fire) => fire.id !== id);
    setList(filteredList);
  }

  return (
    <div>
      <p>
        Open for {seconds}s. {largeFires.length} large fires.
      </p>
      <ul>
        {list.map((fire) => (
          <li key={fire.id}>
            <input type="text" placeholder="Note" />
            {fire.name}
            <button onClick={() => dismiss(fire.id)}>Dismiss</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
