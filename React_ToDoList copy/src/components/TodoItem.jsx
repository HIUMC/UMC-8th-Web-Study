import "./TodoItem.css";

const TodoItem = ({ id, isDone, content, onUpdate, onDelete, buttonText }) => {
  const onClickButton = () => {
    if (!isDone) {
      onUpdate(id);
    } else {
      onDelete(id);
    }
  };

  return (
    <div className="TodoItem">
      <input
        onChange={() => onUpdate(id)}
        readOnly
        checked={isDone}
        type="checkbox"
      />
      <div className="content">{content}</div>
      <button onClick={onClickButton}>{buttonText}</button>
    </div>
  );
};

export default TodoItem;
