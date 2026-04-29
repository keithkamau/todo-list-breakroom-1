import { useEffect, useState } from "react";
import { getAllTasks, addTask, deleteTask } from "../database";

function ToDoList() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const saved = await getAllTasks();
      setTasks(saved);
    };
    loadTasks();
  }, []);

  const handleAdd = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    await addTask({ name: trimmed });
    const updated = await getAllTasks();
    setTasks(updated);
    setInputValue("");
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    const updated = await getAllTasks();
    setTasks(updated);
  };

  return (
    <div>
      <h1>To Do List</h1>
      <input
        value={inputValue}
        type='text'
        placeholder='Enter Task'
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button onClick={handleAdd}>Add</button>
      <h3>Current Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <p>{task.name}</p>
            <button onClick={() => handleDelete(task.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
