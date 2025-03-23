import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Render from "./components/Render";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<string[]>([]);
  const [doneTodos, setDoneTodos] = useState<string[]>([]);
  const [deleteTodo, setDeleteTodo] = useState<string[]>([]);

  const handleChange = (e) => {
    // console.log("e.target.value : " + e.target.value);
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;

    setTodos([...todos, inputValue]);
    setInputValue("");
  };

  const handleCompleteTodo = (index: number) => {
    const completedTodo = todos[index];
    setDoneTodos([...doneTodos, completedTodo]);
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleDeleteTodo = (index: number) => {
    const delTodo = doneTodos[index];
    setDeleteTodo([...deleteTodo, delTodo]);
    setDoneTodos(doneTodos.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-container">
      <Header
        inputValue={inputValue}
        handleChange={handleChange}
        handleAddTodo={handleAddTodo}
      />
      <Render
        todos={todos}
        handleCompleteTodo={handleCompleteTodo}
        doneTodos={doneTodos}
        handleDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}

export default App;
