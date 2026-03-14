import React, { useState, useEffect } from "react";
import "../App.css";

function Todoapp() {

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim() === "") {
      alert("Please enter a task");
      return;
    }

    const newTask = {
      text: taskInput,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    if (window.confirm("Delete this task?")) {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    }
  };

  const startEdit = (index) => {
    setEditId(index);
    setEditValue(tasks[index].text);
  };

  const saveTask = (index) => {
    if (editValue.trim() === "") return;

    const updatedTasks = [...tasks];
    updatedTasks[index].text = editValue;

    setTasks(updatedTasks);
    setEditId(null);
    setEditValue("");
  };

  return (
    <div className="app-box">

      <h2>Todo List</h2>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />

        <button onClick={addTask}>Add</button>
      </div>

      <div className="task-list">

        {tasks.map((task, index) => (

          <div className="task-item" key={index}>

            <div className="task-left">

              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(index)}
              />

              {editId === index ? (
                <input
                  className="edit-input"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              ) : (
                <span className={task.completed ? "completed task-text" : "task-text"}>
                  {task.text}
                </span>
              )}

            </div>

            <div className="task-buttons">

              {editId === index ? (
                <button onClick={() => saveTask(index)}>Save</button>
              ) : (
                <>
                  <button onClick={() => startEdit(index)}>Edit</button>
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