import "./App.css";
import { useReducer, useState } from "react";
import { TodoContext } from "./context/TodoContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

export type Todo = {
  id: number;
  content: string;
  completed: boolean;
};

type State = Todo[];

export type Action =
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

  return (
    <TodoContext.Provider value={{ todos, dispatch, input, setInput }}>
      <section className="todo-container">
        <header className="todo-container__header">
          <h1>COLA TODO</h1>
          <TodoInput />
        </header>
        <main className="todo-container__render">
          <TodoList type="active" />
          <TodoList type="completed" />
        </main>
      </section>
    </TodoContext.Provider>
  );
}

export default App;
