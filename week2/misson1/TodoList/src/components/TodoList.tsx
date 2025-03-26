import React, { useContext } from 'react';
import { TodoContext } from './TodoContext';


const TodoList: React.FC = () => {
  const context = useContext(TodoContext);
  if (!context) return null;

  const { todos, completeTodo } = context;
  
  return (
    <div className="render-container_section">
      <h2 className="render-container_title">할 일</h2>
      <ul className="render-container_list">
        {todos.map((todo) => (
          <li key={todo.id} className="render-container_item">
            <span className="render-container_item_text">{todo.text}</span>
            <button
              onClick={() => completeTodo(todo)}
              style={{ backgroundColor: '#42ad35' }}
              className="render-container_item_button"
            >
              완료
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
