import { ReactElement } from "react";
import "./App.css";
import Todo from "./components/Todo";
import { TodoProvider } from "./context/todoContext";

function App(): ReactElement {
  return (
    <TodoProvider>
      <Todo />
      {/* <TodoBefore /> */}
    </TodoProvider>
  );
}

export default App;
