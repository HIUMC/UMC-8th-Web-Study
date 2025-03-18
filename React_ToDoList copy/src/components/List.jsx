import TodoItem from "./TodoItem";
import "./List.css";

const List = ({ todosToDo, todosDone, onUpdate, onDelete }) => {
  return (
    <div className="List">
      {/* 해야 할 일 Section */}
      <div className="todo-section">
        <h2>해야 할 일</h2>
        {todosToDo.length > 0 ? (
          todosToDo.map((todo) => (
            <TodoItem key={todo.id} {...todo} onUpdate={onUpdate} />
          ))
        ) : (
          <p className="empty">할 일이 없습니다.</p>
        )}
      </div>

      {/* 해낸 일 Section */}
      <div className="done-section">
        <h2>해낸 일</h2>
        {todosDone.length > 0 ? (
          todosDone.map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="empty">아직 완료한 일이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default List;
