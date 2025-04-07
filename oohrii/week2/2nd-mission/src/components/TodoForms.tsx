import { FormEvent, useState } from "react";
import { TTodo } from "../types/todo";

const TodoForm = ():Element=>{
  const {addTodo}=useTodo();
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();
    if (text) {
      // addTodo
      addTodo(text);
      setInput('');
    }
  };
return (
  <form onSubmit={handleSubmit} 
  className='todo-container__form'>
        <input
          value={input}
          onChange={(e): any => setInput(e.target.value)}
          type='text'
          className='todo-container__input'
          placeholder='할 일 입력'
          required
        />
        <button type='submit' 
        className='todo-container__button'>
          할 일 추가
        </button>
      </form>
  );
};
export default TodoForm;