import styled from "styled-components";
import { useState } from "react";

function Input() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  // Enter 키 입력 시 할 일 목록 추가
  const handleOnKey = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      setTodos([...todos, input]); // 기존 목록에 추가
      setInput(""); // 입력 필드 초기화
    }
  };

  // "완료" 버튼 클릭 시 해당 항목을 완료 목록으로 이동
  const handleCompleteTask = (index) => {
    const completedTask = todos[index]; // 선택한 할 일
    setDoneTasks([...doneTasks, completedTask]); // 해낸 일 목록에 추가
    setTodos(todos.filter((_, i) => i !== index)); // 해당 할 일을 기존 목록에서 제거
  };

  // "삭제" 버튼 클릭 시 해낸 일 목록에서 제거
  const handleRemoveTask = (index) => {
    setDoneTasks(doneTasks.filter((_, i) => i !== index)); // 해당 인덱스의 항목 제거
  };

  return (
    <>
      <Wrapper>
        <CustomInput
          placeholder="스터디 계획을 작성해 보세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleOnKey}
        />
        <Container>
          <Todo>
            <h3>해야할 일</h3>
            <ul>
              {todos.map((todo, index) => (
                <TodoItem key={index}>
                  {todo}
                  <CompleteButton onClick={() => handleCompleteTask(index)}>
                    완료
                  </CompleteButton>
                </TodoItem>
              ))}
            </ul>
          </Todo>

          <Done>
            <h3>해낸 일</h3>
            <ul>
              {doneTasks.map((task, index) => (
                <DoneItem key={index}>
                  {task}
                  <RemoveButton onClick={() => handleRemoveTask(index)}>
                    삭제
                  </RemoveButton>
                </DoneItem>
              ))}
            </ul>
          </Done>
        </Container>
      </Wrapper>
    </>
  );
}

export default Input;

// 스타일 컴포넌트 정의
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const CustomInput = styled.input`
  width: 60%;
  height: 50px;
  font-size: 20px;
  padding: 10px;
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  gap: 50px;
  font-size: 20px;
  width: 70%;
  justify-content: space-between;
  align-items: flex-start;
`;

const Todo = styled.div`
  border: 2px solid black;
  padding: 20px;
  width: 300px;
  min-height: 200px;
  background-color: #f8f9fa;
`;

const Done = styled.div`
  border: 2px solid black;
  padding: 20px;
  width: 300px;
  min-height: 200px;
  background-color: #d4edda;
`;

const TodoItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 8px;
  border-bottom: 1px solid #ccc;
`;

const DoneItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 8px;
  border-bottom: 1px solid #ccc;
`;

const CompleteButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  margin-left: 10px;

  &:hover {
    background-color: #218838;
  }
`;

const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  margin-left: 10px;

  &:hover {
    background-color: #c82333;
  }
`;
