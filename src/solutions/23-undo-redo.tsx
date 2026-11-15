// Reference solution for exercise 23. Open it only after your own attempt.

import { useReducer, useState, type FormEvent } from "react";

type History<T> = { past: T[]; present: T; future: T[] };
type Action<T> = { type: "set"; value: T } | { type: "undo" } | { type: "redo" };

function historyReducer<T>(state: History<T>, action: Action<T>): History<T> {
  switch (action.type) {
    case "set":
      // A new change clears the redo stack.
      return { past: [...state.past, state.present], present: action.value, future: [] };
    case "undo": {
      const previous = state.past[state.past.length - 1];
      if (previous === undefined) return state;
      return {
        past: state.past.slice(0, -1),
        present: previous,
        future: [state.present, ...state.future],
      };
    }
    case "redo": {
      const next = state.future[0];
      if (next === undefined) return state;
      return {
        past: [...state.past, state.present],
        present: next,
        future: state.future.slice(1),
      };
    }
  }
}

export function useHistory<T>(initial: T) {
  const [state, dispatch] = useReducer(historyReducer<T>, {
    past: [],
    present: initial,
    future: [],
  });
  return {
    value: state.present,
    set: (value: T) => dispatch({ type: "set", value }),
    undo: () => dispatch({ type: "undo" }),
    redo: () => dispatch({ type: "redo" }),
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
  };
}

export function AnnotationPad() {
  const { value: labels, set, undo, redo, canUndo, canRedo } = useHistory<string[]>([]);
  const [text, setText] = useState("");

  function add(e: FormEvent) {
    e.preventDefault();
    const label = text.trim();
    if (!label) return;
    set([...labels, label]);
    setText("");
  }

  return (
    <div>
      <form onSubmit={add}>
        <input aria-label="Annotation" value={text} onChange={e => setText(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <button onClick={undo} disabled={!canUndo}>
        Undo
      </button>
      <button onClick={redo} disabled={!canRedo}>
        Redo
      </button>
      <ul>
        {labels.map((label, i) => (
          <li key={`${i}-${label}`}>
            {label}
            <button
              aria-label={`Remove ${label}`}
              onClick={() => set(labels.filter((_, j) => j !== i))}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnnotationPad;
