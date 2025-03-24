import { FormEvent, ChangeEvent } from "react";

interface TodoFormProps {
  input: string;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const TodoForm = ({ input, handleSubmit, handleInput }: TodoFormProps) => {
  return (
    <form
      id="todo-form"
      className="todo-container__form"
      onSubmit={handleSubmit}
    >
      <input
        value={input}
        onChange={handleInput}
        type="text"
        id="todo-input"
        className="todo-container__input"
        placeholder="할 일 입력"
        required
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
};
export default TodoForm;
