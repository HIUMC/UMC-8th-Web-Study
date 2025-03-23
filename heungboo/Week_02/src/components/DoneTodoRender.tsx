const DoneTodoRender = ({ doneTodos, handleDeleteTodo }) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">완료</h2>
      <ul id="done-list" className="render-container__list">
        {doneTodos.map((done, index) => (
          <div className="render-container__item" key={index}>
            <li key={index} className="render-container__item-text">
              {done}
            </li>
            <button
              className="render-container__item-button"
              onClick={() => handleDeleteTodo(index)}
              style={{ backgroundColor: "red" }}
            >
              삭제
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DoneTodoRender;
