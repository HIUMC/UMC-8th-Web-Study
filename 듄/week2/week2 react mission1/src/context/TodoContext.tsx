import { createContext, useContext, useState, ReactNode } from "react";

type Task = {
  id: number;
  text: string;
};

type TodoContextType = {
  todos: Task[];
  doneTasks: Task[];
  addTodo: (text: string) => void;
  completeTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  const completeTask = (task: Task) => {
    setTodos(todos.filter((t) => t.id !== task.id));
    setDoneTasks([...doneTasks, task]);
  };

  const deleteTask = (task: Task) => {
    setDoneTasks(doneTasks.filter((t) => t.id !== task.id));
  };

  return (
    <TodoContext.Provider value={{ todos, doneTasks, addTodo, completeTask, deleteTask }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
