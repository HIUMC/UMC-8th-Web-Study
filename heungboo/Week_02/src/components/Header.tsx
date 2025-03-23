const Header = ({ inputValue, handleChange, handleAddTodo }) => {
  return (
    <>
      <h1 className="todo-container__header">YONG TODO</h1>
      <form id="todo-form" className="todo-container__form">
        <input
          value={inputValue}
          onChange={handleChange}
          type="text"
          id="todo-input"
          className="todo-container__input"
          placeholder="할 일 입력"
          required
        />
        <button
          type="button"
          className="todo-container__button"
          onClick={handleAddTodo}
        >
          할 일 추가
        </button>
      </form>
    </>
  );
};
export default Header;
