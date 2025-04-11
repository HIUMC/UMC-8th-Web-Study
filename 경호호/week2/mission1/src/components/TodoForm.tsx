import React, { useState } from 'react';
import { useTodoContext } from '../contexts/TodoContext';

const TodoForm: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const { addTodo } = useTodoContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <form id="todo-form" className="todo-container__form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="todo-input"
        className="todo-container__input"
        placeholder="할 일 입력"
        value={inputValue}
        onChange={handleInputChange}
        required
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
};

export default TodoForm; 