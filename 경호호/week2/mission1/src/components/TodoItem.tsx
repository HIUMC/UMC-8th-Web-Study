import React from 'react';
import { Task } from '../types';

interface TodoItemProps {
  task: Task;
  onComplete: (task: Task) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onComplete }) => {
  return (
    <li className="render-container__item">
      {task.text}
      <button
        className="render-container__item-button"
        style={{ backgroundColor: '#28a745' }}
        onClick={() => onComplete(task)}
      >
        완료
      </button>
    </li>
  );
};

export default TodoItem; 