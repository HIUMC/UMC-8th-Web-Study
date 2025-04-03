import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { TTodo } from "../types/todo";

const TodoBefore = (): ReactElement => {
  // 입력 받을 변수
  const [input, setInput] = useState<string>("");

  // 할 일을 넣는 배열
  const [todos, setTodos] = useState<TTodo[]>([]);

  // 할 일에서 완료에 넣는 배열
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

  // input 에 넣은 값 저장하기
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Form 은 무조건 네트워크 요청을 감 => 무조건 새로고침이 발생함.
  // Form 태그를 통신에 사용하기
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();

    if (text) {
      const newTodo: TTodo = { id: Date.now(), text: text };
      setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
      setInput("");
    }
  };

  // 할 일에서 완료 버튼을 누르면 삭제로 옮겨지게 하기기
  const completeTodo = (todo: TTodo): void => {
    setTodos((prevTodos): TTodo[] => prevTodos.filter((t) => t.id !== todo.id));
    setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
  };

  // 완료에서 삭제 버튼을 누르면 없애기
  const deleteTodo = (todo: TTodo): void => {
    setDoneTodos((prevTodos): TTodo[] =>
      prevTodos.filter((t) => t.id !== todo.id)
    );
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">YONG TODO</h1>
      <form
        id="todo-form"
        className="todo-container__form"
        onSubmit={handleSubmit}
      >
        <input
          value={input}
          onChange={handleInput}
          type="text"
          id="todo-input"
          className="todo-container__input"
          placeholder="할 일 입력"
          required
        />
        <button type="submit" className="todo-container__button">
          할 일 추가
        </button>
      </form>

      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul id="todo-list" className="render-container__list">
            {todos.map((todo: TTodo) => {
              return (
                <li key={todo.id} className="render-container__item">
                  <span className="render-container__item-text">
                    {todo.text}
                  </span>
                  <button
                    className="render-container__item-button"
                    style={{ backgroundColor: "#28a745" }}
                    onClick={(): void => completeTodo(todo)}
                  >
                    완료
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul id="todo-list" className="render-container__list">
            {doneTodos.map((doneTodo: TTodo) => {
              return (
                <li key={doneTodo.id} className="render-container__item">
                  <span className="render-container__item-text">
                    {doneTodo.text}
                  </span>
                  <button
                    className="render-container__item-button"
                    style={{ backgroundColor: "#dc3545" }}
                    onClick={() => deleteTodo(doneTodo)}
                  >
                    삭제
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoBefore;
