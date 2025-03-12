import { useState } from "react";
import styled from "styled-components";
import CheckList from "./CheckList";

function Input() {
  const [toDoing, setToDoing] = useState<string>(""); // 입력된 값 저장
  const [taskList, setTaskList] = useState<string[]>([]); // 할 일 목록 저장
  const [doneTasks, setDoneTasks] = useState<string[]>([]); // ✅ 완료된 목록 저장
  const [removeTasks, setRemoveTasks] = useState<string[]>([]); // ✅ 완료된 항목 숨기기 위한 상태

  const handleClick = () => {
    if (!toDoing.trim()) {
      alert("할 일을 입력하세요");
      return;
    }

    setTaskList([...taskList, toDoing]); // 목록에 추가
    setToDoing(""); // 입력 필드 초기화
  };

  const handleCompleteTask = (index: number) => {
    const completedTask = taskList[index]; // 완료할 항목 가져오기
    setDoneTasks([...doneTasks, completedTask]); // ✅ 완료된 목록에 추가
    setRemoveTasks([...removeTasks, completedTask]); // ✅ removeTasks에도 추가 (CheckList에서 숨김)
    setTaskList(taskList.filter((_, i) => i !== index)); // 기존 목록에서 해당 항목 제거
  };

  const handleRemoveTask = (index: number) => {
    setDoneTasks(doneTasks.filter((_, i) => i !== index)); // ✅ 완료된 목록에서 해당 항목 삭제
  };

  return (
    <>
      <Wrapper>
        <InputBox
          placeholder="할 일 입력"
          value={toDoing}
          onChange={(e) => setToDoing(e.target.value)}
        />
        <AddButton onClick={handleClick}>할 일 추가</AddButton>

        <CheckDiv>
          {/* ✅ CheckList에 handleRemoveTask 함수 전달 */}
          <CheckList
            tasks={taskList}
            onCompleteTask={handleCompleteTask}
            removeTasks={removeTasks}
            doneTasks={doneTasks}
            onRemoveTask={handleRemoveTask}
          />
        </CheckDiv>
      </Wrapper>
    </>
  );
}

export default Input;

const InputBox = styled.input`
  display: flex;
`;

const AddButton = styled.button``;

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-auto-flow: column;
`;

const CheckDiv = styled.div`
  grid-column: 1 / -1;
  grid-row: 2;
  margin-top: 20px;
`;
