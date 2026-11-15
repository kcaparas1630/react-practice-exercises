// Reference solution for exercise 03. Open it only after your own attempt.

import { useState, type FormEvent } from "react";

type Todo = { id: number; text: string; done: boolean };
type Filter = "all" | "open" | "done";

let nextId = 1;

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  function addTodo(e: FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos(prev => [...prev, { id: nextId++, text: trimmed, done: false }]);
    setText("");
  }

  function toggle(id: number) {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function remove(id: number) {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  // Derived during render. Not stored in state.
  const visible = todos.filter(t =>
    filter === "all" ? true : filter === "done" ? t.done : !t.done
  );
  const openCount = todos.filter(t => !t.done).length;

  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          aria-label="New task"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {(["all", "open", "done"] as const).map(f => (
        <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
          {f}
        </button>
      ))}

      <p>{openCount} left</p>

      {visible.length === 0 ? (
        <p>Nothing here.</p>
      ) : (
        <ul>
          {visible.map(t => (
            <li key={t.id}>
              <label>
                <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
                {t.text}
              </label>
              <button onClick={() => remove(t.id)} aria-label={`Delete ${t.text}`}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
