import { ReactElement } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../context/todoContext";

const Todo = (): ReactElement => {
  const { todos, doneTodos, completeTodo, deleteTodo } = useTodo();

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">YONG TODO</h1>
      <TodoForm />
      <div className="render-container">
        <TodoList
          todos={todos}
          completeTodo={completeTodo}
          title="할 일"
          text="완료"
          isDone={true}
        />
        <TodoList
          todos={doneTodos}
          completeTodo={deleteTodo}
          title="완료"
          text="삭제"
          isDone={false}
        />
      </div>
    </div>
  );
};

export default Todo;
