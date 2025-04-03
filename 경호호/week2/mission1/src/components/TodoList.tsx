import React from 'react';
import TodoItem from './TodoItem';
import { useTodoContext } from '../contexts/TodoContext';

const TodoList: React.FC = () => {
  const { todos, completeTask } = useTodoContext();
  
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">할 일</h2>
      <ul id="todo-list" className="render-container__list">
        {todos.map((task) => (
          <TodoItem key={task.id} task={task} onComplete={completeTask} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList; 