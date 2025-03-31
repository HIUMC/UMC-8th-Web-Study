import React from 'react';
import { Task } from '../types';
import CompletedItem from './CompletedItem';

interface CompletedListProps {
  tasks: Task[];
  onDelete: (task: Task) => void;
}

const CompletedList: React.FC<CompletedListProps> = ({ tasks, onDelete }) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">완료</h2>
      <ul id="done-list" className="render-container__list">
        {tasks.map((task) => (
          <CompletedItem key={task.id} task={task} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
};

export default CompletedList; 