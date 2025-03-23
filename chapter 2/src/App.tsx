import styled from "styled-components";
import Todolist from "./components/Todolist";
import "./App.css";
import { TodoProvider } from "./context/TodoListsContext";

function App() {
  return (
    <>
      <Wrapper>Todolist by React</Wrapper>
      <TodoProvider>
        <Todolist></Todolist>
      </TodoProvider>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  margin-top: 200px;
`;
