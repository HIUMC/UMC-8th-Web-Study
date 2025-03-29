import { useTodoContext } from "../context/TodoContext";

type TodoListProps = {
  type: "active" | "completed";
};

const TodoList = ({ type }: TodoListProps) => {
  const { todos, dispatch } = useTodoContext();
  const isCompleted = type === "completed";
  const filteredTodos = todos.filter((todo) => todo.completed === isCompleted);

  const title = isCompleted ? "완료된 일" : "할 일";
  const buttonText = isCompleted ? "삭제" : "완료";
  const buttonClass = isCompleted ? "todo-container__button--delete" : "";

  const onClickButton = (id: number) => {
    dispatch({
      type: isCompleted ? "DELETE" : "COMPLETE",
      payload: { id },
    });
  };

  return (
    <section className="todo-container__title">
      <h1>{title}</h1>
      <section className="todo-container__list">
        {filteredTodos.map((todo) => (
          <section key={todo.id} className="todo-container__item">
            <span>{todo.content}</span>
            <button
              onClick={() => onClickButton(todo.id)}
              className={`todo-container__button ${buttonClass}`}
            >
              {buttonText}
            </button>
          </section>
        ))}
      </section>
    </section>
  );
};

export default TodoList;
