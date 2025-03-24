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
      // 조건문에 (!setNewtodo)를 작성했었는데 이건 함수를 체크하는 것이므로 제대로 작동하지 않았던 것임.
      alert("값을 입력하세요!");
      return; // return을 적지 않았었는데 그려면 if문장이 실행된 후에 그대로 다음 내용들이 실행되기 때문임.
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
        <TodosList />
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
