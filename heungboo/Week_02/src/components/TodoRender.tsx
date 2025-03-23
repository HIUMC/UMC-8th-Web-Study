const TodoRender = ({ todos, handleCompleteTodo }) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">할 일</h2>
      <ul id="todo-list" className="render-container__list">
        {todos.map((todo, index) => (
          <div className="render-container__item" key={index}>
            <li key={index} className="render-container__item-text">
              {todo}
            </li>
            <button
              className="render-container__item-button"
              onClick={() => handleCompleteTodo(index)}
              style={{ backgroundColor: "green" }}
            >
              완료
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoRender;
