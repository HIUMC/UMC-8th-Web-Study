import "./TodoList.css";
const TodoList = ({ todos, onUpdate, onDelete }) => {
  const todosToDo = todos.filter((todo) => !todo.isDone);
  const todosDone = todos.filter((todo) => todo.isDone);

  return (
    <div className="TodoList">
      {/* 해야 할 일 Section */}
      <div className="todo-section">
        <h2>해야 할 일</h2>
        {todosToDo.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
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

export default TodoList;
