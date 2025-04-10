import { createContext, useContext } from "react";
import { Todo, Action } from "../App"; // Todo 타입은 App에서 export 해두었다고 가정

type TodoContextType = {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
  input: string;
  setInput: (val: string) => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context)
    throw new Error("TodoContext는 TodoProvider 안에서 사용되어야 합니다.");
  return context;
};
