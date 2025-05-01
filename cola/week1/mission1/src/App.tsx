import "./App.css";
import { useReducer, useState } from "react";

type Todo = {
  id: number;
  content: string;
  completed: boolean;
};

type State = Todo[];

type Action =
  | { type: "SUBMIT"; payload: { id: number; content: string } }
  | { type: "COMPLETE"; payload: { id: number } }
  | { type: "DELETE"; payload: { id: number } };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SUBMIT":
      return [
        ...state,
        {
          id: action.payload.id,
          content: action.payload.content,
          completed: false,
        },
      ];
    case "COMPLETE":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload.id);

    default:
      return state;
  }
};

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [input, setInput] = useState("");

  const onClickSubmit = () => {
    if (input.trim() === "") return;
    dispatch({
      type: "SUBMIT",
      payload: { id: Date.now(), content: input },
    });
    setInput("");
  };

  const onClickComplete = (id: number) => {
    dispatch({
      type: "COMPLETE",
      payload: { id },
    });
  };

  const onClickDelete = (id: number) => {
    dispatch({
      type: "DELETE",
      payload: { id },
    });
  };

  return (
    <section className="todo-container">
      <header className="todo-container__header">
        <h1>YONG TODO</h1>
        <section className="todo-container__add">
          <textarea
            className="todo-container__input"
            value={input}
            placeholder="할 일 입력"
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="todo-container__button" onClick={onClickSubmit}>
            할 일 추가
          </button>
        </section>
      </header>
      <main className="todo-container__render">
        <section className="todo-container__title">
          <h1>할 일</h1>
          <section className="todo-container__list">
            {todos
              .filter((todo) => !todo.completed)
              .map((todo) => (
                <section key={todo.id} className="todo-container__item">
                  <span>{todo.content}</span>
                  <button
                    onClick={() => onClickComplete(todo.id)}
                    className="todo-container__button"
                  >
                    완료
                  </button>
                </section>
              ))}
          </section>
        </section>

        <section className="todo-container__title">
          <h1>완료된 일</h1>
          <section className="todo-container__list">
            {todos
              .filter((todo) => todo.completed)
              .map((todo) => (
                <section key={todo.id} className="todo-container__item">
                  <span>{todo.content}</span>
                  <button
                    onClick={() => onClickDelete(todo.id)}
                    className="todo-container__button todo-container__button--delete"
                  >
                    삭제
                  </button>
                </section>
              ))}
          </section>
        </section>
      </main>
    </section>
  );
}

export default App;
