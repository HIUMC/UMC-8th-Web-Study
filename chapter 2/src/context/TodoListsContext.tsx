import { createContext, useContext, ReactNode, useState } from "react";

//Todolist에 들어갈 todos의 목록들을 불러오기 위한 useContext내용
type TodolistContextType = {
  todos: string[];
  setTodos: React.Dispatch<React.SetStateAction<string[]>>;
};

const TodoContext = createContext<TodolistContextType | null>(null);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<string[]>([]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}></TodoContext.Provider>
  );
};

//TodoContext전용 훅
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("TodoContext must be used within a Provider");
  return context;
};

//Todonelist에 들어ㅓ갈 todones의 목록들을 불러오기 위한 useContext내용
type TodonelistContextType = {
  todones: string[];
  setTodones: React.Dispatch<React.SetStateAction<string[]>>;
};

const TodoneContext = createContext<TodonelistContextType | null>(null);

export const TodoneProvider = ({ children }: { children: ReactNode }) => {
  const [todones, setTodones] = useState<string[]>([]);

  return (
    <TodoneContext.Provider
      value={{ todones, setTodones }}
    ></TodoneContext.Provider>
  );
};
