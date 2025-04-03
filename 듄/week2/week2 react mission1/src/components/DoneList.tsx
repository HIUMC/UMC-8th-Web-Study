import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

export default function DoneList() {
  const { doneTasks, deleteTask } = useTodo();

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">완료</h2>
      <ul className="render-container__list">
        {doneTasks.map((task) => (
          <TodoItem
            key={task.id}
            id={task.id}
            text={task.text}
            onAction={() => deleteTask(task)}
            buttonText="삭제"
            buttonColor="#dc3545"
          />
        ))}
      </ul>
    </div>
  );
}
