"use client";
import React, { useState } from "react";
import useTodoStore from "../store";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const editTodo = useTodoStore((state) => state.editTodo);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo({
        id: Date.now(),
        text: newTodo,
        completed: false,
      });
      setNewTodo("");
    }
  };

  const handleEditTodo = (id) => {
    editTodo(id, editingText);
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-96 p-6">
        <div>
          <h1 className="text-center">Todo List</h1>
          <Card>
            <div>
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
              />
              <button onClick={handleAddTodo}>Add</button>
            </div>

            <div className="">
              <ul>
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {editingId === todo.id ? (
                      <>
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                        />
                        <button onClick={() => handleEditTodo(todo.id)}>
                          Save
                        </button>{" "}
                        <button onClick={() => setEditingId(null)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">

                          <div>
                            <span
                              onClick={() => toggleTodo(todo.id)}
                              style={{ cursor: "pointer" }}
                            >
                              {todo.text}
                            </span>
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                setEditingId(todo.id);
                                setEditingText(todo.text);
                              }}
                              style={{ marginLeft: "10px" }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => removeTodo(todo.id)}
                              style={{ marginLeft: "10px" }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
}
