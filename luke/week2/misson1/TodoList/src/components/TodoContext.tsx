import { createContext } from 'react';
import { TTodo } from '../types/todo';

interface TodoContextType {
  input: string;
  setInput: (value: string) => void;
  todos: TTodo[];
  doneTodos: TTodo[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  completeTodo: (todo: TTodo) => void;
  removeTodo: (todo: TTodo) => void;
}

export const TodoContext = createContext<TodoContextType | null>(null);