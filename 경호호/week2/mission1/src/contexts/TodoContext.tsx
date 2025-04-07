import React, { createContext, useContext, useState } from 'react';
import { Task } from '../types';

// Context 타입 정의
interface TodoContextType {
  todos: Task[];
  doneTasks: Task[];
  addTodo: (text: string) => void;
  completeTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
}

// Context 생성
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Provider 컴포넌트
export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  // 할 일 추가 함수
  const addTodo = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text: text.trim(),
    };
    setTodos([...todos, newTask]);
  };

  // 할 일 완료 처리
  const completeTask = (task: Task) => {
    setTodos(todos.filter((t) => t.id !== task.id));
    setDoneTasks([...doneTasks, task]);
  };

  // 완료된 할 일 삭제
  const deleteTask = (task: Task) => {
    setDoneTasks(doneTasks.filter((t) => t.id !== task.id));
  };

  const value = {
    todos,
    doneTasks,
    addTodo,
    completeTask,
    deleteTask,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// Custom Hook - Context 사용을 더 쉽게 만듦
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
}; 