import { TodoProvider } from "./context/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import DoneList from "./components/DoneList";
import "./style.css";

export default function App() {
  return (
    <TodoProvider>
      <div className="todo-container">
        <h1 className="todo-container__header">DUNE TODO</h1>
        <TodoForm />
        <div className="render-container">
          <TodoList />
          <DoneList />
        </div>
      </div>
    </TodoProvider>
  );
}
