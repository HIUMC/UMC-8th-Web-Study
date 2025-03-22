import "./App.css";
import { useState } from "react";

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
      <h1 className="todo-container__header">YONG TODO</h1>
      <form id="todo-form" className="todo-container__form">
        <input
          value={inputValue}
          onChange={handleChange}
          type="text"
          id="todo-input"
          className="todo-container__input"
          placeholder="할 일 입력"
          required
        />
        <button
          type="button"
          className="todo-container__button"
          onClick={() => handleAddTodo()}
        >
          할 일 추가
        </button>
      </form>
      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul id="todo-list" className="render-container__list">
            {todos.map((todo, index) => (
              <div className="render-container__item" key={index}>
                <li key={index} className="render-container__item-text">
                  {todo}
                </li>
                <button
                  className="render-container__item-button"
                  onClick={() => handleCompleteTodo(index)}
                  style={{ backgroundColor: "green" }}
                >
                  완료
                </button>
              </div>
            ))}
          </ul>
        </div>
        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul id="done-list" className="render-container__list">
            {doneTodos.map((done, index) => (
              <div className="render-container__item" key={index}>
                <li key={index} className="render-container__item-text">
                  {done}
                </li>
                <button
                  className="render-container__item-button"
                  onClick={() => handleDeleteTodo(index)}
                  style={{ backgroundColor: "red" }}
                >
                  삭제
                </button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
