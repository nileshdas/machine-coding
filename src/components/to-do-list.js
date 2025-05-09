import React, { useState, useEffect } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddOrUpdate = () => {
    if (input.trim() === "") return;

    if (editIndex !== null) {
      // Update existing todo
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = input.trim();
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      // Add new todo
      setTodos([...todos, input.trim()]);
    }
    setInput("");
  };

  const handleEdit = (index) => {
    setInput(todos[index]);
    setEditIndex(index);
  };

  const handleRemove = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div
      style={{ maxWidth: "500px", margin: "2rem auto", fontFamily: "Arial" }}
    >
      <h1>Todo List</h1>
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
          placeholder="Enter a task"
        />
        <button
          onClick={handleAddOrUpdate}
          style={{ marginLeft: "8px", padding: "8px" }}
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <span style={{ flex: 1 }}>{todo}</span>
            <button
              onClick={() => handleEdit(index)}
              style={{ marginRight: "5px" }}
            >
              Edit
            </button>
            <button onClick={() => handleRemove(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
