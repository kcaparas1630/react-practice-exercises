// Reference solution for exercise 24. Open it only after your own attempt.

import { useEffect, useReducer, useRef } from "react";

type Status = "queued" | "uploading" | "done" | "failed";
type Item = { id: string; name: string; status: Status };
type Action = { type: "start" | "succeed" | "fail" | "retry"; id: string };

const NEXT_STATUS: Record<Action["type"], Status> = {
  start: "uploading",
  succeed: "done",
  fail: "failed",
  retry: "queued",
};

function reducer(items: Item[], action: Action): Item[] {
  return items.map(item =>
    item.id === action.id ? { ...item, status: NEXT_STATUS[action.type] } : item
  );
}

const MAX_ACTIVE = 2;

type Props = {
  files: { id: string; name: string }[];
  upload: (id: string) => Promise<void>;
};

export function UploadQueue({ files, upload }: Props) {
  const [items, dispatch] = useReducer(reducer, files, initial =>
    initial.map(f => ({ ...f, status: "queued" as const }))
  );

  // Ids being uploaded right now. A ref, because the limit must hold
  // even when the effect runs again before the state update lands
  // (Strict Mode does exactly that in development).
  const inFlight = useRef(new Set<string>());

  useEffect(() => {
    function finish(id: string, type: "succeed" | "fail") {
      inFlight.current.delete(id);
      dispatch({ type, id });
    }

    for (const item of items) {
      if (inFlight.current.size >= MAX_ACTIVE) break;
      if (item.status !== "queued" || inFlight.current.has(item.id)) continue;

      inFlight.current.add(item.id);
      dispatch({ type: "start", id: item.id });
      upload(item.id).then(
        () => finish(item.id, "succeed"),
        () => finish(item.id, "fail")
      );
    }
  }, [items, upload]);

  function retry(id: string) {
    dispatch({ type: "retry", id });
  }

  const done = items.filter(i => i.status === "done").length;

  return (
    <div>
      <p>
        {done} of {items.length} uploaded
      </p>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}: {item.status}
            {item.status === "failed" && (
              <button onClick={() => retry(item.id)}>Retry {item.name}</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UploadQueue;
