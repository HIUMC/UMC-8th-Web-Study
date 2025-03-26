import {FormEvent, JSX, useState} from 'react'
import { useTodo } from '../context/TodoContext';

const TodoForm = (): JSX.Element => {

    const { addTodo } = useTodo();

    const [input, setInput] =useState<string>('');
    const handleSubmit = (e: FormEvent<HTMLFormElement>) : void => {
        e.preventDefault(); // 새로고침 방지
        const text = input.trim();  // 공백 제거
    
        if(text) {
            // addTodo
            addTodo(text);
            setInput('');   // 입력창 초기화
        }
    };

  return (
    <form onSubmit={handleSubmit} className='todo-container__form'>
            <input 
                value = {input}
                onChange={(e): void => setInput(e.target.value)}
                type='text'
                className='todo-container__input' 
                placeholder='할 일 입력'
                required
            />
            <button type='submit' className='todo-container__button'>
                할 일 추가
            </button>
        </form>
  )
}

export default TodoForm
