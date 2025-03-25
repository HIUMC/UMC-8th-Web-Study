import { TTodo } from "../types/todo";

interface TodoListProps {
  todos?: TTodo[];
  completeTodo: (todo: TTodo) => void;

  text: string;
  title: string;
  isDone: boolean;
}

const TodoList = ({
  todos,
  completeTodo,
  text,
  isDone,
  title,
}: TodoListProps) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul id="todo-list" className="render-container__list">
        {todos?.map((todo: TTodo) => {
          return (
            <li key={todo.id} className="render-container__item">
              <span className="render-container__item-text">{todo.text}</span>
              <button
                className="render-container__item-button"
                style={{ backgroundColor: isDone ? "#28a745" : "#dc3545" }}
                onClick={(): void => completeTodo(todo)}
              >
                {text}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default TodoList;
