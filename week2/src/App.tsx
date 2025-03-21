import { ReactElement } from "react";
import "./App.css";
import Todo from "./components/Todo";
import { TodoProvider } from "./context/TodoContext";

function App(): ReactElement {
  return (
    <TodoProvider>
      <Todo />
    </TodoProvider>
  );
}

export default App;
