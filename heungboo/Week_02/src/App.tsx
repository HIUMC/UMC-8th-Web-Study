import { ReactElement } from "react";
import "./App.css";
import TodoBefore from "./components/TodoBefore";
import Todo from "./components/Todo";

function App(): ReactElement {
  return (
    <>
      <Todo />
      <TodoBefore />
    </>
  );
}

export default App;
