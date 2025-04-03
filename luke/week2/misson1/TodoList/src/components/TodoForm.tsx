import React, { useContext } from 'react';
import { TodoContext } from './TodoContext';


const TodoForm: React.FC = () => {
  const context = useContext(TodoContext);
  if (!context) return null;
  const { input, setInput, handleSubmit } = context;
  
  return (
  <form onSubmit={handleSubmit} className="todo-container_form">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className="todo-container_input"
        placeholder="일정 입력"
        required
      />
      <button type="submit" className="todo-container_button">
        할일 추가
      </button>
    </form>
  );
};

export default TodoForm;