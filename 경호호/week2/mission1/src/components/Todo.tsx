import React from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import CompletedList from './CompletedList';
import { TodoProvider } from '../contexts/TodoContext';

const Todo: React.FC = () => {
  return (
    <TodoProvider>
      <div className="todo-container">
        <h1 className="todo-container__header">YONG TODO</h1>
        <TodoForm />
        <div className="render-container">
          <TodoList />
          <CompletedList />
        </div>
      </div>
    </TodoProvider>
  );
};

export default Todo; 