import "./TodoItem.css";

const TodoItem = ({ id, isDone, content, onUpdate, onDelete }) => {
  const onClickButton = () => {
    if (!isDone) {
      onUpdate(id);
    } else {
      onDelete(id);
    }
  };

  const buttonText = isDone ? "삭제" : "완료";

  return (
    <div className="TodoItem">
      <div className="content">{content}</div>
      <button onClick={onClickButton}>{buttonText}</button>
    </div>
  );
};

export default TodoItem;
