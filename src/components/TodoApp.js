import React, { useState } from "react";

function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Add Task Function
  const addTask = () => {
    if (task.trim() === "") {
      alert("Please enter a task!");
    } else {
      setTodos([...todos, { text: task, completed: false }]);
      alert("Task added successfully!");
      setTask("");
    }
  };

  // Complete Task Function
  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <h2>To-Do Application</h2>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Enter your task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      {/* Add Button */}
      <button onClick={addTask}>Add</button>

      {/* Display Tasks */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
            />
            <span className={todo.completed ? "completed" : ""}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
