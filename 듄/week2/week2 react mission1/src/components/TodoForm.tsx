import { useState } from "react";
import { useTodo } from "../context/TodoContext";

export default function TodoForm() {
  const [inputValue, setInputValue] = useState("");
  const { addTodo } = useTodo();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim() === "") return;
    addTodo(inputValue);
    setInputValue("");
  };

  return (
    <form className="todo-container__form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-container__input"
        placeholder="할 일 입력"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        required
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
}
