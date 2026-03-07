import React, { useState, useEffect } from "react";
import "./TodolistTracker.css";

const quotes = [
  "Small progress is still progress.",
  "Focus on one task at a time.",
  "Consistency beats motivation.",
  "Build. Learn. Repeat.",
  "Your future self will thank you."
];

const TodolistTracker = () => {

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      text: task,
      completed: false,
      createdAt: new Date().toLocaleDateString()
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );

    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    const newText = prompt("Edit task:", tasks[index].text);

    if (newText) {
      const updatedTasks = [...tasks];
      updatedTasks[index].text = newText;
      setTasks(updatedTasks);
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="todo-container">

      <h2>Todo List Tracker</h2>

      <p className="quote">"{randomQuote}"</p>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={handleAddTask}>Add</button>
      </div>

      <div className="stats">
        <p>Total: {tasks.length}</p>
        <p>Completed: {completedCount}</p>
        <p>Pending: {pendingCount}</p>
      </div>

      <ul className="task-list">
        {tasks.map((t, index) => (
          <li key={index} className="task-item">

            <span
              className={`circle ${t.completed ? "completed-circle" : ""}`}
              onClick={() => toggleComplete(index)}
            ></span>

            <div className="task-info">
              <span className={t.completed ? "completed" : ""}>
                {t.text}
              </span>

              <div className="date">
                Created: {t.createdAt}
              </div>
            </div>

            <button onClick={() => editTask(index)}>✏️</button>
            <button onClick={() => deleteTask(index)}>🗑</button>

          </li>
        ))}
      </ul>

    </div>
  );
};

export default TodolistTracker;