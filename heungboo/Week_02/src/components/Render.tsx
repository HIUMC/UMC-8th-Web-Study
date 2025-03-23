import DoneTodoRender from "./DoneTodoRender";
import TodoRender from "./TodoRender";

const Render = ({ todos, handleCompleteTodo, doneTodos, handleDeleteTodo }) => {
  return (
    <div className="render-container">
      <TodoRender todos={todos} handleCompleteTodo={handleCompleteTodo} />
      <DoneTodoRender
        doneTodos={doneTodos}
        handleDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
};

export default Render;
