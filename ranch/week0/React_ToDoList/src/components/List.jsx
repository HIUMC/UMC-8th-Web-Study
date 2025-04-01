import TodoItem from "./TodoItem";
import "./List.css";

const List = ({ todosToDo, todosDone, onUpdate, onDelete }) => {
  return (
    <div className="List">
      {/* 해야 할 일 Section */}
      <div className="todo-section">
        <h2>해야 할 일</h2>
        {todosToDo.map((todo) => (
          <TodoItem key={todo.id} {...todo} onUpdate={onUpdate} />
        ))}
      </div>

      {/* 해낸 일 Section */}
      <div className="done-section">
        <h2>해낸 일</h2>
        {todosDone.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
