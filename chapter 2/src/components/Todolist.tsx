import styled from "styled-components";
import { useState } from "react";
import TodosList from "./TodosList";
import { Button_handleTodos } from "../context/Buttons";
import { useTodoContext } from "../context/TodoListsContext";

function Todolist() {
  const [newTodo, setNewtodo] = useState<string>("");
  const { todos, setTodos } = useTodoContext();
  const handleTodos = () => {
    if (!newTodo.trim()) {
      alert("값을 입력하세요!");
      return;
    }
    setTodos([...todos, newTodo]);
    setNewtodo("");
  };

  return (
    <Wrapper>
      <InputWrapper>
        <CustomInput
          value={newTodo}
          onChange={(e) => setNewtodo(e.target.value)}
        />
        <Button_handleTodos onClick={handleTodos} label="추가" />
      </InputWrapper>

      <ListWrapper>
        <TodosList newTodo={newTodo} setNewTodo={setNewtodo} />
      </ListWrapper>
    </Wrapper>
  );
}

export default Todolist;

const CustomInput = styled.input`
  display: flex;
  font-size: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
`;
const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100vh;
  gap: 50px;
  margin-top: 30px;
`;
