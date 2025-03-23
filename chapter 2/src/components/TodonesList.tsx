import styled from "styled-components";
import { Button_Todelete } from "../context/Buttons";

interface TodonesListisProps {
  todones: string[];
  setTodones: React.Dispatch<React.SetStateAction<string[]>>;
}

function TodonesList({ todones, setTodones }: TodonesListisProps) {
  const handleDelete = (index: number) => {
    setTodones(todones.filter((_, i) => i !== index));
  };
  return (
    <>
      <Wrapper>
        <h1 style={{ textAlign: "center" }}>Todones</h1>
        <Wrapper_Todones>
          <ul
            style={{ listStyle: "none", margin: "0", flexDirection: "column" }}
          >
            {todones.map((todos, index) => (
              <li key={index}>
                {todos}
                <Button_Todelete
                  value={index}
                  onClick={() => {
                    handleDelete(index);
                  }}
                  label="삭제하기"
                />
              </li>
            ))}
          </ul>
        </Wrapper_Todones>
      </Wrapper>
    </>
  );
}

export default TodonesList;

const Wrapper_Todones = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 30vw;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: bisque;
  height: 100vh;
`;
