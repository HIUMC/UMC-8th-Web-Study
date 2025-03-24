import { ReactElement, useState, FormEvent, ChangeEvent } from "react";
import TodoForm from "./TodoForm";
import { TTodo } from "../types/todo";
import TodoList from "./TodoList";

const Todo = (): ReactElement => {
  const [input, setInput] = useState<string>("");
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();

    if (text) {
      const newTodo: TTodo = { id: Date.now(), text: text };
      setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
      setInput("");
    }
  };

  const completeTodo = (todo: TTodo): void => {
    setTodos((prevTodos): TTodo[] => prevTodos.filter((t) => t.id !== todo.id));
    setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
  };

  const deleteTodo = (todo: TTodo): void => {
    setDoneTodos((prevTodos): TTodo[] =>
      prevTodos.filter((t) => t.id !== todo.id)
    );
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">YONG TODO</h1>
      <TodoForm
        handleSubmit={handleSubmit}
        handleInput={handleInput}
        input={input}
      />
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
