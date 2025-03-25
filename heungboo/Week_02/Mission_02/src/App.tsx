import { ReactElement } from "react";
import "./App.css";
import Todo from "./components/Todo";
import { TodoProvider } from "./context/todoContext";
import { ThemeProvider } from "./context/ThemeProvider";
function App(): ReactElement {
  return (
    <ThemeProvider>
      <TodoProvider>
        <Todo />
        {/* <TodoBefore /> */}
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
