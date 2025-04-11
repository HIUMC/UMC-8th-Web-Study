import React, { useState, FormEvent } from 'react';

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [text, setText] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-container">
        <div className="input-box">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="할 일 입력하세요"
            className="todo-input"
          />
        </div>
        <div className="button-box">
          <button type="submit" className="todo-button">할 일 추가</button>
        </div>
      </div>
    </form>
  );
};

export default TodoForm; 