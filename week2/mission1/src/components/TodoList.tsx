import React from 'react';
import { Task } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  tasks: Task[];
  onComplete: (task: Task) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, onComplete }) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">할 일</h2>
      <ul id="todo-list" className="render-container__list">
        {tasks.map((task) => (
          <TodoItem key={task.id} task={task} onComplete={onComplete} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList; 