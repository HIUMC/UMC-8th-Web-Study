import React from 'react';
import { Task } from '../types';

interface CompletedItemProps {
  task: Task;
  onDelete: (task: Task) => void;
}

const CompletedItem: React.FC<CompletedItemProps> = ({ task, onDelete }) => {
  return (
    <li className="render-container__item">
      {task.text}
      <button
        className="render-container__item-button"
        style={{ backgroundColor: '#dc3545' }}
        onClick={() => onDelete(task)}
      >
        삭제
      </button>
    </li>
  );
};

export default CompletedItem; 