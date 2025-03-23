import { useState } from "react";
import styled from "styled-components";
import TodonesList from "./TodonesList";
import { Button_Todones } from "../context/Buttons";
import { useTodoContext } from "./../context/TodoListsContext";

type Propstype = {
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
};
function TodosList({ newTodo, setNewTodo }: Propstype) {
  const [todones, setTodones] = useState<string[]>([]);
  const [newTodones, setNewTodones] = useState<string>("");
  const { todos, setTodos } = useTodoContext();

  //todones로 목록을 옮기기 위한 handler
  const handleTodones = (index: number) => {
    const complete: string = todos[index];
    setTodos(todos.filter((_, i) => i !== index)); // filter이용 방법을 정확하게 알지 못해서 이 부분 또한 gpt로 해결함.
    console.log(newTodones);
    setTodones([...todones, complete]);
  };
  //todos로 목록을 넘기기 위한 handler
  const handleTodos = () => {
    if (!newTodo.trim()) {
      // 조건문에 (!setNewtodo)를 작성했었는데 이건 함수를 체크하는 것이므로 제대로 작동하지 않았던 것임.
      alert("값을 입력하세요!");
      return; // return을 적지 않았었는데 그려면 if문장이 실행된 후에 그대로 다음 내용들이 실행되기 때문임.
    }
    setTodos([...todos, newTodo]);
    setNewTodo("");
    console.log(todos);
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
                  onClick={() => {
                    handleTodones(index);
                  }}
                  value={index}
                  label="완료"
                />
              </li>
            ))}
          </ul>
        </Wrapper_Todos>
      </Wrapper>
      <TodonesList todones={todones} setTodones={setTodones}></TodonesList>
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
