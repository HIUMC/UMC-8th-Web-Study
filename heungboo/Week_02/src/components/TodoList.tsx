const TodoList = ({ todos, completeTodo, text, isDone }) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">할 일</h2>
      <ul id="todo-list" className="render-container__list">
        {todos.map((todo): any => {
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
