import styled from "styled-components";

interface CheckListProps {
  tasks: string[];
  onCompleteTask: (index: number) => void;
  doneTasks: string[];
  removeTasks: string[];
  onRemoveTask: (index: number) => void; // ✅ 완료된 목록에서 삭제하는 함수 추가
}

const CheckList: React.FC<CheckListProps> = ({
  tasks,
  onCompleteTask,
  doneTasks,
  removeTasks,
  onRemoveTask,
}) => {
  return (
    <>
      <Wrapper>
        <SetTodo>
          <h2>할 일</h2>
          <ul>
            {tasks
              .filter((task) => !removeTasks.includes(task)) // ✅ removeTasks에 있는 항목은 숨기기
              .map((task, index) => (
                <li
                  key={index}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  {task}
                  <button onClick={() => onCompleteTask(index)}>
                    완료
                  </button>{" "}
                  {/* ✅ 완료 버튼 */}
                </li>
              ))}
          </ul>
        </SetTodo>
        <SetDone>
          <h2>완료</h2>
          <ul>
            {doneTasks.map((task, index) => (
              <li
                key={index}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {task}
                <button onClick={() => onRemoveTask(index)}>삭제</button>{" "}
                {/* ✅ 삭제 버튼 */}
              </li>
            ))}
          </ul>
        </SetDone>
      </Wrapper>
    </>
  );
};

export default CheckList;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 20px;
`;

const SetTodo = styled.div`
  display: grid;
`;

const SetDone = styled.div`
  display: grid;
`;
