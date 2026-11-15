// EDIT THIS FILE. The instructions are in README.md, in this folder.

import { useEffect, useState } from "react";
import type { Todo } from "./given";

export default function TodoList() {
  type FilterState =
    | { state: "All" }
    | { state: "Open" }
    | { state: "Done" }

  // TODO: add, mark done, delete, filter by all / open / done
  const [tasksList, setTasksList] = useState<Todo[]>([]);
  const [taskText, setTaskText] = useState<string>("");
  const [filter, setFilter] = useState<FilterState>({ state: "All" });
  const [openTaskCount, setOpenTaskCount] = useState<number>(0);

  // helper functions
  const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = {id: tasksList.length + 1, text: taskText, done: false };
    setTasksList([...tasksList, newTask]);
    setTaskText("");
    setOpenTaskCount(tasksList.filter((task) => !task.done).length + 1);
  }

  const setTaskDone = (taskId: number) => {
    const updatedTasks = tasksList.map((task) => {
      if (task.id === taskId) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTasksList(updatedTasks);
    setOpenTaskCount(updatedTasks.filter((task) => !task.done).length);
  };
  
  const deleteTask = (taskId: number) => {
    const updatedTasks = tasksList.filter((task) => task.id !== taskId);
    setTasksList(updatedTasks);
    setOpenTaskCount(updatedTasks.filter((task) => !task.done).length);
  }

  // visible tasks based on filter
  const visibleTasks = tasksList.filter((task) => {
    if (filter.state === "All") return true;
    if (filter.state === "Open") return !task.done;
    if (filter.state === "Done") return task.done;
    return true;
  });

  const renderContent = () => {
    if (tasksList.length === 0) {
      return <p>No tasks yet.</p>;
    }
    if (visibleTasks.length === 0) {
      return <p>Nothing here yet.</p>;
    }
    return (
      <div>
        <p>{openTaskCount} left</p>
        <ul>
          {visibleTasks.map((task) => (
            <li key={task.id}>
              <input type="checkbox" checked={task.done} onChange={() => setTaskDone(task.id)} />
              {task.text}
              <button type="button" onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
           <input 
              type="text"
              placeholder="Add a new task"
              value={taskText}
              onChange={e => setTaskText(e.target.value)}
            />
            <button type="submit">Add</button>
        </div>
      </form>
      <div>
        <button type="button" onClick={() => setFilter({ state: "All" })}>All</button>
        <button type="button" onClick={() => setFilter({ state: "Open" })}>Open</button>
        <button type="button" onClick={() => setFilter({ state: "Done" })}>Done</button>
      </div>
      {renderContent()}
    </div>
  )
}
