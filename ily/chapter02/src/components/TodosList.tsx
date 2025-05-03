import { useState } from "react";
import styled from "styled-components";
import TodonesList from "./TodonesList";
import { Button_Todones } from "../context/Buttons";
import {
  useTodoContext,
  useTodonesContext,
} from "./../context/TodoListsContext";

function TodosList() {
  const [newTodones, setNewTodones] = useState<string>("");
  const { todos, setTodos } = useTodoContext();
  const { todones, setTodones } = useTodonesContext();
  //todones로 목록을 옮기기 위한 handler
  const handleTodones = (index: number) => {
    const complete: string = todos[index];
    setTodos(todos.filter((_, i) => i !== index)); // filter이용 방법을 정확하게 알지 못해서 이 부분 또한 gpt로 해결함.
    console.log(newTodones);
    setTodones([...todones, complete]);
  };

  return (
    <>
      <Wrapper>
        <h1 style={{ textAlign: "center" }}>Todos</h1>
        <Wrapper_Todos>
          <ul
            style={{ listStyle: "none", margin: "0", flexDirection: "column" }}
          >
            {todos.map((todos, index) => (
              <li key={index}>
                {todos}
                <Button_Todones
                  onClick={handleTodones}
                  value={index}
                  label="완료"
                />
              </li>
            ))}
          </ul>
        </Wrapper_Todos>
      </Wrapper>
      <TodonesList></TodonesList>
    </>
  );
}

export default TodosList;

const Wrapper_Todos = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 30vw;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: aquamarine;
  height: 100vh;
`;
