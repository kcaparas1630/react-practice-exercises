// @ts-nocheck
// EDIT THIS FILE. The instructions are in README.md, in this folder.
// Type checking is switched off here so the compiler does not give the bugs away.
// Remove the first line once you think you have fixed all six.

import { useEffect, useState } from "react";
import type { Fire } from "./given";

export default function FireFeed({ fires }: { fires: Fire[] }) {
  const [list, setList] = useState(fires);
  const [seconds, setSeconds] = useState(0);
  const [large, setLarge] = useState<Fire[]>([]);

  useEffect(() => {
    setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    setLarge(list.filter(f => f.sizeHa > 100));
  }, [list]);

  function dismiss(index: number) {
    list.splice(index, 1);
    setList(list);
  }

  return (
    <div>
      <p>
        Open for {seconds}s. {large.length} large fires.
      </p>
      <ul>
        {list.map((fire, i) => (
          <li key={i}>
            <input placeholder="Note" />
            {fire.name}
            <button onClick={dismiss(i)}>Dismiss</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
