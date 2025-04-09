import { useTodoContext } from "../context/TodoContext";

const TodoInput = () => {
  const { input, setInput, dispatch } = useTodoContext();

  const onClickSubmit = () => {
    if (input.trim() === "") return;
    dispatch({ type: "SUBMIT", payload: { id: Date.now(), content: input } });
    setInput("");
  };

  return (
    <section className="todo-container__add">
      <textarea
        className="todo-container__input"
        value={input}
        placeholder="할 일 입력"
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="todo-container__button" onClick={onClickSubmit}>
        할 일 추가
      </button>
    </section>
  );
};

export default TodoInput;
