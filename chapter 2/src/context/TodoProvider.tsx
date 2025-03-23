import { createContext, useContext, useState, ReactNode } from "react";

interface TodosContextType {
  Todos: string;
  handleTodone: () => void;
  handleDelete: () => void;
}

export const TodosContext = createContext<TodosContextType | undefined>(
  undefined,
);

export const TodosProvider = {{ children }: { children: ReactNode }} => {
  const [todos, setTodos] = useState<string[]>([]);


  return (
    <TodosContext.Provider
    value = {{todos, handleTodone, handleDelete}}>

    </TodosContext.Provider>
  )
}
