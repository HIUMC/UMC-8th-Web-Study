import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos, completeTask } = useTodo();

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">할 일</h2>
      <ul className="render-container__list">
        {todos.map((task) => (
          <TodoItem
            key={task.id}
            id={task.id}
            text={task.text}
            onAction={() => completeTask(task)}
            buttonText="완료"
            buttonColor="#28a745"
          />
        ))}
      </ul>
    </div>
  );
}
