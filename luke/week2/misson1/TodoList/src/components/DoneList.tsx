import React, { useContext } from 'react';
import { TodoContext } from './TodoContext';

const DoneList: React.FC = () => {
  const context = useContext(TodoContext);
  if (!context) return null;

  const { doneTodos, removeTodo } = context;

  return (
    <div className="render-container_section">
      <h2 className="render-container_title">완료</h2>
      <ul className="render-container_list">
        {doneTodos.map((todo) => (
          <li key={todo.id} className="render-container_item">
            <span className="render-container_item_text">{todo.text}</span>
            <button
              onClick={() => removeTodo(todo)}
              style={{ backgroundColor: '#dc4135' }}
              className="render-container_item_button"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoneList;
