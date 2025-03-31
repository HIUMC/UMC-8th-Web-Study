import React from 'react';
import CompletedItem from './CompletedItem';
import { useTodoContext } from '../contexts/TodoContext';

const CompletedList: React.FC = () => {
  const { doneTasks, deleteTask } = useTodoContext();
  
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">완료</h2>
      <ul id="done-list" className="render-container__list">
        {doneTasks.map((task) => (
          <CompletedItem key={task.id} task={task} onDelete={deleteTask} />
        ))}
      </ul>
    </div>
  );
};

export default CompletedList; 