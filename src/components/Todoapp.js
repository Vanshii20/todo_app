import React, { useState, useEffect } from "react";
import "../App.css";

function Todoapp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Please enter task");
      return;
    }

    const task = {
      text: newTask,
      done: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  const editTask = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const saveTask = (index) => {
    if (editText.trim() === "") return;

    const updated = [...tasks];
    updated[index].text = editText;
    setTasks(updated);
    setEditIndex(null);
    setEditText("");
  };

  return (
      <div className="app-box">
        <h2>To Do App</h2>

        <div className="input-box">
          <input
            type="text"
            placeholder="Enter your task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <div className="task-list">
          {tasks.map((task, index) => (
            <div key={index} className="task-item">
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(index)}
                />

                {editIndex === index ? (
                  <input
                    type="text"
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <span
                    className={`task-text ${
                      task.done ? "completed" : ""
                    }`}
                  >
                    {task.text}
                  </span>
                )}
              </div>

              <div className="task-buttons">
                {editIndex === index ? (
                  <button onClick={() => saveTask(index)}>Save</button>
                ) : (
                  <>
                    <button onClick={() => editTask(index)}>
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(index)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
  
  );
}

export default Todoapp;
