import { useState,useEffect } from "react";
import "./App.css";

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : []; // Load or start with an empty list
  });
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    console.log("Saving todos to localStorage:", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  

  // Add new todo
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle complete status
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Start editing
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // Submit edit
  const submitEdit = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  return (
    <>
      <h1 className="text-center text-4xl text-blue-900 py-3 font-bold underline">
        To-Do Application
      </h1>

      <form className=" flex justify-between max-w-sm mx-auto">
        <div className="w-full mb-5 mt-5">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add your To-Do here..."
            required
          />
        </div>

        <button
          onClick={addTodo}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-5 mt-5 h-full"
        >
          Add
        </button>
      </form>
      <div className="flex justify-around">
        <ul className="space-y-2 w-3/4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center bg-gray-100 p-2 rounded-md"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="mr-2"
              />
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="flex-grow p-1 border rounded-md"
                />
              ) : (
                <span
                  className={`flex-grow ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  {todo.text}
                </span>
              )}
              {editingId === todo.id ? (
                <button
                  onClick={submitEdit}
                  className="bg-green-500 text-white px-2 py-1 ml-2 rounded-md hover:bg-green-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEditing(todo.id, todo.text)}
                  disabled={todo.completed} // Disables button when checkbox is checked
                  className={`px-2 py-1 ml-2 rounded-md ${
                    todo.completed
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed" // Style for disabled button
                      : "bg-yellow-500 text-white hover:bg-yellow-600" // Style for enabled button
                  }`}
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 text-white px-2 py-1 ml-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TodoApp;
